"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Camera,
  Share2,
  Sparkles,
  Heart,
  MessageCircle,
  Play,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Music2,
  Tag,
  Hash,
  Layers,
  Flame,
  Send,
  Eye,
} from "lucide-react";

interface PublishedReel {
  id: string;
  caption: string;
  publishedAt: string;
  plays: string;
  likes: string;
  comments: string;
  shares: string;
  status: "Published" | "Processing" | "Scheduled";
  thumbnailUrl: string;
}

const mockPublishedReels: PublishedReel[] = [
  {
    id: "ig_reel_839a",
    caption: "పల్లెటూరి సంక్రాంతి జ్ఞాపకాలు ❤️🌾 Godavari village festive vibes with AI cinematography! #TeluguReels #Sankranti2025 #TeluguStories",
    publishedAt: "Yesterday, 19:30 IST",
    plays: "94.8K",
    likes: "12.4K",
    comments: "389",
    shares: "2.1K",
    status: "Published",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80",
  },
  {
    id: "ig_reel_721b",
    caption: "ఆమె కళ్ళల్లో ఏదో చెప్పలేని బాధ... 🥺💔 Emotional Telugu scene breakdown. #Tollywood #TeluguCinema #AICinema #EmotionalReel",
    publishedAt: "3 days ago",
    plays: "148.2K",
    likes: "19.8K",
    comments: "624",
    shares: "4.7K",
    status: "Published",
    thumbnailUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
  },
  {
    id: "ig_reel_619c",
    caption: "హైదరాబాద్ రాత్రి వేళల్లో సాగే థ్రిల్లర్ కథ ⚡🌃 Mystery unfolds in Cyberabad! #Hyderabad #TeluguThriller #ReelsIndia",
    publishedAt: "5 days ago",
    plays: "76.4K",
    likes: "8.9K",
    comments: "215",
    shares: "1.2K",
    status: "Published",
    thumbnailUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80",
  },
];

export function InstagramStudioView() {
  const [caption, setCaption] = React.useState(
    "గోదావరి తీరంలో సంక్రాంతి సంబరాలు! 🌾✨ AI క్రియేటివిటీతో పునర్నిర్మించిన మన పల్లె జ్ఞాపకాలు. మీ చిన్ననాటి పండుగ ముచ్చట్లను కామెంట్ చేయండి! 👇\n\n" +
      "#TeluguReels #TeluguCinema #Sankranti2025 #GodavariVibes #TeluguStories #AIStorytelling #Tollywood"
  );
  const [audioName, setAudioName] = React.useState("Original Audio - Sir's Studio Telugu (Sankranti Theme)");
  const [shareToFeed, setShareToFeed] = React.useState(true);
  const [isPublishing, setIsPublishing] = React.useState(false);
  const [publishStep, setPublishStep] = React.useState("");
  const [publishSuccess, setPublishSuccess] = React.useState(false);

  const trendingHashtags = [
    "#TeluguReels",
    "#Tollywood",
    "#Sankranti2025",
    "#TeluguCinema",
    "#AICinema",
    "#GodavariVibes",
    "#TeluguStories",
    "#HyderabadVibes",
  ];

  const handlePublishReel = async () => {
    setIsPublishing(true);
    setPublishSuccess(false);

    setPublishStep("Step 1/3: Creating Meta Reels Container...");
    await new Promise((r) => setTimeout(r, 600));

    setPublishStep("Step 2/3: Uploading 1080x1920 video to Meta Edge CDN...");
    await new Promise((r) => setTimeout(r, 700));

    setPublishStep("Step 3/3: Publishing Reel & syncing custom Telugu audio track...");
    await new Promise((r) => setTimeout(r, 600));

    setIsPublishing(false);
    setPublishSuccess(true);
  };

  const addHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption((prev) => prev.trim() + " " + tag);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Instagram Operations & Reels Studio"
        description="Meta Graph API publishing pipeline for 9:16 Reels, Telugu hashtag optimization, and multi-format audio branding."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 inline-block animate-pulse" />
            Connected: @sirs_telugu_cinematics
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync Meta Account
          </Button>
        </div>
      </PageHeader>

      {/* Account Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Followers</p>
            <p className="text-2xl font-bold mt-1 text-foreground">42.3K</p>
            <span className="text-2xs text-emerald-500 font-medium">↑ +1,840 this week</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Camera className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Total Reels Plays</p>
            <p className="text-2xl font-bold mt-1 text-foreground">2.15M</p>
            <span className="text-2xs text-emerald-500 font-medium">↑ 18.2% vs last month</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Play className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Avg. Engagement Rate</p>
            <p className="text-2xl font-bold mt-1 text-foreground">9.8%</p>
            <span className="text-2xs text-emerald-500 font-medium">Top 5% in Telugu Media</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Heart className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Shares & Saves</p>
            <p className="text-2xl font-bold mt-1 text-foreground">34.9K</p>
            <span className="text-2xs text-emerald-500 font-medium">High Virality Factor</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Share2 className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main Reels Publishing Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Creator Workspace */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Publish Reel to Instagram
            </CardTitle>
            <CardDescription>
              Deploy 9:16 cinematic video directly to Meta Instagram Graph API with custom audio and hashtags.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-foreground">
                  Reels Caption (Telugu + English)
                </label>
                <Button variant="ghost" size="sm" className="h-6 text-2xs text-primary gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Telugu Viral Hook
                </Button>
              </div>
              <Textarea
                rows={5}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write engaging caption for your Reel..."
                className="text-xs leading-relaxed"
              />
            </div>

            {/* Trending Hashtag Pills */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-2">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Trending Telugu & Tollywood Hashtags (Click to add)
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingHashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addHashtag(tag)}
                    className="px-2.5 py-1 rounded-md text-2xs font-medium bg-muted/60 hover:bg-primary/20 hover:text-primary transition-colors border border-border"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Custom Audio / Sound Name
                </label>
                <div className="relative">
                  <Music2 className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                  <Input
                    value={audioName}
                    onChange={(e) => setAudioName(e.target.value)}
                    className="pl-9 text-xs"
                  />
                </div>
                <span className="text-2xs text-muted-foreground mt-1 block">
                  Attributed as original creator sound on Instagram.
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Reel Cover Frame
                </label>
                <Input
                  value="Frame at 00:03.20 (Optimal Hero Close-up)"
                  disabled
                  className="text-xs bg-muted/30"
                />
                <span className="text-2xs text-muted-foreground mt-1 block">
                  Automatically extracted from highest-contrast scene.
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={shareToFeed}
                  onCheckedChange={(checked) => setShareToFeed(!!checked)}
                />
                <span className="text-xs font-medium text-foreground">
                  Also share to main Instagram Profile Grid / Feed
                </span>
              </label>
            </div>

            {isPublishing && (
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {publishStep}
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary animate-pulse w-3/4 rounded-full" />
                </div>
              </div>
            )}

            {publishSuccess && (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-400">Reel Successfully Published to Instagram!</p>
                    <p className="text-2xs text-muted-foreground">
                      Media ID: ig_reel_839a • Live on @sirs_telugu_cinematics
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 h-8">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Reel
                </Button>
              </div>
            )}

            <div className="pt-2 flex justify-end gap-3">
              <Button variant="outline">Schedule for Peak Time</Button>
              <Button
                variant="primary"
                onClick={handlePublishReel}
                disabled={isPublishing}
                className="gap-2 px-6"
              >
                <Send className="w-4 h-4" />
                Publish Reel Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Preview */}
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Instagram Reel Preview</CardTitle>
              <CardDescription>Simulated mobile full-screen view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-2xl overflow-hidden aspect-[9/16] bg-black border border-border group">
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
                  alt="Reel Preview"
                  className="w-full h-full object-cover"
                />

                {/* Right Action Icons overlay */}
                <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4 text-white text-xs drop-shadow-md">
                  <div className="flex flex-col items-center">
                    <Heart className="w-6 h-6 fill-white" />
                    <span className="text-2xs font-semibold mt-0.5">12.4K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-2xs font-semibold mt-0.5">389</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Share2 className="w-6 h-6" />
                    <span className="text-2xs font-semibold mt-0.5">2.1K</span>
                  </div>
                </div>

                {/* Bottom Info overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-2xs font-bold">
                      S
                    </div>
                    <span className="text-xs font-bold text-white">sirs_telugu_cinematics</span>
                    <Badge variant="brand" className="text-[10px] py-0 px-1.5 h-4">
                      Follow
                    </Badge>
                  </div>
                  <p className="text-xs text-white line-clamp-2">{caption}</p>
                  <div className="flex items-center gap-1.5 text-2xs text-zinc-300 mt-2">
                    <Music2 className="w-3 h-3 animate-pulse" />
                    <span className="truncate">{audioName}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Published Reels Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Play className="w-4 h-4 text-primary" />
            Recent Published Reels & Performance
          </CardTitle>
          <CardDescription>Live metrics fetched via Instagram Graph API</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs data-table">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-3 px-4 font-semibold">Reel Content</th>
                  <th className="py-3 px-4 font-semibold">Published</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Plays</th>
                  <th className="py-3 px-4 font-semibold text-right">Likes</th>
                  <th className="py-3 px-4 font-semibold text-right">Shares</th>
                  <th className="py-3 px-4 font-semibold text-right">Comments</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockPublishedReels.map((reel) => (
                  <tr key={reel.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={reel.thumbnailUrl}
                          alt="Thumbnail"
                          className="w-10 h-14 object-cover rounded-md border border-border shrink-0"
                        />
                        <p className="font-medium text-foreground line-clamp-2 max-w-sm">{reel.caption}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-2xs">{reel.publishedAt}</td>
                    <td className="py-3 px-4">
                      <Badge variant="brand" className="text-2xs">
                        {reel.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-foreground">{reel.plays}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{reel.likes}</td>
                    <td className="py-3 px-4 text-right text-emerald-500 font-medium">{reel.shares}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{reel.comments}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="h-7 text-2xs gap-1">
                        <ExternalLink className="w-3 h-3" />
                        View
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

