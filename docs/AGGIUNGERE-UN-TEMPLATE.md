# Aggiungere un template

## Requisiti di ogni template

- **Un file HTML funzionante**, aperto con doppio clic e senza connessione internet.
- **Formato 16:9**: la tela è sempre `1280 × 720 px` (classe `.slide`); il corpo utile misura circa 1168 × 480 px.
- **Struttura comune**: `tracker` (area / argomento), `action-title` (il messaggio, una frase completa), contenuto, `source` (fonte dei dati), numero di pagina.
- **Dati separati dalla grafica**: i valori stanno in un blocco `===== MODIFICA QUI =====` in testa allo script; il resto del codice non va toccato per riusare il template.
- **Solo variabili del tema** per colori e caratteri (`var(--brand)`, `var(--focus)`, ...): niente colori scritti a mano, salvo scale ordinali documentate nel file.
- **Dati di esempio realistici**, coerenti con il titolo, e la dicitura "dati illustrativi" nella fonte.
- **Voce nel catalogo** (`catalogo.js`) con titolo, quando usarlo, dati necessari e dipendenze.
- **Anteprima** generata con `scripts/genera-anteprime.py`.

## Passi

1. Copiare `templates/00-base/slide-vuota.html` nella cartella dell'area giusta, con un nome in minuscolo e trattini (`matrice-mckinsey.html`).
2. Scrivere il titolo-messaggio prima del contenuto: se non si riesce a scriverlo, il grafico probabilmente non serve.
3. Per un grafico numerico aggiungere `<script src="../../vendor/echarts/echarts.min.js"></script>` prima di `slide.js` e creare il grafico con `CVL.chart("#id", option)`: applica automaticamente carattere, colori, assi e griglia della libreria.
4. Aggiungere la voce in `catalogo.js`.
5. Eseguire `python3 scripts/genera-anteprime.py nome-template` e guardare l'immagine: lo script segnala errori JavaScript e contenuti che escono dallo spazio disponibile.
6. Se il template deriva da materiale esterno, indicarne origine e licenza in un commento in testa al file e aggiornare `docs/FONTI.md`.

## Slide visive (cartella 06-visual)

- Caricare `theme.css` e poi `art.css`, e usare `<main class="slide art">`: la tela resta 1280 × 720 ma senza margini.
- Un solo ingresso animato per slide: classi `.in` e `.fade` con `style="--d:.2s"` per il ritardo. Lo stato finale è quello scritto nel CSS, così la stampa e l'opzione "riduci movimento" mostrano la slide completa.
- Nelle animazioni scritte in JavaScript controllare `CVL.still`: se è vero, disegnare subito lo stato finale.
- Per gli sfondi Vanta e le animazioni Motion aggiungere `data-attesa` al `<body>`, così lo script delle anteprime aspetta che siano pronti.

## Regole di leggibilità per i grafici

- Un solo colore pieno per il dato da evidenziare (`--focus`), grigio (`--context`) per il resto.
- Mai due assi verticali con scale diverse nello stesso grafico: meglio due grafici.
- Etichette selettive: valore in cima alle barre, all'estremità delle linee, sui punti che contano; non su ogni punto.
- Legenda sempre presente quando ci sono due o più serie; il colore non deve essere l'unico modo per distinguerle.
- Linee di griglia sottili e continue, mai tratteggiate (il tratteggio è riservato a proiezioni e stime).
- Numeri all'italiana con `CVL.fmt()`: `2.400`, `13,5`.

## Utility disponibili in `assets/slide.js`

| Funzione | Cosa fa |
|---|---|
| `CVL.chart(el, option)` | Crea un grafico ECharts con il tema della libreria (rendering SVG, nitido in stampa) |
| `CVL.fmt(n, opzioni)` | Formatta un numero in italiano; le opzioni sono quelle di `Intl.NumberFormat` |
| `CVL.colors` | Colori del tema letti da `theme.css` (`brand`, `focus`, `context`, `pos`, `neg`, `series`, ...) |
| `CVL.svg(tag, attributi, genitore)` | Crea un elemento SVG, per i diagrammi disegnati a mano |
| `CVL.font` | Pila dei caratteri del tema |
| `CVL.still` | Vero se le animazioni vanno saltate (riduci movimento attivo oppure `?static` nell'indirizzo) |
