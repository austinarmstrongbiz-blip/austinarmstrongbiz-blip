import type { Metadata } from "next";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Fractional AI and go-to-market operator for founders building technical products. Positioning, GTM, and the systems that make it repeatable.",
};

// TODO(Austin): replace with your real booking link (Cal.com / Calendly).
const BOOKING_URL = "https://cal.com/austin-armstrong";
const EMAIL = "austin@austin-armstrong.me";

const services = [
  {
    title: "AI Go-to-Market",
    color: "var(--color-pillar-ai)",
    body: "Positioning, messaging, and outbound for technical products. Turning capability into a narrative buyers act on — ICP, sales enablement, and consultative sequencing that closes enterprise deals.",
  },
  {
    title: "Systems & Automation",
    color: "var(--color-pillar-finance)",
    body: "The operating layer underneath the pitch. CRM, reporting, and workflow automation that surfaces the right accounts, shortens response time, and makes the whole motion repeatable instead of heroic.",
  },
  {
    title: "Fractional Operator",
    color: "var(--color-pillar-lifestyle)",
    body: "Embedded with the founding team — strategy, BD, and execution without the full-time hire. I do the work and build the system that outlives me, so the next person inherits a machine, not a mess.",
  },
];

const proof = [
  {
    org: "Doxci",
    role: "Head of Strategy & Go-to-Market",
    body: "Repositioned an OCR vendor as an enterprise cognitive-automation platform. Sold two contracts over $100K, grew ARR ~50%, validated 60% higher extraction accuracy with the anchor client, and authored the NSF grant positioning Doxci as foundational AI infrastructure.",
    tag: "Enterprise AI",
  },
  {
    org: "Jaba AI",
    role: "Business Operations Specialist",
    body: "Lead BD, sales, and CRM for an NIL-industry AI startup. Built HubSpot reporting and automation that surfaces high-signal accounts, and generated the investor decks targeting a $1.2M seed close.",
    tag: "NIL · Startups",
  },
  {
    org: "Autonomi Books",
    role: "Business Development & Strategic Partnerships",
    body: "Built white-label bookkeeping partnerships that scale CPA firm capacity 3–5x without added headcount. Developed the \"Capacity Economics\" positioning — reframing outsourcing from a cost to a margin driver — and ran the pipeline from discovery to close.",
    tag: "GTM · Partnerships",
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
            <h1 className="text-display">Fractional AI &amp; GTM operator.</h1>
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
              I embed with founders building technical products and own the part most teams
              fumble: turning what you&apos;ve built into a go-to-market motion that actually
              closes — and the systems that make it run without me. Enterprise AI deals, NIL
              startups, CPA-firm automation. Same playbook: position sharp, sell consultative,
              automate the rest.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={`mailto:${EMAIL}`} className="btn-yellow">Start a conversation →</a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-outline">Book a call</a>
            </div>
          </FadeUp>
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
