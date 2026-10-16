import { Container } from "@/components/ui/Container";

/**
 * An honest strip.
 *
 * The copy, photography, reviews and figures on this build are placeholders
 * written to realistic length so the design can be judged — they are not
 * claims about a real business. Rather than bury that in a README, the site
 * says so on every page until the client's own content is in.
 *
 * To remove: set `brand.showDemoNotice` to false in `src/content/brand.ts`.
 */
export function DemoNotice() {
  return (
    <div className="border-b border-paper/15 bg-ink text-paper">
      <Container width="wide" className="flex h-8 items-center justify-center">
        <p className="label text-center text-[0.625rem] text-paper/70">
          <span className="text-paper">Explorer</span>
          <span aria-hidden="true" className="mx-2 opacity-40">
            /
          </span>
          photography and figures
        </p>
      </Container>
    </div>
  );
}
