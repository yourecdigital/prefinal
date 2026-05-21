/**
 * После compress-menu-images.mjs — меняет .png → .webp в данных меню.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "src/lib/georgian-menu.ts",
  "src/lib/menu-drinks.ts",
  "scripts/patch-menu-images.mjs",
  "scripts/verify-static-export.mjs",
];

for (const rel of files) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  const src = fs.readFileSync(file, "utf8");
  const next = src.replace(/\/menu\/([^"']+)\.png/g, "/menu/$1.webp");
  if (next !== src) {
    fs.writeFileSync(file, next);
    console.log(`patch-menu-webp: ${rel}`);
  }
}
