"use client";

import { vietSkills } from "@/data/viet";
import { vietStore } from "@/lib/viet-store";
import { CourseWall } from "@/components/course/course-wall";

export function VietWall() {
  return <CourseWall skills={vietSkills} store={vietStore} baseHref="/hoc-tieng-viet" methodNoun="cách" />;
}
