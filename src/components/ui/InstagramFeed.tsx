/**
 * InstagramFeed — server component.
 * Fetches from Behold JSON feed, renders a photo grid.
 * ISR: revalidates every 3600s (1 hour).
 */

const FEED_URL = "https://feeds.behold.so/fipLpWDNAhXPZWx19Vbb";

interface BeholdPost {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  sizes: {
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

interface BeholdFeed {
  username: string;
  posts: BeholdPost[];
}

async function getFeed(): Promise<BeholdFeed | null> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function getImageUrl(post: BeholdPost): string {
  // Videos and reels use thumbnailUrl; images use mediaUrl or sizes
  return (
    post.thumbnailUrl ??
    post.sizes?.medium?.url ??
    post.sizes?.large?.url ??
    post.mediaUrl
  );
}

export default async function InstagramFeed() {
  const feed = await getFeed();

  if (!feed || !feed.posts?.length) {
    return null; // silently fail — don't break the page
  }

  const posts = feed.posts.slice(0, 9);

  return (
    <section
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <div className="container-editorial">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "0.5rem",
          }}
        >
          <div className="text-label">§04 · On Instagram</div>
          <a
            href="https://www.instagram.com/austinarmstrong20/"
            target="_blank"
            rel="noopener noreferrer"
            className="folio"
            style={{ color: "var(--color-ink-muted)", transition: "color 0.15s" }}
          >
            @austinarmstrong20 →
          </a>
        </div>
        <hr className="rule rule-thick" style={{ marginBottom: "2rem" }} />

        {/* Photo grid — 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3px",
          }}
        >
          {posts.map((post) => {
            const imgUrl = getImageUrl(post);
            const isVideo = post.mediaType === "VIDEO";
            const caption = post.prunedCaption ?? post.caption ?? "";

            return (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={caption || "View on Instagram"}
                style={{
                  display: "block",
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  background: "var(--color-rule)",
                }}
                className="ig-photo"
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgUrl}
                  alt={caption || "Instagram photo"}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                  className="ig-photo-img"
                />

                {/* Video indicator */}
                {isVideo && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      background: "rgba(35,31,32,0.7)",
                      borderRadius: "2px",
                      padding: "0.15rem 0.35rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.08em",
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Reel
                  </span>
                )}

                {/* Hover overlay */}
                <div
                  className="ig-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(35,31,32,0.0)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "0.75rem",
                    transition: "background 0.3s ease",
                  }}
                >
                  {caption && (
                    <p
                      className="ig-caption"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        lineHeight: 1.4,
                        color: "#fff",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {caption}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
