import { ImageResponse } from "next/og"

export const alt = "Tech with Brands AI"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: "radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f5f5f5",
            marginBottom: 16,
          }}
        >
          Tech with Brands
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#d4af37",
          }}
        >
          AI Training · Automation · Certification
        </div>
      </div>
    ),
    { ...size },
  )
}
