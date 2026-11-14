"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Zap,
  Play,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Plus,
  ShieldCheck,
  TrendingUp,
  Sliders,
  Send,
} from "lucide-react";

interface AutomationRule {
  id: string;
  name: string;
  teluguName: string;
  trigger: string;
  action: string;
  lastRun: string;
  totalRuns: number;
  isActive: boolean;
}

const initialAutomations: AutomationRule[] = [
  {
    id: "auto_festivals",
    name: "Telugu Festival Special Producer",
    teluguName: "పండుగల ప్రత్యేక వీడియో రూపకల్పన",
    trigger: "Cron: Every Sunday at 00:00 IST (7 days before calendar event)",
    action: "Instruct Agent 02 & 03 to scaffold 3 festival concept scripts (Sankranti, Ugadi, Dasara)",
    lastRun: "3 days ago (Success)",
    totalRuns: 24,
    isActive: true,
  },
  {
    id: "auto_reels_syndicate",
    name: "Cross-Platform Reels Auto-Syndication",
    teluguName: "యూట్యూబ్ షార్ట్స్ నుండి ఇన్‌స్టాగ్రామ్ రీల్స్ ఆటో-పోస్టింగ్",
    trigger: "Metric: YouTube Short crosses 10,000 views with >85% retention",
    action: "Extract 9:16 master cut, generate viral Telugu hashtags, and queue on Instagram Reels",
    lastRun: "Yesterday at 21:15 IST",
    totalRuns: 58,
    isActive: true,
  },
  {
    id: "auto_qc_gatekeeper",
    name: "Pre-Publish Strict QC Gatekeeper",
    teluguName: "ప్రచురణకు ముందే నాణ్యతా తనిఖీ",
    trigger: "Event: Render Worker finishes final MP4 assembly",
    action: "Agent 14 verifies -14 LUFS loudness, Telugu subtitle synchronization, and visual continuity",
    lastRun: "2 hours ago (Passed)",
    totalRuns: 142,
    isActive: true,
  },
  {
    id: "auto_quota_auditor",
    name: "Daily YouTube API Quota Auditor",
    teluguName: "యూట్యూబ్ కోటా రోజువారీ తనిఖీ",
    trigger: "Cron: Daily at 23:45 IST",
    action: "Tally API units, reset local tracker, and send Telegram/Email alert if < 2,000 units left",
    lastRun: "Yesterday at 23:45 IST",
    totalRuns: 90,
    isActive: true,
  },
];

export function WorkflowAutomationsView() {
  const [automations, setAutomations] = React.useState<AutomationRule[]>(initialAutomations);
  const [runningId, setRunningId] = React.useState<string | null>(null);

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const handleRunNow = async (id: string) => {
    setRunningId(id);
    await new Promise((r) => setTimeout(r, 1000));
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              lastRun: "Just now (Success)",
              totalRuns: a.totalRuns + 1,
            }
          : a
      )
    );
    setRunningId(null);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Workflow Automations & Event Triggers"
        description="Autonomous background routines for festival content creation, cross-platform publishing, and audio QC."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            4 Active Automations
          </Badge>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Automation
          </Button>
        </div>
      </PageHeader>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((rule) => (
          <Card key={rule.id} className="hover:border-primary/40 transition-colors">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={rule.isActive ? "brand" : "outline"} className="text-2xs">
                    {rule.isActive ? "Active Routine" : "Paused"}
                  </Badge>
                  <span className="text-2xs text-muted-foreground font-mono">{rule.id}</span>
                </div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  {rule.name}
                </CardTitle>
                <CardDescription className="text-xs text-primary font-medium mt-0.5">
                  {rule.teluguName}
                </CardDescription>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRunNow(rule.id)}
                  disabled={runningId === rule.id}
                  className="gap-1.5 text-xs h-8"
                >
                  <Play className="w-3.5 h-3.5" />
                  {runningId === rule.id ? "Running Routine..." : "Run Now"}
                </Button>
                <Button
                  variant={rule.isActive ? "outline" : "primary"}
                  size="sm"
                  onClick={() => toggleAutomation(rule.id)}
                  className="text-xs h-8"
                >
                  {rule.isActive ? "Pause" : "Enable"}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 rounded-lg bg-muted/30 border border-border text-xs mb-3">
                <div>
                  <span className="font-semibold text-foreground block mb-1">Trigger Condition:</span>
                  <p className="text-muted-foreground font-mono text-2xs">{rule.trigger}</p>
                </div>
                <div>
                  <span className="font-semibold text-foreground block mb-1">Target Action:</span>
                  <p className="text-muted-foreground font-mono text-2xs">{rule.action}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-2xs text-muted-foreground pt-1">
                <span>Last execution: <strong className="text-foreground">{rule.lastRun}</strong></span>
                <span>Total autonomous runs: <strong className="text-foreground">{rule.totalRuns}</strong></span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

