# Risorse visive: dove prendere materiale in stile sito web

Data di verifica: **23 novembre 2026**. Le licenze cambiano: ricontrollarle prima di copiare materiale nuovo.

## Già incluso nella repository

| Risorsa | Cosa offre | Licenza | Dove si trova | Note |
|---|---|---|---|---|
| [WebSlides](https://github.com/webslides/WebSlides) 1.5.0 | Presentazioni HTML in stile sito web: copertine, metriche, card con immagine, citazioni, passi, oltre 120 slide di esempio su webslides.tv/demos | MIT | `vendor/webslides/` + tema `assets/webslides-tema.css` | Ultimo aggiornamento 2020. I demo originali caricano foto da Unsplash Source, servizio spento nel 2024: le immagini vanno sostituite. Le immagini dei demo appartengono ai rispettivi proprietari e non sono incluse |
| [Vanta.js](https://www.vantajs.com) 0.5.24 | Sfondi animati in 3D: rete, onde, nebbia, globo, alone, punti, uccelli, anelli, celle, nuvole | MIT | `vendor/vanta/` (con three.js r134, MIT) | Ultimo aggiornamento 2024. Gli effetti topology e trunk richiedono p5.js e non sono inclusi |
| [Motion](https://motion.dev) 14.14.0 | Animazioni: ingressi a cascata, conteggi, barre, molle | MIT | `vendor/motion/motion.js` (oggetto globale `Motion`) | Si usa senza framework: `Motion.animate(...)` |

Esempi d'uso: `presentazioni/webslides-esempio.html`, `templates/06-visual/sfondo-animato.html`, `templates/06-visual/numeri-motion.html`.

## Componenti HTML da copiare quando servono

| Risorsa | Cosa offre | Licenza | Come usarla |
|---|---|---|---|
| [HyperUI](https://www.hyperui.dev) | Sezioni per siti di marketing in HTML con classi Tailwind: numeri, citazioni, inviti all'azione, prezzi | MIT | Richiede Tailwind CSS. Per una slide singola si può caricare Tailwind dal CDN; per l'uso offline conviene ricostruire la sezione con le variabili di `theme.css` |
| [Uiverse](https://uiverse.io) (archivio [Galaxy](https://github.com/uiverse-io/galaxy)) | Oltre 3.000 elementi in HTML e CSS: card, motivi, pulsanti, caricamenti | MIT; attribuzione gradita | Qualità molto variabile: copiare solo il singolo elemento e citare autore e Uiverse in un commento |

## Librerie React o Vue: da guardare per le idee

Non sono file HTML pronti: servono come riferimento visivo o vanno riscritte in HTML e CSS.

| Risorsa | Cosa offre | Licenza |
|---|---|---|
| [Magic UI](https://magicui.design) | Bento, numeri che scorrono, sfondi a griglia, marquee, globi | MIT (componenti); modelli Pro a pagamento |
| [Aceternity UI](https://ui.aceternity.com) | Effetti spettacolari per sezioni di apertura, sfondi, card in 3D | Componenti gratuiti con licenza propria; blocchi e modelli a pagamento |
| [Inspira UI](https://inspira-ui.com) | Versione Vue di effetti tipo Aceternity e Magic UI: aurora, meteore, particelle | MIT |
| [ShaderGradient](https://shadergradient.co) | Sfumature 3D in movimento, configurabili dal sito | MIT (pacchetto React) |

## Immagini, illustrazioni, sfondi

| Risorsa | Cosa offre | Condizioni d'uso |
|---|---|---|
| [Unsplash](https://unsplash.com) | Fotografie | Uso gratuito anche commerciale, senza attribuzione obbligatoria; vietato ricreare un servizio concorrente. Scaricare la foto e salvarla accanto alla slide: non usare indirizzi esterni |
| [unDraw](https://undraw.co) | Illustrazioni SVG con colore personalizzabile | Gratuite anche per uso commerciale, senza attribuzione; vietato ridistribuirle in raccolte |
| [fffuel](https://fffuel.co) | Generatori di sfondi, motivi e texture SVG | Uso commerciale gratuito senza attribuzione; vietato ridistribuire le immagini come tali |
| [Haikei](https://haikei.app) | Generatori di onde, macchie, livelli | Gratuito, senza registrazione |

Regola per la repository pubblica: le immagini di terzi vanno usate **dentro** una slide, non caricate in blocco come raccolta.

## Scartato

- **GSAP**: è gratuito per tutti dal 2025, compresi i plugin, ma la licenza è proprietaria e Webflow può revocarla. Per una repository pubblica con licenza MIT si preferisce Motion.
- **EditorialDiagramKit**: non trovato (vedi `docs/FONTI.md`).
