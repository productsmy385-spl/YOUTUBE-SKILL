import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let pool: Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // Return null or lightweight mock db when not connected
    return null;
  }

  if (!pool) {
    const isSslRequired = process.env.DATABASE_SSL === "true" || process.env.NODE_ENV === "production";

    pool = new Pool({
      connectionString,
      ssl: isSslRequired ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  dbInstance = drizzle(pool, { schema });
  return dbInstance;
}

export const db = getDb();
export { schema };

