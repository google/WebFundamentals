project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Was ist neu in DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Zu den neuen Funktionen, die in Chrome 65 zu DevTools gehören, gehören:

* [** Lokale Überschreibungen **](#overrides)
* [Neue Eingabehilfen](#a11y)
* [Die Registerkarte ** Änderungen](#changes)
* [Neue SEO und Wirtschaftlichkeitsprüfungen](#audits)
* [Mehrere Aufnahmen im Panel ** Leistung](#recordings)
* [Zuverlässiges Code-Stepping mit Arbeitern und asynchronem Code](#stepping)

Lesen Sie weiter oder sehen Sie sich die Videoversion dieser Versionshinweise unten an.

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: Überprüfen Sie, welche Chrome-Version auf `chrome://version` ausgeführt wird. Wenn Sie eine frühere Version ausführen, sind diese Funktionen nicht vorhanden. Wenn Sie eine neuere Version ausführen, haben sich diese Funktionen möglicherweise geändert. Chrome aktualisiert automatisch alle sechs Wochen eine neue Hauptversion.

## Local überschreibt {: #overrides }

** Lokale Überschreibungen ** ermöglichen es Ihnen, Änderungen in DevTools vorzunehmen und diese Änderungen beim Laden der Seite beizubehalten. Zuvor gingen alle Änderungen in DevTools beim erneuten Laden der Seite verloren.
** Lokale Überschreibungen ** funktionieren für die meisten Dateitypen mit einigen Ausnahmen. Siehe [Einschränkungen](#overrides-limitations).

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</Figur>

Wie es funktioniert:

* Sie geben ein Verzeichnis an, in dem DevTools Änderungen speichern soll.
* Wenn Sie Änderungen in DevTools vornehmen, speichert DevTools eine Kopie der modifizierten Datei in Ihrem Verzeichnis.
* Wenn Sie die Seite neu laden, bedient DevTools die lokale, geänderte Datei und nicht die Netzwerkressource.

So richten Sie ** lokale Überschreibungen ** ein:

1. Öffnen Sie das Bedienfeld ** Quellen. 1. Öffnen Sie die Registerkarte ** Überschreibungen **.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Klicken Sie auf ** Setup-Überschreibungen **. 1. Wählen Sie das Verzeichnis, in dem Sie Ihre Änderungen speichern möchten. 1. Klicken Sie oben im Ansichtsfenster auf ** Zulassen **, damit DevTools Lese- und Schreibzugriff auf das Verzeichnis erhält. 1. Nehmen Sie Ihre Änderungen vor.

### Einschränkungen {: #overrides-limitations }

* DevTools speichert keine Änderungen, die in der ** DOM-Struktur ** des Bedienfelds ** Elemente vorgenommen wurden. Bearbeiten Sie stattdessen HTML im Bereich ** Quellen **.
* Wenn Sie CSS im Bereich ** Stile bearbeiten und die Quelle dieses CSS eine HTML-Datei ist, wird DevTools die Änderung nicht speichern. Bearbeiten Sie stattdessen die HTML-Datei im Bereich ** Quellen **.

### Zugehörige Funktionen {: #overrides-related }

* [Arbeitsbereiche][WS]. DevTools ordnet Netzwerkressourcen automatisch einem lokalen Repository zu. Wenn Sie Änderungen in DevTools vornehmen, wird diese Änderung auch in Ihrem lokalen Repository gespeichert.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## Die Registerkarte Änderungen {: #changes }

Verfolgen Sie Änderungen, die Sie lokal in DevTools vornehmen, über die neue Registerkarte ** Changes **.

<figure>  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</Figur>

## Neue Eingabehilfen {: #a11y }

Verwenden Sie den neuen Bereich ** Eingabehilfe **, um die Eingabehilfefunktionen eines Elements zu prüfen, und überprüfen Sie das Kontrastverhältnis der Textelemente im ** Farbwähler **, um sicherzustellen, dass sie für Benutzer mit Sehbehinderung oder Farbe zugänglich sind -vision Mängel.

### Eingabehilfe {: #a11y-pane }

Verwenden Sie den Bereich ** Eingabehilfen ** im Bereich ** Elemente **, um die Eingabehilfefunktionen des aktuell ausgewählten Elements zu untersuchen.

<figure>  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</Figur>

Sehen Sie sich die A11ycast-Datei von Rob Dodson an, indem Sie auf die Beschriftung unten klicken, um den Bereich ** Barrierefreiheit ** in Aktion zu sehen.

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### Kontrastverhältnis im Farbwähler {: #contrast }

Der [Farbwähler][CP] zeigt nun das Kontrastverhältnis von Textelementen an. Durch die Erhöhung des Kontrastverhältnisses von Textelementen wird Ihre Website für Benutzer mit Sehbehinderungen oder Farbfehlsichtigkeiten besser zugänglich. Unter [Farbe und Kontrast][contrast] erfahren Sie, wie sich das Kontrastverhältnis auf die Zugänglichkeit auswirkt.

Durch die Verbesserung des Farbkontrastes Ihrer Textelemente wird Ihre Website für <i>alle</i> Benutzer besser nutzbar. Mit anderen Worten, wenn Ihr Text grau mit einem weißen Hintergrund ist, ist es schwer für jeden zu lesen.

<figure>  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</Figur>

In ** Abbildung 5 ** bedeuten die zwei Häkchen neben ** 4.61 **, dass dieses Element das [erweiterte empfohlene Kontrastverhältnis (AAA)][enhanced]{:.external} erfüllt. Wenn es nur ein Häkchen hätte, würde das bedeuten, dass es das [minimale empfohlene Kontrastverhältnis (AA)][minimum]{:.external} erfüllt.

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Klicken Sie auf ** Mehr anzeigen ** ![Mehr anzeigen][SM]] {:.cdt-inl}, um den Abschnitt ** Kontrastverhältnis ** zu erweitern. Die weiße Linie im Feld ** Farbspektrum ** stellt die Grenze zwischen Farben dar, die das empfohlene Kontrastverhältnis erfüllen, und solchen, die dies nicht tun. Zum Beispiel, da die graue Farbe in
** Abbildung 6 ** entspricht den Empfehlungen, dh alle Farben unter der weißen Linie entsprechen auch den Empfehlungen.

<figure>  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</Figur>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Zugehörige Funktionen {: #contrast-related }

Das Bedienfeld ** Audits ** verfügt über eine automatische Prüfung der Barrierefreiheit, um dies sicherzustellen
* Jedes * Textelement auf einer Seite hat ein ausreichendes Kontrastverhältnis.

Sehen Sie [Run Lighthouse in Chrome DevTools][audit], oder sehen Sie sich die A11ycast unten an, um zu erfahren, wie Sie mit dem Bedienfeld ** Audits ** die Erreichbarkeit testen.

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## Neue Audits {: #audits }

Chrome 65 wird mit einer ganz neuen Kategorie von SEO-Audits und vielen neuen Performance-Audits ausgeliefert.

Note: Das Bedienfeld ** Audits ** wird von [Lighthouse][LH] betrieben. Chrome 64 läuft Lighthouse Version 2.5. Chrome 65 läuft Lighthouse Version 2.8. Dieser Abschnitt ist lediglich eine Zusammenfassung der Lighthouse-Updates von 2.6, 2.7 und 2.8.

### Neue SEO Audits {: #seo }

Wenn Sie sicherstellen, dass Ihre Seiten die einzelnen Prüfungen in der neuen ** SEO ** -Kategorie bestehen, können Sie Ihre Suchmaschinen-Rankings verbessern.

<figure>  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</Figur>

### Neue Leistungsaudits {: #performance }

Chrome 65 wird außerdem mit vielen neuen Leistungsprüfungen ausgeliefert:

* Die Bootzeit von JavaScript ist hoch
* Verwendet eine ineffiziente Cache-Richtlinie für statische Assets
* Vermeidet Seitenumleitungen
* Das Dokument verwendet Plugins
* CSS reduzieren
* Reduzieren Sie JavaScript

<aside class="key-point"> <b>Perf ist wichtig!</b> Nachdem Mynet die Geschwindigkeit beim Laden von Seiten um das Vierfache verbessert hatte, verbrachten Nutzer 43% mehr Zeit auf der Website, 34% mehr Seiten, Absprungraten um 24% und Umsatz um 25% pro Artikelseitenaufruf. <a href="/web/showcase/2017/mynet">Erfahren Sie mehr</a> . </aside>

<aside class="success"> <b>Spitze!</b> Wenn Sie die Ladegeschwindigkeit Ihrer Seiten verbessern möchten, aber nicht wissen, wo Sie anfangen sollen, versuchen Sie das <b>Audits-</b> Panel. Sie geben ihm eine URL und Sie erhalten einen detaillierten Bericht über viele verschiedene Möglichkeiten, wie Sie diese Seite verbessern können. <a href="/web/tools/lighthouse/#devtools">Fangen Sie an</a> . </aside>

### Andere Updates {: #audits-other }

* [Neue, manuelle Zugänglichkeitsprüfungen](/web/updates/2018/01/lighthouse#a11y)
* [Updates für das WebP-Audit][webp], um es mit anderen Bildformaten der nächsten Generation auszustatten
* [Wiedererreichen der Erreichbarkeitsbewertung][a11yscore]
* Wenn eine Prüfung auf Barrierefreiheit für eine Seite nicht anwendbar ist, wird diese Prüfung nicht mehr auf die Barrierefreiheit angerechnet
* Leistung ist jetzt der oberste Abschnitt in Berichten

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## Zuverlässiges Code-Stepping mit Workern und asynchronem Code {: #stepping }

Chrome 65 enthält Updates für die Schaltfläche ** Schritt in ** ![Schritt in][into]] {:.cdt-inl}, wenn Sie in Code wechseln, der Nachrichten zwischen Threads und asynchronem Code übergibt. Wenn Sie das vorherige Stepping-Verhalten wünschen, können Sie stattdessen die neue Schaltfläche ** Step ** ![Step][step]] {:.cdt-inl} verwenden.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### Eintreten in Code, der Nachrichten zwischen Threads {: #workers } weiterleitet

Wenn Sie in Code einsteigen, der Nachrichten zwischen Threads weitergibt, zeigt DevTools Ihnen nun an, was in jedem Thread passiert.

Beispielsweise übergibt die App in ** Abbildung 8 ** eine Nachricht zwischen dem Hauptthread und dem Arbeitsthread. Nach dem Einstieg in den `postMessage()` -Aufruf des Hauptthreads pausiert DevTools im `onmessage` -Handler im Worker-Thread. Der `onmessage` -Handler selbst sendet eine Nachricht zurück an den Haupt-Thread. Wenn Sie in diesen * Anruf * eintreten, wird DevTools im Hauptthread zurückgehalten.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</Figur>

Wenn Sie in früheren Chrome-Versionen auf Code wie diesen gegriffen haben, zeigte Ihnen Chrome nur die Haupt-Thread-Seite des Codes, wie Sie in ** Abbildung 9 ** sehen können.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</Figur>

### Übergang in den asynchronen Code {: #async }

Beim Übergang in asynchronen Code geht DevTools nun davon aus, dass Sie den asynchronen Code, der schließlich ausgeführt wird, anhalten möchten.

Zum Beispiel führt DevTools in ** Abbildung 10 ** nach dem Einstieg in `setTimeout()` den gesamten Code aus, der zu diesem Punkt hinter den Kulissen führt, und hält dann die Funktion an, die an `setTimeout()` übergeben wird.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</Figur>

Wenn Sie in Chrome 63 Code wie diesen eingingen, pausierte DevTools im Code, als er chronologisch lief, wie Sie in ** Abbildung 11 ** sehen können.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</Figur>

## Mehrere Aufnahmen im Performance-Panel {: #recordings }

Im Panel ** Leistung können Sie jetzt bis zu 5 Aufnahmen speichern. Die Aufnahmen werden gelöscht, wenn Sie Ihr DevTools-Fenster schließen. Siehe [Erste Schritte beim Analysieren der Runtime-Leistung][runtime], um sich mit dem Panel ** Leistung ** vertraut zu machen.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</Figur>

## Bonus: Automatisiere DevTools-Aktionen mit dem Puppenspieler 1.0 {: #puppeteer }

Note: Dieser Abschnitt bezieht sich nicht auf Chrome 65.

Version 1.0 von Puppeteer, einem Browser-Automatisierungstool, das vom Chrome DevTools-Team verwaltet wird, ist jetzt verfügbar. Sie können Puppeneer verwenden, um viele Aufgaben zu automatisieren, die zuvor nur über DevTools verfügbar waren, z. B. das Erfassen von Screenshots:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

Es hat auch APIs für viele allgemein nützliche Automatisierungsaufgaben, z. B. das Generieren von PDFs:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

Siehe [Schnellstart][quickstart], um mehr zu erfahren.

[quickstart]: /web/tools/puppeteer/get-started

Sie können Puppenspieler auch verwenden, um die DevTools-Funktionen beim Browsen freizulegen, ohne DevTools explizit zu öffnen. Ein Beispiel finden Sie unter [Verwenden von DevTools-Funktionen ohne Öffnen von DevTools][without].

[without]: /web/updates/2018/01/devtools-without-devtools

## Eine Anfrage des DevTools-Teams: Betrachten Sie Canary {: #canary }

Wenn Sie auf Mac oder Windows arbeiten, sollten Sie [Chrome Canary][canary] als Standardentwicklungsbrowser verwenden. Wenn Sie einen Fehler oder eine Änderung melden, die Ihnen nicht gefällt, während sie noch in Canary ist, kann das DevTools-Team Ihr Feedback deutlich schneller ansprechen.

Note: Canary ist die neueste Version von Chrome. Es wird veröffentlicht, sobald es gebaut wurde, ohne zu testen. Dies bedeutet, dass Canary von Zeit zu Zeit, etwa einmal im Monat, bricht und normalerweise innerhalb eines Tages repariert wird. Sie können Chrome Stable wieder verwenden, wenn Canary bricht.

[canary]: https://www.google.com/chrome/browser/canary.html

## Rückmeldung {: #feedback }

Der beste Ort, um über die Features oder Änderungen zu diskutieren, die Sie hier sehen, ist die [google-chrome-developer-tools@googlegroups.com Mailingliste][ML]. Sie können uns auch bei [@ChromeDevTools](https://twitter.com/chromedevtools) twittern, wenn Sie wenig Zeit haben. Wenn Sie sicher sind, dass Sie in DevTools einen Fehler gefunden haben, öffnen Sie bitte ein Problem (1).

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Frühere Versionshinweise {: #links }

Siehe das [devtools-whatsnew][tag] -Tag für Links zu allen früheren DevTools-Versionshinweisen.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}