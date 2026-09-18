import { COMPANY, SITE_URL, EMAIL, LOCATION, PHONE_DISPLAY, PHONE_HREF } from '../site';
import { MailIcon, PhoneIcon, PinIcon } from '../components/Icons';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <>
      <title>{`Contact Us | ${COMPANY}`}</title>
      <link rel="canonical" href={`${SITE_URL}/contact`} />

      <header className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="page-header__lede">
            For questions or more information, please reach out to{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or submit a message below.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="container contact">
          <ContactForm />

          <aside className="contact-details" aria-label="Contact details">
            <ul>
              <li>
                <MailIcon />
                <div>
                  <span className="label">Email</span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </div>
              </li>
              <li>
                <PhoneIcon />
                <div>
                  <span className="label">Phone</span>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </div>
              </li>
              <li>
                <PinIcon />
                <div>
                  <span className="label">Location</span>
                  {LOCATION}
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
