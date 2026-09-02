/* ============================================================
   LuxeScent UK — "Night Drive"
   ------------------------------------------------------------
   Everything on the page is generated from the SCENTS array.
   Add, remove or reorder a scent and the hero, the shelf, the
   quick view and the Scent Finder all follow.

   The three moving parts that are specific to this build:

   1. PENDULUM   the diffuser hangs from the mirror on a real
                 damped pendulum. You can grab it, and scrolling
                 nudges it the way taking a corner would.
   2. DIFFUSION  pressing the bottle releases a burst of tinted
                 particles, and the page's light changes with it.
   3. ROAD       streetlights drifting past behind the glass.

   All three are driven by one requestAnimationFrame loop that
   stops when the hero leaves the screen or the tab is hidden,
   and never starts at all under prefers-reduced-motion.
   ============================================================ */

const ETSY_SHOP    = "https://www.etsy.com/uk/shop/LuxeScentUK";
const ETSY_LISTING = "https://www.etsy.com/uk/listing/4482755390/";
const PRICE        = "£8.79";
/* which blend the hero opens on — Noir's greys sit closest to
   the brand's black. Set to any id in SCENTS. */
const HERO_START   = "noir";

/* family : fresh | woody | amber | sweet  (must match FAMILIES)
   glass  : the tint — the drawn bottle, the cabin light, the mirror
   pairs  : editorial pairing suggestion — review these
   notes  : verbatim from LuxeScent's own scent cards           */
const SCENTS = [
  { id:"imperium", name:"Imperium", inspired:"Inspired by Invictus",
    family:["fresh","woody"], glass:"#5E86C4", pairs:"oud-eminence",
    notes:"Grapefruit, Mandarin Orange, Marine Accord, Gaiac Wood, Patchouli and Ambergris",
    line:"Clean, sporty and bright — a cold-morning kind of fragrance." },

  { id:"aurum", name:"Aurum", inspired:"Inspired by One Million",
    family:["amber","sweet"], glass:"#D9974A", pairs:"ciel-bleu",
    notes:"Blood Mandarin, Woody Cinnamon, Leather, Amber, Peppermint and Patchouli",
    line:"Warm, spiced and unapologetic. Evening driving." },

  { id:"proventus", name:"Proventus", inspired:"Inspired by Creed Aventus",
    family:["woody","fresh"], glass:"#6FA362", pairs:"noir",
    notes:"Lemon, Pink Pepper, Apple, Bergamot, Blackcurrant, Pineapple, Jasmine, Patchouli, Birch, Cedarwood, Oakmoss and Musk",
    line:"Fruit over smoke — the most requested blend we make." },

  { id:"noir-bloom", name:"Noir Bloom", inspired:"Inspired by Black Opium",
    family:["sweet"], glass:"#B85C89", pairs:"eris",
    notes:"Pear Accord, Green Mandarin, Jasmine Sambac, Cinnamon Essence, Vanilla Quarter, Black Coffee Accord and Patchouli Heart",
    line:"Coffee, vanilla and white flowers. Rich and close." },

  { id:"eris", name:"Eris", inspired:"Inspired by Olympea",
    family:["sweet","amber"], glass:"#E0B579", pairs:"noir-bloom",
    notes:"Amber, Salted Vanilla, Green Tangerine, Water Jasmine, Ginger Flower, Ambergris and Kashmiri Wood",
    line:"Salted vanilla with a green citrus lift." },

  { id:"oud-eminence", name:"Oud Eminence", inspired:"Inspired by Oud Wood",
    family:["woody","amber"], glass:"#B96B3A", pairs:"imperium",
    notes:"Agarwood, Cardamom, Pink Pepper, Patchouli, Amber, Oud and Tonka Bean",
    line:"Resinous and quietly opulent. The one people ask about." },

  { id:"noir", name:"Noir", inspired:"Inspired by Armani Code",
    family:["woody","amber"], glass:"#6E7A8E", pairs:"proventus",
    notes:"Vert de Bergamote, Bergamot Heart, Clary Sage Heart, Resinoid Iris, Tonka Bean and Cedar Wood Heart",
    line:"Iris and tonka over cedar. Tailored, never loud." },

  { id:"efferus", name:"Efferus", inspired:"Inspired by Sauvage",
    family:["fresh","amber"], glass:"#5F8AC2", pairs:"aurum",
    notes:"Reggio di Calabria Bergamot, Papua New Guinean Vanilla Extract, Ambroxan and Lavender",
    line:"Peppery bergamot with a long ambroxan trail." },

  { id:"ciel-bleu", name:"Ciel Bleu", inspired:"Inspired by Bleu de Chanel",
    family:["fresh","woody"], glass:"#4D8AC4", pairs:"efferus",
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
const clamp  = (v, a, b) => Math.min(b, Math.max(a, v));
const root   = document.documentElement;

/* rgb triple, so canvas and CSS can share one source of colour */
function rgb(hex){
  const h = hex.replace("#","");
  return [0,2,4].map(i => parseInt(h.slice(i,i+2), 16));
}

/* ── the drawn bottle ─────────────────────────────────────────
   There is no cut-out product photography, so the vessel is
   drawn: blackened wood cap, woven cord, tinted glass with a
   liquid level and highlights. Lit for a dark page — the glass
   carries an inner glow so it reads as backlit rather than
   pasted on. Scales to any size.
   ------------------------------------------------------------ */
let uidN = 0;
function vessel(glass, cls = "vessel"){
  const u = "v" + (uidN++);
  return `
  <svg class="${cls}" viewBox="0 0 160 238" role="img" aria-label="LuxeScent car diffuser">
    <defs>
      <linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"   stop-color="${glass}" stop-opacity=".95"/>
        <stop offset="30%"  stop-color="${glass}" stop-opacity=".46"/>
        <stop offset="68%"  stop-color="${glass}" stop-opacity=".72"/>
        <stop offset="100%" stop-color="${glass}" stop-opacity=".98"/>
      </linearGradient>
      <linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%"   stop-color="#2B2720"/>
        <stop offset="26%"  stop-color="#120F0A"/>
        <stop offset="74%"  stop-color="#0A0805"/>
        <stop offset="100%" stop-color="#231F17"/>
      </linearGradient>
      <linearGradient id="${u}l" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="#FFFFFF" stop-opacity=".42"/>
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity=".03"/>
      </linearGradient>
    </defs>

    <!-- woven cord, looped over the mirror arm -->
    <path d="M80 2 C56 26 48 52 54 76" fill="none" stroke="#12100A" stroke-width="6" stroke-linecap="round"/>
    <path d="M80 2 C104 26 112 52 106 76" fill="none" stroke="#12100A" stroke-width="6" stroke-linecap="round"/>
    <path d="M80 2 C56 26 48 52 54 76" fill="none" stroke="#4A4335" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
    <path d="M80 2 C104 26 112 52 106 76" fill="none" stroke="#4A4335" stroke-width="1.5" stroke-linecap="round" opacity=".8"/>
    <circle cx="80" cy="8" r="8.5" fill="#15120C"/>
    <circle cx="77.5" cy="5.5" r="2.4" fill="#4A4335" opacity=".8"/>

    <!-- blackened wood cap -->
    <rect x="46" y="72" width="68" height="58" rx="3" fill="url(#${u}c)"/>
    <rect x="46" y="72" width="68" height="4" rx="2" fill="#544B39" opacity=".9"/>
    <g stroke="#5A5240" stroke-width=".7" opacity=".3">
      <line x1="54" y1="82" x2="54" y2="125"/><line x1="68" y1="80" x2="68" y2="127"/>
      <line x1="86" y1="82" x2="86" y2="125"/><line x1="102" y1="80" x2="102" y2="127"/>
    </g>
    <rect x="46" y="126" width="68" height="4" rx="2" fill="#0A0805"/>

    <!-- glass vessel -->
    <rect x="41" y="130" width="78" height="96" rx="4" fill="url(#${u}g)"/>
    <!-- oil level -->
    <path d="M45 158 h70 v60 a4 4 0 0 1 -4 4 h-62 a4 4 0 0 1 -4 -4 z" fill="${glass}" opacity=".72"/>
    <path d="M45 158 h70" stroke="#FFFFFF" stroke-opacity=".45" stroke-width="1.2"/>
    <!-- highlights, kept low so the glass reads as glass and not as a bulb -->
    <rect x="49" y="137" width="11" height="80" rx="3" fill="url(#${u}l)"/>
    <rect x="105" y="143" width="5" height="68" rx="2.5" fill="#FFFFFF" opacity=".14"/>
    <rect x="41" y="130" width="78" height="96" rx="4" fill="none" stroke="#FFFFFF" stroke-opacity=".2"/>
    <!-- the cabin light caught on the base -->
    <ellipse cx="80" cy="228" rx="34" ry="4" fill="${glass}" opacity=".3"/>
  </svg>`;
}

/* ── dashboard readout ────────────────────────────────────── */
const tickerBits = [
  "Free UK delivery", "★ 5.0 on Etsy — Star Seller",
  "Every order arrives in a LUXE velvet pouch", "Six to eight weeks per fill",
  "Blended by hand in Bolton", "Glass and wood — never plastic"
];
const tickerRow = document.getElementById("tickerRow");
if (tickerRow){
  const once = tickerBits.map(t => `<span>${t}</span><i>◆</i>`).join("");
  tickerRow.innerHTML = once + once;      // duplicated so the loop is seamless
}

/* ══════════════════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════════════════ */
const heroName  = document.getElementById("heroName");
const heroLine  = document.getElementById("heroLine");
const heroInsp  = document.getElementById("heroInsp");
const heroNotes = document.getElementById("heroNotes");
const heroDots  = document.getElementById("heroDots");
const heroShop  = document.getElementById("heroShop");
const heroHint  = document.getElementById("heroHint");
const bottleArt = document.getElementById("bottleArt");
const shelf     = document.getElementById("shelf");
const shelfCount= document.getElementById("shelfCount");

let heroIx = 0, heroTimer = null, userTookOver = false;

function paintHero(i, userDriven = false){
  heroIx = (i + SCENTS.length) % SCENTS.length;
  const s = SCENTS[heroIx];

  root.style.setProperty("--tint", s.glass);
  tintNow = rgb(s.glass);

  if (bottleArt) bottleArt.innerHTML = vessel(s.glass, "vessel");
  if (heroName){
    heroName.textContent = s.name;
    heroName.classList.remove("is-in"); void heroName.offsetWidth; heroName.classList.add("is-in");
  }
  if (heroInsp)  heroInsp.textContent  = s.inspired.replace(/^inspired by\s*/i, "");
  if (heroLine)  heroLine.textContent  = s.line;
  if (heroNotes) heroNotes.textContent = s.notes;
  if (heroShop){
    heroShop.textContent = `Shop ${s.name} — ${PRICE}`;
    heroShop.setAttribute("aria-label", `Shop ${s.name} on Etsy, ${PRICE}`);
  }
  if (shelfCount) shelfCount.textContent = `${pad(heroIx + 1)} / ${pad(SCENTS.length)}`;

  heroDots?.querySelectorAll("button").forEach((b,ix) =>
    b.setAttribute("aria-current", String(ix === heroIx)));
  shelf?.querySelectorAll(".shelf__item").forEach((el,ix) =>
    el.classList.toggle("is-on", ix === heroIx));

  /* a new blend arrives with a small release, and a nudge on the cord */
  puff(0.55);
  swing.w += 0.55;

  if (userDriven && !userTookOver){
    userTookOver = true;             // stop auto-advancing once they engage
    clearInterval(heroTimer);
  }
}

if (heroDots){
  heroDots.innerHTML = SCENTS.map((s,i) =>
    `<button data-go="${i}" aria-label="Show ${s.name}"><span></span></button>`).join("");
  heroDots.addEventListener("click", e => {
    const b = e.target.closest("[data-go]");
    if (b) paintHero(Number(b.dataset.go), true);
  });
}

if (shelf){
  shelf.innerHTML = SCENTS.map((s,i) => `
    <button class="shelf__item" data-go="${i}" style="--c:${s.glass}">
      <span class="shelf__arch">${vessel(s.glass)}</span>
      <span class="shelf__name">${s.name}</span>
      <span class="shelf__price">${PRICE}</span>
    </button>`).join("");
  shelf.addEventListener("click", e => {
    const b = e.target.closest("[data-go]");
    if (b) paintHero(Number(b.dataset.go), true);
  });
}

document.querySelectorAll("[data-hero-step]").forEach(btn =>
  btn.addEventListener("click", () => paintHero(heroIx + Number(btn.dataset.heroStep), true)));

document.getElementById("heroDetails")?.addEventListener("click", e => {
  lastFocus = e.currentTarget;
  openQuick(SCENTS[heroIx].id);
});

/* ══════════════════════════════════════════════════════════
   1 · THE PENDULUM
   A damped pendulum, integrated at a fixed 60Hz step so it
   behaves the same on a 144Hz monitor. You can drag it; the
   road vibrates it; scrolling leans it the way a corner would.
   ══════════════════════════════════════════════════════════ */
const pend   = document.getElementById("pend");
const bottle = document.getElementById("bottle");
const swing  = { a: 0.16, w: 0 };        // angle (rad), angular velocity

const K       = 13.0;   // gravity / length — sets the period
const DAMP    = 1.05;   // how fast it settles
const MAX_A   = 0.85;   // don't let it wrap over the mirror

let dragging = false, dragId = null, dragPrevA = 0, dragMoved = 0, dragStart = 0;

function pivot(){
  const r = pend.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top };
}

function stepSwing(dt, t){
  if (dragging) return;
  /* road vibration — two detuned sines, so it never looks looped */
  const road = 0.10 * Math.sin(t * 1.13) + 0.06 * Math.sin(t * 2.71 + 1.2);
  const acc  = -K * Math.sin(swing.a) - DAMP * swing.w + road;
  swing.w += acc * dt;
  swing.a  = clamp(swing.a + swing.w * dt, -MAX_A, MAX_A);
}

if (bottle && !reduce){
  bottle.addEventListener("pointerdown", e => {
    dragging = true; dragId = e.pointerId; dragMoved = 0; dragStart = performance.now();
    dragPrevA = swing.a; swing.w = 0;
    bottle.setPointerCapture(dragId);
  });
  bottle.addEventListener("pointermove", e => {
    if (!dragging || e.pointerId !== dragId) return;
    const p  = pivot();
    const dx = e.clientX - p.x, dy = Math.max(24, e.clientY - p.y);
    const a  = clamp(Math.atan2(dx, dy), -MAX_A, MAX_A);
    dragMoved += Math.abs(a - swing.a) * 120;
    swing.w   = (a - dragPrevA) * 26;      // carry the throw into the release
    dragPrevA = a;
    swing.a   = a;
  });
  const release = e => {
    if (!dragging || (e.pointerId != null && e.pointerId !== dragId)) return;
    dragging = false;
    /* a short, still press is a press — release the scent */
    if (dragMoved < 8 && performance.now() - dragStart < 500) puff(1);
  };
  bottle.addEventListener("pointerup", release);
  bottle.addEventListener("pointercancel", release);

  /* keyboard: the button still does the obvious thing */
  bottle.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " "){ e.preventDefault(); puff(1); swing.w += 1.1; }
  });

  /* scrolling leans it, the way the car taking a bend would */
  let lastY = window.scrollY;
  window.addEventListener("scroll", () => {
    const d = window.scrollY - lastY; lastY = window.scrollY;
    swing.w += clamp(-d * 0.004, -0.9, 0.9);
  }, { passive:true });
}

/* ══════════════════════════════════════════════════════════
   2 · THE DIFFUSION
   Pressing the bottle releases tinted particles that rise and
   spread. Drawn additively so overlapping particles read as
   light rather than paint.
   ══════════════════════════════════════════════════════════ */
const sprayC = document.getElementById("spray");
const sctx   = sprayC ? sprayC.getContext("2d") : null;
const parts  = [];
/* fewer particles on a phone — this loop runs on whatever the
   customer is holding, and most of them are holding a phone */
const MAX_PARTS = innerWidth < 760 ? 90 : 190;
let tintNow = rgb(SCENTS[0].glass);
let firstPuff = true, lastPuff = -1e9;

/* Building a radial gradient per particle per frame is the one thing
   here that would actually drop frames. Each colour is baked into an
   offscreen sprite once and then blitted. */
const sprites = new Map();
function sprite(key, paint){
  let s = sprites.get(key);
  if (s) return s;
  s = document.createElement("canvas");
  s.width = s.height = 128;
  paint(s.getContext("2d"));
  sprites.set(key, s);
  return s;
}
function puffSprite(){
  const [r,g,b] = tintNow;
  return sprite("p" + tintNow.join(), ctx => {
    const gr = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0,    `rgba(${r},${g},${b},1)`);
    gr.addColorStop(0.45, `rgba(${r},${g},${b},.45)`);
    gr.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, 128, 128);
  });
}
function streakSprite(warm){
  const [r,g,b] = warm ? [240,162,60] : tintNow;
  return sprite("s" + (warm ? "warm" : tintNow.join()), ctx => {
    const gr = ctx.createLinearGradient(0, 0, 128, 0);
    gr.addColorStop(0,  `rgba(${r},${g},${b},0)`);
    gr.addColorStop(.5, `rgba(${r},${g},${b},1)`);
    gr.addColorStop(1,  `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, 128, 128);
  });
}

function puff(strength = 1){
  if (reduce || !bottle || !sprayC) return;
  /* one dose at a time. Without this, mashing the bottle stacks
     enough additive particles to white out the whole hero. */
  const now = performance.now();
  if (now - lastPuff < 620) return;
  lastPuff = now;
  const hero = sprayC.getBoundingClientRect();
  const b    = bottle.getBoundingClientRect();
  /* emitted from the glass itself — the oil evaporates through the
     cap, so it leaves the vessel in every direction and then rises */
  const ox   = b.left + b.width / 2 - hero.left;
  const oy   = b.top  + b.height * 0.62 - hero.top;
  const n    = Math.round(54 * strength);

  for (let i = 0; i < n && parts.length < MAX_PARTS; i++){
    const ang = Math.random() * Math.PI * 2;
    const sp  = (14 + Math.random() * 70) * strength;
    parts.push({
      x: ox + Math.cos(ang) * (10 + Math.random() * 34),
      y: oy + Math.sin(ang) * (14 + Math.random() * 40),
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp * 0.55 - 22,
      r: 14 + Math.random() * 34,
      life: 0,
      span: 1.9 + Math.random() * 2.2
    });
  }
  if (firstPuff && strength >= 1){
    firstPuff = false;
    heroHint?.classList.add("is-done");
  }
}

function stepSpray(dt){
  if (!sctx) return;
  sctx.clearRect(0, 0, sprayC.width, sprayC.height);
  if (!parts.length) return;

  const img = puffSprite();
  sctx.globalCompositeOperation = "lighter";

  for (let i = parts.length - 1; i >= 0; i--){
    const p = parts[i];
    p.life += dt;
    if (p.life >= p.span){ parts.splice(i, 1); continue; }

    p.vx *= 0.965;                    // air resistance
    p.vy = p.vy * 0.972 - 34 * dt;    // and it keeps rising
    p.x += p.vx * dt;
    p.y += p.vy * dt;

    const t   = p.life / p.span;
    const rad = p.r * (1 + t * 2.2);
    sctx.globalAlpha = Math.sin(t * Math.PI) * 0.095;  // in, then out — kept
    sctx.drawImage(img, p.x - rad, p.y - rad, rad * 2, rad * 2);   // low so stacked
  }                                                    // particles read as vapour
  sctx.globalAlpha = 1;
  sctx.globalCompositeOperation = "source-over";
}

/* ══════════════════════════════════════════════════════════
   3 · THE ROAD
   Streetlights and oncoming headlights, blurred by speed into
   horizontal streaks. Deliberately slow and low-contrast — it
   is atmosphere behind the type, not a screensaver.
   ══════════════════════════════════════════════════════════ */
const nightC = document.getElementById("night");
const nctx   = nightC ? nightC.getContext("2d") : null;
let streaks = [];

function seedStreaks(w, h){
  streaks = Array.from({ length: 30 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    len: 60 + Math.random() * 260,
    sp: 26 + Math.random() * 130,
    th: 1 + Math.random() * 3.4,
    a: 0.07 + Math.random() * 0.22,
    warm: Math.random() < 0.62
  }));
}

function stepRoad(dt, w, h){
  if (!nctx) return;
  nctx.clearRect(0, 0, w, h);
  nctx.globalCompositeOperation = "lighter";
  const warm = streakSprite(true), cool = streakSprite(false);

  for (const s of streaks){
    s.x -= s.sp * dt;
    if (s.x + s.len < 0){ s.x = w + Math.random() * 220; s.y = Math.random() * h; }
    nctx.globalAlpha = s.a;
    nctx.drawImage(s.warm ? warm : cool, 0, 48, 128, 32, s.x, s.y, s.len, s.th);
  }
  nctx.globalAlpha = 1;
  nctx.globalCompositeOperation = "source-over";
}

/* ── one loop for all three ───────────────────────────────── */
let heroVisible = true, running = false, prev = 0, acc = 0;
const STEP = 1 / 60;

function sizeCanvases(){
  const hero = document.getElementById("hero");
  if (!hero) return;
  const r = hero.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  [nightC, sprayC].forEach(c => {
    if (!c) return;
    c.width  = Math.round(r.width  * dpr);
    c.height = Math.round(r.height * dpr);
    const ctx = c.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  });
  seedStreaks(r.width, r.height);
}

function frame(now){
  if (!running) return;
  const dt = Math.min(0.05, (now - prev) / 1000 || 0);
  prev = now;
  const t = now / 1000;

  /* fixed-step physics, variable-step rendering */
  acc += dt;
  let guard = 0;
  while (acc >= STEP && guard++ < 5){ stepSwing(STEP, t); acc -= STEP; }

  if (pend) pend.style.transform = `rotate(${swing.a}rad)`;

  const r = nightC?.getBoundingClientRect();
  if (r) stepRoad(dt, r.width, r.height);
  stepSpray(dt);

  requestAnimationFrame(frame);
}

function start(){
  if (running || reduce) return;
  running = true; prev = performance.now(); acc = 0;
  requestAnimationFrame(frame);
}
function stop(){ running = false; }

if (!reduce && nightC){
  sizeCanvases();
  addEventListener("resize", sizeCanvases, { passive:true });
  new IntersectionObserver(([e]) => {
    heroVisible = e.isIntersecting;
    heroVisible && !document.hidden ? start() : stop();
  }, { threshold:0 }).observe(document.getElementById("hero"));
  document.addEventListener("visibilitychange", () =>
    !document.hidden && heroVisible ? start() : stop());
  start();
}

paintHero(Math.max(0, SCENTS.findIndex(s => s.id === HERO_START)));
if (!reduce) heroTimer = setInterval(() => { if (!userTookOver) paintHero(heroIx + 1); }, 6400);

/* ══════════ the range gauge ══════════ */
function runGauge(){
  const arc    = document.getElementById("gaugeArc");
  const needle = document.getElementById("gaugeNeedle");
  const val    = document.getElementById("gaugeVal");
  if (!arc || !val) return;

  const LEN = 151;                     // path length of the dial arc
  arc.style.strokeDashoffset = LEN * 0.12;
  needle.setAttribute("transform", "rotate(69 60 60)");   // -90 → F

  if (reduce){ val.textContent = "8 weeks"; return; }
  const start = performance.now(), dur = 2300;
  const step = now => {
    const t = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - t, 3);
    val.textContent = `${Math.round(e * 8)} weeks`;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ══════════ instrument cluster counters ══════════ */
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
    el.textContent = prefix + (target * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ══════════ quick view ══════════ */
const modal     = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
let lastFocus = null;

function openQuick(id){
  const s = byId(id); if (!s) return;
  const p = byId(s.pairs);
  modalBody.innerHTML = `
    <div class="qv">
      <div class="qv__art" style="--c:${s.glass}">${vessel(s.glass)}</div>
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

/* ══════════ scent finder ══════════ */
const QUESTIONS = [
  { q:"How should the car feel when you get in?",
    opts:[
      { label:"Clean and awake",    hint:"Citrus, air, cold mornings",    score:{fresh:2} },
      { label:"Warm and close",     hint:"Spice, leather, evenings",      score:{amber:2} },
      { label:"Grounded",           hint:"Cedar, oud, quiet",             score:{woody:2} },
      { label:"Soft and sweet",     hint:"Vanilla, flowers, comfort",     score:{sweet:2} }
    ]},
  { q:"When are you actually in it?",
    opts:[
      { label:"Morning commute",    hint:"Something that wakes you up",   score:{fresh:2, woody:1} },
      { label:"Evenings out",       hint:"Something with presence",       score:{amber:2, sweet:1} },
      { label:"All day, every day", hint:"Something that never tires",    score:{woody:2, fresh:1} },
      { label:"Weekends only",      hint:"Something to look forward to",  score:{sweet:2, amber:1} }
    ]},
  { q:"And what should a passenger notice?",
    opts:[
      { label:"Nothing obvious",    hint:"Noticed only up close",         score:{woody:2, fresh:1} },
      { label:"Enough to ask",      hint:"Someone will want the name",    score:{amber:2, woody:1} },
      { label:"That it's welcoming",hint:"Warm the moment they sit down", score:{sweet:2, amber:1} },
      { label:"That it's spotless", hint:"Like the car was just valeted", score:{fresh:2} }
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
      <div class="result__art" style="--c:${match.glass}">${vessel(match.glass)}</div>
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
  /* load the match into the hero, so the page's light matches the answer */
  const ix = SCENTS.findIndex(s => s.id === match.id);
  if (ix > -1) paintHero(ix, true);
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

/* ══════════ header, drawer, image fallbacks ══════════ */
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

/* ══════════ reveals, counters, gauge ══════════ */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains("reveal")) el.classList.add("is-in");
    if (el.hasAttribute("data-count") || el.hasAttribute("data-literal")) runCounter(el);
    if (el.id === "gauge") runGauge();
    io.unobserve(el);
  });
}, { threshold:.15, rootMargin:"0px 0px -40px" });
document.querySelectorAll(".reveal, [data-count], [data-literal], #gauge").forEach(el => io.observe(el));

/* ══════════ current section in the nav ══════════ */
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
      if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) current = id;
    });
    document.querySelectorAll(".nav a").forEach(a =>
      a.classList.toggle("is-current", a.getAttribute("href") === `#${current}`));
    ticking = false;
  });
}
addEventListener("scroll", onScroll, { passive:true });
onScroll();

/* ══════════ signup (not yet connected to a provider) ══════════ */
const form = document.getElementById("signup");
form?.addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.getElementById("signupMsg");
  const email = document.getElementById("email");
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  msg.textContent = ok
    ? "You're on the list. (Demo only — connect a mail provider to store this.)"
    : "That email address doesn't look right. Check it and try again.";
  if (ok) form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
