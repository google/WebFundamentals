project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Neu in Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Unterstützung für [`ResizeObservers`](#resizeobserver) , benachrichtigt Sie, wenn das Inhaltsrechteck eines Elements seine Größe geändert hat.
* Module können jetzt mit [import.meta](#import-meta) Metadaten [import.meta](#import-meta) .
* Die [pop-up blocker](#popup-blocker) wird stark.
* [`window.alert()`](#window-alert) ändert nicht mehr den Fokus.

Und es gibt [plenty more](#more) !

Ich bin Pete LePage. Sehen wir uns an, was für Entwickler in Chrome 64 neu ist!

<div class="clearfix"></div>

Note: Möchten Sie die vollständige Liste der Änderungen sehen? Schau [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) die [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) .

## `ResizeObserver` {: #resizeobserver }

Das Nachverfolgen, wenn sich die Größe eines Elements ändert, kann ein wenig schmerzhaft sein. Wahrscheinlich verbinden Sie einen Listener mit dem `resize` Ereignis des Dokuments und `resize` dann `getBoundingClientRect` oder `getComputedStyle` . Aber beide können Layout-Thrashing verursachen.

Und was, wenn das Browserfenster nicht die Größe ändert, sondern ein neues Element zum Dokument hinzugefügt wurde? Oder du hast `display: none` zu einem Element hinzugefügt? Beide können die Größe anderer Elemente innerhalb der Seite ändern.

`ResizeObserver` benachrichtigt Sie, wenn sich die Größe eines Elements ändert, und bietet die neue Höhe und Breite des Elements, wodurch das Risiko von Layout-Thrashing verringert wird.

Wie bei anderen Beobachtern ist es ziemlich einfach, ein `ResizeObserver` Objekt zu erstellen und einen Callback an den Konstruktor zu übergeben. Der Callback erhält ein Array von `ResizeOberverEntries` - ein Eintrag pro beobachtetem Element -, das die neuen Dimensionen für das Element enthält.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

Weitere Einzelheiten und Beispiele aus der [`ResizeObserver`: It's like `document.onresize` for Elements](/web/updates/2016/10/resizeobserver) Sie unter [`ResizeObserver`: It's like `document.onresize` for Elements](/web/updates/2016/10/resizeobserver) .


## Verbesserter ## -Blocker {: #popup-blocker }

Ich hasse Tab-Unders. Sie kennen sie, wenn eine Seite ein Pop-up zu einem Ziel öffnet UND die Seite navigiert. Normalerweise ist einer von ihnen eine Anzeige oder etwas, das Sie nicht wollten.

Ab Chrome 64 werden diese Navigationsarten blockiert, und Chrome zeigt dem Benutzer eine native Benutzeroberfläche an, mit der diese der Weiterleitung folgen können, wenn sie dies wünschen.


## `import.meta` {: #import-meta }

Wenn Sie JavaScript-Module schreiben, möchten Sie oft auf hostspezifische Metadaten über das aktuelle Modul zugreifen. Chrome 64 unterstützt jetzt die `import.meta` Eigenschaft in Modulen und macht die URL für das Modul als `import.meta.url` .

Dies ist sehr hilfreich, wenn Sie Ressourcen relativ zur Moduldatei im Gegensatz zum aktuellen HTML-Dokument auflösen möchten.


## und mehr! {: #more }

Dies sind nur einige der Änderungen in Chrome 64 für Entwickler, natürlich gibt es noch viel mehr.

* Chrome unterstützt nun [named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures) und [Unicode property  escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) in regulären Ausdrücken.
* Der voreingestellte `preload` Wert für `<audio>` und `<video>` Elemente lautet jetzt `metadata` . Dies bringt Chrome in Einklang mit anderen Browsern und hilft, die Bandbreite und die Ressourcennutzung zu reduzieren, indem nur die Metadaten und nicht die Medien selbst geladen werden.
* Sie können jetzt `Request.prototype.cache` , um den Cache-Modus eines `Request` und zu bestimmen, ob es sich bei einer Anforderung um eine `Request` handelt.
* Mit der Focus-Management-API können Sie jetzt ein Element fokussieren, ohne mit dem `preventScroll` Attribut zu scrollen.

## `window.alert()` {: #window-alert }

Oh, und noch eins! Das ist zwar kein &quot;Entwickler-Feature&quot;, aber es macht mich glücklich. `window.alert()` bringt keine Hintergrund-Registerkarte mehr in den Vordergrund! Stattdessen wird die Warnung angezeigt, wenn der Benutzer zu dieser Registerkarte zurückwechselt.

Kein zufälliges Wechseln mehr, weil etwas `window.alert` auf mich abgefeuert hat. Ich sehe dir den alten Google Kalender an.


[subscribe](https://goo.gl/6FP1a5) Sie darauf, [subscribe](https://goo.gl/6FP1a5) zu unseren [YouTube channel](https://www.youtube.com/user/ChromeDevelopers/) , und Sie erhalten eine E-Mail-Benachrichtigung, wenn wir ein neues Video starten, oder fügen Sie unsere [RSS feed](/web/shows/rss.xml) zu Ihrem Feed-Reader.


Ich bin Pete LePage, und sobald Chrome 65 veröffentlicht wird, bin ich hier, um Ihnen zu sagen, was ist neu in Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}