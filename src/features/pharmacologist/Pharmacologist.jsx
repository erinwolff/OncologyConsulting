import { useMemo, useState } from 'react';
import { COMPANY, SITE_URL, SPREADSHEET } from '../../site';
import { DownloadIcon } from '../../components/Icons';
import { DEFAULTS, derived, simulate, targetMarker, validate } from './model';
import { incrementLabel, incrementOptions, snapIncrement, PD_FIELDS, PK_FIELDS } from './fields';
import LineChart from './LineChart';
import { formatNumber, niceTicks } from './format';
import ModelNotes from './ModelNotes';

// Hours the time axis can be set to, from half a day to four weeks.
const RANGE_STOPS = [12, 24, 36, 48, 72, 96, 120, 168, 240, 336, 504, 672];
const DEFAULT_RANGE = RANGE_STOPS.indexOf(24);
const ALL_FIELDS = [...PK_FIELDS, ...PD_FIELDS];

const toText = (p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)]));

function describeHours(h) {
  if (h < 48) return `${h} hours`;
  const days = h / 24;
  return `${h} hours (${days % 1 ? days.toFixed(1) : days} days)`;
}

// A field's limits can depend on the other inputs (see `bounds` in fields.js).
function limitsFor(field, params) {
  const extra = field.bounds ? field.bounds(params) : {};
  return { min: field.min, max: field.max, ...extra };
}

function parseField(field, textValue, params) {
  const n = Number(textValue);
  if (textValue.trim() === '' || !Number.isFinite(n)) return null;
  if (field.integer && !Number.isInteger(n)) return null;
  const l = limitsFor(field, params);
  if (l.exclusiveMin ? n <= l.min : n < l.min) return null;
  if (l.exclusiveMax ? n >= l.max : n > l.max) return null;
  return n;
}

function fieldMessage(field, params) {
  const l = limitsFor(field, params);
  if (l.note) return `Enter a number ${l.note}.`;
  return `Enter ${field.integer ? 'a whole number' : 'a number'} from ${formatNumber(l.min)} to ${formatNumber(l.max)}.`;
}

function Field({ field, text, invalid, params, onChange }) {
  const id = `f-${field.key}`;
  return (
    <div className={`pk-field${invalid ? ' is-invalid' : ''}`}>
      <label htmlFor={id}>{field.label}</label>
      <div className="pk-field__control">
        {field.type === 'select' ? (
          <select id={id} value={text} aria-describedby={`${id}-help`} onChange={(e) => onChange(field, e.target.value)}>
            {incrementOptions(params.tmax).map((v) => (
              <option key={v} value={String(v)}>{incrementLabel(v)}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={field.min}
            max={field.max}
            step={field.step}
            value={text}
            aria-invalid={invalid || undefined}
            aria-describedby={`${id}-help`}
            onChange={(e) => onChange(field, e.target.value)}
          />
        )}
        <span className="pk-field__unit">{field.unit}</span>
      </div>
      <p id={`${id}-help`} className="pk-field__help">
        {invalid ? fieldMessage(field, params) : field.help}
      </p>
    </div>
  );
}

export default function Pharmacologist() {
  const [params, setParams] = useState(DEFAULTS);
  const [text, setText] = useState(() => toText(DEFAULTS));
  const [rangeIndex, setRangeIndex] = useState(DEFAULT_RANGE);
  const [overlay, setOverlay] = useState(false);
  const [hover, setHover] = useState(null);
  const [drHover, setDrHover] = useState(null);

  function onChange(field, value) {
    setText((t) => ({ ...t, [field.key]: value }));
    const n = parseField(field, value, params);
    if (n === null) return;
    if (field.key === 'tmax') {
      // The time increment must stay a whole fraction of tmax.
      const increment = snapIncrement(n, params.increment);
      setParams((p) => ({ ...p, tmax: n, increment }));
      setText((t) => ({ ...t, increment: String(increment) }));
      return;
    }
    setParams((p) => ({ ...p, [field.key]: n }));
  }

  function reset() {
    setParams(DEFAULTS);
    setText(toText(DEFAULTS));
  }

  const invalid = Object.fromEntries(ALL_FIELDS.map((f) => [f.key, parseField(f, text[f.key], params) === null]));
  const problems = validate(params);
  const stats = derived(params);

  const hours = RANGE_STOPS[rangeIndex];
  const sim = useMemo(() => simulate(params, hours), [params, hours]);
  const xTicks = niceTicks(0, hours, 6).filter((t) => t <= hours);
  // Over long ranges the dose triangles crowd into a solid row, so drop them.
  const dosesInView = sim.doses.filter((d) => d <= hours + 1e-9);
  const doses = dosesInView.length <= 30 ? dosesInView : [];
  const keyStep = Math.max(1, Math.round(hours / 96 / params.increment));
  const hourLabel = (v) => `${formatNumber(v)} h`;

  // Explain the settings that make the biomarker curve look flat on purpose.
  const peak = useMemo(() => sim.conc.reduce((a, b) => Math.max(a, b), 0), [sim]);
  let noEffect = null;
  if (params.baseline === params.maxEffect) {
    noEffect = 'The baseline biomarker and the biomarker at maximal drug effect are the same number, so the drug has no effect on the biomarker and the curve stays flat.';
  } else if (peak < params.lowerLimit) {
    noEffect = `The drug concentration never reaches the lower limit (${formatNumber(params.lowerLimit)} µg/L), so the biomarker stays at baseline. Raise Cmax or lower the limit to see an effect.`;
  }

  const dr = useMemo(() => {
    const xMax = params.upperLimit * 1.15 || 1;
    const xs = Float64Array.from({ length: 241 }, (_, i) => (i / 240) * xMax);
    const ys = Float64Array.from(xs, (c) => targetMarker(c, params));
    return { xs, ys, xMax };
  }, [params]);
  const drTicks = niceTicks(0, dr.xMax, 5).filter((t) => t <= dr.xMax);

  const drugSeries = { ys: sim.conc, tone: 'drug', name: 'Drug', unit: 'µg/L' };
  const markerSeries = { ys: sim.marker, tone: 'marker', name: 'Biomarker', unit: 'mg/L' };
  const effectBand = { y0: params.lowerLimit, y1: params.upperLimit, label: 'Effect range' };
  // When both levels are the same the two labels would print on top of each other.
  const markerRefs = params.baseline === params.maxEffect
    ? [{ y: params.baseline, label: 'Baseline = maximal drug effect' }]
    : [
        { y: params.baseline, label: 'Baseline' },
        { y: params.maxEffect, label: 'Maximal drug effect' },
      ];

  const tableStep = hours <= 24 ? 1 : hours <= 72 ? 3 : hours <= 168 ? 6 : 24;
  const tableRows = [];
  for (let h = 0; h <= hours + 1e-9; h += tableStep) {
    const i = Math.min(sim.t.length - 1, Math.round(h / params.increment));
    tableRows.push({ h, conc: sim.conc[i], marker: sim.marker[i] });
  }

  return (
    <>
      <title>{`The Little Pharmacologist | ${COMPANY}`}</title>
      <link rel="canonical" href={`${SITE_URL}/pharmacologist`} />

      <header className="page-header">
        <div className="container">
          <p className="eyebrow">Interactive model</p>
          <h1>The Little Pharmacologist</h1>
          <p className="page-header__lede">
            An educational interactive model simulating and visualizing blood concentrations of drugs and
            biomarkers over time. Enter the variables and see how concentrations in blood change. This model
            simulates a single person: an in-silico patient.
          </p>
          <p className="page-header__quote">“All models are wrong but some are useful.” (George Box, 1976)</p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container pk-layout">
          <form className="pk-inputs" onSubmit={(e) => e.preventDefault()} aria-label="Model inputs">
            <fieldset>
              <legend>PK: drug in blood</legend>
              {PK_FIELDS.map((f) => (
                <Field key={f.key} field={f} text={text[f.key]} invalid={invalid[f.key]} params={params} onChange={onChange} />
              ))}
              <p className="pk-inputs__note">
                The model calculates from Cmax, so body weight and single dose change only the values below the
                charts, not the curves. To change a curve, change Cmax, tmax, the half-life or the doses per day.
              </p>
            </fieldset>
            <hr className="pk-inputs__rule" />
            <fieldset>
              <legend>PD: drug effect on a biomarker</legend>
              {PD_FIELDS.map((f) => (
                <Field key={f.key} field={f} text={text[f.key]} invalid={invalid[f.key]} params={params} onChange={onChange} />
              ))}
            </fieldset>
            <div className="pk-inputs__actions">
              <button type="button" className="btn btn--secondary" onClick={reset}>Reset to defaults</button>
              <a className="btn btn--ghost" href={SPREADSHEET.href} download>
                <DownloadIcon size={18} /> Excel version
              </a>
            </div>
          </form>

          <div className="pk-results">
            <div className="pk-toolbar">
              <div className="pk-range">
                <label htmlFor="time-range">Time shown: <strong>{describeHours(hours)}</strong></label>
                <input
                  id="time-range"
                  type="range"
                  min={0}
                  max={RANGE_STOPS.length - 1}
                  step={1}
                  value={rangeIndex}
                  aria-valuetext={describeHours(hours)}
                  onChange={(e) => { setRangeIndex(Number(e.target.value)); setHover(null); }}
                />
                <span className="pk-range__ends"><span>12 h</span><span>4 weeks</span></span>
              </div>
              <label className="pk-switch">
                <input type="checkbox" checked={overlay} onChange={(e) => setOverlay(e.target.checked)} />
                Both curves in one chart
              </label>
            </div>

            {problems.length > 0 && (
              <div className="pk-warning" role="status">
                <strong>Check your inputs</strong>
                <ul>{problems.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}

            <dl className="pk-stats">
              <div>
                <dt>Cmax per dose and body weight</dt>
                <dd>{formatNumber(stats.normalizedCmax)} <span>µg/(L·kg·mg)</span></dd>
              </div>
              <div>
                <dt>Volume of distribution</dt>
                <dd>{formatNumber(stats.volume)} <span>L ({formatNumber(stats.volumePerKg)} L/kg)</span></dd>
              </div>
              <div>
                <dt>Baseline biomarker production</dt>
                <dd>{formatNumber(stats.markerProduction)} <span>mg/h</span></dd>
              </div>
            </dl>

            {overlay ? (
              <article className="pk-card">
                <header className="pk-card__header">
                  <h2>Drug and biomarker over time</h2>
                  <p>
                    Hours since the first dose. Each curve has its own scale, drug on the left and biomarker on the
                    right. The shaded band is the effect range, taken from the lower and upper drug concentration
                    limits you set.{doses.length > 0 ? ' Triangles mark each dose.' : ''}
                  </p>
                </header>
                <LineChart
                  label="Drug concentration and biomarker over time"
                  xs={sim.t}
                  series={[drugSeries, { ...markerSeries, axis: 'right' }]}
                  xDomain={[0, hours]}
                  xTicks={xTicks}
                  xFormat={hourLabel}
                  xName="time"
                  band={effectBand}
                  markers={doses}
                  hover={hover}
                  onHover={setHover}
                  keyStep={keyStep}
                />
              </article>
            ) : (
              <article className="pk-card">
                <header className="pk-card__header">
                  <h2><span className="chart__key chart__key--drug" aria-hidden="true" />Drug concentration in blood</h2>
                  <p>
                    µg/L over hours since the first dose. The shaded band is the effect range, taken from the lower
                    and upper drug concentration limits you set.{doses.length > 0 ? ' Triangles mark each dose.' : ''}
                  </p>
                </header>
                <LineChart
                  label="Drug concentration in blood over time"
                  xs={sim.t}
                  series={[drugSeries]}
                  xDomain={[0, hours]}
                  xTicks={xTicks}
                  xFormat={hourLabel}
                  xName="time"
                  band={effectBand}
                  markers={doses}
                  hover={hover}
                  onHover={setHover}
                  keyStep={keyStep}
                />

                <header className="pk-card__header pk-card__header--second">
                  <h2><span className="chart__key chart__key--marker" aria-hidden="true" />Biomarker in blood</h2>
                  <p>mg/L over the same hours, responding after the lag time.</p>
                </header>
                <LineChart
                  label="Biomarker in blood over time"
                  xs={sim.t}
                  series={[markerSeries]}
                  xDomain={[0, hours]}
                  xTicks={xTicks}
                  xFormat={hourLabel}
                  xName="time"
                  refLines={markerRefs}
                  markers={doses}
                  hover={hover}
                  onHover={setHover}
                  keyStep={keyStep}
                />
              </article>
            )}

            {noEffect && <p className="pk-note" role="status">{noEffect}</p>}

            <article className="pk-card">
              <header className="pk-card__header">
                <h2><span className="chart__key chart__key--marker" aria-hidden="true" />Dose response</h2>
                <p>Biomarker (mg/L) the drug drives toward at each drug concentration (µg/L), described by three points.</p>
              </header>
              <LineChart
                label="Dose response: biomarker effect over drug concentration"
                xs={dr.xs}
                series={[{ ys: dr.ys, tone: 'marker', name: 'Biomarker', unit: 'mg/L' }]}
                xDomain={[0, dr.xMax]}
                xTicks={drTicks}
                xFormat={(v) => formatNumber(v)}
                xName="concentration"
                points={[
                  { x: params.lowerLimit, y: params.baseline, label: 'Lower limit', tone: 'marker' },
                  { x: params.midpoint, y: (params.baseline + params.maxEffect) / 2, label: 'Midpoint', tone: 'marker' },
                  { x: params.upperLimit, y: params.maxEffect, label: 'Upper limit', tone: 'marker', anchor: 'end' },
                ]}
                hover={drHover}
                onHover={setDrHover}
                keyStep={4}
              />
            </article>

            <details className="pk-table">
              <summary>Show the values as a table</summary>
              <div className="pk-table__scroll">
                <table>
                  <thead>
                    <tr><th scope="col">Hours since first dose</th><th scope="col">Drug (µg/L)</th><th scope="col">Biomarker (mg/L)</th></tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.h}>
                        <td>{formatNumber(row.h)}</td>
                        <td>{formatNumber(row.conc)}</td>
                        <td>{formatNumber(row.marker)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>
      </section>

      <ModelNotes />
    </>
  );
}
