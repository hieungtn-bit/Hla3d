"use client";

import * as React from "react";
import { Search, Palette, Layers, Hand } from "lucide-react";
import { SectionHeader } from "@/components/section";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "TÌM MẪU",
    en: "Find a model on MakerWorld.",
    vi: "Cùng người lớn tìm một mẫu 3D trên MakerWorld. Mẫu là của các nhà thiết kế ở đó — tụi em chưa tự vẽ được.",
    icon: Search,
    color: "bg-sun",
  },
  {
    n: "02",
    title: "CHỌN MÀU",
    en: "Pick a colour.",
    vi: "Chọn cuộn nhựa màu gì cho món đó.",
    icon: Palette,
    color: "bg-sky",
  },
  {
    n: "03",
    title: "IN RA",
    en: "The printer builds it layer by layer.",
    vi: "Máy in xếp từng lớp nhựa mỏng chồng lên nhau cho tới khi thành món đồ.",
    icon: Layers,
    color: "bg-flame",
  },
  {
    n: "04",
    title: "LẤY RA",
    en: "Wait for it to cool, then take it off.",
    vi: "Đợi bàn in nguội rồi người lớn lấy món in ra. Cầm lên xem: có giống mẫu không?",
    icon: Hand,
    color: "bg-lime",
  },
];

const TOTAL_LAYERS = 26;

export function HowPrintingWorks() {
  const ref = React.useRef<HTMLElement>(null);
  const [built, setBuilt] = React.useState(0);

  // Layers build as the section scrolls through the viewport: none when its
  // top is 85% of the way down the screen, all of them when its bottom
  // reaches 35%. With reduced motion the print is simply finished.
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      if (reduce) return setBuilt(TOTAL_LAYERS);
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (0.85 * vh - r.top) / (0.5 * vh + r.height)));
      setBuilt(Math.round(progress * TOTAL_LAYERS));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    if (reduce) return () => cancelAnimationFrame(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const activeStep = Math.min(3, Math.floor((built / TOTAL_LAYERS) * 4));

  return (
    <section ref={ref} className="border-t-2 border-ink bg-paper-2 py-20 sm:py-28">
      <div className="container-hla">
        <SectionHeader
          index="02"
          eyebrow="Một lần in diễn ra thế nào"
          title={
            <>
              BỐN BƯỚC,
              <br />
              TỪNG LỚP MỘT.
            </>
          }
          description="Ba anh em chưa tự thiết kế được. Việc tụi em làm được bây giờ là tìm mẫu có sẵn trên MakerWorld và in ra cùng người lớn."
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
                  <span className="eyebrow text-white/50">Máy in xếp từng lớp</span>
                  <span className="font-mono text-xs text-sun">
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
                      <span
                        key={i}
                        className="block h-[6px] rounded-[2px] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          width: `${width}%`,
                          background: `linear-gradient(90deg, #ff4a17, #ff8b5e)`,
                          opacity: visible ? 1 : 0.06,
                          transform: visible ? "none" : "scaleX(0.75)",
                        }}
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
              Kéo xuống để xem máy in xếp từng lớp. Hình minh hoạ, không phải máy thật đang chạy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
