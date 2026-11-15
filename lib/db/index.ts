import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Ensure .env is read in non-Next environments (e.g. background workers or scripts)
if (!process.env.DATABASE_URL && typeof window === "undefined") {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const val = match[2].trim().replace(/^["']|["']$/g, "");
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  } catch {}
}

let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;
let isInitialized = false;

export function getDb() {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

  if (!connectionString) {
    return null;
  }

  if (!pool) {
    const isInternalHost = connectionString.includes(".railway.internal") || connectionString.includes("localhost") || connectionString.includes("127.0.0.1");
    const isSslRequired = process.env.DATABASE_SSL === "true" || (!isInternalHost && connectionString.includes("sslmode=require"));

    pool = new Pool({
      connectionString,
      ssl: isSslRequired ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }

  dbInstance = drizzle(pool, { schema });
  return dbInstance;
}

export function getRawPool(): Pool | null {
  if (pool) return pool;
  getDb();
  return pool;
}

export async function ensureDatabaseInitialized(): Promise<void> {
  if (isInitialized) return;
  const p = getRawPool();
  if (!p) return;

  try {
    const client = await p.connect();
    try {
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
        
        INSERT INTO workspaces (id, name, slug, owner_id)
        VALUES (
          '00000000-0000-0000-0000-000000000001',
          'Default Workspace',
          'default-workspace',
          '00000000-0000-0000-0000-000000000002'
        )
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO video_projects (id, workspace_id, creator_id, title, slug, target_platform, target_aspect_ratio, target_duration_seconds, status)
        VALUES (
          '00000000-0000-0000-0000-000000000001',
          '00000000-0000-0000-0000-000000000001',
          '00000000-0000-0000-0000-000000000002',
          'Default Studio Sandbox',
          'default-studio-sandbox',
          'youtube_shorts',
          '9:16',
          45,
          'draft'
        )
        ON CONFLICT (id) DO NOTHING;
      `);
      isInitialized = true;
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn("[DB] Initialization check notice:", err);
  }
}

export const db = getDb();
export { schema };
