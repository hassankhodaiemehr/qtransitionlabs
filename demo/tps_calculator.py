"""TPS impact model for PQ signature schemes on blockchain hot paths."""

from __future__ import annotations

from dataclasses import dataclass

from blockchain_sim import LedgerConfig, evaluate_scheme
from pqc_catalog import SignatureScheme, primary_comparison


# Reference benchmarks from unbundled-signature / EternaX architecture narrative.
HYBRID_SILMARILS_TPS_LOSS_PCT = 2.0
FULL_PQ_RETROFIT_TPS_LOSS_PCT = 87.0  # mid-point of 84–90% industry range


@dataclass(frozen=True)
class TpsResult:
    scheme: str
    short_name: str
    is_silmarils: bool
    is_hybrid: bool
    base_tps: int
    effective_tps: int
    tps_loss_pct: float
    auth_cpu_ms_per_block: float
    block_time_ms: float
    bandwidth_mib_per_min: float
    model: str


def _block_time_ms(blocks_per_minute: float) -> float:
    return (60.0 / blocks_per_minute) * 1000.0


def _cpu_overhead_pct(auth_cpu_ms: float, block_time_ms: float) -> float:
    if block_time_ms <= 0:
        return 95.0
    return min(95.0, round(100.0 * auth_cpu_ms / block_time_ms, 1))


def calculate_scheme_tps(
    scheme: SignatureScheme,
    config: LedgerConfig,
    base_tps: int,
) -> TpsResult:
    metrics = evaluate_scheme(scheme, config)
    block_ms = _block_time_ms(config.blocks_per_minute)
    auth_cpu = metrics.est_sign_cpu_ms_per_block + metrics.est_verify_cpu_ms_per_block
    loss = _cpu_overhead_pct(auth_cpu, block_ms)
    effective = max(1, round(base_tps * (1.0 - loss / 100.0)))

    return TpsResult(
        scheme=scheme.name,
        short_name=scheme.name.split(" (")[0],
        is_silmarils=scheme.is_silmarils,
        is_hybrid=False,
        base_tps=base_tps,
        effective_tps=effective,
        tps_loss_pct=loss,
        auth_cpu_ms_per_block=round(auth_cpu, 1),
        block_time_ms=round(block_ms, 1),
        bandwidth_mib_per_min=round(metrics.total_auth_mib_per_minute, 2),
        model="CPU + block-time budget",
    )


def calculate_hybrid_stack_tps(
    config: LedgerConfig,
    base_tps: int,
) -> TpsResult:
    """Unbundled architecture: SILMARILS hot path + SLH-DSA session anchors."""
    sil = next(s for s in primary_comparison() if s.is_silmarils)
    metrics = evaluate_scheme(sil, config)
    block_ms = _block_time_ms(config.blocks_per_minute)
    effective = max(1, round(base_tps * (1.0 - HYBRID_SILMARILS_TPS_LOSS_PCT / 100.0)))

    return TpsResult(
        scheme="SILMARILS Hybrid (hot path + SLH-DSA anchors)",
        short_name="SILMARILS Hybrid",
        is_silmarils=True,
        is_hybrid=True,
        base_tps=base_tps,
        effective_tps=effective,
        tps_loss_pct=HYBRID_SILMARILS_TPS_LOSS_PCT,
        auth_cpu_ms_per_block=round(
            metrics.est_sign_cpu_ms_per_block + metrics.est_verify_cpu_ms_per_block,
            1,
        ),
        block_time_ms=round(block_ms, 1),
        bandwidth_mib_per_min=round(metrics.total_auth_mib_per_minute, 2),
        model="Unbundled stack (reference ~2% PQ overhead)",
    )


def calculate_full_pq_retrofit_tps(base_tps: int) -> TpsResult:
    """Full public PQ on every hot-path transaction (industry retrofit scenario)."""
    effective = max(1, round(base_tps * (1.0 - FULL_PQ_RETROFIT_TPS_LOSS_PCT / 100.0)))
    return TpsResult(
        scheme="Full PQ retrofit (ML-DSA on every tx)",
        short_name="Full PQ retrofit",
        is_silmarils=False,
        is_hybrid=False,
        base_tps=base_tps,
        effective_tps=effective,
        tps_loss_pct=FULL_PQ_RETROFIT_TPS_LOSS_PCT,
        auth_cpu_ms_per_block=0.0,
        block_time_ms=0.0,
        bandwidth_mib_per_min=0.0,
        model="Industry benchmark (84–90% TPS loss under PQ migration)",
    )


def build_tps_comparison(
    base_tps: int = 10000,
    validators: int = 7,
    tx_per_block: int = 500,
    blocks_per_minute: float = 2.0,
    consensus_rounds_per_block: int = 3,
) -> dict:
    config = LedgerConfig(
        validators=validators,
        tx_per_block=tx_per_block,
        blocks_per_minute=blocks_per_minute,
        consensus_rounds_per_block=consensus_rounds_per_block,
    )

    scheme_results = [
        calculate_scheme_tps(s, config, base_tps) for s in primary_comparison()
    ]
    hybrid = calculate_hybrid_stack_tps(config, base_tps)
    retrofit = calculate_full_pq_retrofit_tps(base_tps)

    dilithium = next(r for r in scheme_results if "Dilithium-2" in r.scheme)
    silmarils = next(r for r in scheme_results if r.is_silmarils)

    return {
        "base_tps": base_tps,
        "ledger_config": {
            "validators": validators,
            "tx_per_block": tx_per_block,
            "blocks_per_minute": blocks_per_minute,
            "block_time_ms": round(_block_time_ms(blocks_per_minute), 1),
        },
        "schemes": [r.__dict__ for r in scheme_results],
        "hybrid_stack": hybrid.__dict__,
        "full_pq_retrofit": retrofit.__dict__,
        "highlights": {
            "hybrid_effective_tps": hybrid.effective_tps,
            "retrofit_effective_tps": retrofit.effective_tps,
            "dilithium_effective_tps": dilithium.effective_tps,
            "silmarils_effective_tps": silmarils.effective_tps,
            "hybrid_vs_retrofit_tps_gain_pct": round(
                100
                * (hybrid.effective_tps - retrofit.effective_tps)
                / max(retrofit.effective_tps, 1),
                1,
            ),
        },
    }
