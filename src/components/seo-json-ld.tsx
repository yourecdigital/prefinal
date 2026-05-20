import { CONTACT, MENU, SITE } from "@/lib/georgian-menu";
import { SEO_FAQ, SITE_URL } from "@/lib/seo";

export function SeoJsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SEO_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: SITE.name,
    description: SITE.description,
    servesCuisine: ["Georgian", "Caucasian"],
    telephone: CONTACT.phone,
    url: `${SITE_URL}/`,
    sameAs: [CONTACT.vk],
    image: `${SITE_URL}/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Петергоф",
      addressRegion: "Санкт-Петербург",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.geo.areas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: SITE.hours.open,
      closes: SITE.hours.close,
    },
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card",
    hasMenu: {
      "@type": "Menu",
      name: "Меню доставки",
      hasMenuSection: MENU.map((cat) => ({
        "@type": "MenuSection",
        name: cat.title,
        hasMenuItem: cat.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.shortDesc,
          ...(item.image ? { image: `${SITE_URL}${item.image}` } : {}),
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "RUB",
          },
        })),
      })),
    },
  };

  const deliveryService = {
    "@context": "https://schema.org",
    "@type": "FoodDeliveryService",
    name: `${SITE.name} — доставка`,
    description: "Доставка шашлыков на мангале, люля-кебаба, грузинских салатов и сетов в Петергоф, Ломоносов и Стрельну",
    url: `${SITE_URL}/delivery/`,
    telephone: CONTACT.phone,
    areaServed: SITE.geo.areas.map((area) => ({ "@type": "City", name: area })),
    provider: { "@id": `${SITE_URL}/#restaurant` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
