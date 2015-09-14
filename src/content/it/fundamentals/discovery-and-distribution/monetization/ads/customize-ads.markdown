---
title: "Personalizza i tuoi annunci"
description: "I migliori annunci possono migliorare l'esperienza dell'utente. Mentre il contenuto reale degli annunci proviene dagli inserzionisti, tu ne controlli il tipo di contenuto, il colore, le dimensioni e il posizionamento."
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - "Non posizionare mai annunci all'interno del tuo sito dove potrebbero interferire con l'esperienza mirata all'utente; assicurati che gli annunci nella parte visibile della pagina non rileghino contenuti importanti nella parte inferiore."
    - "Utilizza sempre unità pubblicitarie reattive; se non bastasse un dimensionamento intelligente, passa alla modalità avanzata."
    - "Cerca di integrare gli annunci all'interno del contenuto per evitare che l'annuncio passi inosservato."
    - "Scegli stili di testo che si integrino, completino o contrastino con il tuo sito."
notes:
  targeting:
    - "Il targeting degli annunci viene scelto in base al contenuto generale del sito, non in base a parole chiave o categorie. Se desideri visualizzare annunci su argomenti specifici, includi frasi e paragrafi completi su tali argomenti."
  testing:
    - "Testa sempre i tuoi annunci su diversi dispositivi e schermate, per accertarti che ci sia la giusta reattività."
  images:
    - "Gli inserzionisti hanno il pieno controllo di come sono visualizzati i loro annunci display. Puoi influenzare i tipi di annunci display visualizzati sul tuo sito utilizzando il posizionamento e il dimensionamento annunci, ma non puoi controllare il contenuto dell'immagine."
---

<p class="intro">
  I migliori annunci possono migliorare l'esperienza dell'utente. Mentre il contenuto reale degli annunci proviene dagli inserzionisti, tu ne controlli il tipo di contenuto, il colore, le dimensioni e il posizionamento.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Posiziona gli annunci dove gli utenti possono trarre maggior vantaggio

Per decidere dove posizionare gli annunci sul tuo sito
e quanti annunci includere, concentrati per prima cosa sull'utente.

* Utilizza gli annunci per aumentare il contenuto del sito e non viceversa.
* Pagine con annunci eccessivi, annunci che relegano contenuti importanti nella parte inferiore della pagina o raggruppati in maniera da occupare quasi l'intero spazio visualizzabile e, infine, privi di adeguata etichettatura, diminuiscono la soddisfazione dell'utente e sono contro le politiche di AdSense.
* Assicurati che gli annunci apportino valore aggiunto agli utenti. Se le unità pubblicitarie diminuiscono sensibilmente le entrate, i clic o le visualizzazioni, molto probabilmente non apportano valore aggiunto agli utenti.

Opzioni di posizionamento campione per annunci per cellulari:

<img src="images/mobile_ads_placement.png" class="center" alt="Annuncio illustrato campione per cellulare">

Per ulteriori informazioni, rivedi le 
[best practice per il posizionamento di annunci] di AdSense(https://support.google.com/adsense/answer/1282097).


## Cosa fare se il dimensionamento reattivo non è sufficiente?
In alcuni casi, potresti dover controllare la modalità di visualizzazione degli annunci, piuttosto che utilizzare semplicemente annunci reattivi. In questo caso, puoi passare alla modalità avanzata e sostituire il dimensionamento intelligente nel codice dell'unità pubblicitaria reattiva. 
Ad esempio, puoi controllare il dimensionamento esatto degli annunci utilizzando [query supporti]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html):

1. Segui le istruzioni per [creare un'unità pubblicitaria reattiva]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. Nella casella relativa all'annuncio, seleziona <strong>Advanced (è richiesta la modifica del codice)</strong> dal menu a discesa Modalità.
3. Modifica il codice annuncio per impostare le dimensioni esatte dei tuoi annunci, in base al dispositivo dell'utente:

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Prova
{% endlink_sample %}

Vedi [funzioni avanzate](https://support.google.com/adsense/answer/3543893) nella guida AdSense per ulteriori informazioni.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Scegli stili che completano il tuo sito

Gli [annunci di maggior successo](https://support.google.com/adsense/answer/17957) integrano o contrastano gli stili del tuo sito. Google AdSense fornisce una serie di [stili di annunci predefiniti](https://support.google.com/adsense/answer/6002585); scegli lo stile che meglio si addice al tuo sito o creane uno tutto tuo.

### Cosa puoi personalizzare

Puoi personalizzare ognuno dei seguenti stili negli annunci di testo:

* Colore bordo
* Colore sfondo
* Famiglia di caratteri di testo e dimensione carattere
* Colore del testo predefinito
* Colore del testo, specifico per il titolo dell'annuncio
* Colore del testo, specifico per URL

### Come applicare gli stili

Quando crei una nuova unità, puoi applicare uno stile diverso agli annunci di testo espandendo la <strong>proprietàText ad style</strong>:

<img src="images/customize.png" class="center" alt="Testo e stili">

Tutti gli annunci di testo utilizzano lo stile <strong>Predefinito</strong> di Google AdSense.  Puoi utilizzare qualsiasi stile predefinito senza modifiche, apportarne alcune lievi o creare il tuo stile personale.

Una volta salvato il nuovo stile, puoi applicarlo a qualsiasi tua 
nuova o già esistente unità pubblicitaria:

1. Vai agli [stili degli annunci](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Seleziona lo stile dell'annuncio che desideri modificare dalla lista degli <strong>stili degli annunci disponibili per tutti i tuoi prodotti attivi</strong>.
3. Effettua le modifiche e <strong>salva lo stile dell'annuncio</strong>.

Quando modifichi uno stile dell'annuncio esistente, tutte le unità pubblicitarie attive che utilizzano quello stile vengono aggiornate automaticamente.

{% include shared/remember.liquid title="Note" list=page.notes.images %}


