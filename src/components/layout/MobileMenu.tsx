"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { brand, contactDetails, primaryNav, socialLinks } from "@/content/brand";
import { ShopButton } from "@/components/products/ShopButton";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ordinal } from "@/lib/utils";

/**
 * Full-screen navigation for small viewports.
 *
 * Not a shrunken desktop menu: the links are set at display scale with their
 * descriptions, because on a phone this panel is the whole of the site's
 * navigation and there is room to say what each destination is.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* A client-side route change does not unmount this panel, so each link
     closes it on the way out. Done on the click rather than in an effect
     watching `pathname`, which would be a cascading render. */
  const close = () => setOpen(false);

  /* The panel is `lg:hidden`. Without this, widening the window past the
     desktop breakpoint with the menu open would hide it while Radix kept the
     focus trap and scroll lock active — an invisible modal you cannot escape
     by clicking. Closing on the breakpoint change avoids that. */
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="-mr-2 flex size-11 items-center justify-center transition-opacity hover:opacity-60 lg:hidden"
        aria-label="Open menu"
      >
        {/* Inherits the header's colour, which the overlay rules in
            globals.css flip to paper over a dark hero. */}
        <Menu aria-hidden="true" strokeWidth={1.5} className="size-6 text-current" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fade-in fixed inset-0 z-50 bg-ink/40 lg:hidden" />
        <Dialog.Content
          className="on-ink fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-paper focus:outline-none lg:hidden"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <div className="flex items-center justify-between border-b border-paper/15 px-5 py-4">
            <span className="text-[1.25rem] font-extrabold tracking-[-0.01em]">
              {brand.wordmark}
            </span>
            <Dialog.Close
              className="-mr-2 flex size-11 items-center justify-center transition-opacity hover:opacity-60"
              aria-label="Close menu"
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
            </Dialog.Close>
          </div>

          <nav aria-label="Main" className="flex-1 px-5 py-2">
            <ul>
              {[{ label: "Home", href: "/", description: "Back to the start" }, ...primaryNav].map(
                (item, index) => {
                  const active =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <li key={item.href} className="border-b border-paper/10">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={close}
                        className="flex items-baseline gap-5 py-6 transition-opacity hover:opacity-60"
                      >
                        <span className="label w-6 shrink-0 text-paper/35">{ordinal(index)}</span>
                        <span className="flex-1">
                          <span className="block text-[1.875rem] font-bold leading-none tracking-[-0.025em]">
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="mt-2 block text-sm text-paper/50">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                        {active ? (
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-paper" />
                        ) : null}
                      </Link>
                    </li>
                  );
                },
              )}
            </ul>
          </nav>

          <div className="px-5 pb-10 pt-6">
            <ShopButton variant="inverse" size="lg" className="w-full" withNote />

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-1 text-paper/60 transition-colors hover:text-paper"
                >
                  <SocialIcon platform={link.platform} className="size-4" />
                  <span className="label">{link.label}</span>
                </a>
              ))}
            </div>

            <a
              href={`mailto:${contactDetails.email}`}
              className="mt-8 inline-block text-sm text-paper/60 underline underline-offset-4 transition-colors hover:text-paper"
            >
              {contactDetails.email}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
