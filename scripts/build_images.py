#!/usr/bin/env python3
"""Vygeneruje web/img/*.webp z originálů v design/img-src/ (a header-og.jpg pro sociální náhledy).

Rozměry = 2× největší CSS velikost (retina): maskoti max 800 px, screenshoty 960 px,
hlavička 1536×1024, QR 440 px bezztrátově. Spouštět po změně originálu:

    python3 -m venv .venv && .venv/bin/pip install pillow && .venv/bin/python scripts/build_images.py
"""
import pathlib
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, DST = ROOT / 'design' / 'img-src', ROOT / 'web' / 'img'
MASCOT, SHOT, Q = 800, 960, 82

PLAN = {
    'header.png': ((1536, 1024), Q),
    **{f'{n}.png': ((MASCOT, MASCOT), Q) for n in (
        'fedik-na-tohle-se-podivej-dolu', 'fedik-nevim-co-dal', 'fedik-nemusis-se-bat', 'fedik-kterou-raketu',
        'fedik-odkud-prichazis', 'fedik-stavi-zakladnu', 'fedik-tabule-ukolu', 'fedik-posadka-pro-zakladnu',
        'fedik-tools', 'fedik-se-slovnikem', 'fedik-grafy', 'fedik-majak', 'fedik-s-dalekohledem')},
    **{f'{n}.png': ((SHOT, SHOT), Q) for n in (
        'card-applications', 'card-tools', 'card-instance', 'card-links', 'card-statistics', 'search-results')},
    'daniel.jpg': ((MASCOT, MASCOT), Q),
}

def main():
    for name, (box, q) in PLAN.items():
        im = Image.open(SRC / name)
        im.thumbnail(box, Image.LANCZOS)
        out = DST / (name.rsplit('.', 1)[0] + '.webp')
        im.save(out, 'WEBP', quality=q, method=6)
        print(f'{name:36} -> {out.name:36} {out.stat().st_size // 1024:4} KB {im.size[0]}x{im.size[1]}')
    im = Image.open(SRC / 'qr.jpg').convert('RGB'); im.thumbnail((440, 440), Image.LANCZOS)
    im.save(DST / 'qr.webp', 'WEBP', lossless=True, method=6)
    im = Image.open(SRC / 'header.png').convert('RGB')
    im.save(DST / 'header-og.jpg', 'JPEG', quality=85, optimize=True, progressive=True)
    print('qr.webp + header-og.jpg hotovo')

if __name__ == '__main__':
    main()
