import { Link } from 'react-router';
import { COMPANY, EMAIL, SITE_URL } from '../site';
import { ArrowIcon, MailIcon } from '../components/Icons';
import DownloadCard from '../components/DownloadCard';

export default function Home() {
  return (
    <>
      <title>{COMPANY}</title>
      <link rel="canonical" href={`${SITE_URL}/`} />

      <section className="hero" aria-labelledby="vision-heading">
        <img
          className="hero__image"
          src="/images/mountain.webp"
          alt="Mt. Rainier"
          width="1493"
          height="1120"
          fetchPriority="high"
        />
        <div className="container hero__content">
          <h1 id="vision-heading" className="eyebrow eyebrow--light">Vision</h1>
          <p className="hero__statement">
            To improve cancer care by fostering oncology drug development, innovative study designs and data analyses, taking the individual needs of current patients, clinical investigators, drug developers, sponsors and shareholders into account and synchronizing them to cure even more patients with cancer in the future.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="founder-heading">
        <div className="container founder">
          <img
            className="founder__photo"
            src="/images/johannes.webp"
            alt="Johannes Wolff"
            width="720"
            height="1080"
            loading="lazy"
          />
          <div className="founder__text">
            <h2 id="founder-heading">Johannes Wolff</h2>
            <p className="founder__role">Founder and CMO</p>
            <div className="prose">
              <p>
                Dr med habil Johannes E Wolff, MD PhD is an accomplished medical researcher, physician, and drug developer. He has completed medical training in Germany to be board certified pediatric hematologist oncologist. His medical practice of three decades was in Europe, Canada, and the United States, and he considers among all these places MDAnderson Cancer Center in Houston his academic home. He developed, wrote, led, and published international cooperative clinical trials, tested novel drugs in his laboratories, taught biostatistics, spearheaded immune therapy, and personalized targeted therapy.
              </p>
              <p>
                His academic titles included the title of professor in four different universities, and his administrative roles went beyond staff physician and medical faculty to section head (MDAnderson), divisions chief (Tufts), and department chair (Cleveland Clinic). His move to the pharmaceutical industry came after over 200 peer-reviewed publications, and it started in Medical Affairs in Novartis. Within the pharmaceutical industry, Johannes Wolff calls AbbVie his home, where he worked in late development (Venetoclax), early oncology development, and safety. After moving to smaller companies to become proficient in the business agility necessary for resource-poor environments, he now runs his own company, focusing on consulting in oncology clinical development strategy, medical monitoring of clinical trials and data interpretation.
              </p>
            </div>
            <div className="button-row">
              <Link className="btn btn--primary" to="/services">
                Services <ArrowIcon />
              </Link>
              <a className="btn btn--secondary" href={`mailto:${EMAIL}`}>
                <MailIcon size={18} /> {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--band" aria-labelledby="resources-heading">
        <div className="container">
          <h2 id="resources-heading" className="eyebrow">Resources</h2>
          <DownloadCard />
        </div>
      </section>
    </>
  );
}
