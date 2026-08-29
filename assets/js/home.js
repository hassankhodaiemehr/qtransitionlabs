(function () {
  initHomeCounters();
  initQuantumFeed();
})();

function initQuantumFeed() {
  var feed = document.querySelector('.hero-quantum-feed');
  if (!feed) return;

  var items = feed.querySelectorAll('.hero-quantum-feed__item');
  var dots = feed.querySelectorAll('.hero-quantum-feed__dot');
  if (items.length < 2) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  var index = 0;
  var intervalMs = 5500;

  function show(nextIndex) {
    items[index].classList.remove('is-active');
    if (dots[index]) dots[index].classList.remove('is-active');
    index = nextIndex;
    items[index].classList.add('is-active');
    if (dots[index]) dots[index].classList.add('is-active');
  }

  setInterval(function () {
    show((index + 1) % items.length);
  }, intervalMs);
}

function initHomeCounters() {
  var counters = document.querySelectorAll('.home-metric__value[data-count]');
  if (!counters.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animate(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1400;
    var start = performance.now();

    function tickCounter(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tickCounter);
    }

    requestAnimationFrame(tickCounter);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach(function (el) {
    observer.observe(el);
  });
}
