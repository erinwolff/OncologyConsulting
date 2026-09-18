import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { formatNumber, niceTicks } from './format';

const HEIGHT = 230;
const M = { top: 14, right: 14, bottom: 34, left: 52 };

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(640);
  // Measure before the first paint so the chart never renders at the wrong size.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(Math.max(260, el.clientWidth));
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(260, entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

// Index of the x value closest to `x` (xs is sorted ascending).
function nearestIndex(xs, x) {
  let lo = 0;
  let hi = xs.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (xs[mid] < x) lo = mid;
    else hi = mid;
  }
  return Math.abs(xs[lo] - x) <= Math.abs(xs[hi] - x) ? lo : hi;
}

/**
 * A single-series line chart. `hover` / `onHover` hold the highlighted index,
 * so two charts that share x values can share one crosshair.
 */
export default function LineChart({
  label,
  xs,
  ys,
  tone,
  xDomain,
  xTicks,
  xFormat = formatNumber,
  xName,
  yName,
  yUnit,
  band,
  refLines = [],
  markers = [],
  points = [],
  hover,
  onHover,
  keyStep = 1,
}) {
  const [wrapRef, width] = useWidth();
  const innerW = width - M.left - M.right;
  const innerH = HEIGHT - M.top - M.bottom;

  const [x0, x1] = xDomain;
  const yMax = useMemo(() => {
    let max = 0;
    for (let i = 0; i < xs.length; i++) if (xs[i] <= x1 && Number.isFinite(ys[i])) max = Math.max(max, ys[i]);
    for (const r of refLines) if (Number.isFinite(r.y)) max = Math.max(max, r.y);
    return max || 1;
  }, [xs, ys, x1, refLines]);
  const yTicks = niceTicks(0, yMax * 1.05, 5);
  const yTop = yTicks[yTicks.length - 1];

  const sx = (x) => M.left + ((x - x0) / (x1 - x0)) * innerW;
  const sy = (y) => M.top + innerH - (y / yTop) * innerH;

  const path = useMemo(() => {
    let d = '';
    let pen = false;
    for (let i = 0; i < xs.length; i++) {
      if (xs[i] > x1 + 1e-9) break;
      const y = ys[i];
      if (!Number.isFinite(y)) { pen = false; continue; }
      const px = (M.left + ((xs[i] - x0) / (x1 - x0)) * innerW).toFixed(1);
      const py = (M.top + innerH - (y / yTop) * innerH).toFixed(1);
      d += `${pen ? 'L' : 'M'}${px},${py}`;
      pen = true;
    }
    return d;
  }, [xs, ys, x0, x1, innerW, innerH, yTop]);

  const lastIndex = useMemo(() => {
    let i = xs.length - 1;
    while (i > 0 && xs[i] > x1 + 1e-9) i--;
    return i;
  }, [xs, x1]);

  const active = hover != null && hover <= lastIndex ? hover : null;

  function handlePointer(e) {
    // Measure against the whole SVG: the hit area itself starts at the left margin.
    const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    const x = x0 + ((px - M.left) / innerW) * (x1 - x0);
    onHover(Math.min(lastIndex, nearestIndex(xs, Math.max(x0, Math.min(x1, x)))));
  }

  function handleKey(e) {
    const start = active ?? 0;
    const step = e.shiftKey ? keyStep * 10 : keyStep;
    const moves = { ArrowRight: start + step, ArrowLeft: start - step, Home: 0, End: lastIndex };
    if (!(e.key in moves)) return;
    e.preventDefault();
    onHover(Math.max(0, Math.min(lastIndex, moves[e.key])));
  }

  const ax = active != null ? sx(xs[active]) : 0;
  const tipOnLeft = active != null && ax > width * 0.62;

  return (
    <div
      ref={wrapRef}
      className="chart"
      tabIndex={0}
      aria-label={`${label}. Use the left and right arrow keys to read values.`}
      onKeyDown={handleKey}
      onBlur={() => onHover(null)}
    >
      <svg width={width} height={HEIGHT} viewBox={`0 0 ${width} ${HEIGHT}`} role="img" aria-label={label}>
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line className="chart__grid" x1={M.left} x2={width - M.right} y1={sy(t)} y2={sy(t)} />
            <text className="chart__tick" x={M.left - 8} y={sy(t)} dy="0.32em" textAnchor="end">{formatNumber(t)}</text>
          </g>
        ))}

        {band && Number.isFinite(band.y0) && Number.isFinite(band.y1) && band.y0 < yTop && (
          <g>
            <rect
              className="chart__band"
              x={M.left}
              width={innerW}
              y={sy(Math.min(band.y1, yTop))}
              height={Math.max(0, sy(Math.max(0, band.y0)) - sy(Math.min(band.y1, yTop)))}
            />
            <text className="chart__note" x={width - M.right - 6} y={sy(Math.min(band.y1, yTop)) + 14} textAnchor="end">{band.label}</text>
          </g>
        )}

        {refLines.filter((r) => Number.isFinite(r.y)).map((r) => (
          <g key={r.label}>
            <line className="chart__ref" x1={M.left} x2={width - M.right} y1={sy(r.y)} y2={sy(r.y)} />
            {/* Label sits above its line, unless the line is at the top of the plot. */}
            <text className="chart__note" x={width - M.right - 6} y={sy(r.y) + (sy(r.y) - M.top < 16 ? 14 : -6)} textAnchor="end">{r.label}</text>
          </g>
        ))}

        <line className="chart__axis" x1={M.left} x2={width - M.right} y1={M.top + innerH} y2={M.top + innerH} />
        {xTicks.map((t) => (
          <text key={`x${t}`} className="chart__tick" x={sx(t)} y={M.top + innerH + 18} textAnchor="middle">{xFormat(t)}</text>
        ))}

        {markers.map((m) => (
          <path
            key={`m${m}`}
            className="chart__dose"
            d={`M${sx(m)},${M.top + innerH - 7}l4,7h-8z`}
          />
        ))}

        <path className={`chart__line chart__line--${tone}`} d={path} />

        {points.map((pt) => (
          <g key={pt.label}>
            <circle className={`chart__point chart__point--${tone}`} cx={sx(pt.x)} cy={sy(pt.y)} r="4.5" />
            <text
              className="chart__note"
              x={sx(pt.x) + (pt.anchor === 'end' ? -8 : 8)}
              y={sy(pt.y) - 8}
              textAnchor={pt.anchor === 'end' ? 'end' : 'start'}
            >
              {pt.label}
            </text>
          </g>
        ))}

        {active != null && Number.isFinite(ys[active]) && (
          <g className="chart__cursor">
            <line x1={ax} x2={ax} y1={M.top} y2={M.top + innerH} />
            <circle className={`chart__point chart__point--${tone}`} cx={ax} cy={sy(ys[active])} r="4.5" />
          </g>
        )}

        <rect
          className="chart__hit"
          x={M.left}
          y={M.top}
          width={innerW}
          height={innerH}
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={() => onHover(null)}
        />
      </svg>

      {active != null && (
        <div
          className="chart__tooltip"
          role="status"
          style={{
            left: tipOnLeft ? undefined : ax + 12,
            right: tipOnLeft ? width - ax + 12 : undefined,
            top: M.top,
          }}
        >
          <span className="chart__tooltip-value">
            <span className={`chart__key chart__key--${tone}`} aria-hidden="true" />
            {formatNumber(ys[active])} <span className="chart__tooltip-unit">{yUnit}</span>
          </span>
          <span className="chart__tooltip-meta">{yName} at {xName} {xFormat(xs[active])}</span>
        </div>
      )}
    </div>
  );
}
