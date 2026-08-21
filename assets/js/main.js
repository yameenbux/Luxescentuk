/* ============================================================
   LuxeScent UK
   ------------------------------------------------------------
   The whole page is generated from the SCENTS array below.
   Add, remove or reorder a scent and the hero cycler, the
   marquee, the pinned collection, the Note Index, the Scent
   Finder and the quick view all follow.
   Key notes are verbatim from LuxeScent's own scent cards.
   ============================================================ */

const ETSY_SHOP    = "https://www.etsy.com/uk/shop/LuxeScentUK";
const ETSY_LISTING = "https://www.etsy.com/uk/listing/4482755390/";
const INSTAGRAM    = "https://www.instagram.com/luxescentuk";
const PRICE        = "£8.79";

/* family : fresh | woody | amber | sweet  (must match the chips)
   glass  : the tint — drives the drawn bottle, the card wash,
            the hero glow and the collection glow
   pairs  : editorial pairing suggestion — review these
   notes  : verbatim from the scent cards; the Note Index is
            built by splitting this string, so keep the commas   */
const SCENTS = [
  { id:"imperium", name:"Imperium", inspired:"Inspired by Invictus",
    family:["fresh","woody"], glass:"#3D5A8C", pairs:"oud-eminence",
    notes:"Grapefruit, Mandarin Orange, Marine Accord, Gaiac Wood, Patchouli and Ambergris",
    line:"Clean, sporty and bright — a cold-morning kind of fragrance." },

  { id:"aurum", name:"Aurum", inspired:"Inspired by One Million",
    family:["amber","sweet"], glass:"#B07A34", pairs:"ciel-bleu",
    notes:"Blood Mandarin, Woody Cinnamon, Leather, Amber, Peppermint and Patchouli",
    line:"Warm, spiced and unapologetic. Evening driving." },

  { id:"proventus", name:"Proventus", inspired:"Inspired by Creed Aventus",
    family:["woody","fresh"], glass:"#4E7A4A", pairs:"noir",
    notes:"Lemon, Pink Pepper, Apple, Bergamot, Blackcurrant, Pineapple, Jasmine, Patchouli, Birch, Cedarwood, Oakmoss and Musk",
    line:"Fruit over smoke — the most requested blend we make." },

  { id:"noir-bloom", name:"Noir Bloom", inspired:"Inspired by Black Opium",
    family:["sweet"], glass:"#8E4568", pairs:"eris",
    notes:"Pear Accord, Green Mandarin, Jasmine Sambac, Cinnamon Essence, Vanilla Quarter, Black Coffee Accord and Patchouli Heart",
    line:"Coffee, vanilla and white flowers. Rich and close." },

  { id:"eris", name:"Eris", inspired:"Inspired by Olympea",
    family:["sweet","amber"], glass:"#C0925E", pairs:"noir-bloom",
    notes:"Amber, Salted Vanilla, Green Tangerine, Water Jasmine, Ginger Flower, Ambergris and Kashmiri Wood",
    line:"Salted vanilla with a green citrus lift." },

  { id:"oud-eminence", name:"Oud Eminence", inspired:"Inspired by Oud Wood",
    family:["woody","amber"], glass:"#8A4E2A", pairs:"imperium",
    notes:"Agarwood, Cardamom, Pink Pepper, Patchouli, Amber, Oud and Tonka Bean",
    line:"Resinous and quietly opulent. The one people ask about." },

  { id:"noir", name:"Noir", inspired:"Inspired by Armani Code",
    family:["woody","amber"], glass:"#4A5160", pairs:"proventus",
    notes:"Vert de Bergamote, Bergamot Heart, Clary Sage Heart, Resinoid Iris, Tonka Bean and Cedar Wood Heart",
    line:"Iris and tonka over cedar. Tailored, never loud." },

  { id:"efferus", name:"Efferus", inspired:"Inspired by Sauvage",
    family:["fresh","amber"], glass:"#4C6E9E", pairs:"aurum",
    notes:"Reggio di Calabria Bergamot, Papua New Guinean Vanilla Extract, Ambroxan and Lavender",
    line:"Peppery bergamot with a long ambroxan trail." },

  { id:"ciel-bleu", name:"Ciel Bleu", inspired:"Inspired by Bleu de Chanel",
    family:["fresh","woody"], glass:"#3A6E9E", pairs:"efferus",
    notes:"New Caledonian Sandalwood, Grapefruit, Lemon, Amber, Cedar and Tonka Bean",
    line:"Citrus and sandalwood. Crisp, tailored, understated." }
];

const FAMILIES = [
  { key:"fresh", name:"Fresh" },
  { key:"woody", name:"Woody" },
  { key:"amber", name:"Amber & Spice" },
  { key:"sweet", name:"Sweet & Floral" }
];

const byId   = id => SCENTS.find(s => s.id === id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const pad    = n => String(n).padStart(2, "0");

/* ── the drawn bottle ─────────────────────────────────────────
   There is no per-scent photography, so each blend is drawn as
   the actual vessel, tinted to its character.
   ------------------------------------------------------------ */
function vessel(glass, cls = "vessel"){
  const uid = "v" + glass.replace("#","");
  return `
  <svg class="${cls}" viewBox="0 0 120 200" role="img" aria-label="LuxeScent diffuser bottle">
    <defs>
      <linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stop-color="${glass}" stop-opacity=".95"/>
        <stop offset="45%"  stop-color="${glass}" stop-opacity=".58"/>
        <stop offset="100%" stop-color="${glass}" stop-opacity=".95"/>
      </linearGradient>
      <linearGradient id="${uid}c" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2A2620"/><stop offset="55%" stop-color="#100E0A"/>
        <stop offset="100%" stop-color="#231F19"/>
      </linearGradient>
    </defs>
    <path d="M60 6 C40 20 34 34 40 52" fill="none" stroke="#0F0D09" stroke-width="2.4"/>
    <path d="M60 6 C80 20 86 34 80 52" fill="none" stroke="#0F0D09" stroke-width="2.4"/>
    <circle cx="60" cy="12" r="7" fill="#0F0D09"/>
    <rect x="34" y="50" width="52" height="44" fill="url(#${uid}c)"/>
    <rect x="34" y="50" width="52" height="3" fill="#3B372E" opacity=".8"/>
    <rect x="31" y="94" width="58" height="62" fill="url(#${uid})"/>
    <rect x="37" y="101" width="13" height="48" fill="#FFFFFF" opacity=".24"/>
    <rect x="31" y="94" width="58" height="62" fill="none" stroke="#F5EFE3" stroke-opacity=".22"/>
    <ellipse cx="60" cy="166" rx="40" ry="5" fill="#000" opacity=".28"/>
  </svg>`;
}

/* ── collection cards ─────────────────────────────────────── */
const track = document.getElementById("track");
if (track) {
  track.innerHTML = SCENTS.map((s,i) => `
    <article class="card" data-family="${s.family.join(" ")}" data-id="${s.id}"
             data-glass="${s.glass}" style="--c:${s.glass}">
      <span class="card__no">${pad(i+1)} / ${pad(SCENTS.length)}</span>
      <div class="card__vessel">${vessel(s.glass)}</div>
      <h3 class="card__name">${s.name}</h3>
      <p class="card__insp">${s.inspired}</p>
      <p class="card__line">${s.line}</p>
      <p class="card__notes">${s.notes}</p>
      <div class="card__foot">
        <span class="card__price">${PRICE}</span>
        <div class="card__acts">
          <button class="card__quick" data-quick="${s.id}">Details</button>
          <a class="card__shop" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop</a>
        </div>
      </div>
    </article>`).join("");
}

/* ── ticker + dual marquee, built from the range ──────────── */
const tickerBits = [
  "Complimentary UK delivery", "★ 5.0 on Etsy — Star Seller",
  "Every order arrives in a LUXE velvet pouch", "Six to eight weeks of fragrance",
  "Blended by hand in the United Kingdom", "Glass and wood — never plastic"
];
const tickerTop = document.getElementById("tickerTop");
if (tickerTop) {
  const once = tickerBits.map(t => `<span>${t}</span><i>✧</i>`).join("");
  tickerTop.innerHTML = once + once;   // duplicated so the loop is seamless
}

const names = SCENTS.map(s => s.name);
const bandA = document.getElementById("bandA");
const bandB = document.getElementById("bandB");
if (bandA && bandB) {
  const rowA = names.map(n => `<span>${n}</span><i>✧</i>`).join("");
  const rowB = [...names].reverse().map(n => `<span>${n}</span><i>✧</i>`).join("");
  bandA.innerHTML = rowA + rowA;
  bandB.innerHTML = rowB + rowB;
}

/* ── hero: the cycling scent name, tinting the page as it goes ─ */
const cycler = document.getElementById("cycler");
const root   = document.documentElement;
function setTint(hex){ root.style.setProperty("--tint", hex); }

if (cycler && !reduce) {
  let i = -1;
  const cycle = () => {
    i = (i + 1) % SCENTS.length;
    const s = SCENTS[i];
    cycler.innerHTML = `<span class="cycler__word">${s.name}</span>`;
    setTint(s.glass);
  };
  cycle();
  setInterval(cycle, 2600);
}

/* ── hero stat counters ───────────────────────────────────── */
function runCounter(el){
  const literal = el.dataset.literal;
  if (literal){ el.textContent = literal; return; }
  const target   = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const prefix   = el.dataset.prefix || "";
  if (reduce){ el.textContent = prefix + target.toFixed(decimals); return; }
  const start = performance.now(), dur = 1400;
  const step = now => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = prefix + (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── 02 · Note Index ──────────────────────────────────────────
   Split every scent's key-note string into individual notes,
   count how many blends carry each, and size the type by that
   count. Clicking a note filters the collection.
   ------------------------------------------------------------ */
function splitNotes(str){
  return str
    .replace(/\band\b/gi, ",")
    .split(",")
    .map(n => n.trim())
    .filter(Boolean);
}

const noteMap = new Map();          // note → [scent ids]
SCENTS.forEach(s => splitNotes(s.notes).forEach(n => {
  const key = n.toLowerCase();
  if (!noteMap.has(key)) noteMap.set(key, { label:n, ids:[] });
  const entry = noteMap.get(key);
  if (!entry.ids.includes(s.id)) entry.ids.push(s.id);
}));

const cloud    = document.getElementById("cloud");
const cloudOut = document.getElementById("cloudOut");
if (cloud) {
  const entries = [...noteMap.values()].sort((a,b) =>
    b.ids.length - a.ids.length || a.label.localeCompare(b.label));
  cloud.innerHTML = entries.map(e =>
    `<button class="note" data-note="${e.label.toLowerCase()}" data-n="${Math.min(4, e.ids.length)}"
             title="${e.ids.length} blend${e.ids.length > 1 ? "s" : ""}">${e.label}</button>`).join("");
  const total = entries.length;
  const lede = document.querySelector("#notes .lede");
  if (lede) lede.textContent =
    `${total} ingredients across nine fragrances. Choose one and we'll show you every blend that carries it.`;
}

/* ── filtering: shared by the chips and the Note Index ────── */
let activeNote = null;

function visibleCards(){
  return [...track.querySelectorAll(".card:not(.is-hidden)")];
}

function applyFilter({ family = "all", note = null } = {}){
  activeNote = note;
  document.querySelectorAll(".chip").forEach(c =>
    c.classList.toggle("is-active", !note && c.dataset.filter === family));
  document.querySelectorAll(".note").forEach(n =>
    n.classList.toggle("is-on", note === n.dataset.note));

  const ids = note ? noteMap.get(note).ids : null;
  track.querySelectorAll(".card").forEach(card => {
    const s = byId(card.dataset.id);
    const ok = ids ? ids.includes(s.id)
                   : (family === "all" || s.family.includes(family));
    card.classList.toggle("is-hidden", !ok);
    card.classList.toggle("is-match", Boolean(ids) && ok);
  });

  const count = document.getElementById("pinCount");
  if (count) {
    const n = visibleCards().length;
    count.textContent = n === SCENTS.length
      ? `All ${SCENTS.length} fragrances`
      : `${n} of ${SCENTS.length} fragrances`;
  }
  if (cloudOut) {
    cloudOut.textContent = note
      ? `${noteMap.get(note).label} appears in ${ids.length} blend${ids.length > 1 ? "s" : ""}: ` +
        ids.map(id => byId(id).name).join(", ")
      : "";
  }
  layoutPin();
}

document.querySelectorAll(".chip").forEach(chip =>
  chip.addEventListener("click", () => applyFilter({ family: chip.dataset.filter })));

cloud?.addEventListener("click", e => {
  const btn = e.target.closest("[data-note]");
  if (!btn) return;
  const note = btn.dataset.note;
  if (activeNote === note){ applyFilter({ family:"all" }); return; }
  applyFilter({ note });
  document.getElementById("collection").scrollIntoView({ behavior:"smooth", block:"start" });
});

/* ── 01 · the pinned horizontal collection ────────────────────
   The section is made tall; its inner stage sticks for the whole
   height, and the track slides sideways in step with scroll.
   Below 760px, or with reduced motion, the CSS turns it back
   into an ordinary stacked list and this all no-ops.
   ------------------------------------------------------------ */
const pin     = document.getElementById("pin");
const pinBar  = document.getElementById("pinBar");
const pinGlow = document.getElementById("pinGlow");
let pinRange  = 0;

function pinActive(){
  return pin && !reduce && window.matchMedia("(min-width:761px)").matches;
}

function layoutPin(){
  if (!pin) return;
  if (!pinActive()){ pin.style.height = ""; track.style.transform = ""; return; }
  const overflow = Math.max(0, track.scrollWidth - window.innerWidth);
  pinRange = overflow;
  /* a little extra so the last card rests before the section releases */
  pin.style.height = `${window.innerHeight + overflow + window.innerHeight * 0.15}px`;
  onPinScroll();
}

function onPinScroll(){
  if (!pinActive() || !pinRange) return;
  const rect = pin.getBoundingClientRect();
  const travelled = Math.min(Math.max(-rect.top, 0), pinRange);
  const p = pinRange ? travelled / pinRange : 0;
  track.style.transform = `translate3d(${-travelled}px,0,0)`;
  if (pinBar) pinBar.style.width = `${p * 100}%`;

  /* tint the glow to whichever card is nearest the middle */
  const mid = window.innerWidth / 2;
  let best = null, bestD = Infinity;
  visibleCards().forEach(card => {
    const r = card.getBoundingClientRect();
    const d = Math.abs(r.left + r.width / 2 - mid);
    if (d < bestD){ bestD = d; best = card; }
  });
  if (best && pinGlow) root.style.setProperty("--tint", best.dataset.glass);
}

/* ── 03 · longevity meter ─────────────────────────────────── */
function runMeter(){
  const fill = document.getElementById("meterFill");
  const val  = document.getElementById("meterVal");
  if (!fill || !val) return;
  fill.style.width = "100%";
  if (reduce){ val.textContent = "Week 8"; return; }
  const start = performance.now(), dur = 2400;
  const step = now => {
    const t = Math.min(1, (now - start) / dur);
    val.textContent = `Week ${Math.round(t * 8)}`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

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
        <p class="qv__notes" style="margin-top:.9rem">${s.line}</p>
        <div class="qv__block">
          <p class="qv__label">Key notes</p>
          <p class="qv__notes">${s.notes}</p>
        </div>
        <div class="qv__block">
          <p class="qv__label">Choose your glass</p>
          <div class="qv__swatches">
            <span class="qv__sw"><span class="qv__dot qv__dot--clear"></span>Clear</span>
            <span class="qv__sw"><span class="qv__dot qv__dot--dark"></span>Smoked</span>
          </div>
        </div>
        ${p ? `<div class="qv__pair">
          <p class="qv__label">We would pair it with</p>
          <b>${p.name}</b>
          <p class="qv__notes" style="margin-top:.3rem">${p.line}</p>
        </div>` : ""}
        <div class="qv__acts">
          <a class="btn btn--gold" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop ${s.name} — ${PRICE}</a>
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

/* ── 04 · scent finder ────────────────────────────────────── */
const QUESTIONS = [
  { q:"How would you like the car to feel?",
    opts:[
      { label:"Clean and awake",    hint:"Citrus, air, cold mornings",     score:{fresh:2} },
      { label:"Warm and close",     hint:"Spice, leather, evenings",       score:{amber:2} },
      { label:"Grounded",           hint:"Cedar, oud, quiet",              score:{woody:2} },
      { label:"Soft and sweet",     hint:"Vanilla, flowers, comfort",      score:{sweet:2} }
    ]},
  { q:"When do you drive most?",
    opts:[
      { label:"Morning commute",    hint:"Something that wakes you up",    score:{fresh:2, woody:1} },
      { label:"Evenings out",       hint:"Something with presence",        score:{amber:2, sweet:1} },
      { label:"All day, every day", hint:"Something that never tires",     score:{woody:2, fresh:1} },
      { label:"Weekends only",      hint:"Something to look forward to",   score:{sweet:2, amber:1} }
    ]},
  { q:"And the impression you want to leave?",
    opts:[
      { label:"Understated",        hint:"Noticed only up close",          score:{woody:2, fresh:1} },
      { label:"Memorable",          hint:"Someone will ask",               score:{amber:2, woody:1} },
      { label:"Inviting",           hint:"Warm the moment they sit down",  score:{sweet:2, amber:1} },
      { label:"Crisp",              hint:"Like the car was just valeted",  score:{fresh:2} }
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
        <button class="quiz__opt" data-opt="${i}"><b>${o.label}</b><span>${o.hint}</span></button>`).join("")}
    </div>`;
}

function renderResult(){
  quizBar.style.width = "100%";
  quizRestart.hidden = false;
  const best = Object.keys(tally).reduce((a,b) => {
    if (tally[b] > tally[a]) return b;
    if (tally[b] === tally[a] && b === firstPick) return b;
    return a;
  });
  /* Rank every scent against the tally — primary family counts double.
     Where blends tie, rotate on the answer path so the finder stays
     deterministic without always naming the same bottle. */
  const score = s => s.family.reduce((n,f,i) => n + tally[f] * (i === 0 ? 2 : 1), 0);
  const top   = Math.max(...SCENTS.map(score));
  const tied  = SCENTS.filter(s => score(s) === top);
  const match = tied[path.reduce((a,b) => a + b, 0) % tied.length];

  setTint(match.glass);
  quizStage.innerHTML = `
    <p class="quiz__step">Your match</p>
    <div class="result">
      <div class="result__vessel">${vessel(match.glass)}</div>
      <div>
        <p class="result__label">${FAMILIES.find(f => f.key === best).name}</p>
        <h3 class="result__name">${match.name}</h3>
        <p class="result__insp">${match.inspired}</p>
        <p class="result__notes">${match.line}</p>
        <p class="result__notes"><span style="color:var(--ivory)">Key notes:</span> ${match.notes}</p>
        <div class="result__acts">
          <a class="btn btn--gold" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop ${match.name} — ${PRICE}</a>
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
});

quizRestart?.addEventListener("click", () => {
  step = 0; tally = { fresh:0, woody:0, amber:0, sweet:0 }; firstPick = null; path = [];
  renderQuestion();
});
if (quizStage) renderQuestion();

/* ── section progress rail + current nav item ─────────────── */
const SECTIONS = [
  ["hero","Top"], ["collection","Collection"], ["notes","Note Index"],
  ["diffuser","The Diffuser"], ["finder","Scent Finder"], ["gifting","Gifting"],
  ["story","Our Story"], ["faq","FAQ"]
];
const progress = document.getElementById("progress");
if (progress) {
  progress.innerHTML = SECTIONS.map(([id,label],i) =>
    `<a href="#${id}" data-sec="${id}" data-n="${pad(i+1)} ${label}" aria-label="${label}"></a>`).join("");
}

function markCurrent(){
  let current = SECTIONS[0][0];
  SECTIONS.forEach(([id]) => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
  });
  progress?.querySelectorAll("a").forEach(a =>
    a.classList.toggle("is-on", a.dataset.sec === current));
  document.querySelectorAll(".nav a").forEach(a =>
    a.classList.toggle("is-current", a.getAttribute("href") === `#${current}`));
}

/* ── sticky header, drawer, image fallbacks, reveals ──────── */
const header = document.getElementById("header");
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

document.querySelectorAll("img[data-fallback]").forEach(img => {
  const fail = () => {
    const box = img.closest(".media");
    if (box) box.classList.add("is-ph"); else img.hidden = true;
    img.remove();
  };
  if (img.complete && img.naturalWidth === 0) fail();
  img.addEventListener("error", fail, { once:true });
});

/* one-shot triggers: reveals, counters, the meter */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains("reveal")) el.classList.add("is-in");
    if (el.hasAttribute("data-count")) runCounter(el);
    if (el.id === "meter") runMeter();
    io.unobserve(el);
  });
}, { threshold:.25, rootMargin:"0px 0px -40px" });

document.querySelectorAll(".reveal, [data-count], #meter").forEach(el => io.observe(el));

/* ── one scroll handler for everything that tracks scroll ─── */
let ticking = false;
function onScroll(){
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    header.classList.toggle("is-stuck", window.scrollY > 20);
    onPinScroll();
    markCurrent();
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive:true });
window.addEventListener("resize", () => { layoutPin(); markCurrent(); });
window.addEventListener("load", layoutPin);
applyFilter({ family:"all" });   // seeds the count, then lays the track out
markCurrent();

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

document.getElementById("year").textContent = new Date().getFullYear();
