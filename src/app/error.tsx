"use client";

import { useEffect } from "react";
import { ActionButton, ActionLink } from "@/components/ui/Action";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Route-level error boundary.
 *
 * The visitor is told what to do next and nothing else — no stack, no message
 * from the exception, no digest on screen. The digest goes to the console so
 * it can be matched against server logs, and this is where a reporter such as
 * Sentry would be called.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[route error]", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="bg-paper">
      <Container
        width="wide"
        className="flex min-h-[60svh] flex-col justify-center py-24"
      >
        <div className="max-w-2xl">
          <Eyebrow rule>Something went wrong</Eyebrow>
          <h1 className="text-display-lg mt-8 font-display">
            That page did not load
          </h1>
          <p className="mt-6 max-w-lg leading-relaxed text-graphite">
            The fault is on our side, not yours. Try again — and if it keeps
            happening, tell us and we will go and look.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <ActionButton onClick={reset} size="md" withArrow>
              Try again
            </ActionButton>
            <ActionLink href="/contact" variant="outline" size="md">
              Report the problem
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
