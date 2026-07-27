import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubstackPosts, getSubstackPostBySlug } from "@/lib/substack";
import { FadeUp } from "@/components/ui/Animate";
import NewsletterForm from "@/components/ui/NewsletterForm";

const BASE_URL = "https://austin-armstrong.me";

// Prerender every essay at build time; refresh hourly via the feed's ISR cache.
export async function generateStaticParams() {
  const posts = await getSubstackPosts(100);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getSubstackPostBySlug(slug);
  if (!post) return { title: "Essay not found" };

  const canonical = `${BASE_URL}/essays/${post.slug}`;
  const ogImage = `/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent("Essay")}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  };
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getSubstackPostBySlug(slug);
  if (!post) notFound();

  const canonical = `${BASE_URL}/essays/${post.slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
    author: {
      "@type": "Person",
      name: "Austin Armstrong",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Austin Armstrong",
      url: BASE_URL,
    },
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
              href="/essays"
              className="folio"
              style={{ color: "var(--color-ink-muted)", textDecoration: "none" }}
            >
              ← All essays
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
              {post.readTime && (
                <span className="folio" style={{ color: "var(--color-ink-muted)" }}>
                  {post.readTime}
                </span>
              )}
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

          {/* Canonical credit + Substack link */}
          <div
            style={{
              maxWidth: "68ch",
              marginTop: "3rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--color-rule)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-ink-muted)",
                lineHeight: 1.6,
              }}
            >
              This essay also appears on{" "}
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-ink-soft)", textDecoration: "underline" }}
              >
                Substack
              </a>
              . Subscribe there to get new essays delivered to your inbox.
            </p>
          </div>
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
            blurb="Enjoyed this? New essays published regularly — drop your email and Substack delivers them straight to your inbox."
          />
        </div>
      </section>
    </>
  );
}
