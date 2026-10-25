// Кнопки «Подробнее» на странице «Куда обратиться»: раскрывают пояснение под строкой
document.querySelectorAll('[data-more]').forEach(function (btn) {
  var text = document.getElementById(btn.getAttribute('aria-controls'));
  btn.addEventListener('click', function () {
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Свернуть' : 'Подробнее';
    text.hidden = !open;
  });
});
