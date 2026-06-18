#!/usr/bin/env bash
# ============================================================
# Fedík: Sync Data Prod → Test (na serveru)
# ============================================================
# Zkopíruje POUZE datové soubory z PROD do TEST instance. Spouští se přímo
# na serveru (v kontejneru) — rsync běží lokálně bez SSH.
#   data/                 (snapshoty, instance_topics, app-stats-snapshot…)
#   web/data/             (app-stats.json, instances.json, status.json…)
# NEpřenáší kód, config.env ani config/ — jen data. Bez --delete.
#
# ⚠️ Přepíše datové soubory v TESTU verzí z produkce (test data jsou
#    znovuobnovitelná dávkovými skripty).
#
# Použití:
#   ./scripts/sync_data_to_test.sh --dry-run   # náhled (nic nezmění)
#   ./scripts/sync_data_to_test.sh             # zkopíruje data prod → test
# ============================================================
set -euo pipefail

PROD_DIR="/app/data/fedik"
TEST_DIR="/app/data/fedik-test"

DRY=""
for a in "$@"; do
  case "$a" in
    --dry-run) DRY="--dry-run" ;;
    *) echo "neznámý argument: $a"; exit 1 ;;
  esac
done

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
[ -n "$DRY" ] && echo -e "${YELLOW}=== DRY-RUN (nic se nezmění) ===${NC}\n"

echo "============================================================"
echo -e "  ${CYAN}Data (na serveru): $PROD_DIR → $TEST_DIR${NC}"
echo "============================================================"
echo ""

echo -e "${CYAN}== data/ ==${NC}"
rsync -av $DRY --exclude='.DS_Store' "$PROD_DIR/data/" "$TEST_DIR/data/"
echo ""

echo -e "${CYAN}== web/data/ ==${NC}"
rsync -av $DRY "$PROD_DIR/web/data/" "$TEST_DIR/web/data/"
echo ""

echo "============================================================"
if [ -n "$DRY" ]; then
  echo -e "${YELLOW}=== DRY-RUN — žádné změny ===${NC}"
else
  echo -e "${GREEN}=== Data prod → test zkopírována ===${NC}"
fi
echo -e "Přeneseno: ${CYAN}data/ + web/data/${NC}  (kód a config beze změny)"
