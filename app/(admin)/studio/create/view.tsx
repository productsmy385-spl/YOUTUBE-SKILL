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
  AlertCircle,
  ArrowRight,
  Bot,
  Camera,
  CheckCircle2,
  Clapperboard,
  Clock,
  Coins,
  Film,
  Headphones,
  Info,
  Mic,
  Music,
  Play,
  RotateCcw,
  Sliders,
  Sparkles,
  Tv,
  Upload,
  UserCheck,
  Video,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  // Form Fields
  const [title, setTitle] = useState<string>("ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ సీన్ (Office Late Entry)");
  const [rawText, setRawText] = useState<string>(
    "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!\nసురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!\nరవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?"
  );

  const sampleDialogues = [
    {
      title: "హాస్య సంభాషణ (Office Comedy)",
      genre: "comedy",
      tone: "humorous",
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

  const handleLaunchProduction = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Route to dedicated workspace with active mock pipeline
      router.push("/studio/workspace");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Create New Video"
        description="Provide a raw Telugu dialogue, voice note, or creative idea. Specialized AI agents collaborate to generate script, storyboard, character visuals, voice, and edited video."
        actions={
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
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Main Input & Directorial Controls */}
        <div className="space-y-6 lg:col-span-2">
          {/* Step 1: Input Mode (Dialogue / Voice Note / Concept) */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                    1
                  </span>
                  <span>Input Dialogue or Voice Note</span>
                </CardTitle>
                <Badge variant="outline" className="text-2xs font-mono">
                  Telugu (తెలుగు) &bull; te-IN
                </Badge>
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
                    <span>Voice Note</span>
                  </TabsTrigger>
                  <TabsTrigger value="concept" className="gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Story Idea</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dialogue" className="space-y-3 mt-3">
                  <Field label="Project Title / Working Hook" hint="Internal title and YouTube draft headline">
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="ఉదాహరణ: ఆఫీస్ లేట్ ఎంట్రీ ఫన్నీ రీల్"
                    />
                  </Field>

                  <Field
                    label="Raw Telugu Dialogue (వచన సంభాషణ)"
                    hint="Write dialogue with speaker names. The Telugu Script Writer agent will preserve the exact meaning, timing, and comedy beats."
                  >
                    <Textarea
                      rows={6}
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                      placeholder="రవి: ...&#10;సురేష్: ..."
                      className="font-mono text-sm leading-relaxed"
                    />
                  </Field>

                  {/* Sample Dialogue Pills */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-2xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Try Sample Dialogue Template:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sampleDialogues.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setTitle(sample.title);
                            setRawText(sample.text);
                            setGenre(sample.genre);
                          }}
                          className="rounded-lg border border-border bg-muted/60 px-2.5 py-1 text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary text-left"
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
                      Upload WAV, MP3, or M4A audio. The Telugu Voice Director will transcribe, isolate stems, normalize noise, and extract emotion timings.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Button variant="default" size="sm" className="gap-1.5">
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
                  <Field label="Video Concept / High-Level Premise">
                    <Textarea
                      rows={5}
                      placeholder="ఉదాహరణ: ఇద్దరు స్నేహితులు మొదటిసారి హైదరాబాద్ మెట్రో ఎక్కినప్పుడు జరిగిన వింతలు, ఫన్నీ పరిస్థితులు..."
                      className="text-sm leading-relaxed"
                    />
                  </Field>
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
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                    platform === "shorts"
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
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                    platform === "reels"
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
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                    platform === "longform"
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
                <Field label="Genre & Content Category">
                  <Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="comedy">హాస్యం (Comedy &amp; Satire)</option>
                    <option value="emotional">ఎమోషనల్ సెంటిమెంట్ (Emotional &amp; Family)</option>
                    <option value="motivational">మాస్ &amp; స్పూర్తిదాయకం (Mass Motivational)</option>
                    <option value="devotional">భక్తి ప్రవచనం (Devotional &amp; Spiritual)</option>
                    <option value="suspense">సస్పెన్స్ &amp; థ్రిల్లింగ్ (Suspense &amp; Drama)</option>
                  </Select>
                </Field>

                <Field label="Target Runtime (Seconds)">
                  <Select
                    value={durationTarget}
                    onChange={(e) => setDurationTarget(e.target.value)}
                  >
                    <option value="30">30 సెకన్లు (Quick Punch Short)</option>
                    <option value="45">45 సెకన్లు (Standard Telugu Short)</option>
                    <option value="60">60 సెకన్లు (Maximum Shorts Length)</option>
                    <option value="120">2 నిమిషాలు (Story Arc)</option>
                    <option value="180">3 నిమిషాలు (Full Scene Episode)</option>
                  </Select>
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Telugu Voice & Audio Direction */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                  3
                </span>
                <span>Telugu Voice &amp; Sound Design</span>
              </CardTitle>
              <CardDescription>
                Dedicated Telugu speech synthesis calibrated for conversational cadence, dramatic pauses, and comedy punchlines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Voice Profile & Character Register">
                  <Select
                    value={voiceRegister}
                    onChange={(e) => setVoiceRegister(e.target.value)}
                  >
                    <option value="male_conversational">పురుష స్వరం - స్వాభావిక సంభాషణ (Male Natural)</option>
                    <option value="female_conversational">స్త్రీ స్వరం - సహజమైన తెలుగు (Female Natural)</option>
                    <option value="male_comedy">కామెడీ పంచ్ ఎక్స్‌ప్రెషన్ (Comedy Punch Voice)</option>
                    <option value="male_dramatic">గంభీరమైన మాస్ వాయిస్ (Deep Cinematic Voice)</option>
                    <option value="motivational">స్పూర్తిదాయక స్వరం (Inspiring Narrator)</option>
                  </Select>
                </Field>

                <Field label="Emotional Expression Tag">
                  <Select
                    value={emotionalTone}
                    onChange={(e) => setEmotionalTone(e.target.value)}
                  >
                    <option value="conversational">స్వాభావికమైన (Natural Conversational)</option>
                    <option value="smiling">నవ్వుతూ చెప్పడం (Smiling / Cheerful)</option>
                    <option value="comedy_timing">కామెడీ టైమింగ్ (Comic Timing)</option>
                    <option value="crying">భావోద్వేగం / కన్నీళ్లు (Emotional / Tears)</option>
                    <option value="anger">కోపం / సీరియస్ (Anger / Intense)</option>
                  </Select>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 border-t border-border">
                <label className="flex items-center gap-3 text-xs text-foreground cursor-pointer">
                  <Checkbox
                    checked={enableTeluguSubtitles}
                    onChange={(e) => setEnableTeluguSubtitles(e.target.checked)}
                  />
                  <span>
                    <strong>Telugu Subtitles:</strong> Burn synced Telugu typography into final video
                  </span>
                </label>

                <label className="flex items-center gap-3 text-xs text-foreground cursor-pointer">
                  <Checkbox
                    checked={enableBgm}
                    onChange={(e) => setEnableBgm(e.target.checked)}
                  />
                  <span>
                    <strong>Audio Ducking:</strong> Automatically lower music volume during dialogue
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Column: Agent Swarm Plan & Cost Controls */}
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-card sticky top-24">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Bot className="h-4 w-4 text-primary" />
                  <span>Execution Plan</span>
                </CardTitle>
                <Badge variant="success" className="text-[10px]">
                  Ready
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
                  { id: "13", name: "Quality Control", role: "Automated QC gate verification" },
                ].map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-primary font-bold">
                        A{agent.id}
                      </span>
                      <span className="font-semibold text-foreground">{agent.name}</span>
                    </div>
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" />
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
                  <span className="font-mono font-bold text-foreground">~$0.18 USD</span>
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

            <CardFooter className="pt-0">
              <Button
                variant="brand"
                className="w-full gap-2 font-bold shadow-card py-2.5 h-11"
                onClick={handleLaunchProduction}
                isLoading={isSubmitting}
              >
                <Sparkles className="h-4 w-4" />
                <span>Start AI Production</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

