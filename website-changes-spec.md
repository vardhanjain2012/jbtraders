# Website Migration & SEO Spec — jbtindore.in

## Context for the agent

Paste this block at the start of your Claude Code session:

> This is a **static website** hosted on **GitHub Pages**. No build step, no framework,
> no npm, no bundler. Plain HTML, CSS, and vanilla JavaScript only. Do not introduce
> React, Tailwind, a static site generator, or any dependency that requires a build.
>
> Repo: `vardhanjain2012/jbtraders`
> Old URL: `https://vardhanjain2012.github.io/jbtraders/`
> New URL: `https://jbtindore.in/` (custom domain, already configured, serves from root)
>
> Business: J B Traders — building materials supplier in Indore, Madhya Pradesh, India.
> Sells UltraTech cement, white cement, cover blocks, sand, gravel, bricks,
> waterproofing products, and tile adhesives / epoxy grouts (Kerakoll, Roff, Tenax).
>
> Goal: make the site crawlable and rankable for local search. Currently business
> details are injected by `config.js` at runtime, so crawlers see empty HTML.
>
> Work one task at a time. Show me the diff before applying. Do not restructure
> markup I did not ask you to change.

---

## FILL THESE IN FIRST

Replace every placeholder below with real values before running any task.
The agent cannot invent these — wrong values here will break your Google listing.

| Placeholder | Your value |
|---|---|
| `{{BUSINESS_NAME}}` | J.B. Traders |
| `{{STREET_ADDRESS}}` | D-4, Nemi Nagar, Kesharbagh Road |
| `{{LOCALITY}}` | Nemi Nagar |
| `{{CITY}}` | Indore |
| `{{STATE}}` | Madhya Pradesh |
| `{{PINCODE}}` | 452009 |
| `{{PHONE}}` | +919826077521 |
| `{{WHATSAPP}}` | 919039677521 |
| `{{HOURS}}` | hoursMonSat: "9:00 AM - 7:00 PM", hoursSun: "9:00 AM - 2:00 PM" |
| `{{MAPS_URL}}` | https://maps.app.goo.gl/5JV4TNsF5o3XJsbU6 |
| `{{LATITUDE}}` | 22.691302437740323 |
| `{{LONGITUDE}}` | 75.84403369685747 |
| `{{DELIVERY_AREAS}}` | Indore |

**Note:** all images are deferred. Where a task mentions an image, leave the path
as a placeholder comment and move on.

---

## TASK 1 — Fix absolute paths (do this first)

The site used to live at `/jbtraders/`. On the new domain it serves from `/`.
Any absolute path containing `/jbtraders/` will 404.

**Instruction to agent:**

> Search every HTML, CSS, and JS file for paths beginning with `/jbtraders/`.
> Convert them to relative paths. Check `src`, `href`, `url()` in CSS, and any
> paths built inside JavaScript. List everything you changed.

**Verify:** open the site, press F12, check the Console and Network tabs for 404s.

---

## TASK 2 — Move config.js data into static HTML

This is the most important change. Crawlers, WhatsApp link previews, and Google's
AI answers all read the raw HTML — they do not run your JavaScript.

**Instruction to agent:**

> In `index.html`, replace every value currently injected from `config.js` with
> literal static HTML. This covers: business name, full address, phone number,
> opening hours, and the product list.
>
> The Call, WhatsApp, and Maps links must be real static `href` attributes:
> - Call: `href="tel:{{PHONE}}"`
> - WhatsApp: `href="https://wa.me/{{WHATSAPP}}"`
> - Maps: `href="{{MAPS_URL}}"`
>
> Do not delete `config.js` — leave it for anything non-critical. But nothing that
> matters for SEO or link previews may depend on it.
>
> The address must be inside semantic markup, e.g. an `<address>` element, as
> readable text — not inside a JS string, not as an image.

**Verify — do this yourself, do not trust the agent's report:**
Open the page, press **Ctrl+U** (View Page Source, *not* Inspect Element).
Search for your phone number and pincode. If they are not there, the task failed.

---

## TASK 3 — Head and meta tags

Current `<title>` is just "Building Materials". Wasted.

**Instruction to agent:**

> Update the `<head>` of `index.html`:
>
> ```html
> <title>{{BUSINESS_NAME}} — Cement, Sand & Tile Adhesive Dealer in {{CITY}}</title>
> <meta name="description" content="Building materials supplier in {{LOCALITY}}, {{CITY}}. UltraTech cement, white cement, sand, gravel, bricks, and Kerakoll, Roff & Tenax tile adhesives. Home and site delivery.">
> <link rel="canonical" href="https://jbtindore.in/">
> <meta name="robots" content="index, follow">
> <html lang="en-IN">
> ```
>
> Keep the description under 160 characters.
> Every page gets its own unique title, description, and canonical URL.

---

## TASK 4 — Open Graph tags (WhatsApp previews)

Your customers share links on WhatsApp. This controls what the preview card shows.

**Instruction to agent:**

> Add to the `<head>` of every page:
>
> ```html
> <meta property="og:type" content="website">
> <meta property="og:site_name" content="{{BUSINESS_NAME}}">
> <meta property="og:title" content="[same as page title]">
> <meta property="og:description" content="[same as meta description]">
> <meta property="og:url" content="[absolute URL of this page]">
> <meta property="og:locale" content="en_IN">
> <!-- TODO: og:image — 1200x630px, absolute URL. Add once photos are ready. -->
> ```
>
> `og:url` and `og:image` must be absolute URLs, not relative.

---

## TASK 5 — LocalBusiness structured data

This is a primary source Google's AI reads when answering questions about your shop.

**Instruction to agent:**

> Add a static JSON-LD block to the `<head>` of `index.html` only (not other pages):
>
> ```html
> <script type="application/ld+json">
> {
>   "@context": "https://schema.org",
>   "@type": "HardwareStore",
>   "name": "{{BUSINESS_NAME}}",
>   "image": "https://jbtindore.in/images/shopfront.jpg",
>   "url": "https://jbtindore.in/",
>   "telephone": "{{PHONE}}",
>   "address": {
>     "@type": "PostalAddress",
>     "streetAddress": "{{STREET_ADDRESS}}",
>     "addressLocality": "{{CITY}}",
>     "addressRegion": "{{STATE}}",
>     "postalCode": "{{PINCODE}}",
>     "addressCountry": "IN"
>   },
>   "geo": {
>     "@type": "GeoCoordinates",
>     "latitude": {{LATITUDE}},
>     "longitude": {{LONGITUDE}}
>   },
>   "openingHoursSpecification": [
>     {
>       "@type": "OpeningHoursSpecification",
>       "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
>       "opens": "09:00",
>       "closes": "20:00"
>     }
>   ],
>   "areaServed": { "@type": "City", "name": "Indore" },
>   "priceRange": "₹₹"
> }
> </script>
> ```
>
> Adjust hours to the real values. It must be plain text in the HTML, not
> generated by JavaScript.

**Verify:** paste the page URL into Google's Rich Results Test.

---

## TASK 6 — Real product content on the home page

Currently the products section lists bare names. That ranks for nothing.

**Instruction to agent:**

> Replace the products section with a structured list. Each item gets a heading
> and 2–3 sentences naming the brand, the use case, and the city.
>
> Categories and brands to cover:
> - **Cement** — UltraTech OPC 53 grade, UltraTech PPC, white cement
> - **Tile adhesives** — Kerakoll, Roff, Tenax; for vitrified, wall, and floor tiles
> - **Grouts & fillers** — epoxy grout, tile joint filler, epoxy for marble and granite
> - **Sand & aggregates** — river sand, plaster sand, gravel, stone aggregate
> - **Bricks & blocks** — red bricks, concrete cover blocks for RCC
> - **Waterproofing** — waterproofing compounds, UltraTech waterproofing tape
>
> Use `<h2>`/`<h3>` headings properly. Do not invent prices, specifications,
> or stock claims — leave `[TO CONFIRM]` where you are unsure and I will fill in.

**You must review this text yourself.** The agent will write plausible generic
copy. What you actually stock is information only you have — and it is exactly
what Google will quote back to customers.

---

## TASK 7 — Additional pages

Create these as separate HTML files matching the existing site's styling and nav.

### 7a. `faq.html`

> Create an FAQ page covering: delivery charges, minimum order quantity, brands
> stocked, areas served in Indore, payment methods accepted, whether bulk supply
> for contractors is available, and delivery timelines.
>
> Add FAQPage JSON-LD schema matching the visible questions exactly.
> Leave answers as `[TO CONFIRM]` — I will write the real ones.

### 7b. Product category pages

> Create: `cement.html`, `tile-adhesives.html`, `sand-aggregates.html`,
> `bricks-blocks.html`, `waterproofing.html`
>
> Each needs: unique title and meta description, its own canonical URL, an `<h1>`
> naming the product plus Indore, 300–500 words of real detail, brand names,
> and Call/WhatsApp buttons. Match the home page's existing CSS — do not
> introduce a new stylesheet.

### 7c. Delivery areas

> Add a section to `index.html` (or a `delivery-areas.html` page) listing the
> Indore localities served, by name, as readable text.
> Areas: {{DELIVERY_AREAS}}

### 7d. Shared navigation

> Add a consistent nav bar across all pages linking Home, Cement, Tile Adhesives,
> Sand & Aggregates, Bricks, Waterproofing, FAQ, Contact.
> Since there is no build step, duplicate the nav HTML in each file —
> do not add a JS include.

---

## TASK 8 — sitemap.xml and robots.txt

**Instruction to agent:**

> Create `sitemap.xml` at the repo root listing every page with absolute
> `https://jbtindore.in/` URLs and `<lastmod>` dates.
>
> Create `robots.txt` at the repo root:
>
> ```
> User-agent: *
> Allow: /
>
> Sitemap: https://jbtindore.in/sitemap.xml
> ```

---

## TASK 9 — Custom 404 page

**Instruction to agent:**

> Create `404.html` at the repo root. GitHub Pages serves this automatically.
> Include the nav, business name, phone, and a link back to the home page.

---

## Verification checklist

Run through these yourself after each stage:

- [ ] `Ctrl+U` on the home page shows phone, address, and pincode in raw HTML
- [ ] Browser console (F12) shows no 404s for CSS, JS, or images
- [ ] `https://jbtindore.in` loads with a padlock (HTTPS enforced)
- [ ] `https://www.jbtindore.in` redirects to the apex domain
- [ ] Pasting the URL into a WhatsApp chat shows a proper preview card
- [ ] Google Rich Results Test validates the LocalBusiness schema
- [ ] Every page has a unique title and meta description
- [ ] `https://jbtindore.in/sitemap.xml` loads
- [ ] `https://jbtindore.in/robots.txt` loads
- [ ] All nav links work on every page

---

## Suggested order

Commit after each task so you can roll back one step, not a whole afternoon.

1. Task 1 — absolute paths → test → commit
2. Task 3 — head and meta tags → commit
3. Task 2 — config.js to static HTML → **verify with Ctrl+U** → commit
4. Task 5 — JSON-LD → validate → commit
5. Task 4 — Open Graph → test in WhatsApp → commit
6. Task 6 — product content → **review the copy yourself** → commit
7. Task 7 — new pages → commit
8. Tasks 8 & 9 — sitemap, robots, 404 → commit

**Tasks 1–5 are the migration-critical ones.** Finish those before pointing your
Google Business Profile and directory listings at the new domain, so the first
crawl finds real content.

---

## Testing locally

Faster than pushing and waiting for GitHub Pages to rebuild:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

---

## After the site is done

1. Google Search Console — verify `jbtindore.in`, submit the sitemap, request indexing
2. Update the website field on Google Business Profile
3. Manufacturer dealer locators — UltraTech, Kerakoll, Roff, Tenax
4. Directory cleanup — merge the duplicate JustDial profiles, then IndiaMART,
   Sulekha, TradeIndia, with identical name/address/phone everywhere
