"use client";

import * as React from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { chartColors, axisTick, tooltipProps } from "@/lib/chart-theme";
import {
  TrendingUp,
  Eye,
  DollarSign,
  Clock,
  Users,
  Tv,
  Camera,
  ArrowUpRight,
  Sparkles,
  Download,
} from "lucide-react";

const viewershipData = [
  { day: "Jan 1", views: 42000, watchHours: 1200 },
  { day: "Jan 3", views: 58000, watchHours: 1650 },
  { day: "Jan 6", views: 72000, watchHours: 2100 },
  { day: "Jan 9", views: 95000, watchHours: 2850 },
  { day: "Jan 12", views: 142000, watchHours: 4200 },
  { day: "Jan 14", views: 238000, watchHours: 7100 },
  { day: "Jan 16", views: 185000, watchHours: 5400 },
  { day: "Jan 18", views: 164000, watchHours: 4900 },
  { day: "Jan 20", views: 210000, watchHours: 6300 },
];

const genrePerformance = [
  { genre: "Village Nostalgia", views: 1480000, revenue: 1940 },
  { genre: "Crime Mystery", views: 980000, revenue: 1320 },
  { genre: "Emotional Drama", views: 820000, revenue: 980 },
  { genre: "Devotional / Sacred", views: 570000, revenue: 680 },
];

export function StudioAnalyticsView() {
  const [dateRange, setDateRange] = React.useState("Last 30 Days");

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Channel & Studio Analytics"
        description="Comprehensive viewership velocity, watch hours, revenue growth, and audience retention metrics."
      >
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-border text-foreground font-medium px-3 py-1">
            Data synced 10 mins ago
          </Badge>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Monthly Views</span>
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">1.84M</p>
          <div className="flex items-center gap-1 text-2xs text-emerald-500 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+34.2% vs previous period</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Estimated Studio Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-foreground">$4,920</p>
          <div className="flex items-center gap-1 text-2xs text-emerald-500 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>₹4,12,000 INR (RPM: $2.67)</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Watch Time Hours</span>
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">38.4K hrs</p>
          <div className="flex items-center gap-1 text-2xs text-emerald-500 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Avg retention: 86.2% on Shorts</span>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between text-muted-foreground mb-1">
            <span className="text-xs font-medium">Net Subscribers Gained</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">+6,840</p>
          <div className="flex items-center gap-1 text-2xs text-emerald-500 font-semibold mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Conversion rate: 3.7%</span>
          </div>
        </Card>
      </div>

      {/* Main Viewership Velocity Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Viewership & Watch Time Velocity
            </CardTitle>
            <CardDescription>Daily aggregated views and watch hours across all live videos</CardDescription>
          </div>
          <Badge variant="brand">Sankranti Spike Detected</Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewershipData}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={axisTick} stroke="var(--border)" />
                <YAxis tick={axisTick} stroke="var(--border)" />
                <Tooltip {...tooltipProps} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke={chartColors.primary}
                  fillOpacity={1}
                  fill="url(#viewGrad)"
                  strokeWidth={2}
                  name="Views"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid: Genre Breakdown & Platform Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Telugu Genre Viewership Distribution</CardTitle>
            <CardDescription>Cumulative views generated by creative category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={genrePerformance} layout="vertical">
                  <XAxis type="number" tick={axisTick} stroke="var(--border)" />
                  <YAxis dataKey="genre" type="category" tick={axisTick} stroke="var(--border)" width={120} />
                  <Tooltip {...tooltipProps} />
                  <Bar dataKey="views" fill={chartColors.primary} radius={[0, 4, 4, 0]} name="Total Views" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Distribution & RPM</CardTitle>
            <CardDescription>Traffic share and revenue yields across distribution channels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3.5 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">YouTube Shorts</p>
                  <p className="text-2xs text-muted-foreground">68% of Total Views • 1.25M views</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-foreground">$1,840</p>
                <span className="text-2xs text-muted-foreground">RPM: $1.47</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-600/10 flex items-center justify-center text-red-600">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">YouTube Long-Form</p>
                  <p className="text-2xs text-muted-foreground">22% of Total Views • 405K views</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-foreground">$2,420</p>
                <span className="text-2xs text-emerald-500 font-semibold">RPM: $5.98</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Instagram Reels</p>
                  <p className="text-2xs text-muted-foreground">10% of Total Views • 185K plays</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-foreground">$660</p>
                <span className="text-2xs text-muted-foreground">Brand Deals</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

