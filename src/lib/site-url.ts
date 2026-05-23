/**
 * Продакшен-URL (WebHOST1 / свой домен).
 * При сборке: npm run build:prod
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.SITE_URL ??
  "https://gvkusno.ru"
).replace(/\/$/, "");
