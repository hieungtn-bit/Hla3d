import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, Calculator, Clock3 } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { MakerCard } from "@/components/home/maker-card";
import { HowItWorks } from "@/components/home/how-it-works";
import { GiftCta } from "@/components/home/gift-cta";
import { WhyShop } from "@/components/home/why-shop";
import { LearnCta } from "@/components/home/learn-cta";
import { StartupSchool } from "@/components/home/startup-school";
import { DadSection } from "@/components/home/dad-section";
import { JournalPreview } from "@/components/home/journal-preview";
import { MoneyBreakdown } from "@/components/money-breakdown";
import { PrinterStatus } from "@/components/lab/printer-status";
import { ProductCard } from "@/components/products/product-card";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { makers } from "@/data/makers";
import { featuredSlugs, products } from "@/data/products";
import { printers, labStats } from "@/data/lab";
import { TOTAL_WORDS, vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";

const STATS = [
  { icon: BookOpen, value: `${TOTAL_WORDS}`, label: "Từ tiếng Anh, có hình, có tiếng", color: "bg-sun" },
  { icon: Calculator, value: `${skills.length}`, label: "Bài toán, mẫu giáo đến lớp 3", color: "bg-sky" },
  { icon: Boxes, value: "15", label: "Món ba anh em tự thiết kế", color: "bg-lime" },
  { icon: Clock3, value: "78h", label: "Giờ máy in chạy tháng này", color: "bg-flame" },
];

export default function HomePage() {
  // A real card from the real word list, picked here on the server so the
  // homepage never has to ship the whole 1000-word module to the browser.
  const pets = vocabSets.find((s) => s.id === "vat-nuoi");
  // Spread the wrong answers across the set rather than taking the next three.
  // The words next to "cat" are dog, puppy and kitten, which render as three
  // near-identical pictures — a demo of a question no child could answer
  // fairly, and a bad advertisement for how the real one picks distractors.
  const peek = {
    en: pets?.words[0][0] ?? "cat",
    vi: pets?.words[0][1] ?? "con mèo",
    icon: pets?.words[0][2] ?? "🐱",
    others: [9, 15, 20].map((i) => pets?.words[i][2] ?? "🐾"),
  };

  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Hero words={TOTAL_WORDS} sets={vocabSets.length} lessons={skills.length} word={peek} />
      <Marquee />

      {/* ---- numbers -------------------------------------------------- */}
      <section className="border-b-2 border-ink bg-paper-2 py-12">
        <div className="container-hla grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="sticker press flex h-full items-start gap-3 rounded-[var(--radius-card)] bg-surface p-4 sm:p-5">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink ${stat.color}`}
                >
                  <stat.icon className="size-4.5 text-ink" />
                </span>
                <div>
                  <p className="display text-3xl sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug font-semibold text-ink-2">{stat.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- the two classrooms ----------------------------------------- */}
      <LearnCta />

      {/* ---- meet the makers ------------------------------------------ */}
      <Section id="makers" className="scroll-mt-20">
        <div className="container-hla">
          <SectionHeader
            index="01"
            eyebrow="Gặp 3 anh em"
            title={
              <>
                BA NGƯỜI.
                <br />
                BA VIỆC KHÁC NHAU.
              </>
            }
            description="Công ty HLA3D có đúng ba nhân viên. Không ai làm hết mọi thứ — mỗi bạn giữ một phần và phải tự bảo vệ phần của mình khi Ba hỏi khó."
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

      {/* ---- startup school -------------------------------------------- */}
      <StartupSchool />

      {/* ---- why a classroom has a shop --------------------------------- */}
      <WhyShop />

      {/* ---- shop preview ---------------------------------------------- */}
      <Section className="border-t border-line">
        <div className="container-hla">
          <SectionHeader
            index="02"
            eyebrow="Cửa hàng"
            title={
              <>
                ĐỒ TỤI EM
                <br />
                TỰ LÀM THẬT.
              </>
            }
            description="Không món nào mua về bán lại. Tất cả đều được vẽ ở đây, in trên đúng một cái máy trong một căn phòng, và cầm lên kiểm tra trước khi bỏ vào hộp."
            action={
              <Link
                href="/shop"
                className="tactile inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
              >
                XEM CẢ 15 MÓN
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

      {/* ---- gift finder ------------------------------------------------ */}
      <GiftCta />

      {/* ---- the lab ---------------------------------------------------- */}
      <Section className="bg-paper-2">
        <div className="container-hla">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                index="03"
                eyebrow="Xưởng in"
                title={
                  <>
                    MỘT CÁI MÁY.
                    <br />
                    CHẠY GẦN NHƯ MỖI NGÀY.
                  </>
                }
                description="Một chiếc Anycubic Kobra X đặt ở góc nhà. Đó là toàn bộ nhà máy của tụi em — nên tụi em chỉ dám hứa đúng số món mà máy in kịp."
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
                THAM QUAN XƯỞNG
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
            index="04"
            eyebrow="Bài học tiền bạc"
            title="TIỀN CHẠY ĐI ĐÂU HẾT?"
            description="Hầu hết cửa hàng giấu chuyện này. Tụi em bày ra hết, vì tự tính được số tiền còn lại mới là điều Ba muốn ba anh em học."
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
            index="05"
            eyebrow="Nhật ký"
            title="TUẦN NÀY TỤI EM HỌC ĐƯỢC GÌ."
            description="Chuyện làm được, chuyện làm hỏng, và giá thật của một lần in — do ba anh em tự viết, Ba chỉ sửa lỗi chính tả."
            action={
              <Link
                href="/journal"
                className="tactile inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink px-6 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
              >
                ĐỌC NHẬT KÝ
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
            <p className="eyebrow text-white/80">Học mỗi ngày · Làm thật cuối tuần</p>
            <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] text-white">
              MỞ RA HỌC THỬ MỘT BÀI.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed font-semibold text-white/90 sm:text-lg">
              Không cần đăng ký, không cần tài khoản, không mất đồng nào. Mười phút một ngày ăn đứt
              năm tiếng một tháng — đó là lý do ba anh em học ở đây mỗi ngày.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/hoc-tieng-anh"
                className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-display text-base font-bold tracking-tight text-ink hover:bg-paper"
              >
                LỚP TIẾNG ANH
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/hoc-toan"
                className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 font-display text-base font-bold tracking-tight text-ink hover:bg-paper"
              >
                LỚP TOÁN
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/about"
                className="tactile inline-flex h-14 items-center justify-center rounded-full border-2 border-white/70 px-8 font-display text-base font-bold tracking-tight text-white hover:bg-white/10"
              >
                CHUYỆN CỦA TỤI EM
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
