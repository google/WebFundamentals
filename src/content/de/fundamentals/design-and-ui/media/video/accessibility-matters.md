project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Zugänglichkeit ist keine Funktion.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Warum Zugänglichkeit wichtig ist {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Zugänglichkeit ist keine Funktion. Nutzer, die nicht hören oder sehen können, sind nicht in der Lage, sich ein Video ohne Untertitel oder Beschreibungen anzusehen. Der Zeitaufwand für das Hinzufügen solcher Untertitel oder Beschreibungen steht in keinem Verhältnis zu der schlechten Erfahrung, die Sie Ihren Nutzern bieten, wenn Sie darauf verzichten. Für alle Nutzer sollte zumindest ein Grundmaß an Nutzerfreundlichkeit gegeben sein.




## Untertitel für eine bessere Zugänglichkeit hinzufügen

Um Medien auf Mobilgeräten besser zugänglich zu machen, fügen Sie Untertitel oder Beschreibungen mithilfe des Track-Elements hinzu.

<!-- TODO: Verify note type! -->
Note: Das Track-Element wird in Chrome für Android, iOS Safari sowie allen aktuellen Desktop-Browsern mit Ausnahme von Firefox (siehe <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>) unterstützt. Darüber hinaus sind auch mehrere Polyfiller verfügbar. Wir empfehlen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> oder <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a>.

Bei Verwendung des Track-Elements sehen die Untertitel wie folgt aus:

 <img class="center" alt="Screenshot mit Untertiteln, die unter Verwendung des Track-Elements in Chrome für Android angezeigt werden" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Track-Element hinzufügen

Es ist ganz einfach, Ihr Video mit Untertiteln zu versehen - Sie müssen lediglich ein Track-Element hinzufügen, das dem Videoelement untergeordnet ist:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

Das Attribut `src` des Track-Elements enthält den Speicherort der Track-Datei.

## Untertitel in Track-Datei definieren

Eine Track-Datei besteht aus zeitlich festgelegten Cues im WebVTT-Format:

    WEBVTT

    00:00.000 --> 00:04.000
    Mann sitzt mit seinem Laptop auf einem Ast.

    00:05.000 --> 00:08.000
    Der Ast bricht und der Mann fällt herunter.

    ...



