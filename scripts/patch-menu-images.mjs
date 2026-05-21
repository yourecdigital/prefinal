import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const menuPath = path.join(__dirname, "..", "src", "lib", "georgian-menu.ts");

const images = {
  "Каре ягнёнка": "/menu/mangal/kare-yagnenka.webp",
  "Мякоть баранины": "/menu/mangal/myakot-baraniny.webp",
  "Шашлык из свинины (шея)": "/menu/mangal/shashlik-svinina-sheya.webp",
  "Шашлык из свинины (окорок)": "/menu/mangal/shashlik-svinina-okorok.webp",
  "Антрекот свинина": "/menu/mangal/antrekot-svinina.webp",
  "Свиные рёбра": "/menu/mangal/svinye-ryobra.webp",
  "Шашлык из куры": "/menu/mangal/shashlik-kura.webp",
  "Куриные крылышки": "/menu/mangal/kurinye-krylyshki.webp",
  "Люля баранина": "/menu/mangal/lyulya-baranina.webp",
  "Люля свинина": "/menu/mangal/lyulya-svinina.webp",
  "Люля курица": "/menu/mangal/lyulya-kuritsa.webp",
  "Овощи на мангале": "/menu/mangal/ovoshi-mangal.webp",
  "Мангал салат": "/menu/mangal/mangal-salat.webp",
  "Сет «Классик»": "/menu/sets/set-klassik.webp",
  "Сет «Премиум»": "/menu/sets/set-premium.webp",
  "Сет «Семейный»": "/menu/sets/set-semejnyj.webp",
  "Комбо 1": "/menu/sets/kombo-1.webp",
  "Комбо 2": "/menu/sets/kombo-2.webp",
  "Аджапсандал": "/menu/cold-starters/adjapsandal.webp",
  "Ассорти сыров": "/menu/cold-starters/assorti-syrov.webp",
  "Домашние соленья": "/menu/cold-starters/domashnie-solenya.webp",
  "Сельдь с картофелем": "/menu/cold-starters/seld-s-kartofelem.webp",
  "Цезарь с курицей": "/menu/salads/cezar-kuritsa.webp",
  "Цезарь с креветками": "/menu/salads/cezar-krevetki.webp",
  "Салат по-грузински": "/menu/salads/salat-gruzinski.webp",
  "Салат с баклажанами": "/menu/salads/salat-baklazhany.webp",
  "Салат с хрустящими баклажанами": "/menu/salads/salat-hrustyashchie-baklazhany.webp",
  "Картофель айдахо": "/menu/sides/kartofel-aydaho.webp",
  "Картофель фри": "/menu/sides/kartofel-fri.webp",
  "Айдахо с аджикой": "/menu/sides/aydaho-adzhika.webp",
  "Фри с сулугуни": "/menu/sides/fri-suluguni.webp",
  "Сацебели": "/menu/sauces/sacebeli.webp",
  "Аджика": "/menu/sauces/adjika.webp",
  "Чесночный": "/menu/sauces/chesnochnyj.webp",
  "Кетчуп": "/menu/sauces/ketchup.webp",
  "Сырный": "/menu/sauces/syrnyj.webp",
  "Барбекю": "/menu/sauces/barbekyu.webp",
  "Сметана": "/menu/sauces/smetana.webp",
};

let src = fs.readFileSync(menuPath, "utf8");
let updated = 0;

for (const [name, image] of Object.entries(images)) {
  const blockRe = new RegExp(
    `(\\{\\s*name:\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?)(shortDesc:)`,
  );
  const match = src.match(blockRe);
  if (!match) {
    console.warn("not found:", name);
    continue;
  }
  let block = match[1];
  if (/image:\s*"/.test(block)) {
    block = block.replace(/image:\s*"[^"]+"/, `image: "${image}"`);
  } else {
    block = block.replace(/(price:\s*\d+,)/, `$1\n        image: "${image}",`);
  }
  src = src.replace(match[1], block);
  updated += 1;
}

fs.writeFileSync(menuPath, src);
console.log(`Updated ${updated} menu items with images.`);
