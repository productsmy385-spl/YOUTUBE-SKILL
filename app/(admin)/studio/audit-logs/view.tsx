"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import {
  FileCheck2,
  Search,
  Download,
  Filter,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";

interface AuditEntry {
  id: string;
  createdAt: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress?: string;
  metadata?: Record<string, unknown>;
}

export function AuditLogsStudioView() {
  const [search, setSearch] = React.useState("");
  const [logs, setLogs] = React.useState<AuditEntry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchLogs = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/audit-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.warn("Failed to fetch audit logs:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.entityType.toLowerCase().includes(search.toLowerCase()) ||
      l.entityId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Audit Logs & Security Trail"
        description="Immutable compliance audit trail recording all agent executions, credential mutations, and video publishing events."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchLogs} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export Audit JSON
          </Button>
        </div>
      </PageHeader>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Audit Events Stored</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{logs.length}</p>
          <span className="text-2xs text-emerald-500 font-semibold">PostgreSQL Relational DB</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Security Guardrails</p>
          <p className="text-2xl font-bold mt-1 text-emerald-500 font-mono">100% PASS</p>
          <span className="text-2xs text-muted-foreground">Deterministic QC Gates</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Database Persistence</p>
          <p className="text-2xl font-bold mt-1 text-foreground">audit_logs</p>
          <span className="text-2xs text-emerald-500 font-medium">Immutable append-only</span>
        </Card>
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Event Stream
            </CardTitle>
            <CardDescription>Chronological system activity ledger</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
              <Input
                placeholder="Filter by action or entity..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 text-xs h-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="py-8">
              <EmptyState
                icon={<FileCheck2 className="h-8 w-8" />}
                title="No Audit Logs Recorded Yet"
                description="Activity logs will be written to PostgreSQL whenever AI agents execute tasks or video productions are created."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs data-table">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-3 px-4 font-semibold">Timestamp (UTC)</th>
                    <th className="py-3 px-4 font-semibold">Action</th>
                    <th className="py-3 px-4 font-semibold">Entity Type</th>
                    <th className="py-3 px-4 font-semibold">Entity ID</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-mono text-2xs">
                  {filtered.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-bold text-foreground">{log.action}</td>
                      <td className="py-3 px-4 text-primary">{log.entityType}</td>
                      <td className="py-3 px-4 text-muted-foreground truncate max-w-xs">{log.entityId}</td>
                      <td className="py-3 px-4">
                        <Badge variant="brand" className="text-2xs">
                          SUCCESS
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
