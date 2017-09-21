project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Gran parte del Web non è ottimizzata per l'utilizzo di dispositivi multipli. Apprendi i concetti fondamentali e ottimizza il sito per dispositivi mobili, PC desktop o su qualsiasi altro dispositivo dotato di schermo.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Nozioni di base sul Responsive Web Design {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


L'impiego di dispositivi mobili per la navigazione sul Web è in forte aumento, ma gran parte del Web non è ancora ottimizzata in tal senso. Spesso i dispositivi mobili soffrono di limitazioni in termini di formato dello schermo e richiedono un nuovo approccio per la disposizione dei contenuti.


{% include "web/_shared/udacity/ud893.html" %}



I formati dello schermo utilizzati da telefoni, 'phablet', tablet, desktop, console per videogiochi, TV e dispositivi indossabili sono molteplici. I formati dello schermo sono in continua evoluzione ed è quindi importante creare un sito capace di adattarsi a qualsiasi formato futuro.


  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>


Il Responsive Web Design, creato da [Ethan Marcotte in A List Apart](http://alistapart.com/article/responsive-web-design/){: .external } risponde alle esigenze di utenti e dispositivi impiegati. La disposizione dei contenuti varia in base alle dimensioni e alle caratteristiche del dispositivo. Ad esempio, un telefono visualizza i contenuti su una sola colonna mentre un tablet ne adopera due.


## Impostazione del viewport 

Le pagine ottimizzate per dispositivi multipli devono contenere un elemento meta viewport nella sezione 'head' del documento, che indica al browser come controllare dimensioni e scala della pagina.




### TL;DR {: .hide-from-toc }
- Utilizza i meta viewport tag per controllare larghezza e scala dei viewport dei browser.
- Inserisci <code>width=device-width</code> per ottenere una corrispondenza con la larghezza dello schermo in pixel indipendenti dal dispositivo.
- Inserisci <code>initial-scale=1</code> per stabilire una relazione 1:1 fra i pixel del CSS e quelli indipendenti dal dispositivo.
- Controlla l'accessibilità della pagina senza disabilitare l'opzione di scalabilità dell'utente.


Per ottenere un'esperienza ideale, i browser mobili effettuano il rendering della pagina alla larghezza della schermata del desktop (di solito circa 980 pixel, ma variabile in base al dispositivo), quindi migliorano l'aspetto dei contenuti ingrandendo i caratteri e scalando i contenuti per adattarli allo schermo. Gli utenti potrebbero riscontrare una certa incoerenza nelle dimensioni dei caratteri e toccare due volte lo schermo o zoomare con due dita per visualizzare e interagire con i contenuti.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Il valore meta viewport `width=device-width` garantisce la corrispondenza della pagina alla larghezza dello schermo in pixel indipendenti dal dispositivo. Pertanto, la pagina potrà riordinare il contenuto in modo da adattarlo ai diversi formati dello schermo, da quello di piccole dimensioni dei cellulari ai monitor desktop più ampi.

<img src="imgs/no-vp.png" class="attempt-left" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Pagina senza viewport">
<img src="imgs/vp.png" class="attempt-right"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Pagina con viewport">
<div class="clearfix"></div>


In caso di rotazione orizzontale, alcuni browser mantengono costante la larghezza della pagina eseguendo uno zoom invece di riordinare i contenuti su schermo. L'attributo `initial-scale=1` impone al browser di definire una relazione univoca fra i pixel del CSS e quelli indipendenti dal dispositivo con qualsiasi orientamento, consentendo alla pagina di sfruttare appieno la larghezza orizzontale.

Note: Utilizza virgole per separare gli attributi per consentire anche ai browser meno aggiornati di analizzarli in modo corretto.

### Garantire l'accessibilità del viewport

Oltre a impostare il valore `initial-scale` puoi anche impostare i seguenti attributi del viewport:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Se impostati, possono impedire all'utente di zoomare nel viewport a causa di potenziali problemi di accessibilità.


## Dimensionamento dei contenuti in base al viewport 

Usando dispositivi mobili o desktop, gli utenti preferiscono scorrere i siti Web in verticale e non in orizzontale, per cui la necessità di uno scorrimento orizzontale o della riduzione dello schermo per visualizzare l'intera pagina potrebbe compromettere l'esperienza d'uso.


### TL;DR {: .hide-from-toc }
- Non utilizzare elementi di grandi dimensioni e larghezza fissa.
- La resa ottimale dei contenuti non deve essere legata alla larghezza di un viewport specifico.
- Utilizza i media query CSS per applicare diversi stili per gli schermi ampi e ristretti.


Durante lo sviluppo di un sito mobile con tag `meta viewport`, potresti creare per errore contenuti di pagina inadatti al viewport specificato, come ad esempio un'immagine con una larghezza maggiore del viewport che potrebbe costringere a uno scorrimento in orizzontale. Modifica il contenuto in modo da adattarlo alla larghezza del viewport per evitare agli utenti di eseguire uno scorrimento in orizzontale.

A causa della variabilità di dimensioni e larghezza dello schermo in pixel CSS fra dispositivi diversi (es. telefoni, tablet o persino modelli diversi di telefono), la resa ottimale dei contenuti non deve basarsi su un viewport specifico.

L'assegnazione di elevate larghezze CSS assolute agli elementi della pagina (come nell'esempio sottostante) produrranno un `div` troppo ampio per i viewport dei dispositivi più piccoli (es. quelli con larghezza di 320 pixel CSS come i primi iPhone). Piuttosto, utilizza valori di larghezza relativi come `width: 100%`. Fai attenzione anche nell'utilizzo dei valori di posizionamento assoluti che potrebbero causare la fuoriuscita dell'elemento dal viewport degli schermi di piccole dimensioni.

<img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Pagina con un elemento con larghezza fissa di 344 pixel in uno dei primi iPhone." class="attempt-left">
<img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Pagina con un elemento a larghezza fissa di 344 pixel di un Nexus 5." class="attempt-right">
<div class="clearfix"></div>



### Utilizzo delle media query CSS per ridurre i tempi di risposta 

Le media query sono filtri intuitivi applicabili agli stili CSS che aiutano a modificarli in base alle caratteristiche al dispositivo che esegue il rendering di contenuti, come ad esempio tipo, larghezza, altezza, orientamento e risoluzione del display.




### TL;DR {: .hide-from-toc }
- Puoi usare le media query per applicare gli stili in base alle caratteristiche del dispositivo.
- Utilizza <code>min-width</code> al posto di <code>min-device-width</code> per ottenere un'esperienza adatta al maggior numero di dispositivi possibile.
- Usa dimensioni relative degli elementi per evitare interruzioni della disposizione.



Ad esempio, posiziona gli stili necessari per la stampa in una media query di stampa:


    <link rel="stylesheet" href="print.css" media="print">
    

Oltre all'utilizzo dell'attributo `media` nel link del foglio di stile, esistono altri due modi per applicare le media query che è possibile incorporare in un file CSS, ovvero `@media` e `@import`. Per motivi di rendimento, i primi due metodi offrono maggiori risultati rispetto alla sintassi `@import` (consultare 'Evita le importazioni CSS'/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

La logica applicata alle media query non è reciprocamente esclusiva, mentre ai filtri che soddisfano tali criteri viene applicato il blocco di CSS risultante utilizzando le regole standard di precedenza dei CSS.

### Applicazione delle media query in base alle dimensioni del viewport

Le media query offrono un'esperienza reattiva con l'applicazione di stili specifici agli schermi di piccole, medie e grandi dimensioni. La sintassi delle media query consente la creazione di regole applicabili in base alle caratteristiche del dispositivo.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Anche se esistono diversi elementi a cui applicare le query, i più adatti all'ottimizzazione dei tempi di risposta della grafica web sono `min-width`, `max-width`, `min-height` e `max-height`.


<table>
    <thead>
    <tr>
      <th data-th="attribute">attributo</th>
      <th data-th="Result">Risultato</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
     <td data-th="Result">Regole applicate per  qualsiasi larghezza del browser superiore al valore definito nella query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
     <td data-th="Result">Regole applicate per qualsiasi larghezza del browser inferiore al valore definito nella query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
     <td data-th="Result">Regole applicate per qualsiasi altezza del browser superiore al valore definito in query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
     <td data-th="Result">Regole applicate per qualsiasi altezza del browser inferiore al valore definito nella query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Regole applicate per qualsiasi browser di altezza superiore o uguale alla larghezza.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Regole per qualsiasi browser di larghezza superiore all'altezza.</td>
    </tr>
  </tbody>
</table>

Di seguito viene indicato un esempio:

<img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Anteprima di una pagina che utilizza le media query per la modifica delle proprietà con il progressivo ridimensionamento.">


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* Se il browser ha una dimensione compresa fra <b>0 pixel</b> e <b>640 pixel</b> viene applicato `max-640px.css`.
* Se il browser ha una dimensione compresa fra <b>500 pixel</b> e <b>600 pixel</b> vengono applicati gli stili in `maxpx.css`.
* Se il browser ha una dimensione di almeno <b>640 pixel</b> viene applicato `min-640px.css`.
* Se la larghezza del browser <b>è superiore all'altezza</b> viene applicato `landscape.css`.
* Se l'altezza del browser <b>è superiore all larghezza</b> viene applicato `portrait.css`.


###Nota su `min-device-width`

È possibile creare query basate su `*-device-width` anche se si tratta di un'operazione **caldamente sconsigliata**.

La differenza è piccola ma importante: `min-width` si basa sulla dimensione della finestra del browser, mentre `min-device-width` su quella dello schermo. Alcuni browser Android di precedente generazione potrebbero non indicare in modo corretto la larghezza del dispositivo, restituendo la dimensione dello schermo usando i pixel del dispositivo invece della larghezza del viewport prevista.

Inoltre, l'utilizzo di `*-device-width` previene l'adattamento dei contenuti su computer desktop o altri dispositivi che consentono il ridimensionamento delle finestre, poiché la query si basa sulle dimensioni effettive del dispositivo e non su quelle della finestra del browser.

### Utilizzo di unità relative

Due importanti concetti di design reattivo sono la fluidità e la proporzionalità, condizioni opposte alle disposizioni a larghezza fissa. L'utilizzo di unità di misura relative semplifica la creazione delle disposizioni ed evita la creazione involontaria di componenti troppo grandi per il viewport.

Ad esempio, l'impostazione di una larghezza del 100% per un `div` superiore consente di non superare la larghezza e le dimensioni del viewport.  Il `div` viene visualizzato in modo corretto anche su iPhone da 320 pixel, Blackberry Z10 da 342 pixel o Nexus 5 da 360 pixel.

Inoltre, usando le unità relative è possibile eseguire il rendering dei contenuti nel browser in base al livello di zoom selezionato, evitando l'aggiunta di barre di scorrimento orizzontali alla pagina.

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }



## Scelta dei breakpoint 


Anche se può essere utile definire i breakpoint in base alle classi dei dispositivi, occorre prestare attenzione: la definizione dei breakpoint in base a dispositivi, prodotti, brand o sistemi operativi potrebbe diventare un problema dal punto di vista della manutenzione. Sono i contenuti a dover determinare la regolazione della disposizione rispetto al relativo contenitore.



### TL;DR {: .hide-from-toc }
- Crea breakpoint in base ai contenuti e non a dispositivi, prodotti o brand specifici.
- Progetta per i dispositivi mobili più piccoli, quindi incrementa l''esperienza con la progressiva disponibilità di spazio su schermo.
- Mantieni le linee di testo a un massimo di 70 o 80 caratteri.


### Seleziona i breakpoint principali iniziando dagli spazi piccoli e passando progressivamente a quelli più grandi

Progetta i contenuti in funzione degli schermi di piccole dimensioni, quindi espandi lo schermo fino al punto in cui occorre inserire un breakpoint. Così facendo, puoi ottimizzare i breakpoint in base ai contenuti e ridurne il numero.

Passiamo all'esempio preso in esame all'inizio, le [previsioni del tempo](/web/fundamentals/design-and-ux/responsive/).
Innanzitutto, occorre conferire un aspetto gradevole alle previsioni su schermo.

<img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Anteprima delle previsioni del tempo su schermo di piccole dimensioni.">

Quindi, ridimensiona lo schermo fino a visualizzare un eccesso di spazio bianco fra gli elementi. In questo caso le previsioni assumono un aspetto poco gradevole.  600 pixel sono una dimensione eccessiva, anche se si tratta di un aspetto opinabile.

<img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Anteprima delle previsioni del tempo con l'aumento dell'ampiezza della pagina.">


Per inserire un breakpoint a 600 pixel, crea due nuovi fogli di stile, uno per il browser con dimensioni massime di 600 pixel e l'altro per le dimensioni superiori ai 600 pixel.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

Infine, esegui il refactoring del CSS. In questo esempio, in `weather.css` abbiamo inserito stili comuni quali caratteri, icone, posizionamento di base e colori. Le disposizioni specifiche per gli schermi di piccole dimensioni sono state posizionate in `weather-small.css`, mentre quelle per gli schermi di grandi dimensioni in `weather-large.css`.

<img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">


### Selezione dei breakpoint secondari secondo necessità

I breakpoint principali sono adatti a eseguire cambiamenti sostanziali della disposizione e modifiche di minore entità.  Ad esempio, fra i breakpoint principali è possibile regolare i margini o il padding di un elemento o aumentare le dimensioni dei caratteri per una disposizione più naturale.

Iniziamo ottimizzando la disposizione per gli schermi di piccole dimensioni. In questo caso aumentiamo il carattere se la larghezza del viewport supera i 360 pixel.  Una volta ottenuto spazio a sufficienza è possibile separare la temperatura massima e minima in modo da inserirle sulla stessa riga e non più in pila. Ingrandiamo anche le icone del meteo.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>


<img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints." class="attempt-left">
<img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints." class="attempt-right">
<div class="clearfix"></div>


In maniera analoga, usando schermi più grandi possiamo limitare la larghezza massima del riquadro delle previsioni in modo che non occupi tutta la larghezza dello schermo.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

### Ottimizzazione del testo per la lettura

Secondo la teoria classica della leggibilità, una colonna dovrebbe contenere da 70 a 80 caratteri per linea (circa 8-10 parole in italiano). Pertanto, quando un blocco di testo supera le 10 parole occorre inserire un breakpoint.

<img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Prima dell'aggiunta di breakpoint minori." class="attempt-left">
<img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Dopo l'aggiunta di breakpoint minori." class="attempt-right">
<div class="clearfix"></div>


Osserviamo attentamente il post del blog dell'esempio precedente. Su schermi piccoli, il carattere Roboto a 1 em offre una resa ottimale con 10 parole per linea, anche se con schermi più grandi occorre un breakpoint. In questo caso, con una larghezza del browser superiore a 575 pixel, la larghezza ideale dei contenuti è di 550 pixel.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### Mai nascondere completamente i contenuti

Attenzione alla scelta dei contenuti da nascondere o visualizzare in base al formato dello schermo.
Non nascondere i contenuti solo a causa dell'impossibilità di inserirli su schermo: il formato dello schermo non offre un'indicazione definitiva dei desideri di un utente. Ad esempio, l'eliminazione del conteggio dei pollini dalle previsioni del tempo potrebbe costituire un problema grave per le persone con allergie stagionali in cerca di informazioni per uscire all'aperto.




