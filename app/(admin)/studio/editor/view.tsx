"use client";

import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clapperboard,
  Download,
  Film,
  Layers,
  Mic,
  Music,
  Pause,
  Play,
  Scissors,
  Share2,
  Sparkles,
  Subtitles,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function TimelineEditorView() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("00:18.4");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Timeline Video Editor"
        description="Agent 10 (Video Editor) stitches scenes, synchronizes emotional Telugu voice stems, ducks background scores, and burns Telugu unicode subtitles using Railway FFmpeg workers."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/thumbnails">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>Thumbnail Studio</span>
              </Button>
            </Link>
            <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
              <Scissors className="h-4 w-4" />
              <span>Export Render (FFmpeg)</span>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: 9:16 Video Canvas Preview */}
        <div className="space-y-4 lg:col-span-1">
          <Card className="border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="text-xs font-bold text-foreground font-mono">9:16 SHORTS PREVIEW</span>
              <Badge variant="brand" className="text-[10px]">1080x1920 (60 FPS)</Badge>
            </div>

            {/* Video Player Frame */}
            <div className="aspect-[9/16] w-full max-w-[280px] mx-auto mt-3 rounded-xl bg-black flex flex-col justify-between p-4 text-white relative overflow-hidden border border-border shadow-modal group">
              <div className="flex items-center justify-between z-10">
                <span className="rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono text-white/80">
                  {currentTime} / 00:45.0
                </span>
                <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              </div>

              {/* Center Play Button Overlay */}
              <div className="flex items-center justify-center my-auto z-10">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-modal transition-transform group-hover:scale-110 active:scale-95"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                </button>
              </div>

              {/* Burned Telugu Subtitles */}
              <div className="z-10 bg-black/80 backdrop-blur-xs p-2.5 rounded-lg text-center border border-white/10 mb-2">
                <p className="text-xs font-bold text-white font-sans leading-relaxed">
                  &quot;నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు?&quot;
                </p>
                <p className="text-[10px] text-white/60 font-mono mt-0.5">
                  (Namaste sir! When did you arrive?)
                </p>
              </div>
            </div>

            {/* Player Transport Controls */}
            <div className="flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border">
              <Button
                variant={isPlaying ? "destructive" : "default"}
                size="sm"
                className="w-full gap-2 font-bold"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? "Pause Timeline" : "Play Timeline"}</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Multi-Track Timeline */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Multi-Track Synchronized Timeline</CardTitle>
                <span className="font-mono text-xs font-bold text-primary">00:45.000 Total</span>
              </div>
              <CardDescription>
                Live preview of video scenes, Telugu dialogue stems, ducked music, and subtitles.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-1">
              {/* Track 1: Video Scenes */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Film className="h-3.5 w-3.5 text-primary" />
                    <span>TRACK 1: Video Cuts (Veo 9:16)</span>
                  </span>
                  <span className="font-mono">4 Scenes</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-12 bg-muted/60 rounded-lg p-1 border border-border">
                  {["Scene 1 (9.5s)", "Scene 2 (11s)", "Scene 3 (13.5s)", "Scene 4 (11s)"].map((s, i) => (
                    <div
                      key={i}
                      className="rounded bg-primary/20 border border-primary/40 flex items-center justify-center text-2xs font-bold text-primary px-1 truncate"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Track 2: Telugu Voice Stems */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Mic className="h-3.5 w-3.5 text-success" />
                    <span>TRACK 2: Telugu Voiceovers (-14 LUFS)</span>
                  </span>
                  <span className="font-mono">te-IN WAV</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-10 bg-muted/60 rounded-lg p-1 border border-border">
                  {["రవి (Ravi)", "సురేష్ (Suresh)", "రవి (Ravi Shock)", "బాస్ (Boss)"].map((s, i) => (
                    <div
                      key={i}
                      className="rounded bg-success/20 border border-success/40 flex items-center justify-center text-2xs font-semibold text-success px-1 truncate"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              {/* Track 3: BGM & Ducking */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Music className="h-3.5 w-3.5 text-warning" />
                    <span>TRACK 3: Background Score (-22.5 dB Ducked)</span>
                  </span>
                  <span className="font-mono">Comic Bounce</span>
                </div>
                <div className="w-full h-8 bg-warning/15 rounded-lg p-1 border border-warning/30 flex items-center px-3 text-2xs font-mono text-warning">
                  Ducked beneath dialogue with smooth 150ms transitions
                </div>
              </div>

              {/* Track 4: Telugu Subtitles */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-semibold text-foreground">
                    <Subtitles className="h-3.5 w-3.5 text-info" />
                    <span>TRACK 4: Burned Subtitles (Nirmala UI)</span>
                  </span>
                  <span className="font-mono">Unicode te-IN</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-8 bg-muted/60 rounded-lg p-1 border border-border">
                  {["Sub 1", "Sub 2", "Sub 3", "Sub 4"].map((s, i) => (
                    <div
                      key={i}
                      className="rounded bg-info/20 border border-info/40 flex items-center justify-center text-2xs font-mono text-info px-1 truncate"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-2xs text-muted-foreground">
                Engine: <strong>Railway Worker (FFmpeg v6.1 + HarfBuzz)</strong>
              </span>
              <Link href="/studio/thumbnails">
                <Button variant="default" size="sm" className="gap-1.5 font-bold shadow-card">
                  <span>Proceed to Thumbnails &amp; QC</span>
                  <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

