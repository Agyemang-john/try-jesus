import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails, socialLinks } from "@/content/brand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SocialIcon } from "@/components/ui/SocialIcon";

/**
 * The details, as a ruled list.
 *
 * Every block is conditional: nothing is invented to fill a gap, so deleting
 * the address or the phone number from `src/content/brand.ts` removes the row
 * rather than leaving an empty heading.
 */
export function ContactInformation() {
  return (
    <div className="space-y-10">
      <div>
        <Eyebrow rule>Direct</Eyebrow>
        <ul className="mt-6 border-t border-line">
          {contactDetails.email ? (
            <li className="flex items-start gap-4 border-b border-line py-5">
              <Mail aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-graphite" />
              <div>
                <p className="label text-graphite">Email</p>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="link-underline mt-1 block text-[0.9375rem] text-ink"
                >
                  {contactDetails.email}
                </a>
              </div>
            </li>
          ) : null}

          {contactDetails.phone ? (
            <li className="flex items-start gap-4 border-b border-line py-5">
              <Phone aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-graphite" />
              <div>
                <p className="label text-graphite">Telephone</p>
                <a
                  href={contactDetails.phoneHref}
                  className="link-underline mt-1 block text-[0.9375rem] text-ink"
                >
                  {contactDetails.phone}
                </a>
              </div>
            </li>
          ) : null}

          {contactDetails.whatsapp ? (
            <li className="flex items-start gap-4 border-b border-line py-5">
              <SocialIcon platform="whatsapp" className="mt-0.5 size-4 shrink-0 text-graphite" />
              <div>
                <p className="label text-graphite">WhatsApp</p>
                <a
                  href={contactDetails.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-1 block text-[0.9375rem] text-ink"
                >
                  {contactDetails.whatsapp.display}
                </a>
              </div>
            </li>
          ) : null}
        </ul>
      </div>

      {contactDetails.address ? (
        <div>
          <Eyebrow rule>The shop</Eyebrow>
          <div className="mt-6 flex items-start gap-4 border-t border-line py-5">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-graphite" />
            <address className="not-italic">
              <ul className="space-y-1 text-[0.9375rem] text-ink">
                {contactDetails.address.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {contactDetails.address.mapUrl ? (
                <a
                  href={contactDetails.address.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label link-underline mt-4 inline-block text-ink"
                >
                  Open in maps
                </a>
              ) : null}
            </address>
          </div>
        </div>
      ) : null}

      {contactDetails.hours.length > 0 ? (
        <div>
          <Eyebrow rule>Opening hours</Eyebrow>
          <div className="mt-6 flex items-start gap-4 border-t border-line pt-5">
            <Clock aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-graphite" />
            <dl className="w-full">
              {contactDetails.hours.map((entry) => (
                <div
                  key={entry.days}
                  className="flex items-baseline justify-between gap-6 border-b border-line py-2.5 last:border-b-0"
                >
                  <dt className="text-[0.9375rem] text-ink">{entry.days}</dt>
                  <dd className="text-[0.9375rem] text-graphite tabular-nums">{entry.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : null}

      {socialLinks.length > 0 ? (
        <div>
          <Eyebrow rule>Elsewhere</Eyebrow>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5">
            {socialLinks.map((link) => (
              <li key={link.platform}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 py-1 text-graphite transition-colors hover:text-ink"
                >
                  <SocialIcon platform={link.platform} className="size-4" />
                  <span className="label">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
