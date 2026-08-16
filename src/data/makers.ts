export type MakerRole = "inventor" | "designer" | "tester";

export type Maker = {
  id: MakerRole;
  index: string;
  title: string;
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
    title: "THE INVENTOR",
    nickname: "Maker #01",
    quote: "Có quá nhiều ý tưởng để máy in kịp.",
    superpower: "Turning crazy ideas into objects.",
    favoriteColor: { name: "Lava Orange", hex: "#ff4a17" },
    favoritePrint: "Articulated dragons with too many spikes",
    learning: "Sketching an idea before touching the computer.",
    glyph: "bolt",
    accent: "flame",
  },
  {
    id: "designer",
    index: "02",
    title: "THE DESIGNER",
    nickname: "Maker #02",
    quote: "Cái này lệch 1 milimét. Làm lại nha.",
    superpower: "Making things fit, line up and look right.",
    favoriteColor: { name: "Sky Blue", hex: "#3fa9f5" },
    favoritePrint: "Name plates — especially long, tricky names",
    learning: "Tolerances, fillets and why walls need thickness.",
    glyph: "compass",
    accent: "sky",
  },
  {
    id: "tester",
    index: "03",
    title: "THE TESTER",
    nickname: "Maker #03",
    quote: "Nếu em làm rơi mà nó không gãy, mình bán được.",
    superpower: "Breaking things before a customer can.",
    favoriteColor: { name: "Lime Green", hex: "#c6f24e" },
    favoritePrint: "Flexi octopus, version 7",
    learning: "Writing down what failed, not just that it failed.",
    glyph: "shield",
    accent: "lime",
  },
];

/** Skill bars shown in the private dashboard. Values are out of 6. */
export const makerSkills = [
  { skill: "Design", level: 4 },
  { skill: "Printing", level: 3 },
  { skill: "Photography", level: 4 },
  { skill: "Selling", level: 3 },
  { skill: "Money", level: 2 },
  { skill: "Customer Service", level: 3 },
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
    maker: "Maker #01",
    role: "The Inventor",
    level: 4,
    xp: 650,
    nextLevelXp: 750,
    recent: "Sketched 6 new desk ideas",
  },
  {
    maker: "Maker #02",
    role: "The Designer",
    level: 4,
    xp: 705,
    nextLevelXp: 750,
    recent: "Fixed the name plate font spacing",
  },
  {
    maker: "Maker #03",
    role: "The Tester",
    level: 3,
    xp: 430,
    nextLevelXp: 500,
    recent: "Logged 9 drop tests on the flexi dragon",
  },
];

/** How XP is earned — printed and stuck on the wall next to the printer. */
export const xpRules = [
  { action: "Finish a design that prints cleanly", xp: 50 },
  { action: "Photograph a product properly", xp: 20 },
  { action: "Pack an order with no mistakes", xp: 25 },
  { action: "Write a journal entry about a failure", xp: 40 },
  { action: "Answer a customer message politely", xp: 15 },
  { action: "Work out the real cost of a print", xp: 30 },
] as const;
