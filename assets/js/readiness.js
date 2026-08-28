(function () {
  var wizard = document.getElementById('readiness-wizard');
  if (!wizard) return;

  var form = document.getElementById('readiness-form');
  var steps = Array.prototype.slice.call(form.querySelectorAll('.readiness-step'));
  var progressBar = document.getElementById('readiness-progress-bar');
  var progressLabel = document.getElementById('readiness-progress-label');
  var prevBtn = document.getElementById('readiness-prev');
  var nextBtn = document.getElementById('readiness-next');
  var resultPanel = document.getElementById('readiness-result');
  var restartBtn = document.getElementById('readiness-restart');
  var contactLink = document.getElementById('result-contact-link');

  var currentStep = 0;
  var totalSteps = steps.length;
  var maxScore = (totalSteps - 1) * 3;

  var tiers = [
    {
      min: 0,
      label: 'Foundation needed',
      summary:
        'Your organization is at the start of the quantum transition. Long‑lived data and unmapped cryptography create exposure—especially under harvest‑now‑decrypt‑later scenarios.',
      actions: [
        'Establish executive awareness and a single accountable owner.',
        'Begin a cryptographic inventory (CBOM) across critical systems.',
        'Identify data with 10+ year confidentiality requirements.',
        'Review NIST PQC standards and sector‑specific guidance.',
      ],
      service: 'PQC Readiness Assessment',
    },
    {
      min: 26,
      label: 'Planning phase',
      summary:
        'You have early signals of readiness but gaps remain in inventory, sponsorship, or formal risk assessment. This is the right window to build a structured roadmap before mandates compress timelines.',
      actions: [
        'Formalize HNDL risk review for high‑value data stores.',
        'Map RSA/ECC dependencies across production workloads.',
        'Align security, infrastructure, and compliance stakeholders.',
        'Draft a phased migration roadmap with pilot candidates.',
      ],
      service: 'Migration roadmap & architecture planning',
    },
    {
      min: 51,
      label: 'Execution ready',
      summary:
        'Strong foundations are in place. Priority shifts to pilots, crypto‑agility in architecture, and operational rollout across vendors, certificates, and protocols.',
      actions: [
        'Select hybrid or PQC algorithms per protocol constraints.',
        'Run controlled pilots on non‑critical paths first.',
        'Define success metrics and rollback procedures.',
        'Plan vendor and HSM/PKI upgrades in parallel.',
      ],
      service: 'Quantum‑safe architecture & pilot support',
    },
    {
      min: 76,
      label: 'Advanced program',
      summary:
        'Your program shows mature readiness signals. Focus on scaling production migration, continuous CBOM refresh, and staying aligned as standards and ecosystems evolve.',
      actions: [
        'Expand production PQC deployment with clear wave planning.',
        'Automate cryptographic discovery in CI/CD and asset management.',
        'Brief leadership and auditors on measurable progress.',
        'Stress‑test crypto‑agility for future algorithm updates.',
      ],
      service: 'Executive advisory & program optimization',
    },
  ];

  function updateProgress() {
    var pct = ((currentStep + 1) / totalSteps) * 100;
    progressBar.style.width = pct + '%';
    progressLabel.textContent = 'Question ' + (currentStep + 1) + ' of ' + totalSteps;
  }

  function getStepInputs(step) {
    return step.querySelectorAll('input[type="radio"]');
  }

  function stepAnswered(step) {
    var inputs = getStepInputs(step);
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) return true;
    }
    return false;
  }

  function showStep(index) {
    steps.forEach(function (step, i) {
      step.classList.toggle('is-active', i === index);
    });
    currentStep = index;
    prevBtn.disabled = index === 0;
    nextBtn.textContent = index === totalSteps - 1 ? 'See results' : 'Next';
    updateProgress();
  }

  function getTier(percent) {
    var tier = tiers[0];
    for (var i = tiers.length - 1; i >= 0; i--) {
      if (percent >= tiers[i].min) {
        tier = tiers[i];
        break;
      }
    }
    return tier;
  }

  function computeScore() {
    var score = 0;
    steps.forEach(function (step) {
      if (step.getAttribute('data-score') !== 'true') return;
      var checked = step.querySelector('input[type="radio"]:checked');
      if (checked) score += parseInt(checked.value, 10) || 0;
    });
    return score;
  }

  function getSector() {
    var checked = form.querySelector('input[name="q-sector"]:checked');
    return checked ? checked.value : '';
  }

  function showResults() {
    var score = computeScore();
    var percent = Math.round((score / maxScore) * 100);
    var tier = getTier(percent);
    var sector = getSector();

    document.getElementById('result-percent').textContent = percent + '%';
    document.getElementById('result-tier').textContent = tier.label;
    document.getElementById('result-summary').textContent = tier.summary;

    var actionsList = document.getElementById('result-actions');
    actionsList.innerHTML = '';
    tier.actions.forEach(function (text) {
      var li = document.createElement('li');
      li.textContent = text;
      actionsList.appendChild(li);
    });

    var topic =
      'PQC readiness follow‑up — ' +
      tier.label +
      ' (' +
      percent +
      '%)' +
      (sector ? ', sector: ' + sector : '');
    contactLink.href =
      '/contact/?topic=' + encodeURIComponent(topic);

    form.hidden = true;
    document.querySelector('.readiness-progress').hidden = true;
    progressLabel.hidden = true;
    resultPanel.hidden = false;
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function resetWizard() {
    form.reset();
    form.hidden = false;
    document.querySelector('.readiness-progress').hidden = false;
    progressLabel.hidden = false;
    resultPanel.hidden = true;
    showStep(0);
  }

  nextBtn.addEventListener('click', function () {
    if (!stepAnswered(steps[currentStep])) return;

    if (currentStep === totalSteps - 1) {
      showResults();
      return;
    }
    showStep(currentStep + 1);
  });

  prevBtn.addEventListener('click', function () {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  restartBtn.addEventListener('click', resetWizard);

  steps.forEach(function (step) {
    getStepInputs(step).forEach(function (input) {
      input.addEventListener('change', function () {
        nextBtn.disabled = false;
      });
    });
  });

  showStep(0);
})();
