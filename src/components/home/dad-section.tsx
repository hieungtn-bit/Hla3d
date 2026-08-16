import Link from "next/link";
import { Banknote, HardHat, Lightbulb, Package, Plug, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const DAD_PROVIDES = [
  { icon: HardHat, label: "Máy móc", note: "Máy in, dụng cụ, cái bàn làm việc." },
  { icon: Package, label: "Vật liệu", note: "Nhựa in, hộp giấy, đồ đóng gói." },
  { icon: Plug, label: "An toàn", note: "Mọi thứ nóng, sắc hoặc có điện." },
  { icon: Banknote, label: "Chuyện kinh doanh", note: "Định giá, lời hứa với khách, giấy tờ." },
];

const MAKERS_PROVIDE = [
  { icon: Lightbulb, label: "Ý tưởng", note: "Thường là nhiều hơn máy in theo kịp." },
  { icon: Sparkles, label: "Tò mò", note: "Sao lại hỏng? Hỏi tiếp." },
  { icon: Sparkles, label: "Sáng tạo", note: "Màu sắc, hình dáng, tên gọi, nhân vật." },
  { icon: Sparkles, label: "Năng lượng", note: "6 giờ sáng, trước giờ học, đã chạy ra xem máy in." },
];

export function DadSection() {
  return (
    <section className="border-t border-line bg-paper py-20 sm:py-28">
      <div className="container-hla">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-ink-3">Nhà đầu tư</span>
            <h2 className="display mt-5 text-[clamp(2rem,5vw,3.25rem)]">
              BA LÀ
              <br />
              NHÀ ĐẦU TƯ.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-2">
              Startup nào cũng cần một nhà đầu tư đầu tiên. Của tụi em tình cờ là Ba.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-3">
              Ba không phải sếp của HLA3D và cũng không thiết kế sản phẩm. Ba bỏ tiền mua máy, giữ an toàn cho
              cả nhà, và hỏi mấy câu khó chịu — <em>món này tốn bao nhiêu, con hứa gì với khách, bao giờ xong</em>.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm leading-relaxed text-ink-2">
                Ba lo điện, máy nóng, tiền bạc và mấy chuyện của người lớn. Ba anh em lo đúng những việc mà
                một đứa trẻ nên được làm — và không đụng vào những việc không nên.
              </p>
              <Link
                href="/about#safety"
                className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-tight text-flame hover:underline"
              >
                Đọc luật an toàn →
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.05} className="rounded-[var(--radius-card)] border border-line-soft bg-surface p-6 shadow-[var(--shadow-soft)]">
              <span className="eyebrow text-ink-3">Ba lo phần</span>
              <ul className="mt-5 space-y-4">
                {DAD_PROVIDES.map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <item.icon className="mt-0.5 size-4 shrink-0 text-ink-3" />
                    <div>
                      <p className="font-display text-sm font-bold tracking-tight">{item.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-3">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="rounded-[var(--radius-card)] border border-flame/20 bg-flame-tint p-6">
              <span className="eyebrow text-flame-2">Ba anh em lo phần</span>
              <ul className="mt-5 space-y-4">
                {MAKERS_PROVIDE.map((item, i) => (
                  <li key={`${item.label}-${i}`} className="flex gap-3">
                    <item.icon className="mt-0.5 size-4 shrink-0 text-flame" />
                    <div>
                      <p className="font-display text-sm font-bold tracking-tight text-ink">{item.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-2">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
