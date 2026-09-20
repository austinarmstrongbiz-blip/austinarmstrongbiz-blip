import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatchdayPosts, getMatchdayPostBySlug, tagLabel } from "@/lib/matchday";
import { FadeUp } from "@/components/ui/Animate";
import RatingsPitch from "@/components/matchday/RatingsPitch";
import MatchStatsBar from "@/components/matchday/MatchStatsBar";
import PlayerSpotlight from "@/components/matchday/PlayerSpotlight";

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

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
          background: `linear-gradient(160deg, var(--city-sky) 0%, var(--city-sky-deep) 100%)`,
          borderBottom: "3px solid var(--city-navy)",
        }}
      >
        <div className="container-editorial">
          <FadeUp>
            <Link
              href="/matchday"
              className="folio"
              style={{ color: "rgba(28,44,91,0.7)", textDecoration: "none" }}
            >
              ← All matchdays
            </Link>
          </FadeUp>

          {post.fixture && (
            <FadeUp delay={0.05}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(1.75rem, 5vw, 3.25rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: "var(--city-gold)",
                  textShadow: "0 2px 10px rgba(28,44,91,0.25)",
                  margin: "1.75rem 0 1.25rem",
                }}
              >
                {post.fixture}
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.08}>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <span className="folio" style={{ color: "var(--city-navy)" }}>
                {post.dateFormatted}
              </span>
              <span className="folio" style={{ color: "rgba(28,44,91,0.65)" }}>
                {post.readTime}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: "var(--city-navy)",
                maxWidth: "20ch",
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
              <div style={{ maxWidth: "68ch", margin: "2.5rem auto" }}>
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
                  maxWidth: post.spotlight.layout === "side" ? undefined : "68ch",
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
    </>
  );
}
