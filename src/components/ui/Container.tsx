import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /**
   * `default`  — the standard editorial measure.
   * `wide`     — for image-led and grid sections that want more of the screen.
   * `narrow`   — long-form reading copy.
   * `bleed`    — full width with only the page gutter, for full-bleed imagery.
   */
  width?: "default" | "wide" | "narrow" | "bleed";
};

const WIDTHS = {
  default: "max-w-[1440px]",
  wide: "max-w-[1760px]",
  narrow: "max-w-[860px]",
  bleed: "max-w-none",
} as const;

/**
 * `bleed` drops the gutter here rather than relying on a `px-0` override from
 * the caller. Passing `px-0` in `className` only wins against the base `px-5`
 * — the `sm:`/`lg:`/`xl:` steps are separate variants and survive the merge,
 * so a "full-bleed" section quietly regained its gutter above 640px.
 */
const GUTTER = "px-5 sm:px-8 lg:px-12 xl:px-16";

/**
 * The single horizontal rhythm for the site. The gutter grows with the
 * viewport rather than jumping at breakpoints, which keeps the left-hand
 * alignment of headings consistent from section to section.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        width !== "bleed" && GUTTER,
        WIDTHS[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
