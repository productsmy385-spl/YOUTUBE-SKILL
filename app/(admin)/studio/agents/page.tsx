import type { Metadata } from "next";
import { AgentManagementView } from "./view";

export const metadata: Metadata = {
  title: "Agent Management & Orchestration",
  description: "Monitor and configure the 16 specialized AI agents powering Sir's YouTube Studio.",
};

export default function AgentsPage() {
  return <AgentManagementView />;
}

