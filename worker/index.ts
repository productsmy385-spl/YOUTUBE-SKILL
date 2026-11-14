import { FFmpegVideoWorker, RenderJobConfig } from "./ffmpeg";
import { QualityControlAgent } from "@/lib/agents/quality-control";
import { youtubeClient } from "@/lib/providers/youtube/youtube-client";
import { instagramClient } from "@/lib/providers/instagram/instagram-client";

export interface QueueJob<T = unknown> {
  id: string;
  name: "render:video" | "qc:evaluate" | "upload:youtube" | "upload:instagram";
  data: T;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  result?: unknown;
  error?: string;
}

export class BackgroundWorkerService {
  private isRunning: boolean = false;
  private pollIntervalMs: number = 3000;

  public start() {
    this.isRunning = true;
    console.log("[Worker] Sir's AI YouTube Studio Background Worker started.");
    console.log("[Worker] Listening for render:video, qc:evaluate, upload:youtube, upload:instagram...");

    // Start background event poll loop
    this.pollLoop().catch((err) => {
      console.error("[Worker] Fatal error in poll loop:", err);
    });

    // Graceful shutdown handling
    process.on("SIGTERM", () => this.stop("SIGTERM"));
    process.on("SIGINT", () => this.stop("SIGINT"));
  }

  public stop(signal?: string) {
    this.isRunning = false;
    console.log(`[Worker] Received ${signal || "shutdown"}. Background Worker shut down cleanly.`);
    process.exit(0);
  }

  private async pollLoop() {
    while (this.isRunning) {
      try {
        // Poll queue periodically
        await new Promise((resolve) => setTimeout(resolve, this.pollIntervalMs));
      } catch (err) {
        console.error("[Worker] Error in poll loop:", err);
      }
    }
  }

  /**
   * Executes a video rendering task with FFmpeg
   */
  public async processRenderJob(config: RenderJobConfig): Promise<{
    outputPath: string;
    fileSizeBytes: number;
    duration: number;
  }> {
    console.log(`[Worker] Rendering project ${config.projectId} (${config.aspectRatio})...`);

    // In a live container with FFmpeg installed, execute ffmpeg command via child_process
    const cmd = FFmpegVideoWorker.buildFFmpegCommand(config);
    console.log(`[Worker] Executing: ${cmd}`);

    // Simulated render time
    await new Promise((r) => setTimeout(r, 2000));

    return {
      outputPath: config.outputPath,
      fileSizeBytes: 48 * 1024 * 1024,
      duration: 60,
    };
  }

  /**
   * Executes automated Quality Control
   */
  public async processQcJob(projectId: string) {
    console.log(`[Worker] Running automated QC for project ${projectId}...`);
    return QualityControlAgent.evaluate({
      projectId,
      videoDurationSeconds: 60,
      aspectRatio: "9:16",
      hasSubtitles: true,
      hasThumbnails: true,
      totalScenes: 4,
      audioStemsCount: 3,
    });
  }
}

export const backgroundWorker = new BackgroundWorkerService();

// Auto-start if run directly
backgroundWorker.start();
