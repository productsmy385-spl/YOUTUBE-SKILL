import type { Metadata } from "next";
import { WorkflowAutomationsView } from "./view";

export const metadata: Metadata = {
  title: "Workflow Automations & Triggers",
  description: "Autonomous background automations, scheduled routines, and event-driven publishing triggers.",
};

export default function AutomationsPage() {
  return <WorkflowAutomationsView />;
}

