import { pgTable, uuid, text, timestamp, date, bigint, integer, numeric } from "drizzle-orm/pg-core";
import { socialAccounts, publishedVideos } from "./publishing";

export const analyticsSnapshots = pgTable("analytics_snapshots", {
  id: uuid("id").defaultRandom().primaryKey(),
  socialAccountId: uuid("social_account_id").references(() => socialAccounts.id, { onDelete: "cascade" }).notNull(),
  snapshotDate: date("snapshot_date").notNull(),
  totalViews: bigint("total_views", { mode: "number" }).default(0).notNull(),
  totalWatchTimeHours: numeric("total_watch_time_hours").default("0").notNull(),
  subscribersCount: integer("subscribers_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const videoAnalytics = pgTable("video_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  publishedVideoId: uuid("published_video_id").references(() => publishedVideos.id, { onDelete: "cascade" }).notNull(),
  snapshotTimestamp: timestamp("snapshot_timestamp", { withTimezone: true }).defaultNow().notNull(),
  views: integer("views").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  comments: integer("comments").default(0).notNull(),
  shares: integer("shares").default(0).notNull(),
  averageViewDurationSeconds: numeric("average_view_duration_seconds").default("0").notNull(),
  retentionRatePercent: numeric("retention_rate_percent").default("0").notNull(),
});

