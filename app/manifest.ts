import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tech with Brands AI",
    short_name: "TwB AI",
    description: "AI Training, Automation & Certification for Kenyan Businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#d4af37",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/icon?size=192", sizes: "192x192", type: "image/png" },
      { src: "/icon?size=512", sizes: "512x512", type: "image/png" },
    ],
  }
}
