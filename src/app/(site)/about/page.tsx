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
  title: "Chuyện của tụi em",
  description:
    "HLA3D bắt đầu từ một chiếc máy in 3D đặt ở góc nhà và ba anh em tò mò. Đây là chuyện một dự án của gia đình dần thành một cửa hàng nhỏ.",
};

const TIMELINE = [
  {
    date: "Tháng 3, 2025",
    title: "Máy in về nhà",
    text: "Một chiếc Anycubic Kobra X đặt trên bàn ăn. Món in đầu tiên là một khối vuông hiệu chỉnh — và nó hơi méo.",
  },
  {
    date: "Tháng 4, 2025",
    title: "Sáu con bạch tuộc hỏng",
    text: "Lần đầu tiên thử in một món khớp nối liền khối. Đến bản thứ bảy mới bẻ được.",
  },
  {
    date: "Tháng 5, 2025",
    title: "Khách hàng số 1",
    text: "Một bạn nhỏ để bàn, 79.000đ, bán cho một người không phải họ hàng. Cô ấy hỏi một câu tụi em không trả lời được.",
  },
  {
    date: "Tháng 6, 2025",
    title: "Hai mươi tấm bảng tên",
    text: "Đủ cho cả một lớp. Tụi em học được checklist dùng để làm gì, và mỗi ngày mình thật sự làm được bao nhiêu.",
  },
  {
    date: "Tháng 7, 2025",
    title: "Bảng tính giá vốn",
    text: "Ba bắt tụi em tính cả tiền điện, hộp giấy, những lần in hỏng và hao mòn máy. Lợi nhuận tụt xuống. Nhưng con số thì thật hơn.",
  },
  {
    date: "Tháng 8, 2025",
    title: "Khách hàng số 27",
    text: "Còn 73 khách nữa. Mục tiêu không đổi: đủ một trăm khách thật rồi mới mua máy in thứ hai.",
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
            <span className="eyebrow text-ink-3">Câu chuyện thương hiệu</span>
            <h2 className="display mt-5 text-[clamp(1.75rem,4vw,2.75rem)]">
              TỪ MỘT Ý TƯỞNG
              <br />
              THÀNH MỘT MÓN
              <br />
              CẦM ĐƯỢC TRÊN TAY.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="space-y-5 text-[1.0625rem] leading-[1.75] text-ink-2">
            <p>
              HLA3D bắt đầu từ một chiếc máy in 3D trong nhà và sự tò mò của ba anh em. Thay vì chỉ chơi đồ
              chơi, các bạn nhỏ bắt đầu học cách tạo ra chúng.
            </p>
            <p>
              Từ một ý tưởng, thành bản vẽ, thành một cuộn nhựa PLA, rồi thành một món đồ thật cầm được, làm
              rơi được, thử được và bán được. Không món nào trong shop này là mua về dán nhãn lại. Món nào cũng
              bắt đầu bằng một câu nói trong bữa cơm ở nhà này.
            </p>
            <p>
              HLA3D là nơi ba anh em học sáng tạo, công nghệ, kinh doanh và giá trị của lao động. Phần in ấn là
              phần vui. Phần thú vị nằm ở xung quanh nó — tính xem một món tốn bao nhiêu, vì sao một khách bỏ đi,
              và học cách nói &ldquo;con chưa biết, để con tìm hiểu rồi trả lời&rdquo;.
            </p>
            <p className="border-l-4 border-flame pl-5 font-display text-lg font-bold tracking-tight text-ink">
              HLA = Hưng, Long, Anh. 3D = Nghĩ ra. Vẽ ra. Làm ra.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- makers ---------------------------------------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <SectionHeader
            index="01"
            eyebrow="Đội ngũ"
            title="BA NGƯỜI LÀM, BA VIỆC."
            description="Tụi em chỉ dùng tên gọi, không dùng ảnh thật. Thứ đáng xem ở đây là món đồ làm ra, không phải khuôn mặt."
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
          <SectionHeader index="02" eyebrow="Dòng thời gian" title="SÁU THÁNG, KỂ THẬT." />
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
            title="AI ĐƯỢC LÀM VIỆC GÌ."
            description="Ba anh em không tự ý đụng vào thiết bị nóng khi không có người lớn. Ai mua đồ của HLA3D cũng nên biết rõ ranh giới đó nằm ở đâu."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Chỉ Ba được làm", items: safetyRules.dadOnly, dot: "bg-flame", text: "text-flame" },
              { title: "Ba anh em được làm", items: safetyRules.makers, dot: "bg-lime", text: "text-lime" },
              { title: "Luật trong nhà", items: safetyRules.house, dot: "bg-sky", text: "text-sky" },
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
            eyebrow="Bài học tiền bạc"
            title="TIỀN CHẠY ĐI ĐÂU HẾT?"
            description="Tụi em bày ra hết vì tự tính được mới là mục đích. Không con số nào được làm tròn cho đẹp."
          />
          <div className="mt-14">
            <MoneyBreakdown />
          </div>

          <Reveal className="mt-14 text-center">
            <Link
              href="/shop"
              className="tactile inline-flex h-14 items-center gap-2 rounded-full bg-flame px-8 font-display text-base font-bold tracking-tight text-white shadow-[var(--shadow-flame)] hover:bg-flame-2"
            >
              XEM ĐỒ TỤI EM LÀM
              <ArrowRight className="size-5" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
