import type { Metadata } from "next";
import { ScriptStudioView } from "./view";

export const metadata: Metadata = {
  title: "Telugu Script Studio",
  description:
    "Write, review, and polish conversational Telugu scripts with Agent 03 (Telugu Script Writer).",
};

export default function ScriptStudioPage() {
  return <ScriptStudioView />;
}

