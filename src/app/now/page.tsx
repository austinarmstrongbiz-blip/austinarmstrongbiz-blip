import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What Austin Armstrong is currently reading, thinking about, and building.",
};

/* ─── TYPES ──────────────────────────────────────────────────────── */
interface Book {
  title: string;
  author: string;
  progress: number; // 0-100
  note: string;
  tag: string;
}

interface Thought {
  idea: string;
  context: string;
  date: string;
  tag: string;
}

/* ─── STUB DATA (replace with Notion API fetch) ──────────────────── */
const reading: Book[] = [
  {
    title: "The Structure of Scientific Revolutions",
    author: "Thomas S. Kuhn",
    progress: 68,
    note: "How paradigm shifts happen is the most important thing to understand about how knowledge actually progresses — and how wrong the 'linear progress' story is.",
    tag: "Cognition",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    progress: 100,
    note: "Finished. The insight that wealth is what you don't spend is deceptively simple. Recommended without reservation.",
    tag: "Finance",
  },
  {
    title: "Antifragile",
    author: "Nassim Nicholas Taleb",
    progress: 42,
    note: "The barbell strategy chapter reframed how I think about career design. More on this soon.",
    tag: "Barbell Strategy",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    progress: 85,
    note: "System 1 vs System 2 thinking is the lens through which I now evaluate almost every decision-making framework.",
    tag: "Cognition",
  },
];

const thinking: Thought[] = [
  {
    idea: "Mental immunity as a trainable skill",
    context:
      "We talk about critical thinking but rarely about the emotional infrastructure that allows you to actually change your mind when confronted with good evidence. That's the real bottleneck.",
    date: "Apr 2024",
    tag: "Mental Immunity",
  },
  {
    idea: "The generalist advantage is misunderstood",
    context:
      "People treat 'generalist' as a polite word for unfocused. But the actual advantage is not breadth of knowledge — it's the ability to transfer mental models across domains before specialists even notice the connection.",
    date: "Mar 2024",
    tag: "Generalists",
  },
  {
    idea: "AI will change what it means to think for yourself",
    context:
      "When synthesis is cheap, the scarce resource becomes the quality of the questions you ask. Original curiosity becomes the moat.",
    date: "Mar 2024",
    tag: "AI",
  },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────── */
function ProgressBar({ value }: { value: number }) {
  return (
    <div
      style={{
        height: "2px",
        background: "var(--color-rule)",
        width: "100%",
        position: "relative",
        marginTop: "0.75rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${value}%`,
          background:
            value === 100 ? "var(--color-sage)" : "var(--color-gold)",
          transition: "width 0.4s ease",
        }}
      />
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────── */
export default function NowPage() {
  const updatedDate = "April 2024";

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
            Updated · {updatedDate}
          </div>

          <h1
            className="text-display animate-fade-up delay-100"
            style={{ color: "var(--color-cream)" }}
          >
            Now
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
            A living document. What I'm reading, what's occupying my thinking,
            and what I'm building. Updated when something shifts.{" "}
            <span style={{ color: "var(--color-muted)", fontStyle: "italic" }}>
              Notion-connected feed coming soon.
            </span>
          </p>
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
          >
            {/* Section header */}
            <div>
              <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
                Currently reading
              </div>
              <hr className="rule animate-fade-up delay-100" />
            </div>

            {/* Book grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2rem",
              }}
            >
              {reading.map((book, i) => (
                <article
                  key={book.title}
                  className={`animate-fade-up delay-${(i + 2) * 100}`}
                  style={{
                    borderBottom: "1px solid var(--color-rule)",
                    paddingBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "var(--color-cream)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {book.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--color-muted)",
                          marginTop: "0.2rem",
                        }}
                      >
                        {book.author}
                      </p>
                    </div>
                    <span className="interest-tag" style={{ flexShrink: 0 }}>
                      {book.tag}
                    </span>
                  </div>

                  <ProgressBar value={book.progress} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "0.4rem",
                    }}
                  >
                    <span
                      className="folio"
                      style={{
                        color:
                          book.progress === 100
                            ? "var(--color-sage)"
                            : "var(--color-gold-dim)",
                      }}
                    >
                      {book.progress === 100 ? "Finished" : `${book.progress}%`}
                    </span>
                  </div>

                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "var(--color-cream-dim)",
                      fontFamily: "var(--font-sans)",
                      fontStyle: "italic",
                    }}
                  >
                    {book.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Thinking ───────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <div className="text-label animate-fade-up" style={{ marginBottom: "0.5rem" }}>
            Currently thinking about
          </div>
          <hr className="rule animate-fade-up delay-100" style={{ marginBottom: "3rem" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
            {thinking.map((thought, i) => (
              <article
                key={thought.idea}
                className={`animate-fade-up delay-${(i + 2) * 100}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
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
                  <h2
                    className="pull-quote"
                    style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
                  >
                    {thought.idea}
                  </h2>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="folio">{thought.date}</div>
                    <span className="interest-tag" style={{ display: "inline-block", marginTop: "0.5rem" }}>
                      {thought.tag}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.75,
                    color: "var(--color-cream-dim)",
                    fontFamily: "var(--font-sans)",
                    maxWidth: "65ch",
                  }}
                >
                  {thought.context}
                </p>

                <hr className="rule" />
              </article>
            ))}
          </div>

          {/* Notion API stub notice */}
          <div
            style={{
              marginTop: "4rem",
              padding: "1.5rem",
              border: "1px solid var(--color-rule)",
              background: "var(--color-surface)",
            }}
          >
            <div className="folio" style={{ marginBottom: "0.5rem" }}>
              Coming soon
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-muted)",
                lineHeight: 1.6,
              }}
            >
              This feed will be connected to a Notion database. Once the API
              integration is live, books, notes, and thoughts will update
              automatically from my Notion workspace.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
