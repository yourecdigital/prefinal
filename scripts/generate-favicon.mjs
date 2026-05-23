/**
 * Favicon «Вкусно как в Грузии» — стилизованный шашлык на углях (SVG, палитра сайта).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const appDir = path.join(root, "src", "app");
const uploadDir = path.join(root, "upload-favicon");

/** Палитра: тёмный фон, вино, золото, огонь мангала */
const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <defs>
    <radialGradient id="bg" cx="50%" cy="88%" r="72%">
      <stop offset="0%" stop-color="#4A2214"/>
      <stop offset="45%" stop-color="#1A100C"/>
      <stop offset="100%" stop-color="#080608"/>
    </radialGradient>
    <radialGradient id="ember" cx="50%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#FF7A2F" stop-opacity="0.95"/>
      <stop offset="35%" stop-color="#C93A22" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#080608" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stick" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5C3D28"/>
      <stop offset="100%" stop-color="#3A2418"/>
    </linearGradient>
    <linearGradient id="meat" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0A060"/>
      <stop offset="35%" stop-color="#D45A28"/>
      <stop offset="100%" stop-color="#8B3018"/>
    </linearGradient>
    <linearGradient id="meatHi" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFD9A8"/>
      <stop offset="100%" stop-color="#E87840" stop-opacity="0"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3"/>
    </filter>
  </defs>

  <rect width="512" height="512" rx="108" fill="url(#bg)"/>
  <rect width="512" height="512" rx="108" fill="url(#ember)"/>

  <!-- Угли -->
  <ellipse cx="256" cy="430" rx="200" ry="52" fill="#2A1208" opacity="0.9"/>
  <ellipse cx="180" cy="418" rx="48" ry="18" fill="#FF5C28" opacity="0.55" filter="url(#soft)"/>
  <ellipse cx="280" cy="440" rx="62" ry="22" fill="#FF8A3D" opacity="0.65" filter="url(#soft)"/>
  <ellipse cx="340" cy="412" rx="40" ry="16" fill="#E84820" opacity="0.5" filter="url(#soft)"/>
  <ellipse cx="120" cy="432" rx="28" ry="12" fill="#FFB347" opacity="0.45" filter="url(#soft)"/>
  <ellipse cx="400" cy="428" rx="34" ry="14" fill="#FF6B2C" opacity="0.4" filter="url(#soft)"/>

  <!-- Дым -->
  <path d="M200 120 C210 80 230 60 220 40" stroke="#C9A24D" stroke-width="6" stroke-linecap="round" opacity="0.12" filter="url(#soft)"/>
  <path d="M300 100 C320 70 310 45 330 30" stroke="#E8C878" stroke-width="5" stroke-linecap="round" opacity="0.1" filter="url(#soft)"/>

  <!-- Шампур -->
  <line x1="118" y1="398" x2="394" y2="108" stroke="url(#stick)" stroke-width="14" stroke-linecap="round"/>

  <!-- Куски шашлыка (сочные, с бликом) -->
  <g filter="url(#glow)">
    <ellipse cx="175" cy="328" rx="52" ry="36" fill="url(#meat)" transform="rotate(-32 175 328)"/>
    <ellipse cx="175" cy="322" rx="28" ry="14" fill="url(#meatHi)" transform="rotate(-32 175 322)" opacity="0.85"/>

    <ellipse cx="248" cy="268" rx="56" ry="38" fill="url(#meat)" transform="rotate(-32 248 268)"/>
    <ellipse cx="248" cy="260" rx="30" ry="15" fill="url(#meatHi)" transform="rotate(-32 248 260)" opacity="0.9"/>

    <ellipse cx="318" cy="208" rx="54" ry="36" fill="url(#meat)" transform="rotate(-32 318 208)"/>
    <ellipse cx="318" cy="200" rx="26" ry="13" fill="url(#meatHi)" transform="rotate(-32 318 200)" opacity="0.85"/>

    <ellipse cx="378" cy="152" rx="44" ry="30" fill="url(#meat)" transform="rotate(-32 378 152)"/>
    <ellipse cx="378" cy="146" rx="22" ry="11" fill="url(#meatHi)" transform="rotate(-32 378 146)" opacity="0.8"/>
  </g>

  <!-- Золотой акцент — обод как на сайте -->
  <rect x="8" y="8" width="496" height="496" rx="100" stroke="#C9A24D" stroke-width="3" opacity="0.22"/>
  <rect x="14" y="14" width="484" height="484" rx="96" stroke="#8B2020" stroke-width="1.5" opacity="0.35"/>
</svg>`;

async function renderIcon(size) {
  return sharp(Buffer.from(FAVICON_SVG), { density: Math.max(192, size * 2) })
    .resize(size, size, { fit: "cover" })
    .png()
    .toBuffer();
}

async function main() {
  const outputs = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
  ];

  for (const { name, size } of outputs) {
    fs.writeFileSync(path.join(publicDir, name), await renderIcon(size));
  }

  const icon512 = await renderIcon(512);
  fs.writeFileSync(path.join(appDir, "icon.png"), icon512);
  fs.copyFileSync(path.join(publicDir, "favicon-32x32.png"), path.join(publicDir, "favicon.ico"));

  fs.mkdirSync(uploadDir, { recursive: true });
  for (const f of ["favicon.ico", "icon.png", "apple-touch-icon.png"]) {
    const src = f === "icon.png" ? path.join(publicDir, "icon-512.png") : path.join(publicDir, f);
    if (f === "icon.png") {
      fs.copyFileSync(path.join(publicDir, "icon-512.png"), path.join(uploadDir, "icon.png"));
    } else {
      fs.copyFileSync(src, path.join(uploadDir, f));
    }
  }

  console.log("generate-favicon: стилизованный шашлык → public/, src/app/icon.png, upload-favicon/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
