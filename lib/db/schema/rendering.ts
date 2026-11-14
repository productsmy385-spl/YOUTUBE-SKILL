import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb } from "drizzle-orm/pg-core";
import { videoProjects } from "./projects";
import { mediaAssets } from "./media";

export const renderPresets = pgTable("render_presets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // YouTube Shorts 1080x1920, YouTube Landscape 4K, Instagram Reel 1080x1920
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  fps: integer("fps").default(60).notNull(),
  videoBitrate: text("video_bitrate").default("8000k").notNull(),
  audioBitrate: text("audio_bitrate").default("320k").notNull(),
});

export const renderJobs = pgTable("render_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  renderPresetId: uuid("render_preset_id").references(() => renderPresets.id, { onDelete: "set null" }),
  workerId: text("worker_id"),
  status: text("status", {
    enum: [
      "queued",
      "downloading_assets",
      "ffmpeg_stitching",
      "subtitle_burn",
      "finalizing",
      "completed",
      "failed",
    ],
  }).default("queued").notNull(),
  progressPercent: integer("progress_percent").default(0).notNull(),
  outputAssetId: uuid("output_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  errorLog: text("error_log"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const videoTimelines = pgTable("video_timelines", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  durationSeconds: numeric("duration_seconds").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const timelineTracks = pgTable("timeline_tracks", {
  id: uuid("id").defaultRandom().primaryKey(),
  timelineId: uuid("timeline_id").references(() => videoTimelines.id, { onDelete: "cascade" }).notNull(),
  trackType: text("track_type", {
    enum: ["video_main", "audio_dialogue", "audio_music", "audio_sfx", "subtitle_overlay"],
  }).notNull(),
  trackIndex: integer("track_index").notNull(),
  volume: numeric("volume").default("1.0").notNull(),
  isMuted: boolean("is_muted").default(false).notNull(),
});

export const timelineClips = pgTable("timeline_clips", {
  id: uuid("id").defaultRandom().primaryKey(),
  timelineTrackId: uuid("timeline_track_id").references(() => timelineTracks.id, { onDelete: "cascade" }).notNull(),
  assetId: uuid("asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
  startTime: numeric("start_time").notNull(),
  duration: numeric("duration").notNull(),
  inPoint: numeric("in_point").default("0").notNull(),
  outPoint: numeric("out_point").notNull(),
});

export const subtitles = pgTable("subtitles", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  language: text("language").default("te-IN").notNull(),
  vttStorageKey: text("vtt_storage_key"),
  srtStorageKey: text("srt_storage_key"),
  cuesJson: jsonb("cues_json").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const thumbnails = pgTable("thumbnails", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  imageAssetId: uuid("image_asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
  conceptName: text("concept_name").notNull(),
  teluguOverlayText: text("telugu_overlay_text"),
  isApproved: boolean("is_approved").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

