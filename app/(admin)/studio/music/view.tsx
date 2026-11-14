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
  Disc3,
  Music,
  Pause,
  Play,
  ShieldCheck,
  Sliders,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { LICENSED_STUDIO_MUSIC, MusicTrackItem } from "@/lib/providers/music/music-library";

export function MusicStudioView() {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("bgm-comedy-01");

  const togglePlay = (id: string) => {
    setPlayingTrackId(playingTrackId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Licensed Music Studio"
        description="Agent 08 (Music Director) curates licensed, royalty-free Indian and cinematic scores matched to each scene's emotional beat. Automatic audio ducking lowers BGM volume beneath dialogue."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/sound-design">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Volume2 className="h-4 w-4" />
                <span>Sound Design SFX</span>
              </Button>
            </Link>
            <Link href="/studio/editor">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <span>Timeline Editor</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-border bg-card p-5 shadow-card lg:col-span-1 space-y-4">
          <CardTitle className="text-sm">Audio Ducking Engine</CardTitle>
          <div className="rounded-xl border border-border p-4 bg-muted/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">Ducking Attenuation</span>
              <span className="font-mono text-xs font-bold text-primary">-22.5 dB</span>
            </div>
            <p className="text-2xs text-muted-foreground leading-relaxed">
              When dialogue is detected, the FFmpeg audio filter automatically ducks background music by 22.5 dB with smooth 150ms attack and 350ms release.
            </p>
          </div>

          <div className="rounded-xl border border-border p-4 bg-muted/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span>100% Commercial Clearance</span>
            </div>
            <p className="text-2xs text-muted-foreground leading-relaxed">
              Never use unlicensed film songs. Every track in this library includes verified commercial sync licenses for YouTube and Meta monetization.
            </p>
          </div>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Licensed Studio Music Library</CardTitle>
              <CardDescription>
                Select background music for your video project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {LICENSED_STUDIO_MUSIC.map((track) => (
                <div
                  key={track.id}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 transition-all ${
                    selectedTrackId === track.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xs font-bold text-primary">{track.tempoBpm} BPM</span>
                      <Badge variant="outline" className="text-2xs">{track.genre}</Badge>
                      {selectedTrackId === track.id && (
                        <Badge variant="brand" className="text-[10px]">Active for Project</Badge>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-foreground truncate">{track.title}</h4>
                    <p className="text-2xs text-muted-foreground">
                      Mood: <strong>{track.mood.toUpperCase()}</strong> &bull; Ducking: {track.recommendedDuckingDb} dB
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant={playingTrackId === track.id ? "destructive" : "default"}
                      size="sm"
                      className="h-8 gap-1.5 text-xs font-semibold"
                      onClick={() => togglePlay(track.id)}
                    >
                      {playingTrackId === track.id ? (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>Audition</span>
                        </>
                      )}
                    </Button>
                    <Button
                      variant={selectedTrackId === track.id ? "secondary" : "outline"}
                      size="sm"
                      className="h-8 text-xs font-semibold"
                      onClick={() => setSelectedTrackId(track.id)}
                    >
                      {selectedTrackId === track.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

