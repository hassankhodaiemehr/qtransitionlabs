"""Persistent visit statistics for the QTL marketing site (SQLite)."""

from __future__ import annotations

import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock

_DB_LOCK = Lock()
_DB_PATH = Path(os.environ.get("VISITOR_DB_PATH", "/tmp/qtl_site_visitors.sqlite"))


def _connect() -> sqlite3.Connection:
    _DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(_DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with _DB_LOCK:
        conn = _connect()
        try:
            conn.executescript(
                """
                CREATE TABLE IF NOT EXISTS pageviews (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    path TEXT NOT NULL,
                    visitor_id TEXT NOT NULL,
                    created_at TEXT NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_pageviews_created
                    ON pageviews(created_at);
                CREATE INDEX IF NOT EXISTS idx_pageviews_visitor
                    ON pageviews(visitor_id);
                """
            )
            conn.commit()
        finally:
            conn.close()


def record_pageview(path: str, visitor_id: str) -> None:
    path = (path or "/").strip()[:512]
    visitor_id = (visitor_id or "").strip()[:64]
    if not visitor_id:
        return
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    with _DB_LOCK:
        conn = _connect()
        try:
            conn.execute(
                "INSERT INTO pageviews (path, visitor_id, created_at) VALUES (?, ?, ?)",
                (path, visitor_id, now),
            )
            conn.commit()
        finally:
            conn.close()


def get_summary() -> dict:
    with _DB_LOCK:
        conn = _connect()
        try:
            row = conn.execute(
                """
                SELECT
                    COUNT(*) AS pageviews,
                    COUNT(DISTINCT visitor_id) AS unique_visitors,
                    MIN(created_at) AS since
                FROM pageviews
                """
            ).fetchone()
            today_prefix = datetime.now(timezone.utc).strftime("%Y-%m-%d")
            today_row = conn.execute(
                """
                SELECT COUNT(*) AS pageviews_today,
                       COUNT(DISTINCT visitor_id) AS unique_today
                FROM pageviews
                WHERE created_at LIKE ?
                """,
                (f"{today_prefix}%",),
            ).fetchone()
            top_paths = conn.execute(
                """
                SELECT path, COUNT(*) AS views
                FROM pageviews
                GROUP BY path
                ORDER BY views DESC
                LIMIT 8
                """
            ).fetchall()
        finally:
            conn.close()

    return {
        "pageviews": int(row["pageviews"] or 0),
        "unique_visitors": int(row["unique_visitors"] or 0),
        "pageviews_today": int(today_row["pageviews_today"] or 0),
        "unique_today": int(today_row["unique_today"] or 0),
        "tracked_since": row["since"],
        "top_paths": [{"path": r["path"], "views": int(r["views"])} for r in top_paths],
    }
