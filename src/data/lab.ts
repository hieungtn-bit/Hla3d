export type PrinterStatus = "printing" | "idle" | "cooling" | "maintenance";

export type PrinterState = {
  id: string;
  model: string;
  status: PrinterStatus;
  job: string;
  progress: number;
  timeRemaining: string;
  filament: string;
  filamentHex: string;
  nozzleTemp: number;
  bedTemp: number;
  layer: { current: number; total: number };
  startedBy: string;
};

/**
 * MVP note: this is a demo dashboard. Values are static mock data.
 * The shape matches what a Moonraker / OctoPrint style API would return,
 * so wiring a real feed later is a data-source swap, not a rewrite.
 */
export const printers: PrinterState[] = [
  {
    id: "PRINTER #01",
    model: "Anycubic Kobra X",
    status: "printing",
    job: "BẢNG TÊN THEO YÊU CẦU",
    progress: 68,
    timeRemaining: "01:42",
    filament: "PLA ĐỎ",
    filamentHex: "#ff4a17",
    nozzleTemp: 205,
    bedTemp: 60,
    layer: { current: 168, total: 247 },
    startedBy: "Long",
  },
];

export type QueueItem = {
  job: string;
  qty: number;
  eta: string;
  color: string;
  hex: string;
  owner: string;
};

export const printQueue: QueueItem[] = [
  { job: "Rồng khớp nối", qty: 2, eta: "8h 50m", color: "Xanh lá", hex: "#c6f24e", owner: "Hưng" },
  { job: "Thẻ tên cặp — LINH", qty: 1, eta: "35m", color: "Xanh da trời", hex: "#3fa9f5", owner: "Long" },
  { job: "Kẹp gom dây", qty: 6, eta: "4h 30m", color: "Đen", hex: "#1c1c22", owner: "Anh" },
  { job: "Lô móc khoá", qty: 12, eta: "5h 00m", color: "Vàng ánh kim", hex: "#d9a441", owner: "Anh" },
];

export const labStats = [
  { label: "Giờ in tháng này", value: "78h" },
  { label: "Nhựa PLA đã dùng", value: "2.4 kg" },
  { label: "Lượt in xong", value: "63" },
  { label: "Tỉ lệ thành công", value: "91%" },
] as const;

export type FilamentStock = {
  color: string;
  hex: string;
  remaining: number;
  grams: number;
};

export const filamentStock: FilamentStock[] = [
  { color: "Cam núi lửa", hex: "#ff4a17", remaining: 42, grams: 420 },
  { color: "Đen", hex: "#1c1c22", remaining: 78, grams: 780 },
  { color: "Trắng mây", hex: "#f4f2ee", remaining: 61, grams: 610 },
  { color: "Xanh da trời", hex: "#3fa9f5", remaining: 25, grams: 250 },
  { color: "Xanh lá", hex: "#c6f24e", remaining: 54, grams: 540 },
  { color: "Vàng ánh kim", hex: "#d9a441", remaining: 88, grams: 880 },
];

/** The rules that hang on the wall of the lab, in the makers' own words. */
export const safetyRules = {
  dadOnly: [
    "Đầu phun, thay đầu phun và mọi thứ nóng trên 60°C",
    "Điện, ổ cắm và phần mềm máy",
    "Thanh toán, hoàn tiền và tài khoản trên mạng",
    "Nhãn gửi hàng và địa chỉ khách",
    "Bảo trì máy và căng dây đai",
    "Bất kỳ dụng cụ nào có lưỡi dao",
  ],
  makers: [
    "Vẽ phác và thiết kế trên máy tính",
    "Chọn màu và phối cuộn nhựa",
    "Chụp ảnh sản phẩm đã xong",
    "Thử, bẻ, làm rơi và ghi lại kết quả",
    "Đóng gói đơn đơn giản (không dao, không súng băng keo)",
    "Ngồi tính giá vốn, giá bán và lợi nhuận cùng Ba",
  ],
  house: [
    "Máy không bao giờ chạy khi trong nhà không có ai.",
    "Máy in đặt ở phòng thoáng, luôn mở cửa.",
    "Không ai chạm vào bàn in cho tới khi nhiệt độ xuống dưới 40°C.",
    "Có một cái báo khói gắn ngay phía trên bàn máy in.",
    "Ngửi thấy mùi lạ là dừng máy và gọi Ba ngay.",
  ],
} as const;
