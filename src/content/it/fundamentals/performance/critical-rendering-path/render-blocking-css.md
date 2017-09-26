project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Per impostazione predefinita, CSS viene trattato come risorsa di blocco del rendering, il che significa che il browser sospenderà il rendering di qualsiasi contenuto elaborato fino alla costruzione di CSSOM. Assicurarsi di mantenere il CSS snello, di fornirlo il più rapidamente possibile e di utilizzare i tipi di supporti e le query supporti per sbloccare il rendering.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# CSS del blocco di rendering {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Per impostazione predefinita, CSS viene trattato come risorsa di blocco del rendering, il che significa che il browser sospenderà il rendering di qualsiasi contenuto elaborato fino alla costruzione di CSSOM. Assicurarsi di mantenere il CSS snello, di fornirlo il più rapidamente possibile e di utilizzare i tipi di supporti e le query supporti per sbloccare il rendering.



Nella sezione precedente, abbiamo notato che il percorso di rendering critico richiede di disporre sia di DOM che di CSSOM per costruire la struttura di rendering, il che crea un'importante implicazione per la performance: **sia HTML che CSS sono risorse che bloccano il rendering.** HTML è ovvio, dato che senza DOM non avremmo niente di cui eseguire il rendering, ma il requisito CSS potrebbe essere meno immediato. Cosa accadrebbe se cercassimo di eseguire il rendering di una pagina tipica senza bloccarlo su CSS?

### TL;DR {: .hide-from-toc }
- Per impostazione predefinita, CSS viene trattato come risorsa con blocco rendering.
- I tipi di supporti e le query supporti ci consentono di segnare alcune risorse CSS non bloccano il rendering.
- Tutte le risorse CSS, a prescindere del comportamento di blocco o meno, sono scaricate dal browser.


<figure class="attempt-left">
  <img class="center" src="images/nytimes-css-device.png" alt="NYTimes con CSS">
  <figcaption>NYTimes con CSS</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/nytimes-nocss-device.png" alt="NYTimes senza CSS">
  <figcaption>NYTimes senza CSS (FOUC)</figcaption>
</figure>
<div class="clearfix"></div>

L'esempio di cui sopra mostra il sito web di NYTimes con e senza CSS, dimostra il motivo per cui il rendering è bloccato finché CSS è disponibile, senza CSS la pagina è in realtà inutilizzabile. In effetti, l'esperienza alla destra viene spesso definita come 'Flash of Unstyled Content' (FOUC). Di conseguenza, il browser bloccherà il rendering finché non disporrà sia di DOM che di CSSOM.

> **_CSS è una risorsa che blocca il rendering, trascriverla quanto prima possibile per ottimizzare il tempo del primo rendering._**

Tuttavia, se invece disponessimo di alcuni stili CSS che sono utilizzati solo in determinate circostanze, ad esempio quando la pagina viene stampata o proiettata su un grande monitor? Sarebbe bello se non avessimo da bloccare il rendering di queste risorse.

I 'tipi di supporti' e le 'query supporti' CSS ci permettono di affrontare questi casi di utilizzo:


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

Una [query supporti](/web/fundamentals/design-and-ux/responsive/#use-media-queries) è costituita da un tipo di supporto e zero o più espressioni che controllano le condizioni di quelle particolari funzioni del supporto. Ad esempio, la nostra prima dichiarazione del foglio di stile non fornisce alcun tipo di tipo di supporto o di query supporti, dunque sarà applicata in tutti i casi, questo per dire che bloccherà sempre il rendering. D'altro canto, il secondo foglio di stile si applicherà solamente quando il contenuto viene stampato: magari vuoi riorganizzare il layout, cambiare i caratteri e così via e quindi questo foglio di stile non deve bloccare il rendering della pagina al primo caricamento. Infine, l'ultima dichiarazione del foglio di sitle fornisce una 'query supporti' che viene eseguita dal browser: se le condizioni corrispondono, allora il browser bloccherà il rendering finché il foglio di stile non viene scaricato ed elaborato.

Utilizzando le query supporti, la nostra presentazione può essere adattata all'uso specifico, ad esempio la visualizzazione o la stampa, e anche a condizioni dinamiche quali i cambiamenti nell'orientamento dello schermo, gli eventi di ridimensionamento e altro. **Quando dichiari i tuoi asset del foglio di stile, presta attenzione al tipo di supporti e alle query supporti, dato che eserciteranno un grande impatto sulla performance del percorso di rendering critico.**

{# include shared/related_guides.liquid inline=true list=page.related-guides.media-queries #}

Analizziamo alcuni esempi pratici:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* La prima dichiarazione blocca il rendering e corrisponde a tutte le condizioni.
* Anche la seconda dichiarazione blocca il rendering: `all` è il tipo predefinito e se non specifichi alcun tipo, sarà implicitamente impostato su `all`. Dunque, la prima e la seconda dichiarazione sono effettivamente equivalenti.
* La terza dichiarazione presenta una query supporti dinamica che verrà valutata quando viene caricata la pagina. A seconda dell'orientamento del dispositivo quando la pagina viene caricata, portrait.css potrebbe bloccare il rendering o meno.
* L'ultima dichiarazione viene applicata solo quando la pagina viene stampata, dunque non blocca il rendering quando la pagina viene caricata per la prima volta nel browser.

Infine, tieni presente che 'blocco rendering' fa riferimento solo al fatto che il browser dovrà sospendere il rendering iniziale della pagina per quella risorsa. In ogni caso, l'asset CSS viene ancora scaricato dal browser, anche se con una priorità inferiore per le risorse che non bloccano.



