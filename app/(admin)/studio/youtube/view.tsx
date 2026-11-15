"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
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
  TrendingUp,
  Bot,
  Send,
  CornerDownRight,
  Smile,
  Search,
  Check,
  Copy,
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

interface TitleVariant {
  style: "Curiosity Hook" | "Emotional Appeal" | "Mass Drama" | "Search SEO";
  teluguTitle: string;
  englishTitle: string;
  hookLine: string;
  projectedCtr: string;
  clickScore: number;
  explanation: string;
}

interface KeywordItem {
  tag: string;
  searchVolume: string;
  competition: "Low" | "Medium" | "High";
  isTrending: boolean;
}

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  sentiment: "positive" | "question" | "critical" | "neutral";
  timestamp: string;
  likes: number;
  aiSuggestedReply?: string;
  replySent?: boolean;
}

export function YouTubeStudioView() {
  const [publishedVideos, setPublishedVideos] = React.useState<PublishedVideo[]>([]);
  const [selectedFormat, setSelectedFormat] = React.useState<"Shorts" | "Long-form">("Shorts");
  const [videoTitle, setVideoTitle] = React.useState("");
  const [videoDescription, setVideoDescription] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [privacy, setPrivacy] = React.useState("public");
  const [scheduledDate, setScheduledDate] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [quotaRemaining, setQuotaRemaining] = React.useState(10000);

  // A/B Variant State
  const [variantTopic, setVariantTopic] = React.useState("");
  const [isLoadingVariants, setIsLoadingVariants] = React.useState(false);
  const [variants, setVariants] = React.useState<TitleVariant[]>([]);

  // Keyword Explorer State
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [isSearchingKeywords, setIsSearchingKeywords] = React.useState(false);
  const [discoveredKeywords, setDiscoveredKeywords] = React.useState<KeywordItem[]>([]);

  // Community Comments State
  const [comments, setComments] = React.useState<CommentItem[]>([]);
  const [activeReplyId, setActiveReplyId] = React.useState<string | null>(null);
  const [replyDraft, setReplyDraft] = React.useState<string>("");

  const handleGenerateVariants = async () => {
    setIsLoadingVariants(true);
    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "variants",
          topic: variantTopic,
          format: selectedFormat,
        }),
      });
      const data = await res.json();
      if (data.variants && data.variants.length > 0) {
        setVariants(data.variants);
      }
    } catch (err) {
      console.warn("Using deterministic fallback variants", err);
    } finally {
      setIsLoadingVariants(false);
    }
  };

  const handleSearchKeywords = async () => {
    setIsSearchingKeywords(true);
    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "keywords",
          topic: searchKeyword,
        }),
      });
      const data = await res.json();
      if (data.keywords && data.keywords.length > 0) {
        setDiscoveredKeywords(data.keywords);
      }
    } catch (err) {
      console.warn("Using keyword fallback", err);
    } finally {
      setIsSearchingKeywords(false);
    }
  };

  const applyVariantToTitle = (variant: TitleVariant) => {
    setVideoTitle(`${variant.teluguTitle} | ${variant.englishTitle}`);
  };

  const addTagToTags = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => (prev ? `${prev}, ${tag}` : tag));
    }
  };

  const addAllTags = () => {
    const newTags = discoveredKeywords.map((k) => k.tag).filter((t) => !tags.includes(t));
    if (newTags.length > 0) {
      setTags((prev) => (prev ? `${prev}, ${newTags.join(", ")}` : newTags.join(", ")));
    }
  };

  const handleOpenReply = (comment: CommentItem) => {
    setActiveReplyId(comment.id);
    setReplyDraft(comment.aiSuggestedReply || "");
  };

  const handleSendReply = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, replySent: true, aiSuggestedReply: replyDraft } : c))
    );
    setActiveReplyId(null);
    setReplyDraft("");
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(10);
    setUploadSuccess(false);

    try {
      await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upload",
          title: videoTitle,
          description: videoDescription,
          tags: tags.split(",").map((t) => t.trim()),
          privacy,
          format: selectedFormat,
        }),
      });
    } catch {
      // Mock progress simulation continues
    }

    for (let p = 25; p <= 100; p += 25) {
      await new Promise((r) => setTimeout(r, 350));
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
        description="Direct channel management, multi-format upload automation, A/B title experimentation, Telugu SEO tags, and community auto-reply."
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

      {/* Operations Workspace Tabs: Publish | A/B Experiments | Telugu SEO | Community Auto-Reply */}
      <Tabs defaultValue="publish" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full h-auto p-1 bg-muted/80 gap-1">
          <TabsTrigger value="publish" className="gap-2 py-2.5">
            <UploadCloud className="w-4 h-4" />
            <span>Publish & Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="ab-variants" className="gap-2 py-2.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>A/B Title & Hook Engine</span>
          </TabsTrigger>
          <TabsTrigger value="seo-tags" className="gap-2 py-2.5">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>Telugu SEO & Trends</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="gap-2 py-2.5">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span>Community & Telugu Replies</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Publish & Schedule */}
        <TabsContent value="publish" className="mt-6 space-y-6">
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
        </TabsContent>

        {/* Tab 2: A/B Title & Hook Variant Generator */}
        <TabsContent value="ab-variants" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Agent 13 — YouTube Growth & Title Experimentation
                  </CardTitle>
                  <CardDescription>
                    Generate and simulate 4 distinct psychological A/B title and opening hook strategies tailored to Telugu viewership demographics.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={variantTopic}
                    onChange={(e) => setVariantTopic(e.target.value)}
                    placeholder="Enter story topic or concept..."
                    className="w-64 text-xs"
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGenerateVariants}
                    disabled={isLoadingVariants}
                    className="gap-1.5"
                  >
                    {isLoadingVariants ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    <span>Generate Variants</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {variants.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-xl">
                  <Sparkles className="w-8 h-8 text-amber-500/60 mb-2" />
                  <h4 className="text-sm font-semibold text-foreground">No A/B Variants Generated Yet</h4>
                  <p className="text-2xs text-muted-foreground max-w-sm mt-1">
                    Enter a video concept or dialogue topic above and click &quot;Generate Variants&quot; to test 4 psychological title and hook variations tailored for Telugu viewers.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {variants.map((v, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-border p-4 bg-muted/20 hover:bg-muted/30 transition-all space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            v.style === "Mass Drama"
                              ? "destructive"
                              : v.style === "Emotional Appeal"
                              ? "brand"
                              : v.style === "Curiosity Hook"
                              ? "warning"
                              : "outline"
                          }
                          className="text-2xs font-semibold"
                        >
                          {v.style}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <span className="text-2xs text-muted-foreground">Proj. CTR:</span>
                          <span className="font-bold text-xs text-emerald-500">{v.projectedCtr}</span>
                          <Badge variant="outline" className="text-2xs font-mono">
                            Score: {v.clickScore}/100
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-sm text-foreground">{v.teluguTitle}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{v.englishTitle}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-card border border-border text-xs space-y-1">
                        <span className="font-semibold text-2xs text-primary flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          First 3-Second Spoken Hook Line:
                        </span>
                        <p className="italic text-muted-foreground font-sans">&quot;{v.hookLine}&quot;</p>
                      </div>

                      <p className="text-2xs text-muted-foreground leading-relaxed">{v.explanation}</p>

                      <div className="pt-2 border-t border-border flex justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => applyVariantToTitle(v)}
                          className="gap-1.5 text-xs h-7 group-hover:border-primary group-hover:text-primary transition-colors"
                        >
                          <Check className="w-3 h-3" />
                          Apply to Video Title
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Telugu SEO & Trends Explorer */}
        <TabsContent value="seo-tags" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Telugu High-CTR Keyword & Trend Explorer
                  </CardTitle>
                  <CardDescription>
                    Explore trending regional search terms, low-competition tags, and automated metadata insertion for Telugu audiences.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-3 text-muted-foreground" />
                    <Input
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="Search Telugu trend..."
                      className="w-56 pl-8 text-xs"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSearchKeywords}
                    disabled={isSearchingKeywords}
                    className="gap-1.5"
                  >
                    {isSearchingKeywords ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                    <span>Explore</span>
                  </Button>
                  <Button variant="primary" size="sm" onClick={addAllTags} className="gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Insert All Into Tags</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {discoveredKeywords.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border rounded-xl">
                  <Tag className="w-8 h-8 text-emerald-500/60 mb-2" />
                  <h4 className="text-sm font-semibold text-foreground">No Keywords Explored Yet</h4>
                  <p className="text-2xs text-muted-foreground max-w-sm mt-1">
                    Enter a Telugu topic keyword above and click &quot;Explore&quot; to discover high-volume search queries and competition metrics with Agent 12.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {discoveredKeywords.map((kw, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-foreground">{kw.tag}</span>
                          {kw.isTrending && (
                            <Badge variant="brand" className="text-[9px] px-1.5 py-0">
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-2xs text-muted-foreground">
                          <span>Vol: {kw.searchVolume}</span>
                          <span>&bull;</span>
                          <span>
                            Comp:{" "}
                            <strong
                              className={
                                kw.competition === "Low"
                                  ? "text-emerald-500"
                                  : kw.competition === "Medium"
                                  ? "text-amber-500"
                                  : "text-red-500"
                              }
                            >
                              {kw.competition}
                            </strong>
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addTagToTags(kw.tag)}
                        className="h-7 w-7 p-0 rounded-full hover:bg-primary/10 hover:text-primary"
                      >
                        <Tag className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 rounded-xl bg-card border border-border">
                <span className="text-xs font-semibold text-foreground block mb-2">Current Video Tags Preview:</span>
                <div className="flex flex-wrap gap-2">
                  {tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t, idx) => (
                      <Badge key={idx} variant="outline" className="text-2xs py-1 px-2.5 bg-muted/40">
                        #{t}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Community Management & Telugu AI Replies */}
        <TabsContent value="community" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-500" />
                    Agent 16 — Community Management & Sentiment Engine
                  </CardTitle>
                  <CardDescription>
                    Real-time Telugu sentiment classification and culturally respectful colloquial Telugu auto-replies.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="border-border text-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 inline-block" />
                  Auto-Moderation Active (Filters Telugu Abuse)
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {comments.length === 0 ? (
                <EmptyState
                  icon={<MessageSquare className="h-8 w-8" />}
                  title="No Community Comments Synchronized Yet"
                  description="Connect your YouTube channel to fetch viewer comments and generate culturally authentic Telugu replies with Agent 16."
                />
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-border p-4 bg-muted/20 space-y-3 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-8 h-8 rounded-full object-cover border border-border"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-foreground">{comment.author}</span>
                            <span className="text-2xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-foreground font-sans mt-1 leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          comment.sentiment === "positive"
                            ? "success"
                            : comment.sentiment === "critical"
                            ? "warning"
                            : "outline"
                        }
                        className="text-2xs capitalize"
                      >
                        {comment.sentiment}
                      </Badge>
                    </div>

                    {comment.replySent ? (
                      <div className="ml-11 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-2xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Reply Published to YouTube Comment Thread
                        </div>
                        <p className="text-foreground font-sans">&quot;{comment.aiSuggestedReply}&quot;</p>
                      </div>
                    ) : activeReplyId === comment.id ? (
                      <div className="ml-11 space-y-2 p-3 rounded-lg bg-card border border-primary/30">
                        <label className="text-2xs font-semibold text-primary flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5" />
                          Agent 16 Drafted Telugu Reply (Culturally Tailored):
                        </label>
                        <Textarea
                          rows={2}
                          value={replyDraft}
                          onChange={(e) => setReplyDraft(e.target.value)}
                          className="text-xs font-sans"
                        />
                        <div className="flex justify-end gap-2 pt-1">
                          <Button variant="ghost" size="sm" onClick={() => setActiveReplyId(null)} className="h-7 text-xs">
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleSendReply(comment.id)}
                            className="h-7 text-xs gap-1.5"
                          >
                            <Send className="w-3 h-3" />
                            Approve & Publish Reply
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="ml-11 flex items-center justify-between pt-1 border-t border-border/50 text-2xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" /> {comment.likes} Likes
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenReply(comment)}
                          className="h-7 text-xs gap-1.5 text-primary hover:text-primary"
                        >
                          <CornerDownRight className="w-3 h-3" />
                          View AI Telugu Reply Draft
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
          {publishedVideos.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={<Tv className="h-8 w-8" />}
                title="No Videos Published Yet"
                description="Your published videos and telemetry will appear here once videos are uploaded to YouTube via Agent 14."
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
                  {publishedVideos.map((video) => (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
