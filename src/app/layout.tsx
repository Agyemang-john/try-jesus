import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { brand } from "@/content/brand";
import { DemoNotice } from "@/components/layout/DemoNotice";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/ui/JsonLd";
import { siteConfig } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import "./globals.css";

/**
 * One family, many weights.
 *
 * Figtree is a humanist geometric sans in the same territory as the faces big
 * consumer brands use for everything at once — high x-height, open apertures,
 * a single-storey `g`. Carrying headings, labels and body on one family is
 * what makes an interface read as a single designed product; a display face
 * paired with a UI face reads as a template.
 *
 * Self-hosted by next/font at build time: no render-blocking request to
 * Google, and no layout shift from a late swap.
 */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s — ${brand.name}`,
  },
  description: brand.shortDescription,
  applicationName: brand.name,
  authors: [{ name: brand.legalName }],
  creator: brand.legalName,
  keywords: [
    "faith apparel",
    "christian streetwear",
    "heavyweight tee",
    "screen printed hoodie",
    "Atlanta apparel",
    brand.name,
  ],
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={figtree.variable}>
      <body className="min-h-dvh bg-paper antialiased">
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>

        {/* The notice scrolls away; the header sticks. Sticky rather than
            fixed means the header occupies real space, so no page has to
            offset itself to clear it. */}
        {brand.showDemoNotice ? <DemoNotice /> : null}
        <div className="sticky top-0 z-40">
          <Header />
        </div>

        <main id="main">{children}</main>

        <Footer />

        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
