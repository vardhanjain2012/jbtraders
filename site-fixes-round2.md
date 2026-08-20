# jbtindore.in — Round 2 Fixes

## Context for the agent

Paste this at the start of the session:

> Static site on GitHub Pages. No build step, no framework, no npm, plain HTML/CSS/vanilla JS.
> Live at `https://jbtindore.in/`. Repo: `vardhanjain2012/jbtraders`.
> Business: J.B. Traders, building materials supplier, D-4, Nemi Nagar, Kesharbagh Road,
> Indore, Madhya Pradesh 452009.
>
> The site is live and public, so anything visibly broken is being seen by real
> customers right now. Work one task at a time, show me the diff before applying,
> and do not restructure markup I did not ask you to change.

---

## TASK 1 — Remove `[TO CONFIRM]` text from all pages (URGENT)

These are rendering as visible text on the live public site, not as HTML comments.
Customers and Google are both seeing them.

**Instruction to agent:**

> Search every HTML file for the string `[TO CONFIRM`. Delete each bracketed
> placeholder along with any leading whitespace or punctuation left dangling.
> The surrounding sentences must still read as complete, grammatical copy.
>
> Do NOT replace them with invented details — bag sizes, stock levels, prices,
> lead times, and minimum order quantities are all unknown to you. Just remove
> the bracketed text cleanly.
>
> Affected files: `index.html`, `cement.html`, `tile-adhesives.html`,
> `sand-aggregates.html`, `bricks-blocks.html`, `waterproofing.html`, `faq.html`.
>
> List every removal so I can see what content is now thin and needs real copy later.

**Exception — the Delivery Areas section on `index.html`.** Deleting the placeholder
leaves it empty. See Task 2.

---

## TASK 2 — Fill in the Delivery Areas section

**Instruction to agent:**

> In `index.html`, replace the Delivery Areas placeholder with a real list of
> localities, marked up as a readable list (not a paragraph blob).
>
> Localities served: Kesharbagh road, Annapurna area, Sudama Nagar
>
> Keep the intro sentence mentioning delivery to homes and construction sites
> across Indore, then list the areas by name.

**Note to self:** the agent cannot know this. Write out the localities you actually
deliver to before running the task — you are at Nemi Nagar / Kesharbagh Road, so
list the surrounding neighbourhoods. This section is genuinely useful for local
search and only you have the information.

---

## TASK 3 — Resolve the phone number inconsistency

The site currently shows two different numbers:

- Call link and displayed phone: `+91 98260 77521`
- WhatsApp link: `wa.me/919039677521` → `90396 77521`

**Decide first, then instruct the agent.**

### If both numbers are real and intentional:

> Keep both links, but label them so it's clear they're different lines.
> The WhatsApp button and any WhatsApp link should read "WhatsApp: +91 90396 77521"
> rather than being unlabelled. Add both to the page in a `Contact` block:
> primary phone for calls, WhatsApp number separately.
>
> In the JSON-LD, `telephone` must be the primary call number only:
> `+919826077521`. Do not list the WhatsApp number there.

### If one is a mistake:

> Replace every occurrence of the wrong number across all HTML files with the
> correct one. Check `tel:` links, `wa.me/` links, displayed text, JSON-LD
> `telephone`, and any enquiry-form WhatsApp target.

**Why this matters:** your Google Business Profile phone edit is still pending.
Google cross-references the number you submit against your website. Whichever
number you choose as primary must match GBP, JustDill, IndiaMART and the site
exactly — same format, same digits.

---

## TASK 4 — Rewrite the H1

**Instruction to agent:**

> In `index.html`, change the `<h1>` from "Premium Construction Materials in Indore"
> to "Building Materials Supplier in Indore".
>
> Adjust the sub-heading paragraph beneath it so it still reads naturally and
> mentions cement, sand, bricks, and tile adhesives.
>
> Each product page should have an `<h1>` in the same pattern, e.g.
> "Cement Dealer in Indore", "Tile Adhesive Dealer in Indore",
> "Sand & Aggregate Supplier in Indore", "Brick Supplier in Indore",
> "Waterproofing Products in Indore".

---

## TASK 5 — Fix internal links to use clean URLs

**Instruction to agent:**

> Across all HTML files, change internal links pointing to `index.html` so they
> point to `/` instead. The Contact link should be `/#contact`.
>
> This includes the logo/brand link in the header and every nav bar instance.
> Leave links to other pages (`cement.html` etc.) as they are.

---

## TASK 6 — Remove the broken schema image reference

**Instruction to agent:**

> In the `HardwareStore` JSON-LD block in `index.html`, remove the `"image"`
> property entirely. It currently points to `images/shopfront.jpg`, which does
> not exist and returns a 404.
>
> Leave a comment above the JSON-LD noting the field should be re-added once a
> real shopfront photo is available.

---

## TASK 7 — Audit the JSON-LD

**Instruction to agent:**

> Show me the full JSON-LD block from `index.html` so I can verify it.
> Confirm it is static HTML in the `<head>` and not generated by JavaScript.
>
> Check these values against the live site and flag any mismatch:
> - `telephone` matches the displayed phone
> - `address` matches: D-4, Nemi Nagar, Kesharbagh Road, Indore,
>   Madhya Pradesh, 452009
> - `openingHoursSpecification` matches: Mon–Sat 09:00–19:00, Sunday 09:00–14:00
> - `geo` coordinates are present and plausible for Indore
>
> Note: Sunday hours are currently 9:00 AM – 2:00 PM on the page. Make sure the
> schema has a separate `OpeningHoursSpecification` entry for Sunday — it needs
> two entries, not one.

---

## TASK 8 — Verify sitemap and robots

**Instruction to agent:**

> Show me the contents of `sitemap.xml` and `robots.txt`.
> Confirm the sitemap lists all 7 pages with absolute `https://jbtindore.in/`
> URLs, uses `https://jbtindore.in/` (not `/index.html`) for the home page,
> and that `robots.txt` references the sitemap.

---

## Verification checklist

After the agent finishes, check these yourself:

- [ ] `Ctrl+F` for "TO CONFIRM" on every live page — zero results
- [ ] Delivery Areas section lists real locality names
- [ ] Phone numbers are consistent, or clearly labelled if intentionally different
- [ ] H1 reads "Building Materials Supplier in Indore"
- [ ] Nav links go to `/` not `/index.html`
- [ ] Google Rich Results Test validates the LocalBusiness/HardwareStore schema
- [ ] `https://jbtindore.in/sitemap.xml` loads
- [ ] `https://jbtindore.in/robots.txt` loads
- [ ] No 404s in the browser console (F12)

---

## Still deferred (not for the agent)

**Real product detail.** Bag sizes, grades stocked, brands and colours carried,
minimum order quantities, delivery charges and lead times, and the seven FAQ
answers. The agent will write plausible generic copy if asked — don't let it.
This is what Google will quote back to customers, so it needs to be accurate.

**Images.** Shopfront photo for the schema, `og:image` at 1200×630 for WhatsApp
previews, product photos for the category pages.

---

## Do not wait for the above

Google Search Console can be done now — verify `jbtindore.in`, submit
`sitemap.xml`, request indexing. Indexing is the slowest item on your whole list
(4–8 weeks), so start the clock before the copy and photos are finished.
