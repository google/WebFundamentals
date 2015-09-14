---
title: "De videospeler aanpassen"
description: "Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Gebruik het video-element om video op uw site te laden, decoderen en af te spelen."
    - "Maak video's in meerdere indelingen zodat ze op allerlei verschillende mobiele platforms kunnen worden afgespeeld."
    - "Maak video's met het juiste formaat; zorg ervoor dat ze niet overlopen tot buiten de container."
    - "Toegankelijkheid is belangrijk; voeg het track-element toe als onderliggend element van het video-element."
notes:
  media-fragments:
    - "De Media Fragments API wordt door de meeste platforms ondersteund, maar niet door iOS."
    - "Controleer of bereikaanvragen door uw server worden ondersteund. Bereikaanvragen worden op de meeste servers standaard ingeschakeld, maar ze kunnen door bepaalde hostingservices worden uitgeschakeld."
  dont-overflow:
    - "Forceer het aanpassen van de grootte van het element niet als dit resulteert in een beeldverhouding die afwijkt van de oorspronkelijke video. Samengeperste of uitgerekte beelden zien er slecht uit."
  accessibility-matters:
    - "Het track-element wordt ondersteund door Chrome voor Android, iOS Safari en alle bekende browsers op desktop met uitzondering van Firefox (zie <a href='http://caniuse.com/track' title='Track element support status'>caniuse.com/track</a>). Ook zijn er verschillende polyfills beschikbaar. We kunnen <a href='//www.delphiki.com/html5/playr/' title='Playr track element polyfill'>Playr</a> of <a href='//captionatorjs.com/' title='Captionator track'>Captionator</a> aanbevelen."
  construct-video-streams:
    - "MSE wordt ondersteund door Chrome en Opera op Android, en in Internet Explorer 11 en Chrome for desktop, met toekomstige ondersteuning voor <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Firefox Media Source Extensions implementation timeline'>Firefox</a>."
  optimize:
    - "<a href='../images/'>Afbeeldingen</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Efficiëntie van inhoud optimaliseren</a>"
---

<p class="intro">
  Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven.
</p>

{% include shared/toc.liquid %}


Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven.

## Hoe apparaatoriëntatie werkt voor verschillende apparaten

Apparaatoriëntatie is niet van toepassing voor desktopmonitors of laptops, maar is wel heel belangrijk wanneer u webpagina`s wilt ontwerpen voor mobiele telefoons en tablets.

Safari op iPhone kan uitstekend schakelen tussen de staande en liggende oriëntatie:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Screenshot van video die wordt afgespeeld in Safari op de iPhone, in staande modus" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="" src="images/iPhone-video-playing-landscape.png">Screenshot van video die wordt afgespeeld in Safari op de iPad Retina, in liggende modus
</div>

De apparaatoriëntatie op een iPad en bij Chrome op Android kan lastig zijn.
Zonder aanpassingen ziet bijvoorbeeld een video die op een iPad in liggende modus wordt afgespeeld er zo uit:

<img class="center" alt="Screenshot van video die wordt afgespeeld in Safari op de iPad Retina, in liggende modus"
src="images/iPad-Retina-landscape-video-playing.png">

Door in CSS `width: 100%` of `max-width: 100%` voor een video in te stellen, kunnen veel lay-outproblemen met apparaatoriëntatie worden opgelost. U kunt ook beeldvullende alternatieven overwegen.

## Inline- of fullscreenweergave

Video wordt op elk platform anders weergegeven. Safari op de iPhone geeft een video-element inline weer op een webpagina, maar speelt video af in beeldvullende modus:

<img class="center" alt="Screenshot of video-element op de iPhone, staande modus" src="images/iPhone-video-with-poster.png">

Op Android kunnen gebruikers de beeldvullende modus opvragen door op het pictogram beeldvullend te klikken. Maar normaal gesproken wordt de video inline afgespeeld:

<img class="center" alt="Screenshot van video die in Chrome op Android wordt afgespeeld, in staande modus" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Bij Safari op een iPad wordt video inline afgespeeld:

<img class="center" alt="Screenshot van video die wordt afgespeeld in Safari op de iPad Retina, in liggende modus" src="images/iPad-Retina-landscape-video-playing.png">

## Beeldvullende weergave van inhoud instellen

Voor platforms die het beeldvullend afspelen van video niet afdwingen, wordt de Fullscreen API [breed ondersteund](//caniuse.com/fullscreen). Gebruik deze API om de beeldvullende weergave van inhoud, of de pagina, in te stellen.

Een element, zoals een video:, beeldvullend weergeven:
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Het hele document beeldvullend weergeven:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

U kunt ook luisteren naar wijzigingen in de beeldvullende status:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Of controleren of het element momenteel in beeldvullende modus is:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

U kunt ook de CSS-pseudoklasse `:fullscreen` gebruiken om de manier te veranderen waarop elementen in de beeldvullende modus worden weergegeven.

Op apparaten die de Fullscreen API ondersteunen, kunt u miniatuurafbeeldingen gebruiken als placeholders voor video:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>

Bekijk de demo {% link_sample _code/fullscreen.html %}{% endlink_sample %} om te zien hoe dit in het echt werkt.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



