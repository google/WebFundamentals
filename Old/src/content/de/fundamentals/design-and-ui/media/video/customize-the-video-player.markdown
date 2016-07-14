---
title: "Videoplayer anpassen"
description: "Videos werden je nach Plattform unterschiedlich dargestellt. Bei Lösungen für Mobilgeräte muss die Geräteausrichtung berücksichtigt werden. Verwenden Sie die Fullscreen-API, um die Vollbildansicht von Videoinhalten zu steuern."
updated_on: 2014-04-29
key-takeaways:
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
---

<p class="intro">
  Videos werden je nach Plattform unterschiedlich dargestellt. Bei Lösungen für Mobilgeräte muss die Geräteausrichtung berücksichtigt werden. Verwenden Sie die Fullscreen-API, um die Vollbildansicht von Videoinhalten zu steuern.
</p>

{% include shared/toc.liquid %}


Videos werden je nach Plattform unterschiedlich dargestellt. Bei Lösungen für Mobilgeräte muss die Geräteausrichtung berücksichtigt werden. Verwenden Sie die Fullscreen-API, um die Vollbildansicht von Videoinhalten zu steuern.

## Wie die Geräteausrichtung geräteübergreifend funktioniert

Bei Desktopmonitoren oder Laptops ist die Geräteausrichtung kein Thema. Anders sieht das jedoch bei Webseiten für Mobilgeräte und Tablets aus. 

Safari auf dem iPhone schaltet gut zwischen Hoch- und Querformat um:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Screenshot einer Videowiedergabe in Safari auf dem iPhone, Hochformat" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Screenshot einer Videowiedergabe in Safari auf dem iPhone, Querformat" src="images/iPhone-video-playing-landscape.png">
</div>

Auf einem iPad und in Chrome unter Android kann die Geräteausrichtung hingegen problematisch sein.
Zum Beispiel sieht eine Videowiedergabe ohne jegliche Anpassung auf einem iPad im Querformat so aus:

<img class="center" alt="Screenshot einer Videowiedergabe in Safari auf einem iPad mit Retina-Display, Querformat"
src="images/iPad-Retina-landscape-video-playing.png">

Durch Verwendung von `width: 100%` oder `max-width: 100%` in CSS lassen sich viele Layoutprobleme in Verbindung mit der Geräteausrichtung lösen. Darüber hinaus sollten Sie eventuell auch Vollbildalternativen in Betracht ziehen.

##Inline- oder Vollbildanzeige

Videos werden je nach Plattform unterschiedlich dargestellt. In Safari auf einem iPhone wird ein Videoelement inline auf einer Webseite angezeigt, die Wiedergabe erfolgt jedoch im Vollbildmodus:

<img class="center" alt="Screenshot eines Videoelements auf dem iPhone, Hochformat" src="images/iPhone-video-with-poster.png">

Unter Android können Nutzer den Vollbildmodus durch Klicken auf das entsprechende Symbol auswählen. Die Inline-Anzeige ist jedoch bei der Videowiedergabe Standard:

<img class="center" alt="Screenshot einer Videowiedergabe in Chrome unter Android, Hochformat" src="images/Chrome-Android-video-playing-portrait-3x5.png">

In Safari auf einem iPad erfolgt die Videowiedergabe inline:

<img class="center" alt="Screenshot einer Videowiedergabe in Safari auf einem iPad mit Retina-Display, Querformat" src="images/iPad-Retina-landscape-video-playing.png">

## Vollbildansicht von Inhalten steuern

Bei Plattformen, die die Videowiedergabe im Vollbildmodus nicht erzwingen, wird die Fullscreen-API [weitestgehend unterstützt](//caniuse.com/fullscreen). Verwenden Sie diese API, um die Vollbildansicht von Inhalten oder der Seite zu steuern.

Zur Vollbildansicht eines Elements, z. B. video:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Zur Vollbildansicht des gesamten Dokuments:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Änderungen am Vollbildmodus können Sie auch hören:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Oder überprüfen Sie, ob sich das Element derzeit im Vollbildmodus befindet:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Die Art und Weise, wie Elemente im Vollbildmodus angezeigt werden, können Sie auch mithilfe der CSS-Pseudoklasse `:fullscreen` ändern. 

Auf Geräten, die die Fullscreen-API unterstützen, sollten Sie die Verwendung von Miniaturansicht-Bildern als Platzhalter für Videos in Betracht ziehen:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>

In dieser {% link_sample _code/fullscreen.html %}Demo{% endlink_sample %} erfahren Sie, wie das Ganze in der Praxis aussieht.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



