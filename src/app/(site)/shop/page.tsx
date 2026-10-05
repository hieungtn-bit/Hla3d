import type { Metadata } from "next";
import { ShopGrid } from "@/components/products/shop-grid";
import { PageIntro } from "@/components/page-intro";
import { GiftFinderLink } from "@/components/finder/gift-finder-link";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Cửa hàng",
  description:
    "Đồ để bàn, thú khớp nối, bảng tên và quà tặng in 3D tại nhà. Mẫu 3D lấy từ MakerWorld, ba anh em chọn và in ra.",
};

export default function ShopPage() {
  return (
    <>
      <PageIntro
        eyebrow="Cửa hàng"
        title={
          <>
            ĐỒ TỤI EM
            <br />
            TỰ LÀM.
          </>
        }
        description="Mẫu 3D là của các nhà thiết kế trên MakerWorld — Hưng, Long và Anh chưa tự vẽ mẫu được. Phần của ba anh em là tìm mẫu và in ra trên máy in ở nhà. Làm theo đơn trong 3–5 ngày, vì nhà chỉ có một máy in."
        meta={[
          { label: "Số món", value: "15" },
          { label: "Nhóm đồ", value: "5" },
          { label: "Thời gian làm", value: "3–5 ngày" },
        ]}
      />
      <div className="container-hla pb-24">
        <GiftFinderLink />
        <ShopGrid />
      </div>
    </>
  );
}
