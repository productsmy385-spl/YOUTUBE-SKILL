"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  UserCog,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  UserCheck,
  Sliders,
} from "lucide-react";

interface StudioUser {
  id: string;
  name: string;
  email: string;
  role: "Studio Director" | "Creative Producer" | "Telugu Script Lead" | "Sound Director" | "Video Editor";
  status: "Active" | "Pending";
  twoFactor: boolean;
  lastActive: string;
}

const mockUsers: StudioUser[] = [
  {
    id: "usr_01",
    name: "Sir (Creator & Owner)",
    email: "creator@sir-studio.internal",
    role: "Studio Director",
    status: "Active",
    twoFactor: true,
    lastActive: "Just now",
  },
  {
    id: "usr_02",
    name: "Rao Ramesh (Creative Producer)",
    email: "creative@sir-studio.internal",
    role: "Creative Producer",
    status: "Active",
    twoFactor: true,
    lastActive: "2 hours ago",
  },
  {
    id: "usr_03",
    name: "Sai Madhav (Telugu Script Lead)",
    email: "scripts@sir-studio.internal",
    role: "Telugu Script Lead",
    status: "Active",
    twoFactor: false,
    lastActive: "Yesterday",
  },
  {
    id: "usr_04",
    name: "Keeravani Sounds (Audio & Music)",
    email: "music@sir-studio.internal",
    role: "Sound Director",
    status: "Active",
    twoFactor: true,
    lastActive: "3 days ago",
  },
];

export function UsersStudioView() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Team & User Management"
        description="Studio collaborators, role assignments, two-factor authentication, and access control."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            4 Studio Seats Active
          </Badge>
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Invite Member
          </Button>
        </div>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserCog className="w-4 h-4 text-primary" />
            Active Collaborators & Roles
          </CardTitle>
          <CardDescription>Collaborator permissions are governed by role-based access control (RBAC).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs data-table">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 px-4 font-semibold">User</th>
                  <th className="py-3 px-4 font-semibold">Assigned Role</th>
                  <th className="py-3 px-4 font-semibold">2FA Protection</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Last Active</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-semibold text-foreground">{u.name}</p>
                        <p className="text-2xs text-muted-foreground">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-2xs">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {u.twoFactor ? (
                        <span className="flex items-center gap-1 text-2xs text-emerald-500 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Enforced
                        </span>
                      ) : (
                        <span className="text-2xs text-muted-foreground">Disabled</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="brand" className="text-2xs">
                        {u.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-2xs">{u.lastActive}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-2xs">
                        Edit Access
                      </Button>
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

