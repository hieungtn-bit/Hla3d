export type MakerRole = "inventor" | "designer" | "tester";

/**
 * The three brothers — only what the family has actually said.
 *
 * `id` picks a cartoon avatar and nothing else; it is not a job title. The
 * brothers do not design models yet: they find them on MakerWorld and print
 * them. Personalities, quotes and favourite prints were once written here
 * as placeholders and read like fact, so they were removed.
 */
export type Maker = {
  id: MakerRole;
  /** First name only — no surnames and no photographs anywhere on the site. */
  name: string;
  age: number;
  accent: "flame" | "sky" | "lime";
};

export const makers: Maker[] = [
  { id: "inventor", name: "Hưng", age: 8, accent: "flame" },
  { id: "designer", name: "Long", age: 6, accent: "sky" },
  { id: "tester", name: "Anh", age: 5, accent: "lime" },
];

/** SAMPLE DATA for the private dashboard. Skill bars, out of 6. */
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

/** SAMPLE DATA for the private dashboard: how XP could be earned. */
export const xpRules = [
  { action: "Thiết kế xong một món in ra đẹp", xp: 50 },
  { action: "Chụp ảnh sản phẩm cho tử tế", xp: 20 },
  { action: "Đóng gói một đơn không sai gì", xp: 25 },
  { action: "Viết nhật ký về một lần làm hỏng", xp: 40 },
  { action: "Trả lời tin nhắn khách thật lễ phép", xp: 15 },
  { action: "Tự tính ra giá vốn của một món", xp: 30 },
] as const;
