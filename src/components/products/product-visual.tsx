import type { ProductShape } from "@/data/products";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Colour helpers — one filament colour drives a whole three-tone render.
   -------------------------------------------------------------------------- */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function toHex(rgb: [number, number, number]) {
  return `#${rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`;
}

function mix(hex: string, towards: number, amount: number) {
  const rgb = hexToRgb(hex);
  return toHex(rgb.map((v) => v + (towards - v) * amount) as [number, number, number]);
}

const lighten = (hex: string, amount: number) => mix(hex, 255, amount);
const darken = (hex: string, amount: number) => mix(hex, 0, amount);

export type ProductVisualProps = {
  shape: ProductShape;
  color: string;
  /** Unique per rendered instance so gradient / pattern ids never collide. */
  uid: string;
  label?: string;
  className?: string;
};

/**
 * Every product image on this site is drawn, not photographed.
 * One filament hex in, one three-tone isometric render out — which means the
 * shop stays visually coherent while the makers swap colours freely.
 */
export function ProductVisual({ shape, color, uid, label, className }: ProductVisualProps) {
  const top = lighten(color, 0.26);
  const front = color;
  const side = darken(color, 0.24);
  const deep = darken(color, 0.42);
  // uid can carry cart keys with spaces and colons — those break url(#id) refs.
  const gid = `pv-${uid.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      viewBox="0 0 240 240"
      role="img"
      aria-label={label ?? "3D printed product render"}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`${gid}-front`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lighten(front, 0.1)} />
          <stop offset="100%" stopColor={darken(front, 0.08)} />
        </linearGradient>
        <linearGradient id={`${gid}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={lighten(top, 0.12)} />
          <stop offset="100%" stopColor={top} />
        </linearGradient>
        <pattern id={`${gid}-layers`} width="6" height="4" patternUnits="userSpaceOnUse">
          <rect width="6" height="1" fill="#ffffff" opacity="0.16" />
        </pattern>
        <radialGradient id={`${gid}-shadow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#17171c" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#17171c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform={fitTransform(shape)}>
        {/* contact shadow */}
        <ellipse cx="120" cy="206" rx="76" ry="15" fill={`url(#${gid}-shadow)`} />
        <Shape shape={shape} gid={gid} front={front} top={top} side={side} deep={deep} />
      </g>
    </svg>
  );
}

/**
 * Each shape occupies a different slice of the 240×240 canvas — a name plate is
 * wide and short, a headphone stand is tall and narrow. This scales and nudges
 * each one so every product fills its card frame by the same amount.
 */
const FIT: Record<ProductShape, { scale: number; dy: number }> = {
  nameplate: { scale: 1.32, dy: -30 },
  stand: { scale: 1.26, dy: -14 },
  arch: { scale: 1.14, dy: -4 },
  "flexi-dragon": { scale: 1.22, dy: -4 },
  "flexi-octopus": { scale: 1.16, dy: 0 },
  buddy: { scale: 1.34, dy: -6 },
  comb: { scale: 1.3, dy: -16 },
  cylinder: { scale: 1.2, dy: 0 },
  truck: { scale: 1.3, dy: -16 },
  animal: { scale: 1.24, dy: -4 },
  tag: { scale: 1.3, dy: -8 },
  keyring: { scale: 1.32, dy: -12 },
  wedge: { scale: 1.26, dy: -12 },
  puzzle: { scale: 1.16, dy: 0 },
  giftbox: { scale: 1.22, dy: -4 },
};

function fitTransform(shape: ProductShape) {
  const { scale, dy } = FIT[shape] ?? { scale: 1, dy: 0 };
  const offset = 120 - 120 * scale;
  return `translate(${offset} ${offset + dy}) scale(${scale})`;
}

type ShapeProps = {
  shape: ProductShape;
  gid: string;
  front: string;
  top: string;
  side: string;
  deep: string;
};

function Shape({ shape, gid, front, top, side, deep }: ShapeProps) {
  const F = `url(#${gid}-front)`;
  const T = `url(#${gid}-top)`;
  const L = `url(#${gid}-layers)`;

  switch (shape) {
    /* ---------------------------------------------------------------- */
    case "nameplate":
      return (
        <>
          {/* base slab */}
          <path d="M40 168 L156 168 L200 146 L84 146 Z" fill={T} />
          <path d="M40 168 L156 168 L156 190 L40 190 Z" fill={F} />
          <path d="M156 168 L200 146 L200 168 L156 190 Z" fill={side} />
          <rect x="40" y="168" width="116" height="22" fill={L} />
          {/* raised letters */}
          {[
            { x: 52, w: 18, h: 34 },
            { x: 74, w: 12, h: 44 },
            { x: 90, w: 20, h: 34 },
            { x: 114, w: 12, h: 42 },
            { x: 130, w: 18, h: 34 },
          ].map((l, i) => (
            <g key={i}>
              <path d={`M${l.x} ${168 - l.h} L${l.x + l.w} ${168 - l.h} L${l.x + l.w + 12} ${162 - l.h} L${l.x + 12} ${162 - l.h} Z`} fill={deep} opacity="0.9" />
              <rect x={l.x} y={168 - l.h} width={l.w} height={l.h} fill="#17171c" />
              <path d={`M${l.x + l.w} ${168 - l.h} L${l.x + l.w + 12} ${162 - l.h} L${l.x + l.w + 12} ${162} L${l.x + l.w} ${168} Z`} fill="#000" opacity="0.55" />
            </g>
          ))}
        </>
      );

    /* ---------------------------------------------------------------- */
    case "stand":
      return (
        <>
          <path d="M56 186 L164 186 L192 168 L84 168 Z" fill={T} />
          <path d="M56 186 L164 186 L164 198 L56 198 Z" fill={F} />
          <path d="M164 186 L192 168 L192 180 L164 198 Z" fill={side} />
          {/* back rest */}
          <path d="M96 168 L120 168 L172 78 L148 78 Z" fill={F} />
          <path d="M120 168 L148 150 L176 62 L172 78 Z" fill={side} />
          <path d="M148 78 L172 78 L176 62 L152 62 Z" fill={T} />
          <path d="M96 168 L120 168 L172 78 L148 78 Z" fill={L} />
          {/* lip */}
          <path d="M62 168 L104 168 L104 152 L74 152 Z" fill={T} />
          <path d="M62 168 L104 168 L104 178 L62 178 Z" fill={deep} />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "arch":
      return (
        <>
          <ellipse cx="120" cy="188" rx="52" ry="16" fill={side} />
          <ellipse cx="120" cy="182" rx="52" ry="16" fill={T} />
          <path d="M106 182 L134 182 L134 96 L106 96 Z" fill={F} />
          <path d="M134 182 L146 174 L146 90 L134 96 Z" fill={side} />
          <path d="M106 182 L134 182 L134 96 L106 96 Z" fill={L} />
          <path
            d="M70 100 C70 46 170 46 170 100"
            fill="none"
            stroke={F}
            strokeWidth="26"
            strokeLinecap="round"
          />
          <path
            d="M70 100 C70 46 170 46 170 100"
            fill="none"
            stroke={T}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.65"
          />
          <circle cx="152" cy="150" r="9" fill={deep} />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "flexi-dragon": {
      const pts = Array.from({ length: 13 }, (_, i) => {
        const t = i / 12;
        return { x: 34 + t * 172, y: 150 - Math.sin(t * Math.PI * 1.7) * 52, r: 15 - t * 7 };
      });
      return (
        <>
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y + 4} r={p.r} fill={side} />
              <circle cx={p.x} cy={p.y} r={p.r} fill={i % 2 ? F : top} />
              {i > 1 && i < 10 && (
                <path
                  d={`M${p.x - 5} ${p.y - p.r} L${p.x} ${p.y - p.r - 13} L${p.x + 5} ${p.y - p.r} Z`}
                  fill={deep}
                />
              )}
            </g>
          ))}
          <circle cx="30" cy="150" r="19" fill={F} />
          <circle cx="30" cy="150" r="19" fill={L} />
          <circle cx="24" cy="145" r="4" fill="#17171c" />
          <path d="M12 152 L30 148 L30 158 Z" fill={deep} />
        </>
      );
    }

    /* ---------------------------------------------------------------- */
    case "flexi-octopus": {
      const arms = Array.from({ length: 8 }, (_, i) => {
        const a = Math.PI + (i / 7) * Math.PI;
        return {
          x1: 120 + Math.cos(a) * 34,
          y1: 132 + Math.abs(Math.sin(a)) * 6,
          x2: 120 + Math.cos(a) * 76,
          y2: 176 - Math.abs(Math.sin(a)) * 8,
        };
      });
      return (
        <>
          {arms.map((a, i) => (
            <path
              key={i}
              d={`M${a.x1} ${a.y1} Q${(a.x1 + a.x2) / 2} ${a.y2 + 26} ${a.x2} ${a.y2}`}
              fill="none"
              stroke={i % 2 ? F : side}
              strokeWidth={13 - Math.abs(3.5 - i) * 1.2}
              strokeLinecap="round"
            />
          ))}
          <ellipse cx="120" cy="118" rx="52" ry="46" fill={F} />
          <ellipse cx="120" cy="118" rx="52" ry="46" fill={L} />
          <ellipse cx="112" cy="102" rx="30" ry="20" fill={top} opacity="0.55" />
          <circle cx="102" cy="122" r="7" fill="#17171c" />
          <circle cx="140" cy="122" r="7" fill="#17171c" />
          <circle cx="104" cy="119" r="2.4" fill="#fff" />
          <circle cx="142" cy="119" r="2.4" fill="#fff" />
        </>
      );
    }

    /* ---------------------------------------------------------------- */
    case "buddy":
      return (
        <>
          <rect x="76" y="72" width="88" height="104" rx="30" fill={F} />
          <rect x="76" y="72" width="88" height="104" rx="30" fill={L} />
          <rect x="86" y="80" width="68" height="42" rx="20" fill={top} opacity="0.6" />
          <circle cx="104" cy="108" r="7.5" fill="#17171c" />
          <circle cx="136" cy="108" r="7.5" fill="#17171c" />
          <path d="M110 128 Q120 138 130 128" fill="none" stroke="#17171c" strokeWidth="3.5" strokeLinecap="round" />
          {/* card slot */}
          <rect x="66" y="140" width="108" height="12" rx="6" fill={deep} />
          <rect x="82" y="118" width="76" height="30" rx="4" fill="#f4f2ee" transform="rotate(-6 120 133)" stroke={deep} strokeWidth="2" />
          <rect x="64" y="112" width="16" height="42" rx="8" fill={side} />
          <rect x="160" y="112" width="16" height="42" rx="8" fill={side} />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "comb":
      return (
        <>
          <path d="M40 150 L184 150 L200 136 L56 136 Z" fill={T} />
          <rect x="40" y="150" width="144" height="34" rx="6" fill={F} />
          <path d="M184 150 L200 136 L200 170 L184 184 Z" fill={side} />
          <rect x="40" y="150" width="144" height="34" fill={L} />
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${56 + i * 28} 136 L${56 + i * 28} 118 M${68 + i * 28} 136 L${68 + i * 28} 118`}
              stroke={side}
              strokeWidth="9"
              strokeLinecap="round"
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={62 + i * 28} cy={124} r="5" fill={deep} />
          ))}
        </>
      );

    /* ---------------------------------------------------------------- */
    case "cylinder":
      return (
        <>
          <path d="M80 90 L80 180 Q120 196 160 180 L160 90 Z" fill={F} />
          <path d="M80 90 L80 180 Q120 196 160 180 L160 90 Z" fill={L} />
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={`M${84 + i * 9} 92 L${84 + i * 9} ${182 - Math.abs(4 - i) * 2}`}
              stroke={darken(front, 0.12)}
              strokeWidth="3"
              opacity="0.6"
            />
          ))}
          <ellipse cx="120" cy="90" rx="40" ry="14" fill={T} />
          <ellipse cx="120" cy="90" rx="31" ry="10" fill={deep} />
          {/* pens */}
          <rect x="102" y="46" width="9" height="46" rx="4" fill="#17171c" />
          <rect x="118" y="38" width="9" height="54" rx="4" fill="#ff4a17" />
          <rect x="132" y="54" width="9" height="40" rx="4" fill="#3fa9f5" />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "truck":
      return (
        <>
          <path d="M32 158 L58 118 L112 100 L208 128 L208 158 Z" fill={F} />
          <path d="M32 158 L58 118 L112 100 L208 128 L208 158 Z" fill={L} />
          <path d="M58 118 L112 100 L208 128 L200 132 L60 124 Z" fill={T} />
          <path d="M70 122 L110 110 L146 120 L74 124 Z" fill="#17171c" opacity="0.75" />
          <rect x="32" y="150" width="176" height="12" fill={side} />
          <circle cx="72" cy="166" r="20" fill="#17171c" />
          <circle cx="72" cy="166" r="8" fill={side} />
          <circle cx="172" cy="166" r="20" fill="#17171c" />
          <circle cx="172" cy="166" r="8" fill={side} />
          <rect x="196" y="132" width="12" height="7" rx="3" fill="#ffc93c" />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "animal":
      return (
        <>
          <path d="M120 44 L166 74 L172 132 L148 178 L92 178 L68 132 L74 74 Z" fill={F} />
          <path d="M120 44 L166 74 L172 132 L148 178 L92 178 L68 132 L74 74 Z" fill={L} />
          <path d="M120 44 L166 74 L172 132 L120 118 Z" fill={side} opacity="0.55" />
          <path d="M74 74 L60 40 L96 56 Z" fill={top} />
          <path d="M166 74 L180 40 L144 56 Z" fill={top} />
          <circle cx="102" cy="102" r="7" fill="#17171c" />
          <circle cx="140" cy="102" r="7" fill="#17171c" />
          <path d="M112 124 L128 124 L120 136 Z" fill="#17171c" />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "tag":
      return (
        <>
          <rect x="52" y="80" width="150" height="82" rx="22" fill={side} transform="rotate(-6 120 120)" />
          <rect x="48" y="74" width="150" height="82" rx="22" fill={F} transform="rotate(-6 120 120)" />
          <rect x="48" y="74" width="150" height="82" rx="22" fill={L} transform="rotate(-6 120 120)" />
          <g transform="rotate(-6 120 120)">
            <rect x="76" y="98" width="86" height="14" rx="7" fill="#17171c" />
            <rect x="76" y="120" width="56" height="10" rx="5" fill="#17171c" opacity="0.42" />
            <circle cx="66" cy="115" r="12" fill="none" stroke={deep} strokeWidth="7" />
          </g>
          <circle cx="46" cy="88" r="15" fill="none" stroke="#b9bec7" strokeWidth="5" />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "keyring":
      return (
        <>
          <circle cx="72" cy="88" r="26" fill="none" stroke="#b9bec7" strokeWidth="7" />
          <circle cx="72" cy="88" r="26" fill="none" stroke="#e9ecf1" strokeWidth="2.5" />
          <rect x="88" y="106" width="112" height="62" rx="20" fill={side} />
          <rect x="84" y="100" width="112" height="62" rx="20" fill={F} />
          <rect x="84" y="100" width="112" height="62" rx="20" fill={L} />
          <circle cx="102" cy="118" r="8" fill="none" stroke={deep} strokeWidth="5" />
          <rect x="116" y="118" width="66" height="13" rx="6.5" fill="#17171c" />
          <rect x="116" y="138" width="44" height="9" rx="4.5" fill="#17171c" opacity="0.4" />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "wedge":
      return (
        <>
          <path d="M46 176 L194 176 L194 140 L46 96 Z" fill={F} />
          <path d="M46 96 L194 140 L204 130 L58 88 Z" fill={T} />
          <path d="M194 176 L204 166 L204 130 L194 140 Z" fill={side} />
          <path d="M46 176 L194 176 L194 140 L46 96 Z" fill={L} />
          <path d="M70 116 L172 148" stroke={deep} strokeWidth="9" strokeLinecap="round" />
          {/* cards */}
          <rect x="72" y="66" width="94" height="56" rx="6" fill="#f4f2ee" transform="rotate(16 120 94)" stroke={deep} strokeWidth="2" />
          <rect x="84" y="82" width="40" height="7" rx="3.5" fill="#17171c" transform="rotate(16 120 94)" />
          <rect x="84" y="94" width="60" height="5" rx="2.5" fill="#8b8b95" transform="rotate(16 120 94)" />
        </>
      );

    /* ---------------------------------------------------------------- */
    case "puzzle":
      return (
        <>
          <path d="M40 132 L120 92 L200 132 L120 172 Z" fill={T} />
          <path d="M40 132 L120 172 L120 194 L40 154 Z" fill={F} />
          <path d="M200 132 L120 172 L120 194 L200 154 Z" fill={side} />
          <path d="M40 132 L120 172 L120 194 L40 154 Z" fill={L} />
          <path d="M76 112 L120 134 L164 112" fill="none" stroke={deep} strokeWidth="5" />
          <path d="M120 92 L120 134" stroke={deep} strokeWidth="5" />
          {/* floating loose piece */}
          <g>
            <path d="M132 42 L176 62 L176 84 L132 64 Z" fill={F} />
            <path d="M176 62 L204 48 L204 70 L176 84 Z" fill={side} />
            <path d="M132 42 L160 28 L204 48 L176 62 Z" fill={T} />
          </g>
        </>
      );

    /* ---------------------------------------------------------------- */
    case "giftbox":
      return (
        <>
          <path d="M50 116 L120 150 L190 116 L120 84 Z" fill={T} />
          <path d="M50 116 L120 150 L120 196 L50 162 Z" fill={F} />
          <path d="M190 116 L120 150 L120 196 L190 162 Z" fill={side} />
          <path d="M50 116 L120 150 L120 196 L50 162 Z" fill={L} />
          {/* ribbon */}
          <path d="M85 100 L155 134 L155 178 L85 144 Z" fill="#17171c" opacity="0.14" />
          <path d="M120 150 L120 196" stroke={deep} strokeWidth="9" />
          <path d="M50 116 L120 150 L190 116" fill="none" stroke={deep} strokeWidth="5" />
          {/* mini contents peeking */}
          <rect x="96" y="52" width="48" height="26" rx="5" fill="#17171c" />
          <rect x="104" y="60" width="32" height="8" rx="4" fill={top} />
          <circle cx="164" cy="70" r="13" fill="none" stroke="#b9bec7" strokeWidth="5" />
        </>
      );

    default:
      return <rect x="70" y="70" width="100" height="100" rx="16" fill={F} />;
  }
}
