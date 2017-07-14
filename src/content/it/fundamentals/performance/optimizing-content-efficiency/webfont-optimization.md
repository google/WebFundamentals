project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La tipografia è fondamentale per un buon design,  branding, leggibilità ed accessibilità. I font web consentono di ottenere tutto ciò, e non solo: il testo è selezionabile, ricercabile, ingrandibile e compatibile con high-DPI, offrendo un rendering coerente e conciso, indipendentemente dalle dimensioni e dalla risoluzione del monitor. I font web sono fondamentali per ottenere design, UX e prestazioni ottimali.


{# wf_updated_on: 2017-07-14 #}
{# wf_published_on: 2014-09-19 #}

# Ottimizzazione dei font web {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

La tipografia è fondamentale per il design, il branding, la 
leggibilità e l'accessibilità. I font web consentono di ottenere tutto 
ciò, e non solo: il testo è selezionabile, ricercabile, ingrandibile e 
compatibile con hight-DPI, offrendo un rendering coerente e conciso, 
indipendentemente dalle dimensioni e dalla risoluzione del monitor. I 
font web sono fondamentali per ottenere un buondesign, UX e prestazioni 
ottimali.

L'ottimizzazione dei font web rappresenta una fase critica nell'intera 
strategia prestazionale. Ogni font costituisce una risorsa aggiuntiva, 
e alcuni font possono bloccare il rendering del testo, ma il solo 
fatto che la pagina utilizzi i font web non significa che il rendering 
debba essere più lento. Al contrario, un font ottimizzato, assieme a 
una strategia ponderata in merito al loro caricamento e alla loro 
applicazione nella pagina, può ridurre le dimensioni totali di 
quest'ultima e migliorare i tempi di rendering.


## Anatomia di un font web

### TL;DR {: .hide-from-toc }
* I font Unicode possono contenere migliaia di glifi.
* I formati dei font sono quattro: WOFF2, WOFF, EOT, TTF.
* Per alcuni formati font è necessario utilizzare una compressione GZIP.


Un *font web* è una raccolta di glifi, ciascuno dei quali rappresenta 
una forma vettoriale che descrive una lettera o un simbolo. Di 
conseguenza, le dimensioni di un particolare file font sono 
determinate da due semplici variabili: la complessità dei percorsi 
vettoriali di ogni glifo e il numero di glifi di un determinato font. 
Ad esempio, OpenSans, uno dei font web più popolari, contiene 897 
glifi, che includono caratteri latini, greci e cirillici.

![Tabella dei glifi font](images/glyphs.png)

Nella scelta di un font, è importante considerare i set di caratteri 
supportati. Per localizzare i contenuti di una pagina in più lingue, 
dovrai utilizzare un font che sia in grado di garantire un aspetto e 
un'esperienza coerenti agli utenti. Ad esempio, la 
[famiglia di font Noto di Google](https://www.google.com/get/noto/) 
mira a supportare tutte le lingue del mondo. Tuttavia, ricorda che le 
dimensioni totali di Noto, incluse tutte le lingue, ammontano in un 
file ZIP di più di 130 MB. 

Naturalmente, l'utilizzo di font web richiede una progettazione 
attenta per garantire che la tipografia non intralci le prestazioni. 
Per fortuna, la piattaforma web offre tutte le primitive necessarie, 
mentre nella presente guida daremo un'occhiata pratica a come ottenere 
il meglio da entrambi i mondi.

### Formati dei font web

Oggigiorno, sul web sono disponibili quattro famiglie di font: 
[EOT](http://en.wikipedia.org/wiki/Embedded_OpenType), 
[TTF](http://en.wikipedia.org/wiki/TrueType), 
[WOFF](http://en.wikipedia.org/wiki/Web_Open_Font_Format), e 
[WOFF2](http://www.w3.org/TR/WOFF2/). Sfortunatamente, nonostante 
l'ampia scelta, non esiste un unico formato universale che funzioni con 
tutti i browser, più o meno recenti: EOT funziona 
[solo su IE](http://caniuse.com/#feat=eot), 
TTF è 
[parzialmente supportato in IE](http://caniuse.com/#search=ttf), 
WOFF è maggiormente supportato 
[non disponibile in alcuni browser precedenti](http://caniuse.com/#feat=woff), 
mentre il supporto di WOFF 
2.0 è ancora [in progress in molti browser](http://caniuse.com/#feat=woff2).

Dunque, come dobbiamo muoverci? Non esiste un unico formato che 
funzioni in tutti i browser, il che significa che dobbiamo utilizzare 
più formati per offrire un'esperienza coerente:

* Offrire la variante WOFF 2.0 ai browser che la supportano
* Offrire la variante WOFF alla maggior parte dei browser
* Offrire la variante TTF ai vecchi browser Android (precedenti al 4.4)
* Offrire la variante EOT ai vecchi browser IE (precedenti a IE9)


Note: Tecnicamente esiste anche l'<a href='http://caniuse.com/svg-fonts'>
SVG font container</a>, ma non è mai stato supportato né in IE, né in 
Firefox e non è approvato in Chrome. Di conseguenza, ha un utilizzo 
limitato e lo ometteremo intenzionalmente nella presente guida.

### Riduzione delle dimensioni del font tramite compressione

Un font è una raccolta di glifi, ciascuno dei quali è composto da un 
insieme di percorsi de definiscono la forma del carattere. I singoli 
glifi sono naturalmente diversi, ma contengono comunque molte 
informazioni simili che possono essere compresse con GZIP o altro 
compressore compatibile: 

* I formati EOT e TTF non sono compressi per default: assicurati che i 
server siano configurati per applicare la 
[compressione GZIP](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) 
quando utilizzi tali formati.
* WOFF ha una compressione integrata. Assicurati che il tuo 
compressore WOFF utilizzi impostazioni ottimali. 
* WOFF2 utilizza algoritmi di pre-elaborazione e compressione 
personalizzati per garantire una riduzione di ~30% delle dimensioni 
file rispetto ad altri formati. Per maggiori informazioni si veda il
[report](http://www.w3.org/TR/WOFF20ER/).

Infine, vale la pena notare che alcuni formati font contengono metadati 
aggiuntivi, quali informazioni di 
[font hinting](http://en.wikipedia.org/wiki/Font_hinting) e 
[kerning](http://en.wikipedia.org/wiki/Kerning) che possono non essere 
necessarie su alcune piattaforme, ma che consentono un'ulteriore 
ottimizzazione delle dimensioni file. Consulta le opzioni di 
ottimizzazione messe a disposizione dal tuo compressore font e, se 
scegli questo percorso, assicurati di disporre delle infrastrutture 
adatte per testare e utilizzare tali font ottimizzati in ogni browser. 
Ad es., Google Fonts offre più di 30 varianti ottimizzate per ogni 
font, individuando e fornendo automaticamente la variabile ottimale 
per ogni piattaforma e browser.

Note: Valuta l'utilizzo della 
<a href='http://en.wikipedia.org/wiki/Zopfli'>compressione Zopfli</a> 
per i formati EOT, TTF e WOFF. Zopfli è un compressore compatibile con 
zlib che offre una riduzione delle dimensioni file ~5% superiore a gzip.

## Definire una famiglia di font con @font-face

### TL;DR {: .hide-from-toc }
* Utilizza il <code>format()</code> hint per specificare più formati font
* Raggruppa i font unicode più ampi in subset per migliorare le 
prestazioni: utilizza subset unicode-range e consenti in alternativa un 
subsetting manuale per versioni precedenti dei browser
* Riduci il numero di varianti dei font di stile per migliorare le 
prestazioni della pagina e il rendering del testo

L'at-rule del CSS @font-face ci consente di definire il percorso di un 
determinato font, nonché le sue caratteristiche stilistiche e i 
codepoint Unicode per cui deve essere utilizzato. È possibile 
utilizzare una combinazione di tali dichiarazioni @font-face per 
costruire una "famiglia di font" che il browser userà per stabilire 
quali font debbano essere scaricati e applicati alla pagina corrente. 

### Selezione formato

Ogni dichiarazione @font-face fornisce il nome della famiglia di font, 
utilizzato come gruppo logico di dichiarazioni multiple, le 
[proprietà del font](http://www.w3.org/TR/css3-fonts/#font-prop-desc) 
quali stile, spessore ed estensione, e il 
[descrittore src](http://www.w3.org/TR/css3-fonts/#src-desc), che 
specifica un elenco prioritario di percorsi per il font.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('truetype'),
           url('/fonts/awesome.eot') format('embedded-opentype');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('truetype'),
           url('/fonts/awesome-i.eot') format('embedded-opentype');
    }


Nota innanzitutto che gli esempi precedenti definiscono un'unica 
famiglia _Awesome Font_ con due stili (normale e _italic_), ciascuno 
dei quali si riferisce a un insieme diverso di font. Ogni descrittore 
`src` contiene un elenco prioritario, separato da virgole, di 
varianti: 

* La direttiva `local()` ci consente di riferirci, caricare e 
utilizzare i font installati localmente.
* La direttiva `url()` dci consente di caricare font esterni, che 
possono contenere un suggerimento `format()` aggiuntivo che indichi il 
formato del font cui fa riferimento l'URL fornito.


Note: A meno che non faccia riferimento a uno dei font di sistema 
predefiniti, nella realtà è raro che l'utente l'abbia installato 
localmente, soprattutto su dispositivi mobili, dove è di fatto 
impossibile 'installare' font aggiuntivi. Di conseguenza, dovrai 
sempre fornire un elenco di percorsi font esterni.

Quando il browser stabilisce che il font è necessario, scorre l'elenco 
di risorse fornito nell'ordine specificato e prova a caricare la 
risorsa corretta. Ad esempio, seguendo l'esempio precedente:

1. Il browser esegue il layout di pagina e stabilisce quali varianti 
del font sono necessarie per il rendering del testo della pagina.
1. Per ogni font richiesto, il browser verifica se è disponibile 
localmente.
1. In caso contrario, il browser fa riferimento a definizioni esterne:
  * Se è presente un format hint, il browser verifica se è supportato 
  prima di avviare il download, altrimenti passa al successivo.
  * Se non è presente alcun format hint, il browser scarica la risorsa.

La combinazione di direttive interne ed esterne con format hint idonei 
ci consente di specificare tutti i formati font disponibili e lasciare 
al browser la scelta: il browser definisce le risorse necessarie e 
seleziona il formato ottimale per nostro conto.

Note: L'ordine di specifica delle varianti del font ha una data 
importanza. Il browser sceglierà il primo formato supportato. Di 
conseguenza, se desideri che i browser più recenti utilizzino WOFF2, 
dovrai posizionare il riferimento WOFF2 sopra WOFF, e così via.

### Subset Unicode-range

Oltre alle proprietà del font, quali stile, spessore ed estensione, la 
regola @font-face ci consente di definire un insieme di codepoin 
Unicode supportati da ogni risorsa. Questo ci consente di suddividere 
un font Unicode vasto in subset più piccoli (ad es. latino, cirillico, 
greco) e scaricare soltanto i glifi necessari per il rendering del 
testo di una data pagina.

L'[unicode-range descriptor](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) 
ci consente di specificare un elenco delimitato da virgole di valori 
di range, ciascuno dei quali può collocarsi in uno dei tre gruppi 
seguenti:

* Codepoint singolo (ad es. U+416)
* Range di intervallo (ad es. U+400-4ff): indica il codepoint iniziale e 
quello finale di una serie
* Range wildcard (ad es. U+4??): `?` caratteri indica una cifra esadecimale

Ad esempio, possiamo suddividere la nostra famiglia _Awesome Font_ nei 
subset Latino e Giapponese, ciascuno dei quali verrà scaricato dal 
browser in base alla necessità: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('truetype'),
           url('/fonts/awesome-jp.eot') format('embedded-opentype');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: I subset unicode-range sono particolarmente importanti per le 
lingue asiatiche, il cui numero di glifi è molto più elevato rispetto 
alle lingue occidentali e un tipico font "intero" è spesso misurato in 
megabyte, invece che in decine di kilobyte!

L'utilizzo di subset unicode-range e di file distinti per ogni 
variante stilistica del font ci consente di definire una famiglia di 
font composita più rapida ed efficiente da scaricare; il visitatore 
dovrà infatti scaricare soltanto le varianti e i subset necessari, 
senza essere obbligato a scaricare subset che potrebbe non utilizzare 
mai né visualizzare sulla pagina. 

Detto ciò, unicode-range ha un piccolo difetto: [non tutti i browser 
lo supportano](http://caniuse.com/#feat=font-unicode-range), o almeno, 
non ancora. Alcuni browser ignorano semplicemente l'hint unicode-range 
e scaricano tutte le varianti, mentre altri non elaborano proprio la 
dichiarazione @font-face. Per risolvere tutto ciò, dobbiamo eseguire 
un "subsetting manuale" nelle vecchie versioni dei browser.

Poiché i vecchi browser non sono abbastanza intelligenti per 
selezionare automaticamente i subset necessari, né di costruire un 
font composito, dobbiamo fornire un unico font che contenga tutti i 
subset necessari, nascondendo il resto al browser. Ad esempio, se la 
pagina utilizza soltanto caratteri latini, possiamo eliminare gli 
altri glifi, fornendo tale subset come unica risorsa. 

1. **Come possiamo stabilire quali sono i subset necessari?** 
    * Se il browser supporta unicode-range, allora selezionerà 
    automaticamente il subset giusto. La pagina dovrà soltanto fornire i 
    file di subset e specificare gli unicode-range applicabili nelle 
      proprietà @font-face.
    * Se unicode-range non è supportato, allora la pagina dovrà 
    nascondere tutti i subset non necessari, ovvero lo sviluppatore 
    dovrà specificare i subset necessari.
1. **Come facciamo a generare un subset di font?**
    * Utilizza lo [strumento open-source pyftsubset](https://github.com/behdad/fonttools/) 
     per suddividere in subset ed ottimizzare i tuoi font.
    * Per alcuni font è consentito il subsetting manuale tramite 
    parametri query personalizzati, utilizzabili per specificare 
    manualmente il subset necessario per la pagina. Consulta la 
    documentazione del tuo font provider.


### Selezione dei font e sintesi

Ogni famiglia di font è composta da diverse varianti stilistiche 
(normale, grassetto, corsivo) e diversi spessori per ogni stile, 
ciascuno dei quali può contenere glifi di forme molto diverse, ad 
esempio con spaziature, dimensioni o forme diverse. 

![Spessore del font](images/font-weights.png)

Ad esempio, il diagramma precedente illustra una famiglia di font che 
offre tre diversi spessori per il grassetto: 400 (normale), 700 
(grassetto) e 900 (extra bold). Tutte le varianti intermedie (indicate 
in grigio) sono mappate automaticamente dal browser in base alla 
variante più prossima. 



> Quando è specificato uno spessore per cui non esiste font-face, ne 
verrà utilizzata una con spessore simile. In generale, i caratteri in 
grassetto vengono associati a font-face con spessore maggiore e quelli 
normali a font face con spessore minore.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">
Algoritmo di corrispondenza dei font CSS3</a>



Un'operazione logica simile si applica alle varianti _italic_. Il font 
designer controlla quali varianti produrrà, mentre noi verifichiamo le 
varianti che useremo sulla pagina. Visto che ogni variante prevede un 
download separato, è buona norma scaricarne un numero esiguo! Ad 
esempio, possiamo definire due varianti di grassetto per la nostra 
famiglia _Awesome Font_: 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('truetype'),
           url('/fonts/awesome-l-700.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

Nell'esempio precedente, la famiglia _Awesome Font_ risulta composta 
da due risorse che coprono il medesimo insieme di glifi latini 
(U+000-5FF), ma offre due "spessori" diversi: normale (400) e 
grassetto (700). Tuttavia, che cosa accade se una delle nostre regole 
CSS specifica uno spessore diverso o definisce la proprietà font-style 
come corsivo?

* Se non è disponibile un font corrispondente, il browser lo 
sostituisce con quello più simile.
* Se non viene trovata alcuna corrispondenza stilistica (nell'esempio 
precedente, non dichiariamo alcuna variante corsiva), il browser 
sintetizzerà la propria variante. 

![Font synthesis](images/font-synthesis.png)

> Gli autori devono sempre tenere a mente che tale approccio può non 
essere idoneo per alcuni caratteri, ad es. il cirillico, in cui il 
corsivo ha forme molto diverse. È sempre meglio utilizzare un font 
corsivo reale piuttosto che una versione sintetizzata.
> > <a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3 font-style</a>

L'esempio precedente illustra le differenze tra font reale e 
sintetizzato per Open-Sans; tutte le varianti sintetizzate sono 
generate dal medesimo font con spessore 400. Come puoi vedere, i 
risultati sono notevolmente diversi. I dettagli di generazioni delle 
varianti grassetto e diagonale non sono specificati. I risultati 
varieranno quindi da browser a browser, e dipenderanno anche molto dal 
font.

Note: Per una maggiore coerenza nei risultati visivi, non affidarti 
alla font-synthesis. Minimizza invece il numero di varianti del font 
utilizzate e specificane il percorso, in modo che il browser possa 
scaricarle quando sono utilizzate nella pagina. Detto ciò, in alcuni 
casi una variante synthesized [può rappresentare un'opzione
valida](https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/)
se utilizzala con cautela.


## Ottimizzazione di caricamento e rendering

### TL;DR {: .hide-from-toc }
* Le richieste di font vengono ritardate sino alla costruzione 
dell'albero di rendering; ciò può comportare un ritardo nel rendering 
del testo
* Il Font Loading API ci consente di implementare una strategia di 
caricamento e rendering dei font personalizzata al posto della 
predefinita di caricamento lazy
* Il Font inlining ci consente di sovrascrivere il caricamento font 
predefinito lazy delle versioni precedenti dei browser

Un font web "completo" che includa tutte le varianti stilistiche, che 
potrebbero non servirci, nonché tutti i glifi, che potremmo non 
utilizzare mai, può comportare un download di diversi megabyte. Per 
risolvere tale problema, la regola CSS @font-face è finalizzata 
specificatamente a consentire la suddivisione della famiglia di font 
in una raccolta di risorse: subset unicode, varianti di stile 
distinte, e così via. 

Stabilito ciò il browser definisce i subset e varianti necessarie e 
scarica l'insieme minimo richiesto per il rendering del testo, che  
risulta particolarmente conveniente. Tuttavia, se non facciamo 
attenzione, può anche creare un collo di bottiglia nel percorso di 
rendering critico ritardando il rendering del testo.

### Font web e percorso di rendering critico

Il caricamento lazy di un font implica un aspetto importante che può 
ritardare il rendering del testo: il browser deve 
[costruire l'albero di rendering ](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), 
che dipende a sua volta dagli alberi DOM e CSSOM, per poter capire 
quali risorse saranno necessarie per il rendering. Di conseguenza, le 
richieste di font sono ritardate dopo altre risorse critiche, e il 
browser può bloccare il rendering del testo fino al recupero della 
risorsa.

![Percorso di rendering critico dei font](images/font-crp.png)

1. Il browser richiede il documento HTML
1. Il browser inizia a scansionare la risposta HTML e a costruire il DOM
1. Il browser scopre risorse CSS, JS e di altro tipo e indirizza le 
richieste
1. Il browser crea il CSSOM una volta ricevuto tutto il contenuto CSS e 
lo combina con l'albero DOM per costruire l'albero di rendering
    * Le richieste di font vengono inviate dopo che l'albero di rendering 
    ha indicato quali varianti dei font sono necessarie per effettuare 
    il rendere di un testo specificato nella pagina.
1. Il browser definisce il layout e disegna i contenuti sullo schermo
    * Se il font non è ancora disponibile, il browser potrebbe non 
    renderizzare alcun pixel di testo
    * Non appena il font è disponibile, il browser inserisce i pixel di 
    testo

La "competizione" tra la prima rappresentazione dei contenuti della 
pagina, che può essere realizzata subito dopo la creazione dell'albero 
di rendering, e la richiesta di risorse font, è quella che crea il 
"problema del testo blank" in cui il browser deve renderizzare il 
layout della pagina ma omette qualsiasi testo. Il risultato differisce 
tra i diversi browser:

* Safari effettua il rendering del testo soltanto una volta completato 
il download del font.
* Chrome e Firefox bloccano il rendering per 3 secondi, dopo i quali 
utilizzano un font alternativo e, una volta scaricato il font, 
renderizzano nuovamente il testo in base ad esso.
* IE esegue immediatamente il rendering con il font alternativo se 
quello richiesto non è ancora disponibile, per poi eseguire nuovamente 
il rendering una volta completato il download.

Vi sono vantaggi e svantaggi in ogni strategia di rendering: alcuni 
trovano fastidioso il re-rendering, mentre altri preferiscono 
visualizzare immediatamente i risultati e non si preoccupano del 
refresh della pagina una volta terminato il download del font; non ne 
discuteremo in dettaglio in questa sede. Il punto importante è che il 
carcamento lazy riduce il numero di byte, ma può anche potenzialmente 
ritardare il rendering del testo. Vediamo quindi come possiamo 
ottimizzare tale aspetto.

### Ottimizzazione del rendering del font con Font Loading API

[Font Loading API](http://dev.w3.org/csswg/css-font-loading/) offre 
un'interfaccia di scripting per definire e manipolare le font face 
CSS, tracciarne il download e sostituire il loro comportamento di 
caricamento lazy. Ad esempio, se siamo sicuri che sarà necessaria una 
specifica variante del font, possiamo definirla e comunicare al browser 
di iniziare immediatamente a recuperare la risorsa:


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    // don't wait for the render tree, initiate an immediate fetch!
    font.load().then(function() {
      // apply the font (which may re-render text and cause a page reflow)
      // after the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default the content is hidden, 
      // and it's rendered after the font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply your own render strategy here... 
    });
    

Inoltre, potendo verificare lo stato del font (tramite 
[check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) 
e tracciarne il download, possiamo anche definire una strategia 
personalizzata per il rendering del testo sulle nostre pagine: 

* Possiamo bloccare il rendering fino a quando il font non è disponibile.
* Possiamo applicare un timeout personalizzato per ogni font.
* Possiamo utilizzare il font alternativo per sbloccare il rendering e 
inserire un nuovo stile che utilizzi il font desiderato una volta 
disponibile.

La cosa migliore è mixare e combinare le strategie precedenti per i 
diversi contenuti della pagina; ad esempio, bloccare il rendering di 
alcune sezioni fino a quando il font non è disponibile, utilizzare un 
font alternativo e poi renderizzarlo una volta terminato il download 
del font, specificare timeout diversi, e così via. 

Note: Font Loading API è ancora 
<a href='http://caniuse.com/#feat=font-loading'>in fase di sviluppo in 
alcuni browser</a>. Valuta l'utilizzo del 
<a href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a> 
o della 
<a href='https://github.com/typekit/webfontloader'>webfontloader library</a> 
per ottenere funzionalità simili, sebbene con un'ulteriore dipendenza da 
JavaScript.

### Ottimizzazione del rendering con inlining

Una semplice strategia alternativa per utilizzare Font Loading API 
consiste nell'eliminare il "problema del testo blank" con priorità alta, 
poiché sono necessari per costruire il CSSOM.

* Gli stylesheet CSS come media query corrispondenti sono scaricati 
automaticamente dal browser con priorità alta, essendo necessari per 
costruire il CSSOM.
* L'inlining dei dati del font nello stylesheet CSS obbliga il browser 
a scaricare il font senza priorità alta e senza attendere l'albero di 
rendering, agendo quindi come override manuale sul comportamento di 
caricamento lazy predefinito.

La strategia di inlining non è flessibile e non ci consente di 
definire alcun timeout personalizzato o strategia di rendering per 
contenuti diversi, ma rappresenta comunque una soluzione semplice ed 
efficace in tutti i browser. Per ottenere migliori risultati, separa i 
font sottoposti ad inlining in stylesheet separati e imposta una 
proprietà max-age lunga; in tal modo, all'aggiornamento del CSS, non 
obbligherai i visitatori a riscaricare i font. 

Note: Utilizza l'inlining con criterio selettivo! Ricorda che 
@font-face utilizza il caricamento lazy per evitare di scaricare varianti 
e subset di font non necessari. Inoltre, l'aumento delle dimensioni del 
tuo CSS con un inlining aggressivo avrà un impatto negativo sul 
<a href='/web/fundamentals/performance/critical-rendering-path/'>percorso 
di rendering critico</a> - il  browser deve scaricare l'intero CSS prima 
di costruire il CSSOM e l'albero di rendering e visualizzare i contenuti 
della pagina sullo schermo.

### Ottimizzazione per il riutilizzo con HTTP Caching

Le risorse di tipo font sono, tipicamente, statiche e non hanno 
aggiornamenti frequenti. Di conseguenza, sono ideali per una scadenza 
max-age lunga; assicurati di specificare sia una 
[intestazione ETag condizionale](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags), 
sia una [policy di Cache-Control ottimale](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) 
per tutti i font. 
    
Non è necessario immagazzinare i font nel localStorage o attraverso 
altri meccanismi; ciascuno di essi dispone del proprio insieme di 
problemi di prestazioni. La cache HTTP del browser, in combinazione 
con Font Loading API o con la libreria webfontloader, offre il 
meccanismo migliore e più efficace per inviare dei font al browser.


## Checklist di ottimizzazione

Contrariamente a quanto si crede, l'utilizzo di font web non ritarda 
necessariamente il rendering della pagina né ha un impatto negativo su 
altre prestazioni. Un utilizzo dei font ottimizzato può garantire 
all'utente un'esperienza migliore sotto ogni punto di vista: branding 
perfetto, migliore leggibilità, fruibilità e ricercabilità, offrendo 
al contempo una risoluzione multipla scalabile che ben si adatta a 
qualsiasi formato e risoluzione del monitor. Non temere di utilizzare 
i font web.

Certo, un'applicazione non ponderata può causare ritardi evitabili e 
download eccessivamente pesanti. È per questo che dobbiamo svecchiare 
i nostri strumenti di ottimizzazione e aiutare il browser 
ottimizzando i font e il modo in cui vengono recuperati ed utilizzati 
all'interno delle nostre pagine. 

* **Verifica e controlla il tuo utilizzo dei font:** non utilizzare 
troppi font sulle tue pagine e, per ogni font, minimizza il numero di 
varianti utilizzate. Ciò ti consentirà di offrire ai tuoi utenti 
un'esperienza più rapida e uniforme.
* **Suddividi i font in subset:** molti font possono essere suddivisi 
in subset o in più unicode-range, così da utilizzare soltanto i glifi 
richiesti da una pagina specifica - così facendo, le dimensioni file 
si riducono, mentre la velocità di download della risorsa aumenta. 
Tuttavia, nella definizione dei subset, fa attenzione ad ottimizzarli 
per il riutilizzo dei font; ad es., per ogni pagina non scaricare un 
set di caratteri diverso ma sovrapposto. È buona norma creare subset 
in base allo script, ad es. latino, cirillico, e così via.
* **Ottimizza il formato dei font per ogni browser:** ogni font 
dovrebbe essere fornito in formato WOFF2, WOFF, EOT e TTF. Assicurati 
di comprimere con GZIP i formati EOT e TTF, non compressi normalmente.
* **Specifica le politiche ottimali di validazione e caching:** i font 
sono risorse statiche che vengono aggiornate molto raramente. 
Assicurati che i tuoi server prevedano un timestamp max-age di lunga 
durata e un token di riconvalida per consentire un riutilizzo efficace 
tra pagine diverse.
* **Utilizza FontLoading API per ottimizzare il percorso di rendering 
critico:** il caricamento lazy predefinito può comportare un ritardo nel 
rendering del testo. Font Loading API ci consente di evitarlo per 
determinati font, specificando una strategia di rendering e timeout 
personalizzata in base ai diversi contenuti della pagina. Per le 
versioni più vecchie dei browser che non supportano l'API, puoi 
utilizzare la libreria webfontloader JavaScript o la strategia di 
inlining del CSS.
