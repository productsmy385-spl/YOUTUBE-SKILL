import type { Metadata } from "next";
import { MediaLibraryView } from "./view";

export const metadata: Metadata = {
  title: "Media Library",
  description:
    "Private object storage media library for video clips, voice stems, background scores, and thumbnails.",
};

export default function MediaLibraryPage() {
  return <MediaLibraryView />;
}

