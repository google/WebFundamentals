---
title: "Podstawy elastycznego projektowania witryn"
description: "Większość stron internetowych nie jest zoptymalizowana do działania na różnych rodzajach urządzeń. Poznaj podstawy, dzięki którym Twoja witryna będzie działać na komputerach, urządzeniach mobilnych i wszystkich innych, które mają ekran."
updated_on: 2014-04-30
key-takeaways:
  set-viewport:
    - "Użyj metatagu viewport, by sterować szerokością i skalowaniem widocznego obszaru w przeglądarkach."
    - "Dołącz tag <code>width=device-width</code>, by dopasować stronę do szerokości ekranu w pikselach niezależnych od urządzenia."
    - "Dołącz tag <code>initial-scale=1</code>, by utworzyć relację 1:1 między pikselami CSS a pikselami niezależnymi od urządzenia."
    - "Nie wyłączaj skalowania strony przez użytkownika, by nie ograniczać jej dostępności."
  size-content-to-vp:
    - "Nie używaj dużych elementów o stałej szerokości."
    - "Prawidłowe renderowanie treści nie powinno zależeć od konkretnej szerokości widocznego obszaru."
    - "Użyj zapytań o media CSS, by zastosować różne style na małych i dużych ekranach."
  media-queries:
    - "Zapytań o media możesz używać, by stosować style na podstawie cech urządzenia."
    - "Użyj <code>min-width</code> zamiast <code>min-device-width</code>, by interfejs był jak najszerszy."
    - "Użyj względnych rozmiarów elementów, by uniknąć zniekształcenia układu."
  choose-breakpoints:
    - "Utwórz punkty graniczne na podstawie treści, nigdy pod konkretne urządzenia, produkty czy marki."
    - "Projektowanie zacznij od najmniejszego urządzenia mobilnego, a potem stopniowo powiększaj interfejs wraz ze wzrostem rozmiaru ekranów."
    - "Postaraj się, by długość wierszy tekstu nie przekraczała 70-80&nbsp;znaków."
notes:
  use-commas:
    - "Atrybuty rozdziel przecinkami, by starsze przeglądarki analizowały je prawidłowo."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
<p class="intro">
  Liczba urządzeń mobilnych używanych do surfowania po sieci rośnie w astronomicznym tempie, jednak większość stron internetowych nie jest zoptymalizowana do działania na tych urządzeniach. Częstym ograniczeniem urządzeń mobilnych jest rozmiar wyświetlacza, dlatego wymagają one stosowania innych sposobów rozmieszczania treści na ekranie.
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


Ekrany mogą być w wielu różnych rozmiarach &ndash; na telefonach, `fabletach`, tabletach, komputerach, konsolach do gier, telewizorach, a nawet urządzeniach do noszenia. Zawsze będą pojawiać się nowe, dlatego witryna powinna dostosowywać się do każdego rozmiaru ekranu &ndash; teraz i w przyszłości.

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

Elastyczne projektowanie witryn, pierwotnie zdefiniowane przez [Ethana Marcotte`a w czasopiśmie A List Apart](http://alistapart.com/article/responsive-web-design/) to odpowiedź na potrzeby użytkowników i ich urządzeń. Układ strony zmienia się w zależności od rozmiaru i możliwości urządzenia. Na przykład na telefonie użytkownik widzi treści w jednej kolumnie. Z kolei na tablecie te same treści są już wyświetlane w dwóch kolumnach.



