import { CONTACT, MENU, SITE } from "@/lib/georgian-menu";

export function RestaurantJsonLd() {
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE.url}/#restaurant`,
    name: SITE.name,
    description: SITE.description,
    servesCuisine: ["Georgian", "Caucasian"],
    telephone: CONTACT.phone,
    url: `${SITE.url}/`,
    sameAs: [CONTACT.vk],
    image: `${SITE.url}/og-image.png`,
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
      name: "Основное меню",
      hasMenuSection: MENU.map((cat) => ({
        "@type": "MenuSection",
        name: cat.title,
        hasMenuItem: cat.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.shortDesc,
          offers: {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "RUB",
          },
        })),
      })),
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: SITE.name,
    description: `Грузинская кухня с доставкой в Петергофе, Ломоносове и Стрельне. ${SITE.description}`,
    telephone: CONTACT.phone,
    url: `${SITE.url}/`,
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
    areaServed: [
      ...SITE.geo.areas.map((area) => ({ "@type": "City", name: area })),
      { "@type": "AdministrativeArea", name: SITE.geo.region },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "FoodService",
        name: "Доставка грузинской кухни",
        description: "Доставка хинкали, хачапури, шашлыков на мангале и других блюд грузинской кухни по Петергофу, Ломоносову и Стрельне",
        areaServed: SITE.geo.areas.map((area) => ({ "@type": "City", name: area })),
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}
