# Việc cần Ba làm

**Luật của trang: không có chuyện bịa.** Ba anh em chưa tự thiết kế được mẫu 3D. Các bé
biết tìm mẫu trên MakerWorld và in ra, và trang chỉ nói đúng chừng đó.

Mỗi mục bên dưới ghi rõ file nào, sửa ở đâu. Tất cả đều là file chữ, mở bằng GitHub là sửa được.

---

## Đã gỡ khỏi trang

Những phần này là chuyện viết mẫu lúc dựng trang, nhưng đọc lên như chuyện thật nên đã bị gỡ:

- "Long thiết kế", "Hưng in · Anh bẻ thử 40 lần", lời nhắn của ba anh em ở từng món, và nhãn
  "BÁN CHẠY NHẤT", "TỤI EM THÍCH NHẤT", "KHÓ IN NHẤT".
- Thời gian in, cân nặng, kích thước, độ khó và các số đo như 62°, 28 đốt, 0,25mm.
- Câu "không món nào mua về bán lại, tất cả đều được vẽ ở đây".
- Bộ đếm "27/100 khách hàng" ở chân trang, giỏ hàng và trang chủ. Số này giờ chỉ còn trong
  bảng theo dõi riêng.
- Tính cách, câu nói, "siêu năng lực" và món yêu thích của từng bạn.
- Dòng thời gian sáu tháng, câu chuyện ra đời của cửa hàng, câu trích dẫn của Ba và mục
  "Ba là nhà đầu tư".
- Bảy bài nhật ký, toàn bộ trang Xưởng in (máy đang in, hàng chờ, kệ nhựa, "14 kg nhựa") và
  tên mẫu máy in. Đường dẫn `/lab` và `/journal` giờ tự chuyển về trang Chuyện của tụi em.
- Thiệp viết tay trong hộp quà.

`npm run test:content` sẽ báo lỗi nếu một trong những câu này quay lại.

---

## 1. Bản quyền mẫu 3D — cần làm trước tiên

Mẫu trên MakerWorld là của người khác. **Mỗi mẫu có giấy phép riêng, ghi ở trang của mẫu đó.
Chỉ được bán bản in khi giấy phép cho phép dùng vào việc buôn bán.** Trang đang bán 15 món mà
chưa ghi mẫu nào lấy từ đâu.

Cách đọc nhanh giấy phép:

| Giấy phép ghi trên trang mẫu | Bán bản in được không? |
|---|---|
| Có chữ **NC** (CC BY-NC, BY-NC-SA, BY-NC-ND) | **Không.** NC nghĩa là không dùng để buôn bán. |
| Giấy phép mặc định của MakerWorld (Standard Digital File License) | **Không**, trừ khi nhà thiết kế cho phép riêng. Đọc kỹ điều khoản trên trang mẫu. |
| CC BY, CC BY-SA | Được, nhưng **phải ghi tên nhà thiết kế**. |
| CC BY-ND | Được bán nguyên mẫu, nhưng **không được sửa**, kể cả đổi tên in lên bảng tên. |
| CC0 | Được. |

Không chắc thì nhắn hỏi thẳng nhà thiết kế. Có người cho phép, có người bán giấy phép
thương mại riêng.

Với **từng món** trong `src/data/products.ts`:

- [ ] Tìm đúng mẫu trên MakerWorld mà nhà mình in cho món đó.
- [ ] Nếu giấy phép cho bán, điền phần `source` vào món đó. Trang sẽ tự hiện tên và đường
  dẫn tới nhà thiết kế:
  ```ts
  source: {
    designer: "Tên nhà thiết kế, đúng như MakerWorld ghi",
    url: "https://makerworld.com/...",
    license: "CC BY 4.0",
  },
  ```
- [ ] Nếu giấy phép không cho bán, xoá món đó khỏi danh sách hoặc thay bằng một mẫu khác
  được phép bán.

Trong lúc chưa kiểm tra xong, Ba cân nhắc có nên tạm ngưng nhận đơn không. Việc này là Ba
quyết định, trang chưa tự chặn đơn.

## 2. Lời hứa với khách vẫn đang có trên trang

Khách đọc những dòng này rồi mới đặt hàng. Dòng nào nhà mình không làm được thì sửa hoặc xoá.

- [ ] **Danh sách 15 món và giá** — mỗi món phải in được từ một mẫu MakerWorld thật (xem mục 1).
  Mô tả từng món giờ chỉ tả đồ vật. Đọc lại xem có đúng với mẫu thật không, ví dụ: ống bút in
  kiểu xoắn ốc, móc khoá kèm khoen sắt, hộp quà có ba món.
  `src/data/products.ts`.
- [ ] **"Làm theo đơn 3–5 ngày"** — trang Cửa hàng, trang từng món, In tên riêng, `feed.json`.
- [ ] **"Hỏng khi nhận: tụi em in lại"** — `src/components/products/product-detail.tsx`.
- [ ] **"Có email thì tụi em gửi ảnh sản phẩm trước khi đóng gói"** và **"gọi lại trong hôm
  nay hoặc sáng mai"** — `src/components/order/order-form.tsx`.
- [ ] **In tên riêng** (`/custom`): bảng tên hai màu, ba kiểu chữ, ba cỡ. Nhà mình có in
  được như vậy từ mẫu MakerWorld không? Trang đã ghi rõ kiểu chữ thật có thể khác và mẹ Hiếu sẽ
  nói lại khi gọi xác nhận. `src/components/custom/custom-studio.tsx`.

## 3. Thông tin nhỏ còn lại

- [ ] **Năm bắt đầu 2025** — hiện ở chân trang (©) và trong dữ liệu cho Google.
  `src/data/site.ts` (`founded`).
- [ ] **"Ba trông chừng việc học và máy in. Mẹ Hiếu nhận đơn và gọi lại cho khách."** —
  `src/app/(site)/about/page.tsx` (mục `FACTS`).
- [ ] **Bảng theo dõi** (`/dashboard`) — vẫn là số mẫu: doanh thu, đơn, điểm kinh nghiệm,
  "Nhà thiết kế". Trang đã khoá và có dòng "SỐ LIỆU MẪU". Thay bằng số thật hoặc để đó.
  `src/data/dashboard.ts`, `src/data/makers.ts`, `src/data/site.ts` (`goal`).

Phần **bài học tiền bạc** (một món 150.000đ chia ra thế nào) đã ghi rõ là ví dụ ước tính,
không phải sổ sách thật, nên không cần xác nhận.

## 4. Khi có chuyện thật

Khi ba anh em có chuyện thật để kể — món đầu tiên tự vẽ, một lần in hỏng, vị khách đầu tiên —
thêm vào mục `FACTS` trong `src/app/(site)/about/page.tsx`, kể bằng lời của các bé. Trang nhật
ký đã bị gỡ; có đủ chuyện thật thì dựng lại.

---

## Không cần xác nhận

- 1000 từ tiếng Anh, 24 bài toán, 20 bài tiếng Việt — nội dung học, đã kiểm tra tự động.
- Cảnh báo an toàn của từng món (nhựa PLA mềm ở khoảng 60°C, chi tiết nhỏ, chưa có chứng nhận).
- Luật an toàn khi trẻ dùng máy in 3D ở trang Chuyện của tụi em — viết như lời khuyên nên làm,
  không nói là tờ giấy dán trên tường nhà mình.
- Số điện thoại, Zalo, email nhận đơn.

## Mở bảng theo dõi

Bảng theo dõi khoá bằng mật khẩu. Đặt mật khẩu trên Vercel:
**Project → Settings → Environment Variables → thêm `DASHBOARD_PASSWORD`**, rồi deploy lại.
Khi mở `/dashboard`, trình duyệt sẽ hỏi tên và mật khẩu — tên gõ gì cũng được, chỉ cần đúng mật khẩu.
Đừng ghi mật khẩu vào file nào trong kho này: kho đang để công khai.
