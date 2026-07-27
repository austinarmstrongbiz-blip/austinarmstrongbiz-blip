@AGENTS.md
@WEEKLY_WINS.md

# Project Context

Personal site for Austin Armstrong (austin-armstrong.me). Next.js App Router, Tailwind v4, Notion as CMS for a few sections, Substack as the essays source. Deployed on Vercel, auto-deploy on push to `main`.

## Layout

- `src/app/` — one folder per route (App Router). Each `page.tsx` is a server component that fetches its own data.
- `src/lib/notion.ts` — Notion API client for reading list, "thinking" feed, and CV entries. Every fetcher degrades to a static fallback (`src/lib/data.ts`) on API failure instead of rendering blank.
- `src/lib/substack.ts` — essays source (`SUBSTACK_URL` + post fetching).
- `src/lib/github.ts` — pulls featured repos for the homepage.
- `src/components/ui/` — shared client components (`Animate.tsx` for Framer Motion wrappers, `MobileNav`, `NewsletterForm`, `InstagramFeed`, `PrintButton`, `MotionProvider`).

## Conventions

- Inline `style={{}}` objects are the norm here, not a separate CSS module per component — match existing style when editing a page.
- Design tokens live in `globals.css` as CSS custom properties (`--color-ink`, `--color-ink-soft`, `--color-ink-muted`, `--color-yellow`, `--color-rule`, `--font-display`, `--font-sans`, `--font-mono`). Use these, don't hardcode hex/font values.
- All external content fetches (Notion, Substack, GitHub) are ISR-cached at `revalidate: 3600` (1h) via `next: { revalidate }` on `fetch`.
- Internal links use `next/link`'s `Link`; external links get `target="_blank" rel="noopener noreferrer"`.

## Data sources

| Section                     | Source                            | Env var                                                                                                       |
| --------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Reading list (`/now`)       | Notion                            | `NOTION_READING_DB`                                                                                           |
| Currently thinking (`/now`) | Notion                            | `NOTION_THINKING_DB`                                                                                          |
| CV (`/resume`)              | Notion                            | `NOTION_CV_DB`                                                                                                |
| Essays (`/essays`)          | Substack                          | `NOTION_ESSAYS_DB` also referenced, verify against `src/lib/substack.ts` before assuming Notion is the source |
| Weekly wins staging         | Notion, feeds `/api/cv-sync` cron | `NOTION_WINS_DB`                                                                                              |

See `WEEKLY_WINS.md` for the full CV write protocol (bullet formatting rules, impact-callout extraction) if touching resume content.

## Before shipping a change

```bash
npm run format:check
npm run lint
npx tsc --noEmit
npm run build
```
