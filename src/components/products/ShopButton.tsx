import { ActionLink, type ActionSize, type ActionVariant } from "@/components/ui/Action";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type ShopButtonProps = {
  /** Forwarded to the anchor, so the header can target its CTA from CSS. */
  "data-header-cta"?: boolean;
  /** Defaults to the site-wide store. Pass a product's own URL to override. */
  href?: string;
  children?: string;
  variant?: ActionVariant;
  size?: ActionSize;
  className?: string;
  /**
   * Prints the hand-off note under the button. Use it wherever the click is a
   * committing one — the product page, the hero — so nobody expects to check
   * out here.
   */
  withNote?: boolean;
  noteClassName?: string;
};

/**
 * Every route to the external store goes through this component.
 *
 * Two reasons it exists. First, the URL lives in one place
 * (`NEXT_PUBLIC_SHOP_URL`), so moving platforms is an env change rather than a
 * find-and-replace. Second, the wording is consistent: the label always says
 * "shop", never "buy now" in a way that implies this page takes the order, and
 * the link always opens in a new tab so the visitor keeps their place.
 */
export function ShopButton({
  href,
  children = "Shop the collection",
  variant = "solid",
  size = "md",
  className,
  withNote = false,
  noteClassName,
  ...rest
}: ShopButtonProps) {
  const button = (
    <ActionLink
      href={href ?? siteConfig.shopUrl}
      external
      variant={variant}
      size={size}
      className={className}
      {...rest}
    >
      {children}
    </ActionLink>
  );

  if (!withNote) return button;

  return (
    <div className="flex flex-col items-start gap-3">
      {button}
      <p className={cn("max-w-xs text-xs leading-relaxed text-graphite", noteClassName)}>
        {siteConfig.shopHandoffNote}
      </p>
    </div>
  );
}
