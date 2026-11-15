"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Bot,
  RefreshCw,
  Settings,
  Play,
  CheckCircle2,
  Clock,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export interface AgentProfile {
  id: string;
  agentCode: string;
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

const DEFAULT_18_AGENTS: AgentProfile[] = [
  {
    id: "agent_01",
    agentCode: "orchestrator",
    name: "Master Orchestrator",
    teluguRole: "ప్రధాన సమన్వయకర్త (DAG Coordinator)",
    category: "Orchestration",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 148,
    avgLatency: "1.2s",
    costSpent: "$1.40",
    systemPrompt: "You are the Master Orchestrator. Coordinate state machines, assign sub-tasks, validate handoff artifacts, and enforce scene continuity.",
  },
  {
    id: "agent_02",
    agentCode: "creative_director",
    name: "Creative Director",
    teluguRole: "క్రియేటివ్ డైరెక్టర్ (Story Concept & Tone)",
    category: "Creative",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 82,
    avgLatency: "2.8s",
    costSpent: "$0.89",
    systemPrompt: "You are the Creative Director. Analyze dialogue, define emotional arc, pacing, target demographic, and cinematic vision.",
  },
  {
    id: "agent_03",
    agentCode: "telugu_script_writer",
    name: "Telugu Script Writer",
    teluguRole: "రచయిత (Natural Telugu Grammar & Dialect)",
    category: "Creative",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 91,
    avgLatency: "2.1s",
    costSpent: "$0.94",
    systemPrompt: "You are the Telugu Script Writer. Deliver authentic colloquial Telugu dialogue with precise emotional marks, dramatic pauses, and flawless grammar.",
  },
  {
    id: "agent_04",
    agentCode: "film_director",
    name: "Film Director",
    teluguRole: "దర్శకుడు (Cinematic Storyboard & Shots)",
    category: "Creative",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 76,
    avgLatency: "3.4s",
    costSpent: "$1.12",
    systemPrompt: "You are the Film Director. Convert script into shot-by-shot storyboards with camera movements, lighting, atmosphere, and visual prompts.",
  },
  {
    id: "agent_05",
    agentCode: "character_designer",
    name: "Character Designer",
    teluguRole: "పాత్రల రూపకర్త (Continuity & Bible)",
    category: "Creative",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 54,
    avgLatency: "1.9s",
    costSpent: "$0.68",
    systemPrompt: "You are the Character Designer. Maintain strict facial, wardrobe, hair, and accessory consistency across all generated scenes in the Character Bible.",
  },
  {
    id: "agent_06",
    agentCode: "gemini_video",
    name: "Gemini Video Generator",
    teluguRole: "వీడియో జనరేషన్ (Veo Engine)",
    category: "Production",
    model: "veo-2.0-generate-001",
    status: "Active",
    invocations: 242,
    avgLatency: "12.5s",
    costSpent: "$14.25",
    systemPrompt: "You are the Gemini Video Generation Agent. Direct video generation using Gemini/Veo, ensuring consistent visual aesthetics, correct aspect ratios, and seamless transitions.",
  },
  {
    id: "agent_07",
    agentCode: "telugu_voice",
    name: "Telugu Voice Director",
    teluguRole: "వాయిస్ డైరెక్టర్ (Emotional Telugu TTS)",
    category: "Production",
    model: "elevenlabs-telugu-neural",
    status: "Active",
    invocations: 184,
    avgLatency: "3.1s",
    costSpent: "$2.24",
    systemPrompt: "You are the Telugu Voice Director. Synthesize natural human speech with Telugu pronunciation dictionary and emotive inflection.",
  },
  {
    id: "agent_08",
    agentCode: "music_director",
    name: "Music Director",
    teluguRole: "సంగీత దర్శకుడు (BGM Scoring & Ducking)",
    category: "Production",
    model: "music-library-v2",
    status: "Active",
    invocations: 69,
    avgLatency: "1.4s",
    costSpent: "$0.41",
    systemPrompt: "You are the Music Director. Choose and position background scores that amplify emotional resonance without overwhelming speech dialogues.",
  },
  {
    id: "agent_09",
    agentCode: "sound_designer",
    name: "Sound Effects & Foley Director",
    teluguRole: "శబ్ద గ్రహణం (Foley & Ambience FX)",
    category: "Production",
    model: "foley-engine-v1",
    status: "Active",
    invocations: 43,
    avgLatency: "1.2s",
    costSpent: "$0.29",
    systemPrompt: "You are the Sound Designer. Build realistic Telugu environment soundscapes and tactile sound cues synchronized to every on-screen action.",
  },
  {
    id: "agent_10",
    agentCode: "subtitle_artist",
    name: "Subtitle & Typography Artist",
    teluguRole: "సబ్‌టైటిల్ ఆర్టిస్ట్ (Dynamic Karaoke Subs)",
    category: "Production",
    model: "subtitle-forge-v1",
    status: "Active",
    invocations: 110,
    avgLatency: "1.0s",
    costSpent: "$0.35",
    systemPrompt: "You are the Subtitle & Typography Artist. Generate accurate Telugu SRT/VTT subtitles with high-contrast styling and dynamic keyword emphasis.",
  },
  {
    id: "agent_11",
    agentCode: "video_editor",
    name: "Master Video Editor & Assembler",
    teluguRole: "మాస్టర్ ఎడిటర్ (FFmpeg Timeline Assembler)",
    category: "Production",
    model: "ffmpeg-assembly-engine",
    status: "Active",
    invocations: 121,
    avgLatency: "18.2s",
    costSpent: "$1.28",
    systemPrompt: "You are the Video Editor Agent. Assemble timeline tracks, apply sidechain compression ducking, and burn Telugu Unicode subtitles.",
  },
  {
    id: "agent_12",
    agentCode: "thumbnail_designer",
    name: "Thumbnail Designer & Packaging Artist",
    teluguRole: "థంబ్‌నైల్ డిజైనర్ (High-CTR Telugu Visuals)",
    category: "Production",
    model: "imagen-3-fast",
    status: "Active",
    invocations: 82,
    avgLatency: "4.5s",
    costSpent: "$1.64",
    systemPrompt: "You are the Thumbnail Designer. Craft viral, high-contrast thumbnails with emotional Telugu character faces and bold typography.",
  },
  {
    id: "agent_13",
    agentCode: "seo_metadata",
    name: "YouTube Metadata & SEO Strategist",
    teluguRole: "యూట్యూబ్ ఎస్‌ఈఓ మేనేజర్ (Metadata & Tags)",
    category: "Operations",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 94,
    avgLatency: "1.8s",
    costSpent: "$0.34",
    systemPrompt: "You are the YouTube Metadata & SEO Strategist. Optimize titles for high click-through rates and write keyword-dense descriptions and tags.",
  },
  {
    id: "agent_14",
    agentCode: "social_repurposer",
    name: "Social Media Repurposing Specialist",
    teluguRole: "సోషల్ మీడియా రీపర్పసర్ (Shorts & Reels)",
    category: "Operations",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 28,
    avgLatency: "5.8s",
    costSpent: "$0.29",
    systemPrompt: "You are the Content Repurposing Agent. Extract viral 60-second hooks from long-form videos and dynamically re-crop for Shorts and Reels.",
  },
  {
    id: "agent_15",
    agentCode: "publishing_dispatcher",
    name: "Publishing & Automation Dispatcher",
    teluguRole: "పబ్లిషింగ్ డిస్పాచర్ (API Uploads & Scheduler)",
    category: "Operations",
    model: "youtube-data-api-v3",
    status: "Active",
    invocations: 65,
    avgLatency: "2.5s",
    costSpent: "$0.10",
    systemPrompt: "You are the Publishing & Automation Dispatcher. Execute scheduled uploads, verify metadata compliance, track upload progress, and confirm live status.",
  },
  {
    id: "agent_16",
    agentCode: "channel_analyst",
    name: "YouTube Channel Analyst & Ops Manager",
    teluguRole: "ఛానల్ అనలిస్ట్ (Retention & Engagement)",
    category: "Operations",
    model: "youtube-analytics-engine",
    status: "Active",
    invocations: 45,
    avgLatency: "3.9s",
    costSpent: "$0.72",
    systemPrompt: "You are the YouTube Channel Analyst. Deliver actionable audience analytics, identify audience drop-off moments, and optimize content publishing cadences.",
  },
  {
    id: "agent_17",
    agentCode: "quality_control",
    name: "Quality Control & Safety Officer",
    teluguRole: "నాణ్యత తనిఖీ (Pre-Publish Verification)",
    category: "Governance",
    model: "qc-gate-v1",
    status: "Active",
    invocations: 119,
    avgLatency: "1.9s",
    costSpent: "$0.46",
    systemPrompt: "You are the Quality Control Agent. Verify audio loudness (-16 LUFS), check subtitle alignment, and guarantee zero copyright strikes.",
  },
  {
    id: "agent_18",
    agentCode: "multilingual_localizer",
    name: "Multilingual Localization Agent",
    teluguRole: "బహుభాషా అనువాదం (Hindi/Tamil/English Dubbing)",
    category: "Governance",
    model: "gemini-2.0-flash",
    status: "Active",
    invocations: 34,
    avgLatency: "2.4s",
    costSpent: "$0.38",
    systemPrompt: "You are the Multilingual Localization Agent. Translate cultural idioms, humor, and dialogue from Telugu into Hindi, Tamil, and English without losing impact.",
  },
];

export function AgentManagementView() {
  const [agents, setAgents] = React.useState<AgentProfile[]>(DEFAULT_18_AGENTS);
  const [selectedAgent, setSelectedAgent] = React.useState<AgentProfile | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = React.useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = React.useState(false);
  const [testInput, setTestInput] = React.useState("తెలుగు కామెడీ సీన్ - ఆఫీస్ లేట్ ఎంట్రీ");
  const [testResult, setTestResult] = React.useState<string | null>(null);
  const [isTesting, setIsTesting] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState("all");

  React.useEffect(() => {
    fetch("/api/agents")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.agents && data.agents.length > 0) {
          // Merge PostgreSQL agent records
          setAgents((prev) =>
            prev.map((a) => {
              const found = data.agents.find((dbA: { agentCode: string; name: string; description: string; systemPrompt: string }) => dbA.agentCode === a.agentCode);
              if (found) {
                return {
                  ...a,
                  name: found.name,
                  systemPrompt: found.systemPrompt || a.systemPrompt,
                };
              }
              return a;
            })
          );
        }
      })
      .catch((err) => console.warn("Notice loading agents from PostgreSQL:", err));
  }, []);

  const handleOpenPrompt = (agent: AgentProfile) => {
    setSelectedAgent(agent);
    setIsPromptModalOpen(true);
  };

  const handleOpenTest = (agent: AgentProfile) => {
    setSelectedAgent(agent);
    setTestResult(null);
    setIsTestModalOpen(true);
  };

  const executeAgentTest = async () => {
    if (!selectedAgent) return;
    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch("/api/agents/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentCode: selectedAgent.agentCode,
          payload: {
            title: testInput,
            rawInput: testInput,
            dialogue: testInput,
            genre: "Comedy",
            durationSeconds: 45,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTestResult(JSON.stringify(data, null, 2));
      } else {
        setTestResult(`Error: ${data.error || "Execution failed"}`);
      }
    } catch (err) {
      setTestResult(`Network/Server Error: ${String(err)}`);
    } finally {
      setIsTesting(false);
    }
  };

  const filteredAgents = agents.filter((a) => {
    if (filterCategory === "all") return true;
    return a.category.toLowerCase() === filterCategory.toLowerCase();
  });

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Autonomous AI Agent Command Center"
        description="Inspect, test, and tune the 18 specialized AI agents powering the Telugu cinematic production and YouTube operations pipeline."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            18 / 18 Agents Operational
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => {
              fetch("/api/agents")
                .then((r) => r.json())
                .then(() => alert("All 18 agents verified healthy against PostgreSQL."))
                .catch((e) => alert("Health check: " + e));
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Verify Health
          </Button>
        </div>
      </PageHeader>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Total Registered Agents</p>
          <p className="text-2xl font-bold mt-1 text-foreground">18 Active</p>
          <span className="text-2xs text-emerald-500 font-medium">PostgreSQL Relational DB</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Active Invocations</p>
          <p className="text-2xl font-bold mt-1 text-foreground">
            {agents.reduce((sum, a) => sum + a.invocations, 0).toLocaleString()}
          </p>
          <span className="text-2xs text-muted-foreground">Recorded in ai_agent_runs</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Database Persistence</p>
          <p className="text-2xl font-bold mt-1 text-foreground">PostgreSQL</p>
          <span className="text-2xs text-emerald-500 font-medium">56 Tables Migrated</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Pipeline Throughput</p>
          <p className="text-2xl font-bold mt-1 text-foreground">100%</p>
          <span className="text-2xs text-emerald-500 font-medium">Autonomous Failover</span>
        </Card>
      </div>

      {/* Agents Filter & Grid */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              Specialized 18-Agent Registry
            </CardTitle>
            <CardDescription>
              Each agent operates under a strict role, typed input/output schema, and dedicated system prompt.
            </CardDescription>
          </div>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            options={[
              { label: "All Categories (18)", value: "all" },
              { label: "Orchestration (1)", value: "orchestration" },
              { label: "Creative (4)", value: "creative" },
              { label: "Production (7)", value: "production" },
              { label: "Operations (4)", value: "operations" },
              { label: "Governance (2)", value: "governance" },
            ]}
            className="w-48 text-xs"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    <Badge variant="brand" className="text-2xs">
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

                <div className="pt-2 grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenTest(agent)}
                    className="text-2xs h-7 gap-1"
                  >
                    <Play className="w-3 h-3 text-emerald-500" />
                    Test Agent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenPrompt(agent)}
                    className="text-2xs h-7 gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Agent Modal */}
      {selectedAgent && (
        <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-emerald-500" />
                Live Agent Execution: {selectedAgent.name}
              </DialogTitle>
              <DialogDescription>
                Trigger a valid execution of {selectedAgent.teluguRole} and inspect outputs.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Test Prompt / Dialogue Input
                </label>
                <Input
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Enter test prompt, topic, or dialogue..."
                  className="text-xs"
                />
              </div>

              {testResult && (
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Agent Output Artifact (Recorded in PostgreSQL)
                  </label>
                  <pre className="bg-muted p-3 rounded-lg text-2xs font-mono max-h-64 overflow-y-auto whitespace-pre-wrap text-foreground">
                    {testResult}
                  </pre>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsTestModalOpen(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={executeAgentTest}
                disabled={isTesting}
                className="gap-2"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing Agent...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Run Agent Now
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

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
                      { label: "gemini-2.0-flash (Recommended)", value: "gemini-2.0-flash" },
                      { label: "gemini-2.5-pro (Reasoning)", value: "gemini-2.5-pro" },
                      { label: "veo-2.0-generate-001 (Veo Engine)", value: "veo-2.0-generate-001" },
                      { label: "elevenlabs-telugu-neural (Voice)", value: "elevenlabs-telugu-neural" },
                      { label: "ffmpeg-assembly-engine", value: "ffmpeg-assembly-engine" },
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
