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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Headphones,
  Mic,
  Pause,
  Play,
  RefreshCw,
  Sliders,
  Sparkles,
  Volume2,
  Languages,
  BookOpen,
  Waves,
  Plus,
  Trash2,
  VolumeX,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface VoiceLine {
  id: number;
  speaker: string;
  telugu: string;
  emotion: string;
  duration: string;
  speed: number;
  lufs: string;
}

interface PronunciationRule {
  id: string;
  word: string;
  phonetic: string;
  notes: string;
}

export function VoiceStudioView() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [selectedDialect, setSelectedDialect] = useState<string>("godavari");

  // TTS Playground State
  const [ttsText, setTtsText] = useState<string>("గోదావరి గట్టున కూర్చుని చూస్తే పల్లెటూరి అందాలు ఎంత ముచ్చటగా ఉంటాయో!");
  const [ttsVoice, setTtsVoice] = useState<string>("ravi_youth");
  const [ttsEmotion, setTtsEmotion] = useState<string>("emotional_nostalgic");
  const [ttsSpeed, setTtsSpeed] = useState<number>(1.0);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [playgroundAudioReady, setPlaygroundAudioReady] = useState<boolean>(true);
  const [isPlayingPlayground, setIsPlayingPlayground] = useState<boolean>(false);

  // Pronunciation rules state
  const [rules, setRules] = useState<PronunciationRule[]>([
    { id: "1", word: "ట్రాఫిక్", phonetic: "traffic", notes: "English loanword loan phoneme" },
    { id: "2", word: "ఆఫీస్", phonetic: "office", notes: "Standard tech workplace term" },
    { id: "3", word: "క్యూబికల్", phonetic: "cubicle", notes: "IT workplace noun" },
    { id: "4", word: "సైబరాబాద్", phonetic: "cyber-a-baad", notes: "Proper geographic noun" },
    { id: "5", word: "సంక్రాంతి", phonetic: "san-kraan-thi", notes: "Traditional festival phonetic" },
  ]);
  const [newWord, setNewWord] = useState("");
  const [newPhonetic, setNewPhonetic] = useState("");

  const [voiceLines, setVoiceLines] = useState<VoiceLine[]>([
    {
      id: 1,
      speaker: "రవి (Ravi - Male Youth)",
      telugu: "రవి: అరె సురేష్! బాస్ ఇంకా రాలేదా? అబ్బా దేవుడా బ్రతికించావు!",
      emotion: "ఆందోళన & ఆత్రుత (Anxious Rush)",
      duration: "4.2s",
      speed: 1.05,
      lufs: "-14.0 LUFS",
    },
    {
      id: 2,
      speaker: "సురేష్ (Suresh - Male Sarcastic)",
      telugu: "సురేష్: వెనక్కి తిరిగి చూడు రా బాబు... బాస్ నీ వెనకాలే నిలబడి 10 నిమిషాల నుంచి వింటున్నారు!",
      emotion: "వ్యంగ్యం & గుసగుస (Sarcastic Whisper)",
      duration: "5.1s",
      speed: 0.98,
      lufs: "-14.2 LUFS",
    },
    {
      id: 3,
      speaker: "రవి (Ravi - Male Shock)",
      telugu: "రవి: (షాక్ అయ్యి నవ్వుతూ) నమస్తే సార్! మీరు ఎప్పుడు వచ్చారు? ట్రాఫిక్ బాగుందా?",
      emotion: "షాక్ నుండి నవ్వు (Shock to Awkward Respect)",
      duration: "5.8s",
      speed: 1.0,
      lufs: "-13.8 LUFS",
    },
    {
      id: 4,
      speaker: "రామారావు (Manager - Deep Bass)",
      telugu: "బాస్: ట్రాఫిక్ బాగుంది రవి... రేపటినుంచి నీకు రోజూ లీవ్ కావాలా?",
      emotion: "గంభీరమైన వ్యంగ్యం (Deadpan Sarcasm)",
      duration: "4.6s",
      speed: 0.92,
      lufs: "-14.0 LUFS",
    },
  ]);

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  const handleAddRule = () => {
    if (newWord.trim() && newPhonetic.trim()) {
      setRules((prev) => [
        ...prev,
        { id: String(Date.now()), word: newWord.trim(), phonetic: newPhonetic.trim(), notes: "Custom rule" },
      ]);
      setNewWord("");
      setNewPhonetic("");
    }
  };

  const handleDeleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSynthesizePlayground = async () => {
    setIsSynthesizing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSynthesizing(false);
    setPlaygroundAudioReady(true);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Telugu Voice Studio (Agent 07)"
        description="Neural Telugu speech synthesis with regional dialect nuance, emotional prosody tags, automated -14 LUFS loudness normalization, and audio ducking."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/studio/music">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Volume2 className="h-4 w-4" />
                <span>Music Studio</span>
              </Button>
            </Link>
            <Link href="/studio/editor">
              <Button variant="brand" size="sm" className="gap-1.5 font-bold shadow-card">
                <span>Timeline Video Editor</span>
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Dialect Selector & Audio Engine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                Regional Telugu Dialect Adaptation
              </CardTitle>
              <Badge variant="brand">Native Phonetics</Badge>
            </div>
            <CardDescription>
              Select regional linguistic cadence and idiom structure for authentic character speech.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  id: "godavari",
                  name: "గోదావరి యాస",
                  english: "Godavari Dialect",
                  desc: "Warm, respectful, melodic vowel extensions (అండీ, ఏవండీ).",
                },
                {
                  id: "telangana",
                  name: "తెలంగాణ యాస",
                  english: "Telangana Dialect",
                  desc: "Crisp, fast, rhythmic colloquial punch (గిట్ల, మస్తు).",
                },
                {
                  id: "rayalaseema",
                  name: "రాయలసీమ యాస",
                  english: "Rayalaseema Dialect",
                  desc: "Grave, dramatic, intense chest resonance (నాయనా, యాడికి).",
                },
                {
                  id: "standard",
                  name: "ప్రామాణిక ఆంధ్ర",
                  english: "Standard Coastal",
                  desc: "Clear news and cinematic broadcast Telugu.",
                },
              ].map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDialect(d.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedDialect === d.id
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <p className="font-bold text-xs text-foreground">{d.name}</p>
                  <p className="text-2xs text-muted-foreground">{d.english}</p>
                  <p className="text-2xs text-muted-foreground/80 mt-1 leading-normal">{d.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Audio Engine Specs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span>Audio Engine Parameters</span>
              <Badge variant="outline" className="text-2xs font-mono">
                Active
              </Badge>
            </CardTitle>
            <CardDescription>Target broadcast loudness standards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Sample Rate</span>
              <span className="font-semibold text-foreground font-mono">48,000 Hz (24-bit)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Target Dialogue LUFS</span>
              <span className="font-semibold text-emerald-500 font-mono">-14.0 LUFS (&plusmn;0.5)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-border">
              <span className="text-muted-foreground">Sidechain BGM Ducking</span>
              <span className="font-semibold text-primary font-mono">-18 dB Attenuation</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-muted-foreground">Attack / Release Time</span>
              <span className="font-semibold text-foreground font-mono">15ms / 250ms</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs: Stems | Live TTS Playground | Pronunciation Dictionary | Ducking Visualizer */}
      <Tabs defaultValue="stems" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full h-auto p-1 bg-muted/80 gap-1">
          <TabsTrigger value="stems" className="gap-2 py-2.5">
            <Mic className="w-4 h-4" />
            <span>Active Project Stems</span>
          </TabsTrigger>
          <TabsTrigger value="playground" className="gap-2 py-2.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Live Telugu TTS Lab</span>
          </TabsTrigger>
          <TabsTrigger value="ducking" className="gap-2 py-2.5">
            <Waves className="w-4 h-4 text-emerald-500" />
            <span>Sidechain Ducking Wave</span>
          </TabsTrigger>
          <TabsTrigger value="pronunciation" className="gap-2 py-2.5">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span>Pronunciation Dictionary</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Active Project Stems */}
        <TabsContent value="stems" className="mt-6 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base">Synthesized Dialogue Stems</CardTitle>
                <CardDescription>
                  Isolated voice stems ready for ducking and synchronization with video cuts.
                </CardDescription>
              </div>
              <Badge variant="success" className="text-2xs">
                All 4 Stems Synchronized
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {voiceLines.map((line) => (
                <div key={line.id} className="rounded-xl border border-border p-4 bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-2xs font-bold text-primary">STEM 0{line.id}</span>
                      <span className="text-xs font-bold text-foreground">{line.speaker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-2xs font-mono">{line.lufs}</Badge>
                      <span className="font-mono text-2xs text-muted-foreground">{line.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-foreground font-sans leading-relaxed">
                    {line.telugu}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/60">
                    <div className="flex items-center gap-3 text-2xs text-muted-foreground">
                      <span>Emotion: <strong className="text-foreground">{line.emotion}</strong></span>
                      <span>&bull;</span>
                      <span>Speed: <strong className="font-mono text-foreground">{line.speed}x</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant={playingId === line.id ? "destructive" : "default"}
                        size="sm"
                        className="h-8 gap-1.5 text-xs font-semibold"
                        onClick={() => togglePlay(line.id)}
                      >
                        {playingId === line.id ? (
                          <>
                            <Pause className="h-3.5 w-3.5" />
                            <span>Playing Stem...</span>
                          </>
                        ) : (
                          <>
                            <Play className="h-3.5 w-3.5" />
                            <span>Preview Stem ({line.duration})</span>
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        <RefreshCw className="h-3 w-3" />
                        <span>Re-synthesize</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Live Telugu TTS Lab */}
        <TabsContent value="playground" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Live Telugu Neural TTS Synthesizer
              </CardTitle>
              <CardDescription>
                Test custom Telugu phrases, adjust emotional delivery, speed, and preview real-time speech synthesis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Enter Telugu Script / Dialogue
                </label>
                <Textarea
                  rows={3}
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  placeholder="ఇక్కడ మీ తెలుగు డైలాగ్ నమోదు చేయండి..."
                  className="font-sans text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Voice Persona</label>
                  <Select
                    value={ttsVoice}
                    onChange={(e) => setTtsVoice(e.target.value)}
                    options={[
                      { label: "రవి (Ravi - Young Male, Energetic)", value: "ravi_youth" },
                      { label: "సితార (Sitara - Young Female, Expressive)", value: "sitara_female" },
                      { label: "రామారావు (Rama Rao - Deep Bass, Mature)", value: "ramarao_bass" },
                      { label: "శ్రీదేవి (Sridevi - Warm Mother Emotion)", value: "sridevi_mother" },
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Emotional Delivery Tag</label>
                  <Select
                    value={ttsEmotion}
                    onChange={(e) => setTtsEmotion(e.target.value)}
                    options={[
                      { label: "ఆత్మీయత & జ్ఞాపకం (Emotional / Nostalgic)", value: "emotional_nostalgic" },
                      { label: "కామెడీ & జోవియల్ (Playful / Comedic)", value: "comedic_playful" },
                      { label: "తీవ్రమైన కోపం (Intense / Angry)", value: "intense_anger" },
                      { label: "గుసగుస & రహస్యం (Whisper / Suspense)", value: "whisper_suspense" },
                      { label: "ఆవేశపూరిత స్పీచ్ (Motivational / Inspiring)", value: "motivational" },
                    ]}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground block mb-1">Speech Speed ({ttsSpeed}x)</label>
                  <input
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.05"
                    value={ttsSpeed}
                    onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
                    className="w-full accent-primary mt-2"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-border">
                <div className="flex items-center gap-3">
                  {playgroundAudioReady && (
                    <Button
                      variant={isPlayingPlayground ? "destructive" : "brand"}
                      size="sm"
                      onClick={() => setIsPlayingPlayground(!isPlayingPlayground)}
                      className="gap-2"
                    >
                      {isPlayingPlayground ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPlayingPlayground ? "Pause Audio" : "Play Synthesized Telugu"}</span>
                    </Button>
                  )}
                  <span className="text-2xs text-muted-foreground font-mono">
                    Format: 48kHz WAV &bull; Duration: ~3.8s &bull; -14.0 LUFS
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSynthesizePlayground}
                  disabled={isSynthesizing}
                  className="gap-1.5"
                >
                  {isSynthesizing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isSynthesizing ? "Synthesizing..." : "Synthesize Voice"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Sidechain Ducking Waveform */}
        <TabsContent value="ducking" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Waves className="w-5 h-5 text-emerald-500" />
                Intelligent Sidechain Audio Ducking Envelope
              </CardTitle>
              <CardDescription>
                Background music volume is automatically depressed by -18dB whenever Telugu speech dialog is active.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-xl bg-black border border-border space-y-4">
                {/* Speech Waveform Simulation */}
                <div className="space-y-1">
                  <div className="flex justify-between text-2xs text-muted-foreground">
                    <span className="text-primary font-bold">TRACK 1: TELUGU SPEECH STEM</span>
                    <span className="font-mono text-foreground">-14 LUFS ACTIVE</span>
                  </div>
                  <div className="h-12 w-full bg-zinc-950 rounded-lg flex items-center justify-around px-2 border border-zinc-800">
                    {[12, 35, 60, 80, 95, 75, 45, 10, 5, 50, 85, 90, 70, 40, 15, 65, 80, 30, 8, 4].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-primary rounded-full transition-all duration-300"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Ducked Music Waveform Simulation */}
                <div className="space-y-1">
                  <div className="flex justify-between text-2xs text-muted-foreground">
                    <span className="text-emerald-400 font-bold">TRACK 2: BACKGROUND MUSIC (DUCKED TO -32dB)</span>
                    <span className="font-mono text-emerald-400">-18dB ATTENUATION</span>
                  </div>
                  <div className="h-12 w-full bg-zinc-950 rounded-lg flex items-center justify-around px-2 border border-zinc-800">
                    {[60, 50, 15, 12, 10, 14, 18, 55, 60, 15, 12, 10, 14, 20, 55, 14, 12, 50, 60, 65].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-emerald-500/70 rounded-full transition-all duration-300"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg border border-border bg-muted/30">
                  <p className="font-bold text-foreground">Smooth Ducking Curve</p>
                  <p className="text-2xs text-muted-foreground mt-0.5">
                    15ms attack prevents harsh volume cuts; 250ms release ensures music gently breathes back between dialogue lines.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border bg-muted/30">
                  <p className="font-bold text-foreground">Zero Spectral Clashing</p>
                  <p className="text-2xs text-muted-foreground mt-0.5">
                    EQ notch filter pulls out 1.5kHz - 3.5kHz from music so Telugu vocal consonants cut cleanly through.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border bg-muted/30">
                  <p className="font-bold text-foreground">YouTube Mobile Clarity</p>
                  <p className="text-2xs text-muted-foreground mt-0.5">
                    Ensures dialogue remains 100% intelligible even on cheap smartphone speakers in noisy environments.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Pronunciation Dictionary */}
        <TabsContent value="pronunciation" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Phonetic Pronunciation Dictionary
                  </CardTitle>
                  <CardDescription>
                    Custom word overrides for tech terminology, English loan words, and unique Telugu place names.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Telugu word (e.g. కోడింగ్)"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="w-40 text-xs"
                  />
                  <Input
                    placeholder="Phonetic (e.g. coding)"
                    value={newPhonetic}
                    onChange={(e) => setNewPhonetic(e.target.value)}
                    className="w-36 text-xs"
                  />
                  <Button variant="primary" size="sm" onClick={handleAddRule} className="gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border border border-border rounded-xl overflow-hidden">
                {rules.map((rule) => (
                  <div key={rule.id} className="p-3 bg-card hover:bg-muted/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-6">
                      <span className="font-bold font-sans text-sm text-foreground w-28">{rule.word}</span>
                      <span className="font-mono text-primary font-semibold">&rarr; {rule.phonetic}</span>
                      <span className="text-2xs text-muted-foreground hidden sm:inline">{rule.notes}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
