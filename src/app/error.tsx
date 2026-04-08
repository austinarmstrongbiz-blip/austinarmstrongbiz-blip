"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      {/* Yellow top strip */}
      <div style={{ height: "4px", background: "var(--color-yellow)" }} />

      <section
        style={{
          paddingTop: "6rem",
          paddingBottom: "6rem",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-editorial">
          <div className="folio" style={{ marginBottom: "2rem" }}>
            Something went wrong
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              marginBottom: "1.5rem",
            }}
          >
            Well, that's unexpected.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "var(--color-ink-soft)",
              maxWidth: "45ch",
              lineHeight: 1.7,
              marginBottom: "3rem",
            }}
          >
            An error occurred loading this page. Try refreshing — if it
            persists, it's on us.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={reset} className="btn-yellow">
              Try again
            </button>
            <Link href="/" className="btn-outline">
              Go home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
