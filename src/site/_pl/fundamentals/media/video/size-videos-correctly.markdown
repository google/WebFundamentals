---
layout: article
title: "Nadawanie filmom prawidłowych rozmiarów"
description: "Dla użytkowników wielkość ma znaczenie."
introduction: "Dla użytkowników wielkość ma znaczenie."
article:
  written_on: 2014-04-16
  updated_on: 2014-09-19
  order: 3
collection: videos
authors:
  - samdutton
key-takeaways:
  size-matters:
    - Nie wyświetlaj filmów z większym rozmiarem klatki lub wyższą jakością niż umożliwia platforma.
    - Nie twórz filmów dłuższych niż to konieczne.
    - Długie filmy mogą powodować problemy przy pobieraniu i przewijaniu. Niektóre przeglądarki przed rozpoczęciem odtwarzania muszą pobrać cały film.
remember:
  media-fragments:
    - Interfejs API Media Fragments działa na większości platform z wyjątkiem iOS.
    - Upewnij się, że Twój serwer odpowiada na żądania zakresu. Na większości serwerów ta funkcja jest domyślnie włączona, ale niektórzy administratorzy usług hostingowych ją wyłączają.
  dont-overflow:
    - Nie wymuszaj rozmiarów, które nadają elementowi inny współczynnik proporcji niż ma pierwotny film. Obraz ściśnięty lub rozciągnięty źle wygląda.
  accessibility-matters:
    - Element track działa w Chrome na Androida, Safari na iOS i wszystkich współczesnych przeglądarkach na komputerach z wyjątkiem Firefoksa (zobacz na <a href="http://caniuse.com/track" title="Stan obsługi elementu track">caniuse.com/track</a>). Jest też dostępnych kilka rozwiązań polyfill. Zalecamy <a href='//www.delphiki.com/html5/playr/' title='Polyfill elementu track Playr'>Playr</a> i <a href='//captionatorjs.com/' title='Element track Captionator'>Captionator</a>.
  construct-video-streams:
    - MSE działa w Chrome i Operze na Androida oraz Internet Explorerze 11 i Chrome na komputerach. Wprowadzenie obsługi w <a href='http://wiki.mozilla.org/Platform/MediaSourceExtensions' title='Oś czasu implementacji Media Source Extensions w Firefoksie'>Firefoksie</a> jest planowane.
  optimize:
    - <a href="../images/">Obrazy</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optymalizowanie obsługi treści</a>
related:
  media:
  -
      title: "Zwiększanie elastyczności dzięki zapytaniom o media CSS"
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries.html
      section:
        id: rwd-fundamentals
        title: "Podstawy elastycznego projektowania witryn"
        href: layouts/rwd-fundamentals/
---

{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.size-matters %}

<style>

  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

</style>

## Sprawdzanie rozmiaru wideo

Faktyczny rozmiar klatki wideo określony przy kodowaniu może być inny niż wymiary elementu video (tak jak obraz może być wyświetlany w rozmiarze innym niż rzeczywisty).

Aby sprawdzić rozmiar, w którym film został zakodowany, użyj właściwości `videoWidth` i `videoHeight` elementu video. Właściwości `width` i `height` zwracają wymiary elementu video, które można zmieniać, korzystając z CSS lub wbudowanych atrybutów width i height.

## Zapobieganie wychodzeniu filmów poza kontener

Gdy elementy video nie mieszczą się w widocznym obszarze, mogą wyjść poza swój kontener, uniemożliwiając użytkownikowi obejrzenie filmu i skorzystanie
z elementów sterujących.

<div class="clear">
    <img class="g-wide--1 g-medium--half" alt="Zrzut ekranu z Chrome na Androida, orientacja pionowa: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="g-wide--2 g-wide--last g-medium--half g--last" alt="Zrzut ekranu z Chrome na Androida, orientacja pozioma: pozbawiony stylu element video wychodzi poza widoczny obszar" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

Do kontrolowania wymiarów elementu video możesz używać JavaScriptu lub CSS. Biblioteki i wtyczki JavaScript takie jak [FitVids](//fitvidsjs.com/) pozwalają zachować odpowiedni współczynnik proporcji i rozmiar nawet w przypadku filmów Flash z YouTube lub innych źródeł.

Użyj [zapytań o media CSS](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness), by określić wymiary elementów w zależności od wielkości widocznego obszaru. Świetnie sprawdza się `max-width: 100%`.

{% include modules/related_guides.liquid inline=true list=page.related.media %}

W przypadku treści multimedialnych w elementach iframe (np. filmów z YouTube) zastosuj rozwiązanie elastyczne &ndash; takie jak [proponowane przez Johna Surdakowskiego](//avexdesigns.com/responsive-youtube-embed/)).

{% include modules/remember.liquid title="Remember" list=page.remember.dont-overflow %}

**CSS:**

{% include_code _code/responsive_embed.html styling css %}

**HTML:**

{% include_code _code/responsive_embed.html markup html %}

Porównaj {% link_sample _code/responsive_embed.html %}przykład strony elastycznej{% endlink_sample %} z {% link_sample _code/unyt.html %}wersją nieelastyczną{% endlink_sample %}.


{% include modules/nextarticle.liquid %}

{% endwrap %}

