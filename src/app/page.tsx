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
          borderBottom: "1px solid var(--color-rule)",
          paddingTop: "5rem",
          paddingBottom: "0",
        }}
      >
        <div className="container-editorial">
          {/* Issue label */}
          <div className="animate-fade-up folio" style={{ marginBottom: "3rem" }}>
            Vol. I · Personal Site · Est. 2024
          </div>

          {/* Display name */}
          <h1
            className="text-display animate-fade-up delay-100"
            style={{ color: "var(--color-cream)", maxWidth: "16ch" }}
          >
            Austin
            <br />
            <em style={{ color: "var(--color-gold)", fontStyle: "italic" }}>
              Armstrong.
            </em>
          </h1>

          {/* Tagline */}
          <div
            className="animate-fade-up delay-200"
            style={{
              marginTop: "2.5rem",
              borderTop: "1px solid var(--color-rule)",
              paddingTop: "2rem",
              paddingBottom: "4rem",
            }}
          >
            <p
              className="text-subhead"
              style={{ maxWidth: "55ch", color: "var(--color-cream-dim)" }}
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
            {/* Bio text */}
            <div className="animate-fade-up delay-300">
              <div className="text-label" style={{ marginBottom: "1.5rem" }}>
                About
              </div>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "var(--color-cream-dim)",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                I'm a generalist who refuses to stay in a single lane. My thinking moves
                across disciplines — from the mechanics of cognition and how ideas become
                immune to criticism, to the mathematics of risk in barbell strategies, to
                what it means to build a company worth building.
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "var(--color-cream-dim)",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                I read obsessively. I think out loud here. If you're drawn to ideas that
                don't fit neatly into a single domain — finance intersecting with
                philosophy, AI intersecting with how we form beliefs, soccer intersecting
                with everything — you'll find something worth your time.
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  color: "var(--color-cream-dim)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Always reading. Deeply invested in my family and the humans around me.
              </p>
            </div>

            {/* Pull quote + interests */}
            <div className="animate-fade-up delay-400">
              <blockquote className="pull-quote" style={{ marginBottom: "3rem" }}>
                The generalist sees connections the specialist never will.
              </blockquote>

              <div className="text-label" style={{ marginBottom: "1rem" }}>
                Areas of interest
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
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

      {/* ── SECTIONS INDEX ───────────────────────────────────────── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <div className="text-label animate-fade-up delay-200" style={{ marginBottom: "3rem" }}>
            Contents
          </div>

          <div>
            {sections.map((section, i) => (
              <Link
                key={section.href}
                href={section.href}
                style={{
                  display: "grid",
                  gridTemplateColumns: "3rem 1fr 2rem",
                  alignItems: "start",
                  gap: "1.5rem",
                  padding: "2rem 0",
                  borderBottom: "1px solid var(--color-rule)",
                  textDecoration: "none",
                }}
                className={`animate-fade-up delay-${(i + 3) * 100}`}
              >
                <span className="folio" style={{ paddingTop: "0.3rem" }}>
                  {section.num}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      color: "var(--color-cream)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {section.label}
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {section.desc}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.1rem",
                    color: "var(--color-muted)",
                    paddingTop: "0.25rem",
                  }}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
