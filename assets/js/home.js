(function () {
  initHomeCounters();
  initPolicySignalPanel();
})();

function initPolicySignalPanel() {
  var root = document.getElementById('home-policy-signals');
  if (!root) return;

  var buttons = root.querySelectorAll('.home-signal[data-signal]');
  var details = root.querySelectorAll('.home-signal-detail[data-signal]');
  var panel = root.querySelector('.home-signals__panel');
  if (!buttons.length || !details.length || !panel) return;

  var defaultId = buttons[0].getAttribute('data-signal');

  function activate(id) {
    if (!id) return;

    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute('data-signal') === id;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    details.forEach(function (detail) {
      var isActive = detail.getAttribute('data-signal') === id;
      detail.classList.toggle('is-active', isActive);
      detail.hidden = !isActive;
    });

    panel.classList.add('is-open');
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
      activate(btn.getAttribute('data-signal'));
    });

    btn.addEventListener('focus', function () {
      activate(btn.getAttribute('data-signal'));
    });
  });

  root.addEventListener('mouseleave', function () {
    activate(defaultId);
  });

  activate(defaultId);
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
