import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Jaeho Shin — Engineering Director";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a101f 0%, #0f172a 50%, #0a101f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#e2e8f0",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Jaeho Shin
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#22d3ee",
            marginBottom: 32,
          }}
        >
          Engineering Director @ Mindlogic
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          I ship AI that works — not demos. From hackathon prototypes to platforms serving 50+ enterprise clients.
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          {["LLMs", "Claude Code", "Google ADK", "MCP", "Agents"].map((kw) => (
            <div
              key={kw}
              style={{
                background: "rgba(34, 211, 238, 0.1)",
                color: "#22d3ee",
                padding: "6px 16px",
                borderRadius: 9999,
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {kw}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
