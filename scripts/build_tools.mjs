#!/usr/bin/env node
// scripts/build_tools.mjs
// Nástroje (Pohled 5) — slije klienty (data/tools/tools.generated.ts) s ručním
// seedem (data/tools/tools.manual.ts) do runtime modulu web/tools.js
// (window.FEDIK_TOOLS) a OVĚŘÍ integritu.
//
// Konvence repa: web čte plain-JS globály (žádný TS/build ve frontendu, viz apps.js).
// Obdoba scripts/build_glossary.mjs.
//
// Použití:  node scripts/build_tools.mjs            # generuje + validuje
//           node scripts/build_tools.mjs --check    # jen validuje (nezapisuje)
//
// Hard-fail (exit 1): neplatné enumy (category/platforms/price), duplicitní id,
// prázdné platforms, seeAlsoGlossary mimo slugy Slovníčku (Pohled 4), a forApps
// RUČNÍCH nástrojů mimo App.id ∪ sítě. Soft-warn: forApps KLIENTŮ mimo náš katalog
// (compatibility z communityDB může odkazovat na aplikace, které nekatalogizujeme).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GEN = join(ROOT, "data", "tools", "tools.generated.ts");
const MAN = join(ROOT, "data", "tools", "tools.manual.ts");
const SUPPRESS_F = join(ROOT, "data", "tools", "tools.suppress.json");
const APPS = join(ROOT, "web", "apps.js");
const GLOSS = join(ROOT, "web", "glossary.js");
const DESC = join(ROOT, "data", "tools", "descriptions.i18n.js");
const LOGOS_F = join(ROOT, "data", "tools", "logos.js");
const URLS_F = join(ROOT, "data", "tools", "urls.js");
const PRICES_F = join(ROOT, "data", "tools", "prices.js");
const OUT = join(ROOT, "web", "tools.js");
const CHECK_ONLY = process.argv.includes("--check");

const CATEGORIES = ["klient", "crossposter", "most", "objevovani", "migrace", "rss", "analytika"];
const PLATFORMS = ["android", "ios", "web", "desktop", "sluzba"];
const PRICES = ["zdarma", "freemium", "placene", "unknown"];
// Sítě (cíl mostů) — platné hodnoty forApps mimo náš App katalog.
const NETWORKS = ["bluesky", "nostr", "indieweb", "atproto", "rss"];

// TS seed → JS literál: zahodit `import ...;` a `export const X: Tool[] =` → `return`.
function loadSeed(path, name) {
  const src = readFileSync(path, "utf8");
  const js = src
    .replace(/^\s*import[^;]*;\s*$/m, "")
    .replace(new RegExp("export\\s+const\\s+" + name + "\\s*:\\s*Tool\\[\\]\\s*="), "return");
  const arr = new Function(js + "\n;")();
  if (!Array.isArray(arr)) throw new Error(`${name}: seed nevrátil pole.`);
  return arr;
}

// window-shim pro načtení runtime JS globálů (App.id, glossary slugy).
function loadGlobal(path, prop) {
  const win = {};
  new Function("window", readFileSync(path, "utf8"))(win);
  return win[prop] || [];
}

function validate(tools, appIds, glossarySlugs) {
  const errs = [];
  const warns = [];
  const ids = new Set();
  const forAppOk = new Set([...appIds, ...NETWORKS]);

  for (const t of tools) {
    const at = `nástroj "${t.id || t.name || "?"}"`;
    if (!t.id || !/^[a-z0-9-]+$/.test(t.id)) errs.push(`${at}: chybí/neplatný id`);
    if (ids.has(t.id)) errs.push(`${at}: duplicitní id`);
    ids.add(t.id);
    if (!t.name) errs.push(`${at}: chybí name`);
    if (!CATEGORIES.includes(t.category)) errs.push(`${at}: neplatná category "${t.category}"`);
    if (!Array.isArray(t.platforms) || !t.platforms.length) errs.push(`${at}: prázdné platforms`);
    (t.platforms || []).forEach((p) => { if (!PLATFORMS.includes(p)) errs.push(`${at}: neplatná platforma "${p}"`); });
    if (!PRICES.includes(t.price)) errs.push(`${at}: neplatná price "${t.price}"`);
    if (!t.url) errs.push(`${at}: chybí url`);
    if (t.seeAlsoGlossary && !glossarySlugs.has(t.seeAlsoGlossary)) {
      errs.push(`${at}: seeAlsoGlossary → neexistující slug Slovníčku "${t.seeAlsoGlossary}"`);
    }
    // forApps: ruční nástroje musí mířit na App.id/síť (hard); klienti smí mířit
    // i mimo náš katalog (soft — upstream compatibility).
    (t.forApps || []).forEach((fa) => {
      if (forAppOk.has(fa)) return;
      if (t.category === "klient") warns.push(`${at}: forApps "${fa}" není v našem App katalogu`);
      else errs.push(`${at}: forApps → neznámé App.id/síť "${fa}"`);
    });
  }
  return { errs, warns };
}

function emit(tools) {
  const header =
    "/* web/tools.js — Nástroje (Pohled 5). GENEROVÁNO scriptem scripts/build_tools.mjs\n" +
    "   slitím data/tools/tools.generated.ts (klienti, communityDB) + tools.manual.ts (ostatní).\n" +
    "   RUČNĚ NEEDITUJ — uprav seedy a přegeneruj. Typ: data/tools/types.ts (Tool). */\n";
  writeFileSync(OUT, header +
    "window.FEDIK_TOOLS_BUILT = " + JSON.stringify(new Date().toISOString()) + ";\n" +
    "window.FEDIK_TOOLS = " + JSON.stringify(tools, null, 2) + ";\n");
}

try {
  const clientTools = loadSeed(GEN, "clientTools");
  const manualTools = loadSeed(MAN, "manualTools");
  const appIds = new Set(loadGlobal(APPS, "FEDIK_APPS").map((a) => a.id));
  const glossarySlugs = new Set(loadGlobal(GLOSS, "FEDIK_GLOSSARY").map((e) => e.id));

  // Slij; při kolizi id vyhrává ruční seed (kurátorský) a zahlásí se.
  const suppress = new Set(JSON.parse(readFileSync(SUPPRESS_F, "utf8")));
  const byId = new Map();
  const collisions = [];
  clientTools.forEach((t) => { if (!suppress.has(t.id)) byId.set(t.id, t); });
  manualTools.forEach((t) => { if (byId.has(t.id)) collisions.push(t.id); byId.set(t.id, t); });
  if (suppress.size) console.error(`· potlačeno z generovaných: ${[...suppress].join(", ")}`);
  const tools = Array.from(byId.values());

  // Dvojjazyčné popisy: descriptionCs/En z překladových map (fallback = původní description).
  // Klienti mají description EN (z communityDB) → CS z TOOL_DESC_CS; ruční mají description CS → EN z TOOL_DESC_EN.
  const descWin = {};
  new Function("window", readFileSync(DESC, "utf8"))(descWin);
  const CS = descWin.TOOL_DESC_CS || {}, EN = descWin.TOOL_DESC_EN || {};
  // Loga (id → lokální cesta) z data/tools/logos.js; jen nastav, když existuje.
  const logoWin = {};
  new Function("window", readFileSync(LOGOS_F, "utf8"))(logoWin);
  const LOGOS = logoWin.TOOL_LOGOS || {};
  // URL override (jednoplatformní appky → přímo App Store / Play) z data/tools/urls.js.
  const urlWin = {};
  new Function("window", readFileSync(URLS_F, "utf8"))(urlWin);
  const URLS = urlWin.TOOL_URLS || {};
  // Cena (zdarma/placene) — ruční override z data/tools/prices.js (přežije regen seedů).
  const priceWin = {};
  new Function("window", readFileSync(PRICES_F, "utf8"))(priceWin);
  const PRICES = priceWin.TOOL_PRICES || {};
  let logoCount = 0, urlCount = 0, priceCount = 0;
  let csMissing = 0, enMissing = 0;
  tools.forEach((t) => {
    t.descriptionCs = CS[t.id] || t.description;
    t.descriptionEn = EN[t.id] || t.description;
    if (LOGOS[t.id]) { t.logoUrl = LOGOS[t.id]; logoCount++; }
    var o = URLS[t.id];
    if (o) { if (o.url) { t.url = o.url; urlCount++; } if (o.sourceCode && !t.sourceCode) t.sourceCode = o.sourceCode; }
    if (PRICES[t.id] && PRICES[t.id] !== t.price) { t.price = PRICES[t.id]; priceCount++; }
    if (t.category === "klient" && !CS[t.id]) csMissing++;
    if (t.category !== "klient" && !EN[t.id]) enMissing++;
  });
  console.error(`· loga přiřazena: ${logoCount}/${tools.length} · store odkazy: ${urlCount} · ceny: ${priceCount}`);
  if (csMissing || enMissing) console.error(`· popisy bez překladu — klienti bez CS: ${csMissing}, ruční bez EN: ${enMissing}`);

  const { errs, warns } = validate(tools, appIds, glossarySlugs);
  if (collisions.length) console.error(`· kolize id (ruční přebil klienta): ${collisions.join(", ")}`);
  warns.slice(0, 40).forEach((w) => console.error("  ! " + w));
  if (warns.length > 40) console.error(`  … a další ${warns.length - 40} varování`);

  if (errs.length) {
    console.error(`✗ Nástroje — ${errs.length} chyb:`);
    errs.forEach((e) => console.error("  · " + e));
    process.exit(1);
  }
  const byCat = {};
  tools.forEach((t) => { byCat[t.category] = (byCat[t.category] || 0) + 1; });
  console.error(`✓ Nástroje OK: ${tools.length} (klientů ${clientTools.length}, ručních ${manualTools.length}), ` +
    `featured ${tools.filter((t) => t.featured).length}, vlastních ${tools.filter((t) => t.isOwn).length}.`);
  console.error(`  kategorie: ${JSON.stringify(byCat)}`);
  console.error(`  forApps varování (klienti mimo katalog): ${warns.length}`);
  if (CHECK_ONLY) process.exit(0);
  emit(tools);
  console.error(`→ zapsáno ${OUT.replace(ROOT + "/", "")}`);
} catch (err) {
  console.error("✗ build_tools selhal: " + (err && err.message || err));
  process.exit(1);
}
