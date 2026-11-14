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
import { Input, Field } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  CheckCircle2,
  Headphones,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Sliders,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface VoiceLine {
  id: number;
  speaker: string;
  telugu: string;
  emotion: string;
  duration: string;
  speed: number;
  lufs: string;
}

export function VoiceStudioView() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const [voiceLines, setVoiceLines] = useState<VoiceLine[]>([
    {
      id: 1,
      speaker: "రవి (Ravi - Male Youth)",
      telugu: "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!",
      emotion: "ఆందోళన & ఆత్రుత (Anxious Rush)",
      duration: "4.2s",
      speed: 1.05,
      lufs: "-14.0 LUFS",
    },
    {
      id: 2,
      speaker: "సురేష్ (Suresh - Male Sarcastic)",
      telugu: "సురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!",
      emotion: "వ్యంగ్యం & గుసగుస (Sarcastic Whisper)",
      duration: "5.1s",
      speed: 0.98,
      lufs: "-14.2 LUFS",
    },
    {
      id: 3,
      speaker: "రవి (Ravi - Male Shock)",
      telugu: "రవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?",
      emotion: "షాక్ నుండి నవ్వు (Shock to Awkward Respect)",
      duration: "5.8s",
      speed: 1.0,
      lufs: "-13.8 LUFS",
    },
    {
      id: 4,
      speaker: "రామారావు (Manager - Deep Bass)",
      telugu: "బాస్: ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి నీకు రోజూ లీవ్ కావాలా?",
      emotion: "గంభీరమైన వ్యంగ్యం (Deadpan Sarcasm)",
      duration: "4.6s",
      speed: 0.92,
      lufs: "-14.0 LUFS",
    },
  ]);

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Telugu Voice Studio"
        description="Agent 07 (Telugu Voice Director) produces natural, conversational, and emotional speech in Telugu (te-IN). Adjust emotional delivery tags, pronunciation overrides, and loudness normalization."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/music">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Volume2 className="h-4 w-4" />
                <span>Music Studio</span>
              </Button>
            </Link>
            <Link href="/studio/editor">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <span>Timeline Video Editor</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column: Voice Models & Pronunciation */}
        <div className="space-y-4 lg:col-span-1">
          <Card className="border-border bg-card p-5 shadow-card space-y-4">
            <CardTitle className="text-sm">Audio Engine Status</CardTitle>
            <div className="space-y-2 text-2xs">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Provider:</span>
                <span className="font-semibold text-foreground">ElevenLabs / Google TTS</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Output:</span>
                <span className="font-semibold text-foreground">48kHz / 24-bit WAV</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">Target Loudness:</span>
                <span className="font-semibold text-foreground">-14.0 LUFS Normalized</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Language Register:</span>
                <Badge variant="brand" className="text-[9px]">te-IN Natural</Badge>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-3 border border-border text-2xs space-y-1">
              <p className="font-bold text-foreground">Active Pronunciation Map:</p>
              <p className="text-muted-foreground">ట్రాఫిక్ &rarr; traffic</p>
              <p className="text-muted-foreground">ఆఫీస్ &rarr; office</p>
              <p className="text-muted-foreground">క్యూబికల్ &rarr; cubicle</p>
            </div>
          </Card>
        </div>

        {/* Right 3 Columns: Dialogue Voice Stems */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Synthesized Dialogue Stems</CardTitle>
                <CardDescription>
                  Isolated voice stems ready for ducking and synchronization with video cuts.
                </CardDescription>
              </div>
              <Badge variant="success" className="text-2xs">
                All 4 Stems Synchronized
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              {voiceLines.map((line) => (
                <div key={line.id} className="rounded-xl border border-border p-4 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xs font-bold text-primary">STEM 0{line.id}</span>
                      <span className="text-xs font-bold text-foreground">{line.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-2xs">{line.lufs}</Badge>
                      <span className="font-mono text-2xs text-muted-foreground">{line.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-foreground font-sans leading-relaxed">
                    {line.telugu}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/60">
                    <div className="flex items-center gap-3 text-2xs text-muted-foreground">
                      <span>Emotion: <strong className="text-foreground">{line.emotion}</strong></span>
                      <span>&bull;</span>
                      <span>Speed: <strong className="font-mono text-foreground">{line.speed}x</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={playingId === line.id ? "destructive" : "default"}
                        size="sm"
                        className="h-8 gap-1.5 text-xs font-semibold"
                        onClick={() => togglePlay(line.id)}
                      >
                        {playingId === line.id ? (
                          <>
                            <Pause className="h-3.5 w-3.5" />
                            <span>Playing Stem...</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5" />
                            <span>Preview Stem ({line.duration})</span>
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        <RefreshCw className="h-3 w-3" />
                        <span>Re-synthesize</span>
                      </Button>
                    </div>
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

