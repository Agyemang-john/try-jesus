/**
 * JSON-LD builders.
 *
 * Scope is deliberately narrow. This site publishes no prices, no stock level
 * and no aggregate rating, so the Product graph carries none of those
 * properties — asserting an `offers` block or an `aggregateRating` we cannot
 * substantiate is exactly the kind of markup that earns a manual action.
 *
 * Review markup is also omitted on purpose: the reviews currently in
 * `src/content/testimonials.ts` are demo copy. Once real, permissioned reviews
 * are in place, adding a `review` array here is a safe next step.
 */
import { brand, contactDetails, socialLinks } from "@/content/brand";
import type { Product } from "@/content/types";
import { absoluteUrl, siteConfig } from "./site";

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: brand.name,
    legalName: brand.legalName,
    url: siteConfig.url,
    description: brand.shortDescription,
    foundingDate: String(brand.foundedYear),
    logo: absoluteUrl(siteConfig.ogImage),
    sameAs: socialLinks
      .filter((link) => link.platform !== "whatsapp")
      .map((link) => link.href),
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.address.lines[0],
      addressLocality: brand.city,
      addressCountry: brand.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactDetails.email,
      telephone: contactDetails.phone,
      areaServed: brand.country,
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: siteConfig.url,
    name: brand.name,
    description: brand.shortDescription,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function productSchema(product: Product): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.productNumber,
    description: product.shortDescription,
    category: product.category,
    url: absoluteUrl(`/products/${product.slug}`),
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: { "@type": "Brand", name: brand.name },
    manufacturer: { "@id": absoluteUrl("/#organization") },
    material: product.specifications.find((spec) => /fabric|shell|material/i.test(spec.label))
      ?.value,
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
