import type { Metadata } from "next";
import { AuditLogsStudioView } from "./view";

export const metadata: Metadata = {
  title: "Audit Logs & Security Trail",
  description: "Immutable audit log of all agent executions, publishing events, and system mutations.",
};

export default function AuditLogsPage() {
  return <AuditLogsStudioView />;
}

