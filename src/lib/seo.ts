import type { Metadata } from "next";
import { brand } from "@/content/brand";
import { absoluteUrl, siteConfig } from "./site";

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/products/marker-bifold". Drives the canonical URL. */
  path: string;
  image?: { src: string; alt: string };
  type?: "website" | "article";
};

/**
 * One place that knows how a page presents itself to crawlers and to anything
 * unfurling a link. Every route calls this rather than hand-rolling an
 * openGraph block, so canonicals and OG images can never drift apart.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image?.src ?? siteConfig.ogImage;
  const ogAlt = image?.alt ?? `${brand.name} — ${brand.tagline}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: brand.name,
      locale: siteConfig.locale,
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}
