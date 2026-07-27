/**
 * Static data — single source of truth for all hardcoded content.
 * Pages import from here; when Notion integration lands (Phase 2),
 * these become fallbacks when the API is unavailable.
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface Book {
  title: string;
  author: string;
  progress: number;
  note: string;
  tag: string;
}

export interface Thought {
  idea: string;
  context: string;
  date: string;
  tag: string;
}

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────

export const interests: string[] = [
  "Artificial Intelligence",
  "Personal Development",
  "Finance",
  "Economics",
  "Non-Fiction",
  "Manchester City",
  "Soccer",
  "Entrepreneurship",
  "Startups",
  "Generalists",
  "Cognition",
  "Individual Thinking",
  "Mental Immunity",
  "Barbell Strategy",
  "Health",
  "Family",
];

// ─── NOW — READING ─────────────────────────────────────────────────────────────

export const reading: Book[] = [
  {
    title: "The Structure of Scientific Revolutions",
    author: "Thomas S. Kuhn",
    progress: 68,
    note: "How paradigm shifts happen is the most important thing to understand about how knowledge actually progresses — and how wrong the 'linear progress' story is.",
    tag: "Cognition",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    progress: 100,
    note: "Finished. The insight that wealth is what you don't spend is deceptively simple. Recommended without reservation.",
    tag: "Finance",
  },
  {
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    progress: 42,
    note: "The barbell strategy chapter reframed how I think about career design. More on this soon.",
    tag: "Barbell Strategy",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    progress: 85,
    note: "System 1 vs System 2 thinking is the lens through which I now evaluate almost every decision-making framework.",
    tag: "Cognition",
  },
];

// ─── NOW — THINKING ────────────────────────────────────────────────────────────

export const thinking: Thought[] = [
  {
    idea: "AI agents aren't automating tasks — they're replacing entire job functions",
    context:
      "The narrative is still 'AI helps you work faster.' That's wrong. Agents handle workflows end-to-end without humans in the loop. The question isn't how to use AI tools — it's which functions disappear first and how to position around that.",
    date: "May 2026",
    tag: "AI in Business",
  },
  {
    idea: "Systems are the moat, not skills",
    context:
      "Individual skills are increasingly commoditized — AI can replicate most of them. What can't be copied is a repeatable system built around your specific context, relationships, and judgment. The operators who win are the ones who build processes, not just improve themselves.",
    date: "May 2026",
    tag: "Systems",
  },
  {
    idea: "The barbell career is the only rational response to economic volatility",
    context:
      "Stable income funding asymmetric bets on the side — that structure survives recessions, AI disruption, and industry shifts that a single-bet career can't. The goal isn't to escape the day job. It's to use it as the foundation that lets you take real risks everywhere else.",
    date: "Apr 2026",
    tag: "Barbell Strategy",
  },
];

// ─── FEATURED REPOS ───────────────────────────────────────────────────────────
// Repo names that get a featured (yellow top border) treatment on /projects.
// Add new repo names here as more are published.
export const featuredRepoNames: string[] = ["austinarmstrongbiz-blip"];

// ─── STATIC PROJECTS ─────────────────────────────────────────────────────────
// Non-GitHub projects, case studies, and notable work to show on /projects.
export interface StaticProject {
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  period: string;
  highlights: string[];
  link?: string;
}

export const staticProjects: StaticProject[] = [
  {
    title: "IT Financial Management System — Wellstar Health System",
    description:
      "Architected a full Apptio TBM implementation managing $250M+ in annual IT spend across 50 staff and 15 business units — automating 40 cost center migrations, 5 budget process automations, and 10+ SQL data feeds.",
    tag: "Finance · Healthcare",
    tagColor: "var(--color-pillar-finance)",
    period: "2022 — 2024",
    highlights: [
      "$250M+ IT budget under management",
      "40 cost centers migrated to Apptio",
      "8 executive dashboards built",
      "5 process automations deployed",
    ],
  },
  {
    title: "Enterprise IT Budget Optimization — UPMC Enterprises",
    description:
      "Led financial operations for a $400M IT portfolio at one of the nation's largest integrated health systems — overseeing 50+ cost-benefit analyses, RPA-powered reporting, and cross-functional budget governance.",
    tag: "Finance · Healthcare",
    tagColor: "var(--color-pillar-finance)",
    period: "2020 — 2022",
    highlights: [
      "$400M IT portfolio managed",
      "$1M revenue increase via cost analysis",
      "50+ projects valued at $75M analyzed",
      "RPA reporting automation",
    ],
  },
];
