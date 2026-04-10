import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { reading, thinking, interests } from "@/lib/data";
import { getSubstackPosts, SUBSTACK_URL } from "@/lib/substack";
import {
  FadeUp,
  FadeIn,
  StaggerList,
  StaggerItem,
  HeroText,
  YellowBarReveal,
} from "@/components/ui/Animate";
import InstagramFeed from "@/components/ui/InstagramFeed";

export const metadata: Metadata = {
  title: "Austin Armstrong",
};

// ─── PILLARS ──────────────────────────────────────────────────────────────────
const pillars = [
  {
    id: "lifestyle",
    label: "Lifestyle Design",
    color: "var(--color-pillar-lifestyle)",
    count: 22,
    desc: "How to architect a life on your own terms — not the template you were handed.",
    href: "/essays",
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    color: "var(--color-pillar-ai)",
    count: 18,
    desc: "What AI actually changes about thinking, working, and what it means to be curious.",
    href: "/essays",
  },
  {
    id: "finance",
    label: "Finance",
    color: "var(--color-pillar-finance)",
    count: 21,
    desc: "Money as a tool, not a scoreboard. Wealth psychology, barbell strategy, and risk.",
    href: "/essays",
  },
  {
    id: "personal-development",
    label: "Personal Development",
    color: "var(--color-pillar-personal)",
    count: 24,
    desc: "Mental models, cognitive upgrading, and the work of becoming a sharper thinker.",
    href: "/essays",
  },
];

// Now strip
const currentBook = reading.find((b) => b.progress < 100 && b.progress > 0) ?? reading[0];
const currentThought = thinking[0];

export default async function HomePage() {
  const substackPosts = await getSubstackPosts(3);
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          borderBottom: "1px solid var(--color-rule)",
          overflow: "hidden",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 42%",
            minHeight: "90vh",
          }}
        >
          {/* Left — text */}
          <div
            style={{
              padding: "5rem 4rem 4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="hero-text-col"
          >
            <div>
              <HeroText delay={0}>
                <div className="folio" style={{ marginBottom: "2.5rem" }}>
                  Personal site · Austin Armstrong
                </div>
              </HeroText>

              <h1 style={{ marginBottom: 0 }}>
                <HeroText delay={0.1} style={{ display: "block" }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(3.5rem, 7vw, 8rem)",
                      lineHeight: 0.9,
                      letterSpacing: "-0.025em",
                      color: "var(--color-ink)",
                    }}
                  >
                    Austin
                  </span>
                </HeroText>

                <HeroText delay={0.2} style={{ display: "inline-block" }}>
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(3.5rem, 7vw, 8rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                      color: "var(--color-ink)",
                    }}
                  >
                    <YellowBarReveal delay={0.45} />
                    <span style={{ position: "relative", zIndex: 1 }}>Armstrong.</span>
                  </span>
                </HeroText>
              </h1>
            </div>

            {/* Tagline pinned to bottom of left col */}
            <FadeUp delay={0.4}>
              <div
                style={{
                  paddingTop: "2rem",
                  borderTop: "1px solid var(--color-rule)",
                  marginTop: "3rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                    lineHeight: 1.5,
                    color: "var(--color-ink-soft)",
                    maxWidth: "40ch",
                    marginBottom: "2rem",
                  }}
                >
                  "I am someone who is curious about the world,
                  here are my notes about what I find."
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <Link href="/essays" className="btn-yellow" style={{ fontSize: "0.62rem" }}>
                    Read essays
                  </Link>
                  <Link href="/now" className="btn-outline" style={{ fontSize: "0.62rem" }}>
                    What I'm doing now
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right — full-body photo */}
          <div
            style={{
              position: "relative",
              borderLeft: "1px solid var(--color-rule)",
            }}
            className="hero-photo-col"
          >
            <Image
              src="/images/Groom_601246405.jpg"
              alt="Austin Armstrong"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </div>
        </div>
      </section>

      {/* ── THE THESIS ────────────────────────────────────────────────────── */}
      {/* Full-width yellow band — the brand statement */}
      <FadeIn>
        <section
          style={{
            background: "var(--color-yellow)",
            borderBottom: "2px solid var(--color-ink)",
            padding: "4rem 0",
          }}
        >
          <div className="container-editorial">
            <FadeUp delay={0.1}>
              <div className="folio" style={{ color: "var(--color-ink-soft)", marginBottom: "1.5rem" }}>
                The thesis
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                  maxWidth: "22ch",
                }}
              >
                Traditional does not get exceptional.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p
                style={{
                  marginTop: "1.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  color: "var(--color-ink-soft)",
                  maxWidth: "52ch",
                  lineHeight: 1.7,
                }}
              >
                Every piece I write exists to dismantle a blueprint that no longer
                works and replace it with something you built yourself.
              </p>
            </FadeUp>
          </div>
        </section>
      </FadeIn>

      {/* ── BIO ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">

          {/* Row 1: photos + bio text */}
          <div
            className="bio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "280px 280px 1fr",
              gap: "2.5rem",
              alignItems: "start",
              marginBottom: "3rem",
            }}
          >
            {/* Photo 1 */}
            <FadeUp>
              <div style={{ position: "relative", height: "380px", overflow: "hidden" }}>
                <Image
                  src="/images/Groom_601246415.jpg"
                  alt="Austin Armstrong"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 15%" }}
                  sizes="280px"
                />
              </div>
            </FadeUp>

            {/* Photo 2 — offset down */}
            <FadeUp delay={0.12}>
              <div style={{ position: "relative", height: "380px", overflow: "hidden", marginTop: "2rem" }}>
                <Image
                  src="/images/Groom_601246435.jpg"
                  alt="Austin Armstrong"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 10%" }}
                  sizes="280px"
                />
              </div>
            </FadeUp>

            {/* Bio text only */}
            <FadeUp delay={0.2}>
              <div className="text-label" style={{ marginBottom: "1rem" }}>About</div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--color-ink-soft)",
                  marginBottom: "1rem",
                }}
              >
                I'm a generalist who refuses to stay in a single lane. My
                thinking moves across disciplines — from the mechanics of
                cognition and how ideas become immune to criticism, to the
                mathematics of risk in barbell strategies, to what it means to
                build a company worth building.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "var(--color-ink-soft)",
                }}
              >
                I read obsessively. I think out loud here. If you're drawn to
                ideas that don't fit neatly into a single domain, you'll find
                something worth your time.
              </p>
            </FadeUp>
          </div>

          {/* Row 2: pull quote — full width */}
          <FadeUp>
            <blockquote
              className="pull-quote"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
                maxWidth: "none",
                marginBottom: "2rem",
                paddingLeft: "1.5rem",
              }}
            >
              The generalist sees connections the specialist never will.
            </blockquote>
          </FadeUp>

          {/* Row 3: interest tags — full width */}
          <FadeUp delay={0.1}>
            <div className="text-label" style={{ marginBottom: "0.75rem" }}>Areas of interest</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {interests.map((interest) => (
                <span key={interest} className="interest-tag">{interest}</span>
              ))}
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── THE PILLARS ───────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid var(--color-rule)",
          background: "var(--color-bg-warm)",
        }}
      >
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>
              §01 · The pillars
            </div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>

          <StaggerList
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: "0",
            }}
          >
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.id}>
                <Link
                  href={pillar.href}
                  style={{
                    display: "block",
                    padding: "2rem",
                    borderTop: `3px solid ${pillar.color}`,
                    borderRight: "1px solid var(--color-rule)",
                    textDecoration: "none",
                    transition: "background 0.15s ease",
                  }}
                  className="pillar-card"
                >
                  <div
                    className="folio"
                    style={{ color: "var(--color-ink-muted)", marginBottom: "1rem" }}
                  >
                    {pillar.count} essays
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "1.2rem",
                      letterSpacing: "-0.01em",
                      color: "var(--color-ink)",
                      lineHeight: 1.1,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {pillar.label}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.875rem",
                      lineHeight: 1.65,
                      color: "var(--color-ink-soft)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {pillar.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    Read essays →
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── CINEMATIC PHOTO BAND ──────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: "clamp(280px, 40vw, 560px)",
          borderBottom: "2px solid var(--color-ink)",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/Reception_601246639.jpg"
          alt="Austin Armstrong"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
          sizes="100vw"
        />
        {/* Subtle dark overlay so the yellow quote pops */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(35,31,32,0.35)",
          }}
        />
        {/* Quote overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              maxWidth: "20ch",
              borderLeft: "4px solid var(--color-yellow)",
              paddingLeft: "1.25rem",
              textAlign: "left",
            }}
          >
            Traditional does not get exceptional.
          </p>
        </div>
      </div>

      {/* ── LATEST ESSAYS ─────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <FadeUp
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "0.5rem",
            }}
          >
            <div className="text-label">§02 · Latest essays</div>
            <a
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="folio"
              style={{ color: "var(--color-ink-muted)", transition: "color 0.15s" }}
            >
              All essays →
            </a>
          </FadeUp>
          <FadeUp delay={0.05}>
            <hr className="rule rule-thick" style={{ marginBottom: "0" }} />
          </FadeUp>

          <StaggerList>
            {substackPosts.map((post) => (
              <StaggerItem key={post.url}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "2rem",
                    alignItems: "start",
                    padding: "2rem 0",
                    borderBottom: "1px solid var(--color-rule)",
                    textDecoration: "none",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
                        letterSpacing: "-0.015em",
                        lineHeight: 1.1,
                        color: "var(--color-ink)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {post.title}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--color-ink-muted)",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        maxWidth: "60ch",
                      }}
                    >
                      {post.summary}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="folio">{post.dateFormatted}</div>
                    {post.readTime && (
                      <div className="folio" style={{ marginTop: "0.3rem" }}>{post.readTime}</div>
                    )}
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── NOW STRIP ─────────────────────────────────────────────────────── */}
      <FadeIn>
        <section
          style={{
            paddingTop: "3rem",
            paddingBottom: "3rem",
            borderBottom: "2px solid var(--color-ink)",
            background: "var(--color-ink)",
          }}
        >
          <div className="container-editorial">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              {/* Currently reading */}
              <div>
                <div
                  className="folio"
                  style={{ color: "var(--color-yellow)", marginBottom: "0.5rem" }}
                >
                  Currently reading
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "var(--color-bg)",
                    lineHeight: 1.2,
                  }}
                >
                  {currentBook.title}
                </div>
                <div
                  className="folio"
                  style={{ color: "rgba(249,249,249,0.5)", marginTop: "0.35rem" }}
                >
                  {currentBook.author} · {currentBook.progress}%
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  height: "4rem",
                  background: "rgba(249,249,249,0.15)",
                  justifySelf: "center",
                }}
                className="now-divider"
              />

              {/* Currently thinking */}
              <div>
                <div
                  className="folio"
                  style={{ color: "var(--color-yellow)", marginBottom: "0.5rem" }}
                >
                  Currently thinking about
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    color: "var(--color-bg)",
                    lineHeight: 1.2,
                  }}
                >
                  {currentThought.idea}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/now"
                className="btn-yellow"
                style={{ justifySelf: "end", whiteSpace: "nowrap" }}
              >
                See the full now →
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── INSTAGRAM FEED ────────────────────────────────────────────────── */}
      <InstagramFeed />

      {/* ── CONTACT FOOTER STRIP ──────────────────────────────────────────── */}
      <FadeUp>
        <section style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div className="container-editorial">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "2rem",
              }}
            >
              <div>
                <div className="text-label" style={{ marginBottom: "0.75rem" }}>
                  §03 · Get in touch
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1rem",
                    color: "var(--color-ink-soft)",
                    maxWidth: "40ch",
                    lineHeight: 1.5,
                  }}
                >
                  Advisory, collaboration, or just a good conversation about ideas.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <a href="mailto:hello@austin-armstrong.me" className="btn-yellow">
                  Email me
                </a>
                <Link href="/resume" className="btn-outline">
                  View CV
                </Link>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginLeft: "0.5rem" }}>
                  <a href="https://www.instagram.com/austinarmstrong20/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href="https://x.com/austin_2020" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/austin-armstrong20/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>
    </>
  );
}
