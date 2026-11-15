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
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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
  const [clips, setClips] = useState<GenerationClip[]>([]);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [scenePrompt, setScenePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);

  const totalCost = clips.reduce((acc, c) => acc + c.costUsd, 0);

  const handleGenerateClipsWithAgent06 = async () => {
    if (!scenePrompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch("/api/agents/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentCode: "gemini_video",
          payload: {
            storyboard: {
              scenes: [
                {
                  sceneId: 1,
                  sceneNumber: "SCENE-01",
                  durationSeconds: 5,
                  visualPrompt: scenePrompt,
                },
                {
                  sceneId: 2,
                  sceneNumber: "SCENE-02",
                  durationSeconds: 6,
                  visualPrompt: `${scenePrompt} (Wide angle reaction)`,
                },
                {
                  sceneId: 3,
                  sceneNumber: "SCENE-03",
                  durationSeconds: 5,
                  visualPrompt: `${scenePrompt} (Close up emotional punch)`,
                },
              ],
            },
          },
        }),
      });

      const data = await res.json();
      if (Array.isArray(data.data)) {
        setClips(
          data.data.map((c: { sceneId: number; durationSeconds: number; assetUrl: string }) => ({
            id: `clip-${c.sceneId}`,
            sceneNumber: `Scene 0${c.sceneId}`,
            title: `Scene 0${c.sceneId} - Gemini Video Master`,
            model: "veo-2.0-generate-001",
            ratio: "9:16",
            duration: `${c.durationSeconds}s`,
            costUsd: 0.08,
            status: "Ready",
            prompt: `Cinematic Telugu composition for Scene ${c.sceneId}: ${scenePrompt}`,
          }))
        );
        setIsGenerateModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to generate video clips:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateSingleClip = async (clipId: string) => {
    setRegeneratingId(clipId);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      setClips((prev) =>
        prev.map((c) =>
          c.id === clipId
            ? {
                ...c,
                prompt: `${c.prompt} (Regenerated with enhanced lighting and Telugu facial micro-expressions)`,
                status: "Ready",
              }
            : c
        )
      );
    } finally {
      setRegeneratingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gemini Video Generator"
        description="Agent 06 coordinates with Google Gemini video models to produce high-definition 9:16 vertical clips. Support for individual scene regeneration prevents re-rendering entire projects."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setIsGenerateModalOpen(true)}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Generate Clips with Agent 06</span>
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
          <p className="text-xl font-bold text-foreground mt-2 font-mono">${totalCost.toFixed(2)} USD</p>
          <p className="text-2xs text-muted-foreground mt-0.5">{clips.length} generated clips</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Continuity Lock</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <p className="text-sm font-bold text-foreground mt-2">Character Bible Guardrails</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Face tokens &amp; costume continuity active</p>
        </Card>
      </div>

      {clips.length === 0 ? (
        <EmptyState
          icon={<Film className="h-8 w-8" />}
          title="No Video Clips Generated Yet"
          description="Agent 06 coordinates with Google Gemini video models to produce clips from storyboard scenes with prompt directives and character likeness locks."
          action={{
            label: "Generate Video Clips with Agent 06",
            onClick: () => setIsGenerateModalOpen(true),
          }}
        />
      ) : (
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
                <div className="aspect-[9/16] max-h-56 mx-auto rounded-lg bg-black/80 flex items-center justify-center border border-border overflow-hidden relative group">
                  <div className="text-center p-3">
                    <Film className="h-8 w-8 text-primary/60 mx-auto mb-2" />
                    <span className="text-2xs font-mono text-muted-foreground">Generated Gemini Veo Clip</span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="ghost" size="icon-sm" className="text-white">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>

                <p className="text-2xs font-mono text-muted-foreground line-clamp-2 bg-muted/40 p-2 rounded">
                  {clip.prompt}
                </p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-mono text-2xs text-muted-foreground">${clip.costUsd.toFixed(2)} USD</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-2xs h-7"
                  disabled={regeneratingId === clip.id}
                  onClick={() => handleRegenerateSingleClip(clip.id)}
                >
                  <RefreshCw className={`h-3 w-3 ${regeneratingId === clip.id ? "animate-spin" : ""}`} />
                  <span>{regeneratingId === clip.id ? "Regenerating..." : "Regenerate Scene"}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Generate Clips Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generate Video Clips with Gemini Video Agent
            </DialogTitle>
            <DialogDescription>
              Enter a visual scene prompt or story description. Agent 06 will formulate Veo generation directives and render vertical video clips.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Visual Scene Directive
              </label>
              <Textarea
                rows={4}
                value={scenePrompt}
                onChange={(e) => setScenePrompt(e.target.value)}
                placeholder="ఉదాహరణ: Cinematic 8k 9:16 vertical video of a Telugu youth walking into a modern Hyderabad cafe with expressive shocked expression, 35mm film grain..."
                className="text-xs font-mono"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="brand"
              onClick={handleGenerateClipsWithAgent06}
              disabled={isGenerating || !scenePrompt.trim()}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating Veo Clips...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Clips
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
