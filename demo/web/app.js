const $ = (sel) => document.querySelector(sel);

let sizeChart;
let ledgerChart;
let tpsChart;
let compareTimer;
let tpsTimer;

function debounce(fn, ms = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function statusClass(ok) {
  return ok ? "ok" : "fail";
}

function statusText(ok) {
  return ok ? "PASS" : "FAIL";
}

function fmtBytes(n) {
  if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MiB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KiB`;
  return `${n} B`;
}

function fmtTps(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
}

async function runLive(simulateOnly = false) {
  const message = $("#message-input").value;
  const res = await fetch("/api/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();

  const cells = $("#live-results").querySelectorAll(".result__value");
  cells[0].textContent = statusText(data.real_verify);
  cells[0].className = `result__value ${statusClass(data.real_verify)}`;
  cells[1].textContent = statusText(data.simulated_verify);
  cells[1].className = `result__value ${statusClass(data.simulated_verify)}`;
  cells[2].textContent = `${data.signature_bytes} B`;
  cells[2].className = "result__value";
  cells[3].textContent = `${data.timing_us.sign.toFixed(0)} / ${data.timing_us.verify.toFixed(0)} µs`;
  cells[3].className = "result__value";

  if (simulateOnly) {
    cells[0].textContent = "—";
    cells[0].className = "result__value muted";
  }
}

function chartColors(items, key = "is_silmarils") {
  return items.map((s) => (s[key] || s.is_hybrid ? "#38bdf8" : "#f87171"));
}

function updateCharts(data) {
  const labels = data.schemes.map((s) => s.short_name);
  const colors = chartColors(data.schemes);

  if (sizeChart) sizeChart.destroy();
  sizeChart = new Chart($("#chart-sizes"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Signature bytes",
        data: data.schemes.map((s) => s.sig_bytes),
        backgroundColor: colors,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          type: "logarithmic",
          ticks: { color: "#8b949e" },
          grid: { color: "rgba(255,255,255,0.06)" },
        },
        x: { ticks: { color: "#8b949e" }, grid: { display: false } },
      },
    },
  });

  if (ledgerChart) ledgerChart.destroy();
  ledgerChart = new Chart($("#chart-ledger"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Auth bytes / block",
        data: data.schemes.map((s) => s.workload.total_auth_bytes_per_block),
        backgroundColor: colors,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          ticks: {
            color: "#8b949e",
            callback: (v) => fmtBytes(v),
          },
          grid: { color: "rgba(255,255,255,0.06)" },
        },
        x: { ticks: { color: "#8b949e" }, grid: { display: false } },
      },
    },
  });
}

function updateTable(data) {
  const tbody = $("#compare-table tbody");
  tbody.innerHTML = "";
  for (const s of data.schemes) {
    const tr = document.createElement("tr");
    if (s.is_silmarils) tr.classList.add("highlight");
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.sig_bytes.toLocaleString()} B</td>
      <td>${s.is_public_verifier ? "Public" : "TDV"}</td>
      <td>${fmtBytes(s.workload.total_auth_bytes_per_block)}</td>
      <td>${s.workload.total_auth_mib_per_minute.toFixed(2)} MiB</td>
      <td>${s.workload.est_verify_cpu_ms_per_block.toFixed(1)} ms</td>
    `;
    tbody.appendChild(tr);
  }
}

function updateHighlights(data) {
  $("#stat-factor").textContent = `${data.highlights.size_reduction_factor}×`;
  $("#stat-savings").textContent = `${data.highlights.auth_savings_pct_vs_dilithium2}%`;
}

async function refreshComparison() {
  const validators = $("#validators").value;
  const tx_per_block = $("#tx-per-block").value;
  const blocks_per_minute = $("#blocks-per-minute").value;

  $("#out-validators").textContent = validators;
  $("#out-tx").textContent = tx_per_block;
  $("#out-bpm").textContent = Number(blocks_per_minute).toFixed(1);

  const qs = new URLSearchParams({ validators, tx_per_block, blocks_per_minute });
  const res = await fetch(`/api/compare?${qs}`);
  const data = await res.json();
  updateCharts(data);
  updateTable(data);
  updateHighlights(data);
}

function updateTpsChart(items) {
  const labels = items.map((i) => i.short_name);
  const colors = items.map((i) => {
    if (i.is_hybrid) return "#38bdf8";
    if (i.is_silmarils) return "#60a5fa";
    if (i.short_name.includes("retrofit")) return "#f87171";
    return "#fb923c";
  });

  if (tpsChart) tpsChart.destroy();
  tpsChart = new Chart($("#chart-tps"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Effective TPS",
        data: items.map((i) => i.effective_tps),
        backgroundColor: colors,
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          ticks: { color: "#8b949e" },
          grid: { color: "rgba(255,255,255,0.06)" },
        },
        x: { ticks: { color: "#8b949e", maxRotation: 20 }, grid: { display: false } },
      },
    },
  });
}

async function refreshTps() {
  const base_tps = $("#base-tps").value;
  const validators = $("#tps-validators").value;
  const tx_per_block = $("#tps-tx-per-block").value;

  $("#out-base-tps").textContent = Number(base_tps).toLocaleString();
  $("#out-tps-validators").textContent = validators;
  $("#out-tps-tx").textContent = tx_per_block;

  const qs = new URLSearchParams({ base_tps, validators, tx_per_block });
  const res = await fetch(`/api/tps?${qs}`);
  const data = await res.json();

  const hybrid = data.hybrid_stack;
  const dil = data.schemes.find((s) => s.short_name.includes("Dilithium"));
  const retrofit = data.full_pq_retrofit;

  $("#tps-hybrid").textContent = `${fmtTps(hybrid.effective_tps)} TPS`;
  $("#tps-hybrid-loss").textContent = `${hybrid.tps_loss_pct}% overhead · ${hybrid.model}`;
  $("#tps-dilithium").textContent = `${fmtTps(dil.effective_tps)} TPS`;
  $("#tps-dilithium-loss").textContent = `${dil.tps_loss_pct}% overhead · CPU model`;
  $("#tps-retrofit").textContent = `${fmtTps(retrofit.effective_tps)} TPS`;
  $("#tps-retrofit-loss").textContent = `${retrofit.tps_loss_pct}% overhead · industry benchmark`;

  $("#stat-tps-gain").textContent = `+${data.highlights.hybrid_vs_retrofit_tps_gain_pct}%`;

  const chartItems = [
    hybrid,
    ...data.schemes.filter((s) => s.is_silmarils || s.short_name.includes("Dilithium") || s.short_name.includes("SPHINCS")),
    retrofit,
  ].map((s) => ({
    ...s,
    short_name: s.short_name || s.scheme.split(" (")[0],
  }));

  updateTpsChart(chartItems);
}

function bindControls() {
  const debouncedCompare = debounce(refreshComparison, 200);
  const debouncedTps = debounce(refreshTps, 200);

  for (const id of ["validators", "tx-per-block", "blocks-per-minute"]) {
    $(`#${id}`).addEventListener("input", debouncedCompare);
  }
  for (const id of ["base-tps", "tps-validators", "tps-tx-per-block"]) {
    $(`#${id}`).addEventListener("input", debouncedTps);
  }

  $("#btn-sign").addEventListener("click", () => runLive(false));
  $("#btn-simulate").addEventListener("click", () => runLive(true));
}

document.addEventListener("DOMContentLoaded", async () => {
  bindControls();
  await Promise.all([refreshComparison(), refreshTps(), runLive(false)]);
});
