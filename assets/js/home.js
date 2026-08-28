(function () {
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    var quantumField = document.querySelector('.hero-quantum-field');
    var orbitLayer = document.querySelector('.hero-orbit-layer');

    document.addEventListener('mousemove', function (e) {
      var nx = e.clientX / window.innerWidth - 0.5;
      var ny = e.clientY / window.innerHeight - 0.5;

      if (quantumField) {
        quantumField.style.transform = 'translate(' + nx * 16 + 'px, ' + ny * 10 + 'px)';
      }

      if (orbitLayer) {
        orbitLayer.style.transform = 'translate(' + nx * -8 + 'px, ' + ny * -6 + 'px)';
      }
    });

    initCapCardTilt();
  }

  initHomeCounters();
  initPartnerMarquee();
})();

function initCapCardTilt() {
  var cards = document.querySelectorAll('.cap-card');
  if (!cards.length) return;

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-y', x * 6 + 'deg');
      card.style.setProperty('--tilt-x', y * -6 + 'deg');
    });

    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-x', '0deg');
    });
  });
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

function initPartnerMarquee() {
  var marquee = document.querySelector('.partner-marquee');
  if (!marquee) return;

  marquee.addEventListener('mouseenter', function () {
    marquee.classList.add('is-paused');
  });

  marquee.addEventListener('mouseleave', function () {
    marquee.classList.remove('is-paused');
  });
}
