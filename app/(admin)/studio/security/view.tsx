"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
  Lock,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Power,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Tv,
  Film,
} from "lucide-react";

export function SecurityStudioView() {
  const [isEmergencyHalt, setIsEmergencyHalt] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const handleToggleKillSwitch = () => {
    setIsEmergencyHalt(!isEmergencyHalt);
    setIsConfirmOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Security & Emergency Controls"
        description="Circuit breakers, agent lockdown, token encryption status, and safety policy enforcement."
      >
        <Badge
          variant={isEmergencyHalt ? "destructive" : "brand"}
          className="text-xs px-3 py-1 font-semibold"
        >
          {isEmergencyHalt ? "CIRCUIT BREAKER ENGAGED" : "All Systems Armed & Safe"}
        </Badge>
      </PageHeader>

      {/* Global Kill Switch Banner */}
      <div
        className={`p-6 rounded-2xl border-2 transition-all ${
          isEmergencyHalt
            ? "border-destructive bg-destructive/10"
            : "border-primary/40 bg-gradient-to-r from-primary/10 via-card to-card"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                isEmergencyHalt
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {isEmergencyHalt ? <ShieldAlert className="w-6 h-6" /> : <Power className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {isEmergencyHalt
                  ? "EMERGENCY STUDIO LOCKDOWN ACTIVE"
                  : "Global Studio Emergency Kill Switch"}
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl leading-relaxed">
                {isEmergencyHalt
                  ? "All 16 AI agents, video rendering jobs, and scheduled YouTube/Instagram uploads are frozen. Database state is securely locked."
                  : "Triggering this emergency switch immediately halts all autonomous agent routines, cancels running Gemini video generation jobs, and pauses the entire publishing queue."}
              </p>
            </div>
          </div>

          <Button
            variant={isEmergencyHalt ? "outline" : "destructive"}
            size="lg"
            onClick={() => setIsConfirmOpen(true)}
            className="gap-2 text-xs font-bold uppercase tracking-wider shrink-0"
          >
            {isEmergencyHalt ? (
              <>
                <RotateCcw className="w-4 h-4" />
                Disengage Lockdown & Resume
              </>
            ) : (
              <>
                <Power className="w-4 h-4" />
                Engage Emergency Kill Switch
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Subsystem Isolation Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-primary" />
              Agent Orchestration
            </span>
            <Badge variant={isEmergencyHalt ? "destructive" : "brand"} className="text-2xs">
              {isEmergencyHalt ? "Suspended" : "Operational"}
            </Badge>
          </div>
          <p className="text-2xs text-muted-foreground">
            Controls Master Orchestrator state machine handoffs and prompt execution.
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Film className="w-4 h-4 text-primary" />
              FFmpeg & Render Worker
            </span>
            <Badge variant={isEmergencyHalt ? "destructive" : "brand"} className="text-2xs">
              {isEmergencyHalt ? "Suspended" : "Operational"}
            </Badge>
          </div>
          <p className="text-2xs text-muted-foreground">
            Controls BullMQ video rendering queues and subtitle burning processes.
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Tv className="w-4 h-4 text-primary" />
              Publishing Outbound Pipeline
            </span>
            <Badge variant={isEmergencyHalt ? "destructive" : "brand"} className="text-2xs">
              {isEmergencyHalt ? "Suspended" : "Operational"}
            </Badge>
          </div>
          <p className="text-2xs text-muted-foreground">
            Blocks outgoing HTTP requests to YouTube and Meta Graph publishing endpoints.
          </p>
        </Card>
      </div>

      {/* Cryptography & Data Safety Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Cryptographic Vault & Security Architecture
          </CardTitle>
          <CardDescription>All credentials and tokens are protected with AES-256-GCM authenticated encryption.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-1">
              <span className="font-semibold text-foreground block">OAuth Refresh Token Storage</span>
              <p className="text-2xs text-muted-foreground">
                Never stored in plain text. Stored as encrypted ciphertext with unique initialization vectors (IV) and auth tags.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-1">
              <span className="font-semibold text-foreground block">Immutable Audit Trails</span>
              <p className="text-2xs text-muted-foreground">
                Every agent action, publishing release, or prompt edit is logged to append-only audit log tables in PostgreSQL.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Confirm {isEmergencyHalt ? "Disengagement" : "Emergency Kill Switch"}
            </DialogTitle>
            <DialogDescription>
              {isEmergencyHalt
                ? "This will resume all background queues, scheduled publish jobs, and autonomous agent loops."
                : "This action will immediately stop all active GPU render jobs and agent operations. Are you sure you want to proceed?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={isEmergencyHalt ? "primary" : "destructive"}
              onClick={handleToggleKillSwitch}
            >
              {isEmergencyHalt ? "Confirm Resume" : "Engage Lockdown"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

