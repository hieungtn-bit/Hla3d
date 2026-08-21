import Link from "next/link";
import { ArrowRight, Gift, MousePointerClick, Sparkles } from "lucide-react";
import { Doodle } from "@/components/brand/doodle";
import { Reveal } from "@/components/motion/reveal";

/**
 * Entry point to /chon-qua.
 *
 * The finder only earns its keep if the person who needs it — a parent who
 * does not know which of fifteen things to buy — meets it before the grid of
 * fifteen things. So this band sits directly above the shop preview, and it
 * promises the one thing that decides whether a tired adult starts: no typing.
 */
const STEPS = [
  { icon: MousePointerClick, label: "Tặng cho ai?", tone: "bg-sky" },
  { icon: Gift, label: "Bao nhiêu tiền?", tone: "bg-lime" },
  { icon: Sparkles, label: "Muốn món thế nào?", tone: "bg-flame" },
];

export function GiftCta() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-sun py-14 sm:py-20">
      <Doodle kind="star" className="absolute top-6 left-[6%] hidden size-10 text-ink/25 sm:block" />
      <Doodle kind="spiral" className="absolute right-[7%] bottom-8 hidden size-12 text-ink/20 sm:block" />

      <div className="container-hla relative">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="eyebrow text-ink/70">Chọn quà giúp em</p>
              <h2 className="display mt-4 text-[clamp(1.9rem,5vw,3.25rem)]">
                KHÔNG BIẾT CHỌN MÓN NÀO?
                <br />
                ĐỂ TỤI EM CHỌN GIÚP.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed font-semibold text-ink/80">
                Ba câu hỏi, ba lần bấm, không phải gõ một chữ nào. Tụi em chọn ra ba món hợp
                nhất — và nói luôn vì sao lại chọn món đó.
              </p>
              <Link
                href="/chon-qua"
                className="tactile mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-7 font-display text-base font-bold tracking-tight text-paper hover:bg-flame"
              >
                CHỌN QUÀ GIÚP EM
                <ArrowRight className="size-5" />
              </Link>
            </div>

            <ol className="grid gap-3">
              {STEPS.map((step, i) => (
                <li
                  key={step.label}
                  className="sticker flex items-center gap-4 rounded-[var(--radius-card)] bg-surface p-4"
                >
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl border-2 border-ink ${step.tone}`}
                  >
                    <step.icon className="size-5 text-ink" />
                  </span>
                  <span className="display text-2xl text-ink-3">{i + 1}</span>
                  <span className="font-display text-base font-bold tracking-tight">{step.label}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
