project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: I contenuti sono l'aspetto più importante di ogni sito. In questa guida indicheremo come pianificare rapidamente la creazione del tuo primo sito compatibile con diversi dispositivi.

{# wf_review_required #}
{# wf_updated_on: 2014-04-22 #}
{# wf_published_on: 2000-01-01 #}

# Creazione di struttura e contenuti personali {: .page-title }

{% include "_shared/contributors/TODO.html" %}



I contenuti sono l'aspetto più importante di ogni sito. Iniziamo a progettarli in maniera indipendente dal design. In questa guida inizieremo identificando i contenuti necessari, per poi creare una struttura delle pagine in base a essi e impostare una disposizione semplice, lineare e in grado di funzionare correttamente sui viewport estesi in entrambe le dimensioni.


## Creazione della struttura della pagina

Abbiamo individuato il necessario:

1.  Un'area che offra una visione d'insieme del corso 'CS256: Mobile web development'
2.  Un modulo per la raccolta delle informazioni degli utenti interessati al nostro prodotto
3.  Una descrizione approfondita e un video
4.  Alcune immagini del prodotto in funzione
5.  Una tabella informativa per soddisfare le richieste

## TL;DR {: .hide-from-toc }
- Inizia identificando i contenuti necessari.
- Crea una bozza della Information Architecture (IA) dei viewport estesi in entrambe le dimensioni.
- Crea una struttura della pagina con i contenuti ma senza fogli di stile.


Abbiamo delineato anche una bozza dell'Information Architecture (IA) e della disposizione dei viewport estesi in entrambe le dimensioni.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="IA per viewport ristretti">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="IA per viewport ampi">
</div>

È possibile convertirla facilmente nelle bozze delle sezioni di una struttura di pagina da utilizzare per il resto del progetto.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

## Aggiunta di contenuti alla pagina

La struttura di base del sito è completa. Conosciamo le sezioni necessarie, i contenuti da visualizzare in ciascuna di esse e il punto in cui posizionarli nell'Information Architecture complessiva. Adesso possiamo iniziare a sviluppare il sito.

<!-- TODO: Verify note type! -->
Note: Styling verrà più tardi

### Creazione di titolo e modulo

Il titolo e il modulo di notifica delle richieste sono i componenti principali della pagina da presentare subito all'utente.

Nel titolo, inserisci un testo semplice per descrivere il corso:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

Compila anche il modulo.
Si tratta di un semplice modulo per la raccolta di nome e numero di telefono dell'utente e dell'orario di preferenza per il contatto telefonico.

Tutti i moduli devono contenere etichette e segnaposto, in modo da consentire agli utenti di concentrarsi sugli elementi, capire come compilarli e utilizzare strumenti di accessibilità per il rilevamento della struttura del modulo. L'attributo `name` non si limita a inviare il valore del modulo al server, ma suggerisce anche la corretta compilazione automatica del modulo per conto dell'utente.

Aggiungiamo aree semantiche per aiutare gli utenti a velocizzare e semplificare l'immissione dei contenuti usando dispositivi mobili. Ad esempio, durante la digitazione di un numero telefonico, l'utente dovrebbe visualizzare il solo tastierino numerico.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Creazione delle sezioni Video e Informazioni

Le sezioni dei contenuti Video e Informazioni richiedono maggiore attenzione.
Segue un elenco delle funzionalità e un segnaposto video che consente di ammirare i nostri prodotti in funzione.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

Spesso i video vengono utilizzati per descrivere i contenuti in maniera più interattiva e illustrano la dimostrazione di un prodotto o concetto.

Rispettando le best practice puoi integrare facilmente i video nel tuo sito:

* Aggiungi un attributo `controls` per semplificare la riproduzione del video.
* Aggiungi un'immagine `poster` per offrire un'anteprima del contenuto.
* Aggiungi diversi elementi `<source>` in base ai formati video supportati.
* Inserisci un testo alternativo per scaricare il video in caso di impossibilità di riproduzione in finestra.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### Creazione della sezione Immagini

I siti privi di immagini sono poco attraenti. Esistono due tipi di immagini:

* Immagini di contenuto, che vengono inserite nel documento per fornire con informazioni aggiuntive.
* Immagini di stile, per abbellire l'aspetto del sito spesso attraverso immagini di sfondo, pattern e gradienti. Affronteremo questo argomento nel [prossimo articolo]({{page.nextPage.relative_url}}).

La sezione Immagini della pagina è una raccolta di immagini di contenuto

 che consentono di convogliare il significato della pagina. Sono simili alle fotografie usate negli articoli dei giornali. Utilizziamo fotografie dei tutor del progetto Chris Wilson, Peter Lubbers e Sean Bennet

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

 che è possibile scalare al 100% della larghezza dello schermo, condizione ideale per i dispositivi con viewport ristretto ma non per quelli con viewport ampio (come i PC desktop). Questo problema è l'oggetto della sezione sul responsive design.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Alcune persone non riescono a visualizzare le immagini e utilizzano quindi una tecnologia di assistenza come gli screen reader, che analizzano i dati sulla pagina per restituirli in forma verbale. Verifica che tutte le immagini di contenuto siano dotate di un tag descrittivo `alt`, utile allo screen reader per la lettura dei dati all'utente.

Quando aggiungi i tag `alt`, il relativo testo deve essere il più conciso possibile ma fornire una descrizione dell'immagine. Ad esempio, nella nostra demo formattiamo l'attributo in modo semplice, ovvero `Name: Role` per comunicare informazioni sufficienti relative alla natura della sezione, dedicata agli autori e ai rispettivi ruoli.

### Aggiunta della sezione dei dati in tabella

L'ultima sezione è una semplice tabella per presentare le caratteristiche tecniche del prodotto.

Usa le tabelle solo per dati come ad esempio le matrici di informazioni.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

### Aggiunta di un footer

La maggior parte dei siti deve contenere un footer per la visualizzazione di contenuti come termini e condizioni, limitazioni di responsabilità e di altro tipo, di solito inadatti all'area principale di navigazione o a quella dei contenuti.

Nel nostro sito inseriamo solo i link alla sezione di termini e condizioni, a una pagina di contatti e ai nostri profili sui social media.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

## Riepilogo

Abbiamo delineato il sito e individuato tutti i principali elementi strutturali. Abbiamo verificato anche la presenza di contenuti pertinenti e della loro collocazione ottimale per la soddisfazione delle esigenze aziendali.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Contenuto">
 <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Al momento la pagina offre un aspetto poco gradevole. Si tratta tuttavia di una scelta intenzionale. 
I contenuti sono l'aspetto più importante di ogni sito, ma occorreva prima disporre di Information Architecture e densità di tipo corretto. La guida è stata un'ottima base per iniziare. Nella prossima guida assegneremo uno stile ai nostri contenuti.



