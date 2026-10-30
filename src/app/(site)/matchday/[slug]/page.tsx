import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatchdayPosts, getMatchdayPostBySlug, tagLabel } from "@/lib/matchday";
import { FadeUp } from "@/components/ui/Animate";
import RatingsPitch from "@/components/matchday/RatingsPitch";
import MatchStatsBar from "@/components/matchday/MatchStatsBar";
import PlayerSpotlight from "@/components/matchday/PlayerSpotlight";
import MatchdaySignup from "@/components/matchday/MatchdaySignup";

const BASE_URL = "https://austin-armstrong.me";

// Posts are files in the repo, so every slug is known at build time.
export async function generateStaticParams() {
  return getMatchdayPosts().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getMatchdayPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const canonical = `${BASE_URL}/matchday/${post.slug}`;
  const eyebrow = post.fixture ?? (post.tags[0] ? tagLabel(post.tags[0]) : "Matchday");
  const ogParams = new URLSearchParams({ theme: "matchday", title: post.title, subtitle: eyebrow });
  if (post.heroImage) ogParams.set("photo", post.heroImage);
  const ogImage = `/og?${ogParams.toString()}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function MatchdayPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getMatchdayPostBySlug(slug);
  if (!post) notFound();

  const canonical = `${BASE_URL}/matchday/${post.slug}`;

  const bodyStyle = {
    maxWidth: "68ch",
    margin: "0 auto",
    fontFamily: "var(--font-sans)",
    fontSize: "1.075rem",
    lineHeight: 1.8,
    color: "var(--color-ink-soft)",
  } as const;

  // Split after the first paragraph so the stats bar can drop in right below
  // it, ahead of everything else. Falls back to putting the whole body in
  // firstParagraphHtml (and skipping the split) if there's no </p> to find.
  const splitAt = post.bodyHtml.indexOf("</p>");
  const firstParagraphHtml = splitAt === -1 ? post.bodyHtml : post.bodyHtml.slice(0, splitAt + 4);
  const restOfBodyHtml = splitAt === -1 ? "" : post.bodyHtml.slice(splitAt + 4);

  // A `<!--SPOTLIGHT-->` marker line in the body, if present, drops the
  // player spotlight card in at that point instead of just after paragraph 1.
  const spotlightMarker = "<!--SPOTLIGHT-->";
  const spotlightAt = post.spotlight ? restOfBodyHtml.indexOf(spotlightMarker) : -1;
  const restBeforeSpotlight =
    spotlightAt === -1 ? restOfBodyHtml : restOfBodyHtml.slice(0, spotlightAt);
  const restAfterSpotlight =
    spotlightAt === -1 ? "" : restOfBodyHtml.slice(spotlightAt + spotlightMarker.length);

  // "Man City 2 — 2 Brighton · Carabao Cup, Fourth Round" → score chip + meta line.
  // A "(City win 4-3 on pens)" tail moves into the chip as "4-3 pens", and the
  // round after the comma is hidden on phones so the line stays on one row.
  const [scoreLine, rawCompetition = ""] = (post.fixture ?? "").split(" · ");
  const pens = rawCompetition.match(/\((?:.*?)(\d+-\d+) on pens\)/)?.[1];
  const [competition, round] = rawCompetition.replace(/\s*\(.*\)$/, "").split(", ");

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.map(tagLabel).join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    author: { "@type": "Person", name: "Austin Armstrong", url: BASE_URL },
    publisher: { "@type": "Person", name: "Austin Armstrong", url: BASE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* ── Hero: match photo behind a short title block ───────── */}
      <section
        style={{
          paddingTop: "2rem",
          paddingBottom: "2.25rem",
          borderBottom: "3px solid var(--city-gold)",
          background: post.heroImage
            ? `linear-gradient(180deg, rgba(18,28,60,0.2) 0%, rgba(18,28,60,0.9) 80%), url(${post.heroImage}) center 30% / cover`
            : "linear-gradient(160deg, var(--city-sky-deep) 0%, var(--city-navy) 100%)",
        }}
      >
        <div className="container-editorial">
          <FadeUp>
            <Link
              href="/matchday"
              className="folio"
              style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
            >
              ← All matchdays
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem 1.25rem",
                flexWrap: "wrap",
                marginTop: post.heroImage ? "6rem" : "2.5rem",
              }}
            >
              {scoreLine && (
                <span
                  style={{
                    background: "var(--city-gold)",
                    color: "var(--city-navy)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: "6px",
                  }}
                >
                  {scoreLine}
                  {pens && (
                    <span
                      style={{
                        marginLeft: "0.6rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {pens} pens
                    </span>
                  )}
                </span>
              )}
              {competition && (
                <span className="folio" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {competition}
                  {round && <span className="md-round">, {round}</span>}
                </span>
              )}
              {[post.dateFormatted, post.readTime].filter(Boolean).map((t) => (
                <span key={t} className="folio" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: "#fff",
                maxWidth: "26ch",
                margin: "0.9rem 0 0",
              }}
            >
              {post.title}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── Ratings pitch ──────────────────────────────────────── */}
      {post.ratings && (
        <section style={{ paddingTop: "3rem", paddingBottom: "0" }}>
          <div className="container-editorial">
            <FadeUp>
              <RatingsPitch ratings={post.ratings} />
            </FadeUp>
          </div>
        </section>
      )}

      {/* ── Body, with the stats bar dropped in after paragraph 1 ─ */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div
              className="essay-body matchday-callouts"
              style={bodyStyle}
              dangerouslySetInnerHTML={{ __html: firstParagraphHtml }}
            />
          </FadeUp>

          {post.matchStats && (
            <FadeUp>
              <div style={{ maxWidth: "68ch", fontSize: "1.075rem", margin: "2.5rem auto" }}>
                <MatchStatsBar stats={post.matchStats} />
              </div>
            </FadeUp>
          )}

          {restBeforeSpotlight && (
            <FadeUp>
              <div
                className="essay-body matchday-callouts"
                style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: restBeforeSpotlight }}
              />
            </FadeUp>
          )}

          {post.spotlight && spotlightAt !== -1 && (
            <FadeUp>
              <div
                style={{
                  maxWidth: "68ch",
                  fontSize: "1.075rem",
                  margin: "3rem auto",
                }}
              >
                <PlayerSpotlight player={post.spotlight} />
              </div>
            </FadeUp>
          )}

          {restAfterSpotlight && (
            <FadeUp>
              <div
                className="essay-body matchday-callouts"
                style={bodyStyle}
                dangerouslySetInnerHTML={{ __html: restAfterSpotlight }}
              />
            </FadeUp>
          )}
        </div>
      </section>

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
