import { Container } from "@/components/ui/Container";

/** Product page skeleton — same grid, same 4:5 plate, so nothing jumps. */
export default function ProductLoading() {
  return (
    <div aria-busy="true" aria-live="polite" className="bg-paper">
      <span className="sr-only">Loading product</span>

      <Container
        width="wide"
        className="py-12 lg:py-16"
      >
        <div className="mb-8 h-3 w-64 animate-pulse bg-bone lg:mb-12" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="hidden gap-6 lg:grid lg:grid-cols-[5.5rem_1fr]">
              <div className="flex flex-col gap-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="aspect-4/5 w-full animate-pulse bg-bone" />
                ))}
              </div>
              <div className="aspect-4/5 w-full animate-pulse bg-bone" />
            </div>
            <div className="aspect-4/5 w-full animate-pulse bg-bone lg:hidden" />
          </div>

          <div className="lg:col-span-5">
            <div className="h-3 w-32 animate-pulse bg-bone" />
            <div className="mt-5 h-12 w-3/4 animate-pulse bg-bone" />
            <div className="mt-4 h-5 w-1/2 animate-pulse bg-bone" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="h-4 w-full animate-pulse bg-bone" />
              ))}
            </div>
            <div className="mt-10 h-14 w-56 animate-pulse bg-bone" />
          </div>
        </div>
      </Container>
    </div>
  );
}
