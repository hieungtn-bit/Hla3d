import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { MakerAvatar } from "@/components/brand/maker-avatar";
import { Section } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { makers } from "@/data/makers";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Chuyện của tụi em",
  description:
    "HLA là Hưng, Long, Anh — 8, 6 và 5 tuổi. Trang này là ba lớp học miễn phí. Lúc rảnh, ba anh em in 3D để học, không bán gì.",
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
    title: "Trang này để học",
    text: "Ba lớp học miễn phí: tiếng Việt, toán và tiếng Anh, từ mẫu giáo đến lớp 3. Không bán gì, không quảng cáo, không cần tài khoản.",
  },
  {
    title: "Máy in 3D ở nhà",
    text: "Máy in là để học, không để bán. Ba anh em chưa tự thiết kế được mẫu 3D; bây giờ các bé biết tìm mẫu trên MakerWorld và in ra cùng người lớn.",
  },
  {
    title: "Mẫu 3D là của người khác",
    text: "Mẫu các bé in là của các nhà thiết kế trên MakerWorld. Món nào đã in sẽ được ghi ở Góc in 3D, kèm tên người làm ra mẫu.",
  },
  {
    title: "Người lớn trong nhà",
    text: "Ba trông chừng việc học và máy in.",
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
                { href: "/goc-in-3d", label: "Góc in 3D" },
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

    </>
  );
}
