/**
 * Доп. сжатие фото напитков/коктейлей — карточки маленькие, хватит 768px WebP q85.
 * Запуск: npm run compress-drinks
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const drinksDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "menu", "drinks");
const MAX = 768;
const Q = 85;

function kb(n) {
  return Math.round(n / 1024);
}

const files = fs.readdirSync(drinksDir).filter((f) => /\.webp$/i.test(f));
let before = 0;
let after = 0;

for (const name of files) {
  const file = path.join(drinksDir, name);
  const sizeBefore = fs.statSync(file).size;
  const tmp = path.join(os.tmpdir(), `gvkusno-drink-${Date.now()}-${name}`);
  const buf = await sharp(file)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: Q, effort: 6, smartSubsample: true })
    .toBuffer();
  fs.writeFileSync(tmp, buf);
  fs.unlinkSync(file);
  fs.copyFileSync(tmp, file);
  fs.unlinkSync(tmp);
  before += sizeBefore;
  after += buf.length;
  console.log(`  ✓ ${name}  ${kb(sizeBefore)} → ${kb(buf.length)} KB`);
}

console.log(`\nНапитки: ${files.length} файлов, ${kb(before)} → ${kb(after)} KB (−${before ? Math.round((1 - after / before) * 100) : 0}%)`);
