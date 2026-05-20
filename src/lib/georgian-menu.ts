import type { TelegramEmojiId } from "@/lib/telegram-emoji";
import { SITE_URL } from "@/lib/seo";

export interface MenuItem {
  name: string;
  price: number;
  unit?: string;
  badge?: "хит" | "новинка" | "акция";
  desc?: string;
  shortDesc: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  emoji: TelegramEmojiId;
  items: MenuItem[];
}

/** 47 позиций — меню из папок «Меню Грузия» + горячие закуски */
export const MENU: MenuCategory[] = [
  {
    id: "mangal",
    title: "Мангал",
    emoji: "fire",
    items: [
      {
        name: "Каре ягнёнка",
        price: 1250,
        badge: "хит",
        image: "/menu/mangal/kare-yagnenka.png",
        shortDesc: "Нежнейшие рёбрышки на кости, обжаренные на углях с пряным дымком — тают во рту",
        desc: "Каре ягнёнка на углях — фирменная позиция мангала. Мясо сочное, с лёгким дымком и пряной корочкой, подаётся с красным луком и свежей зеленью.",
      },
      {
        name: "Куриные крылышки",
        price: 550,
        image: "/menu/mangal/kurinye-krylyshki.png",
        shortDesc: "Хрустящие крылышки с мангала — идеальная закуска с аджикой",
      },
      {
        name: "Люля баранина",
        price: 1050,
        image: "/menu/mangal/lyulya-baranina.png",
        shortDesc: "Рубленая баранина со специями, обжаренная на шампуре — классика Кавказа",
      },
      {
        name: "Мякоть баранины",
        price: 1100,
        image: "/menu/mangal/myakot-baraniny.png",
        shortDesc: "Сочные кусочки молодого барашка с ароматом горных трав и лёгкой перчинкой",
        desc: "Мякоть молодой баранины, маринованная по домашнему рецепту и обжаренная на мангале до сочной середины.",
      },
      {
        name: "Люля свинина",
        price: 700,
        image: "/menu/mangal/lyulya-svinina.png",
        shortDesc: "Сочная рубленая свинина на углях с ароматом восточных пряностей",
      },
      {
        name: "Антрекот свинина",
        price: 800,
        image: "/menu/mangal/antrekot-svinina.png",
        shortDesc: "Толстый стейк на кости, обжаренный на углях до золотистой корочки",
      },
      {
        name: "Свиные рёбра",
        price: 600,
        image: "/menu/mangal/svinye-ryobra.png",
        shortDesc: "Томлённые рёбрышки с мангала — мясо само отходит от кости",
      },
      {
        name: "Шашлык из куры",
        price: 600,
        image: "/menu/mangal/shashlik-kura.png",
        shortDesc: "Маринованное в специях куриное филе с сочной серединкой и дымком",
      },
      {
        name: "Шашлык из свинины (окорок)",
        price: 650,
        image: "/menu/mangal/shashlik-svinina-okorok.png",
        shortDesc: "Плотное, в меру жирное мясо с хрустящей корочкой и нежной серединкой",
      },
      {
        name: "Шашлык из свинины (шея)",
        price: 750,
        image: "/menu/mangal/shashlik-svinina-sheya.png",
        shortDesc: "Мраморная шейка на углях — самый сочный и ароматный шашлык с дымком",
      },
      {
        name: "Люля курица",
        price: 650,
        image: "/menu/mangal/lyulya-kuritsa.png",
        shortDesc: "Нежная куриная люля с зеленью и секретной смесью специй",
      },
      {
        name: "Овощи на мангале",
        price: 550,
        image: "/menu/mangal/ovoshi-mangal.png",
        shortDesc: "Баклажан, перец, томат и лук — обожжённые огнём, с дымком и маслом",
      },
      {
        name: "Мангал салат",
        price: 600,
        image: "/menu/mangal/mangal-salat.png",
        shortDesc: "Тёплый салат из овощей гриль с ароматным маслом и зеленью",
      },
    ],
  },
  {
    id: "sets",
    title: "Сеты",
    emoji: "bento",
    items: [
      {
        name: "Сет «Классик»",
        price: 2300,
        image: "/menu/sets/set-klassik.png",
        shortDesc: "Шашлык из свинины, курицы, люля, овощи на мангале, лаваш, соус и маринованный лук",
      },
      {
        name: "Сет «Премиум»",
        price: 3500,
        badge: "хит",
        image: "/menu/sets/set-premium.png",
        shortDesc: "Каре ягнёнка, мякоть баранины, шашлык, люля, овощи гриль, лаваш, соус и лук",
      },
      {
        name: "Сет «Семейный»",
        price: 4500,
        image: "/menu/sets/set-semejnyj.png",
        shortDesc: "Каре, баранина, свинина, курица, две люля, овощи, лаваш и соусы",
      },
      {
        name: "Мангал на двоих",
        price: 2400,
        shortDesc: "Идеальный ужин на двоих — ассорти мяса и овощей с мангала",
      },
      {
        name: "Мангал на компанию",
        price: 4500,
        shortDesc: "Щедрый мангал на 3–4 человека — мясо, люля, овощи и все добавки",
      },
      {
        name: "Мангал на большую компанию",
        price: 6500,
        shortDesc: "Пир на 5–6 человек — горячий мангал, люля, овощи и полный стол закусок",
      },
      {
        name: "Комбо 1",
        price: 750,
        image: "/menu/sets/kombo-1.png",
        shortDesc: "Шашлык из свинины с лавашом, маринованным луком и фирменным соусом",
      },
      {
        name: "Комбо 2",
        price: 850,
        image: "/menu/sets/kombo-2.png",
        shortDesc: "Люля из курицы с овощами на мангале, лавашом и соусом на выбор",
      },
    ],
  },
  {
    id: "cold-starters",
    title: "Холодные закуски",
    emoji: "clover",
    items: [
      {
        name: "Аджапсандал",
        price: 650,
        image: "/menu/cold-starters/adjapsandal.png",
        shortDesc: "Холодное рагу из печёных баклажанов, перца и томатов с кинзой",
      },
      {
        name: "Ассорти сыров",
        price: 900,
        image: "/menu/cold-starters/assorti-syrov.png",
        shortDesc: "Сулугуни, имеретинский, копчёный — грузинское трио для ценителей",
      },
      {
        name: "Домашние соленья",
        price: 600,
        image: "/menu/cold-starters/domashnie-solenya.png",
        shortDesc: "Хрустящие огурчики, томаты, перец и чеснок — бабушкин рецепт",
      },
      {
        name: "Сельдь с картофелем",
        price: 690,
        image: "/menu/cold-starters/seld-s-kartofelem.png",
        shortDesc: "Малосольная сельдь с отварным картофелем и кольцами лука",
      },
    ],
  },
  {
    id: "hot-starters",
    title: "Горячие закуски",
    emoji: "mushroom",
    items: [
      {
        name: "Гренки",
        price: 290,
        image: "/menu/hot-starters/grenki.png",
        shortDesc: "Хрустящие ржаные гренки с чесноком и травами — идеальная закуска к мангалу",
        desc: "Хрустящие гренки из ржаного хлеба, обжаренные с ароматным чесноком и солью. Подаются с фирменным чесночным соусом и запечёнными зубчиками чеснока — горячая закуска в начале трапезы.",
      },
      {
        name: "Гренки с чесноком",
        price: 320,
        image: "/menu/hot-starters/grenki-chesnok.png",
        shortDesc: "Золотистые гренки с чесночным соусом и запечённым чесноком",
        desc: "Хрустящие гренки из тёмного хлеба, обжаренные с чесноком и специями. Подаются с нежным чесночным соусом, запечённым чесноком и свежей зеленью — классика грузинского стола.",
      },
      {
        name: "Гренки с сыром",
        price: 390,
        image: "/menu/hot-starters/grenki-syr.png",
        shortDesc: "Гренки из белого хлеба, запечённые под расплавленным сыром с зеленью",
        desc: "Хрустящие гренки из белого хлеба, запечённые под толстым слоем расплавленного сыра. Посыпаны свежим зелёным луком и подаются с фирменным чесночным соусом с укропом.",
      },
      {
        name: "Гренки с чесноком и сыром",
        price: 450,
        badge: "хит",
        image: "/menu/hot-starters/grenki-chesnok-syr.png",
        shortDesc: "Тосты с чесноком, расплавленным сыром и сливочно-чесночным соусом",
        desc: "Хрустящие гренки из свежего хлеба, натёртые чесноком и запечённые под толстым слоем расплавленного сыра. Подаются с фирменным сливочно-чесночным соусом и зеленью.",
      },
      {
        name: "Грибы сулугуни",
        price: 690,
        image: "/menu/hot-starters/griby-suluguni.png",
        shortDesc: "Шампиньоны, запечённые с сулугуни в глиняной посуде — сочные, с золотистой корочкой",
        desc: "Целые шампиньоны, запечённые с настоящим сулугуни в традиционной глиняной посуде ketsi. Сочная начинка, золотистая сырная корочка, свежий укроп и острый соус на выбор.",
      },
      {
        name: "Сулугуни жареный",
        price: 490,
        image: "/menu/hot-starters/suluguni-zharenyj.png",
        shortDesc: "Тянущийся сулугуни в хрустящей корочке — с гранатом и зелёным соусом",
        desc: "Традиционный грузинский сулугуни, обжаренный до золотистой корочки с тянущейся серединкой. Подаётся с гранатовыми зёрнами, свежей зеленью и ароматным зелёным соусом.",
      },
    ],
  },
  {
    id: "salads",
    title: "Салаты",
    emoji: "flatbread",
    items: [
      {
        name: "Цезарь с креветками",
        price: 950,
        image: "/menu/salads/cezar-krevetki.png",
        shortDesc: "Нежные креветки на подушке из романо с сырной стружкой и крутонами",
      },
      {
        name: "Цезарь с курицей",
        price: 790,
        image: "/menu/salads/cezar-kuritsa.png",
        shortDesc: "Классика с хрустящей курицей, пармезаном и фирменным соусом",
      },
      {
        name: "Салат по-грузински",
        price: 690,
        image: "/menu/salads/salat-gruzinski.png",
        shortDesc: "Свежие овощи, грецкий орех, кинза и пряная заправка — вкус Тбилиси",
      },
      {
        name: "Салат с баклажанами",
        price: 750,
        image: "/menu/salads/salat-baklazhany.png",
        shortDesc: "Печёные баклажаны с томатами, орехами и гранатовыми зёрнами",
      },
      {
        name: "Салат с хрустящими баклажанами",
        price: 850,
        image: "/menu/salads/salat-hrustyashchie-baklazhany.png",
        shortDesc: "Хрустящие баклажаны, микс зелени, орех и гранатовый соус наршараб",
      },
    ],
  },
  {
    id: "sides",
    title: "Гарниры",
    emoji: "fries",
    items: [
      {
        name: "Картофель айдахо",
        price: 300,
        image: "/menu/sides/kartofel-aydaho.png",
        shortDesc: "Запечённые дольки картофеля с хрустящей корочкой и пряностями",
      },
      {
        name: "Картофель фри",
        price: 300,
        image: "/menu/sides/kartofel-fri.png",
        shortDesc: "Золотистый хрустящий картофель — классика, любимая всеми",
      },
      {
        name: "Айдахо с аджикой",
        price: 400,
        image: "/menu/sides/aydaho-adzhika.png",
        shortDesc: "Пряные дольки картофеля с огненной грузинской аджикой",
      },
      {
        name: "Фри с сулугуни",
        price: 450,
        image: "/menu/sides/fri-suluguni.png",
        shortDesc: "Горячий фри под шапкой из расплавленного сулугуни — объедение",
      },
    ],
  },
  {
    id: "sauces",
    title: "Соусы",
    emoji: "sauce",
    items: [
      { name: "Сацебели", price: 120, image: "/menu/sauces/sacebeli.png", shortDesc: "Пикантный томатный соус с грузинскими специями и кинзой" },
      { name: "Аджика", price: 120, image: "/menu/sauces/adjika.png", shortDesc: "Жгучая паста из острого перца, чеснока и пряных трав" },
      { name: "Чесночный", price: 120, image: "/menu/sauces/chesnochnyj.png", shortDesc: "Нежный сливочный соус с ароматным чесноком и зеленью" },
      { name: "Кетчуп", price: 120, image: "/menu/sauces/ketchup.png", shortDesc: "Классический томатный соус — всегда кстати к мясу" },
      { name: "Сырный", price: 120, image: "/menu/sauces/syrnyj.png", shortDesc: "Сливочно-сырный соус для тех, кто любит понежнее" },
      { name: "Барбекю", price: 120, image: "/menu/sauces/barbekyu.png", shortDesc: "Копчёно-сладкий соус с дымком — для любителей мангала" },
      { name: "Сметана", price: 120, image: "/menu/sauces/smetana.png", shortDesc: "Свежая деревенская сметана — идеальна к шашлыку и салатам" },
    ],
  },
];

export const MENU_ITEM_COUNT = MENU.reduce((sum, cat) => sum + cat.items.length, 0);
export const MENU_CATEGORY_COUNT = MENU.length;

export const CONTACT = {
  phone: "+7 (909) 577-75-80",
  phoneRaw: "+79095777580",
  vk: "https://vk.com/vkusno_georgia",
  vkHandle: "vkusno_georgia",
} as const;

export const PROMO = {
  title: "В честь ОТКРЫТИЯ!",
  condition: "При заказе от 2 шашлыков Каре с бараниной",
  gift: "Мангал салат — ПОДАРОК!",
  dateFrom: "18.05.2026",
  dateTo: "20.05.2026",
} as const;

export const SITE = {
  name: "Вкусно как в Грузии",
  url: SITE_URL,
  description:
    "Доставка шашлыка на мангале, люля-кебаба, горячих закусок, грузинских салатов и сетов в Петергофе, Ломоносове, Стрельне и Петродворцовом районе. 47 блюд — готовим на углях и привозим горячим.",
  hours: { open: "12:00", close: "23:59" },
  geo: {
    areas: ["Петергоф", "Ломоносов", "Стрельна", "Новый Петергоф", "Старый Петергоф", "Петродворцовый район", "Ломоносовский район"],
    region: "Петродворцовый район, Санкт-Петербург",
    lat: 59.8816,
    lng: 29.9065,
  },
} as const;

export const MENU_SECTION_ID = "menu";
export const MENU_HREF = `/menu/#${MENU_SECTION_ID}` as const;
