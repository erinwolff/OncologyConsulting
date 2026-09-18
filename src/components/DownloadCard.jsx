import { SPREADSHEET } from '../site';
import { DownloadIcon, SheetIcon } from './Icons';

export default function DownloadCard() {
  return (
    <div className="download-card">
      <div className="download-card__icon">
        <SheetIcon />
      </div>
      <div className="download-card__text">
        <h3>{SPREADSHEET.title}</h3>
        <p>{SPREADSHEET.description}</p>
        <span className="download-card__meta">{SPREADSHEET.fileLabel}</span>
      </div>
      <a className="btn btn--primary" href={SPREADSHEET.href} download>
        <DownloadIcon size={18} />
        Download
      </a>
    </div>
  );
}
