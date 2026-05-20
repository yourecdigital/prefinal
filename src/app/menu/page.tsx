import type { Metadata } from "next";
import { MenuSection } from "@/components/menu-section";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Меню — шашлык, люля, сеты и салаты с доставкой в Петергофе",
  description:
    "47 блюд: шашлык на мангале, гренки, сулугуни, люля-кебаб, сеты, грузинские салаты, соусы и гарниры. Доставка в Петергоф, Ломоносов, Стрельну. Заказ: +7 (909) 577-75-80",
  alternates: { canonical: `${SITE_URL}/menu/` },
};

export default function MenuPage() {
  return (
    <main className="page-top">
      <MenuSection />
    </main>
  );
}
