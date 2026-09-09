import type { Metadata } from "next";
import Link from "next/link";
import { getMatchdayPosts, MATCHDAY_TAGS, tagLabel } from "@/lib/matchday";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

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
          background: `linear-gradient(160deg, var(--city-navy) 0%, var(--city-navy-soft) 100%)`,
          borderBottom: "3px solid var(--city-sky)",
        }}
      >
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div className="folio" style={{ marginBottom: "2rem", color: "var(--city-sky)" }}>
              {all.length > 0 ? `${all.length} ${all.length === 1 ? "post" : "posts"}` : "Matchday"}{" "}
              · Written here, nowhere else
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-display" style={{ color: "#fff" }}>
              Matchday
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                marginTop: "2rem",
                maxWidth: "52ch",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.75)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Ninety minutes, then a few thousand words. Manchester City mostly, but any match worth
              staying up for. Written hot, published anyway.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── List ───────────────────────────────────────────────── */}
      <section style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
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
            <StaggerList>
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <article
                    style={{
                      paddingBottom: "2.5rem",
                      marginBottom: "2.5rem",
                      borderBottom: "1px solid var(--color-rule)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="folio" style={{ color: "var(--color-ink-soft)" }}>
                        {post.dateFormatted}
                      </span>
                      <span className="folio" style={{ color: "var(--color-ink-muted)" }}>
                        {post.readTime}
                      </span>
                    </div>

                    {post.fixture && (
                      <div
                        className="folio"
                        style={{ color: "var(--color-ink)", marginBottom: "0.75rem" }}
                      >
                        {post.fixture}
                      </div>
                    )}

                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        color: "var(--color-ink)",
                        marginBottom: "1rem",
                      }}
                    >
                      <Link href={`/matchday/${post.slug}`}>{post.title}</Link>
                    </h2>

                    {post.excerpt && (
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "1rem",
                          lineHeight: 1.8,
                          color: "var(--color-ink-soft)",
                          maxWidth: "65ch",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {post.excerpt}
                      </p>
                    )}

                    <Link href={`/matchday/${post.slug}`} className="folio">
                      Read it →
                    </Link>
                  </article>
                </StaggerItem>
              ))}
            </StaggerList>
          )}
        </div>
      </section>
    </>
  );
}
