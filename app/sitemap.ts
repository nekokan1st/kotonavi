import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kotonavi-moving-guide.maronnu.chatgpt.site";
  return [
    { url: base, lastModified: new Date("2026-08-09"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/info`, lastModified: new Date("2026-08-09"), changeFrequency: "monthly", priority: 0.6 },
  ];
}
