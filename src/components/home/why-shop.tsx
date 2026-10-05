import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { MakerDesk } from "@/components/brand/maker-desk";

/**
 * The bridge between the two halves of the site.
 *
 * A free classroom that also sells things has to say why, plainly, or a
 * parent is right to wonder what the catch is. The answer here is only what
 * the family has said: there is a 3D printer at home, the brothers find
 * models on MakerWorld and print them, and the shop is for their free time.
 * The English and maths courses have workshop and money lessons because
 * those are words and sums a family with a printer actually uses.
 */
export function WhyShop() {
  return (
    <section className="border-y-2 border-ink bg-paper-2 py-16 sm:py-24">
      <div className="container-hla">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow text-ink-3">Vậy cái cửa hàng để làm gì?</p>
            <h2 className="display mt-4 text-[clamp(1.875rem,5vw,3.25rem)]">
              HỌC XONG THÌ PHẢI CÓ CHỖ ĐEM RA DÙNG.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed font-semibold text-ink-2">
              <p>
                Nhà có một máy in 3D. Ba anh em chưa tự thiết kế được, nhưng đã biết tìm mẫu 3D trên
                MakerWorld rồi in ra. Món nào in được thì bày ở cửa hàng nhỏ này.
              </p>
              <p>
                Các lớp học ở trang này cũng dùng tới chuyện đó. Bộ từ vựng số 37 là{" "}
                <b className="text-ink">những từ ở chỗ máy in</b> — printer, filament, layer. Bộ số 38 là{" "}
                <b className="text-ink">từ về buôn bán</b> — price, customer, profit. Lớp toán có bài về
                tiền lời, tiền lỗ.
              </p>
              <p>
                Việc học là chính. In 3D và bán đồ là việc vui lúc ba anh em rảnh.
              </p>
            </div>
            <Link
              href="/shop"
              className="tactile mt-8 inline-flex h-13 items-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
            >
              XEM CỬA HÀNG
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticker-lg relative overflow-hidden rounded-[var(--radius-card)] bg-surface p-4 sm:p-6">
              <MakerDesk />
              <div className="sticker absolute left-5 top-5 flex items-center gap-2 rounded-full bg-lime px-3 py-1.5">
                <span className="eyebrow text-ink">Hình minh hoạ</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
