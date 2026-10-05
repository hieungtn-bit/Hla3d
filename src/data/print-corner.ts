import { vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";

/**
 * Góc in 3D — the printer at home, used for learning only. Nothing here is
 * for sale.
 *
 * The brothers do not design models yet: they find them on MakerWorld and
 * print them with an adult. Every line on the page must stay true to that.
 */

/**
 * Where the printer meets the classes. Each entry points at a real lesson by
 * id; the titles are read from the lesson data, so a renamed or removed
 * lesson breaks the build instead of leaving a dead link on the page.
 * The questions are open "hỏi ngược" questions to ask at the printer — they
 * are examples, not things that happened.
 */
const LINKS = [
  {
    kind: "vocab" as const,
    id: "xuong-in",
    subject: "Tiếng Anh",
    question: "Máy in đang làm gì? Thử nói bằng tiếng Anh: printer, layer, filament.",
  },
  {
    kind: "math" as const,
    id: "do-do-dai",
    subject: "Toán",
    question: "Món in dài 2 dm. Vậy là bao nhiêu cm? Lấy thước đo lại xem có đúng không.",
  },
  {
    kind: "math" as const,
    id: "xem-gio",
    subject: "Toán",
    question: "Bây giờ là 3 giờ, máy báo còn 30 phút nữa mới in xong. Lúc in xong, kim dài chỉ số mấy?",
  },
  {
    kind: "math" as const,
    id: "chu-vi",
    subject: "Toán",
    question: "Đế của món in là hình chữ nhật dài 6 cm, rộng 4 cm. Đi một vòng quanh đế là bao nhiêu cm?",
  },
];

export const printLessons = LINKS.map((l) => {
  const found =
    l.kind === "vocab" ? vocabSets.find((s) => s.id === l.id) : skills.find((s) => s.id === l.id);
  if (!found) throw new Error(`Góc in 3D links to a lesson that does not exist: ${l.kind} ${l.id}`);
  return {
    href: l.kind === "vocab" ? `/hoc-tieng-anh/${l.id}` : `/hoc-toan/${l.id}`,
    title: found.title,
    subject: l.subject,
    question: l.question,
  };
});

/** One thing the children really printed. Add an entry only after it happened. */
export type Print = {
  /** What it is, in the children's words. */
  name: string;
  /** Who printed it — first name only. */
  printedBy: string;
  /** e.g. "Tháng 10, 2026" */
  when: string;
  /** The model's page on MakerWorld, and the designer's name exactly as shown there. */
  modelUrl: string;
  designer: string;
  /** One thing learned, if the children want to say one. */
  learned?: string;
};

/**
 * Real prints only. Empty until the family adds one — the page says so
 * rather than filling the space with examples that read like a record.
 */
export const prints: Print[] = [];
