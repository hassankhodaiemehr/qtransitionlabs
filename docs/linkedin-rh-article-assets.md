# LinkedIn assets — Riemann hypothesis / PQC article

Use these when publishing the technical LinkedIn article that points to:

- https://www.qtransitionlabs.com/news/2026-11-21-riemann-hypothesis-ai-human-proofs-pqc/

## Cover figure (static)

**Source file:** `assets/img/riemann-rh-pqc-linkedin-figure.svg`

**Export for LinkedIn article cover:**

1. Open the SVG in a browser or Figma.
2. Export **PNG**, **1200 × 627 px** (LinkedIn article cover).
3. Keep headline text inside the center ~80% width (mobile may crop edges).

## Live simulator screenshot (optional second image)

1. Open the news article locally or on production.
2. Pause the sim near **t ≈ 14.13** (first zero).
3. Capture **Panel A** + HUD; crop to **1200 × 627** or **16:9**.

## Where to place images in the article

| Slot | Asset |
|------|--------|
| Cover | `riemann-rh-pqc-linkedin-figure.png` |
| After introduction | Simulator screenshot |
| Before “Cryptography: direct and indirect effects” | Cover again or simulator |

## Regenerate numerical ζ data (site simulator)

```bash
python -c "
import json, mpmath as mp
mp.dps = 28
step = 0.04
rows = []
t = 0.0
vmax = 0.0
while t <= 52.0 + 1e-9:
    z = mp.zeta(mp.mpc('0.5', t))
    mag = float(mp.fabs(z))
    vmax = max(vmax, mag)
    rows.append([round(t, 4), mag, float(mp.re(z)), float(mp.im(z))])
    t += step
compact = {'meta': {'s': '0.5+it', 'step': step, 'tMax': 52.0, 'precisionDps': 28, 'method': 'mpmath.zeta', 'vmax': vmax}, 'samples': rows}
open('assets/js/riemann-zeta-critical-data.js', 'w', encoding='utf-8').write(
    'window.RIEMANN_ZETA_CRITICAL=' + json.dumps(compact, separators=(',', ':')) + ';'
)
open('assets/data/riemann-zeta-critical-line.json', 'w', encoding='utf-8').write(
    json.dumps({'meta': compact['meta'], 'samples': [{'t': r[0], 'mag': r[1], 're': r[2], 'im': r[3]} for r in rows]}, separators=(',', ':'))
)
print(len(rows), 'samples, vmax', vmax)
"
```

Requires `pip install mpmath`. Rebuild or push `assets/js/riemann-zeta-critical-data.js` and optionally `assets/data/riemann-zeta-critical-line.json`.