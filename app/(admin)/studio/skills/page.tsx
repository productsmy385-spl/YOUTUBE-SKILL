import type { Metadata } from "next";
import { SkillsRegistryView } from "./view";

export const metadata: Metadata = {
  title: "Agent Skills & Tool Registry",
  description: "Explore and test the deterministic tools and capabilities used by the 16 AI agents.",
};

export default function SkillsPage() {
  return <SkillsRegistryView />;
}

