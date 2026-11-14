import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoMarkProps {
  className?: string;
  showWordmark?: boolean;
}

export function LogoMark({ className, showWordmark = true }: LogoMarkProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Both icons ship in the HTML; the theme class decides which one shows */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <Image
          src="/brand/datadropx-icon-color.png"
          alt=""
          width={36}
          height={33}
          priority
          className="h-auto w-9 dark:hidden"
        />
        <Image
          src="/brand/datadropx-icon-white.png"
          alt=""
          width={36}
          height={33}
          priority
          className="hidden h-auto w-9 dark:block"
        />
      </span>
      {showWordmark && (
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-sans text-[15px] font-black tracking-tight text-foreground">
              SIR&apos;S <span className="text-primary">STUDIO</span>
            </span>
            <span className="rounded bg-primary/10 px-1 py-0.2 text-[9px] font-bold uppercase tracking-wider text-primary">
              AI
            </span>
          </div>
          <p className="mt-0.5 truncate text-2xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            YouTube Agentic Engine
          </p>
        </div>
      )}
    </div>
  );
}
