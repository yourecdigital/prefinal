import { CONTACT, SITE } from "@/lib/georgian-menu";

/**
 * Юридические реквизиты и настройки документов.
 * ⚠️ Перед запуском в прод замените placeholder-данные ИП на реальные.
 */
export const LEGAL = {
  /** Дата последнего обновления документов (отображается на страницах) */
  privacyUpdated: "19.05.2026",
  offerUpdated: "19.05.2026",

  /** Оператор персональных данных / продавец по оферте */
  operator: {
    type: "ИП" as const,
    /** ФИО индивидуального предпринимателя — ЗАМЕНИТЬ */
    fullName: "Иванов Александр Петрович",
    /** Коммерческое наименование / бренд */
    brandName: SITE.name,
    /** ИНН — ЗАМЕНИТЬ */
    inn: "000000000000",
    /** ОГРНИП — ЗАМЕНИТЬ */
    ogrnip: "000000000000000",
    /** Юридический адрес — ЗАМЕНИТЬ */
    legalAddress: "198516, г. Санкт-Петербург, г. Петергоф, ул. Примерная, д. 1",
    /** E-mail для обращений по ПДн и претензиям — ЗАМЕНИТЬ */
    email: "info@vkusno-georgia.example",
    phone: CONTACT.phone,
    phoneRaw: CONTACT.phoneRaw,
  },

  /** Регион деятельности */
  region: SITE.geo.region,

  /** Зоны доставки (кратко, для оферты) */
  deliveryAreas: SITE.geo.areas.join(", "),

  /** Срок хранения персональных данных после выполнения заказа */
  dataRetentionYears: 3,

  /** Срок ответа на запрос субъекта ПДн (рабочих дней) */
  pdRequestDays: 10,

  /** Срок действия оферты, если не указано иное */
  offerValidityNote:
    "Оферта действует бессрочно до момента её отзыва оператором.",

  paths: {
    privacy: "/privacy/",
    offer: "/offer/",
  },

  siteName: SITE.name,
  siteUrl: SITE.url,
} as const;

export type LegalOperator = typeof LEGAL.operator;
