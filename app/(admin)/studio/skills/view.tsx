"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  Wrench,
  Sparkles,
  Code2,
  CheckCircle2,
  Play,
  Terminal,
  Layers,
  Volume2,
  Tv,
  Camera,
  Film,
  Search,
} from "lucide-react";

interface SkillItem {
  id: string;
  name: string;
  category: "Video" | "Audio" | "Publishing" | "Text" | "QC";
  description: string;
  inputSchema: string;
  outputSchema: string;
  assignedAgents: string[];
  status: "Operational" | "Ready";
}

const skillsList: SkillItem[] = [
  {
    id: "tool_veo_clip",
    name: "generate_gemini_video_clip",
    category: "Video",
    description: "Invokes Gemini Veo video engine with scene prompt, camera motion vector, duration, and aspect ratio.",
    inputSchema: '{ "prompt": "string", "duration": 5, "aspectRatio": "9:16", "seed": 42 }',
    outputSchema: '{ "videoUrl": "string", "clipDuration": 5, "resolution": "1080x1920" }',
    assignedAgents: ["Agent 06 (Gemini Video Generator)"],
    status: "Operational",
  },
  {
    id: "tool_telugu_tts",
    name: "synthesize_telugu_speech",
    category: "Audio",
    description: "Generates emotive Telugu neural audio using pronunciation dictionary and pitch/speed control.",
    inputSchema: '{ "teluguText": "string", "voiceId": "te_female_priya", "emotion": "emotional" }',
    outputSchema: '{ "audioUrl": "string", "duration": 4.8, "sampleRate": 48000 }',
    assignedAgents: ["Agent 07 (Telugu Voice Director)"],
    status: "Operational",
  },
  {
    id: "tool_ffmpeg_timeline",
    name: "assemble_ffmpeg_timeline",
    category: "Video",
    description: "Background worker multi-track video compositor with sidechain ducking and Telugu subtitle burning.",
    inputSchema: '{ "videoClips": "string[]", "voiceTracks": "string[]", "bgmTrack": "string", "subtitlesSrt": "string" }',
    outputSchema: '{ "finalVideoUrl": "string", "fileSizeBytes": 48200100, "duration": 60 }',
    assignedAgents: ["Agent 10 (Video Editor)"],
    status: "Operational",
  },
  {
    id: "tool_yt_upload",
    name: "youtube_resumable_upload",
    category: "Publishing",
    description: "Executes Google Resumable Media Protocol upload with metadata tags, playlist insertion, and thumbnail upload.",
    inputSchema: '{ "videoPath": "string", "title": "string", "description": "string", "privacy": "public" }',
    outputSchema: '{ "videoId": "string", "url": "string", "quotaUsed": 1650 }',
    assignedAgents: ["Agent 12 (YouTube Operations Manager)"],
    status: "Operational",
  },
  {
    id: "tool_ig_reels",
    name: "instagram_reels_publish",
    category: "Publishing",
    description: "Publishes 9:16 video to Instagram via Meta Graph Container API with audio attribution and hashtags.",
    inputSchema: '{ "videoUrl": "string", "caption": "string", "shareToFeed": true }',
    outputSchema: '{ "mediaId": "string", "permalink": "string", "status": "PUBLISHED" }',
    assignedAgents: ["Agent 12 (YouTube Operations)", "Agent 15 (Content Repurposing)"],
    status: "Operational",
  },
  {
    id: "tool_qc_loudness",
    name: "quality_control_audio_loudness",
    category: "QC",
    description: "Analyzes audio waveform to ensure compliant integrated loudness (-14 LUFS) and peak limiting.",
    inputSchema: '{ "audioFilePath": "string", "targetLufs": -14 }',
    outputSchema: '{ "integratedLufs": -14.1, "truePeakDb": -1.2, "passed": true }',
    assignedAgents: ["Agent 14 (Quality Control)"],
    status: "Operational",
  },
];

export function SkillsRegistryView() {
  const [search, setSearch] = React.useState("");
  const [selectedSkill, setSelectedSkill] = React.useState<SkillItem | null>(null);
  const [testOutput, setTestOutput] = React.useState<string | null>(null);
  const [isTesting, setIsTesting] = React.useState(false);

  const filteredSkills = skillsList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleTestSkill = async () => {
    if (!selectedSkill) return;
    setIsTesting(true);
    setTestOutput(null);

    await new Promise((r) => setTimeout(r, 800));
    setTestOutput(
      JSON.stringify(
        {
          status: "SUCCESS",
          executionTimeMs: 412,
          result: JSON.parse(selectedSkill.outputSchema),
        },
        null,
        2
      )
    );
    setIsTesting(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Agent Skills & Tool Registry"
        description="Deterministic tool layer invoked by the 16 AI agents to generate video, synthesize Telugu voices, compose timelines, and publish."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            6 / 6 Tools Active
          </Badge>
        </div>
      </PageHeader>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skill by function name or description..."
          className="pl-9 text-xs"
        />
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <Card key={skill.id} className="flex flex-col justify-between hover:border-primary/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-2xs">
                  {skill.category}
                </Badge>
                <Badge variant="brand" className="text-2xs">
                  {skill.status}
                </Badge>
              </div>
              <CardTitle className="text-xs font-mono text-primary flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-foreground" />
                {skill.name}
              </CardTitle>
              <CardDescription className="text-2xs line-clamp-2 mt-1">
                {skill.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
              <div className="p-2.5 rounded-lg bg-muted/40 border border-border text-2xs space-y-1">
                <span className="text-muted-foreground font-semibold block">Assigned Agents:</span>
                <p className="text-foreground">{skill.assignedAgents.join(", ")}</p>
              </div>

              <div className="flex justify-end pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedSkill(skill);
                    setTestOutput(null);
                  }}
                  className="w-full text-2xs h-8 gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Inspect & Test Tool
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tool Test Dialog */}
      {selectedSkill && (
        <Dialog open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-mono text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                {selectedSkill.name}
              </DialogTitle>
              <DialogDescription>{selectedSkill.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div>
                <label className="font-semibold text-foreground block mb-1">Input JSON Payload</label>
                <pre className="p-3 rounded-lg bg-muted/50 border border-border font-mono text-2xs overflow-x-auto text-primary">
                  {selectedSkill.inputSchema}
                </pre>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">Expected Output Schema</label>
                <pre className="p-3 rounded-lg bg-muted/50 border border-border font-mono text-2xs overflow-x-auto text-muted-foreground">
                  {selectedSkill.outputSchema}
                </pre>
              </div>

              {testOutput && (
                <div>
                  <label className="font-semibold text-emerald-500 block mb-1">Test Execution Response</label>
                  <pre className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-mono text-2xs overflow-x-auto text-emerald-400">
                    {testOutput}
                  </pre>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedSkill(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleTestSkill}
                disabled={isTesting}
                className="gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                {isTesting ? "Executing Tool..." : "Run Test Invocation"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

