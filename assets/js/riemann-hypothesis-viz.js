(function () {
  'use strict';

  var root = document.querySelector('.rh-viz[data-rh-viz]');
  if (!root) return;

  var MAG_SVG = root.querySelector('.rh-viz__mag-svg');
  var PLANE_SVG = root.querySelector('.rh-viz__plane-svg');
  var T_READOUT = root.querySelector('[data-rh-t-value]');
  var MAG_READOUT = root.querySelector('[data-rh-zeta-value]');
  var RE_READOUT = root.querySelector('[data-rh-re-value]');
  var IM_READOUT = root.querySelector('[data-rh-im-value]');
  var ZERO_CHIP = root.querySelector('[data-rh-zero-chip]');
  var PLAY_BTN = root.querySelector('[data-rh-play]');
  var SLIDER = root.querySelector('[data-rh-slider]');

  if (!MAG_SVG || !PLANE_SVG) return;

  var DATA_URL =
    root.getAttribute('data-zeta-data') ||
    '/assets/data/riemann-zeta-critical-line.json';

  var T_MAX = 52;
  var MAG = { l: 58, t: 36, w: 500, h: 138, padR: 18, padB: 28, baseline: 174 };
  var REIM = { l: 58, t: 196, w: 500, h: 54 };
  var PL = { l: 70, t: 28, w: 500, h: 248, padR: 24, padB: 32 };

  function el(svg, name, attrs) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attrs || {}).forEach(function (k) {
      node.setAttribute(k, attrs[k]);
    });
    return node;
  }

  function interpolate(samples, t, key) {
    if (t <= samples[0].t) return samples[0][key];
    if (t >= samples[samples.length - 1].t) return samples[samples.length - 1][key];

    var lo = 0;
    var hi = samples.length - 1;
    while (hi - lo > 1) {
      var mid = (lo + hi) >> 1;
      if (samples[mid].t <= t) lo = mid;
      else hi = mid;
    }
    var a = samples[lo];
    var b = samples[hi];
    var u = (t - a.t) / (b.t - a.t);
    return a[key] + u * (b[key] - a[key]);
  }

  function stateAt(samples, t) {
    return {
      t: t,
      mag: interpolate(samples, t, 'mag'),
      re: interpolate(samples, t, 're'),
      im: interpolate(samples, t, 'im')
    };
  }

  function findZeros(samples, limit) {
    var zeros = [];
    var i;
    for (i = 2; i < samples.length - 2; i++) {
      var m = samples[i].mag;
      if (
        m < samples[i - 1].mag &&
        m < samples[i + 1].mag &&
        m < samples[i - 2].mag &&
        m < samples[i + 2].mag &&
        m < 0.035
      ) {
        var a = samples[i - 1];
        var b = samples[i + 1];
        var denom = a.mag + b.mag - 2 * m;
        var tStar = samples[i].t;
        if (denom > 1e-12) {
          tStar = samples[i].t + (0.5 * (a.mag - b.mag) / denom) * (samples[i].t - a.t);
        }
        if (!zeros.length || Math.abs(zeros[zeros.length - 1] - tStar) > 0.5) {
          zeros.push(tStar);
        }
      }
      if (zeros.length >= (limit || 10)) break;
    }
    return zeros;
  }

  function mapMag(t, val, vmax) {
    var x = MAG.l + (t / T_MAX) * MAG.w;
    var y = MAG.t + MAG.h - (Math.min(val, vmax) / vmax) * MAG.h;
    return { x: x, y: y };
  }

  function mapReIm(t, val, vmax) {
    var x = MAG.l + (t / T_MAX) * MAG.w;
    var mid = REIM.t + REIM.h / 2;
    var y = mid - (val / vmax) * (REIM.h / 2 - 4);
    return { x: x, y: y };
  }

  function mapPlane(t) {
    return {
      x: PL.l + 0.5 * PL.w,
      y: PL.t + PL.h - (t / T_MAX) * PL.h
    };
  }

  function buildPaths(samples, vmax) {
    var magPath = [];
    var magArea = [];
    var rePath = [];
    var imPath = [];
    var i;
    var p;

    for (i = 0; i < samples.length; i++) {
      p = mapMag(samples[i].t, samples[i].mag, vmax);
      if (i === 0) {
        magPath.push('M', p.x.toFixed(2), p.y.toFixed(2));
        magArea.push('M', p.x.toFixed(2), MAG.baseline.toFixed(2), 'L', p.x.toFixed(2), p.y.toFixed(2));
      } else {
        magPath.push('L', p.x.toFixed(2), p.y.toFixed(2));
        magArea.push('L', p.x.toFixed(2), p.y.toFixed(2));
      }
    }
    p = mapMag(samples[samples.length - 1].t, samples[samples.length - 1].mag, vmax);
    magArea.push('L', p.x.toFixed(2), MAG.baseline.toFixed(2), 'Z');

    var reMax = 0;
    var imMax = 0;
    samples.forEach(function (s) {
      reMax = Math.max(reMax, Math.abs(s.re));
      imMax = Math.max(imMax, Math.abs(s.im));
    });
    var riMax = Math.max(reMax, imMax, 0.4);

    for (i = 0; i < samples.length; i++) {
      var pr = mapReIm(samples[i].t, samples[i].re, riMax);
      var pi = mapReIm(samples[i].t, samples[i].im, riMax);
      if (i === 0) {
        rePath.push('M', pr.x.toFixed(2), pr.y.toFixed(2));
        imPath.push('M', pi.x.toFixed(2), pi.y.toFixed(2));
      } else {
        rePath.push('L', pr.x.toFixed(2), pr.y.toFixed(2));
        imPath.push('L', pi.x.toFixed(2), pi.y.toFixed(2));
      }
    }

    return {
      magLine: magPath.join(' '),
      magArea: magArea.join(' '),
      reLine: rePath.join(' '),
      imLine: imPath.join(' '),
      riMax: riMax
    };
  }

  function renderStatic(samples, meta, zeros) {
    var vmax = meta.vmax || 3.7;
    var paths = buildPaths(samples, vmax);

    var magG = el(MAG_SVG, 'g', { class: 'rh-viz__mag-layer' });
    magG.appendChild(el('line', { class: 'rh-viz__reim-mid', x1: MAG.l, x2: MAG.l + MAG.w, y1: REIM.t + REIM.h / 2, y2: REIM.t + REIM.h / 2 }));
    magG.appendChild(el('path', { class: 'rh-viz__mag-area', d: paths.magArea }));
    magG.appendChild(el('path', { class: 'rh-viz__mag-line', d: paths.magLine }));
    magG.appendChild(el('path', { class: 'rh-viz__re-line', d: paths.reLine }));
    magG.appendChild(el('path', { class: 'rh-viz__im-line', d: paths.imLine }));

    zeros.forEach(function (z, idx) {
      var magAt = interpolate(samples, z, 'mag');
      var p = mapMag(z, magAt, vmax);
      var g = el('g', { class: 'rh-viz__mag-zero', 'data-zero-idx': String(idx) });
      g.appendChild(
        el('line', {
          class: 'rh-viz__mag-zero-stem',
          x1: p.x,
          y1: p.y,
          x2: p.x,
          y2: MAG.baseline
        })
      );
      g.appendChild(el('circle', { class: 'rh-viz__mag-zero-dot', cx: p.x, cy: p.y, r: 4 }));
      if (idx < 6) {
        g.appendChild(
          el('text', {
            class: 'rh-viz__mag-zero-label',
            x: p.x,
            y: MAG.baseline + 16,
            'text-anchor': 'middle'
          })
        ).textContent = z.toFixed(2);
      }
      magG.appendChild(g);
    });

    var magCursor = el('g', { class: 'rh-viz__mag-cursor' });
    magCursor.appendChild(el('line', { class: 'rh-viz__cursor-v', y1: MAG.t, y2: MAG.baseline }));
    magCursor.appendChild(el('circle', { class: 'rh-viz__cursor-dot', r: 6 }));
    magG.appendChild(magCursor);
    MAG_SVG.appendChild(magG);

    var plG = el(PLANE_SVG, 'g', { class: 'rh-viz__plane-layer' });
    plG.appendChild(el('rect', { class: 'rh-viz__strip-shade', x: PL.l, y: PL.t, width: PL.w, height: PL.h }));
    plG.appendChild(el('rect', { class: 'rh-viz__strip-critical', x: PL.l + PL.w * 0.5 - 2, y: PL.t, width: 4, height: PL.h }));
    plG.appendChild(
      el('line', {
        class: 'rh-viz__critical-line',
        x1: PL.l + PL.w * 0.5,
        y1: PL.t,
        x2: PL.l + PL.w * 0.5,
        y2: PL.t + PL.h
      })
    );

    [0, 0.25, 0.5, 0.75, 1].forEach(function (r) {
      var x = PL.l + r * PL.w;
      plG.appendChild(el('line', { class: 'rh-viz__grid', x1: x, y1: PL.t, x2: x, y2: PL.t + PL.h }));
    });
    [0, 10, 20, 30, 40, 50].forEach(function (im) {
      var y = PL.t + PL.h - (im / T_MAX) * PL.h;
      plG.appendChild(el('line', { class: 'rh-viz__grid', x1: PL.l, y1: y, x2: PL.l + PL.w, y2: y }));
    });

    zeros.forEach(function (z, idx) {
      var p = mapPlane(z);
      var g = el('g', { class: 'rh-viz__plane-zero', 'data-zero-idx': String(idx) });
      g.appendChild(el('circle', { class: 'rh-viz__plane-zero-ring', cx: p.x, cy: p.y, r: 10 }));
      g.appendChild(el('circle', { class: 'rh-viz__plane-zero-dot', cx: p.x, cy: p.y, r: 4.5 }));
      plG.appendChild(g);
    });

    var plCursor = el('g', { class: 'rh-viz__plane-cursor' });
    plCursor.appendChild(el('circle', { class: 'rh-viz__plane-dot', cx: 0, cy: 0, r: 5.5 }));
    plG.appendChild(plCursor);
    PLANE_SVG.appendChild(plG);

    return {
      magVLine: magCursor.querySelector('.rh-viz__cursor-v'),
      magDot: magCursor.querySelector('.rh-viz__cursor-dot'),
      plDot: plCursor.querySelector('.rh-viz__plane-dot'),
      vmax: vmax,
      zeros: zeros
    };
  }

  function boot(dataset) {
    var samples = dataset.samples;
    var meta = dataset.meta || {};
    var zeros = findZeros(samples, 10);
    var ui = renderStatic(samples, meta, zeros);

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var playing = !reduced;
    var tManual = 14.13;
    var start = performance.now();
    var duration = 16000;

    function nearestZero(t) {
      var best = null;
      zeros.forEach(function (z) {
        var d = Math.abs(t - z);
        if (!best || d < best.d) best = { z: z, d: d };
      });
      return best;
    }

    function setZerosActive(idx, on) {
      root.querySelectorAll('[data-zero-idx="' + idx + '"]').forEach(function (node) {
        node.classList.toggle('is-active', on);
      });
    }

    function applyState(t) {
      var st = stateAt(samples, t);
      var mp = mapMag(st.t, st.mag, ui.vmax);
      var pp = mapPlane(st.t);

      ui.magVLine.setAttribute('x1', mp.x);
      ui.magVLine.setAttribute('x2', mp.x);
      ui.magDot.setAttribute('cx', mp.x);
      ui.magDot.setAttribute('cy', mp.y);
      ui.plDot.setAttribute('cx', pp.x);
      ui.plDot.setAttribute('cy', pp.y);

      var near = nearestZero(st.t);
      var onZero = st.mag < 0.06 || (near && near.d < 0.12);
      zeros.forEach(function (z, idx) {
        setZerosActive(idx, onZero && near && z === near.z);
      });

      if (T_READOUT) T_READOUT.textContent = st.t.toFixed(3);
      if (MAG_READOUT) MAG_READOUT.textContent = st.mag.toExponential(3);
      if (RE_READOUT) RE_READOUT.textContent = st.re.toFixed(4);
      if (IM_READOUT) IM_READOUT.textContent = st.im.toFixed(4);
      if (SLIDER) SLIDER.value = String(st.t);
      if (ZERO_CHIP) {
        if (onZero && near) {
          ZERO_CHIP.textContent = 'Zero crossing: t ≈ ' + near.z.toFixed(6) + ' (|ζ| ≈ ' + st.mag.toExponential(1) + ')';
          ZERO_CHIP.classList.add('is-hot');
        } else {
          ZERO_CHIP.textContent = 'Numerical trace along s = ½ + it (mpmath ζ)';
          ZERO_CHIP.classList.remove('is-hot');
        }
      }
    }

    function frame(now) {
      var t;
      if (playing && duration > 0) {
        var phase = ((now - start) % duration) / duration;
        t = phase * T_MAX;
      } else {
        t = tManual;
      }
      applyState(t);
      if (playing && duration > 0) requestAnimationFrame(frame);
    }

    applyState(tManual);

    if (PLAY_BTN) {
      PLAY_BTN.addEventListener('click', function () {
        playing = !playing;
        PLAY_BTN.textContent = playing ? 'Pause' : 'Run simulation';
        PLAY_BTN.setAttribute('aria-pressed', playing ? 'true' : 'false');
        if (playing) {
          start = performance.now() - ((tManual / T_MAX) * duration);
          requestAnimationFrame(frame);
        }
      });
      PLAY_BTN.textContent = playing ? 'Pause' : 'Run simulation';
    }

    if (SLIDER) {
      SLIDER.min = '0';
      SLIDER.max = String(T_MAX);
      SLIDER.step = '0.04';
      SLIDER.value = String(tManual);
      SLIDER.addEventListener('input', function () {
        playing = false;
        if (PLAY_BTN) {
          PLAY_BTN.textContent = 'Run simulation';
          PLAY_BTN.setAttribute('aria-pressed', 'false');
        }
        tManual = parseFloat(SLIDER.value, 10) || 0;
        applyState(tManual);
      });
    }

    if (playing && duration > 0) requestAnimationFrame(frame);

    root.classList.add('rh-viz--ready');
  }

  fetch(DATA_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('load failed');
      return r.json();
    })
    .then(boot)
    .catch(function () {
      root.classList.add('rh-viz--error');
      if (ZERO_CHIP) ZERO_CHIP.textContent = 'Could not load numerical ζ dataset.';
    });
})();