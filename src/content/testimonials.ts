/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEMO CONTENT — replace before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 * Invented reviews written to realistic length so the layout can be judged.
 * These are NOT real customer statements. Replace every entry with verified,
 * permissioned reviews before this site goes live — and delete any entry the
 * client cannot source.
 *
 * Ratings are optional on purpose: leave `rating` off rather than guess. The
 * site does not publish an aggregate rating anywhere, and the product JSON-LD
 * deliberately omits `aggregateRating` for the same reason.
 */
import type { Testimonial } from "./types";

export const testimonials: Testimonial[] = [
  {
    id: "t-08",
    name: "Christabel Afriyie",
    location: "Deduako, Kumasi",
    quote:
      "What I appreciate is that there are six things and they have been the same six things for two years. I do not have to check for a drop. I just buy the shirt when the old one wears out.",
    productSlug: "heavyweight-tee",
    rating: 5,
    date: "2026-04-11",
    featured: true,
  },
];
