# Подтверждение gvkusno.ru в Google Search Console

## Важно: два разных способа

| Способ в Google | Что нужно | У вас сейчас |
|-----------------|-----------|--------------|
| **HTML-тег** | Meta на главной странице | ✅ Уже есть на https://gvkusno.ru/ |
| **Провайдер домена (DNS TXT)** | Отдельная TXT-запись в DNS | ❌ Не добавлена (есть только SPF) |

Если выбран **DNS**, meta-тег на сайте **не помогает** — Google смотрит только TXT в DNS.

---

## Вариант А — быстрее: HTML-тег (рекомендуется)

1. Search Console → ресурс **https://gvkusno.ru** (тип «Префикс URL», не «Домен»).
2. Подтверждение → способ **HTML-тег**.
3. Код должен совпадать: `QlR5Bete6FsSGe1O0yybSXkX_04NPweRRxRMb7oX5Xs`
4. Нажмите **Подтвердить** (meta уже в `out/index.html` после `npm run build:prod`).

Проверка: откройте https://gvkusno.ru/ → Ctrl+U → найдите  
`<meta name="google-site-verification" content="QlR5Bete6FsSGe1O0yybSXkX_04NPweRRxRMb7oX5Xs"/>`

---

## Вариант Б: DNS TXT (если нужен ресурс «Домен»)

В панели DNS (WebHOST1 / регистратор домена) **добавьте вторую TXT-запись**.  
**Не удаляйте** SPF `v=spf1 ip4:91.236.136.105 a mx -all` — обе записи живут рядом.

| Поле | Значение |
|------|----------|
| Тип | **TXT** |
| Имя / хост | `@` или пусто (корень `gvkusno.ru`) |
| Значение | `google-site-verification=QlR5Bete6FsSGe1O0yybSXkX_04NPweRRxRMb7oX5Xs` |
| TTL | 300–3600 |

Если Google показал **другой** токен в Search Console — подставьте **его** (из панели Google), не этот текст.

Подождите 15 мин – 24 ч, затем **Проверить** в Search Console.

Проверка с ПК:

```powershell
nslookup -type=TXT gvkusno.ru 8.8.8.8
```

В ответе должна быть строка `google-site-verification=...`

---

## WebHOST1 (ISPmanager)

1. Домены → **gvkusno.ru** → **DNS-зона** / управление записями.
2. **Создать запись** → TXT.
3. Имя: `@` (или оставить пустым).
4. Значение: `google-site-verification=QlR5Bete6FsSGe1O0yybSXkX_04NPweRRxRMb7oX5Xs`
5. Сохранить.

---

## После подтверждения

- Отправить sitemap: `https://gvkusno.ru/sitemap.xml`
- Яндекс: файл `yandex_6d0cf49f23c5dc30.html` в корне сайта
