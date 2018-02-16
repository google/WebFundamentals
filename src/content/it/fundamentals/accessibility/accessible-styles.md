project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Utilizzare stili appropriati per migliorare l'accessibilità

{# wf_updated_on: 2018-02-16 #}
{# wf_published_on: 2016-10-04 #}

# Stili accessibili {: .page-title}

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

Abbiamo esplorato due dei pilastri cruciali dell'accessibilità, la
concentrazione e la semantica. Ora affrontiamo il terzo: lo stile. È un
argomento ampio che possiamo trattare in tre sezioni.

- Garantire che gli elementi siano disegnati per supportare i nostri sforzi di
accessibilità aggiungendo stili per lo stato attivo e vari stati ARIA.
- Disegnare le nostre interfacce utente per la flessibilità in modo che possano
essere ingrandite o ridimensionate per soddisfare gli utenti che potrebbero
avere problemi con il testo di piccole dimensioni.
- Scegliere i colori e il contrasto giusti per evitare di trasmettere
informazioni solo attraverso il colore.

## Stile di messa a fuoco

Generalmente, ogni volta che focalizziamo un elemento, ci basiamo sul cerchio di
messa a fuoco integrato nel browser (la proprietà CSS `outline`) per modellare
l'elemento. Il cerchio di messa a fuoco è utile perché, senza di esso, è
impossibile per un utente della tastiera indicare su quale elemento ha il focus.
La [cheklist WebAIM](http://webaim.org/standards/wcag/checklist){: .external}
puntualizza, richiedendo che "è visivamente evidente quale elemento della pagina
ha il focus della tastiera (cioè, mentre si sfoglia la pagina, è possibile
vedere dove ci si trova)."

![form elements with a focus ring](imgs/focus-ring.png)

Tuttavia, a volte l'anello di messa a fuoco può apparire distorto o potrebbe non
adattarsi al design della pagina. Alcuni sviluppatori rimuovono completamente
questo stile impostando il `outline` dell'elemento su `0` o `none`. Ma senza un
indicatore di messa a fuoco, in che modo un utente di tastiera dovrebbe sapere
con quale elemento interagiscono?

Warning: non impostare mai outline a 0 o none senza fornire una messa a fuoco
alternativa!

Potresti avere familiarità con l'aggiunta di stati al passaggio del mouse ai
tuoi controlli usando la *pseudo-classe* CSS `:hover`. Ad esempio, è possibile
utilizzare `:hover` su un elemento di collegamento per cambiarne il colore o lo
sfondo quando il mouse si trova su di esso. Simile a `:hover`, è possibile
utilizzare la pseudo-classe `:focus` per indirizzare un elemento quando è
attivo.

```
/* At a minimum you can add a focus style that matches your hover style */
:hover, :focus {
  background: #c0ffee;
}
```

Una soluzione alternativa al problema della rimozione dell'anello di messa a
fuoco consiste nel dare al tuo elemento gli stessi stili di passaggio del mouse
e di messa a fuoco, che risolvono il problema "dove è il fuoco?" per gli utenti
della tastiera. Come al solito, migliorare l'esperienza di accessibilità
migliora l'esperienza di tutti.

### Modalità di input

![a native HTML button with a focus ring](imgs/sign-up.png){: .attempt-right }

Per gli elementi nativi come `button`, i browser possono rilevare se
l'interazione dell'utente si è verificata tramite mouse o tastiera e in genere
visualizza solo l'anello di messa a fuoco per l'interazione con la tastiera. Ad
esempio, quando si fa clic su un `button` nativo con il mouse non vi è alcun
anello di messa a fuoco, ma quando si accede ad esso con la tastiera appare
l'anello di messa a fuoco.

Questa logica poiché gli utenti del mouse hanno meno probabilità di aver bisogno
della messa a fuoco perché sanno su quale elemento hanno fatto clic.
Sfortunatamente non esiste al momento una soluzione cross-browser per uniformare
questo comportamento. Di conseguenza, se si applica lo stile `:focus` ad un
elemento, verrà visualizzato  *sia* per l'utente che fa clic sull'elemento sia
per il focus da tastiera. Prova a fare clic su questo finto pulsante e noterai
che lo stile `:focus` viene sempre applicato.

```
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">Click Me!</fake-button>
```

{% framebox height="80px" %}

<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>

<fake-button tabindex="0">Cliccami!</fake-button>
{% endframebox %}

Questo può essere un po' fastidioso e spesso lo sviluppatore ricorre all'uso di
JavaScript con controlli personalizzati per aiutare a distinguere tra mouse e
tastiera.

In Firefox, la pseudo-classe CSS `:-moz-focusring` consente di scrivere uno
stile di messa a fuoco che viene applicato solo se l'elemento è focalizzato
tramite la tastiera, una caratteristica piuttosto utile. Mentre questa
pseudo-classe è attualmente supportata solo in Firefox, al [momento è in corso
il lavoro per trasformarlo in uno standard](https://github.com/wicg/modality){:
.external}.

C'è anche [questo fantastico articolo di Alice Boxhall e Brian
Kardell](https://www.oreilly.com/ideas/proposing-css-input-modality){:
.external} che esplora l'argomento della modalità e contiene il codice prototipo
per differenziare l'input da mouse e tastiera. Puoi usare oggi la loro
soluzione, quindi includere la pseudo-classe del focus ring più tardi quando
avrà un supporto più diffuso.

## Stili di stato con ARIA

Quando si creano componenti, è prassi comune adattare il loro stato e, quindi,
il loro aspetto, utilizzando le classi CSS controllate con JavaScript.

Ad esempio, si consideri un pulsante di attivazione che si trasforma in uno
stato visivo "premuto" quando viene fatto clic e mantiene tale stato fino a
quando non viene fatto nuovamente clic. Per definire lo stato, il tuo JavaScript
potrebbe aggiungere una classe `pressed` al pulsante. E, dato che vuoi una buona
semantica su tutti i tuoi controlli, devi anche impostare lo stato
`aria-pressed` per il pulsante su `true` .

Una tecnica utile da impiegare qui è quella di rimuovere completamente la
classe, ed usare gli attributi ARIA per modellare l'elemento. Ora puoi
aggiornare il selettore CSS per lo stato premuto del pulsante da così

```
.toggle.pressed { ... }
```

a così:

```
.toggle[aria-pressed="true"] { ... }
```

Ciò crea una relazione sia logica che semantica tra lo stato ARIA e l'aspetto
dell'elemento e riduce anche il codice aggiuntivo.

## Responsive design multi-dispositivo

Sappiamo che è una buona idea progettare in maniera responsive per offrire la
migliore esperienza multi-dispositivo, ma il design responsive  produce anche un
miglioramento dell'accessibilità.

Prendi in considerazione un sito come
[Udacity.com](https://www.udacity.com/courses/all) :

![Udacity.com at 100% magnification](imgs/udacity.jpg)

Un utente ipovedente che ha difficoltà a leggere in caratteri piccoli potrebbe
ingrandire la pagina, forse fino al 400%. Poiché il sito è progettato in maniera
reactive, l'interfaccia utente si riorganizzerà in "viewport più piccoli" (in
realtà per la pagina più grande), il che è ottimo per gli utenti desktop che
richiedono l'ingrandimento dello schermo e anche per gli utenti di screen reader
mobili. È una vittoria per tutti. Ecco la stessa pagina ingrandita al 400%:

![Udacity.com at 400% magnification](imgs/udacity-zoomed.jpg)

Infatti, solo progettando in modo reactive, stiamo rispettando la [regola 1.4.4
della checklist WebAIM](http://webaim.org/standards/wcag/checklist#sc1.4.4){:
.external}, che afferma che una pagina "... dovrebbe essere leggibile e
funzionale quando la dimensione del testo è raddoppiata".

Approfondire tutto il responsive design non rientra negli obiettivi di questa
guida, ma ci sono alcuni aspetti importanti che porteranno benefici alla tua
esperienza responsive e offriranno ai tuoi utenti un migliore accesso ai
contenuti.

- Innanzitutto, assicurati di utilizzare sempre il metatag della `viewport`
appropriato. <br> `<meta name="viewport" content="width=device-width,
initial-scale=1.0">` <br> Impostando `width=device-width` ci sarò corrispondenza
tra la larghezza dello schermo ed i pixel indipendenti dal dispositivo e
l'impostazione `initial-scale=1` stabilisce una relazione 1: 1 tra pixel CSS e
pixel indipendenti dal dispositivo. In questo modo il browser adatterà il tuo
contenuto alle dimensioni dello schermo, in modo che gli utenti non vedano solo
un mucchio di testo accartocciato.

![a phone display without and with the viewport meta tag](imgs/scrunched-up.jpg)

Warning: quando si utilizza il meta tag viewport, assicurarsi di non impostare
la maximum-scale=1 o impostare user-scaleable=no. Consenti agli utenti di
ingrandire se necessario!

- Un'altra tecnica da tenere a mente è progettare con una griglia responsive.
Come hai visto con il sito di Udacity, progettare con una griglia significa che
il tuo contenuto si ridimensionerà quando la pagina cambia dimensione. Spesso
questi layout sono prodotti utilizzando unità relative come percentuali, ems o
rems invece di valori di pixel pre-codificati. Il vantaggio di farlo in questo
modo è che il testo ed il contenuto possono ingrandirsi e forzare gli altri
elementi all'interno della pagina. Quindi l'ordine DOM e l'ordine di lettura
rimangono gli stessi, anche se il layout cambia a causa dell'ingrandimento.

- Inoltre, considera l'utilizzo di unità relative come `em` o `rem` per cose
come la dimensione del testo, anziché i valori dei pixel. Alcuni browser
supportano il ridimensionamento del testo solo nelle preferenze dell'utente e,
se stai utilizzando un valore in pixel per il testo, questa impostazione non
influirà sulla tua copia. Se, tuttavia, hai utilizzato unità relative in tutto,
la copia del sito verrà aggiornata per riflettere le preferenze dell'utente.

- Infine, quando il tuo progetto viene visualizzato su un dispositivo mobile,
dovresti assicurarti che gli elementi interattivi come pulsanti o collegamenti
siano abbastanza grandi e abbiano abbastanza spazio intorno a loro, per renderli
facili da premere senza sovrapporsi accidentalmente ad altri elementi. Ciò
avvantaggia tutti gli utenti, ma è particolarmente utile per chiunque abbia una
disabilità motoria.

Una dimensione minima del target di tocco consigliata è di circa 48 pixel
indipendenti dal dispositivo su un sito con una viewport mobile correttamente
impostata. Ad esempio, mentre un'icona può avere solo una larghezza e un'altezza
di 24 px, puoi utilizzare un riempimento aggiuntivo per portare la dimensione
del target dei tocchi fino a 48px. L'area di 48x48 pixel corrisponde a circa 9
mm, che è circa delle dimensioni dell'area di un dito di una persona.

![a diagram showing a couple of 48 pixel touch targets](imgs/touch-target.jpg)

I target tattili devono essere distanziati di circa 32 pixel tra loro, sia
orizzontalmente che verticalmente, in modo che il dito dell'utente che preme su
un target di tocco non tocchi inavvertitamente un altro target.

![a diagram showing 32 pixels of space around a touch
target](imgs/touch-target2.jpg)

## Colore e contrasto

Se hai una buona visione, è facile presumere che tutti percepiscano i colori, o
la leggibilità del testo, nello stesso modo in cui lo fai tu, ma ovviamente non
è così. Diamo un'occhiata a come possiamo usare efficacemente il colore e il
contrasto per creare disegni piacevoli accessibili a tutti.

Come puoi immaginare, alcune combinazioni di colori che sono facili da leggere
per alcune persone sono difficili o impossibili per altre. Questo di solito si
riduce al *contrasto del colore*, la relazione tra la *luminosità* del colore di
primo piano e dello sfondo. Quando i colori sono simili, il rapporto di
contrasto è basso; quando sono diversi, il rapporto di contrasto è alto.

Le [linee guida WebAIM](http://webaim.org/standards/wcag/){: .external}
consigliano un rapporto di contrasto AA (minimo) di 4,5:1 per tutto il testo.
Viene fatta un'eccezione per testo molto grande (120-150% più grande del testo
del corpo predefinito), per il quale il rapporto può scendere a 3:1. Notare la
differenza nei rapporti di contrasto mostrati sotto.

![comparison of various contrast ratios](imgs/contrast-ratios.jpg)

Il rapporto di contrasto di 4,5:1 è stato scelto per il livello AA in quanto
compensa la perdita di sensibilità al contrasto solitamente riscontrata da
utenti con perdita della vista equivalente a circa 20/40 di vista. 20/40 è
comunemente riportato come acuità visiva tipica delle persone di circa 80 anni.
Per gli utenti con problemi di ipovisione o carenze di colore, possiamo
aumentare il contrasto fino a 7:1 per il corpo del testo.

Puoi utilizzare l'[estensione Accessibility
DevTools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){:
.external} per Chrome per identificare i rapporti di contrasto. Uno dei vantaggi
dell'utilizzo di Chrome Devtools è che suggeriscono alternative AA e AAA
(migliorate) ai colori correnti, e puoi fare clic sui valori per visualizzarli
in anteprima nella tua app.

Per eseguire un controllo colore/contrasto, seguire questi semplici passaggi:

1. Dopo aver installato l'estensione, fai clic su `Audits`
2. Deseleziona tutto tranne `Accessibility`
3. Fai clic su `Audit Present State`
4. Notate tutti gli avvisi di contrasto

![the devtools contrast audit dialog](imgs/contrast-audit.png)

WebAIM fornisce di per sé un pratico [controllo del contrasto del
colore](http://webaim.org/resources/contrastchecker/){: .external} che puoi
usare per esaminare il contrasto di qualsiasi coppia di colori.

### Non trasmettere informazioni solo con il colore

Ci sono circa 320 milioni di utenti con deficit di visione dei colori. Circa 1
uomo su 12 e 1 donna su 200 hanno una qualche forma di "cecità ai colori"; ciò
significa che circa 1/20 o 5% dei tuoi utenti non sperimenteranno il tuo sito
nel modo desiderato. Quando ci affidiamo al colore per trasmettere informazioni,
spingiamo quel numero a livelli inaccettabili.

Note: il termine "daltonismo" è spesso usato per descrivere una condizione
visiva in cui una persona ha difficoltà a distinguere i colori, ma in realtà
pochissime persone sono davvero daltoniche. La maggior parte delle persone con
deficit di colore possono vedere alcuni o più colori, ma hanno difficoltà a
distinguere tra alcuni colori come rosso e verde (più comune), marrone e
arancio, e blu e viola.

Ad esempio, in un modulo di immissione, un numero di telefono potrebbe essere
sottolineato in rosso per mostrare che non è valido. Ma per un utente con
problemi di colore o di screen reader, questa informazione non viene trasmessa
bene, o non del tutto. Pertanto, dovresti sempre provare a fornire più strade
per consentire all'utente di accedere alle informazioni critiche.

![an input form with an error underlined in red](imgs/input-form1.png)

La [checklist WebAIM afferma nella sezione
1.4.1](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external} che "il
colore non deve essere utilizzato come unico metodo per trasmettere contenuto o
distinguere elementi visivi." Rileva inoltre che "il colore da solo non deve
essere utilizzato per distinguere i collegamenti dal testo circostante" a meno
che non soddisfino determinati requisiti di contrasto. Invece la checklist
raccomanda di aggiungere un indicatore aggiuntivo come un trattino basso (usando
la proprietà di `text-decoration` CSS) per indicare quando il link è attivo.

Un modo semplice per correggere l'esempio precedente è aggiungere un messaggio
aggiuntivo al campo, annunciando che non è valido e perché.

![an input form with an added error message for clarity](imgs/input-form2.png)

Quando crei un'app, tieni a mente questo tipo di cose e fai attenzione alle aree
in cui potresti affidarti troppo al colore per trasmettere informazioni
importanti.

Se sei curioso di conoscere il modo in cui il tuo sito guarda a persone diverse,
o se fai affidamento sull'uso del colore nell'interfaccia utente, puoi
utilizzare l'[estensione NoCoffee
Chrome](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){:
.external} per simulare varie forme di disabilità visive, tra cui diverse tipi
di daltonismo.

### Modalità ad alto contrasto

La modalità ad alto contrasto consente all'utente di invertire i colori di primo
piano e di sfondo, che spesso aiutano a migliorare il testo. Per le persone con
problemi di vista, la modalità ad alto contrasto può rendere molto più semplice
la navigazione del contenuto sulla pagina. Ci sono alcuni modi per ottenere una
configurazione ad alto contrasto sulla tua macchina.

Sistemi operativi come Mac OSX e Windows offrono modalità ad alto contrasto che
possono essere abilitate per tutto a livello di sistema. Oppure gli utenti
possono installare un'estensione, come l'estensione [Chrome ad alto
contrasto](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){:
.external} per abilitare il contrasto elevato solo in quella specifica app.

Un esercizio utile è quello di attivare le impostazioni ad alto contrasto e
verificare che tutta l'interfaccia utente dell'applicazione sia ancora visibile
e utilizzabile.

Ad esempio, una barra di navigazione potrebbe utilizzare un colore di sfondo
sottile per indicare quale pagina è attualmente selezionata. Se lo visualizzi in
un'estensione ad alto contrasto, questa sottigliezza scompare completamente e
con essa il lettore capisce quale pagina è attiva.

![a navigation bar in high contrast mode](imgs/tab-contrast.png)

Allo stesso modo, se si considera l'esempio della lezione precedente, la
sottolineatura rossa nel campo del numero di telefono non valido potrebbe essere
visualizzata in un colore blu-verde difficile da distinguere.

![a form with an error field in high contrast mode](imgs/high-contrast.jpg)

Se si rispettano i rapporti di contrasto indicati nelle lezioni precedenti, si
dovrebbe andare bene quando si tratta di supportare la modalità ad alto
contrasto. Tuttavia, per maggiore tranquillità, considera l'installazione
dell'estensione Chrome High Contrast e analizza la pagina per verificare che
tutto funzioni e si presenti come previsto.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
