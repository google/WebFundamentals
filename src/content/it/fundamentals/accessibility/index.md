project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Migliorare l'accessibilità delle pagine web

{# wf_updated_on: 2018-09-27 #}
{# wf_published_on: 2016-06-26 #}

# Accessibilità {: .page-title}

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

Questo set di documenti è una versione di testo di parte del contenuto trattato
nel [corso Udacity di
Accessibilità](https://www.udacity.com/course/web-accessibility--ud891){:
.external}. Al posto di una trascrizione diretta del corso video, è pensato per
essere un sunto dei principi e delle pratiche di
accessibilità basato sul contenuto originale del corso.

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

"Accessibilità" può essere un termine complesso ma non deve essere
difficile da realizzare. In questa guida vedrai come raggiungere alcuni facili
risultati per migliorare l'accessibilità con il minimo sforzo, come
utilizzare ciò che è incorporato in HTML per creare interfacce più
accessibili e robuste e infine come sfruttare alcune tecniche avanzate per creare
esperienze accessibili migliori.

Scoprirai inoltre che molte di queste tecniche ti aiuteranno a creare interfacce
più piacevoli e facili da usare per tutti gli utenti, non solo per le persone
con disabilità.

Naturalmente, molti sviluppatori hanno solo una vaga comprensione di cosa
significhi l'accessibilità, pensano che sia una cosa connessa con contratti governativi,
checklist e screen reader. Ci sono un sacco di idee sbagliate che
ci girano intorno. Ad esempio, molti sviluppatori ritengono che affrontare
l'accessibilità li costringerà a scegliere tra la creazione di un'esperienza
piacevole e interessante, e una spiacevole e poco interessante ma accessibile.

Ovviamente non è affatto così, quindi chiariamo il malinteso prima di andare
oltre. Cosa intendiamo per accessibilità e cosa dobbiamo
imparare?

## Che cos'è l'accessibilità?

In generale, quando diciamo che un sito è accessibile, intendiamo che il
contenuto del sito è disponibile e che la sua funzionalità può essere gestita da
*chiunque*, letteralmente. Essendo sviluppatori, è facile presumere che tutti gli
utenti possano vedere e utilizzare una tastiera, un mouse o un touchscreen e
interagire con il contenuto della pagina nello stesso modo in cui lo facciamo noi.
Ciò può fornire un'esperienza fluida per alcune persone ma
può creare problemi, che vanno da semplici fastidi a veri e propri ostacoli, per
altri.

L'accessibilità, quindi, si riferisce all'esperienza di utenti che potrebbero
trovarsi al di fuori della ristretta cerchia di utenti "tipici" e che potrebbero dover
accedere o interagire con il computer diversamente da quanto previsto.
Specificamente, riguarda gli utenti con un qualche tipo di
disturbo o disabilità, e vorrei ricordare che potrebbe non essere necessariamente di natura
fisica o temporanea.

Sebbene tendiamo a concentrarci sull'accessibilità
degli utenti con disabilità fisiche, sappiamo bene cosa significhi
l'esperienza di utilizzare un'interfaccia che non ci è accessibile per altri motivi.
Hai mai avuto problemi a utilizzare un sito per desktop sul telefono
cellulare o hai visualizzato il messaggio "Questo contenuto non è disponibile
nella tua zona" oppure non sei riuscito a trovare un menu conosciuto sul
tablet? Questi sono tutti problemi di accessibilità.

Man mano che imparerai di più, scoprirai che affrontare i problemi di
accessibilità in senso più ampio migliora quasi sempre
l'esperienza utente per tutti. Vediamo un esempio:

![a form with poor accessibility](imgs/pooraccess.jpg)

Questo modulo ha diversi problemi di accessibilità.

- Il testo è a basso contrasto, difficile da leggere per gli utenti ipovedenti.
- Avere etichette a sinistra e campi a destra rende poco chiara l'associazione tra i due
per molti e quasi impossibile per chi fa zoom in modo da
utilizzare la pagina. Immagina di visualizzare il contenuto sul telefono e di dover fare
una panoramica per capire come sono associati i diversi elementi.
- L'etichetta "Remember details?" non è associata alla casella di controllo,
quindi è necessario toccare o fare clic solo sul quadratino piuttosto che fare
semplicemente clic sull'etichetta; inoltre, chi utilizza lo screen
reader potrebbe avere difficoltà a capire che sono associati.

Allora prendiamo la bacchetta magica e vediamo il form con tutti questi
problemi risolti. Rendiamo il testo più scuro, modifichiamo il design in modo
che le etichette siano vicine agli elementi che etichettano e
correggiamo l'etichetta da associare alla casella di controllo per
poterla attivare facendo clic anche sull'etichetta.

![a form with improved accessibility](imgs/betteraccess.jpg)

Quale preferisci usare? Se hai detto "la versione accessibile", sei sulla buona
strada per comprendere uno dei principi di questa guida. Se qualcosa rappresenta
un ostacolo totale per alcuni utenti, spesso è un punto dolente anche per molti altri,
quindi risolvendo il problema dell'accessibilità, migliori l'esperienza per
tutti.

## Linee guida per l'accessibilità del contenuto Web

In questa guida faremo riferimento a [Web Content Accessibility Guidelines
(WCAG) 2.0](https://www.w3.org/TR/WCAG20/){: .external}, una serie di linee
guida e best practice redatte dagli esperti di accessibilità per
affrontare il concetto dell'"accessibilità" in modo sistematico.

WCAG è basato su quattro principi, spesso rappresentati dall'acronimo
*POUR* :

- **Percepibile**: gli utenti possono percepire il contenuto? Questo ci aiuta a
ricordare che se qualcosa è percepibile con un senso, come la vista,
ciò non significa che tutti gli utenti possano percepirlo.

- **Operativo**: gli utenti possono utilizzare i componenti dell'interfaccia
utente e navigare nel contenuto? Ad esempio, qualcosa che richiede
il passaggio del mouse non può essere gestito da chi non
può usare il mouse o il touch screen.

- **Comprensibile (Understandable)**: gli utenti possono comprendere il
contenuto? Gli utenti possono comprendere l'interfaccia ed è coerente abbastanza
da evitare confusione?

- **Robusto**: il contenuto può essere utilizzato da un'ampia varietà di agenti
utente (browser)? Funziona bene con le tecnologie per l'accesso limitato?

Anche se WCAG fornisce una panoramica completa di cosa significhi avere un contenuto
accessibile, può anche essere impegnativo. Per ridurre
ciò, il gruppo [WebAIM](http://webaim.org/){: .external} (Web Accessibility in
Mind) ha distillato le linee guida WCAG in una checklist facile da seguire,
mirata espressamente ai contenuti web.

La [checklist di WebAIM](http://webaim.org/standards/wcag/checklist){:
.external} può fornire un breve riepilogo di alto livello di ciò che è
necessario implementare, collegandosi anche alle specifiche WCAG sottostanti se
desideri ulteriori dettagli.

Grazie a questo strumento, puoi stabilire la direzione del tuo lavoro di
accessibilità ed essere sicuro che, finché il tuo progetto soddisfa i criteri
delineati, gli utenti avranno un'esperienza positiva nell'accedere ai tuoi
contenuti.

## Comprensione della diversità degli utenti

Per capire l'accessibilità, aiuta avere una comprensione della vasta gamma
di utenti nel mondo e dei tipi di argomenti di accessibilità che li riguardano.
Per chiarire ulteriormente questo concetto, ecco una serie di domande e risposte interessanti
con Victor Tsaran, un Technical Program Manager di Google, affetto
da cecità.

<figure class="attempt-right">
  <img src="imgs/victor_tsaran.jpg" alt="Victor Tsaran">	
  <figcaption>Victor Tsaran</figcaption>
</figure>

<hr>

> *Di cosa ti occupi in Google?*

All'interno di Google il mio compito è cercare di garantire che i
nostri prodotti funzionino per tutti gli utenti, indipendentemente
dalle loro disabilità o abilità.

> *Quali tipi di disabilità hanno gli utenti?*

Quando pensiamo ai tipi di disabilità che possono rendere l'accesso ai nostri contenuti
difficile, molte persone immaginano immediatamente un
utente cieco come me. Ed è vero, questa disabilità può davvero rendere
frustrante o addirittura impossibile utilizzare molti siti web.

Molte tecniche web moderne hanno lo sfortunato effetto collaterale di creare
siti che non funzionano bene con gli strumenti utilizzati dagli utenti non
vedenti per accedere al web. Tuttavia, in realtà l'accessibilità è più disponibile
di così. Riteniamo che sia utile suddividere le disabilità in quattro
aree: : visiva, motoria, uditiva e cognitiva.

> *Analizziamole una alla volta. Puoi dare alcuni esempi di disabilità visive?*

Le disabilità visive possono essere suddivise in poche categorie: gli utenti
non vedenti, come nel mio caso, potrebbero utilizzare uno screen reader, il braille o una
combinazione dei due.

<figure class="attempt-right">
  <img src="imgs/braille-reader.png" alt="A braille reader">	
  <figcaption>Lettore braille</figcaption>
</figure>

Infatti è piuttosto insolito non poter vedere del tutto ma
ci sono buone probabilità che tu conosca o abbia incontrato almeno una
persona che non può vedere del tutto. Tuttavia, c'è anche un numero molto più
grande di utenti che chiamiamo ipovedenti.

Ce ne sono di molti tipi, da persone come mia moglie, che non ha le cornee
(anche se riesce a vedere, ha difficoltà a leggere materiale cartaceo ed è
considerata legalmente cieca) a chi ha solo una visione
limitata e ha bisogno di indossare occhiali da vista molto forti.

Vista l'ampia sintomatologia, riscontriamo una vastità di
casistiche di persone in questa categoria: alcuni usano lo screen reader
o un display braille (ho persino sentito parlare di una donna che legge il
braille visualizzato sullo schermo perché è più facile da vedere del testo
stampato), altri usano la tecnologia di sintesi vocale senza la funzionalità di
screen reader completo, adoperano una lente per
ingrandire lo schermo o semplicemente usare lo zoom del browser per
rendere i caratteri più grandi. Possono anche utilizzare opzioni ad alto
contrasto come una modalità ad alto contrasto del sistema operativo,
un'estensione per il browser ad alto contrasto o un tema ad alto contrasto per
un sito web.

<figure class="attempt-right">
  <img src="imgs/high-contrast.png" alt="High-contrast mode">	
  <figcaption>Modalità ad alto contrasto</figcaption>
</figure>

Molti utenti sfruttano una combinazione di strumenti, come la mia amica Laura che usa
una combinazione di modalità ad alto contrasto, zoom del browser e sintesi
vocale.

L'ipovisione è qualcosa a cui molte persone possono fare riferimento. Per
iniziare, per tutti prima o poi la visione deteriora con l'invecchiamento,
quindi anche se non è il tuo caso, ci sono buone probabilità che abbia
sentito i tuoi genitori lamentarsi di ciò. Probabilmente molti hanno provato la
frustrazione di portare il proprio laptop all'aperto al sole
per scoprire che improvvisamente non possono leggere nulla! Chiunque abbia
avuto una chirurgia laser o abbia provato a leggere qualcosa a una certa distanza
in una stanza potrebbe aver usato uno di questi strumenti appena descritti. Quindi
penso che sia abbastanza facile per gli sviluppatori avere un po' di empatia per
gli utenti ipovedenti.

Vorrei anche menzionare le persone con una scarsa capacità di distinguere i
colori: circa il 9% dei maschi mostra qualche forma di daltonismo
e anche circa l'1% delle donne. Possono avere difficoltà a distinguere rosso
e verde, o giallo e blu. Pensa a ciò la prossima volta che progetti la convalida
di un modulo.

> *E a proposito dei problemi motori?*

Sì, disabilità motorie o di destrezza. Questo gruppo spazia da quelli che
preferirebbero non usare un mouse, perché forse hanno avuto la RSI o
qualcosa del genere e lo trovano doloroso, a qualcuno che potrebbe essere
paralizzato con una gamma di movimenti limitata in alcune parti
del corpo.

<figure class="attempt-right">
  <img src="imgs/eye-tracking.png" alt="A person using an eye tracking device">	
  <figcaption>Un dispositivo di eye tracking</figcaption>
</figure>

Gli utenti con problemi motori possono utilizzare una tastiera, un dispositivo
di commutazione, un comando vocale o persino un dispositivo di eye
tracking per interagire con il proprio computer.

Come nel caso della vista, anche la mobilità può essere un problema
temporaneo o situazionale: un polso rotto che non ti consente di usare il mouse.
Forse il trackpad del portatile si è rotto o stai semplicemente viaggiando su
un treno movimentato. Ci possono essere molte situazioni in cui la mobilità di
un utente è impedita e, assicurandoci di affrontare questo problema, miglioriamo
l'esperienza complessiva, sia per chi ha una disabilità permanente, sia per chi
non può usare temporaneamente un'UI basata su puntatore.

> *Ottimo, parliamo di problemi all'udito.*

Questo gruppo può spaziare da chi è totalmente sordo a chi ha problemi di udito.
Proprio come la vista, il nostro udito tende a degradare con l'età. Molti di noi
usano comuni apparecchi acustici per poter sentire.

<figure class="attempt-right">
<img src="imgs/screen-captions.png" alt="A television with captions at the
bottom">
  <figcaption>Didascalie delle schermate</figcaption>
</figure>

Per gli utenti con problemi di udito, dobbiamo assicurarci di non fare
affidamento sull'audio, quindi cerca di utilizzare elementi come
sottotitoli e trascrizioni video e di fornire qualche tipo di alternativa, se il
suono fa parte dell'interfaccia.

Come nel caso della vista e delle disabilità motorie, possiamo comunque
immaginare che, persino chi sente bene, può
trarre beneficio da questi accorgimenti. Molti miei amici dicono di apprezzare
quando i video hanno i sottotitoli perché anche quando sono in
un ufficio open space e non portano le cuffie, possono comunque guardare il
video!

> *Va bene, puoi dirci qualcosa sui problemi cognitivi?*

Esistono molti problemi cognitivi, come ADD, dislessia e autismo, per i quali
molte persone vogliono o hanno bisogno di accedere ai diversi componenti in
modo diverso. Gli accorgimenti per questi gruppi sono naturalmente estremamente
diversi ma troviamo comunque dei punti in comune con altre aree, come
l'utilizzo della funzionalità di zoom per facilitare la lettura o la
concentrazione. Inoltre, questi utenti potrebbero scoprire che il design
minimale è migliore perché riduce maggiormente la distrazione e il carico
cognitivo.

Penso che tutti possano relazionarsi allo stress del sovraccarico cognitivo,
quindi è ovvio che se creiamo qualcosa che funziona per qualcuno con un
deficit cognitivo, creeremo un'esperienza piacevole per tutti.

> *Quindi, come riassumeresti il ​​tuo modo di pensare all'accessibilità?*

Quando osservi l'ampia gamma di abilità e disabilità che le persone potrebbero
avere, puoi vedere che progettare e costruire prodotti solo per le persone che
hanno visione, udito, destrezza e cognizione perfetti risulta
incredibilmente limitato. È praticamente una battaglia persa, perché stiamo creando
un'esperienza più stressante e meno utilizzabile per tutti, e per alcuni utenti
è addirittura un'esperienza che li esclude del tutto.

<hr>

In questa intervista Victor ha identificato diverse disabilità e le ha
suddivise in quattro categorie: *visiva*, *motoria*, *uditiva* e *cognitiva*. Ha
anche sottolineato che ogni tipo di disabilità potrebbe essere *situazionale*,
*temporanea* o *permanente*.

Diamo un'occhiata ad alcuni esempi reali di problemi di accessibilità e vediamo in quali
categorie e tipi rientrano. Anche se alcune disabilità possono
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
    <td>tenere in braccio un bambino</td>
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

* Sindrome RSI, ad es. sindrome del tunnel carpale, gomito
del tennista, dito a scatto.

## Prossimi passi

Abbiamo già affrontato molti argomenti! Abbiamo parlato di:

- cos'è l'accessibilità e perché è importante per tutti
- checklist dell'accessibilità WCAG e WebAIM
- diversi tipi di disabilità da prendere in considerazione

Nel resto della guida, approfondiremo gli aspetti pratici della creazione di
siti Web accessibili. Ci impegneremo particolarmente in tre aree principali:

- [**Focus**](/web/fundamentals/accessibility/focus): vedremo come costruire
soluzioni che possano essere gestite con la tastiera anziché con il mouse. Questo è
importante per gli utenti con problemi motori, ovviamente, ma garantisce anche
che l'interfaccia utente sia ben progettata per tutti gli utenti.

- [**Semantica**](/web/fundamentals/accessibility/semantics-builtin): faremo in
modo di creare un'interfaccia utente robusta e che funzioni con
una varietà di tecnologie assistenziali.

- [**Styling**](/web/fundamentals/accessibility/accessible-styles):
considereremo la progettazione visiva e osserveremo alcune tecniche per rendere
gli elementi visivi dell'interfaccia il più flessibili e utilizzabili possibile.

Ognuno di questi argomenti potrebbe essere un intero corso, quindi non
affronteremo ogni aspetto della creazione dei siti web accessibili. Tuttavia, ti
forniremo le informazioni necessarie per iniziare e anche alcuni riferimenti
con ulteriori dettagli su ciascun argomento.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
