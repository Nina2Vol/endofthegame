# Статьи «Конец игры»

Шаблон — макеты «статья» (393:1525) и «статья · mobile» (394:1590) в Figma, страница «сайт финалим».
Образец: `rebenok-skazal-moshennikam-kod.html`. Стили — блок «Статьи» в конце `css/styles.css`.

Новая статья:
1. Скопировать образец в `articles/<slug>.html` (адрес на сайте — `/articles/<slug>`, без .html).
2. Поменять title, description, canonical, og:url, og/twitter-тексты, JSON-LD.
3. Блоки текста:
   - `.article-head` — рубрика (`.eyebrow`), время чтения, `h1.h1`, `p.lead`;
   - `.article-cover` (+ `--pink` / `--blue` / `--peach`) — обложка 640×440;
   - `.article-section` — раздел: `h2.h3`, `p.body`, `ul.article-list.body`;
   - `ol.article-steps` > `li.article-step` — карточки с цифрой и `h3.h4`;
   - `.article-tip` — белая плашка-совет 💡;
   - `.article-phrases` — «Помогает» / «Закрывает разговор» (`.article-phrase--no`);
   - `.article-outro` — итоговая мысль на лаймовой плашке; `.article-links` — ссылки со стрелкой;
   - `.article-more` — «Читайте также», сетка `.mat-grid` из карточек `.mat-card`.
4. Добавить карточку `.mat-card` в раздел «Статьи» на `materials.html` и адрес в `sitemap.xml`.
5. Картинки — `assets/articles/*.png` + `.webp` (ниже первого экрана — `loading="lazy"`).
   Готовые из шаблона: phone-alarm, phone, boy-question, mom-son-sofa.
6. Пути в статьях — от корня (`/css/…`, `/assets/…`), т. к. страница лежит в папке.
7. Неразрывные пробелы после коротких слов и перед последним словом абзаца.
