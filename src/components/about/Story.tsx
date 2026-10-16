import Image from "next/image";
import { story } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * How the shop started.
 *
 * The lead paragraph is set at display scale and the body runs in a narrow
 * measure beside a tall plate — an editorial opening rather than three
 * paragraphs at full width.
 */
export function Story() {
  return (
    <section aria-labelledby="story-heading" className="bg-paper py-20 lg:py-32">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow rule>{story.label}</Eyebrow>
            <h2 id="story-heading" className="text-display-md mt-8 max-w-2xl font-display">
              {story.heading}
            </h2>

            <Reveal>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl lg:text-[1.375rem] lg:leading-[1.55]">
                {story.lead}
              </p>

              <div className="mt-8 max-w-xl space-y-6 leading-relaxed text-graphite">
                {story.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal variant="fade" className="lg:col-span-4 lg:col-start-9">
            <figure>
              <div className="relative aspect-4/5 w-full bg-bone">
                <Image
                  src="/images/brand/materials.jpg"
                  alt="Cotton fabric on the cutting table"
                  fill
                  sizes="(min-width: 1024px) 32vw, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="label mt-4 text-graphite">
                Blanks waiting to go on the press
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
