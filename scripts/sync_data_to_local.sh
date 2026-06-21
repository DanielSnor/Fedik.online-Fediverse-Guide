#!/usr/bin/env bash
# ============================================================
# Fedík: Sync Data Prod → Local (na Mac)
# ============================================================
# Stáhne GENEROVANÁ data z PRODUKCE na Mac, ať lokální dev vidí čerstvá čísla.
# Opak sync_local_to_test.sh (ten tlačí KÓD nahoru). Stahuje POUZE data, která
# NEJSOU zdroj pravdy (přesně to, co je v .gitignore jako „generované"):
#   web/data/*                       (app-stats.json, instances.json, czsk-stats.json,
#                                     stat-snapshots.json, status.json)
#   data/app-stats-snapshot.json
#   data/tools/upstream-report.json
#
# CHRÁNÍ (záměrně NEtahá / nepřepíše):
#   • web/data/slonik-instances.json — lokální SYMLINK na Sloník repo
#   • zdrojové seedy v gitu          — data/glossary, data/links, data/tools/*
#   • kód, config                    — nic z toho se nestahuje
#   • bez --delete                   — nic lokálně nemaže
#
# Zdroj: vždy PRODUKCE. Prod cesta = FEDIK_REMOTE_DIR bez sufixu „-test"
# (přebij FEDIK_REMOTE_PROD_DIR). Konfigurace: scripts/deploy.env (stejná
# jako sync_local_to_test.sh).
#
# Použití:
#   ./scripts/sync_data_to_local.sh --dry-run      # náhled (nic nezmění)
#   ./scripts/sync_data_to_local.sh                # stáhne prod data na Mac
# ============================================================
set -euo pipefail

LOCAL_DIR="$(cd "$(dirname "$0")/.." && pwd)"

ENV_FILE="$LOCAL_DIR/scripts/deploy.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "Chybí $ENV_FILE — zkopíruj scripts/deploy.env.example a vyplň SSH souřadnice."
  exit 1
fi
# shellcheck source=/dev/null
source "$ENV_FILE"

REMOTE="${FEDIK_REMOTE:?FEDIK_REMOTE není v deploy.env}"
PORT="${FEDIK_REMOTE_PORT:-}"           # prázdné = ber z ~/.ssh/config (alias)
TEST_DIR="${FEDIK_REMOTE_DIR:?FEDIK_REMOTE_DIR není v deploy.env}"
RSYNC_PATH="${FEDIK_RSYNC_PATH:-rsync}"
EXTRA_SSH="${FEDIK_SSH_OPTS:-}"         # volitelné (např. -i ~/.ssh/id_ed25519)

# Prod dir = test dir bez sufixu „-test" (lze přebít v deploy.env).
PROD_DIR="${FEDIK_REMOTE_PROD_DIR:-${TEST_DIR%-test}}"

# --- argumenty ---
DRY=""
for a in "$@"; do
  case "$a" in
    --dry-run) DRY="--dry-run" ;;
    *) echo "neznámý argument: $a"; exit 1 ;;
  esac
done

SRC_DIR="$PROD_DIR"

# Když PROD cestu nešlo odvodit (FEDIK_REMOTE_DIR nekončí na „-test"), nehádej.
if [ "$SRC_DIR" = "$TEST_DIR" ]; then
  echo "Nepodařilo se odvodit PROD cestu z FEDIK_REMOTE_DIR ($TEST_DIR)."
  echo "Nastav FEDIK_REMOTE_PROD_DIR v scripts/deploy.env."
  exit 1
fi

# --- SSH master spojení (reuse pro všechna rsync volání) ---
CTRL="/tmp/fedik-pull-$$"
PORT_OPT=""; [ -n "$PORT" ] && PORT_OPT="-p $PORT"
SSH_OPTS="$PORT_OPT $EXTRA_SSH -o ServerAliveInterval=30 -o ServerAliveCountMax=3 \
-o ControlMaster=auto -o ControlPath=$CTRL -o ControlPersist=120"
ssh $SSH_OPTS "$REMOTE" true 2>/dev/null || true
trap 'ssh -O exit -o ControlPath=$CTRL "$REMOTE" 2>/dev/null; true' EXIT

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
[ -n "$DRY" ] && echo -e "${YELLOW}=== DRY-RUN (nic se nezmění) ===${NC}\n"

# rsync helper: BEZ --delete (nikdy nic lokálně nemaže); --rsync-path platí pro
# čtení na serveru (sudo rsync). slonik-instances.json je vyloučen níže přímo.
rs() { rsync -avz $DRY --exclude='.DS_Store' \
       --rsync-path="$RSYNC_PATH" -e "ssh $SSH_OPTS" "$@"; }

echo "============================================================"
echo -e "  ${CYAN}Pull dat z PRODU: $REMOTE:$SRC_DIR → $LOCAL_DIR${NC}"
echo "============================================================"
echo ""

# 1) web/data/ — živé stats JSONy. slonik-instances.json je LOKÁLNÍ SYMLINK
#    (na Sloník repo) → vynechat, jinak by ho server přepsal reálným souborem.
echo -e "${CYAN}== web/data/ (mimo slonik-instances.json) ==${NC}"
rs --exclude='slonik-instances.json' "$REMOTE:$SRC_DIR/web/data/" "$LOCAL_DIR/web/data/"
echo ""

# 2) data/ — JEN generované soubory. Zbytek (glossary/, links/, tools/*) jsou
#    zdrojové seedy v gitu → NETAHÁME je, abychom nepřepsali lokální úpravy.
echo -e "${CYAN}== data/app-stats-snapshot.json ==${NC}"
rs "$REMOTE:$SRC_DIR/data/app-stats-snapshot.json" "$LOCAL_DIR/data/" \
  || echo "  (na serveru není — přeskočeno)"
echo ""

echo -e "${CYAN}== data/tools/upstream-report.json ==${NC}"
rs "$REMOTE:$SRC_DIR/data/tools/upstream-report.json" "$LOCAL_DIR/data/tools/" \
  || echo "  (na serveru není — přeskočeno)"
echo ""

# --- shrnutí ---
echo "============================================================"
if [ -n "$DRY" ]; then
  echo -e "${YELLOW}=== DRY-RUN — žádné změny ===${NC}"
else
  echo -e "${GREEN}=== Data prod → local stažena ===${NC}"
fi
echo -e "Nedotčeno lokálně: ${CYAN}kód, zdrojové seedy (glossary/links/tools), web/data/slonik-instances.json${NC}"
