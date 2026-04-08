import Link from "next/link";

export default function NotFound() {
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
          {/* Folio */}
          <div className="folio" style={{ marginBottom: "2rem" }}>
            404 · Page not found
          </div>

          {/* Big display number */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(6rem, 20vw, 16rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              color: "var(--color-ink)",
              marginBottom: "2rem",
              position: "relative",
              display: "inline-block",
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "0.06em",
                height: "0.2em",
                background: "var(--color-yellow)",
                zIndex: 0,
              }}
            />
            <span style={{ position: "relative", zIndex: 1 }}>404.</span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "var(--color-ink-soft)",
              maxWidth: "45ch",
              lineHeight: 1.5,
              marginBottom: "3rem",
            }}
          >
            This page doesn't exist — or it moved. Either way, the map is
            wrong. Let's get you back somewhere real.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/" className="btn-yellow">
              Back home
            </Link>
            <Link href="/essays" className="btn-outline">
              Read essays
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
