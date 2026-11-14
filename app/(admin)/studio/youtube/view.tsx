"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Tv,
  UploadCloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Eye,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Calendar,
  Layers,
  Tag,
  ShieldAlert,
  Sliders,
} from "lucide-react";

interface PublishedVideo {
  id: string;
  title: string;
  teluguTitle: string;
  type: "Shorts" | "Long-form";
  publishedAt: string;
  views: string;
  likes: string;
  comments: string;
  ctr: string;
  status: "Public" | "Scheduled" | "Unlisted";
  thumbnailUrl: string;
}

const mockPublishedVideos: PublishedVideo[] = [
  {
    id: "yt_snkr_01",
    title: "Sankranti Memories in Godavari | Emotional Telugu Story",
    teluguTitle: "సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ కథ",
    type: "Shorts",
    publishedAt: "2025-01-14 18:30 IST",
    views: "184.2K",
    likes: "14.8K",
    comments: "842",
    ctr: "11.4%",
    status: "Public",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
  },
  {
    id: "yt_mlt_02",
    title: "Midnight Mystery of Cyberabad | Telugu Thriller Episode 1",
    teluguTitle: "సైబరాబాద్ అర్ధరాత్రి రహస్యం - ఎపిసోడ్ 1",
    type: "Long-form",
    publishedAt: "2025-01-10 20:00 IST",
    views: "92.6K",
    likes: "8.1K",
    comments: "512",
    ctr: "8.9%",
    status: "Public",
    thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80",
  },
  {
    id: "yt_rtu_03",
    title: "Farmer's Tears & Hope | Realistic Telugu Drama",
    teluguTitle: "రైతు కన్నీరు & ఆశ - హృదయపూర్వక దృశ్యం",
    type: "Shorts",
    publishedAt: "2025-01-16 19:00 IST",
    views: "—",
    likes: "—",
    comments: "—",
    ctr: "—",
    status: "Scheduled",
    thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80",
  },
];

export function YouTubeStudioView() {
  const [selectedFormat, setSelectedFormat] = React.useState<"Shorts" | "Long-form">("Shorts");
  const [videoTitle, setVideoTitle] = React.useState("సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ ముచ్చట్లు | Telugu AI Cinema");
  const [videoDescription, setVideoDescription] = React.useState(
    "గోదావరి ఒడ్డున గడిచిన సంక్రాంతి మధుర క్షణాలు. AI సాంకేతికతతో సృష్టించబడిన తెలుగు దృశ్య కావ్యం.\n\n" +
      "⏱️ Chapters:\n" +
      "0:00 - ఉదయం ముగ్గులు & పల్లె శోభ\n" +
      "0:18 - గాలిపటాల సందడి & గంగిరెద్దులు\n" +
      "0:42 - అమ్మ చేసిన పిండివంటలు\n" +
      "0:55 - వీడ్కోలు & ఆత్మీయతలు\n\n" +
      "#TeluguStories #Sankranti #TeluguCinema #AIStorytelling #TollywoodShorts"
  );
  const [tags, setTags] = React.useState("Telugu Stories, Sankranti 2025, AI Telugu Video, Godavari Life, Telugu Emotional Story, Tollywood Shorts");
  const [privacy, setPrivacy] = React.useState("public");
  const [scheduledDate, setScheduledDate] = React.useState("2025-01-20T18:00");
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [quotaRemaining, setQuotaRemaining] = React.useState(6800);

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(10);
    setUploadSuccess(false);

    for (let p = 20; p <= 100; p += 20) {
      await new Promise((r) => setTimeout(r, 400));
      setUploadProgress(p);
    }

    setIsUploading(false);
    setUploadSuccess(true);
    setQuotaRemaining((prev) => Math.max(0, prev - 1650));
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="YouTube Operations & Publishing"
        description="Direct channel management, multi-format upload automation, metadata optimization, and API quota monitoring."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            Connected: @SirsTeluguStories
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync Channel
          </Button>
        </div>
      </PageHeader>

      {/* Channel Header & Quota Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Tv className="w-5 h-5 text-red-500" />
                Sir&apos;s Telugu Cinematic Stories (సర్ సినిమాస్)
              </CardTitle>
              <CardDescription>Primary Production Channel • Custom URL: youtube.com/@SirsTeluguStories</CardDescription>
            </div>
            <Badge variant="brand">Verified Partner</Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground font-medium">Subscribers</p>
                <p className="text-2xl font-bold mt-1 text-foreground">84.2K</p>
                <span className="text-2xs text-emerald-500 font-medium">↑ +3.4K this month</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground font-medium">Lifetime Views</p>
                <p className="text-2xl font-bold mt-1 text-foreground">3.85M</p>
                <span className="text-2xs text-emerald-500 font-medium">↑ +412K this month</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground font-medium">Videos Live</p>
                <p className="text-2xl font-bold mt-1 text-foreground">148</p>
                <span className="text-2xs text-muted-foreground">112 Shorts / 36 Long</span>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border">
                <p className="text-xs text-muted-foreground font-medium">Avg. Shorts Retention</p>
                <p className="text-2xl font-bold mt-1 text-foreground">87.4%</p>
                <span className="text-2xs text-emerald-500 font-medium">High Engagement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Quota Gauge */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <span>YouTube API Quota</span>
              <span className="text-xs font-normal text-muted-foreground">Resets at 00:00 PST</span>
            </CardTitle>
            <CardDescription>Daily 10,000 units allocation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Consumed: {10000 - quotaRemaining} units</span>
                <span className="font-semibold text-foreground">{quotaRemaining} units remaining</span>
              </div>
              <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${((10000 - quotaRemaining) / 10000) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-2xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex justify-between">
                <span>Video Insert (Upload)</span>
                <span className="font-medium text-foreground">1,600 units</span>
              </div>
              <div className="flex justify-between">
                <span>Thumbnail Set</span>
                <span className="font-medium text-foreground">50 units</span>
              </div>
              <div className="flex justify-between">
                <span>Playlist & Metadata Update</span>
                <span className="font-medium text-foreground">50 units</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Publishing Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Video Details */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <UploadCloud className="w-5 h-5 text-primary" />
                  Publish Video to YouTube
                </CardTitle>
                <CardDescription>Configure metadata, SEO tags, privacy status, and release schedule.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={selectedFormat === "Shorts" ? "primary" : "outline"}
                  onClick={() => setSelectedFormat("Shorts")}
                >
                  Shorts (9:16)
                </Button>
                <Button
                  size="sm"
                  variant={selectedFormat === "Long-form" ? "primary" : "outline"}
                  onClick={() => setSelectedFormat("Long-form")}
                >
                  Long-form (16:9)
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Video Title (Telugu & English)
              </label>
              <Input
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="Enter compelling title..."
              />
              <span className="text-2xs text-muted-foreground mt-1 block">
                {videoTitle.length}/100 characters • Recommended to include #Shorts for vertical videos.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-foreground">
                  Description & Automated Chapters
                </label>
                <Button variant="ghost" size="sm" className="h-6 text-2xs text-primary gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI SEO Optimize
                </Button>
              </div>
              <Textarea
                rows={6}
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                placeholder="Write full video description..."
                className="font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Tags / Keywords</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Comma separated tags..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">Privacy & Release Mode</label>
                <Select
                  value={privacy}
                  onChange={(e) => setPrivacy(e.target.value)}
                  options={[
                    { label: "Public (Instant Release)", value: "public" },
                    { label: "Scheduled (Pick Time)", value: "scheduled" },
                    { label: "Unlisted (Review Link)", value: "unlisted" },
                    { label: "Private", value: "private" },
                  ]}
                />
              </div>
            </div>

            {privacy === "scheduled" && (
              <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  Select Schedule Date & Time (Asia/Kolkata IST)
                </div>
                <Input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full sm:w-72"
                />
                <span className="text-2xs text-muted-foreground">
                  Video will be uploaded immediately as private and flipped to public automatically by YouTube servers.
                </span>
              </div>
            )}

            {isUploading && (
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Uploading Video Chunk to YouTube (Resumable Protocol)...
                  </span>
                  <span className="font-bold text-primary">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-400">Video Successfully Published to YouTube!</p>
                    <p className="text-2xs text-muted-foreground">
                      Video ID: yt_live_948a • URL: https://youtube.com/watch?v=yt_live_948a
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 h-8">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View on YouTube
                </Button>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="outline">Save as Draft</Button>
              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={isUploading}
                className="gap-2 px-6"
              >
                <Tv className="w-4 h-4" />
                {privacy === "scheduled" ? "Schedule Release" : "Publish to YouTube"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Preview Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Feed Preview</CardTitle>
              <CardDescription>How this video will appear on YouTube mobile & desktop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-black border border-border group">
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
                  alt="Video Thumbnail Preview"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <Badge variant="brand" className="w-fit mb-2 text-2xs">
                    Telugu HD • 1080x1920
                  </Badge>
                  <p className="text-xs font-bold text-white line-clamp-2">{videoTitle}</p>
                  <p className="text-2xs text-zinc-300 mt-1">Sir&apos;s Telugu Cinematic Stories</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-semibold text-foreground">Film & Animation (24)</span>
                </div>
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-muted-foreground">Default Audio</span>
                  <span className="font-semibold text-foreground">Telugu (te)</span>
                </div>
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-muted-foreground">Made for Kids</span>
                  <span className="font-semibold text-foreground">No (Self-certified)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Published Videos Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Recent Channel Uploads & Telemetry
          </CardTitle>
          <CardDescription>Live video statistics synchronized from YouTube Analytics API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs data-table">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 px-4 font-semibold">Video</th>
                  <th className="py-3 px-4 font-semibold">Format</th>
                  <th className="py-3 px-4 font-semibold">Release Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Views</th>
                  <th className="py-3 px-4 font-semibold text-right">Likes</th>
                  <th className="py-3 px-4 font-semibold text-right">CTR</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockPublishedVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-16 h-10 object-cover rounded-md border border-border shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-foreground line-clamp-1">{video.teluguTitle}</p>
                          <p className="text-2xs text-muted-foreground line-clamp-1">{video.title}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-2xs">
                        {video.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-2xs">{video.publishedAt}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={video.status === "Public" ? "brand" : "outline"}
                        className="text-2xs"
                      >
                        {video.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-foreground">{video.views}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{video.likes}</td>
                    <td className="py-3 px-4 text-right text-emerald-500 font-medium">{video.ctr}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-2xs gap-1">
                        <ExternalLink className="w-3 h-3" />
                        Watch
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

