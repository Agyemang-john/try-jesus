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
    id: "t-01",
    name: "Andre Whitfield",
    location: "Houston, Texas",
    quote:
      "I have washed this tee probably sixty times and the print has not cracked once. Most shirts like this are a novelty you wear twice. This one has just become what I put on.",
    productSlug: "heavyweight-tee",
    rating: 5,
    date: "2025-11-04",
    featured: true,
  },
  {
    id: "t-02",
    name: "Bianca Ferreira",
    location: "Lisbon, Portugal",
    quote:
      "The hood actually stands up, which sounds like nothing until you own twenty hoodies where it does not. It is heavy — heavier than I expected from the photos — and that is the reason I wear it.",
    productSlug: "grace-hoodie",
    rating: 5,
    date: "2025-09-18",
  },
  {
    id: "t-03",
    name: "Marcus Obi",
    location: "London, United Kingdom",
    quote:
      "Ordered the wrong size and emailed on a Sunday expecting nothing. Had a reply Monday morning and a replacement that week, no argument about the fact it was my mistake. That is why I have since bought three more things.",
    productSlug: "grace-hoodie",
    rating: 5,
    date: "2026-01-22",
    featured: true,
  },
  {
    id: "t-04",
    name: "Hannah Mbeki",
    location: "Ghana",
    quote:
      "The sleeve print is the whole reason I bought it. I can wear what I believe without it being a conversation with every stranger in the coffee line, and the people who notice, notice.",
    productSlug: "psalm-23-longsleeve",
    rating: 5,
    date: "2025-12-09",
  },
  {
    id: "t-05",
    name: "Diego Salazar",
    location: "Mexico City, Mexico",
    quote:
      "Honest note: the crewneck runs big. I am usually a medium and the medium is roomy on me. I kept it because I like it that way, but size down if you do not.",
    productSlug: "salt-and-light-crew",
    rating: 4,
    date: "2026-02-14",
  },
  {
    id: "t-06",
    name: "Tomi Adeyemi",
    location: "Lagos, Nigeria",
    quote:
      "Bought the cap not expecting much for the price. Eight months on it has faded exactly the way a good cap should and the embroidery has not moved. It is the thing I get asked about most.",
    productSlug: "cornerstone-cap",
    rating: 5,
    date: "2025-08-30",
  },
  {
    id: "t-07",
    name: "Grace Lindholm",
    location: "Chicago, Illinois",
    quote:
      "The jacket is heavier than a coach jacket usually is and I was worried it would be stiff. It was, for about two weeks. Now it creases where I move and I have basically stopped wearing anything else.",
    productSlug: "sunday-coach-jacket",
    rating: 5,
    date: "2026-03-06",
  },
  {
    id: "t-08",
    name: "Samuel Cortez",
    location: "Phoenix, Arizona",
    quote:
      "What I appreciate is that there are six things and they have been the same six things for two years. I do not have to check for a drop. I just buy the shirt when the old one wears out.",
    productSlug: "heavyweight-tee",
    rating: 5,
    date: "2026-04-11",
    featured: true,
  },
];
