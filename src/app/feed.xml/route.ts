import { getSubstackPosts } from "@/lib/substack";
import { getMatchdayPosts } from "@/lib/matchday";

const BASE_URL = "https://austin-armstrong.me";

export async function GET() {
  // Substack essays and on-site Matchday posts, newest first. Matchday posts
  // live only on this site, so the feed is the one place readers and any
  // RSS-driven tool can pick them up.
  const essays = (await getSubstackPosts(50)).map((post) => ({
    title: post.title,
    url: post.url,
    date: post.date,
    summary: post.summary,
  }));
  const matchday = getMatchdayPosts().map((post) => ({
    title: post.title,
    url: `${BASE_URL}/matchday/${post.slug}`,
    date: post.date,
    summary: post.excerpt,
  }));
  const posts = [...essays, ...matchday].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${post.url}</link>
      <guid isPermaLink="true">${post.url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Austin Armstrong</title>
    <link>${BASE_URL}</link>
    <description>Essays on Lifestyle Design, AI, Finance, and Personal Development, plus Matchday — by Austin Armstrong.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/og</url>
      <title>Austin Armstrong</title>
      <link>${BASE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
