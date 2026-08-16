import { cn } from "@/lib/utils";
import type { MakerRole } from "@/data/makers";

const INK = "#2b2118";

/**
 * Cartoon portraits of the three makers.
 *
 * Drawn, never photographed: this is a public shop run by three children, so
 * the site shows characters instead of faces. Each one carries the tool that
 * matches their job, so a five-year-old can tell them apart before reading.
 */
export function MakerAvatar({
  role,
  className,
}: {
  role: MakerRole;
  className?: string;
}) {
  const line = {
    fill: "none",
    stroke: INK,
    strokeWidth: 3.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const palette = {
    inventor: { shirt: "#ff4a17", hair: "#3a2a1c", prop: "#ffc93c" },
    designer: { shirt: "#3fa9f5", hair: "#2b2118", prop: "#b6e64a" },
    tester: { shirt: "#b6e64a", hair: "#4a3524", prop: "#ff7eb0" },
  }[role];

  return (
    <svg viewBox="0 0 160 160" className={cn("size-full", className)} role="img" aria-label={`Cartoon portrait of maker ${role}`}>
      {/* shoulders / shirt */}
      <path d="M34 152 C34 126 52 114 80 114 C108 114 126 126 126 152 Z" fill={palette.shirt} />
      <path d="M34 152 C34 126 52 114 80 114 C108 114 126 126 126 152" {...line} />
      {/* collar */}
      <path d="M66 116 L80 128 L94 116" {...line} />

      {/* neck */}
      <path d="M70 104 L70 118 Q80 124 90 118 L90 104 Z" fill="#f7d6b0" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />

      {/* head */}
      <rect x="40" y="34" width="80" height="76" rx="30" fill="#f7d6b0" stroke={INK} strokeWidth="3.5" />

      {/* ears */}
      <circle cx="39" cy="74" r="7" fill="#f7d6b0" stroke={INK} strokeWidth="3.5" />
      <circle cx="121" cy="74" r="7" fill="#f7d6b0" stroke={INK} strokeWidth="3.5" />

      {/* ---------------- per-character features ---------------- */}
      {role === "inventor" && (
        <>
          {/* spiky hair */}
          <path
            d="M42 50 L48 30 L57 44 L64 24 L74 42 L82 22 L92 42 L101 26 L108 46 L118 36 L118 54 Q80 40 42 54 Z"
            fill={palette.hair}
            stroke={INK}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* goggles pushed up on the forehead */}
          <rect x="48" y="52" width="64" height="16" rx="8" fill="#d9e6ef" stroke={INK} strokeWidth="3.5" />
          <line x1="80" y1="52" x2="80" y2="68" stroke={INK} strokeWidth="3" />
          {/* eyes */}
          <circle cx="66" cy="83" r="6.5" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="94" cy="83" r="6.5" fill="#fff" stroke={INK} strokeWidth="3" />
          <circle cx="67.5" cy="84" r="2.8" fill={INK} />
          <circle cx="95.5" cy="84" r="2.8" fill={INK} />
          {/* open, excited mouth */}
          <path d="M70 96 Q80 108 90 96 Q80 100 70 96 Z" fill={INK} />
          {/* idea bulb */}
          <g>
            <circle cx="130" cy="26" r="13" fill={palette.prop} stroke={INK} strokeWidth="3.5" />
            <path d="M124 37 L136 37" {...line} />
            <path d="M126 42 L134 42" {...line} />
            <path d="M130 18 L130 30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </>
      )}

      {role === "designer" && (
        <>
          {/* neat bowl cut */}
          <path
            d="M38 60 Q38 22 80 22 Q122 22 122 60 Q122 46 108 44 Q80 40 52 44 Q38 46 38 60 Z"
            fill={palette.hair}
            stroke={INK}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* round glasses */}
          <circle cx="66" cy="84" r="13" fill="#eaf4fb" stroke={INK} strokeWidth="3.5" />
          <circle cx="94" cy="84" r="13" fill="#eaf4fb" stroke={INK} strokeWidth="3.5" />
          <line x1="79" y1="84" x2="81" y2="84" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="66" cy="84" r="3.5" fill={INK} />
          <circle cx="94" cy="84" r="3.5" fill={INK} />
          {/* small, focused smile */}
          <path d="M72 100 Q80 106 88 100" {...line} />
          {/* pencil behind the ear */}
          <g transform="rotate(28 128 60)">
            <rect x="122" y="30" width="9" height="34" fill={palette.prop} stroke={INK} strokeWidth="3" />
            <path d="M122 64 L126.5 74 L131 64 Z" fill="#f7d6b0" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
            <rect x="122" y="24" width="9" height="7" fill="#ff7eb0" stroke={INK} strokeWidth="3" />
          </g>
        </>
      )}

      {role === "tester" && (
        <>
          {/* backwards cap */}
          <path
            d="M40 56 Q40 22 80 22 Q120 22 120 56 Z"
            fill={palette.prop}
            stroke={INK}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M40 56 L120 56" {...line} />
          {/* cap strap at the back */}
          <path d="M28 54 Q34 46 40 48 L40 60 Q33 62 28 54 Z" fill={palette.prop} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          {/* fringe peeking out */}
          <path d="M46 56 Q56 64 66 56 Q76 64 86 56 Q96 64 106 56" stroke={palette.hair} strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* squinting happy eyes */}
          <path d="M58 84 Q66 76 74 84" {...line} />
          <path d="M86 84 Q94 76 102 84" {...line} />
          {/* big grin */}
          <path d="M64 94 Q80 112 96 94 Z" fill="#fff" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M64 94 L96 94" stroke={INK} strokeWidth="3" />
          {/* flexi toy in hand */}
          <g>
            {[0, 1, 2, 3].map((i) => (
              <circle
                key={i}
                cx={126 + i * 9}
                cy={34 - Math.sin(i) * 8}
                r={7 - i * 0.9}
                fill="#ff7eb0"
                stroke={INK}
                strokeWidth="2.6"
              />
            ))}
          </g>
        </>
      )}

      {/* cheeks — same on all three */}
      <ellipse cx="54" cy="94" rx="6" ry="4" fill="#ff9d7a" opacity="0.55" />
      <ellipse cx="106" cy="94" rx="6" ry="4" fill="#ff9d7a" opacity="0.55" />
    </svg>
  );
}
