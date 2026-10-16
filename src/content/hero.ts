/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEMO CONTENT — replace before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 * Homepage hero campaigns. One entry renders a static hero; two or more turn
 * it into a carousel automatically, so a client running a single campaign
 * never sees stray pagination.
 *
 * Each slide carries a separate portrait crop for phones. That is the point of
 * `mobileImage` — a 16:9 campaign shot cropped to a phone loses its subject.
 * Both crops sit under a flat ink wash, so supply bright photography.
 */
import type { ImageAsset } from "./types";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  /** Kept short. Two or three words per line reads best at display scale. */
  headline: string;
  description: string;
  image: ImageAsset;
  mobileImage: ImageAsset;
  /** Optional deep link — a collection, a product, a story. */
  link?: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: "wear-it-plainly",
    eyebrow: "",
    headline: "Faith Over Fashion",
    description:
      "Heavyweight cotton, water-based print, six pieces and no drops. We don't follow trends. We preach truth. the Gospel deserves excellence, not mediocrity",
    image: {
      src: "/images/hero/wear-it-plainly.jpg",
      alt: "Campaign photograph for the Try Jesus range",
      width: 2560,
      height: 1440,
    },
    mobileImage: {
      src: "/images/hero/wear-it-plainly-mobile.jpg",
      alt: "Campaign photograph for the Try Jesus range",
      width: 1080,
      height: 1440,
    },
    link: { label: "See the range", href: "/products" },
  },
  {
    id: "the-print-room",
    eyebrow: "Murphy Avenue, Atlanta",
    headline: "Printed by hand, one pull at a time",
    description:
      "Every garment is pulled on our own press. Water-based ink goes into the fabric, not on top of it — so the print softens with the shirt instead of cracking off it.",
    image: {
      src: "/images/hero/the-print-room.jpg",
      alt: "Photograph of the Try Jesus print room",
      width: 2560,
      height: 1440,
    },
    mobileImage: {
      src: "/images/hero/the-print-room-mobile.jpg",
      alt: "Photograph of the Try Jesus print room",
      width: 1080,
      height: 1440,
    },
    link: { label: "Inside the print room", href: "/about" },
  },
  {
    id: "coach-jacket",
    eyebrow: "New — TJ-06",
    headline: "The Sunday Coach Jacket",
    description:
      "Heavy twill, flannel lined, cut long enough to cover a hoodie hem. The only outerwear we make.",
    image: {
      src: "/images/hero/coach-jacket.jpg",
      alt: "Campaign photograph of the Sunday Coach Jacket",
      width: 2560,
      height: 1440,
    },
    mobileImage: {
      src: "/images/hero/coach-jacket-mobile.jpg",
      alt: "Campaign photograph of the Sunday Coach Jacket",
      width: 1080,
      height: 1440,
    },
    link: { label: "View the jacket", href: "/products/sunday-coach-jacket" },
  },
];
