import type { Metadata } from "next";
import { CustomerGalleryGrid } from "@/components/reviews/CustomerGalleryGrid";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ShopButton } from "@/components/products/ShopButton";
import { ActionLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  getCustomerPhotos,
  getFeaturedTestimonials,
  getProducts,
  getTestimonials,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { formatMonthYear } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Customer experiences",
  description:
    "What people say about wearing Try Jesus, and the photographs they have sent us from wherever the garments ended up.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const reviews = getTestimonials();
  const lead = getFeaturedTestimonials(1)[0];
  const photos = getCustomerPhotos();
  const productNames = Object.fromEntries(
    getProducts().map((product) => [product.slug, product.name]),
  );

  return (
    <>
      <PageHeader
        eyebrow="Customer experiences"
        title="Owners, not customers"
        lead="Reviews arrive by email, usually months after the order did. We publish them as written, including the ones that point out what we got wrong."
      />

      {/* One review set very large, before the list. */}
      {lead ? (
        <section aria-label="Featured review" className="bg-paper py-20 lg:py-28">
          <Container width="wide">
            <Reveal as="figure" className="mx-auto max-w-5xl text-center">
              <blockquote className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.25] tracking-[-0.022em] text-ink">
                <p>“{lead.quote}”</p>
              </blockquote>
              <figcaption className="label mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-graphite">
                <span className="text-ink">{lead.name}</span>
                <span aria-hidden="true" className="h-px w-8 bg-line" />
                <span>{lead.location}</span>
                <span aria-hidden="true" className="h-px w-8 bg-line" />
                <time dateTime={lead.date}>{formatMonthYear(lead.date)}</time>
              </figcaption>
            </Reveal>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="all-reviews-heading" className="bg-paper pb-20 lg:pb-28">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6 pb-8">
            <h2 id="all-reviews-heading" className="text-display-sm font-display">
              Every review
            </h2>
            <p className="label text-graphite">
              {String(reviews.length).padStart(2, "0")} published
            </p>
          </div>

          <ReviewList reviews={reviews} productNames={productNames} />

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-graphite">
            We do not publish an average score. A single number would flatten
            eight different people describing eight different objects, and we
            would rather you read them.
          </p>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Customer photography                                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        aria-labelledby="gallery-heading"
        className="border-t border-line bg-bone py-20 lg:py-28"
      >
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
            <div>
              <Eyebrow rule>Sent in by owners</Eyebrow>
              <h2 id="gallery-heading" className="text-display-sm mt-8 max-w-xl font-display">
                Where the objects ended up
              </h2>
            </div>
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-graphite">
              Published with permission and credited as each person asked. Nothing
              here is taken from a social feed.
            </p>
          </div>

          <div className="mt-12">
            <CustomerGalleryGrid photos={photos} productNames={productNames} />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 lg:py-24">
        <Container width="wide">
          <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Add yours</Eyebrow>
              <p className="text-display-sm mt-6 max-w-2xl font-display">
                Own one already? Send us a photograph.
              </p>
              <p className="mt-6 max-w-lg leading-relaxed text-graphite">
                Write to the shop and tell us how it has held up — honestly.
                We will ask before publishing anything.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:col-start-9">
              <ActionLink href="/contact" variant="solid" size="md">
                Contact the shop
              </ActionLink>
              <ShopButton variant="outline" size="md">
                Shop online
              </ShopButton>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Customer experiences", path: "/reviews" },
        ])}
      />
    </>
  );
}
