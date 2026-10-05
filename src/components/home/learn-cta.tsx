import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Doodle } from "@/components/brand/doodle";
import { TOTAL_WORDS, vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";
import { vietSkills } from "@/data/viet";

const HABITS = [
  { he: "חברותא", vi: "Học đôi", body: "Hai anh em một bàn, đọc to, hỏi lại nhau." },
  { he: "חזרה", vi: "Ôn lại", body: "Từ nào cũng quay lại: 2, 4, 8, rồi 32 ngày." },
  { he: "קושיא", vi: "Hỏi ngược", body: "Học xong phải đặt được một câu hỏi bằng từ đó." },
  { he: "ללמד", vi: "Dạy lại", body: "Dạy được cho em thì mới là thuộc thật." },
];

/**
 * The learning section, on the homepage — directly under the hero, because
 * the classes are what this site is mostly for.
 */
export function LearnCta() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-carbon py-16 text-paper sm:py-24">
      <Doodle kind="sparkle" className="absolute top-8 left-[5%] hidden size-10 text-paper/20 sm:block" />
      <Doodle kind="bolt" className="absolute right-[6%] bottom-10 hidden size-12 text-paper/15 sm:block" />

      <div className="container-hla relative">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="eyebrow text-sun">Ba lớp học · Miễn phí</p>
            <h2 className="display mt-5 text-[clamp(2rem,5.5vw,3.5rem)] text-paper">
              BA LỚP HỌC,
              <br />
              HỌC KIỂU NHÀ HỌC DO THÁI.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed font-semibold text-paper/75">
              {vietSkills.length} bài tiếng Việt và {skills.length} bài toán từ mẫu giáo đến lớp 3, cùng{" "}
              {TOTAL_WORDS} từ tiếng Anh chia {vocabSets.length} chủ đề. Trang làm ra để ba anh em học, và
              mở luôn cho ai muốn học cùng. Bé chưa biết đọc vẫn học được: nghe tiếng rồi chọn hình.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed font-semibold text-paper/55">
              Không tài khoản, không thu tiền, không quảng cáo. Tiến độ nằm trong máy của bạn.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {[
                { href: "/hoc-tieng-viet", label: "LỚP TIẾNG VIỆT", solid: true },
                { href: "/hoc-toan", label: "LỚP TOÁN", solid: false },
                { href: "/hoc-tieng-anh", label: "LỚP TIẾNG ANH", solid: false },
              ].map((b) => (
                <Link
                  key={b.href}
                  href={b.href}
                  className={
                    b.solid
                      ? "tactile inline-flex h-14 items-center justify-center gap-2 rounded-full bg-sun px-7 font-display text-base font-bold text-ink hover:bg-paper"
                      : "tactile inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-paper/40 px-7 font-display text-base font-bold text-paper hover:bg-paper/10"
                  }
                >
                  {b.label}
                  <ArrowRight className="size-5" />
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {HABITS.map((h, i) => (
                <li
                  key={h.vi}
                  className="flex items-center gap-4 rounded-[var(--radius-card)] border-2 border-carbon-line bg-carbon-2 p-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border-2 border-carbon-line bg-carbon font-display text-sm font-bold text-sun">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-paper">
                      {h.vi}{" "}
                      <span lang="he" dir="rtl" className="font-semibold text-paper/40">
                        {h.he}
                      </span>
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-paper/60">{h.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
