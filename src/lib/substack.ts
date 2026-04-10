/**
 * Substack RSS feed parser.
 * Fetches posts from Austin's Substack, ISR-cached for 1 hour.
 */

const FEED_URL = "https://austinarmstrong20.substack.com/feed";
const SUBSTACK_URL = "https://austinarmstrong20.substack.com";

export interface SubstackPost {
  title: string;
  url: string;
  date: string;         // ISO string
  dateFormatted: string; // "April 2025"
  summary: string;
  imageUrl: string | null;
  readTime: string | null;
}

// Extract image from content:encoded or enclosure
function extractImage(item: string): string | null {
  const enclosure = item.match(/<enclosure[^>]+url="([^"]+)"/);
  if (enclosure) return enclosure[1];
  const img = item.match(/<img[^>]+src="([^"]+)"/);
  if (img) return img[1];
  return null;
}

// Rough read time from content length
function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 220));
  return `${mins} min read`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Strip HTML tags and truncate
function cleanSummary(raw: string, maxLen = 180): string {
  const stripped = raw.replace(/<[^>]+>/g, "").replace(/&[a-z]+;/gi, " ").trim();
  return stripped.length > maxLen ? stripped.slice(0, maxLen).trim() + "…" : stripped;
}

export async function getSubstackPosts(limit = 20): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();

    // Split into individual items
    const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/g);
    const posts: SubstackPost[] = [];

    for (const match of itemMatches) {
      if (posts.length >= limit) break;
      const item = match[1];

      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
        ?? item.match(/<title>(.*?)<\/title>/)?.[1]
        ?? "";

      const url = item.match(/<link>(.*?)<\/link>/)?.[1]
        ?? item.match(/<guid[^>]*>(.*?)<\/guid>/)?.[1]
        ?? "";

      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

      const descriptionRaw = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1]
        ?? item.match(/<description>([\s\S]*?)<\/description>/)?.[1]
        ?? "";

      const contentRaw = item.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] ?? "";

      if (!title || !url) continue;

      const date = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();
      const imageUrl = extractImage(item) ?? extractImage(contentRaw);
      const summary = cleanSummary(descriptionRaw || contentRaw);
      const readTime = contentRaw ? estimateReadTime(contentRaw) : null;

      posts.push({
        title,
        url,
        date,
        dateFormatted: formatDate(date),
        summary,
        imageUrl,
        readTime,
      });
    }

    return posts;
  } catch {
    return [];
  }
}

export { SUBSTACK_URL };
