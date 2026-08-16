"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { moneyLesson } from "@/data/dashboard";
import { formatVnd, cn } from "@/lib/utils";

/**
 * The money lesson, made visual: one 150.000đ sale taken apart, then the
 * profit split three ways. This is the part of HLA3D that is actually
 * about education rather than commerce.
 */
export function MoneyBreakdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { salePrice, breakdown, profitSplit } = moneyLesson;
  const [active, setActive] = React.useState<string | null>(null);
  const reduce = useReducedMotion();
  const dark = tone === "dark";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
      {/* ---- the sale, taken apart ------------------------------------ */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <span className={cn("eyebrow", dark ? "text-white/40" : "text-ink-3")}>Một món bán ra</span>
          <span className={cn("display text-3xl sm:text-4xl", dark ? "text-white" : "text-ink")}>
            {formatVnd(salePrice)}
          </span>
        </div>

        {/* stacked bar */}
        <div
          className={cn(
            "mt-5 flex h-14 w-full overflow-hidden rounded-2xl",
            dark ? "bg-carbon-2" : "bg-paper-2",
          )}
          onMouseLeave={() => setActive(null)}
        >
          {breakdown.map((part) => {
            const pct = (part.amount / salePrice) * 100;
            return (
              <motion.button
                key={part.key}
                type="button"
                aria-label={`${part.label}: ${formatVnd(part.amount)}`}
                onMouseEnter={() => setActive(part.key)}
                onFocus={() => setActive(part.key)}
                onClick={() => setActive(part.key)}
                className="relative h-full border-r border-black/10 last:border-r-0"
                style={{ background: part.hex }}
                initial={reduce ? false : { width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className={cn(
                    "absolute inset-0 grid place-items-center font-mono text-[0.625rem] font-bold transition-opacity",
                    pct < 8 ? "opacity-0" : "opacity-100",
                    part.key === "profit" || part.key === "material" ? "text-white" : "text-ink",
                  )}
                >
                  {Math.round(pct)}%
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* legend */}
        <ul className="mt-6 space-y-1.5">
          {breakdown.map((part) => {
            const isActive = active === part.key;
            return (
              <li key={part.key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(part.key)}
                  onFocus={() => setActive(part.key)}
                  onClick={() => setActive(isActive ? null : part.key)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    isActive ? (dark ? "bg-white/6" : "bg-paper-2") : "bg-transparent",
                  )}
                >
                  <span className="size-3 shrink-0 rounded-full" style={{ background: part.hex }} />
                  <span
                    className={cn(
                      "font-display text-sm font-bold tracking-tight",
                      part.key === "profit" ? "text-flame" : dark ? "text-white" : "text-ink",
                    )}
                  >
                    {part.label}
                  </span>
                  <span className={cn("text-xs", dark ? "text-white/35" : "text-ink-3")}>{part.labelVi}</span>
                  <span
                    className={cn(
                      "ml-auto font-mono text-sm",
                      dark ? "text-white/70" : "text-ink-2",
                    )}
                  >
                    {formatVnd(part.amount)}
                  </span>
                </button>
                <p
                  className={cn(
                    "overflow-hidden pl-9 text-xs leading-relaxed transition-all duration-300",
                    isActive ? "max-h-12 pb-2 opacity-100" : "max-h-0 opacity-0",
                    dark ? "text-white/45" : "text-ink-3",
                  )}
                >
                  {part.note}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---- what happens to the profit ------------------------------- */}
      <div
        className={cn(
          "rounded-[var(--radius-card)] border p-6 sm:p-8",
          dark ? "border-carbon-line bg-carbon-2" : "border-line-soft bg-surface shadow-[var(--shadow-soft)]",
        )}
      >
        <span className={cn("eyebrow", dark ? "text-white/40" : "text-ink-3")}>Rồi tiền lời chia ba</span>
        <p className={cn("display mt-3 text-2xl", dark ? "text-white" : "text-ink")}>
          {formatVnd(90000)} — <span className="text-flame">chia ba phần</span>
        </p>

        <div className="mt-7 space-y-5">
          {profitSplit.map((split, i) => (
            <div key={split.key}>
              <div className="flex items-baseline justify-between">
                <span className={cn("font-display text-sm font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
                  {split.label}
                  <span className={cn("ml-2 font-sans text-xs font-normal", dark ? "text-white/35" : "text-ink-3")}>
                    {split.labelVi}
                  </span>
                </span>
                <span className="font-mono text-sm" style={{ color: split.hex }}>
                  {split.percent}%
                </span>
              </div>
              <div className={cn("mt-2 h-2.5 w-full overflow-hidden rounded-full", dark ? "bg-white/8" : "bg-paper-2")}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: split.hex }}
                  initial={reduce ? false : { width: 0 }}
                  whileInView={{ width: `${split.percent}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className={cn("mt-2 text-xs leading-relaxed", dark ? "text-white/45" : "text-ink-3")}>
                {split.note}
              </p>
            </div>
          ))}
        </div>

        <p
          className={cn(
            "mt-7 rounded-2xl p-4 text-xs leading-relaxed",
            dark ? "bg-white/5 text-white/55" : "bg-paper-2 text-ink-2",
          )}
        >
          20% được tiêu là phần duy nhất ba anh em được đụng vào. 80% còn lại đều đã có việc của nó. Luật này
          đặt từ ngày đầu tiên và chưa đổi lần nào.
        </p>
      </div>
    </div>
  );
}
