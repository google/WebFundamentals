---
title: "Dostosowywanie odtwarzacza wideo"
description: "Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie."
updated_on: 2014-04-29
key-takeaways:
  add-a-video:
    - "Użyj elementu video, by wczytywać, dekodować i odtwarzać filmy w swojej witrynie."
    - "Przygotuj film w wielu formatach, by można było oglądać go na wielu platformach mobilnych."
    - "Ustaw prawidłowy rozmiar filmu. Upewnij się, że nie będzie on wystawać poza swój kontener."
    - "Ułatwienia dostępu są ważne. Dodaj element track jako podrzędny elementu video."
notes:
  media-fragments:
    - "Interfejs API Media Fragments działa na większości platform z wyjątkiem iOS."
    - "Upewnij się, że Twój serwer odpowiada na żądania zakresu. Na większości serwerów ta funkcja jest domyślnie włączona, ale niektórzy administratorzy usług hostingowych ją wyłączają."
  dont-overflow:
    - "Nie wymuszaj rozmiarów, które nadają elementowi inny współczynnik proporcji niż ma pierwotny film. Obraz ściśnięty lub rozciągnięty źle wygląda."
  accessibility-matters:
    - "Element track działa w Chrome na Androida, Safari na iOS i wszystkich współczesnych przeglądarkach na komputerach z wyjątkiem Firefoksa (zobacz na <a href='http://caniuse.com/track' title='Stan obsługi elementu track'>caniuse.com/track</a>). Jest też dostępnych kilka rozwiązań polyfill. Zalecamy <a href='//www.delphiki.com/html5/playr/' title='Polyfill elementu track Playr'>Playr</a> i <a href='//captionatorjs.com/' title='Element track Captionator'>Captionator</a>."
  construct-video-streams:
    - "MSE działa w Chrome i Operze na Androida oraz Internet Explorerze 11 i Chrome na komputerach. Wprowadzenie obsługi w <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Oś czasu implementacji Media Source Extensions w Firefoksie'>Firefoksie</a> jest planowane."
  optimize:
    - "<a href='../images/'>Obrazy</a>"
    - "<a href='../../performance/optimizing-content-efficiency/'>Optymalizowanie obsługi treści</a>"
---

<p class="intro">
  Na poszczególnych platformach filmy są odtwarzane w różny sposób. W rozwiązaniach mobilnych trzeba wziąć pod uwagę orientację urządzenia. Użyj interfejsu API Fullscreen, by sterować wyświetlaniem treści wideo na pełnym ekranie.
</p>

{% include shared/toc.liquid %}


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
{% highlight javascript %}
elem.requestFullScreen();
{% endhighlight %}

Aby w trybie pełnoekranowym wyświetlić cały dokument:
{% highlight javascript %}
document.body.requestFullScreen();
{% endhighlight %}

Możesz też śledzić zmiany stanu wyświetlania na pełnym ekranie:
{% highlight javascript %}
video.addEventListener("fullscreenchange", handler);
{% endhighlight %}

Jeśli chcesz sprawdzić, czy element jest obecnie w trybie pełnoekranowym:
{% highlight javascript %}
console.log("In full screen mode: ", video.displayingFullscreen);
{% endhighlight %}

Pseudoklasa CSS ":fullscreen" pozwala zmieniać sposób wyświetlania elementów w trybie pełnoekranowym.

Na urządzeniach, które obsługują interfejs API Fullscreen, możesz użyć obrazu miniatury jako elementu zastępczego filmu:

<video autoplay loop class="center">
  <source src="video/fullscreen.webm" type="video/webm">
  <source src="video/fullscreen.mp4" type="video/mp4">
  <p>Ta przeglądarka nie obsługuje elementu video.</p>
</video>

Aby zobaczyć, jak to działa, skorzystaj ze {% link_sample _code/fullscreen.html %}strony demonstracyjnej{% endlink_sample %}.

**NOTE:** `requestFullScreen()` is currently vendor prefixed and may require
extra code for full cross browser compatibility.



