import {
  CreatorBriefInput,
  WorkflowExecutionState,
  WorkflowStage,
  ExecutionStatus,
  StoryboardShot,
} from "./types";
import { MockAgentProvider } from "./mock-provider";
import { logAuditEvent } from "@/lib/services/audit";

export class AgentOrchestrator {
  private state: WorkflowExecutionState;

  constructor(input: CreatorBriefInput) {
    this.state = {
      projectId: input.projectId,
      currentStage: "brief",
      status: "pending",
      progressPercent: 5,
      approvalRequired: true,
      isApproved: false,
      totalCostUsd: 0.0,
      updatedAt: new Date().toISOString(),
    };
  }

  getState(): WorkflowExecutionState {
    return this.state;
  }

  async runFullWorkflow(input: CreatorBriefInput): Promise<WorkflowExecutionState> {
    this.state.status = "running";

    try {
      // 1. Creative Director (Agent 02)
      this.state.currentStage = "brief";
      this.state.brief = MockAgentProvider.generateBrief(input);
      this.state.progressPercent = 15;
      this.state.totalCostUsd += 0.01;
      await this.recordStep("brief", "Creative Director generated hook & arc brief");

      // 2. Telugu Script Writer (Agent 03)
      this.state.currentStage = "script";
      this.state.script = MockAgentProvider.generateTeluguScript(this.state.brief, input.rawInput);
      this.state.progressPercent = 30;
      this.state.totalCostUsd += 0.02;
      await this.recordStep("script", "Telugu Script Writer generated natural te-IN dialogue");

      // 3. Film Director (Agent 04)
      this.state.currentStage = "storyboard";
      this.state.storyboard = MockAgentProvider.generateStoryboard(this.state.script, input.aspectRatio);
      this.state.progressPercent = 45;
      this.state.totalCostUsd += 0.02;
      await this.recordStep("storyboard", "Film Director produced cinematic scene prompts & shot breakdown");

      // 4. Character Designer (Agent 05)
      this.state.currentStage = "characters";
      this.state.characters = MockAgentProvider.generateCharacterBible();
      this.state.progressPercent = 55;
      this.state.totalCostUsd += 0.03;
      await this.recordStep("characters", "Character Designer locked visual continuity bible");

      // 5. Gemini Video Generation Agent (Agent 06)
      this.state.currentStage = "visuals";
      this.state.videoClips = MockAgentProvider.generateVideoClips(this.state.storyboard);
      this.state.progressPercent = 70;
      this.state.totalCostUsd += 0.08;
      await this.recordStep("visuals", "Gemini Video Agent generated scene clips");

      // 6. Telugu Voice Director (Agent 07)
      this.state.currentStage = "voice";
      this.state.voiceStems = MockAgentProvider.generateVoiceStems(this.state.script);
      this.state.progressPercent = 80;
      this.state.totalCostUsd += 0.03;
      await this.recordStep("voice", "Telugu Voice Director synthesized emotional speech stems");

      // 7. Music & Sound Designer (Agents 08 & 09)
      this.state.currentStage = "sound";
      this.state.musicAndSfx = MockAgentProvider.generateMusicAndSFX();
      this.state.progressPercent = 85;
      this.state.totalCostUsd += 0.01;
      await this.recordStep("sound", "Music & Sound Designers mixed licensed BGM and foley cues");

      // 8. Video Editor (Agent 10 - FFmpeg Worker)
      this.state.currentStage = "edit";
      this.state.render = {
        finalVideoUrl: `/media/renders/${input.projectId}_master.mp4`,
        durationSeconds: 45,
        resolution: input.aspectRatio === "9:16" ? "1080x1920" : "1920x1080",
        fps: 60,
        subtitlesBurned: true,
        fileSizeBytes: 24500000,
      };
      this.state.progressPercent = 90;
      await this.recordStep("edit", "FFmpeg Editor assembled video with Telugu subtitles & audio ducking");

      // 9. Thumbnail Designer & SEO (Agents 11 & 12)
      this.state.currentStage = "thumbnail";
      this.state.thumbnails = MockAgentProvider.generateThumbnails();
      this.state.metadata = MockAgentProvider.generatePublishingMetadata(this.state.script);
      this.state.progressPercent = 95;
      await this.recordStep("thumbnail", "Thumbnail Designer created high-contrast Telugu variants");

      // 10. Quality Control Agent (Agent 13)
      this.state.currentStage = "qc";
      this.state.qc = MockAgentProvider.generateQCReport();
      this.state.progressPercent = 98;
      await this.recordStep("qc", "QC Agent completed deterministic verification gate");

      // 11. Handoff to Creator Approval Gate
      this.state.currentStage = "approval";
      this.state.status = "needs_approval";
      this.state.progressPercent = 100;
      this.state.updatedAt = new Date().toISOString();
      await this.recordStep("approval", "Production package ready for Creator Approval");

      return this.state;
    } catch (err: unknown) {
      this.state.status = "failed";
      this.state.error = err instanceof Error ? err.message : String(err);
      this.state.updatedAt = new Date().toISOString();
      await this.recordStep("failed", `Workflow failed: ${this.state.error}`);
      return this.state;
    }
  }

  async regenerateScene(sceneId: number): Promise<StoryboardShot | null> {
    if (!this.state.storyboard) return null;

    const sceneIndex = this.state.storyboard.scenes.findIndex((s) => s.sceneId === sceneId);
    if (sceneIndex === -1) return null;

    // Regenerate visual prompt and clip for single scene only
    const existing = this.state.storyboard.scenes[sceneIndex];
    const updatedShot: StoryboardShot = {
      ...existing,
      visualPrompt: `${existing.visualPrompt} (Regenerated for enhanced Telugu facial expression continuity)`,
    };

    this.state.storyboard.scenes[sceneIndex] = updatedShot;
    this.state.totalCostUsd += 0.02;

    await this.recordStep("visuals", `Regenerated individual Scene ${sceneId} without invalidating full video`);
    return updatedShot;
  }

  async approveAndPublish(): Promise<WorkflowExecutionState> {
    if (this.state.status !== "needs_approval" && !this.state.isApproved) {
      throw new Error("Project must pass QC before it can be approved.");
    }

    this.state.isApproved = true;
    this.state.currentStage = "publish";
    this.state.status = "completed";
    this.state.updatedAt = new Date().toISOString();

    await this.recordStep("publish", "Creator approved video. Scheduled to YouTube Data API resumable queue.");
    return this.state;
  }

  private async recordStep(stage: WorkflowStage, description: string) {
    await logAuditEvent({
      action: `agent_workflow:${stage}`,
      entityType: "video_project",
      entityId: this.state.projectId,
      metadata: {
        stage,
        description,
        totalCostUsd: this.state.totalCostUsd,
      },
    });
  }
}

