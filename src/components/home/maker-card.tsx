import { Palette, Ruler, Sparkles } from "lucide-react";
import type { Maker } from "@/data/makers";
import { cn } from "@/lib/utils";

const ACCENTS = {
  flame: { chip: "bg-flame text-white", ring: "group-hover:border-flame/40", glow: "#ff4a17" },
  sky: { chip: "bg-sky text-white", ring: "group-hover:border-sky/40", glow: "#3fa9f5" },
  lime: { chip: "bg-lime text-ink", ring: "group-hover:border-lime/60", glow: "#c6f24e" },
} as const;

function Glyph({ kind, hex }: { kind: Maker["glyph"]; hex: string }) {
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden>
      <circle cx="60" cy="60" r="44" fill={hex} opacity="0.14" />
      <circle cx="60" cy="60" r="44" fill="none" stroke={hex} strokeWidth="2" strokeOpacity="0.35" />
      {kind === "bolt" && (
        <path d="M66 30 L42 66 L58 66 L52 92 L78 54 L62 54 Z" fill={hex} />
      )}
      {kind === "compass" && (
        <g fill="none" stroke={hex} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M60 32 L44 88" />
          <path d="M60 32 L76 88" />
          <circle cx="60" cy="32" r="5" fill={hex} />
          <path d="M50 68 L70 68" />
        </g>
      )}
      {kind === "shield" && (
        <g>
          <path d="M60 28 L88 40 V64 C88 80 74 90 60 94 C46 90 32 80 32 64 V40 Z" fill={hex} opacity="0.9" />
          <path d="M48 62 L57 71 L74 52" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

export function MakerCard({ maker, className }: { maker: Maker; className?: string }) {
  const accent = ACCENTS[maker.accent];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 transition-all duration-300",
        "shadow-[var(--shadow-soft)] hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        accent.ring,
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="eyebrow text-ink-3">MAKER #{maker.index}</span>
        <span className={cn("eyebrow rounded-full px-2.5 py-1", accent.chip)}>LEVEL {maker.index === "03" ? 3 : 4}</span>
      </div>

      <div className="relative mx-auto my-6 size-32">
        <div
          className="absolute inset-0 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: accent.glow, opacity: 0.18 }}
        />
        <Glyph kind={maker.glyph} hex={accent.glow} />
      </div>

      <h3 className="display text-2xl">{maker.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-2 italic">“{maker.quote}”</p>

      <dl className="mt-6 space-y-3 border-t border-line-soft pt-5 text-sm">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-4 shrink-0 text-flame" />
          <div>
            <dt className="eyebrow text-ink-3">Superpower</dt>
            <dd className="mt-1 font-medium text-ink">{maker.superpower}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Palette className="mt-0.5 size-4 shrink-0 text-ink-3" />
          <div>
            <dt className="eyebrow text-ink-3">Favourite colour</dt>
            <dd className="mt-1 flex items-center gap-2 font-medium text-ink">
              <span
                className="size-3.5 rounded-full border border-ink/10"
                style={{ background: maker.favoriteColor.hex }}
              />
              {maker.favoriteColor.name}
            </dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Ruler className="mt-0.5 size-4 shrink-0 text-ink-3" />
          <div>
            <dt className="eyebrow text-ink-3">Favourite thing to print</dt>
            <dd className="mt-1 font-medium text-ink">{maker.favoritePrint}</dd>
          </div>
        </div>
      </dl>

      <p className="mt-5 rounded-2xl bg-paper-2 p-4 text-xs leading-relaxed text-ink-2">
        <span className="eyebrow mb-1 block text-ink-3">Currently learning</span>
        {maker.learning}
      </p>
    </article>
  );
}
