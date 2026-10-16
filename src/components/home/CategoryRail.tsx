import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ordinal } from "@/lib/utils";

type CategoryRailProps = {
  categories: Array<Category & { count: number }>;
};

/**
 * Collections, as a staggered rail.
 *
 * Alternate tiles drop by a sixth of their height on wide screens. It is a
 * small thing, but it is the difference between a row of four tiles and a
 * composition.
 */
export function CategoryRail({ categories }: CategoryRailProps) {
  if (categories.length === 0) return null;

  return (
    <section aria-labelledby="categories-heading" className="bg-bone py-20 lg:py-28">
      <Container width="wide">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <Eyebrow>Collections</Eyebrow>
            <h2 id="categories-heading" className="text-display-sm mt-5 font-display">
              Four ways into the range
            </h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-graphite">
            A short range, grouped by what the piece is for rather than by what
            season it arrived in.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {categories.map((category, index) => (
            <Reveal
              as="li"
              key={category.id}
              delay={index * 0.06}
              className={index % 2 === 1 ? "lg:mt-16" : undefined}
            >
              <Link
                href={`/products?collection=${category.id}`}
                data-underline-group
                className="group block focus-visible:outline-offset-4"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-bone-deep">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl leading-none">
                    <span className="link-underline-group">{category.name}</span>
                  </h3>
                  <span className="label text-graphite tabular-nums">{ordinal(index)}</span>
                </div>

                <p className="mt-3 text-[0.9375rem] leading-relaxed text-graphite">
                  {category.description}
                </p>
                <p className="label mt-4 text-graphite">
                  {category.count} {category.count === 1 ? "piece" : "pieces"}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
