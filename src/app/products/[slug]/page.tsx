import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductVariants } from "@/components/products/ProductVariants";
import { ShopButton } from "@/components/products/ShopButton";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import {
  getCategoryName,
  getProductBySlug,
  getProductSlugs,
  getPurchaseUrl,
  getRelatedProducts,
  getTestimonialsForProduct,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, productSchema } from "@/lib/structured-data";
import { formatMonthYear, ordinal } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

/** Every product is known at build time, so every detail page is static. */
export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

/**
 * The catalogue is finite and fully known at build time, so a slug that is not
 * in `generateStaticParams` is genuinely not a product.
 *
 * This matters for more than tidiness: left on the default, Next renders the
 * unknown slug on demand and caches the `notFound()` result as a successful
 * prerender, which serves the "product not found" page with a 200. Crawlers
 * then index a not-found page as a real one. `false` makes Next answer with a
 * true 404 before this component runs.
 *
 * When a CMS starts supplying products, set this back to `true` and pair it
 * with `revalidate` so newly published products resolve without a rebuild.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found", robots: { index: false, follow: true } };
  }

  const cover = product.images[0];

  return pageMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    image: cover ? { src: cover.src, alt: cover.alt } : undefined,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.slug, 4);
  const reviews = getTestimonialsForProduct(product.slug);
  const categoryName = getCategoryName(product.category);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Gallery and the essential facts                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-paper pt-10 lg:pt-14">
        <Container width="wide">
          <nav aria-label="Breadcrumb" className="mb-8 lg:mb-12">
            <ol className="label flex flex-wrap items-center gap-2 text-graphite">
              <li>
                <Link href="/" className="link-underline hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">
                /
              </li>
              <li>
                <Link href="/products" className="link-underline hover:text-ink">
                  Products
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">
                /
              </li>
              <li className="text-ink" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} productName={product.name} />
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
              <div className="label flex items-center justify-between gap-4 text-graphite">
                <span>{categoryName}</span>
                <span className="tabular-nums">{product.productNumber}</span>
              </div>

              <h1 className="text-display-md mt-5 font-display">{product.name}</h1>
              <p className="mt-3 text-lg text-graphite">{product.subtitle}</p>

              <p className="mt-8 leading-relaxed text-ink">{product.description}</p>

              {product.variants?.length ? (
                <div className="mt-10 border-t border-line pt-8">
                  <ProductVariants groups={product.variants} />
                </div>
              ) : null}

              {/* The hand-off. Deliberately the only "buy" control anywhere on
                  the page — there is no basket, no quantity, no checkout. */}
              <div className="mt-10 border-t border-line pt-8">
                <ShopButton
                  href={getPurchaseUrl(product)}
                  size="lg"
                  className="w-full sm:w-auto"
                  withNote
                >
                  Buy this product
                </ShopButton>

                <p className="mt-6 text-sm leading-relaxed text-graphite">
                  Not sure of the size?{" "}
                  <Link href="/contact" className="link-underline text-ink">
                    Ask the shop
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Why it exists                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section aria-labelledby="story-heading" className="bg-paper py-20 lg:py-32">
        <Container width="wide">
          <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <Eyebrow>The story</Eyebrow>
              <h2 id="story-heading" className="sr-only">
                Why the {product.name} exists
              </h2>
            </div>
            <Reveal className="lg:col-span-8 lg:col-start-5">
              <p className="text-[clamp(1.375rem,2.4vw,1.875rem)] font-medium leading-[1.4] tracking-[-0.015em] text-ink">
                {product.story}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Features — numbered rows on ink                                   */}
      {/* ---------------------------------------------------------------- */}
      <section aria-labelledby="features-heading" className="on-ink bg-ink py-20 text-paper lg:py-28">
        <Container width="wide">
          <Eyebrow rule className="text-ash">
            What makes it
          </Eyebrow>
          <h2 id="features-heading" className="text-display-sm mt-8 max-w-2xl font-display">
            Details that decide how long it lasts
          </h2>

          <dl className="mt-14 border-t border-paper/15 lg:mt-20">
            {product.features.map((feature, index) => (
              <Reveal
                key={feature.title}
                delay={index * 0.04}
                className="grid gap-3 border-b border-paper/15 py-7 lg:grid-cols-12 lg:items-baseline lg:gap-8"
              >
                <span className="label text-ash tabular-nums lg:col-span-1">{ordinal(index)}</span>
                <dt className="font-display text-xl lg:col-span-4 lg:text-2xl">{feature.title}</dt>
                <dd className="leading-relaxed text-ash lg:col-span-6 lg:col-start-7">
                  {feature.detail}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Specifications and care                                           */}
      {/* ---------------------------------------------------------------- */}
      <section aria-labelledby="specs-heading" className="bg-bone py-20 lg:py-28">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Eyebrow>Specifications</Eyebrow>
              <h2 id="specs-heading" className="text-display-sm mt-5 font-display">
                The numbers
              </h2>

              <dl className="mt-10 border-t border-line">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-4"
                  >
                    <dt className="label text-graphite">{spec.label}</dt>
                    <dd className="text-[0.9375rem] text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {product.usage?.length ? (
              <div className="lg:col-span-5 lg:col-start-8">
                <Eyebrow>Living with it</Eyebrow>
                <h3 className="text-display-sm mt-5 font-display">Care</h3>

                <ul className="mt-10 border-t border-line">
                  {product.usage.map((line, index) => (
                    <li
                      key={line}
                      className="flex gap-5 border-b border-line py-5 text-[0.9375rem] leading-relaxed text-ink"
                    >
                      <span className="label shrink-0 pt-1 text-graphite tabular-nums">
                        {ordinal(index)}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Reviews for this object                                           */}
      {/* ---------------------------------------------------------------- */}
      {reviews.length > 0 ? (
        <section aria-labelledby="product-reviews-heading" className="bg-paper py-20 lg:py-28">
          <Container width="wide">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
              <div>
                <Eyebrow>Wearers on the {product.name}</Eyebrow>
                <h2 id="product-reviews-heading" className="text-display-sm mt-5 font-display">
                  What people say
                </h2>
              </div>
              <TextLink href="/reviews">All customer experiences</TextLink>
            </div>

            <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-16">
              {reviews.map((review, index) => (
                <Reveal as="li" key={review.id} delay={index * 0.06}>
                  <figure>
                    {typeof review.rating === "number" ? (
                      <Rating value={review.rating} className="mb-5" />
                    ) : null}
                    <blockquote className="text-xl font-medium leading-[1.45] tracking-[-0.012em] text-ink lg:text-[1.375rem]">
                      <p>“{review.quote}”</p>
                    </blockquote>
                    <figcaption className="label mt-6 text-graphite">
                      {review.name} — {review.location}
                      <span aria-hidden="true" className="mx-2 opacity-40">
                        /
                      </span>
                      <time dateTime={review.date}>{formatMonthYear(review.date)}</time>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* Related objects                                                   */}
      {/* ---------------------------------------------------------------- */}
      {related.length > 0 ? (
        <section aria-labelledby="related-heading" className="border-t border-line bg-bone py-20 lg:py-28">
          <Container width="wide">
            <div className="border-b border-line pb-8">
              <Eyebrow>Also in the range</Eyebrow>
              <h2 id="related-heading" className="text-display-sm mt-5 font-display">
                Pieces that go with it
              </h2>
            </div>
            <div className="mt-12">
              <ProductCarousel products={related} label={`Products related to ${product.name}`} />
            </div>
          </Container>
        </section>
      ) : null}

      <JsonLd
        schema={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]}
      />
    </>
  );
}
