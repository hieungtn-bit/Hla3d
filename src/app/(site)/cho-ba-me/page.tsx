import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Section, SectionHeader } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { BOX_DAYS } from "@/lib/leitner";

export const metadata: Metadata = {
  alternates: { canonical: "/cho-ba-me" },
  title: "Cho ba mẹ",
  description:
    "Cách dùng HLA3D mười phút mỗi ngày: ôn bài đến hạn trước, học đôi giữa hai anh em, hỏi ngược, dạy lại, giữ tiến độ — và những gì trang này không làm được.",
};

/** The review gaps, read from the scheduler so this page cannot drift from it. */
const GAPS = Object.values(BOX_DAYS).filter((d) => d > 0);

const SESSION = [
  {
    n: "1",
    title: "Mở “Hôm nay học gì”, chọn tên con",
    body: "Trang gom bài đến hạn ôn của cả ba lớp về một chỗ, và gợi ý bài mới đúng bậc của con.",
    href: "/hom-nay",
    cta: "Mở Hôm nay học gì",
  },
  {
    n: "2",
    title: "Ôn bài đến hạn trước",
    body: "Ôn đúng lúc sắp quên thì nhớ lâu hơn học thêm bài mới. Thường chỉ mất vài phút.",
  },
  {
    n: "3",
    title: "Còn sức thì học một bài mới — chỉ một",
    body: "Mỗi bài mở đầu bằng một câu hỏi. Để con đoán trước, rồi mới xem cách làm. Đoán sai cũng được: đoán là để chú ý.",
  },
  {
    n: "4",
    title: "Kết thúc bằng một câu hỏi khó",
    body: "Cuối mỗi bài có một câu hỏi không ai chấm. Hỏi con: “Sao con biết?”, “Nếu đổi số này thì sao?”. Không cần đúng, cần nghĩ.",
  },
];

const HABITS = [
  {
    vi: "Học đôi",
    he: "חברותא",
    body: "Chọn “Học đôi” khi bắt đầu bài: một người hỏi, một người trả lời, rồi đổi lượt. Anh lớn hỏi em nhỏ được — em chưa biết đọc thì nghe tiếng rồi chọn hình.",
  },
  {
    vi: "Ôn lại",
    he: "חזרה",
    body: `Trả lời đúng thì bài quay lại sau ${GAPS.join(", ")} ngày. Trả lời sai thì quay lại ngay hôm nay. Bài chưa đến hạn thì chưa cần ôn.`,
  },
  {
    vi: "Hỏi ngược",
    he: "קושיא",
    body: "Câu hỏi cuối bài để nói chuyện, không để chấm. Ba mẹ không cần biết đáp án — hỏi lại con, rồi cùng tìm.",
  },
  {
    vi: "Dạy lại",
    he: "ללמד",
    body: "Bài nào con làm đúng, nhờ con giảng lại cho em hoặc cho ba mẹ. Giảng được cho người khác là cách ôn rất tốt.",
  },
];

const TIPS = [
  {
    title: "Chọn đáp án hay tự gõ?",
    body: "Ở lớp toán có hai cách trả lời. Chọn một trong bốn ô thì dễ bắt đầu. Tự gõ đáp án khó hơn vì không đoán mò được — dùng khi con đã quen bài.",
  },
  {
    title: "Máy không có giọng đọc",
    body: "Nếu điện thoại chưa cài giọng đọc tiếng Việt hoặc tiếng Anh, trang sẽ báo. Ở bài tiếng Việt, chữ cần đọc được giấu sau một nút để ba mẹ bấm xem rồi đọc to giúp con.",
  },
  {
    title: "Giữ tiến độ",
    body: "Không có tài khoản: tiến độ nằm trong trình duyệt của máy đang dùng. Xoá dữ liệu trình duyệt hay đổi máy là mất. Mỗi tháng lưu một file sao lưu ở trang Hôm nay học gì; sang máy mới thì khôi phục từ file đó.",
    href: "/hom-nay#sao-luu",
    cta: "Lưu tiến độ",
  },
  {
    title: "Mỗi bé một tên",
    body: "Chọn đúng tên trước khi học để lịch ôn của từng bé không lẫn vào nhau. Bạn ghé chơi thì chọn “Bạn ghé chơi”.",
  },
];

const LIMITS = [
  "Không thay được thầy cô và sách giáo khoa. Nội dung do HLA3D tự viết, bám theo phạm vi Chương trình GDPT 2018.",
  "Không chấm phần nói. Phát âm cần ba mẹ nghe cùng.",
  "Không hứa “học một lần nhớ mãi”. Trí nhớ nào cũng phai; việc của trang là nhắc ôn đúng lúc.",
  "Không có tài khoản, nên không đồng bộ giữa các máy — trừ khi ba mẹ dùng file sao lưu.",
  "Trang có đếm ẩn danh lượt xem và số câu đúng, sai của mỗi bài; không ghi tên bé, không ghi bé sai từ nào.",
];

export default function ParentsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Cho ba mẹ"
        title={
          <>
            MƯỜI PHÚT MỖI NGÀY.
            <br />
            NGỒI CẠNH CON.
          </>
        }
        description="Trang này không thay được ba mẹ. Đây là cách dùng nó cho đúng, và những điều nó không làm được."
        meta={[
          { label: "Mỗi ngày", value: "~10 phút" },
          { label: "Học phí", value: "0đ" },
          { label: "Tài khoản", value: "Không cần" },
        ]}
      />

      {/* ---- one session --------------------------------------------------- */}
      <Section className="bg-paper">
        <div className="container-hla">
          <SectionHeader index="01" eyebrow="Một buổi học" title="BỐN BƯỚC, MƯỜI PHÚT." />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2">
            {SESSION.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.05}>
                <div className="sticker flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-6">
                  <span className="grid size-10 place-items-center rounded-xl border-2 border-ink bg-sun font-display text-lg font-extrabold">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{s.body}</p>
                  {s.href && (
                    <Link
                      href={s.href}
                      className="mt-auto inline-flex items-center gap-2 pt-4 font-display text-sm font-extrabold text-flame hover:underline"
                    >
                      {s.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---- the four habits ------------------------------------------------ */}
      <Section className="border-t-2 border-ink bg-carbon text-paper">
        <div className="container-hla">
          <SectionHeader
            index="02"
            tone="dark"
            eyebrow="Bốn thói quen"
            title="HỌC KIỂU NHÀ HỌC DO THÁI, Ở NHÀ MÌNH."
            description="Bốn thói quen này có sẵn trong mỗi bài. Đây là cách ba mẹ giúp con dùng chúng."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {HABITS.map((h, i) => (
              <Reveal as="li" key={h.vi} delay={i * 0.05}>
                <div className="h-full rounded-[var(--radius-card)] border-2 border-carbon-line bg-carbon-2 p-6">
                  <p className="font-display text-xl font-bold text-paper">
                    {h.vi}{" "}
                    <span lang="he" dir="rtl" className="font-semibold text-paper/60">
                      {h.he}
                    </span>
                  </p>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-paper/75">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- practical tips ------------------------------------------------- */}
      <Section className="bg-paper-2">
        <div className="container-hla">
          <SectionHeader index="03" eyebrow="Mấy điều nên biết" title="CHUYỆN NHỎ, HAY HỎI." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {TIPS.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 0.05}>
                <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6">
                  <h3 className="font-display text-lg font-extrabold">{t.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{t.body}</p>
                  {t.href && (
                    <Link
                      href={t.href}
                      className="mt-auto inline-flex items-center gap-2 pt-4 font-display text-sm font-extrabold text-flame hover:underline"
                    >
                      {t.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- what it cannot do ---------------------------------------------- */}
      <Section className="border-t border-line bg-paper">
        <div className="container-hla grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeader
            index="04"
            eyebrow="Nói thật"
            title="NHỮNG GÌ TRANG NÀY KHÔNG LÀM ĐƯỢC."
          />
          <div>
            <ul className="space-y-3">
              {LIMITS.map((l) => (
                <li key={l} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  <span className="mt-2 size-2 shrink-0 rounded-full border-2 border-ink bg-flame" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink-2">
              Thấy bài nào sai, hay có cách dạy hay hơn?{" "}
              <a href="mailto:hieungtn@gmail.com" className="font-bold text-ink underline underline-offset-4 hover:text-flame">
                Gửi email góp ý
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
