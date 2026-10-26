// Карточки «Разный возраст»: картинка стоит ровно посередине между текстом
// и кнопкой. Текст переносится по-разному на разных ширинах, поэтому
// сдвиг считаем на месте. data-vis — где в картинке начинается и кончается
// сам рисунок (доля высоты), прозрачные поля не считаем.
(function () {
  function center() {
    document.querySelectorAll('.age-card').forEach(function (card) {
      var decos = card.querySelectorAll(':scope > .deco');
      if (!decos.length) return;
      // Считаем по раскладке (offset*), а не по экрану: анимации сдвигают
      // картинки через transform и не должны влиять на расчёт
      var top = Infinity, bottom = -Infinity;
      decos.forEach(function (d) {
        d.style.marginTop = '0px';
        var img = d.matches('img') ? d : d.querySelector('img');
        var y = d.offsetTop + (img === d ? 0 : img.offsetTop);
        var vis = (img.getAttribute('data-vis') || '0 1').split(' ').map(Number);
        top = Math.min(top, y + img.offsetHeight * vis[0]);
        bottom = Math.max(bottom, y + img.offsetHeight * vis[1]);
      });
      var text = card.querySelector('.age-card__text');
      var from = text.offsetTop + text.offsetHeight;
      var to = card.querySelector('.btn').offsetTop;
      var shift = (from + to) / 2 - (top + bottom) / 2;
      decos.forEach(function (d) { d.style.marginTop = shift.toFixed(1) + 'px'; });
    });
  }
  window.addEventListener('load', center);
  window.addEventListener('resize', center);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(center);
})();
