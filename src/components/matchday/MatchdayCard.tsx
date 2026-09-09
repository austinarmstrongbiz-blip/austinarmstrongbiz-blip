import Image from "next/image";
import Link from "next/link";
import { COMPETITIONS, type MatchdayPost } from "@/lib/matchday";

export default function MatchdayCard({ post }: { post: MatchdayPost }) {
  const competition = post.competition ? COMPETITIONS[post.competition] : undefined;

  return (
    <Link
      href={`/matchday/${post.slug}`}
      style={{ textDecoration: "none", display: "flex", height: "100%" }}
    >
      <article className="matchday-card">
        <div className="matchday-card-media">
          {post.heroImage && (
            <Image
              src={post.heroImage}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          )}
          {post.scoreline && <span className="matchday-score-chip">{post.scoreline}</span>}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.9rem",
            padding: "1.25rem 1.25rem 1.5rem",
            flex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "1.35rem",
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              color: "var(--city-navy)",
            }}
          >
            {post.title}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginTop: "auto",
            }}
          >
            {competition && (
              <span className="matchday-comp-badge">
                {competition.icon && <Image src={competition.icon} alt="" width={16} height={16} />}
                {competition.label}
              </span>
            )}
            <span className="folio" style={{ color: "var(--color-ink-muted)" }}>
              {post.dateFormatted}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
