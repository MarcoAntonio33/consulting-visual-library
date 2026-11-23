/* ==========================================================================
   Consulting Visual Library — script comune
   - adatta la tela 1280 × 720 alla finestra (o all'iframe che la contiene)
   - tasto E: attiva/disattiva la modifica dei testi direttamente nel browser
   - tasto P: stampa / salva in PDF (una pagina 16:9)
   - CVL.chart(): crea un grafico ECharts con lo stile della libreria
   ========================================================================== */
(function () {
  "use strict";

  var W = 1280, H = 720;
  var root = document.documentElement;
  var css = getComputedStyle(root);
  function v(name) { return css.getPropertyValue(name).trim(); }

  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  if (inFrame || /[?&]embed\b/.test(location.search)) document.body.classList.add("in-frame");

  /* ---------- Adattamento alla finestra ---------- */
  function fit() {
    var slide = document.querySelector(".slide");
    if (!slide) return;
    var margin = document.body.classList.contains("in-frame") ? 0 : 32;
    var s = Math.min((window.innerWidth - margin) / W, (window.innerHeight - margin) / H);
    slide.style.setProperty("--scale", s > 0 ? s : 1);
  }
  window.addEventListener("resize", fit);
  fit();

  /* ---------- Modifica dei testi (tasto E) ---------- */
  var EDITABLE = ".tracker, .action-title, .subtitle, .slide-foot p, .slide-body h2, .slide-body h3, .slide-body h4, .slide-body p, .slide-body li, .slide-body td, .slide-body th, .slide-body .editable";
  var badge = null;
  function toggleEdit() {
    var on = !document.body.classList.contains("editing");
    document.body.classList.toggle("editing", on);
    document.querySelectorAll(EDITABLE).forEach(function (el) {
      if (on) el.setAttribute("contenteditable", "true"); else el.removeAttribute("contenteditable");
    });
    if (on) {
      badge = document.createElement("div");
      badge.className = "edit-badge";
      badge.textContent = "Modifica attiva: premi Esc per terminare";
      document.body.appendChild(badge);
    } else if (badge) { badge.remove(); badge = null; }
  }
  document.addEventListener("keydown", function (e) {
    var typing = e.target && e.target.isContentEditable;
    if (e.key === "Escape" && document.body.classList.contains("editing")) { e.target.blur && e.target.blur(); toggleEdit(); return; }
    if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "e" || e.key === "E") { e.preventDefault(); toggleEdit(); }
    if (e.key === "p" || e.key === "P") { e.preventDefault(); window.print(); }
  });

  /* ---------- Formattazione numeri all'italiana ---------- */
  function fmt(n, opt) {
    var o = Object.assign({ maximumFractionDigits: 1, useGrouping: "always" }, opt || {});
    if (o.minimumFractionDigits > o.maximumFractionDigits) o.maximumFractionDigits = o.minimumFractionDigits;
    return new Intl.NumberFormat("it-IT", o).format(n);   // "always": 2.400 anziché 2400
  }

  /* ---------- Tema ECharts ---------- */
  var FONT = v("--font") || "IBM Plex Sans, Arial, sans-serif";
  var C = {
    ink: v("--ink"), ink2: v("--ink-2"), ink3: v("--ink-3"),
    rule: v("--rule"), grid: v("--grid"), paper: v("--paper"), panel: v("--panel"),
    brand: v("--brand"), focus: v("--focus"), focusSoft: v("--focus-soft"),
    context: v("--context"), accent: v("--accent"), pos: v("--pos"), neg: v("--neg"),
    good: v("--good"), warning: v("--warning"), serious: v("--serious"), critical: v("--critical"),
    series: ["--s1", "--s2", "--s3", "--s4", "--s5", "--s6", "--s7", "--s8"].map(v)
  };

  var theme = {
    color: C.series,
    backgroundColor: "transparent",
    textStyle: { fontFamily: FONT, color: C.ink2, fontSize: 13 },
    animation: false,          // slide statiche: niente animazioni, stampa e PDF sempre completi
    categoryAxis: {
      axisLine: { show: true, lineStyle: { color: C.rule, width: 1 } },
      axisTick: { show: false },
      axisLabel: { color: C.ink2, fontSize: 13, fontFamily: FONT },
      splitLine: { show: false }
    },
    valueAxis: {
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: C.ink3, fontSize: 12, fontFamily: FONT },
      splitLine: { show: true, lineStyle: { color: C.grid, width: 1, type: "solid" } },
      nameTextStyle: { color: C.ink3, fontSize: 12, fontFamily: FONT }
    },
    line: { lineStyle: { width: 2, cap: "round", join: "round" }, symbol: "circle", symbolSize: 8, smooth: false },
    bar: { barMaxWidth: 24, itemStyle: { borderRadius: [4, 4, 0, 0] } },
    tooltip: {
      backgroundColor: C.paper, borderColor: C.rule, borderWidth: 1, padding: [8, 10],
      textStyle: { color: C.ink, fontSize: 13, fontFamily: FONT },
      extraCssText: "box-shadow: 0 4px 16px rgba(23,32,43,.12); border-radius: 4px;"
    }
  };

  function chart(el, option) {
    if (typeof el === "string") el = document.querySelector(el);
    if (!window.echarts) { el.textContent = "ECharts non trovato: controlla il percorso di vendor/echarts/echarts.min.js"; return null; }
    if (!chart._registered) { window.echarts.registerTheme("cvl", theme); chart._registered = true; }
    var inst = null;
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(function () {
      inst = window.echarts.init(el, "cvl", { renderer: "svg" });
      inst.setOption(option);
      document.body.setAttribute("data-chart-ready", "true");
    });
    return { get instance() { return inst; } };
  }

  /* Utility per i template SVG: crea elementi con attributi */
  function svg(tag, attrs, parent) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) if (attrs[k] !== undefined) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  /* true se le animazioni vanno saltate: "riduci movimento" attivo oppure ?static nell'indirizzo */
  var still = (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) || /[?&]static\b/.test(location.search);
  if (still) document.documentElement.classList.add("still");

  window.CVL = { colors: C, font: FONT, fmt: fmt, chart: chart, svg: svg, fit: fit, still: still };
})();
