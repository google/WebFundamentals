---
layout: article
title: "Aggiungere un video"
description: "Scopri i modi più semplici per aggiungere video al tuo sito e offrire agli utenti un'esperienza ottimale con qualsiasi dispositivo."
introduction: "Scopri i modi più semplici per aggiungere video al tuo sito e offrire agli utenti un'esperienza ottimale con qualsiasi dispositivo."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 1
collection: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Utilizza elementi video per caricare, decodificare e riprodurre i video del tuo sito.
    - Crea video in diversi formati per una vasta gamma di piattaforme mobili.
    - Dimensiona i video al meglio evitando l'overflow dei relativi contenitori.
    - L'accessibilità è importante: aggiungi gli elementi di tracciamento come elementi secondari di quelli video.
remember:
  media-fragments:
    - Gran parte delle piattaforme supporta l'API Media Fragments, a eccezione di iOS.
    - Verifica che le range request siano supportate dal server in uso. Le range request vengono attivate per impostazione predefinita su gran parte dei server, anche se potrebbero essere assenti su alcuni servizi di hosting.
  dont-overflow:
    - Non forzare il ridimensionamento dell'elemento, poiché potresti alterarne le proporzioni rispetto al video originale. Un video appiattito o allungato è sgradevole.
  accessibility-matters:
    - Chrome per Android, Safari per iOS e tutti i browser per PC desktop a eccezione di Firefox supportano gli elementi di tracciamento (vedi <a href="http://caniuse.com/track" title="Stato del supporto degli elementi di tracciamento">caniuse.com/track</a>). Sono disponibili anche diverse polilinee. È consigliabile l'utilizzo di <a href="//www.delphiki.com/html5/playr/" title="Polilinea dell'elemento di tracciamento Playr">Playr</a> o <a href="//captionatorjs.com/" title="Traccia del sottotitolatore">Sottotitolatore</a>.
  construct-video-streams:
    - Chrome, Opera per Android, Internet Explorer 11 e Chrome per PC desktop supportano MSE ed è previsto il supporto anche per <a href="http://wiki.mozilla.org/Platform/MediaSourceExtensions" title="Firefox Media Source Extensions implementation timeline">Firefox</a>.
  optimize:
    - <a href="../images/">Images</a>
    - <a href="../../performance/optimizing-content-efficiency/">Ottimizzazione dell'efficienza dei contenuti</a>
---

{% wrap content%}

{% include modules/toc.liquid %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

{% include modules/takeaway.liquid list=page.key-takeaways.add-a-video %}

## Aggiunta di elementi video

Aggiungi elementi video per caricare, decodificare e riprodurre i video sul tuo sito.

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>Il browser in uso non supporta l'elemento video.</p>
</video>
{% endhighlight %}

## Specifica di diversi formati di file

Non tutti i browser supportano gli stessi formati video.
L'elemento `<source>` consente di specificare diversi formati sostitutivi nel caso in cui il browser dell'utente non supporti alcuni formati.
Ad esempio:

{% include_code _code/video-main.html sourcetypes %}

Se il browser analizza i tag `<source>` utilizza l'attributo `type` opzionale per individuare il file da scaricare e riprodurre. Se il browser supporta WebM, riprodurrà chrome.webm. In alternativa, verifica la possibilità di riprodurre video MPEG-4.
Consulta <a href="//www.xiph.org/video/vid1.shtml" title="Una guida utile e divertente ai video digitali">Manuale di base per i contenuti multimediali digitali per geek</a> per ulteriori informazioni sulle modalità di funzionamento di audio e video sul Web.

Questo approccio offre diversi vantaggi rispetto all'utilizzo dell'HTML diverso o dello scripting lato server, in particolare per i dispositivi mobili:

* Consente agli sviluppatori di elencare i formati in ordine di preferenza.
* Lo switching dal lato client nativo riduce la latenza e consente di eseguire una sola richiesta per il recupero del contenuto.
* È più semplice, veloce e affidabile lasciare al browser l'individuazione del formato ideale rispetto all'utilizzo di un database di supporto dal lato server con rilevamento dell'user-agent.
* È possibile ottimizzare il rendimento di rete indicando ciascun tipo di origine del file: il browser individua l'origine del video senza scaricare parte dello video per lo sniffing del formato.

Queste considerazioni sono importanti per i dispositivi mobili, prodotti con limiti di larghezza di banda e latenza e utenti in cerca di reattività. 
Il mancato inserimento di un attributo di tipo riduce il rendimento in presenza di origini multiple con tipi non supportati.

Usando gli strumenti di sviluppo del browser del dispositivo mobile, confronta l'attività di rete {% link_sample _code/video-main.html %}con gli attributi di tipo {% endlink_sample %} e {% link_sample _code/notype.html %}senza attributi di tipo{% endlink_sample %}.
Controlla anche le intestazioni della risposta usando gli strumenti di sviluppo del tuo browser per [verificare che il server restituisca il corretto tipo MIME] (//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). In caso contrario, i controlli del tipo dell'origine video non funzioneranno.

## Specifica di un tempo di inizio e fine

Risparmia larghezza di banda e ottimizza la reattività del sito usando l'API Media Fragments per l'aggiunta di un tempo di inizio e fine all'elemento video.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Il browser in uso non supporta l'elemento video.</p>
</video>

Per aggiungere un 'media fragment', è sufficiente inserire `#t=[start_time][,end_time]` all'URL del contenuto multimediale. Ad esempio, per riprodurre un video dal quinto al decimo secondo specificare:

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

Inoltre, è possibile utilizzare l'API Media Fragments per creare diverse visualizzazioni dello stesso video (es. i cue point di un DVD) senza codificare e distribuire diversi file.

{% include modules/remember.liquid title="Remember" list=page.remember.media-fragments %}

Usando gli strumenti di sviluppo del tuo browser, controlla la presenza di `Accept-Ranges: bytes` nelle intestazioni della risposta:

<img class="center" alt="Schermata degli strumenti di sviluppo di Chrome: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Inserimento di un'immagine poster

Aggiungi un attributo poster all'elemento video per fornire un'indicazione dei contenuti all'inizio del caricamento dell'elemento, senza scaricare il video o avviare la riproduzione.

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

Inoltre, è possibile utilizzare un poster come elemento sostitutivo in caso di mancato funzionamento del codice `src` del video o del mancato supporto dei formati video disponibili. L'unico svantaggio legato all'utilizzo delle immagini poster è un'ulteriore richiesta del file, elemento che utilizza larghezza di banda e richiede un rendering. Per ulteriori informazioni consulta [Ottimizzazione delle immagini] (../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Segue un confronto diretto dei video con e senza immagine poster, visualizzata in bianco e nero per dimostrarne la diversa natura rispetto al video:

<div class="clear">
  <div class="g--half">
    <img class="center" alt="Schermata di Chrome per Android, verticale: senza poster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="g--half g--last">
    <img class="center" alt="Schermata di Chrome per Android, verticale: con poster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

