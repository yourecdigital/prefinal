import { MenuSection } from "@/components/menu-section";
import { MENU_ITEM_COUNT } from "@/lib/menu-counts";
import { pageSeoMetadata } from "@/lib/page-seo";

export const metadata = pageSeoMetadata({
  title: "Меню — шашлык, напитки, сеты и салаты с доставкой в Петергофе",
  description:
    `${MENU_ITEM_COUNT} позиций: шашлык на мангале, хачапури, гренки, сулугуни, люля-кебаб, напитки (лимонад, морс, тархун, соки), сеты, салаты, соусы и гарниры. Доставка в Петергоф, Ломоносов, Стрельну. Заказ: +7 (909) 577-75-80`,
  pathname: "/menu/",
});

export default function MenuPage() {
  return (
    <main className="page-top">
      <MenuSection />
    </main>
  );
}
