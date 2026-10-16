# Try Jesus — brand showcase site

A product-brand showcase built with Next.js. It presents the brand, explains the
products, carries customer experiences, and hands visitors to an external store
to buy.

"Try Jesus" is a working name, and the category — faith-based apparel — is an
assumption made so the copy, products and photography cohere. Everything that
encodes it lives in `src/content`; no component knows what the brand sells.

**It is not a shop.** There is no basket, no checkout, no payment, no stock and
no pricing anywhere in the codebase. Every buying action routes through one
component — [`ShopButton`](src/components/products/ShopButton.tsx) — which reads
a single environment variable.

> **This build ships with demo content.** The copy, reviews and figures are
> placeholders written to realistic length so the design can be judged, and the
> photography is stock. Nothing in it is a claim about a real business, and none
> of the garments pictured are this brand's. See
> [Replacing the demo content](#replacing-the-demo-content).

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config) |
| `npm run photos` | Fetch missing placeholder photography (`-- --force` to replace all) |
| `npm run photos:sheet -- all out.jpg` | Contact sheet of every placeholder image |
| `npm run photos:candidates -- "baseball cap" portrait out.jpg` | Contact sheet of search results, with ids, for pinning a specific shot |

### Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SHOP_URL` | yes | The external store. Every shop/buy CTA points here. |
| `NEXT_PUBLIC_SITE_URL` | yes in production | Canonical origin for canonicals, sitemap, OG tags and JSON-LD. |
| `CONTACT_INBOX` | no | Where contact-form mail is delivered. Unset in dev: submissions are logged. |
| `RESEND_API_KEY` | no | Credential for whichever email provider you wire up. |

---

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 ·
Embla Carousel · Motion · Radix Dialog · Zod + React Hook Form · Lucide ·
Figtree.

Server components by default. The only client components are the ones that must
be: the hero carousel, the product rail, the product gallery, the mobile menu,
the lightbox, the contact form and the scroll sentinel.

---

## Content architecture

All content lives in [`src/content`](src/content) as typed data. Components never
import it directly — pages read it through [`src/lib/content.ts`](src/lib/content.ts)
and pass it down as props.

```
src/content/
├── types.ts             every shape the UI renders
├── brand.ts             name, tagline, navigation, contact details, social links
├── products.ts          the catalogue and its categories
├── hero.ts              homepage hero campaigns
├── testimonials.ts      customer reviews
├── customer-gallery.ts  customer-submitted photography
└── about.ts             story, timeline, mission, vision, values, founder, statistics
```

### Adding a product

Append an object to `products` in `src/content/products.ts`. The grid, the
carousels, the category counts, the sitemap, the static routes and the
JSON-LD all derive from that array — there is no second place to register it.

Each product needs at least two images: the card cross-fades to the second one
on hover.

### Going headless

[`src/lib/content.ts`](src/lib/content.ts) is the seam. Replace the bodies of
`getProducts()`, `getTestimonials()` and friends with a Sanity / Contentful /
Payload query that returns the same shapes from `src/content/types.ts`, and no
component changes. Every consumer is already a server component.

One thing to change at the same time: `app/products/[slug]/page.tsx` sets
`dynamicParams = false` because the catalogue is finite and known at build
time. With a CMS, set it back to `true` and add `revalidate`.

---

## Replacing the demo content

1. **Turn off the notice.** Set `brand.showDemoNotice = false` in
   `src/content/brand.ts` to remove the strip above the header.
2. **Rewrite the content files.** Every file in `src/content` opens with a
   `DEMO CONTENT` header. Work through them.
3. **Replace the photography.** Everything under `public/images` is stock from
   [Pexels](https://www.pexels.com), fetched and cropped by
   `scripts/fetch-photos.mjs` and itemised in
   [`public/images/CREDITS.md`](public/images/CREDITS.md). It is licensed for
   commercial use, but these are other people's garments — they have to be
   replaced with the real product shoot. Drop new files in using the existing
   names, or update the paths in the content files, then delete the three
   `scripts/photo*` files and the credits file. Keep the aspect ratios: products are 4:5, heroes 16:9 with
   a 3:4 phone crop, customer photos deliberately mixed. Hero and masthead shots
   should be bright — they sit under a flat ink wash.

4. **Deal with the figures.** Every entry in `statistics` is marked
   `placeholder: true`, and the component renders those with a dashed rule plus
   a footnote saying they are unconfirmed. Remove the flag only once the client
   supplies a number they can stand behind. An empty array hides the section.
5. **Get the legal pages written.** `/privacy` and `/terms` ship as an outline
   of the sections each needs, carry `robots: noindex`, and say on the page that
   they are not yet policy. They need the client's own legal advice.
6. **Check permissions on customer photography.** Everything in
   `customer-gallery.ts` is invented. Real photographs need written permission
   and the credit each person asked for. Nothing is scraped from social.

### Things deliberately left out

Not oversights — they need a decision or a credential this build does not have:

- **No aggregate rating, price, or availability in the structured data.** The
  site does not publish those facts, so asserting them in JSON-LD would be
  markup that earns a manual action. `Review` markup is omitted for the same
  reason while the reviews are demo copy.
- **No email delivery.** `app/api/contact/route.ts` validates, rate-limits,
  rejects bots and returns a reference. The provider call is one function —
  `deliver()` — with the shape of the request commented in place.
- **No durable rate limiting or CAPTCHA.** The limiter is in-memory, so it is
  per-instance and resets on deploy. Fine against a script, not a control.
- **No analytics and no cookies.** The site currently sets none, which is why
  there is no consent banner. Adding either makes one mandatory in the UK/EEA.

---

## Design system

Tokens are defined once in [`src/app/globals.css`](src/app/globals.css) under
`@theme`. Nothing hard-codes a hex value.

- **Palette** — paper, bone, ink, charcoal, graphite, ash, line. Deliberately
  black and white: `--color-accent` is functional only (form errors, the
  required-field marker). Set it to a brand colour to introduce one.
  The mid-greys are dark on purpose — light grey small text is the fastest way
  to make a page feel insubstantial.
- **Type** — one family, `Figtree`, at 400/500/600/700/800, self-hosted by
  `next/font`. A single family across headings, labels, controls and body is
  what makes an interface read as one designed product; a display face paired
  with a UI face reads as a template. The display scale is fluid with
  `clamp()`, and `.text-display-*` carries its own weight so a heading is bold
  wherever it appears. The hero headline is the one thing set lighter (400) —
  at that size 700 becomes a wall.
- **Geometry** — controls are pills, structure is square. Buttons, chips and
  the round carousel controls use `--radius-pill`; images, panels and bands
  have hard corners. Set `--radius-pill: 0` to return the whole interface to
  square.
- **Weight over hairlines** — 2px borders on buttons and inputs, 2px underline
  rules, filled shapes rather than outlines. This is most of what separates
  "solid" from "delicate".
- **Motion** — one reveal (8px and a fade, once), plus hover transitions.
  `prefers-reduced-motion` is respected globally in CSS and again in the
  components that animate; the hero carousel does not autoplay at all for
  those visitors.

### Chrome and heroes

The header is opaque and `sticky`, so it occupies real space and no page has to
offset itself to clear it. An earlier version floated transparently over dark
heroes — it needed a scroll sentinel, a CSS `:has()` rule and per-page top
offsets, and did nothing at all on pages without a dark hero.

Heroes and page mastheads put a **flat** ink wash over the photograph rather
than a gradient. A single opacity across the frame reads as an art-directed
colour treatment; a gradient reads as a fix for unreadable text. That treatment
needs bright source photography — a dark image under a dark wash collapses to a
black field, which is why the generated masthead plates are light-toned.

## Accessibility

Semantic landmarks, one `h1` per page with no skipped levels, a skip link, and a
single high-contrast focus treatment that inverts on dark sections. Carousel
controls are labelled and disable at the ends; off-screen slides are `inert`, so
their links cannot be reached by keyboard. The lightbox and mobile menu are Radix
dialogs, which handle the focus trap, restore and scroll lock. All text passes
WCAG AA contrast against its actual background.

The homepage `h1` is visually hidden on purpose: the hero headline rotates, and
a rotating headline cannot be a stable document heading.

Focus rings stay square even on pill controls — a hard ring is easier to see
than one hugging a rounded edge.

---

## Project layout

```
src/
├── app/                  routes, sitemap.ts, robots.ts, api/contact
├── components/
│   ├── layout/           Header, Footer, MobileMenu, overlay sentinel
│   ├── home/             homepage sections
│   ├── products/         ProductCard, grids, gallery, carousel, ShopButton
│   ├── about/            Story, Timeline, Values, Statistics, FounderNote
│   ├── contact/          ContactForm, ContactInformation
│   ├── reviews/          ReviewList, CustomerGalleryGrid
│   └── ui/               Container, Eyebrow, Action, Reveal, Lightbox, PageHeader
├── content/              the data layer (see above)
└── lib/                  site config, content API, SEO, JSON-LD, validation
```
