import type { Metadata } from "next";
import { ThumbnailStudioView } from "./view";

export const metadata: Metadata = {
  title: "Thumbnail Studio",
  description:
    "Design high-contrast YouTube thumbnails with expressive character expressions and Telugu typography.",
};

export default function ThumbnailStudioPage() {
  return <ThumbnailStudioView />;
}

