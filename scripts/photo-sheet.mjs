/**
 * Contact sheet of the placeholder photography, so the whole set can be judged
 * at a glance instead of opening 55 files.
 *
 *   npm run photos:sheet -- all sheet.jpg
 *   npm run photos:sheet -- products products.jpg
 *
 * Groups: hero | products | brand | customers | all
 */
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const OUT = String.raw`C:\Users\user\Desktop\try-jesus\public\images`;
const DEST = process.argv[3];
const group = process.argv[2];

const dirs = group === "all" ? ["hero", "brand", "products", "customers"] : [group];
const files = [];
for (const d of dirs) {
  for (const f of (await readdir(path.join(OUT, d))).filter((f) => f.endsWith(".jpg"))) {
    files.push({ dir: d, name: f, full: path.join(OUT, d, f) });
  }
}
files.sort((a, b) => (a.dir + a.name).localeCompare(b.dir + b.name));

const CELL = 260;
const COLS = 6;
const rows = Math.ceil(files.length / COLS);
const LABEL = 22;

const tiles = [];
for (const [i, f] of files.entries()) {
  const buf = await sharp(f.full)
    .resize(CELL, CELL - LABEL, { fit: "cover", position: "centre" })
    .toBuffer();
  tiles.push({
    input: buf,
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * CELL,
  });
  const svg = Buffer.from(
    `<svg width="${CELL}" height="${LABEL}"><rect width="${CELL}" height="${LABEL}" fill="#111"/><text x="4" y="15" font-family="Arial" font-size="12" fill="#fff">${f.dir}/${f.name.replace(".jpg", "")}</text></svg>`,
  );
  tiles.push({
    input: svg,
    left: (i % COLS) * CELL,
    top: Math.floor(i / COLS) * CELL + (CELL - LABEL),
  });
}

await sharp({
  create: {
    width: COLS * CELL,
    height: rows * CELL,
    channels: 3,
    background: { r: 30, g: 30, b: 30 },
  },
})
  .composite(tiles)
  .jpeg({ quality: 78 })
  .toFile(DEST);

console.log(`${files.length} tiles -> ${DEST}`);
