import type { Metadata } from "next";
import { IntegrationsStudioView } from "./view";

export const metadata: Metadata = {
  title: "Integrations & Diagnostics",
  description: "Live connectivity status, latency telemetry, and health diagnostics across external APIs and services.",
};

export default function IntegrationsPage() {
  return <IntegrationsStudioView />;
}

