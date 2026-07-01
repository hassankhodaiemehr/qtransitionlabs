/* PQC catalog + ledger/TPS models (static, no backend) */
(function (global) {
  const PRIMARY = [
    {
      name: "SILMARILS",
      shortName: "SILMARILS",
      pkBytes: 64,
      sigBytes: 160,
      isSilmarils: true,
      isPublic: false,
      signUs: 18,
      verifyUs: 9,
    },
    {
      name: "Dilithium-2 (ML-DSA-44)",
      shortName: "Dilithium-2",
      pkBytes: 1312,
      sigBytes: 2420,
      isSilmarils: false,
      isPublic: true,
      signUs: 210,
      verifyUs: 145,
    },
    {
      name: "Falcon-512",
      shortName: "Falcon-512",
      pkBytes: 897,
      sigBytes: 690,
      isSilmarils: false,
      isPublic: true,
      signUs: 380,
      verifyUs: 55,
    },
    {
      name: "SPHINCS+-128f",
      shortName: "SPHINCS+-128f",
      pkBytes: 32,
      sigBytes: 17088,
      isSilmarils: false,
      isPublic: true,
      signUs: 5200,
      verifyUs: 180,
    },
    {
      name: "SPHINCS+-128s",
      shortName: "SPHINCS+-128s",
      pkBytes: 32,
      sigBytes: 7856,
      isSilmarils: false,
      isPublic: true,
      signUs: 180000,
      verifyUs: 420,
    },
  ];

  const HYBRID_LOSS = 2.0;
  const RETROFIT_LOSS = 87.0;

  function consensusMessages(validators, rounds) {
    return validators * (validators - 1) * rounds;
  }

  function evaluateScheme(scheme, cfg) {
    const userTxs = Math.floor(cfg.txPerBlock * cfg.userTxRatio);
    const consensus = consensusMessages(cfg.validators, cfg.consensusRounds);
    const txAuth = userTxs * scheme.sigBytes;
    const consensusAuth = consensus * scheme.sigBytes;
    const totalAuth = txAuth + consensusAuth;
    const signOps = userTxs + consensus;
    const verifyOps = userTxs + consensus * (cfg.validators - 1);
    const signMs = (signOps * scheme.signUs) / 1000;
    const verifyMs = (verifyOps * scheme.verifyUs) / 1000;
    const authMibPerMin = (totalAuth * cfg.blocksPerMinute) / (1024 * 1024);

    return {
      txAuthBytes: txAuth,
      consensusAuthBytes: consensusAuth,
      totalAuthBytesPerBlock: totalAuth,
      totalAuthMibPerMinute: authMibPerMin,
      estSignCpuMsPerBlock: signMs,
      estVerifyCpuMsPerBlock: verifyMs,
    };
  }

  function buildComparison(cfg) {
    const dilithium2 = PRIMARY.find((s) => s.name.includes("Dilithium-2"));
    const schemes = PRIMARY.map((s) => {
      const workload = evaluateScheme(s, cfg);
      return {
        ...s,
        isPublicVerifier: s.isPublic,
        sigRatioVsDilithium2Pct: Math.round((100 * s.sigBytes) / dilithium2.sigBytes * 10) / 10,
        workload: {
          total_auth_bytes_per_block: workload.totalAuthBytesPerBlock,
          total_auth_mib_per_minute: workload.totalAuthMibPerMinute,
          est_verify_cpu_ms_per_block: workload.estVerifyCpuMsPerBlock,
        },
      };
    });

    const sil = schemes.find((s) => s.isSilmarils);
    const dil = schemes.find((s) => s.name.includes("Dilithium-2"));
    const savings = Math.round(
      100 * (1 - sil.workload.total_auth_bytes_per_block / dil.workload.total_auth_bytes_per_block)
    );

    return {
      schemes,
      highlights: {
        sizeReductionFactor: Math.round((dilithium2.sigBytes / sil.sigBytes) * 10) / 10,
        authSavingsPctVsDilithium2: savings,
      },
    };
  }

  function blockTimeMs(blocksPerMinute) {
    return (60 / blocksPerMinute) * 1000;
  }

  function buildTps(baseTps, cfg) {
    const blockMs = blockTimeMs(cfg.blocksPerMinute);
    const schemes = PRIMARY.map((s) => {
      const w = evaluateScheme(s, cfg);
      const authCpu = w.estSignCpuMsPerBlock + w.estVerifyCpuMsPerBlock;
      const loss = Math.min(95, Math.round((100 * authCpu) / blockMs * 10) / 10);
      return {
        short_name: s.shortName,
        is_silmarils: s.isSilmarils,
        is_hybrid: false,
        effective_tps: Math.max(1, Math.round(baseTps * (1 - loss / 100))),
        tps_loss_pct: loss,
      };
    });

    const hybridEffective = Math.max(1, Math.round(baseTps * (1 - HYBRID_LOSS / 100)));
    const retrofitEffective = Math.max(1, Math.round(baseTps * (1 - RETROFIT_LOSS / 100)));

    return {
      schemes,
      hybrid_stack: {
        short_name: "SILMARILS Hybrid",
        is_hybrid: true,
        effective_tps: hybridEffective,
        tps_loss_pct: HYBRID_LOSS,
      },
      full_pq_retrofit: {
        short_name: "Full PQ retrofit",
        effective_tps: retrofitEffective,
        tps_loss_pct: RETROFIT_LOSS,
      },
      highlights: {
        hybrid_vs_retrofit_tps_gain_pct: Math.round(
          (100 * (hybridEffective - retrofitEffective)) / Math.max(retrofitEffective, 1) * 10
        ) / 10,
      },
    };
  }

  global.DemoModels = {
    PRIMARY,
    buildComparison,
    buildTps,
    defaultConfig: () => ({
      validators: 7,
      txPerBlock: 500,
      blocksPerMinute: 2,
      consensusRounds: 3,
      userTxRatio: 0.85,
    }),
  };
})(window);
