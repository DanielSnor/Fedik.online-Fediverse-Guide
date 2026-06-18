/* Sdílená taxonomie Fediverse pro pohled „Začni tady" (Blok 3 — matice
   „Odkud přicházíš?" a Blok 4 — průvodce ve 3 krocích). JEDEN ZDROJ PRAVDY.

   Vzor je shodný s links.js (globální `window.*`, ruční editace) — žádný build,
   žádný TS krok. Struktura odpovídá zadání (App / ContentType):

     App         { id, name, contentType, centralizedEquivalent, joinUrl, internalUrl? }
     ContentType { id, label, labelEn, apps: [App.id] }

   joinUrl = cíl ven (oficiální join stránka). internalUrl = interní cíl v rámci
   Fedíka (pohled Instance předfiltrovaný přes ?app=<id>). startLinkUrl(app)
   v app.js vrací internalUrl || joinUrl — stačí tady přepnout pole. NIKDY
   neodkazuj na joinUrl natvrdo v šabloně.

   internalUrl mají jen 4 appky s instancemi v katalogu: mastodon, pixelfed,
   lemmy, piefed. Zbytek zůstává na joinUrl — jinak nováček spadne na prázdný
   filtrovaný seznam.

   POZN.: oficiální URL ověř při nasazení (zvlášť PieFed/Mbin/Loops). */

(function () {
  'use strict';

  // Pořadí typů obsahu shora dolů (Blok 4) i pořadí řádků matice (Blok 3).
  var CONTENT_TYPES = [
    { id: 'microblog',  label: 'Mikroblog a diskuze', labelEn: 'Microblogging & discussion', apps: ['mastodon'] },
    { id: 'photos',     label: 'Fotky',                labelEn: 'Photos',                     apps: ['pixelfed'] },
    { id: 'forum',      label: 'Fórum a agregátor',    labelEn: 'Forums & link aggregators',  apps: ['lemmy', 'piefed', 'mbin'] },
    { id: 'video',      label: 'Video',                labelEn: 'Video',                      apps: ['peertube'] },
    { id: 'shortvideo', label: 'Krátká videa',         labelEn: 'Short videos',               apps: ['loops'] },
    { id: 'books',      label: 'Knihy a čtení',        labelEn: 'Books & reading',            apps: ['bookwyrm'] },
    { id: 'music',      label: 'Hudba',                labelEn: 'Music',                      apps: ['funkwhale'] },
    { id: 'events',     label: 'Události',             labelEn: 'Events',                     apps: ['mobilizon'] },
    { id: 'blog',       label: 'Blog',                 labelEn: 'Blogging',                   apps: ['writefreely', 'ghost'] },
    { id: 'livestream', label: 'Živé vysílání',        labelEn: 'Live streaming',             apps: ['owncast'] },
    { id: 'podcast',    label: 'Podcasty',             labelEn: 'Podcasts',                   apps: ['castopod'] },
    // 'links' používá jen Pohled 2 (Aplikace) — v Pohledu 1 prázdné apps:[] → řádek matice se přeskočí.
    { id: 'links',      label: 'Sdílení odkazů',       labelEn: 'Link sharing',               apps: [] }
  ];

  // App.id → App. centralizedEquivalent = známá centralizovaná služba (Blok 3).
  var APPS = {
    mastodon:    { id: 'mastodon',    name: 'Mastodon',    contentType: 'microblog',  centralizedEquivalent: 'Twitter / X',          joinUrl: 'https://joinmastodon.org', internalUrl: '?app=mastodon' },
    pixelfed:    { id: 'pixelfed',    name: 'Pixelfed',    contentType: 'photos',     centralizedEquivalent: 'Instagram',            joinUrl: 'https://pixelfed.org',     internalUrl: '?app=pixelfed' },
    lemmy:       { id: 'lemmy',       name: 'Lemmy',       contentType: 'forum',      centralizedEquivalent: 'Reddit',               joinUrl: 'https://join-lemmy.org',   internalUrl: '?app=lemmy' },
    piefed:      { id: 'piefed',      name: 'PieFed',      contentType: 'forum',      centralizedEquivalent: 'Reddit',               joinUrl: 'https://piefed.social',    internalUrl: '?app=piefed' },
    mbin:        { id: 'mbin',        name: 'Mbin',        contentType: 'forum',      centralizedEquivalent: 'Reddit',               joinUrl: 'https://joinmbin.org' },
    peertube:    { id: 'peertube',    name: 'PeerTube',    contentType: 'video',      centralizedEquivalent: 'YouTube',              joinUrl: 'https://joinpeertube.org' },
    loops:       { id: 'loops',       name: 'Loops',       contentType: 'shortvideo', centralizedEquivalent: 'TikTok',               joinUrl: 'https://loops.video' },
    bookwyrm:    { id: 'bookwyrm',    name: 'BookWyrm',    contentType: 'books',      centralizedEquivalent: 'Goodreads',            joinUrl: 'https://join-bookwyrm.com' },
    funkwhale:   { id: 'funkwhale',   name: 'Funkwhale',   contentType: 'music',      centralizedEquivalent: 'Spotify / SoundCloud', joinUrl: 'https://funkwhale.audio' },
    mobilizon:   { id: 'mobilizon',   name: 'Mobilizon',   contentType: 'events',     centralizedEquivalent: 'Facebook Events',      joinUrl: 'https://joinmobilizon.org' },
    writefreely: { id: 'writefreely', name: 'WriteFreely', contentType: 'blog',       centralizedEquivalent: 'Medium',               joinUrl: 'https://writefreely.org' },
    ghost:       { id: 'ghost',       name: 'Ghost',       contentType: 'blog',       centralizedEquivalent: 'Medium',               joinUrl: 'https://ghost.org' },
    owncast:     { id: 'owncast',     name: 'Owncast',     contentType: 'livestream', centralizedEquivalent: 'Twitch',               joinUrl: 'https://owncast.online' },
    castopod:    { id: 'castopod',    name: 'Castopod',    contentType: 'podcast',    centralizedEquivalent: 'Spotify (podcasty)',   joinUrl: 'https://castopod.org' }
  };

  window.FEDIK_TAXONOMY = { contentTypes: CONTENT_TYPES, apps: APPS };
})();
