// Растягивает сцену истории на всё окно.
// Макет — 1440×720. Масштаб берём так, чтобы сцена целиком влезла по одной
// из сторон, а по другой стороне оставшееся место раздаём через --dx / --dy.
// Иллюстрация слева растягивается на всю высоту окна и не заходит на текст.
(function () {
  var W0 = 1440, H0 = 720, MAX_ART = 1.6;
  var stage = document.querySelector('.story-stage');
  var arts = document.querySelectorAll('.art[data-w]');

  // То же условие, что у раскладки истории колонкой в styles.css
  var column = window.matchMedia('(max-width: 900px), (max-height: 500px), (orientation: portrait)');

  function layout() {
    var w = document.documentElement.clientWidth;
    var h = window.innerHeight;
    // На телефоне экраны идут колонкой с прокруткой (styles.css), сцену не масштабируем
    if (column.matches) {
      stage.style.zoom = stage.style.width = stage.style.height = '';
      ['--dx', '--dy', '--a', '--a-center'].forEach(function (v) { stage.style.removeProperty(v); });
      arts.forEach(function (art) { art.style.removeProperty('--ax'); });
      return;
    }
    var s = Math.min(w / W0, h / H0);
    var boxW = w / s, boxH = h / s;
    var a = Math.min(boxH / H0, MAX_ART);
    var dx = boxW - W0;

    stage.style.zoom = s;
    stage.style.width = boxW + 'px';
    stage.style.height = boxH + 'px';
    stage.style.setProperty('--dx', dx + 'px');
    stage.style.setProperty('--dy', (boxH - H0) / 2 + 'px');
    stage.style.setProperty('--a', a);
    stage.style.setProperty('--a-center', Math.min(a, 1.25));

    // Правый край картинки держим там же относительно текста, что и в макете:
    // если после растяжения она стала шире, сдвигаем её влево (за край окна).
    arts.forEach(function (art) {
      var artW = Number(art.dataset.w);
      art.style.setProperty('--ax', Math.min(0, artW + dx - artW * a) + 'px');
    });
  }

  layout();
  window.addEventListener('resize', layout);
})();
