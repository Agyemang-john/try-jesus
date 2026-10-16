import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingProps = {
  /** 1–5. Callers should omit the component entirely rather than pass 0. */
  value: number;
  className?: string;
};

/**
 * A rating a single customer gave. The site never aggregates these into an
 * overall score, and the marks are drawn small on purpose — the sentence
 * matters more than the stars.
 */
export function Rating({ value, className }: RatingProps) {
  const rounded = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span className="sr-only">{`Rated ${rounded} out of 5 by this customer`}</span>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          strokeWidth={1.25}
          className={cn(
            "size-3.5",
            index < rounded ? "fill-current text-ink" : "text-ash",
          )}
        />
      ))}
    </div>
  );
}
