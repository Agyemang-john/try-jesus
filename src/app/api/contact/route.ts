import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

/**
 * Contact form endpoint.
 *
 * This is the seam where an email provider goes. Everything around it is
 * finished: the payload is validated against the same schema the browser uses,
 * bots are rejected, failures return a message safe to show a visitor, and the
 * client gets a reference it can quote back.
 *
 * To deliver for real, replace the `deliver()` body with a provider call —
 * Resend, Postmark, SendGrid, or a webhook into a CRM. Nothing else changes.
 *
 * Deliberately not included, because they need infrastructure decisions the
 * client has not made yet: durable rate limiting (the in-memory limiter below
 * is per-instance and resets on deploy) and CAPTCHA.
 */

export const runtime = "nodejs";

/** Best-effort throttle. Good enough to blunt a script; not a security control. */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/** Short, quotable, and not sequential — so it leaks no volume information. */
function createReference(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `TJ-${stamp}-${suffix}`;
}

type Delivery = { ok: true } | { ok: false; reason: string };

async function deliver(
  submission: Record<string, unknown>,
  reference: string,
): Promise<Delivery> {
  const inbox = process.env.CONTACT_INBOX;
  const apiKey = process.env.RESEND_API_KEY;

  if (!inbox || !apiKey) {
    /* Development and preview: log rather than send, so the form is fully
       testable before a provider exists. */
    console.info("[contact] submission received (no provider configured)", {
      reference,
      ...submission,
    });
    return { ok: true };
  }

  // ---------------------------------------------------------------------
  // Wire the provider here, for example:
  //
  //   const response = await fetch("https://api.resend.com/emails", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${apiKey}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       from: "Try Jesus site <site@tryjesus.example>",
  //       to: inbox,
  //       reply_to: submission.email,
  //       subject: `[${reference}] ${submission.subject}`,
  //       text: buildPlainTextBody(submission, reference),
  //     }),
  //   });
  //   if (!response.ok) return { ok: false, reason: await response.text() };
  //
  // Until then, an inbox configured without a working provider is a
  // misconfiguration and should fail loudly in the logs rather than silently
  // swallow a customer's message.
  // ---------------------------------------------------------------------
  console.error("[contact] CONTACT_INBOX is set but no provider is wired up", {
    reference,
  });
  return { ok: false, reason: "No email provider configured" };
}

export async function POST(request: Request) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { message: "Too many messages from this connection. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "That request could not be read." }, { status: 400 });
  }

  /* Validated again on the server: the browser check is a convenience, and
     this endpoint is reachable without it. */
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Some details need checking before we can send that.",
        /* Field-level messages only — never the raw issue objects. */
        fields: Object.fromEntries(
          parsed.error.issues.map((issue) => [issue.path.join("."), issue.message]),
        ),
      },
      { status: 400 },
    );
  }

  /* Honeypot: silently accepted so a bot learns nothing, never delivered. */
  if (parsed.data.company) {
    return NextResponse.json({ reference: createReference() }, { status: 200 });
  }

  const { company: _honeypot, ...submission } = parsed.data;
  const reference = createReference();
  const result = await deliver(submission, reference);

  if (!result.ok) {
    /* The reason is for our logs. The visitor gets something actionable. */
    console.error("[contact] delivery failed", { reference, reason: result.reason });
    return NextResponse.json(
      {
        message:
          "We could not deliver that message. Please email the shop directly and we will pick it up.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ reference }, { status: 200 });
}
