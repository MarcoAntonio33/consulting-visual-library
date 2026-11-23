#!/usr/bin/env python3
"""Genera le anteprime PNG (1280x720) di tutti i template e segnala errori JavaScript.

Uso:
    pip install playwright && playwright install chromium
    python3 scripts/genera-anteprime.py            # tutti i template
    python3 scripts/genera-anteprime.py swot gantt # solo quelli che contengono questi nomi

Le immagini finiscono in anteprime/<categoria>/<template>.png e vengono usate
dalla galleria index.html.
"""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
TEMPLATES = sorted((ROOT / "templates").glob("*/*.html"))
OUT = ROOT / "anteprime"


def launch(p):
    # Usa Chromium di Playwright; in alternativa un Chrome già installato.
    exe = os.environ.get("CHROME_PATH")
    if exe:
        return p.chromium.launch(executable_path=exe)
    try:
        return p.chromium.launch()
    except Exception:
        return p.chromium.launch(channel="chrome")


def main(filters):
    files = [f for f in TEMPLATES if not filters or any(x in f.stem for x in filters)]
    problems = 0
    with sync_playwright() as p:
        browser = launch(p)
        for f in files:
            page = browser.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
            errors = []
            page.on("pageerror", lambda e, errs=errors: errs.append(str(e)))
            page.on("console", lambda m, errs=errors: errs.append(m.text) if m.type == "error" else None)
            page.goto(f.as_uri() + "?embed")
            page.evaluate("document.fonts.ready")
            if page.locator(".chart").count():
                page.wait_for_selector("body[data-chart-ready]", timeout=10000)
                page.wait_for_timeout(300)
            else:
                page.wait_for_timeout(150)
            # Testo che esce dal proprio contenitore
            overflow = page.evaluate("""() => {
                const s = document.querySelector('.slide');
                const out = [];
                document.querySelectorAll('.slide-body *').forEach(el => {
                  if (el.closest('svg') || el.closest('.chart')) return;
                  if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX !== 'visible')
                    out.push((el.className || el.tagName) + ' (orizzontale)');
                });
                const b = document.querySelector('.slide-body');
                if (b && b.scrollHeight > b.clientHeight + 2) out.push('slide-body: contenuto più alto dello spazio disponibile');
                return out;
            }""")
            dest = OUT / f.parent.name / (f.stem + ".png")
            dest.parent.mkdir(parents=True, exist_ok=True)
            page.locator(".slide").screenshot(path=str(dest))
            status = "ok"
            if errors or overflow:
                problems += 1
                status = "ATTENZIONE " + "; ".join(errors + overflow)
            print(f"{f.parent.name}/{f.name}: {status}")
            page.close()
        browser.close()
    print(f"\n{len(files)} template, {problems} con segnalazioni.")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
