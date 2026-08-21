/* ============================================================
   LuxeScent UK
   ------------------------------------------------------------
   EDIT THE COLLECTION HERE. The grid, the filters and the buy
   links are all generated from the SCENTS array below.
   Key notes are taken verbatim from LuxeScent's own scent cards.
   ============================================================ */

const ETSY_SHOP    = "https://www.etsy.com/uk/shop/LuxeScentUK";
const ETSY_LISTING = "https://www.etsy.com/uk/listing/4482755390/";
const INSTAGRAM    = "https://www.instagram.com/luxescentuk";
const PRICE        = "£8.79";

/* family: fresh | woody | amber | sweet   (must match the chips)
   tint:   the wash behind each tile — keep these subtle          */
const SCENTS = [
  { name:"Imperium", inspired:"Inspired by Invictus", family:["fresh","woody"], badge:"Bestseller",
    notes:"Grapefruit, Mandarin Orange, Marine Accord, Gaiac Wood, Patchouli and Ambergris",
    tint:"rgba(147,162,184,.26)" },

  { name:"Aurum", inspired:"Inspired by One Million", family:["amber","sweet"],
    notes:"Blood Mandarin, Woody Cinnamon, Leather, Amber, Peppermint and Patchouli",
    tint:"rgba(196,150,96,.22)" },

  { name:"Proventus", inspired:"Inspired by Creed Aventus", family:["woody","fresh"], badge:"Bestseller",
    notes:"Lemon, Pink Pepper, Apple, Bergamot, Blackcurrant, Pineapple, Jasmine, Patchouli, Birch, Cedarwood, Oakmoss and Musk",
    tint:"rgba(126,150,132,.22)" },

  { name:"Noir Bloom", inspired:"Inspired by Black Opium", family:["sweet"],
    notes:"Pear Accord, Green Mandarin, Jasmine Sambac, Cinnamon Essence, Vanilla Quarter, Black Coffee Accord and Patchouli Heart",
    tint:"rgba(178,124,150,.22)" },

  { name:"Eris", inspired:"Inspired by Olympea", family:["sweet","amber"],
    notes:"Amber, Salted Vanilla, Green Tangerine, Water Jasmine, Ginger Flower, Ambergris and Kashmiri Wood",
    tint:"rgba(190,166,140,.22)" },

  { name:"Oud Eminence", inspired:"Inspired by Oud Wood", family:["woody","amber"], badge:"Richest",
    notes:"Agarwood, Cardamom, Pink Pepper, Patchouli, Amber, Oud and Tonka Bean",
    tint:"rgba(150,110,84,.24)" },

  { name:"Noir", inspired:"Inspired by Armani Code", family:["woody","amber"],
    notes:"Vert de Bergamote, Bergamot Heart, Clary Sage Heart, Resinoid Iris, Tonka Bean and Cedar Wood Heart",
    tint:"rgba(120,124,136,.24)" },

  { name:"Efferus", inspired:"Inspired by Sauvage", family:["fresh","amber"],
    notes:"Reggio di Calabria Bergamot, Papua New Guinean Vanilla Extract, Ambroxan and Lavender",
    tint:"rgba(134,152,178,.24)" },

  { name:"Ciel Bleu", inspired:"Inspired by Bleu de Chanel", family:["fresh","woody"],
    notes:"New Caledonian Sandalwood, Grapefruit, Lemon, Amber, Cedar and Tonka Bean",
    tint:"rgba(110,140,180,.26)" }
];

/* ── build the grid ───────────────────────────────────────── */
const grid = document.getElementById("grid");
if (grid) {
  grid.innerHTML = SCENTS.map(s => `
    <article class="card reveal" data-family="${s.family.join(" ")}" style="--tint:${s.tint}">
      <span class="card__badge">${s.badge || ""}</span>
      <h3 class="card__name">${s.name}</h3>
      <p class="card__insp">${s.inspired}</p>
      <div class="card__rule"></div>
      <p class="card__notes"><b>Key notes</b>${s.notes}</p>
      <div class="card__foot">
        <span class="card__price">${PRICE}</span>
        <a class="card__buy" href="${ETSY_LISTING}" target="_blank" rel="noopener"
           aria-label="Buy ${s.name} on Etsy">Buy on Etsy</a>
      </div>
    </article>`).join("");
}

/* ── image fallback → labelled placeholder ────────────────── */
function wireFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach(img => {
    const fail = () => {
      const box = img.closest(".media");
      if (box) box.classList.add("is-ph");
      else img.hidden = true;          // e.g. the optional logo file
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
}, { threshold:.1, rootMargin:"0px 0px -40px" });
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
