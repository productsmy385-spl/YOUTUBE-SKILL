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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [conceptPrompt, setConceptPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerateWithAgent04 = async () => {
    if (!conceptPrompt.trim()) return;
    setIsGenerating(true);
    try {
      // First generate script if needed
      const scriptRes = await fetch("/api/agents/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentCode: "telugu_script_writer",
          payload: { title: conceptPrompt.substring(0, 30), rawInput: conceptPrompt },
        }),
      });
      const scriptData = await scriptRes.json();

      // Next call Film Director
      const res = await fetch("/api/agents/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentCode: "film_director",
          payload: { script: scriptData.data },
        }),
      });

      const data = await res.json();
      if (data.data?.scenes) {
        setShots(
          data.data.scenes.map((s: { sceneId: number; sceneNumber: string; location: string; shotType: string; cameraMovement: string; lighting: string; durationSeconds: number; dialogueTelugu: string; emotion: string; visualPrompt: string }) => ({
            id: s.sceneId,
            number: s.sceneNumber,
            location: s.location,
            shotType: s.shotType,
            cameraMovement: s.cameraMovement,
            lighting: s.lighting,
            duration: `${s.durationSeconds}s`,
            dialogue: s.dialogueTelugu,
            emotion: s.emotion,
            prompt: s.visualPrompt,
          }))
        );
        setIsGenerateModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to generate storyboard:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cinematic Storyboard Studio"
        description="Film Director Agent 04 transforms your script into cinematic shots with location details, camera angles, lighting atmosphere, and visual generation prompts."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => setIsGenerateModalOpen(true)}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Generate with Agent 04</span>
            </Button>
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
            label: "Generate Storyboard with Agent 04",
            onClick: () => setIsGenerateModalOpen(true),
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
                <div className="grid grid-cols-2 gap-3 text-2xs">
                  <div>
                    <span className="text-muted-foreground block">Camera Motion:</span>
                    <span className="font-semibold text-foreground">{shot.cameraMovement}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Lighting Style:</span>
                    <span className="font-semibold text-foreground">{shot.lighting}</span>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/40 p-2.5 border border-border text-xs space-y-1">
                  <span className="text-2xs font-semibold text-primary block">Spoken Dialogue:</span>
                  <p className="font-sans text-foreground">{shot.dialogue}</p>
                </div>

                <Field label="Gemini Video Generative Prompt">
                  <Textarea
                    rows={3}
                    value={shot.prompt}
                    onChange={(e) => {
                      const updated = [...shots];
                      updated[idx].prompt = e.target.value;
                      setShots(updated);
                    }}
                    className="text-xs font-mono"
                  />
                </Field>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-border pt-3">
                <Badge variant="outline" className="text-2xs">
                  {shot.emotion}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-2xs h-7"
                  onClick={() => {
                    const updated = [...shots];
                    updated[idx].prompt = `${shot.prompt} (Refined for sharper cinematic lighting and authentic Telugu facial micro-expressions)`;
                    setShots(updated);
                  }}
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Refine Shot</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Generate Storyboard Modal */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Generate Cinematic Storyboard with Agent 04
            </DialogTitle>
            <DialogDescription>
              Enter your video topic or scene description. Film Director Agent 04 will produce a shot-by-shot cinematic storyboard.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Video Topic or Narrative Scene
              </label>
              <Textarea
                rows={4}
                value={conceptPrompt}
                onChange={(e) => setConceptPrompt(e.target.value)}
                placeholder="ఉదాహరణ: హైదరాబాద్ హైటెక్ సిటీలో ఒక ఆఫీస్ ఉద్యోగి అనుకోకుండా ఒక రహస్యం తెలుసుకోవడం..."
                className="text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="brand"
              onClick={handleGenerateWithAgent04}
              disabled={isGenerating || !conceptPrompt.trim()}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Generating Storyboard...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate Storyboard
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
