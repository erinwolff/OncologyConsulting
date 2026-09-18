import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { COMPANY, SITE_URL } from '../site';

function Figure({ src, alt, width, height, narrow }) {
  return (
    <figure className={`service-figure${narrow ? ' service-figure--narrow' : ''}`}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </figure>
  );
}

const SERVICES = [
  {
    id: 'medical-monitoring',
    label: 'Medical Monitoring',
    content: (
      <>
        <p>The service is typically structured similarly to the Job description of an employed senior medical director in the pharmaceutical industry. It includes all medical functions from protocol development over study conduct to result reporting. Core specific items may include site initiation visits, checking eligibility criteria of potential patients to be enrolled, review of safety events, investigator meetings, and review of aggregate data. The consultant is embedded in the study team and provides medical advice to Clinical Operation team, Biometrics, Biomarkers, and other functions. Safety monitoring functions such as 24 hour medical coverage, adverse event causality assessment, CIOMs narratives, aggregate data review, or safety work ups may or may not be included. Safety operation such as SUSAR reporting is not offered at this point in time. The service is typically compensated on hourly basis.</p>
        <div className="split">
          <ul className="check-list">
            <li>Protocol Writing</li>
            <li>Site Selection</li>
            <li>Site Initiation Visits</li>
            <li>Investigator Relation Management</li>
            <li>Patient Eligibility</li>
            <li>Causality Assessment of Adverse Events</li>
            <li>Aggregate Data Review</li>
            <li>Publications</li>
            <li>And others</li>
          </ul>
          <Figure src="/images/medical_monitoring.webp" alt="Medical Monitoring" width="563" height="544" />
        </div>
      </>
    ),
  },
  {
    id: 'data-review',
    label: 'Data Review',
    content: (
      <>
        <p>These are services combining Medical expertise with basic statistics in various degrees:</p>
        <div className="offerings">
          <article>
            <h3>Aggregate Safety Data Reviews</h3>
            <p>The customer is a pharmaceutical company conducting a clinical trial, a sponsor in ICH terminology. They deliver tables and listings. The review is a part of the risk management plan of the sponsor. Typical data are TEAE or SAEs or related drug reactions ranked by frequency in columns of treatment arms or cohorts or dose levels, or grades. Consulting Wolff LLC reviews the data for detection of safety signals, items (red flags) to be queried (cleaned) before the data are to be presented outside the company, and strategic advice on risk management, and data presentation. In phase 3 studies, the data are typically fire-walled from the clinical development department, and privy only to high level leadership and the safety department.  Findings are summarized as Word document or PowerPoint slide deck, and presented in a Video conference.</p>
          </article>
          <article>
            <h3>Efficacy Data Bench Mark Creation by Review of Literature and Labels</h3>
            <p>The customer is a pharmaceutical company conducting or planning a clinical trial. They deliver desired indication including histological diagnosis, stage, age, and previous line of treatment, tables and listings. The review is a part of the risk management plan of the sponsor. Consulting Wolff LLC reviews the existing literature, summarizes it in a power point presentation, and makes a concluding recommendation on which endpoint to use, and bench mark to assign for further development. The depth of the research can vary and is agreed upon in the project outline. In the minimum this may be the selection of the best suitable published comparator, in maximum it may be a complete formal meta-analysis.</p>
          </article>
          <article>
            <h3>Efficacy Study Data Exploratory Analysis</h3>
            <p>The customer is a pharmaceutical company conducting or planning a clinical trial. The customer is a pharmaceutical company conducting a clinical trial, a sponsor in ICH terminology. They deliver data in Excel. The data structure is one line per patient. Variables (columns) are previously agreed upon, and typically include prognostic indicators such as tumor stage, previous lines of treatment as well as outcome variables such as best overall response (BOR), time on treatment, or event free survival. The data are typically not cleaned, and not source verified. Consulting Wolff LLC will review and analyze the data. The product is a PowerPoint presentation with key findings, and an SPSS report of all calculations included in the final version.  The finding will include: Red flags: items that appear unlikely, should result in a query or further explanation before presenting the data outside of the company, an aggregate overview of the observed efficacy (overall response rates, median PFS as applicable), a comparison to the bench mark or TPP, and strategic recommendations for further study conduct.</p>
          </article>
        </div>
        <Figure src="/images/data.webp" alt="Data Review" width="1103" height="708" />
      </>
    ),
  },
  {
    id: 'order-a-product',
    label: 'Order a Product',
    content: (
      <>
        <p>These are services that have a tangible product as outcome.</p>
        <div className="offerings">
          <article>
            <h3>Clinical Development Plan</h3>
            <p>Based upon mechanism of action, animal data, Target product Profile, and company vision, the CDP will be created in communication with team and leadership, and presented as a PowerPoint product describing to company leadership, investors, and company employees.  It starts with the first in human (FIH) trial, and ends the vision of approval.  It includes indication, patient numbers, decision points, bench marks, geostrategy, and time lines.</p>
          </article>
          <article>
            <h3>Protocol Writing</h3>
            <p>Based upon the CDP, and existing data, patient numbers based upon a statistical power calculation delivered by the sponsor, and potentially a company protocol template, Oncology Consulting Wolff LLC will deliver a first draft for a protocol.  Thereafter a company review is supported, comments are included, and a second draft is created.</p>
          </article>
          <article>
            <h3>Publications</h3>
            <p>Conference posters (PowerPoint), review articles, clinical trial publications are typical products to be ordered and delivered to the customer.</p>
          </article>
        </div>
        <Figure src="/images/development_plan.webp" alt="Development Plan" width="1600" height="1067" narrow />
      </>
    ),
  },
  {
    id: 'strategic-consultation',
    label: 'Strategic Consultation & Leadership',
    content: (
      <>
        <p>These services are very flexible and dependent on the status of the drug development.  They may include developing the medical components of the IND, CDP, NDA, or launch.  Data review, competitive intelligence may be a part of the preparation work.  Internal or external presentations may be part of the deliverables.</p>
        <Figure src="/images/consulting.webp" alt="Consulting" width="1600" height="1067" narrow />
      </>
    ),
  },
  {
    id: 'teaching-coaching',
    label: 'Teaching, Coaching, Education',
    content: (
      <>
        <div className="offerings">
          <article>
            <p><strong>Didactic lectures</strong> for specific oncology indications, response definitions, drug classes, clinical trial best practice, and basics in biostatistics will be provided specifically tailored to the customers needs.</p>
          </article>
          <article>
            <p><strong>Mentoring</strong> of junior employees, in particular medical and safety directors will be provided on scheduled one on one video conference basis, as well as providing resources, and out of schedule point of contact support.</p>
          </article>
          <article>
            <p><strong>Coaching</strong> of senior employees, focusing on medical doctors switching to the industry on senior levels will be provided as a structured process over a predetermined time period.  This may include an initial assessment of issues that may have occurred, personal meetings, a coaching plan, scheduled one on one video conference basis, and out of schedule point of contact support, a midterm coaching assessment, and a final project conclusion.</p>
          </article>
        </div>
        <Figure src="/images/coaching.webp" alt="Coaching" width="1600" height="1067" narrow />
      </>
    ),
  },
];

export default function Services() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const tabRefs = useRef([]);

  // The selected tab lives in the URL hash so each service can be linked to.
  const found = SERVICES.findIndex((s) => `#${s.id}` === hash);
  const active = found === -1 ? 0 : found;

  const select = (index, focus = false) => {
    navigate({ hash: SERVICES[index].id }, { replace: true, preventScrollReset: true });
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e) => {
    const last = SERVICES.length - 1;
    const next = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <>
      <title>{`Services | ${COMPANY}`}</title>
      <link rel="canonical" href={`${SITE_URL}/services`} />

      <header className="page-header">
        <div className="container">
          <h1>Our Services</h1>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container services">
          <div className="services__tabs" role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                type="button"
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={i === active}
                aria-controls={`panel-${s.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => select(i)}
              >
                {s.label}
              </button>
            ))}
          </div>

          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              role="tabpanel"
              id={`panel-${s.id}`}
              aria-labelledby={`tab-${s.id}`}
              hidden={i !== active}
              tabIndex={0}
              className="services__panel prose"
            >
              <h2>{s.label}</h2>
              {s.content}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
