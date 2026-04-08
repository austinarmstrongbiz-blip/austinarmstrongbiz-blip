import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Austin Armstrong — curriculum vitae.",
};

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

const skills = [
  {
    label: "Strategy & Vision",
    items: ["Product strategy", "Go-to-market", "Fundraising", "Team building"],
  },
  {
    label: "Thinking Frameworks",
    items: ["Systems thinking", "Barbell strategy", "First principles", "Mental models"],
  },
  {
    label: "Domain Knowledge",
    items: ["AI / LLMs", "Consumer growth", "B2B SaaS", "FinTech"],
  },
  {
    label: "Communication",
    items: ["Long-form writing", "Public speaking", "Investor narrative", "Team alignment"],
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

export default function ResumePage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "4rem",
          borderBottom: "2px solid var(--color-ink)",
        }}
      >
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <div className="animate-fade-up folio" style={{ marginBottom: "2rem" }}>
            Curriculum Vitae
          </div>

          {/* Name as display type */}
          <h1
            className="animate-fade-up delay-100"
            style={{ marginBottom: "2.5rem" }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
              Austin
            </span>
            <span
              style={{
                display: "inline-block",
                position: "relative",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
              }}
            >
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

          <div className="animate-fade-up delay-200">
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.15rem",
                color: "var(--color-ink-soft)",
                maxWidth: "50ch",
                lineHeight: 1.5,
                marginBottom: "1.5rem",
              }}
            >
              Founder, generalist, and relentless reader. I build things at the
              intersection of AI, knowledge, and human curiosity.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              <span className="folio">austin-armstrong.me</span>
              <span className="folio">Available for select advisory</span>
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
          <hr className="rule rule-thick animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          {experience.map((job, i) => (
            <article
              key={`${job.role}-${job.company}`}
              className="animate-fade-up"
              style={{
                animationDelay: `${(i + 2) * 0.1}s`,
                paddingBottom: "3rem",
                marginBottom: "3rem",
                borderBottom: "1px solid var(--color-rule)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "1.4rem",
                      letterSpacing: "-0.01em",
                      color: "var(--color-ink)",
                      lineHeight: 1.1,
                    }}
                  >
                    {job.role}
                  </h2>
                  {/* Company with yellow underline accent */}
                  <span
                    style={{
                      display: "inline-block",
                      position: "relative",
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "1rem",
                      color: "var(--color-ink-soft)",
                      marginTop: "0.25rem",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: "0",
                        height: "0.35em",
                        background: "var(--color-yellow)",
                        zIndex: 0,
                      }}
                    />
                    <span style={{ position: "relative", zIndex: 1 }}>{job.company}</span>
                  </span>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className="folio">{job.period}</div>
                  <div className="folio" style={{ marginTop: "0.3rem" }}>{job.location}</div>
                </div>
              </div>

              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.6rem" }}>
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
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        background: "var(--color-yellow)",
                        display: "inline-block",
                        marginTop: "0.65rem",
                        flexShrink: 0,
                      }}
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Competencies ───────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
          background: "var(--color-bg-warm)",
        }}
      >
        <div className="container-editorial">
          <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
            Competencies
          </div>
          <hr className="rule rule-thick animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "3rem",
            }}
          >
            {skills.map((group, i) => (
              <div key={group.label} className="animate-fade-up" style={{ animationDelay: `${(i + 2) * 0.1}s` }}>
                <div className="text-label" style={{ marginBottom: "1rem" }}>
                  {group.label}
                </div>
                <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9rem",
                        color: "var(--color-ink-soft)",
                        lineHeight: 1.5,
                        paddingLeft: "0.75rem",
                        borderLeft: "2px solid var(--color-yellow)",
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
          <hr className="rule rule-thick animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          {education.map((edu) => (
            <div
              key={edu.degree}
              className="animate-fade-up delay-200"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "2rem",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    fontSize: "1.3rem",
                    color: "var(--color-ink)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.3rem",
                  }}
                >
                  {edu.degree}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "1rem",
                    color: "var(--color-ink-soft)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {edu.institution}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    color: "var(--color-ink-muted)",
                    fontStyle: "italic",
                  }}
                >
                  {edu.note}
                </p>
              </div>
              <div className="folio" style={{ flexShrink: 0 }}>{edu.period}</div>
            </div>
          ))}

          {/* CTA */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--color-rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-ink-muted)",
              }}
            >
              For a formal PDF copy of this CV, reach out directly.
            </p>
            <button className="btn-yellow">Download PDF</button>
          </div>
        </div>
      </section>
    </>
  );
}
