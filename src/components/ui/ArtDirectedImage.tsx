import { getImageProps } from "next/image";
import type { ImageAsset } from "@/content/types";

type ArtDirectedImageProps = {
  /** Wide crop, used from `breakpoint` upwards. */
  desktop: ImageAsset;
  /** Portrait crop for phones. */
  mobile: ImageAsset;
  breakpoint?: string;
  priority?: boolean;
  className?: string;
};

/**
 * One image, two crops, one download.
 *
 * The obvious way to art-direct a hero — two <Image> elements toggled with
 * `hidden` / `block` — puts both in the DOM. A lazy one behind `display: none`
 * is never fetched, but an eager or `priority` one is, so the desktop visitor
 * pays for the phone crop as well. That is exactly the case a hero is in.
 *
 * `getImageProps` is Next's supported escape hatch for this: it hands back the
 * generated `srcSet` so the crops can be attached to a real <picture>, and the
 * browser picks exactly one before it fetches anything.
 */
export function ArtDirectedImage({
  desktop,
  mobile,
  breakpoint = "(min-width: 768px)",
  priority = false,
  className,
}: ArtDirectedImageProps) {
  const shared = { fill: true, sizes: "100vw", priority, quality: 82 } as const;

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...shared, src: desktop.src, alt: desktop.alt });

  const {
    props: { srcSet: mobileSrcSet, ...fallback },
  } = getImageProps({ ...shared, src: mobile.src, alt: desktop.alt });

  return (
    <picture>
      <source media={breakpoint} srcSet={desktopSrcSet} />
      <source srcSet={mobileSrcSet} />
      {/* A bare <img> on purpose: getImageProps has already produced the
          optimised src and srcSet, and <picture> needs a plain element here. */}
      <img {...fallback} alt={desktop.alt} className={className} />
    </picture>
  );
}
