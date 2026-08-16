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
    job: "CUSTOM NAMEPLATE",
    progress: 68,
    timeRemaining: "01:42",
    filament: "PLA RED",
    filamentHex: "#ff4a17",
    nozzleTemp: 205,
    bedTemp: 60,
    layer: { current: 168, total: 247 },
    startedBy: "Maker #02",
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
  { job: "Flexi Dragon", qty: 2, eta: "8h 50m", color: "Lime", hex: "#c6f24e", owner: "Maker #01" },
  { job: "Bag Tag — LINH", qty: 1, eta: "35m", color: "Sky Blue", hex: "#3fa9f5", owner: "Maker #02" },
  { job: "Cable Organizer", qty: 6, eta: "4h 30m", color: "Carbon Black", hex: "#1c1c22", owner: "Maker #03" },
  { job: "Keychain batch", qty: 12, eta: "5h 00m", color: "Silk Gold", hex: "#d9a441", owner: "Maker #03" },
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
  { color: "Lava Orange", hex: "#ff4a17", remaining: 42, grams: 420 },
  { color: "Carbon Black", hex: "#1c1c22", remaining: 78, grams: 780 },
  { color: "Cloud White", hex: "#f4f2ee", remaining: 61, grams: 610 },
  { color: "Sky Blue", hex: "#3fa9f5", remaining: 25, grams: 250 },
  { color: "Lime Green", hex: "#c6f24e", remaining: 54, grams: 540 },
  { color: "Silk Gold", hex: "#d9a441", remaining: 88, grams: 880 },
];

/** The rules that hang on the wall of the lab, in the makers' own words. */
export const safetyRules = {
  dadOnly: [
    "Hotend, nozzle changes and anything above 60°C",
    "Electricity, power strips and firmware",
    "Payments, refunds and online accounts",
    "Shipping labels and customer addresses",
    "Machine maintenance and belt tensioning",
    "Any tool with a blade",
  ],
  makers: [
    "Sketching and designing on the computer",
    "Choosing colours and filament combinations",
    "Photographing finished products",
    "Testing, bending, dropping and reporting",
    "Packing simple orders (no blades, no tape gun)",
    "Working out cost, price and profit with Dad",
  ],
  house: [
    "The printer never runs while nobody is home.",
    "Printing happens in a ventilated room, door open.",
    "Nobody touches the plate until it reads under 40°C.",
    "A smoke alarm sits above the printer bench.",
    "If something smells wrong, we stop the job and tell Dad.",
  ],
} as const;
