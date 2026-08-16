import { cn } from "@/lib/utils";

/**
 * The hero scene: the actual corner of the house where HLA3D happens.
 * Drawn rather than photographed so it stays sharp on every screen and
 * never shows a child's face.
 */
export function MakerDesk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 760 560" className={cn("h-full w-full", className)} role="img" aria-label="The HLA3D maker desk: a 3D printer mid-print, filament spools, a laptop and finished prints">
      <defs>
        <linearGradient id="md-desk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe9e0" />
          <stop offset="100%" stopColor="#e2dacd" />
        </linearGradient>
        <linearGradient id="md-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3fa9f5" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#3fa9f5" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="md-print" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff4a17" />
          <stop offset="100%" stopColor="#ff7a4d" />
        </linearGradient>
        <radialGradient id="md-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff4a17" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ff4a17" stopOpacity="0" />
        </radialGradient>
        <pattern id="hero-layers" width="6" height="4" patternUnits="userSpaceOnUse">
          <rect width="6" height="1" fill="#ffffff" opacity="0.22" />
        </pattern>
        <clipPath id="md-bed-clip">
          <rect x="196" y="268" width="164" height="86" />
        </clipPath>
      </defs>

      {/* wall grid */}
      <g opacity="0.5">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={`v${i}`} x1={40 + i * 52} y1="16" x2={40 + i * 52} y2="430" stroke="#17171c" strokeOpacity="0.05" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1="18" y1={30 + i * 52} x2="742" y2={30 + i * 52} stroke="#17171c" strokeOpacity="0.05" />
        ))}
      </g>

      {/* pinned sketch on the wall */}
      <g transform="rotate(-4 120 110)">
        <rect x="52" y="52" width="132" height="112" rx="6" fill="#fffdf9" stroke="#e5dfd6" strokeWidth="2" />
        <path d="M74 132 L100 88 L124 116 L142 92 L162 132" fill="none" stroke="#17171c" strokeOpacity="0.35" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="152" cy="76" r="9" fill="none" stroke="#ff4a17" strokeWidth="2.5" />
        <rect x="70" y="66" width="42" height="6" rx="3" fill="#17171c" opacity="0.18" />
        <circle cx="118" cy="52" r="5" fill="#ff4a17" />
      </g>

      {/* shelf with finished prints */}
      <g>
        <rect x="516" y="150" width="196" height="9" rx="4" fill="#d9d1c4" />
        {/* mini flexi dragon */}
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={540 + i * 16} cy={132 - Math.sin(i / 5 * Math.PI) * 14} r={9 - i * 0.9} fill={i % 2 ? "#c6f24e" : "#a9d63c"} />
          ))}
        </g>
        {/* mini pen holder */}
        <g>
          <path d="M642 150 L642 108 L672 108 L672 150 Z" fill="#3fa9f5" />
          <ellipse cx="657" cy="108" rx="15" ry="5" fill="#7cc6f8" />
          <rect x="650" y="86" width="5" height="24" rx="2.5" fill="#17171c" />
          <rect x="660" y="80" width="5" height="30" rx="2.5" fill="#ff4a17" />
        </g>
        {/* mini nameplate */}
        <g>
          <rect x="686" y="136" width="26" height="14" fill="#17171c" />
          <rect x="690" y="126" width="4" height="10" fill="#ff4a17" />
          <rect x="697" y="122" width="4" height="14" fill="#ff4a17" />
          <rect x="704" y="128" width="4" height="8" fill="#ff4a17" />
        </g>
      </g>

      {/* ---------------- 3D PRINTER ---------------- */}
      <g>
        <ellipse cx="278" cy="432" rx="128" ry="16" fill="#17171c" opacity="0.08" />
        {/* base */}
        <rect x="176" y="352" width="204" height="34" rx="8" fill="#22222b" />
        <rect x="176" y="352" width="204" height="10" rx="5" fill="#33333f" />
        <circle cx="200" cy="369" r="4" fill="#c6f24e" className="animate-[pulse-dot_1.8s_ease-in-out_infinite]" />
        <rect x="300" y="362" width="62" height="16" rx="4" fill="#0f0f13" />
        <rect x="306" y="367" width="34" height="6" rx="3" fill="#ff4a17" />

        {/* uprights */}
        <rect x="176" y="150" width="18" height="206" rx="5" fill="#2c2c36" />
        <rect x="362" y="150" width="18" height="206" rx="5" fill="#2c2c36" />
        <rect x="176" y="150" width="204" height="16" rx="5" fill="#22222b" />

        {/* gantry */}
        <rect x="186" y="228" width="184" height="14" rx="5" fill="#3a3a46" />
        {/* print head */}
        <g>
          <rect x="252" y="220" width="52" height="34" rx="6" fill="#17171c" />
          <rect x="258" y="226" width="40" height="8" rx="4" fill="#4a4a58" />
          <path d="M272 254 L284 254 L280 268 L276 268 Z" fill="#ff4a17" />
          <circle cx="278" cy="270" r="9" fill="url(#md-glow)" />
        </g>

        {/* bed + the print in progress */}
        <rect x="196" y="344" width="164" height="10" rx="3" fill="#3a3a46" />
        <g clipPath="url(#md-bed-clip)">
          <path d="M232 344 L232 296 L246 296 L246 344 Z M258 344 L258 282 L272 282 L272 344 Z M284 344 L284 300 L298 300 L298 344 Z M310 344 L310 290 L324 290 L324 344 Z" fill="url(#md-print)" />
          <rect x="196" y="268" width="164" height="86" fill="url(#hero-layers)" />
        </g>
        {/* layer scan line */}
        <g clipPath="url(#md-bed-clip)">
          <rect x="196" y="268" width="164" height="3" fill="#ffffff" opacity="0.7" className="animate-[scan_2.6s_cubic-bezier(0.22,1,0.36,1)_infinite]" />
        </g>

        {/* filament spool on top */}
        <g>
          <rect x="262" y="112" width="10" height="42" rx="4" fill="#2c2c36" />
          <g className="origin-center animate-[spool_9s_linear_infinite]" style={{ transformBox: "fill-box" }}>
            <circle cx="267" cy="98" r="46" fill="#ff4a17" />
            <circle cx="267" cy="98" r="46" fill="none" stroke="#e63c0c" strokeWidth="3" />
            <circle cx="267" cy="98" r="30" fill="#f5f2ed" />
            <circle cx="267" cy="98" r="10" fill="#22222b" />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <rect
                key={deg}
                x="265"
                y="70"
                width="4"
                height="14"
                rx="2"
                fill="#17171c"
                opacity="0.25"
                transform={`rotate(${deg} 267 98)`}
              />
            ))}
          </g>
          {/* filament strand into the head */}
          <path d="M267 144 C267 176 278 190 278 220" fill="none" stroke="#ff4a17" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </g>

      {/* ---------------- LAPTOP ---------------- */}
      <g>
        <path d="M448 250 L648 250 L668 372 L428 372 Z" fill="#e7e1d7" opacity="0" />
        {/* screen */}
        <rect x="452" y="228" width="196" height="128" rx="8" fill="#17171c" />
        <rect x="460" y="236" width="180" height="112" rx="4" fill="#0f0f13" />
        <rect x="460" y="236" width="180" height="112" rx="4" fill="url(#md-glass)" />
        {/* wireframe model on screen */}
        <g stroke="#3fa9f5" strokeWidth="1.6" fill="none" opacity="0.9">
          <path d="M520 316 L550 300 L580 316 L550 332 Z" />
          <path d="M520 316 L520 286 L550 270 L580 286 L580 316" />
          <path d="M550 300 L550 270" />
          <path d="M520 286 L550 300 L580 286" />
        </g>
        <rect x="472" y="248" width="46" height="5" rx="2.5" fill="#ffffff" opacity="0.28" />
        <rect x="472" y="258" width="28" height="5" rx="2.5" fill="#ff4a17" opacity="0.85" />
        {/* body */}
        <path d="M436 356 L664 356 L676 372 L424 372 Z" fill="#c9c2b5" />
        <rect x="510" y="362" width="80" height="4" rx="2" fill="#a9a294" />
      </g>

      {/* ---------------- DESK ---------------- */}
      <rect x="18" y="386" width="724" height="22" rx="6" fill="url(#md-desk)" />
      <rect x="18" y="386" width="724" height="6" rx="3" fill="#f6f2ea" />
      <rect x="72" y="408" width="16" height="120" rx="5" fill="#dcd4c6" />
      <rect x="672" y="408" width="16" height="120" rx="5" fill="#dcd4c6" />

      {/* ---------------- DESK OBJECTS ---------------- */}
      {/* spare spools lying down */}
      <g>
        <ellipse cx="112" cy="386" rx="46" ry="8" fill="#17171c" opacity="0.07" />
        <g className="origin-center animate-[spool_14s_linear_infinite]" style={{ transformBox: "fill-box" }}>
          <circle cx="112" cy="342" r="42" fill="#3fa9f5" />
          <circle cx="112" cy="342" r="27" fill="#f5f2ed" />
          <circle cx="112" cy="342" r="9" fill="#22222b" />
        </g>
      </g>
      <g>
        <g className="origin-center animate-[spool_20s_linear_infinite]" style={{ transformBox: "fill-box" }}>
          <circle cx="66" cy="358" r="28" fill="#c6f24e" />
          <circle cx="66" cy="358" r="17" fill="#f5f2ed" />
          <circle cx="66" cy="358" r="6" fill="#22222b" />
        </g>
      </g>

      {/* finished phone stand on the desk */}
      <g>
        <path d="M398 386 L468 386 L474 376 L404 376 Z" fill="#2c2c36" />
        <path d="M418 376 L432 376 L456 330 L442 330 Z" fill="#3a3a46" />
        <rect x="424" y="318" width="34" height="58" rx="4" fill="#0f0f13" transform="rotate(20 441 347)" />
        <rect x="429" y="325" width="24" height="42" rx="2" fill="#3fa9f5" opacity="0.55" transform="rotate(20 441 347)" />
      </g>

      {/* nameplate on the desk */}
      <g>
        <path d="M552 386 L678 386 L678 374 L552 374 Z" fill="#22222b" />
        <path d="M552 374 L678 374 L690 366 L564 366 Z" fill="#33333f" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={572 + i * 17} y={374 - (i % 2 ? 22 : 17)} width="10" height={i % 2 ? 22 : 17} fill="#ff4a17" />
        ))}
      </g>

      {/* caliper */}
      <g opacity="0.9">
        <rect x="150" y="392" width="120" height="8" rx="3" fill="#b9bec7" />
        <rect x="176" y="384" width="10" height="24" rx="3" fill="#8f97a3" />
        <rect x="240" y="384" width="10" height="24" rx="3" fill="#8f97a3" />
      </g>
    </svg>
  );
}
