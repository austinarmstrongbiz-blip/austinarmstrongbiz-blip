/**
 * Static data — single source of truth for all hardcoded content.
 * Pages import from here; when Notion integration lands (Phase 2),
 * these become fallbacks when the API is unavailable.
 */

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tag: string;
  pillar: "lifestyle" | "ai" | "finance" | "personal-development";
  excerpt: string;
  featured?: boolean;
}

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

export interface NavSection {
  href: string;
  label: string;
  num: string;
  desc: string;
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

export const navSections: NavSection[] = [
  {
    href: "/now",
    label: "Field Notes",
    num: "01",
    desc: "What I'm reading, thinking about, and working on at this moment.",
  },
  {
    href: "/essays",
    label: "Essays",
    num: "02",
    desc: "Long-form explorations of ideas that won't leave me alone.",
  },
  {
    href: "/work",
    label: "Work With Me",
    num: "03",
    desc: "Fractional AI and go-to-market operating for founders building technical products.",
  },
  {
    href: "/resume",
    label: "Curriculum Vitae",
    num: "04",
    desc: "A record of where I've been and what I've built.",
  },
];

// ─── ESSAYS ───────────────────────────────────────────────────────────────────

export const essays: Essay[] = [
  {
    slug: "the-generalist-advantage",
    title: "The Generalist Advantage",
    subtitle: "Why breadth isn't the consolation prize — it's the strategy",
    date: "March 2024",
    readTime: "12 min",
    tag: "Generalists",
    pillar: "personal-development",
    excerpt:
      "There's a story we tell about expertise: you pick a lane, go deep, and mastery follows. It's clean. It's compelling. And for a certain type of knowledge work in a certain type of economy, it was true. But the lane is getting narrower, and the traffic is moving faster. The generalist's time is coming — not because breadth is inherently virtuous, but because the conditions for it to be strategically dominant are finally in place.",
    featured: true,
  },
  {
    slug: "mental-immunity",
    title: "Mental Immunity and the Art of Changing Your Mind",
    subtitle: "What stands between you and actually updating your beliefs",
    date: "February 2024",
    readTime: "9 min",
    tag: "Mental Immunity",
    pillar: "personal-development",
    excerpt:
      "Critical thinking is the ability to evaluate evidence. Mental immunity is the emotional infrastructure that allows you to act on that evaluation even when it costs you something — an identity, a relationship, a prior commitment. We teach the first. We barely talk about the second.",
  },
  {
    slug: "barbell-strategy-career",
    title: "The Barbell Career",
    subtitle:
      "Applying Taleb's anti-fragility framework to how you design your professional life",
    date: "January 2024",
    readTime: "11 min",
    tag: "Barbell Strategy",
    pillar: "lifestyle",
    excerpt:
      "Nassim Taleb's barbell strategy — put 90% in safe assets, 10% in asymmetric bets — is most often applied to financial portfolios. But the logic maps cleanly onto how you allocate your professional time, energy, and identity. The question is: what's your 90%, what's your 10%, and are you treating the middle as if it's safety when it's actually the most fragile position of all?",
  },
  {
    slug: "ai-and-original-curiosity",
    title: "AI and the New Scarcity: Original Curiosity",
    subtitle: "When synthesis is cheap, the moat shifts to the quality of your questions",
    date: "December 2023",
    readTime: "8 min",
    tag: "AI",
    pillar: "ai",
    excerpt:
      "Every productivity revolution creates a new bottleneck. The printing press made literacy essential. The calculator made mathematical intuition the differentiator. AI synthesis tools are making something else scarce: the quality of the questions you're inclined to ask in the first place. Curiosity — real, original, uncomfortable curiosity — is becoming the moat.",
  },
  {
    slug: "what-manchester-city-taught-me",
    title: "What Manchester City Taught Me About Systems Thinking",
    subtitle:
      "Pep Guardiola runs a masterclass in organizational coherence every weekend",
    date: "November 2023",
    readTime: "7 min",
    tag: "Soccer",
    pillar: "lifestyle",
    excerpt:
      "I've been watching Manchester City for two decades. In that time, I've learned more about systems, incentives, and the compounding effect of philosophy than from most business books. Not because football is a metaphor for business — that framing is reductive. But because Guardiola's City operates with a coherence that is genuinely rare, and watching it is an education.",
  },
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
export const featuredRepoNames: string[] = [
  "austinarmstrongbiz-blip",
];

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
