"use client";

/**
 * Matchday email signup. Same look as NewsletterForm, but posts to
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
    <div style={{ maxWidth: "32rem" }}>
      <div
        className="text-label"
        style={{ color: "var(--color-ink-muted)", marginBottom: "0.6rem" }}
      >
        Subscribe — Matchday
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "var(--color-ink-soft)",
          marginBottom: "1.1rem",
        }}
      >
        {blurb}
      </p>

      {state === "done" ? (
        <p role="status" className="text-label" style={{ color: "var(--color-ink)" }}>
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
              color: "var(--color-ink)",
              background: "var(--color-bg-warm)",
              border: "1px solid var(--color-rule)",
              borderRadius: "2px",
              outlineOffset: "2px",
            }}
          />
          <button
            type="submit"
            className="btn-yellow"
            disabled={state === "sending"}
            style={{ flexShrink: 0, cursor: "pointer", border: "none" }}
          >
            {state === "sending" ? "Sending…" : "Subscribe →"}
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
            color: "var(--color-ink-soft)",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
