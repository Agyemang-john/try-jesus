import { values } from "@/content/about";
import { TextLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The one purely typographic section on the homepage.
 *
 * There is no photograph here by design. After two image-led sections the page
 * needs a beat that is only words, and a dark band is what separates the
 * "look at these" half of the page from the "here is who made them" half.
 */
export function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="on-ink bg-ink py-24 text-paper lg:py-36"
    >
      <Container width="wide">
        <Reveal>
          <Eyebrow rule className="text-ash">
            What we hold to
          </Eyebrow>
          <h2
            id="manifesto-heading"
            className="text-display-lg mt-10 max-w-5xl font-display text-paper"
          >
            If it cannot be restocked, we do not make it.
          </h2>
        </Reveal>

        <dl className="mt-20 border-t border-paper/15 lg:mt-28">
          {values.map((value, index) => (
            <Reveal
              key={value.index}
              delay={index * 0.04}
              className="grid gap-4 border-b border-paper/15 py-8 lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:py-10"
            >
              <span className="label text-ash tabular-nums lg:col-span-1">{value.index}</span>
              <dt className="font-display text-2xl leading-tight lg:col-span-4 lg:text-[1.75rem]">
                {value.title}
              </dt>
              <dd className="max-w-xl leading-relaxed text-ash lg:col-span-6 lg:col-start-7">
                {value.description}
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-12">
          <TextLink href="/about" className="text-paper hover:opacity-70">
            Read the full story
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
