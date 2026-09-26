"use client";

import { createSkillStore } from "@/lib/skill-store";

/** The Tiếng Việt course store — its own key, so it can never touch maths progress. */
export const vietStore = createSkillStore("hla3d.viet.v1");
