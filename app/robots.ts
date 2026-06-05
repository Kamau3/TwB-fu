import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/auth/", "/assessment-results/"],
    },
    sitemap: "https://techwithbrands.co.ke/sitemap.xml",
  }
}
