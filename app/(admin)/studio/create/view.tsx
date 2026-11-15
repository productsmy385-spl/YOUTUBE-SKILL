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
import { Input } from "@/components/ui/input";
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
  FileVideo,
  Film,
  Globe,
  Image as ImageIcon,
  Mic,
  Music,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Trash2,
  Tv,
  Upload,
  UploadCloud,
  Video,
  Volume2,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useState, useRef } from "react";
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

export interface UploadedCreativeAsset {
  id: string;
  fileName: string;
  fileSizeBytes: number;
  sizeFormatted: string;
  assetType: "video" | "image" | "audio_voice";
  assetRole:
    | "raw_cut_video"
    | "reference_image"
    | "character_likeness"
    | "location_background"
    | "b_roll_footage"
    | "style_guide"
    | "voice_recording";
  previewUrl: string;
  label: string;
  aiPromptDirective: string;
  targetSceneOrder?: number;
}

export function CreateVideoView() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Clean form fields (No seeded or fake default data)
  const [title, setTitle] = useState<string>("");
  const [rawText, setRawText] = useState<string>("");

  // Uploaded Raw Cuts & Reference Images State
  const [uploadedAssets, setUploadedAssets] = useState<UploadedCreativeAsset[]>([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Agent Debate State
  const [isDebating, setIsDebating] = useState<boolean>(false);
  const [isDebateModalOpen, setIsDebateModalOpen] = useState<boolean>(false);
  const [debateMessages, setDebateMessages] = useState<DebateMessage[]>([]);
  const [debateConsensus, setDebateConsensus] = useState<string>("");

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Handle files selection
  const handleFilesSelected = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploadingFiles(true);

    const newAssets: UploadedCreativeAsset[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const mime = file.type;
      let assetType: "video" | "image" | "audio_voice" = "image";
      let assetRole: UploadedCreativeAsset["assetRole"] = "reference_image";

      if (mime.startsWith("video/")) {
        assetType = "video";
        assetRole = "raw_cut_video";
      } else if (mime.startsWith("audio/")) {
        assetType = "audio_voice";
        assetRole = "voice_recording";
      } else if (mime.startsWith("image/")) {
        assetType = "image";
        assetRole = "character_likeness";
      }

      // Try uploading to server endpoint
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("role", assetRole);
        formData.append("label", file.name);

        const res = await fetch("/api/media/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          if (data.asset) {
            newAssets.push({
              id: data.asset.id,
              fileName: file.name,
              fileSizeBytes: file.size,
              sizeFormatted: formatBytes(file.size),
              assetType,
              assetRole,
              previewUrl: URL.createObjectURL(file),
              label: file.name.replace(/\.[^/.]+$/, ""),
              aiPromptDirective:
                assetRole === "character_likeness"
                  ? "Anchor facial likeness and visual features for Agent 05 (Character Designer)."
                  : assetRole === "raw_cut_video"
                  ? "Incorporate as authentic B-roll footage or scene timing anchor."
                  : "Style reference for aesthetic grading.",
            });
            continue;
          }
        }
      } catch (err) {
        console.warn("Server upload fallback to local preview", err);
      }

      // Local preview fallback
      newAssets.push({
        id: "ast_" + Math.random().toString(36).substring(2, 9),
        fileName: file.name,
        fileSizeBytes: file.size,
        sizeFormatted: formatBytes(file.size),
        assetType,
        assetRole,
        previewUrl: URL.createObjectURL(file),
        label: file.name.replace(/\.[^/.]+$/, ""),
        aiPromptDirective:
          assetRole === "character_likeness"
            ? "Anchor facial likeness for Agent 05 (Character Designer)."
            : assetRole === "raw_cut_video"
            ? "Incorporate as B-roll or visual timing anchor."
            : "Reference style for lighting and aesthetics.",
      });
    }

    setUploadedAssets((prev) => [...prev, ...newAssets]);
    setIsUploadingFiles(false);
  };

  const handleRemoveAsset = (id: string) => {
    setUploadedAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdateAssetRole = (id: string, role: UploadedCreativeAsset["assetRole"]) => {
    setUploadedAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, assetRole: role } : a))
    );
  };

  const handleUpdateAssetDirective = (id: string, directive: string) => {
    setUploadedAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, aiPromptDirective: directive } : a))
    );
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

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
    if (rawText) {
      const adapted = TeluguTransliterationService.adaptToDialect(rawText, dialect);
      setRawText(adapted);
    }
  };

  // Creative Debate trigger
  const handleTriggerDebate = async () => {
    if (!title && !rawText && uploadedAssets.length === 0) {
      return;
    }
    setIsDebating(true);
    try {
      const res = await fetch("/api/agents/debate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept: title || "New Creative Production",
          rawDialogue: rawText,
          uploadedAssetsCount: uploadedAssets.length,
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
      const projectId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "00000000-0000-0000-0000-" + Date.now().toString(16).padStart(12, "0");
      const res = await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start",
          brief: {
            projectId,
            title: title.trim() || "Untitled Video Project",
            rawInput: rawText.trim(),
            inputMode,
            aspectRatio,
            genre,
            emotionalTone,
            durationTargetSeconds: parseInt(durationTarget, 10),
            enableBgm,
            enableSubtitles: enableTeluguSubtitles,
            voiceRegister,
            uploadedAssets: uploadedAssets.map((a) => ({
              id: a.id,
              fileName: a.fileName,
              assetType: a.assetType,
              assetRole: a.assetRole,
              aiPromptDirective: a.aiPromptDirective,
            })),
          },
        }),
      });
      const data = await res.json();
      const targetId = data.projectId || projectId;
      router.push(`/studio/workspace?projectId=${targetId}`);
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
        description="Provide a Telugu dialogue, upload raw video cuts & reference images, or record voice. 16 specialized AI agents collaborate autonomously to produce your video."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTriggerDebate}
              disabled={isDebating || (!title && !rawText && uploadedAssets.length === 0)}
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
                setUploadedAssets([]);
              }}
              className="gap-1.5"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Main Input, Media Uploads & Directorial Controls */}
        <div className="space-y-6 lg:col-span-2">
          {/* Step 1: Input Mode (Dialogue, Voice, Concept) */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                    1
                  </span>
                  <span>Dialogue, Voice &amp; Creative Concept</span>
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
                Enter your original dialogue in Telugu or phonetic transliteration, upload a voice recording, or describe the story idea.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-1">
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
                    <span>Idea / Premise</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="dialogue" className="space-y-3 mt-3">
                  {/* Transliteration Helper Bar */}
                  <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xs font-semibold text-foreground flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        English to Telugu Transliteration Helper
                      </span>
                      <span className="text-2xs text-muted-foreground">Type phonetically (e.g. namaskaram andi)</span>
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
                          className={`p-2.5 rounded-lg border text-left transition-colors text-xs ${
                            selectedDialect === d.dialect
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
                      placeholder="పాత్రల డైలాగులు ఇక్కడ టైప్ చేయండి (ఉదా: రాము: నమస్కారం మాస్టారు! ఈరోజు ఏం పాఠం చెప్తారు?)..."
                      className="font-mono text-xs leading-relaxed"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="voice" className="space-y-4 mt-3">
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                      <Mic className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Record or Upload Telugu Voice Audio
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                      Upload WAV, MP3, or M4A audio. Agent 07 (Telugu Voice Director) will transcribe, isolate stems, and extract emotion timings.
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <Button variant="primary" size="sm" className="gap-1.5">
                        <Mic className="h-4 w-4" />
                        <span>Start Recording</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="gap-1.5"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Upload Audio File</span>
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
                      placeholder="మీ కథా సారాంశం ఇక్కడ వివరించండి (ఉదాహరణ: గ్రామంలో సంక్రాంతి పండుగ వేళ తాతయ్య మరియు మనవడి మధ్య జరిగే ఆత్మీయ సంభాషణ)..."
                      className="text-xs leading-relaxed"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 2: Upload Raw Cuts & Reference Images (NEW FEATURE) */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                    2
                  </span>
                  <span>Upload Raw Cut Footage &amp; Reference Images</span>
                </CardTitle>
                <Badge variant="outline" className="text-2xs font-mono">
                  {uploadedAssets.length} Assets Attached
                </Badge>
              </div>
              <CardDescription>
                Attach raw video takes, b-roll footage, character face references, and location photos. Agent 04 (Film Director) and Agent 05 (Character Designer) use these assets to anchor generation.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-primary bg-primary/10 scale-[1.01]"
                    : "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/40"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="video/mp4,video/quicktime,video/webm,image/png,image/jpeg,image/webp,audio/wav,audio/mpeg"
                  className="hidden"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                />

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  {isUploadingFiles ? (
                    <RefreshCw className="h-6 w-6 animate-spin" />
                  ) : (
                    <UploadCloud className="h-6 w-6" />
                  )}
                </div>

                <h4 className="text-sm font-bold text-foreground">
                  {isUploadingFiles ? "Processing Uploads..." : "Click to Upload or Drag & Drop Raw Cuts & Images"}
                </h4>
                <p className="text-2xs text-muted-foreground mt-1 max-w-md">
                  Supports MP4, MOV, WEBM (Raw video takes &amp; B-Roll) &bull; PNG, JPG, WEBP (Face likeness, location plates, style mood boards)
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    Raw Cuts (Video)
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    Face Likeness (Images)
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    Location Plates
                  </Badge>
                </div>
              </div>

              {/* Uploaded Assets List */}
              {uploadedAssets.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-semibold text-foreground block">
                    Attached Project Media Assets ({uploadedAssets.length}):
                  </span>

                  <div className="grid grid-cols-1 gap-3">
                    {uploadedAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="rounded-xl border border-border p-3 bg-muted/30 hover:bg-muted/40 transition-colors space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            {asset.assetType === "video" ? (
                              <div className="w-14 h-14 rounded-lg bg-black flex items-center justify-center text-primary shrink-0 relative overflow-hidden border border-border">
                                <FileVideo className="w-6 h-6" />
                                <span className="absolute bottom-1 right-1 text-[8px] bg-primary/80 text-primary-foreground px-1 rounded font-mono">
                                  VIDEO
                                </span>
                              </div>
                            ) : (
                              <img
                                src={asset.previewUrl}
                                alt={asset.fileName}
                                className="w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                              />
                            )}

                            <div className="min-w-0">
                              <p className="text-xs font-bold text-foreground truncate">{asset.fileName}</p>
                              <div className="flex items-center gap-2 mt-0.5 text-2xs text-muted-foreground">
                                <span className="font-mono">{asset.sizeFormatted}</span>
                                <span>&bull;</span>
                                <Badge variant="outline" className="text-[9px] uppercase font-mono">
                                  {asset.assetType}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveAsset(asset.id)}
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        {/* Role Selector & AI Directive */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-border/60">
                          <div className="sm:col-span-5">
                            <label className="text-2xs font-semibold text-muted-foreground block mb-1">
                              Asset Role in AI Pipeline
                            </label>
                            <Select
                              value={asset.assetRole}
                              onChange={(e) =>
                                handleUpdateAssetRole(asset.id, e.target.value as UploadedCreativeAsset["assetRole"])
                              }
                              options={[
                                { label: "Raw Cut (Include in Video Edit)", value: "raw_cut_video" },
                                { label: "Character Face Likeness (Agent 05)", value: "character_likeness" },
                                { label: "Location Background Reference", value: "location_background" },
                                { label: "B-Roll Footage (Cutaway Take)", value: "b_roll_footage" },
                                { label: "Style & Lighting Reference (Veo)", value: "style_guide" },
                                { label: "Voice / Audio Scratch Track", value: "voice_recording" },
                              ]}
                            />
                          </div>

                          <div className="sm:col-span-7">
                            <label className="text-2xs font-semibold text-muted-foreground block mb-1">
                              AI Directorial Instructions
                            </label>
                            <Input
                              value={asset.aiPromptDirective}
                              onChange={(e) => handleUpdateAssetDirective(asset.id, e.target.value)}
                              placeholder="e.g. Use this face likeness for lead protagonist..."
                              className="text-xs h-9 bg-card"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Target Platform & Visual Format */}
          <Card className="border-border bg-card shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary font-mono">
                  3
                </span>
                <span>Target Platform &amp; Aspect Ratio</span>
              </CardTitle>
              <CardDescription>
                Rendering presets, safe zones, and subtitle placements are automatically tuned for the selected destination.
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
                  { id: "04", name: "Film Director", role: "Integrates raw cuts & shot prompts" },
                  { id: "05", name: "Character Designer", role: "Anchors face likeness references" },
                  { id: "06", name: "Gemini Video Agent", role: "Generates cinematic visual clips" },
                  { id: "07", name: "Telugu Voice Director", role: "Synthesizes emotional speech" },
                  { id: "10", name: "Video Editor", role: "FFmpeg render & Telugu subtitles" },
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
                  <span className="font-mono font-bold text-foreground">$0.24 USD</span>
                </div>
                <div className="flex items-center justify-between text-2xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    <span>Attached User Assets:</span>
                  </span>
                  <span className="font-mono font-bold text-primary">{uploadedAssets.length} files</span>
                </div>
              </div>

              {/* Switches */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">Background Music (BGM)</span>
                    <span className="text-2xs text-muted-foreground block">
                      Auto-ducked score tailored to scene emotion
                    </span>
                  </div>
                  <Checkbox
                    checked={enableBgm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnableBgm(e.target.checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-foreground block">Telugu Subtitles Burn-in</span>
                    <span className="text-2xs text-muted-foreground block">
                      High-contrast stylized Unicode Telugu text
                    </span>
                  </div>
                  <Checkbox
                    checked={enableTeluguSubtitles}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEnableTeluguSubtitles(e.target.checked)}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-2 border-t border-border">
              <Button
                variant="brand"
                size="lg"
                className="w-full gap-2 font-bold shadow-card py-6 text-sm"
                onClick={handleLaunchProduction}
                disabled={isSubmitting || (!title && !rawText && uploadedAssets.length === 0)}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Orchestrating 16 Agents...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Start AI Video Production</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Modal: Multi-Agent Creative Debate */}
      <Dialog open={isDebateModalOpen} onOpenChange={setIsDebateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Multi-Agent Creative Debate &amp; Consensus</span>
            </DialogTitle>
            <DialogDescription>
              Watch Agents 02, 03, 04, 07, and 14 debate timing, shot composition, dialect register, and QC constraints.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-3 p-1">
            {debateMessages.map((msg) => (
              <div
                key={msg.id}
                className="rounded-xl border border-border p-3.5 bg-muted/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-2xs font-semibold text-primary">
                      {msg.senderName}
                    </Badge>
                    <span className="text-2xs text-muted-foreground">{msg.senderRole}</span>
                  </div>
                  <span className="text-2xs text-muted-foreground font-mono">{msg.timestamp}</span>
                </div>
                <p className="text-xs text-foreground font-sans leading-relaxed">{msg.content}</p>
                {msg.teluguContent && (
                  <p className="text-xs text-primary font-sans italic pt-1 border-t border-border/50">
                    &quot;{msg.teluguContent}&quot;
                  </p>
                )}
              </div>
            ))}

            {debateConsensus && (
              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 space-y-1 mt-4">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Production Consensus Finalized
                </span>
                <p className="text-xs text-foreground font-sans leading-relaxed">{debateConsensus}</p>
              </div>
            )}
          </div>

          <DialogFooter className="pt-3 border-t border-border">
            <Button variant="outline" size="sm" onClick={() => setIsDebateModalOpen(false)}>
              Close Debate
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsDebateModalOpen(false);
                handleLaunchProduction();
              }}
              className="gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Accept Consensus &amp; Produce</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
