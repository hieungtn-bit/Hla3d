import type { MetadataRoute } from "next";
import { vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";
import { vietSkills } from "@/data/viet";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/hom-nay", "/hoc-tieng-viet", "/hoc-toan", "/hoc-tieng-anh", "/goc-in-3d", "/about",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const learnRoutes = vocabSets.map((s) => ({
    url: absoluteUrl(`/hoc-tieng-anh/${s.id}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const mathRoutes = skills.map((s) => ({
    url: absoluteUrl(`/hoc-toan/${s.id}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const vietRoutes = vietSkills.map((s) => ({
    url: absoluteUrl(`/hoc-tieng-viet/${s.id}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...vietRoutes, ...mathRoutes, ...learnRoutes];
}
