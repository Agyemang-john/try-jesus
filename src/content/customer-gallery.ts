/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEMO CONTENT — replace before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 * Customer-submitted photography. Every image here is a generated placeholder
 * plate and every name is invented.
 *
 * Before publishing real photographs, get written permission from the person
 * who took each one and credit them the way they asked to be credited. Images
 * are never scraped from social platforms — they are submitted or licensed.
 *
 * The grid is intentionally mixed-aspect: keep a spread of 4:5, 1:1 and 4:3
 * when swapping in real photography, or the masonry rhythm flattens out.
 */
import type { CustomerPhoto } from "./types";

type Shape = "portrait" | "square" | "landscape";

const SHAPES: Record<Shape, { width: number; height: number }> = {
  portrait: { width: 1200, height: 1500 },
  square: { width: 1200, height: 1200 },
  landscape: { width: 1200, height: 900 },
};

function photo(
  id: string,
  shape: Shape,
  customerName: string,
  caption: string,
  productSlug: string,
  handle?: string,
): CustomerPhoto {
  return {
    id,
    customerName,
    caption,
    productSlug,
    handle,
    image: {
      src: `/images/customers/${id}.jpg`,
      alt: `Placeholder customer photograph submitted by ${customerName}`,
      ...SHAPES[shape],
    },
  };
}

export const customerPhotos: CustomerPhoto[] = [
  photo("customer-01", "portrait", "Andre W.", "Sixty washes in.", "heavyweight-tee", "andre.w"),
  photo("customer-02", "square", "Bianca F.", "First cold morning.", "grace-hoodie"),
  photo("customer-03", "landscape", "Marcus O.", "Sunday, north London.", "grace-hoodie", "marcus.obi"),
  photo("customer-04", "portrait", "Hannah M.", "You only see it up close.", "psalm-23-longsleeve"),
  photo("customer-05", "square", "Diego S.", "Roomy, and I kept it that way.", "salt-and-light-crew", "d.salazar"),
  photo("customer-06", "portrait", "Tomi A.", "Eight months of fading.", "cornerstone-cap"),
  photo("customer-07", "landscape", "Grace L.", "Creased in properly now.", "sunday-coach-jacket"),
  photo("customer-08", "square", "Samuel C.", "Third one of these.", "heavyweight-tee", "samcortez"),
  photo("customer-09", "portrait", "Priya N.", "Layered under the jacket.", "salt-and-light-crew"),
  photo("customer-10", "landscape", "Jonah B.", "Wednesday night.", "grace-hoodie"),
  photo("customer-11", "square", "Camille D.", "Everyday cap.", "cornerstone-cap", "camille.d"),
  photo("customer-12", "portrait", "Noor A.", "Still the best thing I own.", "heavyweight-tee"),
];
