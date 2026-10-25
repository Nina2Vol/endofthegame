// Экраны 8–9: когда приходит новое сообщение, лента чата плавно
// прокручивается вниз, чтобы его было видно — как в настоящем мессенджере.
(function () {
  var timers = [];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function delayOf(el) {
    return (parseFloat(getComputedStyle(el).animationDelay) || 0) * 1000;
  }

  function reveal(body, msg, smooth) {
    var bottom = msg.offsetTop + msg.offsetHeight + 20;
    var top = Math.max(0, bottom - body.clientHeight);
    if (top > body.scrollTop) body.scrollTo({ top: top, behavior: smooth ? 'smooth' : 'auto' });
  }

  function start(screen) {
    timers.forEach(clearTimeout);
    timers = [];
    screen.querySelectorAll('.chat--large .chat__body').forEach(function (body) {
      body.scrollTop = 0;
      var msgs = body.children;
      var animated = !reduce && getComputedStyle(msgs[0]).animationName !== 'none';
      if (!animated) { reveal(body, msgs[msgs.length - 1], false); return; }
      [].forEach.call(msgs, function (msg) {
        timers.push(setTimeout(function () { reveal(body, msg, true); }, delayOf(msg)));
      });
    });
  }

  var screens = document.querySelectorAll('.screen');
  var observer = new MutationObserver(function (records) {
    records.forEach(function (r) {
      if (r.target.classList.contains('is-active') && r.target.querySelector('.chat--large')) start(r.target);
    });
  });
  screens.forEach(function (s) { observer.observe(s, { attributes: true, attributeFilter: ['class'] }); });
  var active = document.querySelector('.screen.is-active .chat--large');
  if (active) start(active.closest('.screen'));
})();
