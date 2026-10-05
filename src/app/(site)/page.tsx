import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, PiggyBank, Type } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { LearnCta } from "@/components/home/learn-cta";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { printLessons } from "@/data/print-corner";
import { TOTAL_WORDS, vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";
import { vietSkills } from "@/data/viet";

const STATS = [
  { icon: BookOpen, value: `${TOTAL_WORDS}`, label: "Từ tiếng Anh, có hình, có tiếng", color: "bg-sun" },
  { icon: Calculator, value: `${skills.length}`, label: "Bài toán, mẫu giáo đến lớp 3", color: "bg-sky" },
  { icon: PiggyBank, value: "0đ", label: "Học phí — không tài khoản, không quảng cáo", color: "bg-lime" },
  { icon: Type, value: `${vietSkills.length}`, label: "Bài tiếng Việt, mẫu giáo đến lớp 3", color: "bg-flame" },
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

  return (
    <>
      <Hero words={TOTAL_WORDS} sets={vocabSets.length} lessons={skills.length} vietLessons={vietSkills.length} word={peek} />
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

      {/* ---- the printer, for learning ------------------------------- */}
      <Section className="border-b-2 border-ink bg-paper-2">
        <div className="container-hla grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              index="01"
              eyebrow="Góc in 3D"
              title={
                <>
                  HỌC XONG
                  <br />
                  THÌ THỬ LÀM.
                </>
              }
              description="Nhà có một máy in 3D. Ba anh em tìm mẫu trên MakerWorld rồi in ra cùng người lớn — không để bán, mà để học: từ tiếng Anh, đo độ dài, xem giờ, an toàn, và ghi tên người làm ra mẫu."
            />
            <Link
              href="/goc-in-3d"
              className="tactile mt-8 inline-flex h-13 items-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
            >
              VÀO GÓC IN 3D
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-3">
            {printLessons.map((l, i) => (
              <Reveal as="li" key={l.href} delay={i * 0.06}>
                <Link href={l.href} className="sticker press flex items-center gap-4 rounded-[var(--radius-card)] bg-surface p-4">
                  <span className="min-w-0 flex-1">
                    <span className="eyebrow block text-ink-3">{l.subject}</span>
                    <span className="mt-1 block font-display text-base font-extrabold text-ink">{l.title}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-flame" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- closing CTA ---------------------------------------------------- */}
      <section className="border-t border-line bg-flame py-20 text-white sm:py-28">
        <div className="container-hla text-center">
          <Reveal>
            <p className="eyebrow text-white/80">Học mỗi ngày · Miễn phí</p>
            <h2 className="display mx-auto mt-6 max-w-3xl text-[clamp(2rem,5.5vw,3.75rem)] text-white">
              MỞ RA HỌC THỬ MỘT BÀI.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed font-semibold text-white/90 sm:text-lg">
              Không cần đăng ký, không cần tài khoản, không mất đồng nào. Mười phút một ngày tốt hơn
              năm tiếng dồn vào một buổi — nên mỗi bài ở đây chỉ vài phút.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              {[
                { href: "/hoc-tieng-viet", label: "LỚP TIẾNG VIỆT" },
                { href: "/hoc-toan", label: "LỚP TOÁN" },
                { href: "/hoc-tieng-anh", label: "LỚP TIẾNG ANH" },
              ].map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-7 font-display text-base font-bold tracking-tight text-ink hover:bg-paper"
                >
                  {b.label}
                  <ArrowRight className="size-5" />
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-bold text-white/85 underline underline-offset-4 hover:text-white"
            >
              Chuyện của tụi em
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
