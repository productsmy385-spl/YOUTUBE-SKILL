import { NextResponse } from "next/server";
import { youtubeClient } from "@/lib/providers/youtube/youtube-client";
import { YouTubeGrowthEngine } from "@/lib/services/youtube-growth";

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
    const { action, baseConcept, format = "Shorts", topic, uploadOptions } = body;

    if (action === "variants") {
      const variants = YouTubeGrowthEngine.generateTitleVariants(baseConcept || "Sankranti Memories", format);
      return NextResponse.json({ status: "SUCCESS", variants });
    }

    if (action === "keywords") {
      const keywords = YouTubeGrowthEngine.exploreKeywords(topic || "Telugu Stories");
      return NextResponse.json({ status: "SUCCESS", keywords });
    }

    if (action === "upload") {
      if (!uploadOptions) {
        return NextResponse.json({ error: "Missing uploadOptions payload" }, { status: 400 });
      }
      const result = await youtubeClient.uploadVideo(uploadOptions, "");
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

