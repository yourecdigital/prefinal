/**
 * После `next build` (output: "export") Next копирует в out/ только то, что уже есть в public/.
 * Проверяем наличие ключевых медиа-файлов грузинского сайта.
 *
 * Отключить: SKIP_VERIFY_EXPORT=1 npm run build
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");

/** SEO-лендинги /zakaz/{slug}/ */
const SEO_SLUGS = [
  "shashlyk-petergof",
  "shashlyk-lomonosov",
  "shashlyk-strelna",
  "khachapuri-dostavka",
  "lyulya-kebab-dostavka",
  "gruzinskaya-kuhnya-petergof",
  "grenki-dostavka",
  "mangal-na-dom",
];

/** Медиа из public/ — должны быть и в public/, и в out/ */
const REQUIRED_MEDIA = [
  "favicon.ico",
  "favicon-32x32.png",
  "apple-touch-icon.png",
  "icon-512.png",
  "og-image.png",
  "mountains/caucasus-far.png",
  "mountains/caucasus-mid.png",
  "mountains/caucasus-near.png",
  "menu/mangal/kare-yagnenka.webp",
  "menu/mangal/myakot-baraniny.webp",
  "videos/grill-shashlik.mp4",
  "videos/grill-shashlik-poster.jpg",
];

/** Страницы, которые генерирует next build (только out/) */
const SHORT_URLS = ["petergof", "lomonosov", "strelna"];

const REQUIRED_PAGES_IN_OUT = [
  "404.html",
  ...SHORT_URLS.map((p) => `${p}/index.html`),
  ...SEO_SLUGS.map((slug) => `zakaz/${slug}/index.html`),
  "nginx-static.conf",
  "nginx-gvkusno.conf",
];

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

if (process.env.SKIP_VERIFY_EXPORT === "1") {
  console.log("verify-static-export: пропущено (SKIP_VERIFY_EXPORT=1)");
  process.exit(0);
}

if (!exists(outDir)) {
  console.error("verify-static-export: нет папки out/. Сначала npm run build.");
  process.exit(1);
}

const missingOut = [];
const missingPublic = [];

for (const rel of REQUIRED_MEDIA) {
  const o = path.join(outDir, rel);
  const p = path.join(publicDir, rel);
  if (!exists(o)) missingOut.push(rel);
  if (!exists(p)) missingPublic.push(rel);
}

for (const rel of REQUIRED_PAGES_IN_OUT) {
  if (!exists(path.join(outDir, rel))) missingOut.push(rel);
}

for (const slug of SEO_SLUGS) {
  const flat = path.join(outDir, `zakaz/${slug}/__next.zakaz.$d$slug.__PAGE__.txt`);
  const nested = path.join(outDir, "zakaz", slug, "__next.zakaz", "$d$slug", "__PAGE__.txt");
  if (!exists(flat) && !exists(nested)) {
    missingOut.push(`zakaz/${slug}/ (RSC __PAGE__.txt)`);
  }
}

if (missingPublic.length) {
  console.error(
    "\n❌ В public/ нет файлов, без них статический сайт будет неполным:\n",
    missingPublic.map((f) => `   - public/${f}`).join("\n"),
    "\n\nСкопируйте медиа в public/, затем снова npm run build.\n",
  );
  process.exit(1);
}

if (missingOut.length) {
  console.error(
    "\n❌ В out/ отсутствуют файлы после сборки (ожидалось копирование из public/):\n",
    missingOut.map((f) => `   - out/${f}`).join("\n"),
    "\n\nУдалите кэш (.next), проверьте права на файлы и пересоберите: npm run build\n",
  );
  process.exit(1);
}

console.log("✅ verify-static-export: все обязательные медиа на месте в out/.");
