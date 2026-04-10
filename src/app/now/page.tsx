import type { Metadata } from "next";
import { getReadingList } from "@/lib/notion";
import { thinking } from "@/lib/data";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Now",
  description: "What Austin Armstrong is currently reading, thinking about, and building.",
};

function ProgressBar({ value }: { value: number }) {
  const done = value === 100;
  return (
    <div
      style={{
        height: "3px",
        background: "var(--color-rule)",
        width: "100%",
        marginTop: "0.75rem",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${value}%`,
          background: done ? "var(--color-ink)" : "var(--color-yellow)",
        }}
      />
    </div>
  );
}

// Status → progress mapping when no explicit % is available
function statusToProgress(status: string): number {
  if (status === "Read") return 100;
  if (status === "Reading") return 50;
  return 0;
}

export default async function NowPage() {
  const books = await getReadingList();

  // Prioritise "Reading" first, then "Read", skip "Want to Read" for display
  const displayBooks = [
    ...books.filter((b) => b.status === "Reading"),
    ...books.filter((b) => b.status === "Read"),
  ].slice(0, 10);

  const lastUpdated = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "5rem",
          paddingBottom: "4rem",
          borderBottom: "2px solid var(--color-ink)",
        }}
      >
        <div style={{ background: "var(--color-yellow)", height: "4px", marginBottom: "0" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div className="folio" style={{ marginBottom: "2rem" }}>
              Updated · {lastUpdated}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}><h1 className="text-display">Now</h1></FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                marginTop: "2rem",
                maxWidth: "55ch",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                color: "var(--color-ink-soft)",
                fontFamily: "var(--font-sans)",
              }}
            >
              A living document. What I'm reading, what's occupying my thinking,
              and what I'm building. Connected to Notion — updates automatically.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Reading ────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>Currently reading</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>

          {displayBooks.length > 0 ? (
            <StaggerList style={{ display: "grid", gap: "0" }}>
              {displayBooks.map((book) => {
                const progress = statusToProgress(book.status);
                const done = book.status === "Read";
                return (
                  <StaggerItem key={book.id} as="article">
                    <article
                      style={{
                        padding: "2rem 0",
                        borderBottom: "1px solid var(--color-rule)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "1rem",
                        }}
                      >
                        <div>
                          <h2
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 700,
                              fontStyle: "italic",
                              fontSize: "1.2rem",
                              color: "var(--color-ink)",
                              letterSpacing: "-0.01em",
                              marginBottom: "0.2rem",
                            }}
                          >
                            {book.link ? (
                              <a
                                href={book.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "inherit" }}
                              >
                                {book.title}
                              </a>
                            ) : (
                              book.title
                            )}
                          </h2>
                          {book.author && (
                            <p
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.68rem",
                                color: "var(--color-ink-muted)",
                                letterSpacing: "0.06em",
                              }}
                            >
                              {book.author}
                            </p>
                          )}
                        </div>

                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          {book.genre.length > 0 && (
                            <span className="interest-tag">{book.genre[0]}</span>
                          )}
                          <div
                            className="folio"
                            style={{
                              marginTop: "0.5rem",
                              color: done ? "var(--color-ink)" : "var(--color-ink-muted)",
                              fontWeight: done ? 500 : 300,
                            }}
                          >
                            {done ? "✓ Finished" : book.status}
                          </div>
                          {book.rating && (
                            <div className="folio" style={{ marginTop: "0.25rem" }}>
                              {"★".repeat(Math.round(book.rating))}{"☆".repeat(5 - Math.round(book.rating))}
                            </div>
                          )}
                        </div>
                      </div>

                      <ProgressBar value={progress} />

                      {book.notes && (
                        <p
                          style={{
                            marginTop: "1.25rem",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.95rem",
                            lineHeight: 1.7,
                            color: "var(--color-ink-soft)",
                            fontStyle: "italic",
                            maxWidth: "65ch",
                          }}
                        >
                          {book.notes}
                        </p>
                      )}
                    </article>
                  </StaggerItem>
                );
              })}
            </StaggerList>
          ) : (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-ink-muted)",
                fontSize: "0.95rem",
                paddingTop: "1rem",
              }}
            >
              Reading list loading from Notion — check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ── Thinking ───────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>Currently thinking about</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>

          <StaggerList style={{ display: "grid", gap: "3rem" }}>
            {thinking.map((thought) => (
              <StaggerItem key={thought.idea} as="article">
                <article>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "2rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <h2 className="pull-quote" style={{ flex: 1 }}>
                      {thought.idea}
                    </h2>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="folio">{thought.date}</div>
                      <span
                        className="interest-tag"
                        style={{ display: "inline-block", marginTop: "0.5rem" }}
                      >
                        {thought.tag}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "1rem",
                      lineHeight: 1.75,
                      color: "var(--color-ink-soft)",
                      maxWidth: "65ch",
                    }}
                  >
                    {thought.context}
                  </p>
                  <hr className="rule" style={{ marginTop: "2rem" }} />
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>
    </>
  );
}
