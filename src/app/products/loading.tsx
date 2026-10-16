import { Container } from "@/components/ui/Container";

/**
 * Collection skeleton.
 *
 * It mirrors the real grid's aspect ratios and offsets exactly, so the switch
 * to content does not shift the layout. No spinner, no branded loading screen
 * — just the shape of the page arriving slightly before the page.
 */
export default function ProductsLoading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the collection</span>

      <div className="border-b border-line bg-bone">
        <Container
          width="wide"
          className="py-16 lg:py-20"
        >
          <div className="h-3 w-28 animate-pulse bg-bone-deep" />
          <div className="mt-8 h-14 w-full max-w-xl animate-pulse bg-bone-deep lg:h-20" />
          <div className="mt-12 flex gap-2">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="h-11 w-32 animate-pulse bg-bone-deep" />
            ))}
          </div>
        </Container>
      </div>

      <Container width="wide" className="py-16 lg:py-24">
        <div className="mb-12 h-3 w-40 animate-pulse bg-bone" />
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-24">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className={index % 2 === 1 ? "sm:mt-16 lg:mt-24" : undefined}>
              <div className="aspect-4/5 w-full animate-pulse bg-bone" />
              <div className="mt-5 h-3 w-24 animate-pulse bg-bone" />
              <div className="mt-4 h-7 w-3/4 animate-pulse bg-bone" />
              <div className="mt-3 h-4 w-full animate-pulse bg-bone" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
