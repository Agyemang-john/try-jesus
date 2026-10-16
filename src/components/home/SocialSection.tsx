import { socialLinks } from "@/content/brand";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ordinal } from "@/lib/utils";

/**
 * Social, as a directory rather than a row of circular icon buttons.
 *
 * Each platform gets a full-width row with its handle, because the useful
 * information is "which account is this" — not "here is a logo".
 *
 * If an Instagram feed is integrated later, drop the component in beneath this
 * list and keep the directory: the API can go down, and the links should not.
 * Nothing here scrapes a social platform.
 */
export function SocialSection() {
  if (socialLinks.length === 0) return null;

  return (
    <section aria-labelledby="social-heading" className="bg-bone py-20 lg:py-28">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow rule>Connect with us</Eyebrow>
            <h2 id="social-heading" className="text-display-sm mt-8 font-display">
              Follow the journey
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-graphite">
              Work in progress, finished runs and the occasional misprint, posted
              from the press in Atlanta.
            </p>
          </div>

          <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
            {socialLinks.map((link, index) => (
              <Reveal as="li" key={link.platform} delay={index * 0.04}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-underline-group
                  className="group flex items-center gap-5 border-b border-line py-5 transition-colors hover:bg-paper"
                >
                  <span className="label w-6 shrink-0 text-graphite tabular-nums">
                    {ordinal(index)}
                  </span>
                  <SocialIcon
                    platform={link.platform}
                    className="size-5 shrink-0 text-ink opacity-70 transition-opacity group-hover:opacity-100"
                  />
                  <span className="flex-1 font-display text-xl leading-none">
                    <span className="link-underline-group">{link.label}</span>
                  </span>
                  <span className="hidden text-sm text-graphite sm:block">{link.handle}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
