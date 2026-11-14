export type AgentId =
  | "orchestrator"
  | "creative_director"
  | "telugu_script_writer"
  | "film_director"
  | "character_designer"
  | "gemini_video"
  | "telugu_voice"
  | "music_director"
  | "sound_designer"
  | "video_editor"
  | "thumbnail_designer"
  | "seo_metadata"
  | "quality_control"
  | "youtube_ops"
  | "instagram_ops"
  | "analytics_agent";

export type WorkflowStage =
  | "brief"
  | "script"
  | "storyboard"
  | "characters"
  | "visuals"
  | "voice"
  | "sound"
  | "edit"
  | "thumbnail"
  | "qc"
  | "approval"
  | "publish"
  | "completed"
  | "failed";

export type ExecutionStatus = "pending" | "running" | "completed" | "failed" | "needs_approval" | "cancelled";

export interface AgentMetadata {
  id: AgentId;
  name: string;
  agentNumber: string;
  role: string;
  description: string;
  provider: "gemini" | "elevenlabs" | "ffmpeg" | "youtube" | "meta" | "mock";
  model: string;
  timeoutSeconds: number;
  maxRetries: number;
  costPerRunUsd: number;
}

export interface CreatorBriefInput {
  projectId: string;
  title: string;
  rawInput: string;
  inputLanguage: "te" | "en" | "mixed";
  platform: "youtube_shorts" | "instagram_reels" | "youtube_long";
  aspectRatio: "9:16" | "16:9" | "1:1";
  targetDurationSeconds: number;
  genre: string;
  emotionalTone: string;
  voiceRegister: string;
}

export interface ProductionBriefArtifact {
  oneLineConcept: string;
  hookThreeSeconds: string;
  genre: string;
  emotionalArc: string;
  targetAudience: string;
  endingPayoff: string;
  callToAction: string;
  directorialNotes: string;
}

export interface SceneDialogue {
  sceneId: number;
  speaker: string;
  dialogueTelugu: string;
  englishMeaning: string;
  pronunciationNotes?: string;
  emotionCue: string;
  pauseAfterSeconds: number;
}

export interface TeluguScriptArtifact {
  title: string;
  totalScenes: number;
  dialogueScenes: SceneDialogue[];
  fullTeluguText: string;
  dialectRegister: string;
  grammarVerified: boolean;
}

export interface StoryboardShot {
  sceneId: number;
  sceneNumber: string;
  location: string;
  shotType: string;
  cameraMovement: string;
  lighting: string;
  atmosphere: string;
  durationSeconds: number;
  visualPrompt: string;
  negativePrompt: string;
  dialogueTelugu: string;
  emotion: string;
  characterAction: string;
}

export interface StoryboardArtifact {
  scenes: StoryboardShot[];
  totalRuntimeSeconds: number;
  aspectRatio: string;
  visualStyle: string;
}

export interface CharacterProfile {
  id: string;
  name: string;
  gender: string;
  age: string;
  appearance: string;
  clothing: string;
  facialFeatures: string;
  voiceProfile: string;
  referenceImages: string[];
}

export interface CharacterBibleArtifact {
  characters: CharacterProfile[];
  continuityRules: string[];
}

export interface VideoClipArtifact {
  sceneId: number;
  assetUrl: string;
  providerJobId: string;
  durationSeconds: number;
  status: "ready" | "failed";
}

export interface VoiceStemArtifact {
  sceneId: number;
  audioUrl: string;
  durationSeconds: number;
  sampleRate: number;
  emotionTag: string;
  normalizedLufs: number;
}

export interface MusicAndSFXArtifact {
  bgmAudioUrl: string;
  bgmTitle: string;
  licenseStatus: string;
  duckingLevelDb: number;
  sfxCues: { timestamp: number; name: string; url: string }[];
}

export interface RenderOutputArtifact {
  finalVideoUrl: string;
  durationSeconds: number;
  resolution: string;
  fps: number;
  subtitlesBurned: boolean;
  fileSizeBytes: number;
}

export interface ThumbnailArtifact {
  thumbnailUrl: string;
  conceptName: string;
  teluguHeadline: string;
  contrastScore: number;
}

export interface QCIssue {
  severity: "critical" | "warning" | "info";
  category: string;
  description: string;
  timestampSeconds?: number;
}

export interface QCReportArtifact {
  passed: boolean;
  scorePercent: number;
  checks: { name: string; passed: boolean; message: string }[];
  issues: QCIssue[];
}

export interface PublishingMetadataArtifact {
  youtubeTitle: string;
  youtubeDescription: string;
  tags: string[];
  pinnedComment: string;
  category: string;
  privacy: "public" | "unlisted" | "private";
}

export interface WorkflowExecutionState {
  projectId: string;
  currentStage: WorkflowStage;
  status: ExecutionStatus;
  progressPercent: number;
  brief?: ProductionBriefArtifact;
  script?: TeluguScriptArtifact;
  storyboard?: StoryboardArtifact;
  characters?: CharacterBibleArtifact;
  videoClips?: VideoClipArtifact[];
  voiceStems?: VoiceStemArtifact[];
  musicAndSfx?: MusicAndSFXArtifact;
  render?: RenderOutputArtifact;
  thumbnails?: ThumbnailArtifact[];
  qc?: QCReportArtifact;
  metadata?: PublishingMetadataArtifact;
  approvalRequired: boolean;
  isApproved: boolean;
  error?: string;
  totalCostUsd: number;
  updatedAt: string;
}

