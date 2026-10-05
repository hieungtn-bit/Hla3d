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
