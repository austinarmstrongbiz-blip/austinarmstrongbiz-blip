import type { Metadata } from "next";
import { getCVEntries } from "@/lib/notion";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "CV",
  description: "Austin Armstrong — curriculum vitae.",
};

function formatPeriod(
  startDate: string | null,
  endDate: string | null,
  current: boolean
): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  const s = startDate ? fmt(startDate) : "";
  if (current) return s ? `${s} — Present` : "Present";
  const e = endDate ? fmt(endDate) : "";
  return s && e ? `${s} — ${e}` : s || e;
}

export default async function ResumePage() {
  const entries = await getCVEntries();

  const work = entries.filter((e) => e.type === "Work");
  const education = entries.filter((e) => e.type === "Education");
  const projects = entries.filter((e) => e.type === "Project" || e.type === "Volunteer");

  // Fall back to hardcoded skills if Notion has no entries
  const fallbackSkills = [
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
          <FadeUp><div className="folio" style={{ marginBottom: "2rem" }}>Curriculum Vitae</div></FadeUp>

          <FadeUp delay={0.1} as="div" style={{ marginBottom: "2.5rem" }}>
            <h1>
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
          </FadeUp>

          <FadeUp delay={0.2}>
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
          </FadeUp>
        </div>
      </section>

      {/* ── Experience ─────────────────────────────────────────── */}
      {work.length > 0 && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>Experience</div>
              <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
            </FadeUp>

            <StaggerList>
              {work.map((job) => {
                const period = formatPeriod(job.startDate, job.endDate, job.current);
                const bullets = job.description
                  ? job.description.split("\n").filter(Boolean)
                  : [];
                return (
                  <StaggerItem key={job.id} as="article">
                    <article
                      style={{
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
                          {job.organization && (
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
                              <span style={{ position: "relative", zIndex: 1 }}>{job.organization}</span>
                            </span>
                          )}
                        </div>

                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {period && <div className="folio">{period}</div>}
                          {job.location && (
                            <div className="folio" style={{ marginTop: "0.3rem" }}>{job.location}</div>
                          )}
                        </div>
                      </div>

                      {bullets.length > 0 && (
                        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.6rem" }}>
                          {bullets.map((bullet) => (
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
                      )}

                      {job.skills.length > 0 && (
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "1rem" }}>
                          {job.skills.map((skill) => (
                            <span key={skill} className="interest-tag" style={{ fontSize: "0.58rem" }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          </div>
        </section>
      )}

      {/* ── Projects / Volunteer ─────────────────────────────── */}
      {projects.length > 0 && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-rule)",
            background: "var(--color-bg-warm)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>Projects & Initiatives</div>
              <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
            </FadeUp>

            <StaggerList>
              {projects.map((proj) => {
                const period = formatPeriod(proj.startDate, proj.endDate, proj.current);
                return (
                  <StaggerItem key={proj.id} as="article">
                    <article
                      style={{
                        paddingBottom: "2rem",
                        marginBottom: "2rem",
                        borderBottom: "1px solid var(--color-rule)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "1.5rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontStyle: "italic",
                              fontSize: "1.2rem",
                              letterSpacing: "-0.01em",
                              color: "var(--color-ink)",
                              lineHeight: 1.15,
                            }}
                          >
                            {proj.role}
                          </h2>
                          {proj.organization && (
                            <p className="folio" style={{ marginTop: "0.2rem" }}>{proj.organization}</p>
                          )}
                        </div>
                        {period && <div className="folio" style={{ flexShrink: 0 }}>{period}</div>}
                      </div>

                      {proj.description && (
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.95rem",
                            lineHeight: 1.7,
                            color: "var(--color-ink-soft)",
                            maxWidth: "65ch",
                          }}
                        >
                          {proj.description}
                        </p>
                      )}
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          </div>
        </section>
      )}

      {/* ── Competencies ───────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
          background: work.length > 0 ? "var(--color-bg)" : "var(--color-bg-warm)",
        }}
      >
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>Competencies</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>

          <StaggerList
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "3rem",
            }}
          >
            {fallbackSkills.map((group) => (
              <StaggerItem key={group.label}>
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
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Education ──────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>Education</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>

          {education.length > 0 ? (
            <StaggerList>
              {education.map((edu) => {
                const period = formatPeriod(edu.startDate, edu.endDate, edu.current);
                return (
                  <StaggerItem key={edu.id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "2rem",
                        paddingBottom: "2rem",
                        marginBottom: "2rem",
                        borderBottom: "1px solid var(--color-rule)",
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
                          {edu.role}
                        </h2>
                        {edu.organization && (
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
                            {edu.organization}
                          </p>
                        )}
                        {edu.description && (
                          <p
                            style={{
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.9rem",
                              color: "var(--color-ink-muted)",
                              fontStyle: "italic",
                              lineHeight: 1.6,
                            }}
                          >
                            {edu.description}
                          </p>
                        )}
                      </div>
                      {period && (
                        <div className="folio" style={{ flexShrink: 0 }}>{period}</div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          ) : (
            <FadeUp delay={0.1}>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-ink-muted)",
                  fontSize: "0.95rem",
                }}
              >
                Education details loading from Notion.
              </p>
            </FadeUp>
          )}

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
            <a href="mailto:hello@austin-armstrong.me" className="btn-yellow">
              Get in touch →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
