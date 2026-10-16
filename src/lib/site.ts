/**
 * Environment-backed site configuration.
 *
 * The external shop URL exists in exactly one place: here. Components never
 * read `process.env` and never hard-code a storefront domain — they use
 * <ShopButton />, which reads `siteConfig.shopUrl`. Moving from Shopify to
 * Etsy to a distributor's site is a one-line change in `.env`.
 */

function readEnv(key: string, fallback: string): string {
  const value = process.env[key];
  return value && value.length > 0 ? value : fallback;
}

/**
 * NEXT_PUBLIC_SITE_URL must be the canonical origin in production — canonical
 * tags, the sitemap and Open Graph images all resolve against it.
 */
const siteUrl = readEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  url: siteUrl,
  /**
   * Where every "Shop" / "Buy" call to action sends the visitor. This site
   * never takes an order, a payment or an address.
   */
  shopUrl: readEnv("NEXT_PUBLIC_SHOP_URL", "https://www.negromart.com"),
  /** Wording used consistently wherever we hand a visitor to the store. */
  shopHandoffNote:
    "You will be taken to our authorised online store to complete your purchase.",
  ogImage: "/images/brand/og-default.jpg",
  locale: "en_GB",
} as const;

/** Absolute URL for canonicals, sitemap entries and structured data. */
export function absoluteUrl(pathname = "/"): string {
  return `${siteConfig.url}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
