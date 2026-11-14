import type { Metadata } from "next";
import { ContentCalendarView } from "./view";

export const metadata: Metadata = {
  title: "Content Calendar & Slotting",
  description: "Visual publishing calendar with Asia/Kolkata peak hour optimization.",
};

export default function ContentCalendarPage() {
  return <ContentCalendarView />;
}

