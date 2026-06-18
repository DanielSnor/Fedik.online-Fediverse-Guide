#!/usr/bin/env ruby
# frozen_string_literal: true

# =============================================================================
# bin/refresh_app_stats.rb — živá vrstva čísel pro Pohled 2 „Aplikace".
#
# Stáhne z FediDB API (api.fedidb.org) počty uživatelů / instancí / MAU / postů
# pro každý fediverse software a uloží je do web/data/app-stats.json. Klient
# (web/app.js → renderApps) je páruje s editorním katalogem web/apps.js přes
# `fedidbSlug`; chybějící mapování zobrazí jako „—".
#
# Editorní data se NEMĚNÍ — tohle je jen vrstva čísel (spouštěj periodicky, cron).
#
# Spuštění:  ruby bin/refresh_app_stats.rb
# =============================================================================

require "json"
require "net/http"
require "uri"
require "time"
require "fileutils"
require_relative "../lib/paths"

API  = ENV["FEDIDB_API"] || "https://api.fedidb.org/v1/software?limit=300"
OUT  = File.join(Paths::WEB_DIR, "data", "app-stats.json")
# Snímek minulého běhu (interní, mimo web) — pro žebříček „Nejrychleji rostoucí".
# Vzor Sloníka: data/metrics_snapshot.json (slug -> { users, instances, at }).
SNAP = ENV["APP_SNAPSHOT_PATH"] || File.join(Paths::DATA_DIR, "app-stats-snapshot.json")

def fetch_json(url)
  uri = URI(url)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = (uri.scheme == "https")
  http.open_timeout = 15
  http.read_timeout = 30
  req = Net::HTTP::Get.new(uri)
  req["Accept"] = "application/json"
  req["User-Agent"] = "Fedik.online app-stats/1.0 (+https://fedik.online)"
  res = http.request(req)
  raise "HTTP #{res.code} z #{url}" unless res.is_a?(Net::HTTPSuccess)
  JSON.parse(res.body)
end

list = fetch_json(API)
abort("❌ Neočekávaný tvar odpovědi FediDB (čekáno pole).") unless list.is_a?(Array)

snap = (JSON.parse(File.read(SNAP, encoding: "UTF-8")) rescue {})
snap = {} unless snap.is_a?(Hash)

now = Time.now
apps = {}
grown = 0
list.each do |s|
  # slug = poslední segment url (https://fedidb.org/software/<slug>) — join klíč na apps.js.fedidbSlug
  slug = (s["url"] || s["details_url"] || "").to_s.split("/").last.to_s.strip
  next if slug.empty?
  users = s["user_count"]
  instances = s["instance_count"]
  rec = {
    "users"     => users,
    "instances" => instances,
    "mau"       => s["monthly_active_users"],
    "posts"     => s["status_count"],
    "growth"    => nil,   # uživatelů/týden (abs), null = zatím neměřeno
    "growthPct" => nil,   # %/týden (relativní) — pořadí žebříčku „Nejrychleji rostoucí"
  }
  # Týdenní přírůstek proti minulému snímku (vzor Sloníkových „Skokanů").
  prev = snap[slug]
  if prev.is_a?(Hash) && users && prev["users"].is_a?(Numeric) && prev["users"] > 0
    days = prev["at"] ? ((now - Time.parse(prev["at"])) / 86_400.0) : 7.0
    if days >= 0.5
      delta = users - prev["users"]
      rec["growth"] = ((delta / days) * 7.0).round
      rec["growthPct"] = (((delta.to_f / prev["users"]) / days) * 7.0 * 100).round(2)
      grown += 1
    end
  end
  apps[slug] = rec
  snap[slug] = { "users" => users, "instances" => instances, "at" => now.iso8601 } if users || instances
end

out = {
  "source"     => "FediDB (api.fedidb.org)",
  "updatedAt"  => "#{now.day}. #{now.month}. #{now.year}", # zobrazované datum (vzor Sloníka)
  "updatedIso" => now.utc.strftime("%Y-%m-%dT%H:%M:%SZ"),
  "apps"       => apps,
}

FileUtils.mkdir_p(File.dirname(OUT))
File.write("#{OUT}.tmp", JSON.pretty_generate(out))
File.rename("#{OUT}.tmp", OUT) # atomický zápis (vzor build_instances.rb)

FileUtils.mkdir_p(File.dirname(SNAP))
File.write("#{SNAP}.tmp", JSON.pretty_generate(snap))
File.rename("#{SNAP}.tmp", SNAP)

warn "Zapsáno #{OUT}: #{apps.size} aplikací (zdroj FediDB, #{out['updatedAt']}); přírůstek u #{grown}."
