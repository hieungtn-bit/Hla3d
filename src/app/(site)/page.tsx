import Link from "next/link";
import { ArrowRight, Boxes, Clock3, Flame, PackageCheck } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { MakerCard } from "@/components/home/maker-card";
import { HowItWorks } from "@/components/home/how-it-works";
import { DadSection } from "@/components/home/dad-section";
import { JournalPreview } from "@/components/home/journal-preview";
import { GoalProgress } from "@/components/goal-progress";
import { MoneyBreakdown } from "@/components/money-breakdown";
import { PrinterStatus } from "@/components/lab/printer-status";
import { ProductCard } from "@/components/products/product-card";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { makers } from "@/data/makers";
import { featuredSlugs, products } from "@/data/products";
import { printers, labStats } from "@/data/lab";

const STATS = [
  { icon: Boxes, value: "15", label: "Products designed" },
  { icon: Clock3, value: "78h", label: "Print hours this month" },
  { icon: Flame, value: "2.4kg", label: "PLA turned into things" },
  { icon: PackageCheck, value: "31", label: "Products shipped" },
];

export default function HomePage() {
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Hero />
      <Marquee />

      {/* ---- numbers -------------------------------------------------- */}
      <section className="border-b border-line bg-paper py-12">
        <div className="container-hla grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="flex items-start gap-3">
              <stat.icon className="mt-1 size-5 shrink-0 text-flame" />
              <div>
                <p className="display text-3xl sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-ink-3">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- meet the makers ------------------------------------------ */}
      <Section id="makers" className="scroll-mt-20">
        <div className="container-hla">
          <SectionHeader
            index="01"
            eyebrow="Meet the makers"
            title={
              <>
                THREE PEOPLE.
                <br />
                THREE JOBS.
              </>
            }
            description="HLA3D has a org chart, and it fits on one line. Nobody does everything, which is exactly the point — each brother owns a part of the product and has to defend it."
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

      {/* ---- how it works --------------------------------------------- */}
      <HowItWorks />

      {/* ---- shop preview ---------------------------------------------- */}
      <Section className="border-t border-line">
        <div className="container-hla">
          <SectionHeader
            index="03"
            eyebrow="The shop"
            title={
              <>
                THINGS WE
                <br />
                ACTUALLY MADE.
              </>
            }
            description="Every product on this page exists. It was drawn here, sliced here, printed on one machine in one room, and checked by hand before it went in a box."
            action={
              <Link
                href="/shop"
                className="tactile inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
              >
                SEE ALL 15
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.06}>
                <ProductCard product={product} className="h-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- first 100 customers --------------------------------------- */}
      <GoalProgress />

      {/* ---- the lab ---------------------------------------------------- */}
      <Section className="bg-paper-2">
        <div className="container-hla">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                index="04"
                eyebrow="The lab"
                title={
                  <>
                    ONE MACHINE.
                    <br />
                    RUNNING MOST DAYS.
                  </>
                }
                description="An Anycubic Kobra X on a bench in the corner of the house. It is the whole factory, and it is why we can only promise what we can actually print."
              />
              <dl className="mt-10 grid grid-cols-2 gap-6">
                {labStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="eyebrow text-ink-3">{stat.label}</dt>
                    <dd className="display mt-2 text-2xl">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/lab"
                className="tactile mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-display text-sm font-bold tracking-tight text-paper hover:bg-flame"
              >
                VISIT THE MINI FACTORY
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <Reveal delay={0.1}>
              <PrinterStatus printer={printers[0]} />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---- money lesson ------------------------------------------------ */}
      <Section className="border-t border-line">
        <div className="container-hla">
          <SectionHeader
            index="05"
            eyebrow="Money lesson"
            title="WHERE DOES THE MONEY GO?"
            description="This is the part most shops hide. We show it because working it out is half of what the makers are here to learn."
          />
          <div className="mt-14">
            <MoneyBreakdown />
          </div>
        </div>
      </Section>

      {/* ---- backed by dad ------------------------------------------------ */}
      <DadSection />

      {/* ---- journal ------------------------------------------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <SectionHeader
            index="06"
            eyebrow="The maker journal"
            title="WHAT WE LEARNED THIS WEEK."
            description="Wins, failures and the real cost of a print — written by the makers, lightly spell-checked by Dad."
            action={
              <Link
                href="/journal"
                className="tactile inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
              >
                READ THE JOURNAL
                <ArrowRight className="size-4" />
              </Link>
            }
          />
          <JournalPreview />
        </div>
      </Section>

      {/* ---- closing CTA ---------------------------------------------------- */}
      <section className="border-t border-line bg-flame py-20 text-white sm:py-28">
        <div className="container-hla text-center">
          <Reveal>
            <p className="eyebrow text-white/70">Dream it. Design it. Print it.</p>
            <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] text-white">
              PUT YOUR NAME ON SOMETHING WE PRINTED.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Ý tưởng nhỏ. Tạo nên điều thật. Start with a name plate — it is where nearly everyone starts.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/custom"
                className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-display text-base font-bold tracking-tight text-ink hover:bg-paper"
              >
                MAKE IT YOURS
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/about"
                className="tactile inline-flex h-14 items-center justify-center rounded-full border-2 border-white/70 px-8 font-display text-base font-bold tracking-tight text-white hover:bg-white/10"
              >
                OUR STORY
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
