// Inputs for the model. Descriptions are Johannes Wolff's, from the spreadsheet;
// min / max follow the spreadsheet's data-validation rules where it has them.

export const PK_FIELDS = [
  { key: 'weight', label: 'Body weight', unit: 'kg', min: 3, max: 300, step: 1,
    help: 'Body weight in kg. The higher the body weight, the lower the drug concentration.' },
  { key: 'dose', label: 'Single dose', unit: 'mg', min: 0.5, max: 10000, step: 0.5,
    help: 'Single dose (not: total daily dose) in mg.' },
  { key: 'dosesPerDay', label: 'Dose frequency', unit: 'doses/day', min: 1, max: 6, step: 1, integer: true,
    help: 'Number of doses per day (BID = 2, TID = 3).' },
  { key: 'cmax', label: 'Cmax', unit: 'µg/L', min: 0.001, max: 1e9, step: 1,
    help: 'Highest drug concentration measured in blood.' },
  { key: 'tmax', label: 'tmax', unit: 'hours', min: 0.02, max: 10, step: 0.1,
    help: 'The time until the blood concentration after a single dose reaches the highest concentration.' },
  { key: 'halfLife', label: 'Half-life', unit: 'hours', min: 0.01, max: 1000, step: 0.5,
    help: 'Half-life after a single dose: the time after which the blood concentration has reduced from Cmax to half its value.' },
  { key: 'increment', label: 'Time increment', unit: 'hours', min: 0.05, max: 12, step: 0.05,
    help: 'Has to be a simple fraction of tmax. It is only relevant for the graphic.' },
];

export const PD_FIELDS = [
  { key: 'lowerLimit', label: 'Lower drug concentration limit', unit: 'µg/L', min: 0, max: 1e9, step: 1,
    help: 'Highest concentration that has no effect on the biomarker.' },
  { key: 'midpoint', label: 'Midpoint drug concentration', unit: 'µg/L', min: 0, max: 1e9, step: 1,
    help: 'Drug concentration reaching half of the maximal biomarker effect.' },
  { key: 'upperLimit', label: 'Upper drug concentration limit', unit: 'µg/L', min: 0, max: 1e9, step: 1,
    help: 'Lowest drug concentration that reaches the maximum biomarker effect.' },
  { key: 'baseline', label: 'Baseline biomarker in blood', unit: 'mg/L', min: 0.001, max: 1e9, step: 1,
    help: 'Biomarker concentration in patient blood without drug activity.' },
  { key: 'maxEffect', label: 'Biomarker at maximal drug effect', unit: 'mg/L', min: 0, max: 1e9, step: 1,
    help: 'Biomarker when the drug effect is at maximum all the time. Can be lower or higher than baseline, depending on the drug effect.' },
  { key: 'markerHalfLife', label: 'Biomarker elimination half-life', unit: 'hours', min: 0.01, max: 1000, step: 0.5,
    help: 'Elimination half-life of the biomarker in blood.' },
  { key: 'lagTime', label: 'Lag time', unit: 'hours', min: 0, max: 168, step: 0.5,
    help: 'Time between drug in blood and measurable biomarker effect.' },
];
