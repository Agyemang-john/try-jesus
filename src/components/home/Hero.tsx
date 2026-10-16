"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/content/hero";
import { ShopButton } from "@/components/products/ShopButton";
import { ActionLink } from "@/components/ui/Action";
import { ArtDirectedImage } from "@/components/ui/ArtDirectedImage";
import { Container } from "@/components/ui/Container";
import { cn, ordinal } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

/**
 * Full-bleed opening campaign.
 *
 * Behaviour worth knowing about:
 *  · One slide renders as a static hero — no controls, no carousel runtime.
 *  · Autoplay stops permanently on any interaction, and never starts at all
 *    for visitors who prefer reduced motion. It can also be paused by hand.
 *  · Desktop and phone get different crops rather than one image squeezed,
 *    served through a <picture> so only the matching one is downloaded.
 */
export function Hero({ slides }: { slides: HeroSlide[] }) {
  const isCarousel = slides.length > 1;
  const prefersReducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState(0);

  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, duration: 38, align: "start", active: isCarousel },
    isCarousel
      ? [Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true, stopOnMouseEnter: true, playOnInit: false })]
      : [],
  );

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect);
    };
  }, [embla]);

  /* Autoplay starts on the client only, and only for visitors who have not
     asked the system to calm motion down. `playing` follows Embla's own
     events rather than being set alongside each call, so the button stays
     truthful when autoplay stops itself on interaction or mouse-enter. */
  useEffect(() => {
    if (!embla) return;
    const autoplay = embla.plugins().autoplay;
    if (!autoplay) return;

    const onPlay = () => setPlaying(true);
    const onStop = () => setPlaying(false);
    embla.on("autoplay:play", onPlay).on("autoplay:stop", onStop);

    if (prefersReducedMotion) {
      autoplay.stop();
    } else {
      autoplay.play();
    }

    return () => {
      embla.off("autoplay:play", onPlay).off("autoplay:stop", onStop);
    };
  }, [embla, prefersReducedMotion]);

  const toggleAutoplay = useCallback(() => {
    const autoplay = embla?.plugins()?.autoplay;
    if (!autoplay) return;
    if (autoplay.isPlaying()) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [embla]);

  return (
    <section
      className="on-ink relative isolate bg-ink text-paper"
      aria-roledescription={isCarousel ? "carousel" : undefined}
      aria-label={isCarousel ? "Featured campaigns" : undefined}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={cn("flex", !isCarousel && "block")}>
          {slides.map((slide, index) => (
            // `inert` rather than `aria-hidden`: it removes the slide from the
            // accessibility tree AND from the tab order, so the links on an
            // off-screen slide cannot be reached by keyboard.
            <article
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-roledescription={isCarousel ? "slide" : undefined}
              aria-label={isCarousel ? `${index + 1} of ${slides.length}` : undefined}
              inert={isCarousel && index !== selected}
            >
              {/* A measured band, not a full viewport. A hero that fills the
                  screen pushes every other section below the fold and makes
                  the page feel like a slideshow. */}
              <div className="relative h-[34rem] w-full sm:h-[38rem] lg:h-[44rem]">
                <ArtDirectedImage
                  desktop={slide.image}
                  mobile={slide.mobileImage}
                  priority={index === 0}
                  className="object-cover"
                />
                {/* A flat wash rather than a gradient. A single opacity over
                    the whole frame reads as an art-directed colour treatment;
                    a gradient reads as a fix for unreadable text. */}
                <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />
              </div>

              <div className="absolute inset-0 flex items-center pb-16 sm:pb-20">
                <Container width="wide">
                  <div className="max-w-4xl">
                    <p className="label text-paper/75">{slide.eyebrow}</p>
                    {/* The page's single <h1> is rendered once, visually
                        hidden, by the homepage — a rotating headline cannot be
                        a stable document heading. */}
                    {/* `text-wrap: pretty` rather than the global `balance`:
                        balancing a two-line display headline produces an
                        awkwardly short first line at this size. */}
                    <h2 className="text-display-xl mt-5 font-display [text-wrap:pretty]">
                      {slide.headline}
                    </h2>
                    <p className="mt-6 max-w-2xl text-lg font-semibold leading-snug text-paper sm:text-xl lg:text-[1.375rem]">
                      {slide.description}
                    </p>

                    {/* Each action gets a one-line question above it, so the
                        two routes are distinguishable before you read the
                        buttons. */}
                    <div className="mt-10 flex flex-wrap items-end gap-x-4 gap-y-5">
                      <div>
                        <p className="mb-3 text-[0.9375rem] text-paper/80">Want to see the range?</p>
                        <ActionLink href={slide.link?.href ?? "/products"} variant="inverse" size="md">
                          {slide.link?.label ?? "Explore products"}
                        </ActionLink>
                      </div>
                      <div>
                        <p className="mb-3 text-[0.9375rem] text-paper/80">Ready to buy?</p>
                        <ShopButton
                          variant="outline"
                          size="md"
                          className="border-paper text-paper hover:bg-paper hover:text-ink"
                        >
                          Shop online
                        </ShopButton>
                      </div>
                    </div>
                  </div>
                </Container>
              </div>
            </article>
          ))}
        </div>
      </div>

      {isCarousel ? (
        <Container
          width="wide"
          className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-6 pb-8 sm:pb-10"
        >
          {/* Numeric pagination — each slide is reachable directly, and the
              rule width doubles as a progress read. */}
          <ul className="flex items-end gap-4">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <button
                  type="button"
                  onClick={() => embla?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                  aria-current={index === selected ? "true" : undefined}
                  className="group flex flex-col gap-2 py-2"
                >
                  <span
                    className={cn(
                      "label transition-opacity",
                      index === selected ? "text-paper opacity-100" : "text-paper opacity-45 group-hover:opacity-80",
                    )}
                  >
                    {ordinal(index)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-0.5 bg-paper transition-all duration-500 ease-[var(--ease-editorial)]",
                      index === selected ? "w-14 opacity-100" : "w-7 opacity-45 group-hover:opacity-80",
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={playing ? "Pause automatic slide changes" : "Resume automatic slide changes"}
              className="hidden size-11 items-center justify-center rounded-(--radius-pill) border-2 border-paper/50 text-paper transition-colors hover:bg-paper hover:text-ink sm:flex"
            >
              {playing ? (
                <Pause aria-hidden="true" strokeWidth={2.25} className="size-4" />
              ) : (
                <Play aria-hidden="true" strokeWidth={2.25} className="size-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => embla?.scrollPrev()}
              aria-label="Previous slide"
              className="flex size-11 items-center justify-center rounded-(--radius-pill) border-2 border-paper/50 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowLeft aria-hidden="true" strokeWidth={2.25} className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => embla?.scrollNext()}
              aria-label="Next slide"
              className="flex size-11 items-center justify-center rounded-(--radius-pill) border-2 border-paper/50 text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              <ArrowRight aria-hidden="true" strokeWidth={2.25} className="size-4" />
            </button>
          </div>
        </Container>
      ) : null}
    </section>
  );
}
