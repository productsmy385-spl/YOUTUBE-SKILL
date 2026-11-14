import type { Metadata } from "next";
import { PublishingQueueView } from "./view";

export const metadata: Metadata = {
  title: "Publishing Queue & Scheduler",
  description: "Cross-platform video publishing pipeline across YouTube and Instagram.",
};

export default function PublishingQueuePage() {
  return <PublishingQueueView />;
}

