"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Doodle, DoodleField } from "@/components/brand/doodle";
import { LessonPeek } from "@/components/home/lesson-peek";
import { MakerAvatar } from "@/components/brand/maker-avatar";
import { makers } from "@/data/makers";

const DOODLES = [
  { kind: "star" as const, className: "left-[3%] top-[12%] size-10 text-sun", tilt: "-12deg", animate: "twinkle" as const },
  { kind: "sparkle" as const, className: "right-[5%] top-[8%] size-12 text-flame", tilt: "8deg", animate: "twinkle" as const },
  { kind: "squiggle" as const, className: "left-[8%] bottom-[14%] size-14 text-sky", tilt: "-6deg", animate: "none" as const },
  { kind: "spiral" as const, className: "right-[2%] bottom-[28%] size-12 text-grape", tilt: "10deg", animate: "wiggle" as const },
  { kind: "zigzag" as const, className: "left-[46%] top-[4%] size-10 text-lime", tilt: "0deg", animate: "none" as const },
  { kind: "heart" as const, className: "right-[38%] bottom-[6%] size-9 text-rose", tilt: "14deg", animate: "bob" as const },
];

type PeekWord = { en: string; vi: string; icon: string; others: string[] };

export function Hero({
  words,
  sets,
  lessons,
  word,
}: {
  words: number;
  sets: number;
  lessons: number;
  word: PeekWord;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-sun/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-40 size-[28rem] rounded-full bg-sky/20 blur-3xl" />

      {!reduce && <DoodleField items={DOODLES} className="hidden lg:block" />}

      <div className="container-hla relative grid items-center gap-12 py-12 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-16">
        {/* ---- copy --------------------------------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="sticker inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 font-display text-sm font-extrabold text-ink">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full border-2 border-ink bg-flame" />
            </span>
            Lớp học miễn phí · Xưởng in thật · 2025
          </span>

          <h1 className="display mt-6 text-[clamp(2.75rem,8.5vw,5.5rem)]">
            HỌC MỖI NGÀY.
            <br />
            LÀM{" "}
            <span className="relative inline-block">
              <span className="relative z-10">THẬT.</span>
              <span
                className="absolute -inset-x-2 bottom-1 z-0 h-4 -rotate-1 rounded-full bg-lime"
                aria-hidden
              />
            </span>
          </h1>

          <p className="mt-6 max-w-md text-xl leading-relaxed font-bold text-ink">
            Lớp tiếng Anh và lớp toán của ba anh em. Mở cho tất cả, miễn phí.
          </p>
          <p className="mt-3 max-w-md text-base leading-relaxed text-ink-2">
            Hưng 8 tuổi, Long 6 tuổi và Anh 5 tuổi học ở đây mỗi ngày. Cuối tuần rảnh thì ba anh em
            vẽ và in đồ bán — chỗ đó là để những gì học được có việc mà dùng.
          </p>

          {/* the three of them, small and up front */}
          <div className="mt-7 flex items-center gap-4">
            <div className="flex -space-x-4">
              {makers.map((m) => (
                <span
                  key={m.id}
                  title={`${m.name} · ${m.age} tuổi`}
                  className="grid size-14 place-items-center overflow-hidden rounded-full border-2 border-ink bg-surface"
                  style={{ boxShadow: "0 3px 0 0 var(--color-ink)" }}
                >
                  <span className="mt-2 w-12">
                    <MakerAvatar role={m.id} />
                  </span>
                </span>
              ))}
            </div>
            <p className="text-sm leading-snug font-bold text-ink-2">
              Hưng · Long · Anh
              <br />
              <span className="font-normal text-ink-3">H + L + A = HLA3D</span>
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/hoc-tieng-anh"
              className="sticker press inline-flex h-14 items-center justify-center gap-2 rounded-full bg-flame px-8 font-display text-lg font-extrabold text-white"
            >
              HỌC TIẾNG ANH
              <ArrowRight className="size-5" />
            </Link>
            <Link
              href="/hoc-toan"
              className="sticker press inline-flex h-14 items-center justify-center gap-2 rounded-full bg-sky px-7 font-display text-lg font-extrabold text-ink"
            >
              HỌC TOÁN
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <ul className="sticker mt-9 grid grid-cols-3 gap-1 rounded-2xl bg-surface p-4 sm:max-w-md">
            {[
              { n: words.toLocaleString("vi-VN"), l: "từ tiếng Anh" },
              { n: lessons, l: "bài toán" },
              { n: "0đ", l: "học phí" },
            ].map((x) => (
              <li key={x.l} className="text-center">
                <p className="display text-2xl leading-none sm:text-3xl">{x.n}</p>
                <p className="mt-1.5 text-xs leading-snug font-semibold text-ink-2">{x.l}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-md text-xs font-semibold text-ink-3">
            {sets} chủ đề từ vựng · mẫu giáo đến lớp 3 · không cần tài khoản
          </p>
        </motion.div>

        {/* ---- what is actually inside -------------------------------- */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <LessonPeek word={word} />
          <Doodle
            kind="arrow"
            color="#ff4a17"
            className="absolute -bottom-6 -left-8 hidden size-16 -rotate-12 lg:block"
          />
        </motion.div>
      </div>
    </section>
  );
}
