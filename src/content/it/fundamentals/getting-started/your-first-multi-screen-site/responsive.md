project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: È possibile accedere al Web con numerosi dispositivi che spaziano dai telefoni ai televisori e con dimensioni dello schermo molto diverse fra loro. Scopri come costruire un sito utilizzabile al meglio con numerosi dispositivi.

{# wf_review_required #}
{# wf_updated_on: 2014-04-22 #}
{# wf_published_on: 2000-01-01 #}

# Ottenere reattività {: .page-title }

{% include "_shared/contributors/TODO.html" %}



È possibile accedere al Web con numerosi dispositivi che spaziano dai telefoni ai televisori e con dimensioni dello schermo molto diverse fra loro. Ciascun dispositivo offre vantaggi e limiti. Quale web developer devi supportare tutti i tipi di dispositivo.


Stiamo creando un sito adatto ai diversi formati dello schermo e tipi di dispositivo. Nell'[articolo precedente]({{page.previousPage.relative_url}}) abbiamo assemblato la Information Architecture della pagina e creato una struttura di base.
In questa guida trasformeremo la struttura di base in una pagina gradevole e reattiva con numerosi formati dello schermo.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Contenuti">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Contenuti e struttura </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Sito definitivo </a> </figcaption>
  </figure>
</div>

Seguendo i principi dello sviluppo Web per piattaforme mobili, abbiamo iniziato lo sviluppo per un viewport ristretto e simile a quello di un telefono cellulare.
Quindi abbiamo scalato il tutto per i dispositivi di formato maggiore.
Abbiamo allargato il viewport cercando di individuare l'aspetto ottimale del design e della disposizione.

In precedenza abbiamo creato alcuni progetti con diverse visioni d'insieme per la visualizzazione dei contenuti. Adesso occorre adattare la pagina alle diverse disposizioni.
Dobbiamo scegliere dove posizionare i breakpoint (i punti in cui la disposizione e gli stili cambiano) in base al modo in cui i contenuti vengono adattati al formato dello schermo.

## TL;DR {: .hide-from-toc }
- Utilizza sempre un viewport.
- Inizia sempre con un viewport ristretto per poi scalarlo o ingrandirlo.
- Stabilisci i breakpoint per adattare i contenuti.
- Crea una visione d'insieme della disposizione usando i principali breakpoint.


## Aggiungi un Viewport

Anche in una pagina semplice **devi** sempre inserire un meta tag viewport.
Il viewport è il componente più importante per creare esperienze adatte a dispositivi multipli.
Senza di esso il sito non funzionerà al meglio sui dispositivi mobili.

Il viewport consente al browser di scalare la pagina per adattarla allo schermo. Esistono diverse configurazioni per usare il viewport per la visualizzazione della pagina. Seguono alcuni suggerimenti di default:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

Il viewport risiede nella sezione `head` del documento e deve essere dichiarato una sola volta.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Applicare uno stile semplice 

Esistono linee guida specifiche su caratteri e branding di prodotto e società indicati nella guida di stile.

### Guida di stile

La guida consente di creare una visione d'insieme della rappresentazione visiva della pagina e verificare la coerenza del design.

#### Colori 

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Aggiungere immagini stilistiche 

Nella guida precedente abbiamo aggiunto le immagini 'di contenuto', ovvero elementi importanti per la descrizione del nostro prodotto. Le immagini stilistiche non appartengono ai contenuti principali ma consentono di migliorare gli aspetti estetici e aiutano a concentrare l'attenzione dell'utente su una determinata parte dei contenuti.

Ad esempio, come per l'immagine del titolo dei contenuti 'above the fold'. Queste immagini vengono spesso utilizzate per incoraggiare l'utente a cercare ulteriori informazioni sul prodotto.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Sito progettato">
</div>

Sono molto facili da inserire. Nel nostro caso useremo lo sfondo dell'intestazione, applicato mediante un semplice CSS.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Abbiamo scelto un'immagine di sfondo semplice e sfumata per non distrarre l'utente, impostandola in modo da coprire l'intero elemento e adattarsi alle dimensioni della finestra mantenendo le corrette proporzioni.

<br style="clear: both;">

## Impostare il primo breakpoint 

La qualità visiva del progetto inizia a diminuire usando circa 600 pixel di larghezza. Nel nostro caso, la larghezza della riga supera 10 parole (lunghezza di lettura ottimale), il limite che intendiamo impostare.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Il browser non supporta il video.
     <a href="videos/firstbreakpoint.mov">Scarica il video</a>.
  </p>
</video>

600 pixel sono perfetti per creare il nostro primo breakpoint grazie a uno spazio sufficiente per riposizionare gli elementi e adattarli al meglio allo schermo. A tale scopo, utilizziamo la tecnologia [media query]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

Uno schermo più grande offre maggiore spazio e flessibilità di visualizzazione dei contenuti.

<!-- TODO: Verify note type! -->
Note: Non spostare tutti gli elementi contemporaneamente, ma apporta piccole modifiche.

Nel contesto della nostra pagina di prodotto occorre:

*  Limitare la larghezza massima del design.
*  Alterare il padding degli elementi e ridurre le dimensioni del testo.
*  Spostare il modulo per conservare l'allineamento con il contenuto del titolo.
*  Fare in modo che il video si sposti intorno ai contenuti.
*  Ridurre le dimensioni delle immagini e visualizzarle in una griglia dall'aspetto più gradevole.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Limitare la larghezza massima del design

Per semplificare il processo di sviluppo, abbiamo scelto sole disposizioni principali, ovvero un viewport ristretto e uno ampio.

Abbiamo deciso anche di creare due sezioni a vivo nel viewport ristretto, sono presenti anche in quello ampio. In altre parole, occorre limitare la larghezza massima dello schermo per fare in modo che il testo e i paragrafi non diventino un'unica riga lunga sugli schermi ultra-wide. Questo punto deve corrispondere a circa 800 pixel.

A tale scopo, occorre limitare la larghezza e centrare gli elementi. Occorre creare un contenitore intorno a ciascuna sezione principale e applicare un attributo `margin: auto`. In questo modo, lo schermo può allargarsi mantenendo il contenuto al centro e alla dimensione massima di 800 pixel.

Il contenitore sarà un semplice `div` nel seguente modulo:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml" lang=html %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container" lang=css %}
</pre>

## Modifica del padding e riduzione delle dimensioni del testo

Nel viewport ristretto non è disponibile molto spazio per la visualizzazione dei contenuti, quindi occorre ridurre le dimensioni e lo spessore dei caratteri per adattarli allo schermo.

Con un viewport più ampio è opportuno supporre che l'utente disponga di uno schermo più grande osservato a maggiore distanza. Per aumentare la leggibilità dei contenuti è possibile incrementare dimensioni e spessore dei caratteri, oltre a modificare il padding per mettere in risalto alcune aree.

Nella nostra pagina del prodotto aumenteremo il padding degli elementi della sezione mantenendolo al 5% della larghezza. Aumenteremo anche le dimensioni delle intestazioni di ciascuna sezione.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

## Adattamento degli elementi al viewport ampio

Il nostro viewport ristretto utilizzava una visualizzazione a linee in pila. Ciascuna sezione principale e i relativi contenuti venivamo visualizzati in ordine dall'alto verso il basso.

Il viewport ampio offre più spazio per la visualizzazione ottimale dei contenuti su schermo. Per la nostra pagina di prodotto, la IA consente di:

*  Spostare il modulo rispetto alle informazioni dell'intestazione.
*  Posizionare il video alla destra dei punti principali.
*  Inserire le immagini nei riquadri.
*  Espandere la tabella.

### Spostamento dell'elemento Modulo

Il viewport ristretto offre un minore spazio orizzontale per il posizionamento ottimale degli elementi su schermo.

Per utilizzare al meglio lo spazio orizzontale dello schermo, occorre interrompere il flusso lineare dell'intestazione e avvicinare modulo ed elenco.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat" lang=css %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Il browser non supporta il video.
     <a href="videos/floatingform.mov">Scarica il video</a>.
  </p>
</video>

### Spostamento dell'elemento Video

Nell'interfaccia del viewport ristretto, il video occupa l'intera larghezza dello schermo e si trova dopo l'elenco delle funzionalità principali. Nel viewport ampio, il video verrà scalato in verticale arrivando a dimensioni eccessive e ottenendo un aspetto anomalo se posizionato accanto all'elenco delle funzionalità.

Allontana l'elemento video dal flusso verticale del viewport ristretto e posizionalo a fianco dell'elenco puntato dei contenuti nel viewport ampio.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo" lang=css %}
</pre>

### Inserimento delle immagini nei riquadri

Nell'interfaccia del viewport ristretto (soprattutto per dispositivi mobili), le immagini coprono la larghezza dello schermo e sono disposte in pila verticale. Questa disposizione non è adatta a un viewport ampio.

Per visualizzare correttamente le immagini in un viewport ampio, scalale al 30% della larghezza del contenitore e disporle in orizzontale (e non in verticale come nella visualizzazione ristretta). Inoltre, aggiungeremo un raggio al bordo e un'ombreggiatura alla casella in modo da rendere le immagini più visibili.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages" lang=css %}
</pre>

### Aumento della reattività delle immagini nei confronti dei DPI

Usando le immagini è importante valutare dimensioni del viewport e densità della visualizzazione.

Il Web è stato concepito per gli schermi a 96 dpi. Con l'introduzione dei dispositivi mobili, si è verificato un notevole aumento della densità in pixel degli schermi, per non parlare dei display Retina dei laptop. Pertanto, le immagini codificate a 96 dpi possono avere un aspetto sgradevole sui dispositivi a DPI elevati.

Segue una soluzione ancora non particolarmente diffusa.
È possibile visualizzare un'immagine ad alta densità su un display ad alta densità, a patto che il browser supporti tale funzionalità.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Tabelle

Le tabelle sono difficili da posizionare in modo corretto nei dispositivi con viewport ristretto, pertanto occorre prestare particolare attenzione.

Nei viewport ristretti è consigliabile suddividere la tabella in due righe, spostando titolo e celle in una riga per eseguire la suddivisione delle colonne.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Il browser non supporta il video.
     <a href="videos/responsivetable.mov">Scarica il video</a>.
  </p>
</video>

Nel nostro sito abbiamo dovuto creare un breakpoint aggiuntivo per i contenuti della tabella.
Nello sviluppo incentrato sui dispositivi mobili è difficile annullare gli stili applicati, pertanto occorre separare il CSS della tabella per il viewport ristretto da quello per il viewport ampio.
Così facendo si ottiene un'interruzione chiara e coerente.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" lang=css %}
</pre>

## In conclusione

**CONGRATULAZIONI.** A questo punto hai creato il tuo primo esempio di pagina di destinazione di prodotto compatibile con un'ampia gamma di dispositivi, fattori di forma e formati dello schermo.

Queste linee guida rappresentano un buon inizio:

1.  Crea una IA di base e analizza i contenuti prima di iniziare la codifica.
2.  Imposta sempre un viewport.
3.  Crea l'esperienza di base con un approccio rivolto alle piattaforme mobili.
4.  Dopo aver creato l'esperienza mobile, aumenta la larghezza del display fino a ottenere un aspetto ottimale, quindi imposta il breakpoint.
5.  Ripeti la procedura più volte.



