import type { Metadata } from "next";
import { SecurityStudioView } from "./view";

export const metadata: Metadata = {
  title: "Security & Emergency Kill Switch",
  description: "Global emergency circuit breaker, autonomous agent lockdown, and studio safety controls.",
};

export default function SecurityPage() {
  return <SecurityStudioView />;
}

