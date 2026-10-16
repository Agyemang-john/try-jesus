import type { ReactNode } from "react";
import { contactDetails } from "@/content/brand";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

type LegalSection = {
  heading: string;
  /** What this section has to cover. Written as guidance, not as policy. */
  summary: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: LegalSection[];
  children?: ReactNode;
};

/**
 * Shared shell for the privacy and terms routes.
 *
 * These pages ship as an outline rather than as text, and say so at the top.
 * Legal copy has to come from the client's own counsel and reflect the
 * jurisdictions they actually trade in, the processors they actually use and
 * the retention periods they actually keep — none of which can be guessed
 * from the outside. Inventing plausible-sounding policy would be the single
 * most harmful thing this build could do.
 *
 * Replace the `summary` of each section with real copy and delete the notice.
 */
export function LegalPage({ eyebrow, title, lead, sections, children }: LegalPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />

      <section className="bg-paper py-16 lg:py-24">
        <Container width="narrow">
          <div className="border border-ink bg-bone p-6 lg:p-8">
            <p className="label text-ink">Awaiting legal copy</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-graphite">
              This page is an outline of the sections this policy needs, not the
              policy itself. The final wording has to come from the brand&rsquo;s own
              legal advice — it depends on where they trade, which processors they
              use and how long they keep what. Until then nothing here should be
              treated as a statement of practice.
            </p>
          </div>

          <div className="mt-14 space-y-12">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <p className="label text-graphite tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-2xl leading-tight lg:text-[1.75rem]">
                  {section.heading}
                </h2>
                <p className="mt-4 leading-relaxed text-graphite">{section.summary}</p>
              </section>
            ))}
          </div>

          {children}

          <div className="mt-16 border-t border-line pt-8">
            <p className="text-[0.9375rem] leading-relaxed text-graphite">
              Questions in the meantime go to{" "}
              <a href={`mailto:${contactDetails.email}`} className="link-underline text-ink">
                {contactDetails.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
