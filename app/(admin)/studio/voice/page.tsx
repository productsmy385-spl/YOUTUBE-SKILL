import type { Metadata } from "next";
import { VoiceStudioView } from "./view";

export const metadata: Metadata = {
  title: "Telugu Voice Studio",
  description:
    "Synthesize and refine emotional Telugu speech with Agent 07 (Telugu Voice Director).",
};

export default function VoiceStudioPage() {
  return <VoiceStudioView />;
}

