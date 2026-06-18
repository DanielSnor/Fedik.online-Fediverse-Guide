// tools.manual.ts
// Ruční kurátorský seed nástrojů, které communityDB nemá (vše kromě klientů).
// Jen ŽIVÉ nástroje (ověřeno). Twitter crosspostery/migrace záměrně vynechány — po zaříznutí
// Twitter API jsou mrtvé. Živé „crossposting" napříč sítěmi dnes řeší mosty.
// isOwn = projekt Daniela.

import type { Tool } from "./types";

export const manualTools: Tool[] = [
  // ——— MOST (bridge) ———
  {
    id: "bridgy-fed",
    name: "Bridgy Fed",
    description: "Most mezi Fediverse, Bluesky (AT Protocol) a IndieWeb. Překládá profily, sledování, lajky i boosty mezi sítěmi. Aktivuje se přes opt-in následováním účtu mostu.",
    category: "most",
    platforms: ["sluzba"],
    forApps: ["bluesky", "indieweb"],
    price: "zdarma",
    url: "https://fed.brid.gy/",
    sourceCode: "https://github.com/snarfed/bridgy-fed",
    featured: true,
    seeAlsoGlossary: "most",
  },
  {
    id: "mostr",
    name: "Mostr",
    description: "Most mezi Fediverse a Nostr. Umožní sledovat účty napříč oběma protokoly. Veřejná instance běží na mostr.pub.",
    category: "most",
    platforms: ["sluzba"],
    forApps: ["nostr"],
    price: "zdarma",
    url: "https://mostr.pub/",
    featured: true,
    seeAlsoGlossary: "most",
  },

  // ——— OBJEVOVÁNÍ ÚČTŮ ———
  {
    id: "slonik",
    name: "Sloník.online",
    description: "Katalog českého a slovenského Mastodonu — vyhledávání účtů a příspěvků napříč CZ/SK instancemi bez přihlášení.",
    category: "objevovani",
    platforms: ["web"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://slonik.online",
    featured: true,
    isOwn: true,
  },
  {
    id: "katalog-zpravobot",
    name: "Katalog Zprávobot.news",
    description: "Adresář botů na instanci Zprávobot.news — přehled zpravodajských a tematických účtů, které zrcadlí obsah do Mastodonu.",
    category: "objevovani",
    platforms: ["web"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://katalog.zpravobot.news",
    isOwn: true,
  },
  {
    id: "fedi-directory",
    name: "Fedi.Directory",
    description: "Kurátorský seznam zajímavých účtů k sledování, tříděný podle témat. Vede ho tým za Fedi.Tips.",
    category: "objevovani",
    platforms: ["web"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://fedi.directory/",
  },
  {
    id: "streetpass",
    name: "StreetPass",
    description: "Rozšíření prohlížeče, které při běžném surfování odhaluje ověřené odkazy na fediverse profily na webech, které navštívíš.",
    category: "objevovani",
    platforms: ["web"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://streetpass.social/",
    seeAlsoGlossary: "overeni-profilu",
  },

  // ——— RSS / AUTOMATIZACE ———
  {
    id: "zpravobot",
    name: "Zprávobot.news",
    description: "Služba, která zrcadlí obsah z X, Bluesky a RSS kanálů do Mastodonu jako sledovatelné účty. Český projekt.",
    category: "rss",
    platforms: ["sluzba"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://zpravobot.news",
    featured: true,
    isOwn: true,
    seeAlsoGlossary: "rss-fediverse",
  },
  {
    id: "rss-parrot",
    name: "RSS Parrot",
    description: "Promění libovolný RSS kanál ve sledovatelný fediverse účet — sleduješ web přímo z Mastodonu, bez čtečky.",
    category: "rss",
    platforms: ["sluzba"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://rss-parrot.net/",
    seeAlsoGlossary: "rss-fediverse",
  },
  {
    id: "feed2toot",
    name: "feed2toot",
    description: "Open-source nástroj, který automaticky publikuje položky z RSS kanálu na Mastodon účet. Pro vlastní provoz.",
    category: "rss",
    platforms: ["sluzba"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://gitlab.com/chaica/feed2toot",
    sourceCode: "https://gitlab.com/chaica/feed2toot",
    seeAlsoGlossary: "rss-fediverse",
  },

  // ——— KLIENTI (ruční přebití generovaných) ———
  // loops-for-ios + loops-for-android jsou potlačeny v tools.suppress.json; nahrazuje je tato karta.
  {
    id: "loops",
    name: "Loops",
    description: "Oficiální aplikace Loops pro iOS a Android.",
    category: "klient",
    platforms: ["ios", "android"],
    forApps: ["loops"],
    price: "zdarma",
    url: "https://joinloops.org/",
    official: true,
    featured: false,
    isOwn: false,
  },

  // ——— MIGRACE ———
  // Twitter→Mastodon nástroje (Movetodon ad.) jsou po zaříznutí Twitter API mrtvé.
  // Migrace mezi instancemi je vestavěná funkce — odkazujeme na ni a na heslo Slovníčku.
  {
    id: "vestavena-migrace",
    name: "Vestavěná migrace účtu",
    description: "Přesun mezi instancemi se sledujícími je přímo ve funkcích Mastodonu a dalších aplikací — není potřeba žádný externí nástroj. Postup viz Slovníček.",
    category: "migrace",
    platforms: ["sluzba"],
    forApps: ["mastodon"],
    price: "zdarma",
    url: "https://fedi.tips/moving-your-mastodon-account-to-another-server/",
    seeAlsoGlossary: "migrace-uctu",
  },
];
