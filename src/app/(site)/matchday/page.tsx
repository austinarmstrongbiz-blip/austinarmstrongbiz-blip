import type { Metadata } from "next";
import Link from "next/link";
import { COMPETITIONS, getMatchdayPosts, MATCHDAY_TAGS, tagLabel } from "@/lib/matchday";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";
import MatchdayCard from "@/components/matchday/MatchdayCard";

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
  searchParams: Promise<{ tag?: string; competition?: string }>;
}) {
  const { tag, competition } = await searchParams;
  const all = getMatchdayPosts();

  const activeTag = tag && MATCHDAY_TAGS.some((t) => t.slug === tag) ? tag : null;
  const activeComp = competition && COMPETITIONS[competition] ? competition : null;

  const posts = all.filter(
    (p) =>
      (!activeTag || p.tags.includes(activeTag)) && (!activeComp || p.competition === activeComp),
  );

  // Only surface filters that would actually return something.
  const chips: Chip[] = [
    ...Object.entries(COMPETITIONS).map(([slug, { label }]) => ({
      key: `comp-${slug}`,
      label,
      count: all.filter((p) => p.competition === slug).length,
      href: `/matchday?competition=${slug}`,
      active: activeComp === slug,
    })),
    ...MATCHDAY_TAGS.map((t) => ({
      key: `tag-${t.slug}`,
      label: t.label,
      count: all.filter((p) => p.tags.includes(t.slug)).length,
      href: `/matchday?tag=${t.slug}`,
      active: activeTag === t.slug,
    })),
  ].filter((c) => c.count > 0);

  const filtered = Boolean(activeTag || activeComp);
  const countLabel = `${all.length} ${all.length === 1 ? "post" : "posts"}`;

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "3.5rem",
          background: `linear-gradient(160deg, var(--city-sky) 0%, var(--city-sky-deep) 100%)`,
          borderBottom: "3px solid var(--city-navy)",
        }}
      >
        <div className="container-editorial" style={{ paddingTop: "4rem", textAlign: "center" }}>
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
            <nav aria-label="Filter matchday posts" className="matchday-chips">
              {filtered && (
                <Link href="/matchday" className="matchday-chip">
                  All <span className="matchday-chip-count">{all.length}</span>
                </Link>
              )}
              {chips.map((c) => (
                <Link
                  key={c.key}
                  href={c.href}
                  aria-current={c.active ? "true" : undefined}
                  className={`matchday-chip${c.active ? " is-active" : ""}`}
                >
                  {c.label} <span className="matchday-chip-count">{c.count}</span>
                </Link>
              ))}
            </nav>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p
              style={{
                margin: "2rem auto 0",
                maxWidth: "52ch",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                fontStyle: "italic",
                color: "rgba(28,44,91,0.8)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Ninety minutes, then a few thousand words. Manchester City mostly, but any match worth
              staying up for. I know ball, you should learn some. Educate yourself below.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Cards ──────────────────────────────────────────────── */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div className="container-editorial">
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
            <StaggerList className="matchday-grid">
              {posts.map((post) => (
                <StaggerItem key={post.slug} style={{ display: "flex" }}>
                  <MatchdayCard post={post} />
                </StaggerItem>
              ))}
            </StaggerList>
          )}
        </div>
      </section>
    </>
  );
}
