/* ============================================================
   LuxeScent UK — foundation script
   ------------------------------------------------------------
   EDIT THE COLLECTION HERE. Everything on the page (grid,
   filters, links, images) is generated from the SCENTS array.
   ============================================================ */

const ETSY_SHOP    = "https://www.etsy.com/uk/shop/LuxeScentUK";
const ETSY_LISTING = "https://www.etsy.com/uk/listing/4482755390/";
const PRICE        = "£8.79";

/* family: fresh | woody | amber | sweet   (must match the filter chips)
   image:  file placed in assets/images/  — missing files fall back
           to a labelled placeholder automatically.               */
const SCENTS = [
  { name:"Imperium",     inspired:"Inspired by Invictus",        family:["fresh","amber"], notes:"Grapefruit, sea salt and ambergris — clean, sporty, unmistakably masculine.",  image:"scent-imperium.jpg",  badge:"Bestseller" },
  { name:"Proventus",    inspired:"Inspired by Creed Aventus",   family:["woody","fresh"], notes:"Blackcurrant and bergamot over smoky birch and oakmoss.",                        image:"scent-proventus.jpg", badge:"Bestseller" },
  { name:"Efferus",      inspired:"Inspired by Sauvage",         family:["fresh","amber"], notes:"Bright pepper and bergamot with a warm ambroxan trail.",                         image:"scent-efferus.jpg" },
  { name:"Ciel Bleu",    inspired:"Inspired by Bleu de Chanel",  family:["fresh","woody"], notes:"Citrus, mint and cedar — crisp, tailored, understated.",                         image:"scent-ciel-bleu.jpg" },
  { name:"Aurum",        inspired:"Inspired by One Million",     family:["amber","sweet"], notes:"Blood orange and cinnamon over leather and amber.",                              image:"scent-aurum.jpg" },
  { name:"Oud Eminence", inspired:"Inspired by Oud Wood",        family:["woody"],         notes:"Rare oud, sandalwood and vanilla — deep, resinous, quietly opulent.",            image:"scent-oud.jpg",       badge:"Rich" },
  { name:"Noir",         inspired:"A LuxeScent original",        family:["woody","amber"], notes:"Smoked woods, tonka and black pepper. Our darkest blend.",                       image:"scent-noir.jpg",      badge:"House blend" },
  { name:"Noir Bloom",   inspired:"Inspired by Black Opium",     family:["sweet"],         notes:"Black coffee, white florals and vanilla — warm and addictive.",                   image:"scent-noir-bloom.jpg" },
  { name:"Eris",         inspired:"Inspired by Olympea",         family:["sweet","amber"], notes:"Salted vanilla, jasmine and green mandarin.",                                    image:"scent-eris.jpg" }
];

/* ── build the grid ───────────────────────────────────────── */
const grid = document.getElementById("grid");
if (grid) {
  grid.innerHTML = SCENTS.map(s => `
    <article class="card" data-family="${s.family.join(" ")}">
      <div class="card__media media" data-ph="${s.name}">
        ${s.badge ? `<span class="card__badge">${s.badge}</span>` : ""}
        <img src="assets/images/${s.image}" alt="${s.name} car diffuser" loading="lazy" data-fallback>
      </div>
      <div class="card__body">
        <h3 class="card__name">${s.name}</h3>
        <p class="card__insp">${s.inspired}</p>
        <p class="card__notes">${s.notes}</p>
        <div class="card__foot">
          <span class="card__price">${PRICE}</span>
          <a class="card__buy" href="${ETSY_LISTING}" target="_blank" rel="noopener"
             aria-label="Buy ${s.name} on Etsy">Buy on Etsy</a>
        </div>
      </div>
    </article>`).join("");
}

/* ── image fallback → labelled placeholder ────────────────── */
function wireFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach(img => {
    const fail = () => {
      const box = img.closest(".media");
      if (box) box.classList.add("is-ph");
      else img.hidden = true;          // e.g. the logo
      img.remove();
    };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail, { once:true });
  });
}
wireFallbacks();

/* ── filters ──────────────────────────────────────────────── */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const f = chip.dataset.filter;
    document.querySelectorAll(".card").forEach(card => {
      const match = f === "all" || card.dataset.family.split(" ").includes(f);
      card.classList.toggle("is-hidden", !match);
    });
  });
});

/* ── sticky header state ──────────────────────────────────── */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive:true });

/* ── mobile drawer ────────────────────────────────────────── */
const burger = document.querySelector("[data-menu-toggle]");
const drawer = document.getElementById("drawer");
burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!open));
  drawer.hidden = open;
});
drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  drawer.hidden = true;
  burger.setAttribute("aria-expanded", "false");
}));

/* ── announcement rotator ─────────────────────────────────── */
const msgs = [...document.querySelectorAll("#announce span")];
if (msgs.length) {
  let i = 0;
  msgs[0].classList.add("is-on");
  setInterval(() => {
    msgs[i].classList.remove("is-on");
    i = (i + 1) % msgs.length;
    msgs[i].classList.add("is-on");
  }, 4200);
}

/* ── reveal on scroll ─────────────────────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  });
}, { threshold:.12, rootMargin:"0px 0px -40px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ── signup (not yet connected to a provider) ─────────────── */
const form = document.getElementById("signup");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg   = document.getElementById("signupMsg");
  const email = document.getElementById("email");
  const ok    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  msg.textContent = ok
    ? "Thank you — you're on the list. (Demo only: connect a mail provider to store this.)"
    : "Please enter a valid email address.";
  if (ok) form.reset();
});

/* ── footer year ──────────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();
