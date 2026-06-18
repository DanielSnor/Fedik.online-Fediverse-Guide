#!/usr/bin/env ruby
# frozen_string_literal: true

# =============================================================================
# bin/build_stat_history.rb — sdílený snímkovací sklad pro Pohled 6 „Statistiky".
#
# ŽÁDNÝ NOVÝ ZDROJ DAT. Staví výhradně nad vrstvami, které už existují:
#   • Přehled / Podle aplikací / síťový růst → web/data/app-stats.json
#       (vyrábí bin/refresh_app_stats.rb z FediDB — Pohled 2; tady jen ukládáme HISTORII)
#   • CZ/SK výřez → web/data/slonik-instances.json  (symlink na kurátorskou sadu
#       Sloníka — Pohled 3; per-instance `users`/`active_month` pochází z NodeInfo)
#
# Spouštěj hned PO refresh_app_stats.rb (viz refresh-stats.sh). Append + dedup
# podle (scope|key|takenAt), takže opakovaný běh nad stejným snímkem nic nezdvojí.
#
# Výstupy (servírované, s cache — dashboard nemusí být realtime):
#   web/data/stat-snapshots.json   StatSnapshot[] — historie (network|app|czsk)
#   web/data/czsk-stats.json       aktuální CZ/SK souhrn + výhrada o dolním odhadu
#
# Spuštění:  ruby bin/build_stat_history.rb
# =============================================================================

require "json"
require "time"
require "set"
require "fileutils"
require_relative "../lib/paths"

APP_STATS = File.join(Paths::WEB_DIR, "data", "app-stats.json")
SLONIK    = File.join(Paths::WEB_DIR, "data", "slonik-instances.json")
SNAPS     = File.join(Paths::WEB_DIR, "data", "stat-snapshots.json")
CZSK_OUT  = File.join(Paths::WEB_DIR, "data", "czsk-stats.json")

TOP_APPS    = 14    # kolik aplikací držet v historii (žebříček + řady růstu)
PRUNE_DAYS  = 1500  # ~4 roky — drží i historii zrekonstruovanou z Internet Archive (jednorázový backfill FediDB/NodeInfo)

def read_json(path)
  JSON.parse(File.read(path, encoding: "UTF-8"))
rescue StandardError
  nil
end

def write_atomic(path, data)
  FileUtils.mkdir_p(File.dirname(path))
  File.write("#{path}.tmp", JSON.pretty_generate(data))
  File.rename("#{path}.tmp", path)
end

def num(v) = v.is_a?(Numeric) ? v : nil

stats = read_json(APP_STATS)
abort("❌ Chybí #{APP_STATS} — spusť nejdřív refresh_app_stats.rb.") unless stats.is_a?(Hash) && stats["apps"].is_a?(Hash)

apps = stats["apps"]
# Jeden běh = jeden časový bod. Bereme čas z FediDB snímku (updatedIso), ne wall-clock,
# ať network/app/czsk sdílí konzistentní takenAt a dedup funguje.
taken = stats["updatedIso"] || Time.now.utc.strftime("%Y-%m-%dT%H:%M:%SZ")

# ── network: součet přes software (stejná vrstva jako Pohled 2; orientační) ──
net = { "users" => 0, "instances" => 0, "posts" => 0, "activeUsers" => 0 }
apps.each_value do |a|
  net["users"]       += num(a["users"])     || 0
  net["instances"]   += num(a["instances"]) || 0
  net["posts"]       += num(a["posts"])     || 0
  net["activeUsers"] += num(a["mau"])       || 0
end

new_snaps = []
new_snaps << {
  "takenAt" => taken, "scope" => "network",
  "users" => net["users"], "instances" => net["instances"],
  "posts" => net["posts"], "activeUsers" => net["activeUsers"]
}

# ── app: top N podle uživatelů ──
apps.sort_by { |_slug, a| -(num(a["users"]) || 0) }.first(TOP_APPS).each do |slug, a|
  snap = { "takenAt" => taken, "scope" => "app", "key" => slug,
           "users" => num(a["users"]) || 0, "instances" => num(a["instances"]) || 0 }
  snap["posts"] = num(a["posts"]) if num(a["posts"])
  snap["activeUsers"] = num(a["mau"]) if num(a["mau"])
  new_snaps << snap
end

# ── czsk: agregace kurátorské CZ/SK sady Sloníka (Pohled 3) ──
czsk_summary = nil
slonik = read_json(SLONIK)
list = slonik.is_a?(Array) ? slonik : (slonik.is_a?(Hash) ? (slonik["instances"] || []) : [])
czsk = list.select { |i| i["czsk"] == true }
if czsk.any?
  cz_users  = czsk.sum { |i| num(i["users"]) || 0 }
  cz_inst   = czsk.size
  cz_mau    = czsk.sum { |i| num(i["active_month"]) || 0 }
  cz_posts  = czsk.sum { |i| num(i["statuses"]) || 0 }
  new_snaps << {
    "takenAt" => taken, "scope" => "czsk",
    "users" => cz_users, "instances" => cz_inst, "posts" => cz_posts, "activeUsers" => cz_mau
  }
  czsk_summary = {
    "source"     => "Sloník.online (kurátorská CZ/SK sada, NodeInfo) — Pohled 3",
    "method"     => "Součet usage.users.total a active_month přes #{cz_inst} CZ/SK instancí ze Sloníka.",
    "caveat"     => "Dolní odhad: počítá jen uživatele NA českých a slovenských instancích, " \
                    "ne Čechy a Slováky na globálních serverech (mastodon.social ad.). " \
                    "Není to počet Čechů na Fediverse, ale počet uživatelů CZ/SK instancí.",
    "approximate" => true,
    "updatedAt"  => stats["updatedAt"] || "#{Time.now.day}. #{Time.now.month}. #{Time.now.year}",
    "updatedIso" => taken,
    "instances"  => cz_inst, "users" => cz_users, "activeUsers" => cz_mau, "posts" => cz_posts
  }
  write_atomic(CZSK_OUT, czsk_summary)
else
  warn "⚠️  Žádné czsk instance v #{SLONIK} — CZ/SK snímek přeskočen (ponechán poslední)."
end

# ── append + dedup (scope|key|takenAt) + prune ──
existing = read_json(SNAPS)
existing = [] unless existing.is_a?(Array)
seen = existing.map { |s| [s["scope"], s["key"], s["takenAt"]].join("|") }.to_set
added = 0
new_snaps.each do |s|
  k = [s["scope"], s["key"], s["takenAt"]].join("|")
  next if seen.include?(k)
  existing << s
  seen << k
  added += 1
end

cutoff = Time.now - (PRUNE_DAYS * 86_400)
existing.select! do |s|
  t = (Time.parse(s["takenAt"]) rescue nil)
  t.nil? || t >= cutoff
end
existing.sort_by! { |s| [s["takenAt"].to_s, s["scope"].to_s, s["key"].to_s] }

write_atomic(SNAPS, existing)

warn "Snímky: +#{added} nových (celkem #{existing.size}) v #{SNAPS}."
warn "CZ/SK: #{czsk_summary ? "#{czsk_summary['users']} uživ. / #{czsk_summary['instances']} instancí (dolní odhad)" : 'přeskočeno'}."
