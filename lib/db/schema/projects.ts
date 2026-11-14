import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb } from "drizzle-orm/pg-core";
import { workspaces, users } from "./auth";

export const videoProjects = pgTable("video_projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  creatorId: uuid("creator_id").references(() => users.id, { onDelete: "restrict" }).notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  targetPlatform: text("target_platform", { enum: ["youtube_shorts", "instagram_reels", "youtube_long"] }).default("youtube_shorts").notNull(),
  targetAspectRatio: text("target_aspect_ratio", { enum: ["9:16", "16:9", "1:1"] }).default("9:16").notNull(),
  targetDurationSeconds: integer("target_duration_seconds").default(45).notNull(),
  status: text("status", {
    enum: [
      "draft",
      "brief_ready",
      "script_ready",
      "storyboard_ready",
      "generating_assets",
      "voice_ready",
      "editing",
      "quality_check",
      "awaiting_approval",
      "approved",
      "scheduled",
      "published",
      "failed",
      "cancelled",
    ],
  }).default("draft").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const productionBriefs = pgTable("production_briefs", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  rawInputText: text("raw_input_text").notNull(),
  rawVoiceAssetId: uuid("raw_voice_asset_id"),
  genre: text("genre").default("comedy").notNull(),
  emotionalTone: text("emotional_tone").default("conversational").notNull(),
  targetAudience: text("target_audience").notNull(),
  coreMessage: text("core_message").notNull(),
  hookStrategy: text("hook_strategy").notNull(),
  ctaType: text("cta_type").default("subscribe").notNull(),
  version: integer("version").default(1).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const scripts = pgTable("scripts", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  currentVersionId: uuid("current_version_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const scriptVersions = pgTable("script_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  scriptId: uuid("script_id").references(() => scripts.id, { onDelete: "cascade" }).notNull(),
  versionNumber: integer("version_number").default(1).notNull(),
  language: text("language").default("te-IN").notNull(),
  dialectRegister: text("dialect_register").default("conversational").notNull(),
  fullTeluguText: text("full_telugu_text").notNull(),
  englishTransliteration: text("english_transliteration"),
  dialogueBreakdown: jsonb("dialogue_breakdown").notNull(), // array of scene dialogues with cues
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const storyboards = pgTable("storyboards", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "cascade" }).notNull(),
  currentVersionId: uuid("current_version_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const storyboardVersions = pgTable("storyboard_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  storyboardId: uuid("storyboard_id").references(() => storyboards.id, { onDelete: "cascade" }).notNull(),
  versionNumber: integer("version_number").default(1).notNull(),
  totalScenes: integer("total_scenes").default(0).notNull(),
  estimatedRuntimeSeconds: numeric("estimated_runtime_seconds").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const scenes = pgTable("scenes", {
  id: uuid("id").defaultRandom().primaryKey(),
  storyboardVersionId: uuid("storyboard_version_id").references(() => storyboardVersions.id, { onDelete: "cascade" }).notNull(),
  sceneOrder: integer("scene_order").notNull(),
  locationType: text("location_type", { enum: ["interior", "exterior"] }).default("interior").notNull(),
  locationName: text("location_name").notNull(),
  atmosphere: text("atmosphere"),
  lighting: text("lighting"),
  cameraAngle: text("camera_angle").default("eye_level").notNull(),
  cameraMovement: text("camera_movement").default("static").notNull(),
  shotType: text("shot_type").default("medium_close_up").notNull(),
  durationSeconds: numeric("duration_seconds").notNull(),
  dialogueTelugu: text("dialogue_telugu").notNull(),
  dialogueAudioCue: text("dialogue_audio_cue"),
  visualPrompt: text("visual_prompt").notNull(),
  negativePrompt: text("negative_prompt"),
  status: text("status", { enum: ["pending", "generating", "completed", "failed"] }).default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const shots = pgTable("shots", {
  id: uuid("id").defaultRandom().primaryKey(),
  sceneId: uuid("scene_id").references(() => scenes.id, { onDelete: "cascade" }).notNull(),
  shotOrder: integer("shot_order").notNull(),
  shotDescription: text("shot_description").notNull(),
  referenceImageAssetId: uuid("reference_image_asset_id"),
  videoClipAssetId: uuid("video_clip_asset_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const characters = pgTable("characters", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  ageRange: text("age_range").notNull(),
  ethnicityStyle: text("ethnicity_style").default("Telugu / South Asian").notNull(),
  clothingDescription: text("clothing_description").notNull(),
  facialFeatures: text("facial_features").notNull(),
  voiceProfileId: uuid("voice_profile_id"),
  isConsentVerified: boolean("is_consent_verified").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const characterReferences = pgTable("character_references", {
  id: uuid("id").defaultRandom().primaryKey(),
  characterId: uuid("character_id").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  assetId: uuid("asset_id").notNull(),
  poseType: text("pose_type", { enum: ["front", "profile", "three_quarter", "expression"] }).notNull(),
  expression: text("expression", { enum: ["neutral", "smiling", "crying", "angry", "surprised"] }).default("neutral").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const characterConsents = pgTable("character_consents", {
  id: uuid("id").defaultRandom().primaryKey(),
  characterId: uuid("character_id").references(() => characters.id, { onDelete: "cascade" }).notNull(),
  consenterName: text("consenter_name").notNull(),
  consenterEmail: text("consenter_email"),
  consentDocumentUrl: text("consent_document_url"),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  verifiedBy: uuid("verified_by").references(() => users.id, { onDelete: "set null" }),
});

