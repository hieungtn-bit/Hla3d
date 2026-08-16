import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Box, Check, PenTool, Printer } from "lucide-react";
import { goal } from "@/data/site";
import { Reveal } from "@/components/motion/reveal";
import { orderNumber, toPercent } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Đã nhận đơn",
  description: "Cảm ơn bạn đã ủng hộ ba anh em.",
  robots: { index: false, follow: false },
};

const STAGES = [
  { icon: PenTool, label: "Được vẽ", note: "Do một trong ba anh em tự thiết kế." },
  { icon: Printer, label: "Được in", note: "Trên máy in #01, từng lớp một." },
  { icon: Check, label: "Được thử", note: "Đo, bẻ, làm rơi, rồi chụp ảnh." },
  { icon: Box, label: "Được gói", note: "Gói tay, kèm một tấm thiệp viết tay." },
];

export default function OrderConfirmedPage() {
  const customerNumber = goal.current + 1;

  return (
    <div className="relative overflow-hidden">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-flame/10 blur-3xl" />

      <div className="container-hla relative max-w-3xl py-20 sm:py-28">
        <Reveal className="text-center">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-flame/30 bg-flame-tint px-3.5 py-2 text-flame-2">
            <Check className="size-3.5" />
            Đã nhận đơn!
          </span>

          <p className="mt-10 font-mono text-sm tracking-[0.3em] text-ink-3">ĐƠN HÀNG</p>
          <p className="display mt-3 text-[clamp(2.75rem,10vw,5rem)] text-flame">
            #{orderNumber(customerNumber)}
          </p>

          <h1 className="display mt-10 text-[clamp(1.75rem,4.5vw,2.75rem)]">
            BẠN LÀ KHÁCH SỐ {customerNumber} CỦA HLA3D!
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
            Cảm ơn bạn đã ủng hộ ba anh em. Tối nay đơn của bạn sẽ được xếp vào hàng chờ in, và tụi em
            sẽ gửi ảnh sản phẩm trước khi đóng gói.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-3">
            Hưng, Long và Anh sẽ tự tay kiểm tra món này trước khi cho vào hộp.
          </p>
        </Reveal>

        {/* ---- the four stages -------------------------------------- */}
        <Reveal delay={0.1} className="mt-14">
          <p className="eyebrow text-center text-ink-3">Món này sẽ được</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-4">
            {STAGES.map((stage) => (
              <div key={stage.label} className="bg-surface p-5 text-center">
                <stage.icon className="mx-auto size-5 text-flame" />
                <p className="mt-3 font-display text-sm font-bold tracking-tight">{stage.label}</p>
                <p className="mt-1.5 text-xs leading-snug text-ink-3">{stage.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-bold text-ink-2">bởi HLA3D.</p>
        </Reveal>

        {/* ---- goal ------------------------------------------------- */}
        <Reveal delay={0.16} className="mt-14 rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow text-ink-3">100 khách đầu tiên</span>
            <span className="font-mono text-sm text-flame">
              {customerNumber}/{goal.target}
            </span>
          </div>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-paper-2">
            <div
              className="h-full rounded-full bg-flame"
              style={{ width: `${toPercent(customerNumber, goal.target)}%` }}
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-2">
            Bạn vừa làm con số nhích lên một nấc. Còn {goal.target - customerNumber} khách nữa là ba anh em
            đủ mục tiêu để dành mua máy in thứ hai.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-ink px-8 font-display text-base font-bold tracking-tight text-paper hover:bg-flame"
          >
            XEM TIẾP
            <ArrowRight className="size-5" />
          </Link>
          <Link
            href="/journal"
            className="tactile inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-8 font-display text-base font-bold tracking-tight hover:bg-ink hover:text-paper"
          >
            ĐỌC NHẬT KÝ
          </Link>
        </Reveal>

        <p className="mt-10 text-center text-xs text-ink-3">
          Bản demo — chưa thu tiền thật. Số đơn ở phiên bản này chỉ để minh hoạ.
        </p>
      </div>
    </div>
  );
}
