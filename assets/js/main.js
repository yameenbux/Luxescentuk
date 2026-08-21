/* ============================================================
   LuxeScent UK
   ------------------------------------------------------------
   Everything on the page is generated from the SCENTS array
   below. Add, remove or reorder a scent here and the rail, the
   grid, the Scent Finder and the quick view all follow.
   Key notes are verbatim from LuxeScent's own scent cards.
   ============================================================ */

const ETSY_SHOP    = "https://www.etsy.com/uk/shop/LuxeScentUK";
const ETSY_LISTING = "https://www.etsy.com/uk/listing/4482755390/";
const INSTAGRAM    = "https://www.instagram.com/luxescentuk";
const PRICE        = "£8.79";

/* family : fresh | woody | amber | sweet  (must match the chips)
   glass  : the tint used in the drawn bottle
   pairs  : editorial pairing suggestion — review these
   badge  : optional small label                                */
const SCENTS = [
  { id:"imperium", name:"Imperium", inspired:"Inspired by Invictus",
    family:["fresh","woody"], badge:"Bestseller", glass:"#2E3E5C", pairs:"oud-eminence",
    notes:"Grapefruit, Mandarin Orange, Marine Accord, Gaiac Wood, Patchouli and Ambergris",
    line:"Clean, sporty and bright — a cold-morning kind of fragrance." },

  { id:"aurum", name:"Aurum", inspired:"Inspired by One Million",
    family:["amber","sweet"], glass:"#4A3B2A", pairs:"ciel-bleu",
    notes:"Blood Mandarin, Woody Cinnamon, Leather, Amber, Peppermint and Patchouli",
    line:"Warm, spiced and unapologetic. Evening driving." },

  { id:"proventus", name:"Proventus", inspired:"Inspired by Creed Aventus",
    family:["woody","fresh"], badge:"Bestseller", glass:"#33422F", pairs:"noir",
    notes:"Lemon, Pink Pepper, Apple, Bergamot, Blackcurrant, Pineapple, Jasmine, Patchouli, Birch, Cedarwood, Oakmoss and Musk",
    line:"Fruit over smoke — the most requested blend we make." },

  { id:"noir-bloom", name:"Noir Bloom", inspired:"Inspired by Black Opium",
    family:["sweet"], glass:"#43293A", pairs:"eris",
    notes:"Pear Accord, Green Mandarin, Jasmine Sambac, Cinnamon Essence, Vanilla Quarter, Black Coffee Accord and Patchouli Heart",
    line:"Coffee, vanilla and white flowers. Rich and close." },

  { id:"eris", name:"Eris", inspired:"Inspired by Olympea",
    family:["sweet","amber"], glass:"#4B3E32", pairs:"noir-bloom",
    notes:"Amber, Salted Vanilla, Green Tangerine, Water Jasmine, Ginger Flower, Ambergris and Kashmiri Wood",
    line:"Salted vanilla with a green citrus lift." },

  { id:"oud-eminence", name:"Oud Eminence", inspired:"Inspired by Oud Wood",
    family:["woody","amber"], badge:"Richest", glass:"#3B2A20", pairs:"imperium",
    notes:"Agarwood, Cardamom, Pink Pepper, Patchouli, Amber, Oud and Tonka Bean",
    line:"Resinous and quietly opulent. The one people ask about." },

  { id:"noir", name:"Noir", inspired:"Inspired by Armani Code",
    family:["woody","amber"], glass:"#242830", pairs:"proventus",
    notes:"Vert de Bergamote, Bergamot Heart, Clary Sage Heart, Resinoid Iris, Tonka Bean and Cedar Wood Heart",
    line:"Iris and tonka over cedar. Tailored, never loud." },

  { id:"efferus", name:"Efferus", inspired:"Inspired by Sauvage",
    family:["fresh","amber"], glass:"#31405A", pairs:"aurum",
    notes:"Reggio di Calabria Bergamot, Papua New Guinean Vanilla Extract, Ambroxan and Lavender",
    line:"Peppery bergamot with a long ambroxan trail." },

  { id:"ciel-bleu", name:"Ciel Bleu", inspired:"Inspired by Bleu de Chanel",
    family:["fresh","woody"], glass:"#2A4763", pairs:"efferus",
    notes:"New Caledonian Sandalwood, Grapefruit, Lemon, Amber, Cedar and Tonka Bean",
    line:"Citrus and sandalwood. Crisp, tailored, understated." }
];

const FAMILIES = [
  { key:"fresh", name:"Fresh",          blurb:"Citrus · Marine",   image:"family-fresh.jpg" },
  { key:"woody", name:"Woody",          blurb:"Cedar · Oud",       image:"family-woody.jpg" },
  { key:"amber", name:"Amber & Spice",  blurb:"Leather · Tonka",   image:"family-amber.jpg" },
  { key:"sweet", name:"Sweet & Floral", blurb:"Vanilla · Jasmine", image:"family-sweet.jpg" }
];

const byId = id => SCENTS.find(s => s.id === id);

/* ── the drawn bottle ─────────────────────────────────────────
   There is no per-scent photography, so each scent is shown as
   a line drawing of the actual vessel, tinted to its character.
   ------------------------------------------------------------ */
function vessel(glass, cls = "vessel"){
  const uid = "g" + glass.replace("#","");
  return `
  <svg class="${cls}" viewBox="0 0 120 200" role="img" aria-label="LuxeScent diffuser bottle">
    <defs>
      <linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stop-color="${glass}" stop-opacity=".92"/>
        <stop offset="45%" stop-color="${glass}" stop-opacity=".62"/>
        <stop offset="100%" stop-color="${glass}" stop-opacity=".95"/>
      </linearGradient>
      <linearGradient id="${uid}c" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2A2823"/><stop offset="55%" stop-color="#14130F"/>
        <stop offset="100%" stop-color="#26241E"/>
      </linearGradient>
    </defs>
    <!-- cord -->
    <path d="M60 6 C40 20 34 34 40 52" fill="none" stroke="#14130F" stroke-width="2.4"/>
    <path d="M60 6 C80 20 86 34 80 52" fill="none" stroke="#14130F" stroke-width="2.4"/>
    <circle cx="60" cy="12" r="7" fill="#14130F"/>
    <!-- cap -->
    <rect x="34" y="50" width="52" height="44" fill="url(#${uid}c)"/>
    <rect x="34" y="50" width="52" height="3" fill="#3A372F" opacity=".75"/>
    <!-- glass -->
    <rect x="31" y="94" width="58" height="62" fill="url(#${uid})"/>
    <rect x="37" y="101" width="13" height="48" fill="#FFFFFF" opacity=".22"/>
    <rect x="31" y="94" width="58" height="62" fill="none" stroke="#14130F" stroke-opacity=".28"/>
    <!-- shadow -->
    <ellipse cx="60" cy="166" rx="40" ry="5" fill="#14130F" opacity=".10"/>
  </svg>`;
}

/* ── card markup, shared by the rail and the grid ─────────── */
function cardHTML(s, reveal = true){
  return `
  <article class="card ${reveal ? "reveal" : ""}" data-family="${s.family.join(" ")}" data-id="${s.id}">
    ${s.badge ? `<span class="card__badge">${s.badge}</span>` : ""}
    <div class="card__vessel">${vessel(s.glass)}</div>
    <h3 class="card__name">${s.name}</h3>
    <p class="card__insp">${s.inspired}</p>
    <div class="card__rule"></div>
    <p class="card__notes">${s.notes}</p>
    <div class="card__foot">
      <span class="card__price">${PRICE}</span>
      <div class="card__acts">
        <button class="btn btn--sm card__quick" data-quick="${s.id}">Quick view</button>
        <a class="btn btn--sm btn--solid" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop</a>
      </div>
    </div>
  </article>`;
}

/* ── render: rail, grid, families ─────────────────────────── */
const rail = document.getElementById("rail");
if (rail) rail.innerHTML = SCENTS.map(s => cardHTML(s, false)).join("");

const grid = document.getElementById("grid");
if (grid) grid.innerHTML = SCENTS.map(s => cardHTML(s)).join("");

const famGrid = document.getElementById("families-grid");
if (famGrid) {
  famGrid.innerHTML = FAMILIES.map(f => `
    <a class="family reveal" href="#collection" data-family-link="${f.key}">
      <div class="family__media media" data-ph="${f.name}">
        <img src="assets/images/${f.image}" alt="${f.name} fragrances" loading="lazy" data-fallback>
      </div>
      <h3>${f.name}</h3>
      <p>${f.blurb}</p>
    </a>`).join("");
}

/* ── image fallback → labelled block ──────────────────────── */
function wireFallbacks(root = document){
  root.querySelectorAll("img[data-fallback]").forEach(img => {
    const fail = () => {
      const box = img.closest(".media");
      if (box) box.classList.add("is-ph"); else img.hidden = true;
      img.remove();
    };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail, { once:true });
  });
}
wireFallbacks();

/* ── filters ──────────────────────────────────────────────── */
function applyFilter(key){
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("is-active", c.dataset.filter === key));
  grid?.querySelectorAll(".card").forEach(card => {
    const match = key === "all" || card.dataset.family.split(" ").includes(key);
    card.classList.toggle("is-hidden", !match);
  });
}
document.querySelectorAll(".chip").forEach(chip =>
  chip.addEventListener("click", () => applyFilter(chip.dataset.filter)));

/* family tile → jump to the collection with that filter applied */
document.querySelectorAll("[data-family-link]").forEach(a =>
  a.addEventListener("click", () => applyFilter(a.dataset.familyLink)));

/* ── favourites rail arrows ───────────────────────────────── */
document.querySelectorAll("[data-rail]").forEach(btn =>
  btn.addEventListener("click", () => {
    const step = rail.clientWidth * 0.8 * Number(btn.dataset.rail);
    rail.scrollBy({ left: step, behavior: "smooth" });
  }));

/* ── quick view ───────────────────────────────────────────── */
const modal     = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
let lastFocus = null;

function openQuick(id){
  const s = byId(id); if (!s) return;
  const p = byId(s.pairs);
  modalBody.innerHTML = `
    <div class="qv">
      <div class="qv__vessel">${vessel(s.glass)}</div>
      <div>
        <h2 class="qv__name" id="modalName">${s.name}</h2>
        <p class="qv__insp">${s.inspired}</p>
        <p class="qv__notes" style="margin-top:1rem">${s.line}</p>

        <div class="qv__block">
          <p class="qv__label">Key notes</p>
          <p class="qv__notes">${s.notes}</p>
        </div>

        <div class="qv__block">
          <p class="qv__label">Choose your glass</p>
          <div class="qv__swatches">
            <span class="qv__sw"><span class="qv__dot qv__dot--clear"></span>Clear</span>
            <span class="qv__sw"><span class="qv__dot qv__dot--dark"></span>Dark</span>
          </div>
        </div>

        ${p ? `<div class="qv__pair">
          <p class="qv__label">We would pair it with</p>
          <b>${p.name}</b>
          <p class="qv__notes" style="margin-top:.3rem">${p.line}</p>
        </div>` : ""}

        <div class="qv__acts">
          <a class="btn btn--solid" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop ${s.name} — ${PRICE}</a>
          ${p ? `<button class="link-u" data-quick="${p.id}">View ${p.name}</button>` : ""}
        </div>
      </div>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal__x").focus();
}

function closeQuick(){
  modal.hidden = true;
  document.body.style.overflow = "";
  lastFocus?.focus();
}

document.addEventListener("click", e => {
  const q = e.target.closest("[data-quick]");
  if (q){ lastFocus = q; openQuick(q.dataset.quick); return; }
  if (e.target.closest("[data-close]")) closeQuick();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) closeQuick();
});

/* ── scent finder ─────────────────────────────────────────────
   Three questions, each option weighting one or two families.
   The highest-scoring family wins; ties fall to the first
   answer given, so the result is always deterministic.
   ------------------------------------------------------------ */
const QUESTIONS = [
  { q:"How would you like the car to feel?",
    opts:[
      { label:"Clean and awake",  hint:"Citrus, air, cold mornings",  score:{fresh:2} },
      { label:"Warm and close",   hint:"Spice, leather, evenings",    score:{amber:2} },
      { label:"Grounded",         hint:"Cedar, oud, quiet",           score:{woody:2} },
      { label:"Soft and sweet",   hint:"Vanilla, flowers, comfort",   score:{sweet:2} }
    ]},
  { q:"When do you drive most?",
    opts:[
      { label:"Morning commute",  hint:"Something that wakes you up", score:{fresh:2, woody:1} },
      { label:"Evenings out",     hint:"Something with presence",     score:{amber:2, sweet:1} },
      { label:"All day, every day", hint:"Something that never tires", score:{woody:2, fresh:1} },
      { label:"Weekends only",    hint:"Something you look forward to", score:{sweet:2, amber:1} }
    ]},
  { q:"And the impression you want to leave?",
    opts:[
      { label:"Understated",      hint:"Noticed only up close",       score:{woody:2, fresh:1} },
      { label:"Memorable",        hint:"Someone will ask",            score:{amber:2, woody:1} },
      { label:"Inviting",         hint:"Warm the moment they sit down", score:{sweet:2, amber:1} },
      { label:"Crisp",            hint:"Like the car was just valeted", score:{fresh:2} }
    ]}
];

const quizStage   = document.getElementById("quizStage");
const quizBar     = document.getElementById("quizBar");
const quizRestart = document.getElementById("quizRestart");
let step = 0, tally = { fresh:0, woody:0, amber:0, sweet:0 }, firstPick = null, path = [];

function renderQuestion(){
  const item = QUESTIONS[step];
  quizBar.style.width = `${(step / QUESTIONS.length) * 100}%`;
  quizRestart.hidden = step === 0;
  quizStage.innerHTML = `
    <p class="quiz__step">Question ${step + 1} of ${QUESTIONS.length}</p>
    <h3 class="quiz__q">${item.q}</h3>
    <div class="quiz__opts">
      ${item.opts.map((o,i) => `
        <button class="quiz__opt" data-opt="${i}">
          <b>${o.label}</b><span>${o.hint}</span>
        </button>`).join("")}
    </div>`;
}

function renderResult(){
  quizBar.style.width = "100%";
  quizRestart.hidden = false;

  /* Rank every scent against the tally rather than just picking the
     leading family — the primary family counts double, so nine
     answer paths can land on nine different blends. */
  const best = Object.keys(tally).reduce((a,b) => {
    if (tally[b] > tally[a]) return b;
    if (tally[b] === tally[a] && b === firstPick) return b;
    return a;
  });
  const score = s => s.family.reduce((n,f,i) => n + tally[f] * (i === 0 ? 2 : 1), 0);
  const top    = Math.max(...SCENTS.map(score));
  const tied   = SCENTS.filter(s => score(s) === top);
  /* Several blends can match a profile equally well. Rotate between them
     using the answer path, so the finder stays deterministic but does not
     always name the same bottle. */
  const match  = tied[path.reduce((a,b) => a + b, 0) % tied.length];

  quizStage.innerHTML = `
    <p class="quiz__step">Your match</p>
    <div class="result">
      <div class="result__vessel">${vessel(match.glass)}</div>
      <div>
        <p class="result__label">${FAMILIES.find(f => f.key === best).name}</p>
        <h3 class="result__name">${match.name}</h3>
        <p class="result__insp">${match.inspired}</p>
        <p class="result__notes">${match.line}</p>
        <p class="result__notes"><strong style="font-weight:400;color:var(--ink)">Key notes:</strong> ${match.notes}</p>
        <div class="result__acts">
          <a class="btn btn--solid" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop ${match.name} — ${PRICE}</a>
          <button class="link-u" data-quick="${match.id}">Full details</button>
        </div>
      </div>
    </div>`;
}

quizStage?.addEventListener("click", e => {
  const btn = e.target.closest("[data-opt]");
  if (!btn) return;
  const chosen = QUESTIONS[step].opts[Number(btn.dataset.opt)];
  Object.entries(chosen.score).forEach(([k,v]) => tally[k] += v);
  path.push(Number(btn.dataset.opt));
  if (firstPick === null) firstPick = Object.keys(chosen.score)[0];
  step++;
  step < QUESTIONS.length ? renderQuestion() : renderResult();
  document.getElementById("finder").scrollIntoView({ behavior:"smooth", block:"center" });
});

quizRestart?.addEventListener("click", () => {
  step = 0; tally = { fresh:0, woody:0, amber:0, sweet:0 }; firstPick = null; path = [];
  renderQuestion();
});

if (quizStage) renderQuestion();

/* ── sticky header ────────────────────────────────────────── */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 20);
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
  burger.setAttribute("aria-expanded","false");
}));

/* ── announcement rotator ─────────────────────────────────── */
const msgs = [...document.querySelectorAll("#announce span")];
let ann = 0, annTimer;
function showAnn(i){
  msgs.forEach(m => m.classList.remove("is-on"));
  ann = (i + msgs.length) % msgs.length;
  msgs[ann].classList.add("is-on");
}
if (msgs.length){
  showAnn(0);
  annTimer = setInterval(() => showAnn(ann + 1), 4600);
  document.querySelectorAll("[data-ann]").forEach(b =>
    b.addEventListener("click", () => {
      clearInterval(annTimer);
      showAnn(ann + Number(b.dataset.ann));
      annTimer = setInterval(() => showAnn(ann + 1), 4600);
    }));
}

/* ── reveal on scroll ─────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); } });
}, { threshold:.08, rootMargin:"0px 0px -40px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* ── signup (not yet connected to a provider) ─────────────── */
const form = document.getElementById("signup");
form?.addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("signupMsg");
  const email = document.getElementById("email");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  msg.textContent = ok
    ? "Thank you — you are on the list. (Demo only: connect a mail provider to store this.)"
    : "Please enter a valid email address.";
  if (ok) form.reset();
});

/* ── footer year ──────────────────────────────────────────── */
document.getElementById("year").textContent = new Date().getFullYear();
