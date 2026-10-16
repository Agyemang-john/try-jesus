import Image from "next/image";
import type { Metadata } from "next";
import { contactDetails } from "@/content/brand";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInformation } from "@/components/contact/ContactInformation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Sizing, an order, a wholesale enquiry or the press — reach the Try Jesus shop in Atlanta.",
  path: "/contact",
});

export default function ContactPage() {
  const products = getProducts().map((product) => ({
    slug: product.slug,
    name: product.name,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the shop"
        lead={contactDetails.responseTime}
      />

      <section aria-labelledby="contact-form-heading" className="bg-paper py-16 lg:py-24">
        <Container width="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <h2 id="contact-form-heading" className="text-display-sm font-display">
                Send a message
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-graphite">
                Sizing, an order, fabric questions, wholesale — whatever it is, a
                person at the press reads it.
              </p>

              <div className="mt-12">
                <ContactForm products={products} />
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Contact details">
              <ContactInformation />
            </aside>
          </div>
        </Container>
      </section>

      {/* A photograph and a plain link, rather than an embedded map: no
          third-party iframe, no tracking cookies, no consent banner. */}
      <section aria-labelledby="visit-heading" className="border-t border-line bg-bone">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-4/3 lg:aspect-auto lg:min-h-[28rem]">
            <Image
              src="/images/brand/contact.jpg"
              alt="The Try Jesus shop front"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              loading="lazy"
              className="object-cover"
            />
          </div>

          {/* Explicit padding, matching the split-screen treatment used by the
              homepage hand-off rather than the shared symmetric container. */}
          <div className="flex items-center py-16 lg:py-24">
            <div className="w-full max-w-xl px-5 sm:px-8 lg:pl-16 lg:pr-12 xl:pl-24 xl:pr-16">
              <Eyebrow rule>Visit</Eyebrow>
              <h2 id="visit-heading" className="text-display-sm mt-8 font-display">
                There is a window onto the press
              </h2>
              <p className="mt-6 leading-relaxed text-graphite">
                The shop is street level on {contactDetails.address.lines[0]}. You are
                welcome to come and watch a run — no appointment, though a
                message first means someone will be free to talk.
              </p>
              <a
                href={contactDetails.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="label link-underline mt-8 inline-block text-ink"
              >
                Find us on the map
              </a>
            </div>
          </div>
        </div>
      </section>

      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
