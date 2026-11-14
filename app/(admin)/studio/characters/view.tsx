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
import {
  CheckCircle2,
  FileCheck2,
  Image as ImageIcon,
  Plus,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

interface CharacterItem {
  id: string;
  name: string;
  role: string;
  age: string;
  appearance: string;
  clothing: string;
  voice: string;
  scenesCount: number;
  consentVerified: boolean;
}

export function CharacterStudioView() {
  const [characters, setCharacters] = useState<CharacterItem[]>([
    {
      id: "char-ravi",
      name: "రవి (Ravi)",
      role: "Lead Comedic Protagonist",
      age: "26 years",
      appearance: "South Indian Telugu software engineer, trimmed black beard, expressive comedic eyes.",
      clothing: "Navy blue checked formal shirt, dark trousers, brown leather wristwatch.",
      voice: "Male Natural Conversational (te-IN)",
      scenesCount: 14,
      consentVerified: true,
    },
    {
      id: "char-boss",
      name: "రామారావు (Manager Rama Rao)",
      role: "Deadpan Authority Figure",
      age: "52 years",
      appearance: "Senior corporate executive, silver-streaked hair, rimless spectacles, calm authoritative posture.",
      clothing: "Charcoal gray blazer over crisp white shirt, silver wristwatch.",
      voice: "Male Deep Dramatic Bass (te-IN)",
      scenesCount: 8,
      consentVerified: true,
    },
    {
      id: "char-suresh",
      name: "సురేష్ (Suresh)",
      role: "Relatable Office Colleague",
      age: "27 years",
      appearance: "Casual Telugu youth, round glasses, quick comedic reactions.",
      clothing: "Olive green polo t-shirt, office ID badge lanyard.",
      voice: "Male Expressive Sarcastic (te-IN)",
      scenesCount: 6,
      consentVerified: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Character Studio &amp; Continuity Bible"
        description="Maintain visual and facial continuity across scenes with Agent 05 (Character Designer). Reusable character profiles lock hair, clothing, body proportions, and expressions."
        actions={
          <Button variant="brand" size="sm" className="gap-1.5 shadow-card">
            <Plus className="h-4 w-4" />
            <span>Create New Character</span>
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {characters.map((char) => (
          <Card key={char.id} className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xs font-bold text-primary">
                  {char.id.toUpperCase()}
                </span>
                <Badge variant="success" className="text-[10px] gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Consent Verified</span>
                </Badge>
              </div>
              <CardTitle className="text-base mt-1">{char.name}</CardTitle>
              <CardDescription>{char.role} &bull; {char.age}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Reference Frames */}
              <div className="aspect-[4/3] w-full rounded-lg bg-black/90 flex flex-col items-center justify-center p-4 border border-border relative overflow-hidden group">
                <User className="h-12 w-12 text-primary/60 mb-2" />
                <span className="text-xs font-semibold text-white/90">{char.name}</span>
                <p className="text-2xs text-white/60 text-center px-4 mt-1">
                  Front, Profile &amp; Emotion Reference Locked
                </p>
                <div className="absolute bottom-2 right-2 flex gap-1">
                  <Badge variant="brand" className="text-[9px]">4 Angles</Badge>
                </div>
              </div>

              <div className="space-y-2 text-2xs">
                <div className="rounded-md bg-muted/40 p-2.5 border border-border/60">
                  <strong className="text-foreground">Face &amp; Hair:</strong>
                  <p className="text-muted-foreground mt-0.5">{char.appearance}</p>
                </div>
                <div className="rounded-md bg-muted/40 p-2.5 border border-border/60">
                  <strong className="text-foreground">Costume Lock:</strong>
                  <p className="text-muted-foreground mt-0.5">{char.clothing}</p>
                </div>
                <div className="rounded-md bg-muted/40 p-2.5 border border-border/60">
                  <strong className="text-foreground">Voice Profile:</strong>
                  <p className="text-muted-foreground mt-0.5">{char.voice}</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between border-t border-border pt-3">
              <span className="text-2xs text-muted-foreground">
                In <strong>{char.scenesCount}</strong> generated scenes
              </span>
              <Button variant="outline" size="sm" className="h-7 text-xs">
                Edit Bible
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

