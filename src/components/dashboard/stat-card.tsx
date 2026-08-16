import * as React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  sub,
  delta,
  deltaGood,
  accent,
  className,
}: {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  /** Whether the delta direction is a good thing (fewer failed prints = good). */
  deltaGood?: boolean;
  accent?: string;
  className?: string;
}) {
  const Icon = deltaGood ? TrendingUp : TrendingDown;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-5",
        className,
      )}
    >
      {accent && (
        <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: accent }} />
      )}
      <p className="eyebrow text-white/35">{label}</p>
      <p className="display mt-3 text-2xl text-white sm:text-3xl">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 font-mono text-[0.6875rem]",
              deltaGood ? "text-lime" : "text-white/40",
            )}
          >
            <Icon className="size-3" />
            {delta}
          </span>
        )}
        {sub && <span className="text-xs text-white/35">{sub}</span>}
      </div>
    </div>
  );
}
