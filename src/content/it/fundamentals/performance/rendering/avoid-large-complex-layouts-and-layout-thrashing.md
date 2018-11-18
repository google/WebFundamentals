project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Il layout è dove il browser calcola le informazioni geometriche degli elementi: la loro dimensione e posizione nella pagina. Ogni elemento avrà informazioni di dimensionamento esplicite o implicite basate sul CSS che è stato usato, il contenuto dell'elemento o un elemento genitore. Il processo si chiama Layout in Chrome.

# Evita i layout grandi, complessi e schiaccianti {: .page-title}

{# wf_updated_on: 2017-11-29 #}
{# wf_published_on: 2015-03-20 #}

{% include "web/_shared/contributors/paullewis.html" %}

Il layout è dove il browser calcola le informazioni geometriche degli elementi:
la loro dimensione e posizione nella pagina. Ogni elemento avrà informazioni di
dimensionamento esplicite o implicite basate sul CSS che è stato usato, il
contenuto dell'elemento o un elemento genitore. Il processo si chiama Layout in
Chrome, Opera, Safari e Internet Explorer. In Firefox si chiama Reflow, ma
effettivamente il processo è lo stesso.

Analogamente ai calcoli di stile, le preoccupazioni immediate per i costi di
layout sono:

1. Il numero di elementi che richiedono il layout.
2. La complessità di questi layout.

### TL;DR {: .hide-from-toc }

- Il layout è normalmente applicato a tutto il documento.
- Il numero di elementi DOM influirà sulle prestazioni; dovresti evitare di
attivare il layout laddove possibile.
- Valutare le prestazioni del modello di layout; la nuova Flexbox è in genere
più veloce dei precedenti modelli di layout Flexbox o basati su float.
- Evita i layout sincroni forzati e schiaccianti; leggere i valori di stile
quindi apportare modifiche allo stile.

## Evita il layout dove possibile

Quando si modificano gli stili, il browser verifica se una delle modifiche
richiede il calcolo del layout ed aggiorna l'albero di rendering . Le modifiche
alle "proprietà geometriche", come larghezza, altezza, sinistra o in alto
richiedono tutte il layout.

```
.box {
  width: 20px;
  height: 20px;
}

/**
 * Changing width and height
 * triggers layout.
 */
.box--expanded {
  width: 200px;
  height: 350px;
}
```

**Il layout è quasi sempre applicato all'intero documento.** Se hai molti
elementi ci vorrà molto tempo per capire le posizioni e le dimensioni di tutti.

Se non è possibile evitare il layout la chiave è ancora una volta utilizzare
Chrome DevTools per vedere quanto tempo richiede e determinare se il layout è la
causa di un collo di bottiglia. In primo luogo apri DevTools, vai alla scheda
Timeline, premi record e interagisci con il tuo sito. Quando interrompi la
registrazione vedrai un'analisi del rendimento del tuo sito:

<img
src="images/avoid-large-complex-layouts-and-layout-thrashing/big-layout.jpg"
alt="DevTools showing a long time in Layout">

Quando entri nel merito del frame dell'esempio sopra, vediamo che oltre 20 ms
vengono spesi all'interno del layout il che, quando abbiamo 16 ms per ottenere
un frame sullo schermo in un'animazione, è troppo alto. Puoi anche vedere che
DevTools ti dirà la dimensione dell'albero (in questo caso 1.618 elementi) e
quanti nodi necessitano di layout.

Note: vuoi un elenco definitivo di quali proprietà CSS attivano il layout, lil
paint o la composizione? Scopri i [trigger CSS](https://csstriggers.com) .

## Usa la flexbox su vecchi modelli di layout

Il web ha una gamma di modelli di layout alcuni dei quali sono più ampiamente
supportati di altri. Il più vecchio modello di layout CSS ci consente di
posizionare gli elementi sullo schermo in maniera relativa, assoluta e con
elementi fluttuanti.

Lo screenshot qui sotto mostra il costo del layout quando si usano float su
1.300 box. È certamente un esempio forzato perché la maggior parte delle
applicazioni utilizzerà diversi mezzi per posizionare gli elementi.

<img
src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-float.jpg"
alt="Using floats as layout">

Se aggiorniamo l'esempio per utilizzare Flexbox, un'aggiunta più recente alla
piattaforma web, otteniamo un'immagine diversa:

<img
src="images/avoid-large-complex-layouts-and-layout-thrashing/layout-flex.jpg"
alt="Using flexbox as layout">

Ora passiamo molto meno tempo (3,5 ms vs 14 ms in questo caso) nel layout per lo
*stesso numero di elementi* e lo stesso aspetto visivo. È importante ricordare
che in alcuni contesti potresti non essere in grado di scegliere Flexbox dal
momento che è [meno supportato rispetto ai
float](http://caniuse.com/#search=flexbox)  ma dove puoi, investiga sull'impatto
del modello di layout sul tuo rendimento e cerca di utilizzare quello che
minimizza il costo di esecuzione.

In ogni caso, indipendentemente dal fatto che tu scelga Flexbox o meno dovresti
comunque **provare ad evitare di attivare il layout del tutto** durante i punti
di alta pressione della tua applicazione!

## Evita layout forzati sincroni

La consegna di un frame sullo schermo segue questo ordine:

<img src="images/avoid-large-complex-layouts-and-layout-thrashing/frame.jpg"
alt="Using flexbox as layout">

Prima viene eseguito JavaScript, *quindi* calcoli di stile, *quindi il* layout.
Tuttavia è possibile forzare un browser ad eseguire il layout prima del
JavaScript. Si chiama **layout forzato sincrono** .

La prima cosa da tenere a mente è che quando JavaScript viene eseguito tutti i
vecchi valori di layout del frame precedente sono noti e disponibili per la
query. Quindi se ad esempio vuoi scrivere l'altezza di un elemento (chiamiamolo
"box") all'inizio del frame puoi scrivere un codice come questo:

```
// Schedule our function to run at the start of the frame.
requestAnimationFrame(logBoxHeight);

function logBoxHeight() {
  // Gets the height of the box in pixels and logs it out.
  console.log(box.offsetHeight);
}
```

Le cose diventano problematiche se hai cambiato gli stili della scatola *prima*
di chiederne l'altezza:

```
function logBoxHeight() {

  box.classList.add('super-big');

  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);
}
```

Ora per rispondere alla domanda di altezza il browser deve *prima* applicare il
cambiamento di stile (a causa dell'aggiunta della classe `super-big` ) e
*quindi* eseguire il layout. Solo allora sarà in grado di restituire l'altezza
corretta. Questo è un lavoro non necessario e potenzialmente costoso.

Per questo motivo devi sempre raggruppare le letture di stile ed eseguirle prima
(in cui il browser può utilizzare i valori di layout del frame precedente) e
successivamente eseguire qualsiasi scrittura:

Realizzata correttamente la funzione di cui sopra sarebbe:

```
function logBoxHeight() {
  // Gets the height of the box in pixels
  // and logs it out.
  console.log(box.offsetHeight);

  box.classList.add('super-big');
}
```

Per la maggior parte non è necessario applicare gli stili e quindi eseguire
query sui valori; usare i valori dell'ultimo frame dovrebbe essere sufficiente.
Eseguendo i calcoli di stile e il layout in modo sincrono e precedente rispetto
al browser desidererebbero essere potenziali colli di bottiglia, e non qualcosa
che in genere vorresti fare.

## Evita layout schiaccianti

C'è un modo per rendere i layout sincroni forzati ancora peggiori: *farne molti
in rapida successione* . Dai un'occhiata a questo codice:

```
function resizeAllParagraphsToMatchBlockWidth() {

  // Puts the browser into a read-write-read-write cycle.
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
```

Questo codice scorre su un gruppo di paragrafi e imposta la larghezza di ogni
paragrafo in modo che corrisponda alla larghezza di un elemento chiamato "box".
Sembra abbastanza innocuo, ma il problema è che ogni iterazione del ciclo legge
un valore di stile ( `box.offsetWidth` ) e quindi lo usa immediatamente per
aggiornare la larghezza di un paragrafo ( `paragraphs[i].style.width` ). Alla
successiva iterazione del ciclo, il browser deve tenere conto del fatto che gli
stili sono cambiati dall'ultima richiesta di `offsetWidth` (nella precedente
iterazione), e quindi deve applicare le modifiche allo stile ed eseguire il
layout. Questo accadrà su *ogni singola iterazione!* .

La correzione per questo esempio è di *leggere* un'altra volta quindi *scrivere*
i valori:

```
// Read.
var width = box.offsetWidth;

function resizeAllParagraphsToMatchBlockWidth() {
  for (var i = 0; i < paragraphs.length; i++) {
    // Now write.
    paragraphs[i].style.width = width + 'px';
  }
}
```

Se si desidera garantire la sicurezza è necessario verificare che
[FastDOM](https://github.com/wilsonpage/fastdom) esegua automaticamente il batch
delle letture e delle scritture per voi e dovrebbe impedire
[all'utente](https://github.com/wilsonpage/fastdom) di attivare accidentalmente
layout sincroni forzati o schiaccianti.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
