"use client";

import { filaments } from "@/data/products";
import { cn } from "@/lib/utils";

export function ColorDots({
  colors,
  active,
  onSelect,
  size = "md",
  className,
}: {
  colors: string[];
  active: string;
  onSelect: (key: string) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {colors.map((key) => {
        const f = filaments[key];
        if (!f) return null;
        const isActive = key === active;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            aria-label={f.name}
            aria-pressed={isActive}
            title={f.name}
            // The visible dot stays small; padding grows the touch target to
            // ~44px without changing the layout (negative margin absorbs it).
            className="tactile -m-2 grid place-items-center p-2"
          >
            <span
              className={cn(
                "block rounded-full border-2 border-ink ring-offset-2 ring-offset-surface transition-[box-shadow]",
                size === "sm" ? "size-5" : "size-6",
                isActive && "ring-2 ring-ink",
              )}
              style={{
                background: f.silk
                  ? `linear-gradient(135deg, ${f.hex}, #ffffff 42%, ${f.hex})`
                  : f.hex,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
