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
import { Select } from "@/components/ui/select";
import {
  Camera,
  Clapperboard,
  Film,
  Layers,
  Play,
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
  const [shots, setShots] = useState<ShotDetail[]>([
    {
      id: 1,
      number: "Scene 01",
      location: "హైదరాబాద్ కార్పొరేట్ ఆఫీస్ కారిడార్ (Glass Office Corridor)",
      shotType: "Medium Tracking Shot",
      cameraMovement: "Fast push forward with subject",
      lighting: "Crisp fluorescent office lighting with warm rim",
      duration: "9.5s",
      dialogue: "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!",
      emotion: "Panicked Rush (ఆందోళన)",
      prompt: "A 26-year-old South Indian Telugu tech employee in a blue checked formal shirt rushing down a glass modern corporate office corridor, wiping sweat from forehead with high anxiety, 9:16 vertical cinematography, realistic lighting.",
    },
    {
      id: 2,
      number: "Scene 02",
      location: "డెస్క్ క్యూబికల్స్ (Cubicle Desk Row)",
      shotType: "Over-the-shoulder Two-shot",
      cameraMovement: "Static lock-off",
      lighting: "Soft ambient fill from computer monitors",
      duration: "11.0s",
      dialogue: "సురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!",
      emotion: "Gossip Whisper (గుసగుస)",
      prompt: "Two South Indian male colleagues talking at an IT office cubicle, one whispering with wide alert eyes pointing his thumb backward. Shallow depth of field reveals an out-of-focus stern boss standing behind, vertical 9:16 composition.",
    },
    {
      id: 3,
      number: "Scene 03",
      location: "క్యూబికల్ ఎంట్రన్స్ (Behind Ravi)",
      shotType: "Dynamic Whip Pan into Extreme Close-Up",
      cameraMovement: "Snap 180-degree rotation and zoom into eyes",
      lighting: "Dramatic spotlight comedy rim",
      duration: "13.5s",
      dialogue: "రవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?",
      emotion: "Terrified to Fake Smile (షాక్ నుండి నవ్వు)",
      prompt: "Dynamic comedy turnaround: young Telugu man's face shifting instantly from sheer petrified terror to a hilarious plastic respect smile with folded hands (Namaste), eye twitching, hyper-detailed facial expressions.",
    },
    {
      id: 4,
      number: "Scene 04",
      location: "మేనేజర్ క్లోజప్ & ముగింపు (Manager Deadpan Payoff)",
      shotType: "Low angle static close-up",
      cameraMovement: "Slow creeping push-in",
      lighting: "Moody shadow on manager's face",
      duration: "11.0s",
      dialogue: "బాస్: ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి నీకు రోజూ లీవ్ కావాలా?",
      emotion: "Deadpan Sarcasm (గంభీరమైన వ్యంగ్యం)",
      prompt: "A 50-year-old South Indian corporate manager in spectacles and dark blazer staring deadpan at the camera with raised eyebrow, holding an attendance ledger, comic timing lighting, vertical 9:16 framing.",
    },
  ]);

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
            <Link href="/studio/video-generator">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <Sparkles className="h-4 w-4" />
                <span>Send to Gemini Video Agent</span>
              </Button>
            </Link>
          </div>
        }
      />

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
              {/* Mock Frame Visualizer */}
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
    </div>
  );
}

