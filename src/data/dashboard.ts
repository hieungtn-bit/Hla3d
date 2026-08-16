/**
 * Private dashboard mock data — Dad + the three makers.
 * Kept in one file so a Supabase query can replace it later without
 * touching a single component.
 */

export const thisMonth = {
  label: "Tháng 8, 2025",
  orders: 19,
  revenue: 2450000,
  materialCost: 620000,
  profit: 1380000,
  otherCost: 450000,
  plaUsed: 2.4,
  printHours: 78,
  failedPrints: 6,
  productsSold: 31,
  newCustomers: 11,
} as const;

export const lastMonth = {
  orders: 14,
  revenue: 1780000,
  profit: 940000,
  printHours: 61,
  failedPrints: 9,
  productsSold: 22,
} as const;

export type MonthPoint = {
  month: string;
  revenue: number;
  profit: number;
  orders: number;
};

export const monthlyHistory: MonthPoint[] = [
  { month: "T3", revenue: 180000, profit: 60000, orders: 2 },
  { month: "T4", revenue: 420000, profit: 165000, orders: 4 },
  { month: "T5", revenue: 690000, profit: 290000, orders: 6 },
  { month: "T6", revenue: 1240000, profit: 580000, orders: 9 },
  { month: "T7", revenue: 1780000, profit: 940000, orders: 14 },
  { month: "T8", revenue: 2450000, profit: 1380000, orders: 19 },
];

export type TopProduct = {
  name: string;
  slug: string;
  units: number;
  revenue: number;
};

export const topProducts: TopProduct[] = [
  { name: "Custom Name Plate", slug: "custom-name-plate", units: 11, revenue: 1419000 },
  { name: "Keychain", slug: "keychain", units: 8, revenue: 360000 },
  { name: "Flexi Dragon", slug: "flexi-dragon", units: 4, revenue: 596000 },
  { name: "Phone Stand", slug: "phone-stand", units: 4, revenue: 380000 },
  { name: "Desk Buddy", slug: "desk-buddy", units: 4, revenue: 316000 },
];

/** The money lesson — a single 150.000đ sale, taken apart. */
export const moneyLesson = {
  salePrice: 150000,
  breakdown: [
    {
      key: "material",
      label: "Nhựa",
      labelVi: "Nhựa PLA",
      amount: 25000,
      hex: "#3fa9f5",
      note: "Khoảng 75 gam nhựa.",
    },
    {
      key: "electricity",
      label: "Điện",
      labelVi: "Điện",
      amount: 5000,
      hex: "#ffc93c",
      note: "Máy in chạy khoảng 120W.",
    },
    {
      key: "packaging",
      label: "Đóng gói",
      labelVi: "Đóng gói",
      amount: 10000,
      hex: "#c6f24e",
      note: "Hộp, giấy lót, sticker và một tấm thiệp viết tay.",
    },
    {
      key: "machine",
      label: "Quỹ máy móc",
      labelVi: "Quỹ máy móc",
      amount: 20000,
      hex: "#8b8b95",
      note: "Để dành sửa hoặc thay máy in.",
    },
    {
      key: "profit",
      label: "Lợi nhuận",
      labelVi: "Lợi nhuận",
      amount: 90000,
      hex: "#ff4a17",
      note: "Phần thật sự còn lại của ba anh em.",
    },
  ],
  profitSplit: [
    {
      key: "save",
      label: "SAVE",
      labelVi: "Tiết kiệm",
      percent: 40,
      hex: "#3fa9f5",
      note: "Bỏ vào ngân hàng. Không đụng tới.",
    },
    {
      key: "reinvest",
      label: "REINVEST",
      labelVi: "Tái đầu tư",
      percent: 40,
      hex: "#ff4a17",
      note: "Mua nhựa mới, dụng cụ tốt hơn, và cái máy tiếp theo.",
    },
    {
      key: "spend",
      label: "SPEND",
      labelVi: "Được tiêu",
      percent: 20,
      hex: "#c6f24e",
      note: "Của ba anh em. Tự kiếm, không phải được cho.",
    },
  ],
} as const;

export const dashboardNotes = [
  "Số lần in hỏng giảm từ 9 xuống 6 sau khi tụi em bắt đầu cân nhựa trước mỗi lần in.",
  "Bảng tên chiếm 58% doanh thu. Chỉ phụ thuộc một món là rất rủi ro.",
  "Quỹ máy móc đang có 540.000đ. Máy in thứ hai tốn khoảng 5.000.000đ.",
] as const;
