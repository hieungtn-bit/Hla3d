"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, PenTool, Layers, Send } from "lucide-react";
import { SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "DREAM",
    en: "We think of something cool.",
    vi: "Tụi em nghĩ ra một thứ hay ho — thường là trong bữa tối.",
    icon: Lightbulb,
  },
  {
    n: "02",
    title: "DESIGN",
    en: "We draw it or customize a 3D model.",
    vi: "Vẽ tay trước, rồi dựng hoặc chỉnh mô hình 3D trên máy tính.",
    icon: PenTool,
  },
  {
    n: "03",
    title: "PRINT",
    en: "Our 3D printer builds it layer by layer.",
    vi: "Máy in xây từng lớp một. Một lớp dày 0,2mm.",
    icon: Layers,
  },
  {
    n: "04",
    title: "SHARE",
    en: "We test it, improve it and send it to you.",
    vi: "Thử, sửa, thử lại — rồi đóng gói gửi đến bạn.",
    icon: Send,
  },
];

const TOTAL_LAYERS = 26;

export function HowItWorks() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const layerCount = useTransform(scrollYProgress, [0, 1], [0, TOTAL_LAYERS]);
  const [built, setBuilt] = React.useState(reduce ? TOTAL_LAYERS : 0);

  useMotionValueEvent(layerCount, "change", (v) => {
    if (!reduce) setBuilt(Math.round(v));
  });

  const activeStep = Math.min(3, Math.floor((built / TOTAL_LAYERS) * 4));

  return (
    <section ref={ref} className="border-t border-line bg-paper-2 py-20 sm:py-28">
      <div className="container-hla">
        <SectionHeader
          index="02"
          eyebrow="How HLA3D works"
          title={
            <>
              FOUR STEPS,
              <br />
              ONE LAYER AT A TIME.
            </>
          }
          description="Nothing here is bought and re-sold. Every object starts as an idea in this house and ends as plastic we printed ourselves."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          {/* ---- steps ------------------------------------------------ */}
          <ol className="space-y-3">
            {STEPS.map((step, i) => {
              const isActive = i <= activeStep;
              const Icon = step.icon;
              return (
                <li
                  key={step.n}
                  className={cn(
                    "flex gap-5 rounded-[var(--radius-card)] border p-5 transition-all duration-500 sm:p-6",
                    isActive
                      ? "border-line-soft bg-surface shadow-[var(--shadow-soft)]"
                      : "border-transparent bg-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-2xl transition-colors duration-500",
                      isActive ? "bg-flame text-white" : "bg-ink/6 text-ink-3",
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className={cn("font-mono text-xs transition-colors", isActive ? "text-flame" : "text-ink-3")}>
                        {step.n}
                      </span>
                      <h3 className="font-display text-xl font-bold tracking-tight">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{step.en}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-3">{step.vi}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ---- layer build visual ----------------------------------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[var(--radius-xl2)] border border-line bg-carbon p-6 sm:p-8">
              <div className="grid-carbon pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-white/40">Live slice preview</span>
                  <span className="font-mono text-xs text-flame">
                    {String(built).padStart(2, "0")}/{TOTAL_LAYERS}
                  </span>
                </div>

                <div className="mt-8 flex h-64 flex-col-reverse items-center justify-start gap-[3px]">
                  {Array.from({ length: TOTAL_LAYERS }, (_, i) => {
                    const visible = i < built;
                    // A rough vase silhouette: wide base, pinched waist, flared lip.
                    const t = i / (TOTAL_LAYERS - 1);
                    const width = 46 + Math.sin(t * Math.PI) * 26 + t * 34;
                    return (
                      <motion.span
                        key={i}
                        className="block h-[6px] rounded-[2px]"
                        style={{
                          width: `${width}%`,
                          background: `linear-gradient(90deg, #ff4a17, #ff8b5e)`,
                        }}
                        initial={false}
                        animate={{
                          opacity: visible ? 1 : 0.06,
                          scaleX: visible ? 1 : 0.75,
                        }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      />
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-carbon-line pt-5">
                  <p className="font-display text-lg font-bold tracking-tight text-white">
                    {STEPS[activeStep].title}
                  </p>
                  <p className="mt-1 text-sm text-white/50">{STEPS[activeStep].en}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-ink-3">
              Scroll to watch a print build. This is how every HLA3D product is made.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
