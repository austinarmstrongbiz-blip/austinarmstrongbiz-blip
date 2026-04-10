/**
 * Notion API client.
 * Fetches Reading List and CV data, ISR-cached for 1 hour.
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function notionHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface NotionBook {
  id: string;
  title: string;
  author: string;
  status: "Want to Read" | "Reading" | "Read";
  genre: string[];
  notes: string;
  rating: number | null;
  type: string;
  link: string | null;
}

export interface NotionCVEntry {
  id: string;
  role: string;
  organization: string;
  type: "Work" | "Education" | "Project" | "Volunteer" | "Award";
  current: boolean;
  startDate: string | null;
  endDate: string | null;
  description: string;
  location: string;
  skills: string[];
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getText(prop: { rich_text?: { plain_text: string }[] } | undefined): string {
  return prop?.rich_text?.[0]?.plain_text ?? "";
}

function getTitle(prop: { title?: { plain_text: string }[] } | undefined): string {
  return prop?.title?.[0]?.plain_text ?? "";
}

function getSelect(prop: { select?: { name: string } | null } | undefined): string {
  return prop?.select?.name ?? "";
}

function getMultiSelect(prop: { multi_select?: { name: string }[] } | undefined): string[] {
  return prop?.multi_select?.map((o) => o.name) ?? [];
}

function getCheckbox(prop: { checkbox?: boolean } | undefined): boolean {
  return prop?.checkbox ?? false;
}

function getNumber(prop: { number?: number | null } | undefined): number | null {
  return prop?.number ?? null;
}

function getUrl(prop: { url?: string | null } | undefined): string | null {
  return prop?.url ?? null;
}

function getDate(prop: { date?: { start: string } | null } | undefined): string | null {
  return prop?.date?.start ?? null;
}

function formatPeriod(start: string | null, end: string | null, current: boolean): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  const s = start ? fmt(start) : "";
  if (current) return s ? `${s} — Present` : "Present";
  const e = end ? fmt(end) : "";
  return s && e ? `${s} — ${e}` : s || e;
}

// ─── READING LIST ─────────────────────────────────────────────────────────────

export async function getReadingList(): Promise<NotionBook[]> {
  const dbId = process.env.NOTION_READING_DB;
  if (!dbId) return [];

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        sorts: [{ property: "Status", direction: "ascending" }],
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return (data.results ?? [])
      .map((page: Record<string, unknown>) => {
        const props = page.properties as Record<string, unknown>;
        return {
          id: page.id as string,
          title: getTitle(props.Title as Parameters<typeof getTitle>[0]),
          author: getText(props.Author as Parameters<typeof getText>[0]),
          status: getSelect(props.Status as Parameters<typeof getSelect>[0]) as NotionBook["status"],
          genre: getMultiSelect(props.Genre as Parameters<typeof getMultiSelect>[0]),
          notes: getText(props.Notes as Parameters<typeof getText>[0]),
          rating: getNumber(props.Rating as Parameters<typeof getNumber>[0]),
          type: getSelect(props.Type as Parameters<typeof getSelect>[0]),
          link: getUrl(props.Link as Parameters<typeof getUrl>[0]),
        };
      })
      .filter((b: NotionBook) => b.title);
  } catch {
    return [];
  }
}

// ─── CV / RESUME ──────────────────────────────────────────────────────────────

export async function getCVEntries(): Promise<NotionCVEntry[]> {
  const dbId = process.env.NOTION_CV_DB;
  if (!dbId) return [];

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        sorts: [
          { property: "Current", direction: "descending" },
          { property: "Start Date", direction: "descending" },
        ],
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return (data.results ?? [])
      .map((page: Record<string, unknown>) => {
        const props = page.properties as Record<string, unknown>;
        const current = getCheckbox(props.Current as Parameters<typeof getCheckbox>[0]);
        const startDate = getDate(props["Start Date"] as Parameters<typeof getDate>[0]);
        const endDate = getDate(props["End Date"] as Parameters<typeof getDate>[0]);
        return {
          id: page.id as string,
          role: getTitle(props.Role as Parameters<typeof getTitle>[0]),
          organization: getText(props.Organization as Parameters<typeof getText>[0]),
          type: getSelect(props.Type as Parameters<typeof getSelect>[0]) as NotionCVEntry["type"],
          current,
          startDate,
          endDate,
          period: formatPeriod(startDate, endDate, current),
          description: getText(props.Description as Parameters<typeof getText>[0]),
          location: getText(props.Location as Parameters<typeof getText>[0]),
          skills: getMultiSelect(props.Skills as Parameters<typeof getMultiSelect>[0]),
        };
      })
      .filter((e: NotionCVEntry & { period: string }) => e.role);
  } catch {
    return [];
  }
}
