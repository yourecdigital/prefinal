import type { Metadata } from "next";
import { MenuSection } from "@/components/menu-section";

export const metadata: Metadata = {
  title: "Меню грузинской кухни — хинкали, хачапури, шашлыки с доставкой в Петергофе",
  description: "Полное меню доставки «Вкусно как в Грузии»: хинкали, хачапури по-аджарски, шашлык на мангале, харчо, люля-кебаб, каре ягнёнка. Доставка в Петергоф, Ломоносов, Стрельну. Заказ: +7 (909) 577-75-80",
};

export default function MenuPage() {
  return (
    <main className="page-top">
      <MenuSection />
    </main>
  );
}
