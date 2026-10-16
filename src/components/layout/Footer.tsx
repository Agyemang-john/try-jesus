import Link from "next/link";
import { brand, contactDetails, legalNav, primaryNav, socialLinks } from "@/content/brand";
import { ShopButton } from "@/components/products/ShopButton";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { getProducts } from "@/lib/content";

const year = new Date().getFullYear();

/**
 * The footer carries real weight: it is the last chance to say what the brand
 * is, where it is, and where to buy. Set on ink so it closes the page rather
 * than trailing off.
 */
export function Footer() {
  const products = getProducts();

  return (
    <footer className="on-ink bg-ink text-paper">
      <Container width="wide" className="py-16 lg:py-24">
        {/* Top band: the brand statement and the hand-off to the store. */}
        <div className="grid gap-12 border-b border-paper/15 pb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold leading-none tracking-[-0.015em]">
              {brand.wordmark}
            </p>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ash">
              {brand.shortDescription}
            </p>
          </div>

          <div className="lg:col-span-6 lg:justify-self-end">
            <Eyebrow className="text-ash">Buy online</Eyebrow>
            <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-ash">
              Orders are handled by our authorised store. This site is where the
              garments are explained; that is where they are sold.
            </p>
            <div className="mt-6">
              <ShopButton variant="inverse" size="md">
                Visit the store
              </ShopButton>
            </div>
          </div>
        </div>

        {/* Directory. */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <nav aria-label="Footer" className="lg:col-span-3">
            <Eyebrow className="text-ash">Navigate</Eyebrow>
            <ul className="mt-6 space-y-3">
              {[{ label: "Home", href: "/" }, ...primaryNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-[0.95rem] text-paper/80 transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <Eyebrow className="text-ash">The range</Eyebrow>
            <ul className="mt-6 space-y-3">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="link-underline text-[0.95rem] text-paper/80 transition-colors hover:text-paper"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic lg:col-span-3">
            <Eyebrow className="text-ash">The shop</Eyebrow>
            <ul className="mt-6 space-y-3 text-[0.95rem] text-paper/80">
              {contactDetails.address.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
              <li className="pt-3">
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="link-underline transition-colors hover:text-paper"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.phoneHref}
                  className="link-underline transition-colors hover:text-paper"
                >
                  {contactDetails.phone}
                </a>
              </li>
            </ul>
          </address>

          <div className="lg:col-span-3">
            <Eyebrow className="text-ash">Follow</Eyebrow>
            <ul className="mt-6 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[0.95rem] text-paper/80 transition-colors hover:text-paper"
                  >
                    <SocialIcon platform={link.platform} className="size-4 shrink-0 opacity-60" />
                    <span className="link-underline">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal. */}
        <div className="flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {brand.city}, {brand.country}
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
