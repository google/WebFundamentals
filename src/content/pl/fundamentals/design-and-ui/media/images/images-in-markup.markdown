---
title: "Obrazy w znacznikach"
description: "Element `img` ma duże możliwości &ndash; pobiera, dekoduje i renderuje treści &ndash; a współczesne przeglądarki obsługują szeroką gamę formatów graficznych."
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - "Użyj względnych rozmiarów obrazów, by zapobiec przypadkowemu wyjściu poza kontener."
    - "Gdy chcesz określić różne obrazy wyświetlane w zależności od cech urządzenia (tzn. dostosować grafikę), użyj elementu <code>picture</code>."
    - "Użyj atrybutu <code>srcset</code> i deskryptora <code>x</code> w elemencie <code>img</code>, by przy wyborze obrazu podpowiedzieć przeglądarce, której rozdzielczości najlepiej użyć."
notes:
  picture-support:
    - "Element <code>picture</code> zaczyna pojawiać się w przeglądarkach. Mimo że jeszcze nie jest dostępny w każdej z nich, zalecamy jego stosowanie, bo ma dużą zgodność wsteczną i pozwala wykorzystać kod <a href='http://picturefill.responsiveimages.org/'>polyfill Picturefill</a>. Szczegółowe informacje znajdziesz na <a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>."
  compressive:
    - "Zachowaj ostrożność przy korzystaniu z technik kompresji, bo dekodowanie wymaga większej ilości pamięci i obciąża procesor. Zmiana rozmiaru dużych obrazów, by zmieściły się na mniejszym ekranie, wymaga znacznych zasobów i jest szczególnie uciążliwa na słabszych urządzeniach z niewielką pamięcią i mocą procesora."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  Element <code>img</code> ma duże możliwości &ndash; pobiera, dekoduje i renderuje treści &ndash; a współczesne przeglądarki obsługują szeroką gamę formatów graficznych. Dodawanie obrazów, które wyświetlają się na różnych urządzeniach, nie różni się od dodawania tych przeznaczonych na komputery. Aby stworzyć atrakcyjny interfejs, wystarczy wprowadzić tylko kilka drobnych poprawek.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## Korzystanie ze względnych rozmiarów obrazów

Przy określaniu szerokości obrazów używaj jednostek względnych, by zapobiec przypadkowemu wyjściu poza widoczny obszar. Na przykład `width: 50%` powoduje, że obraz ma 50% szerokości elementu, w którym się znajduje (nie widocznego obszaru ani konkretnego rozmiaru w pikselach).

CSS pozwala, by treści wychodziły poza swój kontener, więc czasami trzeba użyć parametru `max-width: 100%`, by uniemożliwić to obrazom i innym elementom. Na przykład:

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

Pamiętaj, by w atrybucie `alt` elementów `img` podać treściwe opisy. Zwiększają one dostępność strony, przekazując informacje czytnikom ekranu i innym funkcjom ułatwień dostępu.

## Rozszerzanie elementów `img` o atrybut `srcset` na potrzeby urządzeń z wysoką liczbą DPI

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Atrybut <code>srcset</code> rozszerza działanie elementu <code>img</code>, ułatwiając wyświetlanie różnych plików graficznych w zależności od cech urządzenia. Podobnie jak natywna <a href="images-in-css.html#use-image-set-to-provide-high-res-images">funkcja CSS</a> <code>image-set</code>, atrybut <code>srcset</code> pozwala przeglądarce wybrać obraz, który najlepiej pasuje do możliwości urządzenia. Na przykład pokazać obraz 2x na ekranie 2x, a w przyszłości być może obraz 1x na urządzeniu 2x przy ograniczonej przepustowości sieci.
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

Przeglądarki, które nie obsługują atrybutu `srcset`, wyświetlają domyślny plik graficzny podany w atrybucie `src`. Dlatego zawsze trzeba dołączać obraz 1x, który można pokazać na dowolnym urządzeniu, niezależnie od jego możliwości. Gdy atrybut `srcset` jest obsługiwany, przed wysłaniem jakichkolwiek żądań przeglądarka analizuje listę rozdzielonych przecinkami par obrazów i warunków, po czym pobiera i wyświetla najbardziej odpowiednią grafikę.

Warunki mogą obejmować wszystkie parametry &ndash; od gęstości pikseli aż po szerokość i wysokość, jednak obecnie dobrze działa tyko gęstość pikseli. Aby zachować równowagę między obecnym działaniem a przyszłymi funkcjami, poprzestań na wskazaniu obrazu 2x w atrybucie.

## Używanie elementu `picture` przy dostosowywaniu grafiki w postaci elastycznych obrazów

Jeśli chcesz wyświetlać obrazy na podstawie cech urządzenia, czyli dostosowywać grafikę, użyj elementu `picture`. Element <code>picture</code> pozwala stworzyć deklarację z wieloma wersjami obrazu, które zależą od różnych cech urządzenia &ndash; takich jak rozmiar, rozdzielczość, orientacja itp.

<img class="center" src="img/art-direction.png" alt="Przykład dostosowywania grafiki"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      Elementu <code>picture</code> należy używać wtedy, gdy mamy obraz źródłowy w różnych gęstościach lub gdy zasady projektowania elastycznego wymagają użycia nieco innego obrazu na niektórych typach ekranów. Podobnie jak w przypadku elementu <code>video</code>, możesz dodać wiele elementów <code>source</code>. To pozwala wskazać różne pliki graficzne w zależności od zapytań o media czy formatu obrazu.
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

Jeśli przeglądarka w przykładzie powyżej ma szerokość co najmniej 800&nbsp;pikseli, to w zależności od rozdzielczości urządzenia wyświetli się plik `head.jpg` lub `head-2x.jpg`. Jeśli szerokość widoku wynosi od 450 do 800&nbsp;pikseli, na tej samej zasadzie pojawi się plik `head-small.jpg` lub `head-small-2x.jpg`. W przypadku szerokości ekranu mniejszej niż 450&nbsp;pikseli i zgodności wstecznej, gdy element `picture` nie jest obsługiwany, przeglądarka renderuje element `img`, który zawsze należy dołączyć.

### Względne rozmiary obrazów

Jeśli ostateczny rozmiar obrazu jest nieznany, trudno określić deskryptor gęstości przy obrazach źródłowych. Szczególnie wtedy, gdy obrazy rozciągają się proporcjonalnie do szerokości przeglądarki i zmieniają się płynnie w zależności od jej rozmiaru.

Zamiast podawać stałe rozmiary i gęstości obrazów, wielkość każdego z nich możesz określić, dodając deskryptor szerokości do rozmiaru w elemencie image. To pozwala przeglądarce automatycznie obliczać skuteczną gęstość pikseli i wybierać najlepszy obraz do pobrania.

{% include_code src=_code/sizes.html snippet=picture lang=html %}

W przykładzie powyżej renderujemy obraz, który ma połowę szerokości widocznego obszaru (`sizes="50vw"`). Przeglądarka w zależności od swojej szerokości i współczynnika pikseli urządzenia wybiera właściwy obraz, bez względu na to, jak duże jest jej okno. Ta tabela pokazuje, który obraz wybierze przeglądarka:

<table class="mdl-data-table mdl-js-data-table">
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


### Uwzględnianie punktów granicznych przy elastycznych obrazach

W wielu przypadkach rozmiar lub obraz może się zmieniać w zależności od punktów granicznych w układzie strony. Na przykład na małym ekranie obraz może rozciągać się na całą szerokość widocznego obszaru, a na większym &ndash; zajmować tylko jego część. 

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

Atrybut `sizes` w przykładowym kodzie powyżej zawiera kilka zapytań o media, które określają rozmiar obrazu. Gdy szerokość przeglądarki przekracza 600&nbsp;pikseli, obraz ma 25% szerokości widocznego obszaru, od 500 do 600&nbsp;pikseli ma 50%, a poniżej 500&nbsp;pikseli &ndash; pełną szerokość.


## Ustawianie obrazów produktów jako rozwijanych

Klienci chcą zobaczyć, co kupują. Spodziewają się, że na stronie sklepu będą mogli wyświetlić zbliżenia produktu w wysokiej rozdzielczości, by lepiej przyjrzeć się szczegółom. [Uczestników naszego badania](/web/fundamentals/principles/research-study.html) irytował brak takiej możliwości.

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Witryna J. Crew z rozwijanym zdjęciem produktu">
  <figcaption>Witryna J. Crew z rozwijanym zdjęciem produktu</figcaption>
</figure>

Dobry przykład obrazów, które można kliknąć i rozwinąć, znajdziemy w witrynie J. Crew. Znikająca nakładka wskazuje, że obraz można kliknąć, by go powiększyć i zobaczyć drobne szczegóły.


## Inne techniki związane z obrazami

### Obrazy kompresowane

[Technika obrazów
kompresowanych](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview) pozwala wyświetlać bardzo skompresowane obrazy 2x na wszystkich urządzeniach, bez względu na ich faktyczne możliwości. W zależności od typu obrazu i poziomu kompresji zmiana jakości może być niezauważalna, ale rozmiar pliku znacznie się zmniejsza.

{% link_sample _code/compressive.html %}
Zobacz przykład
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

### Zastępowanie obrazów w JavaScripcie

Zastępowanie obrazów w JavaScripcie pozwala sprawdzić możliwości urządzenia i zastosować najlepsze rozwiązanie. Można sprawdzić współczynnik pikseli urządzenia (dzięki `window.devicePixelRatio`) oraz szerokość i wysokość ekranu, a nawet przeanalizować połączenie internetowe (korzystając z `navigator.connection` lub wysyłając fałszywe żądanie). Po zebraniu wszystkich tych informacji można wybrać obraz do wczytania.

Dużą wadą tej metody jest to, że użycie JavaScriptu opóźnia wczytanie obrazu przynajmniej do momentu zakończenia działania parsera podglądu. To oznacza, że pobieranie obrazów zaczyna się dopiero po wywołaniu zdarzenia `pageload`. Oprócz tego przeglądarka zwykle wczytuje zarówno obraz 1x, jak i 2x, pobierając więcej danych.



