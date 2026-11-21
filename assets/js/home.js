(function () {
  initHomeCounters();
  initPolicySignalPanel();
  initOrbitalReadout();
})();

function initOrbitalReadout() {
  var root = document.getElementById('hero-orbital-readout');
  if (!root) return;

  initOrbitalReadoutTabs(root);
  initOrbitalReadoutCollapse(root);

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cycleMs = 18000;
  var phaseCount = 3;
  var shellLabels = ['K', 'L', 'M'];
  var lLabels = ['s', 'p', 'd', 'f'];
  /* Three phases = three radar rings; stylized silicon (Z=14). */
  var phases = [
    { n: 1, l: 0, ml: 0, ms: '+½', energy: '-1782', ring: 1, subshell: '1s' },
    { n: 2, l: 1, ml: 0, ms: '-½', energy: '-127', ring: 2, subshell: '2p' },
    { n: 3, l: 1, ml: 1, ms: '+½', energy: '-8.2', ring: 3, subshell: '3p' },
  ];
  var rings = document.querySelectorAll('.atom-system .orbit-ring');
  var started = performance.now();
  var animId = 0;
  var visible = true;

  function text(sel, value) {
    var el = root.querySelector('[data-orbit="' + sel + '"]');
    if (el) el.textContent = value;
  }

  function fill(sel, ratio) {
    var el = root.querySelector('[data-orbit-fill="' + sel + '"]');
    if (el) el.style.width = Math.max(0, Math.min(100, ratio * 100)) + '%';
  }

  function rExpect(n) {
    return (0.28 * n * n).toFixed(2);
  }

  function tick(now) {
    var elapsed = reduced ? 0 : now - started;
    var phasePos = (elapsed % cycleMs) / cycleMs;
    var phaseIndex = Math.min(phaseCount - 1, Math.floor(phasePos * phaseCount));
    var phase = phases[phaseIndex];
    var localT = (phasePos * phaseCount) % 1;

    var phi = Math.round(phasePos * 360);
    var psi = 0.52 + 0.4 * Math.sin(localT * Math.PI * 2 + phaseIndex * 0.55);
    var deltaR = 0.38 + 0.44 * Math.cos(localT * Math.PI * 2 * 1.15 + phaseIndex * 0.4);
    var uncertainty = 0.5 + 0.22 * (psi * deltaR);

    text('n', String(phase.n));
    text('n-inline', String(phase.n));
    text('l', String(phase.l));
    text('l-name', lLabels[phase.l] || 'f');
    text('ml', phase.ml >= 0 ? '+' + phase.ml : String(phase.ml));
    text('ms', phase.ms);
    text('phi', String(phi));
    text('energy', phase.energy);
    text('shell', shellLabels[phase.n - 1] || 'M');
    text('uncertainty', '≥ ' + uncertainty.toFixed(2));
    text('psi', psi.toFixed(2));
    text('delta-r', deltaR.toFixed(2));
    text('r-expect', rExpect(phase.n));
    text(
      'active-shell',
      'Si · n = ' + phase.n + ' ' + (phase.subshell || lLabels[phase.l] || 's')
    );

    fill('psi', psi);
    fill('delta-r', deltaR);

    var phaseHues = [198, 42, 142];
    root.style.setProperty('--readout-phase-hue', String(phaseHues[phaseIndex] || 42));

    rings.forEach(function (ring) {
      var m = ring.className.match(/orbit-ring--(\d)/);
      var num = m ? parseInt(m[1], 10) : 0;
      ring.classList.toggle('is-quantum-active', num === phase.ring);
    });

    if (!visible) {
      if (!reduced) animId = requestAnimationFrame(tick);
      return;
    }

    if (!reduced) animId = requestAnimationFrame(tick);
  }

  if (reduced) tick(started);
  else animId = requestAnimationFrame(tick);

  if ('IntersectionObserver' in window) {
    var hero = document.querySelector('.hero.hero--ibm');
    if (hero) {
      var obs = new IntersectionObserver(function (entries) {
        visible = !!(entries[0] && entries[0].isIntersecting);
      }, { threshold: 0.05 });
      obs.observe(hero);
    }
  }

}

function initOrbitalReadoutTabs(root) {
  var tabs = root.querySelectorAll('.hero-orbital-readout__tab[data-orbit-tab]');
  var panels = root.querySelectorAll('.hero-orbital-readout__panel[data-orbit-panel]');
  if (!tabs.length || !panels.length) return;

  function activateOrbitTab(id) {
    tabs.forEach(function (btn) {
      var active = btn.getAttribute('data-orbit-tab') === id;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      var show = panel.getAttribute('data-orbit-panel') === id;
      panel.classList.toggle('is-active', show);
      if (show) panel.removeAttribute('hidden');
      else panel.setAttribute('hidden', '');
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      activateOrbitTab(tab.getAttribute('data-orbit-tab'));
    });
  });
}

function initOrbitalReadoutCollapse(root) {
  var btn = root.querySelector('[data-orbit-collapse]');
  var stack = root.closest('.hero-metrics-band') || root.closest('.hero-inner');
  var icon = btn && btn.querySelector('.hero-orbital-readout__collapse-icon');
  if (!btn) return;

  var storageKey = 'qtl-hero-orbit-readout-collapsed';

  function setCollapsed(collapsed) {
    root.classList.toggle('is-collapsed', collapsed);
    if (stack) stack.classList.toggle('is-readout-collapsed', collapsed);
    btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    btn.setAttribute(
      'aria-label',
      collapsed ? 'Expand quantum readout panel' : 'Shrink readout to top bar'
    );
    btn.setAttribute('title', collapsed ? 'Expand panel' : 'Shrink to top');
    if (icon) icon.textContent = collapsed ? '▾' : '▴';
    try {
      sessionStorage.setItem(storageKey, collapsed ? '1' : '0');
    } catch (err) { /* ignore */ }
  }

  try {
    if (sessionStorage.getItem(storageKey) === '1') setCollapsed(true);
  } catch (err) { /* ignore */ }

  btn.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    setCollapsed(!root.classList.contains('is-collapsed'));
  });
}

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
