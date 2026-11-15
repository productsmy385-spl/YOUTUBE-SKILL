import { NextResponse } from "next/server";
import { getDb, schema, ensureDatabaseInitialized } from "@/lib/db";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    await ensureDatabaseInitialized();
    const db = getDb();
    if (!db) {
      return NextResponse.json({ logs: [] });
    }

    const rows = await db
      .select()
      .from(schema.auditLogs)
      .orderBy(desc(schema.auditLogs.createdAt))
      .limit(100);

    return NextResponse.json({ logs: rows || [] });
  } catch (err: unknown) {
    console.error("[AuditLogs API] Error fetching logs:", err);
    return NextResponse.json({ logs: [] });
  }
}
