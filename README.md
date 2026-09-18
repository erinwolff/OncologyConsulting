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
| Page content | `src/features/` (`Home.jsx`, `Services.jsx`, `pharmacologist/`) |
| Header and footer | `src/layout/` |
| All styling (colors and fonts at the top) | `src/index.css` |
| Images | `public/images/` (WebP, resized for the web) |
| Downloadable files | `public/downloads/` |
| Hosting config and security headers | `netlify.toml` |

### Updating the spreadsheet

The Little Pharmacologist lives at `public/downloads/little-pharmacologist.xlsx`. To publish a new version, replace that file. If the filename, size or description changes, update `SPREADSHEET` in `src/site.js`.

### The Little Pharmacologist (interactive model)

`/pharmacologist` is a browser version of Johannes Wolff's spreadsheet model. The calculation lives in `src/features/pharmacologist/model.js`, and each step names the spreadsheet column it reproduces. It was checked against the spreadsheet (Excel's saved results plus LibreOffice recalculations with four other input sets): every time step matches to within 1e-13.

If the spreadsheet's formulas change, `model.js` needs the same change. Input labels, units, limits and help text are in `fields.js`; the explanatory text is in `ModelNotes.jsx`.

### Security headers

`netlify.toml` sets a strict Content-Security-Policy. If you add a third-party service (analytics, an embedded video, a contact form service, etc.), add its domain to the matching CSP directive or the browser will block it.

## Dependencies

- **React** and **React Router**
- **Fontsource** for self-hosted fonts (Source Serif 4 and Source Sans 3)
