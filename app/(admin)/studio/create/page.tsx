import type { Metadata } from "next";
import { CreateVideoView } from "./view";

export const metadata: Metadata = {
  title: "Create Telugu Video",
  description:
    "Input your Telugu dialogue, idea, or voice recording to launch the autonomous multi-agent production workflow.",
};

export default function CreateVideoPage() {
  return <CreateVideoView />;
}

