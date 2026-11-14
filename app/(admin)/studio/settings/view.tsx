"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Settings,
  Globe,
  Sliders,
  CheckCircle2,
  Save,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function SettingsStudioView() {
  const [studioName, setStudioName] = React.useState("Sir's AI YouTube Agentic Studio");
  const [defaultLang, setDefaultLang] = React.useState("te");
  const [defaultAspect, setDefaultAspect] = React.useState("9:16");
  const [defaultModel, setDefaultModel] = React.useState("gemini-2.5-pro");
  const [requireApproval, setRequireApproval] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="General Studio Settings"
        description="Configure project defaults, Telugu language regional models, and automated approval rules."
      >
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Preferences
          </Button>
        </div>
      </PageHeader>

      {saved && (
        <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-3 text-xs text-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Studio settings updated and synchronized across all agent memory contexts.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Localization & Region
            </CardTitle>
            <CardDescription>Primary target audience settings and dialect enforcement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Studio Brand Name
              </label>
              <Input
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Primary Production Language
              </label>
              <Select
                value={defaultLang}
                onChange={(e) => setDefaultLang(e.target.value)}
                options={[
                  { label: "Telugu (తెలుగు) - Standard Colloquial", value: "te" },
                  { label: "Telugu (Godavari Dialect)", value: "te-godavari" },
                  { label: "Telugu (Telangana Colloquial)", value: "te-tg" },
                  { label: "Telugu (Rayalaseema Dialect)", value: "te-rs" },
                ]}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Studio Primary Timezone
              </label>
              <Input
                value="Asia/Kolkata (IST +05:30)"
                disabled
                className="text-xs bg-muted/30"
              />
              <span className="text-2xs text-muted-foreground mt-1 block">
                All video publishing slots and analytics curves are calculated in Indian Standard Time.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              AI Production Defaults
            </CardTitle>
            <CardDescription>Default aspect ratios, reasoning models, and quality controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Default Video Format
              </label>
              <Select
                value={defaultAspect}
                onChange={(e) => setDefaultAspect(e.target.value)}
                options={[
                  { label: "9:16 Vertical (Shorts & Reels, 1080x1920)", value: "9:16" },
                  { label: "16:9 Cinematic Widescreen (YouTube Long, 3840x2160 4K)", value: "16:9" },
                ]}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground block mb-1">
                Default Master Reasoning Model
              </label>
              <Select
                value={defaultModel}
                onChange={(e) => setDefaultModel(e.target.value)}
                options={[
                  { label: "gemini-2.5-pro (High Creative Reasoning)", value: "gemini-2.5-pro" },
                  { label: "gemini-2.5-flash (Low Latency / High Volume)", value: "gemini-2.5-flash" },
                ]}
              />
            </div>

            <div className="pt-2 border-t border-border">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={requireApproval}
                  onCheckedChange={(checked) => setRequireApproval(!!checked)}
                />
                <span className="text-xs font-medium text-foreground">
                  Require Creator manual approval before publishing (Recommended)
                </span>
              </label>
              <span className="text-2xs text-muted-foreground ml-6 block mt-0.5">
                When unchecked, videos that achieve 100% QC score publish automatically into their scheduled slot.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

