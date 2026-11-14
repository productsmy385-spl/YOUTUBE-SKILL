"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Cpu,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
  DollarSign,
  Clock,
  Eye,
  Settings,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface AgentProfile {
  id: string;
  name: string;
  teluguRole: string;
  category: "Orchestration" | "Creative" | "Production" | "Operations" | "Governance";
  model: string;
  status: "Active" | "Idle" | "Standby";
  invocations: number;
  avgLatency: string;
  costSpent: string;
  systemPrompt: string;
}

const allAgents: AgentProfile[] = [
  {
    id: "agent_01",
    name: "Master Orchestrator",
    teluguRole: "ప్రధాన సమన్వయకర్త (DAG Coordinator)",
    category: "Orchestration",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 1482,
    avgLatency: "1.2s",
    costSpent: "$14.20",
    systemPrompt: "You are the Master Orchestrator. Coordinate state machines, assign sub-tasks, validate handoff artifacts, and enforce scene continuity.",
  },
  {
    id: "agent_02",
    name: "Creative Director",
    teluguRole: "క్రియేటివ్ డైరెక్టర్ (Story Concept & Tone)",
    category: "Creative",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 824,
    avgLatency: "2.8s",
    costSpent: "$8.90",
    systemPrompt: "You are the Creative Director. Analyze dialogue, define emotional arc, pacing, target demographic, and cinematic vision.",
  },
  {
    id: "agent_03",
    name: "Telugu Script Writer",
    teluguRole: "రచయిత (Natural Telugu Grammar & Dialect)",
    category: "Creative",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 912,
    avgLatency: "2.1s",
    costSpent: "$9.40",
    systemPrompt: "You are the Telugu Script Writer. Deliver authentic colloquial Telugu dialogue with precise emotional marks, dramatic pauses, and flawless grammar.",
  },
  {
    id: "agent_04",
    name: "Film Director & Storyboarder",
    teluguRole: "దర్శకుడు (Cinematic Storyboard & Shots)",
    category: "Creative",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 760,
    avgLatency: "3.4s",
    costSpent: "$11.20",
    systemPrompt: "You are the Film Director. Convert script into shot-by-shot storyboards with camera movements, lighting, atmosphere, and visual prompts.",
  },
  {
    id: "agent_05",
    name: "Character Designer",
    teluguRole: "పాత్రల రూపకర్త (Continuity & Bible)",
    category: "Creative",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 540,
    avgLatency: "1.9s",
    costSpent: "$6.80",
    systemPrompt: "You are the Character Designer. Maintain strict facial, wardrobe, hair, and accessory consistency across all generated scenes in the Character Bible.",
  },
  {
    id: "agent_06",
    name: "Gemini Video Generator",
    teluguRole: "వీడియో జనరేషన్ (Veo/Gemini Engine)",
    category: "Production",
    model: "gemini-2.5-veo-video",
    status: "Active",
    invocations: 2420,
    avgLatency: "24.5s",
    costSpent: "$142.50",
    systemPrompt: "You are the Gemini Video Generation Agent. Generate high-fidelity cinematic video clips with fluid motion and consistent lighting.",
  },
  {
    id: "agent_07",
    name: "Telugu Voice Director",
    teluguRole: "వాయిస్ డైరెక్టర్ (Emotional Telugu TTS)",
    category: "Production",
    model: "telugu-neural-tts-v2",
    status: "Active",
    invocations: 1840,
    avgLatency: "3.1s",
    costSpent: "$22.40",
    systemPrompt: "You are the Telugu Voice Director. Synthesize natural human speech with Telugu pronunciation dictionary and emotive inflection.",
  },
  {
    id: "agent_08",
    name: "Music Director",
    teluguRole: "సంగీత దర్శకుడు (BGM Scoring & Ducking)",
    category: "Production",
    model: "gemini-2.5-flash",
    status: "Active",
    invocations: 690,
    avgLatency: "1.4s",
    costSpent: "$4.10",
    systemPrompt: "You are the Music Director. Score scenes with emotional orchestration, traditional Indian instruments, and audio ducking curves.",
  },
  {
    id: "agent_09",
    name: "Sound Designer",
    teluguRole: "శబ్ద గ్రహణం (Foley & Ambience FX)",
    category: "Production",
    model: "gemini-2.5-flash",
    status: "Idle",
    invocations: 430,
    avgLatency: "1.2s",
    costSpent: "$2.90",
    systemPrompt: "You are the Sound Designer. Build realistic Telugu environment soundscapes: village mornings, temple bells, city bustle, and footsteps.",
  },
  {
    id: "agent_10",
    name: "Video Editor (FFmpeg Engine)",
    teluguRole: "ఎడిటర్ (Multi-Track Render & Subtitles)",
    category: "Production",
    model: "ffmpeg-worker-v1",
    status: "Active",
    invocations: 1210,
    avgLatency: "18.2s",
    costSpent: "$12.80",
    systemPrompt: "You are the Video Editor Agent. Assemble timeline tracks, apply sidechain compression ducking, and burn Telugu Unicode subtitles.",
  },
  {
    id: "agent_11",
    name: "Thumbnail Designer",
    teluguRole: "థంబ్‌నైల్ డిజైనర్ (High-CTR Telugu Visuals)",
    category: "Production",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 820,
    avgLatency: "4.5s",
    costSpent: "$16.40",
    systemPrompt: "You are the Thumbnail Designer. Craft viral, high-contrast thumbnails with emotional Telugu character faces and bold typography.",
  },
  {
    id: "agent_12",
    name: "YouTube Operations Manager",
    teluguRole: "యూట్యూబ్ మేనేజర్ (API Upload & SEO)",
    category: "Operations",
    model: "gemini-2.5-flash",
    status: "Active",
    invocations: 940,
    avgLatency: "1.8s",
    costSpent: "$3.40",
    systemPrompt: "You are the YouTube Operations Manager. Optimize bilingual SEO titles, generate chapters, manage API quotas, and handle uploads.",
  },
  {
    id: "agent_13",
    name: "Community Manager",
    teluguRole: "కమ్యూనిటీ మేనేజర్ (Telugu Audience Engagement)",
    category: "Operations",
    model: "gemini-2.5-flash",
    status: "Idle",
    invocations: 310,
    avgLatency: "1.1s",
    costSpent: "$1.80",
    systemPrompt: "You are the Community Manager. Analyze comment sentiment, compose warm Telugu replies, and gather audience story suggestions.",
  },
  {
    id: "agent_14",
    name: "Quality Control (QC) Agent",
    teluguRole: "నాణ్యత తనిఖీ (Pre-Publish Verification)",
    category: "Governance",
    model: "gemini-2.5-flash",
    status: "Active",
    invocations: 1190,
    avgLatency: "1.9s",
    costSpent: "$4.60",
    systemPrompt: "You are the Quality Control Agent. Verify audio loudness (-14 LUFS), check subtitle alignment, and guarantee zero copyright strikes.",
  },
  {
    id: "agent_15",
    name: "Content Repurposing Agent",
    teluguRole: "రీపర్పసింగ్ (16:9 to 9:16 Reframer)",
    category: "Operations",
    model: "gemini-2.5-flash",
    status: "Standby",
    invocations: 280,
    avgLatency: "5.8s",
    costSpent: "$2.90",
    systemPrompt: "You are the Content Repurposing Agent. Extract viral 60-second hooks from long-form videos and dynamically re-crop for Shorts and Reels.",
  },
  {
    id: "agent_16",
    name: "Channel Growth Strategist",
    teluguRole: "గ్రోత్ స్ట్రాటజిస్ట్ (Viral Gap Analysis)",
    category: "Governance",
    model: "gemini-2.5-pro",
    status: "Active",
    invocations: 450,
    avgLatency: "3.9s",
    costSpent: "$7.20",
    systemPrompt: "You are the Channel Growth Strategist. Scan Tollywood and regional trends to propose high-demand video concepts before competitors.",
  },
];

export function AgentManagementView() {
  const [agents, setAgents] = React.useState<AgentProfile[]>(allAgents);
  const [selectedAgent, setSelectedAgent] = React.useState<AgentProfile | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState("all");

  const handleOpenPrompt = (agent: AgentProfile) => {
    setSelectedAgent(agent);
    setIsPromptModalOpen(true);
  };

  const filteredAgents = agents.filter((a) => {
    if (filterCategory === "all") return true;
    return a.category.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Agent Management & Orchestration"
        description="Inspect, tune, and monitor the 16 autonomous AI agents executing the Telugu cinematic production pipeline."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            16 / 16 Agents Operational
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Test All Agents
          </Button>
        </div>
      </PageHeader>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Total Agents</p>
          <p className="text-2xl font-bold mt-1 text-foreground">16 Active</p>
          <span className="text-2xs text-emerald-500 font-medium">100% Health Status</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Monthly Invocations</p>
          <p className="text-2xl font-bold mt-1 text-foreground">13,244</p>
          <span className="text-2xs text-muted-foreground">Avg 827 per agent</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Total Agent Cost</p>
          <p className="text-2xl font-bold mt-1 text-foreground">$269.80</p>
          <span className="text-2xs text-emerald-500 font-medium">$1.82 avg per video</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Pipeline Throughput</p>
          <p className="text-2xl font-bold mt-1 text-foreground">99.4%</p>
          <span className="text-2xs text-muted-foreground">Failures recovered via retry</span>
        </Card>
      </div>

      {/* Agents Filter & Grid */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              Specialized Agent Registry
            </CardTitle>
            <CardDescription>
              Each agent operates under a strict role, typed input/output schema, and dedicated system prompt.
            </CardDescription>
          </div>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[
              { label: "All Categories (16)", value: "all" },
              { label: "Orchestration (1)", value: "orchestration" },
              { label: "Creative (4)", value: "creative" },
              { label: "Production (5)", value: "production" },
              { label: "Operations (3)", value: "operations" },
              { label: "Governance (2)", value: "governance" },
            ]}
            className="w-48 text-xs"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="p-4 rounded-xl border border-border bg-card shadow-card hover:border-primary/40 transition-colors flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-2xs">
                      {agent.category}
                    </Badge>
                    <Badge
                      variant={
                        agent.status === "Active"
                          ? "brand"
                          : agent.status === "Standby"
                          ? "warning"
                          : "outline"
                      }
                      className="text-2xs"
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <h3 className="text-xs font-bold text-foreground">{agent.name}</h3>
                  <p className="text-2xs text-primary font-medium mt-0.5">{agent.teluguRole}</p>
                </div>

                <div className="space-y-1.5 text-2xs pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span className="font-mono text-foreground font-medium">{agent.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Invocations</span>
                    <span className="text-foreground">{agent.invocations.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Latency</span>
                    <span className="text-foreground">{agent.avgLatency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="text-emerald-500 font-semibold">{agent.costSpent}</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenPrompt(agent)}
                    className="w-full text-2xs h-7 gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Configure Prompt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit System Prompt Modal */}
      {selectedAgent && (
        <Dialog open={isPromptModalOpen} onOpenChange={setIsPromptModalOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Configure: {selectedAgent.name}
              </DialogTitle>
              <DialogDescription>
                Tuning instructions and model routing for {selectedAgent.teluguRole}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Assigned Model
                  </label>
                  <Select
                    value={selectedAgent.model}
                    onChange={(e) => {
                      if (selectedAgent) {
                        setSelectedAgent({ ...selectedAgent, model: e.target.value });
                      }
                    }}
                    options={[
                      { label: "gemini-2.5-pro (Creative / Reasoning)", value: "gemini-2.5-pro" },
                      { label: "gemini-2.5-flash (Fast Operations)", value: "gemini-2.5-flash" },
                      { label: "gemini-2.5-veo-video (Veo Engine)", value: "gemini-2.5-veo-video" },
                      { label: "telugu-neural-tts-v2 (Voice Synthesis)", value: "telugu-neural-tts-v2" },
                      { label: "ffmpeg-worker-v1 (Timeline Engine)", value: "ffmpeg-worker-v1" },
                    ]}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Agent Status</label>
                  <Select
                    value={selectedAgent.status}
                    onChange={(e) => {
                      if (selectedAgent) {
                        setSelectedAgent({
                          ...selectedAgent,
                          status: e.target.value as "Active" | "Idle" | "Standby",
                        });
                      }
                    }}
                    options={[
                      { label: "Active", value: "Active" },
                      { label: "Idle", value: "Idle" },
                      { label: "Standby", value: "Standby" },
                    ]}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  System Instructions & Guardrails
                </label>
                <Textarea
                  rows={6}
                  value={selectedAgent.systemPrompt}
                  onChange={(e) =>
                    setSelectedAgent({ ...selectedAgent, systemPrompt: e.target.value })
                  }
                  className="font-mono text-xs leading-relaxed"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPromptModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setAgents((prev) =>
                    prev.map((a) => (a.id === selectedAgent.id ? selectedAgent : a))
                  );
                  setIsPromptModalOpen(false);
                }}
              >
                Save Agent Configuration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

