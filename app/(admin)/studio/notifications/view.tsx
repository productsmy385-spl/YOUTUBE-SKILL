"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Tv,
  Camera,
  Bot,
  Film,
  Trash2,
} from "lucide-react";

interface NotificationItem {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "notif_01",
    type: "success",
    title: "Video Published to YouTube",
    message: "‘సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ కథ’ is now live on @SirsTeluguStories (1080x1920 Shorts).",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: "notif_02",
    type: "info",
    title: "Gemini Video Render Finished",
    message: "Scene 4 of Cyberabad Thriller completed generation in 22.4 seconds via Veo Engine.",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "notif_03",
    type: "warning",
    title: "Daily YouTube Quota at 70%",
    message: "Consumed 7,000 / 10,000 units. 3,000 units remaining before midnight PST reset.",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "notif_04",
    type: "success",
    title: "Pre-Publish QC Passed",
    message: "Audio loudness verified at -14.1 LUFS. Telugu Unicode subtitles aligned with zero drift.",
    timestamp: "5 hours ago",
    read: true,
  },
];

export function NotificationsStudioView() {
  const [items, setItems] = React.useState<NotificationItem[]>(mockNotifications);

  const markAllAsRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Notifications & Studio Activity"
        description="Real-time timeline of agent workflows, upload confirmations, and channel alerts."
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            Clear
          </Button>
        </div>
      </PageHeader>

      <Card>
        <CardContent className="p-0 divide-y divide-border">
          {items.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground text-xs">
              No new studio notifications.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={`p-4 flex items-start gap-3 transition-colors ${
                  !item.read ? "bg-primary/5" : "hover:bg-muted/20"
                }`}
              >
                <div className="mt-0.5">
                  {item.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : item.type === "warning" ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-foreground">{item.title}</p>
                    <span className="text-2xs text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <p className="text-2xs text-muted-foreground mt-0.5">{item.message}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

