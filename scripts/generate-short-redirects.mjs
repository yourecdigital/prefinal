/**
 * Короткие URL для рекламы и закладок: /lomonosov → /zakaz/shashlyk-lomonosov/
 * HTML в public/ копируется в out/ при сборке; правила дописываются в .htaccess.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const htaccessPath = path.join(publicDir, ".htaccess");

/** from: сегмент в корне домена → to: slug SEO-лендинга */
const REDIRECTS = [
  { from: "petergof", to: "shashlyk-petergof" },
  { from: "lomonosov", to: "shashlyk-lomonosov" },
  { from: "strelna", to: "shashlyk-strelna" },
];

const MARKER_START = "  # --- короткие URL (generate-short-redirects.mjs) ---";
const MARKER_END = "  # --- /короткие URL ---";

function redirectHtml(targetPath) {
  const safe = targetPath.replace(/"/g, "");
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="robots" content="noindex, follow" />
  <meta http-equiv="refresh" content="0;url=${safe}" />
  <link rel="canonical" href="https://gvkusno.ru${safe}" />
  <title>Перенаправление…</title>
  <script>location.replace("${safe}");</script>
</head>
<body>
  <p><a href="${safe}">Перейти на страницу доставки</a></p>
</body>
</html>
`;
}

function rewriteBlock() {
  const lines = [MARKER_START];
  for (const { from, to } of REDIRECTS) {
    lines.push(`  RewriteRule ^${from}/?$ /zakaz/${to}/ [R=301,L]`);
  }
  lines.push(MARKER_END);
  return lines.join("\n");
}

function patchHtaccess() {
  let content = fs.readFileSync(htaccessPath, "utf8");
  const block = rewriteBlock();

  if (content.includes(MARKER_START)) {
    const re = new RegExp(
      `${MARKER_START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${MARKER_END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
    );
    content = content.replace(re, block);
  } else {
    content = content.replace(
      /(RewriteRule \^ https:\/\/%1%\{REQUEST_URI\} \[R=301,L\]\r?\n)/,
      `$1\n${block}\n`,
    );
  }

  fs.writeFileSync(htaccessPath, content);
}

for (const { from, to } of REDIRECTS) {
  const dir = path.join(publicDir, from);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), redirectHtml(`/zakaz/${to}/`), "utf8");
}

patchHtaccess();
console.log(
  `generate-short-redirects: ${REDIRECTS.map((r) => `/${r.from} → /zakaz/${r.to}/`).join(", ")}`,
);
