import { Volume2 } from "lucide-react";

/**
 * What is actually inside, instead of a drawing of it.
 *
 * The hero used to show the printer desk, which said "workshop" to anyone who
 * only looked at the picture. These two cards are the real lesson interfaces —
 * same type, same sticker shadows, same four-option grid — so a parent
 * scanning the page for two seconds sees the product rather than an
 * illustration of a related activity.
 *
 * Static on purpose: it is a shop window, not a lesson. Tapping goes to the
 * real thing rather than starting something half-real here.
 */
export function LessonPeek({ word }: { word: { en: string; vi: string; icon: string; others: string[] } }) {
  return (
    <div className="grid gap-4">
      {/* ---- an English card ---- */}
      <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow text-ink-3">Nghe rồi chọn hình</p>
          <span className="rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 text-[0.625rem] font-bold">
            Tiếng Anh
          </span>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <span className="sticker grid size-16 shrink-0 place-items-center rounded-full bg-sun">
            <Volume2 className="size-7" aria-hidden />
          </span>
          <p className="display text-3xl sm:text-4xl">{word.en}</p>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[word.icon, ...word.others].map((icon, i) => (
            <span
              key={i}
              className={`sticker grid aspect-square place-items-center rounded-xl text-2xl ${
                i === 0 ? "bg-lime" : "bg-paper"
              }`}
              aria-hidden
            >
              {icon}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold text-ink-3">
          Bé chưa biết đọc vẫn làm được — nghe tiếng rồi chọn hình.
        </p>
      </div>

      {/* ---- a maths card ---- */}
      <div className="sticker-lg rounded-[var(--radius-card)] bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow text-ink-3">Câu hỏi trước, cách làm sau</p>
          <span className="rounded-full border-2 border-ink bg-sky px-2.5 py-0.5 text-[0.625rem] font-bold">
            Toán
          </span>
        </div>
        <p className="mt-4 font-display text-lg leading-snug font-bold">
          8 + 5 thì nhiều hơn 10 rồi. Đếm ngón tay không đủ ngón. Làm thế nào bây giờ?
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Làm tròn 10 trước", "Dựa vào số đôi", "Đếm tiếp"].map((m, i) => (
            <span
              key={m}
              className={`sticker rounded-full px-3 py-1.5 text-xs font-bold ${
                i === 0 ? "bg-lime" : "bg-paper"
              }`}
            >
              {m}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold text-ink-3">
          Ba cách làm, cách nào cũng đúng. Bé chọn cách mình thích.
        </p>
      </div>
    </div>
  );
}
