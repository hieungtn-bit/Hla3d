export type MakerRole = "inventor" | "designer" | "tester";

export type Maker = {
  id: MakerRole;
  index: string;
  title: string;
  /** First name only — no surnames and no photographs anywhere on the site. */
  name: string;
  age: number;
  nickname: string;
  quote: string;
  superpower: string;
  favoriteColor: { name: string; hex: string };
  favoritePrint: string;
  learning: string;
  /** Playful signature glyph drawn in the avatar tile. */
  glyph: "bolt" | "compass" | "shield";
  accent: "flame" | "sky" | "lime";
};

export const makers: Maker[] = [
  {
    id: "inventor",
    index: "01",
    title: "NHÀ PHÁT MINH",
    name: "Hưng",
    age: 8,
    nickname: "The Inventor",
    quote: "Có quá nhiều ý tưởng để máy in kịp!",
    superpower: "Biến ý tưởng điên rồ thành đồ thật.",
    favoriteColor: { name: "Lava Orange", hex: "#ff4a17" },
    favoritePrint: "Rồng khớp nối, càng nhiều gai càng tốt",
    learning: "Vẽ ra giấy trước khi ngồi vào máy tính.",
    glyph: "bolt",
    accent: "flame",
  },
  {
    id: "designer",
    index: "02",
    title: "NHÀ THIẾT KẾ",
    name: "Long",
    age: 6,
    nickname: "The Designer",
    quote: "Cái này lệch 1 milimét. Làm lại nha!",
    superpower: "Làm mọi thứ vừa khít và thẳng hàng.",
    favoriteColor: { name: "Sky Blue", hex: "#3fa9f5" },
    favoritePrint: "Bảng tên — tên càng dài càng thích",
    learning: "Vì sao tường phải dày thì đồ mới không gãy.",
    glyph: "compass",
    accent: "sky",
  },
  {
    id: "tester",
    index: "03",
    title: "NGƯỜI THỬ ĐỒ",
    name: "Anh",
    age: 5,
    nickname: "The Tester",
    quote: "Em làm rơi mà nó không gãy là bán được!",
    superpower: "Làm hỏng đồ trước khi khách làm hỏng.",
    favoriteColor: { name: "Lime Green", hex: "#c6f24e" },
    favoritePrint: "Bạch tuộc khớp nối, bản thứ 7",
    learning: "Ghi lại hỏng ở chỗ nào, chứ không chỉ nói là hỏng.",
    glyph: "shield",
    accent: "lime",
  },
];

/** Skill bars shown in the private dashboard. Values are out of 6. */
export const makerSkills = [
  { skill: "Thiết kế", level: 4 },
  { skill: "In 3D", level: 3 },
  { skill: "Chụp ảnh", level: 4 },
  { skill: "Bán hàng", level: 3 },
  { skill: "Tiền bạc", level: 2 },
  { skill: "Chăm sóc khách", level: 3 },
] as const;

export type MakerXp = {
  maker: string;
  role: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  recent: string;
};

export const makerXp: MakerXp[] = [
  {
    maker: "Hưng",
    role: "Nhà phát minh · 8 tuổi",
    level: 4,
    xp: 650,
    nextLevelXp: 750,
    recent: "Vẽ 6 ý tưởng đồ để bàn mới",
  },
  {
    maker: "Long",
    role: "Nhà thiết kế · 6 tuổi",
    level: 4,
    xp: 705,
    nextLevelXp: 750,
    recent: "Sửa khoảng cách chữ trên bảng tên",
  },
  {
    maker: "Anh",
    role: "Người thử đồ · 5 tuổi",
    level: 3,
    xp: 430,
    nextLevelXp: 500,
    recent: "Thử làm rơi con rồng 9 lần",
  },
];

/** How XP is earned — printed and stuck on the wall next to the printer. */
export const xpRules = [
  { action: "Thiết kế xong một món in ra đẹp", xp: 50 },
  { action: "Chụp ảnh sản phẩm cho tử tế", xp: 20 },
  { action: "Đóng gói một đơn không sai gì", xp: 25 },
  { action: "Viết nhật ký về một lần làm hỏng", xp: 40 },
  { action: "Trả lời tin nhắn khách thật lễ phép", xp: 15 },
  { action: "Tự tính ra giá vốn của một món", xp: 30 },
] as const;
