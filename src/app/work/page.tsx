import type { Metadata } from "next";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Fractional AI and go-to-market operator for founders building technical products. Positioning, GTM, and the systems that make it repeatable.",
};

const BOOKING_URL = "https://calendar.notion.so/meet/aarmstrongbusiness/introductions";
const EMAIL = "austin@austin-armstrong.me";

const metrics = [
  { num: "$100K+", label: "enterprise contracts closed" },
  { num: "~50%", label: "ARR growth driven" },
  { num: "60%", label: "higher extraction accuracy validated" },
  { num: "4,989", label: "leads in 30 days → pilot closed in 1hr" },
];

const services = [
  {
    title: "AI Go-to-Market",
    color: "var(--color-pillar-ai)",
    body: "Your capability becomes a story buyers act on. ICP, positioning, sales enablement, and the consultative sequencing that closes enterprise deals — not demos that go nowhere.",
  },
  {
    title: "Systems & Automation",
    color: "var(--color-pillar-finance)",
    body: "Pipeline that runs without heroics. CRM, reporting, and workflow automation that surface the right accounts and shorten response time — so deals don't depend on you remembering to follow up.",
  },
  {
    title: "Fractional Operator",
    color: "var(--color-pillar-lifestyle)",
    body: "A senior operator embedded with your team — strategy, BD, and execution without the full-time hire. I do the work and build the system that outlives me. You inherit a machine, not a mess.",
  },
];

const proof = [
  {
    org: "Autonomi (Books + Doxci)",
    role: "Chief Revenue Officer",
    body: "Repositioned Doxci from an OCR vendor to an enterprise cognitive-automation platform — sold two contracts over $100K, grew ARR ~50%, validated 60% higher extraction accuracy with the anchor client, and authored the NSF grant. Built white-label bookkeeping partnerships scaling CPA firm capacity 3–5x without added headcount, and developed the \"Capacity Economics\" positioning that reframes outsourcing from a cost to a margin driver.",
    tag: "Enterprise AI · GTM",
  },
  {
    org: "Jaba AI",
    role: "Business Operations Specialist",
    body: "Lead BD, sales, and CRM for an NIL-industry AI startup. Built HubSpot reporting and automation that surfaces high-signal accounts, and generated the investor decks targeting a $1.2M seed close.",
    tag: "NIL · Startups",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "4rem", borderBottom: "2px solid var(--color-ink)" }}>
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "2rem" }}>Work with me</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-display">You built the product.<br />I make it sell.</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                marginTop: "2rem",
                maxWidth: "58ch",
                fontSize: "1.1rem",
                lineHeight: 1.75,
                color: "var(--color-ink-soft)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Most technical founders can build anything except a way to sell it. I&apos;m the
              operator who turns what you built into deals that close — then hands you the system
              so it runs without me. Enterprise AI. NIL startups. CPA automation. Same playbook
              each time: position sharp, sell direct, automate the rest.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={`mailto:${EMAIL}`} className="btn-yellow">Start a conversation →</a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">Book a call</a>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <a
              href="/playbook"
              className="folio"
              style={{ display: "inline-block", marginTop: "1.5rem", color: "var(--color-ink-muted)" }}
            >
              Not ready to talk? See the exact outbound system →
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── Proof metrics ──────────────────────────────────────── */}
      <section style={{ background: "var(--color-ink)", borderBottom: "2px solid var(--color-ink)", padding: "3.5rem 0" }}>
        <div className="container-editorial">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "0",
            }}
          >
            {metrics.map((m, i) => (
              <FadeUp key={m.label} delay={i * 0.08}>
                <div
                  style={{
                    padding: "1.5rem 2rem",
                    borderRight: i < metrics.length - 1 ? "1px solid rgba(249,249,249,0.1)" : "none",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                      color: "var(--color-yellow)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {m.num}
                  </div>
                  <div className="folio" style={{ color: "rgba(249,249,249,0.55)", letterSpacing: "0.1em" }}>
                    {m.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>What I do</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>
          <StaggerList
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
              gap: "1.5rem",
            }}
          >
            {services.map((s) => (
              <StaggerItem key={s.title} as="article">
                <article style={{ borderTop: `3px solid ${s.color}`, paddingTop: "1.5rem", height: "100%" }}>
                  <h2 className="text-subhead" style={{ color: "var(--color-ink)", marginBottom: "0.9rem" }}>
                    {s.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    {s.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Proof ──────────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>Selected proof</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>
          <StaggerList style={{ display: "grid", gap: "0" }}>
            {proof.map((p) => (
              <StaggerItem key={p.org} as="article">
                <article style={{ padding: "2rem 0", borderBottom: "1px solid var(--color-rule)" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1.5rem",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontStyle: "italic",
                          fontSize: "1.4rem",
                          color: "var(--color-ink)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.org}
                      </h2>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-ink-muted)",
                          letterSpacing: "0.06em",
                          marginTop: "0.2rem",
                        }}
                      >
                        {p.role}
                      </p>
                    </div>
                    <span className="interest-tag" style={{ flexShrink: 0 }}>{p.tag}</span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.97rem",
                      lineHeight: 1.7,
                      color: "var(--color-ink-soft)",
                      maxWidth: "70ch",
                    }}
                  >
                    {p.body}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Contact CTA ────────────────────────────────────────── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <h2 className="text-headline" style={{ color: "var(--color-ink)", maxWidth: "20ch" }}>
              Building something that needs to <span className="brand-highlight">find its market?</span>
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                maxWidth: "52ch",
                fontFamily: "var(--font-sans)",
                fontSize: "1.02rem",
                lineHeight: 1.75,
                color: "var(--color-ink-soft)",
              }}
            >
              Tell me what you&apos;re building and where it&apos;s stuck. If it&apos;s a fit, we&apos;ll
              map the first 30 days. If it&apos;s not, I&apos;ll point you at someone better.
            </p>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={`mailto:${EMAIL}`} className="btn-yellow">{EMAIL}</a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">Book a 30-min call</a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
