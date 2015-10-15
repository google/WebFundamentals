---
title: "Nadawanie stronie elastyczności"
description: "Internet jest dostępny na szerokiej gamie urządzeń &ndash; od telefonów z małymi ekranami aż po ogromne telewizory. Przeczytaj, jak stworzyć witrynę, która dobrze działa na wszystkich tych urządzeniach."
key-takeaways:
  make-responsive:
    - Zawsze używaj tagu viewport.
    - Zawsze zaczynaj od wąskiego widocznego obszaru i zwiększaj skalę.
    - Gdy musisz dostosować wygląd treści, ustaw odpowiednio punkty graniczne.
    - Stwórz ogólną wizję układu strony obejmującą główne punkty graniczne.
related-guides:
  responsive:
    -
      title: Ustawianie tagu viewport
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "Elastyczne projektowanie witryn"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: Dostosowywanie rozmiaru treści do obszaru widocznego
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "Elastyczne projektowanie witryn"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: Korzystanie z zapytań o media
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "Elastyczne projektowanie witryn"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: Wzory układu strony
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "Wzory układu strony"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: Najbardziej dostosowywalny układ
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "Elastyczne projektowanie witryn"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "Rozszerzanie elementów img o atrybut srcset na potrzeby urządzeń z wysoką liczbą DPI"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "Obrazy"
        href: media/images/
    - 
      title: "Używanie zapytań o media do wyświetlania obrazów w wysokiej rozdzielczości lub dostosowywania grafiki"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "Obrazy"
        href: media/images/

notes:
  styling:
    - Zastosowaliśmy zestaw stylów, które obejmują kolory, odstępy i wygląd czcionek oraz pasują do cech naszej marki.
  not-all-at-once:
    - Nie musisz przesuwać wszystkich elementów jednocześnie. W razie potrzeby możesz wprowadzać mniejsze poprawki.
updated_on: 2014-04-23
---

<p class="intro">
  Internet jest dostępny na szerokiej gamie urządzeń &ndash; od telefonów z małymi ekranami aż po ogromne telewizory. Każde urządzenie ma własne, unikalne zalety i ograniczenia. Jako programista witryn internetowych musisz postarać się, by działały one na wszystkich rodzajach urządzeń.
</p>

{% include shared/toc.liquid %}

Tworzymy witrynę, która działa na ekranach o różnym rozmiarze i wielu rodzajach urządzeń. W [poprzednim artykule]({{page.previousPage.relative_url}}) opracowaliśmy architekturę informacji na stronie i przygotowaliśmy podstawową strukturę.
W tym przewodniku przekształcimy naszą podstawową strukturę i treść w atrakcyjną stronę, która działa elastycznie na ekranach rozmaitej wielkości.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Treść">
    <figcaption>{% link_sample _code/content-without-styles.html %} Treść i struktura {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} Gotowa strona {% endlink_sample %} </figcaption>
  </figure>
</div>

Zgodnie z zasadą `najpierw mobilne` zaczynamy od wąskiego widocznego obszaru (takiego jak na telefonach komórkowych) i budujemy dostosowany do niego interfejs.
Następnie skalujemy stronę na potrzeby większych urządzeń.
Stopniowo poszerzamy widoczny obszar, jednocześnie oceniając, czy projekt i układ wyglądają poprawnie.

Wcześniej zaprojektowaliśmy dwa ogólne sposoby prezentacji naszych treści. Teraz tak dopracujemy stronę, by odpowiednio wyświetlała się w obu tych różnych układach.
Sprawdzimy, jak treści pasują do rozmiaru ekranu, i we właściwy sposób rozmieścimy punkty graniczne &ndash; czyli takie, w których układ i style się zmieniają.

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## Dodaj viewport

Nawet do prostej strony zawsze **musisz** dodać metatag viewport.
To najważniejszy komponent przy tworzeniu interfejsów działających na różnych rodzajach urządzeń.
Bez niego witryna nie będzie dobrze działać na urządzeniach mobilnych.

Tag viewport informuje przeglądarkę, że stronę trzeba przeskalować, dopasowując do rozmiarów ekranu. Jest wiele konfiguracji, które możesz określić w tym tagu, by sterować wyświetlaniem strony. Jako domyślne zalecamy to ustawienie:

{% include_code src=_code/viewport.html snippet=viewport %}

Tag viewport należy do nagłówka dokumentu. Wystarczy zadeklarować go tylko raz.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Zastosuj prostą stylizację 

W naszej firmie i usługach stosujemy konkretne cechy marki i parametry czcionek określone w przewodniku po stylach.

### Przewodniku po stylach 

Przewodnik po stylach pozwala ogólnie zapoznać się ze stylistyką stron i zadbać o jej spójność w całym projekcie.

#### Kolory

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Dodaj obrazy stylistyczne 

W poprzednim przewodniku dodaliśmy `obrazy treści`, czyli grafiki, które zawierają ważne informacje o naszej usłudze. Obrazy stylistyczne nie są niezbędną częścią głównych treści, ale tworzą oprawę wizualną i pomagają skierować uwagę użytkownika na konkretne informacje.

Dobry przykład to grafika w nagłówku ilustrująca treści widoczne na ekranie po wejściu na stronę. Często zachęca użytkownika, by dowiedział się więcej o usłudze.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Zaprojektowana strona">
</div>

Dodawanie takich obrazów jest bardzo łatwe. My na przykład umieścimy tło w nagłówku, używając do tego stylu CSS.

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

Wybraliśmy prosty obraz tła, który jest rozmazany, by nie odwracał uwagi od treści. Ustawienie rozmiaru to `cover`, dzięki czemu grafika zawsze rozciąga się na cały widok, zachowując prawidłowy współczynnik proporcji.

<br style="clear: both;">

## Ustaw swój pierwszy punkt graniczny 

Projekt zaczyna wyglądać źle przy szerokości około 600&nbsp;pikseli. W naszym przypadku długość wiersza przekracza wtedy dziesięć wyrazów (optymalna długość podczas czytania), dlatego w tym punkcie wprowadzimy zmiany.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Twoja przeglądarka nie może odtworzyć tego filmu.
     <a href="videos/firstbreakpoint.mov">Pobierz go</a>.
  </p>
</video>

600&nbsp;pikseli to dobre miejsce na pierwszy punkt graniczny, który pozwala nam zmienić położenie elementów, by lepiej pasowały do ekranu. Możemy do tego użyć technologii nazywanej [zapytaniami o media]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

Dzięki swoim rozmiarom większy ekran daje więcej swobody przy wyborze sposobu prezentowania treści.

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

W kontekście naszej strony o usłudze musimy wykonać te czynności:

*  Ograniczyć maksymalną szerokość projektu.
*  Zmienić odstępy między elementami i zmniejszyć rozmiar tekstu.
*  Przenieść formularz na ten sam poziom co treść w nagłówku.
*  Przesunąć film, tak by znalazł się obok informacji.
*  Zmniejszyć rozmiar obrazów i ładnie je ułożyć.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Ograniczyć maksymalną szerokość projektu

Zdecydowaliśmy się przygotować tylko dwa główne układy &ndash; obszar wąski i szeroki, co znacznie upraszcza proces tworzenia.

Postanowiliśmy też utworzyć sekcje sięgające samej krawędzi zarówno w wąskim, jak i w szerokim widocznym obszarze. To oznacza, że musimy ograniczyć maksymalną szerokość ekranu, by tekst i akapity nie rozciągnęły się na bardzo szerokich ekranach w pojedyncze, długie wiersze. Będzie ona wynosić około 800&nbsp;pikseli.

Aby to osiągnąć, ograniczymy szerokość elementów i wyśrodkujemy je. Musimy utworzyć kontener wokół każdej głównej sekcji i zastosować parametr `margin: 
auto`. Dzięki temu nawet na większym ekranie treści pozostaną wyśrodkowane, a ich rozmiar nie przekroczy 800&nbsp;pikseli.

Kontenerem będzie prosty element "div" w tej postaci:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## Zmiana odstępów i zmniejszanie rozmiaru tekstu

Obszar wąski oferuje niewiele miejsca na wyświetlanie treści, więc czcionka często ma bardzo mały rozmiar i grubość, by pasowała do ekranu.

Przy szerszym widocznym obszarze trzeba wziąć pod uwagę to, że użytkownik jest dalej od ekranu. Aby poprawić czytelność treści, możemy zwiększyć rozmiar i grubość czcionki oraz zmienić odstępy, by poszczególne obszary bardziej się wyróżniały.

Na naszej stronie o usłudze powiększymy odstępy między sekcjami, ustawiając je na 5% szerokości. Zwiększymy też rozmiar nagłówka każdej sekcji.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## Dostosowywanie elementów do szerokiego widocznego obszaru

W wąskim widocznym obszarze elementy wyświetlają się w linii, jeden nad drugim. Każda główna sekcja i znajdujące się w niej treści są ułożone kolejno od góry do dołu.

Obszar szeroki zawiera dodatkowe miejsce, które można wykorzystać do optymalnego zaprezentowania treści na ekranie. To w przypadku naszej strony o usłudze oznacza, że zgodnie z AI możemy:

*  Przesunąć formularz, tak by znalazł się obok informacji w nagłówku.
*  Umieścić film na prawo od najważniejszych punktów.
*  Ułożyć obrazy obok siebie.
*  Poszerzyć tabelę.

### Przenoszenie elementu z formularzem

Wąski widoczny obszar oznacza, że mamy znacznie mniej dostępnego miejsca w poziomie, by swobodnie ułożyć elementy na ekranie.

Aby skuteczniej wykorzystać tę przestrzeń, musimy zrezygnować z liniowego położenia nagłówka i umieścić formularz obok listy informacji.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Twoja przeglądarka nie może odtworzyć tego filmu.
     <a href="videos/floatingform.mov">Pobierz go</a>.
  </p>
</video>

### Przenoszenie elementu z filmem

Film w interfejsie z wąskim widocznym obszarem ma pełną szerokość ekranu i wyświetla się pod listą głównych zalet usługi. W obszarze szerokim przeskalowany film stanie się zbyt duży i będzie źle wyglądał poniżej listy.

Na szerszym ekranie element z filmem trzeba usunąć z pionowego układu obszaru wąskiego i umieścić obok listy punktowanej.

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### Układanie obrazów obok siebie

Obrazy w interfejsie z wąskim widocznym obszarem (najczęściej na urządzeniach mobilnych) mają pełną szerokość ekranu i są ułożone w pionie. Po przeskalowaniu do obszaru szerokiego nie wyglądają dobrze.

Aby poprawić ich wygląd w szerokim widocznym obszarze, przeskalujemy je do 30% szerokości kontenera i ułożymy w poziomie (zamiast w pionie jak w wąskim widocznym obszarze). Zaokrąglimy też ich obramowanie i dodamy cień, by prezentowały się ciekawiej.

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### Dopasowywanie obrazów do liczby DPI

Jeśli korzystasz z obrazów, weź pod uwagę rozmiar widocznego obszaru i gęstość wyświetlacza.

Dawniej strony internetowe były przeznaczone na ekrany o gęstości 96&nbsp;dpi. Wraz z pojawieniem się urządzeń mobilnych znacznie wzrosła gęstość pikseli na ekranach (nie wspominając o wyświetlaczach klasy Retina w laptopach). W efekcie obrazy zakodowane na 96&nbsp;dpi często wyglądają fatalnie na urządzeniach z większą liczbą DPI.

Mamy na to rozwiązanie, które nie jest jeszcze powszechnie stosowane.
W przeglądarkach, które mają tę funkcję, na wyświetlaczu o wysokiej gęstości można pokazywać odpowiednio dostosowane obrazy.

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### Tabele

Tabele bardzo trudno przedstawić prawidłowo na urządzeniach z wąskim widocznym obszarem, dlatego trzeba dobrze je zaplanować.

W takiej sytuacji zalecamy przekształcenie tabeli w dwie kolumny oraz przeniesienie nagłówków i komórek do kolejnych wierszy, by uzyskać układ pionowy.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Twoja przeglądarka nie może odtworzyć tego filmu.
     <a href="videos/responsivetable.mov">Pobierz go</a>.
  </p>
</video>

Na naszej stronie utworzymy dodatkowy punkt graniczny specjalnie na potrzeby tabeli.
Gdy najpierw tworzysz wersję na urządzenia mobilne, trudniej jest cofnąć zastosowane style, dlatego musimy wyłączyć style CSS tabeli w obszarze wąskim ze stylów CSS w obszarze szerokim.
Dzięki temu uzyskamy wyraźny i spójny punkt graniczny.

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## Podsumowanie

**GRATULACJE.** Skoro to czytasz, Twoja pierwsza prosta strona docelowa o usłudze jest już gotowa i działa na szerokiej gamie urządzeń bez względu na rozmiary i kształt ekranu.

Na początek zawsze warto postępować zgodnie z tymi wskazówkami:

1.  Zanim zaczniesz pisać kod, stwórz prostą AI i zapoznaj się ze strukturą treści.
2.  Pamiętaj, by ustawić tag viewport.
3.  Utwórz podstawowy interfejs zgodnie z zasadą `najpierw strona mobilna`.
4.  Po przygotowaniu interfejsu na urządzenia mobilne zwiększaj szerokość wyświetlania, aż strona przestanie dobrze wyglądać. W tym miejscu dodaj punkt graniczny.
5.  W razie potrzeby kontynuuj te czynności.



