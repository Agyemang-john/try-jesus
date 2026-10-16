/**
 * Contact sheet of Pexels search results, with each photo's id printed on it,
 * so a specific photograph can be pinned in `fetch-photos.mjs` when keywords
 * cannot express what a slot needs.
 *
 *   npm run photos:candidates -- "baseball cap" portrait sheet.jpg
 *
 * Copy the ids you want into the PINS map in fetch-photos.mjs.
 */
import sharp from "sharp";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const term = process.argv[2];
const orientation = process.argv[3] || "landscape";
const dest = process.argv[4];

const url = `https://www.pexels.com/search/${encodeURIComponent(term)}/?orientation=${orientation}`;
const { stdout: html } = await run("curl", ["-sL", "--max-time", "30", "-A", UA, url], {
  maxBuffer: 64 * 1024 * 1024,
});

const seen = new Map();
for (const m of html.matchAll(
  /<img[^>]*?alt="([^"]{3,160})"[^>]*?src="https:\/\/images\.pexels\.com\/photos\/(\d+)\//g,
)) {
  if (!seen.has(m[2])) seen.set(m[2], m[1]);
}
for (const m of html.matchAll(
  /src="https:\/\/images\.pexels\.com\/photos\/(\d+)\/[^"]*"[^>]*?alt="([^"]{3,160})"/g,
)) {
  if (!seen.has(m[1])) seen.set(m[1], m[2]);
}
console.log("found", seen.size, "candidates");
if (!seen.size) process.exit(1);

const list = [...seen].slice(0, 24);
const CELL = 300;
const LABEL = 26;
const COLS = 6;
const tiles = [];

for (const [i, [id, alt]] of list.entries()) {
  const src = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600`;
  try {
    const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
    tiles.push({
      input: await sharp(buf).resize(CELL, CELL - LABEL, { fit: "cover" }).toBuffer(),
      left: (i % COLS) * CELL,
      top: Math.floor(i / COLS) * CELL,
    });
    tiles.push({
      input: Buffer.from(
        `<svg width="${CELL}" height="${LABEL}"><rect width="${CELL}" height="${LABEL}" fill="#111"/><text x="4" y="18" font-family="Arial" font-size="13" fill="#fff">${id} ${alt.slice(0, 26)}</text></svg>`,
      ),
      left: (i % COLS) * CELL,
      top: Math.floor(i / COLS) * CELL + CELL - LABEL,
    });
  } catch {
    /* skip */
  }
}

await sharp({
  create: {
    width: COLS * CELL,
    height: Math.ceil(list.length / COLS) * CELL,
    channels: 3,
    background: { r: 24, g: 24, b: 24 },
  },
})
  .composite(tiles)
  .jpeg({ quality: 76 })
  .toFile(dest);

console.log(`${list.length} candidates -> ${dest}`);
