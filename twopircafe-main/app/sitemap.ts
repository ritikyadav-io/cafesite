import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://twopircafe.in";

  const routes = [
    "",
    "/menu",
    "/gallery",
    "/reviews",
    "/about",
    "/reserve",
    "/faq",
    "/blog"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
