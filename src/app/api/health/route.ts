/**
 * Health check for the Notion data sources.
 * Hit /api/health to confirm each DB is reachable and shared with the
 * integration — catches the "unshared database" failure mode without
 * eyeballing the live site. Reports per-source: ok (+count), empty, missing, or error.
 */

export const dynamic = "force-dynamic";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

const SOURCES: { key: string; label: string; env: string }[] = [
  { key: "reading", label: "Reading List", env: "NOTION_READING_DB" },
  { key: "cv", label: "Resume / CV", env: "NOTION_CV_DB" },
  { key: "thinking", label: "Currently Thinking", env: "NOTION_THINKING_DB" },
];

async function probe(env: string) {
  const dbId = process.env[env];
  if (!dbId) return { status: "missing", detail: `env var ${env} not set` };
  if (!process.env.NOTION_API_KEY) return { status: "missing", detail: "NOTION_API_KEY not set" };

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page_size: 1 }),
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { status: "error", detail: `${res.status} ${res.statusText}: ${body.message ?? ""}`.trim() };
    }

    const data = await res.json();
    const count = (data.results ?? []).length;
    return { status: count > 0 ? "ok" : "empty", detail: count > 0 ? "reachable, has rows" : "reachable, no rows" };
  } catch (err) {
    return { status: "error", detail: err instanceof Error ? err.message : String(err) };
  }
}

export async function GET() {
  const results = await Promise.all(SOURCES.map((s) => probe(s.env)));
  const sources = SOURCES.map((s, i) => ({ key: s.key, label: s.label, ...results[i] }));
  const healthy = sources.every((s) => s.status === "ok" || s.status === "empty");

  return Response.json(
    { ok: healthy, checkedAt: new Date().toISOString(), sources },
    { status: healthy ? 200 : 503 },
  );
}
