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

// The results a skimming reader should catch: money, percents, multiples, big counts.
const RESULT = /\$[\d,.]*\d[BMK]?\+?|\d[\d,.]*%|\d+(?:-\d+)?x\b|\b\d{1,3}(?:,\d{3})+\b/g;
const MAX_MARKS_PER_BULLET = 2;

// Put the logo's yellow bar under a bullet's first results.
function Highlighted({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const match of [...text.matchAll(RESULT)].slice(0, MAX_MARKS_PER_BULLET)) {
    parts.push(text.slice(cursor, match.index));
    parts.push(
      <mark key={match.index} className="resume-mark">
        {match[0]}
      </mark>,
    );
    cursor = match.index + match[0].length;
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
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
const entryTitleStyle = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontStyle: "italic",
  fontSize: "clamp(1.25rem, 2.5vw, 1.6rem)",
  letterSpacing: "-0.01em",
  lineHeight: 1.15,
  color: "var(--color-ink)",
} as const;
const entryOrgStyle = {
  fontFamily: "var(--font-display)",
  fontStyle: "italic",
  fontSize: "1rem",
  color: "var(--color-ink-soft)",
  marginTop: "0.3rem",
} as const;
const entryNoteStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  color: "var(--color-ink-soft)",
  marginTop: "0.5rem",
  maxWidth: "65ch",
} as const;

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
      <section className="resume-section" style={{ paddingTop: "4rem" }}>
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

      <div className="container-editorial" style={{ paddingBottom: "5rem" }}>
        {/* ── Experience ─────────────────────────────────────────── */}
        {work.length > 0 && (
          <section className="resume-section" style={sectionStyle}>
            <SectionHeading>Experience</SectionHeading>
            <StaggerList>
              {work.map((job) => {
                const bullets = job.description ? job.description.split("\n").filter(Boolean) : [];
                return (
                  <StaggerItem key={job.id} as="article" className="resume-row">
                    <div className="resume-rail">
                      <div className="folio">
                        {formatPeriod(job.startDate, job.endDate, job.current)}
                      </div>
                      {job.location && <div className="folio">{job.location}</div>}
                    </div>
                    <div>
                      <h3 style={entryTitleStyle}>{job.role}</h3>
                      {job.organization && <p style={entryOrgStyle}>{job.organization}</p>}
                      {bullets.length > 0 && (
                        <ul className="resume-bullets">
                          {bullets.map((bullet) => (
                            <li key={bullet}>
                              {/* Jaba's only figure is a seed target that never closed, so it stays unmarked. */}
                              {isJaba(job.organization) ? bullet : <Highlighted text={bullet} />}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          </section>
        )}

        {/* ── Skills ─────────────────────────────────────────────── */}
        <section className="resume-section" style={sectionStyle}>
          <SectionHeading>Core Competencies</SectionHeading>
          {competencies.map(({ group, skills }) => (
            <div key={group} className="resume-row resume-row-tight">
              <h3 className="resume-rail folio" style={{ color: "var(--color-ink)" }}>
                {group}
              </h3>
              <p style={{ ...entryNoteStyle, marginTop: 0 }}>{skills.join(", ")}</p>
            </div>
          ))}
        </section>

        {/* ── Projects ───────────────────────────────────────────── */}
        {projects.length > 0 && (
          <section className="resume-section" style={sectionStyle}>
            <SectionHeading>Projects &amp; Initiatives</SectionHeading>
            {projects.map((proj) => (
              <article key={proj.id} className="resume-row">
                <div className="resume-rail folio">
                  {formatPeriod(proj.startDate, proj.endDate, proj.current)}
                </div>
                <div>
                  <h3 style={entryTitleStyle}>{proj.role}</h3>
                  {proj.organization && <p style={entryOrgStyle}>{proj.organization}</p>}
                  {proj.description && <p style={entryNoteStyle}>{proj.description}</p>}
                </div>
              </article>
            ))}
          </section>
        )}

        {/* ── Education ──────────────────────────────────────────── */}
        <section className="resume-section" style={sectionStyle}>
          <SectionHeading>Education</SectionHeading>
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} className="resume-row">
                <div className="resume-rail folio">
                  {formatPeriod(edu.startDate, edu.endDate, edu.current)}
                </div>
                <div>
                  <h3 style={entryTitleStyle}>{edu.role}</h3>
                  {edu.organization && <p style={entryOrgStyle}>{edu.organization}</p>}
                  {edu.description && <p style={entryNoteStyle}>{edu.description}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="resume-row">
              <div className="resume-rail" />
              <div>
                <h3 style={entryTitleStyle}>
                  Triple Major: Entrepreneurship, Finance, and Marketing
                </h3>
                <p style={entryOrgStyle}>Gannon University</p>
              </div>
            </div>
          )}
        </section>

        {/* ── Certifications ─────────────────────────────────────── */}
        {awards.length > 0 && (
          <section className="resume-section" style={sectionStyle}>
            <SectionHeading>Certifications</SectionHeading>
            {awards.map((award) => (
              <div key={award.id} className="resume-row">
                <div className="resume-rail folio">{award.organization}</div>
                <div>
                  <h3 style={entryTitleStyle}>{award.role}</h3>
                  {award.description && <p style={entryNoteStyle}>{award.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}
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
