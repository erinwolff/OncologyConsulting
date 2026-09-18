// Details shared by several pages. Edit here and every page updates.

export const SITE_URL = 'https://wolffoncology.com';
export const COMPANY = 'Oncology Consulting Wolff LLC';
export const EMAIL = 'johannes@wolffoncology.com';
export const PHONE_DISPLAY = '+1 (253) 250-1037';
export const PHONE_HREF = 'tel:+12532501037';
export const LOCATION = 'Puyallup, WA 98374';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myyryjlg';

export const PROFILE_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johannes-wolff-md-phd-2a8998106/' },
  { label: 'Research Gate', href: 'https://www.researchgate.net/profile/Johannes-Wolff-2' },
  { label: 'PubMed', href: 'https://pubmed.ncbi.nlm.nih.gov/?term=wolff+JE%5Bau%5D' },
];

// TODO: replace the placeholder file in public/downloads/ with the real
// spreadsheet, then update the title, description and filename below.
export const SPREADSHEET = {
  title: 'Spreadsheet',
  description: 'Download the spreadsheet in Excel format.',
  href: '/downloads/wolff-oncology-spreadsheet.xlsx',
  fileLabel: 'Excel (.xlsx)',
};
