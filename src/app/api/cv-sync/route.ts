/**
 * /api/cv-sync
 *
 * Called by Vercel Cron every Monday at 9am UTC.
 * Reads unchecked "Add to CV" wins from the Weekly Wins DB,
 * creates corresponding entries in the Resume/CV DB,
 * then marks them as "Pushed" so they're never duplicated.
 *
 * Protected by CRON_SECRET — Vercel sends this automatically.
 */

import { NextRequest, NextResponse } from "next/server";

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

function notionHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

// Category → CV Type mapping
const categoryToType: Record<string, string> = {
  Work: "Work",
  Project: "Project",
  Learning: "Education",
  Content: "Project",
  Personal: "Project",
};

export async function GET(req: NextRequest) {
  // Verify cron secret — Vercel sets Authorization: Bearer <CRON_SECRET>
  const authHeader = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const winsDbId = process.env.NOTION_WINS_DB;
  const cvDbId = process.env.NOTION_CV_DB;

  if (!winsDbId || !cvDbId) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  try {
    // 1. Fetch unpushed wins that are marked "Add to CV"
    const queryRes = await fetch(`${NOTION_API}/databases/${winsDbId}/query`, {
      method: "POST",
      headers: notionHeaders(),
      body: JSON.stringify({
        filter: {
          and: [
            { property: "Add to CV", checkbox: { equals: true } },
            { property: "Pushed", checkbox: { equals: false } },
          ],
        },
      }),
    });

    if (!queryRes.ok) {
      const err = await queryRes.text();
      return NextResponse.json({ error: "Failed to query wins", detail: err }, { status: 500 });
    }

    const { results } = await queryRes.json();

    if (!results || results.length === 0) {
      return NextResponse.json({ message: "No new wins to sync", synced: 0 });
    }

    let synced = 0;
    const syncedIds: string[] = [];

    for (const page of results) {
      const props = page.properties;

      const win = props.Win?.title?.[0]?.plain_text ?? "";
      const description = props.Description?.rich_text?.[0]?.plain_text ?? "";
      const organization = props.Organization?.rich_text?.[0]?.plain_text ?? "";
      const category = props.Category?.select?.name ?? "Work";
      const weekStart = props.Week?.date?.start ?? null;

      if (!win) continue;

      const cvType = categoryToType[category] ?? "Work";

      // 2. Create a new page in the CV database
      const createRes = await fetch(`${NOTION_API}/pages`, {
        method: "POST",
        headers: notionHeaders(),
        body: JSON.stringify({
          parent: { database_id: cvDbId },
          properties: {
            Role: { title: [{ text: { content: win } }] },
            Organization: { rich_text: [{ text: { content: organization } }] },
            Type: { select: { name: cvType } },
            Description: { rich_text: [{ text: { content: description } }] },
            Current: { checkbox: false },
            ...(weekStart
              ? { "Start Date": { date: { start: weekStart } } }
              : {}),
          },
        }),
      });

      if (!createRes.ok) continue;

      syncedIds.push(page.id);
      synced++;
    }

    // 3. Mark all synced wins as "Pushed" so they don't re-sync
    await Promise.all(
      syncedIds.map((id) =>
        fetch(`${NOTION_API}/pages/${id}`, {
          method: "PATCH",
          headers: notionHeaders(),
          body: JSON.stringify({
            properties: {
              Pushed: { checkbox: true },
            },
          }),
        })
      )
    );

    return NextResponse.json({
      message: `Synced ${synced} win${synced !== 1 ? "s" : ""} to CV`,
      synced,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected error", detail: String(err) },
      { status: 500 }
    );
  }
}
