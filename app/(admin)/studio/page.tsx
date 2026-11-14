import type { Metadata } from "next";
import { StudioOverviewView } from "./view";

export const metadata: Metadata = {
  title: "Studio Overview",
  description:
    "Sir's AI YouTube Agentic Studio - Multi-agent Telugu video production and operations control center.",
};

export default function StudioOverviewPage() {
  return <StudioOverviewView />;
}

