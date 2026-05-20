/**
 * Копирует фото из «Меню грузия» (только папки N …) в public/menu/
 * При нескольких фото в папке берётся самый большой файл.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicMenu = path.join(root, "public", "menu");

/** folder title (after number) → { category, slug, menuName? } */
const DISH_MAP = {
  "Каре ягнёнка": { category: "mangal", slug: "kare-yagnenka" },
  "Куриные крылышки": { category: "mangal", slug: "kurinye-krylyshki" },
  "Люля баранина": { category: "mangal", slug: "lyulya-baranina" },
  "Мякоть баранины": { category: "mangal", slug: "myakot-baraniny" },
  "Люля свинина": { category: "mangal", slug: "lyulya-svinina" },
  "Антрекот свинина": { category: "mangal", slug: "antrekot-svinina" },
  "Свиные рёбра": { category: "mangal", slug: "svinye-ryobra" },
  "Шашлык из куры": { category: "mangal", slug: "shashlik-kura" },
  "Шашлыке из свинины (окорок)": { category: "mangal", slug: "shashlik-svinina-okorok", menuName: "Шашлык из свинины (окорок)" },
  "Шашлыке из свинины (шея)": { category: "mangal", slug: "shashlik-svinina-sheya", menuName: "Шашлык из свинины (шея)" },
  "Люля курица": { category: "mangal", slug: "lyulya-kuritsa" },
  "Овощи на мангале": { category: "mangal", slug: "ovoshi-mangal" },
  "Мангал салат": { category: "mangal", slug: "mangal-salat" },
  "Картофель айдахо": { category: "sides", slug: "kartofel-aydaho" },
  "Картофель фри": { category: "sides", slug: "kartofel-fri" },
  "Картофель Айдахо с аджикой": { category: "sides", slug: "aydaho-adzhika", menuName: "Айдахо с аджикой" },
  "Картофель фри с сыром сулугуни": { category: "sides", slug: "fri-suluguni", menuName: "Фри с сулугуни" },
  "Сацебели": { category: "sauces", slug: "sacebeli" },
  "Аджика": { category: "sauces", slug: "adjika" },
  "Чесночный": { category: "sauces", slug: "chesnochnyj" },
  "Кетчуп": { category: "sauces", slug: "ketchup" },
  "Сырный": { category: "sauces", slug: "syrnyj" },
  "Барбекю": { category: "sauces", slug: "barbekyu" },
  "Сметана": { category: "sauces", slug: "smetana" },
  "Сет «Классик»": { category: "sets", slug: "set-klassik" },
  "Сет «Премиум»": { category: "sets", slug: "set-premium" },
  "Сет «Семейный»": { category: "sets", slug: "set-semejnyj" },
  "Комбо 1": { category: "sets", slug: "kombo-1" },
  "Комбо 2": { category: "sets", slug: "kombo-2" },
  "Аджапсандал": { category: "cold-starters", slug: "adjapsandal" },
  "Цезарь с креветками": { category: "salads", slug: "cezar-krevetki" },
  "Цезарь с курицей": { category: "salads", slug: "cezar-kuritsa" },
  "Салат по грузински": { category: "salads", slug: "salat-gruzinski", menuName: "Салат по-грузински" },
  "Салат с баклажанами": { category: "salads", slug: "salat-baklazhany" },
  "Салат с хрустящими баклажанами": { category: "salads", slug: "salat-hrustyashchie-baklazhany" },
  "Ассорти сыров": { category: "cold-starters", slug: "assorti-syrov" },
  "Ассорти из Домашних солений": { category: "cold-starters", slug: "domashnie-solenya", menuName: "Домашние соленья" },
  "Сельдь с картофелем": { category: "cold-starters", slug: "seld-s-kartofelem" },
};

function findMenuRoot() {
  const desktop = path.join(process.env.USERPROFILE ?? "", "Desktop");
  for (const name of fs.readdirSync(desktop, { withFileTypes: true })) {
    if (!name.isDirectory()) continue;
    const dir = path.join(desktop, name.name);
    const hasOne = fs.readdirSync(dir, { withFileTypes: true }).some((d) => d.isDirectory() && /^1\s/.test(d.name));
    if (hasOne) return dir;
  }
  throw new Error("Папка «Меню грузия» не найдена на рабочем столе");
}

function pickBestImage(dir) {
  const imgs = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      imgs.push(...pickBestImage(full));
      continue;
    }
    if (!/\.(png|jpe?g|webp)$/i.test(entry.name)) continue;
    imgs.push(full);
  }
  if (!imgs.length) return null;
  return imgs.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size)[0];
}

const menuRoot = findMenuRoot();
const copied = [];
const skipped = [];

for (const entry of fs.readdirSync(menuRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const m = entry.name.match(/^(\d+)\s+(.+)$/);
  if (!m) continue;

  const title = m[2].trim();
  const meta = DISH_MAP[title];
  if (!meta) {
    skipped.push({ folder: entry.name, reason: "нет в карте блюд" });
    continue;
  }

  const src = pickBestImage(path.join(menuRoot, entry.name));
  if (!src) {
    skipped.push({ folder: entry.name, reason: "нет фото" });
    continue;
  }

  const ext = path.extname(src).toLowerCase();
  const outDir = path.join(publicMenu, meta.category);
  fs.mkdirSync(outDir, { recursive: true });
  const dest = path.join(outDir, `${meta.slug}${ext}`);
  fs.copyFileSync(src, dest);
  copied.push({
    folder: entry.name,
    menuName: meta.menuName ?? title,
    image: `/menu/${meta.category}/${meta.slug}${ext}`,
    from: src,
  });
}

console.log(JSON.stringify({ menuRoot, copied, skipped }, null, 2));
console.log(`\n✅ Скопировано: ${copied.length}, пропущено: ${skipped.length}`);
