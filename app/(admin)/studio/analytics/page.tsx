import type { Metadata } from "next";
import { StudioAnalyticsView } from "./view";

export const metadata: Metadata = {
  title: "Channel & Studio Analytics",
  description: "Cross-platform audience insights, revenue telemetry, and retention analysis.",
};

export default function AnalyticsPage() {
  return <StudioAnalyticsView />;
}

