/**
 * Content read API — the seam between the UI and wherever content lives.
 *
 * Today these functions read the typed arrays in `src/content`. Tomorrow they
 * can `await` a CMS. They are already async-friendly at the call site because
 * every consumer is a server component, so swapping the bodies for a fetch is
 * a local change: return the same shapes from `src/content/types.ts` and
 * nothing in `src/components` or `src/app` needs to move.
 */
import { categories, products } from "@/content/products";
import { customerPhotos } from "@/content/customer-gallery";
import { testimonials } from "@/content/testimonials";
import type {
  Category,
  CategoryId,
  CustomerPhoto,
  Product,
  Testimonial,
} from "@/content/types";
import { siteConfig } from "./site";

const byOrder = (a: Product, b: Product) => a.order - b.order;
const byNewestFirst = (a: Testimonial, b: Testimonial) => b.date.localeCompare(a.date);

/* -- products ------------------------------------------------------------- */

export function getProducts(): Product[] {
  return [...products].sort(byOrder);
}

export function getProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const featured = getProducts().filter((product) => product.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getNewProducts(): Product[] {
  return getProducts().filter((product) => product.isNew);
}

export function getProductsByCategory(category: CategoryId): Product[] {
  return getProducts().filter((product) => product.category === category);
}

/**
 * Same category first, then anything else, so the rail is never short on a
 * product that happens to be the only one in its category.
 */
export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return getFeaturedProducts(limit);

  const others = getProducts().filter((product) => product.slug !== slug);
  const sameCategory = others.filter((product) => product.category === current.category);
  const rest = others.filter((product) => product.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

/** The external store URL for a product — per-product override, else global. */
export function getPurchaseUrl(product?: Pick<Product, "externalPurchaseUrl">): string {
  return product?.externalPurchaseUrl ?? siteConfig.shopUrl;
}

/* -- categories ----------------------------------------------------------- */

/** Categories with a live product count, so an empty one can be hidden. */
export function getCategoriesWithCounts(): Array<Category & { count: number }> {
  return categories
    .map((category) => ({
      ...category,
      count: products.filter((product) => product.category === category.id).length,
    }))
    .filter((category) => category.count > 0);
}

export function getCategoryName(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.name ?? id;
}

/* -- reviews -------------------------------------------------------------- */

export function getTestimonials(): Testimonial[] {
  return [...testimonials].sort(byNewestFirst);
}

export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  const featured = getTestimonials().filter((testimonial) => testimonial.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getTestimonialsForProduct(slug: string): Testimonial[] {
  return getTestimonials().filter((testimonial) => testimonial.productSlug === slug);
}

/* -- customer photography -------------------------------------------------- */

export function getCustomerPhotos(limit?: number): CustomerPhoto[] {
  return typeof limit === "number" ? customerPhotos.slice(0, limit) : customerPhotos;
}
