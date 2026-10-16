import type { Product } from "@/content/types";
import { ProductCard } from "@/components/products/ProductCard";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Placement for the first four products. Explicit rows and columns rather than
 * auto-flow, so the grid is a considered composition at desktop width and a
 * plain single column on a phone.
 *
 * `sizes` is paired with each slot because the browser cannot infer the
 * rendered width of an asymmetric grid — getting this wrong is the usual
 * reason a "fast" image-led page downloads four megabytes.
 */
const SLOTS = [
  {
    grid: "lg:col-span-7 lg:row-start-1",
    sizes: "(min-width: 1024px) 56vw, 92vw",
    size: "lg" as const,
  },
  {
    grid: "lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-32",
    sizes: "(min-width: 1024px) 31vw, 92vw",
    size: "md" as const,
  },
  {
    grid: "lg:col-span-4 lg:col-start-2 lg:row-start-2",
    sizes: "(min-width: 1024px) 31vw, 92vw",
    size: "md" as const,
  },
  {
    grid: "lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:mt-24",
    sizes: "(min-width: 1024px) 39vw, 92vw",
    size: "md" as const,
  },
];

const FALLBACK_SLOT = {
  grid: "lg:col-span-4",
  sizes: "(min-width: 1024px) 31vw, 92vw",
  size: "md" as const,
};

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading" className="bg-paper py-20 lg:py-32">
      <Container width="wide">
        <div className="max-w-2xl">
          <Eyebrow rule>Selected pieces</Eyebrow>
          <h2 id="featured-heading" className="text-display-md mt-8 font-display">
            Six pieces, made properly
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-graphite">
            A new piece only exists here because an old one could not do the job.
            Nothing arrives because the season changed.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:mt-24 lg:grid-cols-12 lg:gap-y-0">
          {products.map((product, index) => {
            const slot = SLOTS[index] ?? FALLBACK_SLOT;
            return (
              <Reveal key={product.slug} className={slot.grid} delay={index === 0 ? 0 : 0.05}>
                <ProductCard product={product} size={slot.size} imageSizes={slot.sizes} />
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 flex items-center justify-between gap-6 border-t border-line pt-8 lg:mt-32">
          <p className="max-w-xs text-sm leading-relaxed text-graphite">
            Every piece is explained here and sold through our authorised store.
          </p>
          <TextLink href="/products">View the full range</TextLink>
        </div>
      </Container>
    </section>
  );
}
