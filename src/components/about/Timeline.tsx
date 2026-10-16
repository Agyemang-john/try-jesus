import Image from "next/image";
import type { TimelineEntry } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Company history as a ruled ledger rather than a dotted vertical line with
 * circles on it. The year holds the left column, the entry sits right, and the
 * two entries that have photographs break the rhythm — which is what keeps a
 * six-row list from reading as a table.
 */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <section aria-labelledby="history-heading" className="bg-paper py-20 lg:py-32">
      <Container width="wide">
        <div className="max-w-2xl">
          <Eyebrow rule>Our history</Eyebrow>
          <h2 id="history-heading" className="text-display-md mt-8 font-display">
            Seven years, six pieces
          </h2>
        </div>

        <ol className="mt-16 border-t border-line lg:mt-24">
          {entries.map((entry, index) => (
            <Reveal
              as="li"
              key={entry.year}
              delay={index * 0.04}
              className="grid gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
            >
              <p className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-none text-ink lg:col-span-2">
                <time dateTime={entry.year}>{entry.year}</time>
              </p>

              <div className="lg:col-span-5 lg:col-start-4">
                <h3 className="font-display text-2xl leading-tight lg:text-[1.75rem]">
                  {entry.title}
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-graphite">{entry.description}</p>
              </div>

              {entry.image ? (
                <figure className="lg:col-span-3 lg:col-start-10">
                  <div className="relative aspect-4/3 w-full bg-bone">
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, 92vw"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                </figure>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
