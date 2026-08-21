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

The pinned collection is the only fragile piece: `layoutPin()` measures the
track and sets the section's height, and `onPinScroll()` converts vertical
scroll into horizontal travel. Both re-run on resize and after any filter
change. If you add a very wide card, the section simply gets taller.

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

- **Pinned horizontal collection** — the section holds still while the nine
  blends travel sideways in step with your scroll. The filter chips stay pinned
  above the track, a progress bar tracks position, and the background glow takes
  the colour of whichever blend is nearest the middle. Below 760px, and for
  anyone with reduced motion switched on, it becomes an ordinary stacked list.
- **Note Index** — every ingredient across all nine blends (49 of them),
  extracted from the `notes` strings at load, sized by how many fragrances carry
  it. Click one and the collection filters to the blends containing it. Nothing
  else in this market has this.
- **Rotating hero name** — the headline cycles through the nine fragrance names,
  and the page's accent colour changes with it.
- **Ticker and dual marquee** — a gold offers ticker at the top, and a two-row
  counter-scrolling band of the nine names below the hero, one row outlined and
  one row ghosted.
- **Longevity meter** — an eight-week bar that fills as the section comes into
  view, counting Week 0 → Week 8.
- **Animated stat row** — nine fragrances, 6–8 weeks, 5.0 rating, £8.79.
- **Scent Finder** — three questions, then a matched blend. Every scent is
  scored against the answers (primary family counts double); equally-matched
  blends rotate on the answer path, so the tool doesn't always name the same
  bottle. Deterministic, no randomness.
- **Quick view** — a panel per scent with the full key notes, clear and smoked
  glass options, and a pairing that links straight through to that second
  scent. Closes on Escape, scrim click, or the ×.
- **Numbered navigation** and a **section progress rail** down the right edge.
- Sticky header, accessible focus states, and a `prefers-reduced-motion` path
  that disables every animation above.

## Design notes

Warm near-black ground (`#0D0B09`) with brass (`#C9A961`), inverted to ivory
(`#F5EFE3`) for The Diffuser, Gifting and Our Story so the photography has
somewhere bright to sit. Display type is **Antonio** — the condensed cut that
matches the lettering on the brand's own scent cards and velvet pouch — with
**Jost** for the interface.

Colour comes from the product itself: each blend carries a `glass` value that
drives its drawn bottle, its card wash, the hero glow and the collection glow.
Nine fragrances, nine colours, all derived from one field in the data.

The photography is warm-graded on the way in — the source shots are cool
blue-white marble. The grade is baked into the JPEGs.

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
- [ ] The Note Index lists your wording verbatim, so near-duplicates appear
      separately — "Bergamot" and "Bergamot Heart", "Cedar" / "Cedarwood" /
      "Cedar Wood Heart", "Patchouli" / "Patchouli Heart". Tidy the `notes`
      strings if you want them merged
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
