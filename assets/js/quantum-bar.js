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
        { stroke: 'rgba(88, 166, 255, 0.32)', amp: 8, freq: 0.0075, speed: 0.012, anchor: 0.9 },
        { stroke: 'rgba(120, 169, 255, 0.62)', amp: 10, freq: 0.0055, speed: 0.018, anchor: 0.94 },
        { fill: 'rgba(120, 169, 255, 0.07)', amp: 10, freq: 0.0055, speed: 0.018, anchor: 0.94 },
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

    function strokeWave(layer, t, step, style, lineWidth) {
      ctx.beginPath();
      for (var x = 0; x <= width; x += step) {
        var y = waveY(x, layer, t);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = style;
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      var t = tick;
      var step = width > 900 ? 8 : 6;
      var set = layers();

      if (isLight()) {
        set.forEach(function (layer) {
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
        strokeWave(set[1], t, step, 'rgba(0, 82, 204, 0.35)', 1.25);
        return;
      }

      var fillLayer = set[2];
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (var xFill = 0; xFill <= width; xFill += step) {
        ctx.lineTo(xFill, waveY(xFill, fillLayer, t));
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = fillLayer.fill;
      ctx.fill();

      strokeWave(set[0], t, step, set[0].stroke, 1);
      strokeWave(set[1], t, step, set[1].stroke, 1.35);
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