import { NextRequest, NextResponse } from "next/server";
import { AgentOrchestrator } from "@/lib/agents/orchestrator";
import { CreatorBriefInput } from "@/lib/agents/types";

// In-memory active orchestrator states (backed by Redis in production worker)
const activeOrchestrators = new Map<string, AgentOrchestrator>();

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreatorBriefInput;

    if (!body.projectId || !body.rawInput) {
      return NextResponse.json(
        { success: false, error: "Missing projectId or rawInput" },
        { status: 400 }
      );
    }

    const orchestrator = new AgentOrchestrator(body);
    activeOrchestrators.set(body.projectId, orchestrator);

    // Run the multi-agent production sequence
    const finalState = await orchestrator.runFullWorkflow(body);

    return NextResponse.json({
      success: true,
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
      { success: false, error: "Missing projectId parameter" },
      { status: 400 }
    );
  }

  const orchestrator = activeOrchestrators.get(projectId);
  if (!orchestrator) {
    return NextResponse.json(
      { success: false, error: "Project orchestrator not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    state: orchestrator.getState(),
  });
}

