# design/

`img-src/` — originály obrázků webu (PNG/JPG v plném rozlišení, `.afphoto` zdroje Affinity;
ty jsou v `.gitignore`). Web servíruje jen zmenšené WebP v `web/img/`, generuje je
`scripts/build_images.py`. Po úpravě originálu skript spusť a WebP commitni.

Nepoužité na webu (zatím): `fedik-jsem-cool.png`, `fedik-reference.png`, `fedik-s-lupou.png`, `card-dictionary.png`.
