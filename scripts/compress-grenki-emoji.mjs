import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "telegram-emojis");
const input = path.join(dir, "grenki-sliced.gif");
const output = path.join(dir, "grenki.gif");

if (!fs.existsSync(input)) {
  console.error("нет grenki-sliced.gif");
  process.exit(1);
}

const r = spawnSync(
  ffmpegInstaller.path,
  [
    "-y", "-i", input,
    "-vf", "scale=96:96:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=48[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3",
    "-loop", "0",
    output,
  ],
  { stdio: "inherit" },
);

if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`✓ grenki.gif — ${Math.round(fs.statSync(output).size / 1024)} KB`);
