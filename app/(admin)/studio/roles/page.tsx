import type { Metadata } from "next";
import { RolesStudioView } from "./view";

export const metadata: Metadata = {
  title: "Roles & Permissions Matrix",
  description: "Granular RBAC permission enforcement across projects, generation, and publishing.",
};

export default function RolesPage() {
  return <RolesStudioView />;
}

