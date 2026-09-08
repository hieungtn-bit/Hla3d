import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { journal } from "@/data/journal";
import { vocabSets } from "@/data/vocab";
import { skills } from "@/data/math";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/shop", "/chon-qua", "/hoc-tieng-anh", "/hoc-toan", "/custom", "/lab", "/journal", "/about",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: absoluteUrl(`/shop/${p.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
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

  const journalRoutes = journal.map((p) => ({
    url: absoluteUrl(`/journal/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...learnRoutes, ...mathRoutes, ...journalRoutes];
}
