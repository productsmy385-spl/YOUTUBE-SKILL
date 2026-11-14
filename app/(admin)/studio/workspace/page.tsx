import type { Metadata } from "next";
import { ProductionWorkspaceView } from "./view";

export const metadata: Metadata = {
  title: "AI Production Workspace",
  description:
    "Live multi-agent collaborative workspace for Telugu video generation, scene storyboarding, voice review, and QC approval.",
};

export default function WorkspacePage() {
  return <ProductionWorkspaceView />;
}

