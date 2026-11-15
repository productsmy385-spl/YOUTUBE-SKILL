import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb, index } from "drizzle-orm/pg-core";
import { videoProjects } from "./projects";

export const aiAgents = pgTable("ai_agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  agentCode: text("agent_code").notNull().unique(), // orchestrator, script_writer, film_director, gemini_video, etc.
  name: text("name").notNull(),
  description: text("description").notNull(),
  systemPrompt: text("system_prompt").notNull(),
  providerModel: text("provider_model").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiSkills = pgTable("ai_skills", {
  id: uuid("id").defaultRandom().primaryKey(),
  skillCode: text("skill_code").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  toolDefinitions: jsonb("tool_definitions").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiAgentRuns = pgTable(
  "ai_agent_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => videoProjects.id, { onDelete: "cascade" })
      .notNull(),
    agentId: uuid("agent_id")
      .references(() => aiAgents.id, { onDelete: "restrict" })
      .notNull(),
    triggerEvent: text("trigger_event").notNull(), // user_prompt, workflow_step, regeneration
    status: text("status", { enum: ["running", "completed", "failed", "cancelled"] })
      .default("running")
      .notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    durationMs: integer("duration_ms"),
    costUsd: numeric("cost_usd").default("0").notNull(),
    errorMessage: text("error_message"),
  },
  (table) => [
    index("idx_ai_agent_runs_project").on(table.projectId),
    index("idx_ai_agent_runs_agent").on(table.agentId),
    index("idx_ai_agent_runs_status").on(table.status),
  ]
);

export const aiAgentTasks = pgTable(
  "ai_agent_tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    agentRunId: uuid("agent_run_id")
      .references(() => aiAgentRuns.id, { onDelete: "cascade" })
      .notNull(),
    taskName: text("task_name").notNull(),
    inputPayload: jsonb("input_payload").notNull(),
    outputPayload: jsonb("output_payload"),
    retryCount: integer("retry_count").default(0).notNull(),
    status: text("status", { enum: ["pending", "executing", "succeeded", "failed"] })
      .default("pending")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_ai_agent_tasks_run").on(table.agentRunId),
  ]
);

export const aiAgentArtifacts = pgTable(
  "ai_agent_artifacts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    agentRunId: uuid("agent_run_id")
      .references(() => aiAgentRuns.id, { onDelete: "cascade" })
      .notNull(),
    artifactType: text("artifact_type", {
      enum: ["concept_brief", "telugu_script", "storyboard_json", "character_bible", "audio_spec", "qc_report"],
    }).notNull(),
    content: jsonb("content").notNull(),
    version: integer("version").default(1).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("idx_ai_agent_artifacts_run").on(table.agentRunId),
    index("idx_ai_agent_artifacts_type").on(table.artifactType),
  ]
);
