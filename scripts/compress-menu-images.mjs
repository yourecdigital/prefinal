/**
 * Сжатие фото меню (аналог TinyPNG, локально через sharp/libwebp).
 * PNG/JPEG → WebP quality 90, max 1024px — визуально почти без потерь, ~85–90% меньше вес.
 *
 * Запуск: npm run compress-menu
 * Только новые/изменённые PNG: npm run compress-menu -- --skip-existing
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const menuDir = path.join(__dirname, "..", "public", "menu");

const MAX_SIDE = 1024;
const WEBP_QUALITY = 90;
const skipExisting = process.argv.includes("--skip-existing");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function kb(n) {
  return Math.round(n / 1024);
}

async function compressOne(input) {
  const out = input.replace(/\.(png|jpe?g)$/i, ".webp");
  if (skipExisting && fs.existsSync(out)) {
    const srcM = fs.statSync(input).mtimeMs;
    const outM = fs.statSync(out).mtimeMs;
    if (outM >= srcM) return null;
  }

  const before = fs.statSync(input).size;
  const meta = await sharp(input).metadata();
  const w = meta.width ?? MAX_SIDE;
  const h = meta.height ?? MAX_SIDE;
  const scale = Math.min(1, MAX_SIDE / Math.max(w, h));

  let pipeline = sharp(input);
  if (scale < 1) {
    pipeline = pipeline.resize({
      width: Math.round(w * scale),
      height: Math.round(h * scale),
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  await pipeline
    .webp({ quality: WEBP_QUALITY, effort: 6, smartSubsample: true })
    .toFile(out);

  const after = fs.statSync(out).size;
  fs.unlinkSync(input);

  const rel = path.relative(menuDir, input);
  const pct = before ? Math.round((1 - after / before) * 100) : 0;
  return { rel, before, after, pct };
}

const files = walk(menuDir);
if (!files.length) {
  console.log("compress-menu: нет PNG/JPEG в public/menu/");
  process.exit(0);
}

console.log(`compress-menu: ${files.length} файлов → WebP q${WEBP_QUALITY}, max ${MAX_SIDE}px\n`);

let totalBefore = 0;
let totalAfter = 0;
let done = 0;

for (const file of files) {
  try {
    const r = await compressOne(file);
    if (!r) continue;
    totalBefore += r.before;
    totalAfter += r.after;
    done++;
    console.log(`  ✓ ${r.rel}  ${kb(r.before)} → ${kb(r.after)} KB (−${r.pct}%)`);
  } catch (err) {
    console.error(`  ✗ ${path.relative(menuDir, file)}: ${err.message}`);
    process.exitCode = 1;
  }
}

console.log(
  `\nГотово: ${done} файлов, ${kb(totalBefore)} → ${kb(totalAfter)} KB (−${totalBefore ? Math.round((1 - totalAfter / totalBefore) * 100) : 0}%)`,
);
