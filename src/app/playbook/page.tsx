import type { Metadata } from "next";
import { FadeUp, StaggerList, StaggerItem } from "@/components/ui/Animate";
import NewsletterForm from "@/components/ui/NewsletterForm";

export const metadata: Metadata = {
  title: "The Outbound Playbook",
  description:
    "The exact outbound system that generated 4,989 leads in 30 days and closed a pilot one hour after the first call. Buy-signal targeting, multi-channel sequencing, and a pipeline that never goes cold.",
};

const steps = [
  {
    n: "01",
    title: "Build the list off buy signals, not job titles",
    body: "Most lists are a job title and a prayer. Mine start with intent. For CPA firms I tracked three signals — actively hiring a bookkeeper, mentioning offshore outsourcing, or matching firm profile — and pulled 150 high-intent leads at zero cost off a free-credit promotion. LinkedIn Sales Navigator and Apollo.io handle enrichment. A smaller list of people already in pain beats ten thousand strangers.",
  },
  {
    n: "02",
    title: "Warm the infrastructure before you send one email",
    body: "Cold email dies in spam, not in the inbox. Before a single send I set up DMARC/DNS, ran domain warmup, and built A/B-tested sequences end-to-end in LemList — then launched against 2,753 firms segmented by size. The boring deliverability work is the difference between a 40% open rate and landing in a folder no one checks.",
  },
  {
    n: "03",
    title: "Run two channels at once",
    body: "Same ICP, two surfaces. LinkedIn outbound through Dripify targeting wealth advisors and attorneys generated 4,989 leads, 106 connections, and 23 responses in 30 days — while LemList worked the inbox in parallel. People who ignore an email reply to a connection request, and vice versa. One channel is a guess; two is coverage.",
  },
  {
    n: "04",
    title: "Make the call close itself",
    body: "One pilot signed within an hour of the first meeting — not because of a clever close, but because the positioning did the selling before the call started. I lead with Capacity Economics: reframing the cost of in-house bookkeeping as a margin problem the buyer already feels. When the framing is right, the meeting is a formality.",
  },
  {
    n: "05",
    title: "Never let a lead go cold",
    body: "Every lead lives in a CRM with explicit pipeline stages and a follow-up cadence — nothing depends on me remembering. Most deals are lost to silence, not rejection. The system follows up so I don't have to think about it, and so a 'not now' in March becomes a 'yes' in June.",
  },
];

export default function PlaybookPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────── */}
      <section style={{ paddingTop: "5rem", paddingBottom: "4rem", borderBottom: "2px solid var(--color-ink)" }}>
        <div style={{ background: "var(--color-yellow)", height: "4px" }} />
        <div className="container-editorial" style={{ paddingTop: "4rem" }}>
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "2rem" }}>The Outbound Playbook</div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-display">4,989 leads in 30 days.<br />A pilot closed in one hour.</h1>
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
              Outbound fails when you blast generic messages at a list that never asked. This
              does the opposite: a tight list built on buy signals, setup that lands in the inbox,
              two channels at once, and a pipeline that never goes cold. The whole system, start
              to finish.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── The system ─────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "4rem", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="container-editorial">
          <FadeUp>
            <div className="text-label" style={{ marginBottom: "0.5rem" }}>The system — five steps</div>
            <hr className="rule rule-thick" style={{ marginBottom: "3rem" }} />
          </FadeUp>
          <StaggerList style={{ display: "grid", gap: "0" }}>
            {steps.map((s) => (
              <StaggerItem key={s.n} as="article">
                <article
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "1.5rem",
                    padding: "2rem 0",
                    borderBottom: "1px solid var(--color-rule)",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontStyle: "italic",
                      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                      lineHeight: 1,
                      color: "var(--color-yellow)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontStyle: "italic",
                        fontSize: "1.4rem",
                        color: "var(--color-ink)",
                        letterSpacing: "-0.01em",
                        marginBottom: "0.75rem",
                        lineHeight: 1.15,
                      }}
                    >
                      {s.title}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "1rem",
                        lineHeight: 1.75,
                        color: "var(--color-ink-soft)",
                        maxWidth: "65ch",
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </section>

      {/* ── Capture ────────────────────────────────────────────── */}
      <section style={{ paddingTop: "4rem", paddingBottom: "6rem" }}>
        <div className="container-editorial">
          <FadeUp>
            <h2 className="text-headline" style={{ color: "var(--color-ink)", maxWidth: "22ch" }}>
              The system gets you the meeting. <span className="brand-highlight">Positioning closes it.</span>
            </h2>
            <p
              style={{
                marginTop: "1.5rem",
                maxWidth: "52ch",
                fontFamily: "var(--font-sans)",
                fontSize: "1.02rem",
                lineHeight: 1.75,
                color: "var(--color-ink-soft)",
                marginBottom: "2.5rem",
              }}
            >
              I break down the frameworks behind the offers, positioning, and outbound that
              actually convert in <em>None of the Above</em> — every week, no fluff. Drop your
              email and I&apos;ll send the next one.
            </p>
            <NewsletterForm
              variant="light"
              blurb="The playbook is the mechanics. The newsletter is the thinking behind it — positioning, offers, and the unconventional path. One email a week."
            />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
