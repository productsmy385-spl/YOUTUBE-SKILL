import { pgTable, uuid, text, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { videoProjects, scenes } from "./projects";
import { mediaAssets } from "./media";

export const generationJobs = pgTable("generation_jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  providerName: text("provider_name").notNull(), // gemini, telugu_tts, elevenlabs, flux
  jobType: text("job_type", { enum: ["video_clip", "image_reference", "voiceover", "music", "sfx"] }).notNull(),
  externalJobId: text("external_job_id"),
  status: text("status", { enum: ["queued", "processing", "succeeded", "failed"] }).default("queued").notNull(),
  attempts: integer("attempts").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const videoGenerations = pgTable("video_generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  generationJobId: uuid("generation_job_id").references(() => generationJobs.id, { onDelete: "cascade" }).notNull(),
  sceneId: uuid("scene_id").references(() => scenes.id, { onDelete: "cascade" }).notNull(),
  modelId: text("model_id").notNull(), // veo-2.0-generate-001
  promptText: text("prompt_text").notNull(),
  generatedAssetId: uuid("generated_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  costUsd: numeric("cost_usd").default("0").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const voiceGenerations = pgTable("voice_generations", {
  id: uuid("id").defaultRandom().primaryKey(),
  generationJobId: uuid("generation_job_id").references(() => generationJobs.id, { onDelete: "cascade" }).notNull(),
  sceneId: uuid("scene_id").references(() => scenes.id, { onDelete: "cascade" }).notNull(),
  teluguText: text("telugu_text").notNull(),
  voiceProfileId: uuid("voice_profile_id"),
  audioAssetId: uuid("audio_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  speechRate: numeric("speech_rate").default("1.0").notNull(),
  pitch: numeric("pitch").default("0.0").notNull(),
  emotionTag: text("emotion_tag").default("conversational").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const musicTracks = pgTable("music_tracks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  genre: text("genre").notNull(),
  mood: text("mood").notNull(),
  tempoBpm: integer("tempo_bpm"),
  durationSeconds: numeric("duration_seconds").notNull(),
  audioAssetId: uuid("audio_asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
  licenseVerified: text("license_verified").default("commercial_royalty_free").notNull(),
});

export const soundEffects = pgTable("sound_effects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  category: text("category", { enum: ["ambient", "foley", "transition", "impact", "comedy"] }).notNull(),
  audioAssetId: uuid("audio_asset_id").references(() => mediaAssets.id, { onDelete: "cascade" }).notNull(),
});

