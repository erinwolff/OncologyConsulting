import { Link } from 'react-router';
import { SPREADSHEET } from '../site';
import { ArrowIcon, DownloadIcon, SheetIcon } from './Icons';

export default function DownloadCard() {
  return (
    <div className="download-card">
      <div className="download-card__icon">
        <SheetIcon />
      </div>
      <div className="download-card__text">
        <h3>{SPREADSHEET.title}</h3>
        <p>{SPREADSHEET.description}</p>
        <span className="download-card__meta">Use it in your browser, or download the {SPREADSHEET.fileLabel}</span>
      </div>
      <div className="download-card__actions">
        <Link className="btn btn--primary" to={SPREADSHEET.page}>
          Open the model <ArrowIcon />
        </Link>
        <a className="btn btn--secondary" href={SPREADSHEET.href} download>
          <DownloadIcon size={18} />
          Download
        </a>
      </div>
    </div>
  );
}
