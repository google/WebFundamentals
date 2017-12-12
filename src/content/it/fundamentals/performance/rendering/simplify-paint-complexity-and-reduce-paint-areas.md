project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Paint è il processo di riempimento dei pixel per l'eventuale composizione di immagini sugli schermi degli utenti. Spesso presenta un'esecuzione più lunga di tutte le altre attività in programma ed è quindi da evitare se possibile.

{# wf_updated_on: 2017-12-12 #}
{# wf_published_on: 2015-03-20 #}

# Semplifica la complessità di Paint e riduci le Aree di Paint {: .page-title}

{% include "web/_shared/contributors/paullewis.html" %}

Paint è il processo di riempimento dei pixel per l'eventuale composizione di
immagini sugli schermi degli utenti. Spesso presenta un'esecuzione più lunga
di tutte le altre attività in programma ed è quindi da evitare se possibile.

### TL;DR {: .hide-from-toc }

- La modifica di qualsiasi proprietà oltre a trasformazioni o opacità attiva
sempre il paint.
- Paint è spesso la parte più costosa della pipeline di pixel; evitalo quando
puoi.
- Riduci le aree di paint attraverso la promozione dei livelli e
l'orchestrazione delle animazioni.
- Usa il paint profiler di Chrome DevTools per valutare la complessità e il
costo di paint; riducila dove puoi.

## Attiva Layout e Paint

Attivando il layout, *attivi sempre* il paint poiché la modifica della
geometria di un elemento comporta anche la correzione dei pixel!

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg"
alt="The full pixel pipeline.">

Puoi anche attivare il paint se modifichi le proprietà non geometriche, come
sfondi, colore del testo o ombre. In quei casi il layout non sarà necessario e
la pipeline sarà simile a questa:

<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg"
alt="The pixel pipeline without layout.">

## Utilizza Chrome DevTools per identificare rapidamente i colli di bottiglia di paint

<div class="attempt-right">
  <figure>
<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg"
alt="The show paint rectangles option in DevTools.">
  </figure>
</div>

Puoi utilizzare Chrome DevTools per identificare rapidamente le aree che vengono
dipinte. Vai a DevTools e premi il tasto Esc sulla tastiera. Vai alla scheda
Rendering nel pannello visualizzato e seleziona Show paint rectangles.

<div style="clear:both;"></div>

Con questa opzione attivata Chrome evidenzierà in verde sullo schermo ogni volta
che si verifica un paint. Se vedi lampeggiare in verde l'intero schermo
o aree dello schermo che non pensavi dovessero essere dipinte allora dovresti
approfondire un po'.

<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg"
alt="The page flashing green whenever painting occurs.">

<div class="attempt-right">
  <figure>
<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg"
alt="The toggle to enable paint profiling in Chrome DevTools.">
  </figure>
</div>

C'è un'opzione nella timeline di Chrome DevTools che ti darà più informazioni:
un paint profiler. Per abilitarla vai sulla Timeline ed abilita la casella
Paint in alto. È importante *attivarlo solo quando desideri analizzare i
problemi relativi al paint* , poiché comporta un sovraccarico e distorce il
profiling delle prestazioni. È meglio usarlo quando vuoi maggiori informazioni
su cosa viene disegnato esattamente.

<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg"
alt="The button to bring up the paint profiler." class="screenshot">
  </figure>
</div>

Da qui è ora possibile eseguire una registrazione della timeline ed i record di
paint porteranno molti più dettagli. Facendo click su un record di paint in un
frame ora avrai accesso al Paint Profiler per quel frame:

<div style="clear:both;"></div>

Facendo clic sul paint profiler viene mostrata una visualizzzione in cui puoi
vedere cosa è stato disegnato, quanto tempo è trascorso e le singole chiamate di
paint richieste:

<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg"
alt="Chrome DevTools Paint Profiler.">

Questo profiler ti consente di conoscere sia l'area che la complessità (che
rappresenta il tempo necessario per il disegno) ed entrambe sono aree che puoi
cercare di risolvere, se evitare di dipingere non è un'opzione.

## Promuovi elementi con movimento o dissolvenza

Il Paint non viene sempre eseguito per singola immagine in memoria. In effetti è
possibile che il browser disegni più immagini o livelli di composizione se
necessario.

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg"
alt="A representation of compositor layers.">

Il vantaggio di questo approccio è che gli elementi ridisegnati
regolarmente, o che si spostano sullo schermo a causa delle trasformazioni,
possono essere gestiti senza influenzare altri elementi. È lo stesso dei
pacchetti grafici come Sketch, GIMP o Photoshop, in cui i singoli livelli possono
essere gestiti e composti l'uno sopra l'altro per creare l'immagine finale.

Il modo migliore per creare un nuovo livello è utilizzare la proprietà CSS
`will-change`. Funziona in Chrome, Opera e Firefox e, con un valore `transform`,
creerà un nuovo livello di composizione:

```
.moving-element {
  will-change: transform;
}
```

Per i browser che non supportano `will-change` ma beneficiano della creazione di
livelli, come Safari e Mobile Safari, è necessario utilizzare (incorrettamente)
una trasformazione 3D per forzare un nuovo livello:

```
.moving-element {
  transform: translateZ(0);
}
```

Bisogna tuttavia fare attenzione a non creare troppi livelli poiché ogni livello
richiede sia memoria che gestione. Vi sono ulteriori informazioni su questo
argomento nella sezione [Attieniti alle proprietà di sola composizione e al
conteggio della gestione
livelli](stick-to-compositor-only-properties-and-manage-layer-count).

Se hai alzato di livello un elemento, usa DevTools per confermare che
questo ti dia un vantaggio in termini di prestazioni. **Non promuovere elementi
senza profiling.**

## Riduci le aree di paint

A volte, nonostante l'avanzamento degli elementi, il lavoro di paint è
ancora necessario. Una delle maggiori problematiche relative al paint è che
i browser uniscono insieme due aree che richiedono il paint con il risultato di
eseguire una modifica al disegno dell'intero schermo. Ad esempio, se hai
un'intestazione fissa nella parte superiore della pagina e qualcosa viene
dipinto nella parte inferiore dello schermo, l'intero schermo potrebbe essere
ridisegnato.

Note: sugli schermi ad alto DPI gli elementi che sono in posizione fissa vengono
automaticamente fatti avanzare al rispettivo livello di composizione. Questo non
è il caso dei dispositivi a basso DPI perché l'avanzamento cambia il rendering
del testo da subpixel a gradazioni di grigio e l'avanzamento di livello deve
essere eseguito manualmente.

Ridurre le aree di paint spesso significa gestire le animazioni e le
transizioni in modo che non si sovrappongano più di tanto o trovare modi per
evitare di animare alcune parti della pagina.

## Semplifica la complessità di paint

<div class="attempt-right">
  <figure>
<img
src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg"
alt="The time taken to paint part of the screen.">
  </figure>
</div>

Quando si tratta di painting, alcune cose richiedono più risorse di altre. Ad
esempio, qualsiasi cosa che implichi una sfocatura (come un'ombra ad esempio)
richiederà più tempo del disegno di una casella rossa. In
termini di CSS tuttavia questo non è sempre ovvio: `background: red;` e
`box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);` non sembra necessariamente che
abbiano caratteristiche di performance molto diverse ma è così.

Il paint profiler di cui abbiamo paralto ti permetterà di determinare se devi
cercare altri modi per ottenere un effetto. Chiediti se è possibile utilizzare
una serie più economica di stili o mezzi alternativi per raggiungere il
risultato finale.

Dove possibile puoi sempre evitare di disegnare durante le animazioni in
particolare, dato che i **10 ms** che hai per frame normalmente non sono
abbastanza lunghi per il lavoro di paint, specialmente sui dispositivi
mobili.

Translated by
{% include "web/_shared/contributors/lucaberton.html" %}
