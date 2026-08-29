(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    initHeroParallax();
    initAtomCursor();
  }

  initHomeCounters();
})();

function initHeroParallax() {
  var hero = document.querySelector('.hero');
  var quantumField = document.querySelector('.hero-quantum-field');
  if (!hero || !quantumField) return;

  function onMove(e) {
    if (!isPointInHero(hero, e.clientX, e.clientY)) {
      quantumField.style.transform = 'translate(0, 0)';
      return;
    }

    var rect = hero.getBoundingClientRect();
    var nx = clamp((e.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    var ny = clamp((e.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);

    quantumField.style.transform =
      'translate(' + nx * 16 + 'px, ' + ny * 10 + 'px)';
  }

  window.addEventListener('mousemove', onMove, { passive: true });
}

function initAtomCursor() {
  var hero = document.querySelector('.hero');
  var atomSystem = document.getElementById('atom-system');
  if (!hero || !atomSystem) return;

  var MAX_OFFSET = 0.45;
  var MAX_TRANSLATE = 32;
  var MAX_TILT = 18;
  var CORE_PULL = 14;
  var LERP = 0.12;

  var target = { x: 0, y: 0 };
  var current = { x: 0, y: 0 };
  var hovering = false;

  function onMove(e) {
    if (!isPointInHero(hero, e.clientX, e.clientY)) {
      hovering = false;
      target.x = 0;
      target.y = 0;
      return;
    }

    var rect = hero.getBoundingClientRect();
    var nx = clamp((e.clientX - rect.left) / rect.width - 0.5, -MAX_OFFSET, MAX_OFFSET);
    var ny = clamp((e.clientY - rect.top) / rect.height - 0.5, -MAX_OFFSET, MAX_OFFSET);

    target.x = nx / MAX_OFFSET;
    target.y = ny / MAX_OFFSET;
    hovering = true;
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  hero.addEventListener('mouseleave', function () {
    hovering = false;
    target.x = 0;
    target.y = 0;
  });

  function applyAtom(x, y) {
    var tx = x * MAX_TRANSLATE;
    var ty = y * MAX_TRANSLATE;
    var tiltX = y * -MAX_TILT;
    var tiltY = x * MAX_TILT;
    var coreX = x * CORE_PULL;
    var coreY = y * CORE_PULL;
    var coreScale = 1 + Math.min(Math.abs(x) + Math.abs(y), 1.2) * 0.05;

    atomSystem.style.setProperty('--atom-tx', tx + 'px');
    atomSystem.style.setProperty('--atom-ty', ty + 'px');
    atomSystem.style.setProperty('--atom-rx', tiltX + 'deg');
    atomSystem.style.setProperty('--atom-ry', tiltY + 'deg');
    atomSystem.style.setProperty('--core-x', coreX + 'px');
    atomSystem.style.setProperty('--core-y', coreY + 'px');
    atomSystem.style.setProperty('--core-scale', String(coreScale));
  }

  function tick() {
    current.x += (target.x - current.x) * LERP;
    current.y += (target.y - current.y) * LERP;

    if (
      hovering ||
      Math.abs(current.x) > 0.002 ||
      Math.abs(current.y) > 0.002 ||
      Math.abs(target.x) > 0.002 ||
      Math.abs(target.y) > 0.002
    ) {
      applyAtom(current.x, current.y);
    }

    requestAnimationFrame(tick);
  }

  applyAtom(0, 0);
  requestAnimationFrame(tick);
}

function isPointInHero(hero, x, y) {
  var rect = hero.getBoundingClientRect();
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
