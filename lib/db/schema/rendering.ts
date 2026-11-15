import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb, index } from "drizzle-orm/pg-core";
import { videoProjects } from "./projects";
import { mediaAssets } from "./media";

export const renderPresets = pgTable("render_presets", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  fps: integer("fps").default(60).notNull(),
  videoBitrate: text("video_bitrate").default("8000k").notNull(),
  audioBitrate: text("audio_bitrate").default("320k").notNull(),
});

export const renderJobs = pgTable(
  "render_jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
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
    })
      .default("queued")
      .notNull(),
    progressPercent: integer("progress_percent").default(0).notNull(),
    outputAssetId: uuid("output_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    errorLog: text("error_log"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    index("idx_render_jobs_project").on(table.projectId),
    index("idx_render_jobs_status").on(table.status),
  ]
);

export const videoTimelines = pgTable(
  "video_timelines",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    durationSeconds: numeric("duration_seconds").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_video_timelines_project").on(table.projectId),
  ]
);

export const timelineTracks = pgTable(
  "timeline_tracks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    timelineId: uuid("timeline_id")
      .references(() => videoTimelines.id, { onDelete: "cascade" })
      .notNull(),
    trackType: text("track_type", {
      enum: ["video_main", "audio_dialogue", "audio_music", "audio_sfx", "subtitle_overlay"],
    }).notNull(),
    trackIndex: integer("track_index").default(0).notNull(),
    volume: numeric("volume").default("1.0").notNull(),
    isMuted: boolean("is_muted").default(false).notNull(),
  },
  (table) => [
    index("idx_timeline_tracks_timeline").on(table.timelineId),
  ]
);

export const timelineClips = pgTable(
  "timeline_clips",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    trackId: uuid("track_id")
      .references(() => timelineTracks.id, { onDelete: "cascade" })
      .notNull(),
    assetId: uuid("asset_id")
      .references(() => mediaAssets.id, { onDelete: "cascade" })
      .notNull(),
    startOffsetSeconds: numeric("start_offset_seconds").notNull(),
    durationSeconds: numeric("duration_seconds").notNull(),
    sourceInSeconds: numeric("source_in_seconds").default("0").notNull(),
  },
  (table) => [
    index("idx_timeline_clips_track").on(table.trackId),
    index("idx_timeline_clips_asset").on(table.assetId),
  ]
);
