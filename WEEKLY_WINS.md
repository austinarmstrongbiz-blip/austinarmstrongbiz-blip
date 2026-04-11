# Weekly Wins — Website Integration Context

## What this file is for

The scheduled skill at `weekly-resumewins-auto-update/SKILL.md` handles the
interview, scoring, and Notion writes. This file tells it what it needs to know
about how those writes appear on the live website at austin-armstrong.me/resume.

---

## How the Website Renders the CV

The resume page at `/resume` fetches from the Notion CV database (`022275c8-be64-4aa4-8d3c-571eaf613d5a`)
and renders each entry's `Description` field as a **bullet list**.

**Parsing logic (from `src/app/resume/page.tsx`):**
```ts
const bullets = job.description
  ? job.description.split("\n").filter(Boolean)
  : [];
```

Each newline = one bullet on the website. The site adds the bullet dot automatically.

### ✅ Correct format for Description field
```
Managed and executed a $250M+ IT budget across 50 staff and 15 business units
Led IT contract reviews determining renewal, extension, or cancellation for 20+ vendors
Automated data migration for 40 cost centers into Apptio
```

### ❌ Wrong — site will render the bullet characters as text
```
• Managed and executed a $250M+ IT budget across 50 staff and 15 business units
• Led IT contract reviews determining renewal, extension, or cancellation for 20+ vendors
```

**Rule: No bullet characters (`•`, `-`, `*`) in Description. One achievement per line. Blank lines are filtered out.**

---

## Description Field — Append Protocol

When adding a new achievement to an existing role, the SKILL fetches the current
Description and appends a new line. The website will render all lines as bullets.

When appending, ensure:
1. Fetch the current Description text first
2. Add a single newline between existing content and new bullet
3. No trailing newlines
4. No bullet characters

Example append:
```
[existing content]
Developed the 2025 Apptio roadmap focusing on capital project prioritization and financial reporting
```

---

## Impact Callout — First Bullet Matters

The resume page extracts the largest dollar figure from the **first bullet** and
displays it as a large visual callout next to the job header:

```ts
function extractImpactStat(description: string): { num: string; label: string } | null {
  const match = description.match(/\$[\d,.]+[BMK+]*/);
  // Returns first match from bullets[0]
}
```

**If the first bullet contains a dollar figure, it becomes the hero number for that job.**

Example — Wellstar entry's first bullet:
> "Managed and executed a $250M+ IT budget..."

This renders as `$250M+` in large Basilia type next to the role header.

Keep the highest-impact, most quantified bullet first in each Description.

---

## Live Update Timing

After the SKILL writes to Notion:
- **Automatic:** The website refreshes within **1 hour** (ISR revalidation)
- **Immediate:** Trigger a Vercel redeploy — Austin can do this from the Vercel dashboard

---

## The Weekly Wins DB (Staging — Optional)

A separate "Weekly Wins" Notion database (`a70c409ba0244ec19b7759f80b2ddc70`) exists
as a staging layer. A Vercel cron at `/api/cv-sync` (runs every Monday 9am UTC)
reads from it and creates new CV entries automatically.

**This is a parallel system — the SKILL does NOT need to use it.**

The SKILL writes directly to the CV database, which is the faster, cleaner path.
The Weekly Wins DB + cron is useful if Austin wants to log wins mid-week and have
them batch-push on Monday without opening a Claude session.

---

## CV Database — Field Reference

**Database ID:** `022275c8-be64-4aa4-8d3c-571eaf613d5a`
**Collection:** `collection://e80906a0-cfa0-4feb-8a14-95b6689b4d8d`

| Field | Type | Notes |
|-------|------|-------|
| Role | Title | Job title or project name |
| Organization | Rich Text | Company name |
| Type | Select | Work / Education / Project / Volunteer / Award |
| Current | Checkbox | True = "Present" in the period display |
| Start Date | Date | ISO date |
| End Date | Date | ISO date (leave empty if Current = true) |
| Location | Rich Text | City or "Remote" |
| Description | Rich Text | **One achievement per line. No bullet chars. First line = impact callout.** |
| Skills | Multi-select | Leadership / Marketing / Sales / AI / Strategy / Content / Technology |

---

## What the SKILL Should Add to Its Context

Before the SKILL writes any Description content, it should know:

1. **No bullet characters** — the site renders them as plain text
2. **First bullet = hero number** — put the biggest metric first
3. **Append, never overwrite** — fetch existing content, add a newline, append
4. **One line = one bullet** — keep each line to 15–25 words

---

## Skills Tags — What They Look Like on Site

The `Skills` field renders as small yellow tags below each job entry on the website.
Use them for the clearest signal words — max 3–4 per entry is enough.

Valid values: `Leadership`, `Marketing`, `Sales`, `AI`, `Strategy`, `Content`, `Technology`

---

## Summary for the SKILL

The scheduled skill does everything right. The only additions it needs:

| Gap | Fix |
|-----|-----|
| Description format | No `•` chars, one achievement per line |
| First bullet priority | Highest dollar/metric figure goes first |
| After writing | Tell Austin the site updates in ≤1 hour, or redeploy now |
