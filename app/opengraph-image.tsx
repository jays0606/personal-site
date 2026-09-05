import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Jaeho Shin — one engineer, one GPU, and a lot of agents.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F2F3F1",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          color: "#15171A",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: "#C2362B",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              borderRadius: 3,
              boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.55), inset 0 0 0 4px #C2362B",
            }}
          >
            申
          </div>
          <div style={{ fontSize: 30 }}>Jaeho Shin</div>
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.02, letterSpacing: -2, maxWidth: 980 }}>
          One engineer, one GPU, and a lot of agents.
        </div>
        <div style={{ fontSize: 24, color: "#5B5F66", fontFamily: "Helvetica, Arial, sans-serif" }}>
          Seoul. A dated record of what shipped, 2017 to now.
        </div>
      </div>
    ),
    { ...size },
  );
}
