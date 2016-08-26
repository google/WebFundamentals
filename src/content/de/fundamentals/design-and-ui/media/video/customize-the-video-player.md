project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Videos werden je nach Plattform unterschiedlich dargestellt. Bei Lösungen für Mobilgeräte muss die Geräteausrichtung berücksichtigt werden. Verwenden Sie die Fullscreen-API, um die Vollbildansicht von Videoinhalten zu steuern.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Videoplayer anpassen {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Videos werden je nach Plattform unterschiedlich dargestellt. Bei Lösungen für Mobilgeräte muss die Geräteausrichtung berücksichtigt werden. Verwenden Sie die Fullscreen-API, um die Vollbildansicht von Videoinhalten zu steuern.



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
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Dieser Browser unterstützt das Videoelement nicht.</p>
</video>

In dieser <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">Demo</a> erfahren Sie, wie das Ganze in der Praxis aussieht.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



