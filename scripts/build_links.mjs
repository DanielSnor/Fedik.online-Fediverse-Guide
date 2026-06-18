#!/usr/bin/env node
// scripts/build_links.mjs
// Odkazy / Zdroje (Pohled 7) — z editorního seedu (data/links/links.seed.ts)
// vygeneruje runtime modul web/links.js (window.FEDIK_LINKS) a OVĚŘÍ integritu.
//
// Konvence repa: web čte plain-JS globály (žádný TS/build ve frontendu, viz apps.js).
// Obdoba scripts/build_glossary.mjs / build_tools.mjs.
//
// Použití:  node scripts/build_links.mjs            # generuje + validuje
//           node scripts/build_links.mjs --check    # jen validuje (nezapisuje)
//
// Hard-fail (exit 1): neplatné enumy (type/language/theme), duplicitní id, prázdné
// themes, chybějící url/title/description, a — kritérium — type rovné „nastroj"/„tool"
// (nástroje mají Pohled 5; Odkazy je neduplikují).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SEED = join(ROOT, "data", "links", "links.seed.ts");
const OUT = join(ROOT, "web", "links.js");
const CHECK_ONLY = process.argv.includes("--check");

const TYPES = ["navod", "clanek", "oficialni", "video"];
const LANGS = ["cs", "sk", "en"];
const THEMES = ["uvod", "navody", "technika", "komunita", "data"];
const FORBIDDEN_TYPES = ["nastroj", "tool", "nástroj"];   // Pohled 5, ne tady

function loadSeed() {
  const src = readFileSync(SEED, "utf8");
  const js = src
    .replace(/^\s*import[^;]*;\s*$/m, "")
    .replace(/export\s+const\s+links\s*:\s*LinkResource\[\]\s*=/, "return");
  const arr = new Function(js + "\n;")();
  if (!Array.isArray(arr)) throw new Error("Seed nevrátil pole.");
  return arr;
}

function validate(links) {
  const errs = [];
  const ids = new Set();
  const urls = new Set();
  for (const l of links) {
    const at = `odkaz "${l.id || l.title || "?"}"`;
    if (!l.id || !/^[a-z0-9-]+$/.test(l.id)) errs.push(`${at}: chybí/neplatný id`);
    if (ids.has(l.id)) errs.push(`${at}: duplicitní id`);
    ids.add(l.id);
    if (!l.title) errs.push(`${at}: chybí title`);
    if (!l.description) errs.push(`${at}: chybí description`);
    if (!l.url || !/^https?:\/\//.test(l.url)) errs.push(`${at}: chybí/neplatná url`);
    if (urls.has(l.url)) errs.push(`${at}: duplicitní url ${l.url}`);
    urls.add(l.url);
    if (FORBIDDEN_TYPES.includes(String(l.type))) errs.push(`${at}: type "${l.type}" sem nepatří (nástroje = Pohled 5)`);
    if (!TYPES.includes(l.type)) errs.push(`${at}: neplatný type "${l.type}"`);
    if (!LANGS.includes(l.language)) errs.push(`${at}: neplatný language "${l.language}"`);
    if (!Array.isArray(l.themes) || !l.themes.length) errs.push(`${at}: prázdné themes`);
    (l.themes || []).forEach((th) => { if (!THEMES.includes(th)) errs.push(`${at}: neplatné téma "${th}"`); });
  }
  return errs;
}

function emit(links) {
  const header =
    "/* web/links.js — Odkazy / Zdroje (Pohled 7). GENEROVÁNO z data/links/links.seed.ts\n" +
    "   skriptem scripts/build_links.mjs. RUČNĚ NEEDITUJ — uprav seed a přegeneruj.\n" +
    "   Typ: data/links/types.ts (LinkResource). Pořadí v seedu = kurátorske poradi (Doporucene). */\n";
  writeFileSync(OUT, header +
    "window.FEDIK_LINKS_BUILT = " + JSON.stringify(new Date().toISOString()) + ";\n" +
    "window.FEDIK_LINKS = " + JSON.stringify(links, null, 2) + ";\n");
}

try {
  const links = loadSeed();
  const errs = validate(links);
  if (errs.length) {
    console.error(`✗ Odkazy — ${errs.length} chyb:`);
    errs.forEach((e) => console.error("  · " + e));
    process.exit(1);
  }
  const byType = {}, byLang = {};
  links.forEach((l) => { byType[l.type] = (byType[l.type] || 0) + 1; byLang[l.language] = (byLang[l.language] || 0) + 1; });
  console.error(`✓ Odkazy OK: ${links.length} zdrojů. Typ: ${JSON.stringify(byType)}. Jazyk: ${JSON.stringify(byLang)}.`);
  console.error(`  s licencí (atribuce): ${links.filter((l) => l.license).map((l) => l.id).join(", ") || "—"}`);
  if (CHECK_ONLY) process.exit(0);
  emit(links);
  console.error(`→ zapsáno ${OUT.replace(ROOT + "/", "")}`);
} catch (err) {
  console.error("✗ build_links selhal: " + (err && err.message || err));
  process.exit(1);
}
