import Image from "next/image";
import { mission, vision } from "@/content/about";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Mission and vision, split across a full-bleed plate.
 *
 * Mission sits on ink above the image and vision sits on paper below it, so
 * the two statements are clearly a pair without being two matching boxes side
 * by side.
 */
export function MissionVision() {
  return (
    <>
      <section aria-labelledby="mission-heading" className="on-ink bg-ink py-20 text-paper lg:py-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow rule className="text-ash">
                {mission.label}
              </Eyebrow>
              <h2 id="mission-heading" className="text-display-sm mt-8 font-display">
                {mission.heading}
              </h2>
            </div>
            <Reveal className="lg:col-span-7 lg:col-start-6">
              <p className="text-lg leading-relaxed text-ash sm:text-xl lg:text-[1.375rem] lg:leading-[1.55]">
                {mission.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="relative aspect-3/2 w-full sm:aspect-21/9">
        <Image
          src="/images/brand/atelier.jpg"
          alt="The Try Jesus shop in Atlanta"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      <section aria-labelledby="vision-heading" className="bg-paper py-20 lg:py-28">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Eyebrow rule>{vision.label}</Eyebrow>
              <h2 id="vision-heading" className="text-display-sm mt-8 font-display">
                {vision.heading}
              </h2>
            </div>
            <Reveal className="lg:col-span-7 lg:col-start-6">
              <p className="text-lg leading-relaxed text-ink sm:text-xl lg:text-[1.375rem] lg:leading-[1.55]">
                {vision.body}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
