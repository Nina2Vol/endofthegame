// Переключение экранов истории. Номер экрана хранится в адресе (#3),
// поэтому работают кнопка «Назад» в браузере и ссылки на конкретный экран.
(function () {
  var screens = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  var label = document.querySelector('.progress__label');
  var progress = document.querySelector('.progress');
  var bars = document.querySelectorAll('.progress__bar');
  var current = -1;

  function show(index) {
    index = Math.max(0, Math.min(screens.length - 1, index));
    if (index === current) return;
    current = index;

    screens.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });

    var screen = screens[index];
    var step = Number(screen.dataset.step);
    var pink = screen.hasAttribute('data-pink');
    label.textContent = screen.dataset.chapter;
    bars.forEach(function (bar, i) { bar.classList.toggle('is-done', i < step); });
    // Главы «Ловушка» — розовые полоски прогресса
    progress.classList.toggle('progress--pink', screen.dataset.chapter === 'Ловушка');
    document.body.classList.toggle('is-pink', pink);
    // На телефоне экран длинный — каждый новый начинаем сверху
    window.scrollTo(0, 0);
    // Картинки скрытых экранов не грузятся (loading="lazy"). Следующий экран
    // подгружаем заранее, чтобы после «Дальше» он открылся уже с картинками.
    warm(screens[index + 1]);
  }

  function warm(screen) {
    if (!screen) return;
    screen.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      // Только тот вариант, что будет виден: для телефона или для компьютера
      for (var el = img; el !== screen; el = el.parentElement) {
        if (getComputedStyle(el).display === 'none') return;
      }
      img.loading = 'eager';
    });
  }

  function fromHash() {
    var n = parseInt(location.hash.slice(1), 10);
    show(isNaN(n) ? 0 : n - 1);
  }

  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-next]')) return;
    location.hash = String(current + 2);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' && current < screens.length - 1) location.hash = String(current + 2);
    if (e.key === 'ArrowLeft' && current > 0) location.hash = String(current);
  });

  window.addEventListener('hashchange', fromHash);
  fromHash();

  // Таймер «службы безопасности» тикает, пока открыт экран
  var left = 9 * 60 + 41;
  setInterval(function () {
    if (left <= 0) return;
    left -= 1;
    var text = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
    document.querySelectorAll('[data-timer]').forEach(function (t) { t.textContent = text; });
  }, 1000);
})();
