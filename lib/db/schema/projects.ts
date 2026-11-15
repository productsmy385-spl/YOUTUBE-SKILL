import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb, index } from "drizzle-orm/pg-core";
import { workspaces, users } from "./auth";
import { mediaAssets } from "./media";

export const videoProjects = pgTable(
  "video_projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    creatorId: uuid("creator_id")
      .references(() => users.id, { onDelete: "restrict" })
      .notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    targetPlatform: text("target_platform", {
      enum: ["youtube_shorts", "instagram_reels", "youtube_long"],
    })
      .default("youtube_shorts")
      .notNull(),
    targetAspectRatio: text("target_aspect_ratio", {
      enum: ["9:16", "16:9", "1:1"],
    })
      .default("9:16")
      .notNull(),
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
    })
      .default("draft")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_video_projects_workspace").on(table.workspaceId),
    index("idx_video_projects_creator").on(table.creatorId),
    index("idx_video_projects_status").on(table.status),
    index("idx_video_projects_platform").on(table.targetPlatform),
    index("idx_video_projects_created_at").on(table.createdAt),
  ]
);

export const productionBriefs = pgTable(
  "production_briefs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    rawInputText: text("raw_input_text").notNull(),
    rawVoiceAssetId: uuid("raw_voice_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    genre: text("genre").default("comedy").notNull(),
    emotionalTone: text("emotional_tone").default("conversational").notNull(),
    targetAudience: text("target_audience").notNull(),
    coreMessage: text("core_message").notNull(),
    hookStrategy: text("hook_strategy").notNull(),
    ctaType: text("cta_type").default("subscribe").notNull(),
    version: integer("version").default(1).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_production_briefs_project").on(table.projectId),
  ]
);

export const projectUploadedAssets = pgTable(
  "project_uploaded_assets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    mediaAssetId: uuid("media_asset_id")
      .references(() => mediaAssets.id, { onDelete: "cascade" })
      .notNull(),
    assetRole: text("asset_role", {
      enum: [
        "raw_cut_video",        // Raw camera take / B-roll video clip
        "reference_image",      // General visual mood board / style reference
        "character_likeness",   // Actor face / portrait reference for Agent 05
        "location_background",  // Real location photo to anchor backgrounds
        "b_roll_footage",       // Cut directly into final video edit
        "voice_recording",      // User spoken audio note / scratch voice
        "style_guide",          // Color grading & visual aesthetic reference
      ],
    })
      .default("reference_image")
      .notNull(),
    label: text("label").notNull(),
    aiPromptDirective: text("ai_prompt_directive"),
    targetSceneOrder: integer("target_scene_order"),
    isPrimary: boolean("is_primary").default(false).notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_proj_uploaded_assets_project").on(table.projectId),
    index("idx_proj_uploaded_assets_media").on(table.mediaAssetId),
    index("idx_proj_uploaded_assets_role").on(table.assetRole),
  ]
);

export const scripts = pgTable(
  "scripts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    title: text("title").notNull(),
    currentVersionId: uuid("current_version_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_scripts_project").on(table.projectId),
  ]
);

export const scriptVersions = pgTable(
  "script_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    scriptId: uuid("script_id")
      .references(() => scripts.id, { onDelete: "cascade" })
      .notNull(),
    versionNumber: integer("version_number").default(1).notNull(),
    language: text("language").default("te-IN").notNull(),
    dialectRegister: text("dialect_register").default("conversational").notNull(),
    fullTeluguText: text("full_telugu_text").notNull(),
    englishTransliteration: text("english_transliteration"),
    dialogueBreakdown: jsonb("dialogue_breakdown").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_script_versions_script").on(table.scriptId),
  ]
);

export const storyboards = pgTable(
  "storyboards",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    currentVersionId: uuid("current_version_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_storyboards_project").on(table.projectId),
  ]
);

export const storyboardVersions = pgTable(
  "storyboard_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storyboardId: uuid("storyboard_id")
      .references(() => storyboards.id, { onDelete: "cascade" })
      .notNull(),
    versionNumber: integer("version_number").default(1).notNull(),
    totalScenes: integer("total_scenes").default(0).notNull(),
    estimatedRuntimeSeconds: numeric("estimated_runtime_seconds").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_storyboard_versions_storyboard").on(table.storyboardId),
  ]
);

export const scenes = pgTable(
  "scenes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    storyboardVersionId: uuid("storyboard_version_id")
      .references(() => storyboardVersions.id, { onDelete: "cascade" })
      .notNull(),
    sceneOrder: integer("scene_order").notNull(),
    locationType: text("location_type", { enum: ["interior", "exterior"] })
      .default("interior")
      .notNull(),
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
    status: text("status", { enum: ["pending", "generating", "completed", "failed"] })
      .default("pending")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_scenes_storyboard_version").on(table.storyboardVersionId),
    index("idx_scenes_order").on(table.sceneOrder),
  ]
);

export const shots = pgTable(
  "shots",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sceneId: uuid("scene_id")
      .references(() => scenes.id, { onDelete: "cascade" })
      .notNull(),
    shotOrder: integer("shot_order").notNull(),
    shotDescription: text("shot_description").notNull(),
    referenceImageAssetId: uuid("reference_image_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    videoClipAssetId: uuid("video_clip_asset_id").references(() => mediaAssets.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_shots_scene").on(table.sceneId),
  ]
);

export const characters = pgTable(
  "characters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    name: text("name").notNull(),
    gender: text("gender").notNull(),
    ageRange: text("age_range").notNull(),
    ethnicityStyle: text("ethnicity_style").default("Telugu / South Asian").notNull(),
    clothingDescription: text("clothing_description").notNull(),
    facialFeatures: text("facial_features").notNull(),
    voiceProfileId: uuid("voice_profile_id"),
    isConsentVerified: boolean("is_consent_verified").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_characters_workspace").on(table.workspaceId),
  ]
);

export const characterReferences = pgTable(
  "character_references",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    characterId: uuid("character_id")
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    assetId: uuid("asset_id")
      .references(() => mediaAssets.id, { onDelete: "cascade" })
      .notNull(),
    poseType: text("pose_type", { enum: ["front", "profile", "three_quarter", "expression"] }).notNull(),
    expression: text("expression", { enum: ["neutral", "smiling", "crying", "angry", "surprised"] })
      .default("neutral")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_character_refs_character").on(table.characterId),
    index("idx_character_refs_asset").on(table.assetId),
  ]
);

export const characterConsents = pgTable(
  "character_consents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    characterId: uuid("character_id")
      .references(() => characters.id, { onDelete: "cascade" })
      .notNull(),
    consenterName: text("consenter_name").notNull(),
    consenterEmail: text("consenter_email"),
    consentDocumentUrl: text("consent_document_url"),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
    verifiedBy: uuid("verified_by").references(() => users.id, { onDelete: "set null" }),
  },
  (table) => [
    index("idx_character_consents_character").on(table.characterId),
  ]
);
