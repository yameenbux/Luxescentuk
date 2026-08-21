# LuxeScent UK — website

Static site for [LuxeScent UK](https://www.etsy.com/uk/shop/LuxeScentUK) — luxury
car diffusers, handcrafted in the United Kingdom. No build step, no framework,
no dependencies: plain HTML, one stylesheet, one script. Deploys to GitHub Pages
as-is.

Repo: https://github.com/yameenbux/Luxescentuk
Live: https://yameenbux.github.io/Luxescentuk/

## Deploying an update

Unzip these files into the repo root — they replace `index.html`, `assets/` and
`README.md` — then:

```bash
git add -A
git commit -m "Site rebuild"
git push
```

GitHub Pages redeploys in about a minute. Hard-refresh once, since the browser
caches the old stylesheet.

## Structure

```
index.html                 all page markup
assets/css/styles.css      all styling — design tokens in :root at the top
assets/js/main.js          scent data + every interactive feature
assets/images/             brand photography (see images/README.md)
build-preview.py           optional: builds a single-file preview.html
```

## Editing the essentials

| What | Where |
|---|---|
| Scents, key notes, prices, badges, pairings | `SCENTS` array at the top of `assets/js/main.js` |
| Scent Finder questions | `QUESTIONS` array, same file |
| Family names | `FAMILIES` array, same file |
| Etsy / Instagram links, price | constants at the top of `main.js` |
| Colours, fonts, spacing | `:root` block at the top of `styles.css` |
| Copy, FAQ, reviews, footer | directly in `index.html` |

Adding a tenth scent means adding one object to `SCENTS`. The collection grid,
the filters, the quick view and the Scent Finder all pick it up automatically.

## Interactive features

Adapted from the Jo Malone London playbook, rebuilt to work as static files:

- **Scent Finder** — three questions, then a matched blend. Every scent is
  scored against the answers (primary family counts double); equally-matched
  blends rotate on the answer path, so the tool doesn't always name the same
  bottle. Deterministic, no randomness.
- **Quick view** — opens a panel per scent with the full key notes, the clear
  and dark glass options, and a pairing suggestion that links straight through
  to that second scent. Closes on Escape, scrim click, or the ×.
- **Family filters** on the collection — fresh, woody, amber, sweet.
- **Complimentary services strip** — delivery, velvet pouch, made by hand.
- **Rotating announcement bar** with manual arrows.
- Sticky header, scroll reveals, accessible focus states, and a
  `prefers-reduced-motion` path that disables all of it.

## Design notes

The register is a British fragrance house. Warm ivory ground (`#FBF6EC`) with a
sand alternate (`#F2E8D6`), a deep espresso section (`#221A12`) carrying the
Gifting module, and an antique-gold accent (`#A9884F`) on eyebrows, hairlines,
the announcement bar and button hovers. Display type is **Bodoni Moda** — a
Didone, the class of serif the fragrance houses use — with **Jost** for the
interface.

The photography is warm-graded on the way in: the source shots are cool
blue-white marble, which fought the palette and made the page read washed out.
`build-preview.py` is not involved in that — the grade is baked into the JPEGs.

The page is deliberately short. There is no favourites carousel, no quote band
and no scent-families module: the collection is one scroll from the hero, and
repeating it above itself only lengthened the page.

Two decisions worth knowing about:

**The scent cards are drawn, not photographed.** There is no per-scent
photography, and nine identical bottle photos would have looked like a mistake.
Each card carries an SVG line drawing of the actual vessel, tinted to the
character of that blend. It scales perfectly, weighs nothing, and gives all nine
cards a family resemblance. If you shoot per-scent photography later, add an
`image:` field to each object in `SCENTS` and the cards can use it instead.

**The hero photograph is composed.** Your photography is portrait and tight, and
a wide cinematic hero doesn't exist in the set. `hero.jpg` takes the range shot,
sits it low in frame and extends the backdrop upward so the headline has room.
Replace it with a real landscape photograph when you have one.

## Before launch — checklist

- [ ] Replace placeholder review text with verbatim Etsy reviews + first names
- [ ] Set a real contact email in the footer (currently `hello@luxescent.co.uk`)
- [ ] Connect the signup form to Formspree / Mailchimp / Beehiiv
- [ ] Review the `pairs:` suggestions in `SCENTS` — those are editorial
      recommendations written for you, not something you told us
- [ ] Review the `line:` one-liners on each scent for the same reason
- [ ] Add `logo.png` and `favicon.png` if you want them (see images/README.md)
- [ ] Shoot an in-car photograph — the site still has no lifestyle shot
- [ ] Confirm delivery and returns wording matches your Etsy policy
- [ ] Add `privacy.html` and `terms.html` once you collect emails (UK GDPR)

## Note on designer comparisons

Etsy tolerates "inspired by <designer>" listings because Etsy carries the risk.
On your own domain you are the publisher. UK law permits honest comparative
reference to a trademark, but Creed, Chanel, LVMH and L'Oréal all send letters.
This build keeps the comparison out of every product name, sets it in small
type, and carries a disclaimer under the collection and in the footer. That is
mitigation, not immunity.

To remove the exposure entirely, delete the `inspired` field from each scent in
`main.js`; the cards and the quick view are built to close up without it.
