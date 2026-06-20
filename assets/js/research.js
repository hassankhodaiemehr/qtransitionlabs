document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.pub-item').forEach((item) => {
      const tags = item.dataset.tags;
      item.style.display = filter === 'all' || tags.includes(filter) ? 'block' : 'none';
    });
  });
});

document.querySelectorAll('.bibtex-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const box = toggle.nextElementSibling;
    const isOpen = box.style.display === 'block';
    box.style.display = isOpen ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    toggle.textContent = isOpen ? 'Show BibTeX ▼' : 'Hide BibTeX ▲';
  });
});
