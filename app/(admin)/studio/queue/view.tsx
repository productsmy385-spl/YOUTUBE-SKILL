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
import { AdvancedTable } from "@/components/ui/advanced-table";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Film,
  Mic,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Tv,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface QueueJob extends Record<string, unknown> {
  id: string;
  project: string;
  type: string;
  stage: string;
  agent: string;
  status: "Running" | "Completed" | "Queued" | "Failed";
  progress: number;
  duration: string;
  startedAt: string;
}

export function ProductionQueueView() {
  const [jobs, setJobs] = useState<QueueJob[]>([
    {
      id: "JOB-4821",
      project: "ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ రీల్",
      type: "Telugu Voice Synthesis",
      stage: "Scene 03 Dialogue & Emotion Tagging",
      agent: "Agent 07 (Telugu Voice Director)",
      status: "Running",
      progress: 68,
      duration: "1m 12s",
      startedAt: "2 mins ago",
    },
    {
      id: "JOB-4820",
      project: "అమ్మ ప్రేమ ఎమోషనల్ సీన్",
      type: "Gemini Video Generation",
      stage: "Veo 9:16 Video Clip Rendering",
      agent: "Agent 06 (Gemini Video Agent)",
      status: "Running",
      progress: 42,
      duration: "2m 05s",
      startedAt: "3 mins ago",
    },
    {
      id: "JOB-4819",
      project: "హైదరాబాద్ ట్రాఫిక్ సస్టెయినబుల్ రిపోర్ట్",
      type: "FFmpeg Assembly",
      stage: "Burning Telugu Subtitles & Audio Ducking",
      agent: "Agent 10 (Video Editor Worker)",
      status: "Completed",
      progress: 100,
      duration: "45s",
      startedAt: "8 mins ago",
    },
    {
      id: "JOB-4818",
      project: "గ్రామదేవత ఉత్సవం ప్రసంగం",
      type: "Quality Control Verification",
      stage: "Resolution, Clipping & Subtitle Sync",
      agent: "Agent 13 (QC Agent)",
      status: "Completed",
      progress: 100,
      duration: "18s",
      startedAt: "15 mins ago",
    },
  ]);

  const columns = [
    {
      key: "id",
      header: "Job ID",
      cell: (row: QueueJob) => (
        <span className="font-mono text-xs font-bold text-primary">{row.id}</span>
      ),
    },
    {
      key: "project",
      header: "Project Title",
      cell: (row: QueueJob) => (
        <div>
          <p className="text-xs font-semibold text-foreground truncate max-w-xs">{row.project}</p>
          <p className="text-2xs text-muted-foreground">{row.type}</p>
        </div>
      ),
    },
    {
      key: "agent",
      header: "Assigned Agent",
      cell: (row: QueueJob) => (
        <span className="text-xs text-muted-foreground font-mono">{row.agent}</span>
      ),
    },
    {
      key: "progress",
      header: "Progress",
      cell: (row: QueueJob) => (
        <div className="w-32 space-y-1">
          <div className="flex justify-between text-2xs text-muted-foreground">
            <span>{row.stage}</span>
            <span className="font-bold text-foreground">{row.progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                row.status === "Completed" ? "bg-success" : "bg-primary"
              }`}
              style={{ width: `${row.progress}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: QueueJob) => (
        <Badge
          variant={
            row.status === "Completed"
              ? "success"
              : row.status === "Running"
              ? "default"
              : "secondary"
          }
          className="text-2xs font-semibold"
        >
          {row.status}
        </Badge>
      ),
    },
    {
      key: "duration",
      header: "Runtime",
      cell: (row: QueueJob) => (
        <span className="text-xs text-muted-foreground font-mono">{row.duration}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: QueueJob) => (
        <div className="flex items-center gap-1.5">
          <Link href="/studio/workspace">
            <Button variant="outline" size="sm" className="h-7 px-2 text-2xs">
              Inspect
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Production Queue"
        description="Monitor real-time asynchronous AI video generation, Telugu voice rendering, and FFmpeg stitching jobs coordinated through Redis and Railway workers."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Queue</span>
            </Button>
            <Link href="/studio/create">
              <Button variant="brand" size="sm" className="gap-1.5">
                <Sparkles className="h-4 w-4" />
                <span>New Production</span>
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Jobs Running</span>
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">2</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Veo Video &bull; ElevenLabs Voice</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Worker Concurrency</span>
            <Badge variant="outline" className="text-[10px]">Railway Worker</Badge>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">4 / 8</p>
          <p className="text-2xs text-muted-foreground mt-0.5">FFmpeg + HarfBuzz Telugu Shaper</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Avg. Render Latency</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">1m 48s</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Per 60s vertical video output</p>
        </Card>
      </div>

      <Card className="border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle>Active &amp; Historical Worker Tasks</CardTitle>
          <CardDescription>
            All jobs are durable in PostgreSQL; worker restarts resume cleanly from Redis state.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <AdvancedTable<QueueJob> columns={columns} data={jobs} />
        </CardContent>
      </Card>
    </div>
  );
}
