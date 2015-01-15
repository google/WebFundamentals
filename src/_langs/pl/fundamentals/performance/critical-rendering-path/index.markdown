---
layout: section
title: "Krytyczna ścieżka renderowania"
description: "Optymalizacja krytycznej ścieżki renderowania obejmuje nadanie różnych priorytetów wyświetlanej treści zależnie od tego, jakie działania na stronie chce głównie podejmować użytkownik."
introduction: "Optymalizacja krytycznej ścieżki renderowania ma kluczowe znaczenie dla wydajności naszych stron: naszym celem jest nadanie różnych priorytetów wyświetlanej treści zależnie od tego, jakie działania na stronie chce głównie podejmować użytkownik."
article:
  written_on: 2014-04-01
  updated_on: 2014-04-28
  order: 1
id: critical-rendering-path
collection: performance
authors:
  - ilyagrigorik
---
{% wrap content%}

Szybkie wyświetlanie stron internetowych wymaga od przeglądarki wielu zabiegów. Większość tej pracy jest ukryta przed programistami witryn internetowych: piszemy kod, a ładnie wyglądająca strona pojawia się na ekranie. Ale jak dokładnie przebiega w przeglądarce proces pozwalający przejść od znaczników HTML i CSS oraz kodu JavaScript do zrenderowanych pikseli na ekranie?

Podstawą optymalizacji wydajności jest zrozumienie zdarzeń występujących na etapach od wczytania bajtów znaczników HTML i CSS oraz kodu JavaScript, przez ich przetwarzanie, po przekształcenie na zrenderowane piksele &ndash; właśnie z tych etapów składa się **krytyczna ścieżka renderowania**.

<img src="images/progressive-rendering.png" class="center" alt="stopniowe renderowanie strony">

Optymalizując krytyczną ścieżkę renderowania, możemy znacznie skrócić czas potrzebny na pierwsze zrenderowanie naszych stron. Ponadto zrozumienie krytycznej ścieżki renderowania będzie stanowić solidną podstawę przy tworzeniu dobrze działających aplikacji interaktywnych. Okazuje się, że proces przetwarzania aktualizacji interaktywnych przebiega identycznie, tylko wykonywany jest w pętli ciągłej. Najlepiej, gdy częstotliwość odświeżania wynosi 60 klatek na sekundę. Ale na razie nie wyprzedzajmy faktów. Najpierw poznajmy podstawy sposobu wyświetlania prostej strony w przeglądarce.

{% endwrap%}

