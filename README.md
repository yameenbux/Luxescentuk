# LuxeScent UK — website

Static one-page site for LuxeScent UK (luxury car diffusers). No build step, no
dependencies — plain HTML, CSS and one JS file. Deploys to GitHub Pages as-is.

## Deploy to GitHub Pages

1. Create a new repo (e.g. `luxescent-uk`) and push these files to `main`.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Live in ~1 minute at `https://<username>.github.io/luxescent-uk/`.
4. Custom domain: Settings → Pages → Custom domain, then add a `CNAME` file
   containing the domain and point the DNS `CNAME` record at
   `<username>.github.io`. Tick *Enforce HTTPS*.

## Structure

```
index.html                 all page markup
assets/css/styles.css      all styling — design tokens in :root at the top
assets/js/main.js          scent data + grid, filters, nav, reveals
assets/images/             drop image files here (see images/README.md)
build-preview.py           optional: builds single-file preview.html
```

## Editing the essentials

| What | Where |
|---|---|
| Scents, notes, prices, badges | `SCENTS` array at the top of `assets/js/main.js` |
| Etsy links | `ETSY_SHOP` / `ETSY_LISTING` constants, same file |
| Colours, fonts, spacing | `:root` block at the top of `styles.css` |
| Copy, FAQ, reviews, footer | directly in `index.html` |

Adding a scent = adding one object to `SCENTS`. The card, filter behaviour and
buy link are generated from it.

## Before launch — checklist

- [ ] Add real images (`assets/images/README.md` lists exact filenames)
- [ ] Replace placeholder review text with verbatim Etsy reviews + first names
- [ ] Set a real contact email in the footer (currently `hello@luxescent.co.uk`)
- [ ] Connect the signup form to Formspree / Mailchimp / Beehiiv
- [ ] Confirm delivery + returns wording matches the Etsy policy
- [ ] Have someone check the "inspired by" naming against your risk appetite
      (see note below)
- [ ] Add `privacy.html` and `terms.html` if you start collecting emails (UK GDPR)

## Note on designer comparisons

Etsy tolerates "inspired by <designer>" listings. On your own domain the same
wording is more exposed — comparative reference to a trademark is legal in the
UK only where it is honest and non-misleading. The current build keeps the
comparison in small type, never in the product name, and carries a disclaimer in
the footer and under the collection. If you'd rather de-risk it entirely, delete
the `inspired` field from each scent and describe the notes only.
