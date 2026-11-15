import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { mediaAssets } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json({ media: [] });
    }

    const rows = await db
      .select()
      .from(mediaAssets)
      .orderBy(desc(mediaAssets.createdAt))
      .limit(100);

    return NextResponse.json({ media: rows || [] });
  } catch (err: unknown) {
    console.warn("Media query failed:", err);
    return NextResponse.json({ media: [] });
  }
}
