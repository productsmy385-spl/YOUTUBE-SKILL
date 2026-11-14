import type { Metadata } from "next";
import { SettingsStudioView } from "./view";

export const metadata: Metadata = {
  title: "General Studio Settings",
  description: "Global production preferences, Telugu language defaults, and workflow thresholds.",
};

export default function SettingsPage() {
  return <SettingsStudioView />;
}

