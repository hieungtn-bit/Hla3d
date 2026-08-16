import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Ruler, Thermometer, Wrench } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { PrinterStatus } from "@/components/lab/printer-status";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeader } from "@/components/section";
import { filamentStock, labStats, printQueue, printers, safetyRules } from "@/data/lab";
import { printer as printerSpec } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/lab" },
  title: "The Lab",
  description:
    "Inside the HLA3D mini factory: one Anycubic Kobra X, a print queue, a filament shelf and a set of safety rules on the wall.",
};

const SPECS = [
  { icon: Boxes, label: "Khổ in tối đa", value: printerSpec.buildVolume },
  { icon: Ruler, label: "Đầu phun", value: printerSpec.nozzle },
  { icon: Thermometer, label: "Vật liệu", value: printerSpec.material },
  { icon: Wrench, label: "Độ dày lớp", value: printerSpec.layerHeights },
];

export default function LabPage() {
  return (
    <>
      <PageIntro
        eyebrow="Xưởng in"
        title={
          <>
            CHÀO MỪNG ĐẾN
            <br />
            NHÀ MÁY TÍ HON.
          </>
        }
        description="Một cái máy in đặt trên bàn ở góc nhà. Không kho bãi, không nhân viên, chưa có máy thứ hai. Mọi món HLA3D bán ra đều bò lên từ đúng một tấm đế này."
        meta={labStats.map((s) => ({ label: s.label, value: s.value }))}
        tone="dark"
      />

      {/* ---- live status ---------------------------------------------- */}
      <Section className="bg-paper">
        <div className="container-hla">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Reveal>
              <PrinterStatus printer={printers[0]} />
            </Reveal>

            <div>
              <SectionHeader
                index="01"
                eyebrow="Cái máy"
                title="ANYCUBIC KOBRA X"
                description="Mua lại máy cũ, cân bàn bằng tay, chạy gần như mỗi ngày từ tháng 3/2025. Máy đã in hết khoảng 14 kilogam nhựa PLA và bị kẹt đúng bốn lần."
              />
              <dl className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
                {SPECS.map((spec) => (
                  <div key={spec.label} className="bg-surface p-5">
                    <div className="flex items-center gap-2 text-ink-3">
                      <spec.icon className="size-4" />
                      <span className="eyebrow">{spec.label}</span>
                    </div>
                    <p className="mt-2.5 font-display text-sm font-bold tracking-tight">{spec.value}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- queue + filament ------------------------------------------ */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader index="02" eyebrow="Hàng chờ in" title="SẮP TỚI IN GÌ." />
            <ul className="mt-8 space-y-2">
              {printQueue.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.job}
                  delay={i * 0.05}
                  className="flex items-center gap-4 rounded-2xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]"
                >
                  <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="size-3.5 shrink-0 rounded-full border border-ink/10" style={{ background: item.hex }} />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-sm font-bold tracking-tight">{item.job}</p>
                    <p className="mt-0.5 text-xs text-ink-3">
                      ×{item.qty} · {item.color} · {item.owner}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-ink-2">{item.eta}</span>
                </Reveal>
              ))}
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-ink-3">
              Một cái máy thì mỗi lần chỉ in được một món. Chính hàng chờ này là lý do tụi em hứa 3–5 ngày chứ
              không hứa &ldquo;mai có&rdquo;.
            </p>
          </div>

          <div>
            <SectionHeader index="03" eyebrow="Kệ nhựa" title="TRÊN KỆ CÒN GÌ." />
            <ul className="mt-8 space-y-4">
              {filamentStock.map((f, i) => (
                <Reveal as="li" key={f.color} delay={i * 0.04}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                      <span
                        className="size-4 rounded-full border border-ink/10"
                        style={{ background: f.hex }}
                      />
                      {f.color}
                    </span>
                    <span className="font-mono text-xs text-ink-3">{f.grams}g left</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-paper">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${f.remaining}%`, background: f.hex }}
                    />
                  </div>
                </Reveal>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ink-3">
              Mỗi cuộn nhựa đều được cân trước khi bắt đầu in. Chỉ một thói quen đó thôi đã giảm số lần in hỏng
              từ 9 xuống 6 mỗi tháng.
            </p>
          </div>
        </div>
      </Section>

      {/* ---- safety ------------------------------------------------------ */}
      <Section id="safety" className="scroll-mt-20 border-t border-line bg-carbon text-white">
        <div className="container-hla">
          <SectionHeader
            index="04"
            eyebrow="An toàn khi làm"
            tone="dark"
            title="LUẬT DÁN TRÊN TƯỜNG."
            description="Ba anh em không tự ý đụng vào thiết bị nóng khi không có người lớn. Đây không phải câu miễn trừ trách nhiệm — đây đúng là tờ giấy dán trên tường ngay phía trên bàn máy in."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
              <span className="eyebrow text-flame">Chỉ Ba được làm</span>
              <ul className="mt-5 space-y-3">
                {safetyRules.dadOnly.map((rule) => (
                  <li key={rule} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-flame" />
                    {rule}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
              <span className="eyebrow text-lime">Ba anh em được làm</span>
              <ul className="mt-5 space-y-3">
                {safetyRules.makers.map((rule) => (
                  <li key={rule} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime" />
                    {rule}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16} className="rounded-[var(--radius-card)] border border-carbon-line bg-carbon-2 p-6">
              <span className="eyebrow text-sky">Luật trong nhà</span>
              <ul className="mt-5 space-y-3">
                {safetyRules.house.map((rule) => (
                  <li key={rule} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky" />
                    {rule}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <Link
              href="/about"
              className="tactile inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-display text-sm font-bold tracking-tight text-ink hover:bg-paper"
            >
              ĐỌC CHUYỆN CỦA TỤI EM
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
