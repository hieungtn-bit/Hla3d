import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { JsonLd, courseSchema } from "@/components/seo/structured-data";
import { LearnerPicker } from "@/components/learn/learner-picker";
import { VietWall } from "@/components/viet/wall";
import { Section } from "@/components/section";
import { SubjectSwitch } from "@/components/learn/subject-switch";
import { vietSkills } from "@/data/viet";

export const metadata: Metadata = {
  title: "Học tiếng Việt tiểu học",
  alternates: { canonical: "/hoc-tieng-viet" },
  description:
    "Tiếng Việt từ mẫu giáo đến lớp 3: chữ cái, sáu dấu thanh, chính tả c/k, s/x, hỏi/ngã, từ và câu. Hỏi trước rồi mới dạy, ôn lại đúng lúc sắp quên. Miễn phí, không cần tài khoản.",
};

export default function VietPage() {
  const ways = vietSkills.reduce((n, s) => n + s.methods.length, 0);

  return (
    <>
      <JsonLd
        data={courseSchema({
          name: "Tiếng Việt từ mẫu giáo đến lớp 3",
          description: `${vietSkills.length} bài tiếng Việt: chữ cái, sáu dấu thanh, chính tả, từ và câu. Hỏi trước rồi mới dạy, ôn lại theo lịch.`,
          path: "/hoc-tieng-viet",
          level: "Mẫu giáo lớn đến lớp 3",
          teaches: ["Chữ cái tiếng Việt", "Dấu thanh", "Chính tả", "Từ loại", "Kiểu câu"],
        })}
      />
      <PageIntro
        eyebrow="Lớp tiếng Việt của tụi em"
        title={
          <>
            TIẾNG MẸ ĐẺ,
            <br />
            HỌC CHO THẬT KỸ.
          </>
        }
        description="Từ nhận mặt chữ cái đến tách câu làm đôi. Mỗi bài mở đầu bằng một câu hỏi, rồi mới đến các cách làm, cách nhớ — và bài nào cũng nói thật chỗ nào có luật, chỗ nào chỉ có mẹo."
        meta={[
          { label: "Số bài", value: `${vietSkills.length}` },
          { label: "Cách làm, cách nhớ", value: `${ways}` },
          { label: "Học phí", value: "Miễn phí" },
        ]}
      />

      <div className="container-hla pt-12 pb-6">
        <LearnerPicker />
      </div>

      <div className="container-hla pb-16">
        <VietWall />
      </div>

      <div className="container-hla pb-16">
        <SubjectSwitch current="viet" />
      </div>

      <Section className="border-t border-line bg-paper-2">
        <div className="container-hla">
          <p className="eyebrow text-ink-3">Nói thật vài chuyện trước khi học</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(1.75rem,5vw,3rem)]">
            CÓ CHỖ LÀ LUẬT. CÓ CHỖ CHỈ LÀ MẸO.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="sticker rounded-[var(--radius-card)] bg-lime-tint p-6">
              <p className="font-display text-lg font-bold">Chỗ nào có luật thì nói là luật</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
                c/k, g/gh, ng/ngh theo đúng một luật: gặp i, e, ê thì viết dạng dài. Luật này không
                có ngoại lệ, nên bài dạy nó như một luật.
              </p>
            </div>
            <div className="sticker rounded-[var(--radius-card)] bg-sun-tint p-6">
              <p className="font-display text-lg font-bold">Chỗ nào chỉ có mẹo thì nói là mẹo</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
                s/x, tr/ch, d/gi/r không có luật nào đúng cho mọi từ. Bài đưa ra vài mẹo, nói rõ mẹo
                nào sai ở đâu, và nói luôn: không chắc thì tra từ điển — tra không phải là gian lận.
              </p>
            </div>
            <div className="sticker rounded-[var(--radius-card)] bg-sky-tint p-6">
              <p className="font-display text-lg font-bold">Giọng vùng miền không phải nói sai</p>
              <p className="mt-3 text-sm leading-relaxed font-semibold text-ink-2">
                Nhiều nơi đọc s và x giống nhau, nhiều nơi đọc hỏi và ngã giống nhau. Nói theo giọng
                nhà mình là đúng. Viết thì theo chính tả chung — đó là hai chuyện khác nhau.
              </p>
            </div>
          </div>

          <div className="sticker mt-10 rounded-[var(--radius-card)] border-2 border-ink bg-surface p-6 sm:p-8">
            <p className="eyebrow text-ink-3">Và vài chuyện nữa</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed font-semibold text-ink-2">
              <li>
                <b className="text-ink">Bài do nhà em tự viết.</b> Không lấy từ sách hay khoá học nào.
                Phạm vi bám theo Chương trình GDPT 2018 của Bộ GD&amp;ĐT — tài liệu công khai — còn
                câu hỏi, cách làm, câu kushia và kho từ thì tự viết.
              </li>
              <li>
                <b className="text-ink">Không ra đề về chỗ đặt dấu.</b> “Hoà” hay “hòa”, “khoẻ” hay
                “khỏe” — cả hai cách đều được chấp nhận. Trang này viết theo kiểu cũ cho thống nhất,
                nhưng không bao giờ chấm bé sai vì chọn kiểu kia.
              </li>
              <li>
                <b className="text-ink">Dấu thanh được máy tính ra từ chính chữ, không gán bằng tay.</b>{" "}
                Và toàn bộ kho từ được kiểm tra lại theo đúng luật mà bài dạy, trước khi lên trang.
              </li>
              <li>
                <b className="text-ink">Phát âm dùng giọng đọc có sẵn trong máy.</b> Máy nào chưa có
                giọng tiếng Việt thì trang nói rõ và nhờ bố mẹ đọc giúp, chứ không im lặng.
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
