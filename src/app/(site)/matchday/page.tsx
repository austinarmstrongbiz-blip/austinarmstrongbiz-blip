import type { Metadata } from "next";
import { getMatchdayPosts, MATCHDAY_TAGS, tagLabel } from "@/lib/matchday";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";
import MatchdayCard from "@/components/matchday/MatchdayCard";

export const metadata: Metadata = {
  title: "Matchday",
  description:
    "Match reactions, hit pieces, and opinions Austin Armstrong could not keep to himself. Manchester City and whatever else earned it.",
  alternates: { canonical: "https://austin-armstrong.me/matchday" },
};

export default async function MatchdayPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const all = getMatchdayPosts();
  const active = tag && MATCHDAY_TAGS.some((t) => t.slug === tag) ? tag : null;
  const posts = active ? all.filter((r) => r.tags.includes(active)) : all;

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "4rem",
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
            <div
              style={{
                marginTop: "1.5rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: "clamp(0.95rem, 2.2vw, 1.25rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--city-gold)",
                textShadow: "0 2px 8px rgba(28,44,91,0.35)",
              }}
            >
              {all.length > 0 ? `${all.length} ${all.length === 1 ? "post" : "posts"}` : "Matchday"}{" "}
              · Written here, nowhere else
            </div>
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
                {active
                  ? `Nothing filed under ${tagLabel(active)} yet.`
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
