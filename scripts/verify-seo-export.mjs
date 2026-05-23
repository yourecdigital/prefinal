/**
 * Проверка SEO в статическом out/ после сборки.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

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

const PAGES = [
  { file: "index.html", checks: ["canonical", "og:image", "og:title", "application/ld+json", "Restaurant"] },
  { file: "menu/index.html", checks: ["canonical", "og:image", "og:description", "<h1"] },
  { file: "delivery/index.html", checks: ["canonical", "og:image", "FAQPage", "<h1"] },
  { file: "about/index.html", checks: ["canonical", "og:image", "<h1"] },
  { file: "contacts/index.html", checks: ["canonical", "og:image"] },
  { file: "privacy/index.html", checks: ["canonical"] },
  { file: "offer/index.html", checks: ["canonical"] },
  { file: "404.html", checks: ["noindex", "не туда"] },
  ...SEO_SLUGS.map((slug) => ({
    file: `zakaz/${slug}/index.html`,
    checks: ["canonical", "og:image", "og:title", "WebPage", "<h1"],
  })),
];

function read(rel) {
  const p = path.join(outDir, rel);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, "utf8");
}

if (!fs.existsSync(outDir)) {
  console.error("verify-seo-export: нет out/");
  process.exit(1);
}

const errors = [];

for (const { file, checks } of PAGES) {
  const html = read(file);
  if (!html) {
    errors.push(`нет файла: ${file}`);
    continue;
  }
  for (const c of checks) {
    if (!html.includes(c)) errors.push(`${file}: нет «${c}»`);
  }
  if (
    file !== "404.html" &&
    html.includes("canonical") &&
    !html.includes("https://gvkusno.ru")
  ) {
    errors.push(`${file}: canonical без абсолютного URL`);
  }
}

const sitemap = read("sitemap.xml");
if (!sitemap) {
  errors.push("нет sitemap.xml");
} else {
  for (const slug of SEO_SLUGS) {
    if (!sitemap.includes(`/zakaz/${slug}/`)) errors.push(`sitemap.xml: нет /zakaz/${slug}/`);
  }
  if (!sitemap.includes("<loc>https://gvkusno.ru/menu/</loc>")) {
    errors.push("sitemap.xml: нет /menu/");
  }
}

const robots = read("robots.txt");
if (!robots?.includes("sitemap")) errors.push("robots.txt: нет ссылки на sitemap");

if (errors.length) {
  console.error("\n❌ verify-seo-export:\n", errors.map((e) => `   - ${e}`).join("\n"), "\n");
  process.exit(1);
}

console.log(`✅ verify-seo-export: ${PAGES.length} страниц, sitemap и robots в порядке.`);
