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
  Play,
  Pause,
  Plus,
  Sliders,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface SFXItem {
  id: string;
  name: string;
  category: "comedy" | "foley" | "ambient" | "impact";
  timing: string;
  duration: string;
  volume: string;
}

export function SoundDesignStudioView() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [sfxList, setSfxList] = useState<SFXItem[]>([
    {
      id: "sfx-01",
      name: "Fast Office Corridor Footsteps (పరుగు చప్పుడు)",
      category: "foley",
      timing: "00:00 - 00:04",
      duration: "4.0s",
      volume: "-12 dB",
    },
    {
      id: "sfx-02",
      name: "Dramatic Record Scratch & Silence (రికార్డ్ స్క్రాచ్)",
      category: "comedy",
      timing: "00:20.5",
      duration: "0.8s",
      volume: "-6 dB",
    },
    {
      id: "sfx-03",
      name: "Awkward Silence Cricket Chirp (హాస్య కీటక నాదం)",
      category: "comedy",
      timing: "00:21.0 - 00:24.0",
      duration: "3.0s",
      volume: "-18 dB",
    },
    {
      id: "sfx-04",
      name: "Telugu Comedy Whistle Accent (కామెడీ విజిల్ పంచ్)",
      category: "comedy",
      timing: "00:34.0",
      duration: "1.2s",
      volume: "-8 dB",
    },
  ]);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sound Design Studio"
        description="Agent 09 (Sound Designer) enriches video scenes with foley effects, environmental ambience, and timed comedic accents. Clear separation ensures dialogue always remains intelligible."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/editor">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <span>Timeline Video Editor</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      <Card className="border-border bg-card shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Timeline SFX Cue Markers</CardTitle>
            <CardDescription>
              Sound effects synchronized with visual beats in the active project.
            </CardDescription>
          </div>
          <Badge variant="brand" className="text-2xs font-semibold">
            {sfxList.length} Foley Effects Timed
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {sfxList.map((sfx) => (
            <div key={sfx.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border p-4 bg-muted/20">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xs font-bold text-primary">{sfx.timing}</span>
                  <Badge variant="outline" className="text-2xs uppercase">{sfx.category}</Badge>
                </div>
                <h4 className="text-sm font-bold text-foreground truncate">{sfx.name}</h4>
                <p className="text-2xs text-muted-foreground">
                  Duration: {sfx.duration} &bull; Output Level: {sfx.volume}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant={playingId === sfx.id ? "destructive" : "default"}
                  size="sm"
                  className="h-8 gap-1.5 text-xs font-semibold"
                  onClick={() => togglePlay(sfx.id)}
                >
                  {playingId === sfx.id ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      <span>Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" />
                      <span>Play SFX</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

