import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Austin Armstrong — curriculum vitae.",
};

/* ─── DATA ─────────────────────────────────────────────────────────── */
const experience = [
  {
    role: "Founder & CEO",
    company: "Blip",
    period: "2022 — Present",
    location: "Remote",
    bullets: [
      "Building AI-powered tools for knowledge workers and curious generalists.",
      "Raised pre-seed funding; grew to early user base across multiple cohorts.",
      "Responsible for product strategy, fundraising, hiring, and culture.",
    ],
  },
  {
    role: "Head of Growth",
    company: "Previous Company",
    period: "2020 — 2022",
    location: "San Francisco, CA",
    bullets: [
      "Owned full-funnel growth strategy from acquisition through retention.",
      "Built and led a cross-functional growth team of 8 across marketing, data, and engineering.",
      "Scaled revenue 3× in 18 months through systematic experimentation.",
    ],
  },
  {
    role: "Entrepreneur in Residence",
    company: "Venture Studio",
    period: "2019 — 2020",
    location: "New York, NY",
    bullets: [
      "Ideated, validated, and killed 4 concepts before finding product-market fit signal.",
      "Developed thesis on AI applications in knowledge management.",
    ],
  },
];

const education = [
  {
    degree: "B.S., Economics",
    institution: "University Name",
    period: "2012 — 2016",
    note: "Focus on behavioral economics and decision theory.",
  },
];

const skills = [
  { label: "Strategy & Vision",        items: ["Product strategy", "Go-to-market", "Fundraising", "Team building"] },
  { label: "Thinking Frameworks",       items: ["Systems thinking", "Barbell strategy", "First principles", "Mental models"] },
  { label: "Domain Knowledge",          items: ["AI / LLMs", "Consumer growth", "B2B SaaS", "FinTech"] },
  { label: "Communication",             items: ["Long-form writing", "Public speaking", "Investor narrative", "Team alignment"] },
];

/* ─── PAGE ─────────────────────────────────────────────────────────── */
export default function ResumePage() {
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
            Curriculum Vitae
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
          >
            <div>
              <h1
                className="text-display animate-fade-up delay-100"
                style={{ color: "var(--color-cream)" }}
              >
                Austin
                <br />
                Armstrong
              </h1>
            </div>

            <div className="animate-fade-up delay-200">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontStyle: "italic",
                  fontSize: "1.1rem",
                  color: "var(--color-cream-dim)",
                  maxWidth: "50ch",
                  marginBottom: "1.5rem",
                  lineHeight: 1.7,
                }}
              >
                Founder, generalist, and relentless reader. I build things at
                the intersection of AI, knowledge, and human curiosity.
              </p>

              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                <span className="folio">austin-armstrong.me</span>
                <span className="folio">Available for select advisory</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
            Experience
          </div>
          <hr className="rule animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0" }}>
            {experience.map((job, i) => (
              <article
                key={`${job.role}-${job.company}`}
                className={`animate-fade-up delay-${(i + 2) * 100}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "0.5rem",
                  paddingBottom: "3rem",
                  marginBottom: "3rem",
                  borderBottom: "1px solid var(--color-rule)",
                }}
              >
                {/* Role header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "var(--color-cream)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {job.role}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1rem",
                        color: "var(--color-gold)",
                        marginTop: "0.2rem",
                      }}
                    >
                      {job.company}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="folio">{job.period}</div>
                    <div className="folio" style={{ marginTop: "0.25rem" }}>
                      {job.location}
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "grid",
                    gap: "0.6rem",
                  }}
                >
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1rem 1fr",
                        gap: "0.75rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: "var(--color-cream-dim)",
                      }}
                    >
                      <span
                        style={{ color: "var(--color-gold-dim)", marginTop: "0.55rem", fontSize: "0.5rem" }}
                        aria-hidden
                      >
                        ●
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
          background: "var(--color-surface)",
        }}
      >
        <div className="container-editorial">
          <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
            Competencies
          </div>
          <hr className="rule animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {skills.map((group, i) => (
              <div
                key={group.label}
                className={`animate-fade-up delay-${(i + 2) * 100}`}
              >
                <div className="text-label" style={{ marginBottom: "1rem" }}>
                  {group.label}
                </div>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.4rem" }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--color-cream-dim)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Education ──────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
            Education
          </div>
          <hr className="rule animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          {education.map((edu) => (
            <div
              key={edu.degree}
              className="animate-fade-up delay-200"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1.5rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "var(--color-cream)",
                  }}
                >
                  {edu.degree}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    color: "var(--color-gold)",
                    marginTop: "0.2rem",
                  }}
                >
                  {edu.institution}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "var(--color-muted)",
                    marginTop: "0.5rem",
                    fontStyle: "italic",
                  }}
                >
                  {edu.note}
                </p>
              </div>
              <div className="folio" style={{ flexShrink: 0 }}>
                {edu.period}
              </div>
            </div>
          ))}

          {/* Download CTA */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--color-rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-muted)",
              }}
            >
              For a formal PDF copy of this CV, reach out directly.
            </p>
            <button
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.75rem 1.5rem",
                border: "1px solid var(--color-rule)",
                color: "var(--color-cream-dim)",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Download PDF
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
