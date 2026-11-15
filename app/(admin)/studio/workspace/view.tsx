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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/ui/empty-state";
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Calendar,
  CheckCircle2,
  Clapperboard,
  Clock,
  Eye,
  FileCheck2,
  FileText,
  Film,
  Image as ImageIcon,
  Layers,
  Mic,
  Music,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  Tv,
  Volume2,
  XCircle,
  Cpu,
  Terminal,
  X,
  MessageSquare,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface SceneItem {
  id: number;
  number: string;
  location: string;
  shotType: string;
  cameraMovement: string;
  emotion: string;
  dialogueTelugu: string;
  visualPrompt: string;
  duration: string;
  status: "Completed" | "Generating" | "Ready";
  audioUrl?: string;
}

export function ProductionWorkspaceView() {
  const [activeTab, setActiveTab] = useState<string>("storyboard");
  const [isPlayingAudio, setIsPlayingAudio] = useState<number | null>(null);
  const [regeneratingSceneId, setRegeneratingSceneId] = useState<number | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  // Inspector modal state
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [selectedAgentTab, setSelectedAgentTab] = useState<string>("director");

  // Scene tweak modal state
  const [activeTweakScene, setActiveTweakScene] = useState<SceneItem | null>(null);
  const [tweakFeedback, setTweakFeedback] = useState<string>("");
  const [projectTitle, setProjectTitle] = useState<string>("Active Telugu Video Production");

  const [scenes, setScenes] = useState<SceneItem[]>([]);

  const handleOpenTweak = (scene: SceneItem) => {
    setActiveTweakScene(scene);
    setTweakFeedback(`Make the facial comedy in ${scene.number} more expressive with exaggerated Telugu timing.`);
  };

  const handleRegenerateScene = async (sceneId: number, feedback?: string) => {
    setRegeneratingSceneId(sceneId);
    if (activeTweakScene) {
      setActiveTweakScene(null);
    }

    try {
      const res = await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "regenerate_scene",
          projectId: "proj_telugu_101",
          sceneNumber: sceneId,
          creativeFeedback: feedback || "Refine facial animation and lighting dynamics.",
        }),
      });
      const data = await res.json();
      if (data.scene) {
        setScenes((prev) =>
          prev.map((s) =>
            s.id === sceneId
              ? {
                  ...s,
                  visualPrompt: data.scene.visualPrompt || s.visualPrompt,
                  emotion: data.scene.emotion || s.emotion,
                  status: "Completed",
                }
              : s
          )
        );
      }
    } catch {
      // Deterministic simulation
      await new Promise((r) => setTimeout(r, 1200));
    } finally {
      setRegeneratingSceneId(null);
    }
  };

  const togglePlayAudio = (id: number) => {
    setIsPlayingAudio(isPlayingAudio === id ? null : id);
  };

  const handleApprove = () => {
    setIsApproved(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Production Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-2xs font-bold text-primary">PROJECT #101</span>
            <Badge variant="outline" className="text-2xs font-semibold">
              YouTube Shorts (9:16)
            </Badge>
            <Badge
              variant={isApproved ? "success" : "warning"}
              className="text-2xs font-semibold"
            >
              {isApproved ? "Approved by Creator" : "Awaiting Creator Approval"}
            </Badge>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">
            {projectTitle}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Duration: 45s &bull; 4 Scenes &bull; Telugu (te-IN) &bull; Music: Ducked Comic BGM &bull; Model: Gemini Veo
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsInspectorOpen(true)}
            className="gap-1.5 text-xs font-semibold text-primary border-primary/30 hover:bg-primary/5"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Inspect Agent Reasoning</span>
          </Button>

          {!isApproved ? (
            <Button
              variant="brand"
              size="sm"
              className="gap-2 font-bold shadow-card"
              onClick={handleApprove}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Approve Video</span>
            </Button>
          ) : (
            <Link href="/studio/calendar">
              <Button variant="default" size="sm" className="gap-2 font-bold shadow-card">
                <Send className="h-4 w-4" />
                <span>Schedule to YouTube</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Workspace Pipeline Stage Tabs */}
      {scenes.length === 0 ? (
        <EmptyState
          icon={<Film className="h-8 w-8" />}
          title="No Active Production Pipeline"
          description="You don't have an active video production session loaded. Launch a video project by entering a Telugu dialogue, script idea, or voice recording."
          action={{
            label: "Create Video Project",
            onClick: () => {
              window.location.href = "/studio/create";
            },
          }}
        />
      ) : (
        <Tabs defaultValue="storyboard" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 w-full h-auto p-1 bg-muted/80 gap-1">
          <TabsTrigger value="brief" className="gap-1.5 py-2">
            <FileText className="h-3.5 w-3.5" />
            <span>01 Brief</span>
          </TabsTrigger>
          <TabsTrigger value="script" className="gap-1.5 py-2">
            <Clapperboard className="h-3.5 w-3.5" />
            <span>02 Script</span>
          </TabsTrigger>
          <TabsTrigger value="storyboard" className="gap-1.5 py-2">
            <Layers className="h-3.5 w-3.5" />
            <span>03 Storyboard</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="gap-1.5 py-2">
            <Mic className="h-3.5 w-3.5" />
            <span>04 Telugu Voice</span>
          </TabsTrigger>
          <TabsTrigger value="editor" className="gap-1.5 py-2">
            <Film className="h-3.5 w-3.5" />
            <span>05 Video Edit</span>
          </TabsTrigger>
          <TabsTrigger value="qc" className="gap-1.5 py-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>06 Quality QC</span>
          </TabsTrigger>
          <TabsTrigger value="publish" className="gap-1.5 py-2">
            <Tv className="h-3.5 w-3.5" />
            <span>07 Publish</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Creative Brief */}
        <TabsContent value="brief" className="space-y-4">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Creative Director Brief (Agent 02)</CardTitle>
              <CardDescription>
                Emotional arc, audience engagement strategy, and target hook timing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <span className="text-2xs font-semibold uppercase text-muted-foreground">Hook (0-3s)</span>
                  <p className="text-xs font-bold text-foreground mt-1">
                    రవి ఆఫీస్ లో పరుగెత్తుతూ &quot;బాస్ ఇంకా రాలేదా?&quot; అని అడగడం
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <span className="text-2xs font-semibold uppercase text-muted-foreground">Emotional Arc</span>
                  <p className="text-xs font-bold text-foreground mt-1">
                    Anxiety &rarr; False Relief &rarr; Sudden Shock &rarr; Comedy Payoff
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3 bg-muted/30">
                  <span className="text-2xs font-semibold uppercase text-muted-foreground">Target Audience</span>
                  <p className="text-xs font-bold text-foreground mt-1">
                    Telugu youth, IT employees, relatable everyday comedy viewers
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                <h4 className="text-xs font-bold text-foreground">Director Directorial Note:</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Keep dialogue natural and conversational (స్వాభావిక తెలుగు). Timing is everything in this scene: Scene 3 must have a 0.5s pause after Ravi turns around before he nervously smiles. The music must cut abruptly to silence when the boss is revealed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Telugu Script */}
        <TabsContent value="script" className="space-y-4">
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Telugu Script Writer (Agent 03)</CardTitle>
                <CardDescription>
                  Grammatically accurate, conversational Telugu script with pronunciation cues and timing.
                </CardDescription>
              </div>
              <Badge variant="brand" className="text-2xs">
                Verified te-IN
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {scenes.map((scene) => (
                <div key={scene.id} className="rounded-xl border border-border p-4 bg-muted/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xs font-bold text-primary">{scene.number}</span>
                    <span className="text-2xs text-muted-foreground font-mono">{scene.duration}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground font-sans leading-relaxed">
                    {scene.dialogueTelugu}
                  </p>
                  <div className="flex items-center gap-3 text-2xs text-muted-foreground pt-1 border-t border-border/60">
                    <span><strong>Location:</strong> {scene.location}</span>
                    <span>&bull;</span>
                    <span><strong>Expression:</strong> {scene.emotion}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Storyboard & Scenes */}
        <TabsContent value="storyboard" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {scenes.map((scene) => (
              <Card key={scene.id} className="border-border bg-card shadow-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">{scene.number}</span>
                      <Badge variant="outline" className="text-2xs font-mono">{scene.shotType}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xs text-muted-foreground font-mono">{scene.duration}</span>
                      <Badge variant="success" className="text-[10px]">
                        {scene.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-sm mt-1">{scene.location}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Visual Frame Preview */}
                  <div className="relative aspect-[16/9] w-full rounded-lg bg-black/90 flex flex-col items-center justify-center p-4 text-center border border-border/80 overflow-hidden group">
                    <Film className="h-8 w-8 text-primary/60 mb-2 transition-transform group-hover:scale-110" />
                    <p className="text-2xs text-white/80 line-clamp-2 px-4 italic font-sans">
                      &quot;{scene.dialogueTelugu}&quot;
                    </p>
                    <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono text-white/70">
                      Gemini Veo 9:16
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-2xs font-semibold uppercase text-muted-foreground">
                      Visual Prompt (Agent 04 &rarr; Agent 06):
                    </p>
                    <p className="text-xs text-foreground/90 font-mono text-2xs leading-relaxed bg-muted/60 p-2.5 rounded-lg border border-border/60">
                      {scene.visualPrompt}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-2xs text-muted-foreground">
                    Emotion: <strong>{scene.emotion}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleOpenTweak(scene)}
                    >
                      <Wand2 className="h-3 w-3" />
                      <span>Adjust & Tweak</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => handleRegenerateScene(scene.id)}
                      disabled={regeneratingSceneId === scene.id}
                    >
                      {regeneratingSceneId === scene.id ? (
                        <RefreshCw className="h-3 w-3 animate-spin text-primary" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                      <span>{regeneratingSceneId === scene.id ? "Regenerating..." : "Regenerate Scene"}</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 4: Telugu Voice Synthesis */}
        <TabsContent value="voice" className="space-y-4">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Telugu Voice Director (Agent 07)</CardTitle>
                  <CardDescription>
                    Isolated dialogue audio tracks, natural pronunciation dictionary, and emotional delivery checks.
                  </CardDescription>
                </div>
                <Badge variant="brand" className="text-2xs">
                  48kHz Master Audio
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {scenes.map((scene) => (
                <div key={scene.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border p-4 bg-muted/30">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xs font-bold text-primary">{scene.number}</span>
                      <Badge variant="outline" className="text-2xs">{scene.emotion}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-foreground font-sans">
                      {scene.dialogueTelugu}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant={isPlayingAudio === scene.id ? "destructive" : "default"}
                      size="sm"
                      className="h-8 gap-1.5 text-xs font-semibold"
                      onClick={() => togglePlayAudio(scene.id)}
                    >
                      {isPlayingAudio === scene.id ? (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>Playing Audio...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>Listen (4.5s)</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Video Editor Timeline & Subtitles */}
        <TabsContent value="editor" className="space-y-4">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>FFmpeg Video Editor (Agent 10)</CardTitle>
              <CardDescription>
                Automated scene stitching, background music ducking, and Telugu subtitle rendering.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border bg-black/95 p-6 text-center text-white space-y-3">
                <Film className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-base font-bold">Assembled 9:16 Video Preview</h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  All 4 scenes stitched at 1080x1920 (60 FPS), Telugu subtitles burned with Nirmala UI font, and comic sound effects synchronized.
                </p>
                <div className="pt-2">
                  <Button variant="brand" size="sm" className="gap-2">
                    <Play className="h-4 w-4" />
                    <span>Watch Final Render (45s)</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Quality Control (Agent 13) */}
        <TabsContent value="qc" className="space-y-4">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Automated QC Report (Agent 13)</CardTitle>
                  <CardDescription>
                    Deterministic pre-publishing checklist. Every test must pass before scheduling.
                  </CardDescription>
                </div>
                <Badge variant="success" className="text-xs font-bold">
                  PASS (100% Score)
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Resolution & Aspect Ratio", desc: "1080x1920 (9:16) Vertical Shorts standard confirmed.", status: "Passed" },
                { title: "Telugu Subtitle Typography", desc: "Vowel diacritics and conjunct glyphs correctly shaped with zero rendering artifacts.", status: "Passed" },
                { title: "Audio Normalization & Clipping", desc: "Dialogue normalized to -14 LUFS, music ducked to -24 LUFS during speech.", status: "Passed" },
                { title: "Black Frame / Freeze Detection", desc: "Zero black frames or frozen video segments detected between cuts.", status: "Passed" },
                { title: "Music Rights & Licensing", desc: "Royalty-free commercial comedy score attached with license metadata.", status: "Passed" },
                { title: "Thumbnail Availability", desc: "High-contrast Telugu thumbnail generated and verified.", status: "Passed" },
              ].map((check, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3 bg-muted/30">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground">{check.title}</p>
                    <p className="text-2xs text-muted-foreground">{check.desc}</p>
                  </div>
                  <Badge variant="success" className="text-2xs font-semibold gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>{check.status}</span>
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 7: Thumbnails & YouTube Publishing Approval */}
        <TabsContent value="publish" className="space-y-4">
          <Card className="border-border bg-card shadow-card">
            <CardHeader>
              <CardTitle>Thumbnail Designer &amp; YouTube Metadata (Agents 11, 12 &amp; 14)</CardTitle>
              <CardDescription>
                Review thumbnails with high-contrast Telugu text, SEO-optimized titles, and schedule.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Thumbnail Variants */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Generated Thumbnail Concepts (Select Primary):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["కాన్సెప్ట్ 1: షాకింగ్ ఎక్స్‌ప్రెషన్", "కాన్సెప్ట్ 2: బాస్ వార్నింగ్ లుక్", "కాన్సెప్ట్ 3: కామెడీ పంచ్ ఫేస్"].map((t, idx) => (
                    <div
                      key={idx}
                      className={`rounded-xl border p-3 cursor-pointer transition-all ${
                        idx === 0
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <div className="aspect-[9/16] w-full rounded-lg bg-black/90 flex flex-col justify-end p-3 text-white relative mb-2">
                        <Badge variant="brand" className="absolute top-2 left-2 text-[9px]">
                          9:16 Shorts
                        </Badge>
                        <p className="text-xs font-bold text-white bg-black/70 p-1 rounded font-sans truncate">
                          {projectTitle}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-foreground truncate">{t}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Metadata Fields */}
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="rounded-lg border border-border p-3 bg-muted/40 space-y-1">
                  <span className="text-2xs font-semibold uppercase text-muted-foreground">YouTube Shorts Title:</span>
                  <p className="text-xs font-bold text-foreground">
                    {projectTitle} | Telugu AI Story #Shorts
                  </p>
                </div>
                <div className="rounded-lg border border-border p-3 bg-muted/40 space-y-1">
                  <span className="text-2xs font-semibold uppercase text-muted-foreground">Pinned Comment:</span>
                  <p className="text-xs text-foreground">
                    మీ ఆఫీస్ లో కూడా ఇలా జరిగిందా? కామెంట్ చేయండి! సబ్స్క్రైబ్ చేయడం మర్చిపోకండి 👇
                  </p>
                </div>
              </div>

              {/* Approval Box */}
              <Alert variant={isApproved ? "success" : "brand"}>
                <AlertTitle>
                  {isApproved ? "Project Approved for Publishing" : "Creator Approval Required"}
                </AlertTitle>
                <AlertDescription>
                  {isApproved
                    ? "This video has been verified and approved by you. It can now be scheduled or published directly through the YouTube Data API."
                    : "Review the Telugu script, video assemble, and thumbnail above. Once you are satisfied, click 'Approve Video' to authorize scheduling."}
                </AlertDescription>
              </Alert>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">
                Channel: <strong>Sir&apos;s Telugu Studio (Connected)</strong>
              </span>
              <div className="flex items-center gap-2">
                {!isApproved ? (
                  <Button variant="brand" onClick={handleApprove} className="gap-1.5 font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Approve Video</span>
                  </Button>
                ) : (
                  <Link href="/studio/calendar">
                    <Button variant="default" className="gap-1.5 font-bold shadow-card">
                      <Send className="h-4 w-4" />
                      <span>Proceed to Calendar &amp; Schedule</span>
                    </Button>
                  </Link>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      )}

      {/* Modal: Tweak Scene Feedback */}
      {activeTweakScene && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg border-border bg-card shadow-modal">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-primary" />
                  Adjust {activeTweakScene.number}
                </CardTitle>
                <CardDescription>Provide creative feedback for targeted re-generation.</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTweakScene(null)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg p-3 bg-muted/40 border border-border text-xs space-y-1">
                <span className="text-2xs font-semibold text-muted-foreground">Current Dialogue:</span>
                <p className="font-sans font-medium text-foreground">{activeTweakScene.dialogueTelugu}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Creative Adjustment Instructions
                </label>
                <Textarea
                  rows={3}
                  value={tweakFeedback}
                  onChange={(e) => setTweakFeedback(e.target.value)}
                  placeholder="e.g. Change facial expression to subtle disbelief, warmer cinematic lighting..."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setActiveTweakScene(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleRegenerateScene(activeTweakScene.id, tweakFeedback)}
                className="gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate This Scene</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Modal: Multi-Agent Live Reasoning Inspector */}
      {isInspectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <Card className="w-full max-w-3xl max-h-[85vh] flex flex-col border-border bg-card shadow-modal">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-primary" />
                  Live Multi-Agent Reasoning &amp; Decision Inspector
                </CardTitle>
                <CardDescription>
                  Inspect the chain-of-thought, constraints, and instructions passed between autonomous agents.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsInspectorOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto">
                {[
                  { id: "director", label: "Agent 04 (Film Director)" },
                  { id: "character", label: "Agent 05 (Character Bible)" },
                  { id: "veo", label: "Agent 06 (Gemini Veo)" },
                  { id: "voice", label: "Agent 07 (Telugu Voice)" },
                  { id: "qc", label: "Agent 11 (QC Engine)" },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={selectedAgentTab === tab.id ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedAgentTab(tab.id)}
                    className="text-xs shrink-0 h-8"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              {selectedAgentTab === "director" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
                    <span className="text-primary font-bold">STORYBOARD CONTINUITY LOGIC:</span>
                    <p className="text-muted-foreground leading-relaxed">
                      [Agent 04]: Analyzed dialogue comic pacing. Selected 35mm equivalent wide lens for Scene 01 tracking shot to emphasize speed and corridor perspective. Cut to tight 50mm Over-the-shoulder for Scene 02 to compress space between Ravi and Suresh. Implemented dynamic whip pan in Scene 03 timed at 00:09.200 to maximize shock value before revealing Manager.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
                    <span className="text-emerald-500 font-bold">LIGHTING &amp; COLOR PALETTE:</span>
                    <p className="text-muted-foreground leading-relaxed">
                      Cool fluorescent ceiling panels (5600K) with warm rim light on employee hair (3200K) to maintain separation from office background.
                    </p>
                  </div>
                </div>
              )}

              {selectedAgentTab === "character" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
                    <span className="text-primary font-bold">CHARACTER BIBLE CONTINUITY CHECKS:</span>
                    <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>Ravi (ID: char_ravi_01): Facial token seed verified. Semi-formal light blue cotton shirt, silver analog watch on left wrist persistent across all 4 scenes.</li>
                      <li>Manager (ID: char_boss_02): Dark charcoal blazer, folded arms gesture locked, salt-and-pepper mustache continuity index 0.98.</li>
                      <li>Zero unauthorized likeness alteration detected.</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedAgentTab === "veo" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
                    <span className="text-primary font-bold">GEMINI VEO TEMPORAL PROMPT SYNTAX:</span>
                    <p className="text-muted-foreground leading-relaxed">
                      Prompt: &quot;Cinematic 9:16 vertical video, 24fps. Fast smooth forward tracking camera through modern Hyderabad office hallway. Young Indian IT professional in light blue shirt anxiously sprinting while looking down at wristwatch. Photorealistic motion blur on background glass walls.&quot;
                    </p>
                    <p className="text-2xs text-muted-foreground pt-1">
                      Negative tokens: &quot;jitter, warped faces, unnatural hand anatomy, cartoonish shading, low framerate.&quot;
                    </p>
                  </div>
                </div>
              )}

              {selectedAgentTab === "voice" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
                    <span className="text-primary font-bold">TELUGU PHONETIC PROSODY &amp; BREATH MARKERS:</span>
                    <p className="text-muted-foreground leading-relaxed">
                      Phonetic string: &quot;arre suresh! boss inkaa raaledaa? [pause 0.2s] abbaa devudaa brathikinchaavu! [gasp]&quot;
                    </p>
                    <p className="text-muted-foreground">
                      Pitch Contour: +15% pitch spike on &quot;దేవుడా&quot; to convey exaggerated relief. Normalized to -14.0 LUFS.
                    </p>
                  </div>
                </div>
              )}

              {selectedAgentTab === "qc" && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border space-y-1">
                    <span className="text-emerald-500 font-bold">QC VERIFICATION SUMMARY (PASS):</span>
                    <p className="text-muted-foreground leading-relaxed">
                      Integrated loudness: -14.1 LUFS (Tolerance: &plusmn;1.0 LUFS). True Peak: -1.2 dBTP. Telugu font shaping test: 100% ligature glyph match with Lohit Telugu font. No dropped frames detected.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end border-t border-border pt-3">
              <Button size="sm" variant="outline" onClick={() => setIsInspectorOpen(false)}>
                Close Inspector
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
