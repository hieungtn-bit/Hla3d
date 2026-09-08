"use client";

import Link from "next/link";
import { vocabSets } from "@/data/vocab";
import { overall, statusOfSet, useVocab } from "@/lib/vocab-store";
import { cn } from "@/lib/utils";

/**
 * The whole climb on one screen.
 *
 * A progress bar reading "27/1000" is a number. Forty tiles that fill in one
 * by one is a thing a six-year-old can see moving, which is the only version
 * of progress that keeps a six-year-old coming back.
 */
export function WordWall() {
  const state = useVocab();
  const total = overall(state);

  return (
    <div>
      {/* ---- the headline numbers ---- */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={`${total.learned}`} label="Từ đã thuộc" sub={`trên ${total.total}`} tone="bg-lime" />
        <Stat value={`${total.started}`} label="Từ đã gặp" sub="đang trong vòng ôn" tone="bg-sun" />
        <Stat value={`${total.dueToday}`} label="Cần ôn hôm nay" sub="ôn xong là xong" tone="bg-flame" />
        <Stat value={`${total.streak}`} label="Ngày liên tiếp" sub="đừng đứt nhé" tone="bg-sky" />
      </div>

      <div className="mt-4 h-4 overflow-hidden rounded-full border-2 border-ink bg-surface">
        <div
          className="h-full bg-flame transition-[width] duration-500"
          style={{ width: `${Math.max(1, Math.round((total.learned / total.total) * 100))}%` }}
        />
      </div>

      {/* ---- the forty sets ---- */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {vocabSets.map((set) => {
          const s = statusOfSet(state, set.id);
          const done = s.learned === s.total;
          return (
            <Link
              key={set.id}
              href={`/hoc-tieng-anh/${set.id}`}
              className={cn(
                "sticker press group rounded-[var(--radius-card)] p-4 transition-colors",
                done ? "bg-lime" : "bg-surface hover:bg-paper-2",
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl border-2 border-ink text-xl",
                    set.tone,
                  )}
                >
                  {set.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold tracking-tight">{set.title}</p>
                  <p className="mt-0.5 truncate text-xs font-semibold text-ink-3">{set.titleEn}</p>
                </div>
                <span className="font-display text-sm font-bold text-ink-3">{set.order}</span>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-paper">
                <div
                  className="h-full bg-ink transition-[width] duration-500"
                  style={{ width: `${Math.round((s.learned / s.total) * 100)}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs font-semibold">
                <span className="text-ink-2">
                  Thuộc {s.learned}/{s.total}
                </span>
                {s.due > 0 ? (
                  <span className="rounded-full border-2 border-ink bg-flame px-2 py-0.5 text-white">
                    Ôn {s.due}
                  </span>
                ) : s.started === 0 ? (
                  <span className="rounded-full border-2 border-ink bg-sun px-2 py-0.5">Chưa học</span>
                ) : s.unmet > 0 ? (
                  <span className="rounded-full border-2 border-ink bg-sun px-2 py-0.5">
                    Còn {s.unmet} từ mới
                  </span>
                ) : (
                  <span className="rounded-full border-2 border-ink bg-lime px-2 py-0.5">Xong</span>
                )}
              </div>

              {!set.pictureFirst && (
                <p className="mt-2 text-[0.6875rem] font-semibold text-ink-3">
                  Bộ chữ — cần đọc được
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ value, label, sub, tone }: { value: string; label: string; sub: string; tone: string }) {
  return (
    <div className="sticker rounded-[var(--radius-card)] bg-surface p-4">
      <span className={cn("inline-block rounded-lg border-2 border-ink px-2 py-0.5 text-[0.625rem] font-bold", tone)}>
        {label}
      </span>
      <p className="display mt-2 text-3xl">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-ink-3">{sub}</p>
    </div>
  );
}
