// Round axis ticks to clean numbers.
export function niceTicks(min, max, count = 5) {
  if (!(max > min)) return [min];
  const raw = (max - min) / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw);
  const ticks = [];
  for (let v = Math.ceil(min / step) * step; v <= max + step * 1e-6; v += step) ticks.push(+v.toFixed(10));
  // Always end on a tick at or above the maximum so the data never touches the top.
  if (ticks[ticks.length - 1] < max - step * 1e-6) ticks.push(+(ticks[ticks.length - 1] + step).toFixed(10));
  return ticks;
}

export function formatNumber(v) {
  if (!Number.isFinite(v)) return '–';
  const a = Math.abs(v);
  const digits = a >= 100 ? 0 : a >= 10 ? 1 : a >= 1 ? 2 : 3;
  return v.toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}
