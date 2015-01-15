---
layout: article
title: "CSS del blocco di rendering"
description: "Per impostazione predefinita, CSS viene trattato come risorsa di blocco del rendering, il che significa che il browser sospenderà il rendering di qualsiasi contenuto elaborato fino alla costruzione di CSSOM. Assicurarsi di mantenere il CSS snello, di fornirlo il più rapidamente possibile e di utilizzare i tipi di supporti e le query supporti per sbloccare il rendering."
introduction: "Per impostazione predefinita, CSS viene trattato come risorsa di blocco del rendering, il che significa che il browser sospenderà il rendering di qualsiasi contenuto elaborato fino alla costruzione di CSSOM. Assicurarsi di mantenere il CSS snello, di fornirlo il più rapidamente possibile e di utilizzare i tipi di supporti e le query supporti per sbloccare il rendering."
article:
  written_on: 2014-04-01
  updated_on: 2014-09-18
  order: 3
collection: critical-rendering-path
authors:
  - ilyagrigorik
related-guides:
  media-queries:
    -
      title: Utilizzo delle query supporti CSS per la velocità di risposta
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Progettazione web che risponde"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - Per impostazione predefinita, CSS viene trattato come risorsa con blocco rendering.
    - I tipi di supporti e le query supporti ci consentono di segnare alcune risorse CSS non bloccano il rendering.
    - Tutte le risorse CSS, a prescindere del comportamento di blocco o meno, sono scaricate dal browser.
---
{% wrap content%}

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


Nella sezione precedente, abbiamo notato che il percorso di rendering critico richiede di disporre sia di DOM che di CSSOM per costruire la struttura di rendering, il che crea un'importante implicazione per la performance: **sia HTML che CSS sono risorse che bloccano il rendering.** HTML è ovvio, dato che senza DOM non avremmo niente di cui eseguire il rendering, ma il requisito CSS potrebbe essere meno immediato. Cosa accadrebbe se cercassimo di eseguire il rendering di una pagina tipica senza bloccarlo su CSS?

{% include modules/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="clear">
  <div class="g--half">
    <b>NYTimes con CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes con CSS">

  </div>

  <div class="g--half g--last">
    <b>NYTimes senza CSS (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes senza CSS">

  </div>
</div>

{% comment %}
<table>
<tr>
<td>NYTimes con CSS</td>
<td>NYTimes senza CSS (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="NYTimes con CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="NYTimes senza CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

L'esempio di cui sopra mostra il sito web di NYTimes con e senza CSS, dimostra il motivo per cui il rendering è bloccato finché CSS è disponibile, senza CSS la pagina è in realtà inutilizzabile. In effetti, l'esperienza alla destra viene spesso definita come 'Flash of Unstyled Content' (FOUC). Di conseguenza, il browser bloccherà il rendering finché non disporrà sia di DOM che di CSSOM.

> **_CSS è una risorsa che blocca il rendering, trascriverla quanto prima possibile per ottimizzare il tempo del primo rendering._**

Tuttavia, se invece disponessimo di alcuni stili CSS che sono utilizzati solo in determinate circostanze, ad esempio quando la pagina viene stampata o proiettata su un grande monitor? Sarebbe bello se non avessimo da bloccare il rendering di queste risorse.

I 'tipi di supporti' e le 'query supporti' CSS ci permettono di affrontare questi casi di utilizzo:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

Una [query supporti]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) è costituita da un tipo di supporto e zero o più espressioni che controllano le condizioni di quelle particolari funzioni del supporto. Ad esempio, la nostra prima dichiarazione del foglio di stile non fornisce alcun tipo di tipo di supporto o di query supporti, dunque sarà applicata in tutti i casi, questo per dire che bloccherà sempre il rendering. D'altro canto, il secondo foglio di stile si applicherà solamente quando il contenuto viene stampato: magari vuoi riorganizzare il layout, cambiare i caratteri e così via e quindi questo foglio di stile non deve bloccare il rendering della pagina al primo caricamento. Infine, l'ultima dichiarazione del foglio di sitle fornisce una 'query supporti' che viene eseguita dal browser: se le condizioni corrispondono, allora il browser bloccherà il rendering finché il foglio di stile non viene scaricato ed elaborato.

Utilizzando le query supporti, la nostra presentazione può essere adattata all'uso specifico, ad esempio la visualizzazione o la stampa, e anche a condizioni dinamiche quali i cambiamenti nell'orientamento dello schermo, gli eventi di ridimensionamento e altro. **Quando dichiari i tuoi asset del foglio di stile, presta attenzione al tipo di supporti e alle query supporti, dato che eserciteranno un grande impatto sulla performance del percorso di rendering critico.**

{% include modules/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Analizziamo alcuni esempi pratici:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="screen">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* La prima dichiarazione blocca il rendering e corrisponde a tutte le condizioni.
* Anche la seconda dichiarazione blocca il rendering: `screen` è il tipo predefinito e se non specifichi alcun tipo, sarà implicitamente impostato su `screen`. Dunque, la prima e la seconda dichiarazione sono effettivamente equivalenti.
* La terza dichiarazione presenta una query supporti dinamica che verrà valutata quando viene caricata la pagina. A seconda dell'orientamento del dispositivo quando la pagina viene caricata, portrait.css potrebbe bloccare il rendering o meno.
* L'ultima dichiarazione viene applicata solo quando la pagina viene stampata, dunque non blocca il rendering quando la pagina viene caricata per la prima volta nel browser.

Infine, tieni presente che 'blocco rendering' fa riferimento solo al fatto che il browser dovrà sospendere il rendering iniziale della pagina per quella risorsa. In ogni caso, l'asset CSS viene ancora scaricato dal browser, anche se con una priorità inferiore per le risorse che non bloccano.

{% include modules/nextarticle.liquid %}

{% endwrap%}

