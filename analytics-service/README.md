# QTL site analytics API

Powers the footer counter and [/traffic/](https://www.qtransitionlabs.com/traffic/) page on the static Jekyll site.

## Deploy on Render

1. Open [Render Dashboard](https://dashboard.render.com) → your **Blueprint** for this repo.
2. **Sync** (or create the blueprint from `render.yaml` in the repo root).
3. Confirm service **`qtl-analytics`** is running.
4. Verify: [https://qtl-analytics.onrender.com/api/health](https://qtl-analytics.onrender.com/api/health) → `{"status":"ok","service":"qtl-analytics"}`

`analytics.stats_api_url` in `_config.yml` must match this hostname (default: `https://qtl-analytics.onrender.com`).

## Persistence

SQLite path is `VISITOR_DB_PATH` (default `/tmp/qtl_site_visitors.sqlite`). On Render free tier this survives restarts but **resets on redeploy**. For durable counts, attach a **persistent disk** and set e.g. `VISITOR_DB_PATH=/data/qtl_site_visitors.sqlite`.

## Local test

```bash
cd analytics-service
pip install -r requirements.txt
set VISITOR_DB_PATH=./test.db
uvicorn api:app --port 8080
```

- `GET http://127.0.0.1:8080/api/analytics/summary`
- `POST http://127.0.0.1:8080/api/analytics/visit` with JSON `{"path":"/","visitor_id":"test-visitor-01"}`
