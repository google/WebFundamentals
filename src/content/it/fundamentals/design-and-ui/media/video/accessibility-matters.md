project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: L'accessibilità è fondamentale.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# L'importanza dell'accessibilità {: .page-title }

{% include "_shared/contributors/TODO.html" %}



L'accessibilità è fondamentale. Gli utenti audiolesi o ipovedenti non possono guardare un video senza didascalie o descrizioni. Il tempo necessario per aggiungere questi elementi al video è ridotto e consente di migliorare l'esperienza degli utenti. Devi consentire a tutti gli utenti di fruire in qualche modo dei tuoi contenuti.




## Inserimento delle didascalie per una maggiore accessibilità

Per aumentare l'accessibilità degli elementi multimediali sui dispositivi mobili, inserisci didascalie o descrizioni mediante l'elemento di tracciamento.

<!-- TODO: Verify note type! -->
Note: Chrome per Android, Safari per iOS e tutti i browser per PC desktop a eccezione di Firefox supportano gli elementi di tracciamento (vedi <a href='http://caniuse.com/track' title='Stato del supporto degli elementi di tracciamento'>caniuse.com/track</a>). Sono disponibili anche diverse polilinee. È consigliabile l'utilizzo di <a href='//www.delphiki.com/html5/playr/' title='Polilinea dell'elemento di tracciamento Playr'>Playr</a> o <a href='//captionatorjs.com/'' title='Traccia del sottotitolatore'>Sottotitolatore</a>.

L'elemento di tracciamento visualizza le didascalie nel modo seguente:

 <img class="center" alt="Schermata con didascalie visualizzate con l'elemento di tracciamento in Chrome per Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Aggiungere l'elemento di tracciamento

È molto semplice aggiungere didascalie ai video: è sufficiente inserire un elemento di tracciamento come elemento secondario di un video.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

L'attributo dell'elemento della traccia `src` indica la posizione del file di tracciamento.

## Inserire didascalie nel file di tracciamento

Un file di tracciamento è costituito da `indicazioni` temporizzate in formato WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Uomo seduto sul ramo di un albero che utilizza un portatile.

    00:05.000 --> 00:08.000
    Ramo che si spezza facendo cadere l'uomo.

    .



