#!/usr/bin/env node
// scripts/check-upstream.mjs
// Ověří stav FediDB communityDB oproti aktuálním datům Fedíku.
//
// Spuštění:  node scripts/check-upstream.mjs
//
// Co dělá:
//   1. Stáhne software.json + apps.json z FediDB communityDB
//   2. Přegeneruje web/apps.generated.js (Pohled 2) a data/tools/tools.generated.ts (Pohled 5 – klienti)
//   3. Porovná s aktuálním web/apps.js a předchozím tools.generated.ts
//   4. Zapíše data/tools/upstream-report.json s novými položkami k obohacení
//
// Výstup (upstream-report.json) slouží jako podklad pro obohacení s Claudem:
//   • překlad popisu do češtiny
//   • ikona/logo
//   • metadata (contentType, czechUI, devStatus, price…)
//   • zařazení do web/apps.js nebo tools.manual.ts

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR  = join(ROOT, "data", "tools");
const WEB  = join(ROOT, "web");

const SW_URL  = "https://raw.githubusercontent.com/fedidb/communityDB/main/software.json";
const APP_URL = "https://raw.githubusercontent.com/fedidb/communityDB/main/apps.json";

// ─── Mapování (shodné s generate-apps.mjs / generate-tools.mjs) ───────────

const CATEGORY_MAP = {
  microblogging: "microblog",
  "image-sharing": "photos",
  video: "video",
  forum: "forum",
  blogging: "blog",
  audio: "music",
  events: "events",
  other: "REVIEW",
  badges: "REVIEW",
  microcredentials: "REVIEW",
};

const SLUG_OVERRIDES = {
  loops: "shortvideo",
  bookwyrm: "books",
  neodb: "books",
  owncast: "livestream",
  castopod: "podcast",
  funkwhale: "music",
  postmarks: "links",
};

const NON_ENDUSER = new Set([
  "activityrelay", "activity-relay", "bridgy-fed", "frequency", "irwin", "murlog",
]);

const OS_MAP = { android: "android", ios: "ios", web: "web", desktop: "desktop", watchos: "ios" };

const PRICE_OVERRIDES = { ivory: "placene", mona: "placene", toot: "placene", tootle: "placene" };

function pickContentType(sw) {
  if (SLUG_OVERRIDES[sw.slug]) return SLUG_OVERRIDES[sw.slug];
  for (const c of sw.categories ?? []) {
    const m = CATEGORY_MAP[c];
    if (m && m !== "REVIEW") return m;
  }
  return "REVIEW";
}

const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");

function mapSoftware(sw) {
  const contentType = pickContentType(sw);
  const include = !NON_ENDUSER.has(sw.slug);
  const needsReview = [];
  if (contentType === "REVIEW") needsReview.push("contentType");
  if ((sw.categories ?? []).includes("audio") && !SLUG_OVERRIDES[sw.slug])
    needsReview.push("contentType(audio: music?podcast?)");
  needsReview.push("centralizedEquivalent", "czechUI", "devStatus", "managedHosting");
  return {
    id: sw.slug, fedidbSlug: sw.slug, name: sw.name,
    description: sw.description ?? "", license: sw.license ?? "",
    website: sw.website ?? "", sourceCode: sw.source_code ?? "",
    joinUrl: sw.join_url ?? "", appsUrl: sw.apps_url ?? "",
    logoUrl: sw.logo_source_url ?? "",
    contentType, protocol: "ActivityPub",
    centralizedEquivalent: "", czechUI: "unknown",
    devStatus: "unknown", managedHosting: false, include,
    _needsReview: needsReview,
  };
}

function mapClient(c) {
  const id = slugify(c.name);
  return {
    id, name: c.name, description: c.description ?? "",
    category: "klient",
    platforms: [...new Set((c.os ?? []).map((o) => OS_MAP[o]).filter(Boolean))],
    forApps: (c.compatibility ?? []).map(slugify),
    price: PRICE_OVERRIDES[id] ?? "unknown",
    url: c.url ?? "",
    official: (c.categories ?? []).includes("official"),
    featured: false,
    addedAt: c.createdAt ?? "",
    isOwn: false,
  };
}

// ─── Načtení aktuálního stavu ──────────────────────────────────────────────

function loadCurrentAppIds() {
  const win = {};
  new Function("window", readFileSync(join(WEB, "apps.js"), "utf8"))(win);
  return new Set((win.FEDIK_APPS ?? []).map((a) => a.id));
}

function loadCurrentToolIds() {
  const src = readFileSync(join(DIR, "tools.generated.ts"), "utf8")
    .replace(/^import[^;]*;/m, "")
    .replace(/export\s+const\s+clientTools\s*:\s*Tool\[\]\s*=/, "return");
  try {
    const arr = new Function(src + ";")();
    if (Array.isArray(arr)) return new Set(arr.map((t) => t.id));
  } catch (_) { /* první spuštění – soubor neexistuje nebo je prázdný */ }
  return new Set();
}

// ─── Stažení upstream dat ──────────────────────────────────────────────────

const log = (...a) => console.error(...a);

log("⬇  Stahuji software.json + apps.json z communityDB…");
const [software, clients] = await Promise.all([
  fetch(SW_URL).then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status} ${SW_URL}`); return r.json(); }),
  fetch(APP_URL).then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status} ${APP_URL}`); return r.json(); }),
]);
log(`   software.json: ${software.length} položek`);
log(`   apps.json:     ${clients.length} položek`);

// ─── Diff ──────────────────────────────────────────────────────────────────

const currentAppIds  = loadCurrentAppIds();
const currentToolIds = loadCurrentToolIds();

const allApps  = software.map(mapSoftware);
const allTools = clients.map(mapClient);

const upstreamAppIds  = new Set(allApps.map((a) => a.id));
const upstreamToolIds = new Set(allTools.map((t) => t.id));

const newApps     = allApps.filter((a) => !currentAppIds.has(a.id));
const removedApps = [...currentAppIds].filter((id) => !upstreamAppIds.has(id));

const newTools     = allTools.filter((t) => !currentToolIds.has(t.id));
const removedTools = [...currentToolIds].filter((id) => !upstreamToolIds.has(id));

// ─── Zápis přegenerovaných souborů ────────────────────────────────────────

writeFileSync(join(WEB, "apps.generated.js"),
  `/* AUTOGENEROVÁNO check-upstream.mjs ze zdroje FediDB communityDB (MIT, © Daniel Supernault).\n` +
  `   Pole s hodnotou "REVIEW"/"unknown" dotáhni ručně do web/apps.js (kurátorská kopie).\n` +
  `   contentType id odpovídají web/taxonomy.js. */\n` +
  `window.FEDIK_APPS = ${JSON.stringify(allApps, null, 2)};\n`,
  "utf8");

writeFileSync(join(DIR, "tools.generated.ts"),
  `// AUTOGENEROVÁNO check-upstream.mjs ze zdroje FediDB communityDB apps.json (MIT, © Daniel Supernault).\n` +
  `// Jen kategorie "klient". Cena "unknown" = dotáhni ručně. "featured" nastav pro žebříček Doporučené.\n` +
  `import type { Tool } from "./types";\n\n` +
  `export const clientTools: Tool[] = ${JSON.stringify(allTools, null, 2)};\n`,
  "utf8");

// ─── Report ────────────────────────────────────────────────────────────────

const report = {
  generated_at: new Date().toISOString(),
  apps: {
    source: "software.json (FediDB communityDB)",
    current_in_apps_js: currentAppIds.size,
    upstream_total: software.length,
    new: newApps,
    removed: removedApps,
  },
  tools: {
    source: "apps.json (FediDB communityDB)",
    current_in_generated: currentToolIds.size,
    upstream_total: clients.length,
    new: newTools,
    removed: removedTools,
  },
};
const reportPath = join(DIR, "upstream-report.json");
writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");

// ─── Shrnutí ───────────────────────────────────────────────────────────────

log(`\n── výsledek ──────────────────────────────────────────────`);
log(`Aplikace  upstream ${software.length} / v apps.js ${currentAppIds.size}`);
if (newApps.length)     log(`  ✨ nové (${newApps.length}): ${newApps.map((a) => a.id).join(", ")}`);
if (removedApps.length) log(`  🗑  odstraněné z upstream (${removedApps.length}): ${removedApps.join(", ")}`);
if (!newApps.length && !removedApps.length) log("  ✓ beze změny");

log(`Klienti   upstream ${clients.length} / v tools.generated.ts ${currentToolIds.size}`);
if (newTools.length)     log(`  ✨ nové (${newTools.length}): ${newTools.map((t) => t.id).join(", ")}`);
if (removedTools.length) log(`  🗑  odstraněné z upstream (${removedTools.length}): ${removedTools.join(", ")}`);
if (!newTools.length && !removedTools.length) log("  ✓ beze změny");

log(`\n✅ Přegenerováno: web/apps.generated.js, data/tools/tools.generated.ts`);
log(`📋 Report: ${reportPath}`);

const total = newApps.length + newTools.length;
if (total) {
  log(`\n⚠️  ${total} nových položek čeká na obohacení → sdílej upstream-report.json s Claudem.`);
} else {
  log(`\n✓ Žádné nové položky. Katalogy jsou aktuální.`);
}
