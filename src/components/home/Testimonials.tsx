import type { Testimonial } from "@/content/types";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Rating } from "@/components/ui/Rating";
import { Reveal } from "@/components/ui/Reveal";
import { getCategoryName, getProductBySlug } from "@/lib/content";
import { formatMonthYear } from "@/lib/utils";

type TestimonialsProps = {
  /** The first is set large; the rest run as a hairline column beside it. */
  testimonials: Testimonial[];
};

function productLine(slug?: string) {
  if (!slug) return null;
  const product = getProductBySlug(slug);
  if (!product) return null;
  return `${product.name} · ${getCategoryName(product.category)}`;
}

/**
 * One review at pull-quote scale, with two more running quietly beside it.
 *
 * Not three matching cards: a wall of equal testimonials reads as marketing,
 * whereas one long quote set in the display face reads as somebody actually
 * saying it.
 */
export function Testimonials({ testimonials }: TestimonialsProps) {
  const [lead, ...rest] = testimonials;
  if (!lead) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="bg-bone py-20 lg:py-32">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow rule>In their words</Eyebrow>
            <h2 id="testimonials-heading" className="text-display-sm mt-8 max-w-lg font-display">
              Wearers, not customers
            </h2>
          </div>
          <TextLink href="/reviews">Read all experiences</TextLink>
        </div>

        <div className="mt-14 grid gap-12 border-t border-line pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal as="figure" className="lg:col-span-7">
            <blockquote className="text-[clamp(1.5rem,3.2vw,2.375rem)] font-medium leading-[1.3] tracking-[-0.018em] text-ink">
              <p>“{lead.quote}”</p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="label text-ink">{lead.name}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line" />
              <span className="label text-graphite">{lead.location}</span>
              {productLine(lead.productSlug) ? (
                <>
                  <span aria-hidden="true" className="h-px w-6 bg-line" />
                  <span className="label text-graphite">{productLine(lead.productSlug)}</span>
                </>
              ) : null}
            </figcaption>
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <ul className="space-y-10">
              {rest.slice(0, 2).map((testimonial, index) => (
                <Reveal
                  as="li"
                  key={testimonial.id}
                  delay={0.08 + index * 0.06}
                  className="border-t border-line pt-6 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-6"
                >
                  <figure>
                    {typeof testimonial.rating === "number" ? (
                      <Rating value={testimonial.rating} className="mb-4" />
                    ) : null}
                    <blockquote className="text-[1.0625rem] leading-relaxed text-ink">
                      <p>“{testimonial.quote}”</p>
                    </blockquote>
                    <figcaption className="label mt-5 text-graphite">
                      {testimonial.name} — {testimonial.location}
                      <span aria-hidden="true" className="mx-2 opacity-40">
                        /
                      </span>
                      <time dateTime={testimonial.date}>{formatMonthYear(testimonial.date)}</time>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
