#!/usr/bin/env python3
"""Esporta i template come file HTML singoli e autonomi (CSS, font e script incorporati).

Utile per inviare una grafica per email o caricarla su piattaforme che accettano
un solo file. Nessuna dipendenza esterna: basta Python 3.

Uso:
    python3 scripts/esporta-standalone.py              # tutti i template
    python3 scripts/esporta-standalone.py swot gantt   # solo quelli che contengono questi nomi

I file finiscono in dist/<categoria>-<template>.html (cartella esclusa da git).
"""
import base64
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dist"


def inline_css(css_path: Path) -> str:
    css = css_path.read_text(encoding="utf-8")

    def font(m):
        f = (css_path.parent / m.group(1)).resolve()
        data = base64.b64encode(f.read_bytes()).decode("ascii")
        return f'url("data:font/woff2;base64,{data}")'

    return re.sub(r'url\("([^"]+\.woff2)"\)', font, css)


def export(src: Path) -> Path:
    html = src.read_text(encoding="utf-8")

    def link(m):
        path = (src.parent / m.group(1)).resolve()
        return f"<style>\n{inline_css(path)}\n</style>"

    def script(m):
        path = (src.parent / m.group(1)).resolve()
        code = path.read_text(encoding="utf-8").replace("</script", "<\\/script")
        return f"<script>\n{code}\n</script>"

    html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', link, html)
    html = re.sub(r'<script src="([^"]+)"></script>', script, html)
    OUT.mkdir(exist_ok=True)
    dest = OUT / f"{src.parent.name}-{src.name}"
    dest.write_text(html, encoding="utf-8")
    return dest


if __name__ == "__main__":
    filters = sys.argv[1:]
    files = sorted((ROOT / "templates").glob("*/*.html"))
    for f in files:
        if filters and not any(x in f.stem for x in filters):
            continue
        d = export(f)
        print(f"{d.relative_to(ROOT)}  ({d.stat().st_size // 1024} KB)")
