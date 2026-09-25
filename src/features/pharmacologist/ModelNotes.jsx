// Johannes Wolff's explanation of the model, from the spreadsheet
// (obvious typos corrected).

export default function ModelNotes() {
  return (
    <section className="section section--band" aria-labelledby="notes-heading">
      <div className="container">
        <h2 id="notes-heading" className="eyebrow">How the model works</h2>
        <div className="pk-notes">
          <article>
            <h3>General description</h3>
            <p>The Little Pharmacologist is an educational interactive model simulating and visualizing blood concentrations of drugs and biomarkers over time. The user enters the variables and sees how concentrations in blood will change over time. This model simulates a single person: an in-silico patient.</p>
            <p><em>All models are wrong but some are useful</em> (George Box, 1976).</p>
          </article>

          <article>
            <h3>PK component</h3>
            <p>If users have pharmacokinetic (PK) data and want to enter them here, they may do this:</p>
            <ul>
              <li>Find body weight, single dose, Cmax measured, tmax, and half-life t½ from the data and enter them. This can be from a single patient or it can be the average of a patient cohort (group of patients).</li>
              <li>Compare the curves that the model produces with the PK graphics of the real patient. If they don’t look the same, work on the variables again until they do.</li>
            </ul>
            <p>The model uses Cmax to calculate. That means changes of single dose or body weight don’t change the curve, unless the Cmax entry is also corrected.</p>
            <p>The model can never be better than the original data. But it can guess the drug concentrations at time points that were not measured, and it can predict the curve if variables were different: change Cmax, tmax, t½ or doses/day and see how the PK curve changes.</p>
          </article>

          <article>
            <h3>PD component</h3>
            <p>Pharmacodynamics (PD) describes drug effects on the body; here, restricted to a biomarker. The biomarker is something that can be measured in blood, that changes in response to the drug, and that means something for the patient’s disease.</p>
            <p>Examples: Prostate Specific Antigen (PSA) can give information about prostate cancer. C-reactive protein (CRP) can inform about inflammations.</p>
            <p>In this educational model, the user is asked to characterize the dose response relationship between drug concentration and biomarker change.</p>
          </article>

          <article>
            <h3>Mechanism of action (MOA) dose response curve</h3>
            <p>In this model, it is described by three points with two coordinates each:</p>
            <ol type="a">
              <li><strong>The minimum point:</strong> the drug concentration that starts showing some effect; in other words, the highest concentration which did not have any effect on the biomarker. The biomarker concentration at the low point is the baseline concentration of the biomarker. If the drug effect is an increase of the biomarker, then the baseline concentration might be 0.</li>
              <li><strong>The maximum point</strong> of the drug efficacy range is described by the highest concentration of drug that still makes a difference (also called saturation concentration); higher concentrations do not reach higher effects. This is also the lowest concentration above which further increase will not change the biomarker any more. And the biomarker production after maximum drug effect has occurred and was maintained at infinity. This may be lower than the baseline, if the drug decreases the biomarker (easiest: 0, if the drug can completely suppress), or it may be higher than baseline if the drug increases this biomarker.</li>
              <li><strong>The midpoint:</strong> the drug concentration that results in half of the maximum drug effect. It might be the average of high and low concentrations. In enzyme biochemistry the point is often described as IC50 (inhibitory concentration 50%). In receptor binding physiology it is described as Kd, the ligand concentration at which 50% of the receptors are occupied. The biomarker concentration at midpoint does not need to be entered by the user; it is by definition the average of the high and low biomarker values entered before.</li>
            </ol>
            <p>The model will not work if the drug concentrations are in the wrong order. The low point concentration needs to be entered with the lowest number, and so on. For educational purposes, the user may play with the numbers and see how the curves change.</p>
          </article>

          <article>
            <h3>Kinetics of the PD marker</h3>
            <p>To turn the dose response curve into a time curve of biomarker changes, two time entries are necessary.</p>
            <p><strong>The lag time</strong> describes how long it takes for the drug to have an effect. This time is often measured in preclinical experiments. Among the fastest processes are ionotropic receptors such as acetylcholine receptors, with lag times of 1–2 milliseconds. Slower are reactions that require transcription, translation and posttranslational modulation of proteins. The slowest are biomarkers that only change after several consecutive intercellular reactions as part of the mechanism of action: bacteria cause inflammation and CRP elevations; antibiotics kill bacteria, inflammation is reduced, CRP drops, and this takes several hours. The lag time does not include how fast the biomarker is metabolized or excreted.</p>
            <p><strong>The biomarker half-life</strong> describes how long the biomarker stays in blood after it was made. It is typically very short for signal peptides such as TNF-alpha (15 min), and long for large proteins such as alpha-2-macroglobulin (several days). There is a relation between steady state baseline level and half-life: if the baseline is stable, then a long half-life also indicates a slow production speed. The user may change the value and see how the biomarker response curve changes.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
