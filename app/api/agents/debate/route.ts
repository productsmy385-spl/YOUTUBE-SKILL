import { NextResponse } from "next/server";
import { MultiAgentCollaborationHub } from "@/lib/agents/collaboration-hub";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { concept = "Telugu Village Nostalgia", rawDialogue = "మా ఊరు, మా గోదావరి జ్ఞాపకాలు..." } = body;

    const debateTranscript = await MultiAgentCollaborationHub.executeCreativeDebate(concept, rawDialogue);

    return NextResponse.json({
      status: "SUCCESS",
      debate: debateTranscript,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to run agent debate" },
      { status: 500 }
    );
  }
}

