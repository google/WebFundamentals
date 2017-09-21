project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Większość stron internetowych nie jest zoptymalizowana do działania na różnych rodzajach urządzeń. Poznaj podstawy, dzięki którym Twoja witryna będzie działać na komputerach, urządzeniach mobilnych i wszystkich innych, które mają ekran.


{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Podstawy elastycznego projektowania witryn {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="oK09n_PGhTo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Liczba urządzeń mobilnych używanych do surfowania po sieci rośnie w astronomicznym tempie, jednak większość stron internetowych nie jest zoptymalizowana do działania na tych urządzeniach. Częstym ograniczeniem urządzeń mobilnych jest rozmiar wyświetlacza, dlatego wymagają one stosowania innych sposobów rozmieszczania treści na ekranie.

<div class="clearfix"></div>


{% include "web/_shared/udacity/ud893.html" %}




Ekrany mogą być w wielu różnych rozmiarach &ndash; na telefonach, `fabletach`, tabletach, komputerach, konsolach do gier, telewizorach, a nawet urządzeniach do noszenia. Zawsze będą pojawiać się nowe, dlatego witryna powinna dostosowywać się do każdego rozmiaru ekranu &ndash; teraz i w przyszłości.


  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>


Elastyczne projektowanie witryn, pierwotnie zdefiniowane przez [Ethana Marcotte`a w czasopiśmie A List Apart](http://alistapart.com/article/responsive-web-design/){: .external } to odpowiedź na potrzeby użytkowników i ich urządzeń. Układ strony zmienia się w zależności od rozmiaru i możliwości urządzenia. Na przykład na telefonie użytkownik widzi treści w jednej kolumnie. Z kolei na tablecie te same treści są już wyświetlane w dwóch kolumnach.


## Ustawianie tagu viewport

Strony zoptymalizowane pod kątem działania na rozmaitych urządzeniach muszą w nagłówku dokumentu zawierać metatag viewport. Przekazuje on przeglądarce instrukcje, jak sterować wymiarami i skalowaniem strony.




### TL;DR {: .hide-from-toc }
- Użyj metatagu viewport, by sterować szerokością i skalowaniem widocznego obszaru w przeglądarkach.
- Dołącz tag <code>width=device-width</code>, by dopasować stronę do szerokości ekranu w pikselach niezależnych od urządzenia.
- Dołącz tag <code>initial-scale=1</code>, by utworzyć relację 1:1 między pikselami CSS a pikselami niezależnymi od urządzenia.
- Nie wyłączaj skalowania strony przez użytkownika, by nie ograniczać jej dostępności.


Aby strona działała jak najlepiej, przeglądarki mobilne renderują ją w szerokości ekranu komputera (zwykle około 980&nbsp;pikseli, choć zdarzają się też inne wartości), a potem próbują poprawić wygląd treści, zwiększając czcionki i skalując zawartość, by pasowała do ekranu. W takiej sytuacji rozmiary czcionek mogą być niespójne, a użytkownik musi kliknąć dwukrotnie lub inaczej zmienić powiększenie, by zobaczyć treści i wejść z nimi w interakcję.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


Wartość metatagu viewport `width=device-width` powoduje, że strona dopasowuje się do szerokości ekranu w pikselach niezależnych od urządzenia. Dzięki temu jej zawartość może zostać ułożona odpowiednio do danego rozmiaru ekranu &ndash; zarówno małego w telefonie komórkowym, jak i dużego w monitorze komputera.

<img src="imgs/no-vp.png" class="attempt-left" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Strona bez ustawionego tagu viewport">
<img src="imgs/vp.png" class="attempt-right"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Strona z ustawionym tagiem viewport">
<div class="clearfix"></div>


Niektóre przeglądarki utrzymują stałą szerokość strony podczas obrotu do trybu poziomego i powiększają widok zamiast na nowo ułożyć zawartość na ekranie. Atrybut `initial-scale=1` poleca przeglądarce ustanowić relację 1:1 między pikselami CSS a pikselami niezależnymi od urządzenia, bez względu na jego orientację. To pozwala wykorzystać pełną szerokość strony w trybie poziomym.

Note: Atrybuty rozdziel przecinkami, by starsze przeglądarki analizowały je prawidłowo.

## Ułatwianie dostępu do treści w widocznym obszarze

Oprócz `initial-scale` możesz też ustawić te atrybuty tagu viewport:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Po ustawieniu mogą one uniemożliwić użytkownikowi powiększanie widocznego obszaru, powodując problemy z dostępnością.


## Dostosowywanie rozmiaru treści do widocznego obszaru

Zarówno na komputerach, jak i urządzeniach mobilnych użytkownicy są przyzwyczajeni do przewijania stron w pionie, ale nie w poziomie. Zmuszanie użytkownika do przewijania w poziomie lub pomniejszania widoku, gdy chce zobaczyć pozostałą część strony, obniża wygodę obsługi.


### TL;DR {: .hide-from-toc }
- Nie używaj dużych elementów o stałej szerokości.
- Prawidłowe renderowanie treści nie powinno zależeć od konkretnej szerokości widocznego obszaru.
- Użyj zapytań o media CSS, by zastosować różne style na małych i dużych ekranach.


Podczas tworzenia witryny mobilnej z metatagiem `viewport` łatwo przypadkowo dodać do strony treści, które nie pasują do określonego widocznego obszaru. Na przykład obraz szerszy niż widoczny obszar powoduje konieczność przewijania w poziomie. Elementy tego typu trzeba dopasować do szerokości widocznego obszaru, tak by użytkownik nie musiał przewijać ich w bok.

Wymiary ekranu i szerokość w pikselach CSS mogą bardzo się różnić na poszczególnych urządzeniach (np. telefonach i tabletach czy nawet różnych telefonach), dlatego prawidłowe renderowanie treści nie powinno zależeć od konkretnej szerokości widocznego obszaru.

Ustawienie dużych bezwzględnych szerokości CSS elementów strony (tak jak w przykładzie poniżej) spowoduje, że element `div` będzie zbyt szeroki dla widocznego obszaru na węższym urządzeniu (np. iPhonie, który ma 320&nbsp;pikseli szerokości CSS). Zamiast tego użyj względnych wartości szerokości, na przykład `width: 100%`. Podobnie pamiętaj, by nie używać dużych bezwzględnych wartości pozycji, które mogą spowodować, że element znajdzie się poza widocznym obszarem na małym ekranie.

<img src="imgs/vp-fixed-iph.png" class="attempt-left" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Strona z elementem o stałej szerokości 344&nbsp;pikseli na iPhonie">
<img src="imgs/vp-fixed-n5.png" class="attempt-right" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Strona z elementem o stałej szerokości 344&nbsp;pikseli na Nexusie 5.">
<div class="clearfix"></div>



## Zwiększanie elastyczności dzięki zapytaniom o media CSS

Zapytania o media to proste filtry, które można zastosować do stylów CSS. Ułatwiają zmianę stylów na podstawie cech urządzenia, które renderuje treści, takich jak typ wyświetlacza, szerokość, wysokość, orientacja, a nawet rozdzielczość.




### TL;DR {: .hide-from-toc }
- Zapytań o media możesz używać, by stosować style na podstawie cech urządzenia.
- Użyj <code>min-width</code> zamiast <code>min-device-width</code>, by interfejs był jak najszerszy.
- Użyj względnych rozmiarów elementów, by uniknąć zniekształcenia układu.



Na przykład możesz umieścić wszystkie style potrzebne do drukowania w zapytaniu o media `print`:


    <link rel="stylesheet" href="print.css" media="print">
    

Istnieją jeszcze dwa inne sposoby (oprócz atrybutu `media` w linku arkusza stylów) użycia zapytań o media stosowane w pliku CSS: `@media` i `@import`. Ze względu na wydajność zamiast instrukcji `@import` zalecamy dwie pierwsze metody (przeczytaj sekcję [Unikanie importu CSS](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

Reguły logiczne stosowane przy zapytaniach o media nie wykluczają się nawzajem i każdy filtr, który spełnia kryteria danego bloku CSS, zostanie zastosowany zgodnie ze standardowymi regułami pierwszeństwa w CSS.

### Stosowanie zapytań o media na podstawie rozmiaru widocznego obszaru

Zapytania o media umożliwiają tworzenie elastycznych interfejsów, w których wybrane style są stosowane na małych, dużych i wszystkich pośrednich ekranach. Składnia zapytań o media pozwala opracowywać reguły stosowane w zależności od cech urządzenia.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

Jest kilka różnych elementów, których może dotyczyć zapytanie, jednak przy elastycznym projektowaniu witryn najczęściej używa się `min-width`, `max-width`, `min-height` i `max-height`.


<table>
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
  
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Podgląd strony, która korzysta z zapytań o media, by zmieniać właściwości podczas skalowania widoku.">
  
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* Gdy przeglądarka ma szerokość od <b>0</b> do <b>640&nbsp;pikseli</b>, stosujemy plik `max-640px.css`.
* Gdy przeglądarka ma szerokość od <b>500</b> do <b>600&nbsp;pikseli</b>, stosujemy style z bloku `@media`.
* Gdy przeglądarka ma szerokość <b>co najmniej 640&nbsp;pikseli</b>, stosujemy plik `min-640px.css`.
* Gdy przeglądarka ma <b>szerokość większą niż wysokość</b>, stosujemy plik `landscape.css`.
* Gdy przeglądarka ma <b>wysokość większą niż szerokość</b>, stosujemy plik `portrait.css`.


### Uwaga o `min-device-width`

Zapytania o media można też tworzyć, korzystając z atrybutu `*-device-width`, jednak **zdecydowanie odradzamy** tę metodę.

Różnica jest niewielka, ale bardzo ważna: `min-width` zależy od rozmiaru okna przeglądarki, a `min-device-width` &ndash; od rozmiaru ekranu. Niektóre przeglądarki (w tym starsza przeglądarka w Androidzie) mogą nie zgłaszać prawidłowo szerokości urządzenia &ndash; zamiast oczekiwanej szerokości widocznego obszaru podają rozmiar ekranu w pikselach urządzenia.

Oprócz tego użycie `*-device-width` może uniemożliwiać dostosowywanie układu treści na komputerach i innych urządzeniach, które pozwalają zmieniać wymiary okien. Powodem jest to, że zapytanie dotyczy rzeczywistej szerokości urządzenia, a nie rozmiaru okna przeglądarki.

### Korzystanie z jednostek względnych

Podstawowa zaleta, która odróżnia projektowanie elastyczne od układów o stałej szerokości, to płynność i proporcjonalność. Stosowanie jednostek względnych miary pomaga uprościć układy i zapobiega przypadkowemu tworzeniu komponentów, które wychodzą poza widoczny obszar.

Na przykład ustawienie `width: 100%` w elemencie div najwyższego poziomu gwarantuje, że rozciągnie się on na szerokość widocznego obszaru i nigdy nie będzie zbyt duży ani zbyt mały. Element div będzie zawsze pasować &ndash; zarówno na iPhonie o szerokości 320&nbsp;pikseli, Blackberry Z10 o szerokości 342&nbsp;pikseli, jak i na Nexusie 5 o szerokości 360&nbsp;pikseli.

Jednostki względne pozwalają też przeglądarkom renderować treści zgodnie z poziomem powiększenia ustawionym przez użytkownika, bez potrzeby dodawania poziomych pasków przewijania strony.

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }



## Jak wybierać punkty graniczne

Podczas definiowania punktów granicznych można kierować się klasami urządzeń, jednak lepiej zachować ostrożność. Utrzymanie punktów granicznych utworzonych pod konkretne, używane obecnie urządzenia, produkty, marki czy systemy operacyjne, może okazać się wyjątkowo pracochłonne. Sposób dostosowywania układu do kontenera powinien zależeć od samych treści.



### TL;DR {: .hide-from-toc }
- Utwórz punkty graniczne na podstawie treści, nigdy pod konkretne urządzenia, produkty czy marki.
- Projektowanie zacznij od najmniejszego urządzenia mobilnego, a potem stopniowo powiększaj interfejs wraz ze wzrostem rozmiaru ekranów.
- Postaraj się, by długość wierszy tekstu nie przekraczała 70-80&nbsp;znaków.


### Określ główne punkty graniczne, zaczynając od małego rozmiaru i stopniowo go powiększając

Najpierw zaprojektuj treści tak, by pasowały do ekranu o małym rozmiarze, a potem powiększaj go, aż trzeba będzie utworzyć punkt graniczny. W ten sposób zoptymalizujesz punkty pod kątem treści i uzyskasz najmniejszą ich liczbę.

Opracujmy przykład pokazany na początku &ndash; [prognozę pogody](/web/fundamentals/design-and-ux/responsive/).
W pierwszej kolejności postaraj się, by prognoza dobrze wyglądała na małym ekranie.

<figure>
  
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="Podgląd prognozy pogody na małym ekranie.">
  
</figure>

Następnie powiększaj okno przeglądarki, aż między poszczególnymi elementami będzie tyle pustego miejsca, że prognoza przestanie wyglądać dobrze. Ocena jest dość subiektywna, ale ponad 600&nbsp;pikseli szerokości to z pewnością za dużo.

<figure>
  
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Podgląd prognozy pogody po poszerzeniu strony">
  
</figure>

Aby wstawić punkt graniczny przy 600&nbsp;pikselach, utwórz dwa nowe arkusze stylów: jeden stosowany wtedy, gdy szerokość przeglądarki nie przekracza 600&nbsp;pikseli, a drugi &ndash; powyżej tej wartości.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

Na koniec popraw style CSS. W tym przykładzie umieściliśmy wspólne style (takie jak czcionki, ikony, podstawowe pozycjonowanie oraz kolory) w pliku `weather.css`. Konkretne układy na mały ekran są w pliku `weather-small.css`, a style na duży &ndash; w pliku `weather-large.css`.

<figure>
  
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  
</figure>

### W razie potrzeby określ dodatkowe punkty graniczne

Oprócz głównych punktów granicznych, przy których układ znacznie się zmienia, warto też wyznaczyć miejsca wprowadzania drobnych zmian. Na przykład między głównymi punktami granicznymi możesz dostosowywać marginesy lub odstępy elementu czy zwiększać rozmiar czcionki, by wyglądała ona bardziej naturalnie w układzie.

Zacznijmy od zoptymalizowania układu na małym ekranie. Gdy szerokość widocznego obszaru przekroczy 360&nbsp;pikseli, powiększymy czcionkę. Jeśli na ekranie będzie dość miejsca, rozdzielimy najniższą i najwyższą temperaturę &ndash; będą w tym samym wierszu zamiast jedna nad drugą. Powiększymy też nieco ikony symbolizujące warunki pogodowe.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>

<img src="imgs/weather-4-l.png" class="attempt-left"  srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
<img src="imgs/weather-4-r.png" class="attempt-right"  srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
<div class="clearfix"></div>


Podobnie na dużych ekranach warto ograniczyć maksymalną szerokość panelu prognozy, by nie zajął całej szerokości ekranu.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

### Zoptymalizuj tekst do czytania

Według klasycznych zasad gwarantujących czytelność tekstu idealna szpalta powinna zawierać 70-80&nbsp;znaków w wierszu (około 8-10&nbsp;wyrazów). Dlatego za każdym razem, gdy wiersz w bloku tekstu przekroczy 10&nbsp;wyrazów, należy rozważyć utworzenie punktu granicznego.

<img src="imgs/reading-ph.png" class="attempt-left"  srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Przed utworzeniem dodatkowych punktów granicznych">
<img src="imgs/reading-de.png" class="attempt-right"  srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="Po utworzeniu dodatkowych punktów granicznych">
<div class="clearfix"></div>


Przyjrzyjmy się dokładniej powyższemu przykładowi posta na blogu. Na mniejszych ekranach czcionka Roboto o rozmiarze 1&nbsp;em działa idealnie, dając 10&nbsp;wyrazów w wierszu, ale na większych wymaga punktu granicznego. Jeśli szerokość przeglądarki przekroczy 575&nbsp;pikseli, idealna szerokość treści to 550&nbsp;pikseli.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### Nigdy nie ukrywaj zupełnie treści

Przy podejmowaniu decyzji, które treści ukryć lub pokazać w zależności od rozmiaru ekranu, zachowaj ostrożność.
Nie ukrywaj treści tylko dlatego, że nie mieszczą się na ekranie. Rozmiar ekranu nie jest ostatecznym wyznacznikiem oczekiwań użytkownika. Na przykład usunięcie liczby pyłków z prognozy pogody może być bardzo kłopotliwe dla osób, które wiosną cierpią na alergie i potrzebują informacji, czy mogą bez obaw wyjść z domu.
