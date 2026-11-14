import { getDb, schema } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export interface AuditEventParams {
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

export async function logAuditEvent(params: AuditEventParams): Promise<void> {
  const session = await getSession();
  const db = getDb();

  const auditEntry = {
    workspaceId: session?.workspaceId,
    userId: session?.userId,
    action: params.action,
    entityType: params.entityType,
    entityId: params.entityId,
    metadata: params.metadata || {},
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    createdAt: new Date(),
  };

  if (!db) {
    // In dev / offline mode, log structured JSON to stdout
    console.log("[AUDIT LOG]", JSON.stringify(auditEntry));
    return;
  }

  try {
    await db.insert(schema.auditLogs).values(auditEntry);
  } catch (err) {
    console.error("Failed to persist audit log:", err);
  }
}

