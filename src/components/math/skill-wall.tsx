"use client";

import { skills } from "@/data/math";
import { mathStore } from "@/lib/math-store";
import { CourseWall } from "@/components/course/course-wall";

export function SkillWall() {
  return <CourseWall skills={skills} store={mathStore} baseHref="/hoc-toan" />;
}
