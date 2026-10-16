"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/brand";
import { ShopButton } from "@/components/products/ShopButton";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { Wordmark } from "./Wordmark";

/**
 * Site header — solid white, always.
 *
 * An earlier version floated transparently over dark heroes. It looked
 * considered and behaved badly: it needed a scroll sentinel, a CSS `:has()`
 * rule and a pile of per-page top offsets, and on every page without a dark
 * hero it did nothing. An opaque bar that always looks the same is the more
 * confident answer, and it lets the header be `sticky` — so it takes real
 * space and no page has to offset itself.
 *
 * Nav sits right rather than centred, next to the CTA it belongs with.
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-paper text-ink">
      <Container
        width="wide"
        className="flex h-(--header-height) items-center justify-between gap-8"
      >
        <Wordmark />

        <div className="flex items-center gap-8">
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "link-underline py-2 text-[0.9375rem] font-semibold transition-colors",
                        active ? "link-underline-active text-ink" : "text-graphite hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ShopButton variant="solid" size="sm" className="hidden lg:inline-flex">
              Shop online
            </ShopButton>
            <MobileMenu />
          </div>
        </div>
      </Container>
    </header>
  );
}
