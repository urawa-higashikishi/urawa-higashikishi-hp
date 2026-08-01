import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://urawa-higashikishi.github.io/urawa-higashikishi-hp/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
