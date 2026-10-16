"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Maximize2 } from "lucide-react";
import type { CustomerPhoto } from "@/content/types";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

type CustomerGalleryGridProps = {
  photos: CustomerPhoto[];
  /** Product name per slug, resolved on the server and passed in. */
  productNames: Record<string, string>;
  className?: string;
};

/**
 * Customer-submitted photography.
 *
 * Two layouts, not one responsive compromise:
 *  · Phone — a snap rail, so the photographs stay large instead of becoming a
 *    grid of thumbnails.
 *  · Tablet and up — CSS columns, which gives a real masonry that respects the
 *    mixed 4:5 / 1:1 / 4:3 crops people actually send in.
 *
 * Both layouts are in the DOM and swapped with `hidden`. Every image is lazy
 * for that reason: a display:none container never enters the viewport, so the
 * inactive layout downloads nothing. This gallery is never the LCP element, so
 * nothing here is worth marking priority.
 *
 * The grid takes any number of images — adding twenty more is a data change.
 */
export function CustomerGalleryGrid({
  photos,
  productNames,
  className,
}: CustomerGalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      photos.map((photo) => ({
        image: photo.image,
        caption: photo.caption,
        meta: [
          photo.customerName,
          photo.handle ? `@${photo.handle}` : null,
          photo.productSlug ? productNames[photo.productSlug] : null,
        ]
          .filter(Boolean)
          .join(" · "),
      })),
    [photos, productNames],
  );

  if (photos.length === 0) return null;

  return (
    <>
      {/* Phone: horizontal snap rail. */}
      <ul
        className={cn(
          "no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden",
          className,
        )}
      >
        {photos.map((photo, index) => (
          <li key={photo.id} className="w-[78%] shrink-0 snap-start">
            <GalleryTile
              photo={photo}
              productName={photo.productSlug ? productNames[photo.productSlug] : undefined}
              sizes="78vw"
              onOpen={() => setOpenIndex(index)}
            />
          </li>
        ))}
      </ul>

      {/* Tablet and up: masonry columns. */}
      <div className={cn("hidden sm:block", className)}>
        <ul className="columns-2 gap-6 lg:columns-3 lg:gap-8 xl:columns-4">
          {photos.map((photo, index) => (
            <li key={photo.id} className="mb-6 break-inside-avoid lg:mb-8">
              <GalleryTile
                photo={photo}
                productName={photo.productSlug ? productNames[photo.productSlug] : undefined}
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 46vw"
                onOpen={() => setOpenIndex(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        title="Customer photographs"
      />
    </>
  );
}

type GalleryTileProps = {
  photo: CustomerPhoto;
  productName?: string;
  sizes: string;
  onOpen: () => void;
};

function GalleryTile({ photo, productName, sizes, onOpen }: GalleryTileProps) {
  return (
    <figure data-underline-group className="group">
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full overflow-hidden bg-bone focus-visible:outline-offset-4"
        aria-label={`Open photograph from ${photo.customerName} at full size`}
      >
        <Image
          src={photo.image.src}
          alt={photo.image.alt}
          width={photo.image.width}
          height={photo.image.height}
          sizes={sizes}
          loading="lazy"
          className="w-full transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex size-9 items-center justify-center bg-paper/0 text-paper opacity-0 transition-opacity duration-300 group-hover:bg-ink/70 group-hover:opacity-100"
        >
          <Maximize2 strokeWidth={1.5} className="size-4" />
        </span>
      </button>

      <figcaption className="mt-3">
        <p className="text-sm leading-snug text-ink">{photo.caption}</p>
        <p className="label mt-2 text-graphite">
          {photo.customerName}
          {productName ? (
            <>
              <span aria-hidden="true" className="mx-2 opacity-40">
                /
              </span>
              {productName}
            </>
          ) : null}
        </p>
      </figcaption>
    </figure>
  );
}
