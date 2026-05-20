import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const menuPath = path.join(__dirname, "..", "src", "lib", "georgian-menu.ts");

const images = {
  "Каре ягнёнка": "/menu/mangal/kare-yagnenka.png",
  "Мякоть баранины": "/menu/mangal/myakot-baraniny.png",
  "Шашлык из свинины (шея)": "/menu/mangal/shashlik-svinina-sheya.png",
  "Шашлык из свинины (окорок)": "/menu/mangal/shashlik-svinina-okorok.png",
  "Антрекот свинина": "/menu/mangal/antrekot-svinina.png",
  "Свиные рёбра": "/menu/mangal/svinye-ryobra.png",
  "Шашлык из куры": "/menu/mangal/shashlik-kura.png",
  "Куриные крылышки": "/menu/mangal/kurinye-krylyshki.png",
  "Люля баранина": "/menu/mangal/lyulya-baranina.png",
  "Люля свинина": "/menu/mangal/lyulya-svinina.png",
  "Люля курица": "/menu/mangal/lyulya-kuritsa.png",
  "Овощи на мангале": "/menu/mangal/ovoshi-mangal.png",
  "Мангал салат": "/menu/mangal/mangal-salat.png",
  "Сет «Классик»": "/menu/sets/set-klassik.png",
  "Сет «Премиум»": "/menu/sets/set-premium.png",
  "Сет «Семейный»": "/menu/sets/set-semejnyj.png",
  "Комбо 1": "/menu/sets/kombo-1.png",
  "Комбо 2": "/menu/sets/kombo-2.png",
  "Аджапсандал": "/menu/cold-starters/adjapsandal.png",
  "Ассорти сыров": "/menu/cold-starters/assorti-syrov.png",
  "Домашние соленья": "/menu/cold-starters/domashnie-solenya.png",
  "Сельдь с картофелем": "/menu/cold-starters/seld-s-kartofelem.png",
  "Цезарь с курицей": "/menu/salads/cezar-kuritsa.png",
  "Цезарь с креветками": "/menu/salads/cezar-krevetki.png",
  "Салат по-грузински": "/menu/salads/salat-gruzinski.png",
  "Салат с баклажанами": "/menu/salads/salat-baklazhany.png",
  "Салат с хрустящими баклажанами": "/menu/salads/salat-hrustyashchie-baklazhany.png",
  "Картофель айдахо": "/menu/sides/kartofel-aydaho.png",
  "Картофель фри": "/menu/sides/kartofel-fri.png",
  "Айдахо с аджикой": "/menu/sides/aydaho-adzhika.png",
  "Фри с сулугуни": "/menu/sides/fri-suluguni.png",
  "Сацебели": "/menu/sauces/sacebeli.png",
  "Аджика": "/menu/sauces/adjika.png",
  "Чесночный": "/menu/sauces/chesnochnyj.png",
  "Кетчуп": "/menu/sauces/ketchup.png",
  "Сырный": "/menu/sauces/syrnyj.png",
  "Барбекю": "/menu/sauces/barbekyu.png",
  "Сметана": "/menu/sauces/smetana.png",
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
