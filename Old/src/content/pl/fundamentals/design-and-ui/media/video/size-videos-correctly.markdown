---
title: "Nadawanie filmom prawidłowych rozmiarów"
description: "Dla użytkowników wielkość ma znaczenie."
updated_on: 2014-09-19
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
related-guides:
  media:
  -
      title: "Zwiększanie elastyczności dzięki zapytaniom o media CSS"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Podstawy elastycznego projektowania witryn"
        href: layouts/rwd-fundamentals/
---

<p class="intro">
  Dla użytkowników wielkość ma znaczenie.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}


## Sprawdzanie rozmiaru wideo

Faktyczny rozmiar klatki wideo określony przy kodowaniu może być inny niż wymiary elementu video (tak jak obraz może być wyświetlany w rozmiarze innym niż rzeczywisty).

Aby sprawdzić rozmiar, w którym film został zakodowany, użyj właściwości `videoWidth` i `videoHeight` elementu video. Właściwości `width` i `height` zwracają wymiary elementu video, które można zmieniać, korzystając z CSS lub wbudowanych atrybutów width i height.

## Zapobieganie wychodzeniu filmów poza kontener

Gdy elementy video nie mieszczą się w widocznym obszarze, mogą wyjść poza swój kontener, uniemożliwiając użytkownikowi obejrzenie filmu i skorzystanie
z elementów sterujących.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Zrzut ekranu z Chrome na Androida, orientacja pionowa: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Zrzut ekranu z Chrome na Androida, orientacja pozioma: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Do kontrolowania wymiarów elementu video możesz używać JavaScriptu lub CSS. Biblioteki i wtyczki JavaScript takie jak [FitVids](//fitvidsjs.com/) pozwalają zachować odpowiedni współczynnik proporcji i rozmiar nawet w przypadku filmów Flash z YouTube lub innych źródeł.

Użyj [zapytań o media CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness), by określić wymiary elementów w zależności od wielkości widocznego obszaru. Świetnie sprawdza się `max-width: 100%`.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

W przypadku treści multimedialnych w elementach iframe (np. filmów z YouTube) zastosuj rozwiązanie elastyczne &ndash; takie jak [proponowane przez Johna Surdakowskiego](//avexdesigns.com/responsive-youtube-embed/)).

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Porównaj {% link_sample _code/responsive_embed.html %}przykład strony elastycznej{% endlink_sample %} z {% link_sample _code/unyt.html %}wersją nieelastyczną{% endlink_sample %}.




