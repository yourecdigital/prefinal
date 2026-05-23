/**
 * Next.js 16 static export: клиент запрашивает RSC как
 *   /menu/__next.menu.__PAGE__.txt
 * а экспорт кладёт файл в
 *   /menu/__next.menu/__PAGE__.txt
 * Nginx на WebHOST1 не делает такой маппинг — копируем «плоские» имена.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");

if (!fs.existsSync(outDir)) {
  console.error("flatten-next-rsc: нет папки out/");
  process.exit(1);
}

let copied = 0;

function flattenNextDir(routeDir, nextDirName, nextPath) {
  function walk(rel = "") {
    const full = path.join(nextPath, rel);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(full)) {
        walk(rel ? path.join(rel, name) : name);
      }
      return;
    }
    const relPosix = rel.split(path.sep).join("/");
    const flatName = relPosix ? `${nextDirName}.${relPosix.replace(/\//g, ".")}` : nextDirName;
    const dest = path.join(routeDir, flatName);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(full, dest);
    copied++;
  }
  for (const name of fs.readdirSync(nextPath)) walk(name);
}

function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.") && !entry.name.endsWith(".txt")) {
      flattenNextDir(dir, entry.name, full);
    } else if (!entry.name.startsWith("_next")) {
      scan(full);
    }
  }
}

scan(outDir);
console.log(`flatten-next-rsc: ${copied} RSC-файлов для nginx/Apache`);
