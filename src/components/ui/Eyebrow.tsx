import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Draws a short rule before the text — used to open a major section. */
  rule?: boolean;
};

/**
 * The small uppercase label that opens almost every section. It is the one
 * repeated motif in the layout, which is what lets the sections themselves
 * differ so much without the page falling apart.
 */
export function Eyebrow({ children, className, rule = false }: EyebrowProps) {
  return (
    <p className={cn("label flex items-center gap-3 text-ink", className)}>
      {rule ? <span aria-hidden="true" className="h-0.5 w-7 bg-current" /> : null}
      <span>{children}</span>
    </p>
  );
}
