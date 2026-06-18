#!/usr/bin/env bash
# Živá vrstva čísel + snímkovací sklad pro Pohledy 2/3/6.
#   1) refresh_app_stats  → web/data/app-stats.json (FediDB, Pohled 2)
#   2) build_stat_history → web/data/stat-snapshots.json (historie) + czsk-stats.json (Pohled 6)
#   3) deploy-web --data  → nahraje data JSONy na Surfer
# Krok 2 čte výstup kroku 1 + symlink slonik-instances.json (žádný nový zdroj dat).
#
# Cron (1x denně):  30 7 * * * /cesta/k/refresh-stats.sh
# Logy: logs/refresh-stats.log (jen při neinteraktivním běhu).
set -uo pipefail
cd "$(dirname "$0")"
mkdir -p logs
[ -t 1 ] || exec >> "logs/refresh-stats.log" 2>&1

echo "── refresh-stats $(date -u '+%F %T UTC') ──"
if ruby bin/refresh_app_stats.rb; then
  echo "✅ app-stats hotovo"
else
  echo "⚠️  refresh_app_stats selhal (exit $?) — historie poběží z posledního app-stats.json"
fi
# Historie + CZ/SK jedou i ze staršího app-stats.json (graceful degradace).
if ruby bin/build_stat_history.rb; then
  echo "✅ stat-history hotovo"
else
  echo "⚠️  build_stat_history selhal (exit $?)"
fi
ruby -e "
  require 'json'; require 'time'
  path = 'web/data/status.json'
  s = File.exist?(path) ? JSON.parse(File.read(path)) : {}
  s.delete('search_indexed')
  s['catalog_updated'] = Time.now.utc.iso8601
  if (a = (JSON.parse(File.read('web/data/app-stats.json')) rescue nil))
    s['stats_updated'] = a['updatedIso'] if a['updatedIso']
  end
  if (i = (JSON.parse(File.read('web/data/slonik-instances.json')) rescue nil))
    s['instances_updated'] = i['generated_at'] if i['generated_at']
  end
  File.write(path, JSON.generate(s))
  puts \"✅ status.json: stats=#{s['stats_updated']}, instances=#{s['instances_updated']}\"
"
if ./deploy-web.sh --data; then
  echo "✅ deploy --data hotovo"
else
  echo "⚠️  deploy --data selhal (exit $?)"
fi
