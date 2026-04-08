import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") ?? "Austin Armstrong";
  const subtitle = searchParams.get("subtitle") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const isHome = !searchParams.has("title");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: isHome ? "#fbd601" : "#f9f9f9",
          padding: "80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Yellow top strip (on light bg variant) */}
        {!isHome && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: "#fbd601",
              display: "flex",
            }}
          />
        )}

        {/* Tag / label */}
        {tag && (
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "18px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7a7577",
              marginBottom: "32px",
              display: "flex",
            }}
          >
            {tag}
          </div>
        )}

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {isHome ? (
            // Homepage OG — big wordmark on yellow
            <div
              style={{
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "96px",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: "#231f20",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Austin</span>
              <span>Armstrong.</span>
            </div>
          ) : (
            // Essay OG — title + subtitle
            <>
              <div
                style={{
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: title.length > 40 ? "52px" : "64px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "#231f20",
                  maxWidth: "900px",
                  marginBottom: "24px",
                  display: "flex",
                }}
              >
                {title}
              </div>
              {subtitle && (
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "28px",
                    color: "#4a4547",
                    maxWidth: "800px",
                    lineHeight: 1.3,
                    display: "flex",
                  }}
                >
                  {subtitle}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #231f20",
            paddingTop: "28px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "28px",
              color: "#231f20",
              display: "flex",
            }}
          >
            Austin Armstrong.
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#7a7577",
              display: "flex",
            }}
          >
            austin-armstrong.me
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
