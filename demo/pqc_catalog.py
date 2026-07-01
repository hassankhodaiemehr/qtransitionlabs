"""Published PQC scheme metadata from the SILMARILS paper comparison table."""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class VerifierModel(str, Enum):
    TDV = "Designated verifier (TDV)"
    PUBLIC = "Public verifier"


@dataclass(frozen=True)
class SignatureScheme:
    name: str
    security_type: str
    pk_bytes: int
    sk_bytes: int
    sig_bytes: int
    verifier: VerifierModel
    assumptions: str
    sign_us: float | None = None
    verify_us: float | None = None

    @property
    def auth_bytes_per_tx(self) -> int:
        return self.sig_bytes

    @property
    def is_silmarils(self) -> bool:
        return self.name == "SILMARILS"


# Sizes from Table 1 (IACR CIC / arXiv). Timing values are indicative
# microsecond estimates from NIST PQ reference implementations on a modern CPU.
SCHEMES: list[SignatureScheme] = [
    SignatureScheme(
        name="SILMARILS",
        security_type="Information-theoretic (TDV)",
        pk_bytes=64,
        sk_bytes=32,
        sig_bytes=160,
        verifier=VerifierModel.TDV,
        assumptions="TRNG + Shamir SSS",
        sign_us=18.0,
        verify_us=9.0,
    ),
    SignatureScheme(
        name="sr25519",
        security_type="Classical (ECDSA-like)",
        pk_bytes=32,
        sk_bytes=64,
        sig_bytes=64,
        verifier=VerifierModel.PUBLIC,
        assumptions="ECDLP / Curve25519",
        sign_us=45.0,
        verify_us=95.0,
    ),
    SignatureScheme(
        name="Dilithium-2 (ML-DSA-44)",
        security_type="Computational PQ",
        pk_bytes=1312,
        sk_bytes=2528,
        sig_bytes=2420,
        verifier=VerifierModel.PUBLIC,
        assumptions="Module-LWE",
        sign_us=210.0,
        verify_us=145.0,
    ),
    SignatureScheme(
        name="Dilithium-3 (ML-DSA-65)",
        security_type="Computational PQ",
        pk_bytes=1952,
        sk_bytes=4000,
        sig_bytes=3293,
        verifier=VerifierModel.PUBLIC,
        assumptions="Module-LWE",
        sign_us=320.0,
        verify_us=210.0,
    ),
    SignatureScheme(
        name="Falcon-512",
        security_type="Computational PQ",
        pk_bytes=897,
        sk_bytes=1281,
        sig_bytes=690,
        verifier=VerifierModel.PUBLIC,
        assumptions="SIS over NTRU lattices",
        sign_us=380.0,
        verify_us=55.0,
    ),
    SignatureScheme(
        name="SPHINCS+-128f",
        security_type="Computational PQ",
        pk_bytes=32,
        sk_bytes=64,
        sig_bytes=17088,
        verifier=VerifierModel.PUBLIC,
        assumptions="Hash-based (QROM)",
        sign_us=5200.0,
        verify_us=180.0,
    ),
    SignatureScheme(
        name="SPHINCS+-128s",
        security_type="Computational PQ",
        pk_bytes=32,
        sk_bytes=64,
        sig_bytes=7856,
        verifier=VerifierModel.PUBLIC,
        assumptions="Hash-based (QROM)",
        sign_us=180000.0,
        verify_us=420.0,
    ),
    SignatureScheme(
        name="SLH-DSA-128-24",
        security_type="Computational PQ",
        pk_bytes=32,
        sk_bytes=48,
        sig_bytes=3856,
        verifier=VerifierModel.PUBLIC,
        assumptions="Hash-based (limited sigs)",
        sign_us=4100.0,
        verify_us=160.0,
    ),
]


def primary_comparison() -> list[SignatureScheme]:
    names = {
        "SILMARILS",
        "Dilithium-2 (ML-DSA-44)",
        "Falcon-512",
        "SPHINCS+-128f",
        "SPHINCS+-128s",
    }
    return [s for s in SCHEMES if s.name in names]
