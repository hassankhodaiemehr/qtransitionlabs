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
          { color: 'rgba(251, 191, 36, 0.12)', amp: 9, freq: 0.0075, speed: 0.012 },
          { color: 'rgba(56, 189, 248, 0.1)', amp: 11, freq: 0.0055, speed: 0.018 },
          { color: 'rgba(251, 146, 60, 0.08)', amp: 7, freq: 0.01, speed: 0.009 },
        ];
      }
      return [
        { color: 'rgba(251, 191, 36, 0.16)', amp: 10, freq: 0.0075, speed: 0.012 },
        { color: 'rgba(251, 146, 60, 0.12)', amp: 12, freq: 0.0055, speed: 0.018 },
        { color: 'rgba(167, 139, 250, 0.1)', amp: 8, freq: 0.01, speed: 0.009 },
      ];
    }

    function palette() {
      if (isLight()) {
        return {
          axis: 'rgba(15, 98, 254, 0.2)',
          crest: 'rgba(217, 119, 6, 0.42)',
        };
      }
      return {
        axis: 'rgba(251, 191, 36, 0.28)',
        crest: 'rgba(253, 224, 171, 0.58)',
      };
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

    function centerY() {
      return height * 0.5;
    }

    function waveY(x, layer, t, mid) {
      var primary = Math.sin(x * layer.freq + t * layer.speed) * layer.amp;
      var harmonic = Math.sin(x * layer.freq * 2.15 + t * layer.speed * 1.55) * (layer.amp * 0.32);
      return mid + primary + harmonic;
    }

    function draw() {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      var t = tick;
      var step = width > 900 ? 8 : 6;
      var mid = centerY();
      var colors = palette();
      var set = layers();

      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      ctx.strokeStyle = colors.axis;
      ctx.lineWidth = 1;
      ctx.stroke();

      set.forEach(function (layer) {
        ctx.beginPath();
        ctx.moveTo(0, mid);
        for (var x = 0; x <= width; x += step) {
          ctx.lineTo(x, waveY(x, layer, t, mid));
        }
        ctx.lineTo(width, mid);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      ctx.beginPath();
      for (var x2 = 0; x2 <= width; x2 += step) {
        var y = waveY(x2, set[1], t, mid);
        if (x2 === 0) ctx.moveTo(x2, y);
        else ctx.lineTo(x2, y);
      }
      ctx.strokeStyle = colors.crest;
      ctx.lineWidth = 1.3;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
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