/**
 * Matchday — Austin's match writing, held as Markdown files in this repo rather
 * than in Notion or Substack. Manchester City is the main beat, but any match he
 * watches belongs here; posts are separated by tag.
 *
 * A post is `content/matchday/<slug>.md`. The filename is the slug, so the URL is
 * decided by whatever the file is called. Frontmatter is a small fixed set of
 * `key: value` lines between `---` fences; there is no frontmatter library
 * because the shape never varies.
 *
 * Everything here runs at build time (the routes are statically generated), so
 * `fs` and `marked` never reach the browser bundle.
 */

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const POSTS_DIR = path.join(process.cwd(), "content", "matchday");

export interface RatingsPlayer {
  name: string;
  rating: number;
  /** 1 = striker row ... 5 = goalkeeper row. Rows render top to bottom. */
  row: number;
}

export interface MatchdayRatings {
  score: { home: string; homeScore: number; away: string; awayScore: number };
  starters: RatingsPlayer[];
  subs: RatingsPlayer[];
  manager: { name: string; rating: number };
}

export interface MatchdayPost {
  slug: string;
  title: string;
  date: string; // ISO, YYYY-MM-DD
  dateFormatted: string;
  tags: string[];
  excerpt: string;
  /** Man City posts only — shown as an eyebrow above the title. */
  fixture: string | null;
  readTime: string;
  bodyHtml: string;
  /** Optional pitch-formation ratings card, parsed from a JSON frontmatter line. */
  ratings: MatchdayRatings | null;
  /** Card artwork, e.g. /images/matchday/city-porto.jpg. Falls back to a gradient. */
  heroImage: string | null;
  /** Competition slug — see COMPETITIONS. */
  competition: string | null;
  /** Short score for the card overlay, e.g. "2 — 0". */
  scoreline: string | null;
}

/**
 * Competitions a post can be filed under. `icon` stays undefined until the real
 * artwork lands in /public/images/competitions — the card falls back to the
 * label pill on its own, so adding a logo later is a one-line change here.
 */
export const COMPETITIONS: Record<string, { label: string; icon?: string }> = {
  "champions-league": { label: "Champions League" },
  "premier-league": { label: "Premier League" },
  "fa-cup": { label: "FA Cup" },
  "carabao-cup": { label: "Carabao Cup" },
};

/** Tag slugs the section knows about, in the order the filter bar shows them. */
export const MATCHDAY_TAGS = [
  { slug: "man-city", label: "Man City" },
  { slug: "other-clubs", label: "Everyone Else" },
  { slug: "hit-piece", label: "Hit Pieces" },
] as const;

export function tagLabel(slug: string): string {
  return MATCHDAY_TAGS.find((t) => t.slug === slug)?.label ?? slug;
}

// Mirrors the reading-time and date formatting used for Substack essays so the
// two sections read the same. Kept local rather than shared: substack.ts works,
// and reaching into it to export helpers would mean editing a file this change
// has no other reason to touch.
function estimateReadTime(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

interface Parsed {
  meta: Record<string, string>;
  body: string;
}

function parseFrontmatter(raw: string): Parsed {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    // Strip one layer of surrounding quotes so titles with colons can be quoted.
    const value = line
      .slice(sep + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    if (key) meta[key] = value;
  }
  return { meta, body: match[2] };
}

function toPost(slug: string, raw: string): MatchdayPost {
  const { meta, body } = parseFrontmatter(raw);
  const bodyHtml = marked.parse(body, { async: false }) as string;
  const date = meta.date || "1970-01-01";

  return {
    slug,
    title: meta.title || slug,
    date,
    dateFormatted: formatDate(date),
    tags: (meta.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    excerpt: meta.excerpt || "",
    fixture: meta.fixture || null,
    readTime: estimateReadTime(bodyHtml),
    bodyHtml,
    ratings: parseRatings(meta.ratings),
    heroImage: meta.heroImage || null,
    competition: meta.competition || null,
    scoreline: meta.scoreline || null,
  };
}

function parseRatings(raw: string | undefined): MatchdayRatings | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MatchdayRatings;
  } catch {
    return null;
  }
}

/**
 * Every published post, newest first. Returns an empty list if the directory is
 * missing so a fresh clone (or a deploy before the first post is written) still
 * builds and renders the section's empty state.
 */
export function getMatchdayPosts(): MatchdayPost[] {
  let files: string[];
  try {
    files = fs.readdirSync(POSTS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => toPost(f.replace(/\.md$/, ""), fs.readFileSync(path.join(POSTS_DIR, f), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMatchdayPostBySlug(slug: string): MatchdayPost | null {
  return getMatchdayPosts().find((p) => p.slug === slug) ?? null;
}
