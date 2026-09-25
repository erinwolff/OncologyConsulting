// Inputs for the model. Descriptions are Johannes Wolff's, from the spreadsheet;
// min / max follow the spreadsheet's data-validation rules where it has them.
//
// `bounds` narrows the limits using the other inputs, so entries the model
// cannot use (for example a lower limit above the midpoint) are refused with an
// explanation rather than accepted and warned about afterwards.

export const PK_FIELDS = [
  { key: 'weight', label: 'Body weight', unit: 'kg', min: 3, max: 300, step: 1,
    help: 'Body weight in kg. Used for the calculated values below the charts; on its own it does not change the curves.' },
  { key: 'dose', label: 'Single dose', unit: 'mg', min: 0.5, max: 10000, step: 0.5,
    help: 'Single dose (not: total daily dose) in mg. Used for the calculated values below the charts; on its own it does not change the curves.' },
  { key: 'dosesPerDay', label: 'Dose frequency', unit: 'doses/day', min: 1, max: 6, step: 1, integer: true,
    help: 'Number of doses per day (BID = 2, TID = 3).' },
  { key: 'cmax', label: 'Cmax', unit: 'µg/L', min: 0.001, max: 1e9, step: 1,
    help: 'Highest drug concentration measured in blood.' },
  { key: 'tmax', label: 'tmax', unit: 'hours', min: 0.05, max: 10, step: 0.1,
    help: 'The time until the blood concentration after a single dose reaches the highest concentration.' },
  { key: 'halfLife', label: 'Half-life', unit: 'hours', min: 0.01, max: 1000, step: 0.5,
    help: 'Half-life after a single dose: the time after which the blood concentration has reduced from Cmax to half its value.' },
  { key: 'increment', label: 'Time increment', unit: 'hours', type: 'select',
    help: 'The step size the model calculates in. The choices are the fractions of tmax that the model can use.' },
];

export const PD_FIELDS = [
  { key: 'lowerLimit', label: 'Lower drug concentration limit', unit: 'µg/L', min: 0, max: 1e9, step: 1,
    bounds: (p) => ({ max: p.midpoint, exclusiveMax: true, note: `below the midpoint (${p.midpoint})` }),
    help: 'Highest concentration that has no effect on the biomarker. Must be below the midpoint.' },
  { key: 'midpoint', label: 'Midpoint drug concentration', unit: 'µg/L', min: 0, max: 1e9, step: 1,
    bounds: (p) => ({ min: p.lowerLimit, max: p.upperLimit, exclusiveMin: true, exclusiveMax: true,
      note: `between the lower limit (${p.lowerLimit}) and the upper limit (${p.upperLimit})` }),
    help: 'Drug concentration reaching half of the maximal biomarker effect. Must sit between the lower and upper limits.' },
  { key: 'upperLimit', label: 'Upper drug concentration limit', unit: 'µg/L', min: 0, max: 1e9, step: 1,
    bounds: (p) => ({ min: p.midpoint, exclusiveMin: true, note: `above the midpoint (${p.midpoint})` }),
    help: 'Lowest drug concentration that reaches the maximum biomarker effect. Must be above the midpoint.' },
  { key: 'baseline', label: 'Baseline biomarker in blood', unit: 'mg/L', min: 0.001, max: 1e9, step: 1,
    help: 'Biomarker concentration in patient blood without drug activity.' },
  { key: 'maxEffect', label: 'Biomarker at maximal drug effect', unit: 'mg/L', min: 0, max: 1e9, step: 1,
    help: 'Biomarker when the drug effect is at maximum all the time. Can be lower or higher than baseline, depending on the drug effect.' },
  { key: 'markerHalfLife', label: 'Biomarker elimination half-life', unit: 'hours', min: 0.01, max: 1000, step: 0.5,
    help: 'Elimination half-life of the biomarker in blood.' },
  { key: 'lagTime', label: 'Lag time', unit: 'hours', min: 0, max: 168, step: 0.5,
    help: 'Time between drug in blood and measurable biomarker effect.' },
];

// The model steps through time in whole fractions of tmax, so offer exactly
// those. The stored value stays exact (0.5 / 3, not 0.167) so that the model's
// own "tmax must be a multiple of the increment" check can never fail.
export function incrementOptions(tmax) {
  const out = [];
  for (let n = 1; n <= 40; n++) {
    const v = tmax / n;
    if (v < 0.005 || v > 12) continue;
    out.push(v);
  }
  return out;
}

// Label a value without the long decimal tail of, say, 0.5 / 3.
export function incrementLabel(v) {
  return `${+v.toPrecision(4)} h`;
}

// The stored increment may no longer divide a newly entered tmax.
export function snapIncrement(tmax, current) {
  const options = incrementOptions(tmax);
  const exact = options.find((v) => Math.abs(v - current) < 1e-9);
  if (exact !== undefined) return exact;
  return options.reduce((best, v) => (Math.abs(v - current) < Math.abs(best - current) ? v : best), options[0]);
}
