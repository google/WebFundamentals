---
title: "Kurzübersicht"
description: "Hier finden Sie eine kurze Übersicht über die Eigenschaften des Videoelements."
updated_on: 2014-04-29
---

<p class="intro">
  Hier finden Sie eine kurze Übersicht über die Eigenschaften des Videoelements.
</p>

{% include shared/toc.liquid %}


## Attribute des Videoelements

Eine vollständige Liste der Attribute des Videoelements samt Definitionen finden Sie in den [Spezifikationen zum Videoelement](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table class="mdl-data-table mdl-js-data-table">
  <thead>
      <th>Attribut</th>
      <th>Verfügbarkeit</th>
      <th>Beschreibung</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Attribut"><code>src</code></td>
      <td data-th="Verfügbarkeit">Alle Browser</td>
      <td data-th="Beschreibung">Adresse (URL) des Videos</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>poster</code></td>
      <td data-th="Verfügbarkeit">Alle Browser</td>
      <td data-th="Beschreibung">Adresse (URL) einer Bilddatei, die der Browser anzeigen kann, sobald das Videoelement erscheint. Der Videoinhalt muss nicht heruntergeladen werden.</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>preload</code></td>
      <td data-th="Verfügbarkeit">Das Preload-Attribut wird von allen mobilen Browsern ignoriert.</td>
      <td data-th="Beschreibung">Weist den Browser darauf hin, dass das Vorabladen von Metadaten oder Teilen des Videos vor der Wiedergabe erstrebenswert ist. Mögliche Optionen sind `none`, `metadata` oder `auto`. Weitere Details finden Sie im Abschnitt `Vorab laden`. </td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>autoplay</code></td>
      <td data-th="Verfügbarkeit">Wird auf dem iPhone und in Chrome für Android nicht unterstützt, jedoch in sämtlichen Desktop-Browsern, auf dem iPad sowie in Firefox und Opera für Android.</td>
      <td data-th="Description">Download und Wiedergabe werden schnellstmöglich gestartet (siehe Abschnitt `Automatische Wiedergabe`). </td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>loop</code></td>
      <td data-th="Verfügbarkeit">Alle Browser</td>
      <td data-th="Beschreibung">Das Video wird in einer Endlosschleife abgespielt.</td>
    </tr>
    <tr>
      <td data-th="Attribut"><code>controls</code></td>
      <td data-th="Verfügbarkeit">Alle Browser</td>
      <td data-th="Beschreibung">Die Standard-Steuerelemente werden angezeigt, etwa zur Wiedergabe oder zum Pausieren des Videos.</td>
    </tr>
  </tbody>
</table>

### Automatische Wiedergabe

Bei Verwendung von `autoplay` wird das Video in Desktop-Browsern schnellstmöglich heruntergeladen und abgespielt. Unter iOS und in Chrome für Android funktioniert `autoplay` nicht. Die Nutzer müssen zum Abspielen des Videos auf den Bildschirm tippen.

Auch auf Plattformen, auf denen das Autoplay-Attribut verwendet werden kann, sollten Sie überlegen, ob eine Aktivierung sinnvoll ist: 

* Datennutzung kann teuer sein.
* Wenn Medien ohne vorherige Zustimmung heruntergeladen und abgespielt werden, kann dies unerwartet Bandbreite und CPU-Leistung verschlingen und dabei das Rendern von Seiten verzögern.
* Nutzer befinden sich möglicherweise in einer Situation, in der das Abspielen von Video- oder Audioinhalten aufdringlich erscheint.

Die automatische Wiedergabe kann in der Android WebView über die [WebSettings-API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) konfiguriert werden.
Standardmäßig ist `true` festgelegt, die Option kann jedoch von einer WebView-App deaktiviert werden.

### Vorab laden

Das Attribut `preload` gibt dem Browser Auskunft darüber, wie viele Informationen oder Inhalte vorab geladen werden sollten.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th>Wert</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Wert"><code>none</code></td>
      <td data-th="Beschreibung">Der Nutzer sieht sich das Video möglicherweise überhaupt nicht an, sodass nichts vorab geladen werden sollte.</td>
    </tr>
    <tr>
      <td data-th="Wert"><code>metadata</code></td>
      <td data-th="Beschreibung">Metadaten wie Dauer, Größe und Texttracks sollten vorab geladen werden, wobei das Video selbst möglichst außen vor gelassen werden sollte.</td>
    </tr>
    <tr>
      <td data-th="Wert"><code>auto</code></td>
      <td data-th="Beschreibung">Der sofortige Download des gesamten Videos ist wünschenswert.</td>
    </tr>
  </tbody>
</table>

Das Attribut `preload` wirkt sich je nach Plattform unterschiedlich aus.
Auf Desktopgeräten puffert Chrome zum Beispiel 25 Sekunden des Videos, unter iOS oder Android erfolgt hingegen kein Puffern. Das bedeutet, dass die Wiedergabe auf Mobilgeräten im Vergleich zu Desktopgeräten möglicherweise verzögert beginnt. Alle Details hierzu finden Sie auf der [Testseite von Steve Souders](//stevesouders.com/tests/mediaevents.php).

## JavaScript

[Der HTML5 Rocks-Videoartikel](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) fasst die JavaScript-Eigenschaften, -Methoden und -Ereignisse, die für die Steuerung der Videowiedergabe verwendet werden können, auf übersichtliche und verständliche Weise zusammen. Diese Informationen, die wir, sofern relevant, durch für Mobilgeräte spezifische Details ergänzt haben, finden Sie im Folgenden.

### Eigenschaften

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Eigenschaft</th>
      <th>Beschreibung</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Eigenschaft"><code>currentTime</code></td>
      <td data-th="Beschreibung">Wiedergabeposition in Sekunden abrufen oder festlegen</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>volume</code></td>
      <td data-th="Beschreibung">Aktuelle Lautstärke für das Video abrufen oder festlegen</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>muted</code></td>
      <td data-th="Beschreibung">Stummschaltung abrufen oder festlegen</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>playbackRate</code></td>
      <td data-th="Beschreibung">Wiedergaberate abrufen oder festlegen, wobei 1 die Standardgeschwindigkeit ist, mit der das Video vorwärts abgespielt wird</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>buffered</code></td>
      <td data-th="Beschreibung">Informationen dazu, inwieweit das Video gepuffert wurde und abgespielt werden kann (siehe <a href="http://people.mozilla.org/~cpearce/buffered-demo.html" title="Demo displaying amount of buffered video in a canvas element">Demo</a>)</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>currentSrc</code></td>
      <td data-th="Beschreibung">Die Adresse des Videos, das zurzeit abgespielt wird</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>videoWidth</code></td>
      <td data-th="Beschreibung">Breite des Videos in Pixel, die von der Breite des Videoelements abweichen kann</td>
    </tr>
    <tr>
      <td data-th="Eigenschaft"><code>videoHeight</code></td>
      <td data-th="Beschreibung">Höhe des Videos in Pixel, die von der Höhe des Videoelements abweichen kann</td>
    </tr>
  </tbody>
</table>

Auf Mobilgeräten werden `playbackRate` ({% link_sample _code/scripted.html %}siehe Demo{% endlink_sample %}) und `volume` nicht unterstützt.

### Methoden

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Methode</th>
    <th>Beschreibung</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Methode"><code>load()</code></td>
      <td data-th="Beschreibung">Laden oder erneutes Laden einer Videoquelle, ohne dass die Wiedergabe gestartet wird, zum Beispiel, wenn das Videoattribut "src" mit JavaScript geändert wird</td>
    </tr>
    <tr>
      <td data-th="Methode"><code>play()</code></td>
      <td data-th="Beschreibung">Videowiedergabe an der aktuellen Position starten</td>
    </tr>
    <tr>
      <td data-th="Methode"><code>pause()</code></td>
      <td data-th="Beschreibung">Videowiedergabe an der aktuellen Position pausieren</td>
    </tr>
    <tr>
      <td data-th="Methode"><code>canPlayType('format')</code></td>
      <td data-th="Beschreibung">Informationen zu den unterstützten Formaten (siehe `Unterstützte Formate ermitteln`)</td>
    </tr>
  </tbody>
</table>

Auf Mobilgeräten - mit Ausnahme von Opera unter Android - funktionieren `play()` und `pause()` nur,
wenn eine Aktion des Nutzers vorausgegangen ist, etwa das Klicken auf eine Schaltfläche: {% link_sample _code/scripted.html %}Demo{% endlink_sample %}. Ebenso kann die Wiedergabe von Inhalten wie eingebetteten YouTube-Videos nicht ausgelöst werden.

### Ereignisse

Es kann nur ein Teil der Medienereignisse ausgelöst werden. Eine vollständige Liste finden Sie auf der Seite [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) (Medienereignisse) im Mozilla Developer Network.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <th>Ereignis</th>
      <th>Beschreibung</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Ereignis"><code>canplaythrough</code></td>
      <td data-th="Beschreibung">Wird ausgelöst, wenn der Browser aufgrund der verfügbaren Datenmenge der Ansicht ist, dass er das Video vollständig ohne Unterbrechung abspielen kann</td>
    </tr>
    <tr>
      <td data-th="Ereignis"><code>ended</code></td>
      <td data-th="Beschreibung">Wird ausgelöst, wenn die Wiedergabe des Videos beendet ist</td>
    </tr>
    <tr>
      <td data-th="Ereignis"><code>error</code></td>
      <td data-th="Beschreibung">Wird im Falle eines Fehlers ausgelöst</td>
    </tr>
    <tr>
      <td data-th="Ereignis"><code>playing</code></td>
      <td data-th="Beschreibung">Wird ausgelöst, wenn das Video zum ersten Mal abgespielt oder erneut gestartet wird bzw. nachdem es pausiert wurde</td>
    </tr>
    <tr>
      <td data-th="Ereignis"><code>progress</code></td>
      <td data-th="Beschreibung">Wird in regelmäßigen Abständen ausgelöst, um den Download-Fortschritt anzugeben</td>
    </tr>
    <tr>
      <td data-th="Ereignis"><code>waiting</code></td>
      <td data-th="Beschreibung">Wird ausgelöst, wenn eine Aktion verzögert ist, weil zunächst eine andere Aktion abgeschlossen werden muss</td>
    </tr>
    <tr>
      <td data-th="Ereignis"><code>loadedmetadata</code></td>
      <td data-th="Beschreibung">Wird ausgelöst, wenn der Browser die Metadaten des Videos geladen hat: Dauer, Größe und Texttracks</td>
    </tr>
  </tbody>
</table>



