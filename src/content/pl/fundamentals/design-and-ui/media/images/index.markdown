---
title: "Obrazy"
description: "Obraz jest wart tysiąc słów, a grafiki są nieodłączną częścią każdej strony. Jednak często stanowią większość pobieranych danych. Elastyczne projektowanie witryn pozwala na podstawie cech urządzenia zmieniać nie tylko układ strony, ale też obrazy."
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - "Używaj obrazów, które najlepiej pasują do cech wyświetlacza. Weź pod uwagę rozmiar ekranu, rozdzielczość urządzenia i układ strony."
    - "Zmień właściwość <code>background-image</code> w CSS na potrzeby wyświetlaczy o wysokiej liczbie DPI, korzystając z zapytań o media z parametrami <code>min-resolution</code> i <code>-webkit-min-device-pixel-ratio</code>."
    - "Dodaj do znaczników atrybut srcset, by oprócz obrazów w skali 1x wyświetlać też wersje w wysokiej rozdzielczości."
    - "Rozważ spadek wydajności podczas stosowania technik zastępowania grafik w JavaScripcie lub wyświetlania mocno skompresowanych obrazów w wysokiej rozdzielczości na urządzeniach o niższej rozdzielczości."
  avoid-images:
    - "W miarę możliwości unikaj obrazów. Zamiast nich korzystaj z funkcji przeglądarki oraz znaków w standardzie Unicode, a złożone ikony zastępuj czcionkami z ikonami."
  optimize-images:
    - "Nie wybieraj przypadkowo formatu obrazu. Zapoznaj się z dostępnymi formatami i wybierz ten najbardziej odpowiedni."
    - "W procesie tworzenia używaj narzędzi do optymalizacji i kompresji obrazów, by zmniejszyć rozmiary plików."
    - "Zmniejsz liczbę żądań HTTP, umieszczając często używane obrazy w sprite`ach graficznych."
    - "Rozważ opcję wczytywania obrazów dopiero wtedy, gdy po przewinięciu strony pojawią się w widoku, tak by skrócić czas początkowego wyświetlania strony i zmniejszyć ilość pobieranych danych."
notes:
  compressive:
    - "Zachowaj ostrożność przy korzystaniu z technik kompresji, bo dekodowanie wymaga większej ilości pamięci i obciąża procesor. Zmiana rozmiaru dużych obrazów, by zmieściły się na mniejszym ekranie, wymaga znacznych zasobów i jest szczególnie uciążliwa na słabszych urządzeniach z niewielką pamięcią i mocą procesora."
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  Obraz jest wart tysiąc słów, a grafiki są nieodłączną częścią każdej strony. Jednak często stanowią większość pobieranych danych. Elastyczne projektowanie witryn pozwala na podstawie cech urządzenia zmieniać nie tylko układ strony, ale też obrazy.
</p>


### Elastyczne obrazy

Elastyczne projektowanie witryn oznacza, że na podstawie cech urządzenia może zmieniać się nie tylko układ strony, ale też jej zawartość. Na przykład wyświetlacze o wysokiej rozdzielczości (2x) wymagają grafiki o wysokiej rozdzielczości, by zagwarantować ostrość. Obraz przy szerokości 50% może wyglądać dobrze w przeglądarce szerokiej na 800&nbsp;pikseli, ale zajmuje za dużo miejsca na wąskim telefonie i wciąż tak samo obciąża łącze, mimo przeskalowania i dopasowania do mniejszego ekranu.

### Dostosowywanie grafiki

<img class="center" src="img/art-direction.png" alt="Przykład dostosowywania grafiki"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Czasami obraz trzeba zmienić w większym stopniu &ndash; dopasować proporcje, przyciąć, a nawet zastąpić innym. W takiej sytuacji zmianę obrazu określa się zwykle jako dostosowywanie grafiki. Więcej przykładów znajdziesz na [responsiveimages.org/demos/](http://responsiveimages.org/demos/).

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}



