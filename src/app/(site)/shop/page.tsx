import type { Metadata } from "next";
import { ShopGrid } from "@/components/products/shop-grid";
import { PageIntro } from "@/components/page-intro";
import { GiftFinderLink } from "@/components/finder/gift-finder-link";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Cửa hàng",
  description:
    "Đồ để bàn, thú khớp mềm, bảng tên khắc riêng và quà tặng — tất cả do ba anh em tự thiết kế và in 3D tại nhà ở Việt Nam.",
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
        description="Mười lăm món do Hưng, Long và Anh tự thiết kế, tự in và tự cầm lên kiểm tra. Làm theo đơn trong 3–5 ngày, vì nhà chỉ có đúng một cái máy in."
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
