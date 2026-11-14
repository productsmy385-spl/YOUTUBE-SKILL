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
import { Field, Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  Bot,
  Camera,
  CheckCircle2,
  Clapperboard,
  Clock,
  Coins,
  Flame,
  Globe,
  Mic,
  Music,
  Play,
  RotateCcw,
  Sparkles,
  Tv,
  Upload,
  Video,
  Volume2,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeluguTransliterationService, TeluguDialect, TELUGU_DIALECTS } from "@/lib/services/telugu-transliteration";

interface DebateMessage {
  id: string;
  senderName: string;
  senderRole: string;
  content: string;
  teluguContent?: string;
  timestamp: string;
}

export function CreateVideoView() {
  const router = useRouter();

  // Wizard State
  const [inputMode, setInputMode] = useState<"dialogue" | "voice" | "concept">("dialogue");
  const [platform, setPlatform] = useState<"shorts" | "reels" | "longform">("shorts");
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9" | "1:1">("9:16");
  const [genre, setGenre] = useState<string>("comedy");
  const [emotionalTone, setEmotionalTone] = useState<string>("conversational");
  const [durationTarget, setDurationTarget] = useState<string>("45");
  const [voiceRegister, setVoiceRegister] = useState<string>("male_conversational");
  const [enableBgm, setEnableBgm] = useState<boolean>(true);
  const [enableTeluguSubtitles, setEnableTeluguSubtitles] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dialect & Transliteration State
  const [selectedDialect, setSelectedDialect] = useState<TeluguDialect>("standard");
  const [phoneticInput, setPhoneticInput] = useState<string>("");

  // Agent Debate State
  const [isDebating, setIsDebating] = useState<boolean>(false);
  const [isDebateModalOpen, setIsDebateModalOpen] = useState<boolean>(false);
  const [debateMessages, setDebateMessages] = useState<DebateMessage[]>([]);
  const [debateConsensus, setDebateConsensus] = useState<string>("");

  // Form Fields
  const [title, setTitle] = useState<string>("ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ సీన్ (Office Late Entry)");
  const [rawText, setRawText] = useState<string>(
    "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!\nసురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!\nరవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?"
  );

  const sampleDialogues = [
    {
      title: "హాస్య సంభాషణ (Office Comedy)",
      genre: "comedy",
      tone: "conversational",
      text: "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!\nసురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!\nరవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?",
    },
    {
      title: "ఎమోషనల్ సెంటిమెంట్ (Mother's Love)",
      genre: "emotional",
      tone: "heartfelt",
      text: "కొడుకు: అమ్మా! నీకు ఫోన్ చేయడం మర్చిపోయాను, ఆఫీస్ లో చాలా పని.\nతల్లి: పర్వాలేదురా నాయనా... నువ్వు తిన్నావా లేదా అని ఒక్కటే నా చింత. నీ ఆకలి నా కడుపుకి తెలుస్తుంది రా.",
    },
    {
      title: "మాస్ డైలాగ్ (Mass Motivational)",
      genre: "motivational",
      tone: "intense",
      text: "ఓటమి అనేది ముగింపు కాదురా... గెలుపుకి మొదటి మెట్టు! సమాజం నిన్ను చూసి నవ్వినప్పుడే, నీ విజయంతో వాళ్ళ నోళ్ళు మూయించాలి!",
    },
  ];

  // Transliteration helper
  const handleApplyTransliteration = () => {
    if (!phoneticInput) return;
    const teluguConverted = TeluguTransliterationService.transliterate(phoneticInput);
    setRawText((prev) => (prev ? prev + "\n" + teluguConverted : teluguConverted));
    setPhoneticInput("");
  };

  // Dialect adapter
  const handleDialectChange = (dialect: TeluguDialect) => {
    setSelectedDialect(dialect);
    const adapted = TeluguTransliterationService.adaptToDialect(rawText, dialect);
    setRawText(adapted);
  };

  // Creative Debate trigger
  const handleTriggerDebate = async () => {
    setIsDebating(true);
    try {
      const res = await fetch("/api/agents/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept: title,
          rawDialogue: rawText,
        }),
      });
      const data = await res.json();
      if (data.debate) {
        setDebateMessages(data.debate.messages || []);
        setDebateConsensus(data.debate.finalVerdict || "");
        setIsDebateModalOpen(true);
      }
    } catch (err) {
      console.error("Debate error:", err);
    } finally {
      setIsDebating(false);
    }
  };

  const handleLaunchProduction = async () => {
    setIsSubmitting(true);
    try {
      const projectId = "proj_" + Math.random().toString(36).substring(2, 9);
      await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          brief: {
            projectId,
            title,
            rawInput: rawText,
            inputMode,
            aspectRatio,
            genre,
            emotionalTone,
            durationTargetSeconds: parseInt(durationTarget, 10),
            enableBgm,
            enableSubtitles: enableTeluguSubtitles,
            voiceRegister,
          },
        }),
      });
      router.push("/studio/workspace");
    } catch (err) {
      console.error("Failed to launch production:", err);
      router.push("/studio/workspace");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <PageHeader
        title="Create New Video"
        description="Provide a raw Telugu dialogue, voice note, or creative idea. 16 specialized AI agents collaborate autonomously to generate script, storyboard, character visuals, voice, and edited video."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTriggerDebate}
              disabled={isDebating}
              className="gap-1.5 text-xs text-primary border-primary/30"
            >
              <Zap className="h-3.5 w-3.5" />
              <span>{isDebating ? "Agents Debating..." : "Launch Agent Debate"}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTitle("");
                setRawText("");
              }}
              className="gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Main Input & Directorial Controls */}
        <div className="space-y-6 lg:col-span-2">
          {/* Step 1: Input Mode */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                    1
                  </span>
                  <span>Input Dialogue or Voice Note</span>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-2xs font-mono">
                    Telugu &bull; te-IN
                  </Badge>
                  <Badge variant="brand" className="text-2xs">
                    Multi-Agent Ready
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Enter your original dialogue in Telugu or English transliteration, upload an audio recording, or provide a high-level plot.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-1">
              <Tabs
                defaultValue="dialogue"
                value={inputMode}
                onValueChange={(val) => setInputMode(val as "dialogue" | "voice" | "concept")}
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="dialogue" className="gap-1.5">
                    <Clapperboard className="h-3.5 w-3.5" />
                    <span>Telugu Dialogue</span>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="gap-1.5">
                    <Mic className="h-3.5 w-3.5" />
                    <span>Voice Recording</span>
                  </TabsTrigger>
                  <TabsTrigger value="concept" className="gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Idea / Prompt</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dialogue" className="space-y-3 mt-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Project Title (English &amp; Telugu)
                    </label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ కథ"
                      className="text-xs"
                    />
                  </div>

                  {/* Transliteration Helper Bar */}
                  <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-semibold text-foreground flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        English to Telugu Transliteration Helper
                      </span>
                      <span className="text-2xs text-muted-foreground">Type phonetically (e.g. namaskaram bagunnara)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        value={phoneticInput}
                        onChange={(e) => setPhoneticInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyTransliteration()}
                        placeholder="Type English letters here and click Convert..."
                        className="text-xs bg-card"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="primary"
                        onClick={handleApplyTransliteration}
                        className="text-2xs shrink-0 h-9"
                      >
                        Convert &amp; Add
                      </Button>
                    </div>
                  </div>

                  {/* Regional Dialect Selector */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground">
                        Regional Telugu Dialect &amp; Cadence
                      </label>
                      <span className="text-2xs text-primary font-medium">Auto-adapts idioms</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TELUGU_DIALECTS.map((d) => (
                        <button
                          key={d.dialect}
                          type="button"
                          onClick={() => handleDialectChange(d.dialect)}
                          className={`p-2.5 rounded-lg border text-left transition-colors text-xs ${selectedDialect === d.dialect
                              ? "border-primary bg-primary/10 text-primary font-bold"
                              : "border-border bg-card hover:border-primary/40 text-foreground"
                            }`}
                        >
                          <p className="font-semibold truncate">{d.name.split(" ")[0]}</p>
                          <p className="text-2xs text-muted-foreground truncate">{d.name.split("(")[1]?.replace(")", "")}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Telugu Dialogue &amp; Script Lines
                    </label>
                    <Textarea
                      rows={6}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      placeholder="పాత్రల డైలాగులు ఇక్కడ టైప్ చేయండి..."
                      className="font-mono text-xs leading-relaxed"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Or Try Telugu Demo Presets:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {sampleDialogues.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTitle(sample.title);
                            setGenre(sample.genre);
                            setEmotionalTone(sample.tone);
                            setRawText(sample.text);
                          }}
                          className="px-2.5 py-1 rounded-md text-2xs font-medium bg-muted/60 hover:bg-primary/20 hover:text-primary transition-colors border border-border"
                        >
                          {sample.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="space-y-4 mt-3">
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                      <Mic className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Record or Upload Telugu Voice Recording
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                      Upload WAV, MP3, or M4A audio. Agent 07 (Telugu Voice Director) will transcribe, isolate stems, normalize noise, and extract emotion timings.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Button variant="primary" size="sm" className="gap-1.5">
                        <Mic className="h-4 w-4" />
                        <span>Start Recording</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        <Upload className="h-4 w-4" />
                        <span>Upload File</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="concept" className="space-y-3 mt-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1">
                      Video Concept / High-Level Premise
                    </label>
                    <Textarea
                      rows={5}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      placeholder="ఉదాహరణ: ఇద్దరు స్నేహితులు మొదటిసారి హైదరాబాద్ మెట్రో ఎక్కినప్పుడు జరిగిన వింతలు, ఫన్నీ పరిస్థితులు..."
                      className="text-xs leading-relaxed"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 2: Target Platform & Visual Format */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                  2
                </span>
                <span>Target Platform &amp; Aspect Ratio</span>
              </CardTitle>
              <CardDescription>
                Choose where this video will be published. Rendering presets, safe margins, and subtitles are customized for the target format.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => {
                    setPlatform("shorts");
                    setAspectRatio("9:16");
                    setDurationTarget("45");
                  }}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${platform === "shorts"
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border bg-card hover:border-primary/30"
                    }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Tv className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">YouTube Shorts</span>
                  <span className="text-2xs text-muted-foreground mt-0.5">
                    9:16 Vertical &bull; Up to 60s
                  </span>
                  <Badge variant="brand" className="mt-2 text-[10px]">
                    Optimized
                  </Badge>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPlatform("reels");
                    setAspectRatio("9:16");
                    setDurationTarget("60");
                  }}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${platform === "reels"
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border bg-card hover:border-primary/30"
                    }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Camera className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">Instagram Reels</span>
                  <span className="text-2xs text-muted-foreground mt-0.5">
                    9:16 Vertical &bull; Up to 90s
                  </span>
                  <Badge variant="outline" className="mt-2 text-[10px]">
                    Supported
                  </Badge>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPlatform("longform");
                    setAspectRatio("16:9");
                    setDurationTarget("180");
                  }}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${platform === "longform"
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border bg-card hover:border-primary/30"
                    }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary mb-2">
                    <Video className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-bold text-foreground">YouTube Long-Form</span>
                  <span className="text-2xs text-muted-foreground mt-0.5">
                    16:9 Cinematic &bull; Multi-scene
                  </span>
                  <Badge variant="secondary" className="mt-2 text-[10px]">
                    4K Master
                  </Badge>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Genre &amp; Content Category
                  </label>
                  <Select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    options={[
                      { label: "హాస్యం (Comedy & Satire)", value: "comedy" },
                      { label: "ఎమోషనల్ సెంటిమెంట్ (Emotional & Family)", value: "emotional" },
                      { label: "మాస్ & స్పూర్తిదాయకం (Mass Motivational)", value: "motivational" },
                      { label: "భక్తి ప్రవచనం (Devotional & Spiritual)", value: "devotional" },
                      { label: "సస్పెన్స్ & థ్రిల్లింగ్ (Suspense & Drama)", value: "suspense" },
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">
                    Target Runtime (Seconds)
                  </label>
                  <Select
                    value={durationTarget}
                    onChange={(e) => setDurationTarget(e.target.value)}
                    options={[
                      { label: "30 Seconds (Fast Hook Short)", value: "30" },
                      { label: "45 Seconds (Optimal Shorts Retention)", value: "45" },
                      { label: "60 Seconds (Full 1-Minute Story)", value: "60" },
                      { label: "90 Seconds (Instagram Reel Deep Story)", value: "90" },
                      { label: "3 Minutes (YouTube Episode)", value: "180" },
                    ]}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Execution Plan & Agent Panel */}
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-card sticky top-24">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <span>Agent Orchestrator Plan</span>
                </CardTitle>
                <Badge variant="brand" className="text-[10px]">
                  16 Agents Active
                </Badge>
              </div>
              <CardDescription>
                Participating AI agents and automated verification gates.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              {/* Agent Chain List */}
              <div className="space-y-2 border-b border-border pb-3">
                {[
                  { id: "01", name: "Master Orchestrator", role: "Plans workflow & dependencies" },
                  { id: "02", name: "Creative Director", role: "Analyzes hook & scene structure" },
                  { id: "03", name: "Telugu Script Writer", role: "Polishes grammar & dialogue timing" },
                  { id: "04", name: "Film Director", role: "Generates storyboard & shot prompts" },
                  { id: "06", name: "Gemini Video Agent", role: "Generates cinematic visual clips" },
                  { id: "07", name: "Telugu Voice Director", role: "Synthesizes emotional speech" },
                  { id: "10", name: "Video Editor", role: "FFmpeg render & Telugu subtitles" },
                  { id: "11", name: "Thumbnail Designer", role: "Creates 3 Telugu thumbnail variants" },
                  { id: "14", name: "Quality Control", role: "Automated QC gate verification" },
                ].map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-primary font-bold">
                        A{agent.id}
                      </span>
                      <span className="font-semibold text-foreground">{agent.name}</span>
                    </div>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                ))}
              </div>

              {/* Estimation Metrics */}
              <div className="space-y-2 bg-muted/50 rounded-xl p-3 border border-border/80">
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Est. Production Time:</span>
                  </span>
                  <span className="font-mono font-bold text-foreground">~2m 30s</span>
                </div>
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Coins className="h-3 w-3" />
                    <span>Est. Compute / API Cost:</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-500">~$0.18 USD</span>
                </div>
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    <span>Creator Approval Gate:</span>
                  </span>
                  <span className="font-bold text-primary">Required before publish</span>
                </div>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-2xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Safety Guarantee:</strong> Nothing is published automatically without your explicit approval. You can review the rendered video, test subtitles, and regenerate individual scenes.
              </div>
            </CardContent>

            <CardFooter className="pt-0 flex flex-col gap-2">
              <Button
                variant="primary"
                className="w-full gap-2 font-bold shadow-card py-2.5 h-11"
                onClick={handleLaunchProduction}
                disabled={isSubmitting || !rawText}
              >
                <Sparkles className="h-4 w-4" />
                <span>{isSubmitting ? "Starting Orchestration..." : "Start AI Production"}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Multi-Agent Creative Debate Dialog */}
      <Dialog open={isDebateModalOpen} onOpenChange={setIsDebateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Multi-Agent Creative Debate &amp; Consensus
            </DialogTitle>
            <DialogDescription>
              Agents collaborate and challenge each other to craft the optimal Telugu hook and cinematography.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            {debateMessages.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded-xl border border-border bg-card space-y-1.5 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{m.senderName}</span>
                    <span className="text-2xs text-muted-foreground">({m.senderRole})</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{m.timestamp}</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed">{m.content}</p>
                {m.teluguContent && (
                  <div className="p-2 rounded-md bg-primary/5 border border-primary/20 text-xs text-primary font-medium">
                    &ldquo;{m.teluguContent}&rdquo;
                  </div>
                )}
              </div>
            ))}

            {debateConsensus && (
              <div className="p-3.5 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/10 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Final Multi-Agent Consensus (Score: 98/100)</span>
                </div>
                <p className="text-xs text-emerald-200">{debateConsensus}</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDebateModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setIsDebateModalOpen(false);
                handleLaunchProduction();
              }}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Apply Consensus &amp; Produce
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
