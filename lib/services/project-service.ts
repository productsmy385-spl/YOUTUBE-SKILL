import { getDb, schema, ensureDatabaseInitialized } from "@/lib/db";
import { getSession, DEFAULT_WORKSPACE_ID, DEFAULT_USER_ID } from "@/lib/auth/session";
import { logAuditEvent } from "./audit";
import { eq } from "drizzle-orm";

export interface CreateProjectInput {
  title: string;
  rawInputText: string;
  targetPlatform: "youtube_shorts" | "instagram_reels" | "youtube_long";
  targetAspectRatio: "9:16" | "16:9" | "1:1";
  targetDurationSeconds: number;
  genre: string;
  emotionalTone: string;
}

export async function createVideoProject(input: CreateProjectInput) {
  await ensureDatabaseInitialized();
  const session = await getSession();
  const db = getDb();

  const slug = input.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50) + `-${Date.now().toString(36)}`;

  const workspaceId = session?.workspaceId || DEFAULT_WORKSPACE_ID;
  const creatorId = session?.userId || DEFAULT_USER_ID;

  const projectRecord = {
    workspaceId,
    creatorId,
    title: input.title,
    slug,
    targetPlatform: input.targetPlatform,
    targetAspectRatio: input.targetAspectRatio,
    targetDurationSeconds: input.targetDurationSeconds,
    status: "draft" as const,
  };

  if (!db) {
    throw new Error("PostgreSQL database connection is unavailable");
  }

  const [inserted] = await db
    .insert(schema.videoProjects)
    .values(projectRecord)
    .returning();

  // Create associated production brief
  await db.insert(schema.productionBriefs).values({
    projectId: inserted.id,
    rawInputText: input.rawInputText,
    genre: input.genre,
    emotionalTone: input.emotionalTone,
    targetAudience: "Telugu general audience",
    coreMessage: input.title,
    hookStrategy: "First 3s punch dialogue hook",
  });

  await logAuditEvent({
    action: "project:create",
    entityType: "video_project",
    entityId: inserted.id,
    metadata: { title: input.title, platform: input.targetPlatform },
  });

  return inserted;
}

export async function updateProjectStatus(
  projectId: string,
  newStatus:
    | "draft"
    | "brief_ready"
    | "script_ready"
    | "storyboard_ready"
    | "generating_assets"
    | "voice_ready"
    | "editing"
    | "quality_check"
    | "awaiting_approval"
    | "approved"
    | "scheduled"
    | "published"
    | "failed"
) {
  const db = getDb();

  await logAuditEvent({
    action: "project:status_change",
    entityType: "video_project",
    entityId: projectId,
    metadata: { newStatus },
  });

  if (!db) {
    return { id: projectId, status: newStatus };
  }

  const [updated] = await db
    .update(schema.videoProjects)
    .set({ status: newStatus, updatedAt: new Date() })
    .where(eq(schema.videoProjects.id, projectId))
    .returning();

  return updated;
}
