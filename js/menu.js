// Мобильное меню в шапке: кнопка открывает список разделов
(function () {
  var buttons = document.querySelectorAll('[data-burger]');
  function close(header, btn) { header.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
  buttons.forEach(function (btn) {
    var header = btn.closest('.header');
    btn.addEventListener('click', function () {
      var open = header.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target) || e.target.closest('.header__menu a')) close(header, btn);
    });
  });
})();

// Закреплённая шапка: после начала прокрутки фон плотнее, чтобы текст под ней не мешал
(function () {
  var header = document.querySelector('.header:not(.header--story)');
  if (!header) return;
  function update() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
