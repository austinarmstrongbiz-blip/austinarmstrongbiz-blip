import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatchdayPosts, getMatchdayPostBySlug, tagLabel } from "@/lib/matchday";
import { FadeUp } from "@/components/ui/Animate";
import RatingsPitch from "@/components/matchday/RatingsPitch";

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
  const label = post.tags[0] ? tagLabel(post.tags[0]) : "Matchday";
  const ogImage = `/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(label)}`;

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

      {/* ── Body ───────────────────────────────────────────────── */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "5rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div
              className="essay-body"
              style={{
                maxWidth: "68ch",
                fontFamily: "var(--font-sans)",
                fontSize: "1.075rem",
                lineHeight: 1.8,
                color: "var(--color-ink-soft)",
              }}
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
