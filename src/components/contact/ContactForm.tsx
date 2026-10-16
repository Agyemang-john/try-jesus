"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import {
  contactSchema,
  contactSubjects,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { ActionButton } from "@/components/ui/Action";
import { cn } from "@/lib/utils";

type ContactFormProps = {
  /** Slug → name, so the "product of interest" select stays in sync. */
  products: Array<{ slug: string; name: string }>;
};

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; reference: string }
  | { state: "error"; message: string };

/* 2px borders and a taller box, so a field reads as a control rather than as
   an underlined gap. Corners stay square: pill inputs look like search bars. */
const FIELD_CLASSES =
  "w-full border-2 bg-paper px-4 py-3.5 text-[1rem] text-ink transition-colors placeholder:text-ash focus:outline-none focus-visible:border-ink";

export function ContactForm({ products }: ContactFormProps) {
  const formId = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    /* Validate on blur, then live once a field has been corrected — errors
       that appear while someone is still typing are just noise. */
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "general",
      productSlug: "",
      reference: "",
      message: "",
      company: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        /* Never surface a raw server error. The route sends a safe, human
           message for the cases a visitor can act on; anything else gets the
           generic line below. */
        const message =
          payload &&
          typeof payload === "object" &&
          "message" in payload &&
          typeof payload.message === "string"
            ? payload.message
            : "We could not send that just now. Please try again, or email us directly.";
        setStatus({ state: "error", message });
        return;
      }

      const reference =
        payload && typeof payload === "object" && "reference" in payload
          ? String(payload.reference)
          : "";

      setStatus({ state: "success", reference });
      reset();
    } catch {
      setStatus({
        state: "error",
        message:
          "That did not reach us — you may be offline. Please try again, or email the shop directly.",
      });
    }
  });

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="border-2 border-ink bg-bone p-8 lg:p-12"
        aria-live="polite"
      >
        <span className="flex size-12 items-center justify-center rounded-(--radius-pill) bg-ink text-paper">
          <Check aria-hidden="true" strokeWidth={2.5} className="size-6" />
        </span>
        <h3 className="text-display-sm mt-6 font-display">Message received</h3>
        <p className="mt-4 max-w-md leading-relaxed text-graphite">
          Thank you — it has reached the shop. We answer every message within two
          working days, and sizing questions usually get a reply faster than that.
        </p>
        {status.reference ? (
          <p className="label mt-6 text-graphite">
            Your reference — <span className="text-ink">{status.reference}</span>
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="link-underline mt-8 text-[0.9375rem] font-semibold text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {status.state === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 border-2 border-accent bg-accent/5 px-5 py-4 text-[0.9375rem] font-medium text-ink"
        >
          <AlertCircle
            aria-hidden="true"
            strokeWidth={1.5}
            className="mt-0.5 size-4 shrink-0 text-accent"
          />
          <p>{status.message}</p>
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Full name"
          required
          error={errors.name?.message}
        >
          {(props) => (
            <input
              {...props}
              {...register("name")}
              type="text"
              autoComplete="name"
              placeholder="Christabel Afriyie"
            />
          )}
        </Field>

        <Field
          id={`${formId}-email`}
          label="Email"
          required
          error={errors.email?.message}
        >
          {(props) => (
            <input
              {...props}
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@gmail.com"
            />
          )}
        </Field>

        <Field
          id={`${formId}-phone`}
          label="Phone"
          hint="Optional"
          error={errors.phone?.message}
        >
          {(props) => (
            <input
              {...props}
              {...register("phone")}
              type="tel"
              autoComplete="tel"
              placeholder="+233 506 585 979"
            />
          )}
        </Field>

        <Field
          id={`${formId}-subject`}
          label="Subject"
          required
          error={errors.subject?.message}
        >
          {(props) => (
            <select {...props} {...register("subject")}>
              {contactSubjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id={`${formId}-product`}
          label="Product of interest"
          hint="Optional"
          error={errors.productSlug?.message}
        >
          {(props) => (
            <select {...props} {...register("productSlug")}>
              <option value="">No particular object</option>
              {products.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id={`${formId}-reference`}
          label="Order or repair reference"
          hint="Optional"
          error={errors.reference?.message}
        >
          {(props) => (
            <input
              {...props}
              {...register("reference")}
              type="text"
              placeholder="e.g. TJ-2026-0114"
            />
          )}
        </Field>
      </div>

      <Field
        id={`${formId}-message`}
        label="Message"
        required
        error={errors.message?.message}
      >
        {(props) => (
          <textarea
            {...props}
            {...register("message")}
            rows={6}
            placeholder="Tell us what you need — the more detail, the more useful our answer."
            className={cn(props.className, "resize-y")}
          />
        )}
      </Field>

      {/* Honeypot. Hidden from sight and from assistive technology; only a bot
          fills it, and the server rejects anything that does. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          {...register("company")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-8">
        <ActionButton type="submit" size="lg" disabled={isSubmitting} withArrow={!isSubmitting}>
          {isSubmitting ? "Sending" : "Send message"}
        </ActionButton>

        {isSubmitting ? (
          <span className="flex items-center gap-2 text-[0.9375rem] font-medium text-graphite" role="status">
            <Loader2 aria-hidden="true" strokeWidth={1.5} className="size-4 animate-spin" />
            Sending your message
          </span>
        ) : (
          <p className="max-w-xs text-[0.8125rem] leading-relaxed text-graphite">
            We use what you send here to answer you, and nothing else.
          </p>
        )}
      </div>
    </form>
  );
}

type FieldRenderProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
  className: string;
};

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: (props: FieldRenderProps) => React.ReactNode;
};

/**
 * One field, wired correctly once: a real <label>, `aria-invalid` when it is,
 * and `aria-describedby` pointing at whichever of the hint and the error is
 * actually on screen. Doing this per-input is how half of it ends up missing.
 */
function Field({ id, label, required = false, hint, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[0.9375rem] font-semibold text-ink">
          {label}
          {required ? (
            <span className="ml-1 text-accent" aria-hidden="true">
              *
            </span>
          ) : null}
          {required ? <span className="sr-only"> (required)</span> : null}
        </label>
        {hint ? (
          <span id={hintId} className="text-[0.8125rem] text-graphite">
            {hint}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        {children({
          id,
          "aria-invalid": Boolean(error),
          "aria-describedby": describedBy || undefined,
          className: cn(FIELD_CLASSES, error ? "border-accent" : "border-line"),
        })}
      </div>

      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-[0.8125rem] font-medium text-accent">
          <AlertCircle aria-hidden="true" strokeWidth={1.5} className="size-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
