/**
 * Placeholder photography — real photographs, correct subject, correct crop
 * -------------------------------------------------------------------------
 * Pulls stand-in photography from Pexels and crops every file to the exact
 * dimensions the content layer declares, so nothing is stretched, letterboxed
 * or cropped through its subject.
 *
 *   npm run photos               fill any missing files
 *   npm run photos -- --force    replace everything
 *
 * Why Pexels and not Pinterest: the Pexels licence allows commercial use and
 * modification. Pinterest is overwhelmingly third-party copyrighted work with
 * no licence attached — using it on a brand site is an infringement claim
 * waiting to happen.
 *
 * Two quality gates, because a keyword search alone returns junk:
 *
 *  1. **Subject matching.** Every candidate carries the alt text Pexels
 *     publishes for it, and is only accepted if that text matches the slot's
 *     `match` pattern. Without this, "screen printing" returned a darkroom and
 *     "clothing rack" returned a bedroom — both of which actually happened.
 *  2. **Brightness.** Slots under the flat ink wash demand a bright source; a
 *     dark photograph under a dark wash collapses to a black field. Every slot
 *     rejects something essentially black.
 *
 * Before this ships:
 *  · These are placeholders — other people's garments, not this brand's.
 *  · Discovery scrapes the public search page because the official API needs a
 *    key. For anything ongoing, get a free key at https://www.pexels.com/api/
 *    and query `/v1/search` instead.
 *
 * Every file written is listed in public/images/CREDITS.md.
 */
import sharp from "sharp";
import { execFile } from "node:child_process";
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "images");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const FORCE = process.argv.includes("--force");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* -- discovery ------------------------------------------------------------- */

const poolCache = new Map();
/** Ids already spent, so no two slots get the same photograph. */
const used = new Set();
/** Slots that fell back to an unmatched candidate and want a human look. */
const unverified = [];

async function pool(term, orientation) {
  const key = `${term}|${orientation}`;
  if (poolCache.has(key)) return poolCache.get(key);

  const url = `https://www.pexels.com/search/${encodeURIComponent(term)}/?orientation=${orientation}`;

  /* curl rather than fetch: the search page 403s undici but serves curl. The
     image CDN is happy with either, so only discovery goes through the shell. */
  let html = "";
  try {
    const { stdout } = await run("curl", ["-sL", "--max-time", "30", "-A", UA, url], {
      maxBuffer: 64 * 1024 * 1024,
    });
    html = stdout;
  } catch {
    html = "";
  }

  const seen = new Map();
  const add = (id, alt) => {
    if (!seen.has(id)) seen.set(id, alt.toLowerCase());
  };

  for (const m of html.matchAll(
    /<img[^>]*?alt="([^"]{3,160})"[^>]*?src="https:\/\/images\.pexels\.com\/photos\/(\d+)\//g,
  )) {
    add(m[2], m[1]);
  }
  for (const m of html.matchAll(
    /src="https:\/\/images\.pexels\.com\/photos\/(\d+)\/[^"]*"[^>]*?alt="([^"]{3,160})"/g,
  )) {
    add(m[1], m[2]);
  }

  const candidates = [...seen].map(([id, alt]) => ({ id, alt }));
  poolCache.set(key, candidates);
  await sleep(350);
  return candidates;
}

/**
 * Next unused candidate whose published description matches the slot. Falls
 * back to an unmatched candidate rather than leaving a hole, but records the
 * slot so it can be reviewed afterwards.
 */
async function pick(terms, orientation, match, reject, relPath) {
  for (const term of terms) {
    for (const candidate of await pool(term, orientation)) {
      if (used.has(candidate.id)) continue;
      if (match && !match.test(candidate.alt)) continue;
      if (reject && reject.test(candidate.alt)) continue;
      used.add(candidate.id);
      return candidate;
    }
  }

  for (const term of terms) {
    for (const candidate of await pool(term, orientation)) {
      if (used.has(candidate.id)) continue;
      if (reject && reject.test(candidate.alt)) continue;
      used.add(candidate.id);
      unverified.push(`${relPath} — described as "${candidate.alt}"`);
      return candidate;
    }
  }

  return null;
}

/* -- download and crop ------------------------------------------------------ */

const credits = [];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function fetchPlate(relPath, options) {
  const {
    width, height, terms, orientation, label, match, reject, id, minBrightness = 45,
  } = options;

  const file = path.join(OUT, relPath);
  if (!FORCE && (await exists(file))) return 0;

  /* A pinned id short-circuits search. Used for the slots where composition
     matters more than keywords can express — the homepage hero above all. */
  if (id) {
    used.add(id);
    const src = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${Math.min(2600, Math.round(Math.max(width, height) * 1.25))}`;
    const response = await fetch(src);
    if (!response.ok) throw new Error(`pinned id ${id}: HTTP ${response.status}`);
    const out = await sharp(Buffer.from(await response.arrayBuffer()))
      .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
      .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, out);
    credits.push({
      file: relPath, label, id, alt: "pinned", page: `https://www.pexels.com/photo/${id}/`,
    });
    await sleep(220);
    return out.length;
  }

  /* Ask for comfortably more than the target so the crop never upscales. */
  const requestWidth = Math.min(2600, Math.round(Math.max(width, height) * 1.25));
  const veto = reject ? new RegExp(`${NEVER.source}|${reject.source}`) : NEVER;
  let lastError = "no candidates";

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const candidate = await pick(terms, orientation, match, veto, relPath);
    if (!candidate) break;

    const src = `https://images.pexels.com/photos/${candidate.id}/pexels-photo-${candidate.id}.jpeg?auto=compress&cs=tinysrgb&w=${requestWidth}`;

    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const input = Buffer.from(await response.arrayBuffer());

      /* `attention` picks the crop window around the busiest region, which
         keeps faces and garments in frame far better than a centre crop. */
      const pipeline = sharp(input).resize(width, height, {
        fit: "cover",
        position: sharp.strategy.attention,
      });

      const { channels } = await pipeline.clone().stats();
      const mean = channels.reduce((sum, c) => sum + c.mean, 0) / channels.length;
      if (mean < minBrightness) {
        lastError = `too dark (${Math.round(mean)} < ${minBrightness})`;
        continue;
      }

      const out = await pipeline
        .clone()
        .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
        .toBuffer();

      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, out);
      credits.push({
        file: relPath,
        label,
        id: candidate.id,
        alt: candidate.alt,
        page: `https://www.pexels.com/photo/${candidate.id}/`,
      });
      await sleep(220);
      return out.length;
    } catch (error) {
      lastError = error.message;
    }
  }

  throw new Error(lastError);
}

/* -- subject patterns -------------------------------------------------------- */

/* Things that keep turning up and are never what a clothing brand wants: a
   graduation cap for "cap", a washing machine for "sewing machine", ceremonial
   robes for "clothing". */
const NEVER =
  /graduation|mortarboard|diploma|wash(ing)? machine|laundry|dryer|robe|costume|traditional|wedding|bride|uniform|helmet|hard hat|suit and tie|baby|toddler|child|kid\b|bikini|swimsuit|swimwear|\bbra\b|lingerie|underwear|topless|nude|sexy/;

const M = {
  tee: /shirt|tee|top|clothes|clothing|apparel|outfit/,
  hoodie: /hood|sweatshirt|sweater|jumper|pullover|clothes|clothing/,
  /* Stricter variant for the main hero, where "clothes" is not good enough. */
  hoodieStrict: /hood|sweatshirt|sweater|jumper|pullover/,
  longsleeve: /sleeve|shirt|sweater|jumper|top|clothes|clothing/,
  cap: /baseball cap|snapback|trucker|\bcap\b|\bhat\b|beanie|headwear/,
  crew: /sweatshirt|sweater|jumper|pullover|shirt|clothes|clothing/,
  jacket: /jacket|coat|denim|outerwear|clothes|clothing/,
  garments: /cloth|garment|apparel|wardrobe|closet|rack|store|shop|boutique|shirt|hoodie|fashion/,
  fabric: /fabric|textile|cotton|linen|cloth|thread|fold|knit|wool/,
  sewing: /sew|tailor|stitch|thread|fabric|textile|craft|atelier/,
  person: /man|woman|person|people|portrait|guy|girl|boy|model|human/,
  wearing: /man|woman|person|people|portrait|model|cloth|shirt|hood|jacket|outfit|fashion/,
};

/* -- manifest ---------------------------------------------------------------- */

/** Slots under the flat ink wash need a bright source. */
const WASH = 105;

const jobs = [];

/**
 * Hand-picked photographs.
 *
 * Keyword search gets the subject right most of the time but cannot judge
 * composition, and it has no idea that a graduation cap is not a baseball cap.
 * These slots were chosen by eye. To replace one, render a contact sheet of
 * search results and read the ids off it:
 *
 *   node scripts/_candidates.mjs "baseball cap" portrait sheet.jpg
 */
const PINS = {
  "hero/1.jpeg": "9775889", // four people in plain white tees
  "hero/wear-it-plainly-mobile.jpg": "11340657", // young man, grey hoodie, full length
  "products/cornerstone-cap-01.jpg": "7562957", // beige cap on a fence
  "products/cornerstone-cap-02.jpg": "18670550", // close-up, cap held up
  "products/cornerstone-cap-03.jpg": "27401299", // worn, profile
  "products/cornerstone-cap-04.jpg": "13697753", // three caps, colourways
  "products/category-headwear.jpg": "29925645", // cap worn, clean background
  "brand/atelier.jpg": "16430929", // industrial embroidery machine
  "brand/og-default.jpg": "4440566", // folded tees, flat lay
  "customers/customer-10.jpg": "30257620", // hoodie, no competitor branding
};

const HEROES = [
  ["wear-it-plainly", ["hoodie", "sweatshirt", "casual clothing"], M.hoodieStrict],
  ["the-print-room", ["clothing store", "clothing rack", "boutique"], M.garments],
  ["coach-jacket", ["jacket", "denim jacket", "coat"], M.jacket],
];
for (const [name, terms, match] of HEROES) {
  jobs.push([
    `hero/${name}.jpg`,
    {
      width: 2560, height: 1440, terms, match,
      orientation: "landscape", label: `Hero — ${name}`, minBrightness: WASH,
    },
  ]);
  jobs.push([
    `hero/${name}-mobile.jpg`,
    {
      width: 1080, height: 1440, terms, match,
      orientation: "portrait", label: `Hero mobile — ${name}`, minBrightness: WASH,
    },
  ]);
}

const PRODUCTS = [
  ["heavyweight-tee", ["t shirt", "tshirt", "shirt"], M.tee],
  ["grace-hoodie", ["hoodie", "hooded sweatshirt", "sweatshirt"], M.hoodie],
  ["psalm-23-longsleeve", ["long sleeve shirt", "sweater", "shirt"], M.longsleeve],
  ["cornerstone-cap", ["baseball cap", "man wearing cap", "cap"], M.cap],
  ["salt-and-light-crew", ["sweatshirt", "sweater", "jumper"], M.crew],
  ["sunday-coach-jacket", ["jacket", "denim jacket", "coat"], M.jacket],
];
for (const [slug, terms, match] of PRODUCTS) {
  for (let i = 1; i <= 4; i += 1) {
    jobs.push([
      `products/${slug}-0${i}.jpg`,
      {
        width: 1600, height: 2000, terms, match,
        orientation: "portrait", label: `${slug} view 0${i}`, minBrightness: 55,
      },
    ]);
  }
}

const CATEGORIES = [
  ["tees", ["t shirt", "tshirt", "shirt"], M.tee],
  ["fleece", ["hoodie", "sweatshirt"], M.hoodie],
  ["headwear", ["baseball cap", "man wearing cap", "cap"], M.cap],
  ["outerwear", ["jacket", "coat", "denim jacket"], M.jacket],
];
for (const [slug, terms, match] of CATEGORIES) {
  jobs.push([
    `products/category-${slug}.jpg`,
    {
      width: 1400, height: 1750, terms, match,
      orientation: "portrait", label: `Category — ${slug}`, minBrightness: 55,
    },
  ]);
}

const BRAND = [
  ["brand/workshop-wide.jpg", 2400, 1200, "landscape", ["clothing store", "clothing rack", "boutique"], M.garments, "The print room", 90],
  ["brand/materials.jpg", 1600, 2000, "portrait", ["folded clothes", "cotton fabric", "textile"], M.fabric, "Material study", 70],
  ["brand/atelier.jpg", 1600, 1067, "landscape", ["tailor", "sewing", "atelier"], M.sewing, "The shop", 70],
  ["brand/founder.jpg", 1200, 1500, "portrait", ["man portrait", "portrait man", "portrait"], M.person, "Founder portrait", 60],
  ["brand/story-01.jpg", 1600, 2000, "portrait", ["sewing", "tailor", "textile"], M.sewing, "Origins", 70],
  ["brand/story-02.jpg", 1400, 1050, "landscape", ["sewing machine", "fabric roll", "textile"], M.sewing, "Bench detail", 70],
  ["brand/about-hero.jpg", 2400, 1350, "landscape", ["clothing store", "clothing rack", "boutique"], M.garments, "About", WASH],
  ["brand/contact.jpg", 1600, 1200, "landscape", ["clothing store", "boutique", "shop interior"], M.garments, "Visit the shop", 80],
  ["brand/og-default.jpg", 1200, 630, "landscape", ["folded clothes", "t shirt", "hoodie"], M.tee, "Open Graph card", 80],
];
for (const [file, w, h, orientation, terms, match, label, minBrightness] of BRAND) {
  jobs.push([file, { width: w, height: h, terms, match, orientation, label, minBrightness }]);
}

const CUSTOMER_TERMS = ["hoodie", "t shirt", "sweatshirt", "cap", "jacket", "casual clothing"];
/* Mixed crops on purpose — real submissions are never one shape. Pexels has no
   square filter, so 1:1 slots are cut from portrait sources. */
const CUSTOMER_SHAPES = [
  [1200, 1500, "portrait"],
  [1200, 1200, "portrait"],
  [1200, 900, "landscape"],
  [1200, 1500, "portrait"],
  [1200, 1200, "portrait"],
  [1200, 1500, "portrait"],
  [1200, 900, "landscape"],
  [1200, 1200, "portrait"],
  [1200, 1500, "portrait"],
  [1200, 900, "landscape"],
  [1200, 1200, "portrait"],
  [1200, 1500, "portrait"],
];
CUSTOMER_SHAPES.forEach(([w, h, orientation], i) => {
  const n = String(i + 1).padStart(2, "0");
  jobs.push([
    `customers/customer-${n}.jpg`,
    {
      width: w, height: h, terms: CUSTOMER_TERMS, match: M.wearing,
      orientation, label: `Customer photo ${n}`, minBrightness: 55,
    },
  ]);
});

/* -- run --------------------------------------------------------------------- */

let bytes = 0;
const failures = [];

for (const [file, options] of jobs) {
  try {
    bytes += await fetchPlate(file, { ...options, id: PINS[file] ?? options.id });
    process.stdout.write(".");
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
    process.stdout.write("x");
  }
}

if (credits.length) {
  credits.sort((a, b) => a.file.localeCompare(b.file));
  await writeFile(
    path.join(OUT, "CREDITS.md"),
    [
      "# Photography credits",
      "",
      "Placeholder photography from [Pexels](https://www.pexels.com), used under the",
      "[Pexels licence](https://www.pexels.com/license/), which permits commercial use",
      "and modification. Every file has been cropped to the dimensions the site",
      "declares for it.",
      "",
      "**These are placeholders.** They are photographs of other people's garments, not",
      "this brand's. Replace them with the real product shoot before launch, then delete",
      "this file and `scripts/fetch-photos.mjs`.",
      "",
      "| File | Used for | Described as | Source |",
      "| --- | --- | --- | --- |",
      ...credits.map(
        (c) => `| \`${c.file}\` | ${c.label} | ${c.alt} | [Pexels #${c.id}](${c.page}) |`,
      ),
      "",
    ].join("\n"),
    "utf8",
  );
}

console.log(`\nFetched ${credits.length}/${jobs.length} — ${(bytes / 1024 / 1024).toFixed(1)} MB`);
if (unverified.length) {
  console.log(`\nNo subject match, took best available (review these ${unverified.length}):`);
  for (const line of unverified) console.log(`  · ${line}`);
}
if (failures.length) {
  console.log(`\nFailed (${failures.length}):`);
  for (const line of failures) console.log(`  · ${line}`);
}
