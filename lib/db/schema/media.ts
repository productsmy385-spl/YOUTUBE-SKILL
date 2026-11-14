import { pgTable, uuid, text, timestamp, bigint, integer, numeric } from "drizzle-orm/pg-core";
import { workspaces } from "./auth";

export const mediaFolders = pgTable("media_folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  parentId: uuid("parent_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  folderId: uuid("folder_id").references(() => mediaFolders.id, { onDelete: "set null" }),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  fileSizeBytes: bigint("file_size_bytes", { mode: "number" }).notNull(),
  storageKey: text("storage_key").notNull(),
  storageBucket: text("storage_bucket").notNull(),
  assetType: text("asset_type", {
    enum: ["video", "image", "audio_voice", "audio_music", "audio_sfx", "subtitle", "thumbnail"],
  }).notNull(),
  durationSeconds: numeric("duration_seconds"),
  width: integer("width"),
  height: integer("height"),
  md5Checksum: text("md5_checksum"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const mediaVariants = pgTable("media_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  assetId: uuid("asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
  variantName: text("variant_name").notNull(), // preview_720p, master_1080p, vertical_1080x1920, thumbnail_webp
  storageKey: text("storage_key").notNull(),
  fileSizeBytes: bigint("file_size_bytes", { mode: "number" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const assetLicenses = pgTable("asset_licenses", {
  id: uuid("id").defaultRandom().primaryKey(),
  assetId: uuid("asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
  licenseType: text("license_type", {
    enum: ["commercial_royalty_free", "ai_generated_exclusive", "creator_owned", "licensed_library"],
  }).notNull(),
  sourceProvider: text("source_provider"),
  attributionText: text("attribution_text"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

