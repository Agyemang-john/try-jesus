/**
 * Content model
 * -------------
 * Every shape the UI renders is declared here once. The files beside this one
 * are the current source of truth, but nothing in `src/components` imports
 * them directly by path shape — pages read content, pass it down as props, and
 * components only know about these types.
 *
 * That is the whole CMS story: swap the bodies of `getProducts()`,
 * `getTestimonials()` and friends for a Sanity / Contentful / Payload query
 * that returns these same shapes, and no component changes.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CategoryId = "tees" | "fleece" | "headwear" | "outerwear";

export type Category = {
  id: CategoryId;
  name: string;
  /** Short line used on the category rail and as the collection standfirst. */
  description: string;
  image: ImageAsset;
};

export type ProductVariantGroup = {
  /** e.g. "Leather", "Hardware" */
  name: string;
  options: Array<{
    label: string;
    /** Optional hex used for a small square swatch. Omit for text-only options. */
    swatch?: string;
    /** Marks the variant shown in the current photography. */
    default?: boolean;
  }>;
};

export type Specification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  /** Sits under the product name — a descriptor, not a sales line. */
  subtitle: string;
  category: CategoryId;
  /** Workshop reference, printed on the product card. */
  productNumber: string;
  shortDescription: string;
  description: string;
  /** Why this object exists. Rendered as pull-quote-scale editorial copy. */
  story: string;
  features: Array<{ title: string; detail: string }>;
  specifications: Specification[];
  /** How to live with the object: care, break-in, repair. */
  usage?: string[];
  variants?: ProductVariantGroup[];
  images: ImageAsset[];
  /** Overrides the site-wide shop URL when a product sells somewhere else. */
  externalPurchaseUrl?: string;
  featured: boolean;
  isNew: boolean;
  /** Ascending. Controls grid order independently of the array order. */
  order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  /** Slug of the product the review refers to, when known. */
  productSlug?: string;
  /** 1–5. Omit rather than guess — the UI hides the row when absent. */
  rating?: number;
  /** ISO date. Used for ordering and the printed dateline. */
  date: string;
  image?: ImageAsset;
  /** Promotes the review into the large opening slot on /reviews. */
  featured?: boolean;
};

export type CustomerPhoto = {
  id: string;
  image: ImageAsset;
  customerName: string;
  caption: string;
  productSlug?: string;
  /** Social handle shown with the credit, without the leading @. */
  handle?: string;
};

export type SocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "x"
  | "youtube"
  | "linkedin"
  | "whatsapp";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  /** Displayed handle, without the leading @. */
  handle: string;
  href: string;
};

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
  image?: ImageAsset;
};

export type BrandValue = {
  /** Two-digit index printed beside the value. */
  index: string;
  title: string;
  description: string;
};

export type Statistic = {
  value: string;
  label: string;
  /**
   * True until the client confirms a real figure. The UI marks placeholder
   * numbers instead of presenting them as verified claims.
   */
  placeholder?: boolean;
};

export type Founder = {
  name: string;
  role: string;
  biography: string[];
  image: ImageAsset;
  signature?: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** Short line shown under the label in the mobile menu. */
  description?: string;
};
