project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obraz jest wart tysiąc słów, a grafiki są nieodłączną częścią każdej strony. Jednak często stanowią większość pobieranych danych. Elastyczne projektowanie witryn pozwala na podstawie cech urządzenia zmieniać nie tylko układ strony, ale też obrazy.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Obrazy {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



Obraz jest wart tysiąc słów, a grafiki są nieodłączną częścią każdej strony. Jednak często stanowią większość pobieranych danych. Elastyczne projektowanie witryn pozwala na podstawie cech urządzenia zmieniać nie tylko układ strony, ale też obrazy.


### Elastyczne obrazy

Elastyczne projektowanie witryn oznacza, że na podstawie cech urządzenia może zmieniać się nie tylko układ strony, ale też jej zawartość. Na przykład wyświetlacze o wysokiej rozdzielczości (2x) wymagają grafiki o wysokiej rozdzielczości, by zagwarantować ostrość. Obraz przy szerokości 50% może wyglądać dobrze w przeglądarce szerokiej na 800&nbsp;pikseli, ale zajmuje za dużo miejsca na wąskim telefonie i wciąż tak samo obciąża łącze, mimo przeskalowania i dopasowania do mniejszego ekranu.

### Dostosowywanie grafiki

<img class="center" src="img/art-direction.png" alt="Przykład dostosowywania grafiki"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Czasami obraz trzeba zmienić w większym stopniu &ndash; dopasować proporcje, przyciąć, a nawet zastąpić innym. W takiej sytuacji zmianę obrazu określa się zwykle jako dostosowywanie grafiki. Więcej przykładów znajdziesz na [responsiveimages.org/demos/](http://responsiveimages.org/demos/){: .external }.


{% include "web/_shared/udacity/ud882.html" %}


## Obrazy w znacznikach

Element <code>img</code> ma duże możliwości &ndash; pobiera, dekoduje i renderuje treści &ndash; a współczesne przeglądarki obsługują szeroką gamę formatów graficznych. Dodawanie obrazów, które wyświetlają się na różnych urządzeniach, nie różni się od dodawania tych przeznaczonych na komputery. Aby stworzyć atrakcyjny interfejs, wystarczy wprowadzić tylko kilka drobnych poprawek.



### TL;DR {: .hide-from-toc }
- Użyj względnych rozmiarów obrazów, by zapobiec przypadkowemu wyjściu poza kontener.
- Gdy chcesz określić różne obrazy wyświetlane w zależności od cech urządzenia (tzn. dostosować grafikę), użyj elementu <code>picture</code>.
- Użyj atrybutu <code>srcset</code> i deskryptora <code>x</code> w elemencie <code>img</code>, by przy wyborze obrazu podpowiedzieć przeglądarce, której rozdzielczości najlepiej użyć.



### Korzystanie ze względnych rozmiarów obrazów

Przy określaniu szerokości obrazów używaj jednostek względnych, by zapobiec przypadkowemu wyjściu poza widoczny obszar. Na przykład `width: 50%` powoduje, że obraz ma 50% szerokości elementu, w którym się znajduje (nie widocznego obszaru ani konkretnego rozmiaru w pikselach).

CSS pozwala, by treści wychodziły poza swój kontener, więc czasami trzeba użyć parametru `max-width: 100%`, by uniemożliwić to obrazom i innym elementom. Na przykład:


    img, embed, object, video {
      max-width: 100%;
    }
    

Pamiętaj, by w atrybucie `alt` elementów `img` podać treściwe opisy. Zwiększają one dostępność strony, przekazując informacje czytnikom ekranu i innym funkcjom ułatwień dostępu.

### Rozszerzanie elementów `img` o atrybut `srcset` na potrzeby urządzeń z wysoką liczbą DPI

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Atrybut <code>srcset</code> rozszerza działanie elementu <code>img</code>, ułatwiając wyświetlanie różnych plików graficznych w zależności od cech urządzenia. Podobnie jak natywna <a href="#use_image-set_to_provide_high_res_images">funkcja CSS</a> <code>image-set</code>, atrybut <code>srcset</code> pozwala przeglądarce wybrać obraz, który najlepiej pasuje do możliwości urządzenia. Na przykład pokazać obraz 2x na ekranie 2x, a w przyszłości być może obraz 1x na urządzeniu 2x przy ograniczonej przepustowości sieci.

<div class="clearfix"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

Przeglądarki, które nie obsługują atrybutu `srcset`, wyświetlają domyślny plik graficzny podany w atrybucie `src`. Dlatego zawsze trzeba dołączać obraz 1x, który można pokazać na dowolnym urządzeniu, niezależnie od jego możliwości. Gdy atrybut `srcset` jest obsługiwany, przed wysłaniem jakichkolwiek żądań przeglądarka analizuje listę rozdzielonych przecinkami par obrazów i warunków, po czym pobiera i wyświetla najbardziej odpowiednią grafikę.

Warunki mogą obejmować wszystkie parametry &ndash; od gęstości pikseli aż po szerokość i wysokość, jednak obecnie dobrze działa tyko gęstość pikseli. Aby zachować równowagę między obecnym działaniem a przyszłymi funkcjami, poprzestań na wskazaniu obrazu 2x w atrybucie.

### Używanie elementu `picture` przy dostosowywaniu grafiki w postaci elastycznych obrazów

Jeśli chcesz wyświetlać obrazy na podstawie cech urządzenia, czyli dostosowywać grafikę, użyj elementu `picture`. Element <code>picture</code> pozwala stworzyć deklarację z wieloma wersjami obrazu, które zależą od różnych cech urządzenia &ndash; takich jak rozmiar, rozdzielczość, orientacja itp.

<img class="center" src="img/art-direction.png" alt="Przykład dostosowywania grafiki"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Note: Element <code>picture</code> zaczyna pojawiać się w przeglądarkach. Mimo że jeszcze nie jest dostępny w każdej z nich, zalecamy jego stosowanie, bo ma dużą zgodność wsteczną i pozwala wykorzystać kod <a href='http://picturefill.responsiveimages.org/'>polyfill Picturefill</a>. Szczegółowe informacje znajdziesz na <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Elementu <code>picture</code> należy używać wtedy, gdy mamy obraz źródłowy w różnych gęstościach lub gdy zasady projektowania elastycznego wymagają użycia nieco innego obrazu na niektórych typach ekranów. Podobnie jak w przypadku elementu <code>video</code>, możesz dodać wiele elementów <code>source</code>. To pozwala wskazać różne pliki graficzne w zależności od zapytań o media czy formatu obrazu.

<div class="clearfix"></div>

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" %}
</pre>

Jeśli przeglądarka w przykładzie powyżej ma szerokość co najmniej 800&nbsp;pikseli, to w zależności od rozdzielczości urządzenia wyświetli się plik `head.jpg` lub `head-2x.jpg`. Jeśli szerokość widoku wynosi od 450 do 800&nbsp;pikseli, na tej samej zasadzie pojawi się plik `head-small.jpg` lub `head-small-2x.jpg`. W przypadku szerokości ekranu mniejszej niż 450&nbsp;pikseli i zgodności wstecznej, gdy element `picture` nie jest obsługiwany, przeglądarka renderuje element `img`, który zawsze należy dołączyć.

#### Względne rozmiary obrazów

Jeśli ostateczny rozmiar obrazu jest nieznany, trudno określić deskryptor gęstości przy obrazach źródłowych. Szczególnie wtedy, gdy obrazy rozciągają się proporcjonalnie do szerokości przeglądarki i zmieniają się płynnie w zależności od jej rozmiaru.

Zamiast podawać stałe rozmiary i gęstości obrazów, wielkość każdego z nich możesz określić, dodając deskryptor szerokości do rozmiaru w elemencie image. To pozwala przeglądarce automatycznie obliczać skuteczną gęstość pikseli i wybierać najlepszy obraz do pobrania.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" %}
</pre>

W przykładzie powyżej renderujemy obraz, który ma połowę szerokości widocznego obszaru (`sizes="50vw"`). Przeglądarka w zależności od swojej szerokości i współczynnika pikseli urządzenia wybiera właściwy obraz, bez względu na to, jak duże jest jej okno. Ta tabela pokazuje, który obraz wybierze przeglądarka:

<table>
    <thead>
    <tr>
      <th data-th="Szerokość przeglądarki">Szerokość przeglądarki</th>
      <th data-th="Współczynnik pikseli urządzenia">Współczynnik pikseli urządzenia</th>
      <th data-th="Wyświetlony obraz">Wyświetlony obraz</th>
      <th data-th="Skuteczna rozdzielczość">Skuteczna rozdzielczość</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Szerokość przeglądarki">400&nbsp;pikseli</td>
      <td data-th="Współczynnik pikseli urządzenia">1</td>
      <td data-th="Wyświetlony obraz"><code>200.png</code></td>
      <td data-th="Skuteczna rozdzielczość">1&nbsp;x</td>
    </tr>
    <tr>
      <td data-th="Szerokość przeglądarki">400&nbsp;pikseli</td>
      <td data-th="Współczynnik pikseli urządzenia">2</td>
      <td data-th="Wyświetlony obraz"><code>400.png</code></td>
      <td data-th="Skuteczna rozdzielczość">2&nbsp;x</td>
    </tr>
    <tr>
      <td data-th="Szerokość przeglądarki">320&nbsp;pikseli</td>
      <td data-th="Współczynnik pikseli urządzenia">2</td>
      <td data-th="Wyświetlony obraz"><code>400.png</code></td>
      <td data-th="Skuteczna rozdzielczość">2,5&nbsp;x</td>
    </tr>
    <tr>
      <td data-th="Szerokość przeglądarki">600&nbsp;pikseli</td>
      <td data-th="Współczynnik pikseli urządzenia">2</td>
      <td data-th="Wyświetlony obraz"><code>800.png</code></td>
      <td data-th="Skuteczna rozdzielczość">2,67&nbsp;x</td>
    </tr>
    <tr>
      <td data-th="Szerokość przeglądarki">640&nbsp;pikseli</td>
      <td data-th="Współczynnik pikseli urządzenia">3</td>
      <td data-th="Wyświetlony obraz"><code>1000.png</code></td>
      <td data-th="Skuteczna rozdzielczość">3,125&nbsp;x</td>
    </tr>
    <tr>
      <td data-th="Szerokość przeglądarki">1100&nbsp;pikseli</td>
      <td data-th="Współczynnik pikseli urządzenia">1</td>
      <td data-th="Wyświetlony obraz"><code>1400.png</code></td>
      <td data-th="Skuteczna rozdzielczość">1,27&nbsp;x</td>
    </tr>
  </tbody>
</table>


#### Uwzględnianie punktów granicznych przy elastycznych obrazach

W wielu przypadkach rozmiar lub obraz może się zmieniać w zależności od punktów granicznych w układzie strony. Na przykład na małym ekranie obraz może rozciągać się na całą szerokość widocznego obszaru, a na większym &ndash; zajmować tylko jego część. 

<pre class="prettyprint">
{% includecode adjust_indentation="auto" content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" %}
</pre>

Atrybut `sizes` w przykładowym kodzie powyżej zawiera kilka zapytań o media, które określają rozmiar obrazu. Gdy szerokość przeglądarki przekracza 600&nbsp;pikseli, obraz ma 25% szerokości widocznego obszaru, od 500 do 600&nbsp;pikseli ma 50%, a poniżej 500&nbsp;pikseli &ndash; pełną szerokość.


### Ustawianie obrazów produktów jako rozwijanych

Klienci chcą zobaczyć, co kupują. Spodziewają się, że na stronie sklepu będą mogli wyświetlić zbliżenia produktu w wysokiej rozdzielczości, by lepiej przyjrzeć się szczegółom. [Uczestników naszego badania](/web/fundamentals/getting-started/principles/) irytował brak takiej możliwości.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Witryna J. Crew z rozwijanym zdjęciem produktu">
  <figcaption>Witryna J. Crew z rozwijanym zdjęciem produktu</figcaption>
</figure>

Dobry przykład obrazów, które można kliknąć i rozwinąć, znajdziemy w witrynie J. Crew. Znikająca nakładka wskazuje, że obraz można kliknąć, by go powiększyć i zobaczyć drobne szczegóły.


### Inne techniki związane z obrazami

#### Obrazy kompresowane

[Technika obrazów kompresowanych](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) pozwala wyświetlać bardzo skompresowane obrazy 2x na wszystkich urządzeniach, bez względu na ich faktyczne możliwości. W zależności od typu obrazu i poziomu kompresji zmiana jakości może być niezauważalna, ale rozmiar pliku znacznie się zmniejsza.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html">Zobacz przykład</a>

Note: Zachowaj ostrożność przy korzystaniu z technik kompresji, bo dekodowanie wymaga większej ilości pamięci i obciąża procesor. Zmiana rozmiaru dużych obrazów, by zmieściły się na mniejszym ekranie, wymaga znacznych zasobów i jest szczególnie uciążliwa na słabszych urządzeniach z niewielką pamięcią i mocą procesora.

#### Zastępowanie obrazów w JavaScripcie

Zastępowanie obrazów w JavaScripcie pozwala sprawdzić możliwości urządzenia i zastosować najlepsze rozwiązanie. Można sprawdzić współczynnik pikseli urządzenia (dzięki `window.devicePixelRatio`) oraz szerokość i wysokość ekranu, a nawet przeanalizować połączenie internetowe (korzystając z `navigator.connection` lub wysyłając fałszywe żądanie). Po zebraniu wszystkich tych informacji można wybrać obraz do wczytania.

Dużą wadą tej metody jest to, że użycie JavaScriptu opóźnia wczytanie obrazu przynajmniej do momentu zakończenia działania parsera podglądu. To oznacza, że pobieranie obrazów zaczyna się dopiero po wywołaniu zdarzenia `pageload`. Oprócz tego przeglądarka zwykle wczytuje zarówno obraz 1x, jak i 2x, pobierając więcej danych.


## Obrazy w CSS

Właściwość CSS `background` to skuteczne narzędzie do umieszczania złożonych obrazów w elementach, które ułatwia dodawanie wielu obrazów, pozwala powtarzać je w elemencie itp. W połączeniu z zapytaniami o media staje się jeszcze bardziej przydatna, umożliwiając warunkowe wczytywanie obrazów na podstawie rozdzielczości ekranu, rozmiaru widocznego obszaru i innych parametrów.



### TL;DR {: .hide-from-toc }
- Używaj obrazów, które najlepiej pasują do cech wyświetlacza. Weź pod uwagę rozmiar ekranu, rozdzielczość urządzenia i układ strony.
- Zmień właściwość <code>background-image</code> w CSS na potrzeby wyświetlaczy o wysokiej liczbie DPI, korzystając z zapytań o media z parametrami <code>min-resolution</code> i <code>-webkit-min-device-pixel-ratio</code>.
- Dodaj do znaczników atrybut srcset, by oprócz obrazów w skali 1x wyświetlać też wersje w wysokiej rozdzielczości.
- Rozważ spadek wydajności podczas stosowania technik zastępowania grafik w JavaScripcie lub wyświetlania mocno skompresowanych obrazów w wysokiej rozdzielczości na urządzeniach o niższej rozdzielczości.


### Używanie zapytań o media do warunkowego wczytywania obrazów lub dostosowywania grafiki

Zapytania o media nie tylko wypływają na układ strony, ale też pozwalają warunkowo wczytywać obrazy i dostosowywać grafikę na podstawie szerokości widocznego obszaru.

W przykładzie poniżej na mniejszych ekranach tylko plik `small.png` jest pobierany i stosowany do elementu `div`. Z kolei na większych polecenie `background-image: url(body.png)` jest stosowane do treści, a `background-image: url(large.png)` &ndash; do elementu `div`.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" %}
</pre>

### Używanie funkcji image-set do wyświetlania obrazów w wysokiej rozdzielczości

Funkcja `image-set()` w CSS rozszerza działanie właściwości `background`, ułatwiając wyświetlanie różnych plików graficznych w zależności od cech urządzenia. Dzięki niej przeglądarka może wybrać obraz, który najlepiej pasuje do możliwości urządzenia. Na przykład pokazać obraz 2x na ekranie 2x lub obraz 1x na urządzeniu 2x przy ograniczonej przepustowości sieci.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Oprócz wczytania poprawnej grafiki przeglądarka także odpowiednio
ją skaluje. Krótko mówiąc, przeglądarka zakłada, że obrazy 2x są dwa razy większe niż 1x, więc pomniejsza je dwukrotnie, by miały właściwy rozmiar na stronie.

Funkcja `image-set()` jest dość nowa i działa tylko w Chrome i Safari z przedrostkiem dostawcy `-webkit`. Pamiętaj też, by dołączyć obraz zastępczy, na wypadek gdyby funkcja `image-set()` nie była obsługiwana, na przykład:

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" %}
</pre>

Kod powyżej powoduje wczytanie odpowiedniego zasobu w przeglądarkach, w których działa funkcja `image-set`, a w pozostałych &ndash; wyświetlenie zasobu zastępczego 1x. Oczywiście dopóki niewiele przeglądarek obsługuje `image-set()`, najczęściej użytkownicy będą widzieć zasób 1x.

### Używanie zapytań o media do wyświetlania obrazów w wysokiej rozdzielczości lub dostosowywania grafiki

W zapytaniach o media można tworzyć reguły, które zależą od [współczynnika pikseli urządzenia](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg), co pozwala określać różne obrazy przeznaczone na wyświetlacze 2x lub 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox i Opera obsługują standardowe polecenie `(min-resolution: 2dppx)`, a Safari i przeglądarka w Androidzie wymagają starszej wersji składni z przedrostkiem dostawcy i bez jednostki `dppx`. Pamiętaj, że te style wczytują się tylko wtedy, gdy urządzenie pasuje do zapytania o media, więc musisz zdefiniować też style stosowane w podstawowym przypadku. Dzięki temu zyskasz pewność, że nawet gdy przeglądarka nie obsługuje rozdzielczości podanej w konkretnych zapytaniach o media, wyrenderuje poprawny widok.

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" %}
</pre>

Możesz też użyć polecenia `min-width`, by wyświetlać alternatywne obrazy w zależności od rozmiaru widocznego obszaru. Zaleta tej techniki polega na tym, że jeśli zapytanie o media nie pasuje, obraz nie jest pobierany. Na przykład plik `bg.png` jest pobierany i stosowany w elemencie `body` tylko wtedy, gdy szerokość przeglądarki wynosi co najmniej 500&nbsp;pikseli:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
      


## Używanie obrazów SVG jako ikon

Jeśli to możliwe, jako ikon na swojej stronie użyj obrazów SVG, a w niektórych przypadkach znaków Unicode.


### TL;DR {: .hide-from-toc }
- Zamiast obrazów rastrowych jako ikon użyj obrazów SVG lub znaków Unicode.


### Zastępowanie prostych ikon znakami Unicode

Wiele czcionek zawiera rozmaite symbole Unicode, których możesz użyć zamiast obrazów. W przeciwieństwie do obrazów czcionki Unicode poprawnie się skalują i niezależnie od wielkości dobrze wyglądają na ekranie.

Oprócz normalnego zestawu znaków czcionka Unicode może obejmować formy numeryczne (&#8528;), strzałki (&#8592;), operatory matematyczne (&#8730;), kształty geometryczne (&#9733;), symbole elementów sterujących (&#9654;), kody alfabetu Braille`a (&#10255;), nuty (&#9836;), litery greckie (&#937;), a nawet bierki szachowe (&#9822;).

Znaki Unicode można dodawać do strony tak samo jak nazwane elementy &ndash; `&#XXXX`, gdzie `XXXX` to numer znaku Unicode. Na przykład:


    Jesteś super&#9733;
    

Jesteś super&#9733;

### Zastępowanie złożonych ikon obrazami SVG
Jeśli potrzebujesz bardziej złożonych ikon, skorzystaj z formatu SVG, który ma niewielkie wymagania, jest prosty w użyciu i działa ze stylami CSS. Obrazy SVG mają kilka zalet w porównaniu z obrazami rastrowymi:

* To grafika wektorowa, którą można skalować bez ograniczeń.
* Pozwalają w prosty sposób stosować efekty CSS takie jak kolor, cienie, przezroczystość i animacje.
* Można umieszczać je bezpośrednio w treści dokumentu.
* Mają charakter semantyczny.
* Dzięki odpowiednim atrybutom lepiej współpracują z funkcjami ułatwień dostępu.

&nbsp;

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" %}
</pre>

### Problemy przy stosowaniu czcionek z ikonami

Czcionki z ikonami są popularne i łatwe w użyciu, ale w porównaniu z ikonami SVG mają kilka wad.

* To grafika wektorowa, którą nie tylko można skalować bez ograniczeń, ale też poddawać wygładzaniu krawędzi. W efekcie ikony czasami nie są odpowiednio ostre.
* W ograniczonym stopniu działają ze stylami CSS.
* Dokładne pozycjonowanie pikseli może być trudne ze względu na wysokość wiersza, odstępy między literami itp.
* Nie mają charakteru semantycznego i niezbyt dobrze współpracują z czytnikami ekranu oraz innymi funkcjami ułatwień dostępu.
* Przy braku prawidłowego zakresu mogą powodować pobieranie dużych plików, mimo że używasz tylko niewielkiego podzbioru dostępnych ikon. 



<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Przykład strony z czcionką z ikonami Font Awesome">

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" %}
</pre>

Istnieją setki darmowych i płatnych czcionek z ikonami, np. [Font Awesome](http://fortawesome.github.io/Font-Awesome/){: .external }, [Pictos](http://pictos.cc/) czy [Glyphicons](http://glyphicons.com/).

Pamiętaj, by podczas wybierania ikon wziąć pod uwagę dodatkowe żądania HTTP i ilość pobieranych danych. Jeśli np. potrzebujesz tylko kilku ikon, lepiej użyć obrazu lub sprite`a graficznego.



## Optymalizowanie obrazów pod kątem wydajności


Obrazy często stanowią większość pobranych danych i zajmują znaczną część powierzchni strony. W efekcie ich optymalizacja może przynieść zauważalny spadek ilości pobieranych danych i zwiększenie wydajności witryny. Im mniej bajtów musi pobrać przeglądarka, tym szybciej pobierze i wyświetli wszystkie zasoby oraz w mniejszym stopniu obciąży łącze klienta.


### TL;DR {: .hide-from-toc }
- Nie wybieraj przypadkowo formatu obrazu. Zapoznaj się z dostępnymi formatami i wybierz ten najbardziej odpowiedni.
- W procesie tworzenia używaj narzędzi do optymalizacji i kompresji obrazów, by zmniejszyć rozmiary plików.
- Zmniejsz liczbę żądań HTTP, umieszczając często używane obrazy w sprite`ach graficznych.
- Rozważ opcję wczytywania obrazów dopiero wtedy, gdy po przewinięciu strony pojawią się w widoku, tak by skrócić czas początkowego wyświetlania strony i zmniejszyć ilość pobieranych danych.


### Wybór właściwego formatu

Należy wziąć pod uwagę dwa typy obrazów: [wektorowe](http://pl.wikipedia.org/wiki/Grafika_wektorowa){: .external } i [rastrowe](http://pl.wikipedia.org/wiki/Grafika_rastrowa). W przypadku obrazów rastrowych trzeba jeszcze wybrać właściwy format kompresji &ndash; np. GIF, PNG lub JPG.

**Obrazy rastrowe**, do których należą fotografie i inne grafiki, mają postać siatki osobnych kropek (pikseli). Zwykle pochodzą z aparatu lub skanera. Można też utworzyć je w przeglądarce, korzystając z elementu `canvas`. Wraz z powiększaniem się obrazu wzrasta wielkość pliku. Obraz przeskalowany do większego rozmiaru niż pierwotny staje się rozmazany, bo przeglądarka musi zgadywać, jak wypełnić brakujące piksele.

**Obrazy wektorowe**, do których należą logo i rysunki kreskowe, składają się z zestawu linii, krzywych, kształtów i kolorów wypełnienia. Powstają w takich programach jak Adobe Illustrator lub Inkscape i są zapisywane w formacie wektorowym, np. [SVG](http://css-tricks.com/using-svg/){: .external }. Obrazy wektorowe tworzy się z prostych elementów, dlatego można je skalować bez straty jakości i zmiany rozmiaru pliku.

Przy wyborze właściwego formatu musisz rozważyć zarówno rodzaj obrazu (rastrowy lub wektorowy), jak i jego treść (kolory, animacja, tekst itp.). Każdy format pasuje tylko do niektórych rodzajów obrazów oraz ma swoje zalety i wady.

Podczas wybierania formatu postępuj zgodnie z tymi wskazówkami:

* Przy fotografiach użyj JPG.
* Przy grafikach wektorowych i zawierających jednolite kolory (np. logo i rysunki kreskowe) użyj SVG.
 Jeśli grafika wektorowa jest niedostępna, skorzystaj z WebP lub PNG.
* Zamiast formatu GIF użyj PNG, który pozwala zastosować więcej kolorów i ma lepsze współczynniki kompresji.
* Przy dłuższych animacjach użyj tagu `<video>`, który daje wyższą jakość obrazu i pozwala użytkownikowi sterować odtwarzaniem.

### Zmniejszanie rozmiaru pliku

Plik można znacznie zmniejszyć, przetwarzając go po zapisaniu. Jest wiele narzędzi do kompresji obrazów &ndash; stratnej lub bezstratnej, online, z interfejsem graficznym, wierszem polecenia itp. W miarę możliwości najlepiej zautomatyzować optymalizację obrazów, by stała się uniwersalnym etapem procesu tworzenia.

Niektóre dostępne narzędzia wykonują dodatkową, bezstratną kompresję plików JPG i PNG, bez wpływu na jakość obrazu. W przypadku JPG wypróbuj [jpegtran](http://jpegclub.org/){: .external } lub [jpegoptim](http://freshmeat.net/projects/jpegoptim/) (dostępny tylko na Linuksa, uruchamiany z opcją --strip-all). W przypadku PNG wypróbuj [OptiPNG](http://optipng.sourceforge.net/) lub [PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Korzystanie ze sprite`ów graficznych

Spriting CSS to technika, w której wiele obrazów łączy się w jeden obraz `arkusza sprite`ów`. Aby następnie wybrać konkretną grafikę, trzeba określić obraz tła elementu (arkusz sprite`ów) i przesunięcie wskazujące właściwą część.

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt="Arkusz sprite'ów graficznych użyty jako przykład"></a>

<pre class="prettyprint">
{% includecode adjust_indentation="auto"  content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" %}
</pre>

Zaletą spritingu jest obniżenie liczby plików pobieranych przy wyświetlaniu wielu obrazów, bez utrudniania zapisu w pamięci podręcznej.

### Stosowanie leniwego wczytywania

Leniwe wczytywanie może znacznie przyspieszyć wyświetlanie długich stron, które w części widocznej po przewinięciu zawierają wiele obrazów. Obrazy te wczytują się w razie potrzeby lub po zakończeniu wczytywania i renderowania głównych treści. Oprócz podnoszenia wydajności leniwe wczytywanie pozwala tworzyć strony o nieograniczonej długości.

Podczas tworzenia takich stron zachowaj jednak ostrożność, bo wyszukiwarki mogą nie wykryć treści, które wczytują się dopiero po przewinięciu. Podobnie użytkownicy szukający informacji, które zwykle są w stopce, nigdy jej nie zobaczą, bo zawsze będą wczytywać się nowe treści.


## Całkowite unikanie obrazów


Czasami najlepszym rozwiązaniem jest całkowita rezygnacja z dodawania obrazu. Gdy to możliwe, warto używać natywnych funkcji przeglądarki, które dają takie same lub podobne efekty. Przeglądarki mogą obecnie generować elementy wizualne, które dawniej wymagały stosowania obrazów. Dzięki temu przeglądarka nie musi już pobierać osobnych plików graficznych i nie wyświetla obrazów w dziwnej skali. Ikony można renderować, korzystając ze standardu Unicode lub specjalnych czcionek z ikonami.


### Umieszczanie tekstu w znacznikach zamiast na obrazach

Gdy to tylko możliwe, tekst powinien być tekstem, a nie elementem obrazu. Na przykład nie należy używać grafik jako nagłówków ani umieszczać w nich informacji kontaktowych takich jak numery telefonów czy adresy. To uniemożliwia użytkownikom skopiowanie i wklejenie tych danych oraz ukrywa je przed czytnikami ekranu. Strona jest wtedy nieelastyczna. Zamiast tego umieść tekst w znacznikach i w razie potrzeby użyj czcionek internetowych, by uzyskać odpowiedni styl.

### Zastępowanie obrazów stylami CSS

Wiele przeglądarek pozwala korzystać z funkcji CSS, by tworzyć style, które dawniej wymagały stosowania obrazów. Na przykład właściwość <code>background</code> umożliwia tworzenie złożonych gradientów, <code>box-shadow</code> &ndash; cieni, a <code>border-radius</code> &ndash; zaokrąglonych narożników.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Pamiętaj, że te techniki wymagają cykli renderowania, co może mieć znaczenie na urządzeniach mobilnych. Jeśli będziesz ich nadużywać, możesz stracić uzyskane korzyści i obniżyć wydajność strony.

