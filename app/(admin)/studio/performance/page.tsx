import type { Metadata } from "next";
import { ContentPerformanceView } from "./view";

export const metadata: Metadata = {
  title: "Content Performance & Retention",
  description: "Audience retention curve analysis, A/B thumbnail testing, and Telugu demographic breakdown.",
};

export default function PerformancePage() {
  return <ContentPerformanceView />;
}

