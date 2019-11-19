project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Hier erfahren Sie, wie Sie Videoinhalte ganz einfach zu Ihrer Website hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät.

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-04-28 #}

# Video {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="j5fYOYrsocs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Nutzer mögen Videos. Sie können lustig und gleichzeitig informativ sein. Auf Mobilgeräten lassen sich Informationen in Form von Videos meist einfacher konsumieren. Aber Videos verbrauchen Bandbreite und funktionieren je nach Plattform unterschiedlich gut. Nutzer mögen es nicht, wenn ein Video ewig lädt oder beim Drücken der Wiedergabetaste nichts passiert. Hier erfahren Sie, wie Sie Ihrer Website Videoinhalte ganz einfach hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät.



<div class="clearfix"></div>

## Video hinzufügen 




Hier erfahren Sie, wie Sie Videoinhalte ganz einfach zu Ihrer Website hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät.



### TL;DR {: .hide-from-toc }
- Verwenden Sie das Videoelement zum Laden, Decodieren und Abspielen von Videos auf Ihrer Website.
- Erstellen Sie die Videoinhalte in verschiedenen Formaten, um eine Reihe mobiler Plattformen abzudecken.
- Achten Sie auf die richtige Größe der Videos, damit diese nicht ihre Container sprengen.
- Achten Sie auf Zugänglichkeit. Fügen Sie das Track-Element hinzu und ordnen Sie es dem Videoelement unter.


### Videoelement hinzufügen

- Verwenden Sie das Videoelement zum Laden, Decodieren und Abspielen von Videos auf Ihrer Website:

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4" type="video/mp4">
  <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>


    <video src="chrome.webm" type="video/webm">
        <p>Ihr Browser unterstützt das Videoelement nicht.</p>
    </video>
    

### Mehrere Dateiformate angeben

Nicht alle Browser unterstützen dieselben Videoformate.
Mithilfe des `<source>`-Elements können Sie mehrere Formate als Ausweichmöglichkeit angeben, falls der Browser des Nutzers eines der Formate nicht unterstützt.
Beispiel:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/video-main.html" region_tag="sourcetypes" adjust_indentation="auto" %}
</pre>

Beim Parsen der `<source>`-Tags durch den Browser wird anhand des optionalen Attributs `type` ermittelt, welche Datei heruntergeladen und wiedergegeben werden soll. Wenn der Browser WebM unterstützt, spielt er die Datei `chrome.webm` ab, andernfalls wird überprüft, ob MPEG-4-Videos abgespielt werden können.
Weitere Informationen dazu, wie Video- und Audioinhalte im Web funktionieren, finden Sie unter <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a>  (Leitfaden zu digitalen Medien für Computerfreaks).

Dieser Ansatz bietet mehrere Vorteile im Vergleich zu verschiedenen HTML-Standards oder serverseitigen Skripts, besonders im Hinblick auf Mobilgeräte:

* Entwickler können Formate in der bevorzugten Reihenfolge anordnen.
* Durch die native clientseitige Umschaltung wird die Latenz verringert. Es wird nur eine Anforderung zum Abrufen des Inhalts gesendet.
* Die Wahl eines Formats durch den Browser ist einfacher, schneller und unter Umständen zuverlässiger als die Verwendung einer serverseitigen Supportdatenbank mit User-Agent-Erkennung.
* Durch die Angabe des Typs jeder Dateiquelle wird die Netzwerkleistung verbessert. Der Browser kann eine Videoquelle auswählen, ohne einen Teil des Videos herunterladen zu müssen, um das Format zu ermitteln.

Diese Punkte spielen vor allem in mobilen Kontexten eine wichtige Rolle, wo Bandbreite und Latenz höchste Priorität haben und die Geduld der Nutzer meist schnell am Ende ist. 
Der Verzicht auf ein Type-Attribut kann sich im Falle mehrerer Quellen mit nicht unterstützten Typen auf die Leistung auswirken.

Vergleichen Sie anhand der Entwicklertools für Ihren mobilen Browser die Netzwerkaktivität <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">mit</a> und <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/notype.html">ohne Type-Attribute</a>.
Darüber hinaus sollten Sie die Antwortheader in den Entwicklertools für Ihren Browser überprüfen, um [sicherzustellen, dass Ihr Server den richtigen MIME-Typ zurückgibt](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). Andernfalls lässt sich nicht überprüfen, um welche Art von Videoquelle es sich handelt.

## Start- und Endzeit festlegen

Sparen Sie Bandbreite und machen Sie Ihre Website reaktionsschneller, indem Sie dem Videoelement mithilfe der Media Fragments-API eine Start- und Endzeit hinzufügen.

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.webm#t=5,10" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4#t=5,10" type="video/mp4">
  <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>

Zum Hinzufügen eines Medienfragments fügen Sie der Medien-URL einfach `#t=[start_time][,end_time]` hinzu. Wenn das Video zum Beispiel von Sekunde 5 - 10 abgespielt werden soll, geben Sie Folgendes an:


    <source src="video/chrome.webm#t=5,10" type="video/webm">
    

Mithilfe der Media Fragments-API können Sie auch mehrere Ansichten desselben Videos bereitstellen - ähnlich wie Cue-Punkte bei einer DVD - ohne mehrere Dateien codieren und bereitstellen zu müssen.

Note: - Die Media Fragments-API wird auf den meisten Plattformen mit Ausnahme von iOS unterstützt.
- Vergewissern Sie sich, dass Ihr Server Bereichsanforderungen unterstützt. Bereichsanforderungen sind auf den meisten Servern standardmäßig aktiviert, einige Hostingdienste können diese jedoch deaktivieren.


Suchen Sie mithilfe der Entwicklertools für Ihren Browser in den Antwortheadern nach `Accept-Ranges: bytes`:

<img class="center" alt="Screenshot der Chrome-Entwicklertools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

### Posterbild hinzufügen

Fügen Sie dem Videoelement ein Poster-Attribut hinzu, damit Ihre Nutzer bereits beim Laden des Elements wissen, worum es in dem Video geht, ohne es herunterladen oder die Wiedergabe starten zu müssen.


    <video poster="poster.jpg" ...>
      ...
    </video>
    

Ein Poster kann auch eine Ausweichmöglichkeit sein, falls das Attribut `src` des Videos beschädigt ist oder keines der bereitgestellten Videoformate unterstützt wird. Der einzige Nachteil bei Posterbildern ist die zusätzliche Dateianforderung, die etwas Bandbreite verbraucht und Rendering erfordert. Weitere Informationen finden Sie unter [Bildoptimierung](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Hier sehen Sie eine Gegenüberstellung von Videos mit und ohne Posterbild. Wir haben das Posterbild grau dargestellt, um deutlich zu machen, dass es sich nicht um das Video handelt:



<img class="attempt-left" alt="Android Chrome-Screenshot, Hochformat: ohne Poster" src="images/Chrome-Android-video-no-poster.png">
<img class="attempt-right" alt="Android Chrome-Screenshot, Hochformat: mit Poster" src="images/Chrome-Android-video-poster.png">

<div class="clearfix"></div>


## Alternativen für veraltete Plattformen anbieten 




Nicht alle Videoformate werden auf allen Plattformen unterstützt. Informieren Sie sich, welche Formate auf den gängigen Plattformen unterstützt werden, und stellen Sie sicher, dass sich Ihr Video dort abspielen lässt.



### Unterstützte Formate ermitteln

Mit `canPlayType()` können Sie herausfinden, welche Videoformate unterstützt werden. Bei dieser Methode wird auf der Grundlage eines Zeichenfolgenarguments bestehend aus `mime-type` und optionalen Codecs einer der folgenden Werte zurückgegeben:

<table>
  <thead>
    <tr>
      <th>Zurückgegebener Wert</th>
      <th>Beschreibung</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Zurückgegebener Wert">(leere Zeichenfolge)</td>
      <td data-th="Beschreibung">Der Container bzw. Codec wird nicht unterstützt.</td>
    </tr>
    <tr>
      <td data-th="Zurückgegebener Wert"><code>maybe</code></td>
      <td data-th="Beschreibung">
        Container und Codec(s) werden möglicherweise unterstützt, der Browser
        muss jedoch einen Teil des Videos herunterladen, um dies zu überprüfen.
      </td>
    </tr>
    <tr>
      <td data-th="Zurückgegebener Wert"><code>probably</code></td>
      <td data-th="Beschreibung">Das Format wird anscheinend unterstützt.
      </td>
    </tr>
  </tbody>
</table>

Im Folgenden finden Sie einige Beispiele für `canPlayType()`-Argumente und zurückgegebene Werte in Chrome:


<table>
  <thead>
    <tr>
      <th>Typ</th>
      <th>Antwort</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Typ"><code>video/xyz</code></td>
      <td data-th="Antwort">(leere Zeichenfolge)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/xyz; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Antwort">(leere Zeichenfolge)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/xyz; codecs="nonsense, noise"</code></td>
      <td data-th="Antwort">(leere Zeichenfolge)</td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/mp4; codecs="avc1.42E01E, mp4a.40.2"</code></td>
      <td data-th="Antwort"><code>probably</code></td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/webm</code></td>
      <td data-th="Antwort"><code>maybe</code></td>
    </tr>
    <tr>
      <td data-th="Typ"><code>video/webm; codecs="vp8, vorbis"</code></td>
      <td data-th="Antwort"><code>probably</code></td>
    </tr>
  </tbody>
</table>


### Videos in mehreren Formaten erstellen

Es gibt viele Tools, mit denen Sie dasselbe Video in unterschiedlichen Formaten speichern können:

* Desktop-Tools: [FFmpeg](//ffmpeg.org/)
* GUI-Anwendungen: [Miro](//www.mirovideoconverter.com/), [HandBrake](//handbrake.fr/), [VLC](//www.videolan.org/)
* Onlinedienste zur Codierung/Transcodierung: [Zencoder](//en.wikipedia.org/wiki/Zencoder), [Amazon Elastic Encoder](//aws.amazon.com/elastictranscoder)

### Verwendetes Format ermitteln

Sie möchten wissen, für welches Videoformat sich der Browser letztlich entschieden hat?

In JavaScript können Sie anhand der Eigenschaft `currentSrc` des Videos feststellen, welche Quelle verwendet wurde.

Wie das in der Praxis aussieht, erfahren Sie in <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/video-main.html">dieser Demo</a>: Chrome und Firefox haben sich für `chrome.webm` entschieden, weil diese Datei in der Liste der potenziell von diesen Browsern unterstützten Quellen ganz oben steht, während Safari `chrome.mp4` ausgewählt hat.


## Videogröße richtig wählen 




Für die Zufriedenheit der Nutzer spielt die Größe eine wichtige Rolle.


### TL;DR {: .hide-from-toc }
- Achten Sie darauf, dass Framegröße und Qualität Ihrer Videos nicht die Möglichkeiten der Plattform übersteigen.
- Machen Sie Ihre Videos nicht länger als unbedingt nötig.
- Lange Videos können beim Download und bei der Suche zu Problemen führen. Einige Browser müssen unter Umständen warten, bis das Video heruntergeladen wurde, bevor sie es abspielen können.


### Videogröße ermitteln

Die tatsächlich codierte Framegröße des Videos kann von den Abmessungen des Videoelements abweichen, ebenso wie ein Bild möglicherweise nicht in seiner tatsächlichen Größe angezeigt wird.

Die codierte Größe eines Videos lässt sich anhand der Eigenschaften `videoWidth` und `videoHeight` des Videoelements ermitteln. `width` und `height` geben die Größe des Videoelements zurück, die möglicherweise anhand von CSS oder Inline-Breiten- und -Höhenattributen festgelegt wurde.

### Sicherstellen, dass Videos nicht die Größe der Container sprengen

Wenn Videoelemente für den Darstellungsbereich zu groß sind, sprengen sie möglicherweise die Größe der Container. Die Folge: Nutzer können sich weder den Inhalt ansehen noch
die Steuerelemente nutzen.


<img class="attempt-left" alt="Screenshot von Chrome für Android, Hochformat: Größe des Videoelements ohne CSS übersteigt Darstellungsbereich" src="images/Chrome-Android-portrait-video-unstyled.png">
<img class="attempt-right" alt="Screenshot von Chrome für Android, Querformat: Größe des Videoelements ohne CSS übersteigt Darstellungsbereich" src="images/Chrome-Android-landscape-video-unstyled.png">

<div class="clearfix"></div>


Die Videogröße lässt sich mit JavaScript oder CSS steuern. JavaScript-Bibliotheken und Plug-ins wie [FitVids](//fitvidsjs.com/) ermöglichen die Beibehaltung der richtigen Größe und des richtigen Formats, selbst für Flash-Videos von YouTube und anderen Quellen.

Mithilfe von [CSS-Medienabfragen](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) lässt sich die Größe von Elementen je nach Größe des Darstellungsbereichs angeben. Mit `max-width: 100%` liegen Sie nie falsch.

Für Medieninhalte in iframes, zum Beispiel YouTube-Videos, sollten Sie einen responsiven Ansatz wie den von [John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)) versuchen.

Note: Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="styling" adjust_indentation="auto" %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/responsive_embed.html" region_tag="markup" adjust_indentation="auto" %}
</pre>

Vergleichen Sie das Beispiel <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/responsive_embed.html">mit</a> und ohne <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/unyt.html">Responsive Webdesign</a>.


## Videoplayer anpassen 

Videos werden je nach Plattform unterschiedlich dargestellt. Bei Lösungen für Mobilgeräte muss die Geräteausrichtung berücksichtigt werden. Verwenden Sie die Fullscreen-API, um die Vollbildansicht von Videoinhalten zu steuern.

### Wie die Geräteausrichtung geräteübergreifend funktioniert

Bei Desktopmonitoren oder Laptops ist die Geräteausrichtung kein Thema. Anders sieht das jedoch bei Webseiten für Mobilgeräte und Tablets aus. 

Safari auf dem iPhone schaltet gut zwischen Hoch- und Querformat um:


<img class="attempt-left" alt="Screenshot einer Videowiedergabe in Safari auf dem iPhone, Hochformat" src="images/iPhone-video-playing-portrait.png">
<img class="attempt-right" alt="Screenshot einer Videowiedergabe in Safari auf dem iPhone, Querformat" src="images/iPhone-video-playing-landscape.png">

<div class="clearfix"></div>


Auf einem iPad und in Chrome unter Android kann die Geräteausrichtung hingegen problematisch sein.
Zum Beispiel sieht eine Videowiedergabe ohne jegliche Anpassung auf einem iPad im Querformat so aus:

<img class="center" alt="Screenshot einer Videowiedergabe in Safari auf einem iPad mit Retina-Display, Querformat" src="images/iPad-Retina-landscape-video-playing.png">

Durch Verwendung von `width: 100%` oder `max-width: 100%` in CSS lassen sich viele Layoutprobleme in Verbindung mit der Geräteausrichtung lösen. Darüber hinaus sollten Sie eventuell auch Vollbildalternativen in Betracht ziehen.

## Inline- oder Vollbildanzeige

Videos werden je nach Plattform unterschiedlich dargestellt. In Safari auf einem iPhone wird ein Videoelement inline auf einer Webseite angezeigt, die Wiedergabe erfolgt jedoch im Vollbildmodus:

<img class="center" alt="Screenshot eines Videoelements auf dem iPhone, Hochformat" src="images/iPhone-video-with-poster.png">

Unter Android können Nutzer den Vollbildmodus durch Klicken auf das entsprechende Symbol auswählen. Die Inline-Anzeige ist jedoch bei der Videowiedergabe Standard:

<img class="center" alt="Screenshot einer Videowiedergabe in Chrome unter Android, Hochformat" src="images/Chrome-Android-video-playing-portrait-3x5.png">

In Safari auf einem iPad erfolgt die Videowiedergabe inline:

<img class="center" alt="Screenshot einer Videowiedergabe in Safari auf einem iPad mit Retina-Display, Querformat" src="images/iPad-Retina-landscape-video-playing.png">

### Vollbildansicht von Inhalten steuern

Bei Plattformen, die die Videowiedergabe im Vollbildmodus nicht erzwingen, wird die Fullscreen-API [weitestgehend unterstützt](//caniuse.com/fullscreen). Verwenden Sie diese API, um die Vollbildansicht von Inhalten oder der Seite zu steuern.

Zur Vollbildansicht eines Elements, z. B. video:

    elem.requestFullScreen();
    

Zur Vollbildansicht des gesamten Dokuments:

    document.body.requestFullScreen();
    

Änderungen am Vollbildmodus können Sie auch hören:

    video.addEventListener("fullscreenchange", handler);
    

Oder überprüfen Sie, ob sich das Element derzeit im Vollbildmodus befindet:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Die Art und Weise, wie Elemente im Vollbildmodus angezeigt werden, können Sie auch mithilfe der CSS-Pseudoklasse `:fullscreen` ändern. 

Auf Geräten, die die Fullscreen-API unterstützen, sollten Sie die Verwendung von Miniaturansicht-Bildern als Platzhalter für Videos in Betracht ziehen:

<video autoplay loop class="center">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.webm" type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/fullscreen.mp4" type="video/mp4">
     <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>

In dieser <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/fullscreen.html">Demo</a> erfahren Sie, wie das Ganze in der Praxis aussieht.

Note: `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.


## Warum Zugänglichkeit wichtig ist 




Zugänglichkeit ist keine Funktion. Nutzer, die nicht hören oder sehen können, sind nicht in der Lage, sich ein Video ohne Untertitel oder Beschreibungen anzusehen. Der Zeitaufwand für das Hinzufügen solcher Untertitel oder Beschreibungen steht in keinem Verhältnis zu der schlechten Erfahrung, die Sie Ihren Nutzern bieten, wenn Sie darauf verzichten. Für alle Nutzer sollte zumindest ein Grundmaß an Nutzerfreundlichkeit gegeben sein.




### Untertitel für eine bessere Zugänglichkeit hinzufügen

Um Medien auf Mobilgeräten besser zugänglich zu machen, fügen Sie Untertitel oder Beschreibungen mithilfe des Track-Elements hinzu.

Note: Das Track-Element wird in Chrome für Android, iOS Safari sowie allen aktuellen Desktop-Browsern mit Ausnahme von Firefox (siehe <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>) unterstützt. Darüber hinaus sind auch mehrere Polyfiller verfügbar. Wir empfehlen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> oder <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

Bei Verwendung des Track-Elements sehen die Untertitel wie folgt aus:

 <img class="center" alt="Screenshot mit Untertiteln, die unter Verwendung des Track-Elements in Chrome für Android angezeigt werden" src="images/Chrome-Android-track-landscape-5x3.jpg">

### Track-Element hinzufügen

Es ist ganz einfach, Ihr Video mit Untertiteln zu versehen - Sie müssen lediglich ein Track-Element hinzufügen, das dem Videoelement untergeordnet ist:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/media/_code/track.html" region_tag="track" adjust_indentation="auto" %}
</pre>

Das Attribut `src` des Track-Elements enthält den Speicherort der Track-Datei.

### Untertitel in Track-Datei definieren

Eine Track-Datei besteht aus zeitlich festgelegten Cues im WebVTT-Format:

    WEBVTT

    00:00.000 --> 00:04.000
    Mann sitzt mit seinem Laptop auf einem Ast.

    00:05.000 --> 00:08.000
    Der Ast bricht und der Mann fällt herunter.

    ...


## Kurzübersicht 




Hier finden Sie eine kurze Übersicht über die Eigenschaften des Videoelements.



### Attribute des Videoelements

Eine vollständige Liste der Attribute des Videoelements samt Definitionen finden Sie in den [Spezifikationen zum Videoelement](//www.w3.org/TR/html5/embedded-content-0.html#the-video-element).

<table>
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

#### Automatische Wiedergabe

Bei Verwendung von `autoplay` wird das Video in Desktop-Browsern schnellstmöglich heruntergeladen und abgespielt. Unter iOS und in Chrome für Android funktioniert `autoplay` nicht. Die Nutzer müssen zum Abspielen des Videos auf den Bildschirm tippen.

Auch auf Plattformen, auf denen das Autoplay-Attribut verwendet werden kann, sollten Sie überlegen, ob eine Aktivierung sinnvoll ist: 

* Datennutzung kann teuer sein.
* Wenn Medien ohne vorherige Zustimmung heruntergeladen und abgespielt werden, kann dies unerwartet Bandbreite und CPU-Leistung verschlingen und dabei das Rendern von Seiten verzögern.
* Nutzer befinden sich möglicherweise in einer Situation, in der das Abspielen von Video- oder Audioinhalten aufdringlich erscheint.

Die automatische Wiedergabe kann in der Android WebView über die [WebSettings-API](//developer.android.com/reference/android/webkit/WebSettings.html#setMediaPlaybackRequiresUserGesture(boolean)) konfiguriert werden.
Standardmäßig ist `true` festgelegt, die Option kann jedoch von einer WebView-App deaktiviert werden.

#### Vorab laden

Das Attribut `preload` gibt dem Browser Auskunft darüber, wie viele Informationen oder Inhalte vorab geladen werden sollten.

<table>
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

### JavaScript

[Der HTML5 Rocks-Videoartikel](//www.html5rocks.com/en/tutorials/video/basics/#toc-javascript) fasst die JavaScript-Eigenschaften, -Methoden und -Ereignisse, die für die Steuerung der Videowiedergabe verwendet werden können, auf übersichtliche und verständliche Weise zusammen. Diese Informationen, die wir, sofern relevant, durch für Mobilgeräte spezifische Details ergänzt haben, finden Sie im Folgenden.

#### Eigenschaften

<table>
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

Auf Mobilgeräten werden `playbackRate` (<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">siehe Demo</a>) und `volume` nicht unterstützt.

#### Methoden

<table>
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
wenn eine Aktion des Nutzers vorausgegangen ist, etwa das Klicken auf eine Schaltfläche: <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/scripted.html">Demo</a>. Ebenso kann die Wiedergabe von Inhalten wie eingebetteten YouTube-Videos nicht ausgelöst werden.

#### Ereignisse

Es kann nur ein Teil der Medienereignisse ausgelöst werden. Eine vollständige Liste finden Sie auf der Seite [Media events](//developer.mozilla.org/docs/Web/Guide/Events/Media_events) (Medienereignisse) im Mozilla Developer Network.

<table>
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



