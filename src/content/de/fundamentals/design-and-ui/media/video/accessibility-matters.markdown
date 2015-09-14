---
title: "Warum Zugänglichkeit wichtig ist"
description: "Zugänglichkeit ist keine Funktion."
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
    - "<a href='../../performance/optimizing-content-efficiency/'>Inhaltseffizienz optimieren</a>"
---

<p class="intro">
  Zugänglichkeit ist keine Funktion. Nutzer, die nicht hören oder sehen können, sind nicht in der Lage, sich ein Video ohne Untertitel oder Beschreibungen anzusehen. Der Zeitaufwand für das Hinzufügen solcher Untertitel oder Beschreibungen steht in keinem Verhältnis zu der schlechten Erfahrung, die Sie Ihren Nutzern bieten, wenn Sie darauf verzichten. Für alle Nutzer sollte zumindest ein Grundmaß an Nutzerfreundlichkeit gegeben sein.
</p>

{% include shared/toc.liquid %}



## Untertitel für eine bessere Zugänglichkeit hinzufügen

Um Medien auf Mobilgeräten besser zugänglich zu machen, fügen Sie Untertitel oder Beschreibungen mithilfe des Track-Elements hinzu.

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

Bei Verwendung des Track-Elements sehen die Untertitel wie folgt aus:

 <img class="center" alt="Screenshot mit Untertiteln, die unter Verwendung des Track-Elements in Chrome für Android angezeigt werden" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Track-Element hinzufügen

Es ist ganz einfach, Ihr Video mit Untertiteln zu versehen - Sie müssen lediglich ein Track-Element hinzufügen, das dem Videoelement untergeordnet ist:

{% include_code src=_code/track.html snippet=track lang=html %}

Das Attribut `src` des Track-Elements enthält den Speicherort der Track-Datei.

## Untertitel in Track-Datei definieren

Eine Track-Datei besteht aus zeitlich festgelegten Cues im WebVTT-Format:

    WEBVTT

    00:00.000 --> 00:04.000
    Mann sitzt mit seinem Laptop auf einem Ast.

    00:05.000 --> 00:08.000
    Der Ast bricht und der Mann fällt herunter.

    ...



