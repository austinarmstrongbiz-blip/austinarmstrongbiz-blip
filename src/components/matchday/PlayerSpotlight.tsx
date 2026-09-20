import type { PlayerSpotlightData } from "@/lib/matchday";

function Header({ player }: { player: PlayerSpotlightData }) {
  return (
    <div style={{ padding: "1rem 1.25rem", background: "var(--city-navy)" }}>
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
  );
}

function Featured({ player }: { player: PlayerSpotlightData }) {
  if (!player.featured?.length) return null;
  return (
    <div style={{ display: "flex", background: "var(--city-gold)" }}>
      {player.featured.map((stat) => (
        <div
          key={stat.label}
          style={{
            flex: 1,
            padding: "1rem 0.75rem",
            textAlign: "center",
            color: "var(--city-navy)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "2rem",
              lineHeight: 1.1,
            }}
          >
            {stat.value}
          </div>
          <div className="folio" style={{ color: "var(--city-navy)", marginTop: "0.2rem" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Grid({ player, columns }: { player: PlayerSpotlightData; columns: number }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
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
  );
}

/** Single-player callout: a photo plus a stat grid, for the one player in a post who
 * earns a closer look beyond the team-wide MatchStatsBar. */
export default function PlayerSpotlight({ player }: { player: PlayerSpotlightData }) {
  const frame = {
    border: "1px solid var(--color-rule)",
    borderRadius: "10px",
    overflow: "hidden",
  } as const;

  if (player.layout === "side") {
    return (
      <div style={{ ...frame, display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px", aspectRatio: "4 / 5", position: "relative" }}>
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
            }}
          />
        </div>
        <div style={{ flex: "1.3 1 300px", display: "flex", flexDirection: "column" }}>
          <Header player={player} />
          <Featured player={player} />
          <Grid player={player} columns={Math.min(player.stats.length, 3)} />
        </div>
      </div>
    );
  }

  return (
    <div style={frame}>
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
      <Header player={player} />
      <Featured player={player} />
      <Grid player={player} columns={Math.min(player.stats.length, 4)} />
    </div>
  );
}
