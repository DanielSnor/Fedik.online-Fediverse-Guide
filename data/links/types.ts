// data/links/types.ts
// Sjednocený typ Odkazů / Zdrojů (Pohled 7) — externí ČTENÍ a UČENÍ.
// NEDUPLIKUJE aplikace (Pohled 2) ani nástroje (Pohled 5): proto typ nemá hodnotu „nastroj".
//
// Editorní zdroj: links.seed.ts. Runtime web čte web/links.js (window.FEDIK_LINKS),
// který se ze seedu generuje a validuje scripts/build_links.mjs.
// Konvence repa: vanilla JS / žádný TS build (viz web/apps.js).

export type LinkType = "navod" | "clanek" | "oficialni" | "video";   // „nastroj" záměrně VYPUŠTĚN
export type LinkLanguage = "cs" | "sk" | "en";
export type LinkTheme = "uvod" | "navody" | "technika" | "komunita" | "data";

export type LinkResource = {
  id: string;
  title: string;
  url: string;
  type: LinkType;
  language: LinkLanguage;
  themes: LinkTheme[];     // vícehodnotové
  description: string;     // 1–2 věty česky
  author?: string;
  license?: string;        // např. CC BY-NC-SA 4.0 — drž jako atribuci u videí/CC obsahu
};
