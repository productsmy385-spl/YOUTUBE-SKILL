"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Send,
  Tv,
  Camera,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Pause,
  Play,
  RotateCcw,
  Sliders,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface QueueItem {
  id: string;
  title: string;
  teluguTitle: string;
  platform: "YouTube Shorts" | "YouTube Long" | "Instagram Reel";
  status: "Queued" | "Uploading" | "Scheduled" | "Published" | "Failed";
  scheduledFor: string;
  slotName: string;
  resolution: string;
  size: string;
  progress: number;
  thumbnailUrl: string;
}

export function PublishingQueueView() {
  const [queueItems, setQueueItems] = React.useState<QueueItem[]>([]);
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [isPauseAll, setIsPauseAll] = React.useState(false);

  const filteredItems = queueItems.filter((item) => {
    if (filterStatus === "all") return true;
    return item.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const uploadingCount = queueItems.filter((i) => i.status === "Uploading").length;
  const scheduledCount = queueItems.filter((i) => i.status === "Scheduled").length;
  const publishedCount = queueItems.filter((i) => i.status === "Published").length;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Publishing Queue & Pipeline"
        description="Unified multi-channel distribution queue with automated peak-hour slotting for Asia/Kolkata timezone."
      >
        <div className="flex items-center gap-3">
          <Button
            variant={isPauseAll ? "primary" : "outline"}
            size="sm"
            onClick={() => setIsPauseAll(!isPauseAll)}
            className="gap-2"
          >
            {isPauseAll ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isPauseAll ? "Resume Publishing Queue" : "Emergency Pause All"}
          </Button>
          <Button variant="outline" size="sm" className="gap-2" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" />
            Refresh Queue
          </Button>
        </div>
      </PageHeader>

      {/* Queue Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Currently Active</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{uploadingCount} Uploading</p>
          <span className="text-2xs text-primary font-medium">Resumable Chunk Protocol</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Scheduled Today</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{scheduledCount} Videos</p>
          <span className="text-2xs text-muted-foreground">Optimal IST Slots</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Published Total</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{publishedCount} Posts</p>
          <span className="text-2xs text-emerald-500 font-medium">YouTube &bull; Instagram</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Auto-Slotting Engine</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-lg font-bold text-foreground">Smart IST Active</p>
          </div>
          <span className="text-2xs text-muted-foreground">Spacing: 4 hrs between Shorts</span>
        </Card>
      </div>

      {/* Filter and Queue Table */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              Scheduled Video Pipeline
            </CardTitle>
            <CardDescription>Drag or re-order priority, inspect live chunks, or trigger instant publication.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={[
                { label: `All Items (${queueItems.length})`, value: "all" },
                { label: `Uploading (${uploadingCount})`, value: "uploading" },
                { label: `Scheduled (${scheduledCount})`, value: "scheduled" },
                { label: `Published (${publishedCount})`, value: "published" },
              ]}
              className="w-40 text-xs"
            />
          </div>
        </CardHeader>

        <CardContent>
          {queueItems.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Send className="h-8 w-8" />}
                title="Publishing Pipeline is Empty"
                description="Approved videos will queue here for scheduled automated release across YouTube Shorts, Long-form, and Instagram Reels."
                action={{
                  label: "Create & Publish Video",
                  onClick: () => {
                    window.location.href = "/studio/create";
                  },
                }}
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs data-table">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-3 px-4 font-semibold">Video Asset</th>
                    <th className="py-3 px-4 font-semibold">Destination</th>
                    <th className="py-3 px-4 font-semibold">Scheduled Slot (IST)</th>
                    <th className="py-3 px-4 font-semibold">Spec & Size</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnailUrl}
                            alt="Thumbnail"
                            className="w-14 h-10 object-cover rounded-md border border-border shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-foreground line-clamp-1">{item.teluguTitle}</p>
                            <p className="text-2xs text-muted-foreground line-clamp-1">{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {item.platform.includes("YouTube") ? (
                            <Tv className="w-3.5 h-3.5 text-red-500" />
                          ) : (
                            <Camera className="w-3.5 h-3.5 text-pink-500" />
                          )}
                          <span className="font-medium text-foreground">{item.platform}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-foreground">{item.scheduledFor}</p>
                        <span className="text-2xs text-muted-foreground">{item.slotName}</span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-foreground">{item.resolution}</p>
                        <span className="text-2xs text-muted-foreground">{item.size}</span>
                      </td>
                      <td className="py-3 px-4">
                        {item.status === "Uploading" ? (
                          <div className="space-y-1 w-32">
                            <div className="flex justify-between text-2xs">
                              <span className="text-primary font-medium">Uploading</span>
                              <span className="font-bold">{item.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <Badge
                            variant={
                              item.status === "Published"
                                ? "brand"
                                : item.status === "Failed"
                                ? "destructive"
                                : "outline"
                            }
                            className="text-2xs"
                          >
                            {item.status}
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {item.status === "Failed" ? (
                            <Button variant="outline" size="sm" className="h-7 text-2xs gap-1">
                              <RotateCcw className="w-3 h-3" />
                              Retry
                            </Button>
                          ) : item.status !== "Published" ? (
                            <Button variant="primary" size="sm" className="h-7 text-2xs gap-1">
                              <Send className="w-3 h-3" />
                              Publish Now
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="h-7 text-2xs gap-1">
                              <ExternalLink className="w-3 h-3" />
                              View
                            </Button>
                          )}
                        </div>
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
