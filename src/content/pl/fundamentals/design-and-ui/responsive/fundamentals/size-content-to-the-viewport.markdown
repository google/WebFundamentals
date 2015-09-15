---
title: "Dostosowywanie rozmiaru treści do widocznego obszaru"
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
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  Zarówno na komputerach, jak i urządzeniach mobilnych użytkownicy są przyzwyczajeni do przewijania stron w pionie, ale nie w poziomie. Zmuszanie użytkownika do przewijania w poziomie lub pomniejszania widoku, gdy chce zobaczyć pozostałą część strony, obniża wygodę obsługi.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

Podczas tworzenia witryny mobilnej z metatagiem `viewport` łatwo przypadkowo dodać do strony treści, które nie pasują do określonego widocznego obszaru. Na przykład obraz szerszy niż widoczny obszar powoduje konieczność przewijania w poziomie. Elementy tego typu trzeba dopasować do szerokości widocznego obszaru, tak by użytkownik nie musiał przewijać ich w bok.

Wymiary ekranu i szerokość w pikselach CSS mogą bardzo się różnić na poszczególnych urządzeniach (np. telefonach i tabletach czy nawet różnych telefonach), dlatego prawidłowe renderowanie treści nie powinno zależeć od konkretnej szerokości widocznego obszaru.

Ustawienie dużych bezwzględnych szerokości CSS elementów strony (tak jak w przykładzie poniżej) spowoduje, że element `div` będzie zbyt szeroki dla widocznego obszaru na węższym urządzeniu (np. iPhonie, który ma 320&nbsp;pikseli szerokości CSS). Zamiast tego użyj względnych wartości szerokości, na przykład `width: 100%`. Podobnie pamiętaj, by nie używać dużych bezwzględnych wartości pozycji, które mogą spowodować, że element znajdzie się poza widocznym obszarem na małym ekranie.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Strona z elementem o stałej szerokości 344&nbsp;pikseli na iPhonie">
      Zobacz przykład
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Strona z elementem o stałej szerokości 344&nbsp;pikseli na Nexusie 5.">
      Zobacz przykład
    {% endlink_sample %}
  </div>
</div>



