import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "sir-youtube-agentic-studio",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptimeSeconds: process.uptime(),
  });
}

