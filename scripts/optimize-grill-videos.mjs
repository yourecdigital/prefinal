/**
 * Сжимает стоковые ролики:
 * - grill-shashlik.mp4 + poster — крупный план шашлыка на углях (главная)
 * - grill-about.mp4 — 16:9, атмосфера мангала («О нас»)
 * Запуск: node scripts/optimize-grill-videos.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const videosDir = path.join(root, "public", "videos");
const ffmpeg = ffmpegInstaller.path;

const JOBS = [
  {
    input: "grill-close-raw.mp4",
    output: "grill-shashlik.mp4",
    poster: "grill-shashlik-poster.jpg",
    start: 4,
    duration: 6,
    /** Кроп чуть выше центра — шашлык и угли в кадре */
    vf: "scale=720:720:force_original_aspect_ratio=increase,crop=480:480:(iw-480)/2:(ih-480)/2+ih*0.06,fps=24,format=yuv420p",
  },
  {
    input: "grill-close-raw.mp4",
    output: "grill-about.mp4",
    start: 2,
    duration: 7,
    vf: "scale=854:480:force_original_aspect_ratio=increase,crop=854:480,fps=24,format=yuv420p",
  },
];

function run(args) {
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

for (const job of JOBS) {
  const input = path.join(videosDir, job.input);
  const output = path.join(videosDir, job.output);
  if (!fs.existsSync(input)) {
    console.warn(`skip: нет ${job.input}`);
    continue;
  }
  console.log(`→ ${job.output}`);
  run([
    "-y",
    "-ss", String(job.start),
    "-i", input,
    "-t", String(job.duration),
    "-vf", job.vf,
    "-an",
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "28",
    "-movflags", "+faststart",
    "-pix_fmt", "yuv420p",
    output,
  ]);
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log(`  ✓ ${kb} KB`);

  if (job.poster) {
    const poster = path.join(videosDir, job.poster);
    console.log(`→ ${job.poster}`);
    run([
      "-y",
      "-ss", String(job.start + 0.5),
      "-i", input,
      "-vf", job.vf,
      "-frames:v", "1",
      "-q:v", "3",
      poster,
    ]);
    console.log(`  ✓ ${Math.round(fs.statSync(poster).size / 1024)} KB`);
  }
}

console.log("done");
