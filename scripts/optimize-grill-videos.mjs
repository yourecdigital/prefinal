/**
 * Сжимает стоковые ролики до квадратных loop-клипов для главной и «О нас».
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
  { input: "grill-close-raw.mp4", output: "grill-mangal.mp4", start: 2, duration: 7 },
  { input: "grill-outdoor-raw.mp4", output: "grill-chef.mp4", start: 5, duration: 8 },
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
    "-vf", "scale=480:480:force_original_aspect_ratio=increase,crop=480:480,fps=24,format=yuv420p",
    "-an",
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-crf", "30",
    "-movflags", "+faststart",
    "-pix_fmt", "yuv420p",
    output,
  ]);
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log(`  ✓ ${kb} KB`);
}

console.log("done");
