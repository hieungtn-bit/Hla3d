import { cn } from "@/lib/utils";

/**
 * The mark: three stacked print layers, growing.
 * Three layers = three brothers = the way a 3D print is actually built.
 */
export function LogoMark({ className, tone = "flame" }: { className?: string; tone?: "flame" | "ink" | "white" }) {
  const bg = tone === "flame" ? "#ff4a17" : tone === "ink" ? "#17171c" : "#ffffff";
  const fg = tone === "white" ? "#17171c" : "#ffffff";
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-9", className)}>
      <rect width="40" height="40" rx="11" fill={bg} />
      <rect x="10" y="25" width="20" height="5" rx="2.5" fill={fg} />
      <rect x="12.5" y="17.5" width="15" height="5" rx="2.5" fill={fg} opacity="0.78" />
      <rect x="15" y="10" width="10" height="5" rx="2.5" fill={fg} opacity="0.5" />
    </svg>
  );
}

export function Wordmark({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <span
      className={cn(
        "font-display text-lg leading-none font-bold tracking-[-0.04em]",
        tone === "white" ? "text-white" : "text-ink",
        className,
      )}
    >
      HLA<span className="text-flame">3D</span>
    </span>
  );
}

export function Logo({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "white";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8" />
      <Wordmark tone={tone} />
    </span>
  );
}
