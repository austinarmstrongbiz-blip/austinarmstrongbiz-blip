import type { Metadata } from "next";
import { getGitHubRepos, GITHUB_USERNAME } from "@/lib/github";
import { featuredRepoNames, staticProjects } from "@/lib/data";
import { FadeUp, FadeIn, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "What Austin Armstrong is building — open-source projects, tools, and notable professional work.",
};

// Language → accent color
const langColor: Record<string, string> = {
  TypeScript: "var(--color-pillar-ai)",
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  CSS: "var(--color-pillar-personal)",
  HTML: "var(--color-pillar-lifestyle)",
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();
  const featured = repos.filter((r) => featuredRepoNames.includes(r.name));
  const rest = repos.filter((r) => !featuredRepoNames.includes(r.name));

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "0",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div className="folio" style={{ marginBottom: "2rem" }}>
              Open source · Professional work · @{GITHUB_USERNAME}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}><h1 className="text-display">Projects</h1></FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                marginTop: "2rem",
                maxWidth: "52ch",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "var(--color-ink-soft)",
                fontFamily: "var(--font-sans)",
              }}
            >
              What I'm building and what I've shipped. Open-source repos live
              on GitHub; notable professional projects are documented below.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ marginTop: "2rem", display: "inline-block" }}
            >
              View GitHub profile →
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── Featured GitHub repos ──────────────────────────────── */}
      {featured.length > 0 && (
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
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>Featured</div>
              <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
            </FadeUp>

            <StaggerList
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: "1.5rem",
              }}
            >
              {featured.map((repo) => (
                <StaggerItem key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "2rem",
                      borderTop: "3px solid var(--color-yellow)",
                      border: "1px solid var(--color-rule)",
                      borderTopWidth: "3px",
                      borderTopColor: "var(--color-yellow)",
                      textDecoration: "none",
                      transition: "background 0.15s ease",
                      height: "100%",
                    }}
                    className="pillar-card"
                  >
                    <div style={{ flex: 1 }}>
                      {repo.language && (
                        <div
                          className="folio"
                          style={{
                            color: langColor[repo.language] ?? "var(--color-ink-muted)",
                            marginBottom: "0.75rem",
                          }}
                        >
                          {repo.language}
                        </div>
                      )}
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "1.3rem",
                          letterSpacing: "-0.01em",
                          color: "var(--color-ink)",
                          lineHeight: 1.1,
                          marginBottom: "0.75rem",
                        }}
                      >
                        {repo.displayName}
                      </h2>
                      {repo.description && (
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.9rem",
                            lineHeight: 1.65,
                            color: "var(--color-ink-soft)",
                            marginBottom: "1.5rem",
                          }}
                        >
                          {repo.description}
                        </p>
                      )}
                      {repo.topics.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
                          {repo.topics.map((t) => (
                            <span key={t} className="interest-tag" style={{ fontSize: "0.58rem" }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1rem",
                        paddingTop: "1rem",
                        borderTop: "1px solid var(--color-rule)",
                      }}
                    >
                      <span className="folio">Updated {repo.updatedFormatted}</span>
                      {repo.stargazers_count > 0 && (
                        <span className="folio">★ {repo.stargazers_count}</span>
                      )}
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </section>
      )}

      {/* ── Other GitHub repos ─────────────────────────────────── */}
      {rest.length > 0 && (
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-rule)",
          }}
        >
          <div className="container-editorial">
            <FadeUp>
              <div className="text-label" style={{ marginBottom: "0.5rem" }}>All repositories</div>
              <hr className="rule rule-thick" style={{ marginBottom: "0" }} />
            </FadeUp>

            <StaggerList>
              {rest.map((repo) => (
                <StaggerItem key={repo.id}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "2rem",
                      alignItems: "center",
                      padding: "1.75rem 0",
                      borderBottom: "1px solid var(--color-rule)",
                      textDecoration: "none",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "1.15rem",
                          letterSpacing: "-0.01em",
                          color: "var(--color-ink)",
                          lineHeight: 1.1,
                          marginBottom: "0.35rem",
                        }}
                      >
                        {repo.displayName}
                      </h2>
                      {repo.description && (
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.875rem",
                            color: "var(--color-ink-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          {repo.description}
                        </p>
                      )}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {repo.language && (
                        <div
                          className="folio"
                          style={{ color: langColor[repo.language] ?? "var(--color-ink-muted)" }}
                        >
                          {repo.language}
                        </div>
                      )}
                      <div className="folio" style={{ marginTop: "0.25rem" }}>
                        {repo.updatedFormatted}
                      </div>
                    </div>
                  </a>
                </StaggerItem>
              ))}
            </StaggerList>
          </div>
        </section>
      )}

      {/* ── Professional / Notable projects ────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>Notable professional work</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>

          <StaggerList
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))",
              gap: "1.5rem",
            }}
          >
            {staticProjects.map((proj) => (
              <StaggerItem key={proj.title}>
                <div
                  style={{
                    padding: "2rem",
                    border: "1px solid var(--color-rule)",
                    borderTopWidth: "3px",
                    borderTopColor: proj.tagColor,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      className="folio"
                      style={{ color: proj.tagColor, marginBottom: "0.75rem" }}
                    >
                      {proj.tag}
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "1.15rem",
                        letterSpacing: "-0.01em",
                        color: "var(--color-ink)",
                        lineHeight: 1.15,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {proj.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.875rem",
                        lineHeight: 1.65,
                        color: "var(--color-ink-soft)",
                        marginBottom: "1.25rem",
                      }}
                    >
                      {proj.description}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.4rem" }}>
                      {proj.highlights.map((h) => (
                        <li
                          key={h}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "0.75rem 1fr",
                            gap: "0.5rem",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "var(--color-ink-muted)",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              width: "4px",
                              height: "4px",
                              background: proj.tagColor,
                              display: "inline-block",
                              marginTop: "0.35rem",
                              flexShrink: 0,
                            }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="folio" style={{ marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid var(--color-rule)" }}>
                    {proj.period}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>
    </>
  );
}
