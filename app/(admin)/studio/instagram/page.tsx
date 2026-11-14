import type { Metadata } from "next";
import { InstagramStudioView } from "./view";

export const metadata: Metadata = {
  title: "Instagram Operations & Reels Studio",
  description: "Meta Graph API Reels publishing, viral Telugu hashtag generator, and performance tracking.",
};

export default function InstagramPage() {
  return <InstagramStudioView />;
}

