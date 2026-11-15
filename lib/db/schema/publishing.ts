import { pgTable, uuid, text, timestamp, boolean, bigint, integer, index } from "drizzle-orm/pg-core";
import { workspaces } from "./auth";
import { videoProjects } from "./projects";

export const socialAccounts = pgTable(
  "social_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    platform: text("platform", { enum: ["youtube", "instagram"] }).notNull(),
    platformAccountId: text("platform_account_id").notNull(),
    accountName: text("account_name").notNull(),
    accountHandle: text("account_handle"),
    avatarUrl: text("avatar_url"),
    status: text("status", { enum: ["connected", "expired", "revoked"] })
      .default("connected")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_social_accounts_workspace").on(table.workspaceId),
    index("idx_social_accounts_platform").on(table.platform),
  ]
);

export const youtubeChannels = pgTable(
  "youtube_channels",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull(),
    channelId: text("channel_id").notNull().unique(),
    title: text("title").notNull(),
    subscriberCount: integer("subscriber_count").default(0).notNull(),
    videoCount: integer("video_count").default(0).notNull(),
    defaultPrivacy: text("default_privacy", { enum: ["public", "unlisted", "private"] })
      .default("public")
      .notNull(),
    playlistId: text("playlist_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_yt_channels_social").on(table.socialAccountId),
  ]
);

export const instagramAccounts = pgTable(
  "instagram_accounts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull(),
    igUserId: text("ig_user_id").notNull().unique(),
    username: text("username").notNull(),
    isBusinessAccount: boolean("is_business_account").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_ig_accounts_social").on(table.socialAccountId),
  ]
);

export const oauthCredentials = pgTable(
  "oauth_credentials",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull()
      .unique(),
    encryptedAccessToken: text("encrypted_access_token").notNull(),
    encryptedRefreshToken: text("encrypted_refresh_token").notNull(),
    tokenExpiry: timestamp("token_expiry", { withTimezone: true }),
    tokenScope: text("token_scope").notNull(),
    iv: text("iv").notNull(),
    tag: text("tag").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_oauth_creds_social").on(table.socialAccountId),
  ]
);

export const oauthConnectionLogs = pgTable(
  "oauth_connection_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull(),
    eventType: text("event_type", { enum: ["connect", "refresh", "disconnect", "error"] }).notNull(),
    statusCode: integer("status_code"),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_oauth_logs_social").on(table.socialAccountId),
  ]
);

export const videoMetadata = pgTable(
  "video_metadata",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    youtubeTitle: text("youtube_title").notNull(),
    youtubeDescription: text("youtube_description").notNull(),
    tags: text("tags").array().notNull(),
    categoryId: text("category_id").default("24").notNull(),
    privacyStatus: text("privacy_status", { enum: ["public", "private", "unlisted"] })
      .default("public")
      .notNull(),
    hasKidsContent: boolean("has_kids_content").default(false).notNull(),
    pinnedComment: text("pinned_comment"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_video_meta_project").on(table.projectId),
  ]
);

export const publishingSchedules = pgTable(
  "publishing_schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull(),
    scheduledTime: timestamp("scheduled_time", { withTimezone: true }).notNull(),
    timezone: text("timezone").default("Asia/Kolkata").notNull(),
    status: text("status", { enum: ["scheduled", "publishing", "completed", "cancelled"] })
      .default("scheduled")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_pub_schedules_project").on(table.projectId),
    index("idx_pub_schedules_social").on(table.socialAccountId),
    index("idx_pub_schedules_time").on(table.scheduledTime),
  ]
);

export const publishingJobs = pgTable(
  "publishing_jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    socialAccountId: uuid("social_account_id")
      .references(() => socialAccounts.id, { onDelete: "cascade" })
      .notNull(),
    idempotencyKey: text("idempotency_key").notNull().unique(),
    resumableUploadUrl: text("resumable_upload_url"),
    bytesUploaded: bigint("bytes_uploaded", { mode: "number" }).default(0).notNull(),
    totalBytes: bigint("total_bytes", { mode: "number" }).notNull(),
    status: text("status", { enum: ["queued", "uploading", "verifying", "published", "failed"] })
      .default("queued")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_pub_jobs_project").on(table.projectId),
    index("idx_pub_jobs_social").on(table.socialAccountId),
    index("idx_pub_jobs_status").on(table.status),
  ]
);

export const publishedVideos = pgTable(
  "published_videos",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    publishingJobId: uuid("publishing_job_id")
      .references(() => publishingJobs.id, { onDelete: "cascade" })
      .notNull(),
    platform: text("platform", { enum: ["youtube", "instagram"] }).notNull(),
    platformVideoId: text("platform_video_id").notNull(),
    platformUrl: text("platform_url").notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_published_videos_job").on(table.publishingJobId),
    index("idx_published_videos_platform").on(table.platform),
  ]
);
