(function () {
  var root = document.querySelector('.oai-math-explorer');
  if (!root) return;

  var search = document.getElementById('oai-math-search');
  var resetBtn = document.getElementById('oai-math-reset');
  var visibleCount = document.getElementById('oai-math-visible-count');
  var filterButtons = root.querySelectorAll('.oai-math-filter-btn');
  var cards = root.querySelectorAll('.oai-math-card[data-oai-categories]');

  var activeFilter = 'all';
  var query = '';

  function normalize(s) {
    return (s || '').toLowerCase().trim();
  }

  function cardMatches(card) {
    var cats = card.getAttribute('data-oai-categories') || '';
    var text = card.getAttribute('data-oai-text') || '';
    var filterOk = activeFilter === 'all' || cats.split(/\s+/).indexOf(activeFilter) !== -1;
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

    if (visibleCount) visibleCount.textContent = String(shown);

    var dirty = activeFilter !== 'all' || query.length > 0;
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
      activeFilter = btn.getAttribute('data-oai-filter') || 'all';
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
      activeFilter = 'all';
      query = '';
      if (search) search.value = '';
      filterButtons.forEach(function (b) {
        var isAll = b.getAttribute('data-oai-filter') === 'all';
        b.classList.toggle('active', isAll);
        b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
      });
      update();
    });
  }

  update();
})();
