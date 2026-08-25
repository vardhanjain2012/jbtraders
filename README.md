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
| `src/products.njk` | Generates every product page from the data below |
| `src/_includes/base.njk` | The shared shell: head, nav, footer |
| `src/_includes/product-grid.njk` | Tab strip and product cards on a category page |
| `src/_data/products.json` | Every item the site shows — see below |
| `src/_data/categories.json` | Per-category tabs, headings and button labels |
| `src/_data/site.json` | Phone, WhatsApp, address, hours — edit here, not in pages |
| `src/_data/nav.json` | Main navigation items |
| `MIGRATION-URLS.txt` | Every URL that must keep resolving. Check before renaming anything. |

## Adding a product

Add one entry to `src/_data/products.json`. That is the whole job — the card on
the category page and the detail page both come from it.

```json
{
  "slug": "example-cement",
  "name": "Example",
  "subtitle": "Grey Cement",
  "category": "cement",
  "tab": "grey-cement",
  "image": "example-cement.webp",
  "alt": "Example — J.B. Traders, Indore",
  "enquiryName": "Example Cement",
  "hasPage": true,
  "title": "…",
  "description": "…",
  "paragraphs": ["…"],
  "related": [{ "slug": "ultratech-cement" }]
}
```

`hasPage: false` gives an item a card on its category page and no detail page —
that is how sand, gitti, churi, bricks and cover blocks are handled. Those
entries need only the fields above the `title` line, plus `showCall` to choose
between a "Call for Availability" button and Enquire alone.

`subtitle` is deliberately loose: it holds a manufacturer for some items and a
product type for others. Some cards have always shown something different from
the page they link to — a grid is scanned for brands, a page is read for the
product — so an optional `card` object overrides `name`, `subtitle`, `alt`,
`image` or `enquiryName` in the grid only. Same idea inside `related`.

If schema.org `Product` data is ever added, its `brand` needs a real
manufacturer field; `subtitle` is not one.

## URL preservation

The site is indexed at `.html` URLs, so `src/src.11tydata.js` forces flat
permalinks: `src/cement.html` builds to `_site/cement.html`, **not**
`_site/cement/index.html`. Don't remove that file, and don't rename pages
without adding a redirect stub (see `src/bricks-blocks.html` for the pattern).
