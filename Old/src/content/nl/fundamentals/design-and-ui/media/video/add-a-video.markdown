---
title: "Een video toevoegen"
description: "Bekijk informatie over hoe u video aan uw site toevoegt en ervoor zorgt dat gebruikers op elk apparaat een optimale ervaring hebben."
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
  Bekijk informatie over hoe u video aan uw site toevoegt en ervoor zorgt dat gebruikers op elk apparaat een optimale ervaring hebben.
</p>

{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.add-a-video %}

## Het video-element toevoegen

Voeg het video-element toe om video op uw site te laden, decoderen en af te spelen.

<video controls>
     <source src="video/chrome.webm" type="video/webm">
     <source src="video/chrome.mp4" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>

{% highlight html %}
<video src="chrome.webm" type="video/webm">
     <p>Het video-element wordt niet ondersteund door uw browser.</p>
</video>
{% endhighlight %}

## Meerdere bestandsindelingen opgeven

Niet alle browsers ondersteunen dezelfde video-instellingen.
Met het element `<source>` kunt u meerdere formaten opgeven als oplossing voor het geval de browser van de gebruiker een van de formaten niet ondersteunt.
Bijvoorbeeld:

{% include_code src=_code/video-main.html snippet=sourcetypes %}

Als de browser de `<source>` tags parseert, wordt via het optionele kenmerk `type` bepaald welk bestand moet worden gedownload en afgespeeld. Als de browser WebM ondersteunt, wordt chrome.webm afgespeeld. In het andere geval wordt er gecontroleerd of MPEG-4-video`s kunnen worden afgespeeld.
Bekijk <a href='//www.xiph.org/video/vid1.shtml' title='Highly entertaining and informative video guide to digital video'>A Digital Media Primer for Geeks</a> voor meer informatie over hoe video en audio op het web werken.

Deze benadering heeft diverse voordelen vergeleken bij het aanbieden van verschillende HTML- of serverscripts, vooral op mobiele telefoons:

* Ontwikkelaars kunnen formaten vermelden in volgorde van voorkeur.
* Systeemeigen switching van de client vermindert de wachttijd; er wordt slechts één verzoek gedaan om inhoud op te halen.
* De browser een formaat laten kiezen is eenvoudiger, sneller en mogelijk betrouwbaarder dan een server-ondersteuningsdatabase te gebruiken met gebruikersagentdetectie.
* Door het opgeven van het type van elke bestandsbron wordt het netwerk sneller. De browser kan dan een videobron selecteren zonder een gedeelte van de video te hoeven downloaden om het indelingstype vast te kunnen stellen.

Al de genoemde punten zijn met name van belang voor mobiele telefoons, waar bandbreedte en wachttijd een grote rol spelen en de gebruiker snel wil worden bediend. 
Het niet opgeven van een type-kenmerk kan de prestaties beïnvloeden wanneer er meerdere bronnen met niet-ondersteunde typen zijn.

Vergelijk terwijl u uw developertools voor mobiele browsers gebruikt de netwerkactiviteit {% link_sample _code/video-main.html %}met type-kenmerken{% endlink_sample %} en {% link_sample _code/notype.html %}zonder type-kenmerken{% endlink_sample %}.
Controleer ook de reactieheaders in uw browser-developertools om u ervan te [verzekeren dat uw server het juiste MIME-type rapporteert](//developer.mozilla.org/en/docs/Properly_Configuring_Server_MIME_Types); anders zullen controles van videobrontypen niet werken.

## Een start- en eindtijd opgeven

Spaar bandbreedte en zorg ervoor dat uw site sneller reageert: gebruik de Media Fragments API om een start- en eindtijd toe te voegen aan het video-element.

<video controls>
  <source src="video/chrome.webm#t=5,10" type="video/webm">
  <source src="video/chrome.mp4#t=5,10" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>

Als u een mediafragment wilt toevoegen, hoeft u slechts `#t=[start_time][,end_time]` toe te voegen aan de media-URL. Als u bijvoorbeeld de video wilt afspelen tussen seconde 5 en seconde 10, geeft u het volgende op:

{% highlight html %}
<source src="video/chrome.webm#t=5,10" type="video/webm">
{% endhighlight %}

U kunt de Media Fragments API ook gebruiken voor het leveren van meerdere weergaven op dezelfde video &ndash; zoals cue points in een dvd &ndash; zonder meerdere bestanden te hoeven coderen en uitvoeren.

{% include shared/remember.liquid title="Remember" list=page.notes.media-fragments %}

Controleer met uw browser-developertools `Accept-Ranges: bytes` in de reactieheaders:

<img class="center" alt="Screenshot Chrome Dev Tools: Accept-Ranges: bytes" src="images/Accept-Ranges-Chrome-Dev-Tools.png">

## Een posterafbeelding toevoegen

Voeg een posterkenmerk aan het video-element toe zodat uw gebruikers een indruk van de inhoud krijgen zodra het element wordt geladen, zonder dat de video hoeft te worden gedownload of het afspelen hoeft te worden gestart.

{% highlight html %}
<video poster="poster.jpg" ...>
    ...
</video>
{% endhighlight %}

Een poster kan ook een noodoplossing zijn als de video `src` defect is of als geen van de geleverde video-indelingen worden ondersteund. Het enige nadeel van posterafbeeldingen is dat er een extra bestandsverzoek moet worden gedaan, wat enige bandbreedte kost en rendering vereist. Zie voor meer informatie [Afbeeldingsoptimalisatie](../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization).

Hier volgt een vergelijking van video`s zonder en met een posterafbeelding &ndash; we geven de posterafbeelding in grijstinten weer om aan te geven dat het hier niet om de video gaat:

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Screenshot Android Chrome, staand: zonder poster" src="images/Chrome-Android-video-no-poster.png">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img class="center" alt="Screenshot Android Chrome, staand: met poster" src="images/Chrome-Android-video-poster.png">
  </div>
</div>



