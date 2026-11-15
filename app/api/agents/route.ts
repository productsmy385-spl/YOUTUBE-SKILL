import { NextResponse } from "next/server";
import { getDb, schema, ensureDatabaseInitialized } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureDatabaseInitialized();
    const db = getDb();

    if (!db) {
      return NextResponse.json({ agents: [], total: 0 });
    }

    const agentsList = await db
      .select()
      .from(schema.aiAgents)
      .orderBy(schema.aiAgents.agentCode);

    // Also fetch recent agent runs
    const recentRuns = await db
      .select()
      .from(schema.aiAgentRuns)
      .orderBy(desc(schema.aiAgentRuns.startedAt))
      .limit(20);

    return NextResponse.json({
      agents: agentsList || [],
      total: agentsList.length,
      recentRuns: recentRuns || [],
    });
  } catch (err: unknown) {
    console.error("[Agents API] Error querying agents:", err);
    return NextResponse.json({ agents: [], total: 0, error: String(err) }, { status: 500 });
  }
}
