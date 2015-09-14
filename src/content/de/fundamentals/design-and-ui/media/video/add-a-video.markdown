---
title: "Video hinzufügen"
description: "Hier erfahren Sie, wie Sie Videoinhalte ganz einfach zu Ihrer Website hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Verwenden Sie das Videoelement zum Laden, Decodieren und Abspielen von Videos auf Ihrer Website."
    - "Erstellen Sie die Videoinhalte in verschiedenen Formaten, um eine Reihe mobiler Plattformen abzudecken."
    - "Achten Sie auf die richtige Größe der Videos, damit diese nicht ihre Container sprengen."
    - "Achten Sie auf Zugänglichkeit. Fügen Sie das Track-Element hinzu und ordnen Sie es dem Videoelement unter."
notes:
  media-fragments:
    - "Die Media Fragments-API wird auf den meisten Plattformen mit Ausnahme von iOS unterstützt."
    - "Vergewissern Sie sich, dass Ihr Server Bereichsanforderungen unterstützt. Bereichsanforderungen sind auf den meisten Servern standardmäßig aktiviert, einige Hostingdienste können diese jedoch deaktivieren."
  dont-overflow:
    - "Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus."
  accessibility-matters:
    - "Das Track-Element wird in Chrome für Android, iOS Safari sowie allen aktuellen Desktop-Browsern mit Ausnahme von Firefox (siehe <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>) unterstützt. Darüber hinaus sind auch mehrere Polyfiller verfügbar. Wir empfehlen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> oder <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>."
  construct-video-streams:
    - "MSE wird von Chrome und Opera unter Android sowie in Internet Explorer 11 und Chrome für Desktopgeräte unterstützt. Auch <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a> soll in Zukunft unterstützt werden."
  optimize:
    - "<a href='../images/'>Bilder</a>"
    - <a href='../../performance/optimizing-content-efficiency/'>Inhaltseffizienz optimieren</a>
---

<p class="intro">
  Hier erfahren Sie, wie Sie Videoinhalte ganz einfach zu Ihrer Website hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät.
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## Videoelement hinzufügen

- Verwenden Sie das Videoelement zum Laden, Decodieren und Abspielen von Videos auf Ihrer Website:

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
    <p>Ihr Browser unterstützt das Videoelement nicht.</p>
</video>
{% endhighlight %}

## Mehrere Dateiformate angeben

Nicht alle Browser unterstützen dieselben Videoformate.
Mithilfe des `<source>`-Elements können Sie mehrere Formate als Ausweichmöglichkeit angeben, falls der Browser des Nutzers eines der Formate nicht unterstützt.
Beispiel:

{% include_code src=_code/video-main.html snippet=sourcetypes %}

Beim Parsen der <source>-Tags durch den Browser wird anhand des optionalen Attributs `type` ermittelt, welche Datei heruntergeladen und wiedergegeben werden soll. Wenn der Browser WebM unterstützt, spielt er die Datei `chrome.webm` ab, andernfalls wird überprüft, ob MPEG-4-Videos abgespielt werden können.
Weitere Informationen dazu, wie Video- und Audioinhalte im Web funktionieren, finden Sie unter <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a>  (Leitfaden zu digitalen Medien für Computerfreaks).

Dieser Ansatz bietet mehrere Vorteile im Vergleich zu verschiedenen HTML-Standards oder serverseitigen Skripts, besonders im Hinblick auf Mobilgeräte:

* Entwickler können Formate in der bevorzugten Reihenfolge anordnen.
* Durch die native clientseitige Umschaltung wird die Latenz verringert. Es wird nur eine Anforderung zum Abrufen des Inhalts gesendet.
* Die Wahl eines Formats durch den Browser ist einfacher, schneller und unter Umständen zuverlässiger als die Verwendung einer serverseitigen Supportdatenbank mit User-Agent-Erkennung.
* Durch die Angabe des Typs jeder Dateiquelle wird die Netzwerkleistung verbessert. Der Browser kann eine Videoquelle auswählen, ohne einen Teil des Videos herunterladen zu müssen, um das Format zu ermitteln.

Diese Punkte spielen vor allem in mobilen Kontexten eine wichtige Rolle, wo Bandbreite und Latenz höchste Priorität haben und die Geduld der Nutzer meist schnell am Ende ist. 
Der Verzicht auf ein Type-Attribut kann sich im Falle mehrerer Quellen mit nicht unterstützten Typen auf die Leistung auswirken.

Vergleichen Sie anhand der Entwicklertools für Ihren mobilen Browser die Netzwerkaktivität {% link_sample _code/video-main.html %}mit{% endlink_sample %} und {% link_sample _code/notype.html %}ohne Type-Attribute{% endlink_sample %}.
Darüber hinaus sollten Sie die Antwortheader in den Entwicklertools für Ihren Browser überprüfen, um [sicherzustellen, dass Ihr Server den richtigen MIME-Typ zurückgibt](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types). Andernfalls lässt sich nicht überprüfen, um welche Art von Videoquelle es sich handelt.

##Start- und Endzeit festlegen

Sparen Sie Bandbreite und machen Sie Ihre Website reaktionsschneller, indem Sie dem Videoelement mithilfe der Media Fragments-API eine Start- und Endzeit hinzufügen.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>

Zum Hinzufügen eines Medienfragments fügen Sie der Medien-URL einfach `#t=[start_time][,end_time]` hinzu. Wenn das Video zum Beispiel von Sekunde 5 - 10 abgespielt werden soll, geben Sie Folgendes an:

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

Mithilfe der Media Fragments-API können Sie auch mehrere Ansichten desselben Videos bereitstellen - ähnlich wie Cue-Punkte bei einer DVD - ohne mehrere Dateien codieren und bereitstellen zu müssen.

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

Suchen Sie mithilfe der Entwicklertools für Ihren Browser in den Antwortheadern nach `Accept-Ranges: bytes`:

<img class="center" alt="Screenshot der Chrome-Entwicklertools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Posterbild hinzufügen

Fügen Sie dem Videoelement ein Poster-Attribut hinzu, damit Ihre Nutzer bereits beim Laden des Elements wissen, worum es in dem Video geht, ohne es herunterladen oder die Wiedergabe starten zu müssen.

{% highlight html %}
<video poster="poster.jpg" ...>
  ...
</video>
{% endhighlight %}

Ein Poster kann auch eine Ausweichmöglichkeit sein, falls das Attribut `src` des Videos beschädigt ist oder keines der bereitgestellten Videoformate unterstützt wird. Der einzige Nachteil bei Posterbildern ist die zusätzliche Dateianforderung, die etwas Bandbreite verbraucht und Rendering erfordert. Weitere Informationen finden Sie unter [Bildoptimierung](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Hier sehen Sie eine Gegenüberstellung von Videos mit und ohne Posterbild. Wir haben das Posterbild grau dargestellt, um deutlich zu machen, dass es sich nicht um das Video handelt:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android Chrome-Screenshot, Hochformat: ohne Poster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Android Chrome-Screenshot, Hochformat: mit Poster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



