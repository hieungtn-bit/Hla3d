import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { OrderForm } from "@/components/order/order-form";

export const metadata: Metadata = {
  title: "Đặt hàng",
  alternates: { canonical: "/dat-hang" },
  description:
    "Để lại thông tin, mẹ Hiếu sẽ gọi xác nhận rồi ba anh em mới bắt đầu in. Chưa thanh toán trên web.",
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  return (
    <>
      <PageIntro
        eyebrow="Đặt hàng"
        title={
          <>
            ĐỂ LẠI
            <br />
            THÔNG TIN.
          </>
        }
        description="Tụi em chưa nhận thanh toán online. Bạn điền thông tin ở đây, mẹ Hiếu gọi lại xác nhận món, màu và phí ship, rồi ba anh em mới bắt đầu in."
        meta={[
          { label: "Thời gian làm", value: "3–5 ngày" },
          { label: "Thanh toán", value: "Khi nhận hàng" },
          { label: "Xác nhận", value: "Gọi điện" },
        ]}
      />
      <div className="container-hla py-14 sm:py-20">
        <OrderForm />
      </div>
    </>
  );
}
