import type { Metadata } from "next";
import { UsersStudioView } from "./view";

export const metadata: Metadata = {
  title: "Team & User Management",
  description: "Manage studio collaborators, assign production roles, and enforce security policies.",
};

export default function UsersPage() {
  return <UsersStudioView />;
}

