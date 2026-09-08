import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatchdayPosts, getMatchdayPostBySlug, tagLabel } from "@/lib/matchday";
import { FadeUp } from "@/components/ui/Animate";
import NewsletterForm from "@/components/ui/NewsletterForm";

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

      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "3rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "3rem" }}>
          <FadeUp>
            <Link
              href="/matchday"
              className="folio"
              style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            >
              ← All matchdays
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                margin: "2rem 0 1.25rem",
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
                <Link
                  key={t}
                  href={`/matchday?tag=${t}`}
                  className="folio"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  {tagLabel(t)}
                </Link>
              ))}
            </div>
          </FadeUp>

          {post.fixture && (
            <FadeUp delay={0.08}>
              <div className="folio" style={{ color: "var(--color-ink)", marginBottom: "1rem" }}>
                {post.fixture}
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
                maxWidth: "20ch",
              }}
            >
              {post.title}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────── */}
      <section style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
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

      {/* ── Subscribe CTA ──────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "3rem",
          paddingBottom: "5rem",
          borderTop: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <NewsletterForm
            variant="light"
            blurb="If you liked this one, there are more where it came from. Drop your email."
          />
        </div>
      </section>
    </>
  );
}
