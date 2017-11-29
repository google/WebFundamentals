project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: I gestori di input sono una potenziale causa di problemi di prestazioni nelle tue app poiché possono bloccare il completamento dei frame e possono causare lavori di layout aggiuntivi e non necessari.

{# wf_updated_on: 2017-11-29 #}
{# wf_published_on: 2015-03-20 #}

# Ridurre i rimbalzi dei Gestori Di Input {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

I gestori di input sono una potenziale causa di problemi di prestazioni nelle
tue app, poiché possono bloccare il completamento dei frame e possono causare
lavori di layout aggiuntivi e non necessari.

### TL;DR {: .hide-from-toc }

- Evita gestori di input con durata lunga; possono bloccare lo scrolling.
- Non apportare modifiche di stile nei gestori di input.
- Ridurre i rimbalzi dei tuoi gestori; memorizza i valori degli eventi e
gestisci le modifiche di stile nella richiesta callback successiva di
requestAnimationFrame.

## Evita gestori di input con durata lunga

Il caso più veloce possibile è quando un utente interagisce con la pagina.  Il
thread di composizione pagina può prendere l'input touch dell'utente e
semplicemente spostarne il contenuto. Ciò non richiede alcun intervento da parte
del thread principale dove vengono eseguiti JavaScript, layout, stili o paint.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg"
alt="Lightweight scrolling; compositor only.">

Se tuttavia alleghi un gestore di input, come `touchstart` , `touchmove` o
`touchend` il thread di composizione deve attendere che questo gestore termini
l'esecuzione perché è possibile scegliere di chiamare `preventDefault()` e
interrompere lo scorrimento del tocco. Anche se non si chiama `preventDefault()`
il compositore deve attendere e pertanto lo scroll dell'utente viene bloccato il
che può causare rallentamenti e fotogrammi persi.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" alt="Heavy
scrolling; compositor is blocked on JavaScript.">

In breve dovresti assicurarti che qualsiasi gestore di input esegui venga
elaborato rapidamente e consentire al compositore di svolgere il proprio lavoro.

## Evita i cambiamenti di stile nei gestori di input

I gestori di input come quelli per lo scroll e il touch sono programmati per
essere eseguiti prima di ogni `requestAnimationFrame` callback.

Se apporti una modifica visiva all'interno di uno di questi gestori all'inizio
della `requestAnimationFrame` ci saranno cambiamenti di stile in sospeso. Se
leggi *quindi* le proprietà visive all'inizio della richiesta
requestAnimationFrame callback come suggerito in "[Evita layout grandi,
complessi e thrashing](avoid-large-complex-layouts-and-layout-thrashing) ",
attiverai una richiesta di layout sincrono forzato!

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" alt="Heavy
scrolling; compositor is blocked on JavaScript.">

## Ridurre i rimbalzi dei gestori di scorrimento

La soluzione ad entrambi i problemi di cui sopra è la stessa: devi sempre
rimbalzare le modifiche visive alla prossima richiesta `requestAnimationFrame`
callback :

```
function onScroll (evt) {

  // Store the scroll value for laterz.
  lastScrollY = window.scrollY;

  // Prevent multiple rAF callbacks.
  if (scheduledAnimationFrame)
    return;

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener('scroll', onScroll);
```

Facendo questo si ha anche il vantaggio di mantenere i gestori di input leggeri,
il che è fantastico perché ora non stai bloccando attività come lo scrolling o
il touch su un codice computazionalmente costoso!

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
