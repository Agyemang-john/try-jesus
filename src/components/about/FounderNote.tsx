import Image from "next/image";
import type { Founder } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The founder section.
 *
 * Portrait left, words right, signed at the bottom. Kept to one person and one
 * short biography — a grid of team headshots is the fastest way to make a
 * six-person shop look like a stock photo library.
 *
 * Delete the usage in `app/about/page.tsx` if the client would rather not have
 * a named face on the site.
 */
export function FounderNote({ founder }: { founder: Founder }) {
  return (
    <section aria-labelledby="founder-heading" className="bg-paper py-20 lg:py-32">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="fade" className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full bg-bone">
              <Image
                src={founder.image.src}
                alt={founder.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <Eyebrow rule>The founder</Eyebrow>
            <h2 id="founder-heading" className="text-display-sm mt-8 font-display">
              {founder.name}
            </h2>
            <p className="label mt-4 text-graphite">{founder.role}</p>

            <Reveal>
              <div className="mt-8 max-w-xl space-y-6 leading-relaxed text-ink">
                {founder.biography.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {/* No faux italic: only upright weights of the family are loaded,
                and a synthesised slant on a geometric sans looks like a bug.
                The sign-off is set as a signature block instead. */}
            {founder.signature ? (
              <div className="mt-10 flex items-center gap-4">
                <span aria-hidden="true" className="h-0.5 w-10 bg-ink" />
                <p className="text-2xl font-bold tracking-[-0.02em] text-ink">
                  {founder.signature}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
