import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { MakerDesk } from "@/components/brand/maker-desk";
import { goal } from "@/data/site";
import { toPercent } from "@/lib/utils";

/**
 * The bridge between the two halves of the site.
 *
 * A free classroom that also sells things has to say why, plainly, or a
 * parent is right to wonder what the catch is. The honest answer is that the
 * shop came first, it is what the brothers do at the weekend, and it is where
 * the lessons get used — the English course has a set of workshop words and
 * the maths course has a run of money lessons because those are the words and
 * sums three children running a stall actually need.
 *
 * The customer counter lives here rather than in the hero. It is still a real
 * number the brothers track; it is just no longer the headline of the site.
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
                Cửa hàng có trước lớp học. Ba anh em xin Ba mua một cái máy in 3D, rồi tự vẽ, tự in,
                tự bán — và nhận ra là muốn làm cho ra hồn thì phải biết tính tiền và phải đọc được
                tiếng Anh.
              </p>
              <p>
                Nên hai lớp học ở trang này không phải học chay. Bộ từ vựng số 37 là{" "}
                <b className="text-ink">đúng những từ trong xưởng in</b> — nozzle, filament, layer.
                Bộ số 38 là <b className="text-ink">từ về buôn bán</b> — customer, price, profit. Lớp
                toán có hẳn một bài về tiền lời tiền lỗ.
              </p>
              <p>
                Bây giờ thì việc học là chính, còn in và bán là việc cuối tuần khi ba anh em rảnh.
                Nhưng thứ tự đó không quan trọng bằng chuyện: cái gì học được đều có chỗ dùng thật.
              </p>
            </div>
            <Link
              href="/shop"
              className="tactile mt-8 inline-flex h-13 items-center gap-2 rounded-full border-2 border-ink px-6 py-3.5 font-display text-sm font-bold tracking-tight hover:bg-ink hover:text-paper"
            >
              XEM ĐỒ BA ANH EM LÀM
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticker-lg relative mb-5 overflow-hidden rounded-[var(--radius-card)] bg-surface p-4 sm:p-6">
              <MakerDesk />
              <div className="sticker absolute left-5 top-5 flex items-center gap-2 rounded-full bg-lime px-3 py-1.5">
                <span className="size-2.5 animate-[pulse-dot_1.8s_ease-in-out_infinite] rounded-full border-2 border-ink bg-flame" />
                <span className="eyebrow text-ink">Máy in #01 · Đang in</span>
              </div>
            </div>
            <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-6 sm:p-8">
              <p className="eyebrow text-ink-3">Mục tiêu của cửa hàng</p>
              <p className="display mt-4 text-5xl">
                {goal.current}
                <span className="text-ink-3">/{goal.target}</span>
              </p>
              <p className="mt-2 text-sm font-semibold text-ink-2">khách hàng đầu tiên</p>
              <div className="mt-5 h-3.5 w-full overflow-hidden rounded-full border-2 border-ink bg-paper-2">
                <div
                  className="h-full bg-flame"
                  style={{ width: `${toPercent(goal.current, goal.target)}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-relaxed font-semibold text-ink-2">
                Con số này ba anh em đếm từ tháng 3/2025, mỗi đơn một vạch. Nó không phải mục tiêu
                của trang web — trang web là để học. Nó là mục tiêu của cái cửa hàng nhỏ ở góc nhà.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
