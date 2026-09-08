import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { LearnerPicker } from "@/components/learn/learner-picker";
import { SkillWall } from "@/components/math/skill-wall";
import { Section } from "@/components/section";
import { SubjectSwitch } from "@/components/learn/subject-switch";
import { skills } from "@/data/math";

export const metadata: Metadata = {
  title: "Học toán tiểu học",
  alternates: { canonical: "/hoc-toan" },
  description:
    "Toán mẫu giáo đến lớp 3, dạy theo lối nhà học Do Thái: hỏi trước rồi mới dạy, mỗi bài có nhiều cách làm, và ôn lại đúng lúc sắp quên. Miễn phí, không cần tài khoản.",
};

export default function MathPage() {
  const methodCount = skills.reduce((n, s) => n + s.methods.length, 0);

  return (
    <>
      <PageIntro
        eyebrow="Lớp toán của tụi em"
        title={
          <>
            TOÁN, NHƯNG
            <br />
            HỎI TRƯỚC ĐÃ.
          </>
        }
        description="Mỗi bài bắt đầu bằng một câu hỏi chưa có đáp án, không phải bằng một công thức. Nghĩ xong mới xem cách làm — mà cách làm thì bài nào cũng có từ hai cách trở lên."
        meta={[
          { label: "Số bài", value: `${skills.length}` },
          { label: "Cách làm", value: `${methodCount}` },
          { label: "Học phí", value: "Miễn phí" },
        ]}
      />

      <div className="container-hla pt-12 pb-6">
        <LearnerPicker />
      </div>

      <div className="container-hla pb-16">
        <SkillWall />
      </div>

      <div className="container-hla pb-16">
        <SubjectSwitch current="math" />
      </div>

      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <p className="eyebrow text-ink-3">Vì sao lại dạy kiểu này</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.75rem,5vw,3rem)]">
            MỘT BÀI GIẢI XONG MỘT CÁCH THÌ CHƯA GỌI LÀ XONG.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="sticker rounded-[var(--radius-card)] bg-sky-tint p-6">
              <p className="font-display text-lg font-bold">Hỏi trước, dạy sau</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
                Mở bài nào cũng gặp một câu hỏi trước tiên, chưa có công thức nào. Đưa quy tắc ra
                trước rồi bắt luyện thì bé học được cách chờ quy tắc. Hỏi trước thì quy tắc trở thành
                câu trả lời cho một chuyện bé đã tò mò.
              </p>
            </div>
            <div className="sticker rounded-[var(--radius-card)] bg-grape-tint p-6">
              <p className="font-display text-lg font-bold">Nhiều cách làm, cách nào cũng đúng</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
                Bài nào cũng có ít nhất hai cách. Đây là điểm giống nhà học Do Thái nhất — ở đó một
                câu có nhiều cách đọc cùng đứng được. Mà trong toán cũng đúng vậy: bé chỉ biết một
                cách là kẹt ngay khi cách đó hỏng.
              </p>
            </div>
            <div className="sticker rounded-[var(--radius-card)] bg-lime-tint p-6">
              <p className="font-display text-lg font-bold">Làm đúng chưa chắc đã hiểu</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
                Cuối bài luôn có một câu hỏi khó — <i>kushia</i>. Làm đúng 6 bài mới là làm được;
                trả lời được câu đó mới là hiểu. Câu này không ai chấm, vì máy không nghe được bé
                nói và cũng không giả vờ nghe được.
              </p>
            </div>
          </div>

          <div className="sticker mt-10 rounded-[var(--radius-card)] border-2 border-ink bg-surface p-6 sm:p-8">
            <p className="eyebrow text-ink-3">Nói rõ vài chuyện</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed font-semibold text-ink-2">
              <li>
                <b className="text-ink">Bài do nhà em tự viết.</b> Nội dung ở đây không lấy từ sách
                hay khoá học nào. Phạm vi kiến thức bám theo Chương trình GDPT 2018 của Bộ GD&amp;ĐT —
                đó là tài liệu công khai — còn câu hỏi, cách làm và câu kushia thì tự viết.
              </li>
              <li>
                <b className="text-ink">Đề bài do máy sinh ra, không lặp lại.</b> Nên bé làm bao nhiêu
                lần cũng có đề mới, và không thể học thuộc đáp án thay vì học cách làm.
              </li>
              <li>
                <b className="text-ink">Đúng 5/6 trở lên mới được lên bậc.</b> Một câu may mắn không
                tính là thuộc, mà một câu bấm nhầm cũng không kéo bé tụt xuống.
              </li>
              <li>
                <b className="text-ink">Đây không phải trường học.</b> Không có giáo viên, không chấm
                phần nói, không cấp chứng chỉ. Nó là chỗ ba anh em luyện, để mở cho ai muốn dùng chung.
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
