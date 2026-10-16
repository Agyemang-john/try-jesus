import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/types";
import { getCategoryName } from "@/lib/content";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  /** Controls the type scale, not the image ratio. */
  size?: "sm" | "md" | "lg";
  /** `sizes` for the image. Pass the real layout width — it is not guessable. */
  imageSizes: string;
  priority?: boolean;
  className?: string;
};

const NAME_SIZES = {
  sm: "text-[1.25rem]",
  md: "text-[1.4375rem] lg:text-[1.625rem]",
  lg: "text-display-sm",
} as const;

/**
 * A product in a grid or a rail. Not a card: no border, no shadow, no panel —
 * the image is the object and the type sits under it, the way a printed
 * catalogue sets it.
 *
 * The hover cross-fades to the second photograph, which is why every product
 * needs at least two images.
 */
export function ProductCard({
  product,
  size = "md",
  imageSizes,
  priority = false,
  className,
}: ProductCardProps) {
  const [primary, secondary] = product.images;
  if (!primary) return null;

  return (
    <article data-underline-group className={cn("group/card", className)}>
      <Link href={`/products/${product.slug}`} className="block focus-visible:outline-offset-4">
        <div className="relative aspect-4/5 w-full overflow-hidden bg-bone">
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            sizes={imageSizes}
            priority={priority}
            className={cn(
              "object-cover transition-all duration-[900ms] ease-[var(--ease-editorial)]",
              "group-hover/card:scale-[1.03]",
              secondary && "group-hover/card:opacity-0",
            )}
          />
          {secondary ? (
            <Image
              src={secondary.src}
              alt=""
              aria-hidden="true"
              fill
              sizes={imageSizes}
              loading="lazy"
              className="scale-[1.03] object-cover opacity-0 transition-opacity duration-[900ms] ease-[var(--ease-editorial)] group-hover/card:opacity-100"
            />
          ) : null}

          {product.isNew ? (
            <p className="label absolute left-4 top-4 rounded-(--radius-pill) bg-ink px-3.5 py-2 text-paper">
              New
            </p>
          ) : null}
        </div>

        <div className="mt-5">
          <div className="label flex items-baseline justify-between gap-4 text-ink/55">
            <span>{getCategoryName(product.category)}</span>
            <span className="tabular-nums">{product.productNumber}</span>
          </div>

          <h3 className={cn("mt-3 font-display leading-tight", NAME_SIZES[size])}>
            {product.name}
          </h3>

          <p className="mt-2.5 max-w-sm text-[1rem] leading-relaxed text-graphite">
            {product.shortDescription}
          </p>

          <span className="link-underline-group mt-4 text-[0.9375rem] font-semibold text-ink">
            View product
          </span>
        </div>
      </Link>
    </article>
  );
}
