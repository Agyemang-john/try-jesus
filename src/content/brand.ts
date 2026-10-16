/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEMO CONTENT — replace before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 * "TRY JESUS" is a working name. The category below — faith-based apparel — is
 * an assumption made so the copy, products and photography cohere. If the real
 * brand sells something else, this file and the four beside it are the only
 * places that need rewriting; no component knows what the brand sells.
 *
 * Nothing here is a verified claim about a real business.
 */
import type { NavItem, SocialLink } from "./types";

export const brand = {
  name: "Try Jesus",
  /** Used in the wordmark. Set in caps because the mark is set in caps. */
  wordmark: "TRY JESUS",
  legalName: "Try Jesus Supply Co.",
  tagline: "Faith Over Passion",
  foundedYear: 2026,
  city: "Ayeduase",
  country: "GHANA",

  /** One sentence. Footer, metadata description and OG tags. */
  shortDescription:
    "Heavyweight, plainly-made apparel for people who would rather say it on a shirt than explain it. Cut and printed in Atlanta, built to be worn out rather than put away.",

  /** Two or three sentences. The brand-introduction section on the homepage. */
  introduction:
    "Try Jesus started with one shirt, printed forty times, for a group that kept being asked the same question. We make garments heavy enough to survive being worn every week, printed with words we actually mean, and we keep the range short on purpose. No drops, no hype, no scarcity games.",

  /**
   * Set to false once the site carries the client's own copy, photography and
   * figures. While true, a thin strip above the header says so plainly.
   */
  showDemoNotice: true,
} as const;

/**
 * Primary navigation. The order here drives the header, the mobile menu and
 * the footer sitemap — add a route in one place.
 */
export const primaryNav: NavItem[] = [
  { label: "Products", href: "/products", description: "The full range" },
  { label: "About", href: "/about", description: "Who makes this, and why" },
  { label: "Reviews", href: "/reviews", description: "What wearers say, in their words" },
  { label: "Contact", href: "/contact", description: "Sizing, orders, wholesale" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

/**
 * DEMO CONTENT — replace with the brand's real details, and delete any line
 * the client does not want published. The contact page renders only the
 * fields that are present.
 */
export const contactDetails = {
  email: "felixamoah2002@icloud.com",
  pressEmail: "felixamoah2002@icloud.com",
  phone: "+233 506 585 979",
  phoneHref: "tel:+233506585979",
  whatsapp: {
    display: "+233 506 585 979",
    href: "https://wa.me/233506585979",
  },
  address: {
    lines: ["1180 KNUST", "KUMASI, AK 30310", "Ghana"],
    /** Rendered as a static, click-through map link — no third-party embed. */
    mapUrl: "https://www.openstreetmap.org/search?query=KUMASI%20Ghana",
  },
  hours: [
    { days: "Monday — Friday", time: "10:00 — 18:00" },
    { days: "Saturday", time: "11:00 — 16:00" },
    { days: "Sunday", time: "Closed" },
  ],
  /** Shown beside the form so people know what to expect. */
  responseTime: "We answer every message within two working days.",
} as const;

/**
 * DEMO CONTENT — only list platforms the brand actually maintains. Deleting an
 * entry removes it from the header, footer and social section at once.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    handle: "tryjesus_26",
    href: "https://instagram.com/",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    handle: "tryjesus_26",
    href: "https://tiktok.com/",
  },
  {
    platform: "youtube",
    label: "YouTube",
    handle: "Try Jesus Supply",
    href: "https://youtube.com/",
  },
  {
    platform: "facebook",
    label: "Facebook",
    handle: "tryjesussupply",
    href: "https://facebook.com/",
  },
  {
    platform: "x",
    label: "X",
    handle: "tryjesussupply",
    href: "https://x.com/",
  },
  {
    platform: "whatsapp",
    label: "WhatsApp",
    handle: contactDetails.whatsapp.display,
    href: contactDetails.whatsapp.href,
  },
];
