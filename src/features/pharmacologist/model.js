// The Little Pharmacologist: a port of Johannes Wolff's spreadsheet model
// ("KeepItSimple020", version 2026-04-04). Each step below names the
// spreadsheet column it reproduces so the two can be checked side by side.
//
// Excel compares numbers with ~15 significant digits, so 3 × 0.1 counts as
// equal to 0.3. JavaScript does not, so comparisons use a small tolerance.

const EPS = 1e-9;

export const DEFAULTS = {
  // PK inputs (spreadsheet D4–D11)
  weight: 70,
  dose: 10,
  dosesPerDay: 3,
  cmax: 100,
  tmax: 0.3,
  halfLife: 2,
  increment: 0.1,
  // PD inputs (spreadsheet D34–D40)
  lowerLimit: 10,
  midpoint: 50,
  upperLimit: 100,
  baseline: 10,
  maxEffect: 1,
  markerHalfLife: 0.5,
  lagTime: 0.5,
};

// Excel's ROUND rounds halves away from zero.
function excelRound(x, digits = 0) {
  const f = 10 ** digits;
  return (Math.sign(x) * Math.round(Math.abs(x) * f)) / f;
}

// Columns AB + AC: map a concentration onto 0–1 (linear on each side of the
// midpoint), then smooth it with the sine "S" curve.
export function effectFraction(conc, p) {
  let linear;
  if (conc < p.lowerLimit) linear = 0;
  else if (conc > p.upperLimit) linear = 1;
  else if (conc <= p.midpoint) linear = ((conc - p.lowerLimit) / (p.midpoint - p.lowerLimit)) * 0.5;
  else linear = 0.5 + ((conc - p.midpoint) / (p.upperLimit - p.midpoint)) * 0.5;
  return (Math.sin((linear + 1.5) * Math.PI) + 1) * 0.5;
}

// Column AD (and AT): the biomarker level the drug is pushing toward.
export function targetMarker(conc, p) {
  return p.baseline + (p.maxEffect - p.baseline) * effectFraction(conc, p);
}

/**
 * Simulate drug concentration and biomarker over time.
 * The spreadsheet has a fixed 1,992 rows; here the run length is `hours`.
 */
export function simulate(p, hours) {
  const dt = p.increment;
  const steps = Math.floor(hours / dt + EPS) + 1;
  const dosingInterval = 24 / p.dosesPerDay;
  const riseSteps = p.tmax / dt;
  const risePerStep = (p.dose * (p.cmax / p.dose / p.weight) * p.weight) / riseSteps; // W
  const drugDecay = 0.5 ** (dt / p.halfLife);
  const markerDecay = 0.5 ** (dt / p.markerHalfLife);
  const lagRows = p.lagTime / dt;

  const t = new Float64Array(steps);
  const conc = new Float64Array(steps);
  const marker = new Float64Array(steps);
  const doses = [];

  let sinceDose = 0;
  for (let i = 0; i < steps; i++) {
    const time = i * dt; // T
    t[i] = time;

    // U: a dose is due when the time is a whole number of dosing intervals.
    const r = excelRound(time / dosingInterval, 3);
    const isDose = r === Math.floor(r);
    if (isDose) doses.push(time);

    // V: time since last dose.
    sinceDose = isDose ? 0 : sinceDose + dt;

    // W + X: linear rise to Cmax over tmax, otherwise halve every half-life.
    if (i === 0) conc[i] = 0;
    else if (sinceDose > EPS && sinceDose <= p.tmax + EPS) conc[i] = conc[i - 1] + risePerStep;
    else conc[i] = conc[i - 1] * drugDecay;

    // AA: the concentration the biomarker "sees", delayed by the lag time.
    let lagged = 0;
    if (!(time < p.lagTime - EPS)) {
      const j = excelRound(i + 2 - lagRows) - 2;
      lagged = j >= 0 ? conc[j] : 0;
    }

    // AD–AF: the biomarker moves toward its target at the biomarker half-life.
    const target = targetMarker(lagged, p);
    marker[i] = i === 0 ? p.baseline : target - target * markerDecay + marker[i - 1] * markerDecay;
  }

  return { t, conc, marker, doses };
}

// Chart 3 (columns AK + AT): the concentration–response curve.
export function doseResponse(p) {
  const pts = [{ conc: 0, marker: targetMarker(0, p) }];
  for (let k = 0; k <= 20; k++) {
    const conc = p.lowerLimit + (p.upperLimit - p.lowerLimit) * (k * 0.05);
    pts.push({ conc, marker: targetMarker(conc, p) });
  }
  return pts;
}

// Values the spreadsheet calculates for the user (D9, D13, G13, D41).
export function derived(p) {
  const volume = (p.dose / p.cmax) * 1000;
  return {
    normalizedCmax: p.cmax / p.dose / p.weight,
    volume,
    volumePerKg: volume / p.weight,
    markerProduction: (p.baseline * volume * 0.693) / p.markerHalfLife,
  };
}

// Input checks: the spreadsheet's own rules, plus a few it can't express.
export function validate(p) {
  const problems = [];
  const ratio = p.tmax / p.increment;
  if (Math.abs(ratio - Math.round(ratio)) > 1e-6) {
    problems.push('tmax must be a multiple of the time increment.');
  }
  const interval = 24 / p.dosesPerDay / p.increment;
  if (Math.abs(interval - Math.round(interval)) > 1e-6) {
    problems.push('The dosing interval (24 h ÷ doses per day) should be a multiple of the time increment, or some doses are skipped.');
  }
  if (!(p.lowerLimit < p.midpoint && p.midpoint < p.upperLimit)) {
    problems.push('Drug concentrations must be in order: lower limit < midpoint < upper limit.');
  }
  return problems;
}
