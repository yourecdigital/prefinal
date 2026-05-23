/**
 * Упаковка out/ в deploy.zip для FTP / файлового менеджера (WebHOST1 и др.).
 * Сначала: npm run build:prod
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out");

if (!fs.existsSync(outDir)) {
  console.error("Нет папки out/. Сначала: npm run build:prod");
  process.exit(1);
}

const zipPath = path.join(root, "deploy.zip");

if (process.platform === "win32") {
  const r = spawnSync(
    "powershell",
    [
      "-NoProfile",
      "-Command",
      `Compress-Archive -Path "${outDir}\\*" -DestinationPath "${zipPath}" -Force`,
    ],
    { stdio: "inherit" },
  );
  process.exit(r.status ?? 1);
}

spawnSync("zip", ["-r", zipPath, "."], { cwd: outDir, stdio: "inherit" });
console.log(`\n✅ ${zipPath}`);
