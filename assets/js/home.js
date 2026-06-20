(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    const quantumField = document.querySelector('.hero-quantum-field');
    const orbitLayer = document.querySelector('.hero-orbit-layer');

    document.addEventListener('mousemove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;

      if (quantumField) {
        quantumField.style.transform =
          `translate(${nx * 16}px, ${ny * 10}px)`;
      }

      if (orbitLayer) {
        orbitLayer.style.transform =
          `translate(${nx * -8}px, ${ny * -6}px)`;
      }
    });
  }
})();
