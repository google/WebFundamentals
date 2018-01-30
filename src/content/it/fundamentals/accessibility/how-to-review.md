project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Come fare una revisione del tuo sito per problemi di accessibilità.

{# wf_updated_on: 2018-01-30 #}
{# wf_published_on: 2017-03-12 #}

# Come fare un'analisi dell'accessibilità {: .page-title}

{% include "web/_shared/contributors/robdodson.html" %}

<div>
  <div class="video-wrapper">
<iframe class="devsite-embedded-youtube-video" data-video-id="cOmehxAU_4s"
data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen="">
    </iframe>
  </div>
Determinare se il tuo sito web o l'applicazione è accessibile può sembrare un
compito opprimente. Se ti stai avvicinando all'accessibilità per la prima volta,
la vastità dell'argomento può lasciarti chiedendo da dove iniziare - dopotutto,
lavorando per adattare una vasta gamma di abilità significa che ci sono serie di
problemi conseguentemente diversi.</div>
<p data-md-type="paragraph">In this post, I'm going to break down these issues
into a logical, step by step
process for reviewing an existing site for accessibility.</p>
<div data-md-type="block_html"></div>

## Start with the keyboard


<img src="imgs/ic_keyboard_black_24px.svg" class="attempt-right" alt=""
width="120">
For users who either cannot or choose not to use a mouse, keyboard navigation is
their primary means of reaching everything on screen. This audience includes 
users with motor impairments, such as Repetitive Stress Injury (RSI) or 
paralysis, as well as screen reader users. For a good keyboarding experience 
aim to have a logical tab order and easily discernable focus styles.


### Key points

- Inizia eseguendo tabulazioni nel tuo sito. L'ordine in cui gli elementi sono
focalizzati dovrebbe mirare a seguire l'ordine DOM. Se non sei sicuro di quali
elementi debbano essere messi a fuoco, consulta la sezione [Focus
Fundamentals](/web/fundamentals/accessibility/focus/) per un aggiornamento. La
regola generale è che qualsiasi controllo con cui un utente può interagire o
fornire input deve mirare a essere focalizzabile e visualizzare un indicatore di
messa a fuoco (ad esempio, un anello di messa a fuoco). È prassi comune
disabilitare gli stili di messa a fuoco senza fornire un'alternativa utilizzando
il `outline: none` in CSS, ma questo è un anti-pattern. Se un utente della
tastiera non può vedere ciò che è focalizzato, non ha modo di interagire con la
pagina. Se è necessario differenziare tra mouse e tastiera per lo stile,
prendere in considerazione l'aggiunta di una libreria come
[what-input](https://github.com/ten1seven/what-input) .

- Custom interactive controls should aim to be focusable. If you use JavaScript
to turn a `<div>` into a fancy dropdown, it will not automatically be
inserted
    into the tab order. To make a custom control focusable, give it a
    `tabindex=”0”`.

- Avoid controls with a `tabindex` > 0. These controls will jump ahead of
everything else in the tab order, regardless of their position in the DOM.
This
can be confusing for screen reader users as they tend to navigate the DOM in
a
    linear fashion.

- I contenuti non interattivi (ad es. titoli) dovrebbero evitare di essere
focalizzabili. A volte gli sviluppatori aggiungono un `tabindex` ai titoli
perché pensano che siano importanti. Questo è anche un anti-pattern perché rende
gli utenti di tastiera che possono vedere lo schermo meno efficienti. Per gli
utenti di screen reader, lo screen reader annuncia già questi titoli, quindi non
è necessario renderli focalizzabili.

- Se vengono aggiunti nuovi contenuti alla pagina, prova ad accertarti che
l'attenzione dell'utente sia rivolta a quel contenuto in modo che possa
intervenire su di esso. Vedi [Gestione del Focus a livello di
pagina](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_at_the_page_level)
per esempio.

- Beware of completely trapping focus at any point. Watch out for autocomplete
widgets, where keyboard focus may get stuck. Focus can be temporarily
trapped in
specific situations, such as displaying a modal, when you don't want the
user
    interacting with the rest of the page - but you should aim to provide a
    keyboard-accessible method of escaping the modal as well. See the guide on
    [Modals and Keyboard
Traps](/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps)
    for an example.

### Just because something is focusable doesn’t mean it’s usable

Se hai creato un controllo personalizzato, punta affinché un utente possa
raggiungere *tutte le* funzionalità usando solo la tastiera. Consulta [Gestione
dei componenti di messa a
fuoco](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_in_components)
per le tecniche di miglioramento dell'accesso con tastiera.

### Don’t forget offscreen content

Molti siti hanno contenuti fuori schermo che sono presenti nel DOM ma non sono
visibili, ad esempio, i collegamenti all'interno di un menu cassetto responsive
o un pulsante all'interno di una finestra modale che deve ancora essere
visualizzata. Lasciare questi elementi nel DOM può portare a un'esperienza di
tastiera complicata, specialmente per gli screen reader che annunceranno il
contenuto fuori schermo come se fosse parte della pagina. Vedere [Gestione del
contenuto fuori
schermo](/web/fundamentals/accessibility/focus/dom-order-matters#offscreen_content)
per suggerimenti su come gestire questi elementi.

## Try it with a screen reader

<img src="imgs/ic_speaker_notes_black_24px.svg" class="attempt-right" alt=""
width="100">

Migliorare il supporto generale alla tastiera pone alcune basi per il prossimo
passo, che consiste nel controllare la pagina per l'etichettatura e la semantica
corrette e qualsiasi ostacolo alla navigazione dello screen reader. Se non hai
familiarità con il modo in cui la marcatura semantica viene interpretata dalla
tecnologia assistiva, consulta l'[Introduzione alla
semantica](/web/fundamentals/accessibility/semantics-builtin/) per un
aggiornamento.

### Key points

- Controlla per tutte le immagini che il testo `alt` sia corretto. L'eccezione a
questa pratica è quando le immagini sono principalmente a scopo di presentazione
e non sono pezzi di contenuto essenziali. Per indicare che un'immagine deve
essere saltata da uno screen reader, imposta il valore dell'attributo `alt` su
una stringa vuota, ad es. `alt=””` .

- Controlla tutti i controlli per un'etichetta. Per i controlli personalizzati
questo può richiedere l'uso di `aria-label` o `aria-labelledby` . Vedi
[Etichette e relazioni
ARIA](/web/fundamentals/accessibility/semantics-aria/aria-labels-and-relationships)
come  esempio.

- Controllare tutti i controlli personalizzati per un `role` appropriato e tutti
gli attributi ARIA richiesti che conferiscono il loro stato. Ad esempio, una
casella di controllo personalizzata avrà bisogno di un `role=”checkbox”` e
`aria-checked=”true|false”` per trasmettere correttamente il suo stato. Vedere
[introduzione ad ARIA](/web/fundamentals/accessibility/semantics-aria/) per una
panoramica generale di come ARIA può fornire la semantica mancante per i
controlli personalizzati.

- The flow of information should make sense. Because screen readers navigate the
page in DOM order, if you’ve used CSS to visually reposition elements, they
may
be announced in a nonsensical sequence. If you need something to appear
earlier
    in the page, try to physically move it earlier in the DOM.

- Mira a supportare la navigazione di uno screen reader su tutto il contenuto
della pagina. Evita che parti del sito vengano nascoste o bloccate in modo
permanente dall'accesso con screen reader.

- If content *should* be hidden from a screen reader, for instance, if it’s
    offscreen or just presentational, make sure that content is set to
    `aria-hidden=”true”`. Take a look at the guide on [Hiding
content](/web/fundamentals/accessibility/semantics-aria/hiding-and-updating-content#aria-hidden)
    for further explanation.

### Familiarity with even one screen reader goes a long way

Sebbene possa sembrare scoraggiante imparare uno screen reader, in realtà sono
piuttosto facile da usare. In generale, la maggior parte degli sviluppatori può
cavarsela con pochi semplici comandi.

If you’re on a Mac check out [this video on using
VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6),
the screen reader that comes with Mac OS. If you’re on a PC check out [this
video on using
NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4),
a donation supported, open source screen reader for Windows.

### aria-hidden does not prevent keyboard focus

È importante capire che ARIA può influenzare solo la *semantica* di un elemento;
non ha alcun effetto sul *comportamento* dell'elemento. Mentre puoi rendere un
elemento nascosto agli screen reader con `aria-hidden=”true”` , ciò non cambia
il comportamento di messa a fuoco per quell'elemento. Per i contenuti
interattivi fuori schermo, dovrai spesso combinare `aria-hidden=”true”` e
`tabindex=”-1”` per assicurarti che sia veramente rimosso dal flusso della
tastiera. L'[attributo inert](https://github.com/WICG/inert) proposto mira a
semplificare questo problema combinando il comportamento di entrambi gli
attributi.

## Take advantage of headings and landmarks

<img src="imgs/ic_map_black_24px.svg" class="attempt-right" alt="" width="100">

I titoli e gli elementi di riferimento conferiscono alla pagina una struttura
semantica e aumentano notevolmente l'efficienza di navigazione degli utenti di
tecnologie assistive. Molti utenti di screen reader segnalano che, quando
atterrano per la prima volta su una pagina sconosciuta, di solito cercano di
[navigare per
titoli](http://www.heydonworks.com/article/responses-to-the-screen-reader-strategy-survey)
. Allo stesso modo, gli screen reader offrono anche la possibilità di saltare a
punti di riferimento importanti come `<main>` e `<nav>` . Per questi motivi è
importante considerare come la struttura della pagina può essere utilizzata per
guidare l'esperienza dell'utente.

### Key points

- Fare un uso corretto della gerarchia `h1-h6`. Pensa ai titoli come strumenti
per creare una struttura per la tua pagina. Non fare affidamento sullo stile
incorporato nei titoli; considera invece tutti i titoli come se fossero della
stessa dimensione e utilizza il livello semanticamente appropriato per il
contenuto primario, secondario e terziario. Quindi usa CSS per fare in modo che
i titoli corrispondano al tuo design.

- Utilizza elementi e ruoli dei punti di riferimento in modo che gli utenti
possano aggirare i contenuti ripetitivi. Molte tecnologie assistive forniscono
scorciatoie per passare a parti specifiche della pagina, come quelle definite
dagli elementi `<main>` o `<nav>` . Questi elementi hanno impliciti ruoli di
riferimento. È inoltre possibile utilizzare l'attributo ARIA `role` per definire
esplicitamente le regioni nella pagina, ad esempio `<div role=”search”>`. Vedi
la [guida su titoli e punti di
riferimento](/web/fundamentals/accessibility/semantics-builtin/navigating-content)
per ulteriori esempi.

- Evita `role=”application”` meno che tu non abbia una esperienza precedente di
lavoro con esso. Il ruolo del punto di riferimento `application` dirà alla
tecnologia assistiva di disabilitare i suoi collegamenti e passare tutti i tasti
premuti alla pagina. Ciò significa che gli utenti che utilizzano lo screen
reader in genere per spostarsi all'interno della pagina non funzioneranno più e
sarà necessario implementare *tutta* la gestione della tastiera.

### Revisionare rapidamente titoli e punti di riferimento con uno screen reader

Screen reader come VoiceOver e NVDA forniscono un menu contestuale per saltare a
regioni importanti della pagina. Se si sta eseguendo un controllo
dell'accessibilità, è possibile utilizzare questi menu per ottenere una rapida
panoramica della pagina e determinare se i livelli di intestazione sono
appropriati e quali riferimenti sono in uso. Per saperne di più dai un'occhiata
a questi video didattici sulle basi di
[VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&index=6&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
e
[NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4).

## Automate the process

<img src="imgs/ic_build_black_24px.svg" class="attempt-right" alt=""
width="100">

Manually testing a site for accessibility can be tedious and error prone.
Eventually you’ll want to automate the process as much as possible. This can be
done through the use of browser extensions, and command line accessibility test
suites.

### Key points

- La pagina supera tutti i test delle estensioni del browser
[aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)
o
[WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)?
Queste estensioni sono solo due opzioni disponibili e possono essere un'utile
aggiunta a qualsiasi processo di test manuale in quanto possono raccogliere
rapidamente problemi delicati come il mancato rapporto di contrasto e gli
attributi ARIA mancanti. Se si preferisci la riga di comando,
[axe-cli](https://github.com/dequelabs/axe-cli) fornisce le stesse funzionalità
dell'estensione del browser aXe, ma può essere facilmente eseguita dal proprio
terminale.

- Per evitare regressioni, specialmente in un ambiente di integrazione continua,
incorporare una libreria come [axe-core](https://github.com/dequelabs/axe-core)
nella suite di test automatizzata. axe-core è lo stesso motore che alimenta
l'estensione chrome aXe, ma in un programma da riga di comando di facile
esecuzione.

- Se stai usando un framework o una libreria, fornisce propri strumenti di
accessibilità? Alcuni esempi includono
[protractor-accessibility-plug-in](https://github.com/angular/protractor-accessibility-plugin/)
per Angular e
[a11ysuite](https://github.com/Polymer/web-component-tester#a11ysuite) per
Polymer e Web Components. Approfitta degli strumenti disponibili quando
possibile per evitare di reinventare la ruota.

### Se stai costruendo una Progressive Web App considera Lighthouse

<img src="imgs/lighthouse.png" class="attempt-right" alt="">

Lighthouse è uno strumento per misurare le prestazioni della tua progressive web
app, ma utilizza anche la libreria axe-core per alimentare una serie di test di
accessibilità. Se stai già utilizzando Lighthouse, tieni d'occhio i test di
accessibilità falliti nel tuo rapporto. La correzione di questi elementi
consentirà di migliorare l'esperienza utente complessiva del tuo sito.

## Conclusione

Rendere la revisione dell'accessibilità una parte regolare del processo del tuo
team e fare questi controlli in anticipo e spesso può contribuire a migliorare
l'esperienza generale di utilizzo del tuo sito. Ricorda, una buona accessibilità
equivale a un buon UX!

### Risorse aggiuntive

- [Web Accessibility by Google](https://bit.ly/web-a11y)
- [Accessibility Fundamentals](/web/fundamentals/accessibility/)
- [A11ycasts

    Translated by
{% include "web/_shared/contributors/lucaberton.html"
%}](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
