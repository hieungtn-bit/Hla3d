import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("eyebrow block text-ink-2", className)} {...props} />;
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-14 w-full rounded-2xl border-2 border-ink bg-surface px-4 font-display text-lg font-bold text-ink",
        "placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-ink-3",
        "transition-colors focus:border-flame focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-2xl border border-line bg-surface px-4 pr-10 font-sans text-sm font-medium text-ink",
          "transition-colors focus:border-flame focus:outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 text-ink-3"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </div>
  );
}
