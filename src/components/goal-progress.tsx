"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { goal } from "@/data/site";
import { toPercent } from "@/lib/utils";

export function GoalProgress() {
  const reduce = useReducedMotion();
  const pct = toPercent(goal.current, goal.target);
  const cells = Array.from({ length: goal.target });

  return (
    <section className="relative overflow-hidden border-y border-line bg-ink py-20 text-paper sm:py-28">
      <div className="grid-carbon pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-flame/15 blur-3xl" />

      <div className="container-hla relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <span className="eyebrow text-flame">Mục tiêu · 2025</span>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.5rem)] text-white">
              GIÚP BA ANH EM CHẠM MỐC 100 KHÁCH ĐẦU TIÊN.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
              Không phải 100.000 người theo dõi. Không phải một vòng gọi vốn. Chỉ là một trăm người thật, trả
              tiền thật, cho một món do ba anh em tự thiết kế, tự in, tự kiểm tra và tự đóng gói.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/40">
              Mỗi khách hàng là một bài học: về thiết kế, về giá, về lời hứa giao hàng đúng hẹn.
            </p>

            <Link
              href="/shop"
              className="tactile mt-9 inline-flex h-14 items-center gap-2 rounded-full bg-flame px-8 font-display text-base font-bold tracking-tight text-white shadow-[var(--shadow-flame)] hover:bg-flame-2"
            >
              LÀM KHÁCH SỐ {goal.current + 1}
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <div>
                <p className="display text-[clamp(3.5rem,10vw,5.5rem)] text-white">
                  {goal.current}
                  <span className="text-white/25">/{goal.target}</span>
                </p>
                <p className="eyebrow mt-2 text-white/40">Khách hàng từ {goal.startedAt}</p>
              </div>
              <p className="font-mono text-sm text-flame">{pct}%</p>
            </div>

            {/* 100 cells — one per customer */}
            <div className="mt-8 grid grid-cols-10 gap-1.5 sm:gap-2">
              {cells.map((_, i) => {
                const filled = i < goal.current;
                const isNext = i === goal.current;
                return (
                  <motion.span
                    key={i}
                    className={
                      filled
                        ? "aspect-square rounded-[4px] bg-flame"
                        : isNext
                          ? "aspect-square rounded-[4px] border border-dashed border-flame/70 bg-flame/15"
                          : "aspect-square rounded-[4px] bg-white/8"
                    }
                    initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.008, 0.8) }}
                    title={filled ? `Khách số ${i + 1}` : isNext ? "Ô này có thể là bạn" : undefined}
                  />
                );
              })}
            </div>

            <p className="mt-5 text-xs leading-relaxed text-white/40">
              Mỗi ô cam là một đơn hàng thật, được vẽ, in, kiểm tra và đóng gói ngay tại nhà. Ô nét đứt là
              đơn tiếp theo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
