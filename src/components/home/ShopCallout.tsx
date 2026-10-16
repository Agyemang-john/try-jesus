import Image from "next/image";
import { ShopButton } from "@/components/products/ShopButton";
import { ActionLink } from "@/components/ui/Action";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * The hand-off.
 *
 * A split screen rather than a centred banner: image on the left, the actual
 * explanation on the right. The wording is deliberate — this site is a
 * catalogue, and the store is somewhere else. Saying so here means nobody
 * reaches the store surprised.
 */
export function ShopCallout() {
  return (
    <section aria-labelledby="shop-callout-heading" className="bg-paper">
      <div className="grid lg:grid-cols-2">
        <div className="relative order-2 aspect-4/3 lg:order-1 lg:aspect-auto lg:min-h-[32rem]">
          <Image
            src="/images/brand/materials.jpg"
            alt="Cotton fabric on the cutting table"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        {/* Explicit padding rather than <Container>: this is one half of a
            split screen and wants an asymmetric gutter, which the shared
            container's symmetric one would fight with. */}
        <div className="order-1 flex items-center bg-bone py-20 lg:order-2 lg:py-28">
          <div className="w-full px-5 sm:px-8 lg:pl-16 lg:pr-12 xl:pl-24 xl:pr-16">
            <div className="max-w-lg">
              <Eyebrow rule>Where to buy</Eyebrow>
              <h2 id="shop-callout-heading" className="text-display-sm mt-8 font-display">
                This is the catalogue. The store is next door.
              </h2>
              <p className="mt-6 leading-relaxed text-graphite">
                We keep the explaining here and the ordering there, so the shop
                only has to do one of those well. Shipping, stock and returns are
                handled by our authorised store.
              </p>

              <div className="mt-10">
                <ShopButton size="lg" withNote>
                  Shop the collection
                </ShopButton>
              </div>

              <div className="mt-10 border-t border-line pt-6">
                <ActionLink href="/contact" variant="ghost" size="sm" className="text-graphite">
                  Questions before you buy? Talk to the shop
                </ActionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
