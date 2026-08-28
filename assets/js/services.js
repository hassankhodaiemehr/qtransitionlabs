(function () {
  initServiceFilters();
  initServiceStats();
  initServiceTimeline();
})();

function initServiceFilters() {
  var filterBar = document.querySelector('.services-filter');
  if (!filterBar) return;

  var buttons = filterBar.querySelectorAll('.services-filter__btn');
  var items = document.querySelectorAll('.service-item');
  if (!buttons.length || !items.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      buttons.forEach(function (b) {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      items.forEach(function (item) {
        var categories = item.getAttribute('data-category') || '';
        var show = filter === 'all' || categories.split(' ').indexOf(filter) !== -1;
        item.classList.toggle('is-hidden', !show);
        if (show) {
          item.classList.remove('reveal-active');
          requestAnimationFrame(function () {
            item.classList.add('reveal-active');
          });
        }
      });
    });
  });
}

function initServiceStats() {
  var stats = document.querySelectorAll('.services-stat__value[data-count]');
  if (!stats.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateStat(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;

    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(function (el) {
    observer.observe(el);
  });
}

function initServiceTimeline() {
  var steps = document.querySelectorAll('.services-timeline__step');
  if (!steps.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    steps.forEach(function (s) {
      s.classList.add('is-active');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    },
    { threshold: 0.4, rootMargin: '0px 0px -20px 0px' }
  );

  steps.forEach(function (step) {
    observer.observe(step);
  });
}
