import type { Metadata } from "next";
import { DeliveryCards } from "@/components/delivery-cards";
import { SEO_FAQ, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Доставка шашлыка и мангала в Петергоф, Ломоносов, Стрельну",
  description:
    "Доставка шашлыка на мангале, люля-кебаба и грузинских блюд по Петергофу, Ломоносову, Стрельне и Петродворцовому району за 30–45 минут. Зоны и минимальная сумма заказа.",
  alternates: { canonical: `${SITE_URL}/delivery/` },
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
              Доставка<br /><span className="text-wine">шашлыка и мангала</span>
            </h1>
            <p className="text-ink/50 max-w-2xl text-desc">
              Готовим на углях и доставляем горячим в Петергоф, Ломоносов, Стрельну, Новый и Старый Петергоф,
              а также по Петродворцовому и Ломоносовскому району.
            </p>
          </div>

          <DeliveryCards />

          <div className="mb-16">
            <h2 className="text-ink font-bold text-3xl sm:text-4xl mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Зоны <span className="text-wine">доставки</span>
            </h2>
            <p className="text-ink/45 text-desc mb-8 max-w-2xl">Бесплатная доставка при заказе от указанной суммы.</p>

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

          <div className="menu-card p-8 sm:p-10 mb-16">
            <h2 className="text-ink font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Как заказать</h2>
            <ol className="space-y-4 text-ink/60 text-desc">
              {[
                "Откройте меню и выберите шашлык, люля, сеты или салаты",
                "Добавьте блюда в корзину и нажмите «Оформить заказ»",
                "Заполните имя, телефон и адрес доставки в форме заказа",
                "Оплатите наличными при получении или онлайн",
                "Наслаждайтесь! Готовим на мангале, доставляем горячим",
              ].map((text, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold font-bold text-xl flex-shrink-0" style={{ fontFamily: "var(--font-heading)" }}>{i + 1}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="menu-card-light p-8 sm:p-10">
            <h2 className="text-ink font-bold text-2xl mb-6" style={{ fontFamily: "var(--font-heading)" }}>Частые вопросы</h2>
            <dl className="space-y-6">
              {SEO_FAQ.map((item) => (
                <div key={item.question}>
                  <dt className="text-ink font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.question}</dt>
                  <dd className="text-ink/55 text-desc leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
