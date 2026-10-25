// Экран 10: Ваня начинает писать маме правду, стирает и отправляет «Да».
// Сценарий запускается заново каждый раз, когда экран открывается.
(function () {
  var chat = document.querySelector('[data-mom-typing]');
  if (!chat) return;
  var screen = chat.closest('.screen');
  var typed = chat.querySelector('[data-typed]');
  var caret = chat.querySelector('.caret');
  var placeholder = chat.querySelector('[data-placeholder]');
  var reply = chat.querySelector('[data-reply]');
  var DRAFT = 'Мам, я тут…';
  var timers = [];

  function at(ms, fn) { timers.push(setTimeout(fn, ms)); }

  function reset() {
    timers.forEach(clearTimeout);
    timers = [];
    typed.textContent = '';
    caret.hidden = false;
    placeholder.hidden = true;
    reply.classList.remove('is-sent');
    reply.classList.add('is-hidden');
  }

  function sent() {
    typed.textContent = '';
    caret.hidden = true;
    placeholder.hidden = false;
    reply.classList.remove('is-hidden');
    reply.classList.add('is-sent');
  }

  function play() {
    reset();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { sent(); return; }
    var t = 900;
    // Набирает правду…
    for (var i = 1; i <= DRAFT.length; i++) {
      (function (n) { at(t, function () { typed.textContent = DRAFT.slice(0, n); }); })(i);
      t += 110 + (DRAFT[i - 1] === ',' ? 250 : 0);
    }
    // …задумывается и стирает
    t += 1300;
    for (var j = DRAFT.length - 1; j >= 0; j--) {
      (function (n) { at(t, function () { typed.textContent = DRAFT.slice(0, n); }); })(j);
      t += 45;
    }
    // Пишет «Да» и отправляет
    t += 900;
    at(t, function () { typed.textContent = 'Д'; });
    at(t + 180, function () { typed.textContent = 'Да'; });
    at(t + 800, sent);
  }

  new MutationObserver(function () {
    if (screen.classList.contains('is-active')) play(); else reset();
  }).observe(screen, { attributes: true, attributeFilter: ['class'] });
  if (screen.classList.contains('is-active')) play(); else reset();
})();
