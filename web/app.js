'use strict';

// Katalog zdrojů Zprávobot.news — vše běží v prohlížeči nad data.json.
// ~540 záznamů → Array#filter/sort stačí, žádné indexování ani framework.
//
// Funkce: filtry (rodina/typ/jazyk/tag), full-text, řezy (platforma/Top N/nedávné),
// řazení, hover preview, detail modal, stav v URL hash, mobilní accordion.

(function () {
  // ---------- i18n ----------
  // Default čeština, ruční přepínač CZ|EN v hlavičce. EN = jen UI shell;
  // obsah (jména, bia, tagy) zůstává v původním jazyce.
  var LANGS = ['cs', 'en'];
  var lang = 'cs';

  var STRINGS = {
    cs: {
      brand_prefix: 'Fedík', brand_domain: '', title_doc: 'Fedík.online — Průvodce Fediverse',
      claim: 'Český Průvodce Fediverse',
      view_start: 'Začínáme',
      view_apps: 'Aplikace',
      apps_nav_desc: 'Kurátorský katalog fediverse aplikací. Filtruj podle typu obsahu, obdoby známé sítě a podle češtiny v rozhraní. Počty uživatelů a instancí jsou orientační (FediDB).',
      apps_head_type: 'Typ obsahu', apps_head_equiv: 'Obdoba sítě', apps_head_czech: 'Čeština v UI',
      apps_head_advanced: 'Pokročilé filtry', apps_head_managed: 'Managed hosting', apps_head_devstatus: 'Stav vývoje',
      asort_users: 'Nejvíc uživatelů', asort_instances: 'Nejvíc instancí',
      apps_tab_risers: 'Nejrychleji rostoucí', apps_tab_new: 'Nové projekty', apps_growth_week: '/ týden',
      apps_count: 'aplikací', apps_empty: 'Žádná aplikace neodpovídá filtrům.', apps_updated: 'aktualizováno',
      apps_like: 'jako', apps_czech_label: 'Čeština', apps_users: 'uživatelů', apps_instances: 'instancí',
      apps_stat_note: 'orientační (FediDB)', apps_managed_yes: 'managed hosting',
      apps_link_join: 'Připojit se', apps_link_web: 'Web', apps_link_src: 'Zdroják',
      czui_ano: 'Ano', czui_castecne: 'Částečně', czui_ne: 'Ne', czui_unknown: 'Neznámo',
      dev_aktivni: 'Aktivní', dev_zraly: 'Zralý', dev_experimentalni: 'Experimentální', dev_utlumeny: 'Útlumený', dev_unknown: 'Neznámo',
      common_yes: 'Ano', common_no: 'Ne',
      start_picker_label: 'Odkud přicházíš, nebo co chceš dělat?',
      start_picker_placeholder: 'Vyber z nabídky…',
      start_picker_group_from: 'Přicházím z…',
      start_picker_group_do: 'Chci dělat…',
      start_picker_hint: 'Vyber síť, kterou znáš, nebo co chceš dělat — ukážu ti odpovídající aplikaci ve Fediverse.',
      start_rec_from: 'Pokud přicházíš z „%s", doporučuji ti:',
      start_rec_do: 'Chceš „%s"? Doporučuji se podívat na:',
      start_picker_catalog: 'Projít všechny aplikace průvodce →',
      start_picker_next_hint: 'Spokojen s naším doporučením? Pokračuj dalším krokem. Chceš víc možností?',
      start_pick_app: 'Vybrat tuhle loď →',
      start_wizard_pick: 'Vybrat pro průvodce →',
      start_wizard_banner: 'Fediverse zná přes 60 aplikací, ale nováčka provedeme jen prověřeným výběrem — tady jsou, napříč typy obsahu. Vyber si loď (aplikaci) tlačítkem „Vybrat pro průvodce" a vrátíme tě do průvodce. (Kompletní katalog všech aplikací najdeš v horním menu Aplikace.)',
      start_cta_external: 'Otevřít oficiální stránku →',
      start_cta_starter: 'Vybrat %s',
      start_starter_lead: 'Česká instance pro %s:',
      start_starter_note: 'Vyber ji a posuneme tě na krok 4.',
      start_inst_heading: 'Vyber si instanci — ukazujeme jen ty z CZ/SK kvadrantu s otevřenou registrací nebo se schválením:',
      start_inst_heading_global: 'V CZ/SK kvadrantu zatím žádná není — nabízíme prověřené globální (s otevřenou registrací nebo se schválením):',
      start_inst_choose: 'Vybrat tuhle →',
      start_inst_more: 'Zobrazit všechny instance v katalogu →',
      start_inst_empty: 'Pro tuhle aplikaci zatím nemáme českou ani slovenskou instanci s otevřenou registrací. Zkus oficiální katalog:',
      start_inst_hint_pick: 'Vyber instanci výše a posuneme tě na krok 4 ↑',
      start_inst_hint_external: 'Až si vybereš a založíš účet, vrať se sem a pokračuj krokem 4 ↓',
      start_step4_chosen_lead: 'Zakládáš účet na instanci %s:',
      start_step4_chosen_cta: 'Otevřít registraci na %s →',
      start_step4_chosen_change: 'Změnit instanci',
      start_menu_heading: 'Začínáme s Fediverse',
      start_intro_p1: 'Fediverse je vesmír propojených nezávislých sociálních sítí — místo jedné velké firmy ho tvoří tisíce serverů, které si spolu povídají.',
      start_intro_p2: 'Je to obrovský prostor, skoro jako ten mezihvězdný. Aby ses v něm neztratil, provedu tě jako navigátor: vybereš si loď (aplikaci), přistaneš na správné planetě (instanci) a založíš si na ní základnu (účet). Pak sestavíš posádku — lidi, které chceš sledovat.',
      start_step1: 'Co je Fediverse?',
      start_step2: 'Vyber aplikaci',
      start_step3: 'Vyber instanci',
      start_step4: 'Založ účet',
      start_step5: 'První den',
      start_step6: 'Najdi lidi',
      step1_label: 'Co je Fediverse?',
      step2_label: 'Vyber si loď (aplikaci)',
      step3_label: 'Najdi svou planetu (instanci)',
      step4_label: 'Postav si základnu (založ účet)',
      step5_label: 'První den na základně',
      step6_label: 'Sestav posádku (najdi lidi)',
      step1_desc: 'Vesmír propojených serverů — jeden účet, žádné reklamy, žádný algoritmus.',
      step2_desc: 'Loď (aplikace) podle toho, co chceš dělat: mikroblog, fotky, video, fórum…',
      step3_desc: 'Planeta (instance) — tvůj domovský server. Přeletět jinam jde kdykoli, sledující jdou s tebou.',
      step4_desc: 'Postav základnu (účet): pár minut — e-mail, potvrzení, někdy krátké schválení.',
      step5_desc: 'Rozhlédni se po základně — šest věcí, co udělat hned.',
      step6_desc: 'Sestav posádku — ať doma není prázdno. Odkud nabrat první účty.',
      step2_p1: 'Aplikace je síť, ve které budeš — tvoje loď ve Fediverse. Mastodon je jako Twitter/X, Pixelfed jako Instagram, PeerTube jako YouTube; všechny spolu umí mluvit, protože stojí na stejném základu.',
      step2_p2: 'Vyber síť, kterou znáš, nebo typ obsahu — doporučím ti odpovídající loď. Tlačítko „Začít“ tě pošle dál: u hlavních aplikací rovnou na výběr planety (instance), u ostatních na jejich oficiální stránku. Chceš brouzdat sám? Otevři celý katalog Aplikací.',
      step3_p1: 'Planeta (instance) je tvůj domovský server — místo, kde budeš přihlášený a které ti dá adresu ve tvaru @jmeno@server. Ať přistaneš kdekoli, sledovat a povídat si můžeš s kýmkoli v celém Fediverse; planeta není klec.',
      step3_p2: 'Níže ukazujeme jen planety s otevřenou registrací nebo registrací po schválení, vyfiltrované pro tvou aplikaci. Dej „Vybrat tuhle“ a posuneme tě na krok 4. Nevíš, kam? Použij náš výchozí bod, nebo otevři celý katalog Instancí.',
      reg_head: 'Co tě při registraci čeká',
      reg_body: 'Vyplníš uživatelské jméno, e-mail a heslo. Přijde ti potvrzovací e-mail — klikni na odkaz v něm. U serverů „po schválení“ chvíli počkej, než tě správce pustí dovnitř (většinou pár hodin). A jsi uvnitř.',
      reg_return: 'Až budeš mít účet, vrať se sem na Fedíka — dokončíme onboarding: projdeme první den (krok 5) a sestavíme ti posádku, koho sledovat (krok 6).',
      start_default_q: 'Nevíš, kam?',
      start_default_rec: 'Začni třeba na mamutovo.cz — dobře udržovaný český server s rozšířeným limitem 2500 znaků na příspěvek.',
      start_default_note: 'Registrace je „po schválení“, takže tě správce pustí ručně — chvilka strpení, zato klidnější start. Není to jediná dobrá volba: v Instancích si můžeš vybrat jinou a kdykoli se přestěhovat.',
      start_default_cta: 'Vybrat mamutovo.cz',
      follow_head: 'Ať doma není prázdno: koho sledovat',
      follow_p1: 'Prázdná domácí osa je nejčastější důvod, proč lidé Fediverse opustí po prvním dni — není koho číst. Posádka (lidé, které sleduješ) tvoří celý tvůj zážitek; žádný algoritmus to za tebe neudělá.',
      follow_p2: 'Tady jsou dvě kurátorované kotvy: Sloník.online pro živé české a slovenské účty a katalog.zpravobot.news pro boty se zprávami a obsahem. Vyber pár podle zájmů, sleduj je z vlastní instance — a osa se rozjede.',
      follow_slonik_title: 'Živé účty → Sloník.online',
      follow_slonik_desc: 'Katalog českých a slovenských účtů a instancí. Najdeš lidi podle zájmů a hned je můžeš sledovat.',
      follow_slonik_cta: 'Otevřít Sloník.online',
      follow_zbot_title: 'Zprávy a boti → katalog.zpravobot.news',
      follow_zbot_desc: 'Sledovatelné účty, které zrcadlí české zpravodajství a weby přímo do Fediverse. Hned máš o čem číst.',
      follow_zbot_cta: 'Otevřít katalog Zprávobota',
      fday_head: 'Hotovo, máš účet — prvních šest kroků',
      fday_p1: 'Máš základnu (účet) — teď ji oživíš. Prvních pár kroků rozhoduje o tom, jestli tě Fediverse chytne, nebo ti přijde prázdný a tichý.',
      fday_p2: 'Projdi šest úkolů níže popořadě; každý je otázka minut. Pak mrkni na „pět věcí, co tu chodí jinak" — drobné zvyky, díky kterým tě komunita líp přijme.',
      fday_1: 'Vyplň profil — avatar, krátké bio a hlavičku. Účty, co nevypadají prázdně, lidi spíš sledují.',
      fday_2: 'Ověř svůj web odkazem rel=me — u profilu pak svítí, že web je fakt tvůj.',
      fday_3: 'Napiš úvodní příspěvek s #nazdar nebo #introductions a připni ho — lidé tě podle něj najdou.',
      fday_4: 'Vybav si základnu klientem — se svou aplikací (sítí) můžeš používat i klientské appky, pohodlnější na telefonu.',
      fday_4_cta: 'Zobrazit klienty pro %s',
      fday_4_webonly: 'Pro %s se většinou používá web — žádný extra klient nepotřebuješ.',
      fday_5: 'Najdi, koho sledovat — začni Sloníkem a katalogem Zprávobota výše.',
      fday_6: 'Mrkni na tři osy: Domácí (koho sleduješ), Lokální (tvůj server) a Federovaná (širý Fediverse).',
      norms_head: 'Pět věcí, co tu chodí jinak',
      norms_intro: 'Žádná pravidla na krev, jen drobné zvyky, díky kterým tě komunita líp přijme.',
      norms_1: 'Citlivá témata schovej pod CW (varování obsahu) — čtenář si rozklikne, co chce.',
      norms_2: 'K obrázkům přidávej alt text — popis pro lidi, co obrázek nevidí. Tady je to slušnost.',
      norms_3: 'Používej hashtagy — vyhledávání jede hlavně přes ně, ne přes plný text.',
      norms_4: 'Sdílej boostem (jako repost). Citování s komentářem tu skoro není — schválně, kvůli klidu.',
      norms_5: 'Před odesláním zkontroluj viditelnost příspěvku (veřejný / jen sledující / přímý) — vybíráš ji u každého postu.',
      faqn_head: 'Časté první otázky',
      faqn_q1: 'Registrace čeká na schválení — co teď?',
      faqn_a1: 'U serverů „po schválení“ tě musí pustit správce. Většinou to trvá pár hodin, někdy do druhého dne. Přijde ti e-mail. Zatím můžeš v klidu projít zbytek tipů tady.',
      faqn_q2: 'Nemůžu najít kamaráda — jak ho najdu?',
      faqn_a2: 'Potřebuješ jeho celou adresu ve tvaru @jmeno@server.cz. Vlož ji do vyhledávání ve své aplikaci a dej Sledovat. Samotné „@jmeno“ nestačí — server je důležitý.',
      faqn_q3: 'Jak se přestěhuju na jiný server?',
      faqn_a3: 'Mastodon to umí vestavěně: na novém účtu nastavíš alias na starý, na starém spustíš přesun a sledující se přenesou automaticky. Příspěvky se nepřenášejí, profil a sledující ano.',
      faqn_q4: 'Domácí timeline je prázdná, je to normální?',
      faqn_a4: 'Úplně. Domácí osa ukazuje jen lidi, které sleduješ — na začátku tam nikdo není. Začni sledovat účty přes Sloník.online a katalog.zpravobot.news a hned se zaplní.',
      start_next_step: 'Dalsi krok',
      count_of: 'z', count_sources: 'zdrojů',
      nav_platform: 'Platforma', nav_charts: 'Žebříčky', nav_risers: 'Skokani týdne', nav_new: 'Novinky',
      nav_all: 'Vše', nav_top10_foll: 'Top 10 sledovaných', nav_top10_active: 'Top 10 aktivních',
      nav_top50_foll: 'Top 50 sledovaných', nav_top50_active: 'Top 50 aktivních',
      nav_risers_foll: 'V sledujících', nav_risers_active: 'V aktivitě', nav_recent: 'Nedávno přidané',
      filters_toggle: 'Filtry', menu_show: 'Menu', menu_hide: 'Zavřít', nav_views: 'Pohledy',
      nav_slices: 'Žebříčky', head_topic_byaccount: 'Oblast (dle účtu)',
      search_label: 'Vyhledat', search_ph: 'Jméno nebo handle…',
      sort_label: 'Řadit', sort_name: 'Abecedně', sort_followers: 'Nejvíc sledujících',
      sort_posts: 'Nejaktivnější', sort_added: 'Nejnověji přidané',
      head_topic: 'Oblast', head_type: 'Typ účtu', head_language: 'Jazyk', head_tag: 'Tag',
      tag_ph: 'Filtr podle tagu…', reset: 'Zrušit filtry',
      loading: 'Načítám katalog…', empty_title: 'Žádný zdroj neodpovídá filtrům.',
      empty_hint: 'Zkus uvolnit některý z filtrů.', empty_reset: 'Reset filtrů',
      load_error: 'Nepodařilo se načíst data katalogu.',
      footer_indexed: 'Vyhledávání naposledy indexováno',
      footer_updated: 'Katalog naposledy aktualizován',
      footer_updates: 'Poslední aktualizace dat:',
      footer_updates_stats: 'statistiky', footer_updates_apps: 'aplikace',
      footer_updates_instances: 'instance', footer_updates_tools: 'nástroje',
      footer_sponsor: 'Tento web běží\ndíky podpoře',
      footer_owner: 'Jsi vlastník účtu a chceš jej z katalogu odstranit? Napiš na',
      fam_sport: 'Sport', fam_news: 'Zprávy', fam_culture: 'Kultura', fam_science_tech: 'Věda & technika',
      fam_lifestyle: 'Životní styl', fam_business: 'Byznys', fam_humor: 'Humor', fam_government: 'Stát',
      type_person: 'Osoba', type_media: 'Médium', type_institution: 'Organizace',
      type_institution_formal: 'Instituce', type_institution_filter: 'Instituce/Organizace',
      type_team: 'Tým', type_other: 'Ostatní',
      lang_cs: 'Čeština', lang_sk: 'Slovenčina', lang_en: 'English',
      stat_followers: 'sledujících', stat_posts_week: 'příspěvků/týden', stat_language: 'jazyk',
      modal_sources: 'Původní profily', modal_open: 'Otevřít profil', modal_follow: 'Sledovat',
      modal_follow_title: 'Otevře profil, kde můžeš sledovat ze své Mastodon instance', modal_close: 'Zavřít',
      hover_source: 'Zdroj: ', card_detail: 'Detail ',
      slice_platform: 'Zdroje s platformou ', slice_recent_pre: 'Přidané za posledních ',
      slice_recent_post: ' dní', slice_top_pre: 'Top ', slice_top_post: ' (ostatní filtry kromě oblasti jsou vypnuté)',
      top_phrase_followers: 'podle sledujících', top_phrase_active: 'podle aktivity',
      top_phrase_gain_followers: 'podle nárůstu sledujících', top_phrase_gain_activity: 'podle nárůstu aktivity',
      view_accounts: 'Účty', view_posts: 'Posty', view_about: 'O Fedíku', view_search: 'Vyhledávání', view_instance: 'Instance', view_links: 'Odkazy', view_glossary: 'Slovníček',
      glossary_nav_desc: 'Pojmy a postupy Fediverse česky. Filtruj podle úrovně, tématu a typu; řazení „pro začátečníky" tě provede od základů. Hesla jsou prohledatelná i ve Vyhledávání.',
      gloss_head_level: 'Úroveň', gloss_head_theme: 'Téma', gloss_head_type: 'Typ',
      gsort_order: 'Pro začátečníky', gsort_alpha: 'Abecedně', gsort_theme: 'Tematicky',
      glevel_zakladni: 'Základní', glevel_pokrocile: 'Pokročilé',
      gtype_pojem: 'Pojem', gtype_postup: 'Postup', gtype_zkratka: 'Zkratka',
      gtheme_ucty: 'Účty', gtheme_federace: 'Federace', gtheme_obsah: 'Obsah', gtheme_moderovani: 'Moderování', gtheme_soukromi: 'Soukromí', gtheme_technika: 'Technika',
      gloss_count: 'hesel', gloss_unit: 'hesel', gloss_empty: 'Žádné heslo neodpovídá filtrům.',
      gloss_steps: 'Postup krok za krokem', gloss_seealso: 'Souvisí', gloss_external: 'Oficiální návod ↗', gloss_no_steps: 'Klikací kroky doplníme; podstata je v popisu výše.',
      search_sec_glossary: 'Hesla',
      view_tools: 'Nástroje',
      tools_nav_desc: 'Klienti, mosty, objevovače a další nástroje pro Fediverse. Filtruj podle kategorie, platformy, aplikace a ceny. Klienti jsou z FediDB; zbytek je kurátorský výběr živých nástrojů.',
      tools_head_category: 'Kategorie', tools_head_platform: 'Platforma', tools_head_forapp: 'Pro aplikaci', tools_head_price: 'Cena',
      tcat_klient: 'Klient', tcat_crossposter: 'Crossposter', tcat_most: 'Most (bridge)', tcat_objevovani: 'Objevování účtů', tcat_migrace: 'Migrace', tcat_rss: 'RSS / automatizace', tcat_analytika: 'Analytika',
      tplat_android: 'Android', tplat_ios: 'iOS', tplat_web: 'Web', tplat_desktop: 'Desktop', tplat_sluzba: 'Web/služba',
      tprice_zdarma: 'Zdarma', tprice_freemium: 'Freemium', tprice_placene: 'Placené', tprice_unknown: 'neuvedeno',
      tools_count: 'nástrojů', tools_tab_featured: 'Doporučené', tools_tab_new: 'Nově přidané',
      tools_own: 'náš projekt', tools_official: 'oficiální', tools_featured: 'doporučené',
      tools_for: 'Pro:', tools_added: 'přidáno', tools_link_open: 'Otevřít ↗', tools_link_appstore: 'App Store ↗', tools_link_googleplay: 'Google Play ↗', tools_link_fdroid: 'F-Droid ↗', tools_link_src: 'Zdroják ↗', tools_glossary: 'Slovníček →',
      tools_empty: 'Žádný nástroj neodpovídá filtrům.',
      tools_empty_crossposter: 'Tahle kategorie je zatím prázdná — po zaříznutí Twitter API klasické crosspostery skončily. Živé propojování napříč sítěmi dnes řeší Mosty.',
      tools_empty_analytika: 'Pro tuhle kategorii zatím nemáme žádný ověřený živý nástroj.',
      view_stats: 'Statistiky',
      stats_nav_desc: 'Pár čísel a grafů o Fediverse — pro přehled, ne pro analytiku. Čte z těch samých vrstev jako Aplikace a Instance; nic se nestahuje navíc.',
      stats_head_period: 'Období', stats_head_region: 'Region', stats_head_series: 'Aplikace (řady)',
      stats_tab_overview: 'Přehled', stats_tab_apps: 'Podle aplikací', stats_tab_growth: 'Růst v čase', stats_tab_czsk: 'CZ/SK výřez',
      stats_users: 'Uživatelé', stats_mau: 'Měsíčně aktivní', stats_servers: 'Servery', stats_posts: 'Příspěvky', stats_czsk_instances: 'CZ/SK instance',
      stats_total: 'Celá síť', stats_region_global: 'Globální', stats_region_czsk: 'CZ-SK',
      stats_period_1y: '1 rok', stats_period_2y: '2 roky', stats_period_all: 'Vše',
      stats_updated: 'aktualizováno',
      stats_approx: 'Čísla jsou orientační — FediDB vidí jen instance, které crawluje; nové a okrajové aplikace podhodnocuje.',
      stats_loading: 'Načítám čísla…',
      stats_growth_empty: 'Pro zvolené období a řady zatím nejsou žádná data.',
      stats_growth_sparse: 'Historie se teprve sbírá — zatím je jediný snímek, spojnice naskočí, jak přibudou další.',
      stats_snap_unavail: 'Historie snímků není dostupná — zkus to později.',
      stats_czsk_unavail: 'CZ/SK souhrn není dostupný — zobrazí se poslední uložený snímek, jakmile bude.',
      stats_czsk_caveat: 'Dolní odhad: jen uživatelé na CZ/SK instancích, ne Češi a Slováci na globálních serverech.',
      links_nav_title: 'Odkazy',
      links_nav_desc: 'Kurátorovaný rozcestník kvalitních článků a návodů o Mastodonu a fediverse — česky i anglicky. Filtruj podle typu a jazyka.',
      links_head_type: 'Typ', links_count: 'odkazů',
      ltype_navod: 'Návod', ltype_clanek: 'Článek', ltype_oficialni: 'Oficiální stránka', ltype_video: 'Video',
      links_head_type: 'Typ', links_head_lang: 'Jazyk', links_head_theme: 'Téma',
      ltheme_uvod: 'Úvod', ltheme_navody: 'Návody', ltheme_technika: 'Technika', ltheme_komunita: 'Komunita', ltheme_data: 'Data',
      lsort_recommended: 'Doporučené', lsort_alpha: 'Abecedně', lsort_lang: 'Podle jazyka',
      lfresh_undated: 'bez data', lfresh_current: 'průběžně aktualizováno', links_zero: 'Žádný odkaz neodpovídá filtrům.',
      accounts_nav_title: 'Účty',
      accounts_nav_desc: 'Katalog českých a slovenských účtů na Mastodonu. Filtruj podle oblasti, typu, jazyka a tagů, vyhledávej podle jména nebo handle a řaď podle počtu sledujících či aktivity. Kliknutím na účet zobrazíš detail.',
      posts_nav_title: 'Posty',
      posts_nav_desc: 'Nejlepší příspěvky českých a slovenských účtů za poslední týden. Přepínej žebříčky (Top 10/50, skokani týdne), filtruj podle oblasti, textu a hashtagů a řaď podle boostů, oblíbených nebo data.',
      instance_nav_title: 'Instance',
      instance_nav_desc: 'Servery, kde se reálně zaregistruješ — české a slovenské (ze Sloníka) i prověřené globální. Filtruj podle aplikace, regionu a zaměření; žebříček „pro začátečníky" stojí na prověřenosti, ne na velikosti.',
      instance_loading: 'Načítám instance…', instance_unavail: 'Seznam instancí zatím není k dispozici.',
      instance_count: 'instancí', instance_reg_open: 'Registrace otevřené',
      instance_reg_approval: 'Registrace se schválením', instance_reg_closed: 'Registrace zavřené',
      instance_reg_invite: 'Na pozvánku',
      instance_join: 'Založit účet', instance_open: 'otevřít',
      instance_users: 'uživatelů',
      instance_sec_czsk: 'České a slovenské instance', instance_sec_global: 'Globální doporučené',
      instance_search_ph: 'Název nebo doména…',
      isort_users: 'Nejvíc uživatelů', isort_reg: 'Podle registrace',
      instance_region_head: 'Region', instance_head_app: 'Aplikace', instance_head_focus: 'Zaměření',
      instance_head_reg: 'Registrace', instance_head_size: 'Velikost',
      instance_region_cz: 'Česko', instance_region_sk: 'Slovensko', instance_region_global: 'Globální',
      instance_beginner: 'Pro začátečníky',
      ifoc_obecna: 'Obecná', ifoc_tech: 'Tech', ifoc_umeni: 'Umění', ifoc_akademicka: 'Akademická',
      ifoc_hry: 'Hry', ifoc_region: 'Region', ifoc_lgbtq: 'LGBTQ+',
      isize_small: 'Malá (<1k)', isize_medium: 'Střední', isize_large: 'Velká',
      irank_activity: 'Aktivita instance', irank_ratio: 'Poměrem', irank_volume: 'Objemem',
      irank_ratio_note: 'podle podílu aktivních uživatelů', irank_volume_note: 'podle celkového počtu příspěvků',
      ssort_relevance: 'Podle shody',
      search_tagline: 'Prohledá aplikace, instance, nástroje, slovníček a odkazy — bez ohledu na diakritiku.',
      search_tip: 'Tip: víc slov = musí být všechna;\npřesnou frázi dej do uvozovek („…");\nslovo vylučíš mínusem (-slovo).',
      search_ph_view: 'Hledat v obsahu Fedíka…', search_unit_accounts: 'účtů', search_unit_posts: 'postů',
      search_sec_accounts: 'Účty', search_sec_posts: 'Posty', search_loading: 'Načítám index…',
      search_hint: 'zadej dotaz', search_zero: 'Nic nenalezeno. Zkus jiná / obecnější slova.', search_results_unit: 'výsledků',
      search_unavail: 'Vyhledávací index zatím není k dispozici.', search_open: 'otevřít na Mastodonu',
      search_posts_active: 'příspěvků (30 dní)', search_followers: 'sledujících',
      search_nav_title: 'Vyhledávání',
      search_nav_desc: 'Hledá v obsahu Fedíka — aplikace, instance, nástroje, slovníček a odkazy. Nezáleží na velikosti písmen ani diakritice (napíšeš „mastodon", najde „Mastodon"). Výsledky jsou rozdělené podle typu.',
      about_title: 'O Fedíku',
      about_menu_about: 'O Fedíku', about_menu_howto: 'Jak pracovat', about_menu_other: 'Ostatní',
      about_menu_other_desc: 'A nakonec několik závěrečných informací — časté dotazy, technické pozadí, o autorovi a jak projekt podpořit.',
      about_menu_about_desc: 'Co je Fedík.online, pro koho je, jak vzniká a z čeho čerpá — plus zdroje, atribuce a kontakt.',
      about_menu_howto_desc: 'Několik tipů, jak co nejlépe využít možností, které Fedík.online poskytuje pro práci s:',
      about_nav_about: 'O Fedíku', about_nav_search: 'Vyhledáváním', about_nav_instance: 'Instancemi', about_nav_apps: 'Aplikacemi', about_nav_tools: 'Nástroji',
      about_nav_accounts: 'Účty', about_nav_posts: 'Posty', about_nav_links_howto: 'Odkazy',
      about_nav_tech: 'Technické řešení', about_nav_author: 'O autorovi', about_nav_faq: 'FAQ', about_nav_faq_novacci: 'FAQ pro nováčky',
      prisers_ratio: 'Poměrem', prisers_abs: 'Dosahem',
      label_bot: 'Automat', label_bot_title: 'Automatizovaný účet (bot)',
      psort_engagement: 'Nejvíce boostů + favů', psort_reblogs: 'Nejvíce boostů',
      psort_favourites: 'Nejvíce favů', psort_date: 'Nejnovější', psort_date_asc: 'Od nejstaršího',
      posts_loading: 'Načítám posty…', posts_empty: 'Žádný post neodpovídá filtrům.',
      posts_unavailable: 'Posty jsou dostupné každý týden v pondělí ráno.',
      posts_week: 'týden', posts_count: 'postů', post_media: 'Příloha',
      post_media_only: '[Příspěvek s médiem]', post_open: 'Otevřít na Mastodonu',
      post_more: 'zobrazit více', post_riser: 'Skokan', profile_title: 'Otevřít profil',
      head_hashtags: 'Hashtagy', hashtags_empty: 'Žádné hashtagy v zobrazených postech.'
    },
    en: {
      brand_prefix: 'Fedík', brand_domain: '', title_doc: 'Fedík.online — Fediverse guide',
      claim: 'Your guide to the Fediverse',
      view_start: 'Start here',
      view_apps: 'Apps',
      apps_nav_desc: 'Curated catalog of Fediverse apps. Filter by content type, centralized analog and Czech UI. User and instance counts are approximate (FediDB).',
      apps_head_type: 'Content type', apps_head_equiv: 'Centralized analog', apps_head_czech: 'Czech UI',
      apps_head_advanced: 'Advanced filters', apps_head_managed: 'Managed hosting', apps_head_devstatus: 'Dev status',
      asort_users: 'Most users', asort_instances: 'Most instances',
      apps_tab_risers: 'Fastest growing', apps_tab_new: 'New projects', apps_growth_week: '/ week',
      apps_count: 'apps', apps_empty: 'No app matches the filters.', apps_updated: 'updated',
      apps_like: 'like', apps_czech_label: 'Czech', apps_users: 'users', apps_instances: 'instances',
      apps_stat_note: 'approx. (FediDB)', apps_managed_yes: 'managed hosting',
      apps_link_join: 'Join', apps_link_web: 'Web', apps_link_src: 'Source',
      czui_ano: 'Yes', czui_castecne: 'Partial', czui_ne: 'No', czui_unknown: 'Unknown',
      dev_aktivni: 'Active', dev_zraly: 'Mature', dev_experimentalni: 'Experimental', dev_utlumeny: 'Dormant', dev_unknown: 'Unknown',
      common_yes: 'Yes', common_no: 'No',
      start_picker_label: 'Where are you coming from, or what do you want to do?',
      start_picker_placeholder: 'Pick one…',
      start_picker_group_from: 'Coming from…',
      start_picker_group_do: 'I want to…',
      start_picker_hint: 'Pick a network you know or what you want to do — I’ll show the matching Fediverse app.',
      start_rec_from: 'Coming from “%s”? I’d recommend:',
      start_rec_do: 'Want “%s”? Take a look at:',
      start_picker_catalog: 'Browse all guide apps →',
      start_picker_next_hint: 'Happy with our recommendation? Continue to the next step. Want more options?',
      start_pick_app: 'Choose this ship →',
      start_wizard_pick: 'Use in the guide →',
      start_wizard_banner: 'The Fediverse has 60+ apps, but for newcomers we guide you to a vetted selection — here they are, across content types. Pick a ship (app) with “Use in the guide” and we’ll take you back. (The full app catalog is in the top Apps menu.)',
      start_cta_external: 'Open the official site →',
      start_cta_starter: 'Choose %s',
      start_starter_lead: 'A Czech instance for %s:',
      start_starter_note: 'Choose it and we’ll move you to step 4.',
      start_inst_heading: 'Pick an instance — we only show ones in the CZ/SK quadrant with open or approval-based registration:',
      start_inst_heading_global: 'Nothing in the CZ/SK quadrant yet — here are vetted global ones (open or approval-based sign-up):',
      start_inst_choose: 'Choose this →',
      start_inst_more: 'See all instances in the catalog →',
      start_inst_empty: 'We don’t have a Czech or Slovak instance with open registration for this app yet. Try the official catalog:',
      start_inst_hint_pick: 'Pick an instance above and we’ll move you to step 4 ↑',
      start_inst_hint_external: 'Once you’ve chosen and created your account, come back here and continue with step 4 ↓',
      start_step4_chosen_lead: 'You’re creating your account on %s:',
      start_step4_chosen_cta: 'Open registration on %s →',
      start_step4_chosen_change: 'Change instance',
      start_menu_heading: 'Getting started with the Fediverse',
      start_intro_p1: 'The Fediverse is a universe of connected, independent social networks — instead of one big company, it’s made of thousands of servers that talk to each other.',
      start_intro_p2: 'It’s a vast space, almost interstellar. So you don’t get lost, I’ll be your navigator: you pick a ship (an app), land on the right planet (an instance) and set up a base there (your account). Then you assemble a crew — the people you want to follow.',
      start_step1: 'What is the Fediverse?',
      start_step2: 'Pick an app',
      start_step3: 'Pick an instance',
      start_step4: 'Create your account',
      start_step5: 'Your first day',
      start_step6: 'Find people',
      step1_label: 'What is the Fediverse?',
      step2_label: 'Pick your ship (an app)',
      step3_label: 'Find Your Planet (an instance)',
      step4_label: 'Build your base (create an account)',
      step5_label: 'Your first day at the base',
      step6_label: 'Assemble your crew (find people)',
      step1_desc: 'A universe of connected servers — one account, no ads, no algorithm.',
      step2_desc: 'A ship (app) for what you want to do: microblogging, photos, video, forums…',
      step3_desc: 'A planet (instance) — your home server. Hop elsewhere anytime; your followers come along.',
      step4_desc: 'Build your base (account): a few minutes — email, confirmation, sometimes a short approval.',
      step5_desc: 'Look around the base — six things to do right away.',
      step6_desc: 'Assemble your crew — so home isn’t empty. Where to grab your first accounts.',
      step2_p1: 'An app is the network you’ll live in — your ship in the Fediverse. Mastodon is like Twitter/X, Pixelfed like Instagram, PeerTube like YouTube; they all talk to each other because they share the same foundation.',
      step2_p2: 'Pick a network you know, or a type of content — I’ll suggest the matching ship. “Start” takes you onward: for the main apps straight to picking a planet (instance), for the rest to their official page. Want to browse yourself? Open the full Apps catalog.',
      step3_p1: 'A planet (instance) is your home server — where you’ll be signed in and which gives you an address like @name@server. Wherever you land, you can follow and talk to anyone across the whole Fediverse; a planet isn’t a cage.',
      step3_p2: 'Below we show only planets with open or approval-based sign-up, filtered for your app. Hit “Choose this one” and we’ll move you to step 4. Not sure where? Use our default, or open the full Instances catalog.',
      reg_head: 'What to expect when you sign up',
      reg_body: 'You’ll fill in a username, email and password. A confirmation email arrives — click the link in it. On “approval” servers, wait a moment for the admin to let you in (usually a few hours). And you’re in.',
      reg_return: 'Once your account is ready, come back here to Fedík — we’ll finish onboarding: walk through your first day (step 5) and assemble your crew to follow (step 6).',
      start_default_q: 'Not sure where?',
      start_default_rec: 'You could start on mamutovo.cz — a well-maintained Czech server with an extended 2500-character post limit.',
      start_default_note: 'Sign-up is approval-based, so an admin lets you in by hand — a short wait, but a calmer start. It’s not the only good choice: pick another in Instances and move anytime.',
      start_default_cta: 'Choose mamutovo.cz',
      follow_head: 'So your home feed isn’t empty: who to follow',
      follow_p1: 'An empty home timeline is the top reason people leave the Fediverse after day one — no one to read. Your crew (the people you follow) is your whole experience; no algorithm does it for you.',
      follow_p2: 'Here are two curated anchors: Sloník.online for live Czech and Slovak accounts, and katalog.zpravobot.news for bots with news and content. Pick a few by interest, follow them from your own instance — and your timeline comes alive.',
      follow_slonik_title: 'Live accounts → Sloník.online',
      follow_slonik_desc: 'A catalog of Czech and Slovak accounts and instances. Find people by interest and follow them right away.',
      follow_slonik_cta: 'Open Sloník.online',
      follow_zbot_title: 'News & bots → katalog.zpravobot.news',
      follow_zbot_desc: 'Followable accounts that mirror Czech news and websites straight into the Fediverse. Something to read from day one.',
      follow_zbot_cta: 'Open the Zprávobot catalog',
      fday_head: 'You’ve got an account — your first six steps',
      fday_p1: 'You’ve got a base (account) — now you bring it to life. The first few steps decide whether the Fediverse clicks or feels empty and quiet.',
      fday_p2: 'Go through the six tasks below in order; each takes minutes. Then check the “five things that work differently here” — small habits that help the community welcome you.',
      fday_1: 'Fill in your profile — avatar, a short bio and a header. People follow accounts that don’t look empty.',
      fday_2: 'Verify your website with a rel=me link — your profile then shows the site is really yours.',
      fday_3: 'Post an intro with #introductions and pin it — that’s how people find you.',
      fday_4: 'Kit out your base with a client — your app (network) also works through client apps, handier on a phone.',
      fday_4_cta: 'Show clients for %s',
      fday_4_webonly: 'For %s the web is the usual way — you don’t need a separate client.',
      fday_5: 'Find people to follow — start with Sloník and the Zprávobot catalog above.',
      fday_6: 'Check the three timelines: Home (who you follow), Local (your server) and Federated (the wider Fediverse).',
      norms_head: 'Five things that work differently here',
      norms_intro: 'No strict rules — just small habits that help the community welcome you.',
      norms_1: 'Put sensitive topics behind a CW (content warning) — readers open what they want.',
      norms_2: 'Add alt text to images — a description for people who can’t see them. Here it’s basic courtesy.',
      norms_3: 'Use hashtags — discovery runs mostly through them, not full-text search.',
      norms_4: 'Share with a boost (like a repost). Quote-posting is rare here — deliberately, to keep things calm.',
      norms_5: 'Before sending, check the post visibility (public / followers / direct) — you choose it per post.',
      faqn_head: 'Common first questions',
      faqn_q1: 'My sign-up is waiting for approval — now what?',
      faqn_a1: 'On “approval” servers an admin has to let you in. It usually takes a few hours, sometimes by the next day. You’ll get an email. Meanwhile, feel free to go through the rest of the tips here.',
      faqn_q2: 'I can’t find my friend — how do I find them?',
      faqn_a2: 'You need their full address as @name@server.com. Paste it into your app’s search and hit Follow. Just “@name” isn’t enough — the server matters.',
      faqn_q3: 'How do I move to another server?',
      faqn_a3: 'Mastodon does this built-in: set an alias on the new account pointing to the old one, start the move on the old one, and your followers transfer automatically. Posts don’t move, but your profile and followers do.',
      faqn_q4: 'My home timeline is empty — is that normal?',
      faqn_a4: 'Totally. The home timeline only shows people you follow — at the start there’s no one. Start following accounts via Sloník.online and katalog.zpravobot.news and it fills up fast.',
      start_next_step: 'Next step',
      count_of: 'of', count_sources: 'sources',
      nav_platform: 'Platform', nav_charts: 'Charts', nav_risers: 'Weekly risers', nav_new: 'New',
      nav_all: 'All', nav_top10_foll: 'Top 10 followed', nav_top10_active: 'Top 10 active',
      nav_top50_foll: 'Top 50 followed', nav_top50_active: 'Top 50 active',
      nav_risers_foll: 'In followers', nav_risers_active: 'In activity', nav_recent: 'Recently added',
      filters_toggle: 'Filters', menu_show: 'Menu', menu_hide: 'Close', nav_views: 'Sections',
      nav_slices: 'Charts', head_topic_byaccount: 'Topic (by account)',
      search_label: 'Search', search_ph: 'Name or handle…',
      sort_label: 'Sort', sort_name: 'Alphabetically', sort_followers: 'Most followers',
      sort_posts: 'Most active', sort_added: 'Recently added',
      head_topic: 'Topic', head_type: 'Account type', head_language: 'Language', head_tag: 'Tag',
      tag_ph: 'Filter by tag…', reset: 'Clear filters',
      loading: 'Loading catalog…', empty_title: 'No source matches the filters.',
      empty_hint: 'Try loosening one of the filters.', empty_reset: 'Reset filters',
      load_error: 'Failed to load catalog data.',
      footer_indexed: 'Search last indexed',
      footer_updated: 'Catalog last updated',
      footer_updates: 'Last updated:',
      footer_updates_stats: 'statistics', footer_updates_apps: 'apps',
      footer_updates_instances: 'instances', footer_updates_tools: 'tools',
      footer_sponsor: 'This site runs\nwith support from',
      footer_owner: 'Are you the owner and want it removed from the catalog? Write to',
      fam_sport: 'Sports', fam_news: 'News', fam_culture: 'Culture', fam_science_tech: 'Science & tech',
      fam_lifestyle: 'Lifestyle', fam_business: 'Business', fam_humor: 'Humor', fam_government: 'Government',
      type_person: 'Person', type_media: 'Media', type_institution: 'Organization',
      type_institution_formal: 'Institution', type_institution_filter: 'Institution/Organization',
      type_team: 'Team', type_other: 'Other',
      lang_cs: 'Czech', lang_sk: 'Slovak', lang_en: 'English',
      stat_followers: 'followers', stat_posts_week: 'posts/week', stat_language: 'language',
      modal_sources: 'Original profiles', modal_open: 'Open profile', modal_follow: 'Follow',
      modal_follow_title: 'Opens the profile where you can follow from your own Mastodon instance', modal_close: 'Close',
      hover_source: 'Source: ', card_detail: 'Detail of ',
      slice_platform: 'Sources on ', slice_recent_pre: 'Added in the last ',
      slice_recent_post: ' days', slice_top_pre: 'Top ', slice_top_post: ' (filters except topic are off)',
      top_phrase_followers: 'by followers', top_phrase_active: 'by activity',
      top_phrase_gain_followers: 'by follower growth', top_phrase_gain_activity: 'by activity growth',
      view_accounts: 'Accounts', view_posts: 'Posts', view_about: 'About Fedík', view_search: 'Search', view_instance: 'Instances', view_links: 'Links', view_glossary: 'Glossary',
      glossary_nav_desc: 'Fediverse terms and how-tos (in Czech). Filter by level, theme and type; the “for beginners” order walks you from the basics. Entries are searchable from Search too.',
      gloss_head_level: 'Level', gloss_head_theme: 'Theme', gloss_head_type: 'Type',
      gsort_order: 'For beginners', gsort_alpha: 'Alphabetical', gsort_theme: 'By theme',
      glevel_zakladni: 'Basic', glevel_pokrocile: 'Advanced',
      gtype_pojem: 'Term', gtype_postup: 'How-to', gtype_zkratka: 'Abbreviation',
      gtheme_ucty: 'Accounts', gtheme_federace: 'Federation', gtheme_obsah: 'Content', gtheme_moderovani: 'Moderation', gtheme_soukromi: 'Privacy', gtheme_technika: 'Tech',
      gloss_count: 'entries', gloss_unit: 'entries', gloss_empty: 'No entry matches the filters.',
      gloss_steps: 'Step by step', gloss_seealso: 'Related', gloss_external: 'Official guide ↗', gloss_no_steps: 'Click-by-click steps coming later; the gist is in the description above.',
      search_sec_glossary: 'Glossary',
      view_tools: 'Tools',
      tools_nav_desc: 'Clients, bridges, discovery tools and more for the Fediverse. Filter by category, platform, app and price. Clients come from FediDB; the rest is a curated set of live tools.',
      tools_head_category: 'Category', tools_head_platform: 'Platform', tools_head_forapp: 'For app', tools_head_price: 'Price',
      tcat_klient: 'Client', tcat_crossposter: 'Crossposter', tcat_most: 'Bridge', tcat_objevovani: 'Account discovery', tcat_migrace: 'Migration', tcat_rss: 'RSS / automation', tcat_analytika: 'Analytics',
      tplat_android: 'Android', tplat_ios: 'iOS', tplat_web: 'Web', tplat_desktop: 'Desktop', tplat_sluzba: 'Web/service',
      tprice_zdarma: 'Free', tprice_freemium: 'Freemium', tprice_placene: 'Paid', tprice_unknown: 'unlisted',
      tools_count: 'tools', tools_tab_featured: 'Featured', tools_tab_new: 'Recently added',
      tools_own: 'our project', tools_official: 'official', tools_featured: 'featured',
      tools_for: 'For:', tools_added: 'added', tools_link_open: 'Open ↗', tools_link_appstore: 'App Store ↗', tools_link_googleplay: 'Google Play ↗', tools_link_fdroid: 'F-Droid ↗', tools_link_src: 'Source ↗', tools_glossary: 'Glossary →',
      tools_empty: 'No tool matches the filters.',
      tools_empty_crossposter: 'This category is empty for now — classic crossposters died with the Twitter API shutdown. Live cross-network linking is handled by Bridges today.',
      tools_empty_analytika: 'No verified live tool in this category yet.',
      view_stats: 'Stats',
      stats_nav_desc: 'A few numbers and charts about the Fediverse — an overview, not analytics. Reads from the same layers as Apps and Instances; nothing extra is fetched.',
      stats_head_period: 'Period', stats_head_region: 'Region', stats_head_series: 'Apps (series)',
      stats_tab_overview: 'Overview', stats_tab_apps: 'By app', stats_tab_growth: 'Growth over time', stats_tab_czsk: 'CZ/SK slice',
      stats_users: 'Users', stats_mau: 'Monthly active', stats_servers: 'Servers', stats_posts: 'Posts', stats_czsk_instances: 'CZ/SK instances',
      stats_total: 'Whole network', stats_region_global: 'Global', stats_region_czsk: 'CZ-SK',
      stats_period_1y: '1 year', stats_period_2y: '2 years', stats_period_all: 'All',
      stats_updated: 'updated',
      stats_approx: 'Numbers are indicative — FediDB only sees instances it crawls; it underestimates new and niche apps.',
      stats_loading: 'Loading numbers…',
      stats_growth_empty: 'No data yet for the selected period and series.',
      stats_growth_sparse: 'History is still being collected — there is only one snapshot so far; the line appears as more accrue.',
      stats_snap_unavail: 'Snapshot history is unavailable — try again later.',
      stats_czsk_unavail: 'The CZ/SK summary is unavailable — the last saved snapshot will show once available.',
      stats_czsk_caveat: 'Lower bound: only users on CZ/SK instances, not Czechs and Slovaks on global servers.',
      links_nav_title: 'Links',
      links_nav_desc: 'A curated set of quality articles and guides about Mastodon and the fediverse — Czech and English. Filter by type and language.',
      links_head_type: 'Type', links_count: 'links',
      ltype_navod: 'Guide', ltype_clanek: 'Article', ltype_oficialni: 'Official page', ltype_video: 'Video',
      links_head_type: 'Type', links_head_lang: 'Language', links_head_theme: 'Theme',
      ltheme_uvod: 'Intro', ltheme_navody: 'Guides', ltheme_technika: 'Tech', ltheme_komunita: 'Community', ltheme_data: 'Data',
      lsort_recommended: 'Recommended', lsort_alpha: 'Alphabetical', lsort_lang: 'By language',
      lfresh_undated: 'undated', lfresh_current: 'kept current', links_zero: 'No link matches the filters.',
      accounts_nav_title: 'Accounts',
      accounts_nav_desc: 'A catalog of Czech and Slovak accounts on Mastodon. Filter by topic, type, language and tags, search by name or handle, and sort by followers or activity. Click an account for details.',
      posts_nav_title: 'Posts',
      posts_nav_desc: 'The best posts from Czech and Slovak accounts over the past week. Switch charts (Top 10/50, weekly risers), filter by topic, text and hashtags, and sort by boosts, favourites or date.',
      instance_nav_title: 'Instances',
      instance_nav_desc: 'Czech & Slovak Mastodon instances — where to create an account and who you will find there. Each shows size, activity, registration status and how many accounts from this catalog live there. Sorted by size.',
      instance_loading: 'Loading instances…', instance_unavail: 'Instance list is not available yet.',
      instance_count: 'instances', instance_reg_open: 'Registrations open',
      instance_reg_approval: 'Registrations with approval', instance_reg_closed: 'Registrations closed',
      instance_reg_invite: 'Invite only',
      instance_join: 'Create account', instance_open: 'open',
      instance_users: 'users',
      instance_sec_czsk: 'Czech & Slovak instances', instance_sec_global: 'Recommended global',
      instance_search_ph: 'Name or domain…',
      isort_users: 'Most users', isort_reg: 'By registration',
      instance_region_head: 'Region', instance_head_app: 'App', instance_head_focus: 'Focus',
      instance_head_reg: 'Registration', instance_head_size: 'Size',
      instance_region_cz: 'Czechia', instance_region_sk: 'Slovakia', instance_region_global: 'Global',
      instance_beginner: 'Beginner-friendly',
      ifoc_obecna: 'General', ifoc_tech: 'Tech', ifoc_umeni: 'Art', ifoc_akademicka: 'Academia',
      ifoc_hry: 'Games', ifoc_region: 'Regional', ifoc_lgbtq: 'LGBTQ+',
      isize_small: 'Small (<1k)', isize_medium: 'Medium', isize_large: 'Large',
      irank_activity: 'Instance activity', irank_ratio: 'By ratio', irank_volume: 'By volume',
      irank_ratio_note: 'by share of active users', irank_volume_note: 'by total number of posts',
      ssort_relevance: 'By relevance',
      search_tagline: 'Searches apps, instances, tools, the glossary and links — diacritics-insensitive.',
      search_tip: 'Tip: multiple words must all appear;\nwrap an exact phrase in quotes ("…");\nexclude a word with a minus (-word).',
      search_ph_view: 'Search Fedík’s content…', search_unit_accounts: 'accounts', search_unit_posts: 'posts',
      search_sec_accounts: 'Accounts', search_sec_posts: 'Posts', search_loading: 'Loading index…',
      search_hint: 'type a query', search_zero: 'Nothing found. Try other / broader words.', search_results_unit: 'results',
      search_unavail: 'Search index is not available yet.', search_open: 'open on Mastodon',
      search_posts_active: 'posts (30 days)', search_followers: 'followers',
      search_nav_title: 'Search',
      search_nav_desc: 'Searches Fedík’s content — apps, instances, tools, the glossary and links. Case- and diacritics-insensitive (type “mastodon”, finds “Mastodon”). Results are grouped by type.',
      about_title: 'About Fedík',
      about_menu_about: 'About Fedík', about_menu_howto: 'How to use', about_menu_other: 'Other',
      about_menu_other_desc: 'And finally, a few closing notes — FAQ, the tech behind it, about the author, and how to support the project.',
      about_menu_about_desc: 'What Fedík.online is, who it is for, how it is made and where it draws data from — plus sources, attribution and contact.',
      about_menu_howto_desc: 'A few tips on how to get the most out of what Fedík.online offers for working with:',
      about_nav_about: 'About Fedík', about_nav_search: 'Search', about_nav_instance: 'Instances', about_nav_apps: 'Apps', about_nav_tools: 'Tools',
      about_nav_accounts: 'Accounts', about_nav_posts: 'Posts', about_nav_links_howto: 'Links',
      about_nav_tech: 'Technical details', about_nav_author: 'About the author', about_nav_faq: 'FAQ', about_nav_faq_novacci: 'FAQ for beginners',
      prisers_ratio: 'By ratio', prisers_abs: 'By reach',
      label_bot: 'Bot', label_bot_title: 'Automated account (bot)',
      psort_engagement: 'Most boosts + favs', psort_reblogs: 'Most boosts',
      psort_favourites: 'Most favs', psort_date: 'Newest', psort_date_asc: 'Oldest first',
      posts_loading: 'Loading posts…', posts_empty: 'No post matches the filters.',
      posts_unavailable: 'Posts are available every week on Monday morning.',
      posts_week: 'Week', posts_count: 'posts', post_media: 'Attachment',
      post_media_only: '[Post with media]', post_open: 'Open on Mastodon',
      post_more: 'show more', post_riser: 'Riser', profile_title: 'Open profile',
      head_hashtags: 'Hashtags', hashtags_empty: 'No hashtags in shown posts.'
    }
  };

  function t(key) {
    var s = STRINGS[lang] && STRINGS[lang][key];
    return s != null ? s : (STRINGS.cs[key] != null ? STRINGS.cs[key] : key);
  }

  // Platform names — značky, nepřekládají se.
  var PLATFORM_LABELS = {
    twitter: 'X', threads: 'Threads', bluesky: 'Bluesky', facebook: 'Facebook',
    instagram: 'Instagram', youtube: 'YouTube', rss: 'RSS'
  };
  function platformLabel(p) { return PLATFORM_LABELS[p] || p; }
  function familyLabel(f) { return t('fam_' + f); }
  function escapeHtml(s) {
    return (s || '').replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function langLabel(l) { return t('lang_' + l); }

  // Typ "institution" se pojmenuje podle oblasti — vláda/kultura „Instituce",
  // jinde „Organizace". Týmy mají vlastní typ.
  var INSTITUTION_FORMAL_FAMILIES = { government: 1, culture: 1 };
  function typeLabel(rec) {
    if (rec.type === 'institution') {
      return INSTITUTION_FORMAL_FAMILIES[rec.family] ? t('type_institution_formal') : t('type_institution');
    }
    return t('type_' + rec.type);
  }

  // Štítek filtru "institution" se přizpůsobí zvolené oblasti (1 oblast → varianta).
  function updateInstitutionFilterLabel() {
    if (!institutionBtnEl) return;
    var label = t('type_institution_filter');
    if (filters.family.size === 1) {
      var fam = filters.family.values().next().value;
      label = INSTITUTION_FORMAL_FAMILIES[fam] ? t('type_institution_formal') : t('type_institution');
    }
    institutionBtnEl.textContent = label;
  }

  // Jazyk z ?lang= (sdílitelné) → localStorage → default 'cs'. Bez detekce prohlížeče.
  function initLang() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    var stored = null;
    try { stored = localStorage.getItem('zbnw_lang'); } catch (e) { /* ignore */ }
    var pick = fromUrl || stored || 'cs';
    lang = LANGS.indexOf(pick) !== -1 ? pick : 'cs';
    document.documentElement.lang = lang;
  }

  // Přeloží statické prvky ([data-i18n] textContent, [data-i18n-ph] placeholder)
  // + titulek dokumentu. Dynamický obsah (karty/modal) řeší render() přes t().
  function applyI18n() {
    document.title = t('title_doc');
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
    });
    // Bohatý obsah (O Sloníkovi) — bloky cs/en, zobraz jen aktuální jazyk.
    document.querySelectorAll('[data-lang-block]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang-block') !== lang;
    });
    updateLangSwitchUI();
    updateSidebarToggleLabel();
    updateFamilyHeading();
  }

  function setLang(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    lang = next;
    try { localStorage.setItem('zbnw_lang', lang); } catch (e) { /* ignore */ }
    // ?lang v query (mimo hash filtrů) — sdílitelné, přežije refresh
    var params = new URLSearchParams(location.search);
    if (lang === 'cs') { params.delete('lang'); } else { params.set('lang', lang); }
    var qs = params.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    applyI18n();
    render();
    applyView();   // zachová aktuální pohled (Posty/O Sloníku) + přegeneruje meta (týden) v novém jazyce
    renderUpdatedRelative();
  }

  function bindLangSwitch() {
    var sw = document.getElementById('lang-switch');
    if (!sw) return;
    sw.querySelectorAll('button[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.getAttribute('data-lang')); });
    });
  }

  function updateLangSwitchUI() {
    var sw = document.getElementById('lang-switch');
    if (!sw) return;
    sw.querySelectorAll('button[data-lang]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    });
  }

  // ========================================================
  // Pohled: přepínač Účty | Posty
  // ========================================================
  // Navigace je na DVOU místech: navbar (desktop) + mobilní drawer („Pohledy").
  // Vážeme/zvýrazňujeme proto VŠECHNA [data-view] tlačítka napříč dokumentem.
  function bindViewSwitch() {
    document.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setView(btn.getAttribute('data-view'));
        if (sidebarEl) sidebarEl.classList.remove('open');   // v draweru: po volbě zavři menu
        if (sidebarToggleEl) sidebarToggleEl.setAttribute('aria-expanded', 'false');
        updateSidebarToggleLabel();
      });
    });
  }

  function setView(next) {
    if (['start', 'instance', 'search', 'about', 'odkazy', 'aplikace', 'slovnicek', 'nastroje', 'statistiky'].indexOf(next) === -1) return;
    if (next === view) return;
    view = next;
    var _vk = { start: 'view_start', instance: 'view_instance', search: 'view_search', about: 'view_about', odkazy: 'view_links', aplikace: 'view_apps', slovnicek: 'view_glossary', nastroje: 'view_tools', statistiky: 'view_stats' }[next];
    document.title = (_vk ? t(_vk) + ' — ' : '') + t('title_doc');
    applyView();
    writeHash();
  }

  // Promítne aktuální `view` do DOM (skryje/zobrazí sekce, načte posty/search lazy).
  function applyView() {
    var isPosts = view === 'posty';
    var isAbout = view === 'about';
    var isSearch = view === 'search';
    var isInstance = view === 'instance';
    var isAccounts = view === 'ucty';
    var isLinks = view === 'odkazy';
    var isStart = view === 'start';
    var isApps = view === 'aplikace';
    var isGlossary = view === 'slovnicek';
    var isTools = view === 'nastroje';
    var isStats = view === 'statistiky';
    if (!isApps) appsWizardMode = false;   // wizard mód platí jen po dobu pobytu v katalogu z průvodce
    if (appsViewEl) appsViewEl.hidden = !isApps;
    if (glossaryViewEl) glossaryViewEl.hidden = !isGlossary;
    if (toolsViewEl) toolsViewEl.hidden = !isTools;
    if (statsViewEl) statsViewEl.hidden = !isStats;
    if (startViewEl) startViewEl.hidden = !isStart;
    if (accountsViewEl) accountsViewEl.hidden = !isAccounts;
    if (postsViewEl) postsViewEl.hidden = !isPosts;
    if (aboutViewEl) aboutViewEl.hidden = !isAbout;
    if (searchViewEl) searchViewEl.hidden = !isSearch;
    if (instanceViewEl) instanceViewEl.hidden = !isInstance;
    if (linksViewEl) linksViewEl.hidden = !isLinks;
    if (sidebarEl) sidebarEl.hidden = false;   // sidebar zůstává ve všech pohledech
    document.body.classList.toggle('view-posts', isPosts);
    document.body.classList.toggle('view-about', isAbout);
    document.body.classList.toggle('view-search', isSearch);
    document.body.classList.toggle('view-instance', isInstance);
    document.body.classList.toggle('view-start', isStart);
    if (tabsEl) tabsEl.hidden = !isAccounts;        // řezy účtů jen v Účtech
    if (postsTabsEl) postsTabsEl.hidden = !isPosts; // řezy postů (Vše/Top10/Top50/Skokani)
    if (instanceTabsEl) instanceTabsEl.hidden = !isInstance; // řezy instancí
    if (searchTabsEl) searchTabsEl.hidden = !isSearch;       // řezy výsledků hledání
    if (linksTabsEl) linksTabsEl.hidden = !isLinks;          // lišta s počtem odkazů
    if (appsTabsEl) appsTabsEl.hidden = !isApps;             // lišta s počtem aplikací
    if (glossaryTabsEl) glossaryTabsEl.hidden = !isGlossary; // lišta s počtem hesel
    if (toolsTabsEl) toolsTabsEl.hidden = !isTools;          // žebříčky + počet nástrojů
    if (statsTabsEl) statsTabsEl.hidden = !isStats;          // záložky Statistik
    // Účtové filtry (typ/jazyk/tag/řazení) jen v Účtech.
    document.querySelectorAll(
      '.filter-group[data-filter="type"], .filter-group[data-filter="language"],' +
      '.filter-group[data-filter="tag"], .filter-sort:not(.filter-sort-posts):not(.filter-sort-instance):not(.filter-sort-search):not(.filter-sort-apps):not(.filter-sort-links)'
    ).forEach(function (el) { el.hidden = !isAccounts; });
    // Fulltext (malé pole) + reset: jen v Účtech a Postech.
    document.querySelectorAll(
      '.filter-search:not(.filter-search-instance), #reset-filters'
    ).forEach(function (el) { el.hidden = !(isAccounts || isPosts); });
    // Oblast (rodina) + Hashtagy: Účty, Posty i Vyhledávání.
    document.querySelectorAll('.filter-group[data-filter="family"]')
      .forEach(function (el) { el.hidden = !(isAccounts || isPosts); });
    if (postsSortWrapEl) postsSortWrapEl.hidden = !isPosts;
    if (postHashtagsGroupEl) postHashtagsGroupEl.hidden = !isPosts;
    // Instanční filtry (Vyhledat / Řadit / fasety) jen v Instancích.
    [instanceSearchWrapEl, instanceSortWrapEl].forEach(function (el) { if (el) el.hidden = !isInstance; });
    document.querySelectorAll('.filter-group-instance').forEach(function (el) { el.hidden = !isInstance; });
    // Sloníkovské řazení postů ve Fedíku nepoužíváme.
    if (searchSortWrapEl) searchSortWrapEl.hidden = true;
    // Filtry Odkazů (Typ / Jazyk / Téma) + řazení jen v Odkazech.
    document.querySelectorAll('.filter-group-links').forEach(function (el) { el.hidden = !isLinks; });
    if (linksSortWrapEl) linksSortWrapEl.hidden = !isLinks;
    // Fasety + řazení Aplikací jen v Aplikacích.
    document.querySelectorAll('.filter-group-apps').forEach(function (el) { el.hidden = !isApps; });
    if (appsSortWrapEl) appsSortWrapEl.hidden = !isApps;
    // Fasety + řazení Slovníčku jen ve Slovníčku.
    document.querySelectorAll('.filter-group-glossary').forEach(function (el) { el.hidden = !isGlossary; });
    if (glossarySortWrapEl) glossarySortWrapEl.hidden = !isGlossary;
    // Fasety Nástrojů jen v Nástrojích.
    document.querySelectorAll('.filter-group-tools').forEach(function (el) { el.hidden = !isTools; });
    // Ovládací prvky Statistik jen ve Statistikách (a jen v záložce Růst — řeší renderStats).
    document.querySelectorAll('.filter-group-stats').forEach(function (el) { el.hidden = !(isStats && statsTab === 'growth'); });
    if (accountsNavEl) accountsNavEl.hidden = !isAccounts; // levý panel Účty
    if (postsNavEl) postsNavEl.hidden = !isPosts;          // levý panel Posty
    if (startNavEl) startNavEl.hidden = !isStart;   // levý panel Začínáme
    if (aboutNavEl) aboutNavEl.hidden = !isAbout;
    if (searchNavEl) searchNavEl.hidden = !isSearch;      // levý panel Vyhledávání (popis, co hledá)
    if (instanceNavEl) instanceNavEl.hidden = !isInstance; // levý panel Instance
    if (linksNavEl) linksNavEl.hidden = !isLinks;          // levý panel Odkazy
    if (appsNavEl) appsNavEl.hidden = !isApps;             // levý panel Aplikace
    if (glossaryNavEl) glossaryNavEl.hidden = !isGlossary; // levý panel Slovníček
    if (toolsNavEl) toolsNavEl.hidden = !isTools;          // levý panel Nástroje
    if (statsNavEl) statsNavEl.hidden = !isStats;          // levý panel Statistiky
    // Nadpis „Rychlé filtry" v draweru — skrýt tam, kde žádné řezy nejsou (O Fedíku, Začínáme).
    if (slicesHeadingEl) slicesHeadingEl.hidden = isAbout || isStart;
    updateViewSwitchUI();
    updateFamilyHeading();
    if (isAbout) applyAboutSection();
    if (isPosts) {
      updatePostsTabsUI();
      ensurePostsLoaded();
      renderPosts();
    }
    if (isSearch) {
      updateSearchTabsUI();
      // Index (~MB) NEnačítáme na landing — až při dotazu/focusu (viz bindSearchView).
      // Výjimka: deep-link s dotazem (sq=) → načti hned.
      if (searchQEl && searchQEl.value.trim()) {
        ensureSearchLoaded().then(function () { renderSearch(); });
      } else {
        renderSearch();   // jen landing (logo + pole), bez fetche
        if (searchQEl) setTimeout(function () { searchQEl.focus(); }, 0);
      }
    }
    if (isInstance) {
      if (instanceSortEl) instanceSortEl.value = instanceSort;
      updateInstanceTabsUI();
      renderInstances();   // hned (i bez dat ukáže prázdno/empty); po načtení překreslí
      ensureInstancesLoaded().then(function () { updateInstanceTabsUI(); renderInstances(); });
    }
    if (isLinks) { if (linksSortEl) linksSortEl.value = linksSort; renderLinks(); }
    if (isStart) { applyStartSection(); renderStart(); }
    if (isApps) {
      if (appsSortEl) appsSortEl.value = appsSort;
      updateAppsTabsUI();
      renderApps();                                   // hned (čísla „—", než dojede stats)
      ensureAppStats().then(function () { renderApps(); });
    }
    if (isGlossary) {
      if (glossarySortEl) glossarySortEl.value = glossarySort;
      renderGlossary();
      maybeOpenPendingGlossary();   // deep-link #...&heslo=<slug>
    }
    if (isTools) {
      updateToolsTabsUI();
      renderTools();
    }
    if (isStats) {
      renderStats();                                   // hned (může ukázat „načítá se")
      ensureAppStats().then(function () { renderStats(); });  // Přehled + Podle aplikací (vrstva Pohledu 2)
      if (statsTab === 'growth' || statsTab === 'czsk') ensureStatSnapshots().then(function () { renderStats(); });
      if (statsTab === 'czsk') ensureCzsk().then(function () { renderStats(); });
    }
  }

  // Zobrazí vybranou sekci „O Sloníkovi" a zvýrazní položku menu.
  function applyAboutSection() {
    document.querySelectorAll('#about-view [data-about-section]').forEach(function (el) {
      el.hidden = el.getAttribute('data-about-section') !== aboutSection;
    });
    if (aboutNavEl) {
      aboutNavEl.querySelectorAll('button[data-about]').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-about') === aboutSection);
      });
    }
  }

  // Vrátí App objekt z taxonomie podle volby v pickeru kroku 2: explicitně vybraná karta
  // (startPickerChosenId), jinak první doporučená. (null, když nic nevybráno.)
  function getPickerSelectedApp() {
    var sel = document.getElementById('start-picker');
    if (!sel || !sel.value || !startPickerMap[sel.value]) return null;
    var appIds = startPickerMap[sel.value].appIds;
    if (!appIds || !appIds.length) return null;
    var taxApps = startTaxApps();
    if (startPickerChosenId && appIds.indexOf(startPickerChosenId) !== -1 && taxApps[startPickerChosenId]) {
      return taxApps[startPickerChosenId];
    }
    return taxApps[appIds[0]] || null;
  }

  // Aktualizuje CTA a mamutovo box v kroku 3 podle zvolené aplikace z kroku 2.
  function updateStep3ForApp(app) {
    var isMastodon = !app || app.id === 'mastodon';
    var hasCatalog = !app || !!app.internalUrl;        // appka s interním katalogem instancí
    var starter = app && app.starterInstance;          // konkrétní česká instance pro appku bez katalogu

    // Mamutovo.cz doporučení — jen Mastodon. (mamutovo box = .start-default-box bez .start-starter-box)
    document.querySelectorAll('#start-step-3 .start-default-box:not(.start-starter-box)').forEach(function (b) {
      b.hidden = !isMastodon;
    });

    // Podmíněná copy: výběr v aplikaci (katalog NEBO doporučená instance) vs. „odejdeš na oficiální stránku".
    var inApp = hasCatalog || !!starter;
    document.querySelectorAll('#start-step-3 .step3-when-catalog').forEach(function (p) { p.hidden = !inApp; });
    document.querySelectorAll('#start-step-3 .step3-when-external').forEach(function (p) { p.hidden = inApp; });

    // Starter-instance box (např. PeerTube → vhsky.cz) — doporučení + tlačítko „Vybrat",
    // které se chová stejně jako „Vybrat tuhle" v seznamu (vybere → krok 4). Vyplň podle jazyka bloku.
    document.querySelectorAll('#start-step-3 .start-starter-box').forEach(function (box) {
      if (!starter) { box.hidden = true; box.innerHTML = ''; return; }
      box.hidden = false; box.innerHTML = '';
      var p = document.createElement('p');
      p.innerHTML = t('start_starter_lead').replace('%s', '<strong>' + app.name + '</strong>') +
                    ' <strong>' + starter.host + '</strong> — ' + t('start_starter_note');
      box.appendChild(p);
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'cta-btn';
      btn.setAttribute('data-pick-instance', starter.host);
      btn.setAttribute('data-umami-event', 'starter-' + starter.host);
      btn.textContent = t('start_cta_starter').replace('%s', starter.host);
      box.appendChild(btn);
    });

    var listEl = document.getElementById('start-step3-instances');
    var ctaEl = document.getElementById('start-step3-cta');
    var hintEl = document.getElementById('start-step3-hint');

    if (hasCatalog) {
      // Inline seznam instancí přímo v kroku 3 — uživatel neopouští onboarding.
      if (ctaEl) ctaEl.hidden = true;
      if (hintEl) hintEl.textContent = t('start_inst_hint_pick');
      renderStep3Instances(app);
    } else if (starter) {
      // Doporučená instance se vybírá v boxu výše (tlačítko Vybrat) → žádný odkaz ven.
      if (listEl) { listEl.hidden = true; listEl.innerHTML = ''; }
      if (ctaEl) ctaEl.hidden = true;
      if (hintEl) hintEl.textContent = t('start_inst_hint_pick');
    } else {
      // Žádný katalog ani doporučení → oficiální join stránka ven.
      if (listEl) { listEl.hidden = true; listEl.innerHTML = ''; }
      if (ctaEl) {
        ctaEl.hidden = false; ctaEl.href = app.joinUrl; ctaEl.textContent = t('start_cta_external');
        ctaEl.target = '_blank'; ctaEl.rel = 'noopener noreferrer';
      }
      if (hintEl) hintEl.textContent = t('start_inst_hint_external');
    }
  }

  // Inline seznam instancí v kroku 3 — jen pro vybranou appku a jen s reálně otevřenou
  // registrací (open/approval). Klik „Vybrat" uloží volbu a posune na krok 4 (bez odchodu ven).
  function renderStep3Instances(app) {
    var listEl = document.getElementById('start-step3-instances');
    if (!listEl) return;
    var appId = (app && app.id) || 'mastodon';
    listEl.hidden = false;
    listEl.innerHTML = '<p class="start-inst-loading">…</p>';
    ensureInstancesLoaded().then(function () {
      // Jiná appka se mezitím mohla vybrat — nevykresluj zastaralý seznam.
      if (startStep !== 3 || ((startPickedApp && startPickedApp.id) || 'mastodon') !== appId) return;
      var regOk = function (i) { return i.registration === 'open' || i.registration === 'approval'; };
      // Dvoustupňový fallback: nejdřív CZ/SK kvadrant, při prázdnu prověřené globální.
      var list = instanceList.filter(function (i) {
        return i.appId === appId && (i.region === 'cz' || i.region === 'sk') && regOk(i);
      });
      var usingGlobal = false;
      if (!list.length) {
        list = instanceList.filter(function (i) { return i.appId === appId && i.region === 'global' && regOk(i); });
        usingGlobal = true;
      }
      // Pořadí: výchozí doporučení → pro začátečníky → otevřená registrace → víc uživatelů.
      list.sort(function (a, b) {
        return (b.beginnerDefault ? 1 : 0) - (a.beginnerDefault ? 1 : 0) ||
               (b.beginnerFriendly ? 1 : 0) - (a.beginnerFriendly ? 1 : 0) ||
               (a.registration === 'open' ? 0 : 1) - (b.registration === 'open' ? 0 : 1) ||
               (b.users || 0) - (a.users || 0);
      });
      listEl.innerHTML = '';
      if (!list.length) {
        // Ani CZ/SK, ani globální (typicky self-host appky) → odkaz na oficiální list.
        var empty = document.createElement('p');
        empty.className = 'start-inst-empty';
        empty.textContent = t('start_inst_empty') + ' ';
        var a = document.createElement('a');
        a.href = (app && app.joinUrl) || 'https://joinfediverse.wiki';
        a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.textContent = (app && app.joinUrl) || 'joinfediverse.wiki';
        empty.appendChild(a); listEl.appendChild(empty);
        return;
      }
      var head = document.createElement('p');
      head.className = 'start-inst-heading';
      head.textContent = t(usingGlobal ? 'start_inst_heading_global' : 'start_inst_heading');
      listEl.appendChild(head);
      var max = 8;
      list.slice(0, max).forEach(function (i) { listEl.appendChild(buildStep3InstanceItem(i)); });
      if (list.length > max && app && app.internalUrl) {
        var more = document.createElement('a');
        more.className = 'start-inst-more'; more.href = app.internalUrl + '&step=4';
        more.textContent = t('start_inst_more');
        listEl.appendChild(more);
      }
    });
  }

  function buildStep3InstanceItem(i) {
    var row = document.createElement('div');
    row.className = 'start-inst-item';
    var body = document.createElement('div'); body.className = 'start-inst-item__body';
    var top = document.createElement('div'); top.className = 'start-inst-item__top';
    var nm = document.createElement('strong'); nm.textContent = i.name || i.domain; top.appendChild(nm);
    var host = document.createElement('span'); host.className = 'start-inst-item__host'; host.textContent = i.domain; top.appendChild(host);
    body.appendChild(top);
    var meta = document.createElement('div'); meta.className = 'start-inst-item__meta';
    var reg = document.createElement('span');
    reg.className = 'inst-reg inst-reg-' + i.registration; reg.textContent = t('instance_reg_' + i.registration);
    meta.appendChild(reg);
    if (i.users != null) {
      var u = document.createElement('span'); u.className = 'start-inst-item__users';
      u.textContent = appNum(i.users) + ' ' + t('instance_users'); meta.appendChild(u);
    }
    if (i.beginnerDefault) {
      var bd = document.createElement('span'); bd.className = 'start-inst-item__beg';
      bd.textContent = '★ ' + t('instance_beginner'); meta.appendChild(bd);
    }
    body.appendChild(meta);
    row.appendChild(body);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'cta-btn start-inst-item__choose';
    btn.textContent = t('start_inst_choose');
    btn.addEventListener('click', function () { pickInstance(i); });
    row.appendChild(btn);
    return row;
  }

  // Vybere instanci (objekt) → uloží volbu a posune na krok 4 (registrace probíhá tam).
  function pickInstance(inst) {
    if (!inst) return;
    startChosenInstance = inst;
    if (window.umami) window.umami.track('onboarding-instance', { host: inst.domain, app: inst.appId });
    showStartStep(4);
  }
  // Doporučovací tlačítka (mamutovo, starter) znají jen host → dořeš instanci z katalogu, pak vyber.
  function pickInstanceByHost(host) {
    if (!host) return;
    ensureInstancesLoaded().then(function () {
      pickInstance(instanceList.filter(function (x) { return x.domain === host; })[0]);
    });
  }

  function showStartStep(n) {
    startStep = n;
    document.querySelectorAll('.onboarding-step').forEach(function (el) { el.hidden = true; });
    var step = document.getElementById('start-step-' + n);
    if (step) step.hidden = false;
    if (n === 3) {
      if (startPickedLocked) {
        // Explicitní volba (per-card v pickeru / „Vybrat pro průvodce" z katalogu) → neodvozuj.
        startPickedLocked = false;
      } else {
        // Jinak odvoď appku z aktuálního výběru v pickeru — ať levé menu „Vyber instanci"
        // nebo „Další krok" nespadne na default Mastodon.
        var picked = getPickerSelectedApp();
        if (picked) startPickedApp = picked;
      }
      updateStep3ForApp(startPickedApp);
    }
    if (n === 4) updateStep4ForInstance();
    if (n === 5) updateStep5ForApp();
    if (startNavEl) {
      startNavEl.querySelectorAll('button[data-start]').forEach(function (btn) {
        btn.setAttribute('aria-pressed', btn.getAttribute('data-start') === String(n) ? 'true' : 'false');
      });
    }
    if (view === 'start') writeHash();   // krok drž v URL (přežije reload/sdílení)
    if (window.umami) window.umami.track('onboarding-step', { step: n });
  }

  // Krok 4: pokud uživatel vybral instanci v kroku 3, naservíruj přímý odkaz na registraci.
  function updateStep4ForInstance() {
    var box = document.getElementById('start-step4-chosen');
    if (!box) return;
    // Reload/deep-link: instanci máme jen jako host v hashi → dořeš po načtení katalogu.
    if (!startChosenInstance && pendingChosenInstHost) {
      var host = pendingChosenInstHost;
      ensureInstancesLoaded().then(function () {
        var found = instanceList.filter(function (x) { return x.domain === host; })[0];
        if (found && pendingChosenInstHost === host) {
          startChosenInstance = found; pendingChosenInstHost = '';
          if (startStep === 4) updateStep4ForInstance();
        }
      });
    }
    var i = startChosenInstance;
    if (!i) { box.hidden = true; box.innerHTML = ''; return; }
    box.hidden = false; box.innerHTML = '';
    var lead = document.createElement('p'); lead.className = 'start-chosen-lead';
    lead.innerHTML = t('start_step4_chosen_lead').replace('%s', '<strong>' + (i.name || i.domain) + '</strong> (' + i.domain + ')');
    box.appendChild(lead);
    var cta = document.createElement('a');
    cta.className = 'cta-btn'; cta.href = i.signupUrl || ('https://' + i.domain);
    cta.target = '_blank'; cta.rel = 'noopener noreferrer';
    cta.setAttribute('data-umami-event', 'signup-' + i.domain);
    cta.textContent = t('start_step4_chosen_cta').replace('%s', i.domain);
    box.appendChild(cta);
    var change = document.createElement('button');
    change.type = 'button'; change.className = 'start-chosen-change'; change.textContent = t('start_step4_chosen_change');
    change.addEventListener('click', function () { startChosenInstance = null; showStartStep(3); });
    box.appendChild(change);
  }

  // Krok 5, položka „klient": odkaz na Nástroje předfiltrované na klienty zvolené appky.
  // Když pro appku klienta nemáme (PieFed, Mbin, Mobilizon…), místo odkazu uklidnění „stačí web".
  function updateStep5ForApp() {
    var slots = document.querySelectorAll('#start-step-5 .fday4-cta');
    if (!slots.length) return;
    var app = startPickedApp;
    slots.forEach(function (slot) {
      slot.innerHTML = '';
      if (!app) {   // bez vybrané appky → obecný odkaz do Nástrojů
        var g = document.createElement('a'); g.className = 'onb-link'; g.href = '#view=nastroje';
        g.textContent = t('view_tools') + ' ↗'; slot.appendChild(g);
        return;
      }
      var clients = (window.FEDIK_TOOLS || []).filter(function (x) {
        return x.category === 'klient' && (x.forApps || []).indexOf(app.id) !== -1;
      });
      if (clients.length) {
        var a = document.createElement('a'); a.className = 'onb-link'; a.href = '#view=nastroje';
        a.setAttribute('data-umami-event', 'onboarding-clients-' + app.id);
        a.textContent = t('fday_4_cta').replace('%s', app.name) + ' ↗';
        a.addEventListener('click', function (e) {
          e.preventDefault();
          toolsFacets.category.clear(); toolsFacets.platform.clear();
          toolsFacets.forApp.clear(); toolsFacets.price.clear();
          toolsFacets.category.add('klient'); toolsFacets.forApp.add(app.id); toolsTab = 'all';
          setView('nastroje');
        });
        slot.appendChild(a);
      } else {       // fallback: žádný klient → web-only uklidnění
        var span = document.createElement('span'); span.className = 'fday4-webonly';
        span.textContent = t('fday_4_webonly').replace('%s', app.name);
        slot.appendChild(span);
      }
    });
  }

  function applyStartSection() {
    loadStartVideo();
    showStartStep(startStep);
  }

  function bindStartNav() {
    if (!startNavEl) return;
    startNavEl.querySelectorAll('button[data-start]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showStartStep(Number(btn.getAttribute('data-start')));
      });
    });
    document.querySelectorAll('button[data-start-next]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showStartStep(Number(btn.getAttribute('data-start-next')));
      });
    });
    // Doporučovací tlačítka „Vybrat <host>" (mamutovo statické v HTML, starter dynamické) —
    // delegovaně, ať fungují i pro prvky vyrobené později v updateStep3ForApp.
    var step3 = document.getElementById('start-step-3');
    if (step3) step3.addEventListener('click', function (ev) {
      var b = ev.target.closest('[data-pick-instance]');
      if (b) { ev.preventDefault(); pickInstanceByHost(b.getAttribute('data-pick-instance')); }
    });
  }

  function bindAboutNav() {
    if (!aboutNavEl) return;
    aboutNavEl.querySelectorAll('button[data-about]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        aboutSection = btn.getAttribute('data-about');
        applyAboutSection();
        writeHash();
      });
    });
  }

  // ========================================================
  // Vyhledávání (účty + posty) — index search.json / users.json
  // ========================================================
  function fold(s) { return (s || '').normalize('NFKD').replace(/\p{Mn}/gu, '').toLowerCase().replace(/\s+/g, ' ').trim(); }

  function ensureSearchLoaded() {
    if (searchState === 'loaded' || searchState === 'loading') {
      return searchPromise || Promise.resolve();
    }
    searchState = 'loading';
    // Hledá se v OBSAHU Fedíka (aplikace, instance, nástroje, slovníček, odkazy) — vše už
    // je v paměti jako globály; jediné async je seznam instancí (Sloník symlink).
    searchPromise = ensureInstancesLoaded()
      .then(buildFedikSearchIndex, buildFedikSearchIndex)
      .then(function () { searchState = 'loaded'; });
    return searchPromise;
  }

  // Předpočítá fold-index (_sfold) nad obsahem Fedíka. Idempotentní (běží jednou).
  function buildFedikSearchIndex() {
    appsList().forEach(function (a) {
      if (a._sfold == null) a._sfold = fold([a.name, a.descriptionCs, a.description, appCtLabel(a.contentType), a.centralizedEquivalent].join(' '));
    });
    (window.FEDIK_TOOLS || []).forEach(function (x) {
      if (x._sfold == null) x._sfold = fold([x.name, x.descriptionCs, x.descriptionEn, t('tcat_' + x.category), (x.forApps || []).join(' ')].join(' '));
    });
    (instanceList || []).forEach(function (i) {
      if (i._sfold == null) i._sfold = fold([i.domain, i.name, i.description, i.descriptionEn, (i.focus || []).join(' ')].join(' '));
    });
    (window.FEDIK_LINKS || []).forEach(function (l) {
      if (l._sfold == null) l._sfold = fold([l.title, l.description, l.author, t('ltype_' + l.type)].join(' '));
    });
    ensureGlossaryIndexed();
  }

  // HTML → čistý text (rychlý regex, ne DOMParser) pro hledání/zkrácení. Pro
  // ZOBRAZENÍ se používá content_html (sanitizePostHtml), tohle stačí na fold + délku.
  function htmlToText(h) {
    return (h || '')
      .replace(/<br\s*\/?>/gi, ' ').replace(/<\/(p|div|li)>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }

  // Index drží jen content_html (menší). Tady dopočítáme to, co frontend potřebuje:
  // content_plain (zobrazení/zkrácení), content_folded (hledání), engagement.
  function hydrateSearchPosts() {
    // Slim index: účtová pole nejsou v každém postu (redundance). Username/instance
    // odvodíme z account_acct, jméno/avatar dotáhneme z users.json (join dle acct).
    var usersByAcct = {};
    searchUsers.forEach(function (u) { usersByAcct[u.a] = u; });
    searchPosts.forEach(function (p) {
      var a = p.account_acct || '';
      if (p.account_username == null) p.account_username = a.split('@')[0];
      if (p.account_instance == null) { var at = a.indexOf('@'); p.account_instance = at >= 0 ? a.slice(at + 1) : ''; }
      var u = usersByAcct[a];
      if (u) {
        if (p.account_display_name == null) p.account_display_name = u.n;
        if (p.account_avatar == null) p.account_avatar = u.av;
      }
      if (p.content_html) {                              // slim index → odvoď z HTML
        p.content_plain = htmlToText(p.content_html);
        p.content_folded = fold(p.content_plain + ' ' + (p.account_acct || '') + ' ' + (p.account_display_name || ''));
      } else {                                           // starý/přechodný záznam → ponech, co přišlo
        if (p.content_plain == null) p.content_plain = '';
        if (p.content_folded == null) {
          p.content_folded = fold(p.content_plain + ' ' + (p.account_acct || '') + ' ' + (p.account_display_name || ''));
        }
      }
      if (p.engagement == null) p.engagement = (p.reblogs_count || 0) + (p.favourites_count || 0);
    });
  }

  // Skokani pro vyhledávání — stejná definice jako týdenní risers v Postech:
  // riser_score = engagement − průměr účtu; riser_ratio = engagement / průměr;
  // účty s < 3 posty v indexu vyřazeny. Počítá se z celého search indexu (jednou).
  function computeSearchRisers() {
    var sum = {}, cnt = {};
    searchPosts.forEach(function (p) {
      var a = p.account_acct; sum[a] = (sum[a] || 0) + (p.engagement || 0); cnt[a] = (cnt[a] || 0) + 1;
    });
    searchPosts.forEach(function (p) {
      var a = p.account_acct, n = cnt[a] || 0, avg = n ? sum[a] / n : 0;
      if (n >= 3 && avg > 0) {
        p.riser_ratio = (p.engagement || 0) / avg;
        p.riser_score = (p.engagement || 0) - avg;
      } else { p.riser_ratio = null; p.riser_score = null; }
    });
  }

  // Rozparsuje dotaz na tokeny: text v "uvozovkách" = jedna fráze (i s mezerami),
  // ostatní slova zvlášť, „-slovo" / -"fráze" = vyloučení (neg). Vše složené
  // (NFKD, bez diakritiky, lowercase). Vrací [{ t, neg }].
  function parseQueryTokens(raw) {
    var tokens = [];
    // Volitelné „-" před tokenem; uvozovky ASCII " i typografické „ " ".
    var re = /(-?)(?:["„“”]([^"„“”]+)["„“”]|(\S+))/g, m;
    while ((m = re.exec(raw || '')) !== null) {
      var t = fold(m[2] != null ? m[2] : m[3]).trim().replace(/\s+/g, ' ');
      if (t) tokens.push({ t: t, neg: m[1] === '-' });
    }
    return tokens;
  }

  // AND: záznam projde, jen když obsahuje VŠECHNA kladná slova/fráze a ŽÁDNÉ
  // vyloučené (-). Dotaz jen z vyloučení (bez kladného) → nic (nesmyslné).
  function searchRank(list, tokens, field) {
    field = field || 'f';                    // účty: 'f' · posty: 'content_folded'
    var pos = tokens.filter(function (x) { return !x.neg; });
    var neg = tokens.filter(function (x) { return x.neg; });
    var hits = [];
    if (!pos.length) return hits;
    for (var i = 0; i < list.length; i++) {
      var f = list[i][field];
      if (!f) continue;
      var ok = true;
      for (var k = 0; k < pos.length; k++) { if (f.indexOf(pos[k].t) === -1) { ok = false; break; } }
      if (ok) { for (var n = 0; n < neg.length; n++) { if (f.indexOf(neg[n].t) !== -1) { ok = false; break; } } }
      if (ok) hits.push({ x: list[i], m: pos.length });
    }
    return hits;
  }

  // Účet z users.json → karta. Když je v katalogu, použij plný záznam (modal
  // funguje stejně jako v Účtech); jinak minimální „externí" záznam.
  function searchAccountCard(u) {
    // Katalogový účet (i neaktivní) → plná karta + detail (modal). Jinak autor
    // mimo katalog → minimální karta s odkazem na profil.
    var full = catalogById[u.a];
    if (full) return buildCard(full);
    return buildCard({
      id: u.a, display_name: u.n || u.a, avatar: u.av,
      followers: u.fo || 0, posts_week: null,
      profile_url: 'https://' + u.i + '/@' + u.a.split('@')[0], _external: true
    });
  }

  function searchSection(label, total, shown) {
    var h = document.createElement('h2');
    h.className = 's-sec';
    h.textContent = label + ' ';
    var s = document.createElement('span');
    s.textContent = total + (shown ? ', ' + shown : '');
    h.appendChild(s);
    return h;
  }

  var SEARCH_MAX_PER = 24;   // strop na sekci ve výsledcích

  // Vyhledávání napříč obsahem Fedíka — výsledky seskupené po typech, plné karty.
  function renderSearch() {
    if (!searchResultsEl) return;
    var q = searchQEl ? searchQEl.value : '';
    if (searchViewEl) searchViewEl.classList.toggle('has-query', !!q.trim());
    if (searchState !== 'loaded') {
      if (q.trim()) ensureSearchLoaded().then(renderSearch);
      return;
    }
    var tokens = parseQueryTokens(q);
    searchResultsEl.innerHTML = '';
    if (!tokens.length) { if (searchMetaEl) searchMetaEl.textContent = ''; return; }

    var groups = [
      { key: 'aplikace',  label: t('view_apps'),     hits: searchRank(appsList(), tokens, '_sfold'),                card: buildAppCard },
      { key: 'instance',  label: t('view_instance'), hits: searchRank(instanceList || [], tokens, '_sfold'),        card: buildInstanceCard },
      { key: 'nastroje',  label: t('view_tools'),    hits: searchRank(window.FEDIK_TOOLS || [], tokens, '_sfold'),  card: buildToolCard },
      { key: 'slovnicek', label: t('view_glossary'), hits: glossarySearchHits(q),                                   card: buildGlossaryCard },
      { key: 'odkazy',    label: t('view_links'),    hits: searchRank(window.FEDIK_LINKS || [], tokens, '_sfold'),  card: buildLinkCard }
    ];
    var total = groups.reduce(function (n, g) { return n + g.hits.length; }, 0);
    if (searchMetaEl) searchMetaEl.textContent = total + ' ' + t('search_results_unit');

    var shown = false;
    groups.forEach(function (g) {
      if (searchTab !== 'all' && searchTab !== g.key) return;   // řez podle typu
      if (!g.hits.length) return;
      shown = true;
      searchResultsEl.appendChild(searchSection(g.label, g.hits.length));
      var grid = document.createElement('div'); grid.className = 'cards-grid';
      g.hits.slice(0, SEARCH_MAX_PER).forEach(function (h) { grid.appendChild(g.card(h.x)); });
      searchResultsEl.appendChild(grid);
    });
    if (!shown) {
      var e = document.createElement('p'); e.className = 's-empty'; e.textContent = t('search_zero');
      searchResultsEl.appendChild(e);
    }
  }

  // Řazení postů ve výsledcích hledání podle volby v levém menu.
  function sortSearchPosts(pHits) {
    if (searchSort === 'date') {
      pHits.sort(function (a, b) { return (b.x.created_at || '').localeCompare(a.x.created_at || ''); });
    } else if (searchSort === 'engagement' || searchSort === 'reblogs' || searchSort === 'favourites') {
      var key = searchSort === 'engagement' ? 'engagement' : searchSort === 'reblogs' ? 'reblogs_count' : 'favourites_count';
      pHits.sort(function (a, b) { return (b.x[key] || 0) - (a.x[key] || 0); });
    } else { // relevance (default): shoda, pak datum
      pHits.sort(function (a, b) { return b.m !== a.m ? b.m - a.m : (b.x.created_at || '').localeCompare(a.x.created_at || ''); });
    }
  }

  function updateSearchTabsUI() {
    if (!searchTabsEl) return;
    searchTabsEl.querySelectorAll('.tab[data-stab]').forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-stab') === searchTab);
    });
  }

  var searchTimer = null;
  function bindSearchView() {
    if (searchQEl) {
      // Focus = uživatel hodlá hledat → začni stahovat index na pozadí (zrychlejší 1. výsledek).
      searchQEl.addEventListener('focus', function () {
        ensureSearchLoaded().then(function () { renderSearch(); });
      });
      searchQEl.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          ensureSearchLoaded().then(function () { renderSearch(); });
          writeHash();
        }, 120);
      });
    }
    if (searchTabsEl) {
      searchTabsEl.querySelectorAll('.tab[data-stab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
          searchTab = tab.getAttribute('data-stab');
          updateSearchTabsUI();
          renderSearch();
          writeHash();
        });
      });
    }
    if (searchSortEl) {
      searchSortEl.addEventListener('change', function () {
        searchSort = searchSortEl.value;
        renderSearch();
      });
    }
  }

  // ========================================================
  // Pohled: Instance (adresář CZ/SK instancí z instances.json)
  // ========================================================
  // CZ/SK kategorie Sloníka → naše zaměření (focus). Prázdné → ['obecna'].
  var INSTANCE_FOCUS_MAP = { general: 'obecna', tech: 'tech', art: 'umeni', regional: 'region', journalism: 'obecna' };
  var INSTANCE_REG_OK = { open: 1, approval: 1, invite: 1, closed: 1 };
  var INSTANCE_REGION_ORDER = ['cz', 'sk', 'global'];   // CZ a SK nahoře
  var INSTANCE_FOCUS_ORDER = ['obecna', 'tech', 'umeni', 'akademicka', 'hry', 'region', 'lgbtq'];
  var INSTANCE_REG_ORDER = ['open', 'approval', 'invite', 'closed'];
  var INSTANCE_SIZE_ORDER = ['small', 'medium', 'large'];
  function instanceSize(u) { return u == null ? null : (u < 1000 ? 'small' : (u < 50000 ? 'medium' : 'large')); }

  // Adaptér: záznam Sloníka (read-only ze symlinku) → typ Instance.
  function adaptSlonikInstance(r) {
    var host = r.host, langs = r.languages || [];
    var region = langs.indexOf('sk') !== -1 ? 'sk' : 'cz';
    var focus = [];
    (r.categories || []).forEach(function (c) {
      var f = INSTANCE_FOCUS_MAP[c] || 'obecna';
      if (focus.indexOf(f) === -1) focus.push(f);
    });
    if (!focus.length) focus = ['obecna'];
    var reg = INSTANCE_REG_OK[r.registrations] ? r.registrations : 'closed';
    var inst = {
      id: host, domain: host, name: r.title || host, appId: 'mastodon',
      region: region, focus: focus, registration: reg,
      users: (r.users != null ? r.users : undefined),
      beginnerFriendly: (reg === 'open' || reg === 'approval'),
      description: r.description || '', thumbnail: r.thumbnail || '',
      signupUrl: 'https://' + host + '/auth/sign_up', source: 'slonik'
    };
    var ov = (window.FEDIK_INSTANCES_CURATED || {})[host];   // CZ/SK kurátorský overlay přebije
    if (ov) {
      if (ov.beginnerFriendly != null) inst.beginnerFriendly = ov.beginnerFriendly;
      if (ov.focus && ov.focus.length) inst.focus = ov.focus;
      if (ov.appId) inst.appId = ov.appId;
      // Ne-Mastodon instance mají jinou cestu k registraci než /auth/sign_up.
      if (ov.signupUrl) inst.signupUrl = ov.signupUrl;
      if (ov.beginnerDefault) inst.beginnerDefault = true;   // výchozí doporučení v onboardingu
    }
    return inst;
  }
  function normalizeManualInstance(m) {
    var inst = {}; for (var k in m) inst[k] = m[k];
    if (!inst.focus || !inst.focus.length) inst.focus = ['obecna'];
    if (inst.beginnerFriendly == null) inst.beginnerFriendly = (inst.registration === 'open' || inst.registration === 'approval');
    if (!inst.region) inst.region = 'global';
    if (!inst.id) inst.id = inst.domain;
    if (!inst.source) inst.source = 'manual';
    return inst;
  }

  function ensureInstancesLoaded() {
    if (instanceState === 'loaded' || instanceState === 'loading') {
      return instancePromise || Promise.resolve();
    }
    instanceState = 'loading';
    if (instanceMetaEl) instanceMetaEl.textContent = t('instance_loading');
    var manual = (window.FEDIK_INSTANCES_MANUAL || []).map(normalizeManualInstance);
    // CZ/SK ze Sloníka přes symlink (read-only). Bez symlinku → aspoň globální doporučené.
    instancePromise = fetch('data/slonik-instances.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        // Jen skutečné CZ/SK instance (czsk:true). Sloník vede i zahraniční servery
        // (czsk:false) kvůli pokrytí účtů — ty do „kde se registruješ" nepatří
        // a kryjí se s globálním seznamem.
        var raw = (d && d.instances) ? d.instances.filter(function (r) { return r.czsk; }) : [];
        var slonik = raw.map(adaptSlonikInstance);
        var have = {}; slonik.forEach(function (i) { have[i.id] = 1; });
        instanceList = slonik.concat(manual.filter(function (m) { return !have[m.id]; }));
        instanceState = 'loaded';
      })
      .catch(function () { instanceList = manual; instanceState = 'loaded'; });
    return instancePromise;
  }

  function instanceAvatar(i) {
    if (i.thumbnail) {
      var img = document.createElement('img');
      img.className = 'inst-logo'; img.src = i.thumbnail; img.alt = ''; img.loading = 'lazy';
      img.onerror = function () {
        var fb = instanceFallback(i); img.replaceWith(fb);
      };
      return img;
    }
    return instanceFallback(i);
  }
  function instanceFallback(i) {
    var s = document.createElement('span');
    s.className = 'inst-logo inst-logo-fb';
    s.textContent = (i.domain || i.host || '?').charAt(0).toUpperCase();
    return s;
  }

  function appName(appId) {
    var a = (window.FEDIK_APPS || []).filter(function (x) { return x.id === appId; })[0];
    return a ? a.name : appId;
  }
  function instRegionLabel(r) {
    return r === 'cz' ? '🇨🇿 ' + t('instance_region_cz')
      : r === 'sk' ? '🇸🇰 ' + t('instance_region_sk')
        : '🌍 ' + t('instance_region_global');
  }
  function instBadge(txt, cls) {
    var s = document.createElement('span'); s.className = 'inst-badge ' + (cls || ''); s.textContent = txt; return s;
  }

  function buildInstanceCard(i) {
    var card = document.createElement('article');
    card.className = 'inst-card';

    var head = document.createElement('div');
    head.className = 'inst-head';
    head.appendChild(instanceAvatar(i));
    var hb = document.createElement('div');
    hb.className = 'inst-headbody';
    var title = document.createElement('div'); title.className = 'inst-title'; title.textContent = i.name || i.domain;
    var host = document.createElement('div'); host.className = 'inst-host'; host.textContent = i.domain;
    hb.appendChild(title); hb.appendChild(host);
    head.appendChild(hb);
    if (i.registration) {
      var reg = document.createElement('span');
      reg.className = 'inst-reg inst-reg-' + i.registration;
      reg.textContent = t('instance_reg_' + i.registration);
      head.appendChild(reg);
    }
    card.appendChild(head);

    // Globální (kurátorské) servery mají descriptionEn; CZ/SK ze Sloníka jen autentický popis.
    var desc = (lang === 'en' && i.descriptionEn) ? i.descriptionEn : i.description;
    if (desc) {
      var d = document.createElement('p'); d.className = 'inst-desc'; d.textContent = desc;
      card.appendChild(d);
    }

    var badges = document.createElement('div'); badges.className = 'inst-badges';
    badges.appendChild(instBadge(appName(i.appId), 'inst-badge-app'));
    (i.focus || []).forEach(function (f) { badges.appendChild(instBadge(t('ifoc_' + f), 'inst-badge-foc')); });
    if (i.beginnerFriendly) badges.appendChild(instBadge('✔ ' + t('instance_beginner'), 'inst-badge-beg'));
    card.appendChild(badges);

    if (i.users != null) {
      var stats = document.createElement('div'); stats.className = 'inst-stats';
      stats.appendChild(instStat(appNum(i.users), t('instance_users')));
      card.appendChild(stats);
    }

    var foot = document.createElement('div');
    foot.className = 'inst-foot';
    var rg = document.createElement('span'); rg.className = 'inst-region'; rg.textContent = instRegionLabel(i.region);
    foot.appendChild(rg);
    var link = document.createElement('a');
    link.target = '_blank'; link.rel = 'noopener'; link.style.marginLeft = 'auto';
    if (i.registration === 'open' || i.registration === 'approval') {
      link.className = 'inst-join';
      link.href = i.signupUrl || ('https://' + i.domain);
      link.textContent = t('instance_join');
    } else {
      link.className = 'inst-open';
      link.href = 'https://' + i.domain;
      link.textContent = '↗ ' + t('instance_open');
    }
    foot.appendChild(link);
    card.appendChild(foot);
    return card;
  }

  function instStat(value, label) {
    var s = document.createElement('span');
    var v = document.createElement('strong'); v.textContent = value;
    s.appendChild(v); s.appendChild(document.createTextNode(' ' + label));
    return s;
  }

  // Filtrace: fasety (region/aplikace/zaměření/registrace/velikost) + fulltext + žebříček.
  function filteredInstances() {
    var tokens = fold(instanceQuery).split(/\s+/).filter(Boolean);
    return instanceList.filter(function (i) {
      if (instanceFacets.region.size && !instanceFacets.region.has(i.region)) return false;
      if (instanceFacets.app.size && !instanceFacets.app.has(i.appId)) return false;
      if (instanceFacets.focus.size && !(i.focus || []).some(function (f) { return instanceFacets.focus.has(f); })) return false;
      if (instanceFacets.reg.size && !instanceFacets.reg.has(i.registration)) return false;
      if (instanceFacets.size.size && !instanceFacets.size.has(instanceSize(i.users))) return false;
      if (instanceTab === 'beginner' && !i.beginnerFriendly) return false;
      if (!tokens.length) return true;
      var f = fold((i.domain || '') + ' ' + (i.name || '') + ' ' + (i.description || ''));
      return tokens.every(function (tok) { return f.indexOf(tok) >= 0; });
    });
  }

  // Fasetové chipy: postaví se z dat (s počty), pevné pořadí kde dává smysl.
  function instCounts(getVals) {
    var c = {}; instanceList.forEach(function (i) { getVals(i).forEach(function (v) { if (v != null) c[v] = (c[v] || 0) + 1; }); }); return c;
  }
  function fillInstChips(containerId, order, set, labelFn, counts) {
    var el = document.getElementById(containerId); if (!el) return; el.innerHTML = '';
    order.filter(function (v) { return counts[v]; }).forEach(function (v) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'filter-chip' + (set.has(v) ? ' active' : '');
      b.textContent = labelFn(v) + ' ' + counts[v];
      b.addEventListener('click', function () {
        if (set.has(v)) set.delete(v); else set.add(v);
        b.classList.toggle('active'); renderInstances(); writeHash();
      });
      el.appendChild(b);
    });
  }
  function buildInstanceFacetChips() {
    fillInstChips('inst-region-chips', INSTANCE_REGION_ORDER, instanceFacets.region,
      function (v) { return t('instance_region_' + v); }, instCounts(function (i) { return [i.region]; }));
    var appC = instCounts(function (i) { return [i.appId]; });
    var appKeys = Object.keys(appC).sort(function (a, b) { return appName(a).localeCompare(appName(b), 'cs'); });
    fillInstChips('inst-app-chips', appKeys, instanceFacets.app, appName, appC);
    fillInstChips('inst-focus-chips', INSTANCE_FOCUS_ORDER, instanceFacets.focus,
      function (v) { return t('ifoc_' + v); }, instCounts(function (i) { return i.focus || []; }));
    fillInstChips('inst-reg-chips', INSTANCE_REG_ORDER, instanceFacets.reg,
      function (v) { return t('instance_reg_' + v); }, instCounts(function (i) { return [i.registration]; }));
    fillInstChips('inst-size-chips', INSTANCE_SIZE_ORDER, instanceFacets.size,
      function (v) { return t('isize_' + v); }, instCounts(function (i) { return [instanceSize(i.users)]; }));
  }

  function renderInstances() {
    if (!instanceResultsEl) return;
    if (instanceState !== 'loaded') {
      if (instanceState === 'error' && instanceMetaEl) instanceMetaEl.textContent = t('instance_unavail');
      return;
    }
    buildInstanceFacetChips();
    instanceResultsEl.innerHTML = '';
    var list = filteredInstances();
    // Řazení: tab má přednost. „Pro začátečníky" ZÁMĚRNĚ neřadí dle velikosti.
    var byUsers = function (a, b) { return (b.users || -1) - (a.users || -1) || a.name.localeCompare(b.name, 'cs'); };
    var byName = function (a, b) { return a.name.localeCompare(b.name, 'cs'); };
    if (instanceTab === 'users') list.sort(byUsers);
    else if (instanceTab === 'beginner') list.sort(byName);
    else if (instanceSort === 'users') list.sort(byUsers);
    else if (instanceSort === 'registration') list.sort(function (a, b) {
      return INSTANCE_REG_ORDER.indexOf(a.registration) - INSTANCE_REG_ORDER.indexOf(b.registration) || byName(a, b);
    });
    else list.sort(byName);
    if (instanceMetaEl) instanceMetaEl.textContent = list.length + ' ' + t('instance_count');
    if (!list.length) {
      var z = document.createElement('p'); z.className = 's-empty'; z.textContent = t('search_zero');
      instanceResultsEl.appendChild(z); return;
    }
    // Sekce: CZ/SK nahoře, globální doporučené níže.
    appendInstanceSection(t('instance_sec_czsk'), list.filter(function (i) { return i.region === 'cz' || i.region === 'sk'; }));
    appendInstanceSection(t('instance_sec_global'), list.filter(function (i) { return i.region === 'global'; }));
  }

  function updateInstanceTabsUI() {
    if (instanceTabsEl) {
      instanceTabsEl.querySelectorAll('.tab[data-itab]').forEach(function (tab) {
        tab.classList.toggle('is-active', tab.getAttribute('data-itab') === instanceTab);
      });
    }
    // Řazení dává smysl jen v „Vše"; v žebříčku pořadí určuje tab.
    if (instanceSortWrapEl) instanceSortWrapEl.hidden = (view !== 'instance') || (instanceTab !== 'all');
  }

  function bindInstanceControls() {
    if (instanceTabsEl) {
      instanceTabsEl.querySelectorAll('.tab[data-itab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
          instanceTab = tab.getAttribute('data-itab');
          updateInstanceTabsUI(); renderInstances(); writeHash();
        });
      });
    }
    if (instanceSearchEl) {
      instanceSearchEl.addEventListener('input', function () {
        instanceQuery = instanceSearchEl.value.trim(); renderInstances();
      });
    }
    if (instanceSortEl) {
      instanceSortEl.addEventListener('change', function () {
        instanceSort = instanceSortEl.value; renderInstances(); writeHash();
      });
    }
  }

  function appendInstanceSection(label, list) {
    if (!list.length) return;
    var h = document.createElement('h2');
    h.className = 's-sec';
    h.textContent = label + ' ';
    var s = document.createElement('span'); s.textContent = list.length; h.appendChild(s);
    instanceResultsEl.appendChild(h);
    var grid = document.createElement('div');
    grid.className = 'cards-grid';
    list.forEach(function (i) { grid.appendChild(buildInstanceCard(i)); });
    instanceResultsEl.appendChild(grid);
  }

  // ========================================================
  // Pohled: Odkazy (kurátorovaný rozcestník z links.js)
  // ========================================================
  // Pohled 7 (Odkazy) — model LinkResource (web/links.js z data/links/links.seed.ts).
  var LINK_TYPE_ORDER = ['navod', 'clanek', 'oficialni', 'video'];   // „nastroj" záměrně chybí
  var LINK_LANG_ORDER = ['cs', 'sk', 'en'];                          // CZ/SK nahoru
  var LINK_THEME_ORDER = ['uvod', 'navody', 'technika', 'komunita', 'data'];
  function linkLangRank(lang) { var i = LINK_LANG_ORDER.indexOf(lang); return i === -1 ? 99 : i; }

  function buildLinkCard(l) {
    var card = document.createElement('article');
    card.className = 'link-card';

    var a = document.createElement('a');
    a.className = 'link-title';
    a.href = l.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.textContent = l.title;
    card.appendChild(a);

    var meta = document.createElement('div');
    meta.className = 'link-meta';
    var lang = document.createElement('span');
    lang.className = 'link-lang link-lang-' + l.language;
    lang.textContent = (l.language || '').toUpperCase();
    meta.appendChild(lang);
    var ty = document.createElement('span'); ty.className = 'link-type'; ty.textContent = t('ltype_' + l.type);
    meta.appendChild(ty);
    card.appendChild(meta);

    if (l.description) {
      var note = document.createElement('p'); note.className = 'link-note'; note.textContent = l.description;
      card.appendChild(note);
    }
    // Atribuce — autor + licence (povinné u CC obsahu, např. Rossini video).
    if (l.author || l.license) {
      var attr = document.createElement('div'); attr.className = 'link-attr';
      attr.textContent = [l.author, l.license].filter(Boolean).join(' · ');
      card.appendChild(attr);
    }
    return card;
  }

  // ========================================================
  // Pohled: Aplikace (Pohled 2) — kurátorský katalog z window.FEDIK_APPS.
  // Editorní data jsou statická; živá čísla (users/instances) volitelně
  // z app-stats.json přes fedidbSlug. Chybějící mapování → „—".
  // ========================================================
  var CZECH_ORDER = ['ano', 'castecne', 'ne', 'unknown'];
  var DEV_ORDER = ['aktivni', 'zraly', 'experimentalni', 'utlumeny', 'unknown'];

  function appsList() {
    return (window.FEDIK_APPS || []).filter(function (a) { return a.include; });
  }
  function appCtLabel(id) {
    var tax = window.FEDIK_TAXONOMY;
    if (tax && tax.contentTypes) {
      for (var i = 0; i < tax.contentTypes.length; i++) {
        var c = tax.contentTypes[i];
        if (c.id === id) return (lang === 'en' && c.labelEn) ? c.labelEn : c.label;
      }
    }
    return id;
  }
  function appNum(n) {
    if (n == null) return '—';
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  function appStatFor(a) {
    return (appStats && a.fedidbSlug && appStats[a.fedidbSlug]) || null;
  }
  // Živá čísla — načti jednou (volitelný soubor; když chybí, jede se s „—").
  function ensureAppStats() {
    if (appStatsState === 'loaded' || appStatsState === 'loading') return appStatsPromise || Promise.resolve();
    appStatsState = 'loading';
    appStatsPromise = fetch('data/app-stats.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.apps) { appStats = d.apps; appStatsDate = d.updatedAt || ''; }
        appStatsState = 'loaded';
      })
      .catch(function () { appStatsState = 'error'; });
    return appStatsPromise;
  }

  // Postaví fasetové chipy z dat (typ obsahu, obdoba, čeština, managed, vývoj).
  // Rebuild při každém renderu → chipy drží jazyk i aktivní stav ze Setů.
  function buildAppsFacetChips() {
    var apps = appsList();
    var tax = window.FEDIK_TAXONOMY;
    var present = {};
    apps.forEach(function (a) { present[a.contentType] = 1; });
    var typeOrder = (tax && tax.contentTypes ? tax.contentTypes.map(function (c) { return c.id; }) : [])
      .filter(function (id) { return present[id]; });
    appsFillChips('apps-type-chips', typeOrder.map(function (id) { return { v: id, label: appCtLabel(id) }; }), appsFacets.type);

    var eqs = {};
    apps.forEach(function (a) { if (a.centralizedEquivalent) eqs[a.centralizedEquivalent] = 1; });
    var eqList = Object.keys(eqs).sort(function (x, y) { return x.localeCompare(y, 'cs'); });
    appsFillChips('apps-equiv-chips', eqList.map(function (v) { return { v: v, label: v }; }), appsFacets.equiv);

    var czP = {}; apps.forEach(function (a) { czP[a.czechUI] = 1; });
    appsFillChips('apps-czech-chips',
      CZECH_ORDER.filter(function (v) { return czP[v]; }).map(function (v) { return { v: v, label: t('czui_' + v) }; }),
      appsFacets.czech);

    appsFillChips('apps-managed-chips',
      [{ v: 'yes', label: t('common_yes') }, { v: 'no', label: t('common_no') }], appsFacets.managed);

    var devP = {}; apps.forEach(function (a) { devP[a.devStatus] = 1; });
    appsFillChips('apps-devstatus-chips',
      DEV_ORDER.filter(function (v) { return devP[v]; }).map(function (v) { return { v: v, label: t('dev_' + v) }; }),
      appsFacets.dev);
  }
  function appsFillChips(containerId, items, set) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    items.forEach(function (it) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'filter-chip'; b.textContent = it.label;
      if (set.has(it.v)) b.classList.add('active');
      b.addEventListener('click', function () {
        if (set.has(it.v)) set.delete(it.v); else set.add(it.v);
        b.classList.toggle('active');
        renderApps(); writeHash();
      });
      el.appendChild(b);
    });
  }

  function buildAppCard(app) {
    var card = document.createElement('article');
    card.className = 'app-card';

    var head = document.createElement('div'); head.className = 'app-card__head';
    if (app.logoUrl) {
      var img = document.createElement('img');
      img.className = 'app-card__logo'; img.src = app.logoUrl; img.alt = '';
      img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
      img.onerror = function () { this.style.display = 'none'; };
      head.appendChild(img);
    }
    var ht = document.createElement('div'); ht.className = 'app-card__headtext';
    var nm = document.createElement('div'); nm.className = 'app-card__name'; nm.textContent = app.name; ht.appendChild(nm);
    var ty = document.createElement('div'); ty.className = 'app-card__type';
    ty.textContent = appCtLabel(app.contentType) + (app.centralizedEquivalent ? ' · ' + t('apps_like') + ' ' + app.centralizedEquivalent : '');
    ht.appendChild(ty); head.appendChild(ht); card.appendChild(head);

    var desc = (lang === 'cs' && app.descriptionCs) ? app.descriptionCs : app.description;
    if (desc) {
      var d = document.createElement('p'); d.className = 'app-card__desc'; d.textContent = desc; card.appendChild(d);
    }

    var badges = document.createElement('div'); badges.className = 'app-card__badges';
    var cz = document.createElement('span');
    cz.className = 'app-badge app-badge--cz-' + app.czechUI;
    cz.textContent = t('apps_czech_label') + ': ' + t('czui_' + app.czechUI);
    badges.appendChild(cz);
    card.appendChild(badges);

    var st = appStatFor(app);
    var stats = document.createElement('div'); stats.className = 'app-card__stats';
    stats.innerHTML =
      '<span><strong>' + (st ? appNum(st.users) : '—') + '</strong> ' + t('apps_users') + '</span>' +
      '<span><strong>' + (st ? appNum(st.instances) : '—') + '</strong> ' + t('apps_instances') + '</span>' +
      ((st && st.growthPct != null && st.growthPct > 0)
        ? '<span class="app-card__growth">▲ ' + st.growthPct + ' %</span>' : '') +
      '<span class="app-card__statnote">' + t('apps_stat_note') + '</span>';
    card.appendChild(stats);

    var sec = document.createElement('div'); sec.className = 'app-card__sec';
    sec.textContent = app.protocol + ' · ' + t('dev_' + app.devStatus) +
      (app.managedHosting ? ' · ' + t('apps_managed_yes') : '');
    card.appendChild(sec);

    var links = document.createElement('div'); links.className = 'app-card__links';
    function lk(url, label, isInternal) {
      if (!url) return;
      var a = document.createElement('a'); a.href = url;
      if (!isInternal) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
      a.textContent = label; links.appendChild(a);
    }
    lk(startLinkUrl(app), t('apps_link_join'), startIsInternal(app));
    lk(app.website, t('apps_link_web'));
    lk(app.sourceCode, t('apps_link_src'));
    card.appendChild(links);

    // Wizard mód (katalog otevřen z průvodce) → tlačítko „Vybrat pro průvodce" vrátí
    // do Začínáme krok 3 s touhle appkou. Jen pro appky, co jsou v taxonomii (mají guided cestu).
    if (appsWizardMode && startTaxApps()[app.id]) {
      var wbtn = document.createElement('button');
      wbtn.type = 'button'; wbtn.className = 'cta-btn app-card__wizard';
      wbtn.setAttribute('data-umami-event', 'onboarding-pick-app-catalog');
      wbtn.textContent = t('start_wizard_pick');
      wbtn.addEventListener('click', function () {
        startPickedApp = startTaxApps()[app.id];
        startPickedLocked = true; startStep = 3; appsWizardMode = false;
        setView('start');
      });
      card.appendChild(wbtn);
    }
    return card;
  }

  function renderApps() {
    var resultsEl = document.getElementById('apps-results');
    if (!resultsEl) return;
    buildAppsFacetChips();
    var data = appsList().filter(function (a) {
      // Wizard mód (procházení z průvodce) → jen guided appky z taxonomie (mají cestu kroku 3–6).
      if (appsWizardMode && !startTaxApps()[a.id]) return false;
      if (appsFacets.type.size && !appsFacets.type.has(a.contentType)) return false;
      if (appsFacets.equiv.size && !appsFacets.equiv.has(a.centralizedEquivalent)) return false;
      if (appsFacets.czech.size && !appsFacets.czech.has(a.czechUI)) return false;
      if (appsFacets.managed.size && !appsFacets.managed.has(a.managedHosting ? 'yes' : 'no')) return false;
      if (appsFacets.dev.size && !appsFacets.dev.has(a.devStatus)) return false;
      // Žebříčky „Nejrychleji rostoucí" / „Nové projekty" ukazují jen záznamy s daty.
      if (appsTab === 'risers') { var g = appStatFor(a); if (!g || g.growthPct == null) return false; }
      if (appsTab === 'new' && a.yearAdded == null) return false;
      return true;
    });
    // Pořadí: žebříček (tab) má přednost; v „Vše" rozhoduje řazení (appsSort).
    var byNum = function (key) {
      return function (a, b) {
        var sa = appStatFor(a), sb = appStatFor(b);
        var va = sa && sa[key] != null ? sa[key] : -1, vb = sb && sb[key] != null ? sb[key] : -1;
        return vb !== va ? vb - va : a.name.localeCompare(b.name, 'cs');
      };
    };
    if (appsTab === 'users') data.sort(byNum('users'));
    else if (appsTab === 'instances') data.sort(byNum('instances'));
    else if (appsTab === 'risers') data.sort(byNum('growthPct'));
    else if (appsTab === 'new') data.sort(function (a, b) {
      return (b.yearAdded - a.yearAdded) || a.name.localeCompare(b.name, 'cs');
    });
    else if (appsSort === 'users') data.sort(byNum('users'));
    else if (appsSort === 'instances') data.sort(byNum('instances'));
    else data.sort(function (a, b) { return a.name.localeCompare(b.name, 'cs'); });
    var metaEl = document.getElementById('apps-meta');
    if (metaEl) {
      metaEl.textContent = data.length + ' ' + t('apps_count') +
        (appStatsDate ? ' · ' + t('apps_updated') + ' ' + appStatsDate : '');
    }
    var emptyEl = document.getElementById('apps-empty');
    resultsEl.innerHTML = '';
    // Banner wizard módu (katalog z průvodce) — sourozenec mřížky, ať ho innerHTML nesmaže.
    var banner = document.getElementById('apps-wizard-banner');
    if (appsWizardMode) {
      if (!banner) {
        banner = document.createElement('p');
        banner.id = 'apps-wizard-banner'; banner.className = 'caveat-box';
        resultsEl.parentNode.insertBefore(banner, resultsEl);
      }
      banner.textContent = t('start_wizard_banner'); banner.hidden = false;
    } else if (banner) { banner.hidden = true; }
    if (!data.length) { if (emptyEl) emptyEl.hidden = false; return; }
    if (emptyEl) emptyEl.hidden = true;
    data.forEach(function (a) { resultsEl.appendChild(buildAppCard(a)); });
  }

  function updateAppsTabsUI() {
    if (!appsTabsEl) return;
    appsTabsEl.querySelectorAll('.tab[data-atab]').forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-atab') === appsTab);
    });
    // Řazení (řadit) má smysl jen v záložce „Vše"; v žebříčku pořadí určuje tab.
    if (appsSortWrapEl) appsSortWrapEl.hidden = (view !== 'aplikace') || (appsTab !== 'all');
  }

  function bindAppsControls() {
    if (appsSortEl) appsSortEl.addEventListener('change', function () {
      appsSort = appsSortEl.value; renderApps(); writeHash();
    });
    if (appsTabsEl) appsTabsEl.querySelectorAll('.tab[data-atab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        appsTab = tab.getAttribute('data-atab');
        updateAppsTabsUI(); renderApps(); writeHash();
      });
    });
  }

  // ========================================================
  // Pohled: Nástroje (Pohled 5)
  // Data: window.FEDIK_TOOLS (web/tools.js) — klienti (communityDB) + ruční seed.
  // Fasety: Kategorie / Platforma / Pro aplikaci / Cena. Žebříčky: Doporučené · Nově přidané.
  // isOwn = decentní štítek „náš projekt", NEovlivňuje řazení (Fedík je neutrální rozcestník).
  // ========================================================
  var TOOLS_CATEGORY_ORDER = ['klient', 'crossposter', 'most', 'objevovani', 'migrace', 'rss', 'analytika'];
  var TOOLS_PLATFORM_ORDER = ['android', 'ios', 'web', 'desktop', 'sluzba'];
  var TOOLS_PRICE_ORDER = ['zdarma', 'freemium', 'placene', 'unknown'];
  var TOOLS_NETWORK_LABELS = { bluesky: 'Bluesky', nostr: 'Nostr', indieweb: 'IndieWeb', atproto: 'AT Protocol', rss: 'RSS' };
  var TOOLS_MONTHS = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8,
    september: 9, october: 10, november: 11, december: 12,
    leden: 1, unor: 2, brezen: 3, duben: 4, kveten: 5, cerven: 6, cervenec: 7,
    srpen: 8, zari: 9, rijen: 10, listopad: 11, prosinec: 12
  };

  function toolsList() { return window.FEDIK_TOOLS || []; }

  // Název cílové aplikace (z Pohledu 2) nebo sítě (mosty) pro forApps.
  function toolAppLabel(id) {
    var apps = window.FEDIK_APPS || [];
    for (var i = 0; i < apps.length; i++) if (apps[i].id === id) return apps[i].name;
    return TOOLS_NETWORK_LABELS[id] || id;
  }

  // addedAt → řadicí klíč (rok*100+měsíc). „April 2022" i prosté „2022"; prázdné → 0.
  function toolsAddedKey(x) {
    var s = fold(x.addedAt || '');
    if (!s) return 0;
    var m = s.match(/([a-z]+)\s+(\d{4})/);
    if (m && TOOLS_MONTHS[m[1]]) return parseInt(m[2], 10) * 100 + TOOLS_MONTHS[m[1]];
    var y = s.match(/(\d{4})/);
    return y ? parseInt(y[1], 10) * 100 : 0;
  }

  function toolsFillChips(containerId, items, set) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    items.forEach(function (it) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'filter-chip'; b.textContent = it.label;
      if (set.has(it.v)) b.classList.add('active');
      b.addEventListener('click', function () {
        if (set.has(it.v)) set.delete(it.v); else set.add(it.v);
        b.classList.toggle('active');
        renderTools(); writeHash();
      });
      el.appendChild(b);
    });
  }

  function buildToolsFacetChips() {
    var data = toolsList();
    // Kategorie — všech 7 (i prázdné Crossposter/Analytika), aby šly zvolit; prázdný výběr → empty stav.
    toolsFillChips('tools-category-chips',
      TOOLS_CATEGORY_ORDER.map(function (v) { return { v: v, label: t('tcat_' + v) }; }),
      toolsFacets.category);
    // Platforma — přítomné hodnoty (vč. „Web/služba" = sluzba).
    toolsFillChips('tools-platform-chips',
      TOOLS_PLATFORM_ORDER.filter(function (v) { return data.some(function (x) { return x.platforms.indexOf(v) !== -1; }); })
        .map(function (v) { return { v: v, label: t('tplat_' + v) }; }),
      toolsFacets.platform);
    // Pro aplikaci — přítomné hodnoty, řazené dle četnosti (nejčastější = mastodon).
    var faCount = {};
    data.forEach(function (x) { (x.forApps || []).forEach(function (fa) { faCount[fa] = (faCount[fa] || 0) + 1; }); });
    var faVals = Object.keys(faCount).sort(function (a, b) {
      return faCount[b] - faCount[a] || toolAppLabel(a).localeCompare(toolAppLabel(b), 'cs');
    });
    toolsFillChips('tools-forapp-chips',
      faVals.map(function (v) { return { v: v, label: toolAppLabel(v) }; }),
      toolsFacets.forApp);
    // Cena — přítomné hodnoty (unknown se zobrazí jako „neuvedeno").
    toolsFillChips('tools-price-chips',
      TOOLS_PRICE_ORDER.filter(function (v) { return data.some(function (x) { return x.price === v; }); })
        .map(function (v) { return { v: v, label: t('tprice_' + v) }; }),
      toolsFacets.price);
  }

  function toolsMatchesFacets(x) {
    if (toolsFacets.category.size && !toolsFacets.category.has(x.category)) return false;
    if (toolsFacets.platform.size && !x.platforms.some(function (p) { return toolsFacets.platform.has(p); })) return false;
    if (toolsFacets.forApp.size && !(x.forApps || []).some(function (f) { return toolsFacets.forApp.has(f); })) return false;
    if (toolsFacets.price.size && !toolsFacets.price.has(x.price)) return false;
    return true;
  }

  function setToolsEmptyMsg() {
    var el = document.getElementById('tools-empty-msg');
    if (!el) return;
    var only = toolsFacets.category.size === 1 ? toolsFacets.category.values().next().value : null;
    if (only === 'crossposter') el.textContent = t('tools_empty_crossposter');
    else if (only === 'analytika') el.textContent = t('tools_empty_analytika');
    else el.textContent = t('tools_empty');
  }

  function renderTools() {
    if (!toolsResultsEl) return;
    buildToolsFacetChips();
    var data = toolsList().filter(toolsMatchesFacets);
    if (toolsTab === 'featured') data = data.filter(function (x) { return !!x.featured; });
    // Řazení: „Nově přidané" = addedAt sestupně (jen záznamy s datem); jinak abecedně.
    // isOwn pořadí NEOVLIVŇUJE (neutrální rozcestník).
    if (toolsTab === 'new') {
      data = data.filter(function (x) { return toolsAddedKey(x) > 0; })
                 .sort(function (a, b) { return toolsAddedKey(b) - toolsAddedKey(a) || a.name.localeCompare(b.name, 'cs'); });
    } else {
      data = data.slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'cs'); });
    }
    if (toolsMetaEl) toolsMetaEl.textContent = data.length + ' ' + t('tools_count');
    toolsResultsEl.innerHTML = '';
    if (!data.length) {
      if (toolsEmptyEl) { setToolsEmptyMsg(); toolsEmptyEl.hidden = false; }
      return;
    }
    if (toolsEmptyEl) toolsEmptyEl.hidden = true;
    var grid = document.createElement('div'); grid.className = 'apps-grid';
    data.forEach(function (x) { grid.appendChild(buildToolCard(x)); });
    toolsResultsEl.appendChild(grid);
  }

  function buildToolCard(x) {
    var card = document.createElement('article');
    card.className = 'app-card tool-card' + (x.isOwn ? ' tool-card--own' : '');

    var head = document.createElement('div'); head.className = 'app-card__head';
    if (x.logoUrl) {
      var img = document.createElement('img');
      img.className = 'app-card__logo'; img.src = x.logoUrl; img.alt = '';
      img.loading = 'lazy'; img.referrerPolicy = 'no-referrer';
      img.onerror = function () { this.style.display = 'none'; };
      head.appendChild(img);
    }
    var ht = document.createElement('div'); ht.className = 'app-card__headtext';
    var nm = document.createElement('div'); nm.className = 'app-card__name'; nm.textContent = x.name; ht.appendChild(nm);
    var ty = document.createElement('div'); ty.className = 'app-card__type'; ty.textContent = t('tcat_' + x.category);
    ht.appendChild(ty); head.appendChild(ht);
    if (x.isOwn) {
      var own = document.createElement('span'); own.className = 'tool-badge tool-badge--own';
      own.textContent = t('tools_own'); head.appendChild(own);
    }
    card.appendChild(head);

    var xdesc = (lang === 'en' ? (x.descriptionEn || x.description) : (x.descriptionCs || x.description));
    if (xdesc) {
      var d = document.createElement('p'); d.className = 'app-card__desc'; d.textContent = xdesc; card.appendChild(d);
    }

    var badges = document.createElement('div'); badges.className = 'app-card__badges';
    (x.platforms || []).forEach(function (p) {
      var b = document.createElement('span'); b.className = 'tool-badge tool-badge--plat'; b.textContent = t('tplat_' + p); badges.appendChild(b);
    });
    var pr = document.createElement('span');
    pr.className = 'tool-badge tool-badge--price tool-badge--price-' + x.price;
    pr.textContent = t('tprice_' + x.price); badges.appendChild(pr);
    if (x.official) { var of = document.createElement('span'); of.className = 'tool-badge tool-badge--official'; of.textContent = t('tools_official'); badges.appendChild(of); }
    if (x.featured) { var fe = document.createElement('span'); fe.className = 'tool-badge tool-badge--featured'; fe.textContent = t('tools_featured'); badges.appendChild(fe); }
    card.appendChild(badges);

    if (x.forApps && x.forApps.length) {
      var fa = document.createElement('div'); fa.className = 'tool-card__for';
      fa.textContent = t('tools_for') + ' ' + x.forApps.map(toolAppLabel).join(', ');
      card.appendChild(fa);
    }

    var links = document.createElement('div'); links.className = 'app-card__links';
    function lk(url, label) {
      if (!url) return;
      var a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = label; links.appendChild(a);
    }
    // Štítek „Otevřít" podle cíle: store appky pojmenuj přímo (App Store / Google Play / F-Droid).
    var openLabel = t('tools_link_open');
    if (/apps\.apple\.com/.test(x.url)) openLabel = t('tools_link_appstore');
    else if (/play\.google\.com/.test(x.url)) openLabel = t('tools_link_googleplay');
    else if (/f-droid\.org/.test(x.url)) openLabel = t('tools_link_fdroid');
    lk(x.url, openLabel);
    lk(x.sourceCode, t('tools_link_src'));
    // Proklik na heslo Slovníčku (Pohled 4) — i jako hash href (fallback / middle-click).
    if (x.seeAlsoGlossary && glossaryById(x.seeAlsoGlossary)) {
      var g = document.createElement('a');
      g.href = '#view=slovnicek&heslo=' + encodeURIComponent(x.seeAlsoGlossary);
      g.className = 'tool-card__glosslink'; g.textContent = t('tools_glossary');
      g.addEventListener('click', function (ev) {
        ev.preventDefault(); setView('slovnicek'); openGlossaryEntry(x.seeAlsoGlossary, true);
      });
      links.appendChild(g);
    }
    if (toolsAddedKey(x) > 0) {
      var ad = document.createElement('div'); ad.className = 'app-card__sec';
      ad.textContent = t('tools_added') + ' ' + x.addedAt; card.appendChild(ad);
    }
    card.appendChild(links);   // odkazy (App Store / Play / Zdroják) až pod „přidáno"
    return card;
  }

  function updateToolsTabsUI() {
    if (!toolsTabsEl) return;
    toolsTabsEl.querySelectorAll('.tab[data-ttab]').forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-ttab') === toolsTab);
    });
  }

  function bindToolsControls() {
    if (!toolsTabsEl) return;
    toolsTabsEl.querySelectorAll('.tab[data-ttab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        toolsTab = tab.getAttribute('data-ttab');
        updateToolsTabsUI(); renderTools(); writeHash();
      });
    });
  }

  // ========================================================
  // Pohled: Statistiky (Pohled 6) — dashboard, ne fasetový katalog.
  // ŽÁDNÝ NOVÝ ZDROJ DAT:
  //   • Přehled + Podle aplikací → appStats (stejná FediDB vrstva jako Pohled 2).
  //   • Růst v čase → web/data/stat-snapshots.json (sdílený StatSnapshot sklad, historie).
  //   • CZ/SK výřez → web/data/czsk-stats.json (agregace CZ/SK instancí Sloníka, Pohled 3).
  // Všechna síťová čísla jsou ORIENTAČNÍ (FediDB crawluje jen část sítě); CZ/SK je DOLNÍ ODHAD.
  // ========================================================
  var STATS_PALETTE = ['#1883FF', '#00A6B7', '#a64dff', '#4f9e34', '#ec3d86', '#d8502f', '#6b7a8f', '#e0a800'];
  var STATS_TOP_APPS = 12;
  var statSnapshots = [];
  var statSnapState = 'idle';     // idle | loading | loaded | error
  var statSnapPromise = null;
  var czskStats = null;
  var czskState = 'idle';
  var czskPromise = null;

  function ensureStatSnapshots() {
    if (statSnapState === 'loaded' || statSnapState === 'loading') return statSnapPromise || Promise.resolve();
    statSnapState = 'loading';
    statSnapPromise = fetch('data/stat-snapshots.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (d) { statSnapshots = Array.isArray(d) ? d : []; statSnapState = 'loaded'; })
      .catch(function () { statSnapState = 'error'; });
    return statSnapPromise;
  }
  function ensureCzsk() {
    if (czskState === 'loaded' || czskState === 'loading') return czskPromise || Promise.resolve();
    czskState = 'loading';
    czskPromise = fetch('data/czsk-stats.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { czskStats = d || null; czskState = 'loaded'; })
      .catch(function () { czskState = 'error'; });
    return czskPromise;
  }

  // Kompaktní formát velkých čísel (orientační dashboard, ne přesná tabulka).
  function statCompact(n) {
    if (n == null) return '—';
    var en = lang === 'en';
    var abs = Math.abs(n);
    if (abs >= 1e9) return (n / 1e9).toFixed(1).replace('.', en ? '.' : ',') + (en ? ' B' : ' mld.');
    if (abs >= 1e6) return (n / 1e6).toFixed(1).replace('.', en ? '.' : ',') + (en ? ' M' : ' mil.');
    if (abs >= 1e4) return Math.round(n / 1e3) + (en ? 'k' : ' tis.');
    return appNum(n);
  }

  // Síťové součty z appStats (stejná vrstva jako Pohled 2 — žádné nové volání).
  function statsNetworkTotals() {
    if (!appStats) return null;
    var t = { users: 0, mau: 0, instances: 0, posts: 0 };
    Object.keys(appStats).forEach(function (slug) {
      var a = appStats[slug] || {};
      t.users += a.users || 0; t.mau += a.mau || 0;
      t.instances += a.instances || 0; t.posts += a.posts || 0;
    });
    return t;
  }

  function statsAppName(slug) {
    var apps = window.FEDIK_APPS || [];
    for (var i = 0; i < apps.length; i++) if (apps[i].fedidbSlug === slug || apps[i].id === slug) return apps[i].name;
    return slug;
  }

  function statCard(value, label) {
    var d = document.createElement('div'); d.className = 'stat-card';
    var v = document.createElement('div'); v.className = 'stat-card__num'; v.textContent = value;
    var l = document.createElement('div'); l.className = 'stat-card__label'; l.textContent = label;
    d.appendChild(v); d.appendChild(l); return d;
  }
  function statNote(text, cls) {
    var p = document.createElement('p'); p.className = 'stat-note' + (cls ? ' ' + cls : ''); p.textContent = text; return p;
  }
  function statHead(text) { var h = document.createElement('h2'); h.className = 's-sec'; h.textContent = text; return h; }

  // ── Záložka: Přehled ──
  function renderStatsOverview() {
    var wrap = document.createElement('div');
    var net = statsNetworkTotals();
    if (!net) {
      wrap.appendChild(statNote(t('stats_loading')));
      return wrap;
    }
    var grid = document.createElement('div'); grid.className = 'stat-cards';
    grid.appendChild(statCard(statCompact(net.users), t('stats_users')));
    grid.appendChild(statCard(statCompact(net.mau), t('stats_mau')));
    grid.appendChild(statCard(statCompact(net.instances), t('stats_servers')));
    grid.appendChild(statCard(statCompact(net.posts), t('stats_posts')));
    wrap.appendChild(grid);
    wrap.appendChild(statNote(t('stats_approx') + (appStatsDate ? ' · ' + t('stats_updated') + ' ' + appStatsDate : ''), 'stat-note--approx'));
    return wrap;
  }

  // ── Záložka: Podle aplikací (žebříček podle uživatelů, HTML sloupce) ──
  function renderStatsApps() {
    var wrap = document.createElement('div');
    if (!appStats) { wrap.appendChild(statNote(t('stats_loading'))); return wrap; }
    var rows = Object.keys(appStats).map(function (slug) {
      return { slug: slug, name: statsAppName(slug), users: appStats[slug].users || 0, instances: appStats[slug].instances || 0 };
    }).filter(function (r) { return r.users > 0; }).sort(function (a, b) { return b.users - a.users; }).slice(0, STATS_TOP_APPS);
    if (!rows.length) { wrap.appendChild(statNote(t('stats_loading'))); return wrap; }
    var max = rows[0].users;
    var chart = document.createElement('div'); chart.className = 'stat-bars';
    rows.forEach(function (r, i) {
      var row = document.createElement('div'); row.className = 'stat-bar';
      var name = document.createElement('span'); name.className = 'stat-bar__name'; name.textContent = r.name;
      var track = document.createElement('span'); track.className = 'stat-bar__track';
      var fill = document.createElement('span'); fill.className = 'stat-bar__fill';
      fill.style.width = Math.max(2, Math.round((r.users / max) * 100)) + '%';
      fill.style.background = STATS_PALETTE[i % STATS_PALETTE.length];
      track.appendChild(fill);
      var val = document.createElement('span'); val.className = 'stat-bar__val';
      val.textContent = statCompact(r.users) + ' · ' + appNum(r.instances) + ' ' + t('apps_instances');
      row.appendChild(name); row.appendChild(track); row.appendChild(val);
      chart.appendChild(row);
    });
    wrap.appendChild(chart);
    wrap.appendChild(statNote(t('stats_approx') + (appStatsDate ? ' · ' + t('stats_updated') + ' ' + appStatsDate : ''), 'stat-note--approx'));
    return wrap;
  }

  // ── SVG spojnicový graf ──
  function svgEl(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
    return el;
  }
  // series: [{ label, color, points: [{t:ms, v:number}] }]
  function svgLineChart(series) {
    var W = 660, H = 260, padL = 52, padR = 16, padT = 16, padB = 28;
    var pts = [];
    series.forEach(function (s) { s.points.forEach(function (p) { pts.push(p); }); });
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'stat-chart', role: 'img' });
    if (!pts.length) return svg;
    var minT = Math.min.apply(null, pts.map(function (p) { return p.t; }));
    var maxT = Math.max.apply(null, pts.map(function (p) { return p.t; }));
    var maxV = Math.max.apply(null, pts.map(function (p) { return p.v; }));
    if (maxV <= 0) maxV = 1;
    var spanT = (maxT - minT) || 1;
    function X(t) { return padL + (spanT ? (t - minT) / spanT : 0.5) * (W - padL - padR); }
    function Y(v) { return padT + (1 - v / maxV) * (H - padT - padB); }
    // gridlines + osy hodnot
    for (var g = 0; g <= 2; g++) {
      var gv = maxV * g / 2, gy = Y(gv);
      svg.appendChild(svgEl('line', { x1: padL, y1: gy, x2: W - padR, y2: gy, class: 'stat-chart__grid' }));
      var tl = svgEl('text', { x: padL - 6, y: gy + 4, class: 'stat-chart__axis', 'text-anchor': 'end' });
      tl.textContent = statCompact(Math.round(gv)); svg.appendChild(tl);
    }
    // datumy (první/poslední)
    function dlabel(ts, x, anchor) {
      var d = new Date(ts);
      var tx = svgEl('text', { x: x, y: H - 8, class: 'stat-chart__axis', 'text-anchor': anchor });
      tx.textContent = d.getDate() + '. ' + (d.getMonth() + 1) + '.'; svg.appendChild(tx);
    }
    dlabel(minT, padL, 'start');
    if (maxT !== minT) dlabel(maxT, W - padR, 'end');
    series.forEach(function (s) {
      var sp = s.points.slice().sort(function (a, b) { return a.t - b.t; });
      if (sp.length >= 2) {
        var d = sp.map(function (p, i) { return (i ? 'L' : 'M') + X(p.t).toFixed(1) + ' ' + Y(p.v).toFixed(1); }).join(' ');
        svg.appendChild(svgEl('path', { d: d, fill: 'none', stroke: s.color, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
      }
      // poslední bod jako tečka (funguje i pro jediný snímek)
      var last = sp[sp.length - 1];
      svg.appendChild(svgEl('circle', { cx: X(last.t), cy: Y(last.v), r: 3.5, fill: s.color }));
    });
    return svg;
  }

  function statsLegend(series) {
    var leg = document.createElement('div'); leg.className = 'stat-legend';
    series.forEach(function (s) {
      var item = document.createElement('span'); item.className = 'stat-legend__item';
      var sw = document.createElement('span'); sw.className = 'stat-legend__swatch'; sw.style.background = s.color;
      item.appendChild(sw); item.appendChild(document.createTextNode(s.label));
      leg.appendChild(item);
    });
    return leg;
  }

  // ── Záložka: Růst v čase ──
  function snapshotsFor(scope, key) {
    var cut = statsPeriod === 'all' ? 0 : Date.now() - parseInt(statsPeriod, 10) * 86400000;
    return statSnapshots.filter(function (s) {
      if (s.scope !== scope) return false;
      if (key != null && s.key !== key) return false;
      var t = Date.parse(s.takenAt);
      return !isNaN(t) && t >= cut;
    }).map(function (s) { return { t: Date.parse(s.takenAt), v: s.users || 0 }; })
      .sort(function (a, b) { return a.t - b.t; });
  }

  function renderStatsGrowth() {
    var wrap = document.createElement('div');
    if (statSnapState === 'error') { wrap.appendChild(statNote(t('stats_snap_unavail'), 'stat-note--approx')); return wrap; }
    var series = [];
    if (statsRegion === 'czsk') {
      series.push({ label: t('stats_region_czsk'), color: STATS_PALETTE[0], points: snapshotsFor('czsk', null) });
    } else {
      // „Celá síť" jen bez vybraných aplikací; jakmile je vybraná řada, skryj ji,
      // ať se app-řady škálují podle sebe (jinak je celek ~12 mil. utopí u dna).
      var hasApps = statsSeries.size > 0;
      if (!hasApps) {
        series.push({ label: t('stats_total'), color: STATS_PALETTE[0], points: snapshotsFor('network', null) });
      }
      var ci = hasApps ? 0 : 1;
      Array.from(statsSeries).forEach(function (slug) {
        series.push({ label: statsAppName(slug), color: STATS_PALETTE[ci % STATS_PALETTE.length], points: snapshotsFor('app', slug) });
        ci++;
      });
    }
    var maxPoints = Math.max.apply(null, series.map(function (s) { return s.points.length; }).concat([0]));
    if (maxPoints === 0) {
      wrap.appendChild(statNote(t('stats_growth_empty'), 'stat-note--approx'));
      return wrap;
    }
    wrap.appendChild(svgLineChart(series));
    wrap.appendChild(statsLegend(series));
    if (maxPoints < 2) {
      // Sparse sklad: 1 snímek → tečka + poctivá poznámka (graf nevypadá rozbitě).
      var only = series[0].points[series[0].points.length - 1];
      var when = only ? new Date(only.t) : null;
      wrap.appendChild(statNote(t('stats_growth_sparse') + (when ? ' (' + when.getDate() + '. ' + (when.getMonth() + 1) + '. ' + when.getFullYear() + ')' : ''), 'stat-note--approx'));
    } else {
      wrap.appendChild(statNote(t('stats_approx'), 'stat-note--approx'));
    }
    return wrap;
  }

  // ── Záložka: CZ/SK výřez ──
  function renderStatsCzsk() {
    var wrap = document.createElement('div');
    if (!czskStats) {
      wrap.appendChild(statNote(czskState === 'error' ? t('stats_czsk_unavail') : t('stats_loading')));
      return wrap;
    }
    var grid = document.createElement('div'); grid.className = 'stat-cards';
    grid.appendChild(statCard(statCompact(czskStats.users), t('stats_users')));
    grid.appendChild(statCard(statCompact(czskStats.activeUsers), t('stats_mau')));
    grid.appendChild(statCard(statCompact(czskStats.instances), t('stats_czsk_instances')));
    grid.appendChild(statCard(statCompact(czskStats.posts), t('stats_posts')));
    wrap.appendChild(grid);
    // VÝHRADA o dolním odhadu — povinná, výrazná.
    var caveat = document.createElement('p'); caveat.className = 'stat-caveat';
    caveat.textContent = '⚠︎ ' + (czskStats.caveat || t('stats_czsk_caveat'));
    wrap.appendChild(caveat);
    wrap.appendChild(statNote((czskStats.method || '') + (czskStats.updatedAt ? ' · ' + t('stats_updated') + ' ' + czskStats.updatedAt : ''), 'stat-note--approx'));
    // Růst v čase patří do samostatné záložky „Růst v čase" (renderStatsGrowth má CZ/SK sérii) — sem ne.
    return wrap;
  }

  function updateStatsControlsVis() {
    var growth = statsTab === 'growth';
    document.querySelectorAll('.filter-group-stats').forEach(function (el) { el.hidden = !(view === 'statistiky') || !growth; });
  }

  function renderStats() {
    if (!statsResultsEl) return;
    updateStatsTabsUI();
    updateStatsControlsVis();
    buildStatsControls();
    statsResultsEl.innerHTML = '';
    var content;
    if (statsTab === 'apps') content = renderStatsApps();
    else if (statsTab === 'growth') content = renderStatsGrowth();
    else if (statsTab === 'czsk') content = renderStatsCzsk();
    else content = renderStatsOverview();
    statsResultsEl.appendChild(content);
  }

  function updateStatsTabsUI() {
    if (!statsTabsEl) return;
    statsTabsEl.querySelectorAll('.tab[data-sttab]').forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-sttab') === statsTab);
    });
  }

  // Ovládací dimenze růstu: Období · Region · Aplikace (řady). Single/multi-select chipy.
  function statsChip(label, active, onClick) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'filter-chip' + (active ? ' active' : ''); b.textContent = label;
    b.addEventListener('click', onClick);
    return b;
  }
  function buildStatsControls() {
    var per = document.getElementById('stats-period-chips');
    if (per) {
      per.innerHTML = '';
      [['365', t('stats_period_1y')], ['730', t('stats_period_2y')], ['all', t('stats_period_all')]].forEach(function (o) {
        per.appendChild(statsChip(o[1], statsPeriod === o[0], function () { statsPeriod = o[0]; renderStats(); writeHash(); }));
      });
    }
    var reg = document.getElementById('stats-region-chips');
    if (reg) {
      reg.innerHTML = '';
      [['global', t('stats_region_global')], ['czsk', t('stats_region_czsk')]].forEach(function (o) {
        reg.appendChild(statsChip(o[1], statsRegion === o[0], function () { statsRegion = o[0]; renderStats(); writeHash(); }));
      });
    }
    var ser = document.getElementById('stats-series-chips');
    if (ser) {
      ser.innerHTML = '';
      var top = (appStats ? Object.keys(appStats).map(function (slug) {
        return { slug: slug, users: appStats[slug].users || 0 };
      }).filter(function (r) { return r.users > 0; }).sort(function (a, b) { return b.users - a.users; }).slice(0, 8) : []);
      ser.parentElement.hidden = statsRegion !== 'global';
      top.forEach(function (r) {
        ser.appendChild(statsChip(statsAppName(r.slug), statsSeries.has(r.slug), function () {
          if (statsSeries.has(r.slug)) statsSeries.delete(r.slug); else statsSeries.add(r.slug);
          renderStats(); writeHash();
        }));
      });
    }
  }

  function bindStatsControls() {
    if (!statsTabsEl) return;
    statsTabsEl.querySelectorAll('.tab[data-sttab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        statsTab = tab.getAttribute('data-sttab');
        // Lazy: snímky až pro Růst, czsk až pro CZ/SK výřez.
        if (statsTab === 'growth') ensureStatSnapshots().then(renderStats);
        if (statsTab === 'czsk') { ensureStatSnapshots(); ensureCzsk().then(renderStats); }
        renderStats(); writeHash();
      });
    });
  }

  // ========================================================
  // Pohled: Slovníček / Jak to funguje (Pohled 4)
  // Data: window.FEDIK_GLOSSARY (web/glossary.js z data/glossary/glossary.seed.ts).
  // `id` (slug) = stabilní kontrakt pro hloubkové odkazy z Pohledů 1–3 i vyhledávání.
  // Faseta Téma je vícehodnotová; „pro začátečníky" (order) je nezávislé na Úrovni (level).
  // ========================================================
  var GLOSS_THEME_ORDER = ['ucty', 'federace', 'obsah', 'moderovani', 'soukromi', 'technika'];
  var GLOSS_LEVEL_ORDER = ['zakladni', 'pokrocile'];
  var GLOSS_TYPE_ORDER = ['pojem', 'postup', 'zkratka'];

  function glossaryList() { return window.FEDIK_GLOSSARY || []; }

  var glossaryByIdCache = null;
  function glossaryById(slug) {
    if (!glossaryByIdCache) {
      glossaryByIdCache = {};
      glossaryList().forEach(function (e) { glossaryByIdCache[e.id] = e; });
    }
    return glossaryByIdCache[slug] || null;
  }

  // Lazy fold index pro vyhledávání: term + aliases + short + body (vše bez diakritiky).
  function ensureGlossaryIndexed() {
    if (glossaryIndexed) return;
    glossaryList().forEach(function (e) {
      e._gfold = fold([e.term, (e.aliases || []).join(' '), e.short, e.body || ''].join(' '));
    });
    glossaryIndexed = true;
  }

  function glossaryFillChips(containerId, items, set) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = '';
    items.forEach(function (it) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'filter-chip'; b.textContent = it.label;
      if (set.has(it.v)) b.classList.add('active');
      b.addEventListener('click', function () {
        if (set.has(it.v)) set.delete(it.v); else set.add(it.v);
        b.classList.toggle('active');
        renderGlossary(); writeHash();
      });
      el.appendChild(b);
    });
  }

  function buildGlossaryFacetChips() {
    var data = glossaryList();
    glossaryFillChips('glossary-level-chips',
      GLOSS_LEVEL_ORDER.filter(function (v) { return data.some(function (e) { return e.level === v; }); })
        .map(function (v) { return { v: v, label: t('glevel_' + v) }; }),
      glossaryFacets.level);
    glossaryFillChips('glossary-theme-chips',
      GLOSS_THEME_ORDER.filter(function (v) { return data.some(function (e) { return e.themes.indexOf(v) !== -1; }); })
        .map(function (v) { return { v: v, label: t('gtheme_' + v) }; }),
      glossaryFacets.theme);
    glossaryFillChips('glossary-type-chips',
      GLOSS_TYPE_ORDER.filter(function (v) { return data.some(function (e) { return e.type === v; }); })
        .map(function (v) { return { v: v, label: t('gtype_' + v) }; }),
      glossaryFacets.type);
  }

  function glossaryMatchesFacets(e) {
    if (glossaryFacets.level.size && !glossaryFacets.level.has(e.level)) return false;
    if (glossaryFacets.type.size && !glossaryFacets.type.has(e.type)) return false;
    if (glossaryFacets.theme.size && !e.themes.some(function (th) { return glossaryFacets.theme.has(th); })) return false;
    return true;
  }

  // Řazení: „pro začátečníky" = kurátorský `order` vzestupně, hesla bez order až za nimi.
  function glossaryByOrder(a, b) {
    var ao = a.order == null ? Infinity : a.order, bo = b.order == null ? Infinity : b.order;
    if (ao !== bo) return ao - bo;
    return a.term.localeCompare(b.term, 'cs');
  }
  function glossaryByAlpha(a, b) { return a.term.localeCompare(b.term, 'cs'); }

  function renderGlossary() {
    if (!glossaryResultsEl) return;
    buildGlossaryFacetChips();
    var data = glossaryList().filter(glossaryMatchesFacets);
    if (glossaryMetaEl) glossaryMetaEl.textContent = data.length + ' ' + t('gloss_count');
    glossaryResultsEl.innerHTML = '';
    if (!data.length) { if (glossaryEmptyEl) glossaryEmptyEl.hidden = false; return; }
    if (glossaryEmptyEl) glossaryEmptyEl.hidden = true;

    if (glossarySort === 'theme') {
      // Tematicky: sekce v pevném pořadí; heslo s víc tématy se objeví v každém.
      GLOSS_THEME_ORDER.forEach(function (th) {
        if (glossaryFacets.theme.size && !glossaryFacets.theme.has(th)) return;
        var list = data.filter(function (e) { return e.themes.indexOf(th) !== -1; }).sort(glossaryByOrder);
        if (!list.length) return;
        var h = document.createElement('h2'); h.className = 's-sec';
        h.textContent = t('gtheme_' + th) + ' ';
        var s = document.createElement('span'); s.textContent = list.length; h.appendChild(s);
        glossaryResultsEl.appendChild(h);
        var grid = document.createElement('div'); grid.className = 'cards-grid glossary-grid';
        list.forEach(function (e) { grid.appendChild(buildGlossaryCard(e)); });
        glossaryResultsEl.appendChild(grid);
      });
      return;
    }
    data.sort(glossarySort === 'alpha' ? glossaryByAlpha : glossaryByOrder);
    var grid = document.createElement('div'); grid.className = 'cards-grid glossary-grid';
    data.forEach(function (e) { grid.appendChild(buildGlossaryCard(e)); });
    glossaryResultsEl.appendChild(grid);
  }

  function buildGlossaryBadges(e) {
    var badges = document.createElement('div'); badges.className = 'gloss-card__badges';
    var bt = document.createElement('span'); bt.className = 'gloss-badge gloss-badge--type gloss-badge--' + e.type;
    bt.textContent = t('gtype_' + e.type); badges.appendChild(bt);
    var bl = document.createElement('span'); bl.className = 'gloss-badge gloss-badge--level gloss-badge--' + e.level;
    bl.textContent = t('glevel_' + e.level); badges.appendChild(bl);
    if (e.order != null) {
      var bo = document.createElement('span'); bo.className = 'gloss-badge gloss-badge--order';
      bo.textContent = '#' + e.order; bo.title = t('gsort_order'); badges.appendChild(bo);
    }
    return badges;
  }

  function buildGlossaryCard(e) {
    var card = document.createElement('article');
    card.className = 'gloss-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('data-slug', e.id);
    card.setAttribute('aria-label', e.term);

    var nm = document.createElement('h3'); nm.className = 'gloss-card__term'; nm.textContent = e.term;
    card.appendChild(nm);
    card.appendChild(buildGlossaryBadges(e));
    var sh = document.createElement('p'); sh.className = 'gloss-card__short'; sh.textContent = e.short;
    card.appendChild(sh);

    var open = function () { openGlossaryEntry(e.id, true); };
    card.addEventListener('click', open);
    card.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); }
    });
    return card;
  }

  // Detail hesla v modálu (sdílí <dialog id="detail-modal"> s kartami účtů).
  function openGlossaryEntry(slug, intoHash) {
    var e = glossaryById(slug);
    if (!e || !modalEl) return;
    modalEl.innerHTML = '';
    modalEl.appendChild(buildGlossaryModal(e));
    if (typeof modalEl.showModal === 'function') {
      modalEl.showModal();
    } else {
      modalEl.setAttribute('open', '');
      modalEl.classList.add('modal-fallback-open');
    }
    // Slug drž v URL jen ve Slovníčku (stabilní deep-link). Z Vyhledávání jen otevři.
    if (intoHash && view === 'slovnicek') { glossaryOpenSlug = e.id; writeHash(); }
  }

  function buildGlossaryModal(e) {
    var wrap = document.createElement('div');
    wrap.className = 'modal-inner gloss-modal';

    var close = document.createElement('button');
    close.className = 'modal-close';
    close.setAttribute('aria-label', t('modal_close'));
    close.textContent = '×';
    close.addEventListener('click', closeModal);
    wrap.appendChild(close);

    var term = document.createElement('h2'); term.className = 'gloss-modal__term'; term.textContent = e.term;
    wrap.appendChild(term);
    wrap.appendChild(buildGlossaryBadges(e));

    var sh = document.createElement('p'); sh.className = 'gloss-modal__short'; sh.textContent = e.short;
    wrap.appendChild(sh);
    if (e.body) { var bd = document.createElement('p'); bd.className = 'gloss-modal__body'; bd.textContent = e.body; wrap.appendChild(bd); }

    if (e.type === 'postup') {
      var sub = document.createElement('h3'); sub.className = 'gloss-modal__subhead'; sub.textContent = t('gloss_steps'); wrap.appendChild(sub);
      var hasImages = false;
      if (e.steps && e.steps.length) {
        var ol = document.createElement('ol'); ol.className = 'gloss-steps';
        e.steps.forEach(function (st) {
          var li = document.createElement('li');
          var txt = document.createElement('span'); txt.className = 'gloss-step__text'; txt.textContent = st.text; li.appendChild(txt);
          if (st.image) {
            hasImages = true;
            var im = document.createElement('img');
            im.className = 'gloss-step__img'; im.src = st.image; im.alt = ''; im.loading = 'lazy';
            im.onerror = function () { this.style.display = 'none'; };
            li.appendChild(im);
          }
          ol.appendChild(li);
        });
        wrap.appendChild(ol);
      }
      if (!hasImages) {   // screenshoty se doplňují průběžně — podstata je v body/krocích
        var note = document.createElement('p'); note.className = 'gloss-modal__note'; note.textContent = t('gloss_no_steps');
        wrap.appendChild(note);
      }
    }

    if (e.externalUrl) {
      var ext = document.createElement('a');
      ext.className = 'gloss-modal__ext'; ext.href = e.externalUrl; ext.target = '_blank'; ext.rel = 'noopener noreferrer';
      ext.textContent = t('gloss_external'); wrap.appendChild(ext);
    }

    var rel = (e.seeAlso || []).map(glossaryById).filter(Boolean);
    if (rel.length) {
      var rh = document.createElement('h3'); rh.className = 'gloss-modal__subhead'; rh.textContent = t('gloss_seealso'); wrap.appendChild(rh);
      var links = document.createElement('div'); links.className = 'gloss-seealso';
      rel.forEach(function (r) {
        var a = document.createElement('button');
        a.type = 'button'; a.className = 'gloss-seealso__link'; a.textContent = r.term;
        a.addEventListener('click', function () { openGlossaryEntry(r.id, true); });
        links.appendChild(a);
      });
      wrap.appendChild(links);
    }
    return wrap;
  }

  // Ranked hesla pro Vyhledávání: krátký dotaz (≤2 znaky) = shoda na term/alias;
  // jinak tokeny přes `_gfold` (term+aliases+short+body), AND jako zbytek webu.
  function glossarySearchHits(rawQuery) {
    ensureGlossaryIndexed();
    var qfold = fold(rawQuery);
    if (!qfold) return [];
    var list = glossaryList();
    if (qfold.length <= 2 && qfold.indexOf(' ') === -1) {
      return list.filter(function (e) {
        if (fold(e.term).indexOf(qfold) !== -1) return true;
        return (e.aliases || []).some(function (al) { return fold(al).indexOf(qfold) !== -1; });
      }).map(function (e) { return { x: e, m: 2 }; });
    }
    return searchRank(list, parseQueryTokens(rawQuery), '_gfold');
  }

  var SEARCH_MAX_GLOSS = 24;
  // Sekce „Hesla" ve výsledcích Vyhledávání — karta proklikne na detail hesla (slug).
  function appendGlossarySearchResults(gHits) {
    if (!gHits.length) return;
    searchResultsEl.appendChild(searchSection(t('search_sec_glossary'), gHits.length));
    var grid = document.createElement('div');
    grid.className = 'cards-grid glossary-grid';
    gHits.slice(0, SEARCH_MAX_GLOSS).forEach(function (h) { grid.appendChild(buildGlossaryCard(h.x)); });
    searchResultsEl.appendChild(grid);
  }

  function maybeOpenPendingGlossary() {
    if (!pendingGlossarySlug) return;
    var slug = pendingGlossarySlug; pendingGlossarySlug = '';
    glossaryOpenSlug = slug;
    openGlossaryEntry(slug, false);
  }

  function bindGlossaryControls() {
    if (glossarySortEl) glossarySortEl.addEventListener('change', function () {
      glossarySort = glossarySortEl.value; renderGlossary(); writeHash();
    });
  }

  function linksSortFn(a, b) {
    if (linksSort === 'alpha') return a.title.localeCompare(b.title, 'cs');
    if (linksSort === 'lang') {
      return (linkLangRank(a.language) - linkLangRank(b.language)) || a.title.localeCompare(b.title, 'cs');
    }
    return 0;   // 'recommended' = kurátorské pořadí seedu (stabilní)
  }

  function renderLinks() {
    if (!linksResultsEl) return;
    var data = (window.FEDIK_LINKS || []).filter(function (l) {
      if (linkTypes.size && !linkTypes.has(l.type)) return false;
      if (linkLangs.size && !linkLangs.has(l.language)) return false;
      if (linkThemes.size && !l.themes.some(function (th) { return linkThemes.has(th); })) return false;
      return true;
    });
    if (linksSort !== 'recommended') data = data.slice().sort(linksSortFn);
    if (linksMetaEl) linksMetaEl.textContent = data.length + ' ' + t('links_count');
    linksResultsEl.innerHTML = '';
    if (!data.length) {
      var z = document.createElement('p'); z.className = 's-empty'; z.textContent = t('links_zero');
      linksResultsEl.appendChild(z);
      return;
    }
    var grid = document.createElement('div'); grid.className = 'cards-grid';
    data.forEach(function (l) { grid.appendChild(buildLinkCard(l)); });
    linksResultsEl.appendChild(grid);
  }

  // ========================================================
  // Pohled: Začínáme — Blok 3 (matice) + Blok 4 (průvodce).
  // Oba čtou z JEDNOHO zdroje: window.FEDIK_TAXONOMY (taxonomy.js).
  // ========================================================
  // Cílová URL je VŽDY z dat. Až vzniknou Pohledy 2/3, stačí doplnit
  // app.internalUrl v taxonomy.js — tahle funkce přepne odkaz dovnitř.
  function startLinkUrl(app) { return app.internalUrl || app.joinUrl; }
  function startIsInternal(app) { return !!app.internalUrl; }
  function ctLabel(ct) { return (lang === 'en' && ct.labelEn) ? ct.labelEn : ct.label; }
  function urlHost(u) { return (u || '').replace(/^https?:\/\//, '').replace(/\/$/, ''); }

  function renderStart() {
    loadStartVideo();
    buildStartPicker();
    // Karty na úvodu sdílí komponentu s Pohledem 2 → dotáhni i živá čísla (jednou).
    if (appStatsState === 'idle') ensureAppStats().then(renderStartPickerResults);
  }

  // Lazy-load úvodního videa: src nastavíme až když je pohled viditelný a má
  // spočítanou šířku. PeerTube player nastartovaný při width=0 hlásí „Invalid
  // width". rAF počká na layout po odkrytí sekce.
  function loadStartVideo() {
    var el = document.getElementById('intro-video');
    if (!el || el.getAttribute('src') || !el.getAttribute('data-src')) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        if (el.getAttribute('src')) return;
        if (el.clientWidth < 1) return;   // ještě neviditelné — zkusíme při příštím renderStart
        el.setAttribute('src', el.getAttribute('data-src'));
      });
    });
  }

  // Blok 3+4 — jeden select nad taxonomií. Dvě skupiny:
  //   „Přicházím z…" = odvozeno z apps[].centralizedEquivalent (pořadí dle contentTypes),
  //   „Chci dělat…"  = contentTypes s neprázdným apps.
  // Volba → App.id[] → plný záznam z apps.js (Pohled 2) → reálná karta (buildAppCard).
  var startPickerMap = {};   // key → { label, appIds, contentTypes }

  function startTaxApps() { return (window.FEDIK_TAXONOMY && window.FEDIK_TAXONOMY.apps) || {}; }
  function startContentTypes() { return (window.FEDIK_TAXONOMY && window.FEDIK_TAXONOMY.contentTypes) || []; }

  // „Chci dělat…": typy obsahu s aplikacemi.
  function startDoOptions() {
    return startContentTypes().filter(function (ct) { return ct.apps && ct.apps.length; })
      .map(function (ct) { return { key: 'do:' + ct.id, label: ctLabel(ct), appIds: ct.apps.slice() }; });
  }
  // „Přicházím z…": distinktní centralizedEquivalent v pořadí contentTypes (Reddit → víc aplikací).
  function startFromOptions() {
    var apps = startTaxApps(), order = [], byEq = {};
    startContentTypes().forEach(function (ct) {
      (ct.apps || []).forEach(function (id) {
        var a = apps[id]; if (!a) return;
        var eq = a.centralizedEquivalent || '';
        if (!byEq[eq]) { byEq[eq] = []; order.push(eq); }
        byEq[eq].push(id);
      });
    });
    return order.map(function (eq, i) { return { key: 'from:' + i, label: eq, appIds: byEq[eq] }; });
  }

  function buildStartPicker() {
    var sel = document.getElementById('start-picker');
    if (!sel) return;
    var prev = sel.value;
    startPickerMap = {};
    sel.innerHTML = '';
    var ph = document.createElement('option');
    ph.value = ''; ph.textContent = t('start_picker_placeholder');
    sel.appendChild(ph);
    [{ label: t('start_picker_group_from'), opts: startFromOptions() },
     { label: t('start_picker_group_do'), opts: startDoOptions() }].forEach(function (g) {
      if (!g.opts.length) return;
      var og = document.createElement('optgroup'); og.label = g.label;
      g.opts.forEach(function (o) {
        startPickerMap[o.key] = o;
        var op = document.createElement('option'); op.value = o.key; op.textContent = o.label;
        og.appendChild(op);
      });
      sel.appendChild(og);
    });
    sel.value = (prev && startPickerMap[prev]) ? prev : '';   // přežij relabel při změně jazyka
    renderStartPickerResults();
  }

  // Volba → reálné karty z apps.js (Pohled 2), inline pod selectem.
  function renderStartPickerResults() {
    var sel = document.getElementById('start-picker');
    var results = document.getElementById('start-picker-results');
    if (!sel || !results) return;
    var hint = document.getElementById('start-picker-hint');
    var catalog = document.getElementById('start-picker-catalog');
    var nextBox = document.getElementById('start-picker-next');
    results.innerHTML = '';
    var opt = startPickerMap[sel.value];
    if (!opt) {   // prázdný stav před výběrem
      if (hint) hint.hidden = false;
      if (nextBox) nextBox.hidden = true;
      return;
    }
    if (hint) hint.hidden = true;
    var byId = {};
    (window.FEDIK_APPS || []).forEach(function (a) { byId[a.id] = a; });
    var recs = opt.appIds.map(function (id) { return byId[id]; }).filter(Boolean);
    // Nadpis nad doporučením podle typu volby (Přicházím z… / Chci dělat…).
    if (recs.length) {
      var head = document.createElement('p');
      head.className = 'start-rec-head';                         // grid-column 1/-1 → přes celou šířku
      var key = opt.key.indexOf('from:') === 0 ? 'start_rec_from' : 'start_rec_do';
      head.textContent = t(key).replace('%s', opt.label);
      results.appendChild(head);
    }
    // Každá doporučená appka = vlastní karta s tlačítkem „Vybrat" → vybere TUHLE appku
    // (ne vždy první) a posune na krok 3. Řeší výběr u typů s víc aplikacemi (fórum, blog…).
    recs.forEach(function (rec) {
      var card = buildAppCard(rec);
      var pick = document.createElement('button');
      pick.type = 'button'; pick.className = 'cta-btn start-pick-app';
      pick.setAttribute('data-umami-event', 'onboarding-pick-app');
      pick.textContent = t('start_pick_app');
      pick.addEventListener('click', function () {
        startPickedApp = startTaxApps()[rec.id] || startPickedApp;
        startPickerChosenId = rec.id;   // ať „Další krok"/re-render odpovídá vybrané kartě
        startPickedLocked = true;       // showStartStep(3) nepřepíše na první doporučenou
        showStartStep(3);
      });
      card.appendChild(pick);
      results.appendChild(card);
    });
    if (catalog) {
      var cts = {};
      recs.forEach(function (r) { if (r.contentType) cts[r.contentType] = 1; });
      catalog._cts = Object.keys(cts);
    }
    if (nextBox) nextBox.hidden = !recs.length;
  }

  function bindStartPicker() {
    var sel = document.getElementById('start-picker');
    if (sel) sel.addEventListener('change', function () { startPickerChosenId = ''; renderStartPickerResults(); });
    var catalog = document.getElementById('start-picker-catalog');
    if (catalog) catalog.addEventListener('click', function (e) {
      e.preventDefault();
      // Procházení v rámci průvodce: BEZ předfiltru na typ → ukáže všechny guided appky
      // napříč typy (renderApps je ve wizard módu omezí na taxonomii). Řadit podle jména.
      appsFacets.type.clear(); appsFacets.equiv.clear(); appsFacets.czech.clear();
      appsFacets.managed.clear(); appsFacets.dev.clear();
      appsTab = 'all'; appsSort = 'name';
      appsWizardMode = true;   // katalog otevřen z průvodce → karty dostanou „Vybrat pro průvodce"
      setView('aplikace');
    });
  }

  function bindLinksControls() {
    document.querySelectorAll('#links-type-group button[data-ltype]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-ltype');
        if (linkTypes.has(v)) linkTypes.delete(v); else linkTypes.add(v);
        btn.classList.toggle('active');
        renderLinks(); writeHash();
      });
    });
    document.querySelectorAll('#links-lang-group button[data-llang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-llang');
        if (linkLangs.has(v)) linkLangs.delete(v); else linkLangs.add(v);
        btn.classList.toggle('active');
        renderLinks(); writeHash();
      });
    });
    document.querySelectorAll('#links-theme-group button[data-ltheme]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var v = btn.getAttribute('data-ltheme');
        if (linkThemes.has(v)) linkThemes.delete(v); else linkThemes.add(v);
        btn.classList.toggle('active');
        renderLinks(); writeHash();
      });
    });
    if (linksSortEl) linksSortEl.addEventListener('change', function () {
      linksSort = linksSortEl.value; renderLinks(); writeHash();
    });
  }

  function updatePostsTabsUI() {
    if (!postsTabsEl) return;
    postsTabsEl.querySelectorAll('.tab[data-ptab]').forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-ptab') === postsTab);
    });
  }

  function updateViewSwitchUI() {
    document.querySelectorAll('[data-view]').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-view') === view);
    });
  }

  // Nadpis filtru Oblast: u Postů/Vyhledávání je téma dle ÚČTU (ne postu) → upřesnit.
  function updateFamilyHeading() {
    var h = document.querySelector('.filter-group[data-filter="family"] h2');
    if (!h) return;
    h.textContent = (view === 'posty' || view === 'search') ? t('head_topic_byaccount') : t('head_topic');
  }

  function bindPostsControls() {
    if (postsSortEl) {
      postsSortEl.addEventListener('change', function () {
        postsSort = postsSortEl.value;
        renderPosts();
        writeHash();
      });
    }
    if (postsTabsEl) {
      postsTabsEl.querySelectorAll('.tab[data-ptab]').forEach(function (tab) {
        tab.addEventListener('click', function () {
          postsTab = tab.getAttribute('data-ptab');
          updatePostsTabsUI();
          renderPosts();
          writeHash();
        });
      });
    }
  }

  // Pohled Posty je ve Fedíku zrušený — funkce zůstává jako no-op (mrtvý kód).
  function ensurePostsLoaded() {
    return;   // posts.json už neexistuje; pohled Posty není v navigaci ani v hashi
    /* eslint-disable no-unreachable */
    if (postsLoadState === 'loaded' || postsLoadState === 'loading') return;
    postsLoadState = 'loading';
    postsLoadingEl.hidden = false;
    postsUnavailableEl.hidden = true;
    postsEmptyEl.hidden = true;
    fetch('posts.json', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        postsData = data;
        postsLoadState = 'loaded';
        postsLoadingEl.hidden = true;
        renderPosts();
      })
      .catch(function (err) {
        postsLoadState = 'error';
        postsLoadingEl.hidden = true;
        // posts.json vzniká vždy v pondělí v 03:00 — chybějící soubor = fallback hláška.
        if (view === 'posty') {
          postsGridEl.innerHTML = '';
          postsUnavailableEl.hidden = false;
        }
        console.warn('posts.json load failed:', err);
      });
  }

  // Sekce posts.json → klíč podle aktuálního řazení (žebříčky).
  var POSTS_SECTION = {
    engagement: 'top_by_engagement', reblogs: 'top_by_reblogs',
    favourites: 'top_by_favourites', date: 'top_by_date', date_asc: 'top_by_date'
  };

  function isRiserTab() {
    return postsTab === 'risers_ratio' || postsTab === 'risers_abs';
  }

  // Aktivní režim Skokanů podle pohledu (Posty i Vyhledávání sdílí buildPostCard).
  function activeRiserMode() {
    var tab = (view === 'search') ? searchTab : (view === 'posty') ? postsTab : null;
    return tab === 'risers_ratio' ? 'ratio' : tab === 'risers_abs' ? 'abs' : null;
  }

  // Vrátí výchozí pole postů podle aktuálního řezu/řazení (před filtry).
  function postsBaseList() {
    if (isRiserTab()) {
      var key = (postsTab === 'risers_ratio') ? 'risers_ratio' : 'risers_absolute';
      var arr = postsData[key] || postsData.risers || []; // fallback na starý klíč
      return arr.slice();
    }
    var section = POSTS_SECTION[postsSort] || 'top_by_engagement';
    var arr2 = (postsData[section] || []).slice();
    if (postsSort === 'date_asc') arr2.reverse(); // top_by_date je sestupně → otoč
    var limit = (postsTab === '10') ? 10 : (postsTab === '50') ? 50 : Infinity;
    return arr2.slice(0, limit);
  }

  function renderPosts() {
    if (view !== 'posty') return;
    if (postsLoadState === 'loading') { postsLoadingEl.hidden = false; return; }
    if (postsLoadState !== 'loaded' || !postsData) {
      if (postsLoadState === 'error') postsUnavailableEl.hidden = false;
      return;
    }
    postsLoadingEl.hidden = true;
    postsUnavailableEl.hidden = true;
    // V režimu Skokani je řazení dané metrikou → schovej výběr řazení.
    if (postsSortWrapEl) postsSortWrapEl.hidden = isRiserTab();

    var base = postsBaseList();

    // `base` = sekce + Top N. Hashtag chips počítáme z postů, které projdou
    // rodinou + fulltextem (ale BEZ hashtag filtru), ať nabídka zůstane stabilní.
    var beforeHashtag = base.filter(function (p) { return postMatchesFilters(p, true); });
    renderPostHashtagUI(beforeHashtag);

    // Finální seznam = navíc hashtag filtr.
    var list = beforeHashtag.filter(matchesPostHashtag);

    postsMetaEl.textContent = postsMetaText();

    postsGridEl.innerHTML = '';
    if (list.length === 0) {
      postsEmptyEl.hidden = false;
      return;
    }
    postsEmptyEl.hidden = true;
    var frag = document.createDocumentFragment();
    list.forEach(function (p) { frag.appendChild(buildPostCard(p)); });
    postsGridEl.appendChild(frag);
  }

  // skipHashtag=true → vynechá hashtag filtr (pro výpočet nabídky chips).
  function postMatchesFilters(p, skipHashtag) {
    if (filters.family.size && !filters.family.has(p.account_family)) return false;
    if (searchQuery) {
      var hay = ((p.content_plain || '') + ' ' + (p.account_display_name || '') + ' ' +
                 (p.account_username || '')).toLowerCase();
      if (hay.indexOf(searchQuery) === -1) return false;
    }
    if (!skipHashtag && !matchesPostHashtag(p)) return false;
    return true;
  }

  // AND přes vybrané hashtagy (post musí mít všechny zvolené).
  function matchesPostHashtag(p) {
    if (!postHashtags.size) return true;
    var hs = p.hashtags || [];
    var ok = true;
    postHashtags.forEach(function (h) { if (hs.indexOf(h) === -1) ok = false; });
    return ok;
  }

  var HASHTAG_CHIP_MAX = 30;  // kolik nejčastějších hashtagů nabídnout

  // Vykreslí vybrané hashtagy (nahoře) + nabídku chips (četnost z `posts`).
  function renderPostHashtagUI(posts) {
    if (!postHashtagChipsEl) return;
    var counts = {};
    posts.forEach(function (p) {
      (p.hashtags || []).forEach(function (h) { counts[h] = (counts[h] || 0) + 1; });
    });

    // Vybrané hashtagy (i ty s 0 výskyty v aktuální nabídce zůstanou zrušitelné).
    postHashtagSelectedEl.innerHTML = '';
    postHashtags.forEach(function (h) {
      var chip = document.createElement('button');
      chip.className = 'tag-chip tag-chip-selected';
      chip.appendChild(document.createTextNode('#' + h + ' '));
      var x = document.createElement('span');
      x.className = 'tag-x';
      x.textContent = '×';
      chip.appendChild(x);
      chip.setAttribute('aria-label', 'Odebrat hashtag ' + h);
      chip.addEventListener('click', function () { togglePostHashtag(h); });
      postHashtagSelectedEl.appendChild(chip);
    });

    // Nabídka — nejčastější hashtagy, které ještě nejsou vybrané.
    postHashtagChipsEl.innerHTML = '';
    var entries = Object.keys(counts)
      .filter(function (h) { return !postHashtags.has(h); })
      .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); })
      .slice(0, HASHTAG_CHIP_MAX);

    if (entries.length === 0 && postHashtags.size === 0) {
      var empty = document.createElement('p');
      empty.className = 'hashtags-empty';
      empty.textContent = t('hashtags_empty');
      postHashtagChipsEl.appendChild(empty);
      return;
    }
    entries.forEach(function (h) {
      var chip = document.createElement('button');
      chip.className = 'tag-chip';
      chip.appendChild(document.createTextNode('#' + h + ' '));
      var c = document.createElement('span');
      c.className = 'tag-count';
      c.textContent = counts[h];
      chip.appendChild(c);
      chip.addEventListener('click', function () { togglePostHashtag(h); });
      postHashtagChipsEl.appendChild(chip);
    });
  }

  function togglePostHashtag(h) {
    if (postHashtags.has(h)) postHashtags.delete(h); else postHashtags.add(h);
    if (view === 'search') renderSearch(); else renderPosts();
    writeHash();
  }

  function postsMetaText() {
    if (!postsData) return '';
    var wk = formatWeek(postsData.week);
    var cnt = postsData.total_posts != null
      ? (postsData.total_posts + ' ' + t('posts_count')) : '';
    return [wk, cnt].filter(Boolean).join(' · ');
  }

  // "2026-W22" → cs "22. týden 2026", en "week 22, 2026"
  function formatWeek(week) {
    if (!week) return '';
    var m = String(week).match(/^(\d{4})-W(\d{2})$/);
    if (!m) return week;
    var year = m[1], num = parseInt(m[2], 10);
    return lang === 'en' ? ('week ' + num + ', ' + year)
                         : (num + '. ' + t('posts_week') + ' ' + year);
  }

  // ---------- Karta postu ----------
  var POST_TEXT_LIMIT = 280;

  function buildPostCard(p) {
    var card = document.createElement('article');
    card.className = 'post-card';

    // --- Hlavička: avatar + jméno/handle (prolink na profil) + rodina ---
    var head = document.createElement('div');
    head.className = 'post-head';
    var profileUrl = 'https://' + p.account_instance + '/@' + p.account_username;

    var avatarLink = document.createElement('a');
    avatarLink.className = 'post-avatar-link';
    avatarLink.href = profileUrl;
    avatarLink.target = '_blank';
    avatarLink.rel = 'noopener';
    avatarLink.title = t('profile_title');
    avatarLink.appendChild(buildAvatar({ avatar: p.account_avatar }, 'card-avatar'));
    head.appendChild(avatarLink);

    var hbody = document.createElement('div');
    hbody.className = 'post-head-body';
    var author = document.createElement('a');
    author.className = 'post-author';
    author.href = profileUrl;
    author.target = '_blank';
    author.rel = 'noopener';
    author.title = t('profile_title');
    author.textContent = cleanName(p.account_display_name) || p.account_username;
    var handle = document.createElement('div');
    handle.className = 'post-handle';
    handle.textContent = '@' + p.account_username + '@' + p.account_instance;
    hbody.appendChild(author);
    hbody.appendChild(handle);
    head.appendChild(hbody);
    // Oblast (rodina) se na kartě postu nezobrazuje — mátlo to (zůstává jen ve filtru).
    card.appendChild(head);

    // --- Text postu (klikatelné odkazy z content_html; „zobrazit více") ---
    var plain = (p.content_plain || '').trim();
    if (plain === '') {
      var empty = document.createElement('p');
      empty.className = 'post-text is-empty';
      empty.textContent = t('post_media_only');
      card.appendChild(empty);
    } else {
      var text = document.createElement('p');
      text.className = 'post-text';
      // Klikatelný obsah ze sanitizovaného HTML (fallback na plain text).
      if (p.content_html) {
        text.appendChild(sanitizePostHtml(p.content_html));
      } else {
        text.textContent = plain;
      }
      // Dlouhý post → zkrátit přes CSS clamp + tlačítko „zobrazit více".
      if (plain.length > POST_TEXT_LIMIT) {
        text.classList.add('is-clamped');
        var more = document.createElement('button');
        more.type = 'button';
        more.className = 'post-more';
        more.textContent = t('post_more');
        more.addEventListener('click', function () {
          text.classList.remove('is-clamped');
          more.remove();
        });
        card.appendChild(text);
        card.appendChild(more);
      } else {
        card.appendChild(text);
      }
    }

    // --- Příloha (jen badge, ne náhled) ---
    if (p.has_media) {
      var media = document.createElement('span');
      media.className = 'post-media-badge';
      media.textContent = '📷 ' + t('post_media');
      card.appendChild(media);
    }

    // Hashtagy postu jsou klikatelné přímo v textu (sanitizePostHtml) — žádná
    // duplicitní řada chips pod textem. Tagy účtu se na kartě postu nezobrazují
    // (mátlo to uživatele) — zůstávají jen jako filtr v menu.

    // --- Patička: stats + odkaz ---
    var foot = document.createElement('div');
    foot.className = 'post-foot';
    foot.appendChild(postStat('🔁', formatNumber(p.reblogs_count || 0)));
    foot.appendChild(postStat('⭐', formatNumber(p.favourites_count || 0)));
    foot.appendChild(postStat('📅', formatPostDate(p.created_at)));
    // Skokan badge — podle aktivní metriky: poměrem (×N) nebo dosahem (+N).
    var riserMode = activeRiserMode();
    if (riserMode === 'ratio' && p.riser_ratio != null) {
      var riserR = document.createElement('span');
      riserR.className = 'post-riser-badge';
      riserR.textContent = '🚀 ' + t('post_riser') + ' ×' + p.riser_ratio.toFixed(1);
      foot.appendChild(riserR);
    } else if (riserMode === 'abs' && p.riser_score != null) {
      var riserA = document.createElement('span');
      riserA.className = 'post-riser-badge';
      riserA.textContent = '🚀 ' + t('post_riser') + ' +' + Math.round(p.riser_score);
      foot.appendChild(riserA);
    }
    if (p.url) {
      var open = document.createElement('a');
      open.className = 'post-open';
      open.href = p.url;
      open.target = '_blank';
      open.rel = 'noopener';
      open.textContent = '↗ ' + t('post_open');
      foot.appendChild(open);
    }
    card.appendChild(foot);

    return card;
  }

  function postStat(icon, value) {
    var s = document.createElement('span');
    s.className = 'post-stat';
    var v = document.createElement('strong');
    v.textContent = value;
    s.appendChild(document.createTextNode(icon + ' '));
    s.appendChild(v);
    return s;
  }

  function formatPostDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    if (lang === 'en') {
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    return d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
  }

  // ---------- Konstanty chování ----------
  var RECENT_DAYS = 90;     // okno pro řez "Nedávno přidané"
  var ACTIVE_DAYS = 90;     // účet bez příspěvku déle (≈3 měsíce) se nezobrazuje
  var HOVER_DELAY = 400;    // ms než se ukáže hover preview
  var HOVER_GRACE = 200;    // ms tolerance po odjezdu myši
  var TAG_CHIP_COUNT = 10;  // počet nejčastějších tagů jako chips
  var SUGGEST_MAX = 8;      // max položek v autocomplete

  var HOVER_CAPABLE = window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Žebříčky: metrika řezu → pole záznamu (popisná fráze viz t('top_phrase_*')).
  var TOP_FIELD = {
    followers: 'followers', active: 'posts_week',
    gain_followers: 'followers_delta', gain_activity: 'activity_delta'
  };

  // ---------- Stav ----------
  var records = [];           // aktivní účty (Účty tab)
  var catalogById = {};       // CELÝ katalog (i neaktivní) — pro vyhledávání
  var filters = { family: new Set(), type: new Set(), language: new Set(), tag: new Set() };
  var searchQuery = '';
  var sortKey = 'name';
  var slice = { kind: 'all' };   // all | platform:<p> | top:<metric>:<n> | recent

  // ---------- Stav pohledu na posty ----------
  var view = 'start';            // výchozí pohled při načtení (bez #hash) — landing „Začínáme"
  var postsData = null;          // načtený posts.json (null = ještě nenačteno)
  var postsLoadState = 'idle';   // idle | loading | loaded | error
  var postsSort = 'engagement';  // engagement | reblogs | favourites | date | date_asc
  var postsTab = 'all';          // 'all' | '10' | '50' | 'risers_ratio' | 'risers_abs'
  var aboutSection = 'about';    // 'about' | 'accounts' | 'posts'
  var startSection = 'intro';    // pohled „Začínáme": 'intro' | 'apps' (volatilní, bude se měnit)
  var startStep = 1;             // aktivní krok onboardingu (persistuje při přechodu mezi pohledy)
  var startPickedApp = null;     // App objekt z kroku 2 pickeru → předá se do kroku 3
  var startPickerChosenId = '';  // app.id explicitně vybraný v pickeru (jinak první doporučený)
  var startPickedLocked = false; // jednorázový zámek: appka už vybraná explicitně → showStartStep(3) neodvozuje
  var appsWizardMode = false;    // katalog Aplikace otevřen z průvodce → karty mají „Vybrat pro průvodce"
  var startChosenInstance = null; // Instance vybraná inline v kroku 3 → odkaz na registraci v kroku 4
  var pendingChosenInstHost = ''; // deep-link/reload: host z hashe (inst=), dořeší se po načtení instancí
  // ---------- Stav pohledu Aplikace (Pohled 2) ----------
  var appsSort = 'users';        // 'name' | 'users' | 'instances' (řazení v záložce „Vše"); výchozí „Nejvíc uživatelů"
  var appsTab = 'all';           // žebříček: 'all' | 'users' | 'instances' | 'risers' | 'new'
  var appsFacets = { type: new Set(), equiv: new Set(), czech: new Set(), managed: new Set(), dev: new Set() };
  // ---------- Stav Slovníčku (Pohled 4) ----------
  var glossarySort = 'order';    // 'order' (pro začátečníky) | 'alpha' | 'theme'
  var glossaryFacets = { level: new Set(), theme: new Set(), type: new Set() };
  var pendingGlossarySlug = '';  // deep-link #...&heslo=<slug> → otevřít detail po renderu
  var glossaryOpenSlug = '';     // právě otevřené heslo (modal) — drží se v hashi ve Slovníčku
  var glossaryIndexed = false;   // dopočítaný fold index pro vyhledávání (lazy, jednou)
  // ---------- Stav Nástrojů (Pohled 5) ----------
  var toolsTab = 'all';          // žebříček: 'all' | 'featured' (Doporučené) | 'new' (Nově přidané)
  var toolsFacets = { category: new Set(), platform: new Set(), forApp: new Set(), price: new Set() };
  // ---------- Stav Statistik (Pohled 6) ----------
  var statsTab = 'overview';     // 'overview' | 'apps' | 'growth' | 'czsk'
  var statsPeriod = 'all';       // graf růstu: '30' | '90' | 'all' (default Vše — máme historii z backfillu)
  var statsRegion = 'global';    // 'global' | 'czsk'
  var statsSeries = new Set();    // App.id řad navíc k celkové síti (jen region=global)
  var appStats = null;           // mapa fedidbSlug -> { users, instances } z app-stats.json
  var appStatsState = 'idle';    // idle | loading | loaded | error
  var appStatsDate = '';         // datum z app-stats.json (updatedAt)
  var appStatsPromise = null;
  var postHashtags = new Set();  // vybrané hashtagy (AND filtr v posts view)
  // ---------- Stav vyhledávání ----------
  var searchState = 'idle';      // idle | loading | loaded | error
  var searchPromise = null;
  var searchPosts = [];          // search.json posts
  var searchUsers = [];          // users.json users
  var searchTab = 'all';         // 'all' | '10' | '50' | 'risers_ratio' | 'risers_abs'
  var searchSort = 'relevance';  // relevance | date | engagement | reblogs | favourites
  // ---------- Stav instancí ----------
  var instanceState = 'idle';
  var instancePromise = null;
  var instanceList = [];         // instances.json
  var instanceTab = 'all';       // žebříček: 'all' | 'beginner' | 'users'
  var instanceQuery = '';        // fulltext nad doménou/názvem/popisem
  var instanceSort = 'users';    // 'name' | 'users' | 'registration'; výchozí „Nejvíc uživatelů"
  var instanceFacets = { region: new Set(), app: new Set(), focus: new Set(), reg: new Set(), size: new Set() };
  // ---------- Stav Odkazů ----------
  var linkTypes = new Set();     // filtr typu (navod/clanek/oficialni/video)
  var linkLangs = new Set();     // filtr jazyka (cs/sk/en)
  var linkThemes = new Set();    // filtr tématu (uvod/navody/technika/komunita/data)
  var linksSort = 'recommended'; // 'recommended' (kurátorské) | 'alpha' | 'lang' (CZ/SK první)

  // ---------- DOM ----------
  var cardsEl, emptyEl, loadingEl, searchEl, resetEl, emptyResetEl,
      visibleCountEl, totalCountEl, sortEl, sliceNoteEl, tabsEl,
      tagInputEl, tagSuggestEl, tagSelectedEl, tagChipsEl,
      sidebarEl, sidebarToggleEl, modalEl, hoverEl, institutionBtnEl,
      accountsViewEl, postsViewEl, aboutViewEl, postsGridEl, postsLoadingEl, postsEmptyEl,
      postsUnavailableEl, postsSortEl, postsSortWrapEl, postsTabsEl, postsMetaEl,
      postHashtagsGroupEl, postHashtagChipsEl, postHashtagSelectedEl, aboutNavEl,
      cardsSentinelEl, searchViewEl, searchQEl, searchMetaEl, searchResultsEl, searchNavEl,
      accountsNavEl, postsNavEl,
      searchTabsEl, searchSortEl, searchSortWrapEl,
      instanceViewEl, instanceNavEl, instanceMetaEl, instanceResultsEl,
      instanceTabsEl, instanceSearchEl, instanceSearchWrapEl, instanceSortEl,
      instanceSortWrapEl, instanceRegionGroupEl, instanceCatChipsEl,
      linksViewEl, linksNavEl, linksMetaEl, linksResultsEl, linksTabsEl, linksSortWrapEl, linksSortEl, slicesHeadingEl,
      startViewEl, startNavEl,
      appsViewEl, appsNavEl, appsTabsEl, appsSortWrapEl, appsSortEl,
      glossaryViewEl, glossaryNavEl, glossaryTabsEl, glossaryMetaEl, glossaryResultsEl,
      glossaryEmptyEl, glossarySortWrapEl, glossarySortEl,
      toolsViewEl, toolsNavEl, toolsTabsEl, toolsMetaEl, toolsResultsEl, toolsEmptyEl,
      statsViewEl, statsNavEl, statsTabsEl, statsResultsEl;

  // ---------- Inkrementální vykreslování karet (infinite scroll) ----------
  var CARDS_BATCH = 60;       // kolik karet vykreslit najednou
  var pageRecords = [];       // aktuální vyfiltrovaný seznam
  var pageRendered = 0;       // kolik z něj už je v DOM
  var cardsObserver = null;   // IntersectionObserver nad sentinelem

  var suppressHash = false;   // brání smyčce při programovém zápisu do hash
  var hoverTimer = null, hoverHideTimer = null;
  var pendingAccountId = null;  // z #account=<id> (per-účet sdílecí stub) → otevřít modal
  var pendingSearchQ = '';      // z #sq=<dotaz> → předvyplnit vyhledávací pole

  document.addEventListener('DOMContentLoaded', function () {
    cardsEl        = document.getElementById('cards');
    cardsSentinelEl = document.getElementById('cards-sentinel');
    emptyEl        = document.getElementById('empty-state');
    loadingEl      = document.getElementById('loading-state');
    searchEl       = document.getElementById('search');
    resetEl        = document.getElementById('reset-filters');
    emptyResetEl   = document.getElementById('empty-reset');
    visibleCountEl = document.getElementById('visible-count');
    totalCountEl   = document.getElementById('total-count');
    sortEl         = document.getElementById('sort');
    sliceNoteEl    = document.getElementById('slice-note');
    tabsEl         = document.getElementById('tabs');
    tagInputEl     = document.getElementById('tag-input');
    tagSuggestEl   = document.getElementById('tag-suggestions');
    tagSelectedEl  = document.getElementById('tag-selected');
    tagChipsEl     = document.getElementById('tag-chips');
    sidebarEl      = document.getElementById('sidebar');
    sidebarToggleEl = document.getElementById('sidebar-toggle');
    modalEl        = document.getElementById('detail-modal');
    institutionBtnEl = document.querySelector('.filter-group[data-filter="type"] button[data-value="institution"]');
    hoverEl        = buildHoverEl();

    accountsViewEl     = document.querySelector('.catalog:not(.posts-view)');
    postsViewEl        = document.getElementById('posts-view');
    aboutViewEl        = document.getElementById('about-view');
    aboutNavEl         = document.getElementById('about-nav');
    searchViewEl       = document.getElementById('search-view');
    searchNavEl        = document.getElementById('search-nav');
    accountsNavEl      = document.getElementById('accounts-nav');
    postsNavEl         = document.getElementById('posts-nav');
    searchTabsEl       = document.getElementById('search-tabs');
    searchSortEl       = document.getElementById('search-sort-select');
    searchSortWrapEl   = document.getElementById('search-sort-wrap');
    searchQEl          = document.getElementById('search-q');
    searchMetaEl       = document.getElementById('search-meta');
    searchResultsEl    = document.getElementById('search-results');
    instanceViewEl     = document.getElementById('instance-view');
    instanceNavEl      = document.getElementById('instance-nav');
    instanceMetaEl     = document.getElementById('instance-meta');
    instanceResultsEl  = document.getElementById('instance-results');
    instanceTabsEl     = document.getElementById('instance-tabs');
    instanceSearchEl   = document.getElementById('instance-search');
    instanceSearchWrapEl = document.getElementById('instance-search-wrap');
    instanceSortEl     = document.getElementById('instance-sort-select');
    instanceSortWrapEl = document.getElementById('instance-sort-wrap');
    instanceRegionGroupEl = document.getElementById('instance-region-group');
    instanceCatChipsEl = document.getElementById('instance-cat-chips');
    linksViewEl        = document.getElementById('links-view');
    linksNavEl         = document.getElementById('links-nav');
    linksMetaEl        = document.getElementById('links-meta');
    linksResultsEl     = document.getElementById('links-results');
    linksSortWrapEl    = document.getElementById('links-sort-wrap');
    linksSortEl        = document.getElementById('links-sort-select');
    linksTabsEl        = document.getElementById('links-tabs');
    slicesHeadingEl    = document.getElementById('slices-heading');
    startViewEl        = document.getElementById('start-view');
    startNavEl         = document.getElementById('start-nav');
    appsViewEl         = document.getElementById('apps-view');
    appsNavEl          = document.getElementById('apps-nav');
    appsTabsEl         = document.getElementById('apps-tabs');
    appsSortWrapEl     = document.getElementById('apps-sort-wrap');
    appsSortEl         = document.getElementById('apps-sort-select');
    glossaryViewEl     = document.getElementById('glossary-view');
    glossaryNavEl      = document.getElementById('glossary-nav');
    glossaryTabsEl     = document.getElementById('glossary-tabs');
    glossaryMetaEl     = document.getElementById('glossary-meta');
    glossaryResultsEl  = document.getElementById('glossary-results');
    glossaryEmptyEl    = document.getElementById('glossary-empty');
    glossarySortWrapEl = document.getElementById('glossary-sort-wrap');
    glossarySortEl     = document.getElementById('glossary-sort-select');
    toolsViewEl        = document.getElementById('tools-view');
    toolsNavEl         = document.getElementById('tools-nav');
    toolsTabsEl        = document.getElementById('tools-tabs');
    toolsMetaEl        = document.getElementById('tools-meta');
    toolsResultsEl     = document.getElementById('tools-results');
    toolsEmptyEl       = document.getElementById('tools-empty');
    statsViewEl        = document.getElementById('stats-view');
    statsNavEl         = document.getElementById('stats-nav');
    statsTabsEl        = document.getElementById('stats-tabs');
    statsResultsEl     = document.getElementById('stats-results');
    postsGridEl        = document.getElementById('posts-grid');
    postsLoadingEl     = document.getElementById('posts-loading');
    postsEmptyEl       = document.getElementById('posts-empty');
    postsUnavailableEl = document.getElementById('posts-unavailable');
    postsSortEl        = document.getElementById('posts-sort-select');
    postsSortWrapEl    = document.getElementById('posts-sort-wrap');
    postsTabsEl        = document.getElementById('posts-tabs');
    postsMetaEl        = document.getElementById('posts-meta');
    postHashtagsGroupEl    = document.getElementById('post-hashtags-group');
    postHashtagChipsEl     = document.getElementById('post-hashtag-chips');
    postHashtagSelectedEl  = document.getElementById('post-hashtag-selected');

    initLang();
    applyI18n();
    bindLangSwitch();
    bindViewSwitch();
    bindPostsControls();
    bindInstanceControls();
    bindLinksControls();
    bindAppsControls();
    bindToolsControls();
    bindStatsControls();
    bindGlossaryControls();
    bindAboutNav();
    bindStartNav();
    bindStartPicker();
    bindSearchView();
    bindFilterButtons();
    bindSearch();
    bindSort();
    bindReset();
    bindTabs();
    bindTagFilter();
    bindSidebarToggle();
    bindModalClose();
    bindHeroHome();
    setupCardsPaging();
    placeSliceTabs();
    window.matchMedia('(max-width: 760px)').addEventListener('change', placeSliceTabs);
    renderUpdatedRelative();
    renderSearchIndexed();

    parseHash();
    // ?app=<id> → předfiltruj pohled Instance (jen při úvodním načtení stránky,
    // ne na hashchange). Aktivní jen pokud hash neurčil jiný pohled.
    (function () {
      var appId = new URLSearchParams(location.search).get('app');
      if (!appId || view !== 'start') return;
      var taxApps = (window.FEDIK_TAXONOMY && window.FEDIK_TAXONOMY.apps) || {};
      if (!taxApps[appId]) return;
      instanceFacets.app.clear();
      instanceFacets.app.add(appId);
      view = 'instance';
    }());
    applyStateToControls();
    window.addEventListener('hashchange', onHashChange);

    // Účty/Posty (sloníkovský katalog z data.json) se ve Fedíku nepoužívají — pohled je pryč,
    // data.json se už nenačítá. Skrytá .catalog sekce zůstává v DOM jako mrtvý kód.
    if (loadingEl) loadingEl.hidden = true;
  });

  // ========================================================
  // Bindings
  // ========================================================
  function bindFilterButtons() {
    document.querySelectorAll('.filter-group[data-filter="family"] button[data-value],' +
      '.filter-group[data-filter="type"] button[data-value],' +
      '.filter-group[data-filter="language"] button[data-value]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section = btn.closest('.filter-group').getAttribute('data-filter');
        toggleSetValue(filters[section], btn.getAttribute('data-value'));
        btn.classList.toggle('active');
        render();
      });
    });
  }

  function bindSearch() {
    searchEl.addEventListener('input', function () {
      searchQuery = searchEl.value.trim().toLowerCase();
      render();
    });
  }

  function bindSort() {
    sortEl.addEventListener('change', function () {
      sortKey = sortEl.value;
      render();
    });
  }

  function bindReset() {
    resetEl.addEventListener('click', resetAll);
    emptyResetEl.addEventListener('click', resetAll);
  }

  function bindTabs() {
    tabsEl.querySelectorAll('.tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        slice = parseSlice(tab.getAttribute('data-slice'));
        render();
      });
    });
  }

  // Popisek tlačítka menu podle stavu (Zobrazit/Skrýt) + aktuálního jazyka.
  function updateSidebarToggleLabel() {
    var el = document.getElementById('sidebar-toggle-label');
    if (!el || !sidebarEl) return;
    el.textContent = t(sidebarEl.classList.contains('open') ? 'menu_hide' : 'menu_show');
  }

  // Řezy lišty (Vše/Top/Skokani… per pohled) jsou v DOM mezi navbarem a obsahem.
  // Na mobilu je přesuneme DO draweru za „Pohledy" (POHLEDY → řezy → filtry);
  // na desktopu zpět pod navbar (horizontální lišta). Volá se i při změně šířky.
  function placeSliceTabs() {
    var slices = [tabsEl, postsTabsEl, searchTabsEl, instanceTabsEl, linksTabsEl].filter(Boolean);
    if (!slices.length) return;
    var mobile = window.matchMedia('(max-width: 760px)').matches;
    if (mobile) {
      var head = document.getElementById('slices-heading');
      if (!head) return;
      slices.forEach(function (el) { head.appendChild(el); });  // do sekce „Rychlé filtry", v pořadí
    } else {
      var main = document.querySelector('main.layout');
      if (!main || !main.parentNode) return;
      slices.forEach(function (el) { main.parentNode.insertBefore(el, main); });  // zpět pod navbar
    }
  }

  function bindSidebarToggle() {
    sidebarToggleEl.addEventListener('click', function () {
      var open = sidebarEl.classList.toggle('open');
      sidebarToggleEl.setAttribute('aria-expanded', open ? 'true' : 'false');
      updateSidebarToggleLabel();
    });
  }

  // Klik na hlavičkový obrázek = návrat na "Vše" (reset všech filtrů a řezů).
  function bindHeroHome() {
    var hero = document.getElementById('hero-home');
    if (hero) hero.addEventListener('click', resetAll);
  }

  // Odstraní Mastodon custom-emoji shortcody (`:bot:`, `:verified:` …) z jména.
  function cleanName(name) {
    return String(name == null ? '' : name)
      .replace(/:[a-zA-Z0-9_]+:/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  // ========================================================
  // Tag filtr (autocomplete + dynamické chips)
  // ========================================================
  function bindTagFilter() {
    tagInputEl.addEventListener('input', function () { renderTagSuggestions(); });
    tagInputEl.addEventListener('focus', function () { renderTagSuggestions(); });
    tagInputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var first = tagSuggestEl.querySelector('li');
        if (first) addTag(first.getAttribute('data-tag'));
      } else if (e.key === 'Escape') {
        hideTagSuggestions();
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.tag-autocomplete')) hideTagSuggestions();
    });
  }

  function addTag(tag) {
    if (!tag) return;
    filters.tag.add(tag);
    tagInputEl.value = '';
    hideTagSuggestions();
    render();
  }

  function removeTag(tag) {
    filters.tag.delete(tag);
    render();
  }

  function hideTagSuggestions() {
    tagSuggestEl.hidden = true;
    tagSuggestEl.innerHTML = '';
    tagInputEl.setAttribute('aria-expanded', 'false');
  }

  // Tagy dostupné v aktuálním výběru (slice + ostatní filtry kromě tagu), s četností.
  function availableTagCounts() {
    var counts = Object.create(null);
    sliceBase().filter(matchesExceptTag).forEach(function (rec) {
      (rec.categories || []).forEach(function (t) {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }

  function renderTagSuggestions() {
    var q = tagInputEl.value.trim().toLowerCase();
    var counts = availableTagCounts();
    var list = Object.keys(counts)
      .filter(function (t) { return !filters.tag.has(t) && t.indexOf(q) !== -1; })
      .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); })
      .slice(0, SUGGEST_MAX);

    tagSuggestEl.innerHTML = '';
    if (list.length === 0) { hideTagSuggestions(); return; }
    list.forEach(function (t) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      li.setAttribute('data-tag', t);
      li.innerHTML = '';
      var name = document.createElement('span');
      name.textContent = t;
      var c = document.createElement('span');
      c.className = 'tag-count';
      c.textContent = counts[t];
      li.appendChild(name);
      li.appendChild(c);
      li.addEventListener('click', function () { addTag(t); });
      tagSuggestEl.appendChild(li);
    });
    tagSuggestEl.hidden = false;
    tagInputEl.setAttribute('aria-expanded', 'true');
  }

  // Vybrané tagy (odstranitelné chips) + top-N návrhové chips.
  function renderTagUI() {
    tagSelectedEl.innerHTML = '';
    filters.tag.forEach(function (t) {
      var chip = document.createElement('button');
      chip.className = 'tag-chip tag-chip-selected';
      chip.innerHTML = '';
      chip.appendChild(document.createTextNode(t));
      var x = document.createElement('span');
      x.className = 'tag-x';
      x.setAttribute('aria-hidden', 'true');
      x.textContent = '×';
      chip.appendChild(x);
      chip.setAttribute('aria-label', 'Odebrat tag ' + t);
      chip.addEventListener('click', function () { removeTag(t); });
      tagSelectedEl.appendChild(chip);
    });

    var counts = availableTagCounts();
    var top = Object.keys(counts)
      .filter(function (t) { return !filters.tag.has(t); })
      .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); })
      .slice(0, TAG_CHIP_COUNT);

    tagChipsEl.innerHTML = '';
    top.forEach(function (t) {
      var chip = document.createElement('button');
      chip.className = 'tag-chip';
      chip.appendChild(document.createTextNode(t));
      var c = document.createElement('span');
      c.className = 'tag-count';
      c.textContent = counts[t];
      chip.appendChild(c);
      chip.addEventListener('click', function () { addTag(t); });
      tagChipsEl.appendChild(chip);
    });
  }

  // ========================================================
  // Filtrování + řezy
  // ========================================================
  function toggleSetValue(set, value) {
    if (set.has(value)) set.delete(value); else set.add(value);
  }

  // Záznamy spadající do aktuálního řezu, bez sidebar filtrů (kromě Top N, které
  // řeší jen rodinu). Slouží jako základ pro počítání dostupných tagů.
  function sliceBase() {
    if (slice.kind === 'top') {
      return records.filter(function (r) {
        return filters.family.size === 0 || filters.family.has(r.family);
      });
    }
    return records.filter(inSlice);
  }

  function inSlice(rec) {
    if (slice.kind === 'platform') {
      return (rec.source_platforms || []).indexOf(slice.value) !== -1;
    }
    if (slice.kind === 'recent') {
      var d = daysSince(rec.created_at);
      return d !== null && d <= RECENT_DAYS;
    }
    return true; // all
  }

  function matchesExceptTag(rec) {
    if (filters.family.size && !filters.family.has(rec.family)) return false;
    if (filters.type.size && !filters.type.has(rec.type)) return false;
    if (filters.language.size && !filters.language.has(rec.language)) return false;
    if (searchQuery) {
      // Vyhledává jméno + handle + (skrytě) tagy — "f1" tak najde i účty,
      // které f1 nemají ve jméně, ale jsou tak otagované.
      var hay = (rec.display_name + ' ' + rec.id + ' ' +
                 (rec.categories || []).join(' ')).toLowerCase();
      if (hay.indexOf(searchQuery) === -1) return false;
    }
    return true;
  }

  function matchesTag(rec) {
    if (!filters.tag.size) return true;
    var cats = rec.categories || [];
    var ok = true;
    filters.tag.forEach(function (t) { if (cats.indexOf(t) === -1) ok = false; });
    return ok;
  }

  // Top N přepisuje ostatní filtry — kurátorský pohled, respektuje jen rodinu.
  function isTopSlice() { return slice.kind === 'top'; }

  function computeVisible() {
    if (isTopSlice()) {
      var field = TOP_FIELD[slice.metric] || 'followers';
      var isGain = slice.metric.indexOf('gain_') === 0;
      return records
        .filter(function (r) {
          if (filters.family.size && !filters.family.has(r.family)) return false;
          // Skokani: jen účty s kladným nárůstem a dostupnou předchozí hodnotou.
          if (isGain) return r[field] != null && r[field] > 0;
          return true;
        })
        .slice()
        .sort(function (a, b) { return (b[field] || 0) - (a[field] || 0); })
        .slice(0, slice.count);
    }
    var list = records.filter(function (r) {
      return inSlice(r) && matchesExceptTag(r) && matchesTag(r);
    });
    return sortList(list);
  }

  function sortList(list) {
    var copy = list.slice();
    switch (sortKey) {
      case 'followers':
        copy.sort(function (a, b) { return (b.followers || 0) - (a.followers || 0); });
        break;
      case 'posts':
        copy.sort(function (a, b) { return (b.posts_week || 0) - (a.posts_week || 0); });
        break;
      case 'added':
        copy.sort(function (a, b) {
          var da = a.created_at || '', db = b.created_at || '';
          if (da === db) return cmpName(a, b);
          if (!da) return 1; if (!db) return -1;       // bez data na konec
          return db < da ? -1 : 1;                      // novější (větší datum) první
        });
        break;
      default:
        copy.sort(cmpName);
    }
    return copy;
  }

  function cmpName(a, b) {
    return a.display_name.localeCompare(b.display_name, 'cs', { sensitivity: 'base' });
  }

  // ========================================================
  // Render
  // ========================================================
  // ---------- Inkrementální vykreslování (infinite scroll) ----------

  // Vykreslí další dávku karet (CARDS_BATCH) z pageRecords.
  function renderNextCardsBatch() {
    var end = Math.min(pageRendered + CARDS_BATCH, pageRecords.length);
    if (end <= pageRendered) return;
    var frag = document.createDocumentFragment();
    for (var i = pageRendered; i < end; i++) frag.appendChild(buildCard(pageRecords[i]));
    cardsEl.appendChild(frag);
    pageRendered = end;
  }

  // Dorenderovává dávky, dokud je sentinel ve výhledu (vyplní fold) nebo dokud
  // není vše hotovo. Volá se i z observeru při scrollování.
  function maybeRenderMoreCards() {
    if (!cardsSentinelEl || pageRendered >= pageRecords.length) return;
    var r = cardsSentinelEl.getBoundingClientRect();
    if (r.top <= (window.innerHeight || document.documentElement.clientHeight) + 400) {
      renderNextCardsBatch();
      requestAnimationFrame(maybeRenderMoreCards);
    }
  }

  // Observer nad sentinelem; když není k dispozici (starý prohlížeč), zvětší
  // dávku na „vše" → fallback na původní chování (vykreslí celý seznam).
  function setupCardsPaging() {
    if (!cardsSentinelEl) return;
    if (!('IntersectionObserver' in window)) { CARDS_BATCH = Infinity; return; }
    cardsObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) maybeRenderMoreCards();
    }, { rootMargin: '400px 0px' });
    cardsObserver.observe(cardsSentinelEl);
  }

  function render() {
    syncTabsUI();
    updateSliceDimming();
    updateInstitutionFilterLabel();

    var visible = computeVisible();
    visibleCountEl.textContent = visible.length;

    renderTagUI();
    renderSliceNote();

    var anyFilter = filters.family.size || filters.type.size ||
      filters.language.size || filters.tag.size || searchQuery ||
      slice.kind !== 'all' || sortKey !== 'name';
    resetEl.hidden = !anyFilter;

    cardsEl.innerHTML = '';
    pageRecords = visible;
    pageRendered = 0;
    if (visible.length === 0) {
      emptyEl.hidden = false;
      if (cardsSentinelEl) cardsSentinelEl.hidden = true;
    } else {
      emptyEl.hidden = true;
      if (cardsSentinelEl) cardsSentinelEl.hidden = false;
      renderNextCardsBatch();   // první dávka
      maybeRenderMoreCards();   // dorenderuj, dokud sentinel není pod foldem
    }

    // Sdílené filtry (Oblast/Hashtagy) ovlivňují i Posty a Vyhledávání.
    if (view === 'posty') renderPosts();
    if (view === 'search') renderSearch();

    writeHash();
  }

  function renderSliceNote() {
    var note = '';
    if (slice.kind === 'platform') {
      note = t('slice_platform') + platformLabel(slice.value);
    } else if (slice.kind === 'recent') {
      note = t('slice_recent_pre') + RECENT_DAYS + t('slice_recent_post');
    } else if (slice.kind === 'top') {
      note = t('slice_top_pre') + slice.count + ' ' + t('top_phrase_' + slice.metric) + t('slice_top_post');
    }
    sliceNoteEl.textContent = note;
    sliceNoteEl.hidden = note === '';
  }

  // Top N ztlumí (disabled) vše kromě rodiny.
  function updateSliceDimming() {
    var dim = isTopSlice();
    document.querySelectorAll('.filter-group[data-filter="type"],' +
      '.filter-group[data-filter="language"], .filter-group[data-filter="tag"],' +
      '.filter-sort, .filter-search').forEach(function (el) {
      el.classList.toggle('is-dimmed', dim);
      el.querySelectorAll('input, button, select').forEach(function (c) { c.disabled = dim; });
    });
  }

  function syncTabsUI() {
    var current = sliceToString(slice);
    tabsEl.querySelectorAll('.tab').forEach(function (tab) {
      tab.classList.toggle('is-active', tab.getAttribute('data-slice') === current);
    });
  }

  // ========================================================
  // Karta
  // ========================================================
  function buildCard(rec) {
    var card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', t('card_detail') + rec.display_name);

    card.appendChild(buildAvatar(rec, 'card-avatar'));

    var body = document.createElement('div');
    body.className = 'card-body';

    var name = document.createElement('div');
    name.className = 'card-name';
    name.textContent = rec.display_name;

    var handle = document.createElement('a');
    handle.className = 'card-handle';
    handle.href = rec.profile_url;
    handle.target = '_blank';
    handle.rel = 'noopener';
    handle.textContent = '@' + rec.id;
    handle.addEventListener('click', function (e) { e.stopPropagation(); });

    body.appendChild(name);
    body.appendChild(handle);
    body.appendChild(buildLabels(rec));
    body.appendChild(buildStats(rec));

    card.appendChild(body);

    // Účet mimo katalog (z vyhledávání) nemá detail → klik vede na profil.
    if (rec._external) {
      card.addEventListener('click', function () { window.open(rec.profile_url, '_blank', 'noopener'); });
    } else {
      card.addEventListener('click', function () { openModal(rec); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(rec); }
      });
      if (HOVER_CAPABLE) attachHover(card, rec);
    }

    return card;
  }

  function buildAvatar(rec, cls) {
    var avatar = document.createElement('div');
    avatar.className = cls;
    if (rec.avatar) {
      var img = document.createElement('img');
      img.src = rec.avatar;
      img.alt = '';
      img.loading = 'lazy';
      img.onerror = function () { avatar.classList.add('avatar-fallback'); img.remove(); };
      avatar.appendChild(img);
    } else {
      avatar.classList.add('avatar-fallback');
    }
    return avatar;
  }

  function buildLabels(rec) {
    var labels = document.createElement('div');
    labels.className = 'card-labels';
    if (rec.family) {
      var fam = document.createElement('span');
      fam.className = 'label label-family fam-' + rec.family;
      fam.textContent = familyLabel(rec.family);
      labels.appendChild(fam);
    }
    if (rec.type) {
      var typ = document.createElement('span');
      typ.className = 'label label-type';
      typ.textContent = typeLabel(rec);
      labels.appendChild(typ);
    }
    // Příznak automatizovaného účtu (Mastodon `bot`).
    if (rec.bot === true) {
      var bot = document.createElement('span');
      bot.className = 'label label-bot';
      bot.textContent = '🤖 ' + t('label_bot');
      bot.title = t('label_bot_title');
      labels.appendChild(bot);
    }
    return labels;
  }

  function buildStats(rec) {
    var stats = document.createElement('div');
    stats.className = 'card-stats';
    stats.appendChild(stat(formatNumber(rec.followers), t('stat_followers')));
    stats.appendChild(stat(rec.posts_week == null ? '—' : rec.posts_week, t('stat_posts_week')));
    return stats;
  }

  function stat(value, label) {
    var s = document.createElement('span');
    s.className = 'stat';
    var v = document.createElement('strong');
    v.textContent = value;
    s.appendChild(v);
    s.appendChild(document.createTextNode(' ' + label));
    return s;
  }

  // ========================================================
  // Hover preview
  // ========================================================
  function buildHoverEl() {
    var el = document.createElement('div');
    el.className = 'hover-preview';
    el.hidden = true;
    el.addEventListener('mouseenter', function () { clearTimeout(hoverHideTimer); });
    el.addEventListener('mouseleave', scheduleHoverHide);
    document.body.appendChild(el);
    return el;
  }

  function attachHover(card, rec) {
    card.addEventListener('mouseenter', function () {
      clearTimeout(hoverHideTimer);
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { showHover(card, rec); }, HOVER_DELAY);
    });
    card.addEventListener('mouseleave', function () {
      clearTimeout(hoverTimer);
      scheduleHoverHide();
    });
  }

  function scheduleHoverHide() {
    clearTimeout(hoverHideTimer);
    hoverHideTimer = setTimeout(function () { hoverEl.hidden = true; }, HOVER_GRACE);
  }

  function showHover(card, rec) {
    hoverEl.innerHTML = '';

    var head = document.createElement('div');
    head.className = 'hover-head';
    head.appendChild(buildAvatar(rec, 'hover-avatar'));
    var ht = document.createElement('div');
    var hn = document.createElement('div');
    hn.className = 'hover-name';
    hn.textContent = rec.display_name;
    var hh = document.createElement('div');
    hh.className = 'hover-handle';
    hh.textContent = '@' + rec.id;
    ht.appendChild(hn);
    ht.appendChild(hh);
    head.appendChild(ht);
    hoverEl.appendChild(head);

    if (rec.bio) {
      var bio = document.createElement('div');
      bio.className = 'hover-bio';
      bio.appendChild(sanitizeBio(rec.bio));
      hoverEl.appendChild(bio);
    }

    var meta = document.createElement('div');
    meta.className = 'hover-meta';
    meta.appendChild(metaLine(platformsText(rec)));
    var added = relAdded(rec.created_at);
    if (added) meta.appendChild(metaLine(added));
    hoverEl.appendChild(meta);

    hoverEl.hidden = false;
    positionHover(card);
  }

  function positionHover(card) {
    var r = card.getBoundingClientRect();
    var pw = hoverEl.offsetWidth, ph = hoverEl.offsetHeight;
    var gap = 8;
    var left = r.left;
    var top = r.bottom + gap;
    if (top + ph > window.innerHeight && r.top - ph - gap > 0) top = r.top - ph - gap;
    if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
    if (left < 8) left = 8;
    hoverEl.style.left = (left + window.scrollX) + 'px';
    hoverEl.style.top = (top + window.scrollY) + 'px';
  }

  function metaLine(text) {
    var p = document.createElement('div');
    p.className = 'meta-line';
    p.textContent = text;
    return p;
  }

  function platformsText(rec) {
    var ps = (rec.source_platforms || []).map(platformLabel);
    return t('hover_source') + (ps.length ? ps.join(', ') : '—');
  }

  // ========================================================
  // Detail modal (<dialog>)
  // ========================================================
  function openModal(rec) {
    hoverEl.hidden = true;
    clearTimeout(hoverTimer);
    modalEl.innerHTML = '';
    modalEl.appendChild(buildModalContent(rec));
    if (typeof modalEl.showModal === 'function') {
      modalEl.showModal();
    } else {
      modalEl.setAttribute('open', '');  // fallback: position:fixed overlay přes CSS
      modalEl.classList.add('modal-fallback-open');
    }
  }

  function closeModal() {
    if (typeof modalEl.close === 'function' && modalEl.open) modalEl.close();
    modalEl.removeAttribute('open');
    modalEl.classList.remove('modal-fallback-open');
    // Zavřením detailu hesla shoď slug z URL (jen ve Slovníčku ho tam držíme).
    if (glossaryOpenSlug) { glossaryOpenSlug = ''; if (view === 'slovnicek') writeHash(); }
  }

  function bindModalClose() {
    // Klik mimo obsah (na backdrop dialogu)
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) closeModal();
    });
    // Escape u <dialog> ruší nativně přes 'cancel'
    modalEl.addEventListener('cancel', function () { closeModal(); });
    modalEl.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeModal(); }
    });
  }

  function buildModalContent(rec) {
    var wrap = document.createElement('div');
    wrap.className = 'modal-inner';

    var close = document.createElement('button');
    close.className = 'modal-close';
    close.setAttribute('aria-label', t('modal_close'));
    close.innerHTML = '';
    close.textContent = '×';
    close.addEventListener('click', closeModal);
    wrap.appendChild(close);

    var head = document.createElement('div');
    head.className = 'modal-head';
    head.appendChild(buildAvatar(rec, 'modal-avatar'));
    var ht = document.createElement('div');
    ht.className = 'modal-headtext';
    var hn = document.createElement('div');
    hn.className = 'modal-name';
    hn.textContent = rec.display_name;
    var hh = document.createElement('a');
    hh.className = 'modal-handle';
    hh.href = rec.profile_url;
    hh.target = '_blank';
    hh.rel = 'noopener';
    hh.textContent = '@' + rec.id;
    ht.appendChild(hn);
    ht.appendChild(hh);
    head.appendChild(ht);
    wrap.appendChild(head);

    if (rec.bio) {
      var bio = document.createElement('div');
      bio.className = 'modal-bio';
      bio.appendChild(sanitizeBio(rec.bio));
      wrap.appendChild(bio);
    }

    wrap.appendChild(buildLabels(rec));

    if (rec.categories && rec.categories.length) {
      var cats = document.createElement('div');
      cats.className = 'modal-tags';
      rec.categories.forEach(function (cat) {
        var chip = document.createElement('button');
        chip.className = 'tag-chip';
        chip.textContent = cat;
        chip.addEventListener('click', function () {
          closeModal();
          if (isTopSlice()) slice = { kind: 'all' };
          filters.tag.add(cat);
          render();
        });
        cats.appendChild(chip);
      });
      wrap.appendChild(cats);
    }

    var stats = document.createElement('div');
    stats.className = 'modal-stats';
    stats.appendChild(modalStat(formatNumber(rec.followers), t('stat_followers')));
    stats.appendChild(modalStat(rec.posts_week == null ? '—' : formatNumber(rec.posts_week), t('stat_posts_week')));
    stats.appendChild(modalStat(langLabel(rec.language), t('stat_language')));
    var added = relAdded(rec.created_at);
    if (added) stats.appendChild(modalStat('', added, true));
    wrap.appendChild(stats);

    var actions = document.createElement('div');
    actions.className = 'modal-actions';
    var profile = document.createElement('a');
    profile.className = 'btn btn-primary';
    profile.href = rec.profile_url;
    profile.target = '_blank';
    profile.rel = 'noopener';
    profile.textContent = t('modal_open');
    actions.appendChild(profile);
    var follow = document.createElement('a');
    follow.className = 'btn btn-ghost';
    // Odkaz vede na profil účtu — Mastodon tam ukáže dialog „Sledovat", který
    // návštěvníka nechá zadat VLASTNÍ instanci (ne přihlášení na zpravobot.news).
    follow.href = rec.profile_url;
    follow.target = '_blank';
    follow.rel = 'noopener';
    follow.title = t('modal_follow_title');
    follow.textContent = t('modal_follow');
    actions.appendChild(follow);
    wrap.appendChild(actions);

    return wrap;
  }

  function modalStat(value, label, labelOnly) {
    var s = document.createElement('div');
    s.className = 'modal-stat';
    if (labelOnly) {
      s.classList.add('modal-stat-wide');
      s.textContent = label;
      return s;
    }
    var v = document.createElement('strong');
    v.textContent = value;
    var l = document.createElement('span');
    l.textContent = label;
    s.appendChild(v);
    s.appendChild(l);
    return s;
  }

  // ========================================================
  // Sanitizace bio (HTML z Mastodon note → whitelist a/br/p/span)
  // ========================================================
  function sanitizeBio(html) {
    var allowed = { A: 1, BR: 1, P: 1, SPAN: 1 };
    var doc = new DOMParser().parseFromString(String(html), 'text/html');
    var frag = document.createDocumentFragment();
    walkNodes(doc.body, frag, allowed);
    return frag;
  }

  function walkNodes(src, dest, allowed) {
    Array.prototype.forEach.call(src.childNodes, function (node) {
      if (node.nodeType === 3) {
        dest.appendChild(document.createTextNode(node.nodeValue));
        return;
      }
      if (node.nodeType !== 1) return;
      var tag = node.tagName;
      if (!allowed[tag]) { walkNodes(node, dest, allowed); return; }  // unwrap
      var el = document.createElement(tag.toLowerCase());
      if (tag === 'A') {
        var href = node.getAttribute('href') || '';
        if (/^https?:\/\//i.test(href)) {
          el.setAttribute('href', href);
          el.target = '_blank';
          el.rel = 'noopener noreferrer';
        }
      }
      walkNodes(node, el, allowed);
      dest.appendChild(el);
    });
  }

  // Sanitizace obsahu postu (Mastodon `content`): whitelist a/br/p/span.
  // Hashtagy (a.hashtag) → interní filtr; mentions (a.mention) a běžné odkazy
  // → externí (target=_blank). `.invisible`/`.ellipsis` třídy zachováme kvůli
  // zkracování URL, jak to dělá Mastodon.
  function sanitizePostHtml(html) {
    var doc = new DOMParser().parseFromString(String(html), 'text/html');
    var frag = document.createDocumentFragment();
    walkPostNodes(doc.body, frag);
    return frag;
  }

  function walkPostNodes(src, dest) {
    var allowed = { A: 1, BR: 1, P: 1, SPAN: 1 };
    Array.prototype.forEach.call(src.childNodes, function (node) {
      if (node.nodeType === 3) {
        dest.appendChild(document.createTextNode(node.nodeValue));
        return;
      }
      if (node.nodeType !== 1) return;
      var tag = node.tagName;
      if (!allowed[tag]) { walkPostNodes(node, dest); return; }
      var el = document.createElement(tag.toLowerCase());

      if (tag === 'SPAN') {
        // Zachovat Mastodon třídy pro zkrácené URL (invisible/ellipsis).
        var cls = node.getAttribute('class') || '';
        if (/\b(invisible|ellipsis)\b/.test(cls)) el.className = cls;
      }

      if (tag === 'A') {
        var href = node.getAttribute('href') || '';
        var aClass = node.getAttribute('class') || '';
        var isHashtag = /\bhashtag\b/.test(aClass) ||
                        /\/tags\//.test(href);
        if (isHashtag) {
          // Hashtag → interní filtr (ne odkaz pryč).
          var tagName = node.textContent.replace(/^#/, '').trim().toLowerCase();
          el.className = 'post-inline-hashtag';
          el.setAttribute('href', '#');
          el.setAttribute('role', 'button');
          el.addEventListener('click', function (ev) {
            ev.preventDefault();
            togglePostHashtag(tagName);
          });
        } else if (/^https?:\/\//i.test(href)) {
          el.className = /\bmention\b/.test(aClass) ? 'post-inline-mention' : 'post-inline-link';
          el.setAttribute('href', href);
          el.target = '_blank';
          el.rel = 'noopener noreferrer';
        }
      }
      walkPostNodes(node, el);
      dest.appendChild(el);
    });
  }

  // ========================================================
  // URL hash state
  // ========================================================
  function writeHash() {
    var parts = [];
    if (filters.family.size) parts.push('family=' + enc(setList(filters.family)));
    if (filters.type.size) parts.push('type=' + enc(setList(filters.type)));
    if (filters.language.size) parts.push('lang=' + enc(setList(filters.language)));
    if (filters.tag.size) parts.push('tag=' + enc(setList(filters.tag)));
    if (searchQuery) parts.push('q=' + enc(searchQuery));
    if (sortKey !== 'name') parts.push('sort=' + enc(sortKey));
    if (slice.kind !== 'all') parts.push('slice=' + enc(sliceToString(slice)));
    if (view === 'about') {
      parts.push('view=about');
      if (aboutSection !== 'about') parts.push('asec=' + aboutSection);
    } else if (view === 'start') {
      // Začínáme je výchozí pohled → jinak čistá landing URL bez hashe.
      // Krok onboardingu drž v hashi, ať přežije reload i sdílení URL (krok 1 = default, vynech).
      if (startStep > 1) parts.push('step=' + startStep);
      if (startChosenInstance) parts.push('inst=' + enc(startChosenInstance.domain));
    } else if (view === 'aplikace') {
      parts.push('view=aplikace');
      if (appsTab !== 'all') parts.push('atab=' + appsTab);
      if (appsSort !== 'users') parts.push('asort=' + appsSort);
      if (appsFacets.type.size) parts.push('atype=' + enc(setList(appsFacets.type)));
      if (appsFacets.equiv.size) parts.push('aeq=' + enc(setList(appsFacets.equiv)));
      if (appsFacets.czech.size) parts.push('acz=' + enc(setList(appsFacets.czech)));
      if (appsFacets.managed.size) parts.push('amh=' + enc(setList(appsFacets.managed)));
      if (appsFacets.dev.size) parts.push('adev=' + enc(setList(appsFacets.dev)));
    } else if (view === 'search') {
      parts.push('view=search');
      if (searchQEl && searchQEl.value.trim()) parts.push('sq=' + enc(searchQEl.value.trim()));
      if (searchTab !== 'all') parts.push('stab=' + searchTab);
      if (postHashtags.size) parts.push('phash=' + enc(setList(postHashtags)));
    } else if (view === 'instance') {
      parts.push('view=instance');
      if (instanceTab !== 'all') parts.push('itab=' + instanceTab);
      if (instanceSort !== 'users') parts.push('isort=' + instanceSort);
      if (instanceFacets.region.size) parts.push('irg=' + enc(setList(instanceFacets.region)));
      if (instanceFacets.app.size) parts.push('iapp=' + enc(setList(instanceFacets.app)));
      if (instanceFacets.focus.size) parts.push('ifoc=' + enc(setList(instanceFacets.focus)));
      if (instanceFacets.reg.size) parts.push('ireg=' + enc(setList(instanceFacets.reg)));
      if (instanceFacets.size.size) parts.push('isz=' + enc(setList(instanceFacets.size)));
    } else if (view === 'odkazy') {
      parts.push('view=odkazy');
      if (linkTypes.size) parts.push('ltype=' + enc(setList(linkTypes)));
      if (linkLangs.size) parts.push('llang=' + enc(setList(linkLangs)));
      if (linkThemes.size) parts.push('lth=' + enc(setList(linkThemes)));
      if (linksSort !== 'recommended') parts.push('lsort=' + linksSort);
    } else if (view === 'posty') {
      parts.push('view=posty');
      if (postsSort !== 'engagement') parts.push('psort=' + enc(postsSort));
      if (postsTab !== 'all') parts.push('ptab=' + postsTab);
      if (postHashtags.size) parts.push('phash=' + enc(setList(postHashtags)));
    } else if (view === 'slovnicek') {
      parts.push('view=slovnicek');
      if (glossarySort !== 'order') parts.push('gsort=' + glossarySort);
      if (glossaryFacets.level.size) parts.push('glvl=' + enc(setList(glossaryFacets.level)));
      if (glossaryFacets.theme.size) parts.push('gth=' + enc(setList(glossaryFacets.theme)));
      if (glossaryFacets.type.size) parts.push('gtyp=' + enc(setList(glossaryFacets.type)));
      if (glossaryOpenSlug) parts.push('heslo=' + enc(glossaryOpenSlug));
    } else if (view === 'nastroje') {
      parts.push('view=nastroje');
      if (toolsTab !== 'all') parts.push('ttab=' + toolsTab);
      if (toolsFacets.category.size) parts.push('tcat=' + enc(setList(toolsFacets.category)));
      if (toolsFacets.platform.size) parts.push('tplat=' + enc(setList(toolsFacets.platform)));
      if (toolsFacets.forApp.size) parts.push('tfa=' + enc(setList(toolsFacets.forApp)));
      if (toolsFacets.price.size) parts.push('tprice=' + enc(setList(toolsFacets.price)));
    } else if (view === 'statistiky') {
      parts.push('view=statistiky');
      if (statsTab !== 'overview') parts.push('sttab=' + statsTab);
      if (statsPeriod !== 'all') parts.push('sper=' + statsPeriod);
      if (statsRegion !== 'global') parts.push('sreg=' + statsRegion);
      if (statsSeries.size) parts.push('sser=' + enc(setList(statsSeries)));
    }
    var hash = parts.join('&');
    suppressHash = true;
    if (hash) {
      if (location.hash.slice(1) !== hash) location.hash = hash;
    } else if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    setTimeout(function () { suppressHash = false; }, 0);
  }

  function parseHash() {
    pendingAccountId = null;
    var hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    filters.family.clear(); filters.type.clear();
    filters.language.clear(); filters.tag.clear();
    searchQuery = ''; sortKey = 'name'; slice = { kind: 'all' };
    view = 'start'; postsSort = 'engagement'; postsTab = 'all'; aboutSection = 'about'; startSection = 'intro'; startStep = 1; pendingChosenInstHost = ''; postHashtags.clear();
    appsSort = 'users'; appsTab = 'all'; appsFacets.type.clear(); appsFacets.equiv.clear(); appsFacets.czech.clear(); appsFacets.managed.clear(); appsFacets.dev.clear();
    instanceTab = 'all'; searchTab = 'all'; instanceSort = 'users'; pendingSearchQ = '';
    instanceFacets.region.clear(); instanceFacets.app.clear(); instanceFacets.focus.clear(); instanceFacets.reg.clear(); instanceFacets.size.clear();
    linkTypes.clear(); linkLangs.clear(); linkThemes.clear(); linksSort = 'recommended';
    glossarySort = 'order'; glossaryFacets.level.clear(); glossaryFacets.theme.clear(); glossaryFacets.type.clear();
    pendingGlossarySlug = ''; glossaryOpenSlug = '';
    toolsTab = 'all'; toolsFacets.category.clear(); toolsFacets.platform.clear(); toolsFacets.forApp.clear(); toolsFacets.price.clear();
    statsTab = 'overview'; statsPeriod = 'all'; statsRegion = 'global'; statsSeries.clear();

    hash.split('&').forEach(function (pair) {
      // Holé tokeny bez "=" (např. starší #posty / #ucty) → přepínač pohledu.
      if (/^(start|about|search|instance|odkazy|aplikace|slovnicek|nastroje|statistiky)$/.test(pair)) { view = pair; return; }
      var i = pair.indexOf('=');
      if (i === -1) return;
      var key = pair.slice(0, i);
      var val = dec(pair.slice(i + 1));
      switch (key) {
        case 'family': splitList(val).forEach(function (v) { filters.family.add(v); }); break;
        case 'type': splitList(val).forEach(function (v) { filters.type.add(v); }); break;
        case 'lang': splitList(val).forEach(function (v) { filters.language.add(v); }); break;
        case 'tag': splitList(val).forEach(function (v) { filters.tag.add(v); }); break;
        case 'q': searchQuery = val.toLowerCase(); break;
        case 'sort': if (/^(name|followers|posts|added)$/.test(val)) sortKey = val; break;
        case 'slice': slice = parseSlice(val); break;
        case 'account': pendingAccountId = val; break;
        case 'view': if (/^(start|about|search|instance|odkazy|aplikace|slovnicek|nastroje|statistiky)$/.test(val)) view = val; break;
        case 'sq': pendingSearchQ = val; break;
        case 'psort': if (/^(engagement|reblogs|favourites|date|date_asc)$/.test(val)) postsSort = val; break;
        case 'ptab': if (/^(all|10|50|risers_ratio|risers_abs)$/.test(val)) postsTab = val; break;
        case 'itab': if (/^(all|beginner|users)$/.test(val)) instanceTab = val; break;
        case 'isort': if (/^(name|users|registration)$/.test(val)) instanceSort = val; break;
        case 'irg': splitList(val).forEach(function (v) { instanceFacets.region.add(v); }); break;
        case 'iapp': splitList(val).forEach(function (v) { instanceFacets.app.add(v); }); break;
        case 'ifoc': splitList(val).forEach(function (v) { instanceFacets.focus.add(v); }); break;
        case 'ireg': splitList(val).forEach(function (v) { instanceFacets.reg.add(v); }); break;
        case 'isz': splitList(val).forEach(function (v) { instanceFacets.size.add(v); }); break;
        case 'ltype': splitList(val).forEach(function (v) { linkTypes.add(v); }); break;
        case 'llang': splitList(val).forEach(function (v) { linkLangs.add(v); }); break;
        case 'lth': splitList(val).forEach(function (v) { linkThemes.add(v); }); break;
        case 'lsort': if (/^(recommended|alpha|lang)$/.test(val)) linksSort = val; break;
        case 'stab': if (/^(all|10|50|risers_ratio|risers_abs)$/.test(val)) searchTab = val; break;
        case 'asec': if (/^(about|search|instance|apps|tools|links|tech|author|faq|faq-novacci)$/.test(val)) aboutSection = val; break;
        case 'ssec': if (/^[a-z0-9_]+$/.test(val)) startSection = val; break;
        case 'step': if (/^[1-6]$/.test(val)) startStep = Number(val); break;
        case 'inst': if (/^[a-z0-9.-]+$/i.test(val)) pendingChosenInstHost = val; break;
        case 'asort': if (/^(name|users|instances)$/.test(val)) appsSort = val; break;
        case 'atab': if (/^(all|users|instances|risers|new)$/.test(val)) appsTab = val; break;
        case 'atype': splitList(val).forEach(function (v) { appsFacets.type.add(v); }); break;
        case 'aeq': splitList(val).forEach(function (v) { appsFacets.equiv.add(v); }); break;
        case 'acz': splitList(val).forEach(function (v) { appsFacets.czech.add(v); }); break;
        case 'amh': splitList(val).forEach(function (v) { appsFacets.managed.add(v); }); break;
        case 'adev': splitList(val).forEach(function (v) { appsFacets.dev.add(v); }); break;
        case 'gsort': if (/^(order|alpha|theme)$/.test(val)) glossarySort = val; break;
        case 'glvl': splitList(val).forEach(function (v) { glossaryFacets.level.add(v); }); break;
        case 'gth': splitList(val).forEach(function (v) { glossaryFacets.theme.add(v); }); break;
        case 'gtyp': splitList(val).forEach(function (v) { glossaryFacets.type.add(v); }); break;
        case 'heslo': if (/^[a-z0-9-]+$/.test(val)) pendingGlossarySlug = val; break;
        case 'ttab': if (/^(all|featured|new)$/.test(val)) toolsTab = val; break;
        case 'tcat': splitList(val).forEach(function (v) { toolsFacets.category.add(v); }); break;
        case 'tplat': splitList(val).forEach(function (v) { toolsFacets.platform.add(v); }); break;
        case 'tfa': splitList(val).forEach(function (v) { toolsFacets.forApp.add(v); }); break;
        case 'tprice': splitList(val).forEach(function (v) { toolsFacets.price.add(v); }); break;
        case 'sttab': if (/^(overview|apps|growth|czsk)$/.test(val)) statsTab = val; break;
        case 'sper': if (/^(365|730|all)$/.test(val)) statsPeriod = val; break;
        case 'sreg': if (/^(global|czsk)$/.test(val)) statsRegion = val; break;
        case 'sser': splitList(val).forEach(function (v) { statsSeries.add(v); }); break;
        case 'phash': splitList(val).forEach(function (v) { postHashtags.add(v); }); break;
      }
    });
  }

  // Otevře modal účtu odkazovaného přes #account=<id> (per-účet sdílecí stub).
  function maybeOpenPendingAccount() {
    if (!pendingAccountId) return;
    var id = pendingAccountId;
    pendingAccountId = null;
    for (var i = 0; i < records.length; i++) {
      if (records[i].id === id) { openModal(records[i]); return; }
    }
  }

  function onHashChange() {
    if (suppressHash) return;
    parseHash();
    applyStateToControls();
    render();
    maybeOpenPendingAccount();
  }

  // Promítne stav (z hashe) do ovládacích prvků v sidebaru.
  function applyStateToControls() {
    document.querySelectorAll('.filter-group button[data-value]').forEach(function (btn) {
      var section = btn.closest('.filter-group').getAttribute('data-filter');
      var set = filters[section];
      btn.classList.toggle('active', !!(set && set.has(btn.getAttribute('data-value'))));
    });
    // Filtry Odkazů (data-ltype / data-llang) podle stavu z hashe.
    document.querySelectorAll('#links-type-group button[data-ltype]').forEach(function (btn) {
      btn.classList.toggle('active', linkTypes.has(btn.getAttribute('data-ltype')));
    });
    document.querySelectorAll('#links-lang-group button[data-llang]').forEach(function (btn) {
      btn.classList.toggle('active', linkLangs.has(btn.getAttribute('data-llang')));
    });
    document.querySelectorAll('#links-theme-group button[data-ltheme]').forEach(function (btn) {
      btn.classList.toggle('active', linkThemes.has(btn.getAttribute('data-ltheme')));
    });
    if (linksSortEl) linksSortEl.value = linksSort;
    searchEl.value = searchQuery;
    sortEl.value = sortKey;
    if (postsSortEl) postsSortEl.value = postsSort;
    if (searchQEl) searchQEl.value = pendingSearchQ || '';
    applyView();  // applyView volá updatePostsTabsUI() / renderSearch()
  }

  // ========================================================
  // Slice (de)serializace
  // ========================================================
  function parseSlice(str) {
    if (!str || str === 'all') return { kind: 'all' };
    var p = str.split(':');
    if (p[0] === 'platform') return { kind: 'platform', value: p[1] };
    if (p[0] === 'recent') return { kind: 'recent' };
    if (p[0] === 'top') return { kind: 'top', metric: p[1], count: parseInt(p[2], 10) || 10 };
    return { kind: 'all' };
  }

  function sliceToString(s) {
    if (s.kind === 'platform') return 'platform:' + s.value;
    if (s.kind === 'recent') return 'recent';
    if (s.kind === 'top') return 'top:' + s.metric + ':' + s.count;
    return 'all';
  }

  // ========================================================
  // Reset
  // ========================================================
  function resetAll() {
    filters.family.clear(); filters.type.clear();
    filters.language.clear(); filters.tag.clear();
    searchQuery = ''; searchEl.value = '';
    sortKey = 'name'; sortEl.value = 'name';
    slice = { kind: 'all' };
    tagInputEl.value = '';
    document.querySelectorAll('.filter-group button.active')
      .forEach(function (b) { b.classList.remove('active'); });
    render();
  }

  // ========================================================
  // Datum / čas
  // ========================================================
  function daysSince(iso) {
    if (!iso) return null;
    var then = new Date(iso + 'T00:00:00');
    if (isNaN(then.getTime())) return null;
    return Math.floor((Date.now() - then.getTime()) / 86400000);
  }

  // Aktivní účet = poslední příspěvek do ACTIVE_DAYS dní. Bez údaje (null =
  // nikdy nepostnul) → neaktivní/skrytý; jakmile postne, refresh doplní datum
  // a účet se zase objeví.
  function isActive(r) {
    var d = daysSince(r.last_status_at);
    return d !== null && d <= ACTIVE_DAYS;
  }

  function plural(n, one, few, many) {
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return few;
    return many;
  }

  // "přidán před X" / "added X ago" — větvíme podle jazyka (čeština má složitější
  // skloňování než angličtina).
  function relAdded(iso) {
    var d = daysSince(iso);
    if (d === null) return '';
    if (lang === 'en') {
      if (d <= 0) return 'added today';
      if (d === 1) return 'added yesterday';
      if (d < 31) return 'added ' + d + ' days ago';
      var em = Math.round(d / 30);
      if (em < 12) return 'added ' + em + (em === 1 ? ' month ago' : ' months ago');
      var ey = Math.round(d / 365);
      return 'added ' + ey + (ey === 1 ? ' year ago' : ' years ago');
    }
    if (d <= 0) return 'přidán dnes';
    if (d === 1) return 'přidán včera';
    if (d < 31) return 'přidán před ' + d + ' ' + plural(d, 'dnem', 'dny', 'dny');
    var m = Math.round(d / 30);
    if (m < 12) return 'přidán před ' + m + ' ' + plural(m, 'měsícem', 'měsíci', 'měsíci');
    var y = Math.round(d / 365);
    return 'přidán před ' + y + ' ' + plural(y, 'rokem', 'lety', 'lety');
  }

  // Čas posledního buildu vyhledávacího indexu z malého data/status.json (mění se denně).
  function renderSearchIndexed() {
    fetch('data/status.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (s) {
        if (!s) return;
        if (s.search_indexed) {
          var d = new Date(s.search_indexed);
          var el = document.getElementById('indexed-date');
          var wrap = document.getElementById('footer-indexed');
          if (!isNaN(d.getTime()) && el && wrap) {
            var mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            el.textContent = d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear() + ' ' + d.getHours() + ':' + mm;
            wrap.hidden = false;
          }
        }
        if (s.catalog_updated) {                            // datum katalogu — dynamicky (jinak fallback v HTML)
          var cd = new Date(s.catalog_updated);
          if (!isNaN(cd.getTime())) {
            var ce = document.getElementById('catalog-date');
            if (ce) ce.textContent = cd.getDate() + '. ' + (cd.getMonth() + 1) + '. ' + cd.getFullYear();
            document.body.setAttribute('data-updated', cd.toISOString().slice(0, 10));
            renderUpdatedRelative();
          }
        }
        var fmtD = function(iso) {
          if (!iso) return null;
          var d = new Date(iso);
          return isNaN(d.getTime()) ? null : d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
        };
        var updParts = [];
        var statsD = fmtD(s.catalog_updated);
        var instD = fmtD(s.instances_updated);
        var toolsD = fmtD(window.FEDIK_TOOLS_BUILT);
        if (statsD) updParts.push(t('footer_updates_apps') + ' ' + statsD);
        if (instD) updParts.push(t('footer_updates_instances') + ' ' + instD);
        if (toolsD) updParts.push(t('footer_updates_tools') + ' ' + toolsD);
        if (statsD) updParts.push(t('footer_updates_stats') + ' ' + statsD);
        var updEl = document.getElementById('footer-updates');
        if (updEl && updParts.length) {
          updEl.textContent = t('footer_updates') + ' ' + updParts.join(', ');
          updEl.hidden = false;
        }
      })
      .catch(function () {});
  }

  function renderUpdatedRelative() {
    var el = document.getElementById('updated-relative');
    if (!el) return;
    var iso = document.body.getAttribute('data-updated');
    var d = daysSince(iso);
    if (d === null) return;
    var txt;
    if (lang === 'en') {
      txt = d <= 0 ? '(today)' : d === 1 ? '(yesterday)' : '(' + d + ' days ago)';
    } else if (d <= 0) {
      txt = '(dnes)';
    } else if (d === 1) {
      txt = '(včera)';
    } else {
      txt = '(před ' + d + ' ' + plural(d, 'dnem', 'dny', 'dny') + ')';
    }
    el.textContent = ' ' + txt;
  }

  // ========================================================
  // Utils
  // ========================================================
  function formatNumber(n) {
    return String(n == null ? 0 : n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  function setList(set) { return Array.from(set).join(','); }
  function splitList(s) { return s.split(',').filter(Boolean); }
  function enc(s) { return encodeURIComponent(s); }
  function dec(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }
})();
