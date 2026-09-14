import type { MatchdayStats } from "@/lib/matchday";

function formatValue(n: number, suffix?: string): string {
  const num = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return suffix ? `${num}${suffix}` : num;
}

/**
 * Side-by-side stat bars — the visual break the ratings pitch alone doesn't
 * give a stats-heavy post. Split width is proportional to each row's two
 * values (or 50/50 if both are zero), city-sky vs navy.
 */
export default function MatchStatsBar({ stats }: { stats: MatchdayStats }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-rule)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 1.25rem",
          background: "var(--color-bg)",
          borderBottom: "1px solid var(--color-rule)",
        }}
      >
        <span className="folio" style={{ color: "var(--city-navy)", fontWeight: 700 }}>
          {stats.home}
        </span>
        <span className="folio" style={{ color: "var(--color-ink-muted)" }}>
          Match stats
        </span>
        <span className="folio" style={{ color: "var(--city-sky-deep)", fontWeight: 700 }}>
          {stats.away}
        </span>
      </div>

      <div
        style={{
          padding: "1.5rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
        }}
      >
        {stats.rows.map((row) => {
          const total = row.home + row.away;
          const homePct = total > 0 ? (row.home / total) * 100 : 50;
          return (
            <div key={row.label}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  marginBottom: "0.4rem",
                }}
              >
                <span>{formatValue(row.home, row.suffix)}</span>
                <span
                  className="folio"
                  style={{ fontWeight: 400, color: "var(--color-ink-muted)" }}
                >
                  {row.label}
                </span>
                <span>{formatValue(row.away, row.suffix)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  height: "8px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: "var(--color-rule)",
                }}
              >
                <div
                  style={{
                    width: `${homePct}%`,
                    background: "var(--city-navy)",
                  }}
                />
                <div
                  style={{
                    width: `${100 - homePct}%`,
                    background: "var(--city-sky)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
