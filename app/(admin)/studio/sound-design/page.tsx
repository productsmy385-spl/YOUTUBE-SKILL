import type { Metadata } from "next";
import { SoundDesignStudioView } from "./view";

export const metadata: Metadata = {
  title: "Sound Design Studio",
  description:
    "Add foley sound effects, comedic transition sounds, and environmental ambience with Agent 09.",
};

export default function SoundDesignStudioPage() {
  return <SoundDesignStudioView />;
}

