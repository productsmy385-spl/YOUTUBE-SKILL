import { pgTable, uuid, text, timestamp, boolean, integer, numeric, jsonb } from "drizzle-orm/pg-core";
import { workspaces, users } from "./auth";
import { videoProjects } from "./projects";

export const automationRules = pgTable("automation_rules", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  ruleName: text("rule_name").notNull(),
  triggerEvent: text("trigger_event", {
    enum: ["qc_passed_and_approved", "daily_time_slot", "video_rendered", "upload_failed"],
  }).notNull(),
  actionType: text("action_type", {
    enum: ["schedule_for_next_slot", "send_notification", "publish_immediately", "trigger_retry"],
  }).notNull(),
  conditions: jsonb("conditions").notNull(),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  dryRunMode: boolean("dry_run_mode").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const automationExecutions = pgTable("automation_executions", {
  id: uuid("id").defaultRandom().primaryKey(),
  automationRuleId: uuid("automation_rule_id").references(() => automationRules.id, { onDelete: "cascade" }).notNull(),
  projectId: uuid("project_id").references(() => videoProjects.id, { onDelete: "set null" }),
  resultStatus: text("result_status", { enum: ["success", "skipped", "failed"] }).notNull(),
  logDetails: jsonb("log_details").notNull(),
  executedAt: timestamp("executed_at", { withTimezone: true }).defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type", { enum: ["info", "success", "warning", "error"] }).default("info").notNull(),
  actionUrl: text("action_url"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(), // publish_video, approve_qc, delete_project, oauth_connected
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  metadata: jsonb("metadata").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const apiUsageLogs = pgTable("api_usage_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }),
  providerName: text("provider_name").notNull(),
  modelId: text("model_id").notNull(),
  tokensInput: integer("tokens_input").default(0).notNull(),
  tokensOutput: integer("tokens_output").default(0).notNull(),
  durationMs: integer("duration_ms").default(0).notNull(),
  costUsd: numeric("cost_usd").default("0").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const costBudgets = pgTable("cost_budgets", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }).notNull(),
  monthlyBudgetUsd: numeric("monthly_budget_usd").default("50.00").notNull(),
  currentSpendUsd: numeric("current_spend_usd").default("0.00").notNull(),
  killSwitchEnabled: boolean("kill_switch_enabled").default(false).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const systemSettings = pgTable("system_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

