/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DEMO CONTENT — replace before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 * The brand narrative: story, timeline, mission, vision, values, founder and
 * the statistics strip.
 *
 * A note on `statistics`: every entry below is marked `placeholder: true`, and
 * the component renders marked figures with a dotted rule plus a footnote
 * saying they are not yet confirmed. Do not remove the flag until the client
 * has supplied a number they can stand behind. An empty array is a perfectly
 * good answer — the section hides itself.
 */
import type { BrandValue, Founder, Statistic, TimelineEntry } from "./types";

export const story = {
  label: "Our story",
  heading: "Clothing that carries a message",
  lead:
    "We drop limited ready-to-wear collections and take custom design requests for anyone who wants something personal. Based in Ghana, shipping faith-forward style worldwide.",
  body: [
    "Try Jesus started with a simple belief: a shirt can say what is sometimes hard to say out loud. Two words, worn plainly, can open a conversation that a sermon never would.",
    "Every collection is released in limited runs, so each piece stays considered rather than mass-produced. Between drops, we work one-on-one with people who want a design of their own — a verse, a testimony, a name for their church or ministry.",
    "Each garment is made to be worn often and worn well, because a message only travels as far as the clothing that carries it.",
  ],
};

export const mission = {
  label: "Mission",
  heading: "Voice of the ONE",
  body:
    "To carry a message of faith and renewal through what people wear — clothing that starts conversations, inspires hope, and reminds everyone who sees it to try faith first.",
};

export const vision = {
  label: "Vision",
  heading: "Faith-forward, worldwide",
  body:
    "From Ghana to the rest of the world, we want Try Jesus to be a familiar sign of hope — worn in streets, schools, churches and workplaces, starting conversations wherever it goes.",
};

/**
 * Company history. Left empty until the client supplies real dates and
 * milestones — the section hides itself when this array is empty.
 */
export const timeline: TimelineEntry[] = [];

export const values: BrandValue[] = [
  {
    index: "01",
    title: "Faith first",
    description:
      "Every design begins with the message. If it does not point people toward hope, it does not get made.",
  },
  {
    index: "02",
    title: "Limited by design",
    description:
      "Collections drop in limited runs, so every piece stays considered and personal rather than mass-produced.",
  },
  {
    index: "03",
    title: "Made personal",
    description:
      "Custom design requests are open to anyone — individuals, churches, ministries and groups who want something that is truly theirs.",
  },
  {
    index: "04",
    title: "Quality that lasts",
    description:
      "230 gsm, 260 gsm and 360 gsm fabrics, made to be worn often. A message only travels as far as the garment carrying it.",
  },
  {
    index: "05",
    title: "From Ghana, for the world",
    description:
      "Rooted in Ghana and shipping worldwide, so faith-forward style can reach anyone, anywhere.",
  },
];

/**
 * PLACEHOLDER FIGURES — not verified claims.
 * Replace the values and remove `placeholder: true` once the client confirms
 * each number. Set the array to [] to hide the section entirely.
 */
export const statistics: Statistic[] = [
  { value: "Ghana", label: "Where we are based" },
  { value: "Worldwide", label: "Where we ship" },
  { value: "Limited", label: "Ready-to-wear collections" },
  { value: "Custom", label: "Design requests welcome" },
];

/** Shown on the About page. Remove the export usage if the client declines. */
export const founder: Founder = {
  name: "Felix Badmond",
  role: "Founder & head printer",
  biography: [
    "Felix spent six years as a press operator for other people's brands before deciding he would rather make forty of something he meant than forty thousand of something he did not.",
    "He still pulls the first proof of every run, sets the ink by eye, and is the person who answers the sizing emails. The shop is his and there are five other people in it.",
  ],
  image: {
    src: "/images/brand/founder.jpg",
    alt: "Portrait of the founder",
    width: 1200,
    height: 1500,
  },
  signature: "Felix",
};

/**
 * Four standing commitments. Unlike `statistics` these are statements of
 * policy rather than metrics, so they carry no placeholder flag — but they
 * must still be checked against what the client actually offers.
 */
export const standards = [
  { label: "Fabric", value: "230 gsm 260 gsm 360 gsm" },
  { label: "Printed in", value: "Ghana" },
  { label: "Collections", value: "Limited drops, plus custom requests" },
  { label: "Packaging", value: "Paper and cotton. " },
];
