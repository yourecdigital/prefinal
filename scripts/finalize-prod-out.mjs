/**
 * Финальная подготовка out/ для деплоя на WebHOST1 (nginx + статика).
 * Гарантирует 404.html в корне и наличие конфигов nginx / .htaccess.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");
const publicDir = path.join(root, "public");

const DEPLOY_ROOT_FILES = [
  "404.html",
  ".htaccess",
  "nginx-static.conf",
  "nginx-gvkusno.conf",
  "robots.txt",
  "sitemap.xml",
  "favicon.ico",
  "og-image.png",
  "yandex_6d0cf49f23c5dc30.html",
];

const COPY_FROM_PUBLIC = [
  ".htaccess",
  ".htaccess.no-ssl",
  "nginx-static.conf",
  "nginx-gvkusno.conf",
  "yandex_6d0cf49f23c5dc30.html",
];

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

if (!exists(outDir)) {
  console.error("finalize-prod-out: нет out/");
  process.exit(1);
}

for (const rel of COPY_FROM_PUBLIC) {
  const src = path.join(publicDir, rel);
  const dest = path.join(outDir, rel);
  if (exists(src) && !exists(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`finalize-prod-out: скопирован public/${rel} → out/${rel}`);
  }
}

const out404 = path.join(outDir, "404.html");
if (!exists(out404)) {
  const fallbacks = [
    path.join(outDir, "404", "index.html"),
    path.join(outDir, "_not-found", "index.html"),
  ];
  for (const src of fallbacks) {
    if (exists(src)) {
      fs.copyFileSync(src, out404);
      console.log(`finalize-prod-out: 404.html создан из ${path.relative(outDir, src)}`);
      break;
    }
  }
}

const errors = [];

for (const rel of DEPLOY_ROOT_FILES) {
  if (!exists(path.join(outDir, rel))) errors.push(`out/${rel}`);
}

if (exists(out404)) {
  const html = fs.readFileSync(out404, "utf8");
  if (!html.includes("не туда") && !html.includes("заблудился")) {
    errors.push("out/404.html — не похож на кастомную страницу 404");
  }
  if (!html.includes("noindex")) {
    errors.push("out/404.html — нет noindex");
  }
} else {
  errors.push("out/404.html — файл отсутствует (обязателен для nginx error_page)");
}

if (errors.length) {
  console.error("\n❌ finalize-prod-out:\n", errors.map((e) => `   - ${e}`).join("\n"), "\n");
  process.exit(1);
}

console.log("✅ finalize-prod-out: 404.html, nginx-конфиги и файлы деплоя в out/ готовы.");
