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
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Camera,
  Clapperboard,
  Film,
  Layers,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ShotDetail {
  id: number;
  number: string;
  location: string;
  shotType: string;
  cameraMovement: string;
  lighting: string;
  duration: string;
  dialogue: string;
  emotion: string;
  prompt: string;
}

export function StoryboardStudioView() {
  const [shots, setShots] = useState<ShotDetail[]>([]);

  const handleAddShot = () => {
    const newShot: ShotDetail = {
      id: Date.now(),
      number: `Scene 0${shots.length + 1}`,
      location: "హైదరాబాద్ లోకేషన్ (Location)",
      shotType: "Medium Close-up",
      cameraMovement: "Tracking forward",
      lighting: "Cinematic realistic lighting",
      duration: "5.0s",
      dialogue: "తెలుగు సంభాషణ...",
      emotion: "సహజమైన ఎమోషన్ (Natural Expression)",
      prompt: "Cinematic shot of South Indian characters, photorealistic 9:16 vertical video composition, hyper-detailed textures.",
    };
    setShots((prev) => [...prev, newShot]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cinematic Storyboard Studio"
        description="Film Director Agent 04 transforms your script into cinematic shots with location details, camera angles, lighting atmosphere, and visual generation prompts."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/characters">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Camera className="h-4 w-4" />
                <span>Character Bible</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleAddShot}
            >
              <Plus className="h-4 w-4" />
              <span>Add Shot</span>
            </Button>
            <Link href="/studio/video-generator">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <Sparkles className="h-4 w-4" />
                <span>Send to Gemini Video Agent</span>
              </Button>
            </Link>
          </div>
        }
      />

      {shots.length === 0 ? (
        <EmptyState
          icon={<Clapperboard className="h-8 w-8" />}
          title="No Storyboard Generated Yet"
          description="Film Director Agent 04 transforms your dialogue script into cinematic camera shots, camera movement directives, and visual prompts for Gemini Video."
          action={{
            label: "Create in Video Wizard",
            onClick: () => {
              window.location.href = "/studio/create";
            },
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {shots.map((shot, idx) => (
            <Card key={shot.id} className="border-border bg-card shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{shot.number}</span>
                    <Badge variant="outline" className="text-2xs font-mono">{shot.shotType}</Badge>
                  </div>
                  <span className="font-mono text-2xs text-muted-foreground">{shot.duration}</span>
                </div>
                <CardTitle className="text-sm mt-1">{shot.location}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Visualizer Frame */}
                <div className="aspect-[16/9] w-full rounded-lg bg-black/95 flex flex-col justify-end p-4 border border-border relative overflow-hidden group">
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity">
                    <Film className="h-10 w-10 text-primary" />
                  </div>
                  <div className="relative z-10 bg-black/80 backdrop-blur-xs p-2 rounded-md">
                    <p className="text-xs font-semibold text-white truncate font-sans">
                      {shot.dialogue}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-2xs">
                  <div className="rounded bg-muted/40 p-2 border border-border/60">
                    <span className="text-muted-foreground">Movement:</span>
                    <p className="font-semibold text-foreground truncate">{shot.cameraMovement}</p>
                  </div>
                  <div className="rounded bg-muted/40 p-2 border border-border/60">
                    <span className="text-muted-foreground">Lighting:</span>
                    <p className="font-semibold text-foreground truncate">{shot.lighting}</p>
                  </div>
                </div>

                <Field label="Gemini Video Generative Prompt (Agent 04 &rarr; 06)">
                  <Textarea
                    rows={3}
                    value={shot.prompt}
                    onChange={(e) => {
                      const updated = [...shots];
                      updated[idx].prompt = e.target.value;
                      setShots(updated);
                    }}
                    className="text-2xs font-mono"
                  />
                </Field>
              </CardContent>

              <CardFooter className="pt-0 flex items-center justify-between border-t border-border pt-3">
                <span className="text-2xs text-muted-foreground">
                  Emotion: <strong>{shot.emotion}</strong>
                </span>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                  <RefreshCw className="h-3 w-3" />
                  <span>Refine Shot</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
