import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Terms of Service",
    description: "The terms that apply to using the Try Jesus website.",
    path: "/terms",
  }),
  /* Not indexed while it is an outline rather than a policy. */
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      lead="The terms that apply to this website. Purchases are governed by the terms of the store that takes the order."
      sections={[
        {
          heading: "What this website is",
          summary:
            "State plainly that this site presents the brand and its products and does not sell them — orders, payment, shipping, returns and consumer rights all sit with the external store, under that store's own terms.",
        },
        {
          heading: "Accuracy of product information",
          summary:
            "Fabric weights, fits and measurements are described in good faith. Say how variation between garments and dye lots is handled, and which source prevails if this site and the store disagree.",
        },
        {
          heading: "Links to the external store",
          summary:
            "Identify the authorised store by name and URL, and state that leaving this site means the other party's terms and privacy policy take over.",
        },
        {
          heading: "Intellectual property",
          summary:
            "Cover the wordmark, product photography, and written copy. Note separately that customer photographs remain the property of the people who took them and are published with permission.",
        },
        {
          heading: "Customer submissions",
          summary:
            "Set out what rights someone grants by sending in a photograph or a review, how credit works, and how they can ask for it to be taken down.",
        },
        {
          heading: "Liability",
          summary:
            "Must be drafted by counsel and must not purport to exclude liability that cannot lawfully be excluded from consumers in the jurisdictions the brand trades in.",
        },
        {
          heading: "Governing law",
          summary:
            "Name the governing law and the forum for disputes — Georgia law and the Atlanta courts for a business based there, subject to mandatory consumer protections wherever buyers are.",
        },
      ]}
    />
  );
}
