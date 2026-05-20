/**
 * Копирует нужные Telegram animated emoji в public/telegram-emojis/
 * Полный набор: https://github.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "telegram-emojis");
const BASE = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main";

/** id на сайте → путь в репозитории */
const MAP = {
  fire: "Travel%20and%20Places/Fire.webp",
  herb: "Animals%20and%20Nature/Herb.webp",
  rocket: "Travel%20and%20Places/Rocket.webp",
  heart: "Smileys%20and%20Emotion/Red%20Heart.webp",
  party: "Activities/Party%20Popper.webp",
  gift: "Activities/Wrapped%20Gift.webp",
  fork_plate: "Food%20and%20Drink/Fork%20And%20Knife%20With%20Plate.webp",
  bento: "Food%20and%20Drink/Bento%20Box.webp",
  flatbread: "Food%20and%20Drink/Stuffed%20Flatbread.webp",
  bun: "Food%20and%20Drink/Pretzel.webp",
  mushroom: "Food%20and%20Nature/Mushroom.webp",
  shashlik: "Food%20and%20Drink/Oden.webp",
  grenki: "Food%20and%20Drink/Sandwich.webp",
  clover: "Animals%20and%20Nature/Four%20Leaf%20Clover.webp",
  hot_face: "Smileys%20and%20Emotion/Hot%20Face.webp",
  stew: "Food%20and%20Drink/Steaming%20Bowl.webp",
  fries: "Food%20and%20Drink/French%20Fries.webp",
  sauce: "Food%20and%20Drink/Pouring%20Liquid.webp",
  stopwatch: "Travel%20and%20Places/Stopwatch.webp",
  money: "Objects/Money%20Bag.webp",
  compass: "Travel%20and%20Places/Compass.webp",
  check: "Symbols/Check%20Mark%20Button.webp",
  phone: "Objects/Mobile%20Phone.webp",
  mobile: "Objects/Mobile%20Phone%20With%20Arrow.webp",
  speech: "Smileys%20and%20Emotion/Speech%20Balloon.webp",
  wine: "Food%20and%20Drink/Wine%20Glass.webp",
  meat: "Food%20and%20Drink/Meat%20On%20Bone.webp",
  cooking: "Food%20and%20Drink/Cooking.webp",
  confetti: "Activities/Confetti%20Ball.webp",
  cart: "Objects/Shopping%20Cart.webp",
};

fs.mkdirSync(outDir, { recursive: true });

for (const [id, repoPath] of Object.entries(MAP)) {
  const url = `${BASE}/${repoPath}`;
  const dest = path.join(outDir, `${id}.webp`);
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`skip ${id}: ${res.status}`);
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${id}.webp`);
}

console.log("done");
