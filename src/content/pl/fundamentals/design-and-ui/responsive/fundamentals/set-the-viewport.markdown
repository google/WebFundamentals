---
title: "Ustawianie tagu viewport"
description: "Większość stron internetowych nie jest zoptymalizowana do działania na różnych rodzajach urządzeń. Poznaj podstawy, dzięki którym Twoja witryna będzie działać na komputerach, urządzeniach mobilnych i wszystkich innych, które mają ekran."
updated_on: 2014-09-12
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
---
<p class="intro">
  Strony zoptymalizowane pod kątem działania na rozmaitych urządzeniach muszą w nagłówku dokumentu zawierać metatag viewport. Przekazuje on przeglądarce instrukcje, jak sterować wymiarami i skalowaniem strony.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.set-viewport %}

Aby strona działała jak najlepiej, przeglądarki mobilne renderują ją w szerokości ekranu komputera (zwykle około 980&nbsp;pikseli, choć zdarzają się też inne wartości), a potem próbują poprawić wygląd treści, zwiększając czcionki i skalując zawartość, by pasowała do ekranu. W takiej sytuacji rozmiary czcionek mogą być niespójne, a użytkownik musi kliknąć dwukrotnie lub inaczej zmienić powiększenie, by zobaczyć treści i wejść z nimi w interakcję.

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


Wartość metatagu viewport `width=device-width` powoduje, że strona dopasowuje się do szerokości ekranu w pikselach niezależnych od urządzenia. Dzięki temu jej zawartość może zostać ułożona odpowiednio do danego rozmiaru ekranu &ndash; zarówno małego w telefonie komórkowym, jak i dużego w monitorze komputera.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Strona bez ustawionego tagu viewport">
      Zobacz przykład
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Strona z ustawionym tagiem viewport">
      Zobacz przykład
    {% endlink_sample %}
  </div>
</div>

Niektóre przeglądarki utrzymują stałą szerokość strony podczas obrotu do trybu poziomego i powiększają widok zamiast na nowo ułożyć zawartość na ekranie. Atrybut `initial-scale=1` poleca przeglądarce ustanowić relację 1:1 między pikselami CSS a pikselami niezależnymi od urządzenia, bez względu na jego orientację. To pozwala wykorzystać pełną szerokość strony w trybie poziomym.

{% include shared/remember.liquid inline="True" list=page.notes.use-commas %}

## Ułatwianie dostępu do treści w widocznym obszarze

Oprócz `initial-scale` możesz też ustawić te atrybuty tagu viewport:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Po ustawieniu mogą one uniemożliwić użytkownikowi powiększanie widocznego obszaru, powodując problemy z dostępnością.



