(function () {
  var root = document.querySelector('.oai-math-explorer');
  if (!root) return;

  var search = document.getElementById('oai-math-search');
  var resetBtn = document.getElementById('oai-math-reset');
  var visibleCount = document.getElementById('oai-math-visible-count');
  var filterButtons = root.querySelectorAll('.oai-math-filter-btn');
  var familyCards = root.querySelectorAll('#oai-math-list .oai-math-card[data-oai-kind="family"], .oai-math-grid--featured .oai-math-card[data-oai-kind="family"]');
  var manuscriptCards = root.querySelectorAll('#oai-math-manuscript-list .oai-math-card[data-oai-kind="manuscript"]');
  var featuredGrid = root.querySelector('.oai-math-grid--featured');
  var familySectionTitle = document.getElementById('oai-math-families-heading');
  var featuredSectionTitle = document.getElementById('oai-math-featured-heading');
  var manuscriptHeading = document.getElementById('oai-math-manuscripts-heading');
  var manuscriptGrid = document.getElementById('oai-math-manuscript-list');

  var activeFilter = 'pqc';
  var query = '';

  function normalize(s) {
    return (s || '').toLowerCase().trim();
  }

  function cardMatches(card) {
    var kind = card.getAttribute('data-oai-kind') || 'family';
    var cats = card.getAttribute('data-oai-categories') || '';
    var isPqc = card.getAttribute('data-oai-pqc') === 'true';
    var text = card.getAttribute('data-oai-text') || '';
    var filterOk = false;

    if (activeFilter === 'manuscripts') {
      filterOk = kind === 'manuscript';
    } else if (activeFilter === 'families') {
      filterOk = kind === 'family';
    } else if (activeFilter === 'pqc') {
      filterOk = kind === 'family' && isPqc;
    } else {
      filterOk = cats.split(/\s+/).indexOf(activeFilter) !== -1;
    }

    var searchOk = !query || text.indexOf(query) !== -1;
    return filterOk && searchOk;
  }

  function setCardVisibility(card, show) {
    card.hidden = !show;
    card.classList.toggle('is-filtered-out', !show);
  }

  function update() {
    var shown = 0;
    var flatManuscripts = activeFilter === 'manuscripts';

    if (familySectionTitle) familySectionTitle.hidden = flatManuscripts;
    if (featuredSectionTitle) featuredSectionTitle.hidden = flatManuscripts;
    if (manuscriptHeading) manuscriptHeading.hidden = !flatManuscripts;
    if (manuscriptGrid) manuscriptGrid.hidden = !flatManuscripts;

    if (featuredGrid) {
      featuredGrid.hidden = flatManuscripts;
      if (!flatManuscripts) {
        featuredGrid.querySelectorAll('.oai-math-card[data-oai-kind="family"]').forEach(function (card) {
          var show = cardMatches(card);
          setCardVisibility(card, show);
          if (show) shown += 1;
        });
      }
    }

    familyCards.forEach(function (card) {
      if (flatManuscripts) {
        setCardVisibility(card, false);
        return;
      }
      var show = cardMatches(card);
      setCardVisibility(card, show);
      if (show) shown += 1;
    });

    manuscriptCards.forEach(function (card) {
      if (!flatManuscripts) {
        setCardVisibility(card, false);
        return;
      }
      var show = cardMatches(card);
      setCardVisibility(card, show);
      if (show) shown += 1;
    });

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

  root.addEventListener('click', function (event) {
    var tabBtn = event.target.closest('.oai-math-tab-btn');
    if (!tabBtn || !root.contains(tabBtn)) return;
    var tabsRoot = tabBtn.closest('[data-oai-family-tabs]');
    if (!tabsRoot) return;

    var tabId = tabBtn.getAttribute('data-oai-tab');
    tabsRoot.querySelectorAll('.oai-math-tab-btn').forEach(function (btn) {
      var active = btn === tabBtn;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    tabsRoot.querySelectorAll('.oai-math-tabpanel').forEach(function (panel) {
      var active = panel.getAttribute('data-oai-panel') === tabId;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  });

  update();
})();
