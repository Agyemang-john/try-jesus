import type { Metadata } from "next";
import { founder, statistics, timeline, values } from "@/content/about";
import { FounderNote } from "@/components/about/FounderNote";
import { MissionVision } from "@/components/about/MissionVision";
import { Statistics } from "@/components/about/Statistics";
import { Story } from "@/components/about/Story";
import { Timeline } from "@/components/about/Timeline";
import { Values } from "@/components/about/Values";
import { ShopButton } from "@/components/products/ShopButton";
import { ActionLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Try Jesus is a faith and renewal clothing brand based in Ghana — limited ready-to-wear collections and custom designs, shipping faith-forward style worldwide.",
  path: "/about",
  image: { src: "/images/brand/about-hero.jpg", alt: "Try Jesus faith and renewal clothing" },
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Try Jesus"
        title="Voice of the ONE"
        lead="Try Jesus is a faith and renewal clothing brand built on the idea that what you wear can carry a message. Every piece is designed to start conversations, inspire hope, and remind people to try faith first."
        image={{
          src: "/images/brand/about-hero.jpg",
          alt: "Try Jesus faith and renewal clothing",
          width: 2400,
          height: 1350,
        }}
      />

      <Story />
      <Statistics statistics={statistics} />
      <Timeline entries={timeline} />
      <MissionVision />
      <Values values={values} />
      <FounderNote founder={founder} />

      <section className="border-t border-line bg-bone py-16 lg:py-24">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow rule>Next</Eyebrow>
              <p className="text-display-sm mt-8 max-w-2xl font-display">
                Wear the message. Have a look at the collection.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:col-span-4 lg:col-start-9">
              <ActionLink href="/products" variant="solid" size="md">
                See the range
              </ActionLink>
              <ShopButton variant="outline" size="md">
                Shop online
              </ShopButton>
            </div>
          </div>
        </Container>
      </section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
