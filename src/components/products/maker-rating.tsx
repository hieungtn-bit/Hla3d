import { cn } from "@/lib/utils";

const LABELS = ["Dễ in", "Đơn giản", "Phải cẩn thận", "Khó", "Khó nhất"] as const;

/**
 * Not a review score — this is how hard the print is for the makers.
 * It is one of the few honest things a 3D print shop can put on a card.
 */
export function MakerRating({
  value,
  tone = "light",
  showLabel = true,
  className,
}: {
  value: number;
  tone?: "light" | "dark";
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)} title={`Maker difficulty ${value}/5`}>
      <div className="flex items-center gap-[3px]" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={cn(
              "h-3 w-2 rounded-[3px] border border-ink/70",
              i <= value ? "bg-flame" : tone === "dark" ? "border-white/20 bg-white/10" : "bg-surface",
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn("eyebrow", tone === "dark" ? "text-white/45" : "text-ink-3")}>
          {LABELS[Math.max(0, Math.min(4, value - 1))]}
        </span>
      )}
      <span className="sr-only">Maker difficulty {value} out of 5</span>
    </div>
  );
}
