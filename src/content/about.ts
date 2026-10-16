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
  heading: "Forty shirts and a borrowed press",
  lead:
    "Try Jesus began in 2019 in the back of a print shop on Murphy Avenue, with a borrowed carousel press, one screen, and forty blank shirts bought on a card that should not have been used for it.",
  body: [
    "The first run was for a small group who kept being asked the same question and were tired of giving the long answer. Two words on a heavy shirt did the job better than any of us managed out loud. They wore them until they went soft, and then people started asking where to get one.",
    "We could have turned that into a drop calendar. We deliberately did not. There are six pieces, they do not change with the season, and when one wears out the same one is still there to replace it. A brand that makes you check for restocks is a brand that has decided scarcity is the product.",
    "Everything is still printed on our own press in Atlanta, by people whose names are on the wall. The ink is water-based, which is slower and more expensive and means the print goes soft with the shirt rather than peeling off it in the third year.",
  ],
};

export const mission = {
  label: "Mission",
  heading: "Voice of the ONE",
  body:
    "To make garments good enough that the message outlasts the novelty — heavy cotton, honest printing, and a range short enough that we can stand behind every piece in it. If a shirt falls apart in a year, nothing written on it mattered much.",
};

export const vision = {
  label: "Vision",
  heading: "A shop, not a drop",
  body:
    "We want Try Jesus to be the place you come back to when the old one wears out, not the place you set an alarm for. That means keeping the range short, keeping the pieces in stock, printing in-house so we control the quality, and never making scarcity do the work that the garment should be doing.",
};

export const timeline: TimelineEntry[] = [
  {
    year: "2019",
    title: "Forty shirts, one screen",
    description:
      "The first run is printed on a borrowed press in the back of a shop on Murphy Avenue, for a group of friends who kept getting asked the same question.",
  },
  {
    year: "2020",
    title: "The Heavyweight Tee",
    description:
      "The first shirt made on our own blanks rather than bought ones: 8.5oz cotton, boxy, pre-shrunk. The pattern has not changed since.",
    image: {
      src: "/images/brand/story-01.jpg",
      alt: "Photograph of the first Try Jesus shirt on the press",
      width: 1600,
      height: 2000,
    },
  },
  {
    year: "2021",
    title: "Our own press",
    description:
      "We stop renting press time and buy a six-colour carousel. Everything from here is printed by us, which is the point at which we can promise anything about quality.",
  },
  {
    year: "2023",
    title: "The hood gets a second layer",
    description:
      "Enough people tell us the single-layer hood lies flat that we remake the whole garment. It becomes the best-selling thing we make.",
    image: {
      src: "/images/brand/story-02.jpg",
      alt: "Photograph of the print room bench",
      width: 1400,
      height: 1050,
    },
  },
  {
    year: "2025",
    title: "Six pieces, held",
    description:
      "We stop adding and start holding. The range settles at six, restocked rather than replaced, with no seasonal calendar.",
  },
  {
    year: "2026",
    title: "The print apprenticeship",
    description:
      "Two people begin a paid year on the press. The intention is for this to become the normal way into the shop.",
  },
];

export const values: BrandValue[] = [
  {
    index: "01",
    title: "No drops, no scarcity",
    description:
      "Everything stays in stock. If we cannot keep a piece available, we stop making it rather than turning the shortage into marketing.",
  },
  {
    index: "02",
    title: "Printed by us",
    description:
      "On our own press, in Atlanta. Not contracted out and re-labelled — which is the only reason we can make promises about how the print wears.",
  },
  {
    index: "03",
    title: "Weight you can feel",
    description:
      "230 gsm 260 gsm 360 gsm, not the premium option. A light garment cannot survive being worn weekly and we would rather not sell one.",
  },
  {
    index: "04",
    title: "A short range",
    description:
      "Six pieces. A new one only exists because an old one could not do the job, never because the season turned over.",
  },
  {
    index: "05",
    title: "Plain answers",
    description:
      "We say what the fabric is, where it was made, how it fits and what will go first. Nobody has ever been disappointed by being told the truth early.",
  },
];

/**
 * PLACEHOLDER FIGURES — not verified claims.
 * Replace the values and remove `placeholder: true` once the client confirms
 * each number. Set the array to [] to hide the section entirely.
 */
export const statistics: Statistic[] = [
  { value: "7", label: "Years on the press", placeholder: true },
  { value: "6", label: "Pieces in the range", placeholder: true },
  { value: "40", label: "Shirts in the first run", placeholder: true },
  { value: "22", label: "Countries shipped to", placeholder: true },
];

/** Shown on the About page. Remove the export usage if the client declines. */
export const founder: Founder = {
  name: "Marcus Delaney",
  role: "Founder & head printer",
  biography: [
    "Marcus spent six years as a press operator for other people's brands before deciding he would rather make forty of something he meant than forty thousand of something he did not.",
    "He still pulls the first proof of every run, sets the ink by eye, and is the person who answers the sizing emails. The shop is his and there are five other people in it.",
  ],
  image: {
    src: "/images/brand/founder.jpg",
    alt: "Portrait of the founder",
    width: 1200,
    height: 1500,
  },
  signature: "Marcus",
};

/**
 * Four standing commitments. Unlike `statistics` these are statements of
 * policy rather than metrics, so they carry no placeholder flag — but they
 * must still be checked against what the client actually offers.
 */
export const standards = [
  { label: "Fabric", value: "230 gsm 260 gsm 360 gsm" },
  { label: "Printed in", value: "Ghana" },
  { label: "Restocks", value: "Always. No drops, no waitlists." },
  { label: "Packaging", value: "Paper and cotton. " },
];
