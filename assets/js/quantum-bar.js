(function () {
  function smoothstep(edge0, edge1, x) {
    var t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  }

  function envelope(x, width, t) {
    var u = x / width;
    var center = 0.5 + 0.08 * Math.sin(t * 0.35);
    var widthBell = 0.38 + 0.06 * Math.sin(t * 0.55 + 0.6);
    return smoothstep(center - widthBell, center, u) * (1 - smoothstep(center, center + widthBell, u));
  }

  function chirpWave(x, width, t) {
    var u = x / width;
    var freq = 0.006 + 0.01 * Math.sin(Math.PI * u);
    return Math.sin(freq * x * 5.5 + t * 0.55);
  }

  function carrierWave(x, width, t) {
    return Math.sin(x * 0.022 - t * 0.95);
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
    var smoothY = [];

    function isLight() {
      return document.body.classList.contains('light-mode');
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      smoothY = [];
    }

    function palette() {
      if (isLight()) {
        return {
          fillTop: 'rgba(15, 98, 254, 0.14)',
          fillBottom: 'rgba(15, 98, 254, 0.02)',
          stroke: 'rgba(0, 82, 204, 0.75)',
          depth: 'rgba(56, 189, 248, 0.22)',
          center: 'rgba(0, 94, 210, 0.2)',
        };
      }
      return {
        fillTop: 'rgba(120, 169, 255, 0.16)',
        fillBottom: 'rgba(15, 98, 254, 0.03)',
        stroke: 'rgba(150, 190, 255, 0.88)',
        depth: 'rgba(69, 137, 255, 0.18)',
        center: 'rgba(120, 169, 255, 0.12)',
      };
    }

    function sampleWave(width, height, t) {
      var cy = height * 0.5;
      var amp = height * 0.2;
      var step = Math.max(1, Math.floor(width / 320));
      var raw = [];

      for (var x = 0; x <= width; x += step) {
        var env = envelope(x, width, t);
        var modulated = chirpWave(x, width, t) * carrierWave(x, width, t);
        var blended = carrierWave(x, width, t) * 0.65 + modulated * 0.35;
        var y = cy + amp * blended * (0.45 + 0.55 * env);
        raw.push({ x: x, y: y });
      }

      if (smoothY.length !== raw.length) {
        smoothY = raw.map(function (p) {
          return p.y;
        });
      } else {
        var smooth = 0.22;
        for (var i = 0; i < raw.length; i++) {
          smoothY[i] += (raw[i].y - smoothY[i]) * smooth;
        }
      }

      return raw.map(function (p, i) {
        return { x: p.x, y: smoothY[i] };
      });
    }

    function drawPath(pts, w, h, colors) {
      var cy = h * 0.5;

      var fillGrad = ctx.createLinearGradient(0, cy - h * 0.22, 0, cy + h * 0.28);
      fillGrad.addColorStop(0, colors.fillTop);
      fillGrad.addColorStop(1, colors.fillBottom);

      ctx.beginPath();
      ctx.moveTo(0, cy);
      pts.forEach(function (p) {
        ctx.lineTo(p.x, p.y);
      });
      ctx.lineTo(w, cy);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      ctx.beginPath();
      pts.forEach(function (p, i) {
        var y = p.y + 3;
        if (i === 0) ctx.moveTo(p.x, y);
        else ctx.lineTo(p.x, y);
      });
      ctx.strokeStyle = colors.depth;
      ctx.lineWidth = 1.25;
      ctx.stroke();

      ctx.beginPath();
      pts.forEach(function (p, i) {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowColor = colors.depth;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.strokeStyle = colors.center;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function draw(t) {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      if (!w || !h) return;

      ctx.clearRect(0, 0, w, h);
      var pts = sampleWave(w, h, t);
      drawPath(pts, w, h, palette());
    }

    function frame(now) {
      if (!visible) {
        animId = requestAnimationFrame(frame);
        return;
      }
      draw((now - t0) * 0.001);
      if (!reduced) animId = requestAnimationFrame(frame);
    }

    resize();
    draw(0);
    if (!reduced) animId = requestAnimationFrame(frame);

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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuantumBar);
  } else {
    initQuantumBar();
  }
})();