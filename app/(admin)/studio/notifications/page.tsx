import type { Metadata } from "next";
import { NotificationsStudioView } from "./view";

export const metadata: Metadata = {
  title: "Studio Notifications & Alerts",
  description: "Real-time production alerts, agent completion events, and publishing confirmations.",
};

export default function NotificationsPage() {
  return <NotificationsStudioView />;
}

