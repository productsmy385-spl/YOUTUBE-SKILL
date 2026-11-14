"use client";

import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clapperboard,
  Clock,
  Film,
  Layers,
  Mic,
  Play,
  Plus,
  Radio,
  Send,
  Sparkles,
  TrendingUp,
  Tv,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// The 16 Specialized AI Agents Swarm
const studioAgents = [
  { id: "01", name: "Master Orchestrator", role: "Workflow & Cost Coordination", status: "Active", calls: "1,248" },
  { id: "02", name: "Creative Director", role: "Hooks, Tone & Arc Analysis", status: "Active", calls: "982" },
  { id: "03", name: "Telugu Script Writer", role: "Natural Telugu Dialogue & Cues", status: "Active", calls: "1,140" },
  { id: "04", name: "Film Director", role: "Cinematic Storyboard & Prompts", status: "Active", calls: "890" },
  { id: "05", name: "Character Designer", role: "Face & Visual Continuity Bible", status: "Active", calls: "640" },
  { id: "06", name: "Gemini Video Agent", role: "Async Video Clip Generation", status: "Active", calls: "420" },
  { id: "07", name: "Telugu Voice Director", role: "Emotional Telugu TTS & Normalization", status: "Active", calls: "1,050" },
  { id: "08", name: "Music Director", role: "Licensed Score Selection & Ducking", status: "Active", calls: "730" },
  { id: "09", name: "Sound Designer", role: "Ambient Foley & SFX Transitions", status: "Active", calls: "690" },
  { id: "10", name: "Video Editor", role: "FFmpeg Assembly & Telugu Subtitles", status: "Active", calls: "510" },
  { id: "11", name: "Thumbnail Designer", role: "Telugu Text Overlay & Expressions", status: "Active", calls: "840" },
  { id: "12", name: "SEO & Metadata", role: "Titles, Descriptions & Pinned CTA", status: "Active", calls: "920" },
  { id: "13", name: "Quality Control", role: "Aspect, Clipping & Subtitle Sync", status: "Active", calls: "510" },
  { id: "14", name: "YouTube Operations", role: "OAuth 2.0 & Resumable Uploads", status: "Connected", calls: "380" },
  { id: "15", name: "Instagram Operations", role: "Meta Graph API Reels Publisher", status: "Ready", calls: "120" },
  { id: "16", name: "Analytics Agent", role: "Audience Retention & Insights", status: "Active", calls: "1,450" },
];

const activeProjects = [
  {
    id: "proj-101",
    title: "ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ డైలాగ్ (Office Late Entry Comedy)",
    platform: "YouTube Shorts",
    ratio: "9:16",
    duration: "45s",
    stage: "Awaiting Creator Approval",
    stageBadge: "warning",
    progress: 85,
    scenes: 5,
    updated: "10 mins ago",
  },
  {
    id: "proj-102",
    title: "అమ్మ ప్రేమ ఎమోషనల్ సీన్ (Mother's Love Emotion)",
    platform: "Instagram Reels",
    ratio: "9:16",
    duration: "60s",
    stage: "Voice Synthesis & Normalization",
    stageBadge: "info",
    progress: 60,
    scenes: 6,
    updated: "35 mins ago",
  },
  {
    id: "proj-103",
    title: "తెలుగు సినీ ఇండస్ట్రీ సక్సెస్ సీక్రెట్ (Industry Success Story)",
    platform: "YouTube Long",
    ratio: "16:9",
    duration: "3m 45s",
    stage: "Gemini Video Rendering",
    stageBadge: "default",
    progress: 40,
    scenes: 12,
    updated: "1 hour ago",
  },
  {
    id: "proj-104",
    title: "గ్రామదేవత ఉత్సవం భక్తి ప్రసంగం (Temple Festival Devotion)",
    platform: "YouTube Shorts",
    ratio: "9:16",
    duration: "58s",
    stage: "Scheduled for Today, 8:00 PM IST",
    stageBadge: "success",
    progress: 100,
    scenes: 7,
    updated: "2 hours ago",
  },
];

export function StudioOverviewView() {
  const [selectedTab, setSelectedTab] = useState<"projects" | "agents" | "pipeline">("projects");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sir's AI YouTube Agentic Studio"
        description="Autonomous multi-agent control center for cinematic Telugu video production, automated editing, and YouTube channel operations."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/calendar">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Publishing Schedule</span>
              </Button>
            </Link>
            <Link href="/studio/create">
              <Button variant="brand" size="sm" className="gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>Create Video</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Active Productions
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Film className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight text-foreground font-sans">
                <AnimatedCounter value={18} />
              </p>
              <span className="text-xs font-medium text-success">+4 today</span>
            </div>
            <p className="mt-1 text-2xs text-muted-foreground">
              4 awaiting approval &bull; 6 generating
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Telugu Voice Synthesized
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mic className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight text-foreground font-sans">
                <AnimatedCounter value={142} />
              </p>
              <span className="text-xs font-medium text-success">100% natural te-IN</span>
            </div>
            <p className="mt-1 text-2xs text-muted-foreground">
              Conversational, dramatic &amp; comedy registers
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                YouTube Pipeline
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Tv className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight text-foreground font-sans">
                <AnimatedCounter value={28} />
              </p>
              <span className="text-xs font-medium text-muted-foreground">Shorts &amp; Reels</span>
            </div>
            <p className="mt-1 text-2xs text-muted-foreground">
              5 scheduled for next 48h (Asia/Kolkata)
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                AI Swarm Readiness
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-2xl font-bold tracking-tight text-foreground font-sans">
                16 / 16
              </p>
              <Badge variant="success" className="text-2xs font-semibold">
                Operational
              </Badge>
            </div>
            <p className="mt-1 text-2xs text-muted-foreground">
              FFmpeg worker connected &bull; Mock mode active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Production Quick Banner */}
      <Card className="border-primary/30 bg-gradient-to-r from-card via-card to-primary/5 p-6 shadow-card">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="brand" className="text-2xs">
                Creator Fast Track
              </Badge>
              <span className="text-xs text-muted-foreground">Ready in under 3 minutes</span>
            </div>
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              Have a raw Telugu dialogue or voice idea?
            </h2>
            <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
              Drop your Telugu one-liner, comedy punch, or dialogue snippet. The Master Orchestrator delegates tasks to the Script Writer, Film Director, Gemini Video Agent, Telugu Voice Director, and FFmpeg Editor to deliver a fully edited short with synced subtitles.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/studio/create">
              <Button variant="default" className="gap-2 font-semibold shadow-card">
                <Sparkles className="h-4 w-4" />
                <span>Launch Production Wizard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Main Tabbed Area: Projects vs Agents Swarm */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <Button
              variant={selectedTab === "projects" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("projects")}
              className="text-xs"
            >
              Active Productions ({activeProjects.length})
            </Button>
            <Button
              variant={selectedTab === "agents" ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTab("agents")}
              className="text-xs"
            >
              AI Agents Swarm (16)
            </Button>
          </div>
          <Link href="/studio/queue" className="text-xs font-semibold text-primary hover:underline">
            View Full Queue &rarr;
          </Link>
        </div>

        {selectedTab === "projects" && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {activeProjects.map((project) => (
              <Card key={project.id} className="border-border bg-card shadow-card transition-all hover:border-primary/30">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-2xs font-semibold">
                          {project.platform} ({project.ratio})
                        </Badge>
                        <span className="text-2xs text-muted-foreground font-mono">
                          {project.duration} &bull; {project.scenes} scenes
                        </span>
                      </div>
                      <h3 className="truncate text-sm font-bold text-foreground">
                        {project.title}
                      </h3>
                    </div>
                    <Badge
                      variant={
                        project.stageBadge === "success"
                          ? "success"
                          : project.stageBadge === "warning"
                          ? "warning"
                          : "secondary"
                      }
                      className="shrink-0 text-2xs"
                    >
                      {project.stage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-2xs text-muted-foreground">
                      <span>Pipeline Progress</span>
                      <span className="font-semibold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/80">
                    <span className="text-2xs text-muted-foreground">Updated {project.updated}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/studio/workspace/${project.id}`}>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          Open Studio
                        </Button>
                      </Link>
                      {project.progress === 100 ? (
                        <Link href="/studio/publishing-queue">
                          <Button variant="default" size="sm" className="h-7 text-xs gap-1">
                            <Send className="h-3 w-3" />
                            <span>Publish</span>
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/studio/workspace/${project.id}`}>
                          <Button variant="brand" size="sm" className="h-7 text-xs gap-1">
                            <Play className="h-3 w-3" />
                            <span>Inspect</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === "agents" && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {studioAgents.map((agent) => (
              <Card key={agent.id} className="border-border bg-card shadow-card p-4">
                <div className="flex items-start justify-between">
                  <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-primary">
                    AGENT {agent.id}
                  </span>
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">
                    {agent.status}
                  </Badge>
                </div>
                <h4 className="mt-2 text-xs font-bold text-foreground truncate">
                  {agent.name}
                </h4>
                <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">
                  {agent.role}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/60 text-2xs text-muted-foreground">
                  <span>Executions:</span>
                  <span className="font-semibold text-foreground font-mono">{agent.calls}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Production Pipeline Lifecycle Steps Guide */}
      <Card className="border-border bg-card p-5 shadow-card">
        <CardHeader className="p-0 pb-4">
          <CardTitle>Autonomous Telugu Video Lifecycle</CardTitle>
          <CardDescription>
            Every project flows through 13 immutable stages coordinated by the Master Orchestrator.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 text-center">
            {[
              { num: "01", step: "Raw Input", desc: "Dialogue / Voice" },
              { num: "02", step: "Creative Brief", desc: "Hook & Arc" },
              { num: "03", step: "Telugu Script", desc: "Natural te-IN" },
              { num: "04", step: "Storyboard", desc: "Cinematic shots" },
              { num: "05", step: "Character", desc: "Face Continuity" },
              { num: "06", step: "Gemini Video", desc: "Veo Generation" },
              { num: "07", step: "Telugu Voice", desc: "Emotional TTS" },
              { num: "08", step: "Music & SFX", desc: "Licensed & Foley" },
              { num: "09", step: "Video Editor", desc: "FFmpeg & Subs" },
              { num: "10", step: "Thumbnail", desc: "Telugu Typography" },
              { num: "11", step: "Quality Control", desc: "Audio & Ratio QC" },
              { num: "12", step: "Approval", desc: "Creator Gate" },
              { num: "13", step: "YouTube Publish", desc: "Resumable Upload" },
              { num: "14", step: "Analytics", desc: "Retention Insights" },
            ].map((s) => (
              <div key={s.num} className="rounded-lg border border-border/60 bg-muted/40 p-2.5">
                <span className="text-[10px] font-mono font-bold text-primary">{s.num}</span>
                <p className="text-xs font-semibold text-foreground mt-0.5">{s.step}</p>
                <p className="text-2xs text-muted-foreground truncate">{s.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

