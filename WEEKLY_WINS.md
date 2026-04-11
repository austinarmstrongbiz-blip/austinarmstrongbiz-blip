# Weekly Wins — Workflow for Claude Code

## What this is

A weekly ritual for logging accomplishments into Notion so they automatically
appear on austin-armstrong.me/resume every Monday morning.

**The scheduled task handles:** Reading the Notion "Weekly Wins" database →
creating entries in the CV database → marking wins as "Pushed".

**Claude Code handles:** Helping Austin capture, sharpen, and log wins each week
so the data going into Notion is clean, impactful, and CV-ready.

---

## The System

```
Austin logs wins (with Claude's help)
        ↓
Notion "Weekly Wins" DB
        ↓
Vercel Cron — every Monday 9am UTC — /api/cv-sync
        ↓
Notion "Resume / CV" DB
        ↓
austin-armstrong.me/resume (ISR — updates within 1 hour)
```

---

## Notion Database

**DB ID:** `a70c409ba0244ec19b7759f80b2ddc70`
**URL:** https://www.notion.so/a70c409ba0244ec19b7759f80b2ddc70

| Field | Type | Notes |
|-------|------|-------|
| Win | Title | Short name of the accomplishment (1 line) |
| Description | Rich Text | 1–2 sentences. Will become a CV bullet. Use numbers. |
| Organization | Rich Text | Wellstar, Autonomi, Side Project, etc. |
| Category | Select | Work / Project / Learning / Content / Personal |
| Week | Date | The week it was completed |
| Add to CV | Checkbox | ✅ Check this to include on the live website |
| Pushed | Checkbox | Auto-managed by cron — do NOT edit manually |

---

## Claude Code's Job Each Week

When Austin says **"let's do weekly wins"** or **"log my wins"**, Claude should:

### Step 1 — Collect raw wins
Ask Austin to brain-dump what he did this week. Accept messy, informal language.
Examples of what Austin might say:
- "fixed the apptio data feed issue"
- "wrote the generalist essay draft"
- "had a good meeting with the Wellstar team about the 2026 budget"

### Step 2 — Sharpen each win into a CV bullet
Transform each raw win using this formula:
> **[Action verb] + [what you did] + [quantified impact if possible]**

Examples:
| Raw | Sharpened |
|-----|-----------|
| "fixed the apptio data feed issue" | "Resolved critical Apptio SQL data feed failure affecting 8 executive dashboards, restoring real-time financial reporting" |
| "wrote the generalist essay draft" | "Drafted 2,400-word essay on the generalist advantage — scheduled for Substack publication" |
| "good meeting about 2026 budget" | "Led 2026 IT budget planning session with Wellstar stakeholders, aligning $250M+ spend forecast with business priorities" |

**Rules for good CV bullets:**
- Start with a strong action verb (Led, Built, Automated, Drove, Reduced, Launched, Designed)
- Include a number whenever possible ($, %, count, time saved)
- One sentence. Max 25 words.
- No first-person ("I did X" → "Did X")

### Step 3 — Determine what goes to CV
Not everything belongs on the CV. Guide Austin:
- **Yes to CV:** Work accomplishments, shipped projects, measurable outcomes, certifications, published content
- **No to CV:** Personal wins, casual learnings, meetings with no outcome, drafts not yet shipped

Ask: "Should this go on your live CV, or just log it for tracking?"

### Step 4 — Log to Notion via MCP
Use the Notion MCP tool to create pages in the Weekly Wins database.

For each win that should go to CV:
```
notion-create-pages
  parent: data_source_id = 94d9faf0-a1a8-4af4-8bcf-a8127085c38f
  properties:
    Win: [sharpened title]
    Description: [CV bullet]
    Organization: [company/context]
    Category: [Work|Project|Learning|Content|Personal]
    Week: [YYYY-MM-DD — Monday of the current week]
    Add to CV: __YES__
    Pushed: __NO__ (leave unchecked — cron handles this)
```

For tracking-only wins (not going to CV):
```
Same as above but:
    Add to CV: __NO__
```

### Step 5 — Confirm and close
After logging, tell Austin:
- How many wins were logged
- How many are queued for CV sync
- When they'll appear on the site ("Next Monday morning, or trigger a redeploy now")
- Offer to trigger the sync immediately if he wants it now:
  `curl https://austin-armstrong.me/api/cv-sync -H "Authorization: Bearer $CRON_SECRET"`

---

## Trigger Words

If Austin says any of the following, start the weekly wins flow:

- "weekly wins"
- "log my wins"
- "update my CV"
- "what did I accomplish"
- "wins this week"

---

## What the Scheduled Task Does NOT Need from Claude

The Vercel cron at `/api/cv-sync` is fully automatic. Claude does NOT need to:
- Call the API manually (unless Austin wants an immediate sync)
- Edit the CV database directly
- Modify the "Pushed" checkbox — the cron owns that

---

## Manual Sync (if Austin wants it now)

If Austin doesn't want to wait until Monday:

Option A — Vercel dashboard → Crons → Run now

Option B — Claude runs this bash command (requires CRON_SECRET in environment):
```bash
curl -s https://austin-armstrong.me/api/cv-sync \
  -H "Authorization: Bearer $CRON_SECRET" | python3 -m json.tool
```

Expected response:
```json
{ "message": "Synced 3 wins to CV", "synced": 3 }
```

After syncing, trigger a Vercel redeploy or wait up to 1 hour for ISR to refresh
the /resume page.

---

## Example Full Session

```
Austin: "let's do weekly wins"

Claude: "Let's log your wins for the week of [date]. Brain-dump everything —
what did you ship, finish, lead, or make progress on? Don't worry about format."

Austin: "Got the 2025 apptio roadmap approved. Wrote two sections of the
barbell strategy essay. Had the UPMC alumni call."

Claude: "Got it. Here's how I'd sharpen these:

1. WORK — Wellstar
   Win: 'Apptio 2025 roadmap approved'
   CV bullet: 'Secured stakeholder approval for 2025 Apptio roadmap covering
   capital prioritization, contract optimization, and reporting enhancements.'
   → Add to CV? Yes

2. CONTENT
   Win: 'Barbell strategy essay — 2 sections drafted'
   CV bullet: 'Drafted two sections of long-form essay on barbell strategy
   application to career design — scheduled for Substack.'
   → Add to CV? Your call — content/writing or just tracking?

3. PERSONAL — UPMC alumni call
   No CV bullet recommended — networking without a specific outcome.
   Log for tracking only?

Does this look right? I'll log them now."

Austin: "Yes, log all three. Essay is tracking only."

Claude: [creates 3 Notion pages — 2 with Add to CV checked, 1 without]
"Done. 2 wins queued for Monday's CV sync. They'll be live on
austin-armstrong.me/resume by Monday morning."
```

---

## Setup Checklist (one-time)

- [x] Notion "Weekly Wins" DB created
- [x] `/api/cv-sync` route deployed
- [x] `vercel.json` cron configured (Monday 9am UTC)
- [ ] Add `NOTION_WINS_DB=a70c409ba0244ec19b7759f80b2ddc70` to Vercel env vars
- [ ] Generate and add `CRON_SECRET` to Vercel env vars (same value in both Vercel and locally)
- [ ] Verify first manual sync works via Vercel dashboard → Crons
