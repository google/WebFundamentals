---
title: "Jak wybierać punkty graniczne"
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
  Podczas definiowania punktów granicznych można kierować się klasami urządzeń, jednak lepiej zachować ostrożność. Utrzymanie punktów granicznych utworzonych pod konkretne, używane obecnie urządzenia, produkty, marki czy systemy operacyjne, może okazać się wyjątkowo pracochłonne. Sposób dostosowywania układu do kontenera powinien zależeć od samych treści.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## Określ główne punkty graniczne, zaczynając od małego rozmiaru i stopniowo go powiększając

Najpierw zaprojektuj treści tak, by pasowały do ekranu o małym rozmiarze, a potem powiększaj go, aż trzeba będzie utworzyć punkt graniczny. W ten sposób zoptymalizujesz punkty pod kątem treści i uzyskasz najmniejszą ich liczbę.

Opracujmy przykład pokazany na początku &ndash; [prognozę pogody]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html).
W pierwszej kolejności postaraj się, by prognoza dobrze wyglądała na małym ekranie.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Podgląd prognozy pogody na małym ekranie.">
  {% endlink_sample %}
</figure>

Następnie powiększaj okno przeglądarki, aż między poszczególnymi elementami będzie tyle pustego miejsca, że prognoza przestanie wyglądać dobrze. Ocena jest dość subiektywna, ale ponad 600&nbsp;pikseli szerokości to z pewnością za dużo.

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Podgląd prognozy pogody po poszerzeniu strony">
  {% endlink_sample %}
</figure>

Aby wstawić punkt graniczny przy 600&nbsp;pikselach, utwórz dwa nowe arkusze stylów: jeden stosowany wtedy, gdy szerokość przeglądarki nie przekracza 600&nbsp;pikseli, a drugi &ndash; powyżej tej wartości.

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

Na koniec popraw style CSS. W tym przykładzie umieściliśmy wspólne style (takie jak czcionki, ikony, podstawowe pozycjonowanie oraz kolory) w pliku `weather.css`. Konkretne układy na mały ekran są w pliku `weather-small.css`, a style na duży &ndash; w pliku `weather-large.css`.

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## W razie potrzeby określ dodatkowe punkty graniczne

Oprócz głównych punktów granicznych, przy których układ znacznie się zmienia, warto też wyznaczyć miejsca wprowadzania drobnych zmian. Na przykład między głównymi punktami granicznymi możesz dostosowywać marginesy lub odstępy elementu czy zwiększać rozmiar czcionki, by wyglądała ona bardziej naturalnie w układzie.

Zacznijmy od zoptymalizowania układu na małym ekranie. Gdy szerokość widocznego obszaru przekroczy 360&nbsp;pikseli, powiększymy czcionkę. Jeśli na ekranie będzie dość miejsca, rozdzielimy najniższą i najwyższą temperaturę &ndash; będą w tym samym wierszu zamiast jedna nad drugą. Powiększymy też nieco ikony symbolizujące warunki pogodowe.

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

Podobnie na dużych ekranach warto ograniczyć maksymalną szerokość panelu prognozy, by nie zajął całej szerokości ekranu.

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## Zoptymalizuj tekst do czytania

Według klasycznych zasad gwarantujących czytelność tekstu idealna szpalta powinna zawierać 70-80&nbsp;znaków w wierszu (około 8-10&nbsp;wyrazów). Dlatego za każdym razem, gdy wiersz w bloku tekstu przekroczy 10&nbsp;wyrazów, należy rozważyć utworzenie punktu granicznego.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Przed utworzeniem dodatkowych punktów granicznych">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Po utworzeniu dodatkowych punktów granicznych">
  </div>
</div>

Przyjrzyjmy się dokładniej powyższemu przykładowi posta na blogu. Na mniejszych ekranach czcionka Roboto o rozmiarze 1&nbsp;em działa idealnie, dając 10&nbsp;wyrazów w wierszu, ale na większych wymaga punktu granicznego. Jeśli szerokość przeglądarki przekroczy 575&nbsp;pikseli, idealna szerokość treści to 550&nbsp;pikseli.

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## Nigdy nie ukrywaj zupełnie treści

Przy podejmowaniu decyzji, które treści ukryć lub pokazać w zależności od rozmiaru ekranu, zachowaj ostrożność.
Nie ukrywaj treści tylko dlatego, że nie mieszczą się na ekranie. Rozmiar ekranu nie jest ostatecznym wyznacznikiem oczekiwań użytkownika. Na przykład usunięcie liczby pyłków z prognozy pogody może być bardzo kłopotliwe dla osób, które wiosną cierpią na alergie i potrzebują informacji, czy mogą bez obaw wyjść z domu.




