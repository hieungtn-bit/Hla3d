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
      label: "Material",
      labelVi: "Nhựa PLA",
      amount: 25000,
      hex: "#3fa9f5",
      note: "About 75 grams of filament.",
    },
    {
      key: "electricity",
      label: "Electricity",
      labelVi: "Điện",
      amount: 5000,
      hex: "#ffc93c",
      note: "The printer runs at roughly 120W.",
    },
    {
      key: "packaging",
      label: "Packaging",
      labelVi: "Đóng gói",
      amount: 10000,
      hex: "#c6f24e",
      note: "Box, tissue, sticker and a handwritten card.",
    },
    {
      key: "machine",
      label: "Machine Fund",
      labelVi: "Quỹ máy móc",
      amount: 20000,
      hex: "#8b8b95",
      note: "Set aside so we can repair or replace the printer.",
    },
    {
      key: "profit",
      label: "Profit",
      labelVi: "Lợi nhuận",
      amount: 90000,
      hex: "#ff4a17",
      note: "What is actually left for the makers.",
    },
  ],
  profitSplit: [
    {
      key: "save",
      label: "SAVE",
      labelVi: "Tiết kiệm",
      percent: 40,
      hex: "#3fa9f5",
      note: "Into the bank. Not touched.",
    },
    {
      key: "reinvest",
      label: "REINVEST",
      labelVi: "Tái đầu tư",
      percent: 40,
      hex: "#ff4a17",
      note: "New filament, better tools, the next machine.",
    },
    {
      key: "spend",
      label: "SPEND",
      labelVi: "Được tiêu",
      percent: 20,
      hex: "#c6f24e",
      note: "Theirs. Earned, not given.",
    },
  ],
} as const;

export const dashboardNotes = [
  "Failed prints dropped from 9 to 6 after we started weighing filament before every job.",
  "Name plates are 58% of revenue. We are one product away from a real problem.",
  "Machine fund is at 540.000đ. A second printer costs about 5.000.000đ.",
] as const;
