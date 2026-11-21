(function () {
  function chirpWave(x, width, t) {
    var u = x / width;
    var freq = 0.014 + 0.042 * Math.sin(Math.PI * u);
    var phase = freq * x * 7.2 + t * 0.9 + Math.sin(u * Math.PI * 2 + t * 0.45) * 1.1;
    return Math.sin(phase);
  }

  function carrierWave(x, width, t) {
    return Math.sin(x * 0.036 - t * 2.35 + Math.sin(t * 0.55) * 0.6);
  }

  function initQuantumBar() {
    var root = document.querySelector('.quantum-bar');
    var canvas = root && root.querySelector('.quantum-bar__canvas');
    if (!root || !canvas) return;

    var ctx = canvas.getContext('2d');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var animId = 0;
    var t0 = performance.now();
    var visible = true;

    function isLight() {
      return document.body.classList.contains('light-mode');
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function colors() {
      if (isLight()) {
        return {
          fill: 'rgba(15, 98, 254, ',
          stroke: 'rgba(0, 70, 200, 0.85)',
          highlight: '#0f62fe',
          glow: 'rgba(15, 98, 254, 0.45)',
          ghost: 'rgba(56, 189, 248, 0.35)',
        };
      }
      return {
        fill: 'rgba(15, 98, 254, ',
        stroke: 'rgba(120, 169, 255, 0.92)',
        highlight: '#b4d2ff',
        glow: 'rgba(69, 137, 255, 0.75)',
        ghost: 'rgba(129, 140, 248, 0.4)',
      };
    }

    function samplePoints(width, height, t) {
      var cy = height * 0.54;
      var amp = height * 0.31;
      var points = [];
      var step = Math.max(1, Math.floor(width / 280));

      for (var x = 0; x <= width; x += step) {
        var chirp = chirpWave(x, width, t);
        var carrier = carrierWave(x, width, t);
        var product = chirp * carrier;
        points.push({
          x: x,
          y: cy + amp * product,
          product: product,
          depth: 0.35 + 0.65 * Math.abs(product),
        });
      }
      return { points: points, cy: cy, baseline: cy + height * 0.14 };
    }

    function draw(t) {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      if (!w || !h) return;

      var palette = colors();
      var sample = samplePoints(w, h, t);
      var pts = sample.points;

      ctx.clearRect(0, 0, w, h);

      for (var layer = 5; layer >= 0; layer--) {
        var depth = layer * (h * 0.028);
        var alpha = 0.06 + layer * 0.11;

        ctx.beginPath();
        pts.forEach(function (p, i) {
          var y = p.y + depth + p.depth * layer * 1.6;
          if (i === 0) ctx.moveTo(p.x, y);
          else ctx.lineTo(p.x, y);
        });
        ctx.lineTo(w, sample.baseline + depth);
        ctx.lineTo(0, sample.baseline + depth);
        ctx.closePath();
        ctx.fillStyle = palette.fill + alpha * 0.55 + ')';
        ctx.fill();
      }

      ctx.beginPath();
      pts.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      var grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, palette.ghost);
      grad.addColorStop(0.5, palette.highlight);
      grad.addColorStop(1, palette.ghost);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = palette.glow;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      pts.forEach(function (p, i) {
        var y = sample.cy + (p.y - sample.cy) * 0.55 + h * 0.06;
        if (i === 0) ctx.moveTo(p.x, y);
        else ctx.lineTo(p.x, y);
      });
      ctx.strokeStyle = palette.ghost;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.55;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      if (!visible) {
        animId = requestAnimationFrame(frame);
        return;
      }
      var t = (now - t0) * 0.001;
      draw(t);
      if (!reduced) animId = requestAnimationFrame(frame);
    }

    resize();
    draw(0);

    if (!reduced) {
      animId = requestAnimationFrame(frame);
    }

    window.addEventListener('resize', function () {
      resize();
      draw((performance.now() - t0) * 0.001);
    });

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        visible = entries[0] && entries[0].isIntersecting;
      }, { threshold: 0 });
      obs.observe(root);
    }

    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        window.setTimeout(function () {
          draw((performance.now() - t0) * 0.001);
        }, 0);
      });
    }

    return function cancel() {
      if (animId) cancelAnimationFrame(animId);
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuantumBar);
  } else {
    initQuantumBar();
  }
})();