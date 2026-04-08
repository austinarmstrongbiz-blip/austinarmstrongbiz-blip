import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Austin Armstrong",
};

const interests = [
  "Artificial Intelligence",
  "Personal Development",
  "Finance",
  "Economics",
  "Non-Fiction",
  "Manchester City",
  "Soccer",
  "Entrepreneurship",
  "Startups",
  "Generalists",
  "Cognition",
  "Individual Thinking",
  "Mental Immunity",
  "Barbell Strategy",
  "Health",
  "Family",
];

const sections = [
  {
    href: "/now",
    label: "Now",
    num: "01",
    desc: "What I'm reading, thinking about, and working on at this moment.",
  },
  {
    href: "/essays",
    label: "Essays",
    num: "02",
    desc: "Long-form explorations of ideas that won't leave me alone.",
  },
  {
    href: "/resume",
    label: "Curriculum Vitae",
    num: "03",
    desc: "A record of where I've been and what I've built.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "0",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          {/* Folio / edition label */}
          <div className="animate-fade-up folio" style={{ marginBottom: "2.5rem" }}>
            Personal site · Austin Armstrong
          </div>

          {/* Big display name — Basilia Bold Italic, Pittsburgh yellow highlight */}
          <h1 className="animate-fade-up delay-100" style={{ marginBottom: "0" }}>
            {/* "Austin" — plain */}
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
              Austin
            </span>

            {/* "Armstrong." — yellow highlight bar behind it, like the logo */}
            <span
              style={{
                display: "inline-block",
                position: "relative",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
              {/* Yellow bar — sits behind the text */}
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "0.06em",
                  height: "0.4em",
                  background: "var(--color-yellow)",
                  zIndex: 0,
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>Armstrong.</span>
            </span>
          </h1>

          {/* Tagline */}
          <div
            className="animate-fade-up delay-200"
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              paddingBottom: "4rem",
              borderTop: "1px solid var(--color-rule)",
              maxWidth: "60ch",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
                lineHeight: 1.4,
                color: "var(--color-ink-soft)",
              }}
            >
              "I am someone who is curious about the world,
              <br />
              here are my notes about what I find."
            </p>
          </div>
        </div>
      </section>

      {/* ── BIO + INTERESTS ──────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "5rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "4rem",
            }}
          >
            {/* Bio */}
            <div className="animate-fade-up delay-200">
              <div className="text-label" style={{ marginBottom: "1.5rem" }}>
                About
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "var(--color-ink-soft)",
                  marginBottom: "1.25rem",
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
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "var(--color-ink-soft)",
                  marginBottom: "1.25rem",
                }}
              >
                I read obsessively. I think out loud here. If you're drawn to
                ideas that don't fit neatly into a single domain — finance
                intersecting with philosophy, AI intersecting with how we form
                beliefs, soccer intersecting with everything — you'll find
                something worth your time.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "var(--color-ink-soft)",
                }}
              >
                Always reading. Deeply invested in my family and the humans
                around me.
              </p>
            </div>

            {/* Pull quote + interests */}
            <div className="animate-fade-up delay-300">
              {/* Pull quote with yellow left-border */}
              <blockquote
                className="pull-quote"
                style={{ marginBottom: "3rem" }}
              >
                The generalist sees connections the specialist never will.
              </blockquote>

              <div className="text-label" style={{ marginBottom: "1rem" }}>
                Areas of interest
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
                {interests.map((interest) => (
                  <span key={interest} className="interest-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION INDEX ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "6rem",
        }}
      >
        <div className="container-editorial">
          <div
            className="text-label animate-fade-up"
            style={{ marginBottom: "0.5rem" }}
          >
            Contents
          </div>
          <hr className="rule rule-thick animate-fade-up" style={{ marginBottom: "0", animationDelay: "0.1s" }} />

          {sections.map((section, i) => (
            <Link
              key={section.href}
              href={section.href}
              className="animate-fade-up"
              style={{
                animationDelay: `${(i + 2) * 0.1}s`,
                display: "grid",
                gridTemplateColumns: "3rem 1fr 1.5rem",
                gap: "1.5rem",
                alignItems: "start",
                padding: "2.25rem 0",
                borderBottom: "1px solid var(--color-rule)",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
            >
              <span className="folio" style={{ paddingTop: "0.3rem" }}>
                {section.num}
              </span>

              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.015em",
                    color: "var(--color-ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {section.label}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "var(--color-ink-muted)",
                    lineHeight: 1.5,
                  }}
                >
                  {section.desc}
                </p>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  color: "var(--color-ink-muted)",
                  paddingTop: "0.3rem",
                }}
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
