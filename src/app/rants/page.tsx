import type { Metadata } from "next";
import Link from "next/link";
import { getRants, RANT_TAGS, tagLabel } from "@/lib/rants";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Rants",
  description:
    "Match reactions, hit pieces, and opinions Austin Armstrong could not keep to himself. Manchester City and whatever else earned it.",
  alternates: { canonical: "https://austin-armstrong.me/rants" },
};

export default async function RantsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const all = getRants();
  const active = tag && RANT_TAGS.some((t) => t.slug === tag) ? tag : null;
  const posts = active ? all.filter((r) => r.tags.includes(active)) : all;

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
              {all.length > 0 ? `${all.length} ${all.length === 1 ? "rant" : "rants"}` : "Rants"} ·
              Written here, nowhere else
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-display">Rants</h1>
          </FadeUp>
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
              Manchester City after the final whistle, and whatever else earned a few thousand
              words. Written hot, published anyway.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Tag filter ─────────────────────────────────────────── */}
      <section style={{ paddingTop: "2rem", paddingBottom: "0" }}>
        <div className="container-editorial">
          <nav aria-label="Filter rants by topic">
            <ul
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li>
                <Link
                  href="/rants"
                  aria-current={!active ? "true" : undefined}
                  className="folio"
                  style={{
                    display: "inline-block",
                    padding: "0.4rem 0.9rem",
                    border: "1px solid var(--color-ink)",
                    background: !active ? "var(--color-yellow)" : "transparent",
                    color: "var(--color-ink)",
                    textDecoration: "none",
                  }}
                >
                  Everything
                </Link>
              </li>
              {RANT_TAGS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/rants?tag=${t.slug}`}
                    aria-current={active === t.slug ? "true" : undefined}
                    className="folio"
                    style={{
                      display: "inline-block",
                      padding: "0.4rem 0.9rem",
                      border: "1px solid var(--color-ink)",
                      background: active === t.slug ? "var(--color-yellow)" : "transparent",
                      color: "var(--color-ink)",
                      textDecoration: "none",
                    }}
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
                      {post.tags.map((t) => (
                        <span key={t} className="folio" style={{ color: "var(--color-ink-muted)" }}>
                          {tagLabel(t)}
                        </span>
                      ))}
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
                      <Link href={`/rants/${post.slug}`}>{post.title}</Link>
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

                    <Link href={`/rants/${post.slug}`} className="folio">
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
