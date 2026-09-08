import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { LearnerPicker } from "@/components/learn/learner-picker";
import { WordWall } from "@/components/learn/word-wall";
import { Section } from "@/components/section";
import { SubjectSwitch } from "@/components/learn/subject-switch";
import { TOTAL_WORDS, vocabSets } from "@/data/vocab";

export const metadata: Metadata = {
  title: "Học 1000 từ tiếng Anh",
  alternates: { canonical: "/hoc-tieng-anh" },
  description:
    "1000 từ tiếng Anh đầu tiên, học theo lối nhà học Do Thái: học đôi, đọc to, hỏi ngược, và ôn lại đúng lúc sắp quên. Miễn phí, không cần tài khoản.",
};

/**
 * Four practices, named honestly.
 *
 * These are real study habits from the beit midrash, not decoration, and each
 * one is a thing the app actually does rather than a word on a poster. The
 * Hebrew names are here because a child who is being taught someone's method
 * should be told whose it is.
 */
const METHOD = [
  {
    he: "חברותא",
    name: "Chavruta — học đôi",
    body: "Hai người một bàn, đọc to, hỏi lại nhau. Trong buổi học có nút bật chế độ hai người, đổi lượt hỏi sau mỗi từ. Nói cho người khác nghe khó hơn đọc thầm — và đó là lý do nó vào đầu.",
    icon: "👥",
    tone: "bg-grape-tint",
  },
  {
    he: "חזרה",
    name: "Chazara — ôn lại",
    body: "Từ nào cũng quay lại: sau 2 ngày, 4 ngày, 8 ngày, rồi 32 ngày. Trả lời sai thì rơi về đầu và gặp lại ngay hôm đó. Máy giữ lịch, bạn chỉ cần mở ra.",
    icon: "🔁",
    tone: "bg-sun-tint",
  },
  {
    he: "קושיא",
    name: "Kushia — hỏi ngược",
    body: "Học xong một từ, bạn phải đặt một câu hỏi bằng từ đó. Không ai chấm câu hỏi của bạn — máy không chấm nổi. Nhưng chưa hỏi được về một từ nghĩa là chưa thật sự quen nó.",
    icon: "❓",
    tone: "bg-sky-tint",
  },
  {
    he: "ללמד",
    name: "Dạy lại",
    body: "Cuối mỗi buổi, chọn 3 từ và dạy cho em, cho anh, cho mẹ. Chỗ nào bạn ấp úng chính là chỗ bạn chưa nhớ. Đây là bước không có nút bấm nào thay được.",
    icon: "🧑‍🏫",
    tone: "bg-lime-tint",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="Lớp tiếng Anh của tụi em"
        title={
          <>
            1000 TỪ TIẾNG ANH
            <br />
            ĐẦU TIÊN.
          </>
        }
        description="Hưng, Long và Anh đang học đúng bộ từ này, theo đúng cách trong trang này. Ai vào cũng học được, không cần tài khoản, không mất tiền."
        meta={[
          { label: "Số từ", value: `${TOTAL_WORDS}` },
          { label: "Chủ đề", value: `${vocabSets.length}` },
          { label: "Học phí", value: "Miễn phí" },
        ]}
      />

      <div className="container-hla pt-12 pb-6">
        <LearnerPicker />
      </div>

      <div className="container-hla pb-16">
        <WordWall />
      </div>

      <div className="container-hla pb-16">
        <SubjectSwitch current="english" />
      </div>

      {/* ---- the method, and what it does not promise --------------------- */}
      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <p className="eyebrow text-ink-3">Học kiểu gì</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.75rem,5vw,3rem)]">
            BỐN THÓI QUEN MƯỢN TỪ NHÀ HỌC DO THÁI.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed font-semibold text-ink-2">
            Trong <i>beit midrash</i> — nhà học của người Do Thái — gần như không ai học một mình và
            không ai học thầm. Người ta ngồi từng đôi, đọc to, cãi nhau về một câu, rồi quay lại đúng
            câu đó nhiều lần trong nhiều năm. Bốn thói quen dưới đây lấy từ đó, và cái nào cũng là
            việc trang này thật sự bắt bạn làm.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {METHOD.map((m) => (
              <div key={m.name} className={`sticker rounded-[var(--radius-card)] ${m.tone} p-6`}>
                <div className="flex items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-surface text-2xl">
                    {m.icon}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold tracking-tight">{m.name}</p>
                    <p lang="he" dir="rtl" className="text-sm font-semibold text-ink-2">
                      {m.he}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed font-semibold text-ink-2">{m.body}</p>
              </div>
            ))}
          </div>

          {/*
            The one thing the whole page must not do is promise what memory
            cannot deliver. Saying it plainly, in the same size type as the
            rest, is the difference between teaching a child how learning
            works and selling their parent a miracle.
          */}
          <div className="sticker mt-10 rounded-[var(--radius-card)] border-2 border-ink bg-surface p-6 sm:p-8">
            <p className="eyebrow text-ink-3">Nói thật một chuyện</p>
            <h3 className="display mt-3 text-[clamp(1.25rem,3.5vw,1.75rem)]">
              KHÔNG CÓ CÁCH NÀO HỌC MỘT LẦN RỒI NHỚ MÃI MÃI.
            </h3>
            <p className="mt-4 text-sm leading-relaxed font-semibold text-ink-2">
              Trí nhớ nào cũng phai — chuyện đó xảy ra với tất cả mọi người, không phải vì bạn kém.
              Thứ làm được là <b>ôn đúng vào lúc sắp quên</b>: mỗi lần ôn như vậy, từ đó ở lại lâu hơn
              lần trước. Nên trang này không hứa &ldquo;học xong là nhớ cả đời&rdquo;. Nó hứa đúng một
              việc: nhắc bạn ôn đúng ngày, và từ nào bạn quên thì cho gặp lại ngay. Còn lại là công
              của bạn.
            </p>
            <p className="mt-4 text-sm leading-relaxed font-semibold text-ink-2">
              Mỗi ngày 10 phút ăn đứt mỗi tháng 5 tiếng. Đó là lý do có ô &ldquo;ngày liên tiếp&rdquo;
              ở trên.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
