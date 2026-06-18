// data/tools/types.ts
// Sjednocený typ Nástrojů (Pohled 5 „Nástroje").
// Editorní zdroje: tools.generated.ts (klienti, z communityDB apps.json) + tools.manual.ts
// (ostatní kategorie — ručně). Runtime web čte web/tools.js (window.FEDIK_TOOLS),
// který z obou slije a zvaliduje scripts/build_tools.mjs.
//
// Konvence repa: vanilla JS / žádný TS build (viz web/apps.js, generate-apps.mjs).
// Tenhle soubor je KONTRAKT — drží typ pro seedy a dokumentaci, neběží v prohlížeči.

export type ToolCategory =
  | "klient" | "crossposter" | "most" | "objevovani" | "migrace" | "rss" | "analytika";

export type ToolPlatform =
  | "android" | "ios" | "web" | "desktop" | "sluzba";   // "sluzba" = Web/služba (mosty, RSS, crosspostery)

export type ToolPrice = "zdarma" | "freemium" | "placene" | "unknown";

export type Tool = {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  platforms: ToolPlatform[];
  forApps: string[];          // App.id z Pohledu 2 (klienti) nebo sítě (mosty: bluesky/nostr/indieweb)
  price: ToolPrice;
  url: string;
  sourceCode?: string;
  official?: boolean;         // oficiální klient dané aplikace
  featured?: boolean;         // -> žebříček „Doporučené"
  addedAt?: string;           // u klientů hrubý měsíc přidání do communityDB (orientační)
  isOwn?: boolean;            // projekt Daniela — max. decentní odlišení, NE přednostní řazení
  seeAlsoGlossary?: string;   // slug hesla Slovníčku (Pohled 4)
  logoUrl?: string;           // lokální cesta k logu (img/logos/…); injektuje build_tools.mjs z data/tools/logos.js
};
