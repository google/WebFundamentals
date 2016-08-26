project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# De videospeler aanpassen {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Video wordt op elk platform anders weergegeven. Bij mobiele oplossingen moet rekening worden gehouden met de oriëntatie van het apparaat. Gebruik Fullscreen API om video-inhoud in volledig scherm weer te geven.



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

    elem.requestFullScreen();
    

Het hele document beeldvullend weergeven:

    document.body.requestFullScreen();
    

U kunt ook luisteren naar wijzigingen in de beeldvullende status:

    video.addEventListener("fullscreenchange", handler);
    

Of controleren of het element momenteel in beeldvullende modus is:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

U kunt ook de CSS-pseudoklasse `:fullscreen` gebruiken om de manier te veranderen waarop elementen in de beeldvullende modus worden weergegeven.

Op apparaten die de Fullscreen API ondersteunen, kunt u miniatuurafbeeldingen gebruiken als placeholders voor video:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
     <p>Het video-element wordt niet ondersteund door deze browser.</p>
</video>

Bekijk de demo <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html"></a> om te zien hoe dit in het echt werkt.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



