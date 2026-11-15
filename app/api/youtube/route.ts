import { NextResponse } from "next/server";
import { youtubeClient } from "@/lib/providers/youtube/youtube-client";
import { YouTubeGrowthEngine } from "@/lib/services/youtube-growth";
import { recordAgentExecutionInPostgres } from "@/lib/agents/agent-engine";
import { logAuditEvent } from "@/lib/services/audit";

export async function GET() {
  try {
    const stats = await youtubeClient.getChannelStats();
    return NextResponse.json({
      status: "SUCCESS",
      channel: stats,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch YouTube stats" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, baseConcept, format = "Shorts", topic, uploadOptions, projectId = "00000000-0000-0000-0000-000000000001" } = body;

    if (action === "variants") {
      const variants = YouTubeGrowthEngine.generateTitleVariants(baseConcept || "Telugu Trending Video", format);

      await recordAgentExecutionInPostgres({
        projectId,
        agentCode: "seo_metadata",
        triggerEvent: "title_variants_request",
        taskName: "generate_title_and_description_variants",
        inputPayload: { baseConcept, format },
        outputPayload: { variants },
        costUsd: 0.01,
      });

      return NextResponse.json({ status: "SUCCESS", variants });
    }

    if (action === "keywords") {
      const keywords = YouTubeGrowthEngine.exploreKeywords(topic || "Telugu Stories");

      await recordAgentExecutionInPostgres({
        projectId,
        agentCode: "seo_metadata",
        triggerEvent: "keyword_discovery_request",
        taskName: "explore_telugu_youtube_keywords",
        inputPayload: { topic },
        outputPayload: { keywords },
        costUsd: 0.01,
      });

      return NextResponse.json({ status: "SUCCESS", keywords });
    }

    if (action === "upload") {
      if (!uploadOptions) {
        return NextResponse.json({ error: "Missing uploadOptions payload" }, { status: 400 });
      }
      const result = await youtubeClient.uploadVideo(uploadOptions, "");

      await recordAgentExecutionInPostgres({
        projectId,
        agentCode: "publishing_dispatcher",
        triggerEvent: "youtube_video_upload",
        taskName: "dispatch_video_to_youtube",
        inputPayload: uploadOptions,
        outputPayload: result as unknown as Record<string, unknown>,
        costUsd: 0.02,
      });

      await logAuditEvent({
        action: "youtube:video_published",
        entityType: "video_project",
        entityId: projectId,
        metadata: { title: uploadOptions.title, videoId: result.videoId },
      });

      return NextResponse.json({ status: "SUCCESS", result });
    }

    return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "YouTube operations failed" },
      { status: 500 }
    );
  }
}
