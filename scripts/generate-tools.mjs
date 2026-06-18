#!/usr/bin/env node
// generate-tools.mjs
// Seed KLIENTŮ pro Pohled 5 (Nástroje) z FediDB communityDB (apps.json, MIT, © Daniel Supernault).
// Pokrývá jen kategorii "klient" — ostatní kategorie (most, objevování, RSS…) jsou v tools.manual.ts.
//
// Použití:
//   node generate-tools.mjs                 # stáhne apps.json z GitHubu
//   node generate-tools.mjs ./apps.json     # lokální soubor
// Výstup: tools.generated.ts

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SRC = "https://raw.githubusercontent.com/fedidb/communityDB/main/apps.json";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "tools", "tools.generated.ts");

// os z communityDB -> naše platformy
const OS_MAP = { android: "android", ios: "ios", web: "web", desktop: "desktop", watchos: "ios" };

// Cena jen u známých (rozhodnutí: doplnit jen známé, zbytek "unknown").
const PRICE_OVERRIDES = {
  ivory: "placene",
  mona: "placene",
  "toot": "placene",
  "tootle": "placene",
};

const slug = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "-").replace(/(^-|-$)/g, "");

async function load() {
  const arg = process.argv[2];
  if (arg) return JSON.parse(readFileSync(arg, "utf8"));
  const res = await fetch(SRC);
  if (!res.ok) throw new Error(`Stažení selhalo: ${res.status}`);
  return res.json();
}

const data = await load();

const tools = data.map((c) => {
  const id = slug(c.name);
  const platforms = [...new Set((c.os ?? []).map((o) => OS_MAP[o]).filter(Boolean))];
  return {
    id,
    name: c.name,
    description: c.description ?? "",
    category: "klient",
    platforms,
    forApps: (c.compatibility ?? []).map(slug), // -> App.id z Pohledu 2
    price: PRICE_OVERRIDES[id] ?? "unknown",     // ruční dotažení zbytku
    url: c.url ?? "",
    official: (c.categories ?? []).includes("official"),
    featured: false,                              // -> žebříček "Doporučené" (ruční)
    addedAt: c.createdAt ?? "",                   // pozor: hrubý měsíc, = přidání do communityDB
    isOwn: false,
  };
});

const header = `// AUTOGENEROVÁNO generate-tools.mjs ze zdroje FediDB communityDB apps.json (MIT, © Daniel Supernault).
// Jen kategorie "klient". Cena "unknown" = dotáhni ručně. "featured" nastav pro žebříček Doporučené.
import type { Tool } from "./types";

export const clientTools: Tool[] = ${JSON.stringify(tools, null, 2)};
`;
writeFileSync(OUT, header, "utf8");

const plat = {};
for (const t of tools) for (const p of t.platforms) plat[p] = (plat[p] ?? 0) + 1;
console.error(`Klientů: ${tools.length}. Platformy: ${JSON.stringify(plat)}`);
console.error(`Cena doplněna u: ${tools.filter((t) => t.price !== "unknown").length} (zbytek unknown – ruční).`);
console.error("forApps slugy ověř proti App.id z Pohledu 2.");
console.error("Zapsáno -> tools.generated.ts");
