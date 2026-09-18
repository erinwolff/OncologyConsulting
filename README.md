# Oncology Consulting Wolff LLC

Source for the Oncology Consulting Wolff LLC website: a React single-page app built with Vite and hosted on Netlify.

## Development

Requires Node 24 (`nvm use` picks it up from `.nvmrc`).

```sh
npm install
npm run dev      # local dev server
npm run lint
npm run build    # production build in dist/
```

## Where things live

| What | Where |
| --- | --- |
| Email, phone, location, profile links, spreadsheet download | `src/site.js` |
| Page content | `src/features/` (`Home.jsx`, `Services.jsx`, `Contact.jsx`) |
| Header and footer | `src/layout/` |
| All styling (colors and fonts at the top) | `src/index.css` |
| Images | `public/images/` (WebP, resized for the web) |
| Downloadable files | `public/downloads/` |
| Hosting config and security headers | `netlify.toml` |

### Updating the spreadsheet

Replace `public/downloads/wolff-oncology-spreadsheet.xlsx` with the real file. If the filename or description changes, update `SPREADSHEET` in `src/site.js`.

### Security headers

`netlify.toml` sets a strict Content-Security-Policy. If you add a third-party service (analytics, an embedded video, a new form provider, etc.), add its domain to the matching CSP directive or the browser will block it.

## Dependencies

- **React** and **React Router**
- **Fontsource** for self-hosted fonts (Source Serif 4 and Source Sans 3)
- Contact form submissions go to **Formspree** (no client library)
