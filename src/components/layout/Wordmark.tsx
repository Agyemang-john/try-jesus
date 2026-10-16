import Link from "next/link";
import { brand } from "@/content/brand";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Adds the city / established lockup beneath. Footer and menu use it. */
  withLockup?: boolean;
};

/**
 * The brand signature.
 *
 * Set heavy and tight rather than letterspaced. Wide tracking on a wordmark
 * reads as a fashion masthead; a real product brand's logotype is a compact,
 * high-contrast shape you can recognise at a glance in a browser tab.
 *
 * Replace the text with an <Image> or inline SVG when a drawn logotype
 * arrives — the layout assumes a wide, short mark, so keep the ratio close.
 */
export function Wordmark({ className, withLockup = false }: WordmarkProps) {
  return (
    <Link
      href="/"
      className={cn("group/mark inline-flex flex-col leading-none", className)}
      aria-label={`${brand.name} — home`}
    >
      <span className="text-[1.25rem] font-extrabold tracking-[-0.01em] lg:text-[1.375rem]">
        {brand.wordmark}
      </span>
      {withLockup ? (
        <span className="mt-2 text-[0.8125rem] font-medium opacity-60">
          {brand.city} · Est. {brand.foundedYear}
        </span>
      ) : null}
    </Link>
  );
}
