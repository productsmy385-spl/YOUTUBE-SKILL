import { relations } from "drizzle-orm";
import { users, workspaces, userSessions, roles, permissions, rolePermissions } from "./auth";
import {
  videoProjects,
  productionBriefs,
  projectUploadedAssets,
  scripts,
  scriptVersions,
  storyboards,
  storyboardVersions,
  scenes,
  shots,
  characters,
  characterReferences,
  characterConsents,
} from "./projects";
import { mediaAssets, mediaFolders, mediaVariants, assetLicenses } from "./media";
import { generationJobs, videoGenerations, voiceGenerations, musicTracks, soundEffects } from "./generation";
import { renderPresets, renderJobs, videoTimelines, timelineTracks } from "./rendering";
import {
  socialAccounts,
  youtubeChannels,
  instagramAccounts,
  oauthCredentials,
  publishingSchedules,
  publishingJobs,
  publishedVideos,
} from "./publishing";
import { aiAgents, aiAgentRuns, aiAgentTasks, aiAgentArtifacts } from "./agents";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(userSessions),
  ownedWorkspaces: many(workspaces),
  createdProjects: many(videoProjects),
}));

export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, { fields: [workspaces.ownerId], references: [users.id] }),
  projects: many(videoProjects),
  mediaAssets: many(mediaAssets),
  characters: many(characters),
  socialAccounts: many(socialAccounts),
  roles: many(roles),
}));

export const videoProjectsRelations = relations(videoProjects, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [videoProjects.workspaceId], references: [workspaces.id] }),
  creator: one(users, { fields: [videoProjects.creatorId], references: [users.id] }),
  briefs: many(productionBriefs),
  uploadedAssets: many(projectUploadedAssets),
  scripts: many(scripts),
  storyboards: many(storyboards),
  generationJobs: many(generationJobs),
  renderJobs: many(renderJobs),
  timelines: many(videoTimelines),
  publishingSchedules: many(publishingSchedules),
  agentRuns: many(aiAgentRuns),
}));

export const projectUploadedAssetsRelations = relations(projectUploadedAssets, ({ one }) => ({
  project: one(videoProjects, { fields: [projectUploadedAssets.projectId], references: [videoProjects.id] }),
  mediaAsset: one(mediaAssets, { fields: [projectUploadedAssets.mediaAssetId], references: [mediaAssets.id] }),
}));

export const mediaAssetsRelations = relations(mediaAssets, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [mediaAssets.workspaceId], references: [workspaces.id] }),
  folder: one(mediaFolders, { fields: [mediaAssets.folderId], references: [mediaFolders.id] }),
  variants: many(mediaVariants),
  license: one(assetLicenses, { fields: [mediaAssets.id], references: [assetLicenses.assetId] }),
  projectUploads: many(projectUploadedAssets),
}));

export const scriptsRelations = relations(scripts, ({ one, many }) => ({
  project: one(videoProjects, { fields: [scripts.projectId], references: [videoProjects.id] }),
  versions: many(scriptVersions),
}));

export const storyboardsRelations = relations(storyboards, ({ one, many }) => ({
  project: one(videoProjects, { fields: [storyboards.projectId], references: [videoProjects.id] }),
  versions: many(storyboardVersions),
}));

export const storyboardVersionsRelations = relations(storyboardVersions, ({ one, many }) => ({
  storyboard: one(storyboards, { fields: [storyboardVersions.storyboardId], references: [storyboards.id] }),
  scenes: many(scenes),
}));

export const scenesRelations = relations(scenes, ({ one, many }) => ({
  storyboardVersion: one(storyboardVersions, { fields: [scenes.storyboardVersionId], references: [storyboardVersions.id] }),
  shots: many(shots),
  videoGenerations: many(videoGenerations),
  voiceGenerations: many(voiceGenerations),
}));

export const charactersRelations = relations(characters, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [characters.workspaceId], references: [workspaces.id] }),
  references: many(characterReferences),
  consents: many(characterConsents),
}));

export const aiAgentRunsRelations = relations(aiAgentRuns, ({ one, many }) => ({
  project: one(videoProjects, { fields: [aiAgentRuns.projectId], references: [videoProjects.id] }),
  agent: one(aiAgents, { fields: [aiAgentRuns.agentId], references: [aiAgents.id] }),
  tasks: many(aiAgentTasks),
  artifacts: many(aiAgentArtifacts),
}));

export const socialAccountsRelations = relations(socialAccounts, ({ one, many }) => ({
  workspace: one(workspaces, { fields: [socialAccounts.workspaceId], references: [workspaces.id] }),
  youtubeChannel: one(youtubeChannels, { fields: [socialAccounts.id], references: [youtubeChannels.socialAccountId] }),
  instagramAccount: one(instagramAccounts, { fields: [socialAccounts.id], references: [instagramAccounts.socialAccountId] }),
  credentials: one(oauthCredentials, { fields: [socialAccounts.id], references: [oauthCredentials.socialAccountId] }),
  schedules: many(publishingSchedules),
}));
