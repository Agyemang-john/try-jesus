import { ProductCarousel } from "@/components/products/ProductCarousel";
import { ActionLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getProducts } from "@/lib/content";

/**
 * The site's single 404.
 *
 * It also covers unknown product slugs: `app/products/[slug]` sets
 * `dynamicParams = false`, so an address that is not a real product is
 * answered here with a true 404 status rather than rendering a "not found"
 * page with a 200.
 *
 * Hence the range rail — a retired or mistyped product is the most likely
 * reason anyone arrives, and the useful reply is what we actually make.
 */
export default function NotFound() {
  const products = getProducts();

  return (
    <>
      <section className="bg-paper">
        <Container
          width="wide"
          className="py-20 lg:py-28"
        >
          <div className="max-w-2xl">
            <Eyebrow rule>Error 404</Eyebrow>
            <h1 className="text-display-lg mt-8 font-display">
              This page is not on the rail
            </h1>
            <p className="mt-6 max-w-lg leading-relaxed text-graphite">
              The address may have changed, or the piece may have been retired.
              If you were after something we no longer print, do ask — we
              sometimes still have odd sizes in the back.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <ActionLink href="/products" variant="solid" size="md">
                The full range
              </ActionLink>
              <ActionLink href="/contact" variant="outline" size="md">
                Ask the shop
              </ActionLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="still-made-heading" className="border-t border-line bg-bone py-16 lg:py-24">
        <Container width="wide">
          <h2 id="still-made-heading" className="text-display-sm border-b border-line pb-8 font-display">
            Still in the range
          </h2>
          <div className="mt-12">
            <ProductCarousel products={products} label="Current products" />
          </div>
        </Container>
      </section>
    </>
  );
}
