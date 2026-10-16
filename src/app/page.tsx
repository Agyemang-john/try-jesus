import { brand } from "@/content/brand";
import { heroSlides } from "@/content/hero";
import { BrandIntro } from "@/components/home/BrandIntro";
import { CategoryRail } from "@/components/home/CategoryRail";
import { CustomerGallery } from "@/components/home/CustomerGallery";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { ShopCallout } from "@/components/home/ShopCallout";
import { SocialSection } from "@/components/home/SocialSection";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductCarousel } from "@/components/products/ProductCarousel";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  getCategoriesWithCounts,
  getCustomerPhotos,
  getFeaturedProducts,
  getFeaturedTestimonials,
  getProducts,
  getTestimonials,
} from "@/lib/content";

/**
 * Homepage.
 *
 * A server component: the only client JavaScript on this route is the hero
 * carousel, the product rail, the mobile menu and the gallery lightbox. Every
 * section reads its content through `@/lib/content` and receives it as props,
 * so none of them know where the data came from.
 *
 * The section order alternates deliberately — image-led, then editorial, then
 * typographic, then image-led again — so no two neighbouring sections share a
 * structure.
 */
export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const categories = getCategoriesWithCounts();
  const photos = getCustomerPhotos(8);

  /* Two featured reviews plus the newest, so the section is never short. */
  const featuredReviews = getFeaturedTestimonials();
  const reviewsForHome = [...featuredReviews, ...getTestimonials()]
    .filter(
      (review, index, all) => all.findIndex((other) => other.id === review.id) === index,
    )
    .slice(0, 3);

  /* Resolved here rather than in the client gallery, which keeps the whole
     product dataset out of the browser bundle. */
  const productNames = Object.fromEntries(
    getProducts().map((product) => [product.slug, product.name]),
  );

  const carouselProducts = getProducts().filter(
    (product) => !featured.some((item) => item.slug === product.slug),
  );

  return (
    <>
      {/* The stable document heading. The hero headline rotates, so it cannot
          be the <h1>. */}
      <h1 className="sr-only">
        {brand.name} — {brand.tagline}
      </h1>

      <Hero slides={heroSlides} />
      <BrandIntro />
      <CategoryRail categories={categories} />
      <FeaturedProducts products={featured} />
      <Manifesto />

      {carouselProducts.length > 0 ? (
        <section aria-labelledby="also-heading" className="bg-paper py-20 lg:py-28">
          <Container width="wide">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
              <div>
                <Eyebrow>Also in the range</Eyebrow>
                <h2 id="also-heading" className="text-display-sm mt-5 font-display">
                  The rest of the range
                </h2>
              </div>
            </div>
            <div className="mt-12">
              <ProductCarousel products={carouselProducts} label="More products" />
            </div>
          </Container>
        </section>
      ) : null}

      <Testimonials testimonials={reviewsForHome} />
      <CustomerGallery photos={photos} productNames={productNames} />
      <SocialSection />
      <ShopCallout />
    </>
  );
}
