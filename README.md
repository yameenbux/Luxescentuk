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

Two reference sites set the direction: one for the editorial half (warm white
ground, deep navy type, giant rotated display type, arch-masked photography),
one for the commercial half (a rounded gradient stage with the product standing
through the headline, and a shelf of dome-topped product cards along the bottom).

The **arch** is the signature shape — the hero shelf, all nine collection cards,
every image frame and the quick-view panel use the same `--arch` radius token.
Change that one value and the whole site changes shape.

Palette: warm white `#F7F5F0`, deep navy `#1F3A5F`, sand `#EFE9DC`. The colour
comes from the product rather than a brand palette — each blend carries a
`glass` value and a two-stop `grad`, so the hero and the Scent Finder are
literally tinted by whichever fragrance is on screen. Type is **Jost**
throughout, 200 to 700; hierarchy is weight and scale, not a second family.

**The bottle is drawn, not photographed.** There is no cut-out product shot in
the set, and a hero like this needs one with a transparent background. The SVG
in `vessel()` draws the actual vessel — blackened wood cap, woven cord, tinted
glass with a liquid level and highlights — and takes the tint of whichever blend
it represents. It scales to any size and weighs nothing. If you ever shoot the
range cut out on white, that is the single asset that would upgrade this page
most.

The photography is warm-graded on the way in; the grade is baked into the JPEGs.

One layout note worth knowing: grid columns are declared `minmax(0,1fr)` rather
than `1fr` wherever a child can be wider than its column (the hero shelf, the
editorial type). A plain `1fr` takes its minimum from the widest child and blows
the column out — that is what caused a horizontal-overflow bug on mobile.

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
