# Fonti, licenze e versioni

Data dell'ultima verifica: **23 novembre 2026**. Ripetere la verifica almeno ogni sei mesi e aggiornare questa pagina.

## Componenti inclusi nella repository

| Componente | Versione | Licenza | Dove si trova | Uso | Verifica |
|---|---|---|---|---|---|
| [Apache ECharts](https://echarts.apache.org) | 6.1.0 (maggio 2026) | Apache 2.0 | `vendor/echarts/` (con `LICENSE` e `NOTICE`) | Grafici numerici: barre, linee, dispersione, heatmap | Registro npm, 23/11/2026 |
| [reveal.js](https://revealjs.com) | 6.0.2 | MIT | `vendor/reveal/` (con `LICENSE`) | Contenitore per presentazioni in sequenza | Registro npm, 23/11/2026 |
| [IBM Plex Sans](https://github.com/IBM/plex) tramite Fontsource | 5.3.0 | SIL Open Font License 1.1 | `assets/fonts/` (con `OFL-IBM-Plex.txt`) | Carattere di tutte le slide | Registro npm, 23/11/2026 |

Per aggiornare ECharts o reveal.js:

```bash
npm pack echarts@<versione> reveal.js@<versione>
# poi copiare dist/echarts.min.js, LICENSE e NOTICE in vendor/echarts/
# e dist/reveal.css, dist/reveal.js, dist/reset.css, dist/plugin/notes.js, LICENSE in vendor/reveal/
python3 scripts/genera-anteprime.py   # controlla che nessun template si sia rotto
```

## Librerie utili non incluse

| Libreria | Versione corrente | Licenza | Quando usarla |
|---|---|---|---|
| [Mermaid](https://mermaid.js.org) | 12.3.0 | MIT | Diagrammi generati da testo (flussi, sequenze, Gantt) da aggiornare spesso |
| [D3](https://d3js.org) | 7.9.2 | ISC | Grafici molto personalizzati; molti esempi online usano ancora versioni vecchie (v4–v6): controllare la versione prima di copiarli |
| [Lucide](https://lucide.dev) (pacchetto `lucide-static`) | 1.78.0 | ISC | Icone SVG da incorporare nelle slide |

## Raccolte da cui prendere idee

| Fonte | Cosa offre | Licenza | Note |
|---|---|---|---|
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | Oltre 45 tipi di diagramma in HTML + SVG autonomi, in variante chiara, scura ed editoriale; galleria su cathrynlavery.github.io/diagram-design | MIT | Verificato con clonazione del repository il 23/11/2026. Buona alternativa a "EditorialDiagramKit" (vedi sotto) |
| [Esempi di ECharts](https://echarts.apache.org/examples) | Centinaia di configurazioni pronte, comprese cascate, imbuti e mappe | Apache 2.0 | Copiare l'oggetto `option` e passarlo a `CVL.chart()` |
| [D3 Graph Gallery](https://d3-graph-gallery.com) | Esempi commentati per quasi ogni tipo di grafico | Verificare quella del singolo esempio | Molti esempi usano D3 v4 |
| [From Data to Viz](https://www.data-to-viz.com) | Guida alla scelta del grafico in base ai dati | — | Utile per decidere quale template aggiungere |
| [Storytelling with Data](https://www.storytellingwithdata.com) | Guida ai grafici e buone pratiche di presentazione dei dati | — | Riferimento per titoli-messaggio ed evidenziazione |
| [Slidesgo](https://slidesgo.com) | Modelli di consulenza (PESTLE, Ansoff, scorecard) in PowerPoint e Google Slides | La versione gratuita richiede attribuzione | Solo come riferimento visivo: non sono file HTML |

## Fonti segnalate ma non trovate

- **EditorialDiagramKit**: nessun repository con questo nome risulta da una ricerca del 23/11/2026. I template di questa libreria sono stati scritti da zero; come raccolta analoga usare *diagram-design* (sopra).
- **HTML Presentation Skill**: non verificato. Prima di usarlo controllare repository, autore e licenza.

## Regole per il materiale di terze parti

1. Copiare nella repository solo materiale con licenza che lo consente (MIT, Apache 2.0, ISC, OFL o simili).
2. Conservare il file di licenza accanto al materiale copiato e citare l'origine nel commento in testa al template.
3. Aggiornare questa pagina con versione e data di verifica.
4. Non copiare modelli commerciali o con attribuzione obbligatoria senza riportarla nella slide.
