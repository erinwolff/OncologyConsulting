import { Link } from 'react-router';
import { COMPANY, EMAIL, LOCATION, PHONE_DISPLAY, PHONE_HREF, PROFILE_LINKS, SPREADSHEET } from '../site';
import { DownloadIcon, ExternalIcon } from '../components/Icons';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/logo_favicon.png" alt="" width="40" height="38" />
          <span>{COMPANY}</span>
        </div>

        <section aria-labelledby="footer-location">
          <h2 id="footer-location">Location</h2>
          <p>{LOCATION}</p>
        </section>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact">Contact</h2>
          <p>
            <span className="label">Email</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p>
            <span className="label">Phone</span>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
        </section>

        <section aria-labelledby="footer-links">
          <h2 id="footer-links">Quick Links</h2>
          <ul>
            {PROFILE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ExternalIcon />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <Link to={SPREADSHEET.page}>{SPREADSHEET.title}</Link>
            </li>
            <li>
              <a href={SPREADSHEET.href} download>
                Download spreadsheet
                <DownloadIcon size={14} />
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} {COMPANY}</span>
        <a href="https://www.linkedin.com/in/erinmwolff/" target="_blank" rel="noopener noreferrer">
          Website Designed by Erin Wolff
        </a>
      </div>
    </footer>
  );
}
