# Nội dung cần Ba xác nhận

Khi dựng trang, để trang có hình hài, nhiều câu chuyện và con số được **viết mẫu** —
không phải lấy từ chuyện thật của Hưng, Long và Anh. Những chỗ nói thẳng "đây là thật"
đã được gỡ ra. Những chỗ dưới đây vẫn đang hiện trên trang, đọc lên như chuyện thật,
và chỉ nhà mình mới biết đúng hay sai.

Mỗi mục ghi rõ file nào, sửa ở đâu. Tất cả đều là file chữ, mở bằng GitHub là sửa được.

---

## 1. Lời hứa với khách — cần đúng trước tiên

Khách đọc những dòng này rồi mới đặt hàng, nên nếu không đúng là đang hứa sai với khách.

- [ ] **"Kèm thiệp do ba anh em viết tay"** — hộp quà có thật sự kèm thiệp viết tay không?
  `src/data/products.ts` (món hộp quà, dòng ~529–535) và `src/data/dashboard.ts` (dòng ~92).
- [ ] **Thời gian in, cân nặng, kích thước** của từng món (`printTime`, `weight`, `size`) —
  là số ước tính khi dựng trang. Đo lại bằng món thật. `src/data/products.ts`.
- [ ] **"Làm theo đơn trong 3–5 ngày"** — có đúng với tốc độ thật của xưởng không?
  `src/app/(site)/shop/page.tsx`, `src/data/lab.ts`, `src/app/feed.json/route.ts`.

## 2. Con số

- [ ] **Mục tiêu 27/100 khách hàng** — số 27 là số thật hay số đặt tạm? Nếu chưa có số thật,
  sửa `current` thành số đơn thật đã bán. `src/data/site.ts` (mục `goal`).
- [ ] **Bài học tiền bạc** — chia một đơn 150.000đ thành tiền nhựa, điện, đóng gói, lời…
  Đây là số ước tính. Trang chủ đang viết "Hầu hết cửa hàng giấu chuyện này, tụi em bày ra hết",
  nên con số càng cần đúng. `src/data/dashboard.ts` (mục `moneyLesson`).
- [ ] **Bảng theo dõi** (`/dashboard`) — toàn bộ doanh thu, lợi nhuận, số đơn là **số mẫu**.
  Trang đã được khoá và có dòng "SỐ LIỆU MẪU". Thay bằng số thật trong `src/data/dashboard.ts`.

## 3. Chuyện của ba anh em

- [ ] **7 bài nhật ký** — kể bằng giọng "tụi em" (lần in đầu tiên, con bạch tuộc hỏng, in 20 tấm
  bảng tên, …). Dòng "do ba anh em tự viết" đã được gỡ. Tốt nhất là để các con kể lại chuyện
  thật rồi thay vào. `src/data/journal.ts`.
- [ ] **Ghi chú của từng món** (`makerNote`) và **ai làm gì** (`madeBy`) — ví dụ "Hưng in · Anh
  bẻ thử 40 lần", "Sáu lần in hỏng". `src/data/products.ts` (15 món).
- [ ] **Tính cách, biệt danh, màu và món yêu thích** của từng bạn. `src/data/makers.ts`.
- [ ] **Chuyện cửa hàng ra đời** ("Ba anh em xin Ba mua một cái máy in 3D…") và đoạn mở đầu
  trang "Chuyện của tụi em". `src/components/home/why-shop.tsx`, `src/app/(site)/about/page.tsx`.
- [ ] **Dòng thời gian sáu tháng đầu** (máy in về nhà tháng 3/2025, sáu con bạch tuộc hỏng, khách
  hàng số 1 mua bạn nhỏ để bàn 79.000đ, …, khách hàng số 27). `src/app/(site)/about/page.tsx` (mục `TIMELINE`).
- [ ] **Hàng chờ in** và **thẻ máy in đang chạy** ở trang Xưởng in — đã ghi là "ví dụ" và
  "bản demo". `src/data/lab.ts`.

---

## Không cần xác nhận

Những phần này đúng theo cách làm ra, không phụ thuộc chuyện riêng của nhà mình:

- 1000 từ tiếng Anh, 24 bài toán, 20 bài tiếng Việt — nội dung học, đã kiểm tra tự động.
- Cảnh báo an toàn của từng món (nhựa PLA mềm ở ~60°C, chi tiết nhỏ, chưa có chứng nhận).
- Số điện thoại, Zalo, email nhận đơn.

## Mở bảng theo dõi

Bảng theo dõi giờ khoá bằng mật khẩu. Đặt mật khẩu trên Vercel:
**Project → Settings → Environment Variables → thêm `DASHBOARD_PASSWORD`**, rồi deploy lại.
Khi mở `/dashboard`, trình duyệt sẽ hỏi tên và mật khẩu — tên gõ gì cũng được, chỉ cần đúng mật khẩu.
Đừng ghi mật khẩu vào file nào trong kho này: kho đang để công khai.
