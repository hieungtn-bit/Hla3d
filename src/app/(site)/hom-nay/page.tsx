import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { LearnerPicker } from "@/components/learn/learner-picker";
import { TodayBoard } from "@/components/today/today-board";
import { ProgressBackup } from "@/components/today/backup";

export const metadata: Metadata = {
  title: "Hôm nay học gì",
  alternates: { canonical: "/hom-nay" },
  description:
    "Những bài đến hạn ôn hôm nay ở cả ba lớp tiếng Việt, toán và tiếng Anh, và bài nên học tiếp — cho từng bạn nhỏ.",
};

export default function TodayPage() {
  return (
    <>
      <PageIntro
        eyebrow="Mỗi ngày mở trang này trước"
        title={
          <>
            HÔM NAY
            <br />
            HỌC GÌ?
          </>
        }
        description="Lịch ôn của cả ba lớp gom về một chỗ. Ôn những bài đến hạn trước, rồi mới học bài mới — mười phút một ngày ăn đứt năm tiếng một tháng."
      />
      <div className="container-hla pt-12 pb-8">
        <LearnerPicker showToday={false} />
      </div>
      <div className="container-hla pb-16">
        <TodayBoard />
      </div>
      <div className="container-hla pb-24">
        <ProgressBackup />
      </div>
    </>
  );
}
