# Fedík — průvodce Fediverse

![Maskot Fedík.online](https://github.com/DanielSnor/Fedik.online-Fediverse-Guide/blob/master/web/img/header.png 'Maskot Fedík.online')

Statický průvodce světem Fediverse pro česky mluvící uživatele. Publikováno na **fedik.online**.

Pomáhá nováčkům zorientovat se: co je Fediverse, kde si otevřít účet, jaké platformy a klienty použít. Data o aplikacích jsou kurátorsky spravovaná, živé statistiky instancí se tahají z [FediDB](https://fedidb.org/).

## Stack

- **Web:** statické HTML/CSS/JS (`web/`)
- **Backend:** Ruby skripty pro statistiky a build
- **Deploy:** Cloudron Surfer (Files API)
- **Katalog klientů:** TypeScript datové soubory + build krok

## Struktura

```
bin/                  Ruby skripty (build, deploy, serve, statistiky)
config/               Konfigurace (instances.txt, crontab.example, …)
data/glossary/        Zdrojová data Slovníčku
data/links/           Zdrojová data sekce Odkazy
data/tools/           Zdrojová data katalogu klientů a nástrojů
lib/                  Ruby knihovny
logs/                 Logy na serveru (není commitováno)
scripts/              Build a sync skripty (mjs + bash)
web/                  Statický web (HTML, CSS, JS, img)
web/data/             JSONová data generovaná na serveru (není commitováno)
```

## Konfigurace

### config.env (runtime, na serveru)
```bash
cp config.env.example config.env
```
Vyplň `SURFER_URL`, `SURFER_TOKEN` a `SURFER_REMOTE_DIR`. Soubor je v `.gitignore` — nikdy se necommituje.

### scripts/deploy.env (jen pro sync z Macu na server)
```bash
cp scripts/deploy.env.example scripts/deploy.env
```
Vyplň `FEDIK_REMOTE` (alias ze `~/.ssh/config` nebo `user@host`) a `FEDIK_REMOTE_DIR`.

## Lokální preview

```bash
ruby bin/serve.rb 8765 web/
# → http://localhost:8765
```

## Aktualizace dat

### Aplikace a klienti (ručně, občas)

```bash
node scripts/check-upstream.mjs
```

Skript stáhne `software.json` a `apps.json` z communityDB (FediDB), přegeneruje zdrojové soubory a zapíše přehled nových/odstraněných položek do `data/tools/upstream-report.json`. Nové položky pak začlenit ručně:

| Co přidat | Kam |
|---|---|
| Nová aplikace (platforma) | `web/apps.js` — doplnit `czechUI`, `devStatus`, `centralizedEquivalent` |
| Nový klient | automaticky v `data/tools/tools.generated.ts`; CS popis → `data/tools/descriptions.i18n.js`, logo → `data/tools/logos.js` |
| Sloučit dvě generated karty do jedné | přidat id do `data/tools/tools.suppress.json` + vytvořit ruční záznam v `data/tools/tools.manual.ts` |
| Nový ruční nástroj (most, RSS, …) | `data/tools/tools.manual.ts` |

Po každé změně v nástrojích/klientech znovu sestavit:

```bash
node scripts/build_tools.mjs
```

### Statistiky (automaticky na serveru)

Cron běží denně v **07:30 CET** (`refresh-stats.sh`):
1. `bin/refresh_app_stats.rb` — stáhne počty z FediDB → `web/data/app-stats.json`
2. `bin/build_stat_history.rb` — snímky pro grafy → `web/data/stat-snapshots.json`, `czsk-stats.json`
3. `deploy-web.sh --data` — nahraje datové JSONy na Surfer (test i prod)

> Záložka „Nejrychleji rostoucí" potřebuje alespoň dva snímky vzdálené 12+ hodin. Poprvé se naplní den po prvním manuálním spuštění.

## Klíčové datové soubory

| Soubor | Obsah |
|---|---|
| `web/apps.js` | Kurátorský katalog aplikací (Pohled 2) — ručně udržovaný |
| `web/apps.generated.js` | Návrh z communityDB — jen pro review, necommituje se |
| `data/tools/tools.manual.ts` | Klienti a nástroje — ruční záznamy |
| `data/tools/tools.generated.ts` | Klienti z communityDB (auto-generované) |
| `data/tools/tools.suppress.json` | ID klientů z generated potlačených ve prospěch ruční karty |
| `data/tools/descriptions.i18n.js` | CS překlady popisů klientů |
| `data/tools/logos.js` | Mapování ID → cesta k logu |
| `config/instances.txt` | Seznam CZ/SK instancí (vstup pro build_instances) |

## Deploy

### Test (z Macu)

```bash
bash scripts/sync_local_to_test.sh
```

Pak na serveru:
```bash
./deploy-web.sh --assets
```

Nebo v jednom příkazu:
```bash
ssh -p 202 user@server "sudo docker exec <container> bash -c 'cd /app/data/fedik-test && ./deploy-web.sh --assets 2>&1 | tail -3'"
```

### Produkce — web assety (ze serveru, z test složky)

```bash
SURFER_REMOTE_DIR="" ruby bin/deploy_web.rb --assets
```

### Produkce — datové JSONy

```bash
SURFER_REMOTE_DIR="" ruby bin/deploy_web.rb --data
```

### Promote kódu test → prod (na serveru, v kontejneru)

```bash
./scripts/sync_test_to_prod.sh
# nebo náhled: ./scripts/sync_test_to_prod.sh --dry-run
```

### Sync dat prod → test (na serveru, v kontejneru)

```bash
./scripts/sync_data_to_test.sh
```

### Sync dat prod → local (z Macu)

Stáhne čerstvá generovaná data z **produkce** na Mac pro lokální dev. Tahá jen
`web/data/*` a generované soubory v `data/` — chrání lokální symlink Sloníka
i zdrojové seedy (glossary/links/tools).

```bash
./scripts/sync_data_to_local.sh             # stáhne prod data na Mac
# nebo náhled: ./scripts/sync_data_to_local.sh --dry-run
```

## Licence

[LICENSE](LICENSE)
