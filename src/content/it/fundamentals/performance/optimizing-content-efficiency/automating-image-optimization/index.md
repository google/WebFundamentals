project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Formati di immagine

{# wf_updated_on: 2019-12-17 #}
{# wf_published_on: 2017-11-16 #}

# Automatizza l'ottimizzazione delle immagini {: .page-title}

{% include "web/_shared/contributors/addyosmani.html" %}

**Dovremmo tutti automatizzare la compressione delle immagini.**

Nel 2017, l'ottimizzazione delle immagini dovrebbe essere automatizzata. È
facile dimenticarlo, le pratiche migliori cambiano ed il contenuto che non passa
attraverso una pipeline di costruzione può facilmente scivolare. Per
automatizzare: usa [imagemin](https://github.com/imagemin/imagemin) o
[libvps](https://github.com/jcupitt/libvips) per il tuo processo di
compilazione. Ma esistono molte altre alternative.

La maggior parte dei CDN (ad es.
[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp)
) e soluzioni di terze parti come [Cloudinary](https://cloudinary.com) ,
[imgix](https://imgix.com) , [Fastly's Image
Optimizer](https://www.fastly.com/io/) , [SmartVision di Instart
Logic](https://www.instartlogic.com/technology/machine-learning/smartvision) o
[ImageOptim API](https://imageoptim.com/api) offrono soluzioni complete per
l'ottimizzazione automatica delle immagini.

La quantità di tempo che trascorrerai leggendo i post del blog e modificando la
tua configurazione è maggiore della tariffa mensile per un servizio (Cloudinary
ha un livello [gratuito](http://cloudinary.com/pricing) ). Se non si desidera
esternalizzare questo lavoro per problemi di costi o di latenza, le opzioni open
source di cui sopra sono solide. Progetti come
[Imageflow](https://github.com/imazen/imageflow) o
[Thumbor](https://github.com/thumbor/thumbor) sono alternative auto-ospitate.

**Tutti dovrebbero comprimere le loro immagini in modo efficiente.**

Come minimo: utilizzare [ImageOptim](https://imageoptim.com/) . Può ridurre
significativamente le dimensioni delle immagini preservando la qualità visiva.
Sono disponibili anche [alternative](https://imageoptim.com/versions.html)
Windows e Linux.

In particolare: ottimizza i tuoi file JPEG con
[MozJPEG](https://github.com/mozilla/mozjpeg) ( `q=80` o inferiore va bene per i
contenuti web) e considera il supporto [JPEG
progressivo](http://cloudinary.com/blog/progressive_jpegs_and_green_martians) ,
PNG tramite [pngquant](https://pngquant.org/) e SVG tramite
[SVGO](https://github.com/svg/svgo) . Elimina in maniera esplicita i metadati
con `--strip` per pngquant) per evitare bloat. Invece di enormi GIF animate,
distribuisci video [H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) (o
[WebM](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) per Chrome, Firefox e
Opera)! Se non puoi almeno usare [Giflossy](https://www.webmproject.org/) . Se
hai disposizione cicli extra della CPU, necessiti di una qualità media superiore
a quella web e non sono un problema i tempi di codifica lenti: prova
[Guetzli](https://github.com/pornel/giflossy) .

Alcuni browser pubblicizzano il supporto per i formati immagine tramite
l'intestazione della richiesta Accept. Questo può essere usato per servire in
modo condizionale i formati: ad es. [WebP](/speed/webp/) lossy per browser
basati su Blink come Chrome e fallback in JPEG / PNG per altri browser.

Ma puoi fare anche di più. Esistono strumenti per generare e servire breakpoint
`srcset`. La selezione delle risorse può essere automatizzata in browser basati
su Blink con {a1}suggerimenti client{/a1} e puoi spedire meno byte agli utenti
che hanno optato per il "[salvataggio dei
dati](/web/updates/2015/09/automating-resource-selection-with-client-hints) "
nel browser ascoltando l'hint [Save-Data](/web/updates/2016/02/save-data) .

Più piccole sono le dimensioni del file delle tue immagini, migliore è
l'esperienza di rete che puoi offrire ai tuoi utenti, specialmente sui
dispositivi mobili. In questo articolo vedremo come ridurre le dimensioni
dell'immagine attraverso tecniche di compressione moderne con un impatto minimo
sulla qualità.

## Introduzione {: #introduction}

**Le immagini sono ancora la causa numero uno di gonfiarsi sul web.**

Le immagini occupano enormi quantità di larghezza di banda internet perché
spesso i file hanno grandi dimensioni. Secondo l'[archivio
HTTP](http://httparchive.org/) , il 60% dei dati trasferiti per recuperare una
pagina Web sono immagini composte da JPEG, PNG e GIF. A partire da luglio 2017,
le immagini hanno rappresentato
[1.7MB](http://httparchive.org/interesting.php#bytesperpage) del contenuto
caricato per il sito 3.0MB media.

Per Tammy Everts aggiungere immagini a una pagina o ingrandire le immagini
esistenti ha
[dimostrato](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)
di aumentare i tassi di conversione. È improbabile che le immagini andranno via
e quindi investire in una strategia di compressione efficiente per minimizzare
il rigonfiamento diventa importante.

<img src="images/Modern-Image00.jpg" alt="Fewer images per page create more
conversions. 19 images per page on average converted better than 31
images per page on average.">

Secondo una [ricerca Soasta /
Google](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/)
del 2016, le immagini sono state il secondo più alto fattore predittivo di
conversioni delle migliori pagine con il 38% rispetto a quelle con meno
immagini.

L'ottimizzazione delle immagini consiste in diverse misure che possono ridurre
la dimensione dei file immagine. Alla fine dipende da quale fedeltà visiva le
tue immagini richiedono.

<img src="images/image-optimisation.jpg" alt="L'ottimizzazione delle immagini
copre una serie di tecniche diverse"> <strong>Ottimizzazione
dell'immagine:</strong> scegli il formato giusto, comprimi attentamente e
assegna la priorità alle immagini critiche rispetto a quelle che possono essere
caricate in modo lazy.

Le comuni ottimizzazioni immagini includono la compressione, utilizzo in base
alle dimensioni dello schermo utilizzando
[`<picture>`](/web/fundamentals/design-and-ux/responsive/images) / [`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images) e ridimensionamento
per ridurre i costi di decodifica dell'immagine.

<img src="images/chart_naedwl.jpg" alt="Un istogramma di potenziale risparmio di
immagine da parte dell'archivio HTTP che convalida i 30 KB di potenziali
risparmi di immagine al 95 ° percentile."> Secondo l' [archivio
HTTP](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/) i risparmi per
immagine al 95° percentile (guardando la funzione di distribuzione cumulativa)
sono 30 KB!

C'è molto spazio per noi per ottimizzare collettivamente le immagini.

<img src="images/image-optim.jpg" alt="ImageOptim in use on Mac with a number of
images that have been compressed with savings over 50%">

ImageOptim è gratuito, riduce le dimensioni dell'immagine tramite tecniche di
compressione moderne e estraendo metadati EXIF ​​non necessari.

Se sei un designer c'è anche un [plugin ImageOptim per
Sketch](https://github.com/ImageOptim/Sketch-plugin) che ottimizzerà le tue
risorse per l'esportazione. Trovo sia un enorme risparmio di tempo.

### Come posso sapere se le mie immagini devono essere ottimizzate? {: #do-my-images-need-optimization}

Esegui un audit del sito tramite [WebPageTest.org](https://www.webpagetest.org/)
che evidenzierà le opportunità di ottimizzazione migliori delle tue immagini
(vedi "Comprimi le immagini").

<img src="images/Modern-Image1.jpg" alt="WebPage test supports auditing for
image compression via the compress images section">

La sezione "Comprimi le immagini" di un report WebPageTest elenca le immagini
che possono essere compresse in modo più efficiente e il risparmio stimato della
dimensione del file.

<img src="images/Modern-Image2.jpg" alt="image compression recommendations from
webpagetest">

Esegui audit con [Lighthouse](/web/tools/lighthouse/) riguardo le migliori
pratiche prestazionali. Include audit per l'ottimizzazione delle immagini e può
dare suggerimenti per immagini che potrebbero essere ulteriormente compresse o
indicare immagini che sono fuori schermo e che potrebbero essere caricate in
modalità lazy.

A partire da Chrome 60 Lighthouse ora alimenta il [pannello
Audits](/web/updates/2017/05/devtools-release-notes#lighthouse) in Chrome
DevTools:

<img class="lazyload small" data-src="images/hbo.jpg" alt="Audit del faro per
HBO.com, che mostra consigli per l'ottimizzazione delle immagini"> Lighthouse
può verificare le prestazioni Web, le best practice e le funzionalità di
un'applicazione Web progressiva.

Potresti anche avere familiarità con altri strumenti di controllo delle
prestazioni come [PageSpeed ​​Insights](/speed/pagespeed/insights/) o [Website
Speed ​​Test](https://webspeedtest.cloudinary.com/) di Cloudinary che include
una verifica dettagliata dell'analisi delle immagini.

## <a id="choosing-an-image-format" href="#choosing-an-image-format">Come scelgo il formato immagine?</a>

Come da nota Ilya Grigorik nella sua eccellente [guida all'ottimizzazione
dell'immagine](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
il "formato giusto" per un'immagine è una combinazione di risultati visivi
desiderati e requisiti funzionali. Stai lavorando con immagini raster o
vettoriali?

<img src="images/rastervvector.png" alt="vector vs raster images">

[La grafica raster](https://en.wikipedia.org/wiki/Raster_graphics) rappresenta
le immagini codificando i valori di ciascun pixel all'interno di una griglia
rettangolare di pixel. Sono dipendenti dalla risoluzione e dallo zoom. WebP o
formati ampiamente supportati come JPEG o PNG gestiscono bene queste immagini in
cui il fotorealismo è una necessità. Guetzli, MozJPEG e altre idee che abbiamo
discusso si applicano bene alla grafica raster.

[La grafica vettoriale](https://en.wikipedia.org/wiki/Vector_graphics) utilizza
punti, linee e poligoni per rappresentare immagini e formati utilizzando forme
geometriche semplici (ad es. Loghi) che offrono un SVG ad alta risoluzione e
zoom come questo caso d'uso.

Il formato sbagliato può costarti caro. Il flusso logico per scegliere il
formato giusto può essere irto di pericoli quindi sperimenta con cura i risparmi
che altri formati possono permetterti.

Jeremy Wagner ha coperto i [trade-off
che](http://jlwagner.net/talks/these-images/#/2/2) vale la pena considerare
quando si valuta il formato nei suoi talks di ottimizzazione delle immagini.

## L'umile JPEG {: #the-humble-jpeg}

[JPEG](https://en.wikipedia.org/wiki/JPEG) è quasi sicuramente il formato di
immagine più utilizzato al mondo. Come notato in precedenza il [45% delle
immagini](http://httparchive.org/interesting.php) viste su siti scansionati da
HTTP Archive sono JPEG. Il tuo telefono, la tua reflex digitale, quella vecchia
webcam - praticamente tutto supporta questo codec. È anche molto vecchio e
risale al 1992 quando fu pubblicato per la prima volta. Da allora sono state
fatte una immensa quantità di ricerche nel tentativo di migliorarlo.

JPEG è un algoritmo di compressione con perdita che elimina le informazioni al
fine di risparmiare spazio e facendo molti sforzi per tentare di preservare la
fedeltà visiva mantenendo le dimensioni dei file il più possibile ridotte.

**Quale qualità dell'immagine è accettabile per il tuo caso d'uso?**

Formati come JPEG sono più adatti per fotografie o immagini con un vasto numero
di regioni e colori. La maggior parte degli strumenti di ottimizzazione ti
consentirà di impostare il livello di compressione di cui sei soddisfatto; una
maggiore compressione riduce la dimensione del file ma può introdurre artefatti,
aloni o degrado a blocchi.

<img src="images/Modern-Image5.jpg" alt="JPEG compression artifacts can be
increasingly perceived as we shift from best quality to lowest">

JPEG: gli artefatti di compressione JPEG percettibili possono aumentare man mano
che passiamo dalla migliore qualità alla più bassa. Tieni presente che i
punteggi di qualità dell'immagine con uno strumento possono essere molto diversi
dai punteggi di qualità di un altro.

Quando scegli quale impostazione di qualità utilizzare considera in quale ambito
di qualità rientrano le tue immagini:

- **La migliore qualità** - quando la qualità conta più della larghezza di
banda. Ciò potrebbe essere dovuto al fatto che l'immagine ha un risalto nel
progetto o viene visualizzata a piena risoluzione.
- **Buona qualità** : quando ti interessa spedire file di dimensioni più piccole
ma non vuoi avere un impatto troppo negativo sulla qualità dell'immagine. Gli
utenti si preoccupano ancora di un certo livello di qualità dell'immagine.
- **Bassa qualità** : quando ti preoccupi abbastanza della larghezza di banda ma
il degrado dell'immagine è ok. Queste immagini sono adatte per condizioni di
rete scarsa.
- **La qualità più bassa** - il risparmio di larghezza di banda è fondamentale.
Gli utenti desiderano un'esperienza decente e accetteranno un'esperienza
piuttosto degradata a vantaggio del caricamento delle pagine più rapido.

Quindi parliamo delle modalità di compressione JPEG in quanto possono avere un
grande impatto sulle prestazioni percepite.

Note: è possibile che a volte sopravvalutiamo la qualità dell'immagine di cui
hanno bisogno i nostri utenti. La qualità dell'immagine potrebbe essere
considerata una deviazione da una fonte ideale non compressa. Può anche essere
soggettivo.

## Modalità di compressione JPEG {: #jpeg-compression-modes}

Il formato dell'immagine JPEG ha un certo numero di diverse [modalità di
compressione](http://cs.haifa.ac.il/%7Enimrod/Compression/JPEG/J5mods2007.pdf) .
Tre modalità popolari sono la linea di base (sequenziale), Progressive JPEG
(PJPEG) e lossless.

**In che cosa differiscono i JPEG baseline (o sequenziali) e i JPEG
progressivi?**

I file JPEG baseline (di default per la maggior parte degli strumenti di
modifica e ottimizzazione delle immagini) sono codificati e decodificati in modo
relativamente semplice: dall'alto in basso. Quando i file JPEG baseline vengono
caricati su connessioni lente o altalenanti gli utenti vedono prima la parte
superiore dell'immagine visualizzata mentre l'immagine viene caricata. I file
JPEG senza perdita di immagine sono simili ma hanno un rapporto di compressione
più basso.


<img src="images/Modern-Image6.jpg" alt="JPEG di base caricano dall'alto verso
il basso"> I file JPEG baseline vengono caricati dall'alto verso il basso mentre
i JPEG progressivi vengono caricati da sfocati a nitidi.

I JPEG progressivi dividono l'immagine in un numero di scansioni. La prima
scansione mostra l'immagine con un'impostazione sfocata o di bassa qualità e le
scansioni successive migliorano la qualità dell'immagine. Pensa a questo come un
affinamento "progressivo". Ogni "scansione" di un'immagine aggiunge un livello
crescente di dettagli. Combinandoli si crea un'immagine di qualità elevata.

<img src="images/Modern-Image7.jpg" alt="JPEG progressivi caricano da bassa
risoluzione ad alta risoluzione"> I file JPEG baseline caricano le immagini
dall'alto verso il basso. I PJPEG vengono caricati da bassa risoluzione
(sfocata) ad alta risoluzione. Pat Meenan ha scritto uno [strumento
interattivo](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)
per testare e conoscere le scansioni JPEG progressive.

L'ottimizzazione JPEG senza perdita di dati può essere ottenuta [rimuovendo i
dati EXIF](http://www.verexif.com/en/) aggiunti dalle fotocamere digitali o
dagli editor, ottimizzando le [tabelle di
Huffman](https://en.wikipedia.org/wiki/Huffman_coding) di un'immagine o
riesaminando l'immagine. Strumenti come
[jpegtran](http://jpegclub.org/jpegtran/) raggiungono una compressione senza
perdita riorganizzando i dati compressi senza degrado dell'immagine.
[jpegrescan](https://github.com/kud/jpegrescan),
[jpegoptim](https://github.com/tjko/jpegoptim) e
[mozjpeg](https://github.com/mozilla/mozjpeg) (che
[analizzeremo](https://github.com/mozilla/mozjpeg) a breve) supportano anche la
compressione JPEG senza perdita di dati.

### I vantaggi di Progressive JPEGs {: #the-advantages-of-progressive-jpegs}

La possibilità per PJPEG di offrire "anteprime" a bassa risoluzione di
un'immagine mentre carica migliora le prestazioni percepite - gli utenti possono
sentirsi come l'immagine si sta caricando più velocemente rispetto alle immagini
adattive.

Nelle connessioni 3G più lente questo consente agli utenti di vedere
(approssimativamente) cosa c'è in un'immagine quando è stata ricevuta solo una
parte del file e fare una chiamata per attendere se è necessario caricarla
completamente. Questo può essere più piacevole della visualizzazione dall'alto
verso il basso delle immagini offerte dai JPEG baseline.

<img src="images/pjpeg-graph.png" alt="impatto sul tempo di attesa del passaggio
al jpeg progressivo"> Nel 2015 [Facebook è passata a PJPEG (per la loro app
iOS)](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)
e ha visto una riduzione del 10% nell'utilizzo dei dati. Sono stati in grado di
mostrare un'immagine di buona qualità più velocemente del 15% rispetto al
passato ottimizzando il tempo di caricamento percepito come mostrato nella
figura sopra.

I PJPEG possono migliorare la compressione consumando il
[2-10%](http://www.bookofspeed.com/chapter5.html) in meno di larghezza di banda
rispetto ai JPEG baseline / semplici per immagini superiori a 10 KB. Il loro
rapporto di compressione è più alto a ciascuna scansione JPEG che può avere la
propria [tabella Huffman](https://en.wikipedia.org/wiki/Huffman_coding)
opzionale dedicata. I moderni codificatori JPEG (ad esempio
[libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/) , MozJPEG, ecc.) Sfruttano
la flessibilità di PJPEG per impacchettare meglio i dati.

Note: Perché PJPEGs comprime meglio? I blocchi di JPEG Baseline sono codificati
uno alla volta. Mentre in PJPEG i coefficienti di [trasformazione coseno
discreti](https://en.wikipedia.org/wiki/Discrete_cosine_transform) simili su più
di un blocco possono essere codificati insieme portando a una compressione
migliore.

### Chi sta usando i JPEG progressivi in ​​produzione? {: #whos-using-progressive-jpegs-in-production}

- [Twitter.com invia JPEG
progressivi](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)
con una base di qualità dell'85%. Hanno misurato la latenza percepita
dall'utente (tempo di prima scansione e tempo di caricamento complessivo) e
hanno trovato nel complesso che le PJPEG erano competitive nell'affrontare i
loro requisiti per dimensioni di file basse, tempi di transcodifica e decodifica
accettabili.
- [Facebook spedisce JPEG progressivi per la loro app
iOS](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)
. Hanno scoperto che riduce l'utilizzo dei dati del 15% e consente loro di
mostrare un'immagine di buona qualità del 15% più veloce.
- [Yelp è passato a JPEG
progressivi](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)
e ha scoperto che era in parte responsabile del ~ 4,5% dei risparmi sulla
riduzione delle dimensioni dell'immagine. Hanno anche risparmiato un ulteriore
13,8% utilizzando MozJPEG

### Gli svantaggi di Progressive JPEGs {: #the-disadvantages-of-progressive-jpegs }

I PJPEG possono essere decodificati più lentamente rispetto ai file JPEG di
base, a volte fino a 3 volte in più. Su macchine desktop con potenti CPU questo
può essere meno preoccupante ma invece lo è se si tratta di dispositivi mobili
sottodimensionati con risorse limitate. La visualizzazione di livelli incompleti
richiede lavoro do decodifica immagine più volte. Questi passaggi multipli
possono consumare i cicli della CPU.

Anche i file JPEG progressivi non sono *sempre* più piccoli. Per immagini molto
piccole (come le miniature), i JPEG progressivi possono essere più grandi delle
loro controparti baseline. Infatti, per miniature così piccole, il rendering
progressivo potrebbe non essere la soluzione migliore.

Ciò significa che al momento di decidere se spedire o meno PJPEG, è necessario
sperimentare e trovare il giusto equilibrio tra dimensione del file, latenza di
rete e utilizzo dei cicli della CPU.

Note: PJPEG (e tutti i file JPEG) a volte possono essere decodificabili
dall'hardware sui dispositivi mobili. Non migliora l'impatto sulla RAM, ma può
annullare alcuni dei problemi della CPU. Non tutti i dispositivi Android hanno
il supporto per l'accelerazione hardware che è invece disponibile sui
dispositivi di fascia alta e su tutti i dispositivi iOS.

Alcuni utenti possono considerare il caricamento progressivo come uno svantaggio
in quanto può diventare difficile capire quando un'immagine ha completato il
caricamento. Poiché questo può variare notevolmente per il pubblico, valuta ciò
che ha senso per i tuoi utenti.

### Come si creano i JPEG progressivi? {: #how-to-create-progressive-jpegs}

Strumenti e librerie come [ImageMagick](https://www.imagemagick.org/),
[libjpeg](http://libjpeg.sourceforge.net/),
[jpegtran](http://jpegclub.org/jpegtran/),
[jpeg-recompress](http://jpegclub.org/jpegtran/) e
[imagemin](https://github.com/imagemin/imagemin) supportano l'esportazione di
JPEG progressivi. Se disponi di una pipeline di ottimizzazione dell'immagine
esistente, è probabile che l'aggiunta del supporto per il caricamento
progressivo possa essere:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

La maggior parte degli strumenti di modifica delle immagini salva le immagini
come file JPEG baseline per impostazione predefinita.

<img src="images/photoshop.jpg" alt="Photoshop supporta l'esportazione in jpeg
progressivo dal menu di esportazione file"> La maggior parte degli strumenti di
modifica delle immagini salva le immagini come file JPEG baseline per
impostazione predefinita. Puoi salvare qualsiasi immagine creata in Photoshop
come JPEG progressivo andando su File -> Esporta -> Salva per Web (legacy) e
quindi facendo clic sull'opzione Progressiva. Sketch supporta anche
l'esportazione di JPEG progressivi - esporta come JPG e seleziona la casella di
controllo 'Progressiva' mentre salvi le tue immagini.

### Sottocampionamento Chroma (o colore) {: #chroma-subsampling}

I nostri occhi sono più indulgenti alla perdita dei dettagli del colore in
un'immagine (chroma) di quanto non siano la luminanza (o luma in breve - una
misura della luminosità). Il [sottocampionamento
chroma](https://en.wikipedia.org/wiki/Chroma_subsampling) è una forma di
compressione che riduce la precisione del colore in un segnale a favore della
luminanza. Ciò riduce la dimensione del file, in alcuni casi fino al
[15-17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/)
, senza influire negativamente sulla qualità dell'immagine ed è un'opzione
disponibile per le immagini JPEG. Il campionamento secondario può anche ridurre
l'utilizzo della memoria delle immagini.

<img src="images/luma-signal.jpg" alt="signal = chroma + luma">

Poiché il contrasto è responsabile della formazione di forme che vediamo in
un'immagine, la luma, che la definisce, è piuttosto importante. Le foto in
bianco e nero più vecchie o filtrate non possono contenere colori, ma grazie a
luma, possono essere altrettanto dettagliate delle loro controparti a colori. Il
croma (a colori) ha un impatto minore sulla percezione visiva.

<img src="images/no-subsampling.jpg" alt="JPEG includes support for numerous
subsampling types: none, horizontal and horizontal and vertical.">

JPEG supporta diversi tipi di sottocampionamento: nessuno, orizzontale,
orizzontale e verticale. Questo diagramma è da [JPEG per horseshoe
crabs{](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf) di Frédéric
Kayser.

Ci sono un certo numero di campioni comuni discussi quando si parla di
sottocampionamento. Generalmente, `4:4:4` , `4:2:2` e `4:2:0` . Ma cosa
rappresentano? Diciamo che un sottocampione prende il formato A: B: C. A è il
numero di pixel in una riga e per i JPEG questo è in genere 4. B rappresenta la
quantità di colore nella prima riga e C il colore nel secondo.

- `4:4:4` non ha compressione, quindi il colore e il luma vengono trasportati
completamente.
- `4:2:2` ha la metà del campionamento in orizzontale e il campionamento
completo in verticale.
- `4:2:0` campiona colori della metà dei pixel della prima riga e ignora la
seconda riga.

Note: jpegtran e cjpeg supportano la configurazione di qualità separata di
luminanza e chroma. Questo può essere fatto aggiungendo il flag `-sample` (es.
`-sample 2x1` ).

Alcune buone regole generali: il sottocampionamento ( `-sample 2x2` ) è ottimo
per le foto. Il no-subsample ( `-sample 1x1` ) è il migliore per schermate,
banner e pulsanti. C'è finalmente un compromesso ( `2x1` ) se non sei sicuro di
cosa usare.

Riducendo i pixel nei nostri componenti chroma, è possibile ridurre in modo
significativo la dimensione delle componenti del colore, riducendo in definitiva
la dimensione dei byte.

<img src="images/subsampling.jpg" alt="Configurazioni di sottocampionamento di
Chrome per un JPEG con qualità 80."> Configurazioni di sottocampionamento di
Chrome per un JPEG con qualità 80.

Il sottocampionamento chroma merita di essere preso in considerazione per la
maggior parte dei tipi di immagine. Ha alcune eccezioni degne di nota: poiché il
sottocampionamento si basa su limitazioni nei nostri occhi, non è ottimo per la
compressione di immagini in cui i dettagli dei colori possono essere importanti
quanto la luminanza (ad esempio le immagini mediche).

Anche le immagini contenenti caratteri tipografici possono soffrire in quanto un
sottocampionamento del testo insufficiente può ridurne la leggibilità. I bordi
più nitidi sono più difficili da comprimere con JPEG in quanto è stato
progettato per gestire meglio le scene fotografiche con transizioni più morbide.

<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="Fai attenzione
quando usi un sottocampionamento pesante con immagini contenenti testo">
[Informazioni su JPEG](http://compress-or-die.com/Understanding-JPG/) consiglia
di attenersi a un sottocampionamento di 4: 4: 4 (1x1) quando si lavora con
immagini contenenti testo.

Trivia: il metodo esatto del sottocampionamento Chroma non era indicato nelle
specifiche JPEG, quindi i diversi decodificatori lo gestiscono diversamente.
MozJPEG e libjpeg-turbo usano lo stesso metodo di ridimensionamento. Le versioni
precedenti di libjpeg utilizzano un metodo diverso che aggiunge artefatti di
chiamata ai colori.

Note: Photoshop imposta automaticamente il sottocampionamento Chroma quando si
utilizza la funzione "Salva per web". Quando la qualità dell'immagine è
impostata tra 51-100, non viene utilizzato il sottocampionamento ( `4:4:4` ).
Quando la qualità è inferiore, viene utilizzato un sottocampionamento `4:2:0` .
Questo è uno dei motivi per cui è possibile osservare una riduzione di
dimensioni del file molto maggiore quando si passa dalla qualità alla 51 alla
50.

Note: nelle sottocampionate si parla spesso del termine
[YCbCr](https://en.wikipedia.org/wiki/YCbCr) . Questo è un modello che può
rappresentare spazi cromatici
[RGB](https://en.wikipedia.org/wiki/RGB_color_model) con correzione gamma. Y è
luminanza gamma-correttiva, Cb è il componente croma del colore blu e Cr è il
componente croma del colore rosso. Se guardi ExifData, vedrai YCbCr vicino ai
livelli di campionamento.

Per ulteriori informazioni su Chroma Subsampling, vedere [Perché le immagini non
vengono utilizzate con il sottocampionamento
Chroma?](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/)

### Quanto siamo lontani dal JPEG? {: #how-far-have-we-come-the-jpeg}

**Ecco lo stato corrente dei formati di immagine sul web:**

*tl; dr - c'è molta frammentazione. Spesso abbiamo bisogno di servire in modo
condizionato diversi formati a diversi browser per sfruttare tutto ciò che è
moderno.*

<img src="images/format-comparison.jpg" alt="formati di immagine moderni
confrontati in base alla qualità."> Diversi formati di immagine moderna (e
ottimizzatori) utilizzati per dimostrare ciò che è possibile in una dimensione
file di destinazione di 26 KB. Possiamo confrontare la qualità usando
[SSIM](https://en.wikipedia.org/wiki/Structural_similarity) (similarità
strutturale) o [Butteraugli](https://github.com/google/butteraugli) , che
[tratteremo](https://github.com/google/butteraugli) più dettagliatamente in
seguito.

- **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000) (2000)** : un
miglioramento della commutazione JPEG da una trasformazione basata su un coseno
discreto a un metodo basato su wavelet. **Supporto browser: desktop Safari +
iOS**
- **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR) (2009)** - alternativa a
JPEG e JPEG 2000 che supporta
[HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) e spazi cromatici
a [gamut](http://wikivisually.com/wiki/Gamut) ampia. Produce file più piccoli di
JPEG a velocità di codifica / decodifica leggermente più lente. **Supporto per
browser: Edge, IE.**
- **[WebP](https://en.wikipedia.org/wiki/WebP) (2010)** - formato basato su
previsione dei blocchi di Google con supporto per la compressione lossy e
lossless. Offre un risparmio in termini di byte ed il supporto della trasparenza
rispetto a JPEG dove spesso vengono utilizzati PNG byte-heavy. Manca la
configurazione del sottocampionamento chroma e il caricamento progressivo. I
tempi di decodifica sono anche più lenti della decodifica JPEG. **Supporto per
browser: Chrome, Opera. Sperimentato da Safari e Firefox.**
- **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format) (2015)**
- formato immagine senza perdite che pretende di sovraperformare PNG, Web
senza perdita di dati, BPG senza perdita di dati e JPEG 2000 senza perdita
basato sul rapporto di compressione. **Supporto per il browser: nessuno.**
- **HEIF e BPG.** Dal punto di vista della compressione, sono uguali ma hanno un
wrapper diverso:
- **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics) (2015)** -
inteso come sostituto più efficiente della compressione per JPEG, basato su HEVC
([High Efficiency Video
Coding](http://wikivisually.com/wiki/High_Efficiency_Video_Coding)). Sembra
offrire una migliore dimensione del file rispetto a MozJPEG e WebP.
Difficilmente si otterrà un'ampio impiego a causa di problemi di licenza.
**Supporto per il browser: nessuno. *Si noti che esiste un [decodificatore nel
browser JS](https://bellard.org/bpg/) .***
- **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
(2015)** - formato per immagini e sequenze di immagini per la memorizzazione di
immagini con codifica HEVC con inter-predizione vincolata applicata. Apple ha
annunciato al
[WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)
che avrebbe esplorato il passaggio a HEIF su JPEG per iOS, citando fino a 2x
risparmi su dimensioni del file. **Supporto del browser: Nessuno al momento
della scrittura. Alla fine, Safari desktop e iOS 11**

Se sei più visivo, potresti apprezzare
[uno](https://people.xiph.org/%7Exiphmont/demo/daala/update1-tool2b.shtml) di
[questi](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)
strumenti di confronto visivo per alcuni dei precedenti.

Pertanto, il **supporto del browser è frammentato** e, se desideri usufruire di
uno dei formati precedenti, è probabile che dovrai servire in modo condizionato
fallback per ciascuno dei tuoi browser di destinazione. In Google, abbiamo
creduto nelle promesse di WebP quindi approfondiremo nel dettaglio di seguito.

Puoi anche servire i formati di immagine (ad esempio WebP, JPEG 2000) con
un'estensione .jpg (o qualsiasi altra) poiché il browser che renderizza
l'immagine è in grado di decidere il tipo di supporto. Ciò consente la
[negoziazione del tipo di
contenuto](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)
lato server per decidere quale immagine inviare senza che sia necessario
modificare l'HTML. Servizi come Instart Logic utilizzano questo approccio quando
forniscono immagini ai propri clienti.

Quindi, parliamo di un'opzione per quando non è possibile servire in modo
condizionato diversi formati di immagine: **ottimizzazione dei codificatori
JPEG** .

### Ottimizzazione degli encoder JPEG {: #optimizing-jpeg-encoders}

I moderni codificatori JPEG tentano di produrre file JPEG di minore dimensione e
fedeltà, mantenendo la compatibilità con i browser e le applicazioni di
elaborazione delle immagini esistenti. Evitano la necessità di introdurre nuovi
formati di immagine o cambiamenti nell'ecosistema in modo che i guadagni di
compressione siano possibili. Due di questi codificatori sono MozJPEG e Guetzli.

***tl; dr Quale ottimizzatore di Encoder JPEG dovresti usare?***

- Risorse web generali: MozJPEG
- La qualità è la tua preoccupazione principale e non ti spaventano i lunghi
tempi di codifica: usa Guetzli
- Se hai bisogno di configurabilità:
- [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive) (che usa
MozJPEG sotto il cofano)
- [JPEGMini](http://www.jpegmini.com/) . È simile a Guetzli - sceglie
automaticamente la migliore qualità. Non è tecnicamente sofisticato come
Guetzli, ma è più veloce e punta a un intervallo di qualità più adatto per il
web.
- [API ImageOptim](https://imageoptim.com/api) (con interfaccia online gratuita
[qui](https://imageoptim.com/online) ) - è unica nella sua gestione del colore.
È possibile scegliere la qualità del colore separatamente dalla qualità
generale. Sceglie automaticamente il sottocampionamento del chroma per
preservare i colori ad alta risoluzione negli screenshot, ma evita i byte
sprecati su colori uniformi in foto naturali.

### Cos'è MozJPEG? {: #what-is-mozjpeg}

Mozilla offre un codificatore JPEG modernizzato sotto forma di
[MozJPEG](https://github.com/mozilla/mozjpeg).
[Sostiene](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)
risultati fino al 10% inferiori sui file JPEG. I file compressi con MozJPEG
funzionano cross-browser e alcune delle sue funzionalità includono
l'ottimizzazione progressiva della scansione, la [trellis
quantization](https://en.wikipedia.org/wiki/Trellis_quantization) (scarta i
dettagli che comprimono meno) e alcuni [preset di tabella di
quantizzazione](https://calendar.perfplanet.com/2014/mozjpeg-3-0/) decenti che
aiutano a creare immagini ad alta risoluzione più snelle (sebbene ciò sia
possibile con ImageMagick se sei disposto a guadare attraverso le configurazioni
XML).

MozJPEG è supportato sia in
[ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45) che in un
[plugin imagemin](https://github.com/imagemin/imagemin-mozjpeg) configurabile
relativamente affidabile. Ecco un'implementazione di esempio con Gulp:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85

    })]))
    .pipe(gulp.dest('dist'))
);
```

<img src="images/Modern-Image10.jpg" alt="mozjpeg being run from the
command-line">

<img src="images/Modern-Image11.jpg" alt="mozjpeg compression at different
qualities. At q=90, 841KB. At q=85, 562KB. At q=75, 324KB. Similarly,
Butteraugli and SSIM scores get slightly worse as we lower quality.">

MozJPEG: confronto tra dimensioni dei file e punteggi di somiglianza visiva con
qualità diverse.

Ho usato [jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
dal progetto [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive) per
calcolare i punteggi SSIM (The Structural Similarity) per un'immagine sorgente.
SSIM è un metodo per misurare la somiglianza tra due immagini, in cui il
punteggio SSIM è una misura di qualità di un'immagine, considerando che l'altra
"perfetta".

Nella mia esperienza, MozJPEG è una buona opzione per la compressione di
immagini per il web ad alta qualità visiva e al contempo riduzione delle
dimensioni del file. Per immagini di piccole e medie dimensioni, ho trovato che
MozJPEG (con qualità = 80-85) ha consentito un risparmio del 30-40% sulle
dimensioni del file pur mantenendo un SSIM accettabile, offrendo un
miglioramento del 5-6% su jpeg-turbo. Ha un [costo di codifica più
lento](http://www.libjpeg-turbo.org/About/Mozjpeg) rispetto al JPEG baseline ma
questo non dovrebbe fermarti.

Note: se hai bisogno di uno strumento che supporti MozJPEG con supporto di
configurazione aggiuntivo e alcune utility gratuite per il confronto delle
immagini, controlla
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive) . Jeremy
Wagner, autore di Web Performance in Action, ha avuto un certo successo usandolo
con [questa](https://twitter.com/malchata/status/884836650563579904)
configurazione.

### Cos'è Guetzli? {: #what-is-guetzli}

[Guetzli](https://github.com/google/guetzli) è un codificatore JPEG promettente,
ma lento, percettivo di Google che cerca di trovare il JPEG più piccolo che sia
percettivamente indistinguibile dall'originale all'occhio umano. Esegue una
sequenza di esperimenti che producono proposte per il JPEG finale, tenendo conto
dell'errore psicovisivo di ogni proposta. Di questi, seleziona la proposta con
il punteggio più alto come output finale.

Per misurare le differenze tra le immagini, Guetzli usa
[Butteraugli](https://github.com/google/butteraugli) , un modello per misurare
la differenza di immagine basata sulla percezione umana (discussa di seguito).
Guetzli può tenere conto di alcune proprietà della visione che altri
codificatori JPEG non hanno. Ad esempio, esiste una relazione tra la quantità di
luce verde vista e la sensibilità al blu, quindi i cambiamenti di blu in
prossimità del verde possono essere codificati un po 'meno precisamente.

Note: le dimensioni del file immagine dipendono **molto** più dalla scelta della
**qualità** rispetto alla scelta del **codec** . Ci sono differenze di
dimensioni di file molto più grandi tra i JPEG di qualità più bassa e più alta
rispetto al risparmio di dimensioni dei file reso possibile dalla commutazione
dei codec. L'utilizzo della qualità accettabile più bassa è molto importante.
Evita di impostare la tua qualità troppo alta senza prestare attenzione ad essa.

Guetzli
[sostiene](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html)
di ottenere una riduzione del 20-30% delle dimensioni dei dati per le immagini
per un dato punteggio di Butteraugli rispetto ad altri compressori. Un grande
avvertimento sull'uso di Guetzli è che è estremamente, estremamente lento ed è
attualmente adatto solo per il contenuto statico. Dal README, possiamo notare
che Guetzli richiede una grande quantità di memoria: può richiedere 1 minuto +
200 MB di RAM per megapixel. C'è una buona discussione sull'esperienza d'uso nel
mondo reale di Guetzli in [questa discussione su
Github](https://github.com/google/guetzli/issues/50) . Può essere ideale per
quando si stanno ottimizzando le immagini come parte di un processo di
compilazione per un sito statico, ma meno quando eseguite su richiesta.

Nota: Guetzli può essere più adatto quando si ottimizzano le immagini come parte
di un processo di compilazione per un sito statico o in situazioni in cui
l'ottimizzazione delle immagini non viene eseguita su richiesta.

Strumenti come ImageOptim supportano l'ottimizzazione  Guetzli (nelle [ultime
versioni](https://imageoptim.com/) ).

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```

<img src="images/Modern-Image12.jpg" alt="guetzli being run from gulp for
optimization">

Ci sono voluti quasi sette minuti (ed un elevato utilizzo della CPU) per
codificare 3 immagini da 3MP usando Guetzli con vari risparmi. Per
l'archiviazione di foto ad alta risoluzione, ho potuto vedere che offre un certo
valore.

<img src="images/Modern-Image13.jpg" alt="confronto di guetzli a diverse
qualità. q = 100, 945KB. q = 90, 687 KB. q = 85, 542 KB."> Guetzli: un confronto
tra dimensioni dei file e punteggi di somiglianza visiva con qualità diverse.

Note: si consiglia di eseguire Guetzli su immagini di alta qualità (ad es.
Immagini di input non compresse, sorgenti PNG o JPEG di qualità 100% o simile).
Invece funzionerà anche su altre immagini (ad esempio JPEG di qualità 84 o
inferiore) ma i risultati possono essere mediocri.

Mentre comprimere un'immagine con Guetzli è molto (molto) dispendioso in termini
di tempo e farà girare le tue ventole, per immagini più grandi, ne vale la pena.
Ho visto un certo numero di esempi in cui è stato risparmiato fino al 40% delle
dimensioni del file pur mantenendo la fedeltà visiva. Questo lo ha reso perfetto
per l'archiviazione delle foto. Nelle immagini di piccole e medie dimensioni, ho
ancora visto alcuni risparmi (nell'intervallo 10-15KB), ma non erano altrettanto
pronunciati. Guetzli può introdurre una distorsione  liquida su immagini più
piccole durante la compressione.

Potresti anche essere interessato alla ricerca di Eric Portis che
[confronta](https://cloudinary.com/blog/a_closer_look_at_guetzli) Guetzli con
l'autocompressione di Cloudinary per un diverso punto di vista sull'efficacia.

### Come si confronta MozJPEG con Guetzli? {: #mozjpeg-vs-guetzli}

Il confronto tra diversi encoder JPEG è complesso: è necessario confrontare sia
qualità e fedeltà dell'immagine compressa sia la dimensione finale. Come osserva
l'esperto di compressione delle immagini Kornel Lesiński, l'analisi comparativa
di uno, ma non entrambi, di questi aspetti potrebbe portare a conclusioni [non
valide](https://kornel.ski/faircomparison).

Come fa Guetzli a confrontarsi con MozJPEG? - Kornel's take:

- Guetzli è sintonizzato per immagini di qualità superiore (si dice che
butteraugli sia il migliore per `q=90`+, il punto debole di MozJPEG è intorno a
`q=75` )
- Guetzli è molto più lento da comprimere (entrambi producono JPEG standard,
quindi la decodifica è veloce come al solito)
- MozJPEG non seleziona automaticamente le impostazioni di qualità, ma puoi
trovare la qualità ottimale usando uno strumento esterno, ad es.
[Jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)

Esistono numerosi metodi per determinare se le immagini compresse sono
visivamente simili o percepibili come simili agli originali. Gli studi sulla
qualità delle immagini utilizzano spesso metodi come
[SSIM](https://en.wikipedia.org/wiki/Structural_similarity) (similarità
strutturale). Tuttavia Guetzli ottimizza con Butteraugli.

### Butteraugli {: #butteraugli }

[Butteraugli](https://github.com/google/butteraugli) è un progetto Google
per stimare il punto in cui una persona potrebbe notare un degrado dell'immagine
visiva (la somiglianza psicovisiva) tra due immagini. Dà un punteggio per le
immagini che è affidabile nel dominio delle differenze appena evidenti.
Butteraugli non solo
fornisce un punteggio scalare, ma calcola anche una mappa spaziale del livello
di differenze. Mentre SSIM esamina l'aggregato di errori di un'immagine,
Butteraugli esamina la parte peggiore.

<img src="images/Modern-Image14.jpg" alt="butteraugli validating an image of a
parrot"> Sopra un esempio che ha usato Butteraugli per trovare la soglia minima
di qualità JPEG prima del degrado visivo diventi grave e
l'utente noti qualcosa di non chiaro. Ne risultata una riduzione del 65% nelle
dimensione totali del file.

In pratica, definiresti un obiettivo per la qualità visiva e poi eseguirai una
serie di diverse strategie di ottimizzazione dell'immagine, osservando i tuoi
punteggi di Butteraugli, prima di scegliere qualcosa che si adatti al miglior
equilibrio tra dimensioni e livello di file.

<img class="lazyload small" data-src="images/Modern-Image15.jpg"
alt="butteraugli viene eseguito dalla riga di comando"> Tutto sommato, mi ci
sono voluti circa 30m per configurare Butteraugli localmente dopo aver
installato Bazel e ottenere una compilazione dei sorgenti C ++ per compilare
correttamente sul mio Mac. Usarlo è quindi relativamente semplice: specifica le
due immagini da confrontare (una versione sorgente e compressa) e ti darà un
punteggio su cui lavorare.

**In che modo Butteraugli si differenzia per altri modi di confrontare la
somiglianza visiva?**

[Questo
commento](https://github.com/google/guetzli/issues/10#issuecomment-276295265) di
un membro del progetto Guetzli suggerisce che Guetzli ha ottenuto il punteggio
migliore su Butteraugli, il peggiore su SSIM e MozJPEG va bene per entrambi.
Questo è in linea con la ricerca che ho inserito nella mia strategia di
ottimizzazione delle immagini. Eseguo Butteraugli e un modulo Node come
[img-ssim](https://www.npmjs.com/package/img-ssim) su immagini che confrontare
la sorgente con i loro punteggi SSIM prima / dopo Guetzli e MozJPEG.

**Combinare gli encoder?**

Per immagini più grandi, ho trovato che Combinare Guetzli con la **compressione
senza perdita** in MozJPEG (jpegtran, non cjpeg per evitare di buttare via il
lavoro svolto da Guetzli) può portare ad un ulteriore calo del 10-15% nel file
(55% complessivo) con solo diminuzioni molto ridotte in SSIM. Questo è qualcosa
che vorrei mettere in guardia richiede la sperimentazione e l'analisi, ma è
stato anche provato da altri sul campo come [Ariya
Hidayat](ariya.io/2017/03/squeezing-jpeg-images-with-guetzli) con risultati
promettenti.

MozJPEG è un codificatore adatto ai principianti per le risorse web che è
relativamente veloce e produce immagini di buona qualità. Poiché Guetzli è ad
alta intensità di risorse e funziona meglio con immagini più grandi e di qualità
superiore, è un'opzione che riserverei agli utenti di livello intermedio o
avanzato.

## Che cos'è WebP? {: #what-is-webp}

[WebP](/speed/webp/) è un formato di immagine recente di Google che mira a
offrire file di dimensioni inferiori per la compressione lossless e lossy con
una qualità visiva accettabile. Include il supporto per la trasparenza e
l'animazione del canale alfa.

Nell'ultimo anno, WebP ha guadagnato il pochi per cento in termini di
compressione in modalità con perdita e senza perdita di velocità e l'algoritmo
ha ottenuto il doppio della velocità con un miglioramento del 10% nella
decompressione. WebP non è uno strumento per tutti gli scopi, ma ha una base di
utenti in costante crescita nella comunità di compressione delle immagini.
Esaminiamo perché.

<img src="images/Modern-Image16.jpg" alt="confronto di webp con diverse
impostazioni di qualità. q = 90, 646 KB. q = 80 = 290 KB. q = 75, 219 KB. q =
70, 199 KB"> WebP: confronto tra dimensioni dei file e punteggi di somiglianza
visiva con qualità diverse.

### Come funziona WebP? {: #how-does-webp-perform}

**Compressione lossy**

I file lossy WebP, che utilizzano una variante di codifica dei fotogrammi video
VP8 o VP9, ​​vengono citati in media dal team WebP come
[25-34%](/speed/webp/docs/webp_study) più piccoli dei file JPEG.

Nell'intervallo di bassa qualità (0-50), WebP ha un grande vantaggio rispetto a
JPEG perché può sfocare brutti artefatti di blocco. Un'impostazione di media
qualità (-m 4 -q 75) è la velocità di bilanciamento predefinita / dimensione del
file. Nella gamma più alta (80-99), i vantaggi di WebP si restringono. WebP è
raccomandato laddove la velocità conta più della qualità.

**Compressione lossless**

[I file senza perdita WebP sono inferiori del 26% rispetto ai file
PNG](/speed/webp/docs/webp_lossless_alpha_study). La diminuzione del tempo di
caricamento rispetto al PNG è del 3%. Detto questo, in genere non si desidera
offrire agli utenti immagini lossless sul Web. C'è una differenza sui bordi tra
lossless e sharp (ad esempio non JPEG). WebP senza perdita di dati potrebbe
essere più adatto per i contenuti di archiviazione.

**Trasparenza**

WebP ha un canale di trasparenza a 8 bit senza perdita con solo il 22% di byte
in più rispetto al PNG. Supporta anche la perdita di trasparenza RGB, che è una
caratteristica esclusiva di WebP.

**Metadata**

Il formato file WebP supporta i metadati di foto EXIF ​​e i metadati di
documenti digitali XMP. Contiene anche un profilo colore ICC.

WebP offre una compressione migliore a costo di un utilizzo più intensivo della
CPU. Nel 2013, la velocità di compressione di WebP era ~ 10 volte più lenta di
JPEG, ma ora è trascurabile (alcune immagini potrebbero essere 2x più lente).
Per le immagini statiche che vengono elaborate come parte della tua build,
questo non dovrebbe essere un grosso problema. Le immagini generate
dinamicamente causeranno probabilmente un sovraccarico della CPU percepibile e
saranno qualcosa che dovrai valutare.

Note: le impostazioni di qualità lossy WebP non sono direttamente confrontabili
con JPEG. Un JPEG con "qualità del 70%" sarà molto diverso da un'immagine WebP
con "qualità del 70%" perché WebP ottiene file di dimensioni inferiori scartando
più dati.

### Chi usa WebP in produzione? {: #whos-using-webp-in-production}

Molte grandi aziende utilizzano WebP in produzione per ridurre i costi e ridurre
i tempi di caricamento delle pagine web.

Google ha registrato un risparmio del 30-35% utilizzando WebP rispetto ad altri
schemi di compressione con perdita di dati, con 43 miliardi di richieste di
immagini al giorno, il 26% delle quali con compressione lossless. Sono molte
richieste e risparmi significativi. Il risparmio sarebbe senza dubbio maggiore
se il [supporto del browser](http://caniuse.com/#search=webp) fosse migliore e
più diffuso. Google lo utilizza anche in siti di produzione come Google Play e
YouTube.

Netflix, Amazon, Quora, Yahoo, Walmart, Ebay, The Guardian, Fortune e USA Today,
tutti comprimono e servono immagini con WebP per i browser che lo supportano.
VoxMedia ha [ridotto
di](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)
1-3 [s i tempi di
caricamento](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)
di The Verge passando a WebP per i propri utenti di Chrome. [500px
ha](https://iso.500px.com/500px-color-profiles-file-formats-and-you/) visto una
riduzione media del 25% delle dimensioni del file di immagine con una qualità
dell'immagine simile o migliore quando si passa a servirlo ai propri utenti di
Chrome.

Ci sono molte più aziende di quelle indicate in questo elenco.

<img src="images/webp-conversion.jpg" alt="Statistiche WebP su Google: oltre 43
miliardi di immagini richiedono un giorno"> Utilizzo di WebP in Google: 43
miliardi di richieste di immagini WebP al giorno vengono pubblicate su YouTube,
Google Play, Chrome Data Saver e G +.

### Come funziona la codifica WebP? {: #how-does-webp-encoding-work}

La codifica lossy di WebP è progettata per competere con JPEG per le immagini
fisse. Ci sono tre fasi chiave per la codifica lossy di WebP:

**Macro-blocco** - suddivisione di un'immagine in blocchi 16x16 (macro) di pixel
luma e due blocchi 8x8 di pixel di crominanza. Ciò potrebbe sembrare familiare
all'idea che i JPEG realizzino la conversione dello spazio colore, il
downsampling del canale di crominanza e la suddivisione delle immagini.

<img src="images/Modern-Image18.png" alt="Macro-blocking example of a Google
Doodle where we break a range of pixels down into luma and chroma
blocks.">

**Previsione** : ogni sottoblocco 4x4 di un macroblocco ha un modello di
previsione applicato in modo efficace al filtro. Questo definisce due insiemi di
pixel attorno a un blocco - A (la riga direttamente sopra di esso) e L (la
colonna a sinistra di esso). Usando questi due l'encoder riempie un blocco di
prova con 4x4 pixel e determina quale crea i valori più vicini al blocco
originale. Colt McAnlis ne parla in modo più approfondito su [come funziona la
modalità lossy di
WebP](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670) .

<img src="images/Modern-Image19.png" alt="Google Doodle example of a segment
displaying the row, target block and column L when considering a
prediction model.">

Una discreta trasformazione del coseno (DCT) viene applicata con pochi passaggi
simili alla codifica JPEG. Una differenza fondamentale è l'uso di un
[compressore
aritmetico](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)
rispetto all'Huffman JPEG.

Se vuoi approfondire l'argomento, l'articolo di Google Developer [WebP
Compression Techniques](/speed/webp/docs/compression) approfondisce questo
argomento.

### Supporto browser WebP {: #webp-browser-support}

Non tutti i browser supportano WebP, tuttavia, [secondo
CanIUse.com](http://caniuse.com/webp) , il supporto per utenti globali è pari a
circa il 74%. Chrome e Opera lo supportano in modo nativo. Safari, Edge e
Firefox l'hanno sperimentato ma non lo hanno ancora rilasciato nelle versioni
ufficiali. Questo spesso lascia il compito di portare l'immagine WebP all'utente
fino allo sviluppatore web. Maggiori informazioni su questo più avanti.

Ecco le informazioni sul supporto dei principali browser:

- Chrome: Chrome pieno supporto dalla versione 23.
- Chrome per Android: da Chrome 50
- Android: da Android 4.2
- Opera: dal 12.1
- Opera Mini: tutte le versioni
- Firefox: alcune beta supportate
- Edge: alcune beta supportate
- Internet Explorer: nessun supporto
- Safari: alcuni beta supportati

WebP non è privo di svantaggi. Manca di opzioni di spazio colore a piena
risoluzione e non supporta la decodifica progressiva. Detto questo, gli
strumenti per WebP sono accettabili ed il supporto per i browser, finora
limitato a Chrome e Opera al momento della stesura, potrebbe coprire un numero
sufficiente di utenti da servire con questa soluzione alternativa.

### Come posso convertire le mie immagini in WebP? {: #how-do-i-convert-to-webp}

Diversi pacchetti di elaborazione ed elaborazione di immagini commerciali e open
source supportano WebP. Un'applicazione particolarmente utile è XnConvert: un
convertitore di elaborazione di immagini batch gratuito multipiattaforma.

Note: è importante evitare la conversione di JPEG di qualità bassa o media in
WebP. Questo è un errore comune e può generare immagini WebP con artefatti di
compressione JPEG. Questo può portare WebP ad essere meno efficiente in quanto
deve salvare l'immagine *e* le distorsioni aggiunte da JPEG, portando a perdere
due volte la qualità. Alimenta l'app di conversione con il miglior file sorgente
disponibile, preferibilmente l'originale.

**[XnConvert](http://www.xnview.com/en/xnconvert/)**

XnConvert consente l'elaborazione di immagini in batch, compatibile con oltre
500 formati di immagine. Può combinare oltre 80 azioni di separazione,
trasformazione o modificare delle tue immagini in diversi modi.

<img src="images/Modern-Image20.png" alt="App XNConvert su Mac in cui un numero
di immagini è stato convertito in WebP"> XnConvert supporta l'ottimizzazione
batch delle immagini, consentendo la conversione diretta da file sorgente a WebP
ed in altri formati. Oltre alla compressione, XnConvert può anche aiutare con la
rimozione dei metadati, il ritaglio, la personalizzazione della profondità del
colore e altre trasformazioni.

Alcune delle opzioni elencate sul sito Web di xnview includono:

- Metadati: modifica
- Trasforma: ruota, taglia, ridimensiona
- Regolazioni: luminosità, contrasto, saturazione
- Filtri: sfocatura, rilievo, contrasta
- Effetti: mascheratura, filigrana, vignettatura

I risultati delle tue operazioni possono essere esportati in circa 70 diversi
formati di file compreso WebP. XnConvert è gratuito per Linux, Mac e Windows.
XnConvert è altamente raccomandato specialmente per le piccole imprese.

**Moduli node**

[Imagemin](https://github.com/imagemin/imagemin) è un popolare modulo di
minification delle immagini che ha anche un componente aggiuntivo per la
conversione di immagini in WebP (
[imagemin-webp](https://github.com/imagemin/imagemin-webp) ). Questo supporta
sia modalità lossy che lossless.

Per installare imagemin e imagemin-webp eseguire:

```
> npm install --save imagemin imagemin-webp
```

Possiamo quindi invocare require() per entrambi i moduli ed eseguirli su
qualsiasi immagine (ad esempio JPEG) in una directory di progetto. Di seguito
utilizziamo la codifica lossy con una qualità di codificatore WebP di 60:

```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```

Come per i file JPEG è possibile notare artefatti di compressione nel nostro
output. Valuta quale impostazione di qualità ha senso per le tue immagini.
Imagemin-webp può anche essere usato per codificare immagini WebP di qualità
senza perdita (supportando colori a 24 bit e piena trasparenza) passando
`lossless: true` alle opzioni:

```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```

Sono inoltre disponibili un [plug-in WebP per
Gulp](https://github.com/sindresorhus/gulp-webp) di Sindre Sorhus basato su
imagemin-webp e un [caricatore WebP per
WebPack](https://www.npmjs.com/package/webp-loader) . Il plugin Gulp accetta
qualsiasi opzione che il componente aggiuntivo imagemin:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

Oppure lossless:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**Batch di ottimizzazione delle immagini con Bash**

XNConvert supporta la compressione batch delle immagini, ma se preferisci
evitare l'uso di un'app o di un sistema di build, bash ed i binari di
ottimizzazione immagine mantengono le cose abbastanza semplici.

È possibile convertire in massa le immagini in WebP utilizzando
[cwebp](/speed/webp/docs/cwebp) :

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```

In alternativa, puoi ottimizzare le sorgenti di immagini con MozJPEG usando
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive) :

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

e ottimizzare gli SVG usando [svgo](https://github.com/svg/svgo) (che
[tratteremo in](https://github.com/svg/svgo) seguito):

```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner ha un post più completo [sull'ottimizzazione delle immagini usando
Bash](https://jeremywagner.me/blog/bulk-image-optimization-in-bash) e un altro
su come fare questo lavoro in
[parallelo](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)
.

**Altre app di elaborazione e modifica delle immagini WebP includono:**

- Leptonica: un intero sito Web di app di elaborazione e analisi delle immagini
open source.

- Sketch supporta l'output direttamente su WebP

    - GIMP: alternativa gratuita per Photoshop open source. Editor di immagini.
- ImageMagick: crea, componi, converti o modifica immagini bitmap. Gratuito.
Command-Line.
    - Pixelmator - Editor di immagini commerciali per Mac.
- Photoshop WebP Plugin - gratuito. Importazione ed esportazione di
immagini. Da Google.

**Android:** puoi convertire le immagini BMP, JPG, PNG o GIF statiche in formato
WebP utilizzando Android Studio. Per ulteriori informazioni, vedere [Creare
immagini WebP con Android
Studio](https://developer.android.com/studio/write/convert-webp.html) .

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">Come posso visualizzare le immagini WebP sul mio sistema operativo?</a>

Mentre puoi trascinare e rilasciare le immagini WebP sui browser basati su Blink
(Chrome, Opera, Brave) per visualizzarle in anteprima, puoi anche visualizzarle
in anteprima direttamente dal tuo sistema operativo utilizzando un componente
aggiuntivo per Mac o Windows.

Qualche anno fa [Facebook ha sperimentato
WebP](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)
e ha scoperto che gli utenti che cercavano di fare clic con il pulsante destro
del mouse sulle foto per salvarle su disco hanno notato che non sarebbero state
visualizzate all'esterno del browser a causa del fatto che erano in WebP.
C'erano quindi tre problemi chiave:

<ul> <li>"Salva con nome" non è in grado di registrare i file WebP localmente.
Questo problema è stato risolto da Chrome registrandosi come gestore
".webp".</li> <li>"Salva con nome", allegando l'immagine a un'email per
condividerla con qualcuno senza Chrome. Facebook ha risolto questo problema
introducendo un pulsante "download" prominente nella loro interfaccia utente che
restituisce un JPEG quando gli utenti richiedono il download.</li> <li>Quando
fai clic con il tasto destro> copia URL -> condividi URL sul web. Questo è stato
risolto da [content-type
negotation](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/).</li>
</ul>

Questi problemi potrebbero essere meno importanti per i tuoi utenti, ma è una
nota interessante sulla condivisione sociale. Fortunatamente oggi esistono
programmi di utilità per visualizzare e lavorare con WebP su diversi sistemi
operativi.

Su Mac, prova il [plugin Quick Look per
WebP](https://github.com/Nyx0uf/qlImageSize) (qlImageSize). Funziona piuttosto
bene:

<img src="images/Modern-Image22.jpg" alt="Desktop on a mac showing a WebP file
previewed using the Quick Look plugin for WebP files">

Su Windows, è anche possibile scaricare il [pacchetto di codec
WebP](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)
che consente di visualizzare in anteprima le immagini WebP in Esplora file e
Visualizzatore foto di Windows.

### Come posso servire WebP? {: #how-do-i-serve-webp}

I browser senza supporto WebP possono non visualizzare affatto un'immagine e non
è l'ideale. Per evitare questo ci sono alcune strategie che possiamo usare per
servire in modo condizionato WebP basandoci sul supporto dei browser.

<img src="images/play-format-webp.jpg" alt="Il pannello Rete di Chrome DevTools
mostra la cascata per il Play Store in Chrome, dove viene offerto WebP."> Il
pannello Rete di Chrome DevTools evidenzia i file WebP che vengono offerti in
modo condizionale ai browser basati su Blink nella colonna "Tipo".

<img src="images/play-format-type.jpg" alt="Mentre Play Store offre WebP a
Blink, ricade in JPEG per browser come Firefox."> Mentre Play Store offre WebP a
Blink, ricade in JPEG per browser come Firefox.

Ecco alcune delle opzioni per ottenere immagini WebP dal tuo server al tuo
utente:

**Utilizzo di .htaccess per servire copie WebP**

Ecco come utilizzare un file .htaccess per servire i file WebP ai browser
supportati quando sul server esiste una versione .webp corrispondente di un file
JPEG / PNG.

Vincent Orback ha raccomandato questo approccio:

I browser possono [segnalare esplicitamente il supporto
WebP](http://vincentorback.se/blog/using-webp-images-with-htaccess/) tramite
[un'intestazione
Accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept). Se
controlli il tuo back-end, puoi restituire una versione WebP di un'immagine se
esiste sul disco piuttosto che in formati come JPEG o PNG. Tuttavia, ciò non è
sempre possibile (ad esempio per host statici come GitHub pages o S3), quindi
assicurati di controllare prima di considerare questa opzione.

Ecco un esempio di file .htaccess per il server Web Apache:

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

Se ci sono problemi con le immagini .webp che appaiono nella pagina, assicurati
che il tipo MIME image/webp sia abilitato sul tuo server.

Apache: aggiungi il seguente codice al tuo file .htaccess:

```
AddType image/webp .webp
```

Nginx: aggiungi il seguente codice al tuo file mime.types:

```
image/webp webp;
```

Note: Vincent Orback ha un esempio di [config
htaccess](https://github.com/vincentorback/WebP-images-with-htaccess) per
servire WebP come riferimento e Ilya Grigorik mantiene una raccolta di
[script](https://github.com/igrigorik/webp-detect) di [configurazione per
servire WebP](https://github.com/igrigorik/webp-detect) che può essere utile.

**Utilizzo di `<picture>`**

Il browser stesso è in grado di scegliere quale formato di immagine visualizzare
attraverso l'uso del tag `<picture>` . Il tag `<picture>` utilizza più elementi
`<source>` , con un tag `<img>` , che è l'effettivo elemento DOM che contiene
l'immagine. Il browser scorre le fonti e recupera la prima corrispondenza. Se il
tag `<picture>` non è supportato nel browser dell'utente, viene eseguito il
rendering di `<div>` e viene utilizzato il tag `<img>` .

Note: fai attenzione alla posizione di `<source>` vista l'importanza
dell'ordine. Non posizionare le fonti di image/webp dopo i formati legacy ma
inseriscile prima. I browser che lo capiscono li useranno e quelli che che non
li capiscono non si sposteranno su framework più ampiamente supportati. È anche
possibile posizionare le immagini in ordine di dimensioni del file se sono tutte
della stessa dimensione fisica (quando non si utilizza l'attributo `media` ).
Generalmente questo è lo stesso ordine di mettere l'eredità per ultima.

Ecco alcuni esempi di codice HTML:

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**Conversione automatica CDN in WebP**

Alcuni CDN supportano la conversione automatica in WebP e possono utilizzare i
suggerimenti dei client per offrire immagini WebP [quando
possibile](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints)
. Verifica con il tuo CDN per vedere se il supporto WebP è incluso nel loro
servizio. Potresti avere una soluzione semplice che ti aspetta.

**Supporto WebP di WordPress**

Jetpack - Jetpack, un popolare plugin per WordPress, include un servizio di
immagine CDN chiamato [Photon](https://jetpack.com/support/photon/) . Con Photon
ottieni il supporto per immagini WebP senza soluzione di continuità. Il CDN di
Photon è incluso nel livello gratuito di Jetpack, quindi questo è un buon valore
e un'implementazione hands-off. Lo svantaggio è che Photon ridimensiona
l'immagine, inserisce una stringa di query nell'URL e c'è bisogno di una ricerca
DNS aggiuntiva per ogni immagine.

**Enabler e ottimizzatore cache** : se si utilizza WordPress è disponibile
almeno un'opzione di origine open source. Il plugin open source [Cache
Enabler](https://wordpress.org/plugins/cache-enabler/) ha un'opzione in una
checkbox del menu di memorizzazione nella cache delle immagini WebP, se
disponibili, e il browser dell'utente corrente le supporta. Questo rende facile
la pubblicazione di immagini WebP. C'è un inconveniente: Cache Enabler richiede
l'uso di un programma gemello chiamato Optimizer, che ha una tariffa annuale.
Questo sembra fuori luogo per una soluzione open source autentica.

**Short Pixel** - Un'altra opzione per l'uso con Cache Enabler, sempre ad un
costo, è Short Pixel. Short Pixel funziona circa come Optimizer, descritto
sopra. Puoi ottimizzare gratuitamente fino a 100 immagini al mese.

**Comprimere le GIF animate e perché è migliore `<video>`**

Le GIF animate continuano a godere di un uso diffuso, nonostante siano un
formato molto limitato. Sebbene tutto, dai social network ai siti di media
popolari, incorpori pesantemente le GIF animate, il formato *non* è *mai* stato
progettato per l'archiviazione video o animazioni. In effetti, la [specifica
GIF89a](https://www.w3.org/Graphics/GIF/spec-gif89a.txt) indica che "la GIF non
è intesa come una piattaforma per l'animazione". Il [numero di colori, il numero
di fotogrammi e le
dimensioni](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)
influiscono sulla dimensione GIF animata. Passare al video offre il massimo
risparmio.

<img src="images/animated-gif.jpg" alt="GIF animato vs video: un confronto di
dimensioni di file di qualità equivalente equivalente per diversi formati."> GIF
animato vs video: un confronto di dimensioni di file di qualità equivalente
equivalente per diversi formati.

**Fornire lo stesso file in un video MP4 può spesso ridurre dell'80% o più la
dimensione del file.** Le GIF spesso non solo sprecano una larghezza di banda
significativa, ma richiedono più tempo per essere caricate, includono meno
colori e generalmente offrono esperienze di utenti secondari. Potresti aver
notato che le GIF animate caricate su Twitter hanno prestazioni migliori su
Twitter rispetto ad altri siti web. [Le GIF animate su Twitter non sono in
realtà GIF](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW). Per
migliorare l'esperienza utente e ridurre il consumo di larghezza di banda, le
GIF animate caricate su Twitter vengono convertite in video. Allo stesso modo,
[Imgur converte le GIF caricate in
video](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/),
convertendole silenziosamente in un MP4.

Perché le GIF sono molte volte più grandi? Le GIF animate memorizzano ogni
fotogramma come un'immagine GIF senza perdita di dati, sì, senza perdita di
dati. Il degrado di qualità che spesso sperimentiamo è dovuto al fatto che le
GIF sono limitate a una tavolozza di 256 colori. Il formato è spesso grande in
quanto non considera i frame vicini per la compressione, a differenza dei codec
video come H.264. Un video MP4 memorizza ciascun fotogramma chiave come JPEG
lossy, eliminando alcuni dei dati originali per ottenere una compressione
migliore.

**Se possibile passa ai video**

- Usa [ffmpeg](https://www.ffmpeg.org/) per convertire le tue GIF animate (o
sorgenti) in MP4 H.264. Uso questo one-liner di
[Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video):`ffmpeg
-i animated.gif -movflags faststart -pix_fmt yuv420p -vf "scale = trunc (iw / 2)
* 2: trunc (ih / 2) * 2" video.mp4`
- API ImageOptim supporta anche la [conversione di gif animate in video WebM /
H.264](https://imageoptim.com/api/ungif) , [rimuovendo il dithering dalle
GIF,](https://github.com/pornel/undither#examples) che può aiutare i codec video
a comprimere ancora di più.

**Se è necessario utilizzare GIF animate**

- Strumenti come Gifsicle possono eliminare i metadati, le voci di tavolozza non
utilizzate e minimizzare le modifiche tra i frame
- Considera un codificatore GIF con perdita di dati. Il fork
[Giflossy](https://github.com/pornel/giflossy) di Gifsicle supporta questo con
il flag `—lossy` e può raggiungere ~60-65% di risparmio. C'è anche un simpatico
strumento basato su di esso chiamato [Gifify](https://github.com/vvo/gifify) .
Per le GIF non animate, convertili in PNG o WebP.

Per ulteriori informazioni, controlla il [Book of
GIF](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf) di Rigor.

## Ottimizzazione SVG {: #svg-optimization}

Mantenere le SVG snelle significa eliminare tutto ciò che non è necessario. I
file SVG creati con gli editor di solito contengono una grande quantità di
informazioni ridondanti (metadati, commenti, livelli nascosti e così via).
Questo contenuto può spesso essere rimosso in modo sicuro o convertito in una
forma più minimale senza influire sullo SVG finale che viene sottoposto a
rendering.

<img src="images/Modern-Image26.jpg" alt="SVGO">

[SVGOMG](https://jakearchibald.github.io/svgomg/) , di Jake Archibald, è
un'interfaccia GUI che ti permette di ottimizzare i tuoi SVG in base alle tue
preferenze selezionando le ottimizzazioni, con un'anteprima in tempo reale del
markup generato

**Alcune regole generali per l'ottimizzazione SVG (SVGO):**

- Minimizza e comprimi con gzip i tuoi file SVG. Gli SVG sono in realtà solo
risorse di testo espresse in XML, come CSS, HTML e JavaScript, e dovrebbero
essere minimizzati e compressi con gzip per migliorarne le prestazioni.
- Al posto di percorsi usa forme SVG predefinite come `<rect>` , `<circle>` ,
`<ellipse>` , `<line>` e `<polygon>` . Preferendo forme predefinite diminuisce
la quantità di markup necessaria per produrre un'immagine finale, il che
significa meno codice da analizzare e rasterizzare dal browser. Ridurre la
complessità SVG significa che un browser può visualizzarlo più rapidamente.
- Se devi usare i percorsi, prova a ridurre sia curve che percorsi. Semplificali
e combinali dove puoi. Lo [strumento di
semplificazione](http://jlwagner.net/talks/these-images/#/2/10) di Illustrator è
efficace nel rimuovere punti superflui anche nelle opere d'arte complesse
uniformando le irregolarità.
- Evitare l'uso di gruppi. Se non puoi, prova a semplificarli.
- Elimina i livelli invisibili.
- Evita gli effetti di Photoshop o Illustrator. Possono essere convertiti in
immagini raster di grandi dimensioni.
- Effettua un doppio controllo per tutte le immagini raster incorporate che non
sono compatibili con SVG
- Usa uno strumento per ottimizzare i tuoi SVG.
  [SVGOMG](https://jakearchibald.github.io/svgomg/) è una GUI web-based molto
  comoda per [SVGO](https://github.com/svg/svgo) di Jake Archibald che ho
  trovato inestimabile. Se si utilizza Sketch, è possibile utilizzare il
  plug-in SVGO Compressor
  ([plug-in Sketch per l'esecuzione di SVGO](https://www.sketchapp.com/extensions/plugins/svgo-compressor/))
  durante l'esportazione per ridurre le dimensioni del file.

<img src="images/svgo-precision.jpg" alt="la riduzione della precisione di svgo
può a volte avere un impatto positivo sulle dimensioni"> Un esempio di
esecuzione di un'origine SVG tramite SVGO in modalità ad alta precisione (che
porta a un aumento delle dimensioni del 29%) rispetto alla modalità a bassa
precisione (aumento delle dimensioni del 38%).

[SVGO](https://github.com/svg/svgo) è uno strumento basato su nodi per
l'ottimizzazione di SVG. SVGO può ridurre le dimensioni del file abbassando la
*precisione* dei numeri nel tuo <path> definizioni. Ogni cifra dopo un punto
aggiunge un byte ed è per questo che la modifica della precisione (numero di
cifre) può influenzare pesantemente le dimensioni del file. Fai molta attenzione
al cambio di precisione, poiché può influenzare visivamente l'aspetto delle tue
forme. </path>

<img src="images/Modern-Image28.jpg" alt="dove svgo può andare storto,
semplificando i percorsi e le opere d'arte"> È importante notare che mentre SVGO
funziona bene nell'esempio precedente senza semplificare eccessivamente i
percorsi e le forme, ci sono molti casi in cui questo potrebbe non essere il
caso. Osserva come la striscia di luce sul razzo sopra è distorta con una
precisione inferiore.

**Utilizzando SVGO alla riga di comando:**

SVGO può essere installato con una [CLI npm
globale,](https://www.npmjs.com/package/svgo) da preferire ad una GUI:

```
npm i -g svgo
```

Può essere eseguito su un file SVG locale come segue:

```
svgo input.svg -o output.svg
```

Supporta tutte le opzioni che potresti aspettarti inclusa la regolazione della
precisione in virgola mobile:

```
svgo input.svg --precision=1 -o output.svg
```

Vedere il [readme](https://github.com/svg/svgo) SVGO per l'elenco completo delle
opzioni supportate.

**Non dimenticare di comprimere SVG!**

<img src="images/before-after-svgo.jpg" alt="prima e dopo aver eseguito
un'immagine attraverso svgo"> È importante notare che mentre SVGO funziona bene
nell'esempio precedente senza semplificare eccessivamente i percorsi e le forme,
ci sono molti casi in cui questo potrebbe non essere adatto. Osserva come la
striscia di luce sul razzo sopra è distorta con una precisione inferiore.

Inoltre, non dimenticare di [comprimere con gzip le tue risorse
SVG](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
o di servirli utilizzando Brotli. Poiché sono basati sul testo, si comprimono
molto (circa il 50% rispetto agli originali).

Quando Google ha spedito un nuovo logo, abbiamo annunciato che la versione [più
piccola](https://twitter.com/addyosmani/status/638753485555671040) aveva solo
305 byte di dimensione.

<img src="images/Modern-Image30.jpg" alt="the smallest version of the new google
logo was only 305 bytes in size">

Ci sono [molti trucchi SVG
avanzati](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/) che
puoi usare per ridurlo ulteriormente (fino a 146 byte)! Basti dire che,
attraverso gli strumenti o la pulizia manuale, c'è probabilmente un *po' di* più
che puoi eliminare dai tuoi SVG.

**SVG Sprite**

SVG può essere [potente](https://css-tricks.com/icon-fonts-vs-svg/) per le
icone, offrendo un modo per rappresentare visualizzazioni come sprite senza i
[eccentrici](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)
soluzioni alternative necessarie per i font di icone. Ha un controllo dello
stile CSS più granulare rispetto ai font di icone (proprietà del tratto SVG), un
miglior controllo del posizionamento (non c'è bisogno di modificare gli
pseudo-elementi e la `display` CSS) e gli SVG sono molto più
[accessibili](http://www.sitepoint.com/tips-accessible-svg/).

Strumenti come [svg-sprite](https://github.com/jkphl/svg-sprite) e
[IcoMoon](https://icomoon.io/) possono automatizzare la combinazione di SVG in
sprite che possono essere utilizzate tramite un [CSS
Sprite](https://css-tricks.com/css-sprites/) , [Symbol
Sprite](https://css-tricks.com/svg-use-with-external-reference-take-2) o
[Stacked Sprite](http://simurai.com/blog/2012/04/02/svg-stacks) . Una Kravetz ha
un pratico [write-up](https://una.im/svg-icons/#%F0%9F%92%81) su come utilizzare
gulp-svg-sprite per un flusso di lavoro sprite SVG la pena di verificare. Sara
Soudein tratta anche [la transizione dai caratteri icon a
SVG](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/) sul suo blog.

**Ulteriori letture**

I [consigli
di](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
Sara Soueidan [per l'ottimizzazione della consegna SVG per il
web](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
e il [libro Practical SVG di](https://abookapart.com/products/practical-svg)
Chris Coyier sono eccellenti. Ho anche trovato illuminanti i post SVG
ottimizzati di Andreas Larsen ([parte
1](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035),
[parte
2](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46)).
[Anche la preparazione e l'esportazione delle icone SVG in
Sketch](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)
 è un'ottima lettura.

## Evita di ricomprimere le immagini con codec lossy {: #avoid-recompressing-images-lossy-codecs}

Si consiglia di comprimere sempre partendo dall'immagine originale. La
ricompressione delle immagini ha conseguenze. Diciamo che prendi un JPEG che è
già stato compresso con una qualità di 60. Se ricomprimi questa immagine con una
codifica con perdita, sembrerà peggio. Ogni ulteriore ciclo di compressione
introdurrà una perdita generazionale: le informazioni andranno perse e gli
artefatti di compressione inizieranno ad accumularsi. Anche se stai
ricomprimendo con un'impostazione di alta qualità.

Per evitare questa trappola, **imposta la qualità più bassa che sei disposto ad
accettare fin dalla prima esecuzione** ed otterrai il massimo risparmio di file
dall'inizio. Quindi si evita questa trappola perché qualsiasi riduzione della
dimensione dei file dalla sola riduzione della qualità sembrerà negativa.

Ricodificare un file con perdita di dati ti darà quasi sempre un file più
piccolo, ma questo non significa che tu stia ottenendo tanta qualità quanto
potresti pensare.

<img src="images/generational-loss.jpg" alt="perdita generazionale quando si
ricodifica un'immagine più volte"> Sopra, da questo [eccellente
video](https://www.youtube.com/watch?v=w7vXJbLhTyI) e [articolo di
accompagnamento](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier) di
Jon Sneyers, possiamo vedere l'impatto della perdita generazionale della
ricompressione usando diversi formati. Questo è un problema che potresti aver
incontrato se avessi salvato (già compresso) le immagini dai social network e le
avresti ricaricate (causando ricompressione). La perdita di qualità si
accumulerà.

MozJPEG (forse accidentalmente) ha una migliore resistenza alla degradazione
della ricompressione grazie alla quantizzazione trellis. Invece di comprimere
tutti i valori DCT esattamente come sono, può controllare i valori di chiusura
entro un intervallo +1/-1 per vedere se valori simili si comprimono con meno
bit. Lossy FLIF ha un hack simile al PNG lossy in quanto prima della (ri)
compressione, può guardare i dati e decidere cosa buttare via. I PNG ricompressi
hanno "buchi" che possono rilevare per evitare di modificare ulteriormente i
dati.

**Quando modifichi i tuoi file originali, memorizzali in un formato senza
perdita come PNG o TIFF, in modo da preservare la massima qualità possibile.** I
tuoi strumenti di build o il servizio di compressione delle immagini genereranno
in output la versione compressa che servirai agli utenti con una perdita minima
di qualità.

## Riduci la decodifica dell'immagine non necessaria e ridimensiona i costi {: #riduce-inutili-costi-decodifica immagine}

Abbiamo tutti inviato immagini di grandi dimensioni e con una risoluzione più
alta di quella necessaria ai nostri utenti in passato. Questo ha un costo. La
decodifica e il ridimensionamento delle immagini sono operazioni costose per un
browser su hardware mobile medio. Se si inviano immagini di grandi dimensioni e
si ridimensionano utilizzando gli attributi CSS o width / height, è probabile
che ciò accada e che possa influire sulle prestazioni.

<img src="images/image-pipeline.jpg" alt="There are many steps involved in a
browser grabbing an image specified in a tag and displaying it on a
screen. These include request, decode, resize, copy to GPU, display.">

Quando un browser recupera un'immagine, deve decodificare l'immagine dal formato
sorgente originale (ad esempio JPEG) in una bitmap in memoria. Spesso l'immagine
deve essere ridimensionata (ad es. La larghezza è stata impostata su una
percentuale del suo contenitore). La decodifica e il ridimensionamento delle
immagini sono costosi e possono ritardare il tempo necessario per la
visualizzazione di un'immagine.

L'invio di immagini che un browser può eseguire senza dover ridimensionare è
l'ideale. Quindi, servi le immagini più piccole per le dimensioni e le
risoluzioni dello schermo di destinazione, sfruttando [`srcset` e
`sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)

- Esamineremo `srcset` a breve.

Anche l'omissione degli attributi di `width` o `height` su un'immagine può
influire negativamente sulle prestazioni. Senza di essi, un browser assegna
un'area di segnaposto più piccola per l'immagine fino a quando non sono arrivati
​​sufficienti byte per poter conoscere le dimensioni corrette. A quel punto, il
layout del documento deve essere aggiornato in quello che può essere un
passaggio costoso chiamato reflow.

<img src="images/devtools-decode.jpg" alt="i costi di decodificazione
dell'immagine sono mostrati negli sviluppatori di chrome"> I browser devono
eseguire una serie di passaggi di paint delle immagini sullo schermo. Oltre a
recuperarle, le immagini devono essere decodificate e spesso ridimensionate.
Questi eventi possono essere verificati nel Chrome DevTools
[Timeline](/web/tools/chrome-devtools/evaluate-performance/performance-reference)
.

Le immagini più grandi hanno anche un aumento dei costi delle dimensioni della
memoria. Le immagini decodificate sono ~4 byte per pixel. Se non stai attento,
puoi letteralmente bloccare il browser; su dispositivi di fascia bassa non ci
vuole molto per avviare ad un swap di memoria. Quindi, tieni d'occhio i costi di
decodifica, ridimensionamento e memoria dell'immagine.

<img src="images/image-decoding-mobile.jpg" alt="La decodifica delle immagini
può essere incredibilmente costosa in media e su hardware mobile di fascia
bassa"> La decodifica delle immagini può essere incredibilmente costosa nei
telefoni cellulari di fascia media e bassa. In alcuni casi può essere 5 volte
più lento da decodificare (se non di più).

Durante la creazione della loro nuova [esperienza sul Web
mobile](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3),
Twitter ha migliorato le prestazioni di decodifica delle immagini, garantendo
l'offerta di immagini di dimensioni appropriate ai propri utenti. Questo ha
portato il tempo di decodifica di molte immagini nella timeline di Twitter da
~400ms fino a ~19!

<img src="images/image-decoding.jpg" alt="Pannello Chrome Timeline / Performance
di DevTools che evidenzia i tempi di decodifica dell'immagine prima e dopo che
Twitter Lite ha ottimizzato la propria pipeline di immagini. Prima era più
alto."> Chrome DevTools Timeline / Pannello delle prestazioni che evidenzia i
tempi di decodifica delle immagini (in verde) prima e dopo che Twitter Lite ha
ottimizzato la propria pipeline di immagini.

### Fornire immagini HiDPI usando `srcset` {: #delivering-hidpi-with-srcset}

Gli utenti possono accedere al tuo sito attraverso una vasta gamma di
dispositivi mobili e desktop con schermi ad alta risoluzione. Il [Device Pixel
Ratio](https://stackoverflow.com/a/21413366) (DPR) (chiamato anche "rapporto
pixel CSS") determina come la risoluzione dello schermo di un dispositivo viene
interpretata dai CSS. Il DPR è stato creato dai produttori di telefoni per
consentire di aumentare la risoluzione e la nitidezza degli schermi mobili senza
rendere gli elementi troppo piccoli.

Per abbinare la qualità dell'immagine che gli utenti potrebbero aspettarsi,
fornisci le immagini di risoluzione più appropriate ai loro dispositivi.
Immagini nitide e ad alta DPR (ad es. 2x, 3x) possono essere offerte a
dispositivi che le supportano. Le immagini DPR basse e standard possono invece
essere fornite agli utenti senza schermi ad alta risoluzione, in quanto tali
immagini 2x+ pesano significativamente molti più byte.

<img src="images/device-pixel-ratio.jpg" alt="Un diagramma del rapporto pixel
del dispositivo a 1x, 2x e 3x. La qualità dell'immagine appare più nitida
all'aumentare del DPR e viene visualizzato un elemento visivo confrontando i
pixel del dispositivo con i pixel CSS."> Rapporto pixel dei dispositivi: molti
siti monitorano il DPR per i dispositivi più diffusi, compresi
[material.io](https://material.io/devices/) e
[mydevice.io](https://mydevice.io/devices/) .

[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
consente a un browser di selezionare la migliore immagine disponibile per
dispositivo, ad esempio selezionando un'immagine 2x per un display mobile 2x. I
browser senza supporto `srcset` possono eseguire il fallback con lo `src`
predefinito specificato nel tag `<img>` .

```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```

I CDN di immagini come
[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
e [Imgix](https://docs.imgix.com/apis/url/dpr) supportano entrambi il controllo
della densità dell'immagine per [offrire](https://docs.imgix.com/apis/url/dpr)
la migliore densità agli utenti da un'unica fonte canonica.

Note: è possibile ottenere ulteriori informazioni su Device Pixel Ratio e
immagini responsive in questo corso gratuito di
[Udacity](https://www.udacity.com/course/responsive-images--ud882) e nella guida
delle [immagini](/web/fundamentals/design-and-ui/responsive/images) su Web
Fundamentals.

Un promemoria amichevole che i [suggerimenti del
cliente](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)
possono anche fornire un'alternativa alla specifica di ogni possibile densità e
formato dei pixel nel markup dell'immagine reattivo. Invece, aggiungere queste
informazioni alla richiesta HTTP in modo che i server web possano scegliere la
soluzione migliore per la densità dello schermo del dispositivo corrente.

### Direzione artistica {: #art-direction}

Sebbene sia importante spedire la giusta risoluzione agli utenti, alcuni siti
devono anche pensare in termini di **[direzione
artistica](http://usecases.responsiveimages.org/#art-direction)** . Se un utente
si trova su uno schermo più piccolo, è possibile ritagliare o ingrandire e
visualizzare il soggetto per sfruttare al meglio lo spazio disponibile. Sebbene
la direzione artistica non rientri nello scopo di questo articolo, servizi come
[Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)
forniscono API per provare ad automatizzarlo il più possibile.

<img src="images/responsive-art-direction.jpg" alt="direzione artistica reattiva
in azione, adattandosi per mostrare più o meno un'immagine in maniera ritagliata
a seconda del dispositivo"> Direzione artistica: Eric Portis mette insieme un
eccellente [esempio](https://ericportis.com/etc/cloudinary/) di come le immagini
reactive possano essere utilizzate per la direzione artistica. Questo esempio
adatta le caratteristiche visive dell'immagine dell'eroe principale a diversi
punti di interruzione per sfruttare al meglio lo spazio disponibile.

## Gestione del colore {: #color-management}

Ci sono almeno tre diverse prospettive di colore: biologica, fisica e stampata.
In biologia, il colore è un [fenomeno
percettivo](http://hubel.med.harvard.edu/book/ch8.pdf) . Gli oggetti riflettono
la luce in diverse combinazioni di lunghezze d'onda. I recettori della luce dei
nostri occhi traducono queste lunghezze d'onda nella sensazione che conosciamo
come colore. In fisica, è la luce che conta - le frequenze e la luminosità della
luce. La stampa riguarda più le ruote dei colori, gli inchiostri e i modelli
artistici.

Idealmente, ogni schermo e browser web del mondo mostrerebbero il colore
esattamente lo stesso. Sfortunatamente, a causa di un numero di incoerenze
intrinseche, non lo fanno. La gestione del colore ci consente di raggiungere un
compromesso sulla visualizzazione del colore attraverso modelli di colore, spazi
e profili.

#### Modelli di colori {: #color-models}

[I modelli di colori](https://en.wikipedia.org/wiki/Gamma_correction) sono un
sistema per generare una gamma completa di colori da un set più piccolo di
colori primari. Esistono diversi tipi di spazi colore che utilizzano parametri
diversi per controllare i colori. Alcuni spazi colore hanno meno parametri di
controllo rispetto ad altri - ad esempio, la scala di grigi ha solo un singolo
parametro per il controllo della luminosità tra i colori bianco e nero.

Due modelli di colori comuni sono additivi e sottrattivi. I modelli di colori
additivi (come RGB, usati per i display digitali) usano la luce per mostrare il
colore mentre i modelli di colori sottrattivi (come il CMYK, usato nella stampa)
funzionano allontanando la luce.

<img src="images/colors_ept6f2.jpg" alt="sRGB, Adobe RGB e ProPhoto RGB"> In
RGB, le luci rosse, verdi e blu vengono aggiunte in diverse combinazioni per
produrre un ampio spettro di colori. CYMK (ciano, magenta, giallo e nero)
funziona attraverso diversi colori di inchiostro che sottraggono la luminosità
dalla carta bianca.

[Comprensione dei modelli di colore e dei sistemi di colore
spot](https://www.designersinsights.com/designer-resources/understanding-color-models/)
descrizione gli altri modelli e modalità di colore come HSL, HSV e LAB.

#### Spazi colore {: #color-spaces}

[Gli spazi
colore](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)
sono una gamma specifica di colori che possono essere rappresentati per una
determinata immagine. Ad esempio, se un'immagine contiene fino a 16,7 milioni di
colori, i diversi spazi cromatici consentono l'uso di intervalli più ristretti o
più ampi di questi colori. Alcuni sviluppatori si riferiscono a modelli di
colore e spazi colore come la stessa cosa.

[sRGB è](https://en.wikipedia.org/wiki/SRGB) stato progettato per essere uno
spazio colore [standard](https://www.w3.org/Graphics/Color/sRGB.html) per il web
ed è basato su RGB. Si tratta di un piccolo spazio colore che in genere viene
considerato il minimo comune denominatore ed è l'opzione più sicura per il
cross-browser di gestione del colore. Altri spazi colore (come [Adobe
RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) o [ProPhoto
RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space) , utilizzati in
Photoshop e Lightroom) possono rappresentare colori più vivaci rispetto a sRGB,
ma poiché quest'ultimo è più diffuso nella maggior parte dei browser Web, giochi
e monitor, è ciò su cui generalmente si concentra.

<img src="images/color-wheel_hazsbk.jpg" alt="sRGB, Adobe RGB e ProPhoto RGB">
Sopra possiamo vedere una visualizzazione del gamut - la gamma di colori che uno
spazio cromatico può definire.

Gli spazi colore hanno tre canali (rosso, verde e blu). Ci sono 255 colori
possibili in ogni canale in modalità 8-bit, portandoci a un totale di 16,7
milioni di colori. Le immagini a 16 bit possono mostrare migliaia di miliardi di
colori.


<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB, Adobe RGB e ProPhoto RGB">
Confronto tra sRGB, Adobe RGB e ProPhoto RGB utilizzando un'immagine da
[Yardstick](https://yardstick.pictures/tags/img%3Adci-p3). È incredibilmente
difficile mostrare questo concetto in sRGB, quando non puoi mostrare colori che
non possono essere visti. Una foto normale in sRGB vs wide gamut dovrebbe avere
tutto identico, tranne la maggior parte dei colori "succosi" saturi.

Le differenze negli spazi colore (come sRGB, Adobe RGB e ProPhoto RGB) sono il
loro gamut (la gamma di colori che possono riprodurre con le sfumature), le
illuminanti e le curve di
[gamma](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)
. sRGB è ~20% più piccolo di Adobe RGB e ProPhoto RGB è ~[50% più
grande](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)
di Adobe RGB. Le fonti immagine sopra sono tratte dal [Clipping
Path](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm) .

[Wide-gamut](http://www.astramael.com/) è un termine che descrive gli spazi
colore con una gamma più ampia di sRGB. Questi tipi di display stanno diventando
più comuni. Detto questo molti display digitali sono ancora semplicemente in
grado di visualizzare profili di colore che sono significativamente migliori di
sRGB. Quando si salva per il Web in Photoshop, è consigliabile utilizzare
l'opzione "Converti in sRGB" a meno che non si scelga come target gli utenti con
schermi wide-gamut di fascia alta.

<aside class="key-point"><b>Note:</b> quando si lavora con la fotografia
originale, evitare di utilizzare sRGB come spazio cromatico primario. È più
piccolo degli spazi colore supportati dalla maggior parte delle fotocamere e può
causare clipping. Piuttosto, lavora su uno spazio cromatico più grande (come
ProPhoto RGB) e invia a sRGB quando esporti per il web.</aside>

**Ci sono casi in cui wide-gamut ha senso per i contenuti web?**

Sì. Se un'immagine contiene colori molto saturi/succosi vibranti e ci si
preoccupa che sia altrettanto succosa sugli schermi che la supportano. Tuttavia,
nelle foto reali accade raramente. Spesso è facile modificare il colore per
farlo apparire vibrante senza che in realtà superi la gamma sRGB

Questo perché la percezione del colore umano non è assoluta, ma relativa a ciò
che ci circonda e viene facilmente ingannata. Se la tua immagine contiene un
colore dell'evidenziatore fluorescente, avrai un tempo più facile con un'ampia
gamma di colori.

#### Correzione gamma e compressione {: #gamma-correction }

[La correzione Gamma](https://en.wikipedia.org/wiki/Gamma_correction) (o solo la
Gamma) controlla la luminosità complessiva di un'immagine. Cambiare la gamma può
anche alterare il rapporto tra rosso e verde e blu. Le immagini senza correzione
gamma possono apparire con i loro colori scoloriti o troppo scuri.

Nella grafica video e computer, la gamma viene utilizzata per la compressione,
simile alla compressione dei dati. Ciò consente di comprimere livelli utili di
luminosità in meno bit (8 bit anziché 12 o 16). La percezione umana della
luminosità non è linearmente proporzionale alla quantità di luce fisica.
Rappresentare i colori nella loro vera forma fisica sarebbe uno spreco quando si
codificano le immagini per gli occhi umani. La compressione gamma viene
utilizzata per codificare la luminosità su una scala più vicina alla percezione
umana.

Grazie alla compressione di gamma utile, la scala di luminosità si adatta a 8
bit di precisione (0-255 utilizzati dalla maggior parte dei colori RGB). Tutto
questo deriva dal fatto che se i colori usassero qualche unità di rapporto 1: 1
con la fisica, i valori RGB sarebbero da 1 a milioni dove i valori 0-1000
apparirebbero distinti, ma i valori tra 999000-1000000 sembrerebbero identici.
Immagina di essere in una stanza buia dove c'è solo 1 candela. Accendi una
seconda candela e noti un aumento significativo della luminosità nella luce
della stanza. Aggiungi una terza candela e sembrerà ancora più luminosa. Ora
immagina di essere in una stanza con 100 candele. Accendi la 101<sup>a</sup>
candela e la 102<sup>a</sup>. Non noterai un cambiamento di luminosità.

Anche se in entrambi i casi, fisicamente, è stata aggiunta esattamente la stessa
quantità di luce. Quindi, poiché gli occhi sono meno sensibili quando la luce è
intensa, la compressione della gamma "comprime" i valori luminosi, quindi in
termini fisici i livelli luminosi sono meno precisi ma la scala è adattata per
gli esseri umani così dal punto di vista umano tutti i valori sono ugualmente
precisi.

<aside class="key-point"><b>Nota: la</b> compressione/correzione gamma qui è
diversa dalle curve gamma immagine che potresti configurare in Photoshop. Quando
la compressione gamma funziona come dovrebbe, nessuno percepisce nulla.</aside>

#### Profili colore {: #color-profiles }

Un profilo colore è l'informazione che descrive lo spazio cromatico di un
dispositivo. È usato per convertire tra diversi spazi colore. I profili tentano
di garantire un'immagine più simile possibile su questi diversi tipi di schermi
e supporti.

Le immagini possono avere un profilo di colore incorporato come descritto
[dall'International Color Consortium](http://www.color.org/icc_specs2.xalter)
(ICC) per rappresentare esattamente come dovrebbero apparire i colori. Questo è
supportato da diversi formati tra cui JPEG, PNG, SVG e
[WebP](/speed/webp/docs/riff_container) e la maggior parte dei browser
principali supportano i profili ICC incorporati. Quando un'immagine viene
visualizzata in un'app e conosce le capacità del monitor, questi colori possono
essere regolati in base al profilo colore.

<aside class="key-point"><b>Nota:</b> alcuni monitor hanno un profilo colore
simile a sRGB e non possono mostrare profili molto migliori, quindi a seconda
dei display degli utenti target potrebbe esserci un valore limitato
nell'incorporarli. Verifica chi sono i tuoi utenti target.</aside>

I profili colore incorporati possono anche aumentare notevolmente le dimensioni
delle immagini (a volte anche 100 KB+), quindi fai attenzione con
l'incorporamento. Strumenti come ImageOptim rimuoveranno [automaticamente
i](https://imageoptim.com/color-profiles.html) profili colore se li trovano. Al
contrario, con il profilo ICC rimosso in favore della riduzione della
dimensione, i browser saranno costretti a visualizzare l'immagine nello spazio
colore del monitor che può portare a differenze di saturazione e contrasto
attesi. Valutare i trade-off in questo caso ha senso per il tuo caso d'uso.

Presso [Nine Degrees
Below](https://ninedegreesbelow.com/photography/articles.html) è disponibile un
eccellente set di risorse per la gestione del colore del profilo ICC se sei
interessato a saperne di più.

#### Profili colore e browser web {: #color-profiles }

Le versioni precedenti di Chrome non avevano un grande supporto per la gestione
del colore, ma questo sta migliorando nel 2017 con [Color Correct
Rendering](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo).
I display che non sono sRGB (i più recenti Macbook Pro) convertiranno i colori
da sRGB al profilo di visualizzazione. Ciò significa che i colori dovrebbero
apparire più simili su diversi sistemi e browser. Safari, Edge e Firefox ora
possono anche considerare i profili ICC, quindi le immagini con un profilo di
colore diverso (ad esempio ICC) possono ora visualizzarle correttamente
indipendentemente dal fatto che lo schermo abbia una gamma ampia o meno.

Nota: per un'ottima guida su come il colore si applica a uno spettro più ampio
di modi in cui lavoriamo sul web, vedi la [guida del nerd per colorare sul
Web](https://css-tricks.com/nerds-guide-color-web/) di Sarah Drasner.

## Immagini Sprite {: #image-sprites }

[Gli sprite di
immagini](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)
(o gli sprite CSS) hanno una lunga storia sul web, sono supportati da tutti i
browser e sono un modo popolare per ridurre il numero di immagini caricate da
una pagina combinandole in un'unica immagine più grande che viene ritagliata.

<img src="images/i2_2ec824b0_1.jpg" alt="Gli sprite delle immagini sono ancora
ampiamente utilizzati in siti di produzione di grandi dimensioni, inclusa la
home page di Google."> Gli sprite delle immagini sono ancora ampiamente
utilizzati in siti di produzione di grandi dimensioni inclusa la home page di
Google.

In HTTP/1.x, alcuni sviluppatori hanno usato lo sprite per ridurre le richieste
HTTP. Questo ha comportato una serie di vantaggi, tuttavia era necessario
prestare attenzione in quanto si sono rapidamente imbattuti in problemi con
l'invalidazione della cache: le modifiche apportate a qualsiasi piccola parte di
un'immagine sprite avrebbero invalidato l'intera immagine nella cache di un
utente.

Lo sprite potrebbe ora essere un anti-pattern [HTTP/2](https://hpbn.co/http2/).
Con HTTP/2 invece è meglio [caricare le singole
immagini](https://deliciousbrains.com/performance-best-practices-http2/) poiché
è ora possibile incorporare più richieste all'interno di una singola
connessione. Applica misurazioni per valutare se è il caso per la propria
configurazione di rete.

## Caricamento lazy delle immagini non critiche {: #lazy-load-non-critical-images }

Il caricamento lazy è un modello di prestazioni Web che ritarda il caricamento
delle immagini nel browser fino a quando l'utente non ha bisogno di vederle. Un
esempio è che, mentre si scorre, le immagini vengono caricate in modo asincrono
su richiesta. Ciò può ulteriormente complementare il risparmio di byte che si
vede dall'avere una strategia di compressione delle immagini.

<img src="images/scrolling-viewport.jpg" alt="lazy-loading images">

Le immagini che devono apparire "above the fold" o quando viene visualizzata per
la prima volta la pagina web vengono caricate immediatamente. Le immagini che
seguono "below the fold", tuttavia, non sono ancora visibili all'utente. Non
devono essere immediatamente caricate nel browser. Possono essere caricate in un
secondo momento o caricate lazy solo se e quando l'utente scorre verso il basso
e diventa necessario visualizzarle.

Il caricamento lazy non è ancora supportato nativamente nel browser stesso
(sebbene ci siano state
[discussioni](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)
in passato). Usiamo invece JavaScript per aggiungere questa capacità.

**Perché il caricamento lazy è utile?**

La modalità "lazy" di caricare le immagini solo se e quando è necessario ha
molti vantaggi:

- **Consumo di dati ridotto**: poiché non si presuppone che l'utente abbia
bisogno di ogni immagine recuperata prima del tempo, si sta caricando solo il
numero minimo di risorse. Questa è sempre una buona cosa, specialmente sui
dispositivi mobili con piani dati più restrittivi.
- **Ridotto consumo della batteria**: minor carico di lavoro per il browser
dell'utente che può far risparmiare sulla durata della batteria.
- **Velocità di download migliorata** : la riduzione del tempo di caricamento
complessivo della pagina su un sito Web carico di immagini da diversi secondi a
quasi nulla è un enorme vantaggio per l'esperienza dell'utente. In effetti,
potrebbe essere la differenza tra un utente che sta in giro per godersi il tuo
sito e solo un'altra statistica di rimbalzo.

**Ma come tutti gli strumenti, da un grande potere derivano grandi
responsabilità.**

**Evita le immagini con caricamento lazy above-the-fold.** Usalo per lunghi
elenchi di immagini (ad esempio prodotti) o elenchi di avatar utente. Non usarlo
per l'immagine hero della pagina principale. Le immagini con caricamento lazy
above-the-fold possono rendere il caricamento visibilmente più lento sia dal
punto di vista tecnico che nella percezione umana. Può bloccare il preloader del
browser dato il caricamento progressivo e il JavaScript può creare lavoro extra
per il browser.

**Evita le immagini con caricamento lazy above-the-fold.** Usalo per lunghi
elenchi di immagini (ad esempio prodotti) o elenchi di avatar utente. Non usarlo
per l'immagine hero della pagina principale. Le immagini con caricamento lazy
above-the-fold possono rendere il caricamento visibilmente più lento sia dal
punto di vista tecnico che nella percezione umana. Possono ostacolare il
preloader del browser dato il caricamento progressivo e il JavaScript può creare
lavoro extra per il browser.

**Chi usa il caricamento lazy?**

Per esempi di caricamento lazy, guarda nella maggior parte dei siti principali
che ospitano molte immagini. Alcuni siti degni di nota sono
[Medium](https://medium.com/) e [Pinterest](https://www.pinterest.com/) .

<img src="images/Modern-Image35.jpg" alt="anteprime in linea per immagini su
medium.com"> Un esempio di anteprime inline con sfocatura gaussiana per le
immagini su Medium.com

Un numero di siti (come Medium) mostra una piccola anteprima inline con sfuocata
gaussiana (alcuni 100 byte) che si tramuta (caricamento lazy) in un'immagine di
qualità completa quando che è stata recuperata.

José M. Pérez ha scritto su come implementare l'effetto Medium usando i [filtri
CSS](https://jmperezperez.com/medium-image-progressive-loading-placeholder/) e
sperimentato con [diversi formati di
immagine](https://jmperezperez.com/webp-placeholder-images/) per supportare tali
segnaposto. Facebook ha anche scritto un articolo sul loro famoso approccio a
200 byte per tali segnaposto per le loro [foto di
copertina](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)
che vale la pena leggere. Se sei un utente di Webpack, il [caricatore
LQIP](https://lqip-loader.firebaseapp.com/) può aiutarti ad automatizzare parte
di questo lavoro.

In effetti, puoi cercare la tua fonte preferita di foto ad alta risoluzione e
quindi scorrere verso il basso la pagina. In quasi tutti i casi, vedrai come il
sito carica solo poche immagini a piena risoluzione alla volta, mentre il resto
è rappresentato da colori o immagini segnaposto. Mentre si continua a scorrere,
le immagini segnaposto vengono sostituite con immagini a risoluzione piena.
Questo è un caricamento lento in azione.

**Come posso applicare il caricamento lazy alle mie pagine?**

Ci sono un certo numero di tecniche e plugin disponibili per il caricamento
lazy. Raccomando [Lazysizes](https://github.com/aFarkas/lazysizes) di Alexander
Farkas per le sue prestazioni eccellenti, le sue caratteristiche, la sua
integrazione opzionale con [Intersection
Observer](/web/updates/2016/04/intersectionobserver) e il supporto per i plugin.

**Cosa posso fare con Lazysizes?**

Lazysizes è una libreria JavaScript. Non richiede alcuna configurazione. Scarica
il file js minificato e includilo nella tua pagina web.

Ecco alcuni esempi di codice presi dal file README:

Aggiungi la classe "lazyload" alle tue immagini/iframe insieme all'attributo
data-src
e/o data-srcset.

Facoltativamente, puoi anche aggiungere un attributo src con un'immagine di
bassa qualità:

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

Per la versione web di questo libro, ho associato Lazysizes (sebbene sia
possibile utilizzare qualsiasi alternativa) con Cloudinary per le immagini
reattive su richiesta. Questo mi ha permesso di sperimentare con diversi valori
di scala, qualità, formato e se caricare progressivamente o meno con il minimo
sforzo:

<img src="images/cloudinary-responsive-images.jpg" alt="Cloudinary supports
on-demand control of image quality, format and several other features.">

**Funzionalità incluse in Lazysizes:**

- Rileva automaticamente i cambiamenti di visibilità sugli elementi lazyload
attuali e futuri
- Include supporto di immagini standard reacttive (immagine e srcset)
- Aggiunge il calcolo automatico delle dimensioni e i nomi alias per la funzione
media query
- Può essere utilizzato con centinaia di immagini / iframe su pagine CSS o JS
pesanti o applicazioni web
- Estendibile: supporta i plugin
- Soluzione leggera ma matura
- Miglioramento SEO: non nasconde immagini / risorse dai crawler

**Altre opzioni di caricamento lazy**

Lazysizes non è la tua unica opzione. Altre librerie di caricamento lazy:

- [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
- [BLazy.js](https://github.com/dinbror/blazy) (oppure [Be]Lazy)
- [Unveil](http://luis-almeida.github.io/unveil/)
- [yall.js (Yet Another Lazy Loader)](https://github.com/malchata/yall.js) che è
~1KB ed utilizza Intersection Observer dove supportato.

**Qual è il trucco con Lazy Loading?**

- Gli screen reader, alcuni robot di ricerca e tutti gli utenti con JavaScript
disabilitato non saranno in grado di visualizzare immagini con caricamento lazy
e JavaScript. Questo è comunque qualcosa che possiamo aggirare con un fallback
`<noscript>` .
- I listener di scorrimento, ad esempio utilizzati per determinare quando
attivare il caricamento di un'immagine lazy, possono avere un impatto negativo
sulle prestazioni di scorrimento del browser. Possono causare il ridisegno del
browser molte volte, rallentando il processo fino alla ricerca per
indicizzazione - tuttavia, le librerie di caricamento lazy intelligenti
utilizzeranno un limite per attenuare questo problema. Una possibile soluzione è
Intersection Observer, che è supportato da Lazysizes.

Il caricamento lazy delle immagini è un modello diffuso per ridurre la larghezza
di banda, ridurre i costi e migliorare l'esperienza dell'utente. Valuta se ha
senso per la tua esperienza. Per ulteriori letture vedi [caricamento lazy di
immagini](https://jmperezperez.com/lazy-loading-images/) e [implementazione del
caricamento progressivo di
Medium](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)
.

## Evitare la trappola display: none {: #display-none-trap }

Le vecchie soluzioni per immagine reactive hanno scambiato idee su come i
browser gestiscono le richieste di immagine quando impostando la proprietà
`display` CSS. Ciò può causare la richiesta di un numero significativamente
maggiore di immagini rispetto a quelle che potresti aspettarti ed è un altro
motivo per cui `<picture>` e `<img srcset>` sono preferibili per il caricamento
di immagini reattive.

Hai mai scritto una query multimediale che imposta un'immagine da `display:none`
in determinati punti di interruzione?

```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

Oppure hai attivato le immagini nascoste usando un `display:none` classe?

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

Un rapido controllo sul pannello di rete di Chrome DevTools verificherà che le
immagini nascoste con questi approcci continuino a essere recuperate, anche
quando ci aspettiamo che non lo siano. Questo comportamento è effettivamente
corretto secondo le specifiche delle risorse incorporate.

<img src="images/display-none-images.jpg" alt="Images hidden with display:none
still get fetched">

**`display:none` evita di attivare una richiesta per un'immagine `src` ?**

```html
<div style="display:none"><img src="img.jpg"></div>
```

No. L'immagine specificata verrà comunque richiesta. Una libreria non può fare
affidamento a display: none perché l'immagine verrà richiesta prima che
JavaScript possa alterare lo src.

**`display:none` evita di attivare una richiesta per `background: url()` ?**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

Sì. Gli sfondi CSS non vengono recuperati non appena viene analizzato un
elemento. Calcolo di stili CSS per figli di elementi con `display:none`
sarebbero inutili in quanto non influisce sul rendering del documento. Le
immagini di sfondo sugli elementi figlio non vengono calcolate né scaricate.

Jake Archibald's [Request Quest](https://jakearchibald.github.io/request-quest/)
è un eccellente quiz sulle insidie ​​dell'uso di `display:none` per il
caricamento delle immagini recative. In caso di dubbi sulle modalità in cui una
richiesta di caricamento di un'immagine nel browser viene caricata, apri i
relativi strumenti DevTool e verifica tu stesso.

Di nuovo, se possibile, usa `<picture>` e `<img srcset>` invece di affidarti al
`display:none` .

## Un CDN di elaborazione delle immagini ha senso per te? {: #image-processing-cdns}

*Il tempo che trascorrerai leggendo i post del blog per impostare la tua
pipeline di elaborazione delle immagini e modificare la tua configurazione è
spesso la tariffa per un servizio. Con [Cloudinary](http://cloudinary.com/) che
offre un servizio gratuito, [Imgix](https://www.imgix.com/) una prova gratuita e
[Thumbor](https://github.com/thumbor/thumbor) esistenti come alternativa OSS, ci
sono molte opzioni disponibili per l'automazione.*

Per ottenere tempi di caricamento della pagina ottimali, è necessario
ottimizzare il caricamento delle immagini. Questa ottimizzazione richiede una
strategia di immagine reactive e può trarre vantaggio dalla compressione delle
immagini sul server, dalla selezione automatica del formato migliore e dal
ridimensionamento sensibile. Ciò che conta è consegnare l'immagine correttamente
dimensionata al dispositivo appropriato nella risoluzione corretta il più
velocemente possibile. Fare questo non è così facile come si potrebbe pensare.

**Utilizzo del tuo server rispetto a un CDN**

A causa della complessità e della natura in continua evoluzione della
manipolazione delle immagini, offriremo una citazione da qualcuno con esperienza
nel campo, quindi procedere con un suggerimento.

"Se il tuo prodotto non è una manipolazione di immagini, allora non farlo da
solo. Servizi come Cloudinary [o imgix, Ed.] Lo fanno molto più efficientemente
e molto meglio di te, quindi usali e se sei preoccupato per il costo, pensa a
quanto ti costerà lo sviluppo e nella manutenzione, oltre ai costi di hosting,
archiviazione e consegna. " - [Chris
Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)

Per il momento, accetteremo e suggeriremo di prendere in considerazione
l'utilizzo di una CDN per le esigenze di elaborazione delle immagini. Verranno
esaminati due CDN per vedere come si confrontano rispetto all'elenco delle
attività che abbiamo raccolto in precedenza.

**Cloudinary e Imgix**

[Cloudinary](http://cloudinary.com/) e [Imgix](https://www.imgix.com/) sono due
CDN di elaborazione delle immagini consolidati. Sono la scelta di centinaia di
migliaia di sviluppatori e aziende in tutto il mondo, tra cui Netflix e Red
Bull. Diamo un'occhiata a loro in modo più dettagliato.

**Quali sono le basi?**

A meno che tu non sia il proprietario di una rete di server come loro, il loro
primo enorme vantaggio rispetto a create la tua soluzione è che usano un sistema
di rete globale distribuito per portare una copia delle tue immagini più vicina
ai tuoi utenti. È anche molto più facile per un CDN "a prova di futuro" la tua
strategia di caricamento dell'immagine man mano che cambiano le tendenze - farlo
da solo richiede manutenzione, monitoraggio del supporto del browser per formati
emergenti e seguendo la community di compressione delle immagini.

In secondo luogo, ogni servizio ha un piano tariffario
[multilivello](http://cloudinary.com/pricing), con Cloudinary che offre un
[livello gratuito](http://cloudinary.com/pricing) e imgix il prezzo del livello
standard è relativamente economico rispetto al loro piano premium ad alto
volume. Imgix offre una [prova](https://www.imgix.com/pricing) gratuita con un
credito verso i servizi che equivale quasi alla stessa cosa di un livello
gratuito.

Terzo, l'accesso API è fornito da entrambi i servizi. Gli sviluppatori possono
accedere al CDN in modo programmatico e automatizzare la loro elaborazione. Sono
inoltre disponibili librerie client, plug-in framework e documentazione API, con
alcune funzionalità limitate a livelli di pagamento più elevati.

**Andiamo all'elaborazione delle immagini**

Per ora limitiamo la nostra discussione alle immagini statiche. Sia Cloudinary
che Imgix offrono una gamma di metodi di manipolazione delle immagini e
supportano entrambe le funzioni primarie come compressione, ridimensionamento,
ritaglio e creazione di miniature nei loro piani standard e gratuiti.

<img src="images/Modern-Image36.jpg" alt="libreria multimediale cloudinaria">
Libreria di supporti cloud: per impostazione predefinita, Cloudinary codifica i
file [JPEG non
progressivi](http://cloudinary.com/blog/progressive_jpegs_and_green_martians) .
Per attivarne la generazione, seleziona l'opzione "Progressiva" in "Altre
opzioni" o passa il flag "fl_progressive".

Elenchi in modalità cloud: [sette categorie di trasformazione delle
immagini](http://cloudinary.com/documentation/image_transformations) con un
totale di 48 sottocategorie al loro interno. Imgix pubblicizza oltre [100
operazioni di elaborazione delle
immagini](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780)
.

**Cosa succede per impostazione predefinita?**

- Cloudinary esegue le seguenti ottimizzazioni per impostazione predefinita:
- [Codifica i file JPEG usando
MozJPEG](https://twitter.com/etportis/status/891529495336722432) (scelto come
predefinito su Guetzli)
- Elimina tutti i metadati associati al file di immagine trasformato (l'immagine
originale non viene modificata). Per sovrascrivere questo comportamento e
consegnare un'immagine trasformata con i suoi metadati aggiungi il flag
`keep_iptc`.
- Può generare formati WebP, GIF, JPEG e JPEG-XR con qualità automatica. Per
sovrascrivere le regolazioni predefinite, impostare il parametro di qualità
nella trasformazione.
- Esegue algoritmi di
[ottimizzazione](http://cloudinary.com/documentation/image_optimization#default_optimizations)
per ridurre al minimo le dimensioni del file con un impatto minimo sulla qualità
visiva durante la generazione di immagini in formato PNG, JPEG o GIF.

Imgix non ha ottimizzazioni predefinite come quelle di Cloudinary. Ha una
qualità immagine predefinita impostabile. Per imgix, i parametri automatici
aiutano ad automatizzare il livello di ottimizzazione della linea di base
attraverso il catalogo immagini.

Attualmente dispone di [quattro diversi
metodi](https://docs.imgix.com/apis/url/auto) :

- Compressione
- Miglioramento visivo
- Conversione del formato di file
- Rimozione degli occhi rossi

Imgix supporta i seguenti formati di immagine: JPEG, JPEG2000, PNG, GIF, GIF
animato, TIFF, BMP, ICNS, ICO, PDF, PCT, PSD, AI

Cloudinary supporta i seguenti formati di immagine: JPEG, JPEG 2000, JPEG XR,
PNG, GIF, GIF animati, WebP, WebP animati, BMP, TIFF, ICO, PDF, EPS, PSD, SVG,
AI, DjVu, FLIF, TARGA.

**Che dire delle prestazioni?**

Le prestazioni di consegna del CDN riguardano principalmente
[latenza](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)
e velocità.

La latenza aumenta sempre leggermente per le immagini completamente non
collegate. Ma una volta che un'immagine viene memorizzata nella cache e
distribuita tra i server di rete, il fatto che una CDN globale trovi il percorso
più breve verso l'utente, aggiunto al risparmio di byte di un'immagine
correttamente elaborata, riduce quasi sempre i problemi di latenza rispetto a
quelli di immagini mal elaborate o server solitari dall'altro lato del pianeta.

Entrambi i servizi utilizzano CDN veloci e ampie. Questa configurazione riduce
la latenza e aumenta la velocità di download. La velocità di download influisce
sul tempo di caricamento della pagina e questa è una delle metriche più
importanti sia per l'esperienza utente che per la conversione.

**Quindi come fanno a confronto?**

Cloudinary ha [160.000 clienti](http://cloudinary.com/customers) tra cui
Netflix, eBay e Dropbox. Imgix non riporta il numero di clienti, ma è più
piccolo di Cloudinary. Anche se la base utenti di Imgix include utenti di
immagini pesanti come Kickstarter, Exposure, unsplash ed Eventbrite.

Ci sono così tante variabili da valutare nella manipolazione delle immagini che
un confronto di prestazioni testa a testa tra i due servizi è difficile. Molto
dipende da quanto è necessario elaborare un'immagine - che richiede una quantità
di tempo variabile - e quali dimensioni e risoluzione sono necessarie per
l'output finale, il che influisce sulla velocità e sul tempo di download. Il
costo potrebbe essere quindi il fattore più importante per te.

I CDN costano denaro. Un sito pesante di immagini con molto traffico potrebbe
costare centinaia di dollari USA al mese in CDN. Sono necessari un certo livello
di conoscenza dei prerequisiti ed abilità di programmazione per ottenere il
massimo da questi servizi. Se non stai facendo niente di stravagante
probabilmente non avrai problemi.

Ma se non ti senti a tuo agio con gli strumenti di elaborazione delle immagini o
le API, allora devi investire un po' in una curva di apprendimento. Per poter
ospitare i percorsi del server CDN è necessario modificare alcuni URL nei
collegamenti locali. Fai la giusta due diligence :)

**Conclusione**

Se attualmente stai già servendo le tue immagini o stai pianificando di farlo,
forse dovresti tenere in considerazione
 un CDN.

## Memorizzazione nella cache degli asset immagine {: #caching-image-assets }

Le risorse possono specificare una politica di memorizzazione nella cache
utilizzando le [HTTP cache
headers](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)
. Nello specifico `Cache-Control` può definire chi può memorizzare le risposte
nella cache e per quanto tempo

La maggior parte delle immagini fornite agli utenti sono risorse statiche che
[non cambieranno](http://kean.github.io/post/image-caching) in futuro. La
migliore strategia di memorizzazione nella cache per tali risorse è il caching
aggressivo.

Quando si impostano le intestazioni della cache HTTP, impostare Cache-Control
con un massimo di un anno (es. `Cache-Control:public; max-age=31536000` ).
Questo tipo di caching aggressivo funziona bene per la maggior parte dei tipi di
immagini, specialmente quelle che sono longevi come avatar e intestazioni di
immagini.

Note: se stai servendo immagini usando PHP, può distruggere la memorizzazione
nella cache a causa dell'impostazione predefinita
[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php).
Questo può essere un disastro per il caching delle immagini e potresti voler
[ovviare a](https://stackoverflow.com/a/3905468) questo impostando
session_cache_limiter ('public') che imposterà `public, max-age =`. Anche la
disabilitazione e l'impostazione delle intestazioni di controllo della cache
personalizzate vanno bene.

## Precaricamento delle risorse di immagine critiche {: #preload-critical-image-assets }

Le risorse delle immagini critiche possono essere precaricate utilizzando
[`<link rel=preload>`](https://www.w3.org/TR/preload/) .

`<link rel=preload>` è un recupero dichiarativo che consente di forzare il
browser ad effettuare una richiesta per una risorsa senza bloccare l'evento
`onload` del documento. Consente di aumentare la priorità delle richieste di
risorse che altrimenti potrebbero non essere scoperte più tardi nel processo di
analisi dei documenti.

Le immagini possono essere precaricate specificando un `as` con valore `image` :

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

Le risorse di immagini per `<img>` , `<picture>` , `srcset` e SVG possono trarre
vantaggio da questa ottimizzazione.

Note: `<link rel="preload">` è [supportato](http://caniuse.com/#search=preload)
dai browser basati su Chrome e Blink come Opera, [Safari Tech
Preview](https://developer.apple.com/safari/technology-preview/release-notes/)
ed è stato [implementato](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)
in Firefox.

Siti come [Philips](https://www.usa.philips.com/) ,
[FlipKart](https://www.flipkart.com/) e [Xerox](https://www.xerox.com/)
utilizzano `<link rel=preload>` per precaricare il loro logo principale (spesso
utilizzato nelle prime [fasi](https://www.flipkart.com/) del documento). Anche
[Kayak](https://kayak.com/) utilizza il preload per garantire che l'immagine
hero del loro header sia caricata il prima possibile.

<img src="images/preload-philips.jpg" alt="Philips use link rel=preload to
preload their logo image">

**Cos'è l'intestazione link preload?**

Un link preload può essere specificato utilizzando un tag HTML o [HTTP Link
header](https://www.w3.org/wiki/LinkHeader). In entrambi i casi, un link preload
indirizza al browser di iniziare a caricare una risorsa nella cache di memoria,
indicando che ci si aspetta con estrema sicurezza che la pagina che verrà
utilizzata come risorsa e non si vuole attendere che la scansione di preload o
che il parser la scopra.

Un'intestazione di collegamento Preload per le immagini sarebbe simile a questa:

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

Quando il Financial Times ha introdotto un Link preload header sul loro sito,
hanno ridotto di [un
secondo](https://twitter.com/wheresrhys/status/843252599902167040) il tempo
necessario per visualizzare la propria immagine masthead:

<img src="images/preload-financial-times.jpg" alt="Il FT utilizza il precarico.
Vengono visualizzate le WebPageTest prima e dopo le tracce che mostrano
miglioramenti."> In basso: con `<link rel=preload>` , In alto: senza. Confronto
per un Moto G4 su 3G su WebPageTest sia
[prima](https://www.webpagetest.org/result/170319_Z2_GFR/) che
[dopo](https://www.webpagetest.org/result/170319_R8_G4Q/) .

Allo stesso modo, Wikipedia ha migliorato le prestazioni time-to-logo con Link
preload
header trattato nel loro [case
study](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/)
.

**Quali caveat dovrebbero essere considerati quando si utilizza questa
ottimizzazione?**

Sii certo che valga la pena precaricare le risorse immagine in quanto, se non
sono fondamentali per l'esperienza utente, potrebbero esserci altri contenuti
della pagina sui quali vale la pena concentrarsi prima. Assegnando la priorità
alle richieste di immagini, si potrebbe finire per spingere altre risorse più in
basso nella coda.

È importante evitare l'uso di `rel=preload` per precaricare i formati di
immagine senza un ampio supporto per browser (ad esempio WebP). È inoltre
consigliabile evitare di utilizzarlo per le immagini reactive definite in
`srcset` dove la fonte recuperata può variare in base alle condizioni del
dispositivo.

Per saperne di più sul precaricamento, vedi [Preload, Prefetch and Priorities in
Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
e [Preload: What Is It Good
For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)

## Budget di prestazioni Web per le immagini {: #performance-budgets }

Un budget di prestazioni è un "budget" per le prestazioni della pagina web che
un team tenta di non superare. Ad esempio, "le immagini non supereranno i 200 KB
in nessuna pagina" o "l'esperienza utente deve essere utilizzabile in meno di 3
secondi". Quando un budget non viene raggiunto, analizza le motivazioni e come
rientrare nell'obiettivo.

I budget forniscono un quadro utile per discutere le prestazioni con le parti
interessate. Quando un progetto o una decisione aziendale può influire sulle
prestazioni del sito, consultare il budget. Sono un riferimento per respingere o
ripensare il cambiamento quando può danneggiare l'esperienza utente di un sito.

Ho riscontrato che i team hanno il miglior successo con i budget delle
prestazioni quando il loro monitoraggio è automatizzato. Invece di ispezionare
manualmente i network waterfalls riguardo alle regressioni di budget,
l'automazione può segnalare quando il budget viene superato. Due di questi
servizi utili per il tracciamento del budget delle prestazioni sono
[Calibre](https://calibreapp.com/docs/metrics/budgets) e
[SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/) .

Una volta definito un budget di prestazioni per le dimensioni dell'immagine,
SpeedCurve avvia il monitoraggio e avvisa l'utente in caso di superamento del
budget:

<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="SpeedCurve image
size monitoring.">

Calibre offre una funzionalità simile con il supporto per l'impostazione dei
budget per ogni classe di dispositivi obiettivo. Ciò è utile in quanto il tuo
budget per le dimensioni delle immagini su desktop tramite Wi-Fi può variare
notevolmente rispetto ai tuoi budget sui dispositivi mobili.

<img src="images/budgets.jpg" alt="Calibre supports budgets for image sizes.">

## Raccomandazioni conclusive  {: #closing-recommendations }

In definitiva la scelta di una strategia di ottimizzazione delle immagini
dipenderà dal tipo di immagini da offrire ai tuoi utenti e ciò che decidi sia un
ragionevole insieme di criteri di valutazione. Potresti usare SSIM o Butteraugli
oppure, se si tratta di un insieme abbastanza piccolo di immagini, uscire dalla
percezione umana per ciò che ha senso.

**Ecco i miei consigli di chiusura:**

Se **non puoi** servire formati in modo condizionato in base al supporto del
browser:

* Guetzli + MozJPEG's jpegtran è un buon formato per la qualità JPEG > 90.
    * Per il web `q=90` è eccessivamente alto. Potrebbe andare bene `q=80`, e
      nei display 2x anche `q=50`. Dal momento che Guetzli non va così in
      basso, per il web puoi usare MozJPEG.
    * Kornel Lesiński ha recentemente migliorato il comando cjpeg di mozjpeg
      aggiungendo il ridotto profilo sRGB per aiutare Chrome a visualizzare i
      colori naturali nei display con wide-gamut
* PNG pngquant + advpng ha un ottimo rapporto  velocità/compressione
* Se **puoi** servi condizionando (usando `<picture>`, [Accept
header](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)o
[Picturefill](https://scottjehl.github.io/picturefill/)):
    * Servi WebP ai browser che lo supportano
        * Crea immagini WebP dalle immagini originali al 100%. Altrimenti starai
          inviando ai browser che li supportano immagini peggiorate con le
          distorsioni JPEG *e* le distorsioni WebP! Se invece comprimi le
          sorgenti originali delle immagini non compresse usando WebP avrai la
          minore distorsione visibile WebP e potranno anche essere compresse meglio.
        * Le impostazioni predefinite che il team WebP usa `-m 4 -q 75` sono
          solitamente valide per la maggior parte dei casi per ottimizzazioni
          velocità/rapporto.
        * WebP ha anche una speciale modalità lossless (`-m 6 -q 100`) per poter
          ridurre un file alla dimensione minima esplorando tutte le combinazioni
          di parametri. È un ordine di magnitudo più lento ma è adatto per contenuti statici.
    *   Come fallback, comprimi le sorgenti con Guetzli/MozJPEG per gli altri
		browser

Buona compressione!

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
