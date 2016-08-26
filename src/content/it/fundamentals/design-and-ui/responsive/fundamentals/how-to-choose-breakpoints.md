project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte del Web non è ottimizzata per l'utilizzo di dispositivi multipli. Apprendi i concetti fondamentali e ottimizza il sito per dispositivi mobili, PC desktop o su qualsiasi altro dispositivo dotato di schermo.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# Scelta dei breakpoint {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Anche se può essere utile definire i breakpoint in base alle classi dei dispositivi, occorre prestare attenzione: la definizione dei breakpoint in base a dispositivi, prodotti, brand o sistemi operativi potrebbe diventare un problema dal punto di vista della manutenzione. Sono i contenuti a dover determinare la regolazione della disposizione rispetto al relativo contenitore.



## TL;DR {: .hide-from-toc }
- 'Crea breakpoint in base ai contenuti e non a dispositivi, prodotti o brand specifici.'
- 'Progetta per i dispositivi mobili più piccoli, quindi incrementa l''esperienza con la progressiva disponibilità di spazio su schermo.'
- Mantieni le linee di testo a un massimo di 70 o 80 caratteri.


## Seleziona i breakpoint principali iniziando dagli spazi piccoli e passando progressivamente a quelli più grandi

Progetta i contenuti in funzione degli schermi di piccole dimensioni, quindi espandi lo schermo fino al punto in cui occorre inserire un breakpoint. Così facendo, puoi ottimizzare i breakpoint in base ai contenuti e ridurne il numero.

Passiamo all'esempio preso in esame all'inizio, le [previsioni del tempo]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
Innanzitutto, occorre conferire un aspetto gradevole alle previsioni su schermo.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Anteprima delle previsioni del tempo su schermo di piccole dimensioni.">
  {% endlink_sample %}
</figure>

Quindi, ridimensiona lo schermo fino a visualizzare un eccesso di spazio bianco fra gli elementi. In questo caso le previsioni assumono un aspetto poco gradevole.  600 pixel sono una dimensione eccessiva, anche se si tratta di un aspetto opinabile.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Anteprima delle previsioni del tempo con l'aumento dell'ampiezza della pagina.">
  {% endlink_sample %}
</figure>

Per inserire un breakpoint a 600 pixel, crea due nuovi fogli di stile, uno per il browser con dimensioni massime di 600 pixel e l'altro per le dimensioni superiori ai 600 pixel.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/weather-2.html" region_tag="mqweather2" %}
</pre>

Infine, esegui il refactoring del CSS. In questo esempio, in `weather.css` abbiamo inserito stili comuni quali caratteri, icone, posizionamento di base e colori. Le disposizioni specifiche per gli schermi di piccole dimensioni sono state posizionate in `weather-small.css`, mentre quelle per gli schermi di grandi dimensioni in `weather-large.css`.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## Selezione dei breakpoint secondari secondo necessità

I breakpoint principali sono adatti a eseguire cambiamenti sostanziali della disposizione e modifiche di minore entità.  Ad esempio, fra i breakpoint principali è possibile regolare i margini o il padding di un elemento o aumentare le dimensioni dei caratteri per una disposizione più naturale.

Iniziamo ottimizzando la disposizione per gli schermi di piccole dimensioni. In questo caso aumentiamo il carattere se la larghezza del viewport supera i 360 pixel.  Una volta ottenuto spazio a sufficienza è possibile separare la temperatura massima e minima in modo da inserirle sulla stessa riga e non più in pila. Ingrandiamo anche le icone del meteo.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/weather-small.css" region_tag="mqsmallbpsm" lang=css %}
</pre>

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

In maniera analoga, usando schermi più grandi possiamo limitare la larghezza massima del riquadro delle previsioni in modo che non occupi tutta la larghezza dello schermo.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/weather-large.css" region_tag="mqsmallbplg" lang=css %}
</pre>

## Ottimizzazione del testo per la lettura

Secondo la teoria classica della leggibilità, una colonna dovrebbe contenere da 70 a 80 caratteri per linea (circa 8-10 parole in italiano). Pertanto, quando un blocco di testo supera le 10 parole occorre inserire un breakpoint.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Prima dell'aggiunta di breakpoint minori.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Dopo l'aggiunta di breakpoint minori.">
  </div>
</div>

Osserviamo attentamente il post del blog dell'esempio precedente. Su schermi piccoli, il carattere Roboto a 1 em offre una resa ottimale con 10 parole per linea, anche se con schermi più grandi occorre un breakpoint. In questo caso, con una larghezza del browser superiore a 575 pixel, la larghezza ideale dei contenuti è di 550 pixel.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/reading.html" region_tag="mqreading" lang=css %}
</pre>

## Mai nascondere completamente i contenuti

Attenzione alla scelta dei contenuti da nascondere o visualizzare in base al formato dello schermo.
Non nascondere i contenuti solo a causa dell'impossibilità di inserirli su schermo: il formato dello schermo non offre un'indicazione definitiva dei desideri di un utente. Ad esempio, l'eliminazione del conteggio dei pollini dalle previsioni del tempo potrebbe costituire un problema grave per le persone con allergie stagionali in cerca di informazioni per uscire all'aperto.




