# Modifiche rispetto all'originale

File presi dal pacchetto npm `webslides@1.5.0` (licenza MIT, vedi LICENSE).

- `webslides.css`: rimossi i quattro blocchi `@font-face` che caricavano il carattere "San Francisco" da un server esterno, così le presentazioni funzionano offline e senza caratteri di terzi. I caratteri sono definiti in `assets/webslides-tema.css`.
- Non inclusi: immagini e loghi dei demo (di proprietà dei rispettivi titolari) e la raccolta di icone `svg-icons`.
