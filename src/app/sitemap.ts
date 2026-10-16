import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap.
 *
 * Product URLs come from the content layer, so adding a product adds a sitemap
 * entry with no second edit. The legal routes are excluded deliberately: they
 * carry `robots: { index: false }` until real copy replaces the outline, and
 * listing a noindex page in a sitemap is a contradiction crawlers report.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: "monthly" | "yearly" }> = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "yearly" },
    { path: "/reviews", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return [
    ...routes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...getProductSlugs().map((slug) => ({
      url: absoluteUrl(`/products/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
