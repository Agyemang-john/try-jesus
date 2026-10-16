import type { CustomerPhoto } from "@/content/types";
import { CustomerGalleryGrid } from "@/components/reviews/CustomerGalleryGrid";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

type CustomerGalleryProps = {
  photos: CustomerPhoto[];
  productNames: Record<string, string>;
};

/**
 * Photographs from the people who own the objects — the section the brand
 * cares most about, so it gets a full-width plate rather than a sidebar.
 */
export function CustomerGallery({ photos, productNames }: CustomerGalleryProps) {
  if (photos.length === 0) return null;

  return (
    <section aria-labelledby="customer-gallery-heading" className="bg-paper py-20 lg:py-32">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <Eyebrow>Customer experiences</Eyebrow>
            <h2 id="customer-gallery-heading" className="text-display-sm mt-5 max-w-xl font-display">
              Out in the world, being worn
            </h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-graphite">
            Sent in by owners, published with their permission. Tag us and we may
            ask to add yours.
          </p>
        </div>

        <div className="mt-12">
          <CustomerGalleryGrid photos={photos} productNames={productNames} />
        </div>

        <div className="mt-12 border-t border-line pt-8">
          <TextLink href="/reviews">See every customer photograph</TextLink>
        </div>
      </Container>
    </section>
  );
}
