import { Palette, Printer, Sparkles } from "lucide-react";
import type { Maker } from "@/data/makers";
import { MakerAvatar } from "@/components/brand/maker-avatar";
import { Doodle } from "@/components/brand/doodle";
import { cn } from "@/lib/utils";

const ACCENTS = {
  flame: { bg: "bg-flame", tint: "bg-flame-tint", hex: "#ff4a17", text: "text-white" },
  sky: { bg: "bg-sky", tint: "bg-sky-tint", hex: "#3fa9f5", text: "text-white" },
  lime: { bg: "bg-lime", tint: "bg-lime-tint", hex: "#b6e64a", text: "text-ink" },
} as const;

export function MakerCard({ maker, className }: { maker: Maker; className?: string }) {
  const accent = ACCENTS[maker.accent];

  return (
    <article
      className={cn(
        "sticker press group relative flex flex-col overflow-hidden rounded-[var(--radius-xl2)] bg-surface",
        className,
      )}
    >
      {/* ---- portrait panel ---------------------------------------- */}
      <div className={cn("relative overflow-hidden border-b-2 border-ink", accent.tint)}>
        <div className="grid-paper absolute inset-0 opacity-40" />

        <Doodle
          kind="sparkle"
          color={accent.hex}
          className="absolute left-4 top-4 size-7 animate-[twinkle_2s_ease-in-out_infinite]"
        />
        <Doodle
          kind="star"
          color={accent.hex}
          className="absolute right-6 top-20 size-5 animate-[twinkle_2s_ease-in-out_infinite] [animation-delay:0.7s]"
        />

        {/* age badge, stuck on at an angle like a sticker */}
        <span
          className={cn(
            "absolute right-4 top-4 z-10 grid size-14 -rotate-6 place-items-center rounded-full border-2 border-ink",
            accent.bg,
            accent.text,
          )}
          style={{ boxShadow: "0 3px 0 0 var(--color-ink)" }}
        >
          <span className="font-display text-xl leading-none font-extrabold">{maker.age}</span>
        </span>

        <div className="relative mx-auto w-40 pt-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <MakerAvatar role={maker.id} />
        </div>
      </div>

      {/* ---- name plate --------------------------------------------- */}
      <div className="relative px-6 pt-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="display text-4xl text-ink">{maker.name}</h3>
            <p
              className={cn(
                "mt-2 inline-block rounded-full border-2 border-ink px-3 py-0.5 font-display text-xs font-bold",
                accent.bg,
                accent.text,
              )}
            >
              {maker.title}
            </p>
          </div>
          <span className="font-mono text-[0.625rem] text-ink-3">#{maker.index}</span>
        </div>

        {/* speech bubble */}
        <div className="relative mt-5 rounded-2xl border-2 border-ink bg-paper-2 p-4">
          <span
            className="absolute -top-2 left-8 size-3.5 rotate-45 border-l-2 border-t-2 border-ink bg-paper-2"
            aria-hidden
          />
          <p className="text-[0.9375rem] leading-snug font-semibold text-ink">“{maker.quote}”</p>
        </div>
      </div>

      {/* ---- stats --------------------------------------------------- */}
      <dl className="mt-5 space-y-3 px-6 pb-6">
        <Row icon={Sparkles} label="Siêu năng lực" value={maker.superpower} hex={accent.hex} />
        <Row icon={Printer} label="Thích in nhất" value={maker.favoritePrint} hex={accent.hex} />
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 border-ink bg-surface">
            <Palette className="size-3.5" style={{ color: accent.hex }} />
          </span>
          <div>
            <dt className="eyebrow text-ink-3">Màu tủ</dt>
            <dd className="mt-0.5 flex items-center gap-2 text-sm font-bold text-ink">
              <span
                className="size-4 rounded-full border-2 border-ink"
                style={{ background: maker.favoriteColor.hex }}
              />
              {maker.favoriteColor.name}
            </dd>
          </div>
        </div>
      </dl>

      {/* ---- learning strip ------------------------------------------ */}
      <p className="mt-auto border-t-2 border-dashed border-ink/25 px-6 py-4 text-xs leading-relaxed text-ink-2">
        <span className="eyebrow mb-1 block text-ink-3">Đang học</span>
        {maker.learning}
      </p>
    </article>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  hex,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  hex: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg border-2 border-ink bg-surface">
        <Icon className="size-3.5" style={{ color: hex }} />
      </span>
      <div>
        <dt className="eyebrow text-ink-3">{label}</dt>
        <dd className="mt-0.5 text-sm font-bold text-ink">{value}</dd>
      </div>
    </div>
  );
}
