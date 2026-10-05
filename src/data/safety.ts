/**
 * Safety rules for children around a home 3D printer.
 *
 * Written as guidance — what a family should do — not as a description of a
 * sign on this family's wall. Nobody has confirmed what hangs on the wall, so
 * the site does not claim it.
 */
export const safetyRules = {
  adultOnly: [
    "Đầu phun, bàn in và mọi thứ đang nóng",
    "Thay đầu phun, đổi cuộn nhựa giữa chừng, bảo trì máy",
    "Điện, ổ cắm và cài đặt máy",
    "Dao, kéo, kìm cắt nhựa thừa",
    "Thanh toán, tài khoản trên mạng, địa chỉ khách",
  ],
  kids: [
    "Tìm mẫu 3D trên mạng cùng người lớn",
    "Chọn màu nhựa",
    "Bấm in khi người lớn đã kiểm tra máy",
    "Lấy món in ra khi bàn in đã nguội",
  ],
  house: [
    "Máy không chạy khi trong nhà không có ai.",
    "Đặt máy in ở phòng thoáng khí.",
    "Không chạm vào bàn in và đầu phun khi máy còn nóng.",
    "Nên có báo khói ở gần máy in.",
    "Ngửi thấy mùi khét là dừng máy và gọi người lớn.",
  ],
} as const;
