import { z } from "zod";

/**
 * One schema, validated twice: in the browser for immediate field-level
 * feedback, and again in the route handler because a client-side check is a
 * convenience, not a control.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is longer than we can store."),
  email: z
    .string()
    .trim()
    .min(1, "We need an email address to reply to.")
    .email("That does not look like a valid email address."),
  phone: z
    .string()
    .trim()
    .max(32, "That phone number is longer than we can store.")
    .refine((value) => value === "" || /^[+\d][\d\s().-]{5,}$/.test(value), {
      message: "Use digits, spaces and + only.",
    })
    .optional()
    .or(z.literal("")),
  subject: z.enum(["general", "sizing", "order", "wholesale", "press"], {
    message: "Choose what your message is about.",
  }),
  /** Optional context so the shop can answer without a second email. */
  productSlug: z
    .string()
    .trim()
    .max(80, "That is not a product we recognise.")
    .optional()
    .or(z.literal("")),
  reference: z
    .string()
    .trim()
    .max(40, "Reference numbers are shorter than that.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps us give you a useful answer.")
    .max(2000, "Please keep it under 2,000 characters."),
  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   *
   * Deliberately NOT constrained to an empty string: a schema failure here
   * would return a validation error, which tells the bot precisely which
   * field it got caught on. Instead the value is allowed through and the
   * route handler drops the submission while answering as if it succeeded.
   */
  company: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const contactSubjects = [
  { value: "general", label: "General enquiry" },
  { value: "sizing", label: "Sizing and fit" },
  { value: "order", label: "An existing order" },
  { value: "wholesale", label: "Wholesale or stockist" },
  { value: "press", label: "Press and media" },
] as const satisfies ReadonlyArray<{ value: ContactFormValues["subject"]; label: string }>;
