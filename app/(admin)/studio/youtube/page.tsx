import type { Metadata } from "next";
import { YouTubeStudioView } from "./view";

export const metadata: Metadata = {
  title: "YouTube Operations & Publishing",
  description: "Channel operations, automated video upload, metadata optimization, and quota tracking.",
};

export default function YouTubePage() {
  return <YouTubeStudioView />;
}

