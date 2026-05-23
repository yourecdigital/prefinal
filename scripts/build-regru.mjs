/**
 * Production-сборка для REG.RU (сайт в корне домена, без basePath).
 *
 *   SITE_URL=https://ваш-домен.ru npm run build:regru
 *   copy .env.production → переменные подхватятся автоматически
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(name) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const fileEnv = { ...loadEnvFile(".env.production"), ...loadEnvFile(".env.production.local") };
const siteUrl = (process.env.SITE_URL ?? fileEnv.SITE_URL ?? "https://gvkusno.ru").replace(/\/$/, "");

const env = {
  ...process.env,
  ...fileEnv,
  SITE_URL: siteUrl,
  NEXT_PUBLIC_SITE_URL: siteUrl,
  BASE_PATH: "",
  NEXT_PUBLIC_BASE_PATH: "",
};

console.log(`build:regru → SITE_URL=${siteUrl}, BASE_PATH=(корень)\n`);

const r = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["run", "build"], {
  cwd: root,
  env,
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(r.status ?? 1);
