import type { Metadata } from "next";
import { CharacterStudioView } from "./view";

export const metadata: Metadata = {
  title: "Character Studio & Bible",
  description:
    "Maintain character facial consistency, costume continuity, and legal consents with Agent 05.",
};

export default function CharacterStudioPage() {
  return <CharacterStudioView />;
}

