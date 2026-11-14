"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, ShieldCheck } from "lucide-react";

interface RolePermission {
  permission: string;
  description: string;
  director: boolean;
  producer: boolean;
  editor: boolean;
  viewer: boolean;
}

const permissionsMatrix: RolePermission[] = [
  {
    permission: "projects:create_and_delete",
    description: "Create, rename, or permanently delete video projects",
    director: true,
    producer: true,
    editor: false,
    viewer: false,
  },
  {
    permission: "agent:orchestrate_and_tune",
    description: "Invoke Master Orchestrator, modify prompts, adjust model routing",
    director: true,
    producer: true,
    editor: false,
    viewer: false,
  },
  {
    permission: "generation:gemini_video",
    description: "Trigger Gemini Veo video generation and scene re-renders",
    director: true,
    producer: true,
    editor: true,
    viewer: false,
  },
  {
    permission: "generation:telugu_voice",
    description: "Synthesize neural Telugu voices and upload custom speaker models",
    director: true,
    producer: true,
    editor: true,
    viewer: false,
  },
  {
    permission: "publishing:youtube_upload",
    description: "Publish or schedule videos directly to connected YouTube channels",
    director: true,
    producer: true,
    editor: false,
    viewer: false,
  },
  {
    permission: "publishing:instagram_reels",
    description: "Publish 9:16 videos directly to Meta Instagram Graph API",
    director: true,
    producer: true,
    editor: false,
    viewer: false,
  },
  {
    permission: "security:emergency_kill_switch",
    description: "Halt all background workers, agents, and active uploads instantly",
    director: true,
    producer: false,
    editor: false,
    viewer: false,
  },
  {
    permission: "system:manage_api_keys",
    description: "View and edit encrypted API keys and OAuth secrets",
    director: true,
    producer: false,
    editor: false,
    viewer: false,
  },
];

export function RolesStudioView() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Roles & Permissions Matrix"
        description="Enforce least-privilege security policies across studio assets, AI generation, and channel publishing."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            RBAC Access Control Matrix
          </CardTitle>
          <CardDescription>Roles map to strict cryptographic JWT claims checked by API middleware.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs data-table">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 px-4 font-semibold">Permission Action</th>
                  <th className="py-3 px-4 font-semibold">Description</th>
                  <th className="py-3 px-4 font-semibold text-center">Studio Director</th>
                  <th className="py-3 px-4 font-semibold text-center">Producer</th>
                  <th className="py-3 px-4 font-semibold text-center">Editor</th>
                  <th className="py-3 px-4 font-semibold text-center">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {permissionsMatrix.map((p) => (
                  <tr key={p.permission} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-primary text-2xs">
                      {p.permission}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-2xs">{p.description}</td>
                    <td className="py-3 px-4 text-center">
                      {p.director ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.producer ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.editor ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {p.viewer ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                      )}
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

