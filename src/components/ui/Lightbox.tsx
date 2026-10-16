"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ImageAsset } from "@/content/types";

export type LightboxItem = {
  image: ImageAsset;
  /** Line printed under the image — a caption, a credit, or both. */
  caption?: string;
  meta?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  /** The open item, or null when closed. Owned by the parent. */
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Announced to screen readers when the dialog opens. */
  title: string;
};

/**
 * Full-screen image viewer.
 *
 * Radix Dialog does the parts that are easy to get wrong — focus trap, restore
 * on close, `aria-modal`, escape, scroll lock, inert background. Left and
 * right arrow paging is added on top.
 */
export function Lightbox({ items, index, onIndexChange, onClose, title }: LightboxProps) {
  const isOpen = index !== null;
  const count = items.length;

  const step = useCallback(
    (delta: number) => {
      if (index === null || count === 0) return;
      onIndexChange((index + delta + count) % count);
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, step]);

  const current = index === null ? undefined : items[index];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fade-in fixed inset-0 z-50 bg-ink/95" />
        <Dialog.Content
          className="on-ink fixed inset-0 z-50 flex flex-col text-paper focus:outline-none"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>

          <header className="flex shrink-0 items-center justify-between border-b border-paper/15 px-5 py-4 sm:px-8">
            <p className="label text-paper/60">
              {index === null ? "" : `${String(index + 1).padStart(2, "0")} / ${String(count).padStart(2, "0")}`}
            </p>
            <Dialog.Close
              className="label flex items-center gap-2 px-2 py-1 text-paper/70 transition-colors hover:text-paper"
              aria-label="Close image viewer"
            >
              <span className="hidden sm:inline">Close</span>
              <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </Dialog.Close>
          </header>

          <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 sm:p-10">
            {current ? (
              <Image
                key={current.image.src}
                src={current.image.src}
                alt={current.image.alt}
                width={current.image.width}
                height={current.image.height}
                sizes="100vw"
                className="max-h-full w-auto max-w-full object-contain"
                priority
              />
            ) : null}

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-paper/20 bg-ink/40 text-paper transition-colors hover:bg-paper hover:text-ink sm:left-6"
                >
                  <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center border border-paper/20 bg-ink/40 text-paper transition-colors hover:bg-paper hover:text-ink sm:right-6"
                >
                  <ChevronRight aria-hidden="true" strokeWidth={1.5} className="size-5" />
                </button>
              </>
            ) : null}
          </div>

          {current?.caption || current?.meta ? (
            <footer className="shrink-0 border-t border-paper/15 px-5 py-4 sm:px-8">
              {current.caption ? <p className="text-sm text-paper">{current.caption}</p> : null}
              {current.meta ? <p className="label mt-1 text-paper/50">{current.meta}</p> : null}
            </footer>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
