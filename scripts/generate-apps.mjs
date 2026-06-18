#!/usr/bin/env node
// generate-apps.mjs
// Seed katalogu aplikací pro Fedík.online z FediDB communityDB (software.json, MIT, © Daniel Supernault).
// Doplňuje JEN editorní/odkazová pole. Živá čísla (users/instances) NEřeší – ta táhne zvlášť FediDB refresh job
// (bin/refresh_app_stats.rb → web/app-stats.json).
//
// Přizpůsobeno konvencím repa (vanilla JS, žádný TS/build):
//   • výstup je JS modul `window.FEDIK_APPS` (vzor links.js / taxonomy.js), ne .ts
//   • contentType id = id z web/taxonomy.js (microblog, photos, forum, …) — jeden slovník
//
// Použití:
//   node generate-apps.mjs                 # stáhne software.json z GitHubu
//   node generate-apps.mjs ./software.json # použije lokální soubor
//
// Výstup: web/apps.generated.js (+ shrnutí do stderr). Pole označená REVIEW/unknown dotáhni ručně
// do web/apps.js (kurátorská kopie, kterou web načítá).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SRC = "https://raw.githubusercontent.com/fedidb/communityDB/main/software.json";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "web", "apps.generated.js");

// communityDB kategorie -> naše taxonomie (id typu obsahu z web/taxonomy.js, Pohled 1)
const CATEGORY_MAP = {
  microblogging: "microblog",
  "image-sharing": "photos",
  video: "video",
  forum: "forum",
  blogging: "blog",
  audio: "music",      // pozor: audio = hudba i podcasty -> viz SLUG_OVERRIDES + review
  events: "events",
  other: "REVIEW",
  badges: "REVIEW",
  microcredentials: "REVIEW",
};

// Jemnější typy, které communityDB nerozlišuje – ruční override podle slugu (id z taxonomy.js)
const SLUG_OVERRIDES = {
  loops: "shortvideo",
  bookwyrm: "books",
  neodb: "books",
  owncast: "livestream",
  castopod: "podcast",
  funkwhale: "music",
  postmarks: "links",   // sdílení odkazů (nový typ v taxonomy.js)
};

// Zjevná infrastruktura/mosty/knihovny – ne koncová aplikace pro běžného uživatele.
// Generátor je jen označí include:false; o zařazení rozhoduje kurace.
const NON_ENDUSER = new Set([
  "activityrelay", "activity-relay", "bridgy-fed", "frequency", "irwin", "murlog",
]);

function pickContentType(sw) {
  if (SLUG_OVERRIDES[sw.slug]) return SLUG_OVERRIDES[sw.slug];
  for (const c of sw.categories ?? []) {
    const mapped = CATEGORY_MAP[c];
    if (mapped && mapped !== "REVIEW") return mapped;
  }
  return "REVIEW";
}

async function loadSource() {
  const arg = process.argv[2];
  if (arg) return JSON.parse(readFileSync(arg, "utf8"));
  const res = await fetch(SRC);
  if (!res.ok) throw new Error(`Stažení selhalo: ${res.status}`);
  return res.json();
}

const software = await loadSource();

const apps = software.map((sw) => {
  const contentType = pickContentType(sw);
  const include = !NON_ENDUSER.has(sw.slug);
  const needsReview = [];
  if (contentType === "REVIEW") needsReview.push("contentType");
  if ((sw.categories ?? []).includes("audio") && !SLUG_OVERRIDES[sw.slug])
    needsReview.push("contentType(audio: music?podcast?)");
  needsReview.push("centralizedEquivalent", "czechUI", "devStatus", "managedHosting");

  return {
    id: sw.slug,
    fedidbSlug: sw.slug,          // klíč na živá čísla z FediDB API
    name: sw.name,
    description: sw.description ?? "",
    license: sw.license ?? "",
    website: sw.website ?? "",
    sourceCode: sw.source_code ?? "",
    joinUrl: sw.join_url ?? "",
    appsUrl: sw.apps_url ?? "",
    logoUrl: sw.logo_source_url ?? "",
    // --- auto-odhad, ověřit ---
    contentType,                  // taxonomie z Pohledu 1 (web/taxonomy.js)
    protocol: "ActivityPub",      // default; ověř (Diaspora/Zot/XMPP…)
    // --- DOPLNIT RUČNĚ (REVIEW) ---
    centralizedEquivalent: "",    // "Twitter / X" apod.
    czechUI: "unknown",           // "ano" | "castecne" | "ne"
    devStatus: "unknown",         // "aktivni" | "zraly" | "experimentalni" | "utlumeny"
    managedHosting: false,        // dostupný řízený hosting?
    include,                      // false = infrastruktura/most, ne koncová appka
    _needsReview: needsReview,
  };
});

// výstup jako JS modul (window.FEDIK_APPS) – stejný vzor jako links.js / taxonomy.js
const header = `/* AUTOGENEROVÁNO generate-apps.mjs ze zdroje FediDB communityDB (MIT, © Daniel Supernault).
   Pole s hodnotou "REVIEW"/"unknown" a vše ve _needsReview dotáhni ručně do web/apps.js.
   Živá čísla (users/instances) sem NEPATŘÍ – doplňuje je refresh job do web/app-stats.json.
   contentType id odpovídají web/taxonomy.js (jeden slovník typů obsahu). */
window.FEDIK_APPS = ${JSON.stringify(apps, null, 2)};
`;
writeFileSync(OUT, header, "utf8");

// shrnutí
const total = apps.length;
const endUser = apps.filter((a) => a.include).length;
const needType = apps.filter((a) => a.contentType === "REVIEW").length;
const byType = {};
for (const a of apps) byType[a.contentType] = (byType[a.contentType] ?? 0) + 1;
console.error(`Zpracováno: ${total} software (${endUser} koncových, ${total - endUser} infra/most).`);
console.error(`Auto-namapován typ obsahu: ${total - needType}/${total}. K ruční revizi typu: ${needType}.`);
console.error("Rozpad podle typu:", JSON.stringify(byType));
console.error("Ke každému záznamu vždy ruční: centralizedEquivalent, czechUI, devStatus, managedHosting.");
console.error(`Zapsáno -> ${OUT}`);
