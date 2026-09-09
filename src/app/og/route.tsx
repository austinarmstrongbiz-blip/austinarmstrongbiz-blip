import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const title = searchParams.get("title") ?? "";
  const subtitle = searchParams.get("subtitle") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const isMatchday = searchParams.get("theme") === "matchday";
  const matchdayPhoto = searchParams.get("photo");
  const isHome = !title && !isMatchday;

  // ── Load Basilia Bold Italic font ────────────────────────────────────────
  const fontRes = await fetch(
    new URL("/fonts/Web%20Fonts/Basilia%20Bold%20Italic/Basilia-BolIta.woff", origin),
  );
  const fontData = await fontRes.arrayBuffer();

  // ── Hero photo URL (works on both Vercel and local) ──────────────────────
  const heroUrl = new URL("/images/Groom_601246405.jpg", origin).toString();
  const stadiumUrl = new URL("/images/matchday/stadium-lights.jpg", origin).toString();
  // Only accept a same-site relative path here — never fetch an attacker-supplied URL.
  const matchdayBg =
    matchdayPhoto && matchdayPhoto.startsWith("/")
      ? new URL(matchdayPhoto, origin).toString()
      : stadiumUrl;

  // ── Shared text styles ───────────────────────────────────────────────────
  const displayStyle = {
    fontFamily: "Basilia",
    fontStyle: "italic" as const,
    fontWeight: 700,
  };

  // A busy press photo (backdrop text, logos) reads badly with our own text
  // stacked on top of it — split the card instead, same move as the essay
  // layout below. The generic /matchday card (no custom photo) stays full-bleed
  // over the calmer stadium shot.
  const hasCustomPhoto = Boolean(matchdayPhoto);

  const matchdayCard = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        fontFamily: "Basilia",
        background: "#1C2C5B",
      }}
    >
      {!hasCustomPhoto && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "1200px",
            height: "630px",
            display: "flex",
          }}
        >
          {/* Stadium photo, full bleed */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={matchdayBg}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "flex",
            }}
          />
          {/* Sky-to-navy tint plus a left-side scrim so the type stays readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(108,171,221,0.55) 0%, rgba(28,44,91,0.55) 45%)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(28,44,91,0.92) 0%, rgba(28,44,91,0.25) 62%, transparent 100%)",
              display: "flex",
            }}
          />
        </div>
      )}
      {/* Gold accent strip, same as the section's chrome */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "10px",
          background: "#FFC659",
          display: "flex",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          flex: hasCustomPhoto ? "0 0 640px" : 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 56px 70px 72px",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "16px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#FFC659",
            display: "flex",
          }}
        >
          {subtitle || tag || "Matchday · Manchester City"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              ...displayStyle,
              fontSize: title
                ? title.length > 50
                  ? hasCustomPhoto
                    ? "40px"
                    : "58px"
                  : title.length > 35
                    ? hasCustomPhoto
                      ? "48px"
                      : "68px"
                    : hasCustomPhoto
                      ? "56px"
                      : "80px"
                : "132px",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title || "Matchday"}
          </div>
          {!title && (
            <div
              style={{
                ...displayStyle,
                fontWeight: 400,
                fontSize: "28px",
                color: "rgba(255,255,255,0.85)",
                display: "flex",
              }}
            >
              I know ball, you should learn some.
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ width: "72px", height: "4px", background: "#FFC659", display: "flex" }} />
          <div
            style={{
              display: "flex",
              flexDirection: hasCustomPhoto ? "column" : "row",
              gap: hasCustomPhoto ? "6px" : "0px",
              justifyContent: "space-between",
              alignItems: hasCustomPhoto ? "flex-start" : "center",
            }}
          >
            <span style={{ ...displayStyle, fontSize: "22px", color: "#ffffff", display: "flex" }}>
              Austin Armstrong.
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                display: "flex",
              }}
            >
              AUSTIN-ARMSTRONG.ME/MATCHDAY
            </span>
          </div>
        </div>
      </div>

      {hasCustomPhoto && (
        <div style={{ position: "relative", flex: 1, display: "flex", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={matchdayBg}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #1C2C5B 0%, transparent 12%)",
              display: "flex",
            }}
          />
        </div>
      )}
    </div>
  );

  return new ImageResponse(
    isMatchday ? (
      matchdayCard
    ) : isHome ? (
      /* ══════════════════════════════════════════════════════════════
         HOMEPAGE OG — Split layout matching the actual hero section
         Left: yellow bg + name + tagline
         Right: hero photo
         ══════════════════════════════════════════════════════════════ */
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Basilia",
          background: "#f9f9f9",
        }}
      >
        {/* Left panel */}
        <div
          style={{
            flex: 1,
            background: "#fbd601",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 56px",
          }}
        >
          {/* Folio */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#4a4547",
              display: "flex",
            }}
          >
            PERSONAL SITE · AUSTIN ARMSTRONG
          </div>

          {/* Big name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
            }}
          >
            <span
              style={{
                ...displayStyle,
                fontSize: "108px",
                color: "#231f20",
                display: "block",
              }}
            >
              Austin
            </span>
            {/* Armstrong. with yellow underbar */}
            <span
              style={{
                ...displayStyle,
                fontSize: "108px",
                color: "#231f20",
                display: "flex",
                position: "relative",
              }}
            >
              Armstrong.
            </span>
          </div>

          {/* Bottom tagline + domain */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                width: "100%",
                height: "2px",
                background: "#231f20",
                display: "flex",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  ...displayStyle,
                  fontSize: "20px",
                  color: "#231f20",
                  display: "flex",
                }}
              >
                Austin Armstrong.
              </span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#4a4547",
                  display: "flex",
                }}
              >
                AUSTIN-ARMSTRONG.ME
              </span>
            </div>
          </div>
        </div>

        {/* Right panel — hero photo */}
        <div
          style={{
            width: "420px",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroUrl}
            alt="Austin Armstrong"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "flex",
            }}
          />
        </div>
      </div>
    ) : (
      /* ══════════════════════════════════════════════════════════════
         ESSAY / PAGE OG — Dark ink bg, title left, photo right
         ══════════════════════════════════════════════════════════════ */
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Basilia",
          background: "#231f20",
        }}
      >
        {/* Left — content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 56px",
          }}
        >
          {/* Tag */}
          {tag && (
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "13px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fbd601",
                display: "flex",
              }}
            >
              {tag}
            </div>
          )}

          {/* Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div
              style={{
                ...displayStyle,
                fontSize: title.length > 50 ? "52px" : title.length > 35 ? "60px" : "72px",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                color: "#f9f9f9",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  ...displayStyle,
                  fontWeight: 400,
                  fontSize: "24px",
                  color: "rgba(249,249,249,0.6)",
                  lineHeight: 1.3,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "#fbd601",
                display: "flex",
              }}
            />
            <div
              style={{
                ...displayStyle,
                fontSize: "20px",
                color: "#f9f9f9",
                display: "flex",
              }}
            >
              Austin Armstrong.
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(249,249,249,0.4)",
                display: "flex",
              }}
            >
              AUSTIN-ARMSTRONG.ME
            </div>
          </div>
        </div>

        {/* Right — photo with dark overlay */}
        <div
          style={{
            width: "360px",
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroUrl}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              opacity: 0.6,
              display: "flex",
            }}
          />
          {/* Gradient fade into dark bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, #231f20 0%, transparent 40%)",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Basilia",
          data: fontData,
          style: "italic",
          weight: 700,
        },
      ],
    },
  );
}
