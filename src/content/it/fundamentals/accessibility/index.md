project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Migliorare l'accessibilità delle pagine web

{# wf_updated_on: 2017-07-19 #}
{# wf_published_on: 2016-06-26 #}

# Accessibilità {: .page-title}

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

Questo set di documenti è una versione testuale di parte del contenuto trattato
nel [corso Udacity di
Accessibilità](https://www.udacity.com/course/web-accessibility--ud891){:
.external}. Al posto di una trascrizione diretta del corso video, è pensato per
essere un trattamento più conciso dei principi e delle pratiche di
accessibilità, utilizzando come base il contenuto originale del corso.

### TL;DR {: .hide-from-toc }

- Scopri cosa significa accessibilità e come si applica allo sviluppo web.
- Scopri come rendere i siti web accessibili e utilizzabili da tutti.
- Scopri come includere l'accessibilità di base con un impatto minimo sullo
sviluppo.
- Scopri quali sono le funzionalità HTML disponibili e come utilizzarle per
migliorare l'accessibilità.
- Scopri le tecniche di accessibilità avanzate per creare esperienze di
accessibilità ottimizzate.

Comprendere l'accessibilità, la sua portata e il suo impatto può renderti uno
sviluppatore web migliore. Questa guida ha lo scopo di aiutarti a capire in che
modo puoi rendere i tuoi siti web accessibili ed utilizzabili da tutti.

"Accessibilità" può essere difficile da pronunciare, ma non deve essere
difficile da realizzare. In questa guida vedrai come raggiungere alcuni facili
successi per contribuire a migliorare l'accessibilità con il minimo sforzo, come
puoi utilizzare ciò che è incorporato in HTML per creare interfacce più
accessibili e robuste e come sfruttare alcune tecniche avanzate per creare
esperienze accessibili raffinate.

Scoprirai inoltre che molte di queste tecniche ti aiuteranno a creare interfacce
più piacevoli e facili da usare per *tutti gli* utenti, non solo per le persone
con disabilità.

Naturalmente, molti sviluppatori hanno solo una vaga comprensione di cosa
significhi accessibilità - qualcosa a che fare con contratti governativi, liste
di controllo e screen reader, giusto? - e ci sono un sacco di idee sbagliate che
ci girano intorno. Ad esempio, molti sviluppatori ritengono che affrontare
l'accessibilità li costringerà a scegliere tra la creazione di un'esperienza
piacevole e attraente, ed una goffa e brutta ma accessibile.

Ovviamente, questo non è affatto il caso, quindi chiariamolo prima di entrare in
qualsiasi altra cosa. Cosa intendiamo per accessibilità e cosa siamo qui per
imparare?

## Cos'è l'accessibilità?

In generale, quando diciamo che un sito è accessibile, intendiamo che il
contenuto del sito è disponibile e che la sua funzionalità può essere gestita da
*chiunque* letteralmente. Come sviluppatori, è facile presumere che tutti gli
utenti possano vedere e utilizzare una tastiera, un mouse o un touchscreen e
possono interagire con il contenuto della pagina nello stesso modo in cui lo fai
tu. Ciò può portare a un'esperienza che funziona bene per alcune persone, ma
crea problemi che vanno da semplici fastidi a veri e propri scogli per gli
altri.

L'accessibilità, quindi, si riferisce all'esperienza di utenti che potrebbero
trovarsi al di fuori della ristretta fascia di utenti "tipici", che potrebbero
accedere o interagire con le cose in modo diverso da quanto previsto.
Specificamente, riguarda gli utenti che stanno vivendo un qualche tipo di
menomazione o disabilità - e si ricorda che tale esperienza potrebbe essere non
fisica o temporanea.

Ad esempio, sebbene tendiamo a concentrare la nostra discussione
sull'accessibilità agli utenti con menomazioni fisiche, possiamo tutti riferirci
all'esperienza di utilizzo di un'interfaccia che non è accessibile a noi per
altri motivi. Hai mai avuto problemi a utilizzare un sito desktop su un telefono
cellulare o hai visualizzato il messaggio "Questo contenuto non è disponibile
nella tua zona" oppure non è stato possibile trovare un menu familiare su un
tablet? Questi sono tutti problemi di accessibilità.

Man mano che imparerai di più, scoprirai che affrontare i problemi di
accessibilità in un senso più ampio e più generale migliora quasi sempre
l'esperienza utente per tutti. Diamo un'occhiata ad un esempio:

![a form with poor accessibility](imgs/pooraccess.jpg)

Questo modulo ha diversi problemi di accessibilità.

- Il testo è a basso contrasto, difficile da leggere per gli utenti ipovedenti.
- Avere etichette a sinistra e campi a destra rende difficile l'associazione per
molte persone e quasi impossibile per qualcuno che ha bisogno di zoomare
l'utilizzo della pagina; immagina di guardarlo su un telefono e di dover fare
una panoramica per capire cosa va con cosa.
- L'etichetta "Remember details?" non è associata alla casella di controllo,
quindi è necessario toccare o fare clic solo sul quadratino piuttosto che fare
semplicemente clic sull'etichetta; inoltre, qualcuno che utilizza uno screen
reader avrebbe difficoltà a capire l'associazione.

Ora agitiamo la nostra bacchetta dell'accessibilità e vediamo il modulo con i
problemi risolti. Metteremo il testo più scuro, modificheremo il design in modo
che le etichette siano vicine alle etichette che stanno etichettando e
correggeremo l'etichetta da associare alla casella di controllo in modo da
poterla attivare facendo clic anche sull'etichetta.

![a form with improved accessibility](imgs/betteraccess.jpg)

Quale preferisci usare? Se hai detto "la versione accessibile", sei sulla buona
strada per capire una premessa principale di questa guida. Spesso, qualcosa che
è un blocco completo per pochi utenti è anche un punto dolente per molti altri,
quindi risolvendo il problema dell'accessibilità si migliora l'esperienza per
tutti.

## Linee guida per l'accessibilità del contenuto Web

In questa guida faremo riferimento a [Web Content Accessibility Guidelines
(WCAG) 2.0](https://www.w3.org/TR/WCAG20/){: .external}, una serie di linee
guida e migliori pratiche messe insieme dagli esperti di accessibilità per
affrontare cosa significa "accessibilità" in modo metodico.

WCAG è organizzato attorno a quattro principi spesso chiamati con l'acronimo
*POUR* :

- **Percepibile**: gli utenti possono percepire il contenuto? Questo ci aiuta a
ricordare che solo perché qualcosa è percepibile con un senso, come la vista,
ciò non significa che tutti gli utenti possano percepirlo.

- **Operativo**: gli utenti possono utilizzare i componenti dell'interfaccia
utente e navigare nel contenuto? Ad esempio, qualcosa che richiede
un'interazione al passaggio del mouse non può essere gestito da qualcuno che non
può utilizzare un mouse o un touch screen.

- **Comprensibile (Understandable)**: gli utenti possono comprendere il
contenuto? Gli utenti possono comprendere l'interfaccia ed è abbastanza coerente
da evitare confusione?

- **Robusto**: il contenuto può essere utilizzato da un'ampia varietà di agenti
utente (browser)? Funziona con la tecnologia assistiva?

Mentre WCAG fornisce una panoramica completa di ciò che significa un contenuto
accessibile, può anche essere un po' schiacciante. Per contribuire a mitigare
ciò, il gruppo [WebAIM](http://webaim.org/){: .external} (Web Accessibility in
Mind) ha distillato le linee guida WCAG in una checklist facile da seguire,
mirata specificamente per i contenuti web.

La [checklist di WebAIM](http://webaim.org/standards/wcag/checklist){:
.external} può fornire un breve riepilogo di alto livello di ciò che è
necessario implementare, collegandosi anche alle specifiche WCAG sottostanti se
è necessaria una definizione espansa.

Con questo strumento in mano, puoi indicare la direzione del tuo lavoro di
accessibilità ed essere sicuro che, finché il tuo progetto soddisfa i criteri
delineati, i tuoi utenti avranno un'esperienza positiva nell'accedere ai tuoi
contenuti.

## Comprensione della diversità degli utenti

Quando si impara l'accessibilità, aiuta avere una comprensione della vasta gamma
di utenti nel mondo e dei tipi di argomenti di accessibilità che li riguardano.
Per spiegare ulteriormente, ecco una sessione di domande/risposte informative
con Victor Tsaran, un Technical Program Manager di Google, che è totalmente
cieco.

<figure class="attempt-right">
  <img src="imgs/victor_tsaran.jpg" alt="Victor Tsaran">	
  <figcaption>Victor Tsaran</figcaption>
</figure>

<hr>

> *Su cosa lavori in Google?*

All'interno di Google il mio compito è quello di contribuire a garantire che i
nostri prodotti funzionino per tutti i nostri diversi utenti, indipendentemente
dalla loro menomazione o capacità.

> *Quali tipi di menomazioni hanno gli utenti?*

Quando pensiamo ai tipi di menomazioni che renderebbero difficile per qualcuno
accedere ai nostri contenuti, molte persone immagineranno immediatamente un
utente cieco come me. Ed è vero, questo deterioramento può davvero rendere
frustrante o addirittura impossibile utilizzare molti siti web.

Molte tecniche web moderne hanno lo sfortunato effetto collaterale di creare
siti che non funzionano bene con gli strumenti utilizzati dagli utenti non
vedenti per accedere al web. Tuttavia, in realtà c'è più accessibilità di
quella. Riteniamo utile pensare a limitazioni che ricadono in quattro
contenitori: visivo, motorio, uditivo e cognitivo.

> *Analizziamole una alla volta. Puoi dare alcuni esempi di disabilità visive?*

Le disabilità visive possono essere suddivise in poche categorie: gli utenti
senza vista, come me, potrebbero utilizzare uno screen reader, il braille o una
combinazione dei due.

<figure class="attempt-right">
  <img src="imgs/braille-reader.png" alt="A braille reader">	
  <figcaption>Un lettore braille</figcaption>
</figure>

Ora, in realtà è piuttosto insolito non avere letteralmente visione, ma
comunque, ci sono buone probabilità che tu conosca o abbia incontrato almeno una
persona che non può vedere affatto. Tuttavia, ci sono anche un numero molto più
grande di quelli che chiamiamo utenti ipovedenti.

Si tratta di una vasta gamma, da qualcuno come mia moglie, che non ha cornee -
anche se riesce a vedere le cose che ha difficoltà a leggere le stampe ed è
considerata legalmente cieca - a qualcuno che potrebbe avere solo una visione
limitata ed ha bisogno di indossare occhiali da vista molto spessi.

Si tratta di una gamma vasta, e quindi naturalmente c'è una vastità di
casistiche di persone in questa categoria d'uso: alcuni usano uno screen reader
o un display braille (ho persino sentito parlare di una donna che legge il
braille visualizzato sullo schermo perché è più facile per vedere che il testo
stampato), o potrebbero usare la tecnologia text-to-speech senza la funzionalità
full screen reader, oppure potrebbero usare una lente di ingrandimento che
ingrandisce lo schermo o potrebbero semplicemente usare lo zoom del browser per
fare tutti i caratteri più grandi. Potrebbero anche utilizzare opzioni ad alto
contrasto come una modalità ad alto contrasto del sistema operativo,
un'estensione per il browser ad alto contrasto o un tema ad alto contrasto per
un sito web.

<figure class="attempt-right">
  <img src="imgs/high-contrast.png" alt="High-contrast mode">	
  <figcaption>Modalità ad alto contrasto</figcaption>
</figure>

Molti utenti usano anche questa combinazione, come la mia amica Laura che usa
una combinazione di modalità ad alto contrasto, zoom del browser e sintesi
vocale.

L'ipovisione è qualcosa a cui molte persone possono fare riferimento. Per
iniziare, tutti noi sperimentiamo una visione deteriorante mentre invecchiamo,
quindi anche se non l'hai provato, ci sono buone probabilità che tu abbia
sentito i tuoi genitori lamentarsi di ciò. Ma molte persone provano la
frustrazione di portare il proprio laptop fuori da una finestra soleggiata solo
per scoprire che improvvisamente non possono leggere nulla! O chiunque abbia
avuto una chirurgia laser o forse deve solo leggere qualcosa dall'altra parte
della stanza potrebbe aver usato uno di questi strumenti che ho citato. Quindi
penso che sia abbastanza facile per gli sviluppatori avere un po' di empatia per
gli utenti ipovedenti.

Oh, e non dovrei dimenticare di menzionare le persone con scarsa visione dei
colori - circa il 9% dei maschi ha una qualche forma di mancanza di visione dei
colori! Più circa l'1% delle donne. Possono avere difficoltà a distinguere rosso
e verde, o giallo e blu. Pensa a ciò la prossima volta che progetti la convalida
di un modulo.

> *E a proposito dei problemi motori?*

Sì, menomazioni motorie o di destrezza. Questo gruppo spazia da quelli che
preferirebbero non usare un mouse, perché forse hanno avuto qualche RSI o
qualcosa del genere e lo trovano doloroso, a qualcuno che potrebbe essere
paralizzato fisicamente e avere un raggio di movimento limitato per alcune parti
della loro corpo.

<figure class="attempt-right">
  <img src="imgs/eye-tracking.png" alt="A person using an eye tracking device">	
  <figcaption>Un dispositivo per localizzare gli occhi</figcaption>
</figure>

Gli utenti con problemi motori possono utilizzare una tastiera, un dispositivo
di commutazione, un comando vocale o persino un dispositivo di localizzazione
degli occhi per interagire con il proprio computer.

Simile alla menomazione della vista, la mobilità può anche essere un problema
temporaneo o situazionale: potresti avere un polso rotto sulla mano del mouse.
Forse il trackpad è rotto sul tuo portatile, o stai semplicemente viaggiando su
un treno traballante. Ci possono essere molte situazioni in cui la mobilità di
un utente è impedita, ed assicurandoci di provvedere per questo miglioriamo
l'esperienza complessiva, sia per chi ha una disabilità permanente, sia per chi
trova temporaneamente che non può usare un puntatore basato su UI.

> *Ottimo, parliamo di problemi all'udito.*

Questo gruppo può spaziare dal profondamente sordo fino ai problemi di udito. E
proprio come la vista, il nostro udito tende a degradare con l'età. Molti di noi
usano le convenienze comuni come gli apparecchi acustici per aiutarsi.

<figure class="attempt-right">
<img src="imgs/screen-captions.png" alt="A television with captions at the
bottom">
  <figcaption>Didascalie delle schermate</figcaption>
</figure>

Per gli utenti con problemi di udito, dobbiamo assicurarci di non fare
affidamento sull'audio, quindi assicurati di utilizzare elementi come
sottotitoli e trascrizioni video e di fornire qualche tipo di alternativa, se il
suono fa parte dell'interfaccia.

E come abbiamo visto con la vista e le menomazioni motorie, è davvero facile
immaginare una situazione in cui qualcuno a cui le orecchie funzionano bene può
trarre beneficio da questi accorgimenti. Molti miei amici dicono di apprezzare
quando i video hanno didascalie e trascrizioni perché significa che se sono in
un ufficio open space e non portano le cuffie, possono comunque guardare il
video!

> *Va bene, puoi dirci qualcosa sui problemi cognitivi?*

C'è una serie di condizioni cognitive come ADD, dislessia e autismo, il che può
significare che le persone vogliono o hanno bisogno di accedere alle cose in
modo diverso. Gli accorgimenti per questi gruppi sono naturalmente estremamente
diverse, ma sicuramente troviamo qualche sovrapposizione con altre aree, come
l'utilizzo della funzionalità di zoom per facilitare la lettura o la
concentrazione. Inoltre, questi utenti potrebbero scoprire che il design
minimale funziona meglio perché riduce al minimo la distrazione ed il carico
cognitivo.

Penso che tutti possano relazionarsi allo stress del sovraccarico cognitivo,
quindi è ovvio che se creiamo qualcosa che funzioni bene per qualcuno con un
deficit cognitivo, creeremo qualcosa che sarà un'esperienza piacevole per tutti.

> *Quindi, come riassumeresti il ​​tuo modo di pensare all'accessibilità?*

Quando osservi l'ampia gamma di abilità e disabilità che le persone potrebbero
avere, puoi vedere che progettare e costruire prodotti solo per le persone che
hanno una visione perfetta, l'udito, la destrezza e la cognizione sembrano
incredibilmente stringenti. È quasi autolesionistico, perché stiamo creando
un'esperienza più stressante e meno utilizzabile per tutti, e per alcuni utenti
la stessa esperienza li esclude del tutto.

<hr>

In questa intervista, Victor ha identificato una serie di menomazioni e le ha
suddivise in quattro categorie: *visiva*, *motoria*, *uditiva* e *cognitiva*. Ha
anche sottolineato che ogni tipo di menomazione potrebbe essere *situazionale*,
*temporanea* o *permanente*.

Diamo un'occhiata ad alcuni esempi reali di problemi di accesso e vediamo dove
rientrano in quelle categorie e tipi. Si noti che alcune menomazioni possono
rientrare in più di una categoria o tipo.

<table>
  <tr>
    <th></th>
    <th>Situazionale</th>
    <th>Temporanea</th>
    <th>Permanente</th>
  </tr>
  <tr>
    <th>Visiva</th>
    <td></td>
    <td>concussione</td>
    <td>cecità</td>
  </tr>
  <tr>
    <th>Motoria</th>
    <td>tenere un bambino</td>
    <td>braccio rotto, RSI*</td>
    <td>RSI*</td>
  </tr>
  <tr>
    <th>Uditiva</th>
    <td>ufficio rumoroso</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <th>Cognitiva</th>
    <td></td>
    <td>concussione</td>
    <td></td>
  </tr>
</table>

* Lesioni da Sforzi Ripetitivo (RSI): ad es. Sindrome del tunnel carpale, gomito
del tennista, dito del grilletto

## Prossimi passi

Abbiamo già coperto un bel po' di argomenti! Abbiamo parlato di

- cos'è l'accessibilità e perché è importante per tutti
- la checklist dell'accessibilità WCAG e WebAIM
- diversi tipi di menomazioni che dovresti prendere in considerazione

Nel resto della guida, approfondiremo gli aspetti pratici della creazione di
siti Web accessibili. Organizzeremo questo sforzo attorno a tre aree principali:

- [**Focus**](/web/fundamentals/accessibility/focus): vedremo come costruire
cose che possono essere gestite con una tastiera anziché con un mouse. Questo è
importante per gli utenti con problemi motori, ovviamente, ma garantisce anche
che l'interfaccia utente sia ben progettata per tutti gli utenti.

- [**Semantica**](/web/fundamentals/accessibility/semantics-builtin): faremo in
modo da esprimere la nostra interfaccia utente in modo robusto che funzioni con
una varietà di tecnologie assistenziali.

- [**Styling**](/web/fundamentals/accessibility/accessible-styles):
considereremo la progettazione visiva e osserveremo alcune tecniche per rendere
gli elementi visivi dell'interfaccia più flessibili e utilizzabili possibile.

Ognuno di questi argomenti potrebbe riempire un intero corso, quindi non
copriremo ogni aspetto della creazione di siti web accessibili. Tuttavia, ti
forniremo abbastanza informazioni per iniziare e ti indicherò alcuni riferimenti
in cui puoi imparare di più su ciascun argomento.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
