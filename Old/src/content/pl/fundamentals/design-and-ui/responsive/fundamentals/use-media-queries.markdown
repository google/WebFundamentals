---
title: "Zwiększanie elastyczności dzięki zapytaniom o media CSS"
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
  Zapytania o media to proste filtry, które można zastosować do stylów CSS. Ułatwiają zmianę stylów na podstawie cech urządzenia, które renderuje treści, takich jak typ wyświetlacza, szerokość, wysokość, orientacja, a nawet rozdzielczość.
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


Na przykład możesz umieścić wszystkie style potrzebne do drukowania w zapytaniu o media `print`:

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

Istnieją jeszcze dwa inne sposoby (oprócz atrybutu `media` w linku arkusza stylów) użycia zapytań o media stosowane w pliku CSS: `@media` i `@import`. Ze względu na wydajność zamiast instrukcji `@import` zalecamy dwie pierwsze metody (przeczytaj sekcję [Unikanie importu CSS]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)).

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

Reguły logiczne stosowane przy zapytaniach o media nie wykluczają się nawzajem i każdy filtr, który spełnia kryteria danego bloku CSS, zostanie zastosowany zgodnie ze standardowymi regułami pierwszeństwa w CSS.

## Stosowanie zapytań o media na podstawie rozmiaru widocznego obszaru

Zapytania o media umożliwiają tworzenie elastycznych interfejsów, w których wybrane style są stosowane na małych, dużych i wszystkich pośrednich ekranach. Składnia zapytań o media pozwala opracowywać reguły stosowane w zależności od cech urządzenia.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

Jest kilka różnych elementów, których może dotyczyć zapytanie, jednak przy elastycznym projektowaniu witryn najczęściej używa się `min-width`, `max-width`, `min-height` i `max-height`.


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Atrybut">Atrybut</th>
      <th data-th="Wynik">Wynik</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Atrybut"><code>min-width</code></td>
      <td data-th="Wynik">Reguły obowiązują w każdej przeglądarce, której szerokość przekracza wartość podaną w zapytaniu.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>max-width</code></td>
      <td data-th="Wynik">Reguły obowiązują w każdej przeglądarce, której szerokość jest poniżej wartości podanej w zapytaniu.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>min-height</code></td>
      <td data-th="Wynik">Reguły obowiązują w każdej przeglądarce, której wysokość przekracza wartość podaną w zapytaniu.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>max-height</code></td>
      <td data-th="Wynik">Reguły obowiązują w każdej przeglądarce, której wysokość jest poniżej wartości podanej w zapytaniu.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>orientation=portrait</code></td>
      <td data-th="Wynik">Reguły obowiązują w każdej przeglądarce, której wysokość jest równa szerokości lub większa.</td>
    </tr>
    <tr>
      <td data-th="Atrybut"><code>orientation=landscape</code></td>
      <td data-th="Wynik">Reguły obowiązują w każdej przeglądarce, której szerokość jest większa niż wysokość.</td>
    </tr>
  </tbody>
</table>

Przyjrzyjmy się przykładowi:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Podgląd strony, która korzysta z zapytań o media, by zmieniać właściwości podczas skalowania widoku.">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* Gdy przeglądarka ma szerokość od <b>0</b> do <b>640&nbsp;pikseli</b>, stosujemy plik `max-640px.css`.
* Gdy przeglądarka ma szerokość od <b>500</b> do <b>600&nbsp;pikseli</b>, stosujemy style z bloku `@media`.
* Gdy przeglądarka ma szerokość <b>co najmniej 640&nbsp;pikseli</b>, stosujemy plik `min-640px.css`.
* Gdy przeglądarka ma <b>szerokość większą niż wysokość</b>, stosujemy plik `landscape.css`.
* Gdy przeglądarka ma <b>wysokość większą niż szerokość</b>, stosujemy plik `portrait.css`.


## Uwaga o `min-device-width`

Zapytania o media można też tworzyć, korzystając z atrybutu `*-device-width`, jednak **zdecydowanie odradzamy** tę metodę.

Różnica jest niewielka, ale bardzo ważna: `min-width` zależy od rozmiaru okna przeglądarki, a `min-device-width` &ndash; od rozmiaru ekranu. Niektóre przeglądarki (w tym starsza przeglądarka w Androidzie) mogą nie zgłaszać prawidłowo szerokości urządzenia &ndash; zamiast oczekiwanej szerokości widocznego obszaru podają rozmiar ekranu w pikselach urządzenia.

Oprócz tego użycie `*-device-width` może uniemożliwiać dostosowywanie układu treści na komputerach i innych urządzeniach, które pozwalają zmieniać wymiary okien. Powodem jest to, że zapytanie dotyczy rzeczywistej szerokości urządzenia, a nie rozmiaru okna przeglądarki.

## Korzystanie z jednostek względnych

Podstawowa zaleta, która odróżnia projektowanie elastyczne od układów o stałej szerokości, to płynność i proporcjonalność. Stosowanie jednostek względnych miary pomaga uprościć układy i zapobiega przypadkowemu tworzeniu komponentów, które wychodzą poza widoczny obszar.

Na przykład ustawienie `width: 100%` w elemencie div najwyższego poziomu gwarantuje, że rozciągnie się on na szerokość widocznego obszaru i nigdy nie będzie zbyt duży ani zbyt mały. Element div będzie zawsze pasować &ndash; zarówno na iPhonie o szerokości 320&nbsp;pikseli, Blackberry Z10 o szerokości 342&nbsp;pikseli, jak i na Nexusie 5 o szerokości 360&nbsp;pikseli.

Jednostki względne pozwalają też przeglądarkom renderować treści zgodnie z poziomem powiększenia ustawionym przez użytkownika, bez potrzeby dodawania poziomych pasków przewijania strony.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



