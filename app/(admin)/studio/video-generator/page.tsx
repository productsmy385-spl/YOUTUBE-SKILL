import type { Metadata } from "next";
import { VideoGeneratorView } from "./view";

export const metadata: Metadata = {
  title: "Gemini Video Generator",
  description:
    "Manage asynchronous Gemini Video generation jobs, track GPU latency, and regenerate scenes with Agent 06.",
};

export default function VideoGeneratorPage() {
  return <VideoGeneratorView />;
}

