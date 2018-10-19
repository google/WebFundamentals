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

<div class="video-wrapper">  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Unterstützung für [`ResizeObservers` ](#resizeobserver), benachrichtigt Sie, wenn das Inhaltsrechteck eines Elements seine Größe geändert hat.
* Module können jetzt mit [import.meta](#import-meta) auf hostspezifische Metadaten zugreifen.
* Der [Popup-Blocker](#popup-blocker) wird stark.
* [`window.alert()` ](#window-alert) ändert nicht mehr den Fokus.

Und es gibt [viel mehr](#more)!

Ich bin Pete LePage. Sehen wir uns an, was für Entwickler in Chrome 64 neu ist!

<div class="clearfix"></div>

Note: Möchten Sie die vollständige Liste der Änderungen? Überprüfen Sie die [Chromium-Quellen-Repository-Änderungsliste](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140).

## `ResizeObserver` {: #resizeobserver }

Das Nachverfolgen, wenn sich die Größe eines Elements ändert, kann ein wenig schmerzhaft sein. Wahrscheinlich fügen Sie dem Ereignis `resize` des Dokuments einen Listener hinzu und rufen dann `getBoundingClientRect` oder `getComputedStyle` auf. Aber beide können Layout-Thrashing verursachen.

Und was, wenn das Browserfenster nicht die Größe ändert, sondern ein neues Element zum Dokument hinzugefügt wurde? Oder Sie haben `display: none` zu einem Element hinzugefügt? Beide können die Größe anderer Elemente innerhalb der Seite ändern.

`ResizeObserver` benachrichtigt Sie, wenn sich die Größe eines Elements ändert, und stellt die neue Höhe und Breite des Elements bereit, wodurch das Risiko von Layout-Thrashing verringert wird.

Wie bei anderen Beobachtern ist es ziemlich einfach, ein `ResizeObserver` -Objekt zu erstellen und einen Callback an den Konstruktor zu übergeben. Der Callback erhält ein Array von `ResizeOberverEntries` - ein Eintrag pro beobachtetem Element -, das die neuen Dimensionen für das Element enthält.

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

Check out [`ResizeObserver` : Es ist wie `document.onresize` für Elemente](/web/updates/2016/10/resizeobserver) für mehr Details und reale Beispiele.


## Verbesserter Popup-Blocker {: #popup-blocker }

Ich hasse Tab-Unders. Sie kennen sie, wenn eine Seite ein Pop-up zu einem Ziel öffnet UND die Seite navigiert. Normalerweise ist einer von ihnen eine Anzeige oder etwas, das Sie nicht wollten.

Ab Chrome 64 werden diese Navigationsarten blockiert, und Chrome zeigt dem Benutzer eine native Benutzeroberfläche an, mit der diese der Weiterleitung folgen können, wenn sie dies wünschen.


## `import.meta` {: #import-meta }

Wenn Sie JavaScript-Module schreiben, möchten Sie oft auf hostspezifische Metadaten über das aktuelle Modul zugreifen. Chrome 64 unterstützt nun die Eigenschaft `import.meta` innerhalb von Modulen und macht die URL für das Modul als `import.meta.url` verfügbar.

Dies ist sehr hilfreich, wenn Sie Ressourcen relativ zur Moduldatei im Gegensatz zum aktuellen HTML-Dokument auflösen möchten.


## Und mehr! {: #more }

Dies sind nur einige der Änderungen in Chrome 64 für Entwickler, natürlich gibt es noch viel mehr.

* Chrome unterstützt nun in regulären Ausdrücken [named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures) und [Unicode property escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes).
* Der Standardwert `preload` für `<audio>` - und `<video>` -Elemente lautet jetzt `metadata` . Dies bringt Chrome in Einklang mit anderen Browsern und hilft, die Bandbreite und die Ressourcennutzung zu reduzieren, indem nur die Metadaten und nicht die Medien selbst geladen werden.
* Sie können `Request.prototype.cache` jetzt verwenden, um den Cache-Modus eines `Request` anzuzeigen und zu bestimmen, ob es sich bei einer Anforderung um eine Neuladeanforderung handelt.
* Mithilfe der Focus-Management-API können Sie jetzt ein Element fokussieren, ohne mit dem `preventScroll` -Attribut dorthin zu scrollen.

## `window.alert()` {: #window-alert }

Oh, und noch eins! Das ist zwar kein "Entwickler-Feature", aber es macht mich glücklich. `window.alert()` bringt keine Hintergrund-Registerkarte mehr in den Vordergrund! Stattdessen wird die Warnung angezeigt, wenn der Benutzer zu dieser Registerkarte zurückwechselt.

Kein zufälliges Wechseln der Tabs mehr, weil etwas einen `window.alert` auf mich abgefeuert hat. Ich sehe dir den alten Google Kalender an.


Achten Sie darauf, [0] zu unserem [YouTube-Kanal](https://goo.gl/6FP1a5) zu abonnieren, und Sie erhalten eine E-Mail-Benachrichtigung, wenn wir ein neues Video starten oder unseren [RSS-Feed](https://www.youtube.com/user/ChromeDevelopers/) zu Ihrem Feed-Reader hinzufügen.


Ich bin Pete LePage, und sobald Chrome 65 veröffentlicht wird, bin ich hier, um Ihnen zu sagen, was ist neu in Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}