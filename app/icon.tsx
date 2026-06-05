import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#d4af37",
          borderRadius: 6,
          fontWeight: 700,
          fontSize: 18,
          color: "#0a0a0a",
        }}
      >
        T
      </div>
    ),
    { ...size },
  )
}
