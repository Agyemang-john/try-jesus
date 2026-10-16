import type { BrandValue } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Brand values as a two-column ledger.
 *
 * The homepage already sets these as full-width ruled rows on ink, so this
 * version is deliberately different — paired columns on off-white — rather
 * than the same component used twice.
 */
export function Values({ values }: { values: BrandValue[] }) {
  if (values.length === 0) return null;

  return (
    <section aria-labelledby="values-heading" className="bg-bone py-20 lg:py-28">
      <Container width="wide">
        <div className="max-w-2xl">
          <Eyebrow rule>What we hold to</Eyebrow>
          <h2 id="values-heading" className="text-display-md mt-8 font-display">
            Five things we will not trade away
          </h2>
        </div>

        <ul className="mt-16 grid gap-x-12 gap-y-12 border-t border-line pt-12 md:grid-cols-2 lg:mt-20 lg:gap-x-20">
          {values.map((value, index) => (
            <Reveal as="li" key={value.index} delay={(index % 2) * 0.06}>
              <p className="label text-graphite tabular-nums">{value.index}</p>
              <h3 className="mt-4 font-display text-2xl leading-tight lg:text-[1.75rem]">
                {value.title}
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-graphite">{value.description}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
