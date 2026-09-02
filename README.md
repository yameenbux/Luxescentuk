# LuxeScent UK — website

Static site for [LuxeScent UK](https://www.etsy.com/uk/shop/LuxeScentUK) — designer-inspired
car diffusers in glass and blackened wood, made by hand in Bolton. No build step, no
framework, no dependencies: one HTML file, one stylesheet, one script, two self-hosted
fonts. Deploys to GitHub Pages as-is.

Repo: https://github.com/yameenbux/Luxescentuk
Live: https://yameenbux.github.io/Luxescentuk/

## Deploying an update

```bash
git add -A
git commit -m "Site update"
git push
```

GitHub Pages redeploys in about a minute. Hard-refresh once, since the browser caches
the old stylesheet.

## Structure

```
index.html                 all page markup
assets/css/styles.css      all styling — design tokens in :root at the top
assets/js/main.js          scent data + every interactive feature
assets/fonts/              Archivo + Fraunces, variable, latin subset
assets/images/             brand photography (see images/README.md)
```

## Editing the essentials

| What | Where |
|---|---|
| Scents, key notes, colours, pairings | `SCENTS` array at the top of `assets/js/main.js` |
| Which blend the page opens on | `HERO_START` constant, same file |
| Scent Finder questions | `QUESTIONS` array, same file |
| Etsy / Instagram links, price | constants at the top of `main.js` |
| Colours, fonts, spacing | `:root` block at the top of `styles.css` |
| Copy, FAQ, reviews, footer | directly in `index.html` |

Adding a tenth scent means adding one object to `SCENTS`. The hero, the shelf, the dots,
the quick view and the Scent Finder all pick it up automatically.

## The rebrand — what changed and why

The previous build was warm cream, marble flat-lays and arch-framed photography. It was
well made, but it was branded as a perfume boutique, and there was no car anywhere on the
page. This one moves the brand into the place the product actually lives: **a car interior
after dark.**

Everything follows from that one decision.

- **Ground.** Lacquer black with blue in it — car paint under streetlights — rather than
  warm white. Two light temperatures and only two: sodium amber from outside the glass,
  and the colour of whichever fragrance is loaded.
- **Shape.** The rear-view mirror, drawn once. It was tried as a photo frame too and made
  eggs, so it stays in the hero where it means something.
- **Type.** Fraunces for the fragrance names — warm, slightly wonky, a workshop in Bolton
  rather than a Paris fashion house — against Archivo Expanded for every label and
  control, which is the badge typography of a car.
- **Photography.** The same JPEGs, graded cold and dim so they read as lit plates in a dark
  cabin, warming on hover.

The fonts are served from `assets/fonts/` rather than `fonts.googleapis.com`. That removes
a render-blocking third-party request and stops handing every visitor's IP to Google,
which is worth having on a UK shop that collects email addresses.

## Interactive features

The three moving parts specific to this build all run off **one** `requestAnimationFrame`
loop, which stops when the hero scrolls off screen or the tab is hidden, and never starts
at all under `prefers-reduced-motion`.

- **The pendulum.** The diffuser hangs from the mirror on a real damped pendulum,
  integrated at a fixed 60Hz step so it behaves the same on a 144Hz monitor. You can grab
  it and throw it — the release carries your momentum. Scrolling leans it the way taking a
  bend would, and two detuned sine waves stand in for road vibration so it never looks
  looped.
- **The diffusion.** Pressing the bottle releases a burst of tinted particles that rise and
  spread. Drawn additively, so overlapping vapour reads as light rather than paint. Rate
  limited to one dose every 620ms — without that, mashing the bottle stacks enough
  particles to white out the whole hero.
- **The road.** Streetlights and oncoming headlights, blurred by speed into horizontal
  streaks. Deliberately slow and low-contrast: atmosphere behind the type, not a
  screensaver.

Plus: a **range gauge** that sweeps E→F and counts to eight weeks, an **instrument cluster**
of counters, the **Scent Finder** (three questions, every scent scored against the answers,
ties rotating on the answer path so it doesn't always name the same bottle — and the
result loads into the hero, so the page's light changes to match), a **quick view** with
the full notes and a pairing, and the nine-blend **shelf**.

The hero auto-advances every 6.4 seconds until you touch anything, then stops for good.

**Performance.** Particle and streak colours are baked into offscreen sprites once and
blitted, rather than building a canvas gradient per particle per frame — that was the one
thing here that would have dropped frames. Particle budget halves below 760px.

## Accessibility

Every animation above is switched off under `prefers-reduced-motion` — the pendulum never
starts, the canvases never draw, the gauge and counters jump to their final values, and
reveals are visible from the start. The bottle is a real `<button>`: Enter or Space
releases the scent. Focus is visible throughout, the quick view closes on Escape and
returns focus, and no interaction is pointer-only.

## Before launch — checklist

- [ ] **Shoot a diffuser hanging from a rear-view mirror, in daylight and at dusk.** The
      whole brand is now built around a car interior and there is still not one photograph
      of the product in a car. The mirror in the hero is drawn. This is the single highest
      value thing you can do for the site.
- [ ] Replace placeholder review text with verbatim Etsy reviews + first names
- [ ] Set a real contact email in the footer (currently `hello@luxescent.co.uk`)
- [ ] Connect the signup form to Formspree / Mailchimp / Beehiiv
- [ ] Review the `pairs:` and `line:` fields in `SCENTS` — those are editorial suggestions
      written for you, not something you told us
- [ ] Add `logo.png` and `favicon.png` if you want them (see images/README.md)
- [ ] Confirm delivery and returns wording matches your Etsy policy
- [ ] Add `privacy.html` and `terms.html` once you collect emails (UK GDPR)

## Note on designer comparisons

Etsy tolerates "inspired by <designer>" listings because Etsy carries the risk. On your own
domain you are the publisher. UK law permits honest comparative reference to a trademark,
but Creed, Chanel, LVMH and L'Oréal all send letters. This build keeps the comparison out
of every product name, sets it in small type, and carries a disclaimer in the footer. That
is mitigation, not immunity.

To remove the exposure entirely, delete the `inspired` field from each scent in `main.js`;
the hero and the quick view are built to close up without it.
