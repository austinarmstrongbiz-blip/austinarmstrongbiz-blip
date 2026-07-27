import { SUBSTACK_URL } from "@/lib/substack";

/**
 * Native, on-brand newsletter capture. Submits as a GET form to Substack's
 * subscribe page with the email pre-filled — Substack handles the confirm.
 * (Substack's Cloudflare blocks a server-side proxy, so this is the reliable
 * way to keep the form native to the site.) Works without JavaScript.
 */
export default function NewsletterForm({
  variant = "light",
  label = "None of the Above",
  blurb = "A weekly letter on building leverage with AI, systems, and the unconventional path. No fluff.",
}: {
  variant?: "light" | "dark";
  label?: string;
  blurb?: string;
}) {
  const dark = variant === "dark";
  const text = dark ? "rgba(249,249,249,0.92)" : "var(--color-ink)";
  const soft = dark ? "rgba(249,249,249,0.55)" : "var(--color-ink-muted)";
  const border = dark ? "rgba(249,249,249,0.25)" : "var(--color-rule)";
  const inputBg = dark ? "rgba(249,249,249,0.06)" : "var(--color-bg-warm)";

  return (
    <div style={{ maxWidth: "32rem" }}>
      <div className="text-label" style={{ color: soft, marginBottom: "0.6rem" }}>
        Subscribe — {label}
      </div>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: dark ? "rgba(249,249,249,0.75)" : "var(--color-ink-soft)",
          marginBottom: "1.1rem",
        }}
      >
        {blurb}
      </p>
      <form
        action={`${SUBSTACK_URL}/subscribe`}
        method="get"
        target="_blank"
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          style={{
            flex: "1 1 14rem",
            minWidth: 0,
            padding: "0.8rem 1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: text,
            background: inputBg,
            border: `1px solid ${border}`,
            borderRadius: "2px",
            outlineOffset: "2px",
          }}
        />
        <button
          type="submit"
          className="btn-yellow"
          style={{ flexShrink: 0, cursor: "pointer", border: "none" }}
        >
          Subscribe →
        </button>
      </form>
    </div>
  );
}
