import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://higashikishi.com/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://higashikishi.com/privacy",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
