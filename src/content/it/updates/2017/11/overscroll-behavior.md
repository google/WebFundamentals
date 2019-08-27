project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Introduzione alla proprietà CSS del comportamento di overscroll.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Assumi il controllo dello scorrimento: personalizzazione degli effetti pull-to-refresh e overflow {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

La proprietà [CSS
`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/) consente
agli sviluppatori di ignorare il comportamento di scorrimento di overflow
predefinito del browser quando raggiungono la parte superiore / inferiore del
contenuto. I casi d'uso includono la disabilitazione della funzione
pull-to-refresh sul dispositivo mobile, la rimozione di effetti di bagliore e di
scorrimento della gomma eccessivi e la prevenzione dello scorrimento del
contenuto della pagina quando si trova sotto un modale / overlay.

`overscroll-behavior` richiede Chrome 63+. È in fase di sviluppo o viene
considerato da altri browser. Vedi
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) per
ulteriori informazioni. {: .caution }

## sfondo

### Scorri i confini e scorri il concatenamento {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Scorri il concatenamento su Chrome Android.</figcaption>
</figure>

Lo scorrimento è uno dei modi più fondamentali per interagire con una pagina, ma
alcuni schemi UX possono essere difficili da gestire a causa dei bizzarri
comportamenti predefiniti del browser. Ad esempio, prendi un cassetto delle app
con un gran numero di elementi che l'utente potrebbe dover scorrere. Quando
raggiungono il fondo, il contenitore di overflow smette di scorrere perché non
c'è più contenuto da consumare. In altre parole, l'utente raggiunge un "limite
di scorrimento". Ma nota cosa succede se l'utente continua a scorrere. **Il
contenuto *dietro* il cassetto inizia a scorrere** ! Lo scorrimento viene
assunto dal contenitore padre; la pagina principale stessa nell'esempio.

Si scopre che questo comportamento si chiama **scroll concatenamento** ;
comportamento predefinito del browser durante lo scorrimento del contenuto.
Spesso l'impostazione predefinita è piuttosto carina, ma a volte non è
desiderabile o addirittura inaspettata. Alcune app potrebbero voler offrire
un'esperienza utente diversa quando l'utente raggiunge un limite di scorrimento.

### L'effetto pull-to-refresh {: #p2r }

Il pull-to-refresh è un gesto intuitivo reso popolare dalle app mobili come
Facebook e Twitter. Abbassare un feed social e rilasciare crea nuovo spazio per
il caricamento di post più recenti. In effetti, questa particolare UX è
diventata *così popolare* che i browser mobili come Chrome su Android hanno
adottato lo stesso effetto. Scorri verso il basso nella parte superiore della
pagina per aggiornare l'intera pagina:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Pull-to-refresh personalizzato di Twitter <br> durante
l'aggiornamento di un feed nel loro PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Chrome pull-to-refresh nativo di Android Android <br> aggiorna
l'intera pagina.</figcaption>
  </figure>
</div>

Per situazioni come la [PWA di](/web/progressive-web-apps/) Twitter, potrebbe
avere senso disabilitare l'azione pull-to-refresh nativa. Perché? In questa app,
probabilmente non vuoi che l'utente aggiorni accidentalmente la pagina. C'è
anche il potenziale per vedere una doppia animazione di aggiornamento! In
alternativa, potrebbe essere più bello personalizzare l'azione del browser,
allineandola più da vicino al marchio del sito. La parte sfortunata è che questo
tipo di personalizzazione è stato difficile da realizzare. Gli sviluppatori
finiscono per scrivere JavaScript non necessari, aggiungere listener touch [non
passivi](/web/tools/lighthouse/audits/passive-event-listeners) (che bloccano lo
scorrimento) o incollare l'intera pagina in un `<div>` 100vw / vh (per evitare
il trabocco della pagina). Queste soluzioni alternative hanno effetti negativi
[ben documentati](https://wicg.github.io/overscroll-behavior/#intro) sulle
prestazioni di scorrimento.

Possiamo fare di meglio!

## Presentazione `overscroll-behavior` {: #intro }

La [proprietà](https://wicg.github.io/overscroll-behavior/)
`overscroll-behavior` è una nuova funzionalità CSS che controlla il
comportamento di ciò che accade quando si scorre un contenitore in eccesso
(inclusa la pagina stessa). Puoi usarlo per annullare il concatenamento di
scorrimento, disabilitare / personalizzare l'azione pull-to-refresh,
disabilitare gli effetti di gommatura su iOS (quando Safari implementa il
`overscroll-behavior` ) e altro ancora. La parte migliore è che l' <strong
data-md-type="double_emphasis">uso `overscroll-behavior` non influisce
negativamente sulle prestazioni della pagina</strong> come gli hack citati
nell'introduzione!

La proprietà accetta tre possibili valori:

1. **auto** : impostazione predefinita. Le pergamene che hanno origine
sull'elemento possono propagarsi agli elementi antenati.

- **contenere** : impedisce il concatenamento di scorrimento. Le pergamene non
si propagano agli antenati ma vengono mostrati gli effetti locali all'interno
del nodo. Ad esempio, l'effetto bagliore di scorrimento eccessivo su Android o
l'effetto elastico su iOS che avvisa l'utente quando hanno raggiunto un limite
di scorrimento. **Nota** : utilizzando il `overscroll-behavior: contain`
sull'elemento `html` impedisce azioni di navigazione overscroll.
- **nessuno** - uguale a `contain` ma impedisce anche effetti di overscroll
all'interno del nodo stesso (ad es. bagliore di Android overscroll o gommatura
iOS).

Nota: il `overscroll-behavior` supporta anche le scorciatoie per
`overscroll-behavior-x` e `overscroll-behavior-y` se si desidera definire
comportamenti solo per un determinato asse.

Analizziamo alcuni esempi per vedere come usare il `overscroll-behavior` .

## Impedisci agli scroll di sfuggire a un elemento a posizione fissa {: #fixedpos }

### Lo scenario della chatbox {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
<figcaption>Scorre anche il contenuto sotto la finestra della chat
:(</figcaption>
</figure>

Considera una chatbox posizionata fissa che si trova nella parte inferiore della
pagina. L'intenzione è che la chat sia un componente autonomo e che scorra
separatamente dal contenuto dietro di essa. Tuttavia, a causa del concatenamento
dello scorrimento, il documento inizia a scorrere non appena l'utente preme
l'ultimo messaggio nella cronologia della chat.

Per questa app, è più appropriato che gli scroll che hanno origine nella chat
rimangano all'interno della chat. Possiamo farlo accadendo aggiungendo il
`overscroll-behavior: contain` all'elemento che contiene i messaggi di chat:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

In sostanza, stiamo creando una separazione logica tra il contesto di
scorrimento della chat e la pagina principale. Il risultato finale è che la
pagina principale rimane aperta quando l'utente raggiunge la parte superiore /
inferiore della cronologia della chat. Gli scroll che iniziano nella chat non si
propagano.

### Lo scenario di overlay di pagina {: #overlay }

Un'altra variante dello scenario "undercroll" è quando si vede scorrere il
contenuto dietro una **sovrapposizione di posizione fissa** . È
`overscroll-behavior` ! Il browser sta cercando di essere utile, ma finisce per
far sembrare il sito difettoso.

**Esempio** - modale con e senza `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Prima</b> : il contenuto della pagina scorre sotto la
sovrapposizione.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Dopo</b> : il contenuto della pagina non scorre sotto la
sovrapposizione.</figcaption>
  </div>
</figure>

## Disabilitazione del pull-to-refresh {: #disablp2r }

**La disattivazione dell'azione pull-to-refresh è una singola riga di CSS** .
Basta impedire il concatenamento dello scorrimento sull'intero elemento che
definisce la vista. Nella maggior parte dei casi, è `<html>` o `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Con questa semplice aggiunta, risolviamo le doppie animazioni pull-to-refresh
nella [demo](https://ebidel.github.io/demos/chatbox.html) della
[chatbox](https://ebidel.github.io/demos/chatbox.html) e possiamo invece
implementare un effetto personalizzato che utilizza un'animazione di caricamento
più ordinata. L'intera Posta in arrivo si sfoca anche quando la Posta in arrivo
si aggiorna:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Prima</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Dopo</figcaption>
  </div>
</figure>

Ecco un frammento del [codice
completo](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Disabilitazione degli effetti di bagliore eccessivo e del bendaggio della gomma {: #disableglow }

Per disabilitare l'effetto di rimbalzo quando si colpisce un limite di
scorrimento, utilizzare `overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>Prima</b> : colpire il limite di scorrimento mostra un
bagliore.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Dopo</b> : bagliore disabilitato.</figcaption>
  </div>
</figure>

Nota: ciò manterrà comunque la navigazione a sinistra / destra. Per impedire la
navigazione, puoi usare `overscroll-behavior-x: none` . Tuttavia, questo è
[ancora in fase di implementazione](https://crbug.com/762023) in Chrome.

## Demo completa {: #demo }

Mettendo tutto insieme, la [demo](https://ebidel.github.io/demos/chatbox.html)
completa della `overscroll-behavior` utilizza il `overscroll-behavior` di
`overscroll-behavior` per creare un'animazione pull-to-refresh personalizzata e
disabilitare gli `overscroll-behavior` del widget della chatbox. Ciò fornisce
un'esperienza utente ottimale che sarebbe stato difficile da ottenere senza
`overscroll-behavior` CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Visualizza demo</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">fonte</a></figcaption>
</figure>

<br>
