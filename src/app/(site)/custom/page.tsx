import type { Metadata } from "next";
import { Suspense } from "react";
import { CustomStudio } from "@/components/custom/custom-studio";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  alternates: { canonical: "/custom" },
  title: "In tên riêng",
  description:
    "Bảng tên, thẻ đeo cặp hay móc khoá in tên của bạn. Chọn tên, chọn màu, xem thử trước khi đặt.",
};

export default async function CustomPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <>
      <PageIntro
        eyebrow="In tên riêng"
        title={
          <>
            CHỌN TÊN,
            <br />
            CHỌN MÀU.
          </>
        }
        description="Gõ tên, chọn màu, chọn cỡ rồi xem thử. Đây là hình xem trước để bạn chọn — tụi em in bằng mẫu bảng tên có sẵn trên MakerWorld, nên kiểu chữ thật có thể khác một chút."
        meta={[
          { label: "Giá từ", value: "45.000đ" },
          { label: "Thời gian làm", value: "3–5 ngày" },
          { label: "Tiếng Việt", value: "Có dấu ✓" },
        ]}
      />

      <div className="container-hla py-14 sm:py-20">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-[var(--radius-xl2)] bg-paper-2" />}>
          <CustomStudio initialProduct={product} />
        </Suspense>
      </div>
    </>
  );
}
