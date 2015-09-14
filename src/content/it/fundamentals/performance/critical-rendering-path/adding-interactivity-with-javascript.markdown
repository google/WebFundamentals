---
title: "Aggiunta di interattività con JavaScript"
description: "JavaScript ci consente di modificare praticamente qualsiasi aspetto della pagina: contenuto, stile e il relativo comportamento in seguito alle interazioni degli utenti. Tuttavia, JavaScript può anche bloccare la costruzione e ritardare quando la pagina viene sottoposta a rendering. Per fornire performance ottimali, rendi asincrono JavaScript ed elimina tutti i JavaScript superflui dal percorso di rendering critico."
updated_on: 2014-09-18
key-takeaways:
  adding-interactivity:
    - "JavaScript può eseguire query e modificare DOM e CSSOM."
    - "L'esecuzione di JavaScript blocca CSSOM."
    - "JavaScript blocca la costruzione DOM, salvo esplicitamente dichiarata come asincrono."
---
<p class="intro">
  JavaScript ci consente di modificare praticamente qualsiasi aspetto della pagina: contenuto, stile e il relativo comportamento in seguito alle interazioni degli utenti. Tuttavia, JavaScript può anche bloccare la costruzione DOM e ritardare quando la pagina viene sottoposta a rendering. Per fornire performance ottimali, rendi asincrono JavaScript ed elimina tutti i JavaScript superflui dal percorso di rendering critico.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript è un linguaggio dinamico che viene eseguito nel browser e ci consente di alterare praticamente qualsiasi aspetto del comportamento di una pagina: possiamo modificare il contenuto della pagina attraverso l'aggiunta o rimozione di elementi dalla struttura DOM, possiamo cambiare le proprietà CSSOM di ciascun elemento, possiamo gestire l'input dell'utente e molto altro ancora. Per illustrare questa procedura in azione, aggiungiamo al nostro esempio precedente 'Ciao mondo' un semplice script inline:

{% include_code src=_code/script.html snippet=full %}

* JavaScript ci permette di accedere al DOM e di estrarre il nodo span nascosto: il nodo potrebbe non essere visibile nella struttura di rendering, ma è ancora presente nel DOM. Quindi, una volta che siamo in possesso del riferimento, ne possiamo modificare il testo (tramite .textContent) e quindi sostituire la proprietà di stile di visualizzazione calcolata da `none` a `inline`. Alla fine dell'operazione, la nostra pagina visualizzerà '**Ciao studenti interattivi.**'.

* JavaScript ci consente anche di creare, definire lo stile e aggiungere e rimuovere nuovi elementi dal DOM. In realtà, tecnicamente la nostra intera pagina potrebbe essere solo un grande file JavaScript che crea e definisce lo stile degli elementi uno ad uno: così funzionerebbe, ma lavorare con HTML e CSS risulta molto più facile nella prassi. Nella seconda parte della nostra funzione JavaScript creiamo un nuovo elemento div, ne impostiamo il contenuto di testo, ne definiamo lo stile e lo aggiungiamo al corpo.

<img src="images/device-js-small.png" class="center" alt="anteprima pagina">

In questo modo, abbiamo modificato il contenuto e lo stile CSS di un nodo DOM esistente e abbiamo aggiunto un nodo interamente nuovo al documento. La nostra pagina non vincerà nessun premio di design, ma illustra la potenza e la flessibilità che ci offre JavaScript.

Tuttavia, esiste un grande caveat di performance in agguato. JavaScript ci offre molta potenza, ma crea anche numerose limitazioni aggiuntive sulle modalità e sulle tempistiche di rendering della pagina.

Innanzitutto, nota che nell'esempio di cui sopra, il nostro script inline è vicino al fondo della pagina. Perché? Ebbene, dovresti provarci da solo, ma se spostiamo lo script sopra l'elemento _span_, noterai che lo script avrà esito negativo e indicherà che non riesce a trovare un riferimento a nessun elemento _span_ nel documento, ad esempio _getElementsByTagName('span')_ restituirà _null_. Questo dimostra una proprietà importante: il nostro script viene eseguito nel punto preciso in cui viene inserito nel documento. Quando il parser HTML incontra un tag script, sospende il processo di costruzione del DOM e cede il controllo al motore JavaScript; una volta che il motore JavaScript ha ultimato l'esecuzione, il browser riprende da dove si è fermato e continua con la costruzione DOM.

In altre parole, il nostro blocco di script non riesce a trovare altri elementi nella pagina perché non sono stati ancora elaborati. Oppure, messa in termini leggermente diversi: **esecuzione del nostro script inline blocca la costruzione DOM, il che ritarda anche il rendering iniziale.**

Un'altra proprietà ingegnosa dell'introdurre gli script nella nostra pagina è il fatto che possono leggere e modificare non solo il DOM, ma anche le proprietà CSSOM. In realtà, questo è esattamente ciò che stiamo facendo nel nostro esempio, quando cambiamo la proprietà di visualizzazione dell'elemento span da `none` a `inline`. Il risultato finale? Adesso abbiamo una race condition.

Cosa succede se il browser non ha terminato il download e la costruzione del CSSOM nel momento in cui vogliamo eseguire lo script? La risposta è semplice e non molto positiva per le performance: **il browser ritarderà l'esecuzione dello script finché non avrà terminato il download e la costruzione di CSSOM, e, mentre aspettiamo, anche la costruzione DOM è bloccata.**

In poche parole, JavaScript introduce tantissime nuove dipendenze tra l'esecuzione di DOM, CSSOM e JavaScript e può causare ritardi significativi nella rapidità in cui il browser può elaborare ed eseguire il rendering della nostra pagina sullo schermo:

1. La posizione dello script nel documento è significativa.
2. La costruzione DOM viene sospesa quando si incontra un tag script e fino al completamento dell'esecuzione dello script.
3. JavaScript può eseguire query e modificare il DOM e il CSSOM.
4. L'esecuzione JavaScript viene ritardata finché CSSOM non è pronto.

Quando parliamo di 'ottimizzare il percorso di rendering critico', in buona parte stiamo parlando di comprendere e ottimizzare il grafico di dipendenze tra HTML, CSS e JavaScript.


## Blocco parser vs. JavaScript asincrono

Per impostazione predefinita, l'esecuzione di JavaScript è 'blocco parser': quando il browser incontra uno script nel documento deve sospendere la costruzione DOM, passare il controllo al runtime JavaScript e lasciare che lo script si esegua prima di procedere con la costruzione DOM. Abbiamo già visto questo in azione con uno script inline nel nostro esempio precedente. In realtà, gli script inline sono sempre blocco parser a meno di non prendere accorgimenti speciali e scrivere un codice aggiuntivo per rinviarne l'esecuzione.

Per quanto riguarda gli script inclusi tramite tag script? Prendiamo il nostro esempio precedente ed estraiamo il nostro codice in un file separato:

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

Ti aspetteresti che l'ordine di esecuzione fosse diverso utilizzando un tag `<script>` invece di uno snippet inline JavaScript? Ovviamente, la risposta è "no" dato che sono identici e devono comportarsi nello stesso modo. In entrambi i casi, il browser dovrà fermarsi ed eseguire lo script prima di poter elaborare la parte restante del documento. Tuttavia, **nel caso di un file JavaScript esterno, il browser dovrà anche sospendere e attendere che lo script sia recuperato dal disco, dalla cache o da un server remoto, il che può aggiungere decine di migliaia di millisecondi di ritardo al percorso di rendering critico.**

Detto questo, buone notizie, abbiamo una scappatoia. Per impostazione predefinita, tutti i JavaScript sono blocco parser e il browser non sa ciò che lo script sta pianificando di eseguire sulla pagina, per questo deve presumere lo scenario peggiore possibile e bloccare il parser. Tuttavia, se potessimo segnalare al browser e informarlo che lo script non deve essere eseguito nel punto esatto in cui vi viene fatto riferimento nel documento? In questo modo, il browser potrebbe continuare a costruire il DOM e lasciare che lo script si esegua una volta pronto, ad esempio, quando il file è stato recuperato dalla cache o da un server remoto.

Quindi come otteniamo questo risultato? È molto semplice, contrassegniamo il nostro script come _async_:

{% include_code src=_code/split_script_async.html snippet=full %}

Aggiungendo la parola chiave async al tag script, questo informa il browser che non deve bloccare la costruzione del DOM mentre attende che lo script divenga disponibile, questa è un'ottima vittoria per la performance.



