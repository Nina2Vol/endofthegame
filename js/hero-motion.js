// Анимации первого экрана главной: параллакс фигур за мышью
// и появление Вани, когда до него докрутили. Сами анимации — в styles.css.
(function () {
  var hero = document.querySelector('.hero');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Фигуры смещаются за курсором, каждая на свою глубину (--d)
  if (window.matchMedia('(pointer: fine)').matches) {
    var frame = 0, mx = 0, my = 0;
    window.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * -16;
      my = (e.clientY / window.innerHeight - 0.5) * -12;
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        hero.style.setProperty('--mx', mx + 'px');
        hero.style.setProperty('--my', my + 'px');
      });
    });
  }

  if (!('IntersectionObserver' in window)) return;
  var vanya = hero.querySelector('[data-m="vanya"]');
  hero.classList.add('motion-ready');
  new IntersectionObserver(function (entries, observer) {
    if (!entries[0].isIntersecting) return;
    hero.classList.add('vanya-in');
    observer.disconnect();
  }, { threshold: 0.25 }).observe(vanya);
})();
