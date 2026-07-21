import type { MetadataRoute } from "next";
import { beaches } from "@/lib/beaches";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/beaches`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...beaches.map((beach) => ({ url: `${siteUrl}/beaches/${beach.slug}`, lastModified: now, changeFrequency: "daily" as const, priority: beach.region === "Bay Area" ? 0.9 : 0.8 })),
  ];
}
