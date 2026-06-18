/* web/tools.js — Nástroje (Pohled 5). GENEROVÁNO scriptem scripts/build_tools.mjs
   slitím data/tools/tools.generated.ts (klienti, communityDB) + tools.manual.ts (ostatní).
   RUČNĚ NEEDITUJ — uprav seedy a přegeneruj. Typ: data/tools/types.ts (Tool). */
window.FEDIK_TOOLS_BUILT = "2026-06-17T07:59:13.705Z";
window.FEDIK_TOOLS = [
  {
    "id": "mastodon",
    "name": "Mastodon",
    "description": "The official mobile client for Mastodon, offering a polished, easy-to-use interface on Android and iOS.",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://joinmastodon.org/apps",
    "official": true,
    "featured": false,
    "addedAt": "April 2022",
    "isOwn": false,
    "descriptionCs": "Oficiální mobilní klient Mastodonu s vyladěným, snadno použitelným rozhraním pro Android a iOS.",
    "descriptionEn": "The official mobile client for Mastodon, offering a polished, easy-to-use interface on Android and iOS.",
    "logoUrl": "img/logos/mastodon.png"
  },
  {
    "id": "tusky",
    "name": "Tusky",
    "description": "A lightweight, open-source Mastodon client for Android supporting all Mastodon features (photos, videos, lists, custom emojis).",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://tusky.app",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Lehký open-source klient Mastodonu pro Android s podporou všech funkcí (fotky, videa, seznamy, vlastní emoji).",
    "descriptionEn": "A lightweight, open-source Mastodon client for Android supporting all Mastodon features (photos, videos, lists, custom emojis).",
    "logoUrl": "img/logos/tusky.png"
  },
  {
    "id": "subway-tooter",
    "name": "Subway Tooter",
    "description": "A powerful Mastodon client for Android with multi-account, multi-column support.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=jp.juggler.subwaytooter",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Výkonný klient Mastodonu pro Android s více účty a více sloupci.",
    "descriptionEn": "A powerful Mastodon client for Android with multi-account, multi-column support.",
    "logoUrl": "img/logos/subway-tooter.png",
    "sourceCode": "https://github.com/tateisu/SubwayTooter"
  },
  {
    "id": "fedilab",
    "name": "Fedilab",
    "description": "A multifunctional Android client supporting Mastodon, Pleroma, Friendica, and Pixelfed, with features like multi-account and moderation tools.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://fedilab.app",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Multifunkční android klient pro Mastodon, Pleromu, Friendicu a Pixelfed — víc účtů i moderační nástroje.",
    "descriptionEn": "A multifunctional Android client supporting Mastodon, Pleroma, Friendica, and Pixelfed, with features like multi-account and moderation tools.",
    "logoUrl": "img/logos/fedilab.svg"
  },
  {
    "id": "moshidon",
    "name": "Moshidon",
    "description": "An open-source Android Mastodon client (forked from Megalodon) adding missing features like federated timeline support.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://lucasggamerm.github.io/moshidon/",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source android klient Mastodonu (fork Megalodonu) doplňující chybějící funkce, třeba federovanou osu.",
    "descriptionEn": "An open-source Android Mastodon client (forked from Megalodon) adding missing features like federated timeline support.",
    "logoUrl": "img/logos/moshidon.png"
  },
  {
    "id": "rodent",
    "name": "Rodent",
    "description": "An Android client for Mastodon that implements most common features and introduces innovative twists for an enhanced experience.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://mastodonrodent.app",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Android klient Mastodonu s většinou běžných funkcí a několika inovativními vychytávkami.",
    "descriptionEn": "An Android client for Mastodon that implements most common features and introduces innovative twists for an enhanced experience.",
    "logoUrl": "img/logos/rodent.png"
  },
  {
    "id": "pachli",
    "name": "Pachli",
    "description": "A full-featured Android Mastodon client developed cooperatively, including filters, translations, and many power-user features.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://pachli.app",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Plnohodnotný android klient Mastodonu vyvíjený komunitně — filtry, překlady a spousta pokročilých funkcí.",
    "descriptionEn": "A full-featured Android Mastodon client developed cooperatively, including filters, translations, and many power-user features.",
    "logoUrl": "img/logos/pachli.png"
  },
  {
    "id": "fread",
    "name": "Fread",
    "description": "A next-generation microblogging client for Android that supports Mastodon, Bluesky, and RSS in one place.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=com.zhangke.fread",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Mikroblogovací klient nové generace pro Android — Mastodon, Bluesky i RSS na jednom místě.",
    "descriptionEn": "A next-generation microblogging client for Android that supports Mastodon, Bluesky, and RSS in one place.",
    "logoUrl": "img/logos/fread.png",
    "sourceCode": "https://github.com/0xZhangKe/Fread"
  },
  {
    "id": "toot",
    "name": "Toot!",
    "description": "A well-designed, feature-rich Mastodon client for iOS known for its playful interface and powerful functionality.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "placene",
    "url": "https://apps.apple.com/app/toot/id1229021451",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Pěkně navržený a funkčně bohatý klient Mastodonu pro iOS, známý hravým rozhraním.",
    "descriptionEn": "A well-designed, feature-rich Mastodon client for iOS known for its playful interface and powerful functionality.",
    "logoUrl": "img/logos/toot.png"
  },
  {
    "id": "imast",
    "name": "iMast",
    "description": "An open-source Mastodon client for iOS originating from Japan, offering advanced features and custom emoji support.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/app/id1229461703",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source klient Mastodonu pro iOS původem z Japonska s pokročilými funkcemi a vlastními emoji.",
    "descriptionEn": "An open-source Mastodon client for iOS originating from Japan, offering advanced features and custom emoji support.",
    "logoUrl": "img/logos/imast.jpg",
    "sourceCode": "https://github.com/cinderella-project/iMast"
  },
  {
    "id": "ice-cubes",
    "name": "Ice Cubes",
    "description": "A free, open-source Mastodon client for iOS/macOS that embraces the latest Apple UI designs and offers multiple account support.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/ice-cubes-for-mastodon/id6444915884",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Svobodný open-source klient Mastodonu pro iOS/macOS v nejnovějším designu Applu, s více účty.",
    "descriptionEn": "A free, open-source Mastodon client for iOS/macOS that embraces the latest Apple UI designs and offers multiple account support.",
    "logoUrl": "img/logos/ice-cubes.png"
  },
  {
    "id": "ivory",
    "name": "Ivory",
    "description": "A premium Mastodon client for iOS by Tapbots (makers of Tweetbot), featuring a refined interface and powerful customization options.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "placene",
    "url": "https://apps.apple.com/app/id6444602274",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Prémiový klient Mastodonu pro iOS od Tapbots (tvůrci Tweetbotu) s vybroušeným rozhraním a bohatým přizpůsobením.",
    "descriptionEn": "A premium Mastodon client for iOS by Tapbots (makers of Tweetbot), featuring a refined interface and powerful customization options.",
    "logoUrl": "img/logos/ivory.png"
  },
  {
    "id": "woolly",
    "name": "Woolly",
    "description": "A paid Mastodon app for iOS that offers a slick, intuitive interface with ample customization, aiming to feel at home on Apple devices.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/woolly-for-mastodon/id6444360628",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Placená aplikace Mastodonu pro iOS s elegantním intuitivním rozhraním a velkým přizpůsobením.",
    "descriptionEn": "A paid Mastodon app for iOS that offers a slick, intuitive interface with ample customization, aiming to feel at home on Apple devices.",
    "logoUrl": "img/logos/woolly.png"
  },
  {
    "id": "dawn-for-mastodon",
    "name": "DAWN for Mastodon",
    "description": "A feature-rich Mastodon client for iOS with an elegant design, supporting multiple columns and advanced filtering.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/dawn-for-mastodon/id1668645019",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Funkčně bohatý klient Mastodonu pro iOS s elegantním designem, více sloupci a pokročilým filtrováním.",
    "descriptionEn": "A feature-rich Mastodon client for iOS with an elegant design, supporting multiple columns and advanced filtering.",
    "logoUrl": "img/logos/dawn-for-mastodon.png"
  },
  {
    "id": "mona",
    "name": "Mona",
    "description": "A powerful Mastodon client for iOS (inspired by the Tapbots' apps) offering extensive customization, multiple columns, and a smooth user experience.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "placene",
    "url": "https://apps.apple.com/us/app/mona-for-mastodon/id1659154653",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Výkonný klient Mastodonu pro iOS (inspirovaný aplikacemi Tapbots) s rozsáhlým přizpůsobením a více sloupci.",
    "descriptionEn": "A powerful Mastodon client for iOS (inspired by the Tapbots' apps) offering extensive customization, multiple columns, and a smooth user experience.",
    "logoUrl": "img/logos/mona.png"
  },
  {
    "id": "radiant",
    "name": "Radiant",
    "description": "A modern Mastodon client for iOS with a focus on visual appeal and simplicity, providing a seamless browsing experience.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/app/id6444323022",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Moderní klient Mastodonu pro iOS s důrazem na vzhled a jednoduchost.",
    "descriptionEn": "A modern Mastodon client for iOS with a focus on visual appeal and simplicity, providing a seamless browsing experience.",
    "logoUrl": "img/logos/radiant.png"
  },
  {
    "id": "feather",
    "name": "feather",
    "description": "A Mastodon app for iOS that emphasizes comfort and customization, renewing your Mastodon experience on mobile.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/feather-for-mastodon/id6446263061",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Aplikace Mastodonu pro iOS s důrazem na pohodlí a přizpůsobení.",
    "descriptionEn": "A Mastodon app for iOS that emphasizes comfort and customization, renewing your Mastodon experience on mobile.",
    "logoUrl": "img/logos/feather.png"
  },
  {
    "id": "sorasns",
    "name": "SoraSNS",
    "description": "A futuristic iOS Fediverse client supporting Mastodon, Bluesky, Misskey (Firefish), offering a unified and beautiful experience across networks.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/sorasns-for-mastodon-bluesky/id6450969760",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Futuristický iOS klient Fediverse pro Mastodon, Bluesky i Misskey (Firefish) — jednotný zážitek napříč sítěmi.",
    "descriptionEn": "A futuristic iOS Fediverse client supporting Mastodon, Bluesky, Misskey (Firefish), offering a unified and beautiful experience across networks.",
    "logoUrl": "img/logos/sorasns.jpg"
  },
  {
    "id": "pipilo",
    "name": "Pipilo",
    "description": "A Mastodon client for iOS with a focus on simplicity and clean design, delivering a straightforward social browsing experience.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/pipilo/id1584544719",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Klient Mastodonu pro iOS s důrazem na jednoduchost a čistý design.",
    "descriptionEn": "A Mastodon client for iOS with a focus on simplicity and clean design, delivering a straightforward social browsing experience.",
    "logoUrl": "img/logos/pipilo.png"
  },
  {
    "id": "pixelfed",
    "name": "Pixelfed",
    "description": "The official mobile app for Pixelfed, providing a decentralized Instagram-like experience on Android and iOS.",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://pixelfed.org/mobile-apps",
    "official": true,
    "featured": false,
    "addedAt": "January 2025",
    "isOwn": false,
    "descriptionCs": "Oficiální mobilní aplikace Pixelfedu — decentralizovaný zážitek ve stylu Instagramu na Androidu a iOS.",
    "descriptionEn": "The official mobile app for Pixelfed, providing a decentralized Instagram-like experience on Android and iOS.",
    "logoUrl": "img/logos/pixelfed.png"
  },
  {
    "id": "pixeldroid",
    "name": "PixelDroid",
    "description": "An open-source Android client for Pixelfed that lets you browse feeds, view profiles, and share photos on the federated image platform.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://f-droid.org/en/packages/org.pixeldroid.app/",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source android klient Pixelfedu na prohlížení feedů, profilů a sdílení fotek.",
    "descriptionEn": "An open-source Android client for Pixelfed that lets you browse feeds, view profiles, and share photos on the federated image platform.",
    "logoUrl": "img/logos/pixeldroid.png"
  },
  {
    "id": "pixelix",
    "name": "Pixelix",
    "description": "A user-friendly Pixelfed client for Android and iOS focused on easy photo uploads, browsing, and sharing.",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://app.pixelix.social",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Přívětivý klient Pixelfedu pro Android a iOS zaměřený na snadné nahrávání a prohlížení fotek.",
    "descriptionEn": "A user-friendly Pixelfed client for Android and iOS focused on easy photo uploads, browsing, and sharing.",
    "logoUrl": "img/logos/pixelix.svg"
  },
  {
    "id": "impressia",
    "name": "Impressia",
    "description": "A simple and intuitive Pixelfed client for iOS that showcases photos in a clean timeline and allows easy sharing and exploration.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/impressia-for-pixelfed/id1663543216",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Jednoduchý a intuitivní klient Pixelfedu pro iOS s přehlednou osou fotek a snadným sdílením.",
    "descriptionEn": "A simple and intuitive Pixelfed client for iOS that showcases photos in a clean timeline and allows easy sharing and exploration.",
    "logoUrl": "img/logos/impressia.png"
  },
  {
    "id": "husky",
    "name": "Husky",
    "description": "A fast, lightweight Android client for Pleroma and Mastodon, supporting Pleroma-specific features like emoji reactions and unlimited attachments.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "pleroma"
    ],
    "price": "unknown",
    "url": "https://husky.adol.pw",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Rychlý a lehký android klient Pleromy a Mastodonu s podporou specialit Pleromy (emoji reakce, neomezené přílohy).",
    "descriptionEn": "A fast, lightweight Android client for Pleroma and Mastodon, supporting Pleroma-specific features like emoji reactions and unlimited attachments.",
    "logoUrl": "img/logos/husky.png"
  },
  {
    "id": "twidere",
    "name": "Twidere",
    "description": "A long-standing open-source Twitter client that now supports Mastodon/Pleroma as well, offering a material design interface on Android.",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "pleroma"
    ],
    "price": "unknown",
    "url": "https://github.com/TwidereProject",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Zavedený open-source klient (původně pro Twitter), který nově podporuje i Mastodon/Pleromu — Material Design na Androidu.",
    "descriptionEn": "A long-standing open-source Twitter client that now supports Mastodon/Pleroma as well, offering a material design interface on Android.",
    "logoUrl": "img/logos/twidere.png"
  },
  {
    "id": "peertube",
    "name": "PeerTube",
    "description": "The official mobile app for PeerTube, allowing you to discover, browse, and play decentralized videos on Android and iOS.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "peertube"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=org.framasoft.peertube",
    "official": true,
    "featured": false,
    "addedAt": "December 2024",
    "isOwn": false,
    "descriptionCs": "Oficiální mobilní aplikace PeerTube — objevuj a přehrávej decentralizovaná videa na Androidu a iOS.",
    "descriptionEn": "The official mobile app for PeerTube, allowing you to discover, browse, and play decentralized videos on Android and iOS.",
    "logoUrl": "img/logos/peertube.png"
  },
  {
    "id": "newpipe",
    "name": "NewPipe",
    "description": "A lightweight Android streaming frontend that supports PeerTube alongside other video platforms, enabling privacy-friendly video watching.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "peertube"
    ],
    "price": "unknown",
    "url": "https://newpipe.net",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Lehký streamovací frontend pro Android s podporou PeerTube i dalších platforem, šetrný k soukromí.",
    "descriptionEn": "A lightweight Android streaming frontend that supports PeerTube alongside other video platforms, enabling privacy-friendly video watching.",
    "logoUrl": "img/logos/newpipe.png"
  },
  {
    "id": "grayjay",
    "name": "Grayjay",
    "description": "A source-first video player and aggregator (mobile-focused) that supports PeerTube and other sources for a unified viewing experience.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "peertube"
    ],
    "price": "unknown",
    "url": "https://grayjay.app",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Přehrávač a agregátor videí (hlavně mobilní) s podporou PeerTube i dalších zdrojů v jednom.",
    "descriptionEn": "A source-first video player and aggregator (mobile-focused) that supports PeerTube and other sources for a unified viewing experience.",
    "logoUrl": "img/logos/grayjay.png"
  },
  {
    "id": "jerboa",
    "name": "Jerboa",
    "description": "The official Lemmy app for Android, offering a native Reddit-like experience for Lemmy’s federated communities.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=com.jerboa",
    "official": true,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Oficiální aplikace Lemmy pro Android — nativní reddit-like zážitek pro federované komunity.",
    "descriptionEn": "The official Lemmy app for Android, offering a native Reddit-like experience for Lemmy’s federated communities.",
    "logoUrl": "img/logos/jerboa.png",
    "sourceCode": "https://github.com/LemmyNet/jerboa"
  },
  {
    "id": "voyager",
    "name": "Voyager",
    "description": "An Apollo-inspired open source Lemmy client (formerly \"wefwef\") available on web, Android, and iOS, focused on a mobile-first, smooth UI.",
    "category": "klient",
    "platforms": [
      "android",
      "ios",
      "web"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://wefwef.app",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source klient Lemmy inspirovaný Apollem (dříve „wefwef“) — web, Android i iOS, mobile-first UI.",
    "descriptionEn": "An Apollo-inspired open source Lemmy client (formerly \"wefwef\") available on web, Android, and iOS, focused on a mobile-first, smooth UI.",
    "logoUrl": "img/logos/voyager.png"
  },
  {
    "id": "thunder",
    "name": "Thunder",
    "description": "A fully open-source Lemmy client built with Flutter, providing a unified experience on Android and iOS with a material design.",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://github.com/thunder-app/thunder",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Plně open-source klient Lemmy postavený na Flutteru — jednotný Material Design na Androidu i iOS.",
    "descriptionEn": "A fully open-source Lemmy client built with Flutter, providing a unified experience on Android and iOS with a material design.",
    "logoUrl": "img/logos/thunder.png"
  },
  {
    "id": "memmy",
    "name": "Memmy",
    "description": "An Apollo-inspired Lemmy client built with React Native, offering a sleek Reddit-like interface on iOS (and Android).",
    "category": "klient",
    "platforms": [
      "ios",
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://github.com/memmy-app/memmy",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Klient Lemmy inspirovaný Apollem, postavený na React Native — elegantní reddit-like rozhraní na iOS (i Androidu).",
    "descriptionEn": "An Apollo-inspired Lemmy client built with React Native, offering a sleek Reddit-like interface on iOS (and Android).",
    "logoUrl": "img/logos/memmy.png"
  },
  {
    "id": "avelon",
    "name": "Avelon",
    "description": "A sleek, lightning-fast Lemmy app for iOS inspired by Apollo, featuring customizable gestures and a native iOS look and feel.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/avelon-for-lemmy/id6450952178",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Svižná aplikace Lemmy pro iOS inspirovaná Apollem s přizpůsobitelnými gesty a nativním vzhledem iOS.",
    "descriptionEn": "A sleek, lightning-fast Lemmy app for iOS inspired by Apollo, featuring customizable gestures and a native iOS look and feel.",
    "logoUrl": "img/logos/avelon.png"
  },
  {
    "id": "boost-for-lemmy",
    "name": "Boost for Lemmy",
    "description": "A smooth Lemmy browsing app for Android designed to provide a seamless experience on the decentralized platform.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=com.rubenmayayo.lemmy",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Plynulá aplikace na prohlížení Lemmy pro Android s bezešvým zážitkem na decentralizované platformě.",
    "descriptionEn": "A smooth Lemmy browsing app for Android designed to provide a seamless experience on the decentralized platform.",
    "logoUrl": "img/logos/boost-for-lemmy.png"
  },
  {
    "id": "connect-for-lemmy",
    "name": "Connect for Lemmy",
    "description": "A native Android Lemmy application modeled after Sync for Reddit, offering secure login, commenting, messaging, and more.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=com.kuroneko.lemmy_connect",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Nativní android aplikace Lemmy po vzoru Sync for Reddit — bezpečné přihlášení, komentáře, zprávy a další.",
    "descriptionEn": "A native Android Lemmy application modeled after Sync for Reddit, offering secure login, commenting, messaging, and more.",
    "logoUrl": "img/logos/connect-for-lemmy.png"
  },
  {
    "id": "eternity",
    "name": "Eternity",
    "description": "Previously known as Infinity for Lemmy, this Android app is a fork of a popular Reddit client (Infinity) adapted for Lemmy’s federated communities.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=eu.toldi.infinityforlemmy",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Android aplikace Lemmy (dříve Infinity for Lemmy), fork populárního reddit klienta Infinity.",
    "descriptionEn": "Previously known as Infinity for Lemmy, this Android app is a fork of a popular Reddit client (Infinity) adapted for Lemmy’s federated communities.",
    "logoUrl": "img/logos/eternity.png"
  },
  {
    "id": "sync-for-lemmy",
    "name": "Sync for Lemmy",
    "description": "An Android app by a former Sync for Reddit developer, reimagined for Lemmy to provide a full-featured browsing experience with familiar design.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=io.syncapps.lemmy_sync",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Android aplikace od bývalého vývojáře Sync for Reddit, přepracovaná pro Lemmy do plnohodnotného zážitku.",
    "descriptionEn": "An Android app by a former Sync for Reddit developer, reimagined for Lemmy to provide a full-featured browsing experience with familiar design.",
    "logoUrl": "img/logos/sync-for-lemmy.png"
  },
  {
    "id": "summit",
    "name": "Summit",
    "description": "A Lemmy client for Android focused on ease of use, enabling browsing of hundreds of Lemmy communities with a straightforward interface.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=com.idunnololz.summit",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Klient Lemmy pro Android s důrazem na snadné použití — procházej stovky komunit přehledným rozhraním.",
    "descriptionEn": "A Lemmy client for Android focused on ease of use, enabling browsing of hundreds of Lemmy communities with a straightforward interface.",
    "logoUrl": "img/logos/summit.png"
  },
  {
    "id": "arctius-fennec",
    "name": "Arctius (Fennec)",
    "description": "An open-source Lemmy client for Android formerly known as Fennec, emphasizing simplicity and accessibility in a beta stage.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://github.com/nick-delirium/lemmy-fennec",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source klient Lemmy pro Android (dříve Fennec) s důrazem na jednoduchost a přístupnost, v beta fázi.",
    "descriptionEn": "An open-source Lemmy client for Android formerly known as Fennec, emphasizing simplicity and accessibility in a beta stage.",
    "logoUrl": "img/logos/arctius-fennec.png"
  },
  {
    "id": "lemmios",
    "name": "Lemmios",
    "description": "An open-source Lemmy client for iOS attempting to bring the elegance of Apollo for Reddit to Lemmy, currently in beta.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/lemmios/id6451038204",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source klient Lemmy pro iOS, který chce přinést eleganci Apolla — zatím v betě.",
    "descriptionEn": "An open-source Lemmy client for iOS attempting to bring the elegance of Apollo for Reddit to Lemmy, currently in beta.",
    "logoUrl": "img/logos/lemmios.png"
  },
  {
    "id": "raccoon",
    "name": "Raccoon",
    "description": "A Kotlin Multiplatform Lemmy client (Android focus) aiming to provide a native experience and currently in active development.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://github.com/LiveFastEatTrashRaccoon/RaccoonForLemmy?tab=readme-ov-file#want-to-try-it-out",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Klient Lemmy v Kotlin Multiplatform (hlavně Android) mířící na nativní zážitek, v aktivním vývoji.",
    "descriptionEn": "A Kotlin Multiplatform Lemmy client (Android focus) aiming to provide a native experience and currently in active development.",
    "logoUrl": "img/logos/raccoon.png"
  },
  {
    "id": "photon",
    "name": "Photon",
    "description": "An opinionated web client for Lemmy to help users discover the fediverse.",
    "category": "klient",
    "platforms": [
      "web"
    ],
    "forApps": [
      "lemmy"
    ],
    "price": "unknown",
    "url": "https://phtn.app/",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Webový klient Lemmy s vyhraněným přístupem, který pomáhá objevovat Fediverse.",
    "descriptionEn": "An opinionated web client for Lemmy to help users discover the fediverse.",
    "logoUrl": "img/logos/photon.svg"
  },
  {
    "id": "milktea",
    "name": "Milktea",
    "description": "An Android Misskey client that lets you quickly access multiple timelines via tabs, including nickname support for users.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "misskey"
    ],
    "price": "unknown",
    "url": "https://play.google.com/store/apps/details?id=jp.panta.misskeyandroidclient",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Android klient Misskey s rychlým přepínáním více os přes záložky a podporou přezdívek.",
    "descriptionEn": "An Android Misskey client that lets you quickly access multiple timelines via tabs, including nickname support for users.",
    "logoUrl": "img/logos/milktea.png"
  },
  {
    "id": "miria",
    "name": "Miria",
    "description": "A cross-platform Misskey client (iOS, macOS, Android) built with Flutter, featuring unique Misskey features like custom emoji tab icons.",
    "category": "klient",
    "platforms": [
      "ios",
      "android",
      "desktop"
    ],
    "forApps": [
      "misskey"
    ],
    "price": "unknown",
    "url": "https://shiosyakeyakini.info/miria_web/index.html",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Multiplatformní klient Misskey (iOS, macOS, Android) na Flutteru se specialitami Misskey (vlastní emoji v ikonách záložek).",
    "descriptionEn": "A cross-platform Misskey client (iOS, macOS, Android) built with Flutter, featuring unique Misskey features like custom emoji tab icons.",
    "logoUrl": "img/logos/miria.png"
  },
  {
    "id": "misscat",
    "name": "MissCat",
    "description": "A native Misskey client for iOS aimed at intuitive operation on smartphones, with a focus on smooth usability.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "misskey"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/misscat-misskey-%E3%82%AF%E3%83%A9%E3%82%A4%E3%82%A2%E3%83%B3%E3%83%88/id1505059993",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Nativní klient Misskey pro iOS zaměřený na intuitivní ovládání na telefonu.",
    "descriptionEn": "A native Misskey client for iOS aimed at intuitive operation on smartphones, with a focus on smooth usability.",
    "logoUrl": "img/logos/misscat.png"
  },
  {
    "id": "socialhub",
    "name": "SocialHub",
    "description": "A paid iOS app that supports Misskey alongside Mastodon, Twitter, Slack, and Tumblr, serving as a multi-network client.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "misskey",
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/app/id1474451582",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Placená iOS aplikace, která vedle Misskey podporuje i Mastodon, Twitter, Slack a Tumblr — klient pro víc sítí.",
    "descriptionEn": "A paid iOS app that supports Misskey alongside Mastodon, Twitter, Slack, and Tumblr, serving as a multi-network client.",
    "logoUrl": "img/logos/socialhub.jpg"
  },
  {
    "id": "aria-for-misskey",
    "name": "Aria for Misskey",
    "description": "A comprehensive Android client for Misskey that supports most Misskey features, with multiple account swipe-switching and a UI resembling the official web client.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "misskey"
    ],
    "price": "unknown",
    "url": "https://github.com/poppingmoon/Aria",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Komplexní android klient Misskey s většinou funkcí, přepínáním účtů swipnutím a UI podle oficiálního webu.",
    "descriptionEn": "A comprehensive Android client for Misskey that supports most Misskey features, with multiple account swipe-switching and a UI resembling the official web client.",
    "logoUrl": "img/logos/aria-for-misskey.png"
  },
  {
    "id": "kimis",
    "name": "Kimis",
    "description": "A fully-featured Misskey client for iOS (also on macOS/iPadOS) with a smooth UI, supporting any Misskey v13+ instance and offering high-performance scrolling.",
    "category": "klient",
    "platforms": [
      "ios",
      "desktop"
    ],
    "forApps": [
      "misskey"
    ],
    "price": "unknown",
    "url": "https://github.com/Lakr233/Kimis",
    "official": false,
    "featured": false,
    "addedAt": "July 2023",
    "isOwn": false,
    "descriptionCs": "Plnohodnotný klient Misskey pro iOS (i macOS/iPadOS) s plynulým UI a podporou instancí Misskey v13+.",
    "descriptionEn": "A fully-featured Misskey client for iOS (also on macOS/iPadOS) with a smooth UI, supporting any Misskey v13+ instance and offering high-performance scrolling.",
    "logoUrl": "img/logos/kimis.jpg"
  },
  {
    "id": "takesama",
    "name": "Takesama",
    "description": "A dual Mastodon/Misskey client available on Android (and iOS) that addresses issues from other clients and supports multiple accounts across instances.",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "misskey",
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://takesama.com/",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Duální klient Mastodon/Misskey pro Android (i iOS) řešící neduhy jiných klientů, s více účty napříč instancemi.",
    "descriptionEn": "A dual Mastodon/Misskey client available on Android (and iOS) that addresses issues from other clients and supports multiple accounts across instances.",
    "logoUrl": "img/logos/takesama.png"
  },
  {
    "id": "funkwhale-android",
    "name": "Funkwhale (Android)",
    "description": "The official Android app for Funkwhale, allowing you to stream music and podcasts from your Funkwhale server with a native interface.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "funkwhale"
    ],
    "price": "unknown",
    "url": "https://f-droid.org/en/packages/audio.funkwhale.ffa/",
    "official": true,
    "featured": false,
    "addedAt": "July 2022",
    "isOwn": false,
    "descriptionCs": "Oficiální android aplikace Funkwhale — streamuj hudbu a podcasty z vlastního serveru v nativním rozhraní.",
    "descriptionEn": "The official Android app for Funkwhale, allowing you to stream music and podcasts from your Funkwhale server with a native interface.",
    "logoUrl": "img/logos/funkwhale.svg"
  },
  {
    "id": "dsub",
    "name": "DSub",
    "description": "A mature Android music client (originally for Subsonic) that works with Funkwhale via its Subsonic API, supporting offline caching and playlist management.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "funkwhale"
    ],
    "price": "unknown",
    "url": "https://f-droid.org/en/packages/github.daneren2005.dsub/",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Vyzrálý android hudební klient (původně pro Subsonic), který funguje s Funkwhale přes Subsonic API — offline i playlisty.",
    "descriptionEn": "A mature Android music client (originally for Subsonic) that works with Funkwhale via its Subsonic API, supporting offline caching and playlist management.",
    "logoUrl": "img/logos/dsub.png"
  },
  {
    "id": "ultrasonic",
    "name": "Ultrasonic",
    "description": "An open-source Android Subsonic client that can connect to Funkwhale, offering a modern interface to stream your music library.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "funkwhale"
    ],
    "price": "unknown",
    "url": "https://f-droid.org/en/packages/org.moire.ultrasonic/",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source android Subsonic klient, který se připojí k Funkwhale a nabízí moderní rozhraní pro streamování hudby.",
    "descriptionEn": "An open-source Android Subsonic client that can connect to Funkwhale, offering a modern interface to stream your music library.",
    "logoUrl": "img/logos/ultrasonic.png"
  },
  {
    "id": "substreamer",
    "name": "Substreamer",
    "description": "A free iOS app (also available on tvOS) that streams music from Funkwhale using the Subsonic API, with a polished interface for browsing and playback.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "funkwhale"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/substreamer/id1012991665",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Bezplatná iOS aplikace (i pro tvOS) streamující hudbu z Funkwhale přes Subsonic API, s vyladěným prohlížením a přehráváním.",
    "descriptionEn": "A free iOS app (also available on tvOS) that streams music from Funkwhale using the Subsonic API, with a polished interface for browsing and playback.",
    "logoUrl": "img/logos/substreamer.png"
  },
  {
    "id": "play-sub",
    "name": "play:Sub",
    "description": "A proprietary iOS music streamer for Subsonic-compatible servers (including Funkwhale), enabling library browsing and offline listening.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "funkwhale"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/play-sub-music-streamer/id955329386",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Proprietární iOS přehrávač pro Subsonic-kompatibilní servery (včetně Funkwhale) — procházení knihovny a offline poslech.",
    "descriptionEn": "A proprietary iOS music streamer for Subsonic-compatible servers (including Funkwhale), enabling library browsing and offline listening.",
    "logoUrl": "img/logos/play-sub.png"
  },
  {
    "id": "amperfy",
    "name": "Amperfy",
    "description": "An open-source iOS Subsonic client that works with Funkwhale, featuring a clean UI and support for playlists and favorites.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "funkwhale"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/amperfy-music/id1530145038",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Open-source iOS Subsonic klient fungující s Funkwhale, s čistým UI a podporou playlistů a oblíbených.",
    "descriptionEn": "An open-source iOS Subsonic client that works with Funkwhale, featuring a clean UI and support for playlists and favorites.",
    "logoUrl": "img/logos/amperfy.png"
  },
  {
    "id": "writefreely-for-ios",
    "name": "WriteFreely for iOS",
    "description": "The official iOS app for WriteFreely, featuring a distraction-free editor to write and publish to any WriteFreely instance or Write.as blog.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "writefreely"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/us/app/writefreely/id1531530896",
    "official": true,
    "featured": false,
    "addedAt": "August 2024",
    "isOwn": false,
    "descriptionCs": "Oficiální iOS aplikace WriteFreely s editorem bez rušivých prvků pro psaní na libovolnou instanci WriteFreely či Write.as.",
    "descriptionEn": "The official iOS app for WriteFreely, featuring a distraction-free editor to write and publish to any WriteFreely instance or Write.as blog.",
    "logoUrl": "img/logos/writefreely.png"
  },
  {
    "id": "indiepass",
    "name": "IndiePass",
    "description": "An open-source Android app supporting IndieWeb Micropub (for publishing to WriteFreely and similar) as well as Fediverse APIs (Mastodon, Pixelfed), allowing posting and reading across platforms.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "writefreely",
      "mastodon",
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://indiepass.app",
    "official": false,
    "featured": false,
    "addedAt": "May 2023",
    "isOwn": false,
    "descriptionCs": "Open-source android aplikace s podporou IndieWeb Micropub (publikování do WriteFreely ad.) i Fediverse API (Mastodon, Pixelfed).",
    "descriptionEn": "An open-source Android app supporting IndieWeb Micropub (for publishing to WriteFreely and similar) as well as Fediverse APIs (Mastodon, Pixelfed), allowing posting and reading across platforms.",
    "logoUrl": "img/logos/indiepass.svg"
  },
  {
    "id": "elk",
    "name": "Elk",
    "description": "A nimble Mastodon web client providing a clean, modern interface for browsing, posting, and interacting with Mastodon timelines directly in your browser.",
    "category": "klient",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://elk.zone",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Hbitý webový klient Mastodonu s čistým moderním rozhraním na prohlížení, psaní a interakce přímo v prohlížeči.",
    "descriptionEn": "A nimble Mastodon web client providing a clean, modern interface for browsing, posting, and interacting with Mastodon timelines directly in your browser.",
    "logoUrl": "img/logos/elk.png"
  },
  {
    "id": "fedica",
    "name": "Fedica",
    "description": "An all-in-one web tool for publishing, scheduling, and analyzing Mastodon content—automate posts and measure engagement through a unified dashboard.",
    "category": "klient",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://fedica.com",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "All-in-one webový nástroj na publikování, plánování a analýzu obsahu na Mastodonu — automatizace a měření dosahu v jednom panelu.",
    "descriptionEn": "An all-in-one web tool for publishing, scheduling, and analyzing Mastodon content—automate posts and measure engagement through a unified dashboard.",
    "logoUrl": "img/logos/fedica.png"
  },
  {
    "id": "phanpy",
    "name": "Phanpy",
    "description": "A minimalistic, opinionated Mastodon web client focused on simplicity and performance; distributed as a static web app you can self‑host or use online.",
    "category": "klient",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://phanpy.social",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Minimalistický vyhraněný webový klient Mastodonu zaměřený na jednoduchost a výkon; statická webová appka pro vlastní provoz i online.",
    "descriptionEn": "A minimalistic, opinionated Mastodon web client focused on simplicity and performance; distributed as a static web app you can self‑host or use online.",
    "logoUrl": "img/logos/phanpy.png"
  },
  {
    "id": "ghost-social-web-reader",
    "name": "Ghost Social Web Reader",
    "description": "An integrated web reader in Ghost(Pro) that lets you follow, read, and interact with Mastodon and other federated content from within the Ghost admin interface, featuring dedicated feed and inbox views.",
    "category": "klient",
    "platforms": [
      "web"
    ],
    "forApps": [
      "ghost",
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://activitypub.ghost.org/social-web-beta/",
    "official": true,
    "featured": false,
    "addedAt": "March 2025",
    "isOwn": false,
    "descriptionCs": "Vestavěná webová čtečka v Ghost(Pro), která umožní sledovat a číst Mastodon a další federovaný obsah přímo v administraci Ghostu.",
    "descriptionEn": "An integrated web reader in Ghost(Pro) that lets you follow, read, and interact with Mastodon and other federated content from within the Ghost admin interface, featuring dedicated feed and inbox views.",
    "logoUrl": "img/logos/ghost.png"
  },
  {
    "id": "flipboard",
    "name": "Flipboard",
    "description": "The official Flipboard app supports ActivityPub federation, allowing users to follow and interact with Mastodon and Pixelfed accounts alongside curated news feeds.",
    "category": "klient",
    "platforms": [
      "android",
      "ios",
      "web"
    ],
    "forApps": [
      "flipboard",
      "mastodon",
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://about.flipboard.com/inside-flipboard/you-can-now-connect-your-pixelfed-account-to-flipboard/",
    "official": true,
    "featured": false,
    "addedAt": "May 2023",
    "isOwn": false,
    "descriptionCs": "Oficiální aplikace Flipboard podporuje federaci přes ActivityPub — sleduj účty z Mastodonu a Pixelfedu vedle kurátorovaných zpráv.",
    "descriptionEn": "The official Flipboard app supports ActivityPub federation, allowing users to follow and interact with Mastodon and Pixelfed accounts alongside curated news feeds.",
    "logoUrl": "img/logos/flipboard.svg"
  },
  {
    "id": "statuzer",
    "name": "Statuzer",
    "description": "Multi-accounts, multi-columns Mastodon client.",
    "category": "klient",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://statuzer.com",
    "official": false,
    "featured": false,
    "addedAt": "",
    "isOwn": false,
    "descriptionCs": "Klient Mastodonu s více účty a více sloupci.",
    "descriptionEn": "Multi-accounts, multi-columns Mastodon client.",
    "logoUrl": "img/logos/statuzer.png"
  },
  {
    "id": "wafrn",
    "name": "Wafrn",
    "description": "The official mobile app for Wafrn, with some different design decisions than the web version. Wafrn is a social network inspired by Tumblr that connects to the Fediverse and Bluesky",
    "category": "klient",
    "platforms": [
      "android",
      "ios"
    ],
    "forApps": [
      "wafrn"
    ],
    "price": "unknown",
    "url": "https://wafrn.net",
    "official": true,
    "featured": false,
    "addedAt": "Aug 2024",
    "isOwn": false,
    "descriptionCs": "Oficiální mobilní aplikace Wafrn s jinými designovými volbami než web. Wafrn je síť inspirovaná Tumblrem, napojená na Fediverse a Bluesky.",
    "descriptionEn": "The official mobile app for Wafrn, with some different design decisions than the web version. Wafrn is a social network inspired by Tumblr that connects to the Fediverse and Bluesky",
    "logoUrl": "img/logos/wafrn.png"
  },
  {
    "id": "fedicat",
    "name": "Fedicat",
    "description": "A fediverse client for iOS that attempts to support any platform with some degree of Mastodon API compatibility.",
    "category": "klient",
    "platforms": [
      "ios"
    ],
    "forApps": [
      "mastodon",
      "pixelfed",
      "neodb",
      "pleroma",
      "akkoma",
      "mitra",
      "snac",
      "takahe",
      "gotosocial",
      "friendica",
      "iceshrimp",
      "sharkey",
      "hollo",
      "bonfire"
    ],
    "price": "unknown",
    "url": "https://fedicat.com",
    "official": false,
    "featured": false,
    "addedAt": "March 2023",
    "isOwn": false,
    "descriptionCs": "Klient Fediverse pro iOS, který se snaží podporovat libovolnou platformu s alespoň částečnou kompatibilitou s Mastodon API.",
    "descriptionEn": "A fediverse client for iOS that attempts to support any platform with some degree of Mastodon API compatibility.",
    "logoUrl": "img/logos/fedicat.png"
  },
  {
    "id": "tuba",
    "name": "Tuba",
    "description": "Explore the federated social web with Tuba. Stay connected to your favorite communities, family and friends with support for popular Fediverse platforms.",
    "category": "klient",
    "platforms": [
      "desktop"
    ],
    "forApps": [
      "mastodon",
      "gotosocial",
      "akkoma",
      "pixelfed"
    ],
    "price": "unknown",
    "url": "https://tuba.geopjr.dev/",
    "official": false,
    "featured": false,
    "addedAt": "April 2018",
    "isOwn": false,
    "descriptionCs": "Objevuj federovaný sociální web s Tubou. Zůstaň ve spojení s oblíbenými komunitami i blízkými — podpora populárních platforem Fediverse.",
    "descriptionEn": "Explore the federated social web with Tuba. Stay connected to your favorite communities, family and friends with support for popular Fediverse platforms.",
    "logoUrl": "img/logos/tuba.png"
  },
  {
    "id": "piecelet-for-neodb",
    "name": "Piecelet for NeoDB",
    "description": "A NeoDB native client for iOS to track and share books, movies, episodes, music, games, and shows.",
    "category": "klient",
    "platforms": [
      "ios",
      "desktop"
    ],
    "forApps": [
      "neodb"
    ],
    "price": "unknown",
    "url": "https://apps.apple.com/app/piecelet-for-neodb/id6739444863",
    "official": false,
    "featured": false,
    "addedAt": "January 2025",
    "isOwn": false,
    "descriptionCs": "Nativní klient NeoDB pro iOS na sledování a sdílení knih, filmů, epizod, hudby, her a seriálů.",
    "descriptionEn": "A NeoDB native client for iOS to track and share books, movies, episodes, music, games, and shows.",
    "logoUrl": "img/logos/piecelet-for-neodb.png"
  },
  {
    "id": "neocomment",
    "name": "NeoComment",
    "description": "A user-friendly client for NeoDB to track, rate, review, and comment for books, movies, games, music and more.",
    "category": "klient",
    "platforms": [
      "android"
    ],
    "forApps": [
      "neodb"
    ],
    "price": "unknown",
    "url": "https://github.com/mohammadrafigh/NeoComment",
    "official": false,
    "featured": false,
    "addedAt": "November 2025",
    "isOwn": false,
    "descriptionCs": "Přívětivý klient NeoDB na sledování, hodnocení, recenze a komentáře ke knihám, filmům, hrám, hudbě a dalšímu.",
    "descriptionEn": "A user-friendly client for NeoDB to track, rate, review, and comment for books, movies, games, music and more.",
    "logoUrl": "img/logos/neocomment.png"
  },
  {
    "id": "tokodon",
    "name": "Tokodon",
    "description": "Tokodon is a Mastodon client. It allows you to interact with the Fediverse community.",
    "category": "klient",
    "platforms": [
      "desktop",
      "android"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "unknown",
    "url": "https://apps.kde.org/tokodon/",
    "official": false,
    "featured": false,
    "addedAt": "May 2026",
    "isOwn": false,
    "descriptionCs": "Tokodon je klient Mastodonu. Umožní ti zapojit se do komunity Fediverse.",
    "descriptionEn": "Tokodon is a Mastodon client. It allows you to interact with the Fediverse community.",
    "logoUrl": "img/logos/tokodon.png"
  },
  {
    "id": "bridgy-fed",
    "name": "Bridgy Fed",
    "description": "Most mezi Fediverse, Bluesky (AT Protocol) a IndieWeb. Překládá profily, sledování, lajky i boosty mezi sítěmi. Aktivuje se přes opt-in následováním účtu mostu.",
    "category": "most",
    "platforms": [
      "sluzba"
    ],
    "forApps": [
      "bluesky",
      "indieweb"
    ],
    "price": "zdarma",
    "url": "https://fed.brid.gy/",
    "sourceCode": "https://github.com/snarfed/bridgy-fed",
    "featured": true,
    "seeAlsoGlossary": "most",
    "descriptionCs": "Most mezi Fediverse, Bluesky (AT Protocol) a IndieWeb. Překládá profily, sledování, lajky i boosty mezi sítěmi. Aktivuje se přes opt-in následováním účtu mostu.",
    "descriptionEn": "A bridge between the Fediverse, Bluesky (AT Protocol) and the IndieWeb. It translates profiles, follows, likes and boosts across networks; you opt in by following the bridge account.",
    "logoUrl": "img/logos/bridgy-fed.png"
  },
  {
    "id": "mostr",
    "name": "Mostr",
    "description": "Most mezi Fediverse a Nostr. Umožní sledovat účty napříč oběma protokoly. Veřejná instance běží na mostr.pub.",
    "category": "most",
    "platforms": [
      "sluzba"
    ],
    "forApps": [
      "nostr"
    ],
    "price": "zdarma",
    "url": "https://mostr.pub/",
    "featured": true,
    "seeAlsoGlossary": "most",
    "descriptionCs": "Most mezi Fediverse a Nostr. Umožní sledovat účty napříč oběma protokoly. Veřejná instance běží na mostr.pub.",
    "descriptionEn": "A bridge between the Fediverse and Nostr. Lets you follow accounts across both protocols. A public instance runs at mostr.pub.",
    "logoUrl": "img/logos/mostr.svg"
  },
  {
    "id": "slonik",
    "name": "Sloník.online",
    "description": "Katalog českého a slovenského Mastodonu — vyhledávání účtů a příspěvků napříč CZ/SK instancemi bez přihlášení.",
    "category": "objevovani",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://slonik.online",
    "featured": true,
    "isOwn": true,
    "descriptionCs": "Katalog českého a slovenského Mastodonu — vyhledávání účtů a příspěvků napříč CZ/SK instancemi bez přihlášení.",
    "descriptionEn": "A catalog of the Czech and Slovak Mastodon — search accounts and posts across CZ/SK instances without signing in.",
    "logoUrl": "img/logos/slonik.png"
  },
  {
    "id": "katalog-zpravobot",
    "name": "Katalog Zprávobot.news",
    "description": "Adresář botů na instanci Zprávobot.news — přehled zpravodajských a tematických účtů, které zrcadlí obsah do Mastodonu.",
    "category": "objevovani",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://katalog.zpravobot.news",
    "isOwn": true,
    "descriptionCs": "Adresář botů na instanci Zprávobot.news — přehled zpravodajských a tematických účtů, které zrcadlí obsah do Mastodonu.",
    "descriptionEn": "A directory of bots on the Zprávobot.news instance — an overview of news and topical accounts that mirror content into Mastodon.",
    "logoUrl": "img/logos/zpravobot.png"
  },
  {
    "id": "fedi-directory",
    "name": "Fedi.Directory",
    "description": "Kurátorský seznam zajímavých účtů k sledování, tříděný podle témat. Vede ho tým za Fedi.Tips.",
    "category": "objevovani",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://fedi.directory/",
    "descriptionCs": "Kurátorský seznam zajímavých účtů k sledování, tříděný podle témat. Vede ho tým za Fedi.Tips.",
    "descriptionEn": "A curated list of interesting accounts to follow, sorted by topic. Run by the team behind Fedi.Tips.",
    "logoUrl": "img/logos/fedi-directory.png"
  },
  {
    "id": "streetpass",
    "name": "StreetPass",
    "description": "Rozšíření prohlížeče, které při běžném surfování odhaluje ověřené odkazy na fediverse profily na webech, které navštívíš.",
    "category": "objevovani",
    "platforms": [
      "web"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://streetpass.social/",
    "seeAlsoGlossary": "overeni-profilu",
    "descriptionCs": "Rozšíření prohlížeče, které při běžném surfování odhaluje ověřené odkazy na fediverse profily na webech, které navštívíš.",
    "descriptionEn": "A browser extension that reveals verified links to fediverse profiles on the websites you visit as you browse.",
    "logoUrl": "img/logos/streetpass.png"
  },
  {
    "id": "zpravobot",
    "name": "Zprávobot.news",
    "description": "Služba, která zrcadlí obsah z X, Bluesky a RSS kanálů do Mastodonu jako sledovatelné účty. Český projekt.",
    "category": "rss",
    "platforms": [
      "sluzba"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://zpravobot.news",
    "featured": true,
    "isOwn": true,
    "seeAlsoGlossary": "rss-fediverse",
    "descriptionCs": "Služba, která zrcadlí obsah z X, Bluesky a RSS kanálů do Mastodonu jako sledovatelné účty. Český projekt.",
    "descriptionEn": "A service that mirrors content from X, Bluesky and RSS feeds into Mastodon as followable accounts. A Czech project.",
    "logoUrl": "img/logos/zpravobot.png"
  },
  {
    "id": "rss-parrot",
    "name": "RSS Parrot",
    "description": "Promění libovolný RSS kanál ve sledovatelný fediverse účet — sleduješ web přímo z Mastodonu, bez čtečky.",
    "category": "rss",
    "platforms": [
      "sluzba"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://rss-parrot.net/",
    "seeAlsoGlossary": "rss-fediverse",
    "descriptionCs": "Promění libovolný RSS kanál ve sledovatelný fediverse účet — sleduješ web přímo z Mastodonu, bez čtečky.",
    "descriptionEn": "Turns any RSS feed into a followable fediverse account — follow a website straight from Mastodon, no reader needed.",
    "logoUrl": "img/logos/rss-parrot.png"
  },
  {
    "id": "feed2toot",
    "name": "feed2toot",
    "description": "Open-source nástroj, který automaticky publikuje položky z RSS kanálu na Mastodon účet. Pro vlastní provoz.",
    "category": "rss",
    "platforms": [
      "sluzba"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://gitlab.com/chaica/feed2toot",
    "sourceCode": "https://gitlab.com/chaica/feed2toot",
    "seeAlsoGlossary": "rss-fediverse",
    "descriptionCs": "Open-source nástroj, který automaticky publikuje položky z RSS kanálu na Mastodon účet. Pro vlastní provoz.",
    "descriptionEn": "An open-source tool that automatically publishes RSS feed items to a Mastodon account. For self-hosting."
  },
  {
    "id": "loops",
    "name": "Loops",
    "description": "Oficiální aplikace Loops pro iOS a Android.",
    "category": "klient",
    "platforms": [
      "ios",
      "android"
    ],
    "forApps": [
      "loops"
    ],
    "price": "zdarma",
    "url": "https://joinloops.org/",
    "official": true,
    "featured": false,
    "isOwn": false,
    "descriptionCs": "Oficiální aplikace Loops pro iOS a Android.",
    "descriptionEn": "Oficiální aplikace Loops pro iOS a Android.",
    "logoUrl": "img/logos/loops.png"
  },
  {
    "id": "vestavena-migrace",
    "name": "Vestavěná migrace účtu",
    "description": "Přesun mezi instancemi se sledujícími je přímo ve funkcích Mastodonu a dalších aplikací — není potřeba žádný externí nástroj. Postup viz Slovníček.",
    "category": "migrace",
    "platforms": [
      "sluzba"
    ],
    "forApps": [
      "mastodon"
    ],
    "price": "zdarma",
    "url": "https://fedi.tips/moving-your-mastodon-account-to-another-server/",
    "seeAlsoGlossary": "migrace-uctu",
    "descriptionCs": "Přesun mezi instancemi se sledujícími je přímo ve funkcích Mastodonu a dalších aplikací — není potřeba žádný externí nástroj. Postup viz Slovníček.",
    "descriptionEn": "Moving between instances with your followers is built into Mastodon and other apps — no external tool needed. See the Glossary for the how-to."
  }
];
