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
import { Input, Field } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import {
  CheckCircle2,
  FileCheck2,
  Image as ImageIcon,
  Plus,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface CharacterItem {
  id: string;
  name: string;
  role: string;
  age: string;
  appearance: string;
  clothing: string;
  voice: string;
  scenesCount: number;
  consentVerified: boolean;
  referenceImageUrl?: string;
}

export function CharacterStudioView() {
  const [characters, setCharacters] = useState<CharacterItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form state
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("Lead Protagonist");
  const [age, setAge] = useState<string>("25-30 years");
  const [appearance, setAppearance] = useState<string>("");
  const [clothing, setClothing] = useState<string>("");
  const [voice, setVoice] = useState<string>("Male Natural Conversational (te-IN)");
  const [consentVerified, setConsentVerified] = useState<boolean>(true);
  const [uploadedReferenceUrl, setUploadedReferenceUrl] = useState<string>("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);

  useEffect(() => {
    async function loadCharacters() {
      try {
        const res = await fetch("/api/characters");
        if (res.ok) {
          const data = await res.json();
          if (data.characters && Array.isArray(data.characters)) {
            const mapped = data.characters.map((c: any) => ({
              id: c.id,
              name: c.name,
              role: c.role || "Lead Role",
              age: c.ageRange || c.age || "25-30 years",
              appearance: c.facialFeatures || c.appearance || "Telugu / South Asian facial profile",
              clothing: c.clothingDescription || c.clothing || "Modern formal attire",
              voice: c.voice || "te-IN Natural Voice",
              scenesCount: c.scenesCount || 0,
              consentVerified: c.isConsentVerified ?? true,
              referenceImageUrl: c.referenceImageUrl,
            }));
            setCharacters(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to load characters:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCharacters();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("role", "character_likeness");
      formData.append("label", `${name || "Character"} Face Likeness`);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadedReferenceUrl(data.asset?.previewUrl || URL.createObjectURL(file));
      }
    } catch (err) {
      console.error("Photo upload failed:", err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        name,
        role,
        ageRange: age,
        ethnicityStyle: "Telugu / South Asian",
        facialFeatures: appearance,
        clothingDescription: clothing,
        voice,
        isConsentVerified: consentVerified,
        referenceImageUrl: uploadedReferenceUrl,
      };

      const res = await fetch("/api/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const newChar: CharacterItem = {
        id: data.character?.id || "char-" + Math.random().toString(36).substring(2, 8),
        name,
        role,
        age,
        appearance,
        clothing,
        voice,
        scenesCount: 0,
        consentVerified,
        referenceImageUrl: uploadedReferenceUrl,
      };

      setCharacters([newChar, ...characters]);
      setIsCreateOpen(false);

      // Reset form
      setName("");
      setAppearance("");
      setClothing("");
      setUploadedReferenceUrl("");
    } catch (err) {
      console.error("Failed to create character:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Character Studio &amp; Continuity Bible"
        description="Maintain visual and facial continuity across scenes with Agent 05 (Character Designer). Reusable character profiles lock hair, clothing, body proportions, and expressions."
        actions={
          <Button
            variant="brand"
            size="sm"
            className="gap-1.5 shadow-card"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Create New Character</span>
          </Button>
        }
      />

      {/* Characters Content */}
      {isLoading ? (
        <div className="flex h-48 items-center justify-center rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span>Loading character profiles from Character Bible...</span>
          </div>
        </div>
      ) : characters.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No Characters in Character Bible"
          description="Create character profiles with face references and costume locks to enforce visual and facial continuity across scenes."
          action={{
            label: "Add First Character",
            onClick: () => setIsCreateOpen(true),
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {characters.map((char) => (
            <Card key={char.id} className="border-border bg-card shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xs font-bold text-primary">
                    {char.id.toUpperCase()}
                  </span>
                  <Badge variant={char.consentVerified ? "success" : "warning"} className="text-[10px] gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{char.consentVerified ? "Consent Verified" : "Pending Consent"}</span>
                  </Badge>
                </div>
                <CardTitle className="text-base mt-1">{char.name}</CardTitle>
                <CardDescription>{char.role} &bull; {char.age}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Reference Portrait */}
                <div className="aspect-[4/3] w-full rounded-lg bg-black/90 flex flex-col items-center justify-center p-4 border border-border relative overflow-hidden group">
                  {char.referenceImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={char.referenceImageUrl}
                      alt={char.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <User className="h-12 w-12 text-primary/60 mb-2" />
                      <span className="text-xs font-semibold text-white/90">{char.name}</span>
                      <p className="text-2xs text-white/60 text-center px-4 mt-1">
                        Face &amp; Visual Continuity Locked
                      </p>
                    </>
                  )}
                  <div className="absolute bottom-2 right-2 flex gap-1">
                    <Badge variant="brand" className="text-[9px]">Agent 05 Locked</Badge>
                  </div>
                </div>

                <div className="space-y-2 text-2xs">
                  <div className="rounded-md bg-muted/40 p-2.5 border border-border/60">
                    <strong className="text-foreground">Face &amp; Hair:</strong>
                    <p className="text-muted-foreground mt-0.5">{char.appearance}</p>
                  </div>
                  <div className="rounded-md bg-muted/40 p-2.5 border border-border/60">
                    <strong className="text-foreground">Costume Lock:</strong>
                    <p className="text-muted-foreground mt-0.5">{char.clothing}</p>
                  </div>
                  <div className="rounded-md bg-muted/40 p-2.5 border border-border/60">
                    <strong className="text-foreground">Voice Profile:</strong>
                    <p className="text-muted-foreground mt-0.5">{char.voice}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 flex items-center justify-between border-t border-border pt-3">
                <span className="text-2xs text-muted-foreground">
                  In <strong>{char.scenesCount}</strong> generated scenes
                </span>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  View Profile
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Create Character Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
          <Card className="max-h-[90vh] w-full max-w-xl overflow-y-auto border-border bg-card shadow-modal">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg">Create Character Profile</CardTitle>
                <CardDescription>
                  Define identity, likeness references, and costume locks for Agent 05.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setIsCreateOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <form onSubmit={handleCreateCharacter}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Character Name (Telugu / English) *">
                    <Input
                      placeholder="e.g. రవి (Ravi)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Field>
                  <Field label="Role in Production *">
                    <Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      options={[
                        { value: "Lead Protagonist", label: "Lead Protagonist" },
                        { value: "Supporting Character", label: "Supporting Character" },
                        { value: "Comic Relief", label: "Comic Relief" },
                        { value: "Authority Figure / Boss", label: "Authority Figure / Boss" },
                        { value: "Family Member / Elder", label: "Family Member / Elder" },
                        { value: "Antagonist", label: "Antagonist" },
                      ]}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Age Range">
                    <Input
                      placeholder="e.g. 26 years"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </Field>
                  <Field label="Voice Profile">
                    <Select
                      value={voice}
                      onChange={(e) => setVoice(e.target.value)}
                      options={[
                        { value: "Male Natural Conversational (te-IN)", label: "Male Natural Conversational (te-IN)" },
                        { value: "Female Expressive Conversational (te-IN)", label: "Female Expressive Conversational (te-IN)" },
                        { value: "Male Deep Dramatic Bass (te-IN)", label: "Male Deep Dramatic Bass (te-IN)" },
                        { value: "Female Melodic Soft (te-IN)", label: "Female Melodic Soft (te-IN)" },
                        { value: "Male Comedic High Pitch (te-IN)", label: "Male Comedic High Pitch (te-IN)" },
                      ]}
                    />
                  </Field>
                </div>

                <Field label="Facial Features & Appearance Continuity *">
                  <Textarea
                    placeholder="e.g. South Indian Telugu software engineer, trimmed black beard, expressive comedic eyes, sharp cheekbones."
                    value={appearance}
                    onChange={(e) => setAppearance(e.target.value)}
                    rows={2}
                    required
                  />
                </Field>

                <Field label="Costume & Clothing Lock *">
                  <Textarea
                    placeholder="e.g. Navy blue checked formal shirt, dark trousers, brown leather wristwatch."
                    value={clothing}
                    onChange={(e) => setClothing(e.target.value)}
                    rows={2}
                    required
                  />
                </Field>

                {/* Upload Face Reference Image */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    Upload Face Likeness / Reference Image
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-2.5 text-xs font-medium hover:border-primary/50">
                      <UploadCloud className="h-4 w-4 text-primary" />
                      <span>{isUploadingPhoto ? "Uploading reference..." : "Choose Image (PNG/JPG)"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        disabled={isUploadingPhoto}
                      />
                    </label>
                    {uploadedReferenceUrl && (
                      <span className="flex items-center gap-1 text-2xs text-success">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Reference attached</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Likeness consent verification */}
                <div className="rounded-lg border border-border/80 bg-muted/20 p-3 space-y-1">
                  <Checkbox
                    id="consent-check"
                    checked={consentVerified}
                    onCheckedChange={(checked) => setConsentVerified(Boolean(checked))}
                    label="Likeness & Ethics Consent Verified"
                  />
                  <p className="text-2xs text-muted-foreground pl-6">
                    I confirm I have authorization to use this likeness, or this is a synthetic AI-generated character profile.
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 border-t border-border pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="brand"
                  disabled={isSubmitting || !name.trim()}
                >
                  {isSubmitting ? "Saving to Bible..." : "Save Character"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
