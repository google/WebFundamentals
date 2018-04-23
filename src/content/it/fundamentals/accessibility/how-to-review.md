project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Come fare una revisione del tuo sito per problemi di accessibilità.

{# wf_updated_on: 2018-04-23 #}
{# wf_published_on: 2017-03-12 #}

# Come eseguire una revisione dell'accessibilità {: .page-title}

{% include "web/_shared/contributors/robdodson.html" %}

<div>
  <div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="cOmehxAU_4s"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen="">
    </iframe>
  </div>
Determinare se il tuo sito web o l'applicazione è accessibile può sembrare un
compito gravoso. Se affronti l'accessibilità per la prima volta,
la vastità dell'argomento può farti chiedere da dove iniziare, dopotutto,
prendere in considerazione una vasta gamma di opzioni diverse significa
che ad essa corrisponderanno una vasta gamma di problematiche diverse.
<p data-md-type="paragraph">In questo post, analizzerò questi problemi in un
processo logico, passo dopo passo, esaminando un sito esistente per
l'accessibilità.</p>
<div data-md-type="block_html"></div>

## Inizia con la tastiera


<img src="imgs/ic_keyboard_black_24px.svg" class="attempt-right" alt=""
width="120"> Per gli utenti che non possono o non scelgono di utilizzare un
mouse, la navigazione tramite tastiera è il loro mezzo principale per
accedere al contenuto dello schermo. Questo pubblico include utenti con problemi
motori, come Repetitive Stress Injury (RSI) o paralisi, nonché utenti di screen
reader. Per una buona esperienza di tastiera, è necessario avere un ordine di
tabulazione logico e stili di messa a fuoco facilmente distinguibili.

### Punti chiave

- Inizia eseguendo tabulazioni nel tuo sito. L'ordine in cui gli elementi sono
focalizzati dovrebbe mirare a seguire l'ordine DOM. Se non sei sicuro di quali
elementi debbano essere messi a fuoco, consulta la sezione [Focus
Fundamentals](/web/fundamentals/accessibility/focus/) per un aggiornamento. La
regola generale è che qualsiasi controllo con cui un utente può interagire o
fornire input deve mirare a essere focalizzabile e visualizzare un indicatore di
messa a fuoco (ad esempio, un anello di messa a fuoco). È prassi comune
disabilitare gli stili di messa a fuoco senza fornire un'alternativa utilizzando
`outline: none` in CSS, ma questo è un anti-pattern. Se un utente della
tastiera non può vedere ciò che è messo a fuoco, non ha modo di interagire con la
pagina. Se è necessario differenziare tra mouse e tastiera per lo stile,
prendi in considerazione l'aggiunta di una libreria come
[what-input](https://github.com/ten1seven/what-input).

- I comandi interattivi personalizzati dovrebbero mirare a essere
focalizzabili. Se utilizzi JavaScript per trasformare `<div>` in un bel menu a
discesa, non verrà automaticamente inserito nell'ordine di
tabulazione. Per rendere focalizzabile un comando personalizzato, contrassegnalo
con `tabindex=”0”`.

- Evita i comandi con un `tabindex` > 0. Questi controlli superano tutti gli
altri nell'ordine di tabulazione, indipendentemente dalla loro posizione nel
DOM. Ciò può essere fonte di confusione per gli utenti di screen reader poiché
tendono a navigare nel DOM in modo lineare.

- I contenuti non interattivi (ad es. titoli) non dovrebbero essere
focalizzabili. A volte gli sviluppatori aggiungono `tabindex` ai titoli
perché pensano che siano importanti. Questo è anche un anti-pattern perché rende
gli utenti di tastiera che possono vedere lo schermo meno efficienti. Per gli
utenti di screen reader, lo screen reader annuncia già questi titoli, quindi non
è necessario renderli focalizzabili.

- Se vengono aggiunti nuovi contenuti alla pagina, prova ad accertarti che
l'attenzione dell'utente sia rivolta a quel contenuto in modo che possa
intervenire su di esso. Vedi [Managing Focus at the Page
Level](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_at_the_page_level)
per gli esempi.

- Fai attenzione al trapping completo della messa a fuoco in qualsiasi momento.
Fai attenzione ai widget di completamento automatico, in cui la messa a fuoco
della tastiera potrebbe bloccarsi. La messa a fuoco può essere temporaneamente
trapped in situazioni specifiche, come la visualizzazione di una finestra modale,
quando non vuoi che l'utente interagisca con il resto della pagina, ma
dovresti cercare di fornire un metodo accessibile tramite tastiera anche per
uscire dalla finestra modale. Vedi la guida su [Modals and Keyboard
Trap](/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps)
per un esempio.

### Solo perché qualcosa è focalizzabile non significa che sia utilizzabile

Se hai creato un comando personalizzato, cerca di fare in modo che l'utente possa
accedere a *tutte le* funzionalità usando solo la tastiera. Consulta
[Managing Focus Components](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_in_components)
per le tecniche di miglioramento dell'accesso con tastiera.

### Non dimenticare i contenuti fuori schermo

Molti siti hanno contenuti fuori schermo che sono presenti nel DOM ma non sono
visibili, ad esempio, i link all'interno di un menu di spostamento responsive
o un pulsante all'interno di una finestra modale che deve ancora essere
visualizzata. Lasciare questi elementi nel DOM può portare a un'esperienza di
tastiera complicata, specialmente per gli screen reader che annunceranno il
contenuto fuori schermo come se fosse parte della pagina. Consulta
[Handling Offscreen
Content](/web/fundamentals/accessibility/focus/dom-order-matters#offscreen_content)
per suggerimenti su come gestire questi elementi.

## Provalo con uno screen reader

<img src="imgs/ic_speaker_notes_black_24px.svg" class="attempt-right" alt=""
width="100">

Migliorare il supporto generale della tastiera crea anche le basi per la fase seguente,
ossia controllare che l'etichettatura e la semantica della pagina siano
corrette e non ci siano ostacoli alla navigazione dello screen reader. Se non hai
familiarità con il modo in cui la marcatura semantica viene interpretata dalla
tecnologia assistiva, consulta [Introduction to
Semantics](/web/fundamentals/accessibility/semantics-builtin/) per un
aggiornamento.

### Punti chiave

- Controlla che in tutte le immagini il testo `alt` sia corretto. L'eccezione a
questa pratica è quando le immagini sono principalmente a scopo di presentazione
e non sono pezzi di contenuto essenziali. Per indicare che un'immagine deve
essere saltata da uno screen reader, imposta il valore dell'attributo `alt` su
una stringa vuota, ad es. `alt=””`.

- Controlla che tutti i comandi abbiano un'etichetta. Per i comandi personalizzati
può richiedere l'uso di `aria-label` o `aria-labelledby`. Vedi
[ARIA Labels and
Relationships](/web/fundamentals/accessibility/semantics-aria/aria-labels-and-relationships)
come  esempio.

- Controlla che tutti i comandi personalizzati abbiano un `role` e ci siano tutti
gli attributi ARIA appriopriati richiesti che conferiscono il loro stato. Ad esempio, una
casella di controllo personalizzata avrà bisogno di un `role=”checkbox”` e
`aria-checked=”true|false”` per trasmettere correttamente il suo stato. Vedere
[Introduction to ARIA](/web/fundamentals/accessibility/semantics-aria/) per una
panoramica generale di come ARIA può fornire la semantica mancante per i
comandi personalizzati.

- Il flusso di informazioni dovrebbe avere senso. Poiché gli screen reader
navigano la pagina in ordine DOM, se hai usato i CSS per riposizionare
visivamente gli elementi, potrebbero essere annunciati in una sequenza priva di
senso. Se desideri che qualcosa appaia per primo nella pagina, prova a
spostarlo fisicamente prima nel DOM.

- Mira a supportare la navigazione di uno screen reader su tutto il contenuto
della pagina. Evita che parti del sito vengano nascoste o bloccate in modo
permanente all'accesso con screen reader.

- Se il contenuto *deve* essere nascosto da uno screen reader, ad esempio, se è
fuori dallo schermo o solo di presentazione, assicurati che il contenuto sia
impostato su `aria-hidden=”true”`. Consulta la guida su come
[Hiding
content](/web/fundamentals/accessibility/semantics-aria/hiding-and-updating-content#aria-hidden)
per ulteriori spiegazioni.

### La familiarità anche con un solo screen reader può davvero esserti utile

Sebbene possa sembrare scoraggiante imparare uno screen reader, in realtà sono
piuttosto facili da usare. In generale, la maggior parte degli sviluppatori può
cavarsela con pochi semplici comandi.

Se sei su un Mac, guarda [questo video sull'uso di
VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6)
, lo screen reader fornito con Mac OS. Se sei su un PC, guarda [questo video
sull'uso di
NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4)
, uno screen reader open source supportato da donazioni per Windows.

### aria-hidden non impedisce la messa a fuoco della tastiera

È importante capire che ARIA può influenzare solo la *semantica* di un elemento;
non ha alcun effetto sul *comportamento* dell'elemento. Mentre puoi rendere un
elemento invisibile agli screen reader con `aria-hidden=”true”`, ciò non cambia
il comportamento di messa a fuoco per quell'elemento. Per i contenuti
interattivi fuori schermo, dovrai spesso combinare `aria-hidden=”true”` e
`tabindex=”-1”` per assicurarti che sia veramente rimosso dal flusso della
tastiera. L'[attributo inert](https://github.com/WICG/inert) proposto mira a
semplificare questo problema combinando il comportamento di entrambi gli
attributi.

## Approfitta di titoli e punti di riferimento

<img src="imgs/ic_map_black_24px.svg" class="attempt-right" alt="" width="100">

I titoli e gli elementi di riferimento conferiscono alla pagina una struttura
semantica e aumentano notevolmente l'efficienza di navigazione degli utenti con
tecnologie assistive. Molti utenti di screen reader segnalano che, quando
finiscono in una pagina sconosciuta per la prima volta, di solito cercano di
[navigare in base ai
titoli](http://www.heydonworks.com/article/responses-to-the-screen-reader-strategy-survey)
. Allo stesso modo, gli screen reader offrono anche la possibilità di saltare a
punti di riferimento importanti come `<main>` e `<nav>`. Per questo motivo è
importante considerare come utilizzare la struttura della pagina per
guidare l'esperienza dell'utente.

### Punti chiave

- Fare un uso corretto della gerarchia `h1-h6`. Pensa ai titoli come strumenti
per creare una struttura per la tua pagina. Non fare affidamento sullo stile
incorporato nei titoli; considera invece tutti i titoli come se fossero della
stessa dimensione e utilizza il livello semanticamente appropriato per il
contenuto primario, secondario e terziario. Quindi usa CSS per fare in modo che
i titoli corrispondano al tuo design.

- Utilizza elementi e ruoli dei punti di riferimento in modo che gli utenti
possano evitare i contenuti ripetitivi. Molte tecnologie assistive forniscono
scorciatoie per passare a parti specifiche della pagina, come quelle definite
dagli elementi `<main>` o `<nav>`. Questi elementi hanno ruoli impliciti di
riferimento. È inoltre possibile utilizzare l'attributo ARIA `role` per definire
esplicitamente le regioni nella pagina, ad esempio `<div role=”search”>`. Vedi
la [guida su titoli e punti di
riferimento](/web/fundamentals/accessibility/semantics-builtin/navigating-content)
per ulteriori esempi.

- Evita `role=”application”` a meno che tu non abbia familiarità
con esso. Il ruolo del punto di riferimento `application` dirà alla
tecnologia assistiva di disabilitare le scorciatoie e passare attraverso tutti i tasti
premuti alla pagina. Ciò significa che gli utenti che di solito utilizzano lo screen
reader per spostarsi all'interno della pagina non potranno più farlo e
dovrai implementare tu *tutta* la gestione della tastiera.

### Controlla rapidamente titoli e punti di riferimento con uno screen reader

Screen reader come VoiceOver e NVDA forniscono un menu contestuale per saltare a
regioni importanti della pagina. Se stai eseguendo un controllo
dell'accessibilità, puoi utilizzare questi menu per una rapida
panoramica della pagina e determinare se i livelli di intestazione sono
appropriati e quali riferimenti sono in uso. Per saperne di più dai un'occhiata
a questi video didattici sulle basi di
[VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&index=6&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
e
[NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4).

## Automatizza il processo

<img src="imgs/ic_build_black_24px.svg" class="attempt-right" alt=""
width="100">

Testare manualmente un sito per l'accessibilità può essere noioso e soggetto a
errori. Alla fine vorrai automatizzare il processo il più possibile. Questo può
essere fatto attraverso l'uso di estensioni del browser e suite di test di
accessibilità della riga di comando.

### Punti chiave

- La pagina supera tutti i test delle estensioni del browser
[aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)
o
[WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)?
Queste estensioni sono solo due delle opzioni disponibili e possono essere un'utile
aggiunta a qualsiasi processo di test manuale in quanto possono individuare
rapidamente problemi delicati come i rapporti di contrasto errati e gli
attributi ARIA mancanti. Se preferisci intervenire nella riga di comando,
[axe-cli](https://github.com/dequelabs/axe-cli) fornisce le stesse funzionalità
dell'estensione del browser aXe, ma può essere facilmente eseguita dal tuo
terminale.

- Per evitare regressioni, specialmente in un ambiente di integrazione continua,
incorpora una libreria come [axe-core](https://github.com/dequelabs/axe-core)
nella suite di test automatizzata. axe-core è lo stesso motore che alimenta
l'estensione chrome aXe, ma in un programma da riga di comando di facile
esecuzione.

- Se stai usando un framework o una libreria, ti fornisce strumenti suoi di
accessibilità? Alcuni esempi includono
[protractor-accessibility-plug-in](https://github.com/angular/protractor-accessibility-plugin/)
per Angular e
[a11ysuite](https://github.com/Polymer/web-component-tester#a11ysuite) per
Polymer e Web Components. Approfitta degli strumenti disponibili, quando
possibile, per evitare di reinventare la ruota ogni volta.

### Se stai creando una Progressive Web App prendi in considerazione Lighthouse

<img src="imgs/lighthouse.png" class="attempt-right" alt="">

Lighthouse è uno strumento per misurare le prestazioni della tua Progressive Web
App, ma utilizza anche la libreria axe-core per alimentare una serie di test di
accessibilità. Se stai già utilizzando Lighthouse, tieni d'occhio i test di
accessibilità non riusciti nel tuo rapporto. La correzione di questi elementi
consentirà di migliorare l'esperienza utente complessiva del tuo sito.

## Conclusione

Rendere la revisione dell'accessibilità una parte normale del processo
ed eseguire questi controlli in anticipo e spesso può contribuire a migliorare
l'esperienza generale di utilizzo del tuo sito. Ricorda, una buona accessibilità
equivale a un buon UX!

### Risorse aggiuntive

- [Web Accessibility by Google](https://bit.ly/web-a11y)
- [Accessibility Fundamentals](/web/fundamentals/accessibility/)
- [A11ycasts](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
