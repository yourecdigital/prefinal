import { PROMO } from "@/lib/georgian-menu";
import { SITE_URL } from "@/lib/site-url";

export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

/** Тексты для превью ссылки (Open Graph / Twitter / VK) */
export const OG_SHARE = {
  title: `🎁 ${PROMO.gift} — «Вкусно как в Грузии»`,
  description: `${PROMO.title} ${PROMO.condition} — ${PROMO.gift} Доставка шашлыка и грузинской кухни в Петергофе, Ломоносове и Стрельне. Заказ: +7 (909) 577-75-80`,
  imageAlt: "Вкусно как в Грузии — доставка шашлыка и грузинской кухни в Петергофе",
} as const;

export function ogImageField() {
  return {
    url: OG_IMAGE_URL,
    secureUrl: OG_IMAGE_URL,
    width: 1200,
    height: 630,
    alt: OG_SHARE.imageAlt,
    type: "image/png" as const,
  };
}
