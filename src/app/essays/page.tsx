import type { Metadata } from "next";
import { getSubstackPosts, SUBSTACK_URL } from "@/lib/substack";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Long-form writing by Austin Armstrong on AI, cognition, finance, and the art of being a generalist.",
};

export default async function EssaysPage() {
  const posts = await getSubstackPosts(50);
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div className="folio" style={{ marginBottom: "2rem" }}>
              {posts.length > 0 ? `${posts.length} essays` : "Essays"} · Published on Substack
            </div>
          </FadeUp>
          <FadeUp delay={0.1}><h1 className="text-display">Essays</h1></FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                marginTop: "2rem",
                maxWidth: "52ch",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "var(--color-ink-soft)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Ideas that demanded more than a tweet. Long-form explorations of
              what I'm thinking about — written to understand, not to perform.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Subscribe banner ──────────────────────────────────── */}
      <FadeIn>
        <section
          style={{
            background: "var(--color-yellow)",
            borderBottom: "2px solid var(--color-ink)",
            padding: "2rem 0",
          }}
        >
          <div
            className="container-editorial"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="text-label" style={{ marginBottom: "0.3rem" }}>
                Get new essays in your inbox
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1rem",
                  color: "var(--color-ink-soft)",
                }}
              >
                New posts delivered every time I publish — no noise, just ideas.
              </p>
            </div>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ borderColor: "var(--color-ink)", whiteSpace: "nowrap" }}
            >
              Subscribe on Substack →
            </a>
          </div>
        </section>
      </FadeIn>

      {/* ── Featured essay ─────────────────────────────────────── */}
      {featured && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "2px solid var(--color-ink)",
            background: "var(--color-bg-warm)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "2rem" }}>
                Latest essay
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
                <span className="folio" style={{ color: "var(--color-ink-soft)" }}>
                  {featured.dateFormatted}
                </span>
                {featured.readTime && (
                  <span className="folio" style={{ color: "var(--color-ink-muted)" }}>
                    {featured.readTime}
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  marginBottom: "1.25rem",
                }}
              >
                {featured.title}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--color-ink-soft)",
                  maxWidth: "65ch",
                  marginBottom: "2rem",
                }}
              >
                {featured.summary}
              </p>

              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-yellow"
              >
                Read essay →
              </a>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── All essays ─────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>
              All essays
            </div>
            <hr className="rule rule-thick" style={{ marginBottom: "0" }} />
          </FadeUp>

          {rest.length > 0 ? (
            <StaggerList>
              {rest.map((post) => (
                <StaggerItem key={post.url} as="article">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "2rem",
                      alignItems: "start",
                      padding: "2.5rem 0",
                      borderBottom: "1px solid var(--color-rule)",
                      textDecoration: "none",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                          letterSpacing: "-0.015em",
                          lineHeight: 1.1,
                          color: "var(--color-ink)",
                          marginBottom: "0.6rem",
                        }}
                      >
                        {post.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.95rem",
                          lineHeight: 1.75,
                          color: "var(--color-ink-soft)",
                          maxWidth: "70ch",
                        }}
                      >
                        {post.summary}
                      </p>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="folio">{post.dateFormatted}</div>
                      {post.readTime && (
                        <div className="folio" style={{ marginTop: "0.3rem" }}>
                          {post.readTime}
                        </div>
                      )}
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerList>
          ) : (
            <p
              style={{
                paddingTop: "3rem",
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink-muted)",
                fontSize: "0.95rem",
              }}
            >
              No essays found. Check back soon.
            </p>
          )}

          {/* Bottom subscribe CTA */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--color-rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1rem",
                color: "var(--color-ink-muted)",
                maxWidth: "40ch",
              }}
            >
              New essays published regularly. Subscribe so you don't miss them.
            </p>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-yellow"
            >
              Subscribe on Substack →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
