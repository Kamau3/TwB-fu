import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techwithbrands.co.ke"

  const routes = [
    "",
    "/services",
    "/academy",
    "/assessments",
    "/certification",
    "/pricing",
    "/solutions",
    "/playbooks",
    "/benchmarks",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
