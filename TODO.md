# TODO

## Write real copy where placeholders were removed

The visible `[TO CONFIRM]` markers were stripped from every page (round 2
fix) so nothing broken shows on the live site, but the underlying gaps are
still open — none of this content exists anywhere yet:

- `index.html`, `cement.html`, `tile-adhesives.html`, `sand-aggregates.html`,
  `bricks-blocks.html`, `waterproofing.html` — bag sizes, stock availability,
  brands/grades carried, pricing, minimum order quantity, delivery timelines.
  The sentences that used to end in a placeholder now just stop short of
  that detail; add it back in as real copy when known.
- `faq.html` — all 7 questions currently have **no answer text at all** (the
  headings are there, the `[TO CONFIRM]` paragraphs were removed rather than
  left visible). Write the real answers, then re-add FAQPage JSON-LD in the
  `<head>` (removed for the same reason — a schema with placeholder answers
  wouldn't match the visible page). Also decide the delivery-area list here:
  currently only Kesharbagh Road, Annapurna Area, and Sudama Nagar are named
  on `index.html` — expand `faq.html`'s "which areas" answer accordingly.

## Add images

- Shop front photo for the `HardwareStore` JSON-LD `image` field in
  `index.html` (currently points to `images/shopfront.jpg`, which doesn't
  exist yet).
- `og:image` (1200x630px, absolute URL) on every page — currently a `TODO`
  comment in each `<head>`. Needed for proper WhatsApp/social link previews.
- Product photos for the category pages, once available.

## After the above

- Google Search Console: verify `jbtindore.in`, submit `sitemap.xml`, request
  indexing.
- Update the website field on Google Business Profile.
- Manufacturer dealer locators — UltraTech, Kerakoll, Roff, Tenax.
- Directory cleanup — merge duplicate JustDial profiles, then IndiaMART,
  Sulekha, TradeIndia, with identical name/address/phone everywhere.
