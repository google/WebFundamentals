project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: È possibile accedere al Web con numerosi dispositivi che spaziano dai telefoni ai televisori e con dimensioni dello schermo molto diverse fra loro. Scopri come costruire un sito utilizzabile al meglio con numerosi dispositivi.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# Il tuo primo sito per dispositivi multipli {: .page-title }

Caution: Questo articolo non è aggiornato da tempo e potrebbe non corrispondere alla realtà. Piuttosto, dai un'occhiata al corso gratuito [Responsive Web Design](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893){: .external } su Udacity.

{% include "web/_shared/contributors/paulkinlan.html" %}

La creazione delle esperienze per dispositivi multipli non è un'operazione molto difficile. Seguendo questa guida creeremo la pagina di destinazione di un prodotto di esempio per il nostro<a href='https://www.udacity.com/course/mobile-web-development--cs256'>Corso di sviluppo Web per dispositivi mobili CS256</a> adattabile a tutti i tipi di dispositivo.

<img src="images/finaloutput-2x.jpg" alt="diversi dispositivi che visualizzano il progetto finale">

L'idea dello sviluppo per dispositivi multipli con funzionalità, formati dello schermo e metodi di interazione molto diversi può sembrare scoraggiante, ma è non impossibile.

La creazione di siti reattivi non è difficile come sembra: questa guida spiega come iniziare. Abbiamo diviso la guida in due semplici passaggi:

1. Definizione di Information Architecture (IA) e struttura della pagina, 2. Aggiunta di elementi di design per ottenere reattività e un aspetto gradevole con tutti i dispositivi.




## Creazione di struttura e contenuti personali 




I contenuti sono l'aspetto più importante di ogni sito. Iniziamo a progettarli in maniera indipendente dal design. In questa guida inizieremo identificando i contenuti necessari, per poi creare una struttura delle pagine in base a essi e impostare una disposizione semplice, lineare e in grado di funzionare correttamente sui viewport estesi in entrambe le dimensioni.


### Creazione della struttura della pagina

Abbiamo individuato il necessario:

1.  Un'area che offra una visione d'insieme del corso 'CS256: Mobile web development'
2.  Un modulo per la raccolta delle informazioni degli utenti interessati al nostro prodotto
3.  Una descrizione approfondita e un video
4.  Alcune immagini del prodotto in funzione
5.  Una tabella informativa per soddisfare le richieste

### TL;DR {: .hide-from-toc }
- Inizia identificando i contenuti necessari.
- Crea una bozza della Information Architecture (IA) dei viewport estesi in entrambe le dimensioni.
- Crea una struttura della pagina con i contenuti ma senza fogli di stile.


Abbiamo delineato anche una bozza dell'Information Architecture (IA) e della disposizione dei viewport estesi in entrambe le dimensioni.


<img class="attempt-left" src="images/narrowviewport.png" alt="IA per viewport ristretti">
<img  class="attempt-right" src="images/wideviewport.png" alt="IA per viewport ampi">
<div class="clearfix"></div>


È possibile convertirla facilmente nelle bozze delle sezioni di una struttura di pagina da utilizzare per il resto del progetto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### Aggiunta di contenuti alla pagina

La struttura di base del sito è completa. Conosciamo le sezioni necessarie, i contenuti da visualizzare in ciascuna di esse e il punto in cui posizionarli nell'Information Architecture complessiva. Adesso possiamo iniziare a sviluppare il sito.

Note: Styling verrà più tardi

#### Creazione di titolo e modulo

Il titolo e il modulo di notifica delle richieste sono i componenti principali della pagina da presentare subito all'utente.

Nel titolo, inserisci un testo semplice per descrivere il corso:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

Compila anche il modulo.
Si tratta di un semplice modulo per la raccolta di nome e numero di telefono dell'utente e dell'orario di preferenza per il contatto telefonico.

Tutti i moduli devono contenere etichette e segnaposto, in modo da consentire agli utenti di concentrarsi sugli elementi, capire come compilarli e utilizzare strumenti di accessibilità per il rilevamento della struttura del modulo. L'attributo `name` non si limita a inviare il valore del modulo al server, ma suggerisce anche la corretta compilazione automatica del modulo per conto dell'utente.

Aggiungiamo aree semantiche per aiutare gli utenti a velocizzare e semplificare l'immissione dei contenuti usando dispositivi mobili. Ad esempio, durante la digitazione di un numero telefonico, l'utente dovrebbe visualizzare il solo tastierino numerico.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### Creazione delle sezioni Video e Informazioni

Le sezioni dei contenuti Video e Informazioni richiedono maggiore attenzione.
Segue un elenco delle funzionalità e un segnaposto video che consente di ammirare i nostri prodotti in funzione.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

Spesso i video vengono utilizzati per descrivere i contenuti in maniera più interattiva e illustrano la dimostrazione di un prodotto o concetto.

Rispettando le best practice puoi integrare facilmente i video nel tuo sito:

* Aggiungi un attributo `controls` per semplificare la riproduzione del video.
* Aggiungi un'immagine `poster` per offrire un'anteprima del contenuto.
* Aggiungi diversi elementi `<source>` in base ai formati video supportati.
* Inserisci un testo alternativo per scaricare il video in caso di impossibilità di riproduzione in finestra.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### Creazione della sezione Immagini

I siti privi di immagini sono poco attraenti. Esistono due tipi di immagini:

* Immagini di contenuto, che vengono inserite nel documento per fornire con informazioni aggiuntive.
* Immagini di stile, per abbellire l'aspetto del sito spesso attraverso immagini di sfondo, pattern e gradienti. Affronteremo questo argomento nel [prossimo articolo](#).

La sezione Immagini della pagina è una raccolta di immagini di contenuto

 che consentono di convogliare il significato della pagina. Sono simili alle fotografie usate negli articoli dei giornali. Utilizziamo fotografie dei tutor del progetto Chris Wilson, Peter Lubbers e Sean Bennet

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

 che è possibile scalare al 100% della larghezza dello schermo, condizione ideale per i dispositivi con viewport ristretto ma non per quelli con viewport ampio (come i PC desktop). Questo problema è l'oggetto della sezione sul responsive design.

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

Alcune persone non riescono a visualizzare le immagini e utilizzano quindi una tecnologia di assistenza come gli screen reader, che analizzano i dati sulla pagina per restituirli in forma verbale. Verifica che tutte le immagini di contenuto siano dotate di un tag descrittivo `alt`, utile allo screen reader per la lettura dei dati all'utente.

Quando aggiungi i tag `alt`, il relativo testo deve essere il più conciso possibile ma fornire una descrizione dell'immagine. Ad esempio, nella nostra demo formattiamo l'attributo in modo semplice, ovvero `Name: Role` per comunicare informazioni sufficienti relative alla natura della sezione, dedicata agli autori e ai rispettivi ruoli.

#### Aggiunta della sezione dei dati in tabella

L'ultima sezione è una semplice tabella per presentare le caratteristiche tecniche del prodotto.

Usa le tabelle solo per dati come ad esempio le matrici di informazioni.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### Aggiunta di un footer

La maggior parte dei siti deve contenere un footer per la visualizzazione di contenuti come termini e condizioni, limitazioni di responsabilità e di altro tipo, di solito inadatti all'area principale di navigazione o a quella dei contenuti.

Nel nostro sito inseriamo solo i link alla sezione di termini e condizioni, a una pagina di contatti e ai nostri profili sui social media.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### Riepilogo

Abbiamo delineato il sito e individuato tutti i principali elementi strutturali. Abbiamo verificato anche la presenza di contenuti pertinenti e della loro collocazione ottimale per la soddisfazione delle esigenze aziendali.

<img class="attempt-left" src="images/content.png" alt="Contenuto">
<img  class="attempt-right" src="images/narrowsite.png" alt="">
<div class="clearfix"></div>


Al momento la pagina offre un aspetto poco gradevole. Si tratta tuttavia di una scelta intenzionale. 
I contenuti sono l'aspetto più importante di ogni sito, ma occorreva prima disporre di Information Architecture e densità di tipo corretto. La guida è stata un'ottima base per iniziare. Nella prossima guida assegneremo uno stile ai nostri contenuti.





## Ottenere reattività 




È possibile accedere al Web con numerosi dispositivi che spaziano dai telefoni ai televisori e con dimensioni dello schermo molto diverse fra loro. Ciascun dispositivo offre vantaggi e limiti. Quale web developer devi supportare tutti i tipi di dispositivo.


Stiamo creando un sito adatto ai diversi formati dello schermo e tipi di dispositivo. Nell'[articolo precedente](#) abbiamo assemblato la Information Architecture della pagina e creato una struttura di base.
In questa guida trasformeremo la struttura di base in una pagina gradevole e reattiva con numerosi formati dello schermo.

<figure class="attempt-left">
  <img  src="images/content.png" alt="Contenuti">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Contenuti e struttura </a> </figcaption>
</figure>
<figure class="attempt-right">
  <img  src="images/narrowsite.png" alt="Designed site">
  <figcaption><a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Sito definitivo </a> </figcaption>
</figure>
<div class="clearfix"></div>


Seguendo i principi dello sviluppo Web per piattaforme mobili, abbiamo iniziato lo sviluppo per un viewport ristretto e simile a quello di un telefono cellulare.
Quindi abbiamo scalato il tutto per i dispositivi di formato maggiore.
Abbiamo allargato il viewport cercando di individuare l'aspetto ottimale del design e della disposizione.

In precedenza abbiamo creato alcuni progetti con diverse visioni d'insieme per la visualizzazione dei contenuti. Adesso occorre adattare la pagina alle diverse disposizioni.
Dobbiamo scegliere dove posizionare i breakpoint (i punti in cui la disposizione e gli stili cambiano) in base al modo in cui i contenuti vengono adattati al formato dello schermo.

### TL;DR {: .hide-from-toc }
- Utilizza sempre un viewport.
- Inizia sempre con un viewport ristretto per poi scalarlo o ingrandirlo.
- Stabilisci i breakpoint per adattare i contenuti.
- Crea una visione d'insieme della disposizione usando i principali breakpoint.


### Aggiungi un Viewport

Anche in una pagina semplice **devi** sempre inserire un meta tag viewport.
Il viewport è il componente più importante per creare esperienze adatte a dispositivi multipli.
Senza di esso il sito non funzionerà al meglio sui dispositivi mobili.

Il viewport consente al browser di scalare la pagina per adattarla allo schermo. Esistono diverse configurazioni per usare il viewport per la visualizzazione della pagina. Seguono alcuni suggerimenti di default:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

Il viewport risiede nella sezione `head` del documento e deve essere dichiarato una sola volta.

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### Applicare uno stile semplice 

Esistono linee guida specifiche su caratteri e branding di prodotto e società indicati nella guida di stile.

#### Guida di stile

La guida consente di creare una visione d'insieme della rappresentazione visiva della pagina e verificare la coerenza del design.

##### Colori 

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Aggiungere immagini stilistiche 

Nella guida precedente abbiamo aggiunto le immagini 'di contenuto', ovvero elementi importanti per la descrizione del nostro prodotto. Le immagini stilistiche non appartengono ai contenuti principali ma consentono di migliorare gli aspetti estetici e aiutano a concentrare l'attenzione dell'utente su una determinata parte dei contenuti.

Ad esempio, come per l'immagine del titolo dei contenuti 'above the fold'. Queste immagini vengono spesso utilizzate per incoraggiare l'utente a cercare ulteriori informazioni sul prodotto.


<img src="images/narrowsite.png" alt="Sito progettato">


Sono molto facili da inserire. Nel nostro caso useremo lo sfondo dell'intestazione, applicato mediante un semplice CSS.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Abbiamo scelto un'immagine di sfondo semplice e sfumata per non distrarre l'utente, impostandola in modo da coprire l'intero elemento e adattarsi alle dimensioni della finestra mantenendo le corrette proporzioni.

<div class="clearfix"></div>


### Impostare il primo breakpoint 

La qualità visiva del progetto inizia a diminuire usando circa 600 pixel di larghezza. Nel nostro caso, la larghezza della riga supera 10 parole (lunghezza di lettura ottimale), il limite che intendiamo impostare.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Il browser non supporta il video.
     <a href="videos/firstbreakpoint.mov">Scarica il video</a>.
  </p>
</video>

600 pixel sono perfetti per creare il nostro primo breakpoint grazie a uno spazio sufficiente per riposizionare gli elementi e adattarli al meglio allo schermo. A tale scopo, utilizziamo la tecnologia [media query](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

Uno schermo più grande offre maggiore spazio e flessibilità di visualizzazione dei contenuti.

Note: Non spostare tutti gli elementi contemporaneamente, ma apporta piccole modifiche.

Nel contesto della nostra pagina di prodotto occorre:

*  Limitare la larghezza massima del design.
*  Alterare il padding degli elementi e ridurre le dimensioni del testo.
*  Spostare il modulo per conservare l'allineamento con il contenuto del titolo.
*  Fare in modo che il video si sposti intorno ai contenuti.
*  Ridurre le dimensioni delle immagini e visualizzarle in una griglia dall'aspetto più gradevole.

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### Limitare la larghezza massima del design

Per semplificare il processo di sviluppo, abbiamo scelto sole disposizioni principali, ovvero un viewport ristretto e uno ampio.

Abbiamo deciso anche di creare due sezioni a vivo nel viewport ristretto, sono presenti anche in quello ampio. In altre parole, occorre limitare la larghezza massima dello schermo per fare in modo che il testo e i paragrafi non diventino un'unica riga lunga sugli schermi ultra-wide. Questo punto deve corrispondere a circa 800 pixel.

A tale scopo, occorre limitare la larghezza e centrare gli elementi. Occorre creare un contenitore intorno a ciascuna sezione principale e applicare un attributo `margin: auto`. In questo modo, lo schermo può allargarsi mantenendo il contenuto al centro e alla dimensione massima di 800 pixel.

Il contenitore sarà un semplice `div` nel seguente modulo:

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### Modifica del padding e riduzione delle dimensioni del testo

Nel viewport ristretto non è disponibile molto spazio per la visualizzazione dei contenuti, quindi occorre ridurre le dimensioni e lo spessore dei caratteri per adattarli allo schermo.

Con un viewport più ampio è opportuno supporre che l'utente disponga di uno schermo più grande osservato a maggiore distanza. Per aumentare la leggibilità dei contenuti è possibile incrementare dimensioni e spessore dei caratteri, oltre a modificare il padding per mettere in risalto alcune aree.

Nella nostra pagina del prodotto aumenteremo il padding degli elementi della sezione mantenendolo al 5% della larghezza. Aumenteremo anche le dimensioni delle intestazioni di ciascuna sezione.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### Adattamento degli elementi al viewport ampio

Il nostro viewport ristretto utilizzava una visualizzazione a linee in pila. Ciascuna sezione principale e i relativi contenuti venivamo visualizzati in ordine dall'alto verso il basso.

Il viewport ampio offre più spazio per la visualizzazione ottimale dei contenuti su schermo. Per la nostra pagina di prodotto, la IA consente di:

*  Spostare il modulo rispetto alle informazioni dell'intestazione.
*  Posizionare il video alla destra dei punti principali.
*  Inserire le immagini nei riquadri.
*  Espandere la tabella.

#### Spostamento dell'elemento Modulo

Il viewport ristretto offre un minore spazio orizzontale per il posizionamento ottimale degli elementi su schermo.

Per utilizzare al meglio lo spazio orizzontale dello schermo, occorre interrompere il flusso lineare dell'intestazione e avvicinare modulo ed elenco.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Il browser non supporta il video.
     <a href="videos/floatingform.mov">Scarica il video</a>.
  </p>
</video>

#### Spostamento dell'elemento Video

Nell'interfaccia del viewport ristretto, il video occupa l'intera larghezza dello schermo e si trova dopo l'elenco delle funzionalità principali. Nel viewport ampio, il video verrà scalato in verticale arrivando a dimensioni eccessive e ottenendo un aspetto anomalo se posizionato accanto all'elenco delle funzionalità.

Allontana l'elemento video dal flusso verticale del viewport ristretto e posizionalo a fianco dell'elenco puntato dei contenuti nel viewport ampio.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### Inserimento delle immagini nei riquadri

Nell'interfaccia del viewport ristretto (soprattutto per dispositivi mobili), le immagini coprono la larghezza dello schermo e sono disposte in pila verticale. Questa disposizione non è adatta a un viewport ampio.

Per visualizzare correttamente le immagini in un viewport ampio, scalale al 30% della larghezza del contenitore e disporle in orizzontale (e non in verticale come nella visualizzazione ristretta). Inoltre, aggiungeremo un raggio al bordo e un'ombreggiatura alla casella in modo da rendere le immagini più visibili.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### Aumento della reattività delle immagini nei confronti dei DPI

Usando le immagini è importante valutare dimensioni del viewport e densità della visualizzazione.

Il Web è stato concepito per gli schermi a 96 dpi. Con l'introduzione dei dispositivi mobili, si è verificato un notevole aumento della densità in pixel degli schermi, per non parlare dei display Retina dei laptop. Pertanto, le immagini codificate a 96 dpi possono avere un aspetto sgradevole sui dispositivi a DPI elevati.

Segue una soluzione ancora non particolarmente diffusa.
È possibile visualizzare un'immagine ad alta densità su un display ad alta densità, a patto che il browser supporti tale funzionalità.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### Tabelle

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
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### In conclusione

**CONGRATULAZIONI.** A questo punto hai creato il tuo primo esempio di pagina di destinazione di prodotto compatibile con un'ampia gamma di dispositivi, fattori di forma e formati dello schermo.

Queste linee guida rappresentano un buon inizio:

1.  Crea una IA di base e analizza i contenuti prima di iniziare la codifica.
2.  Imposta sempre un viewport.
3.  Crea l'esperienza di base con un approccio rivolto alle piattaforme mobili.
4.  Dopo aver creato l'esperienza mobile, aumenta la larghezza del display fino a ottenere un aspetto ottimale, quindi imposta il breakpoint.
5.  Ripeti la procedura più volte.



