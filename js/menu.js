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
