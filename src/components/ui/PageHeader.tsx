import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Supplied on image-led openers. */
  image?: ImageAsset;
  /** Extra content under the lead — a count, a filter row, a call to action. */
  children?: ReactNode;
  className?: string;
};

/**
 * The opener for every page except the homepage.
 *
 * Two forms deliberately, so the site does not repeat one masthead five times:
 *  · Typographic — off-white, generous, type only.
 *  · Image-led — a photograph under a flat ink wash, matching the hero's
 *    treatment so the two read as the same system.
 *
 * Neither needs a top offset any more: the header is sticky, so it occupies
 * real space in the flow.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
  children,
  className,
}: PageHeaderProps) {
  if (image) {
    return (
      <section className={cn("on-ink relative isolate bg-ink text-paper", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/60" />

        <Container
          width="wide"
          className="flex min-h-[22rem] flex-col justify-end py-16 lg:min-h-[28rem] lg:py-20"
        >
          <Eyebrow className="text-paper/75">{eyebrow}</Eyebrow>
          <h1 className="text-display-lg mt-5 max-w-4xl font-display">{title}</h1>
          {lead ? (
            <p className="text-body mt-5 max-w-2xl text-paper/85">{lead}</p>
          ) : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </Container>
      </section>
    );
  }

  return (
    <section className={cn("border-b border-line bg-bone", className)}>
      <Container width="wide" className="py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow rule>{eyebrow}</Eyebrow>
            <h1 className="text-display-lg mt-5 font-display">{title}</h1>
          </div>
          {lead ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="text-body max-w-md text-graphite">{lead}</p>
            </div>
          ) : null}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </section>
  );
}
