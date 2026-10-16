"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { cn, ordinal } from "@/lib/utils";

type ProductGalleryProps = {
  images: ImageAsset[];
  productName: string;
};

/**
 * Product photography.
 *
 * Desktop: one large plate with a column of thumbnails beside it. Phone: a
 * full-bleed swipeable rail with a counter — thumbnails at that width are too
 * small to choose from, so they are replaced rather than shrunk.
 *
 * Both routes open the same lightbox, which is where the detail actually is.
 */
export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [emblaRef, embla] = useEmblaCarousel({ loop: false, align: "center" });

  /* The phone rail and the desktop selection are the same piece of state, so
     swiping and clicking a thumbnail cannot disagree. */
  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setActive(embla.selectedScrollSnap());
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  const select = useCallback(
    (index: number) => {
      setActive(index);
      embla?.scrollTo(index);
    },
    [embla],
  );

  const lightboxItems: LightboxItem[] = images.map((image, index) => ({
    image,
    caption: image.alt,
    meta: `${productName} — view ${ordinal(index)} of ${String(images.length).padStart(2, "0")}`,
  }));

  const current = images[active];
  if (!current) return null;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Phone: swipe rail                                                 */}
      {/* ---------------------------------------------------------------- */}
      <div className="lg:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <ul className="flex">
            {images.map((image, index) => (
              <li key={image.src} className="min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="relative block aspect-4/5 w-full bg-bone"
                  aria-label={`Open ${productName} view ${index + 1} at full size`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="label text-graphite tabular-nums">
            {ordinal(active)} / {String(images.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous image"
              className="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
            >
              <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              aria-label="Next image"
              className="flex size-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink"
            >
              <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Desktop: main plate plus thumbnail column                         */}
      {/* ---------------------------------------------------------------- */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-[5.5rem_1fr]">
        <ul className="flex flex-col gap-3">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => select(index)}
                aria-label={`Show view ${index + 1} of ${productName}`}
                aria-current={index === active ? "true" : undefined}
                className={cn(
                  "relative block aspect-4/5 w-full overflow-hidden border bg-bone transition-colors",
                  index === active
                    ? "border-ink"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="88px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setLightboxIndex(active)}
          className="group relative block aspect-4/5 w-full overflow-hidden bg-bone"
          aria-label={`Open ${productName} view ${active + 1} at full size`}
        >
          {/* Every view is rendered and cross-faded rather than swapped, so
              changing thumbnail does not flash a blank frame. */}
          {images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={index === active ? image.alt : ""}
              aria-hidden={index === active ? undefined : "true"}
              fill
              sizes="(min-width: 1280px) 46vw, 52vw"
              priority={index === 0}
              className={cn(
                "object-cover transition-opacity duration-500 ease-[var(--ease-editorial)]",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}

          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 flex size-11 items-center justify-center bg-ink/0 text-paper opacity-0 transition-all duration-300 group-hover:bg-ink/75 group-hover:opacity-100"
          >
            <ZoomIn strokeWidth={1.5} className="size-4" />
          </span>
        </button>
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
        title={`${productName} photography`}
      />
    </>
  );
}
