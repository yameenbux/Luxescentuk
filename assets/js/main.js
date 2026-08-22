/* ============================================================
   LuxeScent UK
   ------------------------------------------------------------
   Everything on the page is generated from the SCENTS array.
   Add, remove or reorder a scent and the hero carousel, the
   arch cards, the Note Index, the Scent Finder and the quick
   view all follow.
   Key notes are verbatim from LuxeScent's own scent cards.
   ============================================================ */

const ETSY_SHOP    = "https://www.etsy.com/uk/shop/LuxeScentUK";
const ETSY_LISTING = "https://www.etsy.com/uk/listing/4482755390/";
const INSTAGRAM    = "https://www.instagram.com/luxescentuk";
const PRICE        = "£8.79";

/* family : fresh | woody | amber | sweet  (must match the chips)
   glass  : the tint — the drawn bottle, the arch wash, the hero
   grad   : [from, to] — the hero gradient for this scent
   pairs  : editorial pairing suggestion — review these
   notes  : verbatim from the scent cards. The Note Index is built
            by splitting this string, so keep the commas.        */
const SCENTS = [
  { id:"imperium", name:"Imperium", inspired:"Inspired by Invictus",
    family:["fresh","woody"], glass:"#3D5A8C", grad:["#C8D4E4","#5D7BA6"], pairs:"oud-eminence",
    notes:"Grapefruit, Mandarin Orange, Marine Accord, Gaiac Wood, Patchouli and Ambergris",
    line:"Clean, sporty and bright — a cold-morning kind of fragrance." },

  { id:"aurum", name:"Aurum", inspired:"Inspired by One Million",
    family:["amber","sweet"], glass:"#B07A34", grad:["#E4D3A8","#A6874A"], pairs:"ciel-bleu",
    notes:"Blood Mandarin, Woody Cinnamon, Leather, Amber, Peppermint and Patchouli",
    line:"Warm, spiced and unapologetic. Evening driving." },

  { id:"proventus", name:"Proventus", inspired:"Inspired by Creed Aventus",
    family:["woody","fresh"], glass:"#4E7A4A", grad:["#CFDCC4","#6E8F62"], pairs:"noir",
    notes:"Lemon, Pink Pepper, Apple, Bergamot, Blackcurrant, Pineapple, Jasmine, Patchouli, Birch, Cedarwood, Oakmoss and Musk",
    line:"Fruit over smoke — the most requested blend we make." },

  { id:"noir-bloom", name:"Noir Bloom", inspired:"Inspired by Black Opium",
    family:["sweet"], glass:"#8E4568", grad:["#DFC6D2","#8E5B75"], pairs:"eris",
    notes:"Pear Accord, Green Mandarin, Jasmine Sambac, Cinnamon Essence, Vanilla Quarter, Black Coffee Accord and Patchouli Heart",
    line:"Coffee, vanilla and white flowers. Rich and close." },

  { id:"eris", name:"Eris", inspired:"Inspired by Olympea",
    family:["sweet","amber"], glass:"#C0925E", grad:["#EEDDC4","#B99A6C"], pairs:"noir-bloom",
    notes:"Amber, Salted Vanilla, Green Tangerine, Water Jasmine, Ginger Flower, Ambergris and Kashmiri Wood",
    line:"Salted vanilla with a green citrus lift." },

  { id:"oud-eminence", name:"Oud Eminence", inspired:"Inspired by Oud Wood",
    family:["woody","amber"], glass:"#8A4E2A", grad:["#E0C9B4","#9A6941"], pairs:"imperium",
    notes:"Agarwood, Cardamom, Pink Pepper, Patchouli, Amber, Oud and Tonka Bean",
    line:"Resinous and quietly opulent. The one people ask about." },

  { id:"noir", name:"Noir", inspired:"Inspired by Armani Code",
    family:["woody","amber"], glass:"#4A5160", grad:["#CFD3DA","#616978"], pairs:"proventus",
    notes:"Vert de Bergamote, Bergamot Heart, Clary Sage Heart, Resinoid Iris, Tonka Bean and Cedar Wood Heart",
    line:"Iris and tonka over cedar. Tailored, never loud." },

  { id:"efferus", name:"Efferus", inspired:"Inspired by Sauvage",
    family:["fresh","amber"], glass:"#4C6E9E", grad:["#CBD8E6","#6A87AB"], pairs:"aurum",
    notes:"Reggio di Calabria Bergamot, Papua New Guinean Vanilla Extract, Ambroxan and Lavender",
    line:"Peppery bergamot with a long ambroxan trail." },

  { id:"ciel-bleu", name:"Ciel Bleu", inspired:"Inspired by Bleu de Chanel",
    family:["fresh","woody"], glass:"#3A6E9E", grad:["#C7DAE8","#5A87AE"], pairs:"efferus",
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
const root   = document.documentElement;

/* ── the drawn bottle ─────────────────────────────────────────
   There is no cut-out product photography, so the vessel is
   drawn: blackened wood cap, woven cord, tinted glass with a
   liquid level and highlights. Scales to any size.
   ------------------------------------------------------------ */
function vessel(glass, cls = "vessel"){
  const uid = "v" + glass.replace("#","");
  return `
  <svg class="${cls}" viewBox="0 0 200 330" role="img" aria-label="LuxeScent car diffuser">
    <defs>
      <linearGradient id="${uid}g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stop-color="${glass}" stop-opacity=".97"/>
        <stop offset="36%"  stop-color="${glass}" stop-opacity=".74"/>
        <stop offset="70%"  stop-color="${glass}" stop-opacity=".9"/>
        <stop offset="100%" stop-color="${glass}" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="${uid}c" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#33302A"/>
        <stop offset="22%"  stop-color="#17150F"/>
        <stop offset="78%"  stop-color="#100E09"/>
        <stop offset="100%" stop-color="#2B2822"/>
      </linearGradient>
      <linearGradient id="${uid}l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#FFFFFF" stop-opacity=".55"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity=".05"/>
      </linearGradient>
    </defs>

    <!-- cord + bead -->
    <path d="M100 14 C64 34 52 62 62 88" fill="none" stroke="#171309" stroke-width="7" stroke-linecap="round"/>
    <path d="M100 14 C136 34 148 62 138 88" fill="none" stroke="#171309" stroke-width="7" stroke-linecap="round"/>
    <circle cx="100" cy="18" r="13" fill="#171309"/>
    <circle cx="96" cy="14" r="3" fill="#3A362C" opacity=".7"/>

    <!-- blackened wood cap -->
    <rect x="57" y="84" width="86" height="72" rx="3" fill="url(#${uid}c)"/>
    <rect x="57" y="84" width="86" height="5" rx="2" fill="#45402F" opacity=".85"/>
    <g stroke="#4A4436" stroke-width=".8" opacity=".28">
      <line x1="66" y1="96" x2="66" y2="150"/><line x1="82" y1="94" x2="82" y2="152"/>
      <line x1="104" y1="96" x2="104" y2="150"/><line x1="124" y1="94" x2="124" y2="152"/>
    </g>

    <!-- glass vessel -->
    <rect x="52" y="156" width="96" height="104" rx="4" fill="url(#${uid}g)"/>
    <!-- liquid level -->
    <path d="M56 186 h88 v70 a4 4 0 0 1 -4 4 h-80 a4 4 0 0 1 -4 -4 z" fill="${glass}" opacity=".55"/>
    <path d="M56 186 h88" stroke="#FFFFFF" stroke-opacity=".38" stroke-width="1.4"/>
    <!-- highlights -->
    <rect x="61" y="164" width="15" height="86" rx="3" fill="url(#${uid}l)"/>
    <rect x="130" y="170" width="7" height="74" rx="3" fill="#FFFFFF" opacity=".16"/>
    <rect x="52" y="156" width="96" height="104" rx="4" fill="none" stroke="#0F0D08" stroke-opacity=".22"/>

    <!-- ground shadow -->
    <ellipse cx="100" cy="276" rx="62" ry="9" fill="#1A2438" opacity=".16"/>
  </svg>`;
}

/* ── ticker ───────────────────────────────────────────────── */
const tickerBits = [
  "Complimentary UK delivery", "★ 5.0 on Etsy — Star Seller",
  "Every order arrives in a LUXE velvet pouch", "Six to eight weeks of fragrance",
  "Blended by hand in the United Kingdom", "Glass and wood — never plastic"
];
const tickerTop = document.getElementById("tickerTop");
if (tickerTop) {
  const once = tickerBits.map(t => `<span>${t}</span><i>✦</i>`).join("");
  tickerTop.innerHTML = once + once;      // duplicated so the loop is seamless
}

const bandRow = document.getElementById("bandRow");
if (bandRow) {
  const once = SCENTS.map(s => `<span>${s.name}</span><i>✦</i>`).join("");
  bandRow.innerHTML = once + once;
}

/* ── HERO carousel ────────────────────────────────────────────
   One scent at a time: the gradient, the drawn bottle, the
   descriptor and the shelf below all change together.
   ------------------------------------------------------------ */
const heroStage = document.getElementById("heroStage");
const heroName  = document.getElementById("heroName");
const heroLine  = document.getElementById("heroLine");
const heroInsp  = document.getElementById("heroInsp");
const heroNotes = document.getElementById("heroNotes");
const heroDots  = document.getElementById("heroDots");
const heroShelf = document.getElementById("heroShelf");
const heroShop  = document.getElementById("heroShop");
let heroIx = 0, heroTimer = null;

function paintHero(i, userDriven = false){
  heroIx = (i + SCENTS.length) % SCENTS.length;
  const s = SCENTS[heroIx];

  root.style.setProperty("--g1", s.grad[0]);
  root.style.setProperty("--g2", s.grad[1]);
  root.style.setProperty("--tint", s.glass);

  if (heroStage){
    heroStage.innerHTML = vessel(s.glass, "vessel hero__bottle");
  }
  if (heroName){
    heroName.textContent = s.name;
    heroName.classList.remove("is-in"); void heroName.offsetWidth; heroName.classList.add("is-in");
  }
  if (heroInsp)  heroInsp.textContent  = s.inspired;
  if (heroLine)  heroLine.textContent  = s.line;
  if (heroNotes) heroNotes.textContent = s.notes;
  if (heroShop)  heroShop.setAttribute("aria-label", `Shop ${s.name} on Etsy`);

  heroDots?.querySelectorAll("button").forEach((b,ix) =>
    b.setAttribute("aria-current", String(ix === heroIx)));
  heroShelf?.querySelectorAll(".shelf__item").forEach((el,ix) =>
    el.classList.toggle("is-on", ix === heroIx));

  if (userDriven) restartHero();
}

function restartHero(){
  clearInterval(heroTimer);
  if (!reduce) heroTimer = setInterval(() => paintHero(heroIx + 1), 5200);
}

if (heroDots){
  heroDots.innerHTML = SCENTS.map((s,i) =>
    `<button data-go="${i}" aria-label="Show ${s.name}"><span></span></button>`).join("");
  heroDots.addEventListener("click", e => {
    const b = e.target.closest("[data-go]");
    if (b) paintHero(Number(b.dataset.go), true);
  });
}

if (heroShelf){
  heroShelf.innerHTML = SCENTS.map((s,i) => `
    <button class="shelf__item" data-go="${i}" style="--c:${s.glass}">
      <span class="shelf__arch">${vessel(s.glass)}</span>
      <span class="shelf__name">${s.name}</span>
      <span class="shelf__price">${PRICE}</span>
    </button>`).join("");
  heroShelf.addEventListener("click", e => {
    const b = e.target.closest("[data-go]");
    if (b) paintHero(Number(b.dataset.go), true);
  });
}

document.querySelectorAll("[data-hero-step]").forEach(btn =>
  btn.addEventListener("click", () => paintHero(heroIx + Number(btn.dataset.heroStep), true)));

/* full key notes and the pairing suggestion live in the quick view */
document.getElementById("heroDetails")?.addEventListener("click", e => {
  lastFocus = e.currentTarget;
  openQuick(SCENTS[heroIx].id);
});

paintHero(0);
restartHero();

/* ── longevity meter ──────────────────────────────────────── */
function runMeter(){
  const fill = document.getElementById("meterFill");
  const val  = document.getElementById("meterVal");
  if (!fill || !val) return;
  fill.style.width = "100%";
  if (reduce){ val.textContent = "Week 8"; return; }
  const start = performance.now(), dur = 2200;
  const step = now => {
    const t = Math.min(1, (now - start) / dur);
    val.textContent = `Week ${Math.round(t * 8)}`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── stat counters ────────────────────────────────────────── */
function runCounter(el){
  const literal = el.dataset.literal;
  if (literal){ el.textContent = literal; return; }
  const target   = Number(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const prefix   = el.dataset.prefix || "";
  if (reduce){ el.textContent = prefix + target.toFixed(decimals); return; }
  const start = performance.now(), dur = 1300;
  const step = now => {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = prefix + (target * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
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
      <div class="qv__arch" style="--c:${s.glass}">${vessel(s.glass)}</div>
      <div>
        <h2 class="qv__name" id="modalName">${s.name}</h2>
        <p class="qv__insp">${s.inspired}</p>
        <p class="qv__line">${s.line}</p>
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
          <p class="qv__notes">${p.line}</p>
        </div>` : ""}
        <div class="qv__acts">
          <a class="pill pill--lg" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop ${s.name} — ${PRICE}</a>
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

/* ── scent finder ─────────────────────────────────────────── */
const QUESTIONS = [
  { q:"How would you like the car to feel?",
    opts:[
      { label:"Clean and awake",    hint:"Citrus, air, cold mornings",   score:{fresh:2} },
      { label:"Warm and close",     hint:"Spice, leather, evenings",     score:{amber:2} },
      { label:"Grounded",           hint:"Cedar, oud, quiet",            score:{woody:2} },
      { label:"Soft and sweet",     hint:"Vanilla, flowers, comfort",    score:{sweet:2} }
    ]},
  { q:"When do you drive most?",
    opts:[
      { label:"Morning commute",    hint:"Something that wakes you up",  score:{fresh:2, woody:1} },
      { label:"Evenings out",       hint:"Something with presence",      score:{amber:2, sweet:1} },
      { label:"All day, every day", hint:"Something that never tires",   score:{woody:2, fresh:1} },
      { label:"Weekends only",      hint:"Something to look forward to", score:{sweet:2, amber:1} }
    ]},
  { q:"And the impression you want to leave?",
    opts:[
      { label:"Understated",        hint:"Noticed only up close",        score:{woody:2, fresh:1} },
      { label:"Memorable",          hint:"Someone will ask",             score:{amber:2, woody:1} },
      { label:"Inviting",           hint:"Warm the moment they sit down",score:{sweet:2, amber:1} },
      { label:"Crisp",              hint:"Like the car was just valeted",score:{fresh:2} }
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
      ${item.opts.map((o,i) =>
        `<button class="quiz__opt" data-opt="${i}"><b>${o.label}</b><span>${o.hint}</span></button>`).join("")}
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
  /* every scent scored against the tally; primary family counts double.
     Ties rotate on the answer path — deterministic, but not always the
     same bottle. */
  const score = s => s.family.reduce((n,f,i) => n + tally[f] * (i === 0 ? 2 : 1), 0);
  const top   = Math.max(...SCENTS.map(score));
  const tied  = SCENTS.filter(s => score(s) === top);
  const match = tied[path.reduce((a,b) => a + b, 0) % tied.length];

  quizStage.innerHTML = `
    <p class="quiz__step">Your match</p>
    <div class="result">
      <div class="result__arch" style="--c:${match.glass}">${vessel(match.glass)}</div>
      <div>
        <p class="result__label">${FAMILIES.find(f => f.key === best).name}</p>
        <h3 class="result__name">${match.name}</h3>
        <p class="result__insp">${match.inspired}</p>
        <p class="result__line">${match.line}</p>
        <p class="result__notes"><b>Key notes:</b> ${match.notes}</p>
        <div class="result__acts">
          <a class="pill pill--lg" href="${ETSY_LISTING}" target="_blank" rel="noopener">Shop ${match.name} — ${PRICE}</a>
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

/* ── header, drawer, image fallbacks ──────────────────────── */
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

/* ── reveals, counters, meter ─────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains("reveal")) el.classList.add("is-in");
    if (el.hasAttribute("data-count")) runCounter(el);
    if (el.id === "meter") runMeter();
    io.unobserve(el);
  });
}, { threshold:.2, rootMargin:"0px 0px -40px" });
document.querySelectorAll(".reveal, [data-count], #meter").forEach(el => io.observe(el));

/* ── current section in the nav ───────────────────────────── */
const SECTIONS = ["diffuser","finder","gifting","story"];
let ticking = false;
function onScroll(){
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    header.classList.toggle("is-stuck", window.scrollY > 16);
    let current = "";
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
    });
    document.querySelectorAll(".nav a").forEach(a =>
      a.classList.toggle("is-current", a.getAttribute("href") === `#${current}`));
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive:true });
onScroll();

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
