#!/usr/bin/env node
// scripts/build_glossary.mjs
// Slovníček (Pohled 4) — z editorního seedu (data/glossary/glossary.seed.ts)
// vygeneruje runtime modul web/glossary.js (window.FEDIK_GLOSSARY) a OVĚŘÍ integritu.
//
// Konvence repa: web čte plain-JS globály (žádný TS/build ve frontendu, viz apps.js).
// Tenhle skript je obdoba generate-apps.mjs: seed = zdroj pravdy, JS = co načítá web.
//
// Použití:  node scripts/build_glossary.mjs            # generuje + validuje
//           node scripts/build_glossary.mjs --check    # jen validuje (nezapisuje)
//
// Validace (selže s exit 1): unikátní `id`, platné enumy (type/level/themes),
// `steps` jen u type="postup", unikátní `order`, a hlavně — žádný `seeAlso`
// (ani interní slug-odkaz) nemíří na neexistující heslo.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SEED = join(ROOT, "data", "glossary", "glossary.seed.ts");
const OUT = join(ROOT, "web", "glossary.js");
const CHECK_ONLY = process.argv.includes("--check");

const THEMES = ["ucty", "federace", "obsah", "moderovani", "soukromi", "technika"];
const TYPES = ["pojem", "postup", "zkratka"];
const LEVELS = ["zakladni", "pokrocile"];

// Seed je TS jen kvůli importu typů a anotaci pole — tělo je validní JS literál.
// Odstraníme `import ... ;` a `: GlossaryEntry[]`, zbytek vyhodnotíme.
function loadSeed() {
  const src = readFileSync(SEED, "utf8");
  const js = src
    .replace(/^\s*import[^;]*;\s*$/m, "")
    .replace(/export\s+const\s+glossary\s*:\s*GlossaryEntry\[\]\s*=/, "return");
  // eslint-disable-next-line no-new-func
  const fn = new Function(js + "\n;");
  const arr = fn();
  if (!Array.isArray(arr)) throw new Error("Seed nevrátil pole.");
  return arr;
}

function validate(entries) {
  const errs = [];
  const ids = new Set();
  const orders = new Map();

  for (const e of entries) {
    const at = `heslo "${e.id || e.term || "?"}"`;
    if (!e.id || !/^[a-z0-9-]+$/.test(e.id)) errs.push(`${at}: chybí/neplatný slug id`);
    if (ids.has(e.id)) errs.push(`${at}: duplicitní id`);
    ids.add(e.id);
    if (!e.term) errs.push(`${at}: chybí term`);
    if (!e.short) errs.push(`${at}: chybí short`);
    if (!TYPES.includes(e.type)) errs.push(`${at}: neplatný type "${e.type}"`);
    if (!LEVELS.includes(e.level)) errs.push(`${at}: neplatný level "${e.level}"`);
    if (!Array.isArray(e.themes) || !e.themes.length) errs.push(`${at}: prázdné themes`);
    (e.themes || []).forEach((th) => { if (!THEMES.includes(th)) errs.push(`${at}: neplatné téma "${th}"`); });
    if (e.steps && e.type !== "postup") errs.push(`${at}: steps jen u type="postup"`);
    if (e.order != null) {
      if (orders.has(e.order)) errs.push(`${at}: order ${e.order} koliduje s "${orders.get(e.order)}"`);
      orders.set(e.order, e.id);
    }
  }
  // Cross-ref: každý seeAlso slug musí existovat (akceptační kritérium).
  for (const e of entries) {
    (e.seeAlso || []).forEach((slug) => {
      if (!ids.has(slug)) errs.push(`heslo "${e.id}": seeAlso → neexistující slug "${slug}"`);
    });
  }
  return errs;
}

function emit(entries) {
  const header =
    "/* web/glossary.js — Slovníček (Pohled 4). GENEROVÁNO z data/glossary/glossary.seed.ts\n" +
    "   skriptem scripts/build_glossary.mjs. RUČNĚ NEEDITUJ — uprav seed a přegeneruj.\n" +
    "   Typ: data/glossary/types.ts (GlossaryEntry). `id` (slug) = stabilní kontrakt\n" +
    "   pro hloubkové odkazy z Pohledů 1–3 i pro cíl vyhledávání uvnitř Fedíku. */\n";
  writeFileSync(OUT, header +
    "window.FEDIK_GLOSSARY_BUILT = " + JSON.stringify(new Date().toISOString()) + ";\n" +
    "window.FEDIK_GLOSSARY = " + JSON.stringify(entries, null, 2) + ";\n");
}

try {
  const entries = loadSeed();
  const errs = validate(entries);
  if (errs.length) {
    console.error(`✗ Slovníček — ${errs.length} chyb:`);
    errs.forEach((e) => console.error("  · " + e));
    process.exit(1);
  }
  const withOrder = entries.filter((e) => e.order != null).length;
  const steps = entries.filter((e) => e.type === "postup").length;
  console.error(`✓ Slovníček OK: ${entries.length} hesel (páteř s order: ${withOrder}, postupů: ${steps}).`);
  if (CHECK_ONLY) process.exit(0);
  emit(entries);
  console.error(`→ zapsáno ${OUT.replace(ROOT + "/", "")}`);
} catch (err) {
  console.error("✗ build_glossary selhal: " + (err && err.message || err));
  process.exit(1);
}
