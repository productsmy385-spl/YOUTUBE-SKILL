import type { Metadata } from "next";
import { TimelineEditorView } from "./view";

export const metadata: Metadata = {
  title: "Timeline Video Editor",
  description:
    "Multi-track visual video timeline editor with FFmpeg background render integration.",
};

export default function EditorPage() {
  return <TimelineEditorView />;
}

