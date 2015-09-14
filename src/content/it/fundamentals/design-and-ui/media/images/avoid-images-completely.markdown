---
title: "Evitare le immagini"
description: "In alcuni casi, è consigliabile evitare l'utilizzo delle immagini. Se possibile, utilizza le funzionalità native del browser per offrire funzionalità analoghe."
updated_on: 2014-06-10
key-takeaways:
  da evitare:images:
    - "Se possibile evita l'utilizzo delle immagini e usa le funzionalità dei browser per creare gradienti, sfumature, angoli smussati e così via."
---

<p class="intro">
  In alcuni casi, è consigliabile evitare l'utilizzo delle immagini. Se possibile, utilizza le funzionalità native del browser per offrire funzionalità analoghe. I browser possono creare elementi grafici che un tempo richiedevano l'utilizzo dei file d'immagine. In altre parole, il browser non deve più scaricare file di immagine separati in modo da evitare la visualizzazione di immagini ridimensionate in modo non ottimale. È possibile effettuare il rendering delle icone usando unicode o i caratteri speciali per icone.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Posiziona i testi in un markup senza incorporarli nelle immagini

Se possibile, usa il testo e non incorporarlo nelle immagini. Ad esempio, evita l'utilizzo delle immagini per le intestazioni o l'inserimento di informazioni di contatto come numeri telefonici o indirizzi, poiché in questo modo è impossibile copiare e incollare le informazioni, utilizzare gli screen reader e ottenere buone prestazioni. Al contrario, inserisci i testi in un markup e utilizza i webfont per ottenere lo stile desiderato.

## Utilizzo di CSS per la sostituzione delle immagini

I browser moderni utilizzano le funzionalità CSS per la creazione di stili che un tempo richiedevano l'utilizzo delle immagini. Ad esempio, è possibile creare gradienti complessi con la proprietà <code>background</code>, ombre con <code>box-shadow</code> e angoli smussati con <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Inoltre, l'utilizzo di queste tecniche non richiede cicli di rendering, cosa molto importante per i dispositivi mobili. Attenzione a non esagerare, poiché potresti sacrificare i vantaggi ottenuti e ottenere un basso rendimento.



