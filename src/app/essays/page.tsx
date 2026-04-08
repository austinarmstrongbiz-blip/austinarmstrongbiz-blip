import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays",
  description: "Long-form writing by Austin Armstrong on AI, cognition, finance, and the art of being a generalist.",
};

interface Essay {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tag: string;
  excerpt: string;
  featured?: boolean;
}

/* ─── STUB ESSAYS ─────────────────────────────────────────────────── */
const essays: Essay[] = [
  {
    slug: "the-generalist-advantage",
    title: "The Generalist Advantage",
    subtitle: "Why breadth isn't the consolation prize — it's the strategy",
    date: "March 2024",
    readTime: "12 min",
    tag: "Generalists",
    excerpt:
      "There's a story we tell about expertise: you pick a lane, go deep, and mastery follows. It's clean. It's compelling. And for a certain type of knowledge work in a certain type of economy, it was true. But the lane is getting narrower, and the traffic is moving faster. The generalist's time is coming — not because breadth is inherently virtuous, but because the conditions for it to be strategically dominant are finally in place.",
    featured: true,
  },
  {
    slug: "mental-immunity",
    title: "Mental Immunity and the Art of Changing Your Mind",
    subtitle: "What stands between you and actually updating your beliefs",
    date: "February 2024",
    readTime: "9 min",
    tag: "Mental Immunity",
    excerpt:
      "Critical thinking is the ability to evaluate evidence. Mental immunity is the emotional infrastructure that allows you to act on that evaluation even when it costs you something — an identity, a relationship, a prior commitment. We teach the first. We barely talk about the second.",
  },
  {
    slug: "barbell-strategy-career",
    title: "The Barbell Career",
    subtitle: "Applying Taleb's anti-fragility framework to how you design your professional life",
    date: "January 2024",
    readTime: "11 min",
    tag: "Barbell Strategy",
    excerpt:
      "Nassim Taleb's barbell strategy — put 90% in safe assets, 10% in asymmetric bets — is most often applied to financial portfolios. But the logic maps cleanly onto how you allocate your professional time, energy, and identity. The question is: what's your 90%, what's your 10%, and are you treating the middle as if it's safety when it's actually the most fragile position of all?",
  },
  {
    slug: "ai-and-original-curiosity",
    title: "AI and the New Scarcity: Original Curiosity",
    subtitle: "When synthesis is cheap, the moat shifts to the quality of your questions",
    date: "December 2023",
    readTime: "8 min",
    tag: "AI",
    excerpt:
      "Every productivity revolution creates a new bottleneck. The printing press made literacy essential. The calculator made mathematical intuition the differentiator. AI synthesis tools are making something else scarce: the quality of the questions you're inclined to ask in the first place. Curiosity — real, original, uncomfortable curiosity — is becoming the moat.",
  },
  {
    slug: "what-manchester-city-taught-me",
    title: "What Manchester City Taught Me About Systems Thinking",
    subtitle: "Pep Guardiola runs a masterclass in organizational coherence every weekend",
    date: "November 2023",
    readTime: "7 min",
    tag: "Soccer",
    excerpt:
      "I've been watching Manchester City for two decades. In that time, I've learned more about systems, incentives, and the compounding effect of philosophy than from most business books. Not because football is a metaphor for business — that framing is reductive. But because Guardiola's City operates with a coherence that is genuinely rare, and watching it is an education.",
  },
];

/* ─── PAGE ─────────────────────────────────────────────────────────── */
export default function EssaysPage() {
  const featured = essays.find((e) => e.featured);
  const rest = essays.filter((e) => !e.featured);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <div className="animate-fade-up folio" style={{ marginBottom: "2rem" }}>
            {essays.length} essays · Long-form writing
          </div>

          <h1
            className="text-display animate-fade-up delay-100"
            style={{ color: "var(--color-cream)" }}
          >
            Essays
          </h1>

          <p
            className="animate-fade-up delay-200"
            style={{
              marginTop: "2rem",
              maxWidth: "55ch",
              fontSize: "1.1rem",
              lineHeight: 1.75,
              color: "var(--color-cream-dim)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Ideas that demanded more than a tweet. Long-form explorations of
            what I'm thinking about — written to understand, not to perform.
          </p>
        </div>
      </section>

      {/* ── Featured essay ─────────────────────────────────────── */}
      {featured && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-rule)",
            background: "var(--color-surface)",
          }}
        >
          <div className="container-editorial">
            <div className="text-label animate-fade-up" style={{ marginBottom: "2rem" }}>
              Featured essay
            </div>

            <article className="animate-fade-up delay-100">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "2rem",
                }}
              >
                <div>
                  <span className="interest-tag" style={{ marginBottom: "1.5rem", display: "inline-block" }}>
                    {featured.tag}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                      fontWeight: 700,
                      color: "var(--color-cream)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {featured.title}
                  </h2>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                      color: "var(--color-gold)",
                      fontSize: "1.05rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {featured.subtitle}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span className="folio">{featured.date}</span>
                    <span className="folio">{featured.readTime} read</span>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      lineHeight: 1.8,
                      color: "var(--color-cream-dim)",
                      maxWidth: "65ch",
                      marginBottom: "2rem",
                    }}
                  >
                    {featured.excerpt}
                  </p>

                  <button
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "0.75rem 1.5rem",
                      border: "1px solid var(--color-gold-dim)",
                      color: "var(--color-gold)",
                      background: "transparent",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Read essay →
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* ── All essays ─────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
            All essays
          </div>
          <hr className="rule animate-fade-up delay-100" style={{ marginBottom: "0" }} />

          <div>
            {rest.map((essay, i) => (
              <article
                key={essay.slug}
                className={`animate-fade-up delay-${(i + 2) * 100}`}
                style={{
                  padding: "2.5rem 0",
                  borderBottom: "1px solid var(--color-rule)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span
                        className="interest-tag"
                        style={{ marginBottom: "1rem", display: "inline-block" }}
                      >
                        {essay.tag}
                      </span>

                      <h2
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                          fontWeight: 700,
                          color: "var(--color-cream)",
                          letterSpacing: "-0.015em",
                          lineHeight: 1.2,
                          marginBottom: "0.5rem",
                        }}
                      >
                        {essay.title}
                      </h2>

                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontStyle: "italic",
                          color: "var(--color-muted)",
                          fontSize: "0.95rem",
                        }}
                      >
                        {essay.subtitle}
                      </p>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="folio">{essay.date}</div>
                      <div className="folio" style={{ marginTop: "0.25rem" }}>
                        {essay.readTime}
                      </div>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      lineHeight: 1.75,
                      color: "var(--color-cream-dim)",
                      maxWidth: "70ch",
                    }}
                  >
                    {essay.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
