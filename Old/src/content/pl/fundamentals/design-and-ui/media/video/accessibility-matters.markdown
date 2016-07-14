---
title: "Ułatwienia dostępu są ważne"
description: "Ułatwienia dostępu to nie dodatkowa funkcja."
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
  Ułatwienia dostępu to nie dodatkowa funkcja. Użytkownicy, którzy nie widzą lub nie słyszą, potrzebują opisów głosowych lub napisów, by zapoznać się z filmem. Koszt w postaci czasu poświęconego na dodanie tych elementów do filmu jest znacznie mniejszy niż negatywne skutki niezadowolenia użytkowników. Wszyscy użytkownicy powinni mieć dostęp przynajmniej do podstawowych elementów strony.
</p>

{% include shared/toc.liquid %}



## Dodawanie napisów ułatwiających dostęp

Aby poprawić dostępność multimediów na urządzeniach mobilnych, dodaj napisy i opisy, korzystając z elementu track.

{% include shared/remember.liquid title="Remember" list=page.notes.accessibility-matters %}

Tak wyglądają napisy z elementu track:

 <img class="center" alt="Zrzut ekranu z napisami z elementu track w Chrome na Androida" src="images/Chrome-Android-track-landscape-5x3.jpg">

## Dodawanie elementu track

Do swojego filmu możesz bardzo łatwo dodać napisy &ndash; wystarczy dołączyć element track jako podrzędny elementu video:

{% include_code src=_code/track.html snippet=track lang=html %}

Atrybut `src` elementu track wskazuje lokalizację pliku ścieżki.

## Definiowanie napisów w pliku ścieżki

Plik ścieżki zawiera teksty z sygnaturą czasową w formacie WebVTT:

    WEBVTT

    00:00.000 --> 00:04.000
    Mężczyzna siedzi na gałęzi drzewa i korzysta z laptopa.

    00:05.000 --> 00:08.000
    Gałąź się łamie i mężczyzna zaczyna spadać.

    ...



