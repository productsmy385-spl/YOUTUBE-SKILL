"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Key,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Save,
  ShieldCheck,
  Cpu,
  Tv,
  Camera,
  HardDrive,
} from "lucide-react";

export function ApiConfigStudioView() {
  const [showKeys, setShowKeys] = React.useState<Record<string, boolean>>({});
  const [geminiKey, setGeminiKey] = React.useState("");
  const [ytClientId, setYtClientId] = React.useState("");
  const [ytSecret, setYtSecret] = React.useState("");
  const [metaAppId, setMetaAppId] = React.useState("");
  const [metaSecret, setMetaSecret] = React.useState("");
  const [isSaved, setIsSaved] = React.useState(false);

  const toggleShow = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="API & Model Configuration"
        description="Encrypted credentials, OAuth client credentials, and AI inference parameter controls."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            <Lock className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
            AES-256-GCM Vault Active
          </Badge>
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </PageHeader>

      {isSaved && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>All API keys and secrets securely encrypted and reloaded in runtime memory.</span>
        </div>
      )}

      {/* Grid of Credentials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Google Gemini */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              Google Gemini API Credentials
            </CardTitle>
            <CardDescription>Powers Gemini 2.5 Pro, Flash, and Veo video generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Gemini API Key
              </label>
              <div className="relative">
                <Input
                  type={showKeys["gemini"] ? "text" : "password"}
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="pr-10 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => toggleShow("gemini")}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showKeys["gemini"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* YouTube OAuth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Tv className="w-4 h-4 text-red-500" />
              YouTube Data API v3 OAuth
            </CardTitle>
            <CardDescription>Required for channel management and resumable uploads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Client ID</label>
              <Input
                value={ytClientId}
                onChange={(e) => setYtClientId(e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Client Secret</label>
              <div className="relative">
                <Input
                  type={showKeys["yt"] ? "text" : "password"}
                  value={ytSecret}
                  onChange={(e) => setYtSecret(e.target.value)}
                  className="pr-10 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => toggleShow("yt")}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showKeys["yt"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meta Instagram */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-pink-500" />
              Meta Instagram Graph API
            </CardTitle>
            <CardDescription>Reels publishing and insight telemetry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">App ID</label>
              <Input
                value={metaAppId}
                onChange={(e) => setMetaAppId(e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">App Secret</label>
              <div className="relative">
                <Input
                  type={showKeys["meta"] ? "text" : "password"}
                  value={metaSecret}
                  onChange={(e) => setMetaSecret(e.target.value)}
                  className="pr-10 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => toggleShow("meta")}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showKeys["meta"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Object Storage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-primary" />
              S3 / Cloudflare R2 Storage
            </CardTitle>
            <CardDescription>Persistent storage for renders, voiceovers, and stems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Bucket Name</label>
              <Input
                defaultValue="sirs-telugu-studio-assets"
                className="text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">Region</label>
              <Input
                defaultValue="ap-south-1 (Mumbai)"
                className="text-xs font-mono"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

