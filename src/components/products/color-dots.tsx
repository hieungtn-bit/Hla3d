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
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
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
            className={cn(
              "tactile relative rounded-full border-2 border-ink ring-offset-2 ring-offset-surface transition-[box-shadow,transform]",
              size === "sm" ? "size-5" : "size-6",
              isActive && "ring-2 ring-ink",
            )}
            style={{
              background: f.silk
                ? `linear-gradient(135deg, ${f.hex}, #ffffff 42%, ${f.hex})`
                : f.hex,
            }}
          />
        );
      })}
    </div>
  );
}
