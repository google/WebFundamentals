---
layout: section
title: "Wideo"
description: "Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu."
introduction: "Użytkownicy lubią filmy, bo zwykle są one ciekawe i treściwe. Na urządzeniach mobilnych filmy pozwalają przystępnie prezentować wiele informacji. Obciążają jednak łącze i nie zawsze działają tak samo na każdej platformie. Oczekiwanie na załadowanie filmu irytuje użytkowników, podobnie jak brak reakcji na kliknięcie przycisku odtwarzania. Przeczytaj, jak w prosty sposób umieścić film na stronie i upewnić się, że użytkownicy będą mogli wygodnie go oglądać na dowolnym urządzeniu."
article:
  written_on: 2014-04-16
  updated_on: 2014-04-29
  order: 2
collection: introduction-to-media
id: videos
authors:
  - samdutton
key-takeaways:
  add-a-video:
    - Użyj elementu video, by wczytywać, dekodować i odtwarzać filmy w swojej witrynie.
    - Przygotuj film w wielu formatach, by można było oglądać go na wielu platformach mobilnych.
    - Ustaw prawidłowy rozmiar filmu. Upewnij się, że nie będzie on wystawać poza swój kontener.
    - Ułatwienia dostępu są ważne. Dodaj element track jako podrzędny elementu video.
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
---

{% wrap content%}

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/j5fYOYrsocs?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}

