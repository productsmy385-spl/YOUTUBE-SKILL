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
import { EmptyState } from "@/components/ui/empty-state";
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
  const [jobs, setJobs] = useState<QueueJob[]>([]);

  const runningCount = jobs.filter((j) => j.status === "Running").length;
  const completedCount = jobs.filter((j) => j.status === "Completed").length;

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
        <span className="text-xs font-semibold text-foreground">{row.project}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent / Worker",
      cell: (row: QueueJob) => (
        <span className="text-xs text-muted-foreground">{row.agent}</span>
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
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.location.reload()}>
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
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">{runningCount}</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Veo Video &bull; Telugu Voice</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Worker Concurrency</span>
            <Badge variant="outline" className="text-[10px]">Railway Worker</Badge>
          </div>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">Ready</p>
          <p className="text-2xs text-muted-foreground mt-0.5">FFmpeg + HarfBuzz Telugu Shaper</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-2xs font-bold uppercase text-muted-foreground">Completed Tasks</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">{completedCount}</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Durable in PostgreSQL</p>
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
          {jobs.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Clock className="h-8 w-8" />}
                title="Production Queue is Idle"
                description="Background AI agents and FFmpeg render tasks will appear here as soon as a video production workflow is launched."
                action={{
                  label: "Launch AI Video Creation",
                  onClick: () => {
                    window.location.href = "/studio/create";
                  },
                }}
              />
            </div>
          ) : (
            <AdvancedTable<QueueJob> columns={columns} data={jobs} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
