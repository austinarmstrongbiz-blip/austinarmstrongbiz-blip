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
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", timeZone: "UTC" });
  const s = startDate ? fmt(startDate) : "";
  if (current) return s ? `${s} — Present` : "Present";
  const e = endDate ? fmt(endDate) : "";
  return s && e ? `${s} — ${e}` : s || e;
}

// The result a skimming reader should catch: money, a percent, a multiple, or a big count.
const RESULT = /\$[\d,.]*\d[BMK]?\+?|\d[\d,.]*%|\d+(?:-\d+)?x\b|\b\d{1,3}(?:,\d{3})+\b/;

// Bold a bullet's first result.
function WithResult({ text }: { text: string }) {
  const match = text.match(RESULT);
  if (!match || match.index === undefined) return <>{text}</>;
  return (
    <>
      {text.slice(0, match.index)}
      <strong>{match[0]}</strong>
      {text.slice(match.index + match[0].length)}
    </>
  );
}

const competencies = [
  {
    group: "Revenue",
    skills: [
      "Enterprise Relationship Management",
      "Consultative Selling",
      "Go-to-Market Strategy",
      "Account Management",
      "RFI/RFP Writing",
      "Contract Negotiation",
    ],
  },
  {
    group: "Finance",
    skills: [
      "IT Financial Management",
      "Financial Forecasting",
      "Cost Optimization",
      "Variance Analysis",
      "GAAP Compliance",
      "Executive Dashboards",
      "Capital Planning",
      "Financial Reporting",
    ],
  },
  {
    group: "AI & Operations",
    skills: [
      "AI / LLMs",
      "AI Positioning & Messaging",
      "Process Automation",
      "RPA",
      "Data Migration",
      "Cross-Functional Stakeholder Alignment",
      "Long-Form Writing",
    ],
  },
  {
    group: "Tools",
    skills: ["ApptioOne", "Power BI", "HubSpot", "Apollo.io", "LinkedIn Sales Navigator", "SQL"],
  },
];

const sectionStyle = { paddingTop: "3.5rem" };

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <FadeUp>
      <h2 className="text-label" style={{ marginBottom: "0.5rem" }}>
        {children}
      </h2>
      <hr className="rule rule-thick" />
    </FadeUp>
  );
}

// The dark title bar every card shares.
function CardHead({
  title,
  organization,
  period,
  place,
}: {
  title: string;
  organization?: string;
  period?: string;
  place?: string;
}) {
  return (
    <div className="resume-card-head">
      <div>
        <h3 className="resume-card-title">{title}</h3>
        {organization && <p className="resume-card-org">{organization}</p>}
      </div>
      {(period || place) && (
        <div className="resume-card-meta">
          {period && <span className="resume-card-date">{period}</span>}
          {place && <span className="resume-card-place">{place}</span>}
        </div>
      )}
    </div>
  );
}

export default async function ResumePage() {
  const entries = await getCVEntries();

  const isJaba = (organization: string) => /jaba/i.test(organization);
  const workRank = (role: string, organization: string) => {
    if (/chief revenue officer/i.test(role)) return 0;
    if (isJaba(organization)) return 2;
    return 1;
  };
  const work = entries.filter((e) => e.type === "Work");
  // Pin Chief Revenue Officer to the top and Jaba to the bottom; stable sort keeps the rest date-ordered.
  work.sort((a, b) => workRank(a.role, a.organization) - workRank(b.role, b.organization));
  const education = entries.filter((e) => e.type === "Education");
  const awards = entries.filter((e) => e.type === "Award");
  const projects = entries.filter((e) => e.type === "Project" || e.type === "Volunteer");

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{ background: "var(--color-yellow)", height: "4px" }} />
      <section className="resume-section" style={{ paddingTop: "4rem", paddingBottom: "3.5rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <h1
              className="resume-name"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 8vw, 6.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.025em",
                color: "var(--color-ink)",
                marginBottom: "1.75rem",
              }}
            >
              <span style={{ display: "block" }}>Austin</span>
              <span style={{ display: "inline-block", position: "relative" }}>
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

          <FadeUp delay={0.1}>
            <p
              className="resume-intro"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)",
                lineHeight: 1.5,
                color: "var(--color-ink-soft)",
                maxWidth: "48ch",
                marginBottom: "1.75rem",
              }}
            >
              I&rsquo;ve managed IT budgets up to $400M at health systems. Now I also run revenue at
              Autonomi, where I&rsquo;ve closed enterprise AI contracts and built the outbound team.
            </p>
            <div style={{ display: "flex", gap: "0.75rem 2rem", flexWrap: "wrap" }}>
              <a
                href="mailto:austin@austin-armstrong.me"
                className="folio"
                style={{ textDecoration: "none" }}
              >
                austin@austin-armstrong.me
              </a>
              <a
                href="https://www.linkedin.com/in/austin-armstrong20/"
                target="_blank"
                rel="noopener noreferrer"
                className="folio"
                style={{ textDecoration: "none" }}
              >
                linkedin.com/in/austin-armstrong20
              </a>
              <span
                className="folio"
                style={{
                  color: "var(--color-ink)",
                  borderBottom: "2px solid var(--color-yellow)",
                  paddingBottom: "1px",
                }}
              >
                Open to enterprise partnerships &amp; advisory roles
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="resume-body">
        <div className="container-editorial">
          {/* ── Experience ─────────────────────────────────────────── */}
          {work.length > 0 && (
            <section className="resume-section" style={sectionStyle}>
              <SectionHeading>Experience</SectionHeading>
              <StaggerList>
                {work.map((job) => {
                  const bullets = job.description
                    ? job.description.split("\n").filter(Boolean)
                    : [];
                  return (
                    <StaggerItem key={job.id} as="article" className="resume-card">
                      <CardHead
                        title={job.role}
                        organization={job.organization}
                        period={formatPeriod(job.startDate, job.endDate, job.current)}
                        place={job.location}
                      />
                      {bullets.length > 0 && (
                        <ul className="resume-bullets">
                          {bullets.map((bullet) => (
                            <li key={bullet}>
                              {/* Jaba's only figure is a seed target that never closed, so it stays plain. */}
                              <span>
                                {isJaba(job.organization) ? bullet : <WithResult text={bullet} />}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </StaggerItem>
                  );
                })}
              </StaggerList>
            </section>
          )}

          {/* ── Skills ─────────────────────────────────────────────── */}
          <section className="resume-section" style={sectionStyle}>
            <SectionHeading>Core Competencies</SectionHeading>
            <div className="resume-card">
              {competencies.map(({ group, skills }) => (
                <div key={group} className="resume-skill-row">
                  <h3 className="folio" style={{ color: "var(--color-ink)" }}>
                    {group}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      lineHeight: 1.6,
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {skills.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Projects ───────────────────────────────────────────── */}
          {projects.length > 0 && (
            <section className="resume-section" style={sectionStyle}>
              <SectionHeading>Projects &amp; Initiatives</SectionHeading>
              {projects.map((proj) => (
                <article key={proj.id} className="resume-card">
                  <CardHead
                    title={proj.role}
                    organization={proj.organization}
                    period={formatPeriod(proj.startDate, proj.endDate, proj.current)}
                  />
                  {proj.description && <p className="resume-card-note">{proj.description}</p>}
                </article>
              ))}
            </section>
          )}

          {/* ── Education ──────────────────────────────────────────── */}
          <section className="resume-section" style={sectionStyle}>
            <SectionHeading>Education</SectionHeading>
            {education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.id} className="resume-card">
                  <CardHead
                    title={edu.role}
                    organization={edu.organization}
                    period={formatPeriod(edu.startDate, edu.endDate, edu.current)}
                    place={edu.location}
                  />
                  {edu.description && <p className="resume-card-note">{edu.description}</p>}
                </div>
              ))
            ) : (
              <div className="resume-card">
                <CardHead
                  title="Triple Major: Entrepreneurship, Finance, and Marketing"
                  organization="Gannon University"
                />
              </div>
            )}
          </section>

          {/* ── Certifications ─────────────────────────────────────── */}
          {awards.length > 0 && (
            <section className="resume-section" style={sectionStyle}>
              <SectionHeading>Certifications</SectionHeading>
              {awards.map((award) => (
                <div key={award.id} className="resume-card">
                  <CardHead title={award.role} organization={award.organization} />
                  {award.description && <p className="resume-card-note">{award.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>

      {/* ── Close ──────────────────────────────────────────────── */}
      <section
        className="no-print"
        style={{ background: "var(--color-ink)", paddingTop: "3.5rem", paddingBottom: "3.5rem" }}
      >
        <div
          className="container-editorial"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              color: "#f9f9f9",
            }}
          >
            Let&rsquo;s talk.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <a href="mailto:austin@austin-armstrong.me" className="btn-yellow">
              Email me
            </a>
            <PrintButton />
            <Link href="/projects" className="folio" style={{ color: "#f9f9f9" }}>
              See my projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
