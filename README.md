# jbtraders

JB Traders website — [jbtindore.in](https://jbtindore.in/)

Static site built with [Eleventy](https://www.11ty.dev/) and Tailwind CSS,
deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to
`main`.

## Local development

```bash
npm install
npm run build     # compiles CSS, then builds into _site/
npm run serve     # builds and serves with live reload
npm run watch:css # optional, run alongside `serve` to rebuild CSS on change
```

## Layout

| Path | What it holds |
| --- | --- |
| `src/*.html` | Root pages — front matter plus body content |
| `src/products/*.html` | One page per product |
| `src/_includes/base.njk` | The shared shell: head, nav, footer |
| `src/_data/site.json` | Phone, WhatsApp, address, hours — edit here, not in pages |
| `src/_data/nav.json` | Main navigation items |
| `MIGRATION-URLS.txt` | Every URL that must keep resolving. Check before renaming anything. |

## URL preservation

The site is indexed at `.html` URLs, so `src/src.11tydata.js` forces flat
permalinks: `src/cement.html` builds to `_site/cement.html`, **not**
`_site/cement/index.html`. Don't remove that file, and don't rename pages
without adding a redirect stub (see `src/bricks-blocks.html` for the pattern).
