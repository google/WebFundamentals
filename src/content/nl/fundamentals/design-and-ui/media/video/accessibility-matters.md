project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Toegankelijkheid is geen functie.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Toegankelijkheid is belangrijk {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Toegankelijkheid is geen functie. Gebruikers met een visuele beperking of beperking van het gehoor hebben zonder ondertitels of beschrijvingen helemaal niets aan een video. Hoewel het tijd kost om deze elementen aan uw video toe te voegen, hoeft u op deze manier niemand teleur te stellen. Zorg ervoor dat iedere gebruiker iets aan uw video heeft.




## Ondertiteling toevoegen voor meer toegankelijkheid

Als u media toegankelijker wilt maken op mobiele telefoons, kunt u ondertitels of beschrijvingen toevoegen.

<!-- TODO: Verify note type! -->
Note: Het track-element wordt ondersteund door Chrome voor Android, iOS Safari en alle bekende browsers op desktop met uitzondering van Firefox (zie <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Ook zijn er verschillende polyfills beschikbaar. We kunnen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> of <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a> aanbevelen.

Als u het track-element gebruikt, worden ondertitels als volgt weergegeven:

 <img class="center" alt="Screenshot toont ondertitels die worden weergegeven via het track-element in Chrome op Android" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Track-element toevoegen

Het toevoegen van ondertitels aan uw video is erg gemakkelijk &ndash; voeg een track-element gewoon toe als onderliggend element van het video-element:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/track.html" region_tag="track" lang=html %}
</pre>

Het `src`-kenmerk van het track-element geeft de locatie van het trackbestand.

## Ondertitels in trackbestand definiëren

Een trackbestand bestaat uit getimede `cues` in WebVTT-indeling:

    WEBVTT

    00:00.000 --> 00:04.000
    Man zit met een laptop op een boomtak.

    00:05.000 --> 00:08.000
    De tak breekt af en de man valt.

    ...



