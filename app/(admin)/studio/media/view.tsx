"use client";

import { PageHeader } from "@/components/layout/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdvancedTable } from "@/components/ui/advanced-table";
import {
  Download,
  Film,
  FolderOpen,
  Image as ImageIcon,
  Mic,
  Music,
  Plus,
  Subtitles,
  Upload,
} from "lucide-react";
import { useState } from "react";

interface MediaItem extends Record<string, unknown> {
  id: string;
  name: string;
  type: "Video" | "Audio (Voice)" | "Music (BGM)" | "Thumbnail" | "Subtitle";
  size: string;
  duration: string;
  format: string;
  createdAt: string;
}

export function MediaLibraryView() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: "MED-001",
      name: "scene_01_veo_master.mp4",
      type: "Video",
      size: "18.4 MB",
      duration: "9.5s",
      format: "MP4 (1080x1920)",
      createdAt: "Today, 4:15 PM",
    },
    {
      id: "MED-002",
      name: "scene_02_veo_master.mp4",
      type: "Video",
      size: "21.2 MB",
      duration: "11.0s",
      format: "MP4 (1080x1920)",
      createdAt: "Today, 4:18 PM",
    },
    {
      id: "MED-003",
      name: "scene_01_voice_te.wav",
      type: "Audio (Voice)",
      size: "3.2 MB",
      duration: "4.2s",
      format: "WAV (48kHz)",
      createdAt: "Today, 4:20 PM",
    },
    {
      id: "MED-004",
      name: "telugu_comedy_quirk_loop.mp3",
      type: "Music (BGM)",
      size: "6.8 MB",
      duration: "3m 00s",
      format: "MP3 (320kbps)",
      createdAt: "Today, 4:22 PM",
    },
    {
      id: "MED-005",
      name: "thumb_shock_expression.webp",
      type: "Thumbnail",
      size: "420 KB",
      duration: "-",
      format: "WebP (1080x1920)",
      createdAt: "Today, 4:25 PM",
    },
    {
      id: "MED-006",
      name: "subtitles_te_IN.vtt",
      type: "Subtitle",
      size: "12 KB",
      duration: "45s",
      format: "VTT (Unicode te-IN)",
      createdAt: "Today, 4:26 PM",
    },
  ]);

  const columns = [
    {
      key: "id",
      header: "Asset ID",
      cell: (row: MediaItem) => (
        <span className="font-mono text-xs font-bold text-primary">{row.id}</span>
      ),
    },
    {
      key: "name",
      header: "File Name",
      cell: (row: MediaItem) => (
        <div>
          <p className="text-xs font-semibold text-foreground truncate max-w-xs">{row.name}</p>
          <p className="text-2xs text-muted-foreground">{row.format}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Asset Type",
      cell: (row: MediaItem) => {
        const typeVariants: Record<string, "default" | "success" | "warning" | "info" | "secondary"> = {
          Video: "default",
          "Audio (Voice)": "success",
          "Music (BGM)": "warning",
          Thumbnail: "info",
          Subtitle: "secondary",
        };
        return (
          <Badge variant={typeVariants[row.type] || "default"} className="text-2xs font-semibold">
            {row.type}
          </Badge>
        );
      },
    },
    {
      key: "size",
      header: "File Size",
      cell: (row: MediaItem) => (
        <span className="text-xs text-muted-foreground font-mono">{row.size}</span>
      ),
    },
    {
      key: "duration",
      header: "Duration",
      cell: (row: MediaItem) => (
        <span className="text-xs text-muted-foreground font-mono">{row.duration}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      cell: (row: MediaItem) => (
        <span className="text-2xs text-muted-foreground">{row.createdAt}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: () => (
        <Button variant="outline" size="icon-sm" title="Download">
          <Download className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Library"
        description="Private object-storage management for video clips, voice stems, licensed background scores, and thumbnail assets. Files are served securely via pre-signed S3 URLs."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Upload className="h-4 w-4" />
              <span>Upload Asset</span>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Video Clips</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">14</p>
          <p className="text-2xs text-muted-foreground mt-0.5">1080x1920 &bull; 2.4 GB Total</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Telugu Voice Stems</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">32</p>
          <p className="text-2xs text-muted-foreground mt-0.5">48kHz WAV &bull; 142 MB Total</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Music &amp; SFX</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">18</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Licensed &bull; 85 MB Total</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Thumbnails &amp; Subs</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">24</p>
          <p className="text-2xs text-muted-foreground mt-0.5">WebP &amp; VTT &bull; 12 MB Total</p>
        </Card>
      </div>

      <Card className="border-border bg-card shadow-card">
        <CardHeader>
          <CardTitle>Storage Assets</CardTitle>
          <CardDescription>
            All media stored in private Cloudflare R2 / AWS S3 buckets.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <AdvancedTable<MediaItem> columns={columns} data={mediaList} />
        </CardContent>
      </Card>
    </div>
  );
}

