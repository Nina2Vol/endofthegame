// Масштабирует блоки, свёрстанные в координатах макета 1440 px, под ширину экрана.
(function () {
  var DESIGN_WIDTH = 1440;
  var blocks = document.querySelectorAll('[data-fit]');

  // То же условие, что у мобильной раскладки в styles.css
  var column = window.matchMedia('(max-width: 900px), (max-width: 1100px) and (max-height: 500px)');

  function fit() {
    // На телефоне блоки перестраиваются в колонку (styles.css), не масштабируем
    if (column.matches) {
      blocks.forEach(function (el) {
        el.style.zoom = '';
        el.style.width = '';
        el.style.removeProperty('--dx');
      });
      return;
    }
    var scale = Math.min(1, document.documentElement.clientWidth / DESIGN_WIDTH);
    var width = document.documentElement.clientWidth / scale;
    blocks.forEach(function (el) {
      el.style.zoom = scale === 1 ? '' : scale;
      // data-stretch: блок на всю ширину окна, края коллажа прижаты к краям экрана
      if (el.hasAttribute('data-stretch')) {
        el.style.width = width + 'px';
        el.style.setProperty('--dx', (width - DESIGN_WIDTH) + 'px');
      }
    });
  }

  fit();
  window.addEventListener('resize', fit);
})();

// Картинка ещё не выгружена — прячем значок битого файла.
document.querySelectorAll('img').forEach(function (img) {
  function hide() { img.classList.add('is-missing'); }
  if (img.complete && img.naturalWidth === 0) hide();
  img.addEventListener('error', hide);
});
