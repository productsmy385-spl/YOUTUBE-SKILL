"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
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

const mockQueueItems: QueueItem[] = [
  {
    id: "pub_01",
    title: "Sankranti Memories in Godavari | Village Nostalgia",
    teluguTitle: "సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ కథ",
    platform: "YouTube Shorts",
    status: "Uploading",
    scheduledFor: "Today, 18:30 IST",
    slotName: "Peak Evening Slot 1",
    resolution: "1080x1920 (9:16)",
    size: "48.2 MB",
    progress: 74,
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
  },
  {
    id: "pub_02",
    title: "Sankranti Memories in Godavari | Reels Cut",
    teluguTitle: "సంక్రాంతి జ్ఞాపకాలు - రీల్స్ కట్",
    platform: "Instagram Reel",
    status: "Scheduled",
    scheduledFor: "Today, 19:15 IST",
    slotName: "Viral Evening Slot 2",
    resolution: "1080x1920 (9:16)",
    size: "42.8 MB",
    progress: 0,
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80",
  },
  {
    id: "pub_03",
    title: "Farmer's Tears & Hope | Realistic Telugu Drama",
    teluguTitle: "రైతు కన్నీరు & ఆశ - హృదయపూర్వక దృశ్యం",
    platform: "YouTube Shorts",
    status: "Queued",
    scheduledFor: "Tomorrow, 07:45 IST",
    slotName: "Morning Commute Slot",
    resolution: "1080x1920 (9:16)",
    size: "52.1 MB",
    progress: 0,
    thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
  },
  {
    id: "pub_04",
    title: "Midnight Mystery of Cyberabad | Telugu Thriller Ep 1",
    teluguTitle: "సైబరాబాద్ అర్ధరాత్రి రహస్యం - ఎపిసోడ్ 1",
    platform: "YouTube Long",
    status: "Published",
    scheduledFor: "Yesterday, 20:00 IST",
    slotName: "Prime Weekend Long-form",
    resolution: "3840x2160 4K (16:9)",
    size: "418.5 MB",
    progress: 100,
    thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&q=80",
  },
  {
    id: "pub_05",
    title: "Temple Chants & Sacred Dawn | Devotional Special",
    teluguTitle: "ఆలయ ఘంటానాదాలు & ప్రాతఃకాల దర్శనం",
    platform: "YouTube Shorts",
    status: "Failed",
    scheduledFor: "3 days ago",
    slotName: "Early Morning Slot",
    resolution: "1080x1920 (9:16)",
    size: "36.4 MB",
    progress: 0,
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  },
];

export function PublishingQueueView() {
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [isPauseAll, setIsPauseAll] = React.useState(false);

  const filteredItems = mockQueueItems.filter((item) => {
    if (filterStatus === "all") return true;
    return item.status.toLowerCase() === filterStatus.toLowerCase();
  });

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
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Queue
          </Button>
        </div>
      </PageHeader>

      {/* Queue Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Currently Active</p>
          <p className="text-2xl font-bold mt-1 text-foreground">1 Uploading</p>
          <span className="text-2xs text-primary font-medium">Bandwidth: 12.4 MB/s</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Scheduled Today</p>
          <p className="text-2xl font-bold mt-1 text-foreground">2 Videos</p>
          <span className="text-2xs text-muted-foreground">18:30 & 19:15 IST Slots</span>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground font-medium">Published This Week</p>
          <p className="text-2xl font-bold mt-1 text-foreground">14 Posts</p>
          <span className="text-2xs text-emerald-500 font-medium">100% on schedule</span>
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
                { label: "All Items (5)", value: "all" },
                { label: "Uploading (1)", value: "uploading" },
                { label: "Scheduled (1)", value: "scheduled" },
                { label: "Queued (1)", value: "queued" },
                { label: "Published (1)", value: "published" },
                { label: "Failed (1)", value: "failed" },
              ]}
              className="w-40 text-xs"
            />
          </div>
        </CardHeader>

        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}

