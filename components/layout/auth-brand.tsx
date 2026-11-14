import { LogoMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AuthBrand({ className }: { className?: string }) {
  return (
    <Link
      href="/studio"
      aria-label="Sir's AI YouTube Agentic Studio"
      className={cn("inline-flex", className)}
    >
      <LogoMark />
    </Link>
  );
}
