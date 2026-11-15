import { NextRequest, NextResponse } from "next/server";
import { AgentOrchestrator } from "@/lib/agents/orchestrator";
import { CreatorBriefInput } from "@/lib/agents/types";
import { getDb, schema, ensureDatabaseInitialized } from "@/lib/db";
import { DEFAULT_WORKSPACE_ID, DEFAULT_USER_ID } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

// In-memory active orchestrator states (backed by Redis in production worker)
const activeOrchestrators = new Map<string, AgentOrchestrator>();

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    // Accept either wrapped { brief: { ... } } or flat CreatorBriefInput
    const brief = raw.brief || raw;

    let projectId = brief.projectId;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!projectId || !uuidRegex.test(projectId)) {
      projectId = crypto.randomUUID();
    }

    const rawInput = (brief.rawInput || brief.rawInputText || brief.dialogue || brief.title || "").trim();
    if (!rawInput) {
      return NextResponse.json(
        { success: false, error: "Missing required raw input, dialogue or concept description" },
        { status: 400 }
      );
    }

    const normalizedInput: CreatorBriefInput = {
      projectId,
      title: (brief.title || "Telugu AI Video Production").trim(),
      rawInput,
      inputLanguage: brief.inputLanguage || "te",
      platform: brief.platform || "youtube_shorts",
      aspectRatio: brief.aspectRatio || "9:16",
      targetDurationSeconds: Number(brief.targetDurationSeconds || brief.durationTargetSeconds || 45),
      genre: brief.genre || "Comedy",
      emotionalTone: brief.emotionalTone || "Conversational",
      voiceRegister: brief.voiceRegister || "Natural",
    };

    const db = getDb();
    if (db) {
      await ensureDatabaseInitialized();
      // Ensure the project exists in PostgreSQL
      try {
        const slug = normalizedInput.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 50) + `-${projectId.substring(0, 8)}`;

        await db
          .insert(schema.videoProjects)
          .values({
            id: projectId,
            workspaceId: DEFAULT_WORKSPACE_ID,
            creatorId: DEFAULT_USER_ID,
            title: normalizedInput.title,
            slug,
            targetPlatform: normalizedInput.platform,
            targetAspectRatio: normalizedInput.aspectRatio,
            targetDurationSeconds: normalizedInput.targetDurationSeconds,
            status: "generating_assets",
          })
          .onConflictDoNothing();

        // Link any uploaded raw footage or reference images in project_uploaded_assets
        if (Array.isArray(brief.uploadedAssets) && brief.uploadedAssets.length > 0) {
          for (const asset of brief.uploadedAssets) {
            if (asset.id && uuidRegex.test(asset.id)) {
              await db
                .insert(schema.projectUploadedAssets)
                .values({
                  projectId,
                  mediaAssetId: asset.id,
                  assetRole: (asset.assetRole as "raw_cut_video" | "reference_image" | "character_likeness" | "location_background" | "b_roll_footage" | "voice_recording" | "style_guide") || "raw_cut_video",
                  label: asset.fileName || "Uploaded Asset",
                  aiPromptDirective: asset.aiPromptDirective || "",
                  metadata: { fileName: asset.fileName, assetType: asset.assetType },
                })
                .onConflictDoNothing();
            }
          }
        }
      } catch (e) {
        console.warn("[Orchestrator] Notice ensuring project in PostgreSQL:", e);
      }
    }

    const orchestrator = new AgentOrchestrator(normalizedInput);
    activeOrchestrators.set(projectId, orchestrator);

    // Run the multi-agent production sequence
    const finalState = await orchestrator.runFullWorkflow(normalizedInput);

    // Persist finalized outputs to PostgreSQL relational tables
    if (db && finalState.status !== "failed") {
      try {
        await db
          .update(schema.videoProjects)
          .set({ status: "awaiting_approval", updatedAt: new Date() })
          .where(eq(schema.videoProjects.id, projectId));

        if (finalState.brief) {
          await db
            .insert(schema.productionBriefs)
            .values({
              projectId,
              rawInputText: normalizedInput.rawInput,
              genre: finalState.brief.genre || normalizedInput.genre,
              emotionalTone: normalizedInput.emotionalTone,
              targetAudience: finalState.brief.targetAudience,
              coreMessage: finalState.brief.oneLineConcept,
              hookStrategy: finalState.brief.hookThreeSeconds,
              ctaType: "subscribe",
            })
            .onConflictDoNothing();
        }

        if (finalState.script) {
          const [scriptRow] = await db
            .insert(schema.scripts)
            .values({
              projectId,
              title: finalState.script.title,
            })
            .returning();

          if (scriptRow) {
            await db.insert(schema.scriptVersions).values({
              scriptId: scriptRow.id,
              versionNumber: 1,
              language: "te-IN",
              dialectRegister: finalState.script.dialectRegister || "conversational",
              fullTeluguText: finalState.script.fullTeluguText,
              englishTransliteration: "",
              dialogueBreakdown: finalState.script.dialogueScenes as unknown as Record<string, unknown>,
            });
          }
        }
      } catch (err) {
        console.warn("[Orchestrator] Notice saving outputs to PostgreSQL:", err);
      }
    }

    return NextResponse.json({
      success: true,
      projectId,
      state: finalState,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { projectId, action, sceneId } = await req.json();

    const orchestrator = activeOrchestrators.get(projectId);
    if (!orchestrator) {
      return NextResponse.json(
        { success: false, error: "Project orchestrator not found or expired" },
        { status: 404 }
      );
    }

    if (action === "regenerate_scene" && sceneId !== undefined) {
      const updatedShot = await orchestrator.regenerateScene(Number(sceneId));
      return NextResponse.json({
        success: true,
        updatedShot,
        state: orchestrator.getState(),
      });
    }

    if (action === "approve") {
      const updatedState = await orchestrator.approveAndPublish();
      return NextResponse.json({
        success: true,
        state: updatedState,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return NextResponse.json(
      { success: false, error: "Missing projectId query parameter" },
      { status: 400 }
    );
  }

  const orchestrator = activeOrchestrators.get(projectId);
  if (!orchestrator) {
    // Check if exists in PostgreSQL
    const db = getDb();
    if (db) {
      const [proj] = await db
        .select()
        .from(schema.videoProjects)
        .where(eq(schema.videoProjects.id, projectId))
        .limit(1);

      if (proj) {
        return NextResponse.json({
          success: true,
          project: proj,
          status: proj.status,
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    state: orchestrator.getState(),
  });
}
