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

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var nx = clamp((e.clientX - rect.left) / rect.width - 0.5, -0.5, 0.5);
    var ny = clamp((e.clientY - rect.top) / rect.height - 0.5, -0.5, 0.5);

    quantumField.style.transform =
      'translate(' + nx * 16 + 'px, ' + ny * 10 + 'px)';
  });

  hero.addEventListener('mouseleave', function () {
    quantumField.style.transform = 'translate(0, 0)';
  });
}

function initAtomCursor() {
  var hero = document.querySelector('.hero');
  var atomSystem = document.getElementById('atom-system');
  var qubitCore = atomSystem && atomSystem.querySelector('.qubit-core');
  var orbitTracks = atomSystem
    ? Array.prototype.slice.call(atomSystem.querySelectorAll('.orbit-track'))
    : [];

  if (!hero || !atomSystem || !qubitCore) return;

  var MAX_OFFSET = 0.42;
  var MAX_TRANSLATE = 24;
  var MAX_TILT = 16;
  var CORE_PULL = 10;
  var TRACK_TILT = [0.45, 0.7, 1];
  var LERP = 0.1;

  var target = { x: 0, y: 0 };
  var current = { x: 0, y: 0 };
  var active = false;

  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var nx = clamp((e.clientX - rect.left) / rect.width - 0.5, -MAX_OFFSET, MAX_OFFSET);
    var ny = clamp((e.clientY - rect.top) / rect.height - 0.5, -MAX_OFFSET, MAX_OFFSET);

    target.x = nx / MAX_OFFSET;
    target.y = ny / MAX_OFFSET;
    active = true;
  });

  hero.addEventListener('mouseleave', function () {
    target.x = 0;
    target.y = 0;
    active = false;
  });

  function tick() {
    current.x += (target.x - current.x) * LERP;
    current.y += (target.y - current.y) * LERP;

    if (
      active ||
      Math.abs(current.x) > 0.001 ||
      Math.abs(current.y) > 0.001
    ) {
      var tx = current.x * MAX_TRANSLATE;
      var ty = current.y * MAX_TRANSLATE;
      var tiltX = current.y * -MAX_TILT;
      var tiltY = current.x * MAX_TILT;

      atomSystem.style.transform =
        'translate3d(' +
        tx +
        'px, ' +
        ty +
        'px, 0) rotateX(' +
        tiltX +
        'deg) rotateY(' +
        tiltY +
        'deg)';

      var coreTx = current.x * CORE_PULL;
      var coreTy = current.y * CORE_PULL;
      qubitCore.style.transform =
        'translate3d(' +
        coreTx +
        'px, ' +
        coreTy +
        'px, 6px) scale(' +
        (1 + Math.abs(current.x + current.y) * 0.04) +
        ')';

      orbitTracks.forEach(function (track, index) {
        var scale = TRACK_TILT[index] || 1;
        var ringTiltX = current.y * -MAX_TILT * scale;
        var ringTiltY = current.x * MAX_TILT * scale;
        var ringShiftX = current.x * 4 * scale;
        var ringShiftY = current.y * 3 * scale;

        track.style.transform =
          'translate3d(' +
          ringShiftX +
          'px, ' +
          ringShiftY +
          'px, 0) rotateX(' +
          ringTiltX +
          'deg) rotateY(' +
          ringTiltY +
          'deg)';
      });
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
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
