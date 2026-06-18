// data/glossary/types.ts
// Sjednocený typ Slovníčku (Pohled 4 „Slovníček / Jak to funguje").
// Editorní zdroj pravdy je glossary.seed.ts; runtime web čte web/glossary.js
// (window.FEDIK_GLOSSARY), který se z tohoto seedu generuje (scripts/build_glossary.mjs).
//
// Konvence repa: vanilla JS / žádný TS build (viz web/apps.js, generate-apps.mjs).
// Tenhle soubor je KONTRAKT — drží typ pro seed a dokumentaci, neběží v prohlížeči.

export type GlossaryTheme =
  | "ucty" | "federace" | "obsah" | "moderovani" | "soukromi" | "technika";

export type GlossaryType = "pojem" | "postup" | "zkratka";
export type GlossaryLevel = "zakladni" | "pokrocile";

export type GlossaryStep = {
  text: string;
  image?: string;          // cesta ke screenshotu: public/slovnicek/<slug>/NN.png
};

export type GlossaryEntry = {
  id: string;              // slug — stabilní kontrakt: cíl hloubkových odkazů (Pohledy 1–3) i vyhledávání
  term: string;
  aliases?: string[];      // synonyma / EN / zkratky — indexuje vyhledávání
  type: GlossaryType;
  level: GlossaryLevel;
  themes: GlossaryTheme[]; // vícehodnotové
  short: string;           // 1–3 věty, taky indexované
  body?: string;           // delší konceptuální výklad (stárne pomalu)
  steps?: GlossaryStep[];  // jen u type="postup"
  order?: number;          // kurátorské pořadí čtení „pro začátečníky" (nezávislé na level)
  seeAlso?: string[];      // slugy souvisejících hesel (proklikové)
  externalUrl?: string;    // oficiální how-to (Fedi.Tips apod.)
};
