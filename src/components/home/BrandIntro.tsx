import Image from "next/image";
import { brand } from "@/content/brand";
import { standards } from "@/content/about";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The brand in one screen, immediately after the hero.
 *
 * Asymmetric on purpose: the label and headline hold the left third and the
 * prose sits right of centre, which stops this reading as another centred
 * hero and sets up the off-axis rhythm the rest of the page uses.
 */
export function BrandIntro() {
  return (
    <section aria-labelledby="brand-intro-heading" className="bg-paper py-20 lg:py-32">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow rule>About the brand</Eyebrow>
              <h2 id="brand-intro-heading" className="text-display-md mt-8 max-w-md font-display">
                A print shop, not a label
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.08}>
              <p className="text-lg leading-relaxed text-ink sm:text-xl lg:text-[1.375rem] lg:leading-[1.55]">
                {brand.introduction}
              </p>
              <p className="mt-6 max-w-xl leading-relaxed text-graphite">
                We print every garment ourselves, on our own press, in water-based
                ink that goes into the fabric rather than sitting on top of it.
                That is slower and dearer, and it is why the print outlives the
                shirt instead of peeling off it.
              </p>
              <div className="mt-10">
                <TextLink href="/about">Discover our story</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Full-bleed plate with the standing commitments set beneath it as a
          hairline table, rather than four more boxes. */}
      <Reveal variant="fade" className="mt-16 lg:mt-24">
        <Container width="bleed">
          <div className="relative aspect-3/2 w-full sm:aspect-21/9">
            <Image
              src="/images/brand/workshop-wide.jpg"
              alt="The Try Jesus print room in Atlanta"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </Reveal>

      <Container width="wide" className="mt-10 lg:mt-14">
        <dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((item) => (
            <div
              key={item.label}
              className="border-b border-line py-6 pr-8 lg:border-b-0 lg:border-r lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
            >
              <dt className="label text-graphite">{item.label}</dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
