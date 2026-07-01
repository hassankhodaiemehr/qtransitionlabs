# SILMARILS Demo — Deploy to Render

## One-time setup

1. Push this repo to GitHub (`hassankhodaiemehr/qtransitionlabs`).
2. Go to [render.com](https://render.com) → **New** → **Blueprint**.
3. Connect the `qtransitionlabs` repository.
4. Render reads `render.yaml` and creates service **silmarils-demo**.
5. After deploy, verify: https://silmarils-demo.onrender.com/api/health

The QTL site iframe at `/demo/` uses `demo_url` from `_config.yml`.

## Local development

```bash
cd demo
pip install -r requirements.txt
uvicorn api:app --reload --port 8765
```

Then run the Jekyll site from repo root:

```bash
bundle exec jekyll serve
```

Visit http://localhost:4000/demo/

For local iframe testing, temporarily set in `_config.yml`:

```yaml
demo_url: "http://localhost:8765"
```

## Docker

```bash
cd demo
docker compose up --build
```
