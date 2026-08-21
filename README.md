# LuxeScent UK — website

Static one-page site for [LuxeScent UK](https://www.etsy.com/uk/shop/LuxeScentUK)
(luxury car diffusers). No build step, no dependencies, no framework — plain
HTML, CSS and one JS file. Deploys to GitHub Pages as-is.

Repo: https://github.com/yameenbux/Luxescentuk

## Push it live

From the folder containing `index.html`:

```bash
git init
git add .
git commit -m "LuxeScent UK site"
git branch -M main
git remote add origin https://github.com/yameenbux/Luxescentuk.git
git push -u origin main
```

Then: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
Live in about a minute at `https://yameenbux.github.io/Luxescentuk/`.

Custom domain: Settings → Pages → Custom domain, add a `CNAME` file containing
the domain, point the DNS `CNAME` record at `yameenbux.github.io`, tick
*Enforce HTTPS*.

## Structure

```
index.html                 all page markup
assets/css/styles.css      all styling — design tokens in :root at the top
assets/js/main.js          scent data + grid, filters, nav, reveals
assets/images/             brand photography (see images/README.md)
build-preview.py           optional: builds a single-file preview.html
```

## Editing the essentials

| What | Where |
|---|---|
| Scents, key notes, prices, badges | `SCENTS` array at the top of `assets/js/main.js` |
| Etsy / Instagram links | `ETSY_SHOP`, `ETSY_LISTING`, `INSTAGRAM` constants, same file |
| Colours, fonts, spacing | `:root` block at the top of `styles.css` |
| Copy, FAQ, reviews, footer | directly in `index.html` |

Adding a tenth scent means adding one object to `SCENTS` — the tile, the filter
behaviour and the buy link all follow.

## Design notes

Palette and type are pulled from LuxeScent's own assets rather than from any
reference site: marble white ground (`#F7F6F4`), the blackened wood cap as
near-black (`#0B0B0C`), and the smoked navy glass as the accent (`#2E3A4E` /
`#93A2B8`). Display type is **Antonio** — the closest Google Font to the
condensed face on the scent cards and velvet pouch — with **Montserrat** for
body copy.

The nine scent tiles are typographic rather than photographic, mirroring the
brand's own scent cards. That is a deliberate choice: it needs no per-scent
photography and it reads as one system.

## Before launch — checklist

- [ ] Replace placeholder review text with verbatim Etsy reviews + first names
- [ ] Set a real contact email in the footer (currently `hello@luxescent.co.uk`)
- [ ] Connect the signup form to Formspree / Mailchimp / Beehiiv
- [ ] Add `logo.png` and `favicon.png` if you want them (see images/README.md)
- [ ] Shoot an in-car image — the site has no lifestyle shot yet
- [ ] Confirm delivery and returns wording matches your Etsy policy
- [ ] Add `privacy.html` and `terms.html` once you start collecting emails (UK GDPR)
- [ ] Decide how comfortable you are with the "inspired by" naming (below)

## Note on designer comparisons

Etsy tolerates "inspired by <designer>" listings because Etsy carries the risk.
On your own domain you are the publisher. UK law permits honest comparative
reference to a trademark, but Creed, Chanel, LVMH and L'Oréal all send letters.
This build keeps the comparison out of every product name, sets it in small
type, and carries a disclaimer under the collection and in the footer. That is
mitigation, not immunity.

To de-risk it completely, delete the `inspired` field from each scent in
`main.js` and let the key notes speak for themselves — the tiles are designed to
survive that change without a layout gap.
