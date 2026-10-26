// Анимации блоков главной ниже первого экрана: каждый блок проявляется,
// когда до него докрутили. Что и как анимируется — в styles.css (раздел
// «Анимации главной»), здесь только метки, порядок и задержки.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  // [селектор, анимация появления, шаг задержки между соседями в секундах]
  var groups = [
    ['.section__title, .how__title', 'rise', 0],
    ['.age-card', 'rise', 0.12],
    ['.stage-card', 'rise', 0.15],
    ['.how .option-card', 'from-left-soft', 0.15],
    ['.how__art .circle', 'pop', 0],
    ['.how__art .deco', 'rise', 0],
    ['.step', 'rise', 0.1],
    ['.final .circle', 'pop', 0],
    ['.final .deco[src*="teen"]', 'rise', 0],
    ['.final .deco[src*="bubble"], .final .bubble-text', 'pop', 0],
    ['.final .btn', 'rise', 0],
    // Разделы «Материалы» и «Куда обратиться»
    ['.page-head > *, .help-head__text > *', 'rise', 0.12],
    ['.memo', 'rise', 0],
    ['.emergency', 'pop', 0],
    ['.emergency__number', 'pop', 0],
    ['.help-step', 'rise', 0.12],
    ['.contact-row', 'from-left-soft', 0.1],
    // «Как устроена ловушка»: этапы появляются строго по очереди 1, 2, 3, 4
    ['.after-hero > *', 'rise', 0.12],
    ['.trap-card', 'rise', 0.35],
    ['.help-card', 'rise', 0.15],
    ['.agree__text > *', 'rise', 0.1],
    ['.agree__quote', 'pop', 0],
    ['.link-card', 'rise', 0.15]
  ];
  // Задержка внутри блока, чтобы картинки появлялись после своей карточки
  var extra = {
    '.how__art .deco': 0.25,
    '.final .deco[src*="teen"]': 0.15,
    '.final .deco[src*="bubble"], .final .bubble-text': 0.5,
    '.final .btn': 0.8,
    '.emergency': 0.2,
    '.emergency__number': 0.5,
    '.agree__quote': 0.3
  };

  // В мобилке карточки возрастов — карусель с прокруткой вбок, появление
  // снизу там мешает (просьба Нины): карточки просто стоят на месте
  var mobile = window.matchMedia('(max-width: 900px), (max-width: 1100px) and (max-height: 500px)').matches;
  if (mobile) groups = groups.filter(function (g) { return g[0] !== '.age-card'; });

  // В мобилке все блоки появляются одинаково — мягко снизу (просьба Нины);
  // «выскакивают» только мелкие картинки и цифры
  if (mobile) groups = groups.map(function (g) {
    var small = /deco|number|circle|bubble|emergency__number/.test(g[0]);
    return small ? g : [g[0], 'rise', g[2]];
  });

  var items = [];
  groups.forEach(function (g) {
    var els = document.querySelectorAll(g[0]);
    els.forEach(function (el, i) {
      el.setAttribute('data-reveal', g[1]);
      el.style.setProperty('--delay', ((extra[g[0]] || 0) + i * g[2]) + 's');
      items.push(el);
    });
  });

  // Картинки и цифры в карточках «выскакивают» после карточки, по очереди
  document.querySelectorAll(mobile ? '.stage-card, .trap-card' : '.age-card, .stage-card, .trap-card').forEach(function (card, n) {
    var base = parseFloat(card.style.getPropertyValue('--delay')) || 0;
    card.querySelectorAll('.deco, .number').forEach(function (el, i) {
      el.setAttribute('data-reveal', 'pop');
      el.style.setProperty('--delay', (base + 0.35 + i * 0.2) + 's');
      items.push(el);
    });
  });

  document.documentElement.classList.add('motion');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      // Карточка с картинками открывается целиком, чтобы задержки шли от неё
      var card = e.target.closest('.age-card, .stage-card, .trap-card');
      var targets = card ? [card].concat([].slice.call(card.querySelectorAll('[data-reveal]'))) : [e.target];
      targets.forEach(function (t) { t.classList.add('is-in'); io.unobserve(t); });
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
