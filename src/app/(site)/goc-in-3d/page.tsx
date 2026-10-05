import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { HowPrintingWorks } from "@/components/print/how-printing-works";
import { MakerDesk } from "@/components/brand/maker-desk";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { printLessons, prints } from "@/data/print-corner";
import { safetyRules } from "@/data/safety";

export const metadata: Metadata = {
  alternates: { canonical: "/goc-in-3d" },
  title: "Góc in 3D",
  description:
    "Máy in 3D ở nhà là để học, không để bán. Ba anh em tìm mẫu trên MakerWorld, in ra cùng người lớn, và học từ đó: từ tiếng Anh, đo độ dài, xem giờ, an toàn, và ghi tên người làm ra mẫu.",
};

export default function PrintCornerPage() {
  return (
    <>
      <PageIntro
        eyebrow="Góc in 3D"
        title={
          <>
            IN 3D ĐỂ HỌC.
            <br />
            KHÔNG ĐỂ BÁN.
          </>
        }
        description="Nhà có một máy in 3D. Ba anh em chưa tự thiết kế được: các bé tìm mẫu có sẵn trên MakerWorld và in ra cùng người lớn. Ở đây không bán gì — máy in là một cách nữa để học."
        meta={[
          { label: "Máy in", value: "1" },
          { label: "Mẫu 3D", value: "MakerWorld" },
          { label: "Bán hàng", value: "Không" },
        ]}
      />

      {/* ---- what the printer teaches ---------------------------------- */}
      <Section className="bg-paper">
        <div className="container-hla">
          <SectionHeader
            index="01"
            eyebrow="Máy in dạy được gì"
            title={
              <>
                HỎI NGƯỢC
                <br />
                Ở CẠNH MÁY IN.
              </>
            }
            description="Đứng chờ máy in là lúc hợp để hỏi. Mỗi thẻ dưới đây là một câu hỏi mẫu, kèm bài học trên trang để tập cho chắc."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2">
            {printLessons.map((l, i) => (
              <Reveal as="li" key={l.href} delay={i * 0.06}>
                <Link
                  href={l.href}
                  className="sticker press group flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-6"
                >
                  <span className="eyebrow text-ink-3">{l.subject}</span>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed font-bold text-ink">“{l.question}”</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 font-display text-sm font-extrabold text-flame">
                    Bài: {l.title}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- one print, step by step ------------------------------------ */}
      <HowPrintingWorks />

      {/* ---- whose model is it ------------------------------------------- */}
      <Section className="border-t border-line bg-paper">
        <div className="container-hla grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <SectionHeader
              index="03"
              eyebrow="Mẫu của ai?"
              title={
                <>
                  MẪU CỦA AI
                  <br />
                  THÌ GHI TÊN NGƯỜI ĐÓ.
                </>
              }
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed font-semibold text-ink-2">
              <p>
                Mỗi mẫu 3D trên MakerWorld là công sức của một người thật. In mẫu của ai thì mình nhớ tên
                người đó, và không nói là mình tự làm ra.
              </p>
              <p>
                Mỗi mẫu còn có giấy phép riêng, ghi ở trang của mẫu. Người lớn đọc giúp: có mẫu chỉ cho in
                để dùng trong nhà, có mẫu cho phép nhiều hơn. In để học và chơi trong nhà thì hầu hết mẫu
                đều được.
              </p>
              <p className="text-ink">
                Đến ngày các bé tự vẽ được một mẫu, mẫu đó sẽ mang tên các bé.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="sticker-lg relative overflow-hidden rounded-[var(--radius-card)] bg-surface p-4 sm:p-6">
              <MakerDesk />
              <div className="sticker absolute left-5 top-5 rounded-full bg-lime px-3 py-1.5">
                <span className="eyebrow text-ink">Hình minh hoạ</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- what has really been printed --------------------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <SectionHeader
            index="04"
            eyebrow="Đã in"
            title="NHỮNG MÓN ĐÃ IN THẬT."
            description="Chỉ ghi món các bé đã in thật, kèm tên người làm ra mẫu."
          />
          {prints.length === 0 ? (
            <p className="mt-10 max-w-2xl rounded-[var(--radius-card)] border-2 border-dashed border-ink/25 bg-surface/70 p-6 text-[0.9375rem] leading-relaxed text-ink-2">
              Chưa ghi món nào. Khi các bé in xong một món, người lớn sẽ ghi lại ở đây: tên món, ai in,
              mẫu của ai trên MakerWorld, và một điều các bé học được.
            </p>
          ) : (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {prints.map((p) => (
                <li
                  key={`${p.name}-${p.when}`}
                  className="rounded-[var(--radius-card)] border border-line bg-surface p-6"
                >
                  <p className="font-display text-lg font-extrabold text-ink">{p.name}</p>
                  <p className="mt-1 text-sm text-ink-3">
                    {p.printedBy} in · {p.when}
                  </p>
                  <p className="mt-4 text-sm text-ink-2">
                    Mẫu của{" "}
                    <a
                      href={p.modelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-ink underline underline-offset-2 hover:text-flame"
                    >
                      {p.designer}
                      <ExternalLink className="size-3.5" aria-hidden />
                    </a>{" "}
                    trên MakerWorld
                  </p>
                  {p.learned && (
                    <p className="mt-3 border-t border-dashed border-ink/20 pt-3 text-sm leading-relaxed text-ink-2">
                      {p.learned}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      {/* ---- safety --------------------------------------------------------- */}
      <Section id="an-toan" className="scroll-mt-20 border-t border-line bg-carbon text-white">
        <div className="container-hla">
          <SectionHeader
            index="05"
            eyebrow="An toàn"
            tone="dark"
            title="TRẺ VÀ MÁY IN 3D."
            description="Đầu phun máy in nóng hơn 200°C. Đây là những luật nên có khi trẻ nhỏ dùng máy in 3D ở nhà."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Chỉ người lớn làm", items: safetyRules.adultOnly, dot: "bg-flame", text: "text-flame" },
              { title: "Trẻ làm được, có người lớn ở cạnh", items: safetyRules.kids, dot: "bg-lime", text: "text-lime" },
              { title: "Luật chung", items: safetyRules.house, dot: "bg-sky", text: "text-sky" },
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
    </>
  );
}
