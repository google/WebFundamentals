---
layout: section
title: "Video"
description: "Hier erfahren Sie, wie Sie Videoinhalte ganz einfach zu Ihrer Website hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät."
introduction: "Nutzer mögen Videos. Sie können lustig und gleichzeitig informativ sein. Auf Mobilgeräten lassen sich Informationen in Form von Videos meist einfacher konsumieren. Aber Videos verbrauchen Bandbreite und funktionieren je nach Plattform unterschiedlich gut. Nutzer mögen es nicht, wenn ein Video ewig lädt oder beim Drücken der Wiedergabetaste nichts passiert. Hier erfahren Sie, wie Sie Ihrer Website Videoinhalte ganz einfach hinzufügen und den Nutzern die bestmögliche Nutzererfahrung bieten können - egal auf welchem Gerät."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
id: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Verwenden Sie das Videoelement zum Laden, Decodieren und Abspielen von Videos auf Ihrer Website.
    - Erstellen Sie die Videoinhalte in verschiedenen Formaten, um eine Reihe mobiler Plattformen abzudecken.
    - Achten Sie auf die richtige Größe der Videos, damit diese nicht ihre Container sprengen.
    - Achten Sie auf Zugänglichkeit. Fügen Sie das Track-Element hinzu und ordnen Sie es dem Videoelement unter.
remember:
  media-fragments:
    - Die Media Fragments-API wird auf den meisten Plattformen mit Ausnahme von iOS unterstützt.
    - Vergewissern Sie sich, dass Ihr Server Bereichsanforderungen unterstützt. Bereichsanforderungen sind auf den meisten Servern standardmäßig aktiviert, einige Hostingdienste können diese jedoch deaktivieren.
  dont-overflow:
    - Erzwingen Sie keine Größenanpassung von Elementen, wenn das daraus resultierende Seitenverhältnis vom Originalvideo abweicht. Ein gestauchtes oder gestrecktes Bild sieht nicht schön aus.
  accessibility-matters:
    - Das Track-Element wird in Chrome für Android, iOS Safari sowie allen aktuellen Desktop-Browsern mit Ausnahme von Firefox (siehe <a href="http://caniuse.com/track" title="Track element support status">caniuse.com/track</a>) unterstützt. Darüber hinaus sind auch mehrere Polyfiller verfügbar. Wir empfehlen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> oder <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.
  construct-video-streams:
    - MSE wird von Chrome und Opera unter Android sowie in Internet Explorer 11 und Chrome für Desktopgeräte unterstützt. Auch <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a> soll in Zukunft unterstützt werden.
  optimize:
    - <a href="../images/">Bilder</a>
    - <a href="../../performance/optimizing-content-efficiency/">Inhaltseffizienz optimieren</a>
---

{% wrap content%}

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/j5fYOYrsocs?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

