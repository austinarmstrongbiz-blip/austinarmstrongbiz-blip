import type { Metadata } from "next";
import Link from "next/link";
import { COMPETITIONS, getMatchdayPosts, MATCHDAY_TAGS, tagLabel } from "@/lib/matchday";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";
import MatchdayCard from "@/components/matchday/MatchdayCard";
import MatchdaySignup from "@/components/matchday/MatchdaySignup";

const OG_IMAGE = "/og?theme=matchday";

export const metadata: Metadata = {
  title: "Matchday",
  description:
    "Match reactions, hit pieces, and opinions Austin Armstrong could not keep to himself. Manchester City and whatever else earned it.",
  alternates: { canonical: "https://austin-armstrong.me/matchday" },
  openGraph: {
    type: "website",
    url: "https://austin-armstrong.me/matchday",
    title: "Matchday",
    description:
      "Match reactions, hit pieces, and opinions Austin Armstrong could not keep to himself. Manchester City and whatever else earned it.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Matchday" }],
  },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

/** A filter pill: label, how many posts carry it, and where it points. */
interface Chip {
  key: string;
  label: string;
  count: number;
  href: string;
  active: boolean;
}

export default async function MatchdayPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string; competition?: string; season?: string }>;
}) {
  const { tag, competition, season } = await searchParams;
  const all = getMatchdayPosts();

  // Football seasons run August to May, so a post dated Oct 2026 is "2026/27".
  const seasonOf = (date: string) => {
    const y = Number(date.slice(0, 4));
    const start = Number(date.slice(5, 7)) >= 7 ? y : y - 1;
    return `${start}-${String(start + 1).slice(2)}`;
  };

  const activeTag = tag && MATCHDAY_TAGS.some((t) => t.slug === tag) ? tag : null;
  const activeComp = competition && COMPETITIONS[competition] ? competition : null;
  const activeSeason = season && all.some((p) => seasonOf(p.date) === season) ? season : null;

  const posts = all.filter(
    (p) =>
      (!activeTag || p.tags.includes(activeTag)) &&
      (!activeComp || p.competition === activeComp) &&
      (!activeSeason || seasonOf(p.date) === activeSeason),
  );

  // Competition, club and season filters combine, so each link keeps the others.
  const href = (comp: string | null, t: string | null, s: string | null = activeSeason) => {
    const q = new URLSearchParams();
    if (comp) q.set("competition", comp);
    if (t) q.set("tag", t);
    if (s) q.set("season", s);
    const qs = q.toString();
    return qs ? `/matchday?${qs}` : "/matchday";
  };

  // Only surface filters that would actually return something.
  const compChips: Chip[] = Object.entries(COMPETITIONS)
    .map(([slug, { label }]) => ({
      key: slug,
      label,
      count: all.filter((p) => p.competition === slug).length,
      href: href(slug, activeTag),
      active: activeComp === slug,
    }))
    .filter((c) => c.count > 0);
  const clubChips: Chip[] = MATCHDAY_TAGS.map((t) => ({
    key: t.slug,
    label: t.label,
    count: all.filter((p) => p.tags.includes(t.slug)).length,
    href: href(activeComp, t.slug),
    active: activeTag === t.slug,
  })).filter((c) => c.count > 0);
  const seasonChips: Chip[] = [...new Set(all.map((p) => seasonOf(p.date)))]
    .sort()
    .reverse()
    .map((s) => ({
      key: s,
      label: s.replace("-", "/"),
      count: all.filter((p) => seasonOf(p.date) === s).length,
      href: href(activeComp, activeTag, s),
      active: activeSeason === s,
    }));

  const countLabel = `${all.length} ${all.length === 1 ? "post" : "posts"}`;

  return (
    <>
      <div className="matchday-backdrop">
        {/* ── Header ─────────────────────────────────────────────── */}
        <section className="matchday-header">
          <div className="container-editorial matchday-wide">
            <FadeUp>
              <h1 className="text-display" style={{ color: "var(--city-navy)" }}>
                Matchday
              </h1>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="matchday-count-rule">
                <span aria-hidden />
                <span className="matchday-count">{countLabel}</span>
                <span aria-hidden />
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="matchday-filters">
                <nav aria-label="Filter by competition" className="matchday-segments">
                  <Link
                    href={href(null, activeTag)}
                    aria-current={!activeComp ? "true" : undefined}
                    className={`matchday-segment${!activeComp ? " is-active" : ""}`}
                  >
                    All <span className="matchday-segment-count">{all.length}</span>
                  </Link>
                  {compChips.map((c) => (
                    <Link
                      key={c.key}
                      href={c.href}
                      aria-current={c.active ? "true" : undefined}
                      className={`matchday-segment${c.active ? " is-active" : ""}`}
                    >
                      {c.label} <span className="matchday-segment-count">{c.count}</span>
                    </Link>
                  ))}
                </nav>

                {/* Keyed by filter so the menu closes after a pick. */}
                <details
                  key={`club-${activeComp}-${activeTag}-${activeSeason}`}
                  name="matchday-menu"
                  className="matchday-menu"
                >
                  <summary>
                    <span className="matchday-menu-label">Club</span>
                    {clubChips.find((c) => c.active)?.label ?? "All"}
                  </summary>
                  <div className="matchday-menu-list">
                    <Link
                      href={href(activeComp, null)}
                      className={`matchday-segment${!activeTag ? " is-active" : ""}`}
                    >
                      All <span className="matchday-segment-count">{all.length}</span>
                    </Link>
                    {clubChips.map((c) => (
                      <Link
                        key={c.key}
                        href={c.href}
                        className={`matchday-segment${c.active ? " is-active" : ""}`}
                      >
                        {c.label} <span className="matchday-segment-count">{c.count}</span>
                      </Link>
                    ))}
                  </div>
                </details>

                <details
                  key={`season-${activeComp}-${activeTag}-${activeSeason}`}
                  name="matchday-menu"
                  className="matchday-menu"
                >
                  <summary>
                    <span className="matchday-menu-label">Season</span>
                    {seasonChips.find((c) => c.active)?.label ?? "All"}
                  </summary>
                  <div className="matchday-menu-list">
                    <Link
                      href={href(activeComp, activeTag, null)}
                      className={`matchday-segment${!activeSeason ? " is-active" : ""}`}
                    >
                      All <span className="matchday-segment-count">{all.length}</span>
                    </Link>
                    {seasonChips.map((c) => (
                      <Link
                        key={c.key}
                        href={c.href}
                        className={`matchday-segment${c.active ? " is-active" : ""}`}
                      >
                        {c.label} <span className="matchday-segment-count">{c.count}</span>
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p
                style={{
                  margin: "1.5rem auto 0",
                  maxWidth: "52ch",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  color: "rgba(28,44,91,0.8)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Ninety minutes, then a few thousand words. Manchester City mostly, but any match
                worth staying up for. I know ball, you should learn some. Educate yourself below.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ── Cards ──────────────────────────────────────────────── */}
        <section style={{ paddingTop: "2rem", paddingBottom: "5rem" }}>
          <div className="container-editorial matchday-wide">
            {posts.length === 0 ? (
              <FadeUp>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "1.4rem",
                    color: "var(--color-ink-muted)",
                    maxWidth: "40ch",
                  }}
                >
                  {activeComp
                    ? `Nothing filed under ${COMPETITIONS[activeComp].label} yet.`
                    : activeTag
                      ? `Nothing filed under ${tagLabel(activeTag)} yet.`
                      : "Nothing here yet. Give it one bad result."}
                </p>
              </FadeUp>
            ) : (
              // Keyed by filter so the grid remounts and replays its entrance. Without
              // this, cards new to the list mount hidden and never animate in.
              <StaggerList
                key={`${activeComp}-${activeTag}-${activeSeason}`}
                className="matchday-grid"
              >
                {posts.map((post, i) => (
                  <StaggerItem key={post.slug} style={{ display: "flex" }}>
                    <MatchdayCard post={post} featured={i === 0} />
                  </StaggerItem>
                ))}
              </StaggerList>
            )}
          </div>
        </section>
      </div>

      {/* ── Email signup ───────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "3rem",
          paddingBottom: "4rem",
          borderTop: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <MatchdaySignup />
        </div>
      </section>
    </>
  );
}
