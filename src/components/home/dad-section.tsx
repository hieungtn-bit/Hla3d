import Link from "next/link";
import { Banknote, HardHat, Lightbulb, Package, Plug, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const DAD_PROVIDES = [
  { icon: HardHat, label: "Machines", note: "The printer, the tools, the bench." },
  { icon: Package, label: "Materials", note: "Filament, boxes, packaging." },
  { icon: Plug, label: "Safety", note: "Anything hot, sharp or electrical." },
  { icon: Banknote, label: "Business guidance", note: "Pricing, promises, paperwork." },
];

const MAKERS_PROVIDE = [
  { icon: Lightbulb, label: "Ideas", note: "Usually more than the printer can keep up with." },
  { icon: Sparkles, label: "Curiosity", note: "Why did it fail? Ask again." },
  { icon: Sparkles, label: "Creativity", note: "Colours, shapes, names, characters." },
  { icon: Sparkles, label: "Energy", note: "At 6am, before school, checking the print." },
];

export function DadSection() {
  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="container-hla">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-ink-3">The investor</span>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.25rem)]">
              BACKED
              <br />
              BY DAD.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              Every startup needs its first investor. Ours happens to be Dad.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-3">
              He is not the boss of HLA3D and he does not design the products. He funds the machine, keeps
              everyone safe, and asks the annoying questions — <em>what does it cost, what did you promise,
              when will it be ready</em>.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm leading-relaxed text-ink-2">
                Dad handles electricity, hot machines, payments and grown-up problems. The makers handle
                everything a nine-year-old should be allowed to handle — and nothing they should not.
              </p>
              <Link
                href="/about#safety"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-tight text-flame hover:underline"
              >
                Read the safety rules →
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.05} className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 shadow-[var(--shadow-soft)]">
              <span className="eyebrow text-ink-3">Dad provides</span>
              <ul className="mt-5 space-y-4">
                {DAD_PROVIDES.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <item.icon className="mt-0.5 size-4 shrink-0 text-ink-3" />
                    <div>
                      <p className="font-display text-sm font-bold tracking-tight">{item.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-3">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="rounded-[var(--radius-card)] border border-flame/20 bg-flame-tint p-6">
              <span className="eyebrow text-flame-2">The makers provide</span>
              <ul className="mt-5 space-y-4">
                {MAKERS_PROVIDE.map((item, i) => (
                  <li key={`${item.label}-${i}`} className="flex gap-3">
                    <item.icon className="mt-0.5 size-4 shrink-0 text-flame" />
                    <div>
                      <p className="font-display text-sm font-bold tracking-tight text-ink">{item.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-2">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
