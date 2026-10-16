import type { Product } from "@/content/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type ProductGridProps = {
  products: Product[];
};

/**
 * The collection grid.
 *
 * Two columns rather than the usual three or four: this is a six-object
 * catalogue, and at three-up the photography stops carrying the page. Every
 * second row is nudged down so the grid scans as a composition rather than a
 * table.
 */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <ul className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-24">
      {products.map((product, index) => (
        <Reveal
          as="li"
          key={product.slug}
          delay={(index % 2) * 0.06}
          className={index % 2 === 1 ? "sm:mt-16 lg:mt-24" : undefined}
        >
          <ProductCard
            product={product}
            size="lg"
            imageSizes="(min-width: 640px) 46vw, 92vw"
            priority={index < 2}
          />
        </Reveal>
      ))}
    </ul>
  );
}
