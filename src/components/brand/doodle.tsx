import { cn } from "@/lib/utils";

export type DoodleKind =
  | "star"
  | "sparkle"
  | "squiggle"
  | "zigzag"
  | "spiral"
  | "burst"
  | "arrow"
  | "cloud"
  | "heart"
  | "bolt"
  | "smile"
  | "gear";

/**
 * Hand-drawn cartoon motifs, scattered in the margins the way a kid decorates
 * the edge of a school exercise book. Every one is a single stroke path with
 * round caps so it reads as pen, not vector clip-art.
 */
export function Doodle({
  kind,
  className,
  color = "currentColor",
  strokeWidth = 3,
}: {
  kind: DoodleKind;
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  const stroke = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 48 48" className={cn("size-8", className)} aria-hidden>
      {kind === "star" && (
        <path d="M24 6 L28.5 18.5 L41 20.5 L32 29.5 L34.5 42 L24 36 L13.5 42 L16 29.5 L7 20.5 L19.5 18.5 Z" {...stroke} />
      )}
      {kind === "sparkle" && (
        <>
          <path d="M24 8 C25 18 30 23 40 24 C30 25 25 30 24 40 C23 30 18 25 8 24 C18 23 23 18 24 8 Z" {...stroke} />
        </>
      )}
      {kind === "squiggle" && <path d="M5 30 Q13 14 21 30 T37 30 T45 24" {...stroke} />}
      {kind === "zigzag" && <path d="M5 32 L14 16 L23 32 L32 16 L41 32" {...stroke} />}
      {kind === "spiral" && (
        <path d="M24 24 m0 0 a4 4 0 1 1 -4 4 a9 9 0 1 0 9 -9 a14 14 0 1 0 -14 14" {...stroke} />
      )}
      {kind === "burst" && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="24" y1="10" x2="24" y2="2" transform={`rotate(${a} 24 24)`} {...stroke} />
          ))}
          <circle cx="24" cy="24" r="8" {...stroke} />
        </>
      )}
      {kind === "arrow" && (
        <>
          <path d="M6 34 C14 14 30 10 42 16" {...stroke} />
          <path d="M34 10 L42 16 L34 23" {...stroke} />
        </>
      )}
      {kind === "cloud" && (
        <path d="M13 34 A8 8 0 0 1 14 18 A11 11 0 0 1 35 19 A8 8 0 0 1 35 34 Z" {...stroke} />
      )}
      {kind === "heart" && (
        <path d="M24 39 C6 27 8 14 17 12 C21 11 24 14 24 17 C24 14 27 11 31 12 C40 14 42 27 24 39 Z" {...stroke} />
      )}
      {kind === "bolt" && <path d="M27 5 L13 26 L22 26 L19 43 L35 21 L26 21 Z" {...stroke} />}
      {kind === "smile" && (
        <>
          <circle cx="24" cy="24" r="17" {...stroke} />
          <path d="M16 28 Q24 35 32 28" {...stroke} />
          <circle cx="18" cy="19" r="1.6" fill={color} stroke="none" />
          <circle cx="30" cy="19" r="1.6" fill={color} stroke="none" />
        </>
      )}
      {kind === "gear" && (
        <>
          <circle cx="24" cy="24" r="8" {...stroke} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <line key={a} x1="24" y1="14" x2="24" y2="7" transform={`rotate(${a} 24 24)`} {...stroke} />
          ))}
        </>
      )}
    </svg>
  );
}

/**
 * A scattered field of doodles for section backgrounds. Positions are fixed
 * rather than random so the layout stays identical between server and client.
 */
export function DoodleField({
  items,
  className,
}: {
  items: Array<{
    kind: DoodleKind;
    className: string;
    color?: string;
    tilt?: string;
    animate?: "wiggle" | "bob" | "twinkle" | "none";
  }>;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {items.map((item, i) => (
        <span
          key={i}
          className={cn(
            "absolute",
            item.className,
            item.animate === "wiggle" && "animate-[wiggle_2.4s_ease-in-out_infinite]",
            item.animate === "bob" && "animate-[bob_3.2s_ease-in-out_infinite]",
            item.animate === "twinkle" && "animate-[twinkle_2s_ease-in-out_infinite]",
          )}
          style={{
            ["--tilt" as string]: item.tilt ?? "0deg",
            transform: item.animate ? undefined : `rotate(${item.tilt ?? "0deg"})`,
            animationDelay: `${(i % 5) * 0.4}s`,
          }}
        >
          <Doodle kind={item.kind} color={item.color} className="size-full" />
        </span>
      ))}
    </div>
  );
}
