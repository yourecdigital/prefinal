# Деплой на WebHOST1 (gvkusno.ru)

Сайт — статический экспорт Next.js (`out/`). Панель: **ISPmanager** (Webserv24).

## 1. Домен и DNS

1. В [webhost1.ru](https://webhost1.ru) добавьте домен **gvkusno.ru** к хостингу.
2. У регистратора домена укажите NS или A-запись на IP из панели WebHOST1.
3. В `.env.production`:

```env
SITE_URL=https://gvkusno.ru
NEXT_PUBLIC_SITE_URL=https://gvkusno.ru
```

## 2. Сборка

```bash
npm run build:prod
npm run pack:prod
```

Архив: `deploy.zip` — распаковать в корень сайта.

## 3. RSC-файлы (важно для Next.js)

Сборка `npm run build:prod` автоматически создаёт «плоские» файлы вида `__next.menu.__PAGE__.txt` (нужны для клиентской навигации на nginx). Если заливаете вручную — всегда полная папка `out/` после свежей сборки.

## 4. Загрузка

**Файловый менеджер (ISPmanager)**

1. Сайты → **gvkusno.ru** → **Менеджер файлов**
2. Каталог сайта обычно: `www/gvkusno.ru/` или `data/www/gvkusno.ru/`
3. Загрузите **содержимое** папки `out/` (файл `index.html` в корне каталога, не вложенная папка `out`)
4. Проверьте в корне сайта: `favicon.ico`, `icon.png`, `apple-touch-icon.png` — без них браузер покажет 404 в консоли

**FTP**

1. ISPmanager → **FTP-пользователи** — логин/пароль
2. FileZilla / WinSCP → тот же каталог, что выше
3. Залить всё из `out/`

## 5. SSL (Let's Encrypt)

1. ISPmanager → **SSL-сертификаты** → Let's Encrypt для `gvkusno.ru` и `www.gvkusno.ru`
2. Дождитесь статуса **Активен**
3. В `.htaccess` на сервере раскомментируйте блок редиректа на HTTPS (или пересоберите после включения в репозитории)

**Важно:** не включайте принудительный HTTPS в панели и в `.htaccess` одновременно до выпуска сертификата — иначе ERR_CONNECTION_RESET.

## 6. Проверка

- https://gvkusno.ru/
- https://gvkusno.ru/sitemap.xml
- https://gvkusno.ru/yandex_6d0cf49f23c5dc30.html
- https://gvkusno.ru/zakaz/shashlyk-petergof/ (SEO-страница)
- https://gvkusno.ru/lomonosov → редирект на `/zakaz/shashlyk-lomonosov/` (короткая ссылка)
- https://gvkusno.ru/nesushchestvuyushchaya-stranica/ → кастомная 404 «не туда»

## 6.1. Nginx — почему «404 Not Found nginx» вместо нашей страницы

На WebHOST1 сайт отдаёт **nginx**. Файл **`.htaccess` nginx не читает** — поэтому `ErrorDocument 404` из него не срабатывает, и вы видите стандартную серую ошибку nginx.

**Что сделать (два шага):**

1. **Залить файл** `404.html` в корень сайта (рядом с `index.html`) — он есть в `out/` после `npm run build:prod`.

2. **Добавить в nginx** одну строку (и при необходимости `try_files`):

   - В ISPmanager: **Сайты → gvkusno.ru → Настройки** → поле **«Дополнительные директивы nginx»** / **«Конфигурация nginx»**.
   - Вставьте содержимое файла **`nginx-static.conf`** из архива (или из `out/nginx-static.conf` после сборки).
   - Ключевая строка: `error_page 404 =404 /404.html;`

   Полный пример блока `server { }` — в **`nginx-gvkusno.conf`** (там же замените `root` на путь из «Менеджера файлов»).

**Проверка после сохранения nginx:**

- https://gvkusno.ru/404.html — открывается страница «не туда»
- https://gvkusno.ru/любой-несуществующий-путь/ — та же фирменная 404, в заголовках ответа код **404**

Перезагрузка nginx обычно автоматическая после сохранения в панели.

**SEO-страницы пустые при клике?** Залейте папку `zakaz/` целиком и директивы из `nginx-static.conf` (блок RSC + `try_files`).

## 7. GitHub Actions (опционально)

Workflow: `.github/workflows/deploy-webhost1.yml`  
Secrets: `SITE_URL`, `WEBHOST1_FTP_HOST`, `WEBHOST1_FTP_USER`, `WEBHOST1_FTP_PASSWORD`, `WEBHOST1_FTP_REMOTE_DIR`

Пример `WEBHOST1_FTP_REMOTE_DIR`: `/www/gvkusno.ru/` (уточните в панели).
