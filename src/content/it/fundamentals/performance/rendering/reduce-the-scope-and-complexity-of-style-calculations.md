project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript è spesso l'attivatore dei cambiamenti visivi. A volte ciò avviene direttamente attraverso manipolazioni di stile e talvolta tramite calcoli che comporteranno cambiamenti visivi come la ricerca o l'ordinamento di alcuni dati. JavaScript mal funzionante o di lunga esecuzione può essere una causa comune di problemi di prestazioni e dovresti cercare di minimizzarne l'impatto dove puoi.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2015-03-20 #}

# Riduci l'ambito e la complessità dei calcoli di stile {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

La modifica del DOM attraverso aggiunta e rimozione di elementi, modifica di
attributi, classi o animazioni, farà sì che il browser ricalcoli gli stili degli
elementi e, in molti casi, il layout (o il reflow) della pagina o parti di esso.
Questo processo è chiamato <em>calcoli dello stile elaborato</em> .

La prima parte degli stili di calcolo consiste nel creare un set di selettori di
corrispondenza, che è essenzialmente il browser che determina quali classi,
pseudo-selettori e ID si applicano a ogni dato elemento.

La seconda parte del processo consiste nel prendere tutte le regole di stile dai
selettori di corrispondenza e capire quali stili finali ha l'elemento. In Blink
(il motore di rendering di Chrome e Opera) questi processi sono, almeno oggi,
approssimativamente equivalenti in termini di costi:

> Circa il 50% del tempo utilizzato per calcolare lo stile elaborato per un
elemento viene utilizzato per abbinare i selettori e l'altra metà del tempo
viene utilizzata per costruire il RenderStyle (rappresentazione di stile
elaborato) dalle regole corrispondenti. Rune Lillesveen, Opera / [Style
Invalidation in
Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/view)

### TL;DR {: .hide-from-toc }

- Riduci la complessità dei tuoi selezionatori; usa una metodologia incentrata
sulla classe come BEM.
- Ridurre il numero di elementi su cui calcolare il calcolo dello stile.

## Riduci la complessità dei tuoi selettori

Nel caso più semplice fai riferimento a un elemento nel tuo CSS con solo una
classe:

```
.title {
  /* styles */
}
```

Tuttavia con la crescita di qualsiasi progetto, è probabile che si verifichi un
CSS più complesso, in modo da terminare con selettori che assomigliano a questo:

```
.box:nth-last-child(-n+1) .title {
  /* styles */
}
```

Per conoscere quali gli stili applicare il browser deve chiedere effettivamente
"si tratta di un elemento con una classe title che ha un genitore che risulta
essere il figlio minore n-esimo più uno ed un elemento di classe box?" Questo
*può* richiedere molto tempo a seconda del selettore utilizzato e del browser in
questione. Il comportamento previsto del selettore potrebbe invece essere
cambiato in una classe:

```
.final-box-title {
  /* styles */
}
```

Puoi mettere in discussione il nome della classe ma il lavoro è diventato molto
più semplice per il browser. Nella versione precedente per sapere ad esempio,
che l'elemento è l'ultimo del suo tipo, il browser deve prima sapere tutto su
tutti gli altri elementi e se ci sono elementi che verranno dopo quello che
sarebbe l'ennesimo ultimo figlio, che è potenzialmente molto più oneroso della
semplice corrispondenza del selettore con l'elemento perché la sua classe
corrisponde.

## Riduci il numero di elementi in stile

Un'altra considerazione prestazionale, che in genere è *il fattore più
importante per molti aggiornamenti di stile* , è il volume di lavoro che deve
essere eseguito quando un elemento cambia.

In termini generali, il peggiore costo per il calcolo dello stile elaborato
degli elementi è il numero di elementi moltiplicato per il conteggio dei
selettori, poiché ogni elemento deve essere almeno controllato una volta su ogni
stile per vedere se corrisponde.

Note: se si modificava una classe -- ad esempio -- l'elemento body, tutti i
figli della pagina avrebbero bisogno di ricalcolare i loro stili elaborati. Per
fortuna non è più così, alcuni browser mantengono invece una piccola raccolta di
regole univoche per ogni elemento che, se modificato, fa ricalcolare gli stili
dell'elemento. Ciò significa che un elemento può o non deve essere ricalcolato a
seconda di dove si trova nell'albero e di cosa è stato specificamente
modificato.

Spesso i calcoli di stile possono essere indirizzati a pochi elementi piuttosto
che invalidare la pagina nel suo complesso. Nei browser moderni questo tende ad
essere molto meno un problema perché il browser non ha necessariamente bisogno
di controllare tutti gli elementi potenzialmente interessati da una modifica. I
browser meno recenti, d'altra parte, non sono necessariamente ottimizzati per
tali compiti. Dove puoi, devi **ridurre il numero di elementi invalidati** .

Note: se si utilizzano componenti Web, è importante notare che i calcoli di
stile qui sono leggermente diversi, poiché per impostazione predefinita gli
stili non attraversano il limite del Shadow DOM e sono associati ai singoli
componenti anziché all'intero albero. Nel complesso, tuttavia, si applica ancora
lo stesso concetto: gli alberi più piccoli con regole più semplici vengono
elaborati in modo più efficiente rispetto ad alberi di grandi dimensioni o
regole complesse.

## Misura il tuo costo di ricalcolo dello stile

Il modo più semplice e migliore per misurare il costo dei ricalcoli di stile è
utilizzare la modalità Timeline di Chrome DevTools. Per iniziare, apri DevTools,
vai alla scheda Timeline, premi record e interagisci con il tuo sito. Quando
interrompi la registrazione vedrai qualcosa di simile all'immagine qui sotto.

<img
src="images/reduce-the-scope-and-complexity-of-style-calculations/long-running-style.jpg"
alt="DevTools showing long-running style calculations.">

La striscia in alto indica fotogrammi al secondo, e se vedi le barre che vanno
sopra la linea inferiore, la linea a 60fps, allora hai dei fotogrammi a durata
prolungata.

<img
src="images/reduce-the-scope-and-complexity-of-style-calculations/frame-selection.jpg"
alt="Zooming in on a trouble area in Chrome DevTools.">

Se hai un frame di durata lunga durante alcune interazioni come lo scorrimento o
altre interazioni, viene ulteriormente esaminato.

Se hai un blocco viola grande, come nel caso sopra, fai clic sul record per
ottenere maggiori dettagli.

<img
src="images/reduce-the-scope-and-complexity-of-style-calculations/style-details.jpg"
alt="Getting the details of long-running style calculations.">

In questo caso è presente un evento di ricalcolo di stile a esecuzione
prolungata che richiede poco più di 18ms e si verifica durante uno scorrimento
causando un notevole rallentamento nell'esperienza.

Se fai clic sull'evento stesso, ti viene assegnato uno stack di chiamate, che
individua la posizione nel tuo JavaScript che è responsabile dell'attivazione
della modifica dello stile. In aggiunta a ciò, ottieni anche il numero di
elementi che sono stati influenzati dalla modifica (in questo caso solo oltre
400 elementi) e quanto tempo ci è voluto per eseguire i calcoli di stile. È
possibile utilizzare queste informazioni per iniziare a provare a trovare una
correzione nel codice.

## Usa Block, Element, Modifier

Approcci alla codifica come [BEM (Block, Element, Modifier)](https://bem.info/)
{: .external} effettivamente integrano nel selettore che combina i vantaggi
prestazionali sopra, perché raccomanda che ogni cosa abbia una singola classe e,
dove serve la gerarchia, che venga infornata nel nome della classe pure:

```
.list { }
.list__list-item { }
```

Se hai bisogno di qualche modificatore, come in precedenza, dove vogliamo fare
qualcosa di speciale per l'ultimo figlio, puoi aggiungerlo in questo modo:

```
.list__list-item--last-child {}
```

Se stai cercando un buon modo per organizzare il tuo CSS, BEM è un ottimo punto
di partenza, sia da un punto di vista della struttura, ma anche a causa delle
semplificazioni della ricerca di stile.

Se non ti piace il BEM ci sono altri modi per avvicinarti al tuo CSS ma le
considerazioni sulle prestazioni dovrebbero essere valutate insieme
all'ergonomia dell'approccio.

## Risorse

- [Style invalidation in
Blink](https://docs.google.com/document/d/1vEW86DaeVs4uQzNFI5R-_xS9TcS1Cs_EUsHRSgCHGu8/edit)
- [BEM (Block, Element, Modifier)](https://bem.info/){: .external }

Translated by{% include "web/_shared/contributors/lucaberton.html" %}
