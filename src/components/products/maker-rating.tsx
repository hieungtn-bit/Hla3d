import { cn } from "@/lib/utils";

const LABELS = ["Easy print", "Simple", "Takes care", "Tricky", "Hardest"] as const;

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
              "h-2.5 w-1.5 rounded-[2px]",
              i <= value ? "bg-flame" : tone === "dark" ? "bg-white/15" : "bg-ink/12",
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
