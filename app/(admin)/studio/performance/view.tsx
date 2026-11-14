"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartColors, axisTick, tooltipProps } from "@/lib/chart-theme";
import {
  TrendingUp,
  Percent,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sparkles,
  MapPin,
  Trophy,
  Sliders,
} from "lucide-react";

const retentionCurveData = [
  { second: "0s", retention: 100 },
  { second: "3s", retention: 94 }, // Hook
  { second: "10s", retention: 89 },
  { second: "20s", retention: 84 },
  { second: "30s", retention: 81 },
  { second: "40s", retention: 79 },
  { second: "50s", retention: 76 },
  { second: "58s", retention: 88 }, // Re-watch loop spike
  { second: "60s", retention: 85 },
];

export function ContentPerformanceView() {
  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Content Performance & Retention Deep Dive"
        description="Granular audience retention telemetry, A/B thumbnail experiments, and regional Telugu demographic analysis."
      >
        <div className="flex items-center gap-3">
          <Badge variant="brand">Top 1% Retention Rank</Badge>
          <Button variant="outline" size="sm">
            Select Video
          </Button>
        </div>
      </PageHeader>

      {/* Retention Curve Card */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Audience Retention Curve (60s Shorts Breakdown)
            </CardTitle>
            <CardDescription>
              Analyzing: &quot;సంక్రాంతి జ్ఞాపకాలు - పల్లెటూరి పండుగ కథ&quot; (Sankranti Memories)
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 text-xs pt-2 sm:pt-0">
            <span className="text-muted-foreground">
              3s Hook Retention: <strong className="text-emerald-500">94.2%</strong>
            </span>
            <span className="text-muted-foreground">
              Loop Re-watch Rate: <strong className="text-primary">14.8%</strong>
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionCurveData}>
                <XAxis dataKey="second" tick={axisTick} stroke="var(--border)" />
                <YAxis unit="%" tick={axisTick} stroke="var(--border)" domain={[50, 100]} />
                <Tooltip {...tooltipProps} />
                <Line
                  type="monotone"
                  dataKey="retention"
                  stroke={chartColors.primary}
                  strokeWidth={3}
                  dot={{ fill: chartColors.primary, r: 4 }}
                  name="Retention %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-border text-2xs">
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
              <span className="font-semibold text-foreground block mb-0.5">0s - 3s (The Hook)</span>
              <p className="text-muted-foreground">
                High contrast visual of grandmother calling with Telugu dialogue preserved 94.2% of viewers.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
              <span className="font-semibold text-foreground block mb-0.5">30s - 45s (Story Peak)</span>
              <p className="text-muted-foreground">
                Ducking audio transition to emotional flute score maintained steady retention with minimal drop.
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border">
              <span className="font-semibold text-foreground block mb-0.5">55s - 60s (Loop Bridge)</span>
              <p className="text-muted-foreground">
                Seamless loop audio transition triggered +12% re-watch spike as video cycled smoothly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* A/B Thumbnail Testing Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Live A/B Thumbnail Testing Results
              </CardTitle>
              <CardDescription>
                Automated multi-variant thumbnail test run across first 10,000 YouTube impressions
              </CardDescription>
            </div>
            <Badge variant="brand" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              Statistically Significant (p &lt; 0.01)
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variant A (Winner) */}
            <div className="p-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-500/5 relative space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" className="bg-emerald-500 text-white">
                    Variant A (Winner)
                  </Badge>
                  <span className="text-xs font-semibold text-foreground">Emotional Character Close-up</span>
                </div>
                <Trophy className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80"
                  alt="Variant A"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded bg-card border border-border">
                  <span className="text-2xs text-muted-foreground">CTR</span>
                  <p className="text-sm font-bold text-emerald-500">11.8%</p>
                </div>
                <div className="p-2 rounded bg-card border border-border">
                  <span className="text-2xs text-muted-foreground">Impressions</span>
                  <p className="text-sm font-bold text-foreground">5,140</p>
                </div>
                <div className="p-2 rounded bg-card border border-border">
                  <span className="text-2xs text-muted-foreground">Avg Watch</span>
                  <p className="text-sm font-bold text-foreground">52s</p>
                </div>
              </div>
            </div>

            {/* Variant B */}
            <div className="p-4 rounded-xl border border-border bg-card space-y-3 opacity-80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Variant B</Badge>
                  <span className="text-xs font-semibold text-muted-foreground">Wide Village Panorama</span>
                </div>
                <span className="text-2xs text-muted-foreground">Concluded</span>
              </div>

              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
                  alt="Variant B"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 rounded bg-muted/40 border border-border">
                  <span className="text-2xs text-muted-foreground">CTR</span>
                  <p className="text-sm font-bold text-foreground">7.4%</p>
                </div>
                <div className="p-2 rounded bg-muted/40 border border-border">
                  <span className="text-2xs text-muted-foreground">Impressions</span>
                  <p className="text-sm font-bold text-foreground">4,860</p>
                </div>
                <div className="p-2 rounded bg-muted/40 border border-border">
                  <span className="text-2xs text-muted-foreground">Avg Watch</span>
                  <p className="text-sm font-bold text-foreground">46s</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Telugu Demographics Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Telugu Audience Geographic Distribution
          </CardTitle>
          <CardDescription>Audience localization across Telugu states and international diaspora</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 rounded-xl border border-border bg-muted/20">
              <span className="text-xs font-semibold text-foreground">Telangana</span>
              <p className="text-xl font-bold text-primary mt-1">42.4%</p>
              <p className="text-2xs text-muted-foreground mt-0.5">Top: Hyderabad, Warangal, Karimnagar</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/20">
              <span className="text-xs font-semibold text-foreground">Andhra Pradesh</span>
              <p className="text-xl font-bold text-primary mt-1">41.8%</p>
              <p className="text-2xs text-muted-foreground mt-0.5">Top: Vijayawada, Vizag, East & West Godavari</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/20">
              <span className="text-xs font-semibold text-foreground">USA & Americas</span>
              <p className="text-xl font-bold text-emerald-500 mt-1">11.2%</p>
              <p className="text-2xs text-muted-foreground mt-0.5">Dallas TX, Bay Area CA, Chicago, NJ (Highest RPM)</p>
            </div>
            <div className="p-3 rounded-xl border border-border bg-muted/20">
              <span className="text-xs font-semibold text-foreground">UK, Gulf & Australia</span>
              <p className="text-xl font-bold text-foreground mt-1">4.6%</p>
              <p className="text-2xs text-muted-foreground mt-0.5">Dubai UAE, London UK, Melbourne AU</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

