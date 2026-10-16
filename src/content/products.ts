/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEMO CONTENT — replace before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 * Six sample garments so the collection, carousel and detail pages can be
 * reviewed end to end. Add a product by appending an object here: the grid,
 * the carousel, the category counts, the sitemap and the JSON-LD all read from
 * this array.
 *
 * Deliberately absent: price, stock and availability. This site does not sell
 * — it hands off to the external store, which owns those facts.
 */
import type { Category, Product } from "./types";

export const categories: Category[] = [
  {
    id: "tees",
    name: "Tees",
    description: "Heavyweight cotton, boxy cut, printed to last the garment.",
    image: {
      src: "/images/products/category-tees.jpg",
      alt: "Placeholder image for the Tees category",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "fleece",
    name: "Fleece",
    description: "Hoodies and crewnecks in heavy loopback, cut to sit square.",
    image: {
      src: "/images/products/category-fleece.jpg",
      alt: "Placeholder image for the Fleece category",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "headwear",
    name: "Headwear",
    description: "Caps and beanies, embroidered rather than printed.",
    image: {
      src: "/images/products/category-headwear.jpg",
      alt: "Placeholder image for the Headwear category",
      width: 1400,
      height: 1750,
    },
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "One jacket, made properly, for the nine months it is useful.",
    image: {
      src: "/images/products/category-outerwear.jpg",
      alt: "Placeholder image for the Outerwear category",
      width: 1400,
      height: 1750,
    },
  },
];

/** Every product plate is shot to the same 4:5 frame. */
const PRODUCT_IMAGE = { width: 1600, height: 2000 } as const;

function views(slug: string, name: string, captions: [string, string, string, string]) {
  return captions.map((caption, i) => ({
    src: `/images/products/${slug}-0${i + 1}.jpg`,
    alt: `${name} — ${caption}`,
    ...PRODUCT_IMAGE,
  }));
}

const SIZES = {
  name: "Size",
  options: [
    { label: "S" },
    { label: "M", default: true },
    { label: "L" },
    { label: "XL" },
    { label: "2XL" },
  ],
};

export const products: Product[] = [
  {
    id: "tj-01",
    slug: "heavyweight-tee",
    name: "The Heavyweight Tee",
    subtitle: "8.5oz cotton, boxy fit, screen printed",
    category: "tees",
    productNumber: "TJ-01",
    shortDescription:
      "The shirt the whole thing started with. Heavy enough to hold its shape after a year of Sundays.",
    description:
      "Knit from 8.5oz combed ring-spun cotton on a boxy body with double-needle shoulders, so it keeps its line instead of collapsing at the neck by month three. The print is water-based ink pushed into the fabric rather than sitting on top of it — it softens as the shirt does and it does not crack. Pre-shrunk, so the size you buy is the size you keep.",
    story:
      "We printed forty of these for a small group who kept getting asked the same question and were tired of giving the long answer. They wore them out. People asked where to get one. That is the entire origin story, and we have not changed the pattern since.",
    features: [
      {
        title: "8.5oz cotton",
        detail: "Roughly half again the weight of a standard tee. It hangs rather than clings.",
      },
      {
        title: "Water-based print",
        detail: "Ink sits in the weave, not on it. No plastic hand, no cracking at the fold.",
      },
      {
        title: "Double-needle shoulders",
        detail: "Taped seam across the back so the neckline holds its shape through the wash.",
      },
      {
        title: "Pre-shrunk",
        detail: "Washed before it is cut. What you order is what it stays.",
      },
    ],
    specifications: [
      { label: "Fabric", value: "8.5oz combed ring-spun cotton" },
      { label: "Fit", value: "Boxy, true to size" },
      { label: "Print", value: "Water-based screen print" },
      { label: "Neck", value: "Ribbed collar, shoulder-to-shoulder tape" },
      { label: "Sizes", value: "S — 2XL" },
      { label: "Printed in", value: "Ghana" },
    ],
    usage: [
      "Wash cold, inside out. The print will outlive the shirt if you do.",
      "Tumble low or hang dry. High heat is the only thing that will shrink it.",
      "Do not iron directly over the print.",
    ],
    variants: [
      {
        name: "Colour",
        options: [
          { label: "Black", swatch: "#141414", default: true },
          { label: "Bone", swatch: "#e8e4dc" },
          { label: "Faded olive", swatch: "#6b6f5c" },
        ],
      },
      SIZES,
    ],
    images: views("heavyweight-tee", "The Heavyweight Tee", [
      "front",
      "print detail",
      "worn",
      "back",
    ]),
    featured: true,
    isNew: false,
    order: 1,
  },
  {
    id: "tj-02",
    slug: "grace-hoodie",
    name: "Grace Hoodie",
    subtitle: "14oz loopback fleece, lined hood",
    category: "fleece",
    productNumber: "TJ-02",
    shortDescription:
      "A hood that stands up on its own and a body heavy enough to be the only layer you need.",
    description:
      "14oz loopback fleece with a double-layer hood that holds its shape instead of lying flat against your neck. Ribbed cuffs and hem are knitted, not cut and hemmed, so they keep their grip. The drawcord is flat cotton with metal tips. It is a heavy garment and it is meant to be — this is the one you keep reaching for in October.",
    story:
      "The first run had a single-layer hood because it was cheaper. Everyone told us. We remade it with a lined hood the following year and it has been the best-selling thing we make ever since, which felt like a lesson worth remembering.",
    features: [
      { title: "14oz loopback", detail: "Brushed inside, structured outside. Heavy without being stiff." },
      { title: "Double-layer hood", detail: "Two panels, so it stands up. This is the whole difference." },
      { title: "Knitted rib", detail: "Cuffs and hem are knitted to shape, so they do not stretch out." },
      { title: "Side seams", detail: "Not tubular. It follows your shape instead of hanging like a bag." },
    ],
    specifications: [
      { label: "Fabric", value: "14oz cotton-rich loopback fleece" },
      { label: "Fit", value: "Relaxed, size down for a closer fit" },
      { label: "Hood", value: "Double-layer, flat cotton drawcord" },
      { label: "Print", value: "Water-based screen print" },
      { label: "Sizes", value: "S — 2XL" },
      { label: "Printed in", value: "Ghana" },
    ],
    usage: [
      "Wash cold and hang dry. Fleece this heavy takes a while, and the dryer is what kills it.",
      "It will soften considerably over the first month. That is the fabric, not wear.",
    ],
    variants: [
      {
        name: "Colour",
        options: [
          { label: "Black", swatch: "#141414", default: true },
          { label: "Heather grey", swatch: "#9a9a97" },
          { label: "Bone", swatch: "#e8e4dc" },
        ],
      },
      SIZES,
    ],
    images: views("grace-hoodie", "Grace Hoodie", [
      "front",
      "hood detail",
      "worn",
      "cuff and hem",
    ]),
    featured: true,
    isNew: false,
    order: 2,
  },
  {
    id: "tj-03",
    slug: "psalm-23-longsleeve",
    name: "Psalm 23 Long Sleeve",
    subtitle: "Sleeve-printed, 6.5oz cotton",
    category: "tees",
    productNumber: "TJ-03",
    shortDescription:
      "The text runs down the sleeve, so it reads when your arms are down and disappears when they are not.",
    description:
      "A lighter 6.5oz cotton than the Heavyweight, cut long in the body so it stays tucked when you move. The full passage is set small down the left sleeve in a single column — legible up close, invisible across a room. The chest is blank on purpose.",
    story:
      "A customer asked whether we could make something that said what he believed without announcing it to everyone in the queue behind him. Putting the words on the sleeve rather than the chest turned out to be the whole answer.",
    features: [
      { title: "Sleeve-set text", detail: "One narrow column down the left sleeve. Blank chest." },
      { title: "Long body", detail: "Cut two inches longer so it stays put when you reach." },
      { title: "6.5oz cotton", detail: "Light enough to layer under the Grace Hoodie." },
    ],
    specifications: [
      { label: "Fabric", value: "6.5oz combed ring-spun cotton" },
      { label: "Fit", value: "Regular, long body" },
      { label: "Print", value: "Water-based, left sleeve" },
      { label: "Sizes", value: "S — 2XL" },
      { label: "Printed in", value: "Ghana" },
    ],
    usage: [
      "Wash cold, inside out.",
      "The sleeve print is set small — do not iron over it at all.",
    ],
    variants: [
      {
        name: "Colour",
        options: [
          { label: "Bone", swatch: "#e8e4dc", default: true },
          { label: "Black", swatch: "#141414" },
        ],
      },
      SIZES,
    ],
    images: views("psalm-23-longsleeve", "Psalm 23 Long Sleeve", [
      "front",
      "sleeve print",
      "worn",
      "cuff",
    ]),
    featured: false,
    isNew: false,
    order: 3,
  },
  {
    id: "tj-04",
    slug: "cornerstone-cap",
    name: "Cornerstone Cap",
    subtitle: "Unstructured six-panel, embroidered",
    category: "headwear",
    productNumber: "TJ-04",
    shortDescription:
      "Soft crown, curved brim, embroidered not printed. Broken in on the first wear.",
    description:
      "An unstructured six-panel in washed cotton twill, so it sits down on your head instead of standing off it. The mark is embroidered directly into the front panel — thread, not vinyl, so there is nothing to peel. Brass slider at the back rather than plastic snaps.",
    story:
      "We made these as a thank-you for the first hundred orders and ran out in a week. They are the cheapest thing we make and the one most likely to still be in rotation three years later.",
    features: [
      { title: "Unstructured crown", detail: "No buckram. It creases and keeps the crease, which is the point." },
      { title: "Embroidered mark", detail: "Stitched into the panel. Nothing to crack or lift." },
      { title: "Brass slider", detail: "Adjusts smoothly and does not dig in like a snapback." },
    ],
    specifications: [
      { label: "Fabric", value: "Washed cotton twill" },
      { label: "Crown", value: "Unstructured, six panel" },
      { label: "Brim", value: "Curved, pre-shaped" },
      { label: "Closure", value: "Brass slider, one size" },
      { label: "Embroidered in", value: "Ghana" },
    ],
    usage: [
      "Spot clean. A cap in the washing machine comes out a different shape.",
      "The twill fades. That is the best thing about it.",
    ],
    variants: [
      {
        name: "Colour",
        options: [
          { label: "Black", swatch: "#141414", default: true },
          { label: "Stone", swatch: "#cfc7b8" },
          { label: "Faded olive", swatch: "#6b6f5c" },
        ],
      },
    ],
    images: views("cornerstone-cap", "Cornerstone Cap", [
      "front",
      "embroidery detail",
      "worn",
      "brass slider",
    ]),
    featured: false,
    isNew: true,
    order: 4,
  },
  {
    id: "tj-05",
    slug: "salt-and-light-crew",
    name: "Salt & Light Crewneck",
    subtitle: "14oz fleece, no hood, no pocket",
    category: "fleece",
    productNumber: "TJ-05",
    shortDescription:
      "The Grace Hoodie with everything unnecessary removed. Wears under a jacket properly.",
    description:
      "Same 14oz loopback as the hoodie, without the hood or the pocket — which means it actually fits under a coat. Set-in sleeves rather than raglan, so the shoulder line stays square. A small mark at the left chest and nothing on the back.",
    story:
      "Made because half the people buying the hoodie told us they were wearing it under a jacket and fighting the hood every time. Removing things turned out to be the improvement.",
    features: [
      { title: "No hood, no pocket", detail: "Layers flat under outerwear. That is the entire brief." },
      { title: "Set-in sleeves", detail: "Square shoulder line rather than a raglan slope." },
      { title: "14oz loopback", detail: "The same heavy fleece as the hoodie, brushed inside." },
    ],
    specifications: [
      { label: "Fabric", value: "14oz cotton-rich loopback fleece" },
      { label: "Fit", value: "Relaxed" },
      { label: "Sleeve", value: "Set-in" },
      { label: "Print", value: "Left chest, water-based" },
      { label: "Sizes", value: "S — 2XL" },
      { label: "Printed in", value: "Ghana" },
    ],
    usage: ["Wash cold, hang dry.", "Softens over the first month, like the hoodie."],
    variants: [
      {
        name: "Colour",
        options: [
          { label: "Heather grey", swatch: "#9a9a97", default: true },
          { label: "Black", swatch: "#141414" },
        ],
      },
      SIZES,
    ],
    images: views("salt-and-light-crew", "Salt & Light Crewneck", [
      "front",
      "chest mark",
      "worn",
      "sleeve seam",
    ]),
    featured: true,
    isNew: false,
    order: 5,
  },
  {
    id: "tj-06",
    slug: "sunday-coach-jacket",
    name: "Sunday Coach Jacket",
    subtitle: "Cotton twill, snap front, lined",
    category: "outerwear",
    productNumber: "TJ-06",
    shortDescription:
      "One jacket, made properly, for the nine months of the year it is the right weight.",
    description:
      "A coach jacket in heavy cotton twill with a brushed flannel lining and enamelled snaps that actually stay shut. Cut long enough to cover the hem of a hoodie. Two deep hand pockets and nothing else — no hood, no drawcords, no branding above a quarter inch.",
    story:
      "We only make one piece of outerwear and we would rather keep it that way. This is the fourth revision of the same pattern; the previous three are still out there being worn, which is why we did not start over.",
    features: [
      { title: "Flannel lined", detail: "Brushed cotton body lining. Warm without bulk." },
      { title: "Enamelled snaps", detail: "Heavier than standard poppers, and they hold." },
      { title: "Cut long", detail: "Covers a hoodie hem, which most coach jackets do not." },
      { title: "Two deep pockets", detail: "Hand-sized and actually deep. No chest pocket." },
    ],
    specifications: [
      { label: "Shell", value: "Heavy cotton twill" },
      { label: "Lining", value: "Brushed cotton flannel" },
      { label: "Closure", value: "Enamelled snap front" },
      { label: "Fit", value: "Relaxed, layers over fleece" },
      { label: "Sizes", value: "S — 2XL" },
      { label: "Made in", value: "Ghana" },
    ],
    usage: [
      "Machine wash cold on its own. The snaps will mark other garments.",
      "Hang dry. The twill will soften and crease in; it is supposed to.",
    ],
    variants: [
      {
        name: "Colour",
        options: [
          { label: "Black", swatch: "#141414", default: true },
          { label: "Faded olive", swatch: "#6b6f5c" },
        ],
      },
      SIZES,
    ],
    images: views("sunday-coach-jacket", "Sunday Coach Jacket", [
      "front",
      "snap detail",
      "worn",
      "lining",
    ]),
    featured: true,
    isNew: true,
    order: 6,
  },
];
