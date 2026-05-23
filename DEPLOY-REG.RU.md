# Деплой на REG.RU и SEO

> **Сейчас хостинг на WebHOST1** — см. [DEPLOY-WEBHOST1.md](./DEPLOY-WEBHOST1.md), сборка: `npm run build:prod`.

Сайт — статический экспорт Next.js (`out/`). Для поиска нужен **свой домен** в корне хостинга (не подпапка GitHub Pages).

## 1. Домен и переменные

1. Скопируйте `.env.production.example` → `.env.production`
2. Укажите домен с REG.RU:

```env
SITE_URL=https://ваш-домен.ru
NEXT_PUBLIC_SITE_URL=https://ваш-домен.ru
```

3. После верификации в [Google Search Console](https://search.google.com/search-console) и [Яндекс Вебмастер](https://webmaster.yandex.ru):

```env
GOOGLE_SITE_VERIFICATION=код_из_google
YANDEX_VERIFICATION=код_из_yandex
NEXT_PUBLIC_YM_ID=номер_счётчика_метрики
```

## 2. Сборка

```bash
npm run build:regru
```

Проверка локально:

```bash
npm run preview
```

Архив для ручной загрузки:

```bash
npm run pack:regru
```

## 3. Загрузка на REG.RU

**Вариант А — файловый менеджер / FTP**

1. В панели REG.RU откройте хостинг → каталог сайта (`public_html` или `www/ваш-домен.ru/`)
2. Загрузите **содержимое** папки `out/` (не саму папку `out`)
3. Убедитесь, что есть `.htaccess` (HTTPS, кэш)
4. Включите SSL (Let's Encrypt) в панели REG.RU

**Вариант Б — GitHub Actions (FTP)**

В репозитории → Settings → Secrets:

| Secret | Пример |
|--------|--------|
| `SITE_URL` | `https://ваш-домен.ru` |
| `REG_RU_FTP_HOST` | `ftp.ваш-домен.ru` |
| `REG_RU_FTP_USER` | логин FTP |
| `REG_RU_FTP_PASSWORD` | пароль FTP |
| `REG_RU_FTP_REMOTE_DIR` | `/www/ваш-домен.ru/` |
| `YANDEX_VERIFICATION` | опционально |
| `GOOGLE_SITE_VERIFICATION` | опционально |
| `NEXT_PUBLIC_YM_ID` | опционально |

Запуск: Actions → **Deploy to REG.RU (FTP)** → Run workflow

## 4. SEO после выкладки

1. **Яндекс Вебмастер** — добавить сайт, подтвердить (meta `yandex`), отправить sitemap:  
   `https://ваш-домен.ru/sitemap.xml`
2. **Google Search Console** — то же + sitemap
3. **Яндекс Бизнес / Google Business** — карточка «Вкусно как в Грузии», Петергоф, телефон +7 (909) 577-75-80, зона доставки
4. **ВК** — ссылка на сайт в @vkusno_georgia
5. Проверить: `robots.txt`, canonical на всех страницах, микроразметка (Restaurant, FAQ, меню) — уже в коде

Топ выдачи зависит от конкуренции и поведенческих факторов; техническая база (sitemap, schema.org, geo, keywords, HTTPS, скорость статики) настроена в проекте.

## 5. GitHub Pages (старый вариант)

Для демо на `yourecdigital.github.io/prefinal` по-прежнему:

```bash
BASE_PATH=/prefinal npm run build
```

Продакшен для клиентов — только **build:regru** на своём домене.
