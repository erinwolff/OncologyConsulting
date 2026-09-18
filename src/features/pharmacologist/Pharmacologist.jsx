import { useMemo, useState } from 'react';
import { COMPANY, SITE_URL, SPREADSHEET } from '../../site';
import { DownloadIcon } from '../../components/Icons';
import { DEFAULTS, derived, simulate, targetMarker, validate } from './model';
import { PD_FIELDS, PK_FIELDS } from './fields';
import LineChart from './LineChart';
import { formatNumber, niceTicks } from './format';
import ModelNotes from './ModelNotes';

const WEEK = 168;
const RANGES = {
  day: { label: 'First day', hours: 24, tick: 4, table: 1 },
  week: { label: 'First week', hours: WEEK, tick: 24, table: 6 },
};
const ALL_FIELDS = [...PK_FIELDS, ...PD_FIELDS];

const toText = (p) => Object.fromEntries(Object.entries(p).map(([k, v]) => [k, String(v)]));

function parseField(field, text) {
  const n = Number(text);
  if (text.trim() === '' || !Number.isFinite(n)) return null;
  if (n < field.min || n > field.max) return null;
  if (field.integer && !Number.isInteger(n)) return null;
  return n;
}

function Field({ field, text, invalid, onChange }) {
  const id = `f-${field.key}`;
  return (
    <div className={`pk-field${invalid ? ' is-invalid' : ''}`}>
      <label htmlFor={id}>{field.label}</label>
      <div className="pk-field__control">
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
        <span className="pk-field__unit">{field.unit}</span>
      </div>
      <p id={`${id}-help`} className="pk-field__help">
        {invalid
          ? `Enter ${field.integer ? 'a whole number' : 'a number'} from ${formatNumber(field.min)} to ${formatNumber(field.max)}.`
          : field.help}
      </p>
    </div>
  );
}

export default function Pharmacologist() {
  const [params, setParams] = useState(DEFAULTS);
  const [text, setText] = useState(() => toText(DEFAULTS));
  const [range, setRange] = useState('day');
  const [hover, setHover] = useState(null);
  const [drHover, setDrHover] = useState(null);

  function onChange(field, value) {
    setText((t) => ({ ...t, [field.key]: value }));
    const n = parseField(field, value);
    if (n !== null) setParams((p) => ({ ...p, [field.key]: n }));
  }

  function reset() {
    setParams(DEFAULTS);
    setText(toText(DEFAULTS));
  }

  const invalid = Object.fromEntries(ALL_FIELDS.map((f) => [f.key, parseField(f, text[f.key]) === null]));
  const problems = validate(params);
  const stats = derived(params);

  const sim = useMemo(() => simulate(params, WEEK), [params]);
  const r = RANGES[range];
  const xTicks = Array.from({ length: r.hours / r.tick + 1 }, (_, i) => i * r.tick);
  const doses = sim.doses.filter((d) => d <= r.hours + 1e-9);
  const keyStep = Math.max(1, Math.round(r.hours / 96 / params.increment));
  const hourLabel = (v) => `${formatNumber(v)} h`;

  const dr = useMemo(() => {
    const xMax = params.upperLimit * 1.15 || 1;
    const xs = Float64Array.from({ length: 241 }, (_, i) => (i / 240) * xMax);
    const ys = Float64Array.from(xs, (c) => targetMarker(c, params));
    return { xs, ys, xMax };
  }, [params]);
  const drTicks = niceTicks(0, dr.xMax, 5).filter((t) => t <= dr.xMax);

  const tableRows = [];
  for (let h = 0; h <= r.hours + 1e-9; h += r.table) {
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
                <Field key={f.key} field={f} text={text[f.key]} invalid={invalid[f.key]} onChange={onChange} />
              ))}
              <p className="pk-inputs__note">
                The model uses Cmax to calculate, so changing the single dose or body weight doesn’t change the
                curve unless Cmax is also corrected.
              </p>
            </fieldset>
            <hr className="pk-inputs__rule" />
            <fieldset>
              <legend>PD: drug effect on a biomarker</legend>
              {PD_FIELDS.map((f) => (
                <Field key={f.key} field={f} text={text[f.key]} invalid={invalid[f.key]} onChange={onChange} />
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
              <div className="segmented" role="group" aria-label="Time range">
                {Object.entries(RANGES).map(([key, v]) => (
                  <button key={key} type="button" aria-pressed={range === key} onClick={() => { setRange(key); setHover(null); }}>
                    {v.label}
                  </button>
                ))}
              </div>
              <p className="pk-toolbar__hint">Hover over or tap a chart to read values. Change the inputs to see the curves update.</p>
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

            <article className="pk-card">
              <header className="pk-card__header">
                <h2><span className="chart__key chart__key--drug" aria-hidden="true" />Drug concentration in blood</h2>
                <p>µg/L over hours since first dose. Triangles mark each dose; the shaded band is the effect range (lower to upper limit).</p>
              </header>
              <LineChart
                label="Drug concentration in blood over time"
                xs={sim.t}
                ys={sim.conc}
                tone="drug"
                xDomain={[0, r.hours]}
                xTicks={xTicks}
                xFormat={hourLabel}
                xName="time"
                yName="Drug"
                yUnit="µg/L"
                band={{ y0: params.lowerLimit, y1: params.upperLimit, label: 'Effect range' }}
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
                ys={sim.marker}
                tone="marker"
                xDomain={[0, r.hours]}
                xTicks={xTicks}
                xFormat={hourLabel}
                xName="time"
                yName="Biomarker"
                yUnit="mg/L"
                refLines={[
                  { y: params.baseline, label: 'Baseline' },
                  { y: params.maxEffect, label: 'Maximal drug effect' },
                ]}
                markers={doses}
                hover={hover}
                onHover={setHover}
                keyStep={keyStep}
              />
            </article>

            <article className="pk-card">
              <header className="pk-card__header">
                <h2><span className="chart__key chart__key--marker" aria-hidden="true" />Dose response</h2>
                <p>Biomarker (mg/L) the drug drives toward at each drug concentration (µg/L), described by three points.</p>
              </header>
              <LineChart
                label="Dose response: biomarker effect over drug concentration"
                xs={dr.xs}
                ys={dr.ys}
                tone="marker"
                xDomain={[0, dr.xMax]}
                xTicks={drTicks}
                xFormat={(v) => formatNumber(v)}
                xName="concentration"
                yName="Biomarker"
                yUnit="mg/L"
                points={[
                  { x: params.lowerLimit, y: params.baseline, label: 'Lower limit' },
                  { x: params.midpoint, y: (params.baseline + params.maxEffect) / 2, label: 'Midpoint' },
                  { x: params.upperLimit, y: params.maxEffect, label: 'Upper limit', anchor: 'end' },
                ]}
                hover={drHover}
                onHover={setDrHover}
                keyStep={4}
              />
            </article>

            <details className="pk-table">
              <summary>Show the values as a table ({r.label.toLowerCase()})</summary>
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
