import { NextResponse } from "next/server";
import { getRawPool } from "@/lib/db";

export async function GET() {
  const pool = getRawPool();
  let dbStatus = "not_configured";
  let totalTables = 0;
  let postgresVersion = "";
  let databaseName = "";

  if (pool) {
    try {
      const client = await pool.connect();
      try {
        const versionRes = await client.query("SELECT version(), current_database()");
        postgresVersion = versionRes.rows[0]?.version || "PostgreSQL";
        databaseName = versionRes.rows[0]?.current_database || "sir_youtube_studio";

        const tablesRes = await client.query(
          "SELECT count(*)::int as count FROM information_schema.tables WHERE table_schema = 'public'"
        );
        totalTables = tablesRes.rows[0]?.count || 0;
        dbStatus = "connected";
      } finally {
        client.release();
      }
    } catch (err: unknown) {
      console.error("[Health] Database health check error:", err);
      dbStatus = "error: " + (err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json({
    status: "healthy",
    service: "sir-youtube-agentic-studio",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptimeSeconds: process.uptime(),
    database: {
      engine: "PostgreSQL",
      status: dbStatus,
      tables: totalTables,
      databaseName,
      version: postgresVersion,
    },
  });
}
