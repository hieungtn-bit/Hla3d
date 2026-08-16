import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { MakerCard } from "@/components/home/maker-card";
import { DadSection } from "@/components/home/dad-section";
import { MoneyBreakdown } from "@/components/money-breakdown";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { makers } from "@/data/makers";
import { safetyRules } from "@/data/lab";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Our Story",
  description:
    "HLA3D started with one 3D printer in the house and three curious brothers. This is how a family project became a small business.",
};

const TIMELINE = [
  {
    date: "Tháng 3, 2025",
    title: "The printer arrives",
    text: "An Anycubic Kobra X on the dining table. The first print is a slightly wrong calibration cube.",
  },
  {
    date: "Tháng 4, 2025",
    title: "Six failed octopuses",
    text: "The first serious attempt at a print-in-place toy. Version seven finally moves.",
  },
  {
    date: "Tháng 5, 2025",
    title: "Customer #01",
    text: "A Desk Buddy, 79.000đ, sold to someone who is not a relative. She asked a question we could not answer.",
  },
  {
    date: "Tháng 6, 2025",
    title: "Twenty name plates",
    text: "A whole class of them. We learn what a checklist is for, and what our real capacity is.",
  },
  {
    date: "Tháng 7, 2025",
    title: "The costing spreadsheet",
    text: "Dad makes us count electricity, packaging, failures and machine wear. Our margin drops. Our honesty goes up.",
  },
  {
    date: "Tháng 8, 2025",
    title: "Customer #27",
    text: "Seventy-three to go. The goal has not moved: one hundred real customers before we buy a second printer.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chuyện của tụi em"
        title={
          <>
            Ý TƯỞNG NHỎ.
            <br />
            ĐIỀU THẬT.
          </>
        }
        description="HLA3D bắt đầu từ một chiếc máy in 3D trong nhà, và cái ngày ba anh em thôi đòi mua đồ chơi mà quay sang hỏi đồ chơi được làm ra thế nào."
        meta={[
          { label: "Bắt đầu", value: "2025" },
          { label: "Số anh em", value: "3" },
          { label: "Máy in", value: "1" },
        ]}
      />

      {/* ---- the story ------------------------------------------------- */}
      <Section className="bg-paper">
        <div className="container-hla grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-ink-3">Brand story</span>
            <h2 className="display mt-5 text-[clamp(1.75rem,4vw,2.75rem)]">
              FROM AN IDEA
              <br />
              TO A THING
              <br />
              YOU CAN HOLD.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-2">
            <p>
              HLA3D bắt đầu từ một chiếc máy in 3D trong nhà và sự tò mò của ba anh em. Thay vì chỉ chơi đồ
              chơi, các bạn nhỏ bắt đầu học cách tạo ra chúng.
            </p>
            <p>
              From an idea, to a drawing, to a spool of PLA, to a real object that can be held, dropped,
              tested and sold. Nothing in this shop was bought and re-labelled. Every product started as a
              sentence at a dinner table in this house.
            </p>
            <p>
              HLA3D là nơi ba anh em học sáng tạo, công nghệ, kinh doanh và giá trị của lao động. The
              printing is the fun part. The interesting part is what happens around it — working out what a
              thing costs, why a customer left, and how to say &ldquo;I don&rsquo;t know, I&rsquo;ll find
              out&rdquo;.
            </p>
            <p className="border-l-4 border-flame pl-5 font-display text-lg font-bold tracking-tight text-ink">
              HLA = three brothers. 3D = Design. Dream. Do.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- makers ---------------------------------------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <SectionHeader
            index="01"
            eyebrow="The team"
            title="THREE MAKERS, THREE JOBS."
            description="Names are kept private on purpose. What matters here is the work, not the faces."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {makers.map((maker, i) => (
              <Reveal key={maker.id} delay={i * 0.08}>
                <MakerCard maker={maker} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- timeline --------------------------------------------------- */}
      <Section className="border-t border-line">
        <div className="container-hla">
          <SectionHeader index="02" eyebrow="Timeline" title="SIX MONTHS, HONESTLY REPORTED." />
          <ol className="mt-14 space-y-0">
            {TIMELINE.map((item, i) => (
              <Reveal
                as="li"
                key={item.date}
                delay={i * 0.05}
                className="group grid gap-3 border-t border-line py-7 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <span className="font-mono text-xs text-flame">{item.date}</span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---- dad --------------------------------------------------------- */}
      <DadSection />

      {/* ---- safety ------------------------------------------------------- */}
      <Section id="safety" className="scroll-mt-20 border-t border-line bg-carbon text-white">
        <div className="container-hla">
          <SectionHeader
            index="03"
            eyebrow="Maker safety"
            tone="dark"
            title="WHO IS ALLOWED TO DO WHAT."
            description="The children do not operate hot equipment unsupervised. Anyone buying from HLA3D should know exactly where the line is drawn."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Dad only", items: safetyRules.dadOnly, dot: "bg-flame", text: "text-flame" },
              { title: "The makers can", items: safetyRules.makers, dot: "bg-lime", text: "text-lime" },
              { title: "House rules", items: safetyRules.house, dot: "bg-sky", text: "text-sky" },
            ].map((col, i) => (
              <Reveal
                key={col.title}
                delay={i * 0.08}
                className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6"
              >
                <span className={`eyebrow ${col.text}`}>{col.title}</span>
                <ul className="mt-5 space-y-3">
                  {col.items.map((rule) => (
                    <li key={rule} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                      <span className={`mt-2 size-1.5 shrink-0 rounded-full ${col.dot}`} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- money -------------------------------------------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <SectionHeader
            index="04"
            eyebrow="Money lesson"
            title="WHERE DOES THE MONEY GO?"
            description="We show the whole breakdown because working it out is the point. Nothing here is rounded up to look better."
          />
          <div className="mt-14">
            <MoneyBreakdown />
          </div>

          <Reveal className="mt-14 text-center">
            <Link
              href="/shop"
              className="tactile inline-flex h-14 items-center gap-2 rounded-full bg-flame px-8 font-display text-base font-bold tracking-tight text-white shadow-[var(--shadow-flame)] hover:bg-flame-2"
            >
              SHOP OUR CREATIONS
              <ArrowRight className="size-5" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
