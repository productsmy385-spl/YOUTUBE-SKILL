"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileCheck2,
  Search,
  Download,
  Filter,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetType: string;
  targetId: string;
  ipAddress: string;
  status: "SUCCESS" | "FAILED" | "SECURITY_HALT";
}

const mockLogs: AuditEntry[] = [
  {
    id: "aud_948a",
    timestamp: "2025-01-14 18:30:12 IST",
    actor: "Agent 12 (YouTube Ops)",
    action: "YOUTUBE_VIDEO_PUBLISHED",
    targetType: "video",
    targetId: "yt_snkr_01",
    ipAddress: "10.0.4.12",
    status: "SUCCESS",
  },
  {
    id: "aud_947b",
    timestamp: "2025-01-14 18:28:45 IST",
    actor: "Agent 14 (QC Agent)",
    action: "QC_EVALUATION_PASSED",
    targetType: "render",
    targetId: "rnd_842",
    ipAddress: "10.0.4.18",
    status: "SUCCESS",
  },
  {
    id: "aud_946c",
    timestamp: "2025-01-14 18:15:30 IST",
    actor: "Creator Admin (Studio Director)",
    action: "API_KEYS_UPDATED",
    targetType: "vault",
    targetId: "gemini_api_key",
    ipAddress: "192.168.1.42",
    status: "SUCCESS",
  },
  {
    id: "aud_945d",
    timestamp: "2025-01-14 17:50:21 IST",
    actor: "Agent 06 (Gemini Video)",
    action: "VEO_GENERATION_COMPLETED",
    targetType: "scene",
    targetId: "scn_04",
    ipAddress: "10.0.4.14",
    status: "SUCCESS",
  },
  {
    id: "aud_944e",
    timestamp: "2025-01-14 16:32:04 IST",
    actor: "Agent 01 (Master Orchestrator)",
    action: "WORKFLOW_INITIATED",
    targetType: "project",
    targetId: "proj_snkr_01",
    ipAddress: "10.0.4.10",
    status: "SUCCESS",
  },
];

export function AuditLogsStudioView() {
  const [search, setSearch] = React.useState("");

  const filtered = mockLogs.filter(
    (l) =>
      l.actor.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.targetId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Audit Logs & Security Trail"
        description="Immutable compliance audit trail recording all agent executions, credential mutations, and video publishing events."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Audit Trail (JSON)
          </Button>
        </div>
      </PageHeader>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-primary" />
              Event Stream
            </CardTitle>
            <CardDescription>Append-only audit trail backed by PostgreSQL security schemas.</CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by actor, action, or ID..."
              className="pl-9 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs data-table">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 px-4 font-semibold">Timestamp (IST)</th>
                  <th className="py-3 px-4 font-semibold">Actor</th>
                  <th className="py-3 px-4 font-semibold">Action</th>
                  <th className="py-3 px-4 font-semibold">Target</th>
                  <th className="py-3 px-4 font-semibold">Origin IP</th>
                  <th className="py-3 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-muted-foreground font-mono text-2xs">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground">{log.actor}</td>
                    <td className="py-3 px-4 font-mono text-primary text-2xs">{log.action}</td>
                    <td className="py-3 px-4 text-muted-foreground text-2xs">
                      {log.targetType}: {log.targetId}
                    </td>
                    <td className="py-3 px-4 font-mono text-muted-foreground text-2xs">
                      {log.ipAddress}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant="brand" className="text-2xs">
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

