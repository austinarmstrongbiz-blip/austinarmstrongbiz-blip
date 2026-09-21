"use client";

/**
 * Matchday email signup, in Matchday colours. Posts to
 * /api/matchday-subscribe (which adds the email to Beehiiv) and answers on the
 * page instead of sending the reader off to another site.
 */

import { useState } from "react";

type State = "idle" | "sending" | "done" | "error";

const MESSAGES: Record<string, string> = {
  invalid_email: "That email doesn't look right.",
  not_configured: "Signups open soon. Check back on launch day.",
};

export default function MatchdaySignup({
  blurb = "Every City match, the post lands in your inbox the day after. No spam, just the take.",
}: {
  blurb?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/matchday-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);

    if (res?.ok) {
      setState("done");
      setMessage("You're in. Check your inbox.");
      return;
    }
    const { error } = (await res?.json().catch(() => ({}))) ?? {};
    setState("error");
    setMessage(MESSAGES[error] ?? "Something broke on our end. Try again in a minute.");
  }

  return (
    <div
      style={{
        // Matchday colours: the same sky-to-navy City gradient as the Matchday
        // cards, with the gold used on the post heroes for the button.
        background: "linear-gradient(150deg, var(--city-sky) 0%, var(--city-navy) 100%)",
        color: "#fff",
        padding: "clamp(1.75rem, 5vw, 2.75rem)",
        borderRadius: "4px",
      }}
    >
      <div style={{ maxWidth: "34rem" }}>
        <div className="text-label" style={{ color: "var(--city-gold)", marginBottom: "0.6rem" }}>
          Subscribe — Matchday
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}
        >
          I know ball. You should learn some.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.82)",
            marginBottom: "1.25rem",
          }}
        >
          {blurb}
        </p>

        {state === "done" ? (
          <p role="status" className="text-label" style={{ color: "var(--city-gold)" }}>
            {message}
          </p>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              style={{
                flex: "1 1 14rem",
                minWidth: 0,
                padding: "0.8rem 1rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "2px",
                outlineOffset: "2px",
              }}
            />
            <button
              type="submit"
              className="btn-yellow"
              disabled={state === "sending"}
              style={{
                flexShrink: 0,
                cursor: "pointer",
                border: "none",
                background: "var(--city-gold)",
                color: "var(--city-navy)",
              }}
            >
              {/* Same wording as the button on the Beehiiv publication. */}
              {state === "sending" ? "Sending…" : "Increase Ball Knowledge →"}
            </button>
          </form>
        )}

        {state === "error" && (
          <p
            role="alert"
            style={{
              marginTop: "0.6rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
