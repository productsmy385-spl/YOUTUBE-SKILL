import type { Metadata } from "next";
import { MusicStudioView } from "./view";

export const metadata: Metadata = {
  title: "Music Studio",
  description:
    "Audition licensed background scores, manage audio ducking, and align scene emotions with Agent 08 (Music Director).",
};

export default function MusicStudioPage() {
  return <MusicStudioView />;
}

