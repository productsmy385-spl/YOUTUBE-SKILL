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
import { EmptyState } from "@/components/ui/empty-state";
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
import { useEffect, useRef, useState } from "react";

interface MediaItem extends Record<string, unknown> {
  id: string;
  name: string;
  type: "Video" | "Audio (Voice)" | "Music (BGM)" | "Thumbnail" | "Subtitle";
  size: string;
  duration: string;
  format: string;
  createdAt: string;
  url?: string;
}

export function MediaLibraryView() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadMedia() {
      try {
        const res = await fetch("/api/media");
        if (res.ok) {
          const data = await res.json();
          if (data.media && Array.isArray(data.media)) {
            const mapped = data.media.map((m: any) => ({
              id: m.id,
              name: m.fileName || "media_asset",
              type: m.assetType === "video"
                ? "Video"
                : m.assetType?.includes("voice")
                ? "Audio (Voice)"
                : m.assetType?.includes("music")
                ? "Music (BGM)"
                : m.assetType === "thumbnail"
                ? "Thumbnail"
                : "Video",
              size: m.fileSizeBytes ? `${(m.fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "—",
              duration: m.durationSeconds ? `${m.durationSeconds}s` : "—",
              format: m.mimeType || "application/octet-stream",
              createdAt: m.createdAt ? new Date(m.createdAt).toLocaleDateString() : "Recently",
              url: m.previewUrl,
            }));
            setMediaList(mapped);
          }
        }
      } catch (err) {
        console.warn("Could not load media:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMedia();
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", file.type.startsWith("video/") ? "raw_cut_video" : "reference_image");
      formData.append("label", file.name);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const asset = data.asset;
        const newMediaItem: MediaItem = {
          id: asset.id,
          name: asset.fileName,
          type: asset.assetType === "video" ? "Video" : "Thumbnail",
          size: asset.sizeFormatted,
          duration: asset.duration || "—",
          format: file.type,
          createdAt: "Just now",
          url: asset.previewUrl,
        };
        setMediaList((prev) => [newMediaItem, ...prev]);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const videoCount = mediaList.filter((m) => m.type === "Video").length;
  const voiceCount = mediaList.filter((m) => m.type === "Audio (Voice)").length;
  const musicCount = mediaList.filter((m) => m.type === "Music (BGM)").length;
  const otherCount = mediaList.filter((m) => m.type === "Thumbnail" || m.type === "Subtitle").length;

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
        <Button variant="outline" size="icon-sm" title="Download Asset">
          <Download className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="video/*,image/*,audio/*"
      />

      <PageHeader
        title="Media Library"
        description="Private object-storage management for video clips, voice stems, licensed background scores, and thumbnail assets. Files are served securely via pre-signed S3 URLs."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="brand"
              size="sm"
              className="gap-1.5"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4" />
              <span>{isUploading ? "Uploading File..." : "Upload Asset"}</span>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Video Clips</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">{videoCount}</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Raw footage &amp; rendered clips</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Telugu Voice Stems</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">{voiceCount}</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Synthesized te-IN dialogue audio</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Music &amp; SFX</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">{musicCount}</p>
          <p className="text-2xs text-muted-foreground mt-0.5">Licensed background audio</p>
        </Card>

        <Card className="border-border bg-card p-4 shadow-card">
          <span className="text-2xs font-bold uppercase text-muted-foreground">Thumbnails &amp; Subs</span>
          <p className="text-2xl font-bold text-foreground mt-2 font-mono">{otherCount}</p>
          <p className="text-2xs text-muted-foreground mt-0.5">WebP graphics &amp; VTT captions</p>
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
          {isLoading ? (
            <div className="flex h-48 items-center justify-center p-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span>Loading media assets...</span>
              </div>
            </div>
          ) : mediaList.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Film className="h-8 w-8" />}
                title="Media Library is Empty"
                description="Upload raw video cuts, B-roll footage, and reference images to store them securely and use them across your AI productions."
                action={{
                  label: "Upload Your First File",
                  onClick: handleUploadClick,
                }}
              />
            </div>
          ) : (
            <AdvancedTable<MediaItem> columns={columns} data={mediaList} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
