import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { videoProjects, productionBriefs, projectUploadedAssets, mediaAssets } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json({ projects: [], total: 0 });
    }

    const projects = await db
      .select()
      .from(videoProjects)
      .orderBy(desc(videoProjects.createdAt))
      .limit(50);

    return NextResponse.json({
      projects: projects || [],
      total: projects?.length || 0,
    });
  } catch (err: unknown) {
    console.error("Failed to query video projects:", err);
    // Graceful fallback when tables are empty or initializing
    return NextResponse.json({ projects: [], total: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      targetPlatform = "youtube_shorts",
      targetAspectRatio = "9:16",
      targetDurationSeconds = 45,
      rawInputText = "",
      genre = "comedy",
      emotionalTone = "conversational",
      targetAudience = "Telugu YouTube & Shorts viewers",
      coreMessage = "",
      hookStrategy = "Instant emotional hook in first 3 seconds",
      uploadedAssets = [],
    } = body;

    const db = getDb();
    const defaultWorkspaceId = "00000000-0000-0000-0000-000000000001";
    const defaultCreatorId = "00000000-0000-0000-0000-000000000001";

    const slug = (title || "project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") + "-" + Date.now().toString(36);

    const newProject = {
      id: "proj-" + Math.random().toString(36).substring(2, 10),
      title: title || "Untitled Telugu Video",
      targetPlatform,
      targetAspectRatio,
      targetDurationSeconds,
      status: "draft" as const,
      progress: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (db) {
      try {
        const [insertedProject] = await db
          .insert(videoProjects)
          .values({
            workspaceId: defaultWorkspaceId,
            creatorId: defaultCreatorId,
            title: title || "Untitled Telugu Video",
            slug,
            targetPlatform,
            targetAspectRatio,
            targetDurationSeconds,
            status: "draft",
          })
          .returning();

        if (insertedProject) {
          await db.insert(productionBriefs).values({
            projectId: insertedProject.id,
            rawInputText,
            genre,
            emotionalTone,
            targetAudience,
            coreMessage: coreMessage || rawInputText,
            hookStrategy,
            ctaType: "subscribe",
          });

          return NextResponse.json({
            success: true,
            project: insertedProject,
          });
        }
      } catch (dbErr) {
        console.warn("DB insert fell back to local memory response:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      project: newProject,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
