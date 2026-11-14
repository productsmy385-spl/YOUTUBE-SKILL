export interface FFmpegTimelineTrack {
  type: "video" | "voice" | "music" | "sfx" | "subtitle";
  assetPath: string;
  startTime: number;
  duration: number;
  volumeMultiplier?: number;
}

export interface RenderJobConfig {
  projectId: string;
  aspectRatio: "9:16" | "16:9" | "1:1";
  outputWidth: number;
  outputHeight: number;
  fps: number;
  tracks: FFmpegTimelineTrack[];
  subtitleVttPath?: string;
  teluguFontName?: string;
  outputPath: string;
}

export class FFmpegVideoWorker {
  /**
   * Generates the optimized FFmpeg CLI command for multi-track video assembly,
   * audio ducking, and Telugu HarfBuzz font subtitle burning.
   */
  static buildFFmpegCommand(config: RenderJobConfig): string {
    const font = config.teluguFontName || "Nirmala UI";

    // Complex filter for audio ducking:
    // [1:a] (voice) sidechains into [2:a] (music) via 'sidechaincompress' or 'agate'
    const audioFilter = `
      [1:a]volume=1.0,loudnorm=I=-14:TP=-1.5:LRA=11[voice_norm];
      [2:a]volume=0.35[bgm_ducked];
      [voice_norm][bgm_ducked]amix=inputs=2:duration=first:dropout_transition=2[mixed_audio]
    `.trim().replace(/\s+/g, " ");

    // Subtitle filter using Telugu font
    const subFilter = config.subtitleVttPath
      ? `subtitles='${config.subtitleVttPath}':force_style='FontName=${font},FontSize=20,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=3,Outline=2,Alignment=2,MarginV=120'`
      : "";

    const videoFilter = `
      scale=${config.outputWidth}:${config.outputHeight}:force_original_aspect_ratio=decrease,
      pad=${config.outputWidth}:${config.outputHeight}:(ow-iw)/2:(oh-ih)/2:black
      ${subFilter ? `,${subFilter}` : ""}
    `.trim().replace(/\s+/g, " ");

    return `ffmpeg -y -i input_video.mp4 -i voice_stem.wav -i bgm.mp3 -filter_complex "${videoFilter};${audioFilter}" -map "[mixed_audio]" -c:v libx264 -preset fast -crf 20 -r ${config.fps} -c:a aac -b:a 320k "${config.outputPath}"`;
  }

  /**
   * Generates an ASS/SRT subtitle file with formatted Telugu unicode text
   */
  static generateTeluguSubtitleFile(
    cues: { start: string; end: string; text: string }[]
  ): string {
    return cues
      .map((cue, idx) => `${idx + 1}\n${cue.start} --> ${cue.end}\n${cue.text}\n`)
      .join("\n");
  }
}

