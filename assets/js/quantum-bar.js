(function () {
  function initQuantumBar() {
    var root = document.querySelector('.quantum-bar');
    var canvas = root && root.querySelector('.quantum-bar__canvas');
    if (!root || !canvas) return;

    var ctx = canvas.getContext('2d');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animId = 0;
    var visible = true;
    var tick = 0;
    var width = 0;
    var height = 0;

    function isLight() {
      return document.body.classList.contains('light-mode');
    }

    function layers() {
      if (isLight()) {
        return [
          { color: 'rgba(15, 98, 254, 0.09)', amp: 7, freq: 0.0075, speed: 0.012, anchor: 0.88 },
          { color: 'rgba(56, 189, 248, 0.1)', amp: 9, freq: 0.0055, speed: 0.018, anchor: 0.94 },
          { color: 'rgba(129, 140, 248, 0.07)', amp: 5, freq: 0.01, speed: 0.009, anchor: 0.98 },
        ];
      }
      return [
        { color: 'rgba(69, 137, 255, 0.26)', amp: 9, freq: 0.0075, speed: 0.012, anchor: 0.86 },
        { color: 'rgba(120, 169, 255, 0.22)', amp: 11, freq: 0.0055, speed: 0.018, anchor: 0.92 },
        { color: 'rgba(56, 189, 248, 0.14)', amp: 7, freq: 0.01, speed: 0.009, anchor: 0.98 },
      ];
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function waveY(x, layer, t) {
      var base = height * layer.anchor;
      var primary = Math.sin(x * layer.freq + t * layer.speed) * layer.amp;
      var harmonic = Math.sin(x * layer.freq * 2.15 + t * layer.speed * 1.55) * (layer.amp * 0.32);
      return base + primary + harmonic;
    }

    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      var t = tick;
      var step = width > 900 ? 8 : 6;

      layers().forEach(function (layer) {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (var x = 0; x <= width; x += step) {
          ctx.lineTo(x, waveY(x, layer, t));
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      ctx.beginPath();
      for (var x2 = 0; x2 <= width; x2 += step) {
        var y = waveY(x2, layers()[1], t);
        if (x2 === 0) ctx.moveTo(x2, y);
        else ctx.lineTo(x2, y);
      }
      ctx.strokeStyle = isLight() ? 'rgba(0, 82, 204, 0.35)' : 'rgba(166, 200, 255, 0.72)';
      ctx.lineWidth = isLight() ? 1.25 : 1.5;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    function frame() {
      if (visible) tick += 1;
      draw();
      animId = requestAnimationFrame(frame);
    }

    resize();
    draw();
    if (!reduced) animId = requestAnimationFrame(frame);

    window.addEventListener('resize', function () {
      resize();
      draw();
    });

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        visible = !!(entries[0] && entries[0].isIntersecting);
      }, { threshold: 0 });
      obs.observe(root);
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        window.setTimeout(draw, 0);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuantumBar);
  } else {
    initQuantumBar();
  }
})();