import { MetadataRoute } from "next";
import { getSubstackPosts } from "@/lib/substack";

const BASE_URL = "https://austin-armstrong.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSubstackPosts(100);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/essays`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/now`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Substack posts — point to the live Substack URLs for indexing signal
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: post.url,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
