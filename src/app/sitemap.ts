import { MetadataRoute } from "next";
import { getSubstackPosts } from "@/lib/substack";
import { getRants } from "@/lib/rants";

const BASE_URL = "https://austin-armstrong.me";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSubstackPosts(100);
  const rants = getRants();

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
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/playbook`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/rants`,
      lastModified: rants[0] ? new Date(rants[0].date) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Essays — point to the on-site mirrored pages so Google indexes our domain
  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${BASE_URL}/essays/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const rantRoutes: MetadataRoute.Sitemap = rants.map((rant) => ({
    url: `${BASE_URL}/rants/${rant.slug}`,
    lastModified: new Date(rant.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...rantRoutes];
}
