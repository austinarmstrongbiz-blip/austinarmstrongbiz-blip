# austin-armstrong.me

Personal site for Austin Armstrong — generalist operator, writer, builder. Next.js (App Router) + Notion as CMS, deployed on Vercel.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 + hand-rolled editorial design system (`globals.css`)
- **CMS:** Notion API — reading list, "currently thinking" feed, and CV entries all live in Notion databases and render via ISR (1h revalidation)
- **Content:** Essays pulled from Substack (`src/lib/substack.ts`)
- **Motion:** Framer Motion (`src/components/ui/Animate.tsx`)
- **Analytics:** Vercel Analytics + Speed Insights

## Routes

| Route                       | What                                                                   |
| --------------------------- | ---------------------------------------------------------------------- |
| `/`                         | Homepage                                                               |
| `/essays`, `/essays/[slug]` | Essays, sourced from Substack                                          |
| `/now`                      | "Field Notes" — currently reading + currently thinking, from Notion    |
| `/work`                     | Case studies / proof                                                   |
| `/projects`                 | Project list                                                           |
| `/resume`                   | CV, sourced from Notion CV database                                    |
| `/playbook`                 | Resources page                                                         |
| `/feed.xml`                 | RSS feed                                                               |
| `/api/cv-sync`              | Vercel cron (Mondays 9am UTC) — pulls staged wins into the CV database |
| `/api/health`               | Health check                                                           |

## Local development

```bash
npm install
npm run dev       # http://localhost:3000
```

Copy `.env.local` (not committed) with:

```env
NOTION_API_KEY=
NOTION_ESSAYS_DB=
NOTION_READING_DB=
NOTION_CV_DB=
NOTION_WINS_DB=
NOTION_THINKING_DB=
CRON_SECRET=
```

If a Notion call fails (missing key, unshared DB, rate limit), reading/thinking sections fall back to the static arrays in `src/lib/data.ts` rather than going blank.

## Scripts

```bash
npm run dev            # dev server
npm run build           # production build
npm run lint             # eslint
npm run format          # prettier --write
npm run format:check    # prettier --check (CI-safe, no writes)
npm run analyze         # production build with bundle analyzer report
npm run test:e2e        # Playwright smoke test (see below)
```

## Testing

`tests/smoke.spec.ts` is a Playwright smoke test that hits the main routes (`/`, `/essays`, `/now`, `/work`, `/projects`, `/resume`) and checks each returns 200 with its expected heading. Run against a local dev server:

```bash
npm run dev &
npx playwright test
```

## Deploy

Auto-deploys to Vercel on push to `main`. See `AGENTS.md` for framework-version-specific agent notes and `WEEKLY_WINS.md` for how the weekly-resumewins-auto-update skill writes into the CV database.
