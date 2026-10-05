# Việc cho người lớn

**Hai luật của trang**

1. **Không có chuyện bịa.** Ba anh em chưa tự thiết kế được mẫu 3D. Các bé biết tìm mẫu trên
   MakerWorld và in ra, và trang chỉ nói đúng chừng đó.
2. **Không thương mại.** Trang để các cháu học. Máy in 3D là để học và chơi, không để bán.

`npm run test:content` báo lỗi nếu chuyện bịa cũ hoặc giỏ hàng, đặt hàng, giá tiền quay lại.

---

## Đã gỡ khỏi trang

- **Toàn bộ phần bán hàng:** cửa hàng 15 món, giỏ hàng, form đặt hàng và email đơn, chọn quà,
  in tên riêng, thanh "gọi đặt hàng", bảng doanh thu `/dashboard`, bài học tiền lời một món
  150.000đ, lớp "startup", và `feed.json`.
- **Số điện thoại và Zalo** ở chân trang và các trang khác — chúng chỉ để nhận đơn. Chân trang giờ
  chỉ còn một đường dẫn email để góp ý bài học. Muốn đưa số điện thoại lên lại thì báo.
- **Những chuyện viết mẫu đọc lên như thật:** "Long thiết kế", lời nhắn của ba anh em, nhãn "bán
  chạy nhất", bộ đếm 27/100 khách, tính cách từng bạn, dòng thời gian, nhật ký, trang Xưởng in giả.

Mọi đường dẫn cũ (`/shop`, `/dat-hang`, `/chon-qua`, `/custom`, `/dashboard`, `/lab`, `/journal`)
tự chuyển sang trang mới, không ra trang lỗi.

Không còn biến môi trường `RESEND_API_KEY` hay `DASHBOARD_PASSWORD` nào cần thiết. Nếu đã đặt trên
Vercel thì có thể xoá.

---

## Việc nên làm

- [ ] **Ghi lại món các bé in thật.** Mỗi khi in xong một món, thêm vào `prints` trong
  `src/data/print-corner.ts`:
  ```ts
  {
    name: "Rồng khớp nối",
    printedBy: "Hưng",
    when: "Tháng 10, 2026",
    modelUrl: "https://makerworld.com/...",
    designer: "Tên nhà thiết kế, đúng như MakerWorld ghi",
    learned: "Một điều các bé tự nói ra, nếu có.",
  },
  ```
  Trang Góc in 3D sẽ hiện món đó, kèm tên và đường dẫn tới người làm ra mẫu. Chưa có món nào thì
  trang ghi "Chưa ghi món nào", không bày ví dụ giả.
- [ ] **Giấy phép mẫu 3D.** In để học và chơi trong nhà thì hầu hết giấy phép trên MakerWorld đều
  cho phép. Nếu sau này muốn tặng hay bán bản in, đọc lại giấy phép của từng mẫu trước.
- [ ] **Khi có chuyện thật để kể** — món đầu tiên tự vẽ, một lần in hỏng — thêm vào mục `FACTS`
  trong `src/app/(site)/about/page.tsx`, kể bằng lời của các bé.

## Cần xác nhận

- [ ] **Năm bắt đầu 2025** — hiện ở chân trang (©) và trong dữ liệu cho Google.
  `src/data/site.ts` (`founded`).
- [ ] **"Ba trông chừng việc học và máy in."** — `src/app/(site)/about/page.tsx` (mục `FACTS`).
- [ ] **Email góp ý `hieungtn@gmail.com`** ở chân trang — giữ hay đổi.
  `src/components/layout/site-footer.tsx`.

## Không cần xác nhận

- 1000 từ tiếng Anh, 24 bài toán, 20 bài tiếng Việt — nội dung học, đã kiểm tra tự động.
- Câu hỏi mẫu ở Góc in 3D — ghi rõ là câu hỏi để hỏi, không kể là chuyện đã xảy ra.
- Luật an toàn khi trẻ dùng máy in 3D — viết như lời khuyên nên làm.
