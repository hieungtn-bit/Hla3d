"use client";

import * as React from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, PenTool, Layers, Send } from "lucide-react";
import { SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "NGHĨ RA",
    en: "We think of something cool.",
    vi: "Tụi em nghĩ ra một món hay ho — thường là lúc đang ăn cơm tối.",
    icon: Lightbulb,
    color: "bg-sun",
  },
  {
    n: "02",
    title: "VẼ RA",
    en: "We draw it or customize a 3D model.",
    vi: "Vẽ ra giấy trước, rồi mới dựng mô hình 3D trên máy tính.",
    icon: PenTool,
    color: "bg-sky",
  },
  {
    n: "03",
    title: "IN RA",
    en: "Our 3D printer builds it layer by layer.",
    vi: "Máy in xếp từng lớp nhựa chồng lên nhau. Mỗi lớp dày 0,2mm thôi.",
    icon: Layers,
    color: "bg-flame",
  },
  {
    n: "04",
    title: "GỬI ĐI",
    en: "We test it, improve it and send it to you.",
    vi: "Thử làm rơi, sửa lại, thử tiếp — rồi bỏ hộp gửi cho bạn.",
    icon: Send,
    color: "bg-lime",
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
    <section ref={ref} className="border-t-2 border-ink bg-paper-2 py-20 sm:py-28">
      <div className="container-hla">
        <SectionHeader
          index="02"
          eyebrow="HLA3D làm việc thế nào"
          title={
            <>
              BỐN BƯỚC,
              <br />
              TỪNG LỚP MỘT.
            </>
          }
          description="Không có món nào mua sẵn về bán lại. Mỗi món bắt đầu từ một ý tưởng trong nhà này, và kết thúc là một cục nhựa do tụi em tự in ra."
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
                    "flex gap-5 rounded-[var(--radius-card)] border-2 p-5 transition-all duration-500 sm:p-6",
                    isActive
                      ? "border-ink bg-surface shadow-[var(--shadow-sticker)]"
                      : "border-transparent bg-transparent",
                  )}
                >
                  <div
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-2xl border-2 transition-colors duration-500",
                      isActive ? `${step.color} border-ink text-ink` : "border-ink/15 bg-ink/5 text-ink-3",
                    )}
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className={cn("font-mono text-xs transition-colors", isActive ? "text-flame" : "text-ink-3")}>
                        {step.n}
                      </span>
                      <h3 className="font-display text-2xl font-extrabold">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed font-bold text-ink">{step.vi}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-3">{step.en}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ---- layer build visual ----------------------------------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="sticker relative overflow-hidden rounded-[var(--radius-xl2)] bg-carbon p-6 sm:p-8">
              <div className="grid-carbon pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-white/50">Máy đang in thử</span>
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
                  <p className="mt-1 text-sm text-white/60">{STEPS[activeStep].vi}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-ink-3">
              Kéo xuống để xem máy in xây từng lớp. Món nào của HLA3D cũng ra đời như vậy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
