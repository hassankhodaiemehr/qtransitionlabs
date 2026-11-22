(function () {
  'use strict';

  var root = document.querySelector('.rh-viz[data-rh-viz]');
  if (!root) return;

  var MAG_SVG = root.querySelector('.rh-viz__mag-svg');
  var PLANE_SVG = root.querySelector('.rh-viz__plane-svg');
  var T_READOUT = root.querySelector('[data-rh-t-value]');
  var Z_READOUT = root.querySelector('[data-rh-zeta-value]');
  var ZERO_CHIP = root.querySelector('[data-rh-zero-chip]');

  if (!MAG_SVG || !PLANE_SVG) return;

  var T_MAX = 52;
  var ZEROS = [
    14.134725, 21.022040, 25.010858, 30.424876, 32.935062,
    37.586178, 40.918719, 43.327073, 48.005151, 49.773832
  ];

  var MAG = { l: 58, t: 36, w: 500, h: 168, padR: 18, padB: 28 };
  var PL = { l: 70, t: 28, w: 500, h: 248, padR: 24, padB: 32 };

  function zetaCriticalMagnitude(t) {
    var env = Math.pow(t + 1.4, 0.26) * 0.68;
    var notch = 1;
    var i;
    for (i = 0; i < ZEROS.length; i++) {
      var d = Math.abs(t - ZEROS[i]);
      notch *= Math.sqrt(d * d + 0.008) / 0.085;
    }
    var osc =
      0.34 * Math.sin(t * 1.63) * Math.sin(t * 0.37 + 0.8) +
      0.16 * Math.sin(t * 4.1) +
      0.08 * Math.sin(t * 7.2 + 0.5);
    return Math.max(0.025, env * notch + osc * notch * 0.9);
  }

  function mapMag(t, val) {
    var x = MAG.l + (t / T_MAX) * MAG.w;
    var vmax = 2.45;
    var y = MAG.t + MAG.h - (Math.min(val, vmax) / vmax) * MAG.h;
    return { x: x, y: y };
  }

  function mapPlane(t) {
    var x = PL.l + 0.5 * PL.w;
    var y = PL.t + PL.h - (t / T_MAX) * PL.h;
    return { x: x, y: y };
  }

  function sampleMagnitude(samples) {
    var pts = [];
    var path = [];
    var area = [];
    var i;
    var t;
    var val;
    var p;
    var maxV = 0;

    for (i = 0; i <= samples; i++) {
      t = (T_MAX * i) / samples;
      val = zetaCriticalMagnitude(t);
      maxV = Math.max(maxV, val);
      pts.push({ t: t, v: val });
    }

    for (i = 0; i < pts.length; i++) {
      p = mapMag(pts[i].t, pts[i].v);
      if (i === 0) {
        path.push('M', p.x.toFixed(2), p.y.toFixed(2));
        area.push('M', p.x.toFixed(2), (MAG.t + MAG.h).toFixed(2));
        area.push('L', p.x.toFixed(2), p.y.toFixed(2));
      } else {
        path.push('L', p.x.toFixed(2), p.y.toFixed(2));
        area.push('L', p.x.toFixed(2), p.y.toFixed(2));
      }
    }

    p = mapMag(pts[pts.length - 1].t, pts[pts.length - 1].v);
    area.push('L', p.x.toFixed(2), (MAG.t + MAG.h).toFixed(2), 'Z');

    return { pts: pts, lineD: path.join(' '), areaD: area.join(' ') };
  }

  function el(svg, name, attrs) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    Object.keys(attrs || {}).forEach(function (k) {
      node.setAttribute(k, attrs[k]);
    });
    return node;
  }

  function nearestZero(t) {
    var best = null;
    var d;
    ZEROS.forEach(function (z) {
      d = Math.abs(t - z);
      if (!best || d < best.d) best = { z: z, d: d };
    });
    return best;
  }

  var sampled = sampleMagnitude(320);

  /* --- Magnitude panel --- */
  var magG = el(MAG_SVG, 'g', { class: 'rh-viz__mag-layer' });

  magG.appendChild(
    el('path', {
      class: 'rh-viz__mag-area',
      d: sampled.areaD
    })
  );
  magG.appendChild(
    el('path', {
      class: 'rh-viz__mag-line',
      d: sampled.lineD
    })
  );

  ZEROS.forEach(function (z, idx) {
    var p = mapMag(z, 0.04);
    var g = el('g', { class: 'rh-viz__mag-zero', 'data-zero-idx': String(idx) });
    g.appendChild(
      el('line', {
        class: 'rh-viz__mag-zero-stem',
        x1: p.x,
        y1: p.y,
        x2: p.x,
        y2: MAG.t + MAG.h
      })
    );
    g.appendChild(el('circle', { class: 'rh-viz__mag-zero-dot', cx: p.x, cy: p.y, r: 4.5 }));
    if (idx < 6) {
      g.appendChild(
        el('text', {
          class: 'rh-viz__mag-zero-label',
          x: p.x,
          y: MAG.t + MAG.h + 18,
          'text-anchor': 'middle'
        })
      ).textContent = z.toFixed(1);
    }
    magG.appendChild(g);
  });

  var magCursor = el('g', { class: 'rh-viz__mag-cursor' });
  magCursor.appendChild(
    el('line', {
      class: 'rh-viz__cursor-v',
      y1: MAG.t,
      y2: MAG.t + MAG.h
    })
  );
  magCursor.appendChild(el('circle', { class: 'rh-viz__cursor-dot', r: 7 }));
  magG.appendChild(magCursor);
  MAG_SVG.appendChild(magG);

  /* --- Complex plane panel --- */
  var plG = el(PLANE_SVG, 'g', { class: 'rh-viz__plane-layer' });

  plG.appendChild(
    el('rect', {
      class: 'rh-viz__strip-shade',
      x: PL.l,
      y: PL.t,
      width: PL.w,
      height: PL.h
    })
  );
  plG.appendChild(
    el('rect', {
      class: 'rh-viz__strip-critical',
      x: PL.l + PL.w * 0.5 - 2,
      y: PL.t,
      width: 4,
      height: PL.h
    })
  );
  plG.appendChild(
    el('line', {
      class: 'rh-viz__critical-line',
      x1: PL.l + PL.w * 0.5,
      y1: PL.t,
      x2: PL.l + PL.w * 0.5,
      y2: PL.t + PL.h
    })
  );

  var gridRe = [0, 0.25, 0.5, 0.75, 1];
  gridRe.forEach(function (r) {
    var x = PL.l + r * PL.w;
    plG.appendChild(
      el('line', {
        class: 'rh-viz__grid',
        x1: x,
        y1: PL.t,
        x2: x,
        y2: PL.t + PL.h
      })
    );
  });

  [0, 10, 20, 30, 40, 50].forEach(function (im) {
    var y = PL.t + PL.h - (im / T_MAX) * PL.h;
    plG.appendChild(
      el('line', {
        class: 'rh-viz__grid',
        x1: PL.l,
        y1: y,
        x2: PL.l + PL.w,
        y2: y
      })
    );
  });

  ZEROS.forEach(function (z, idx) {
    var p = mapPlane(z);
    var g = el('g', { class: 'rh-viz__plane-zero', 'data-zero-idx': String(idx) });
    g.appendChild(el('circle', { class: 'rh-viz__plane-zero-ring', cx: p.x, cy: p.y, r: 11 }));
    g.appendChild(el('circle', { class: 'rh-viz__plane-zero-dot', cx: p.x, cy: p.y, r: 5 }));
    plG.appendChild(g);
  });

  var plCursor = el('g', { class: 'rh-viz__plane-cursor' });
  plCursor.appendChild(
    el('circle', { class: 'rh-viz__plane-trail', cx: 0, cy: 0, r: 18 })
  );
  plCursor.appendChild(el('circle', { class: 'rh-viz__plane-dot', cx: 0, cy: 0, r: 6 }));
  plG.appendChild(plCursor);

  var planePath = el('path', { class: 'rh-viz__plane-trace', d: '' });
  plG.appendChild(planePath);

  PLANE_SVG.appendChild(plG);

  var magVLine = magCursor.querySelector('.rh-viz__cursor-v');
  var magDot = magCursor.querySelector('.rh-viz__cursor-dot');
  var plTrail = plCursor.querySelector('.rh-viz__plane-trail');
  var plDot = plCursor.querySelector('.rh-viz__plane-dot');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start = performance.now();
  var duration = reduced ? 0 : 14000;

  function setZerosActive(idx, on) {
    root.querySelectorAll('[data-zero-idx="' + idx + '"]').forEach(function (node) {
      node.classList.toggle('is-active', on);
    });
  }

  function frame(now) {
    var t;
    if (duration <= 0) {
      t = 26.5;
    } else {
      var phase = ((now - start) % duration) / duration;
      t = phase * T_MAX;
    }

    var val = zetaCriticalMagnitude(t);
    var mp = mapMag(t, val);
    var pp = mapPlane(t);

    magVLine.setAttribute('x1', mp.x);
    magVLine.setAttribute('x2', mp.x);
    magDot.setAttribute('cx', mp.x);
    magDot.setAttribute('cy', mp.y);

    plTrail.setAttribute('cx', pp.x);
    plTrail.setAttribute('cy', pp.y);
    plDot.setAttribute('cx', pp.x);
    plDot.setAttribute('cy', pp.y);

    var near = nearestZero(t);
    var onZero = near && near.d < 0.35;
    ZEROS.forEach(function (z, idx) {
      setZerosActive(idx, onZero && z === near.z);
    });

    if (T_READOUT) T_READOUT.textContent = t.toFixed(2);
    if (Z_READOUT) Z_READOUT.textContent = val.toFixed(3);
    if (ZERO_CHIP) {
      if (onZero) {
        ZERO_CHIP.textContent = 'Zero near t ≈ ' + near.z.toFixed(3) + ' — |ζ| → 0';
        ZERO_CHIP.classList.add('is-hot');
      } else {
        ZERO_CHIP.textContent = 'Scanning critical line s = ½ + it';
        ZERO_CHIP.classList.remove('is-hot');
      }
    }

    if (!reduced) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();