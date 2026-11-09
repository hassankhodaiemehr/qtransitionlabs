(function () {
  "use strict";

  var config = window.QTL_ANALYTICS || {};
  var statsApi = (config.statsApiUrl || "").replace(/\/$/, "");
  if (!statsApi) {
    return;
  }

  var VISITOR_KEY = "qtl_vid";
  var SESSION_HIT = "qtl_visit_recorded";

  function visitorId() {
    try {
      var id = localStorage.getItem(VISITOR_KEY);
      if (!id) {
        id =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : "v-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem(VISITOR_KEY, id);
      }
      return id;
    } catch (_e) {
      return "anon-" + Date.now();
    }
  }

  function recordVisit() {
    if (sessionStorage.getItem(SESSION_HIT)) {
      return;
    }
    var payload = {
      path: config.pagePath || window.location.pathname || "/",
      visitor_id: visitorId(),
    };
    fetch(statsApi + "/api/analytics/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(function () {
        try {
          sessionStorage.setItem(SESSION_HIT, "1");
        } catch (_e2) {}
      })
      .catch(function () {});
  }

  function formatInt(n) {
    if (typeof n !== "number" || !isFinite(n)) {
      return "—";
    }
    try {
      return n.toLocaleString();
    } catch (_e) {
      return String(n);
    }
  }

  function applySummary(data) {
    var els = document.querySelectorAll("[data-qtl-stat]");
    if (!els.length || !data) {
      return;
    }
    var map = {
      pageviews: data.pageviews,
      unique: data.unique_visitors,
      today: data.pageviews_today,
      unique_today: data.unique_today,
    };
    els.forEach(function (el) {
      var key = el.getAttribute("data-qtl-stat");
      if (key && map[key] !== undefined) {
        el.textContent = formatInt(map[key]);
      }
    });
    var sinceEl = document.querySelector("[data-qtl-stat-since]");
    if (sinceEl && data.tracked_since) {
      var d = new Date(data.tracked_since);
      if (!isNaN(d.getTime())) {
        sinceEl.textContent = d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    }
    var topList = document.getElementById("traffic-top-paths");
    if (topList && data.top_paths && data.top_paths.length) {
      topList.innerHTML = "";
      data.top_paths.forEach(function (row) {
        var li = document.createElement("li");
        li.innerHTML =
          "<span class=\"traffic-path\">" +
          row.path +
          "</span><span class=\"traffic-views\">" +
          formatInt(row.views) +
          "</span>";
        topList.appendChild(li);
      });
    }
  }

  function refreshSummary() {
    return fetch(statsApi + "/api/analytics/summary")
      .then(function (r) {
        if (!r.ok) {
          throw new Error("stats");
        }
        return r.json();
      })
      .then(applySummary)
      .catch(function () {
        document.querySelectorAll("[data-qtl-stat]").forEach(function (el) {
          if (el.textContent === "…") {
            el.textContent = "—";
          }
        });
      });
  }

  recordVisit();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", refreshSummary);
  } else {
    refreshSummary();
  }
})();
