import type { Metadata } from "next";
import { DeliveryCards } from "@/components/delivery-cards";

export const metadata: Metadata = {
  title: "Доставка грузинской кухни в Петергоф, Ломоносов, Стрельну",
  description: "Доставка горячих блюд грузинской кухни по Петергофу, Ломоносову и Стрельне за 30–45 минут. Хинкали, хачапури, шашлыки — привезём свежими и горячими прямо к двери.",
};

const ZONES: { num: number; min: number; areas: string[] }[] = [
  { num: 1, min: 1000, areas: ["Петергоф"] },
  { num: 2, min: 1200, areas: ["Мартышкино", "Ломоносов"] },
  { num: 3, min: 2100, areas: ["Сойкино", "Кабацкое", "Кукушкино", "Ускуля", "Старый Петергоф", "Университет", "Кронколония"] },
  { num: 4, min: 2500, areas: ["Сашино", "Б. Коновалово", "Кузнецы", "М. Коновалово", "Лангерево", "Пеники", "Дубочки", "Малая Ижора", "Новый Петергоф", "Луизино", "СНТ ФЛОРА/ФАУНА"] },
  { num: 5, min: 2600, areas: ["Бронна", "Куккузи", "Лимузи", "Дубки", "Низино", "Санино"] },
  { num: 6, min: 3600, areas: ["Порт Бронка", "Марьино", "Ольгино"] },
  { num: 7, min: 5000, areas: ["Большая Ижора", "Таменгонт", "Гостилицы", "Вильповицы", "Оржицы", "Кронштадт", "Лебяжье"] },
];

export default function DeliveryPage() {
  return (
    <main className="page-top">
      <section className="bg-hero py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h1 className="display-section text-ink mb-4 leading-tight">
              Доставка<br /><span className="text-wine">горячих блюд</span>
            </h1>
            <p className="text-ink/50 max-w-lg text-desc">Готовим на заказ и доставляем в лучшем виде. Быстро, горячо, вкусно.</p>
          </div>

          <DeliveryCards />

          <div className="mb-16">
            <h2 className="text-ink font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Зоны <span className="text-wine">доставки</span>
            </h2>
            <p className="text-ink/45 text-desc mb-8 max-w-2xl">Бесплатная доставка при заказе от указанной суммы. Доставляем в Петергоф, Ломоносов, Стрельну и пригороды.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ZONES.map((z) => (
                <div key={z.num} className="menu-card-light p-6 flex flex-col gap-3">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="label-caps text-wine/70">Зона {z.num}</span>
                    <span className="text-ink/30 text-xs">бесплатно от</span>
                    <span className="font-bold text-wine ml-auto" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.25rem,2vw,1.6rem)" }}>
                      {z.min.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                  <p className="text-ink/65 text-sm leading-relaxed text-desc">{z.areas.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-card p-8 sm:p-10">
            <h2 className="text-ink font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Как заказать</h2>
            <ol className="space-y-4 text-ink/60 text-desc">
              {[
                "Откройте меню и выберите блюда, которые вам нравятся",
                "Добавьте блюда в корзину и нажмите «Оформить заказ»",
                "Заполните имя, телефон и адрес доставки в форме заказа",
                "Оплатите наличными при получении или онлайн",
                "Наслаждайтесь! Готовим с любовью, доставляем с заботой",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold font-bold text-xl flex-shrink-0" style={{ fontFamily: "var(--font-heading)" }}>{i + 1}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
