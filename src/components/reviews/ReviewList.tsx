import Link from "next/link";
import type { Testimonial } from "@/content/types";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { formatMonthYear, ordinal } from "@/lib/utils";

type ReviewListProps = {
  reviews: Testimonial[];
  /** Product name per slug, resolved on the server. */
  productNames: Record<string, string>;
};

/**
 * Every review, as ruled rows.
 *
 * A masonry of quote cards was the obvious move and the wrong one — it makes
 * eight considered paragraphs look like eight marketing tiles. Ruled rows with
 * the index, the quote and the attribution read like a printed appendix, which
 * is closer to what these actually are.
 */
export function ReviewList({ reviews, productNames }: ReviewListProps) {
  if (reviews.length === 0) return null;

  return (
    <ol className="border-t border-line">
      {reviews.map((review, index) => {
        const productName = review.productSlug ? productNames[review.productSlug] : undefined;

        return (
          <Reveal
            as="li"
            key={review.id}
            delay={(index % 3) * 0.04}
            className="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
          >
            <div className="lg:col-span-2">
              <p className="label text-graphite tabular-nums">{ordinal(index)}</p>
              {typeof review.rating === "number" ? (
                <Rating value={review.rating} className="mt-4" />
              ) : null}
            </div>

            <figure className="lg:col-span-6 lg:col-start-4">
              <blockquote className="text-xl font-medium leading-[1.45] tracking-[-0.012em] text-ink lg:text-[1.5rem]">
                <p>“{review.quote}”</p>
              </blockquote>
              <figcaption className="label mt-6 text-graphite">
                {review.name}
                <span aria-hidden="true" className="mx-2 opacity-40">
                  /
                </span>
                {review.location}
              </figcaption>
            </figure>

            <div className="label space-y-2 text-graphite lg:col-span-3 lg:col-start-10 lg:text-right">
              <p>
                <time dateTime={review.date}>{formatMonthYear(review.date)}</time>
              </p>
              {productName && review.productSlug ? (
                <p>
                  <Link
                    href={`/products/${review.productSlug}`}
                    className="link-underline text-ink"
                  >
                    {productName}
                  </Link>
                </p>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
