project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie.

{# wf_review_required #}
{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2000-01-01 #}

# Dostosowywanie odtwarzacza wideo {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie.



Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie.

## Jak działa wykrywanie orientacji na różnych urządzeniach

Orientacja urządzenia nie jest problemem na monitorach komputerowych ani laptopach, ale ma ogromne znaczenie przy projektowaniu stron internetowych na tablety i inne urządzenia mobilne.

Safari na iPhonie dobrze sobie radzi z przełączaniem się między orientacją pionową i poziomą:

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPhonie, orientacja pionowa" src="images/iPhone-video-playing-portrait.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPhonie, orientacja pozioma" src="images/iPhone-video-playing-landscape.png">
</div>

Na iPadzie oraz w Chrome na Androida orientacja urządzenia może stanowić problem.
Na przykład niedostosowany film odtwarzany na iPadzie w orientacji poziomej wygląda tak:

<img class="center" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPadzie Retina, orientacja pozioma"
src="images/iPad-Retina-landscape-video-playing.png">

Aby rozwiązać wiele problemów z układem związanych z orientacją urządzenia, przypisz elementowi video styl CSS z ustawieniem `width: 100%` lub `max-width: 100%`. Możesz też zastanowić się nad wykorzystaniem pełnego ekranu.

## Wyświetlanie w treści strony lub na pełnym ekranie

Na poszczególnych platformach filmy są odtwarzane w różny sposób. Safari na iPhonie wyświetla element video w treści strony internetowej, ale film odtwarza w trybie pełnoekranowym:

<img class="center" alt="Zrzut ekranu z elementem video na iPhonie, orientacja pionowa" src="images/iPhone-video-with-poster.png">

W Androidzie użytkownicy mogą włączyć tryb pełnoekranowy, klikając jego ikonę. Domyślnie film jest odtwarzany w treści strony:

<img class="center" alt="Zrzut ekranu z filmem odtwarzanym w Chrome na Androida, orientacja pionowa" src="images/Chrome-Android-video-playing-portrait-3x5.png">

Safari na iPadzie odtwarza film w treści strony:

<img class="center" alt="Zrzut ekranu z filmem odtwarzanym w Safari na iPadzie Retina, orientacja pozioma" src="images/iPad-Retina-landscape-video-playing.png">

## Sterowanie wyświetlaniem treści na pełnym ekranie

Platformy, które nie wymuszają odtwarzania filmów w trybie pełnoekranowym, powszechnie obsługują [interfejs API Fullscreen](//caniuse.com/fullscreen). Pozwala on sterować wyświetlaniem treści lub całej strony na pełnym ekranie.

Aby w trybie pełnoekranowym wyświetlić element, np. video:

    elem.requestFullScreen();
    

Aby w trybie pełnoekranowym wyświetlić cały dokument:

    document.body.requestFullScreen();
    

Możesz też śledzić zmiany stanu wyświetlania na pełnym ekranie:

    video.addEventListener("fullscreenchange", handler);
    

Jeśli chcesz sprawdzić, czy element jest obecnie w trybie pełnoekranowym:

    console.log("In full screen mode: ", video.displayingFullscreen);
    

Pseudoklasa CSS ":fullscreen" pozwala zmieniać sposób wyświetlania elementów w trybie pełnoekranowym.

Na urządzeniach, które obsługują interfejs API Fullscreen, możesz użyć obrazu miniatury jako elementu zastępczego filmu:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
  <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>

Aby zobaczyć, jak to działa, skorzystaj ze <a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/fullscreen.html">strony demonstracyjnej</a>.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



