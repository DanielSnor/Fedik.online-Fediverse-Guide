/* data/tools/urls.js — override „Otevřít" odkazu nástrojů (Pohled 5).
   Pro jednoplatformní (jen iOS / jen Android) appky, které reálně jsou na App Store / Google Play,
   míříme přímo do storu místo homepage/GitHubu. U GitHub-origin appek si původní repo schováme do
   sourceCode (vykreslí se jako „Zdroják ↗"). build_tools.mjs to injektuje do Tool.url / Tool.sourceCode.
   Plain-JS globál (vzor logos.js) — RUČNĚ EDITOVATELNÝ. Jen ověřené store listingy (404 = nezařazovat). */

window.TOOL_URLS = {
  // ——— iOS-only → App Store ———
  imast: { url: "https://apps.apple.com/app/id1229461703", sourceCode: "https://github.com/cinderella-project/iMast" },
  ivory: { url: "https://apps.apple.com/app/id6444602274" },
  radiant: { url: "https://apps.apple.com/app/id6444323022" },
  socialhub: { url: "https://apps.apple.com/app/id1474451582" },

  // ——— Android-only → Google Play ———
  jerboa: { url: "https://play.google.com/store/apps/details?id=com.jerboa", sourceCode: "https://github.com/LemmyNet/jerboa" },
  "subway-tooter": { url: "https://play.google.com/store/apps/details?id=jp.juggler.subwaytooter", sourceCode: "https://github.com/tateisu/SubwayTooter" },
  fread: { url: "https://play.google.com/store/apps/details?id=com.zhangke.fread", sourceCode: "https://github.com/0xZhangKe/Fread" },
  rodent: { url: "https://play.google.com/store/apps/details?id=social.rodent" },

  // ——— ostatní aktualizace odkazů (Daniel, 2026-06) ———
  takesama: { url: "https://nikodembernat.com/apps/takesama/" },
  voyager: { url: "https://github.com/tpkee/wefwef" },
};
