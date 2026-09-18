import type { PlayerSpotlightData } from "@/lib/matchday";

/** Single-player callout — a photo plus a short stat line, for the one player in a
 * post who earns a closer look beyond the team-wide MatchStatsBar. */
export default function PlayerSpotlight({ player }: { player: PlayerSpotlightData }) {
  return (
    <div
      style={{
        border: "1px solid var(--color-rule)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={player.photo}
          alt={player.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
          }}
        />
      </div>

      <div
        style={{
          padding: "1rem 1.25rem",
          background: "var(--city-navy)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: "var(--city-gold)",
          }}
        >
          {player.name}
        </span>
        {player.subtitle && (
          <span
            className="folio"
            style={{ display: "block", color: "rgba(255,255,255,0.7)", marginTop: "0.2rem" }}
          >
            {player.subtitle}
          </span>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(player.stats.length, 4)}, 1fr)`,
        }}
      >
        {player.stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: "0.9rem 0.75rem",
              textAlign: "center",
              borderTop: "1px solid var(--color-rule)",
              borderLeft: "1px solid var(--color-rule)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "1.15rem",
                color: "var(--color-ink)",
              }}
            >
              {stat.value}
            </div>
            <div className="folio" style={{ color: "var(--color-ink-muted)", marginTop: "0.2rem" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
