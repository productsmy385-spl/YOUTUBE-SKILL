import type { Metadata } from "next";
import { ProductionQueueView } from "./view";

export const metadata: Metadata = {
  title: "Production Queue",
  description:
    "Live tracking of background AI video generation, Telugu voice synthesis, and FFmpeg render jobs.",
};

export default function ProductionQueuePage() {
  return <ProductionQueueView />;
}

