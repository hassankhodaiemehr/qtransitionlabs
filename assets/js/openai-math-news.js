(function () {
  var root = document.querySelector('.oai-math-explorer');
  if (!root) return;

  var search = document.getElementById('oai-math-search');
  var resetBtn = document.getElementById('oai-math-reset');
  var visibleCount = document.getElementById('oai-math-visible-count');
  var filterButtons = root.querySelectorAll('.oai-math-filter-btn');
  var cards = root.querySelectorAll('.oai-math-card[data-oai-categories]');
  var featuredGrid = root.querySelector('.oai-math-grid--featured');

  var activeFilter = 'pqc';
  var query = '';

  function normalize(s) {
    return (s || '').toLowerCase().trim();
  }

  function cardMatches(card) {
    var cats = card.getAttribute('data-oai-categories') || '';
    var isPqc = card.getAttribute('data-oai-pqc') === 'true';
    var text = card.getAttribute('data-oai-text') || '';
    var filterOk = false;

    if (activeFilter === 'all') {
      filterOk = true;
    } else if (activeFilter === 'pqc') {
      filterOk = isPqc;
    } else {
      filterOk = cats.split(/\s+/).indexOf(activeFilter) !== -1;
    }

    var searchOk = !query || text.indexOf(query) !== -1;
    return filterOk && searchOk;
  }

  function update() {
    var shown = 0;
    cards.forEach(function (card) {
      var show = cardMatches(card);
      card.hidden = !show;
      card.classList.toggle('is-filtered-out', !show);
      if (show) shown += 1;
    });

    if (featuredGrid) {
      featuredGrid.hidden = activeFilter !== 'pqc' && activeFilter !== 'all';
    }

    if (visibleCount) visibleCount.textContent = String(shown);

    var dirty = activeFilter !== 'pqc' || query.length > 0;
    if (resetBtn) resetBtn.hidden = !dirty;
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeFilter = btn.getAttribute('data-oai-filter') || 'pqc';
      update();
    });
  });

  if (search) {
    search.addEventListener('input', function () {
      query = normalize(search.value);
      update();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      activeFilter = 'pqc';
      query = '';
      if (search) search.value = '';
      filterButtons.forEach(function (b) {
        var filter = b.getAttribute('data-oai-filter');
        var isDefault = filter === 'pqc';
        b.classList.toggle('active', isDefault);
        b.setAttribute('aria-pressed', isDefault ? 'true' : 'false');
      });
      update();
    });
  }

  update();
})();
