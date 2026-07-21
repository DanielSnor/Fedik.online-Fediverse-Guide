/* CZ/SK kurátorský overlay pro Pohled 3 „Instance" — RUČNĚ EDITOVATELNÝ.

   Data CZ/SK instancí tečou READ-ONLY ze Sloníka (symlink web/data/slonik-instances.json)
   a adaptér je mapuje na typ Instance. Do Sloníka NIKDY nezapisujeme — vše, co chceme
   u CZ/SK instance dotáhnout/přepsat, jde sem (keyed by doména / host).

   Co lze přepsat:
     beginnerFriendly: true|false   // prověřenost (ne velikost); přebije heuristiku adaptéru
     focus: ["obecna"|"tech"|"umeni"|"akademicka"|"hry"|"region"|"lgbtq", …]  // přebije focus ze Sloníka
     appId: "mastodon"|…            // jen kdyby instance nebyla Mastodon (default mastodon)
     signupUrl: "https://…"         // ne-Mastodon instance mají jinou cestu k registraci než /auth/sign_up

   Heuristika adaptéru (když tu klíč chybí):
     beginnerFriendly = registrace je open/approval (dá se reálně zaregistrovat)
     focus = ze Sloníkových categories (general→obecna, tech, art→umeni, regional→region,
             journalism→obecna); když chybí → ["obecna"].
   Takže pole nikdy nejsou prázdná — tady se jen dolaďuje. */
window.FEDIK_INSTANCES_CURATED = {
  // Ne-Mastodon CZ instance — Sloníkův adaptér jim jinak natvrdo dává appId "mastodon"
  // (a mastodoní /auth/sign_up). Tady je klasifikujeme správně podle softwaru (App.id z apps.js).
  "pixelfed.cz":  { appId: "pixelfed", signupUrl: "https://pixelfed.cz/register", beginnerDefault: true },
  "snac.lab8.cz": { appId: "snac", signupUrl: "https://snac.lab8.cz" },   // registrace zavřená → homepage místo mastodoní /auth/sign_up (404)
  "vhsky.cz":     { appId: "peertube", signupUrl: "https://vhsky.cz/signup", beginnerDefault: true },   // PeerTube (Sloník feed nemá software field → adaptér by dal mastodon + /auth/sign_up 404)
  "otakuzatoka.cz": { appId: "misskey", signupUrl: "https://otakuzatoka.cz" },   // Misskey: registrace přes homepage (ne /auth/sign_up); appId → správné Misskey logo jako fallback avatar

  // Výchozí doporučená instance pro nováčky. Je ve Sloník feedu → adaptér dodá
  // beginnerFriendly (approval), focus (obecna), signupUrl (/auth/sign_up).
  // beginnerDefault = zobrazit ji jako doporučení v kroku 3 onboardingu.
  "mamutovo.cz":  { beginnerDefault: true },

  // Sloníkova AI klasifikace jí dala "regional", což je proti jejímu vlastnímu
  // popisu ("Mastodon pro českou komunitu" — celostátní, ne místně vázané).
  "mastodonczech.cz": { focus: ["obecna"] },

  // Příklad dalšího přepisu (odkomentuj/uprav podle reálných domén ze Sloníka):
  // "vutbr.social":     { beginnerFriendly: false, focus: ["akademicka"] },
};
