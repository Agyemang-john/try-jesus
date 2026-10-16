import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ActionVariant = "solid" | "outline" | "ghost" | "inverse";
export type ActionSize = "sm" | "md" | "lg";

/**
 * Buttons.
 *
 * Two decisions do most of the work here:
 *
 *  · **Pill shape.** Structural elements on this site are square; controls are
 *    not. A filled pill reads as a thing you press, where a hairline rectangle
 *    reads as a caption with a border around it.
 *  · **Sentence-case labels at 15px/600.** The label was previously 11px caps
 *    at 0.18em tracking. That is an editorial eyebrow, not a button — it is
 *    the detail that made every call to action feel weightless.
 *
 * Borders are 2px so an outline button has the same visual mass as a filled
 * one sitting next to it.
 */
const BASE =
  "group/action inline-flex items-center justify-center gap-2 rounded-(--radius-pill) border-2 text-center align-middle font-semibold leading-none transition-[background-color,border-color,color,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-45";

const VARIANTS: Record<ActionVariant, string> = {
  solid: "border-ink bg-ink text-paper hover:border-charcoal hover:bg-charcoal",
  outline: "border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
  /* No shape at all — for the third option in a row, where a third pill would
     flatten the hierarchy. */
  ghost: "border-transparent bg-transparent text-ink hover:text-graphite",
  /* The filled treatment, flipped, for ink-coloured sections. */
  inverse: "border-paper bg-paper text-ink hover:bg-transparent hover:text-paper",
};

const SIZES: Record<ActionSize, string> = {
  sm: "px-5 py-2.5 text-[0.875rem]",
  md: "px-7 py-3.5 text-[0.9375rem]",
  lg: "px-9 py-4 text-[1rem]",
};

/** Ghost has no fill, so it needs its own rhythm to sit on the same baseline. */
const GHOST_SIZES: Record<ActionSize, string> = {
  sm: "px-1 py-2.5 text-[0.875rem]",
  md: "px-1 py-3.5 text-[0.9375rem]",
  lg: "px-1 py-4 text-[1rem]",
};

export function actionClasses(
  variant: ActionVariant = "solid",
  size: ActionSize = "md",
  className?: string,
) {
  return cn(
    BASE,
    VARIANTS[variant],
    variant === "ghost" ? GHOST_SIZES[size] : SIZES[size],
    className,
  );
}

/** The arrow that slides on hover. Shared so the motion is identical everywhere. */
export function ActionArrow({ external = false }: { external?: boolean }) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden="true"
      strokeWidth={2.25}
      className={cn(
        "size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)]",
        external
          ? "group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5"
          : "group-hover/action:translate-x-1",
      )}
    />
  );
}

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
  /** Renders an outward arrow and opens in a new tab with safe rel. */
  external?: boolean;
  withArrow?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

export function ActionLink({
  href,
  children,
  variant = "solid",
  size = "md",
  className,
  external = false,
  withArrow = true,
  ...rest
}: ActionLinkProps) {
  const classes = actionClasses(variant, size, className);
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ActionArrow external={external} /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

type ActionButtonProps = {
  children: ReactNode;
  variant?: ActionVariant;
  size?: ActionSize;
  withArrow?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function ActionButton({
  children,
  variant = "solid",
  size = "md",
  className,
  withArrow = false,
  type = "button",
  ...rest
}: ActionButtonProps) {
  return (
    <button type={type} className={actionClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {withArrow ? <ActionArrow /> : null}
    </button>
  );
}

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  withArrow?: boolean;
};

/**
 * The quieter call to action: a bold label with a rule that draws in on hover.
 * Used where a pill would shout over the layout — but still set at reading
 * size and weight rather than as micro-type.
 */
export function TextLink({
  href,
  children,
  className,
  external = false,
  withArrow = true,
}: TextLinkProps) {
  const classes = cn(
    "group/action inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ink transition-opacity hover:opacity-70",
    className,
  );
  const content = (
    <>
      <span className="link-underline">{children}</span>
      {withArrow ? <ActionArrow external={external} /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
