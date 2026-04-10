/**
 * GitHub REST API client.
 * Fetches public repositories for austinarmstrongbiz-blip, ISR-cached for 1 hour.
 */

const GITHUB_USERNAME = "austinarmstrongbiz-blip";
const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  displayName: string;       // human-readable name (spaces, title case)
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  updatedFormatted: string;  // "April 2024"
}

function toDisplayName(name: string): string {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];

    const repos = (await res.json()) as Array<Record<string, unknown>>;
    return repos
      .filter((r) => !r.fork)
      .map((r) => ({
        id: r.id as number,
        name: r.name as string,
        displayName: toDisplayName(r.name as string),
        description: (r.description as string | null) ?? null,
        html_url: r.html_url as string,
        language: (r.language as string | null) ?? null,
        stargazers_count: (r.stargazers_count as number) ?? 0,
        topics: (r.topics as string[]) ?? [],
        updated_at: r.updated_at as string,
        updatedFormatted: formatDate(r.updated_at as string),
      }));
  } catch {
    return [];
  }
}

export { GITHUB_USERNAME };
