import type { Metadata } from "next";
import Link from "next/link";
import { getCVEntries } from "@/lib/notion";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";
import PrintButton from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "CV",
  description: "Austin Armstrong — curriculum vitae.",
};

function formatPeriod(startDate: string | null, endDate: string | null, current: boolean): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  const s = startDate ? fmt(startDate) : "";
  if (current) return s ? `${s} — Present` : "Present";
  const e = endDate ? fmt(endDate) : "";
  return s && e ? `${s} — ${e}` : s || e;
}

// Pull the headline number out of the first bullet and label it by context.
function extractImpactStat(firstBullet: string): { num: string; label: string } | null {
  const match = firstBullet.match(/\$[\d,.]+[BMK+]*/);
  if (!match) return null;
  let label = "managed";
  if (/budget/i.test(firstBullet)) label = "IT budget managed";
  else if (/contract|sold|arr|revenue/i.test(firstBullet)) label = "contracts sold";
  return { num: match[0], label };
}

const competencies = [
  "Enterprise Relationship Management",
  "Consultative Selling",
  "Go-to-Market Strategy",
  "Account Management",
  "RFI/RFP Writing",
  "Contract Negotiation",
  "IT Financial Management",
  "Financial Forecasting",
  "Cost Optimization",
  "Variance Analysis",
  "GAAP Compliance",
  "Executive Dashboards",
  "ApptioOne",
  "Power BI",
  "HubSpot",
  "Apollo.io",
  "LinkedIn Sales Navigator",
  "SQL",
  "Process Automation",
  "RPA",
  "Data Migration",
  "AI / LLMs",
  "AI Positioning & Messaging",
  "Cross-Functional Stakeholder Alignment",
  "Long-Form Writing",
  "Capital Planning",
  "Financial Reporting",
];

export default async function ResumePage() {
  const entries = await getCVEntries();

  const work = entries.filter((e) => e.type === "Work");
  // Pin Chief Revenue Officer to the top; stable sort keeps the rest date-ordered.
  work.sort(
    (a, b) =>
      (/chief revenue officer/i.test(a.role) ? 0 : 1) -
      (/chief revenue officer/i.test(b.role) ? 0 : 1),
  );
  const education = entries.filter((e) => e.type === "Education");
  const awards = entries.filter((e) => e.type === "Award");
  const projects = entries.filter((e) => e.type === "Project" || e.type === "Volunteer");

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "5rem",
          background: "var(--color-ink)",
        }}
        className="print-header"
      >
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div
              className="folio"
              style={{ marginBottom: "2rem", color: "var(--color-ink-muted)" }}
            >
              Curriculum Vitae
            </div>
          </FadeUp>

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
                  color: "#f9f9f9",
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
                  color: "#f9f9f9",
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
                color: "rgba(249,249,249,0.65)",
                maxWidth: "52ch",
                lineHeight: 1.6,
                marginBottom: "2rem",
              }}
            >
              Generalist operator at the intersection of enterprise IT finance, AI go-to-market, and
              organizational change. I bridge technical and executive teams across health systems,
              AI startups, and founder-led product teams.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
              <span className="folio" style={{ color: "rgba(249,249,249,0.45)" }}>
                austin-armstrong.me
              </span>
              <span className="folio" style={{ color: "rgba(249,249,249,0.45)" }}>
                austin@austin-armstrong.me
              </span>
              <a
                href="https://www.linkedin.com/in/austin-armstrong20/"
                target="_blank"
                rel="noopener noreferrer"
                className="folio"
                style={{ color: "rgba(249,249,249,0.45)", textDecoration: "none" }}
              >
                linkedin.com/in/austin-armstrong20
              </a>
              <span
                className="folio"
                style={{
                  color: "var(--color-yellow)",
                  borderBottom: "1px solid var(--color-yellow)",
                  paddingBottom: "1px",
                }}
              >
                Open to enterprise partnerships &amp; advisory roles
              </span>
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
            background: "var(--color-bg)",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>
                Experience
              </div>
              <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
            </FadeUp>

            <StaggerList>
              {work.map((job) => {
                const period = formatPeriod(job.startDate, job.endDate, job.current);
                const bullets = job.description ? job.description.split("\n").filter(Boolean) : [];
                const impactStat = bullets.length > 0 ? extractImpactStat(bullets[0]) : null;

                return (
                  <StaggerItem key={job.id} as="article">
                    <article
                      style={{
                        padding: "2.5rem",
                        marginBottom: "1.5rem",
                        background: "var(--color-bg-warm)",
                        borderLeft: "4px solid var(--color-yellow)",
                      }}
                    >
                      {/* Role header with impact callout */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: impactStat ? "1fr auto" : "1fr",
                          gap: "2rem",
                          alignItems: "start",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontStyle: "italic",
                              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                              letterSpacing: "-0.01em",
                              color: "var(--color-ink)",
                              lineHeight: 1.1,
                              marginBottom: "0.4rem",
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
                                marginBottom: "0.5rem",
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
                              <span style={{ position: "relative", zIndex: 1 }}>
                                {job.organization}
                              </span>
                            </span>
                          )}
                          <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.25rem" }}>
                            {period && <span className="folio">{period}</span>}
                            {job.location && <span className="folio">{job.location}</span>}
                          </div>
                        </div>

                        {/* Impact callout number */}
                        {impactStat && (
                          <div style={{ textAlign: "right" }}>
                            <div
                              style={{
                                fontFamily: "var(--font-display)",
                                fontWeight: 700,
                                fontStyle: "italic",
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                lineHeight: 1,
                                letterSpacing: "-0.025em",
                                color: "var(--color-ink)",
                              }}
                            >
                              {impactStat.num}
                            </div>
                            <div
                              className="folio"
                              style={{ marginTop: "0.25rem", color: "var(--color-ink-muted)" }}
                            >
                              {impactStat.label}
                            </div>
                          </div>
                        )}
                      </div>

                      {bullets.length > 0 && (
                        <ul
                          style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.7rem" }}
                        >
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
                        <div
                          style={{
                            display: "flex",
                            gap: "0.4rem",
                            flexWrap: "wrap",
                            marginTop: "1.25rem",
                          }}
                        >
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="interest-tag"
                              style={{ fontSize: "0.58rem" }}
                            >
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

      {/* ── Competencies ───────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          background: "var(--color-ink)",
        }}
      >
        <div className="container-editorial">
          <FadeUp>
            <div
              className="text-label"
              style={{ marginBottom: "0.5rem", color: "rgba(249,249,249,0.45)" }}
            >
              Core Competencies
            </div>
            <hr
              style={{
                border: "none",
                borderTop: "2px solid var(--color-yellow)",
                marginBottom: "2rem",
              }}
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {competencies.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.35rem 0.75rem",
                    border: "1px solid rgba(249,249,249,0.2)",
                    color: "rgba(249,249,249,0.75)",
                    background: "transparent",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Certifications ─────────────────────────────────────── */}
      {awards.length > 0 && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>
                Certifications
              </div>
              <hr className="rule rule-thick" style={{ marginBottom: "2.5rem" }} />
            </FadeUp>

            <StaggerList
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
                gap: "1.25rem",
              }}
            >
              {awards.map((award) => (
                <StaggerItem key={award.id}>
                  <div
                    style={{
                      padding: "1.5rem 2rem",
                      borderLeft: "4px solid var(--color-yellow)",
                      background: "var(--color-bg-warm)",
                    }}
                  >
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "1.05rem",
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        lineHeight: 1.2,
                        marginBottom: "0.35rem",
                      }}
                    >
                      {award.role}
                    </h2>
                    {award.organization && <div className="folio">{award.organization}</div>}
                    {award.description && (
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.875rem",
                          color: "var(--color-ink-muted)",
                          lineHeight: 1.6,
                          marginTop: "0.5rem",
                          fontStyle: "italic",
                        }}
                      >
                        {award.description}
                      </p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </section>
      )}

      {/* ── Projects ───────────────────────────────────────────── */}
      {projects.length > 0 && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>
                Projects & Initiatives
              </div>
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
                          gap: "1.5rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 700,
                            fontStyle: "italic",
                            fontSize: "1.2rem",
                            letterSpacing: "-0.01em",
                            color: "var(--color-ink)",
                          }}
                        >
                          {proj.role}
                        </h2>
                        {period && (
                          <div className="folio" style={{ flexShrink: 0 }}>
                            {period}
                          </div>
                        )}
                      </div>
                      {proj.organization && (
                        <p className="folio" style={{ marginBottom: "0.5rem" }}>
                          {proj.organization}
                        </p>
                      )}
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

      {/* ── Education ──────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>
              Education
            </div>
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
                              marginBottom: "0.4rem",
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
                        <div className="folio" style={{ flexShrink: 0 }}>
                          {period}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          ) : (
            <FadeUp delay={0.1}>
              <div
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
                    Bachelor of Science in Finance
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "1rem",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    Gannon University
                  </p>
                </div>
              </div>
            </FadeUp>
          )}

          {/* Projects callout */}
          <FadeUp delay={0.1}>
            <div
              style={{
                marginTop: "3rem",
                padding: "2rem",
                borderLeft: "4px solid var(--color-yellow)",
                background: "var(--color-bg-warm)",
              }}
              className="no-print"
            >
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.95rem",
                  color: "var(--color-ink-soft)",
                  marginBottom: "0.75rem",
                }}
              >
                Looking for case studies and builds?
              </p>
              <Link href="/projects" className="btn-outline" style={{ display: "inline-block" }}>
                View Projects &amp; Case Studies →
              </Link>
            </div>
          </FadeUp>

          {/* Print CTA */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--color-rule)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
            className="no-print"
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-ink-muted)",
              }}
            >
              Save as PDF — File → Print → Save as PDF in your browser.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <PrintButton />
              <a href="mailto:austin@austin-armstrong.me" className="btn-outline">
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
