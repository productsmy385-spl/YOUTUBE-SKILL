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
  Clock,
  Coins,
  Film,
  Play,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface GenerationClip {
  id: string;
  sceneNumber: string;
  title: string;
  model: string;
  ratio: string;
  duration: string;
  costUsd: number;
  status: "Ready" | "Generating" | "Failed";
  prompt: string;
}

export function VideoGeneratorView() {
  const [clips, setClips] = useState<GenerationClip[]>([
    {
      id: "CLIP-101-01",
      sceneNumber: "Scene 01",
      title: "ఆఫీస్ కారిడార్ పరుగు (Corridor Rush)",
      model: "veo-2.0-generate-001",
      ratio: "9:16 Vertical",
      duration: "9.5s",
      costUsd: 0.08,
      status: "Ready",
      prompt: "A 26-year-old South Indian Telugu tech employee in a blue checked formal shirt rushing down a glass modern corporate office corridor, wiping sweat from forehead with high anxiety.",
    },
    {
      id: "CLIP-101-02",
      sceneNumber: "Scene 02",
      title: "క్యూబికల్ సంభాషణ (Cubicle Dialogue)",
      model: "veo-2.0-generate-001",
      ratio: "9:16 Vertical",
      duration: "11.0s",
      costUsd: 0.08,
      status: "Ready",
      prompt: "Two South Indian male colleagues talking at an IT office cubicle, one whispering with wide alert eyes pointing his thumb backward.",
    },
    {
      id: "CLIP-101-03",
      sceneNumber: "Scene 03",
      title: "షాక్ నమస్తే ఎక్స్‌ప్రెషన్ (Shock Namaste)",
      model: "veo-2.0-generate-001",
      ratio: "9:16 Vertical",
      duration: "13.5s",
      costUsd: 0.08,
      status: "Ready",
      prompt: "Dynamic comedy turnaround: young Telugu man's face shifting instantly from sheer petrified terror to a hilarious plastic respect smile with folded hands (Namaste).",
    },
    {
      id: "CLIP-101-04",
      sceneNumber: "Scene 04",
      title: "బాస్ ముగింపు లుక్ (Boss Reaction Outro)",
      model: "veo-2.0-generate-001",
      ratio: "9:16 Vertical",
      duration: "11.0s",
      costUsd: 0.08,
      status: "Ready",
      prompt: "A 50-year-old South Indian corporate manager in spectacles and dark blazer staring deadpan at the camera with raised eyebrow.",
    },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gemini Video Generator"
        description="Agent 06 coordinates with Google Gemini video models to produce high-definition 9:16 vertical clips. Support for individual scene regeneration prevents re-rendering entire projects."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-4 w-4" />
              <span>Poll Status</span>
            </Button>
            <Link href="/studio/voice">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <span>Telugu Voice Studio</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Compute Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Active Model</span>
            <Badge variant="brand" className="text-[10px]">Google Veo</Badge>
          </div>
          <p className="text-sm font-bold text-foreground mt-2 font-mono">veo-2.0-generate-001</p>
          <p className="text-2xs text-muted-foreground mt-0.5">High-fidelity 9:16 vertical motion</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Project Compute Cost</span>
            <Coins className="h-4 w-4 text-warning" />
          </div>
          <p className="text-xl font-bold text-foreground mt-2 font-mono">$0.32 USD</p>
          <p className="text-2xs text-muted-foreground mt-0.5">4 clips &bull; $0.08/clip</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Continuity Lock</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <p className="text-sm font-bold text-foreground mt-2">Active Character Bible</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Ravi + Rama Rao face matched</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {clips.map((clip) => (
          <Card key={clip.id} className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">{clip.sceneNumber}</span>
                <Badge variant="success" className="text-2xs">{clip.status}</Badge>
              </div>
              <CardTitle className="text-sm mt-1">{clip.title}</CardTitle>
              <CardDescription className="font-mono text-2xs">
                {clip.model} &bull; {clip.ratio} &bull; {clip.duration}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="aspect-[16/9] w-full rounded-lg bg-black/95 flex flex-col items-center justify-center p-4 border border-border relative overflow-hidden group">
                <Film className="h-10 w-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <Button variant="default" size="sm" className="h-7 text-xs gap-1.5 shadow-card">
                  <Play className="h-3 w-3" />
                  <span>Preview Clip ({clip.duration})</span>
                </Button>
              </div>

              <div className="rounded bg-muted/40 p-2.5 border border-border/60">
                <p className="text-2xs font-mono text-muted-foreground line-clamp-3">
                  {clip.prompt}
                </p>
              </div>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between border-t border-border pt-3">
              <span className="text-2xs font-mono text-muted-foreground">
                Cost: <strong>${clip.costUsd.toFixed(2)}</strong>
              </span>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                <RefreshCw className="h-3 w-3" />
                <span>Regenerate Clip</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

