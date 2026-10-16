"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "@/content/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type ProductCarouselProps = {
  products: Product[];
  /** Labels the carousel region for assistive technology. */
  label: string;
};

/**
 * Horizontal product rail. Lives in `products/` rather than `home/` because
 * the product detail page uses the same component for its related-objects row.
 *
 * Accessibility notes: the rail is a labelled region, the arrows disable at the
 * ends rather than silently doing nothing, and left/right arrow keys page it
 * once it holds focus. The slides themselves are ordinary links, so tabbing
 * through works with or without the controls.
 */
export function ProductCarousel({ products, label }: ProductCarouselProps) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: 28,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    update();
    embla.on("select", update).on("reInit", update);
    return () => {
      embla.off("select", update).off("reInit", update);
    };
  }, [embla]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        embla?.scrollNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        embla?.scrollPrev();
      }
    },
    [embla],
  );

  if (products.length === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="relative"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex gap-6 lg:gap-8">
          {products.map((product) => (
            <li
              key={product.slug}
              className="min-w-0 flex-[0_0_78%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] xl:flex-[0_0_24%]"
            >
              <ProductCard
                product={product}
                size="sm"
                imageSizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 flex items-center gap-2">
        <button
          type="button"
          onClick={() => embla?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous products"
          className={cn(
            "flex size-12 items-center justify-center border border-ink text-ink transition-colors",
            "enabled:hover:bg-ink enabled:hover:text-paper",
            "disabled:cursor-not-allowed disabled:border-line disabled:text-ash",
          )}
        >
          <ArrowLeft aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => embla?.scrollNext()}
          disabled={!canNext}
          aria-label="Next products"
          className={cn(
            "flex size-12 items-center justify-center border border-ink text-ink transition-colors",
            "enabled:hover:bg-ink enabled:hover:text-paper",
            "disabled:cursor-not-allowed disabled:border-line disabled:text-ash",
          )}
        >
          <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </button>
        <p className="label ml-4 hidden text-graphite sm:block">Drag or swipe to browse</p>
      </div>
    </div>
  );
}
