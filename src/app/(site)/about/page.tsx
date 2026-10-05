import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { MakerAvatar } from "@/components/brand/maker-avatar";
import { MoneyBreakdown } from "@/components/money-breakdown";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { makers } from "@/data/makers";
import { safetyRules } from "@/data/safety";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Chuyện của tụi em",
  description:
    "HLA là Hưng, Long, Anh — 8, 6 và 5 tuổi. Trang này chủ yếu là ba lớp học miễn phí. Lúc rảnh, ba anh em tìm mẫu 3D trên MakerWorld và in ra.",
};

/**
 * Only what the family has actually said. An earlier version of this page
 * carried a six-month timeline, customer numbers and failure counts that
 * were written as placeholders and read like fact; they were removed. When
 * the brothers have a real story to tell, it goes here in their words.
 */
const FACTS = [
  {
    title: "Ba anh em",
    text: "Hưng 8 tuổi, Long 6 tuổi, Anh 5 tuổi. HLA là chữ cái đầu tên ba anh em.",
  },
  {
    title: "Việc chính là học",
    text: "Trang này chủ yếu là ba lớp học miễn phí: tiếng Việt, toán và tiếng Anh, từ mẫu giáo đến lớp 3.",
  },
  {
    title: "Máy in 3D ở nhà",
    text: "Ba anh em chưa tự thiết kế được mẫu 3D. Bây giờ các bé biết tìm mẫu trên MakerWorld và in ra.",
  },
  {
    title: "Mẫu 3D là của người khác",
    text: "Mẫu trong cửa hàng là của các nhà thiết kế trên MakerWorld. Tên người thiết kế được ghi ở trang từng món khi nhà em ghi lại được.",
  },
  {
    title: "Người lớn trong nhà",
    text: `Ba trông chừng việc học và máy in. ${contact.owner[0].toUpperCase()}${contact.owner.slice(1)} nhận đơn và gọi lại cho khách.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chuyện của tụi em"
        title={
          <>
            BA ANH EM.
            <br />
            BA LỚP HỌC.
          </>
        }
        description="Trang này kể đúng những gì đang có thật. Khi ba anh em có chuyện thật để kể — món đầu tiên tự vẽ, một lần in hỏng — chuyện đó sẽ được thêm vào đây."
        meta={[
          { label: "Số anh em", value: "3" },
          { label: "Lớp học", value: "3" },
          { label: "Máy in", value: "1" },
        ]}
      />

      {/* ---- what is true ---------------------------------------------- */}
      <Section className="bg-paper">
        <div className="container-hla grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-ink-3">Nói thật</span>
            <h2 className="display mt-5 text-[clamp(1.75rem,4vw,2.75rem)]">
              HLA = HƯNG,
              <br />
              LONG, ANH.
            </h2>
            <div className="mt-10 flex gap-4">
              {makers.map((m) => (
                <div key={m.id} className="text-center">
                  <span
                    className="grid size-20 place-items-center overflow-hidden rounded-full border-2 border-ink bg-surface"
                    style={{ boxShadow: "0 3px 0 0 var(--color-ink)" }}
                  >
                    <span className="mt-3 w-16">
                      <MakerAvatar role={m.id} />
                    </span>
                  </span>
                  <p className="mt-3 font-display text-lg font-extrabold">{m.name}</p>
                  <p className="text-xs font-semibold text-ink-3">{m.age} tuổi</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-sm text-xs leading-relaxed text-ink-3">
              Hình vẽ hoạt hình, không phải ảnh thật. Trang chỉ dùng tên gọi và tuổi của các bé.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="space-y-4">
              {FACTS.map((f) => (
                <li key={f.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
                  <p className="font-display text-base font-extrabold text-ink">{f.title}</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-2">{f.text}</p>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-8">
              {[
                { href: "/hom-nay", label: "Hôm nay học gì" },
                { href: "/hoc-tieng-viet", label: "Tiếng Việt" },
                { href: "/hoc-toan", label: "Toán" },
                { href: "/hoc-tieng-anh", label: "Tiếng Anh" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="tactile inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink px-5 font-display text-sm font-bold text-ink hover:bg-ink hover:text-paper"
                >
                  {l.label}
                  <ArrowRight className="size-4" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- safety ------------------------------------------------------- */}
      <Section id="safety" className="scroll-mt-20 border-t border-line bg-carbon text-white">
        <div className="container-hla">
          <SectionHeader
            index="01"
            eyebrow="An toàn khi làm"
            tone="dark"
            title="TRẺ VÀ MÁY IN 3D."
            description="Đầu phun máy in nóng hơn 200°C. Đây là những luật nên có khi trẻ nhỏ dùng máy in 3D ở nhà — ai mua đồ in 3D cho con cũng nên biết."
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

      {/* ---- money -------------------------------------------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <SectionHeader
            index="02"
            eyebrow="Bài học tiền bạc"
            title="TIỀN CHẠY ĐI ĐÂU HẾT?"
            description="Ví dụ một món bán 150.000đ được chia ra thế nào: tiền nhựa, tiền điện, hộp, quỹ máy và tiền lời. Các con số là ước tính để tập tính, không phải sổ sách thật của cửa hàng."
          />
          <div className="mt-14">
            <MoneyBreakdown />
          </div>

          <Reveal className="mt-14 text-center">
            <Link
              href="/shop"
              className="tactile inline-flex h-14 items-center gap-2 rounded-full bg-flame px-8 font-display text-base font-bold tracking-tight text-white shadow-[var(--shadow-flame)] hover:bg-flame-2"
            >
              XEM CỬA HÀNG
              <ArrowRight className="size-5" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
