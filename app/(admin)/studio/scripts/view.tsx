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
import { Field, Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  CheckCircle2,
  Copy,
  Download,
  FileText,
  Mic,
  Play,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface DialogueLine {
  id: number;
  speaker: string;
  telugu: string;
  english: string;
  cue: string;
  pause: number;
}

export function ScriptStudioView() {
  const [register, setRegister] = useState<string>("conversational");
  const [lines, setLines] = useState<DialogueLine[]>([]);

  const handleAddLine = () => {
    const newLine: DialogueLine = {
      id: Date.now(),
      speaker: "రవి (Ravi)",
      telugu: "",
      english: "",
      cue: "సహజమైన (Natural)",
      pause: 0.3,
    };
    setLines((prev) => [...prev, newLine]);
  };

  const handleRemoveLine = (id: number) => {
    setLines(lines.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Telugu Script Studio"
        description="Craft natural Telugu dialogues, polish comedic timing, adjust dialect registers, and synchronize line-by-line performance cues with Agent 03."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              <span>Export Script</span>
            </Button>
            <Link href="/studio/storyboard">
              <Button variant="brand" size="sm" className="gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>Generate Storyboard</span>
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Left Column: Script Settings */}
        <div className="space-y-4 lg:col-span-1">
          <Card className="border-border bg-card p-5 shadow-card space-y-4">
            <CardTitle className="text-sm">Script Settings</CardTitle>
            <Field label="Dialect & Register">
              <Select value={register} onChange={(e) => setRegister(e.target.value)}>
                <option value="conversational">స్వాభావిక తెలుగు (Conversational Urban)</option>
                <option value="formal">ప్రామాణిక గ్రాంథికం (Formal / News)</option>
                <option value="mass">రాయలసీమ / మాస్ (Mass Dialect)</option>
                <option value="godavari">గోదావరి యాస (Godavari Slang)</option>
                <option value="telangana">తెలంగాణ యాస (Telangana Slang)</option>
              </Select>
            </Field>

            <div className="rounded-lg bg-muted/60 p-3 border border-border text-2xs space-y-2">
              <p className="font-semibold text-foreground">Agent 03 Guardrails:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Preserves original comedic punchline</li>
                <li>Zero grammatical distortion</li>
                <li>Pronunciation glossary mapped</li>
              </ul>
            </div>

            <Button variant="outline" size="sm" className="w-full gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>AI Polish Dialogue</span>
            </Button>
          </Card>
        </div>

        {/* Right 3 Columns: Dialogue Lines Editor */}
        <div className="space-y-4 lg:col-span-3">
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Scene Dialogues &amp; Performance Cues</CardTitle>
                <CardDescription>
                  Editable line-by-line script. Each block maps directly to a video scene and voice stem.
                </CardDescription>
              </div>
              <Badge variant="brand" className="text-2xs font-semibold">
                {lines.length} Scenes / 45s
              </Badge>
            </CardHeader>

            <CardContent className="space-y-4">
              {lines.length === 0 ? (
                <EmptyState
                  icon={<FileText className="h-8 w-8" />}
                  title="No Script Lines Generated Yet"
                  description="Start by adding dialogue lines manually or create an AI-orchestrated production from a dialogue idea in the studio wizard."
                  action={{
                    label: "Add First Dialogue Line",
                    onClick: handleAddLine,
                  }}
                />
              ) : (
                <>
                  {lines.map((line, idx) => (
                    <div key={line.id} className="rounded-xl border border-border p-4 bg-muted/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-2xs font-bold text-primary">
                            SCENE 0{idx + 1}
                          </span>
                          <Input
                            value={line.speaker}
                            onChange={(e) => {
                              const updated = [...lines];
                              updated[idx].speaker = e.target.value;
                              setLines(updated);
                            }}
                            className="h-7 w-40 text-xs font-bold"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xs text-muted-foreground">Pause:</span>
                          <Input
                            type="number"
                            step="0.1"
                            value={line.pause}
                            onChange={(e) => {
                              const updated = [...lines];
                              updated[idx].pause = parseFloat(e.target.value);
                              setLines(updated);
                            }}
                            className="h-7 w-16 text-xs font-mono"
                          />
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleRemoveLine(line.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      <Field label="Telugu Dialogue (తెలుగు వచనం)">
                        <Textarea
                          rows={2}
                          value={line.telugu}
                          onChange={(e) => {
                            const updated = [...lines];
                            updated[idx].telugu = e.target.value;
                            setLines(updated);
                          }}
                          className="text-sm font-sans"
                        />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <Field label="English Translation / Meaning">
                          <Input
                            value={line.english}
                            onChange={(e) => {
                              const updated = [...lines];
                              updated[idx].english = e.target.value;
                              setLines(updated);
                            }}
                            className="text-xs text-muted-foreground"
                          />
                        </Field>

                        <Field label="Acting / Emotion Cue (నటనా సూచన)">
                          <Input
                            value={line.cue}
                            onChange={(e) => {
                              const updated = [...lines];
                              updated[idx].cue = e.target.value;
                              setLines(updated);
                            }}
                            className="text-xs text-primary font-semibold"
                          />
                        </Field>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 border-dashed py-3"
                    onClick={handleAddLine}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Dialogue Line / Scene</span>
                  </Button>
                </>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Total runtime: <strong>~45 seconds</strong>
              </span>
              <Link href="/studio/storyboard">
                <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                  <span>Handoff to Film Director (Storyboard)</span>
                  <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

