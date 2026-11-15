import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";

async function runMigration() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("[Migration] DATABASE_URL environment variable is required.");
  }

  console.log("[Migration] Connecting to PostgreSQL:", connectionString.replace(/:[^:@]+@/, ":***@"));

  const pool = new Pool({
    connectionString,
    ssl: false,
    connectionTimeoutMillis: 10000,
  });

  const client = await pool.connect();
  console.log("[Migration] Connected successfully to PostgreSQL!");

  try {
    console.log("[Migration] Resetting public schema for clean pristine schema initialization...");
    await client.query("DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;");

    const sqlPath = path.join(process.cwd(), "drizzle", "0000_initial_schema.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf-8");

    // Replace statement-breakpoints with semicolons
    const cleanSql = sqlContent
      .replace(/--> statement-breakpoint/g, ";\n")
      .trim();

    console.log("[Migration] Executing complete 56-table schema batch...");
    await client.query(cleanSql);
    console.log("[Migration] Schema batch executed successfully!");

    // 1. Insert default user
    await client.query(`
      INSERT INTO users (id, email, password_hash, full_name, avatar_url)
      VALUES (
        '00000000-0000-0000-0000-000000000002',
        'creator@sir-studio.ai',
        'argon2id_placeholder',
        'Sir Creative Producer',
        '/avatars/creator.png'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    // 2. Insert default workspace
    await client.query(`
      INSERT INTO workspaces (id, name, slug, owner_id)
      VALUES (
        '00000000-0000-0000-0000-000000000001',
        'Default Workspace',
        'default-workspace',
        '00000000-0000-0000-0000-000000000002'
      )
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log("[Migration] Default workspace & user ensured.");

    // Query tables list
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log(`[Migration] SUCCESS! Total tables in PostgreSQL database: ${res.rows.length}`);
    console.log("[Migration] Tables:", res.rows.map((r: { table_name: string }) => r.table_name).join(", "));
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration().catch((err) => {
  console.error("[Migration] Fatal error running migration:", err);
  process.exit(1);
});
