import type { MatchdayRatings, RatingsPlayer } from "@/lib/matchday";

/** Green / gold / rust, same read as the match-center app this is modeled on. */
function ratingColor(rating: number): string {
  if (rating >= 75) return "#3ea35e";
  if (rating >= 65) return "#d1a13a";
  return "#c46a3a";
}

function Badge({ player }: { player: RatingsPlayer }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
      <div
        className="ratings-badge"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          background: ratingColor(player.rating),
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-sans)",
          fontWeight: 700,
          fontSize: "0.9rem",
          border: "2px solid rgba(255,255,255,0.85)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}
      >
        {player.rating}
      </div>
      <div
        className="folio ratings-name"
        style={{
          color: "#fff",
          textAlign: "center",
          maxWidth: "5.5rem",
          fontSize: "0.65rem",
          lineHeight: 1.2,
          textShadow: "0 1px 3px rgba(0,0,0,0.6)",
        }}
      >
        {player.name}
      </div>
    </div>
  );
}

/**
 * Starting XI laid out on a pitch (GK at the bottom, striker at the top) with
 * subs and the manager in a rail on the right. Data comes from a single JSON
 * frontmatter line (`ratings:`) — see MatchdayRatings in lib/matchday.ts.
 */
export default function RatingsPitch({ ratings }: { ratings: MatchdayRatings }) {
  const rows = [1, 2, 3, 4, 5].map((row) => ratings.starters.filter((p) => p.row === row));

  return (
    <div
      style={{
        background: "var(--city-navy)",
        border: "1px solid var(--city-navy)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Score strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
          background: "var(--city-navy)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <span className="folio" style={{ color: "rgba(255,255,255,0.8)" }}>
          {ratings.score.home}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.75rem",
            color: "var(--city-gold)",
          }}
        >
          {ratings.score.homeScore} — {ratings.score.awayScore}
        </span>
        <span className="folio" style={{ color: "var(--city-sky)" }}>
          {ratings.score.away}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Pitch */}
        <div
          className="ratings-pitch"
          style={{
            flex: "1 1 20rem",
            background:
              "repeating-linear-gradient(0deg, #2c8a4e, #2c8a4e 11%, #33994f 11%, #33994f 22%)",
            padding: "2rem 1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1.5rem",
            minHeight: "26rem",
            position: "relative",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "1rem",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "4px",
              pointerEvents: "none",
            }}
          />
          {rows.map((row, i) => (
            <div
              key={i}
              className="ratings-row"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: "1rem",
                position: "relative",
                zIndex: 1,
              }}
            >
              {row.map((p) => (
                <Badge key={p.name} player={p} />
              ))}
            </div>
          ))}
        </div>

        {/* Subs + manager rail */}
        <div
          style={{
            flex: "1 1 12rem",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            background: "var(--city-navy)",
          }}
        >
          <div>
            <div className="folio" style={{ color: "var(--city-sky)", marginBottom: "0.75rem" }}>
              Manager
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  background: ratingColor(ratings.manager.rating),
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                }}
              >
                {ratings.manager.rating}
              </div>
              <span style={{ color: "#fff", fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}>
                {ratings.manager.name}
              </span>
            </div>
          </div>

          <div>
            <div className="folio" style={{ color: "var(--city-sky)", marginBottom: "0.75rem" }}>
              Subs used
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {ratings.subs.map((p) => (
                <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      flexShrink: 0,
                      borderRadius: "50%",
                      background: ratingColor(p.rating),
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.rating}
                  </div>
                  <span
                    style={{ color: "#fff", fontFamily: "var(--font-sans)", fontSize: "0.9rem" }}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
