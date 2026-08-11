import type { MetadataRoute } from "next";
import { guides } from "./guides/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kotonaviapp.com";
  return [
    { url: base, lastModified: new Date("2026-08-11"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/info`, lastModified: new Date("2026-08-11"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, lastModified: new Date("2026-08-11"), changeFrequency: "weekly", priority: 0.8 },
    ...guides.map((guide) => ({ url: `${base}/guides/${guide.slug}`, lastModified: new Date("2026-08-11"), changeFrequency: "monthly" as const, priority: 0.75 })),
  ];
}
