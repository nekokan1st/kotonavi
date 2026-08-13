import type { MetadataRoute } from "next";
import { guides } from "./guides/data";
import { problemPages } from "./problems/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kotonaviapp.com";
  return [
    { url: base, lastModified: new Date("2026-08-14"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/info`, lastModified: new Date("2026-08-11"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, lastModified: new Date("2026-08-11"), changeFrequency: "weekly", priority: 0.8 },
    ...guides.map((guide) => ({ url: `${base}/guides/${guide.slug}`, lastModified: new Date("2026-08-11"), changeFrequency: "monthly" as const, priority: 0.75 })),
    { url: `${base}/problems`, lastModified: new Date("2026-08-14"), changeFrequency: "weekly", priority: 0.9 },
    ...problemPages.map((problem) => ({ url: `${base}/problems/${problem.slug}`, lastModified: new Date(problem.reviewedAt), changeFrequency: "monthly" as const, priority: 0.85 })),
  ];
}
