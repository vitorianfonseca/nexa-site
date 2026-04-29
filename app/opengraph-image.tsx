import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px 96px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Purple glow blob */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(42,19,99,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#2A1363",
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#6B6B6B",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Leiria, Portugal
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#0D0D0D",
            letterSpacing: "-3px",
            lineHeight: 1.05,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          We build websites that work.
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 22,
            color: "#6B6B6B",
            letterSpacing: "-0.5px",
            marginBottom: 48,
          }}
        >
          Modern, fast, and built to last.
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "0.5px solid rgba(13,13,13,0.1)",
            paddingTop: 32,
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#0D0D0D",
              letterSpacing: "-0.5px",
            }}
          >
            byNexa
          </span>
          <span
            style={{
              fontSize: 16,
              color: "#2A1363",
              letterSpacing: "-0.3px",
            }}
          >
            bynexa.dev
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
