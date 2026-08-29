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
    var point = getPoint(e);
    if (!point || !isPointInHero(hero, point.x, point.y)) {
      quantumField.style.transform = 'translate(0, 0)';
      return;
    }

    var rect = hero.getBoundingClientRect();
    var nx = clamp((point.x - rect.left) / rect.width - 0.5, -0.5, 0.5);
    var ny = clamp((point.y - rect.top) / rect.height - 0.5, -0.5, 0.5);

    quantumField.style.transform =
      'translate(' + nx * 16 + 'px, ' + ny * 10 + 'px)';
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
}

function initAtomCursor() {
  var atomSystem = document.getElementById('atom-system');
  if (!atomSystem) return;

  var INTERACT_RADIUS = 220;
  var MAX_TRANSLATE = 54;
  var MAX_TILT = 22;
  var CORE_PULL = 22;
  var LERP = 0.16;

  var target = { x: 0, y: 0 };
  var current = { x: 0, y: 0 };

  function onMove(e) {
    var point = getPoint(e);
    if (!point) return;

    var rect = atomSystem.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var dx = point.x - cx;
    var dy = point.y - cy;
    var dist = Math.hypot(dx, dy);

    if (dist > INTERACT_RADIUS) {
      target.x = 0;
      target.y = 0;
      return;
    }

    var falloff = 1 - dist / INTERACT_RADIUS;
    target.x = clamp((dx / INTERACT_RADIUS) * falloff * 1.35, -1, 1);
    target.y = clamp((dy / INTERACT_RADIUS) * falloff * 1.35, -1, 1);
  }

  function onLeave() {
    target.x = 0;
    target.y = 0;
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseleave', onLeave);
  document.addEventListener('touchend', onLeave, { passive: true });

  function applyAtom(x, y) {
    var tx = x * MAX_TRANSLATE;
    var ty = y * MAX_TRANSLATE;
    var tiltX = y * -MAX_TILT;
    var tiltY = x * MAX_TILT;
    var coreX = x * CORE_PULL;
    var coreY = y * CORE_PULL;
    var coreScale = 1 + Math.min(Math.hypot(x, y), 1.25) * 0.08;

    atomSystem.style.setProperty('--atom-tx', tx.toFixed(2) + 'px');
    atomSystem.style.setProperty('--atom-ty', ty.toFixed(2) + 'px');
    atomSystem.style.setProperty('--atom-rx', tiltX.toFixed(2) + 'deg');
    atomSystem.style.setProperty('--atom-ry', tiltY.toFixed(2) + 'deg');
    atomSystem.style.setProperty('--core-x', coreX.toFixed(2) + 'px');
    atomSystem.style.setProperty('--core-y', coreY.toFixed(2) + 'px');
    atomSystem.style.setProperty('--core-scale', coreScale.toFixed(3));
  }

  function tick() {
    current.x += (target.x - current.x) * LERP;
    current.y += (target.y - current.y) * LERP;
    applyAtom(current.x, current.y);
    requestAnimationFrame(tick);
  }

  applyAtom(0, 0);
  requestAnimationFrame(tick);
}

function getPoint(e) {
  if (e.touches && e.touches.length) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if (typeof e.clientX === 'number') {
    return { x: e.clientX, y: e.clientY };
  }
  return null;
}

function isPointInHero(hero, x, y) {
  var rect = hero.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
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
