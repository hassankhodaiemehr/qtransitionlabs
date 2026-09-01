(function () {
  initEducation();
})();

function initEducation() {
  var root = document.querySelector('.education-page');
  if (!root) return;

  var dataEl = document.getElementById('edu-data');
  var data = null;
  if (dataEl) {
    try {
      data = JSON.parse(dataEl.textContent);
    } catch (e) {
      data = null;
    }
  }

  initModuleTabs(root);
  initHndl(data);
  initTimeline(data);
  initAlgoCards(root);
  initPhases(data);
  initFamilies(root);
}

function initModuleTabs(root) {
  var tabs = root.querySelectorAll('.edu-module-tab');
  var panels = root.querySelectorAll('.edu-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-module');
      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      panels.forEach(function (panel) {
        var show = panel.getAttribute('data-module') === id;
        panel.classList.toggle('is-active', show);
        panel.hidden = !show;
      });
    });
  });
}

function initHndl(data) {
  var hndl = document.getElementById('edu-hndl');
  if (!hndl || !data || !data.threat_steps) return;

  var steps = hndl.querySelectorAll('.edu-hndl__step');
  var statEl = document.getElementById('edu-hndl-stat');
  var statLabelEl = document.getElementById('edu-hndl-stat-label');
  var textEl = document.getElementById('edu-hndl-text');
  var streamEl = document.getElementById('edu-hndl-stream');
  var futureEl = document.getElementById('edu-hndl-future');
  var stepMap = {};

  data.threat_steps.forEach(function (step) {
    stepMap[step.id] = step;
  });

  function activate(stepId) {
    var step = stepMap[stepId];
    if (!step) return;

    steps.forEach(function (btn) {
      var active = btn.getAttribute('data-hndl-step') === stepId;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (statEl) statEl.textContent = step.stat;
    if (statLabelEl) statLabelEl.textContent = step.stat_label;
    if (textEl) textEl.textContent = step.detail;

    hndl.setAttribute('data-active-step', stepId);
    if (streamEl) streamEl.classList.toggle('is-flowing', stepId === 'capture');
    if (futureEl) futureEl.classList.toggle('is-flowing', stepId === 'decrypt');
  }

  steps.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activate(btn.getAttribute('data-hndl-step'));
    });
    btn.addEventListener('mouseenter', function () {
      activate(btn.getAttribute('data-hndl-step'));
    });
  });

  activate(data.threat_steps[0].id);
}

function initTimeline(data) {
  var slider = document.getElementById('edu-timeline-slider');
  if (!slider || !data || !data.timeline || !data.timeline.length) return;

  var timeline = data.timeline;
  var yearEl = document.getElementById('edu-timeline-year');
  var phaseEl = document.getElementById('edu-timeline-phase');
  var titleEl = document.getElementById('edu-timeline-title');
  var detailEl = document.getElementById('edu-timeline-detail');
  var ticks = document.querySelectorAll('.edu-timeline__tick');

  slider.max = String(timeline.length - 1);

  function render(index) {
    var event = timeline[index];
    if (!event) return;

    slider.value = String(index);
    slider.setAttribute('aria-valuenow', String(index));
    slider.setAttribute('aria-valuetext', String(event.year) + ': ' + event.title);

    if (yearEl) yearEl.textContent = String(event.year);
    if (phaseEl) {
      phaseEl.textContent = event.phase;
      phaseEl.className = 'edu-timeline__phase edu-timeline__phase--' + event.phase;
    }
    if (titleEl) titleEl.textContent = event.title;
    if (detailEl) detailEl.textContent = event.detail;

    ticks.forEach(function (tick) {
      tick.classList.toggle('is-active', Number(tick.getAttribute('data-index')) === index);
    });
  }

  slider.addEventListener('input', function () {
    render(Number(slider.value));
  });

  ticks.forEach(function (tick) {
    tick.addEventListener('click', function () {
      render(Number(tick.getAttribute('data-index')));
    });
  });

  render(0);
}

function initAlgoCards(root) {
  var cards = root.querySelectorAll('.edu-algo-card');
  cards.forEach(function (card) {
    var toggle = card.querySelector('.edu-algo-card__toggle');
    var body = card.querySelector('.edu-algo-card__body');
    if (!toggle || !body) return;

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.hidden = !open;
      card.classList.toggle('is-open', open);
    });
  });
}

function initPhases(data) {
  var container = document.getElementById('edu-phases');
  if (!container || !data || !data.migration_phases) return;

  var buttons = container.querySelectorAll('.edu-phase');
  var titleEl = document.getElementById('edu-phase-detail-title');
  var textEl = document.getElementById('edu-phase-detail-text');
  var phaseMap = {};

  data.migration_phases.forEach(function (phase) {
    phaseMap[String(phase.id)] = phase;
  });

  function activate(id) {
    var phase = phaseMap[id];
    if (!phase) return;

    buttons.forEach(function (btn) {
      var active = btn.getAttribute('data-phase') === id;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-expanded', active ? 'true' : 'false');
    });

    if (titleEl) titleEl.textContent = phase.title;
    if (textEl) textEl.textContent = phase.detail;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activate(btn.getAttribute('data-phase'));
    });
    btn.addEventListener('mouseenter', function () {
      activate(btn.getAttribute('data-phase'));
    });
  });
}

function initFamilies(root) {
  var container = root.querySelector('#edu-families');
  if (!container) return;

  var pills = container.querySelectorAll('.edu-family-pill[data-family]');
  var details = container.querySelectorAll('.edu-family-detail[data-family]');
  if (!pills.length || !details.length) return;

  function activate(id) {
    if (!id) return;

    pills.forEach(function (pill) {
      var active = pill.getAttribute('data-family') === id;
      pill.classList.toggle('is-active', active);
      pill.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    details.forEach(function (detail) {
      var active = detail.getAttribute('data-family') === id;
      detail.classList.toggle('is-active', active);
      detail.hidden = !active;
    });
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      activate(pill.getAttribute('data-family'));
    });
    pill.addEventListener('mouseenter', function () {
      activate(pill.getAttribute('data-family'));
    });
  });
}
