(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    const gradientWrap = document.querySelector('.hero-gradient-wrap');
    const orbitLayer = document.querySelector('.hero-orbit-layer');

    document.addEventListener('mousemove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;

      if (gradientWrap) {
        gradientWrap.style.transform =
          `translate(${nx * 24}px, ${ny * 16}px)`;
      }

      if (orbitLayer) {
        orbitLayer.style.transform =
          `translate(${nx * -10}px, ${ny * -8}px)`;
      }
    });
  }
})();
