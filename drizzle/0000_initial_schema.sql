CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"description" text NOT NULL,
	"category" text NOT NULL,
	CONSTRAINT "permissions_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "role_permissions" (
	"role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"is_system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"user_agent" text,
	"ip_address" text,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"full_name" text NOT NULL,
	"avatar_url" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "workspace_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"owner_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "workspaces_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "character_consents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"consenter_name" text NOT NULL,
	"consenter_email" text,
	"consent_document_url" text,
	"verified_at" timestamp with time zone,
	"verified_by" uuid
);
--> statement-breakpoint
CREATE TABLE "character_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"asset_id" uuid NOT NULL,
	"pose_type" text NOT NULL,
	"expression" text DEFAULT 'neutral' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"name" text NOT NULL,
	"gender" text NOT NULL,
	"age_range" text NOT NULL,
	"ethnicity_style" text DEFAULT 'Telugu / South Asian' NOT NULL,
	"clothing_description" text NOT NULL,
	"facial_features" text NOT NULL,
	"voice_profile_id" uuid,
	"is_consent_verified" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "production_briefs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"raw_input_text" text NOT NULL,
	"raw_voice_asset_id" uuid,
	"genre" text DEFAULT 'comedy' NOT NULL,
	"emotional_tone" text DEFAULT 'conversational' NOT NULL,
	"target_audience" text NOT NULL,
	"core_message" text NOT NULL,
	"hook_strategy" text NOT NULL,
	"cta_type" text DEFAULT 'subscribe' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_uploaded_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"media_asset_id" uuid NOT NULL,
	"asset_role" text DEFAULT 'reference_image' NOT NULL,
	"label" text NOT NULL,
	"ai_prompt_directive" text,
	"target_scene_order" integer,
	"is_primary" boolean DEFAULT false NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scenes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storyboard_version_id" uuid NOT NULL,
	"scene_order" integer NOT NULL,
	"location_type" text DEFAULT 'interior' NOT NULL,
	"location_name" text NOT NULL,
	"atmosphere" text,
	"lighting" text,
	"camera_angle" text DEFAULT 'eye_level' NOT NULL,
	"camera_movement" text DEFAULT 'static' NOT NULL,
	"shot_type" text DEFAULT 'medium_close_up' NOT NULL,
	"duration_seconds" numeric NOT NULL,
	"dialogue_telugu" text NOT NULL,
	"dialogue_audio_cue" text,
	"visual_prompt" text NOT NULL,
	"negative_prompt" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "script_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"script_id" uuid NOT NULL,
	"version_number" integer DEFAULT 1 NOT NULL,
	"language" text DEFAULT 'te-IN' NOT NULL,
	"dialect_register" text DEFAULT 'conversational' NOT NULL,
	"full_telugu_text" text NOT NULL,
	"english_transliteration" text,
	"dialogue_breakdown" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scripts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"current_version_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"scene_id" uuid NOT NULL,
	"shot_order" integer NOT NULL,
	"shot_description" text NOT NULL,
	"reference_image_asset_id" uuid,
	"video_clip_asset_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "storyboard_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storyboard_id" uuid NOT NULL,
	"version_number" integer DEFAULT 1 NOT NULL,
	"total_scenes" integer DEFAULT 0 NOT NULL,
	"estimated_runtime_seconds" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "storyboards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"current_version_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"target_platform" text DEFAULT 'youtube_shorts' NOT NULL,
	"target_aspect_ratio" text DEFAULT '9:16' NOT NULL,
	"target_duration_seconds" integer DEFAULT 45 NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "asset_licenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"asset_id" uuid NOT NULL,
	"license_type" text NOT NULL,
	"source_provider" text,
	"attribution_text" text,
	"expires_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "media_assets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"folder_id" uuid,
	"file_name" text NOT NULL,
	"mime_type" text NOT NULL,
	"file_size_bytes" bigint NOT NULL,
	"storage_key" text NOT NULL,
	"storage_bucket" text NOT NULL,
	"asset_type" text NOT NULL,
	"duration_seconds" numeric,
	"width" integer,
	"height" integer,
	"md5_checksum" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"name" text NOT NULL,
	"parent_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "media_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"asset_id" uuid NOT NULL,
	"variant_name" text NOT NULL,
	"storage_key" text NOT NULL,
	"file_size_bytes" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_agent_artifacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_run_id" uuid NOT NULL,
	"artifact_type" text NOT NULL,
	"content" jsonb NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_agent_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"agent_id" uuid NOT NULL,
	"trigger_event" text NOT NULL,
	"status" text DEFAULT 'running' NOT NULL,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"duration_ms" integer,
	"cost_usd" numeric DEFAULT '0' NOT NULL,
	"error_message" text
);
--> statement-breakpoint
CREATE TABLE "ai_agent_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_run_id" uuid NOT NULL,
	"task_name" text NOT NULL,
	"input_payload" jsonb NOT NULL,
	"output_payload" jsonb,
	"retry_count" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_agents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agent_code" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"system_prompt" text NOT NULL,
	"provider_model" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_agents_agent_code_unique" UNIQUE("agent_code")
);
--> statement-breakpoint
CREATE TABLE "ai_skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"skill_code" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"tool_definitions" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "ai_skills_skill_code_unique" UNIQUE("skill_code")
);
--> statement-breakpoint
CREATE TABLE "generation_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"provider_name" text NOT NULL,
	"job_type" text NOT NULL,
	"external_job_id" text,
	"status" text DEFAULT 'queued' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "music_tracks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"genre" text NOT NULL,
	"mood" text NOT NULL,
	"tempo_bpm" integer,
	"duration_seconds" numeric NOT NULL,
	"audio_asset_id" uuid NOT NULL,
	"license_verified" text DEFAULT 'commercial_royalty_free' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sound_effects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"audio_asset_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generation_job_id" uuid NOT NULL,
	"scene_id" uuid NOT NULL,
	"model_id" text NOT NULL,
	"prompt_text" text NOT NULL,
	"generated_asset_id" uuid,
	"cost_usd" numeric DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voice_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"generation_job_id" uuid NOT NULL,
	"scene_id" uuid NOT NULL,
	"telugu_text" text NOT NULL,
	"voice_profile_id" uuid,
	"audio_asset_id" uuid,
	"speech_rate" numeric DEFAULT '1.0' NOT NULL,
	"pitch" numeric DEFAULT '0.0' NOT NULL,
	"emotion_tag" text DEFAULT 'conversational' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "render_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"render_preset_id" uuid,
	"worker_id" text,
	"status" text DEFAULT 'queued' NOT NULL,
	"progress_percent" integer DEFAULT 0 NOT NULL,
	"output_asset_id" uuid,
	"error_log" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "render_presets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"fps" integer DEFAULT 60 NOT NULL,
	"video_bitrate" text DEFAULT '8000k' NOT NULL,
	"audio_bitrate" text DEFAULT '320k' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeline_clips" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"track_id" uuid NOT NULL,
	"asset_id" uuid NOT NULL,
	"start_offset_seconds" numeric NOT NULL,
	"duration_seconds" numeric NOT NULL,
	"source_in_seconds" numeric DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timeline_tracks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"timeline_id" uuid NOT NULL,
	"track_type" text NOT NULL,
	"track_index" integer DEFAULT 0 NOT NULL,
	"volume" numeric DEFAULT '1.0' NOT NULL,
	"is_muted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_timelines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"duration_seconds" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instagram_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"social_account_id" uuid NOT NULL,
	"ig_user_id" text NOT NULL,
	"username" text NOT NULL,
	"is_business_account" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "instagram_accounts_ig_user_id_unique" UNIQUE("ig_user_id")
);
--> statement-breakpoint
CREATE TABLE "oauth_connection_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"social_account_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"status_code" integer,
	"message" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "oauth_credentials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"social_account_id" uuid NOT NULL,
	"encrypted_access_token" text NOT NULL,
	"encrypted_refresh_token" text NOT NULL,
	"token_expiry" timestamp with time zone,
	"token_scope" text NOT NULL,
	"iv" text NOT NULL,
	"tag" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "oauth_credentials_social_account_id_unique" UNIQUE("social_account_id")
);
--> statement-breakpoint
CREATE TABLE "published_videos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"publishing_job_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"platform_video_id" text NOT NULL,
	"platform_url" text NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publishing_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"social_account_id" uuid NOT NULL,
	"idempotency_key" text NOT NULL,
	"resumable_upload_url" text,
	"bytes_uploaded" bigint DEFAULT 0 NOT NULL,
	"total_bytes" bigint NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "publishing_jobs_idempotency_key_unique" UNIQUE("idempotency_key")
);
--> statement-breakpoint
CREATE TABLE "publishing_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"social_account_id" uuid NOT NULL,
	"scheduled_time" timestamp with time zone NOT NULL,
	"timezone" text DEFAULT 'Asia/Kolkata' NOT NULL,
	"status" text DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"platform" text NOT NULL,
	"platform_account_id" text NOT NULL,
	"account_name" text NOT NULL,
	"account_handle" text,
	"avatar_url" text,
	"status" text DEFAULT 'connected' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"youtube_title" text NOT NULL,
	"youtube_description" text NOT NULL,
	"tags" text[] NOT NULL,
	"category_id" text DEFAULT '24' NOT NULL,
	"privacy_status" text DEFAULT 'public' NOT NULL,
	"has_kids_content" boolean DEFAULT false NOT NULL,
	"pinned_comment" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "youtube_channels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"social_account_id" uuid NOT NULL,
	"channel_id" text NOT NULL,
	"title" text NOT NULL,
	"subscriber_count" integer DEFAULT 0 NOT NULL,
	"video_count" integer DEFAULT 0 NOT NULL,
	"default_privacy" text DEFAULT 'public' NOT NULL,
	"playlist_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "youtube_channels_channel_id_unique" UNIQUE("channel_id")
);
--> statement-breakpoint
CREATE TABLE "analytics_snapshots" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"social_account_id" uuid NOT NULL,
	"snapshot_date" date NOT NULL,
	"total_views" bigint DEFAULT 0 NOT NULL,
	"total_watch_time_hours" numeric DEFAULT '0' NOT NULL,
	"subscribers_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"published_video_id" uuid NOT NULL,
	"snapshot_timestamp" timestamp with time zone DEFAULT now() NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"comments" integer DEFAULT 0 NOT NULL,
	"shares" integer DEFAULT 0 NOT NULL,
	"average_view_duration_seconds" numeric DEFAULT '0' NOT NULL,
	"retention_rate_percent" numeric DEFAULT '0' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_usage_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid,
	"provider_name" text NOT NULL,
	"model_id" text NOT NULL,
	"tokens_input" integer DEFAULT 0 NOT NULL,
	"tokens_output" integer DEFAULT 0 NOT NULL,
	"duration_ms" integer DEFAULT 0 NOT NULL,
	"cost_usd" numeric DEFAULT '0' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid,
	"user_id" uuid,
	"action" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"metadata" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "automation_executions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"automation_rule_id" uuid NOT NULL,
	"project_id" uuid,
	"result_status" text NOT NULL,
	"log_details" jsonb NOT NULL,
	"executed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "automation_rules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"rule_name" text NOT NULL,
	"trigger_event" text NOT NULL,
	"action_type" text NOT NULL,
	"conditions" jsonb NOT NULL,
	"is_enabled" boolean DEFAULT true NOT NULL,
	"dry_run_mode" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cost_budgets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_id" uuid NOT NULL,
	"monthly_budget_usd" numeric DEFAULT '50.00' NOT NULL,
	"current_spend_usd" numeric DEFAULT '0.00' NOT NULL,
	"kill_switch_enabled" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text DEFAULT 'info' NOT NULL,
	"action_url" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "system_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL,
	"description" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roles" ADD CONSTRAINT "roles_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_consents" ADD CONSTRAINT "character_consents_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_consents" ADD CONSTRAINT "character_consents_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_references" ADD CONSTRAINT "character_references_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "character_references" ADD CONSTRAINT "character_references_asset_id_media_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "production_briefs" ADD CONSTRAINT "production_briefs_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "production_briefs" ADD CONSTRAINT "production_briefs_raw_voice_asset_id_media_assets_id_fk" FOREIGN KEY ("raw_voice_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_uploaded_assets" ADD CONSTRAINT "project_uploaded_assets_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_uploaded_assets" ADD CONSTRAINT "project_uploaded_assets_media_asset_id_media_assets_id_fk" FOREIGN KEY ("media_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_storyboard_version_id_storyboard_versions_id_fk" FOREIGN KEY ("storyboard_version_id") REFERENCES "public"."storyboard_versions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "script_versions" ADD CONSTRAINT "script_versions_script_id_scripts_id_fk" FOREIGN KEY ("script_id") REFERENCES "public"."scripts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scripts" ADD CONSTRAINT "scripts_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shots" ADD CONSTRAINT "shots_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shots" ADD CONSTRAINT "shots_reference_image_asset_id_media_assets_id_fk" FOREIGN KEY ("reference_image_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shots" ADD CONSTRAINT "shots_video_clip_asset_id_media_assets_id_fk" FOREIGN KEY ("video_clip_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "storyboard_versions" ADD CONSTRAINT "storyboard_versions_storyboard_id_storyboards_id_fk" FOREIGN KEY ("storyboard_id") REFERENCES "public"."storyboards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "storyboards" ADD CONSTRAINT "storyboards_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_projects" ADD CONSTRAINT "video_projects_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_projects" ADD CONSTRAINT "video_projects_creator_id_users_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asset_licenses" ADD CONSTRAINT "asset_licenses_asset_id_media_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_folder_id_media_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."media_folders"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_folders" ADD CONSTRAINT "media_folders_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_variants" ADD CONSTRAINT "media_variants_asset_id_media_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_agent_artifacts" ADD CONSTRAINT "ai_agent_artifacts_agent_run_id_ai_agent_runs_id_fk" FOREIGN KEY ("agent_run_id") REFERENCES "public"."ai_agent_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_agent_runs" ADD CONSTRAINT "ai_agent_runs_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_agent_runs" ADD CONSTRAINT "ai_agent_runs_agent_id_ai_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."ai_agents"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_agent_tasks" ADD CONSTRAINT "ai_agent_tasks_agent_run_id_ai_agent_runs_id_fk" FOREIGN KEY ("agent_run_id") REFERENCES "public"."ai_agent_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generation_jobs" ADD CONSTRAINT "generation_jobs_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "music_tracks" ADD CONSTRAINT "music_tracks_audio_asset_id_media_assets_id_fk" FOREIGN KEY ("audio_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sound_effects" ADD CONSTRAINT "sound_effects_audio_asset_id_media_assets_id_fk" FOREIGN KEY ("audio_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_generations" ADD CONSTRAINT "video_generations_generation_job_id_generation_jobs_id_fk" FOREIGN KEY ("generation_job_id") REFERENCES "public"."generation_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_generations" ADD CONSTRAINT "video_generations_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_generations" ADD CONSTRAINT "video_generations_generated_asset_id_media_assets_id_fk" FOREIGN KEY ("generated_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voice_generations" ADD CONSTRAINT "voice_generations_generation_job_id_generation_jobs_id_fk" FOREIGN KEY ("generation_job_id") REFERENCES "public"."generation_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voice_generations" ADD CONSTRAINT "voice_generations_scene_id_scenes_id_fk" FOREIGN KEY ("scene_id") REFERENCES "public"."scenes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "voice_generations" ADD CONSTRAINT "voice_generations_audio_asset_id_media_assets_id_fk" FOREIGN KEY ("audio_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "render_jobs" ADD CONSTRAINT "render_jobs_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "render_jobs" ADD CONSTRAINT "render_jobs_render_preset_id_render_presets_id_fk" FOREIGN KEY ("render_preset_id") REFERENCES "public"."render_presets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "render_jobs" ADD CONSTRAINT "render_jobs_output_asset_id_media_assets_id_fk" FOREIGN KEY ("output_asset_id") REFERENCES "public"."media_assets"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_track_id_timeline_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."timeline_tracks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_clips" ADD CONSTRAINT "timeline_clips_asset_id_media_assets_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."media_assets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timeline_tracks" ADD CONSTRAINT "timeline_tracks_timeline_id_video_timelines_id_fk" FOREIGN KEY ("timeline_id") REFERENCES "public"."video_timelines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_timelines" ADD CONSTRAINT "video_timelines_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "instagram_accounts" ADD CONSTRAINT "instagram_accounts_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_connection_logs" ADD CONSTRAINT "oauth_connection_logs_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oauth_credentials" ADD CONSTRAINT "oauth_credentials_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "published_videos" ADD CONSTRAINT "published_videos_publishing_job_id_publishing_jobs_id_fk" FOREIGN KEY ("publishing_job_id") REFERENCES "public"."publishing_jobs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publishing_jobs" ADD CONSTRAINT "publishing_jobs_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publishing_jobs" ADD CONSTRAINT "publishing_jobs_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publishing_schedules" ADD CONSTRAINT "publishing_schedules_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "publishing_schedules" ADD CONSTRAINT "publishing_schedules_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_accounts" ADD CONSTRAINT "social_accounts_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_metadata" ADD CONSTRAINT "video_metadata_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "youtube_channels" ADD CONSTRAINT "youtube_channels_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "analytics_snapshots" ADD CONSTRAINT "analytics_snapshots_social_account_id_social_accounts_id_fk" FOREIGN KEY ("social_account_id") REFERENCES "public"."social_accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_analytics" ADD CONSTRAINT "video_analytics_published_video_id_published_videos_id_fk" FOREIGN KEY ("published_video_id") REFERENCES "public"."published_videos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "api_usage_logs" ADD CONSTRAINT "api_usage_logs_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "automation_executions" ADD CONSTRAINT "automation_executions_automation_rule_id_automation_rules_id_fk" FOREIGN KEY ("automation_rule_id") REFERENCES "public"."automation_rules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "automation_executions" ADD CONSTRAINT "automation_executions_project_id_video_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."video_projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "automation_rules" ADD CONSTRAINT "automation_rules_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cost_budgets" ADD CONSTRAINT "cost_budgets_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_character_consents_character" ON "character_consents" USING btree ("character_id");--> statement-breakpoint
CREATE INDEX "idx_character_refs_character" ON "character_references" USING btree ("character_id");--> statement-breakpoint
CREATE INDEX "idx_character_refs_asset" ON "character_references" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "idx_characters_workspace" ON "characters" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "idx_production_briefs_project" ON "production_briefs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_proj_uploaded_assets_project" ON "project_uploaded_assets" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_proj_uploaded_assets_media" ON "project_uploaded_assets" USING btree ("media_asset_id");--> statement-breakpoint
CREATE INDEX "idx_proj_uploaded_assets_role" ON "project_uploaded_assets" USING btree ("asset_role");--> statement-breakpoint
CREATE INDEX "idx_scenes_storyboard_version" ON "scenes" USING btree ("storyboard_version_id");--> statement-breakpoint
CREATE INDEX "idx_scenes_order" ON "scenes" USING btree ("scene_order");--> statement-breakpoint
CREATE INDEX "idx_script_versions_script" ON "script_versions" USING btree ("script_id");--> statement-breakpoint
CREATE INDEX "idx_scripts_project" ON "scripts" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_shots_scene" ON "shots" USING btree ("scene_id");--> statement-breakpoint
CREATE INDEX "idx_storyboard_versions_storyboard" ON "storyboard_versions" USING btree ("storyboard_id");--> statement-breakpoint
CREATE INDEX "idx_storyboards_project" ON "storyboards" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_video_projects_workspace" ON "video_projects" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "idx_video_projects_creator" ON "video_projects" USING btree ("creator_id");--> statement-breakpoint
CREATE INDEX "idx_video_projects_status" ON "video_projects" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_video_projects_platform" ON "video_projects" USING btree ("target_platform");--> statement-breakpoint
CREATE INDEX "idx_video_projects_created_at" ON "video_projects" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_asset_licenses_asset" ON "asset_licenses" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "idx_media_assets_workspace" ON "media_assets" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "idx_media_assets_folder" ON "media_assets" USING btree ("folder_id");--> statement-breakpoint
CREATE INDEX "idx_media_assets_type" ON "media_assets" USING btree ("asset_type");--> statement-breakpoint
CREATE INDEX "idx_media_assets_created" ON "media_assets" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_media_folders_workspace" ON "media_folders" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "idx_media_folders_parent" ON "media_folders" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "idx_media_variants_asset" ON "media_variants" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "idx_media_variants_name" ON "media_variants" USING btree ("variant_name");--> statement-breakpoint
CREATE INDEX "idx_ai_agent_artifacts_run" ON "ai_agent_artifacts" USING btree ("agent_run_id");--> statement-breakpoint
CREATE INDEX "idx_ai_agent_artifacts_type" ON "ai_agent_artifacts" USING btree ("artifact_type");--> statement-breakpoint
CREATE INDEX "idx_ai_agent_runs_project" ON "ai_agent_runs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_ai_agent_runs_agent" ON "ai_agent_runs" USING btree ("agent_id");--> statement-breakpoint
CREATE INDEX "idx_ai_agent_runs_status" ON "ai_agent_runs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_ai_agent_tasks_run" ON "ai_agent_tasks" USING btree ("agent_run_id");--> statement-breakpoint
CREATE INDEX "idx_gen_jobs_project" ON "generation_jobs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_gen_jobs_status" ON "generation_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_gen_jobs_type" ON "generation_jobs" USING btree ("job_type");--> statement-breakpoint
CREATE INDEX "idx_music_tracks_asset" ON "music_tracks" USING btree ("audio_asset_id");--> statement-breakpoint
CREATE INDEX "idx_music_tracks_genre" ON "music_tracks" USING btree ("genre");--> statement-breakpoint
CREATE INDEX "idx_sound_effects_asset" ON "sound_effects" USING btree ("audio_asset_id");--> statement-breakpoint
CREATE INDEX "idx_sound_effects_cat" ON "sound_effects" USING btree ("category");--> statement-breakpoint
CREATE INDEX "idx_video_gens_job" ON "video_generations" USING btree ("generation_job_id");--> statement-breakpoint
CREATE INDEX "idx_video_gens_scene" ON "video_generations" USING btree ("scene_id");--> statement-breakpoint
CREATE INDEX "idx_voice_gens_job" ON "voice_generations" USING btree ("generation_job_id");--> statement-breakpoint
CREATE INDEX "idx_voice_gens_scene" ON "voice_generations" USING btree ("scene_id");--> statement-breakpoint
CREATE INDEX "idx_render_jobs_project" ON "render_jobs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_render_jobs_status" ON "render_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_timeline_clips_track" ON "timeline_clips" USING btree ("track_id");--> statement-breakpoint
CREATE INDEX "idx_timeline_clips_asset" ON "timeline_clips" USING btree ("asset_id");--> statement-breakpoint
CREATE INDEX "idx_timeline_tracks_timeline" ON "timeline_tracks" USING btree ("timeline_id");--> statement-breakpoint
CREATE INDEX "idx_video_timelines_project" ON "video_timelines" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_ig_accounts_social" ON "instagram_accounts" USING btree ("social_account_id");--> statement-breakpoint
CREATE INDEX "idx_oauth_logs_social" ON "oauth_connection_logs" USING btree ("social_account_id");--> statement-breakpoint
CREATE INDEX "idx_oauth_creds_social" ON "oauth_credentials" USING btree ("social_account_id");--> statement-breakpoint
CREATE INDEX "idx_published_videos_job" ON "published_videos" USING btree ("publishing_job_id");--> statement-breakpoint
CREATE INDEX "idx_published_videos_platform" ON "published_videos" USING btree ("platform");--> statement-breakpoint
CREATE INDEX "idx_pub_jobs_project" ON "publishing_jobs" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_pub_jobs_social" ON "publishing_jobs" USING btree ("social_account_id");--> statement-breakpoint
CREATE INDEX "idx_pub_jobs_status" ON "publishing_jobs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_pub_schedules_project" ON "publishing_schedules" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_pub_schedules_social" ON "publishing_schedules" USING btree ("social_account_id");--> statement-breakpoint
CREATE INDEX "idx_pub_schedules_time" ON "publishing_schedules" USING btree ("scheduled_time");--> statement-breakpoint
CREATE INDEX "idx_social_accounts_workspace" ON "social_accounts" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "idx_social_accounts_platform" ON "social_accounts" USING btree ("platform");--> statement-breakpoint
CREATE INDEX "idx_video_meta_project" ON "video_metadata" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "idx_yt_channels_social" ON "youtube_channels" USING btree ("social_account_id");