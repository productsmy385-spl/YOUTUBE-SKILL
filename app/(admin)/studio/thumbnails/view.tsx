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
  Download,
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ThumbnailConcept {
  id: number;
  title: string;
  teluguHeadline: string;
  expression: string;
  contrastScore: number;
  isPrimary: boolean;
}

export function ThumbnailStudioView() {
  const [concepts, setConcepts] = useState<ThumbnailConcept[]>([
    {
      id: 1,
      title: "Concept A: షాకింగ్ ఎక్స్‌ప్రెషన్ (Shock Face)",
      teluguHeadline: "ఆఫీస్ లేట్ ఎంట్రీ! బాస్ రియాక్షన్ చూడండి! 😂",
      expression: "Extreme shock turnaround with eye twitch",
      contrastScore: 96,
      isPrimary: true,
    },
    {
      id: 2,
      title: "Concept B: బాస్ వార్నింగ్ లుక్ (Boss Stare)",
      teluguHeadline: "ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి లీవ్ కావాలా? 😱",
      expression: "Stern deadpan boss with attendance sheet",
      contrastScore: 92,
      isPrimary: false,
    },
    {
      id: 3,
      title: "Concept C: ఫేక్ నమస్తే స్మైల్ (Awkward Smile)",
      teluguHeadline: "బాస్ వెనకాలే ఉంటే పరిస్థితి ఏంటి? 😂",
      expression: "Awkward plastic smile with folded hands",
      contrastScore: 94,
      isPrimary: false,
    },
  ]);

  const selectPrimary = (id: number) => {
    setConcepts(concepts.map((c) => ({ ...c, isPrimary: c.id === id })));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Thumbnail Studio"
        description="Agent 11 (Thumbnail Designer) produces expressive YouTube thumbnails tailored to high click-through rates. Bold Telugu typography and high contrast ensure visibility on mobile feeds."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/youtube">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <span>YouTube Operations</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {concepts.map((concept, idx) => (
          <Card
            key={concept.id}
            className={`border transition-all ${
              concept.isPrimary
                ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-card"
                : "border-border bg-card shadow-card"
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xs font-bold text-primary">CONCEPT 0{idx + 1}</span>
                {concept.isPrimary ? (
                  <Badge variant="brand" className="text-2xs font-bold">Selected Primary</Badge>
                ) : (
                  <Badge variant="outline" className="text-2xs">Alternative</Badge>
                )}
              </div>
              <CardTitle className="text-sm mt-1">{concept.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Thumbnail Visual Container */}
              <div className="aspect-[9/16] max-w-[220px] mx-auto rounded-xl bg-black flex flex-col justify-end p-4 text-white relative border border-border shadow-modal overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                  <ImageIcon className="h-12 w-12 text-primary" />
                </div>
                <div className="relative z-10 bg-black/85 backdrop-blur-xs p-2.5 rounded-lg border border-white/20 text-center">
                  <p className="text-xs font-black text-white font-sans leading-tight">
                    {concept.teluguHeadline}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-2xs">
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">Mobile Contrast Score:</span>
                  <span className="font-mono font-bold text-success">{concept.contrastScore}%</span>
                </div>
                <div className="py-1">
                  <span className="text-muted-foreground">Character Face:</span>
                  <p className="font-semibold text-foreground mt-0.5">{concept.expression}</p>
                </div>
              </div>

              <Field label="Telugu Typography Overlay Text">
                <Input
                  value={concept.teluguHeadline}
                  onChange={(e) => {
                    const updated = [...concepts];
                    updated[idx].teluguHeadline = e.target.value;
                    setConcepts(updated);
                  }}
                  className="text-xs font-bold font-sans"
                />
              </Field>
            </CardContent>

            <CardFooter className="pt-0 flex items-center justify-between border-t border-border pt-3">
              <Button
                variant={concept.isPrimary ? "secondary" : "default"}
                size="sm"
                className="w-full text-xs font-bold"
                onClick={() => selectPrimary(concept.id)}
              >
                {concept.isPrimary ? "Active Primary Thumbnail" : "Set as Primary"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

