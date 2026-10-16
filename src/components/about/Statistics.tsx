import { brand } from "@/content/brand";
import type { Statistic } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * Brand figures.
 *
 * Two rules this component enforces rather than trusts:
 *
 *  1. An empty array renders nothing. A brand with no numbers worth printing
 *     should have no statistics band, not four zeroes.
 *  2. Any entry flagged `placeholder` is drawn with a dotted rule under the
 *     figure and the section carries a footnote saying the numbers are not
 *     confirmed. Unverified figures are the easiest thing on a brand site to
 *     accidentally turn into a claim, so the component refuses to present
 *     them as settled.
 *
 * Remove the flags in `src/content/about.ts` once the client supplies figures
 * they can stand behind, and the footnote disappears with them.
 */
export function Statistics({ statistics }: { statistics: Statistic[] }) {
  if (statistics.length === 0) return null;

  const hasPlaceholders = statistics.some((statistic) => statistic.placeholder);

  return (
    <section aria-labelledby="statistics-heading" className="border-y border-line bg-bone py-16 lg:py-20">
      <Container width="wide">
        <h2 id="statistics-heading" className="sr-only">
          {brand.name} in numbers
        </h2>

        <dl className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic) => (
            <div key={statistic.label} className="lg:border-r lg:border-line lg:px-8 lg:first:pl-0 lg:last:border-r-0">
              <dd
                className={cn(
                  "font-display text-[clamp(2.5rem,5vw,4rem)] leading-none text-ink",
                  statistic.placeholder && "border-b border-dashed border-ash pb-2",
                )}
              >
                {statistic.value}
              </dd>
              <dt className="label mt-4 text-graphite">{statistic.label}</dt>
            </div>
          ))}
        </dl>

        {hasPlaceholders ? (
          <p className="mt-12 max-w-xl border-t border-line pt-5 text-xs leading-relaxed text-graphite">
            Figures marked with a dashed rule are placeholders awaiting confirmation
            and should not be read as verified claims.
          </p>
        ) : null}
      </Container>
    </section>
  );
}
