"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { MakerDesk } from "@/components/brand/maker-desk";
import { goal } from "@/data/site";
import { toPercent } from "@/lib/utils";

const FLOATERS = [
  { className: "left-[4%] top-[14%] size-14 rounded-2xl bg-lime", tilt: "-12deg", delay: 0 },
  { className: "right-[6%] top-[10%] size-11 rounded-full bg-sky", tilt: "8deg", delay: 0.6 },
  { className: "left-[10%] bottom-[16%] size-9 rounded-xl bg-sun", tilt: "16deg", delay: 1.2 },
  { className: "right-[3%] bottom-[24%] size-16 rounded-[1.4rem] bg-flame/90", tilt: "-8deg", delay: 0.9 },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-flame/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 size-[28rem] rounded-full bg-sky/8 blur-3xl" />

      {/* floating printed shapes */}
      {!reduce &&
        FLOATERS.map((f, i) => (
          <span
            key={i}
            aria-hidden
            className={`pointer-events-none absolute hidden animate-[float_6s_ease-in-out_infinite] opacity-90 shadow-[var(--shadow-soft)] lg:block ${f.className}`}
            style={{ ["--tilt" as string]: f.tilt, animationDelay: `${f.delay}s` }}
          />
        ))}

      <div className="container-hla relative grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
        {/* ---- copy --------------------------------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-2 text-ink-2 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-flame" />
            </span>
            Young Maker Startup · Est. 2025
          </span>

          <h1 className="display mt-7 text-[clamp(2.75rem,8vw,5.25rem)]">
            THREE BROTHERS.
            <br />
            ONE 3D LAB.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2 sm:text-xl">
            We turn small ideas into real things.
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink-3">
            Ba anh em. Một xưởng sáng tạo. Vô số ý tưởng — và một chiếc máy in 3D chạy gần như mỗi ngày.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/shop"
              className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-flame px-8 font-display text-base font-bold tracking-tight text-white shadow-[var(--shadow-flame)] hover:bg-flame-2"
            >
              SHOP OUR CREATIONS
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="#makers"
              className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-ink px-7 font-display text-base font-bold tracking-tight text-ink hover:bg-ink hover:text-paper"
            >
              <Users className="size-5" />
              MEET THE MAKERS
            </Link>
          </div>

          {/* live goal strip */}
          <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur sm:max-w-md">
            <div className="shrink-0">
              <p className="font-display text-2xl leading-none font-bold tracking-tight">
                {goal.current}
                <span className="text-ink-3">/{goal.target}</span>
              </p>
              <p className="eyebrow mt-1.5 text-ink-3">Customers</p>
            </div>
            <div className="flex-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-paper-2">
                <motion.div
                  className="h-full rounded-full bg-flame"
                  initial={{ width: 0 }}
                  animate={{ width: `${toPercent(goal.current, goal.target)}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-2 text-xs leading-snug text-ink-2">
                Helping three young makers reach their first 100 customers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ---- scene -------------------------------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[var(--radius-xl2)] border border-line bg-surface p-4 shadow-[var(--shadow-lift)] sm:p-6">
            <MakerDesk />
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-line bg-paper/90 px-3 py-1.5 backdrop-blur sm:left-8 sm:top-8">
              <span className="size-2 animate-[pulse-dot_1.8s_ease-in-out_infinite] rounded-full bg-flame" />
              <span className="eyebrow text-ink-2">Printer #01 · Printing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
