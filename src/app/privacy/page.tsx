import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Privacy Policy",
    description:
      "How Try Jesus handles the information you send through this website.",
    path: "/privacy",
  }),
  /* Not indexed while it is an outline rather than a policy. Remove this once
     the real copy is in place. */
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lead="What this site collects, why, and what happens to it afterwards."
      sections={[
        {
          heading: "What this site collects",
          summary:
            "Must list exactly what the contact form takes — name, email, optional phone, subject, optional product and reference, and the message — plus anything the hosting platform logs, such as IP addresses in server logs.",
        },
        {
          heading: "Why we collect it",
          summary:
            "State the lawful basis for each purpose. For an enquiry form this is normally the legitimate interest in answering the person who wrote in, or the steps taken before entering a contract.",
        },
        {
          heading: "Who else sees it",
          summary:
            "Name every processor the data actually passes through: the host, the email provider wired into the contact route, and any CRM. If a processor is outside the EEA, say so and name the transfer mechanism.",
        },
        {
          heading: "How long it is kept",
          summary:
            "Give a real retention period for enquiry emails and say what triggers deletion. 'As long as necessary' is not a retention period.",
        },
        {
          heading: "Cookies and measurement",
          summary:
            "This build sets no cookies and runs no analytics. If either is added later, this section and a consent mechanism both become mandatory in the EEA and the UK.",
        },
        {
          heading: "Your rights",
          summary:
            "Depends where buyers are. A US brand selling into California, Colorado, Virginia and similar states owes access, deletion and opt-out rights under those statutes; selling into the UK or EEA brings the GDPR set and a named supervisory authority. Counsel decides which regimes apply and the page must name them.",
        },
        {
          heading: "Changes to this policy",
          summary:
            "Say how changes are communicated and carry a 'last updated' date once the real policy is published.",
        },
      ]}
    />
  );
}
