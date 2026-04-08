import type { Metadata } from "next";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Now",
  description: "What Austin Armstrong is currently reading, thinking about, and building.",
};

interface Book {
  title: string;
  author: string;
  progress: number;
  note: string;
  tag: string;
}

interface Thought {
  idea: string;
  context: string;
  date: string;
  tag: string;
}

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
      "People treat 'generalist' as a polite word for unfocused. But the actual advantage is the ability to transfer mental models across domains before specialists even notice the connection.",
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

export default function NowPage() {
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
        {/* Yellow accent strip */}
        <div style={{ background: "var(--color-yellow)", height: "4px", marginBottom: "0" }} />
        <div
          className="container-editorial"
          style={{ paddingTop: "4rem" }}
        >
          <FadeUp><div className="folio" style={{ marginBottom: "2rem" }}>Updated · April 2024</div></FadeUp>
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
            and what I'm building.{" "}
            <em style={{ color: "var(--color-ink-muted)" }}>
              Notion-connected feed coming soon.
            </em>
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

          <StaggerList style={{ display: "grid", gap: "0" }}>
            {reading.map((book) => (
              <StaggerItem key={book.title} as="article">
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
                      {book.title}
                    </h2>
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
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span className="interest-tag">{book.tag}</span>
                    <div
                      className="folio"
                      style={{
                        marginTop: "0.5rem",
                        color:
                          book.progress === 100
                            ? "var(--color-ink)"
                            : "var(--color-ink-muted)",
                        fontWeight: book.progress === 100 ? 500 : 300,
                      }}
                    >
                      {book.progress === 100 ? "✓ Finished" : `${book.progress}%`}
                    </div>
                  </div>
                </div>

                <ProgressBar value={book.progress} />

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
                  {book.note}
                </p>
              </article>
              </StaggerItem>
            ))}
          </StaggerList>
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

          {/* Notion API stub */}
          <div
            style={{
              marginTop: "4rem",
              padding: "1.5rem 2rem",
              borderLeft: "4px solid var(--color-yellow)",
              background: "var(--color-bg-warm)",
            }}
          >
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>
              Coming soon
            </div>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                color: "var(--color-ink-muted)",
                lineHeight: 1.65,
              }}
            >
              This feed will connect to a Notion database. Books, notes, and
              thoughts will update automatically from my Notion workspace.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
