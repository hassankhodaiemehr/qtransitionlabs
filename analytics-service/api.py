"""Minimal FastAPI service for public QTL site visit statistics."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from analytics_store import get_summary, init_db, record_pageview

init_db()

app = FastAPI(title="QTL Site Analytics", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class VisitRequest(BaseModel):
    path: str = Field(default="/", max_length=512)
    visitor_id: str = Field(..., min_length=8, max_length=64)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "qtl-analytics"}


@app.post("/api/analytics/visit")
def post_analytics_visit(body: VisitRequest) -> dict[str, str]:
    record_pageview(body.path, body.visitor_id)
    return {"status": "ok"}


@app.get("/api/analytics/summary")
def get_analytics_summary() -> dict:
    return get_summary()
