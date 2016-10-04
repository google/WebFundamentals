project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Obrazy często stanowią większość danych pobieranych przez stronę, jak również zajmują dużo miejsca na stronie. Z tego względu optymalizacja obrazów może często przynosić największe oszczędności w zakresie ilości pobranych danych i najwyższe wzrosty wydajności wczytywania stron witryny: im mniej danych musi pobrać przeglądarka, tym mniejsza konkurencja o pasmo u klienta i tym szybciej przeglądarka może pobierać i renderować użyteczną treść na ekranie.


{# wf_updated_on: 2014-05-09 #}
{# wf_published_on: 2014-05-06 #}

# Optymalizacja obrazów {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



Obrazy często stanowią większość danych pobieranych przez stronę, jak również zajmują dużo miejsca na stronie. Z tego względu optymalizacja obrazów może często przynosić największe oszczędności w zakresie ilości pobranych danych i najwyższe wzrosty wydajności wczytywania stron witryny: im mniej danych musi pobrać przeglądarka, tym mniejsza konkurencja o pasmo u klienta i tym szybciej przeglądarka może pobierać i renderować użyteczną treść na ekranie.



Optymalizacja obrazów to zarówno sztuka, jak i nauka: sztuka, ponieważ nie ma jednej właściwej odpowiedzi, jak najlepiej skompresować dany obraz; nauka, ponieważ opracowano wiele technik i algorytmów umożliwiających znaczną redukcję rozmiaru obrazu. Znalezienie ustawień optymalnie dobranych do obrazu wymaga dokładnej analizy wielu aspektów: możliwości formatu, zawartości kodowanych danych, jakości, rozmiaru w pikselach i innych.

## Eliminowanie i zastępowanie obrazów

### TL;DR {: .hide-from-toc }
- Wyeliminuj niepotrzebne obrazy
- Wykorzystaj efekty CSS3 wszędzie tam, gdzie to możliwe
- Zastosuj czcionki sieci web zamiast kodowania tekstu na obrazach


Podstawowym pytaniem, które trzeba zadać: czy obraz jest naprawdę potrzebny do osiągnięcia wymaganego efektu? Dobry projekt jest prosty i zawsze umożliwia osiągnięcie najwyższej wydajności. Jeśli można wyeliminować zasób obrazu często wymagający pobrania dużej ilości danych w stosunku do wielkości znaczników HTML i CSS oraz kodu JavaScript i innych zasobów na stronie, jest to zawsze najlepsza strategia optymalizacji. Jednak trzeba pamiętać, że obraz w dobrym miejscu może przekazać więcej informacji niż tysiąc słów, tak więc potrzebny jest kompromis.

Zastanów się, czy dostępna jest technologia alternatywna pozwalająca uzyskać żądane rezultaty w bardziej efektywny sposób:

* Zastosowanie **efektów CSS** (gradientów, cieni itp.) i animacji CSS pozwala uzyskać ostrość wyświetlania niezależnie od rozdzielczości i stopnia powiększenia. Rozmiar takiego pliku to często ułamek rozmiaru pliku graficznego.
* **Czcionki sieci web** umożliwiają wyświetlanie tekstów w wyrafinowany sposób przy zachowaniu zdolności do zaznaczania, wyszukiwania i zmiany rozmiaru tekstu, co skutkuje znacznym polepszeniem funkcjonalności.

Jeśli kiedykolwiek zaczniesz kodować tekst na obrazie, wstrzymaj się i poświęć chwilę czasu na zastanowienie. Doskonale wyglądające czcionki to podstawa dobrego projektowania, budowania marki i czytelności. Jednak tekst na obrazach nie zapewnia wygody użytkownikom: takiego tekstu nie można zaznaczać, wyszukiwać ani dowolnie powiększać. Nie odczytują go aplikacje ułatwiające dostęp niepełnosprawnym. Nie jest poprawnie wyświetlany na urządzeniach o dużej rozdzielczości. Użycie czcionek sieci web wymaga zastosowania osobnych [reguł optymalizacji](https://www.igvita.com/2014/01/31/optimizing-web-font-rendering-performance/), ale stanowi odpowiedź na wszystkie powyższe zastrzeżenia. Zawsze stanowi lepsze rozwiązanie w przypadku wyświetlania tekstu.


## Grafika wektorowa a rastrowa

### TL;DR {: .hide-from-toc }
- Grafika wektorowa spisuje się idealnie w przypadku obrazów zawierających kształty geometryczne
- Grafika wektorowa zachowuje ostrość niezależnie od rozdzielczości i stopnia powiększenia
- Grafikę rastrową stosuje się w przypadku złożonych scen z wieloma nieregularnymi kształtami i detalami


Po ustaleniu, że to właśnie obraz pozwoli osiągnąć zamierzony efekt, następnym ważnym krokiem jest wybór odpowiedniego formatu:



<figure class="attempt-left">
  <img class="center" src="images/vector-zoom.png" alt="Powiększony obraz wektorowy">
  <figcaption>Grafika wektorowa</figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/raster-zoom.png" alt="Powiększony obraz rastrowy">
  <figcaption>Grafika rastrowa</figcaption>
</figure>
<div class="clearfix"></div>


* W przypadku [grafiki wektorowej](http://pl.wikipedia.org/wiki/Grafika_wektorowa) obraz jest reprezentowany przez linie, punkty i wielokąty.
* W przypadku [grafiki rastrowej](http://pl.wikipedia.org/wiki/Grafika_rastrowa) wartości każdego z pikseli są kodowane w prostokątnej matrycy.

Każdy format ma swoje zalety i wady. Formaty wektorowe nadają się idealnie do reprezentacji obrazów zawierających proste kształty geometryczne (np. logotypy, tekst, ikony), jeśli wymagane jest zachowanie ostrości przy każdej rozdzielczości i przy każdym stopniu powiększenia. Czyni to je idealnymi formatami dla ekranów o wysokiej rozdzielczości i wyświetlania zasobów w różnych rozmiarach.

Jednak formaty wektorowe ujawniają swoje wady, gdy scena jest skomplikowana (jak w przypadku zdjęcia): wielkość kodu SVG wymagana do opisu wszystkich kształtów może okazać się nie do zaakceptowania, a obraz wyjściowy nadal nie wyglądać `fotorealistycznie`. W takich przypadkach lepiej jest stosować formaty rastrowe, takie jak GIF, PNG, JPEG, lub jeden z nowszych: JPEG-XR lub WebP.

Obrazy rastrowe nie gwarantują niezależności od rozdzielczości i stopnia powiększenia &ndash; przy ich powiększaniu widoczne stają się poszarpane i rozmyte obszary. Z tego względu może być konieczne zapisywanie wielu wersji obrazów rastrowych o różnych rozdzielczościach, co zapewni użytkownikom różnych urządzeń najwyższy poziom wygody.


## Konsekwencje stosowania ekranów o wysokiej rozdzielczości

### TL;DR {: .hide-from-toc }
- Na ekranach o wysokiej rozdzielczości na jeden piksel CSS przypada wiele pikseli urządzenia
- Obrazy o wysokiej rozdzielczości wymagają znacznie większej liczby pikseli i ilości danych
- Techniki optymalizacji obrazów są takie same niezależnie od rozdzielczości


Rozpatrując piksele obrazu, musimy rozróżnić różne rodzaje pikseli: piksele CSS i piksele urządzenia. Jeden piksel CSS może zawierać wiele pikseli urządzenia &ndash; np. jeden piksel CSS może odpowiadać bezpośrednio jednemu pikselowi urządzenia albo wielu pikselom urządzenia. Dlaczego tak jest? Im więcej pikseli wyświetla urządzenie, tym dokładniej można odwzorować treść na ekranie.

<img src="images/css-vs-device-pixels.png" class="center" alt="Piksele CSS a piksele urządzenia">

Ekrany o wysokiej rozdzielczości DPI (HiDPI) wyświetlają olśniewający obraz, ale ma to swoją cenę: zasoby obrazów muszą lepiej oddawać detale. Dobrą wiadomością jest to, że obrazy wektorowe idealnie nadają się do tego celu, ponieważ można je renderować, zachowując ostrość, przy dowolnej rozdzielczości &ndash; koszt przetwarzania przy większej szczegółowości może być większy, ale zasób pozostaje taki sam niezależnie od rozdzielczości.

Obrazy rastrowe stanowią dużo większe wyzwanie, ponieważ każdy piksel jest kodowany osobno. Stąd duża liczba pikseli i większy rozmiar pliku obrazu rastrowego. Rozważmy na przykład zdjęcie wyświetlane w rozdzielczości 100x100 pikseli (CSS):

<table>
<thead>
  <tr>
    <th>Rozdzielczość ekranu</th>
    <th>Łączna liczba pikseli</th>
    <th>Rozmiar nieskompresowanego pliku (4 bajty na piksel)</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="rozdzielczość">1x</td>
  <td data-th="łączna liczba pikseli">100 x 100 = 10 000</td>
  <td data-th="rozmiar pliku">40 000 bajtów</td>
</tr>
<tr>
  <td data-th="rozdzielczość">2x</td>
  <td data-th="łączna liczba pikseli">100 x 100 x 4 = 40 000</td>
  <td data-th="rozmiar pliku">160 000 bajtów</td>
</tr>
<tr>
  <td data-th="rozdzielczość">3x</td>
  <td data-th="łączna liczba pikseli">100 x 100 x 9 = 90 000</td>
  <td data-th="rozmiar pliku">360 000 bajtów</td>
</tr>
</tbody>
</table>

Przy dwukrotnym zwiększeniu rozdzielczości ekranu fizycznego łączna liczba pikseli zwiększa się czterokrotnie: dwukrotne zwiększenie liczby pikseli w poziomie pomnożone przez dwukrotne zwiększenie liczby pikseli w pionie. Dlatego w przypadku ekranu `2x` liczba wymaganych pikseli nie zwiększa się dwukrotnie, lecz czterokrotnie!

Co to oznacza w praktyce? Ekrany o wysokiej rozdzielczości wyświetlają olśniewające obrazy, co może stanowić o przewadze całego produktu. Jednak wymagają one również obrazów o wysokiej rozdzielczości: lepiej korzystać z grafiki wektorowej, ponieważ ostrość nie zależy od rozdzielczości, a jeśli potrzebne są obrazy rastrowe, najlepiej przygotować i udostępnić wiele wersji każdego obrazu &ndash; szczegółami zajmiemy się w dalszej części.


## Optymalizacja obrazów wektorowych

### TL;DR {: .hide-from-toc }
- SVG to format obrazu oparty na XML
- Kompaktowanie plików SVG pozwala zmniejszyć ich rozmiar
- Pliki SVG należy kompresować do formatu GZIP


Wszystkie nowoczesne przeglądarki obsługują format SVG (Scalable Vector Graphics), który jest formatem grafiki dwuwymiarowej opartym na XML: kod SVG można zamieścić w kodzie strony bezpośrednio albo jako zasób zewnętrzny. Pliki SVG można tworzyć w większości programów do edycji grafiki wektorowej lub ręcznie, w ulubionym edytorze tekstów.


    <?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 17.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
       x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
    <g id="XMLID_1_">
      <g>
        <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10" cx="50" cy="50" r="40"/>
      </g>
    </g>
    </svg>
    

W powyższym przykładzie renderowany jest prosty kształt w postaci koła z czarnym obramowaniem na czerwonym tle. Przykład ten wyeksportowano z programu Adobe Illustrator. Jak widać, zawiera on dużo metadanych &ndash; informacje o warstwach, komentarze i przestrzenie nazw XML &ndash; często zbędnych przy renderowaniu zasobu w przeglądarce. Z tego względu zawsze dobrze jest przeprowadzić kompaktowanie plików SVG za pomocą takiego narzędzia jak [svgo](https://github.com/svg/svgo).

Rzeczywiście, narzędzie svgo redukuje rozmiar powyższego pliku SVG z programu Illustrator o 58% &ndash; z 470 bajtów do 199 bajtów. Ponieważ format SVG jest oparty na XML, można również skompresować go do formatu GZIP, co zmniejszy jego rozmiar podczas transmisji &ndash; upewnij się, że serwer jest skonfigurowany pod kątem kompresowania zasobów SVG.


## Optymalizacja obrazów rastrowych

### TL;DR {: .hide-from-toc }
- Obraz rastrowy to matryca pikseli
- Dla każdego piksela kodowane są informacje o kolorze i przezroczystości
- W algorytmach kompresji obrazów stosuje się wiele różnych technik umożliwiających redukcję liczby bitów na piksel, co pozwala zmniejszyć rozmiar pliku obrazu


Obraz rastrowy stanowi po prostu 2-wymiarową matrycę poszczególnych pikseli &ndash; np. obraz o rozdzielczości 100x100 pikseli zawiera sekwencję 10 000 pikseli. Z kolei w każdym pikselu zapisywane są wartości `[RGBA](http://pl.wikipedia.org/wiki/RGBA)`: (R) dla kanału koloru czerwonego, (G) dla kanału koloru zielonego, (B) dla kanału koloru niebieskiego i (A) dla kanału alfa (przezroczystości).

Wewnętrznie przeglądarka przydziela do każdego kanału 256 wartości (odcieni), co przekłada się na 8 bitów na kanał (2 ^ 8 = 256) lub 4 bajty na piksel (4 kanały x 8 bitów = 32 bity = 4 bajty). Dzięki temu przy znajomości rozmiarów matrycy można łatwo określić rozmiar pliku:

* obraz 100 x 100 pikseli składa się z 10 000 pikseli
* 10 000 pikseli x 4 bajty = 40 000 bajtów
* 40 000 bajtów / 1024 = 39 KB

^

Note: Na marginesie: niezależnie od formatu obrazu zastosowanego do transferu danych z serwera do klienta, po zdekodowaniu obrazu przez przeglądarkę każdy piksel zajmuje zawsze 4 bajty pamięci. Może to narzucać poważne ograniczenia w przypadku dużych obrazów i urządzeń z niewielką ilością dostępnej pamięci &ndash; np. mniej zaawansowanych urządzeń mobilnych.

<table>
<thead>
  <tr>
    <th>Wymiary</th>
    <th>Piksele</th>
    <th>Rozmiar pliku</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="wymiary">100 x 100</td>
  <td data-th="piksele">10 000</td>
  <td data-th="rozmiar pliku">39 KB</td>
</tr>
<tr>
  <td data-th="wymiary">200 x 200</td>
  <td data-th="piksele">40 000</td>
  <td data-th="rozmiar pliku">156 KB</td>
</tr>
<tr>
  <td data-th="wymiary">300 x 300</td>
  <td data-th="piksele">90 000</td>
  <td data-th="rozmiar pliku">351 KB</td>
</tr>
<tr>
  <td data-th="wymiary">500 x 500</td>
  <td data-th="piksele">250 000</td>
  <td data-th="rozmiar pliku">977 KB</td>
</tr>
<tr>
  <td data-th="wymiary">800 x 800</td>
  <td data-th="piksele">640 000</td>
  <td data-th="rozmiar pliku">2500 KB</td>
</tr>
</tbody>
</table>

39 KB dla obrazu o rozdzielczości 100x100 pikseli &ndash; to na pierwszy rzut oka niewiele, ale rozmiar pliku szybko rośnie wraz ze wzrostem rozdzielczości, przez co pobieranie tych zasobów jest zarówno powolne, jak i przyczynia się do zwiększenia opłat za transfer. Na szczęście do tej pory rozmawialiśmy o `nieskompresowanym` formacie obrazu. Co zrobić, by zredukować rozmiar pliku graficznego?

Jednym z prostszych sposobów jest zredukowanie `głębokości bitowej` obrazu z 8 bitów na kanał do mniej licznej palety: 8 bitów na kanał oznacza do 256 wartości na kanał i w sumie 16 777 216 (2563) kolorów. Co się stanie po zredukowaniu palety do 256 kolorów? Dla kanałów RGB potrzebne będzie w sumie 8 bitów, co przyniesie oszczędność dwóch bajtów na piksel -- taki rodzaj kompresji przynosi 50% oszczędności w stosunku do pierwotnego formatu 4-bajtowego.

<img src="images/artifacts.png" class="center" alt="Artefakty spowodowane przez kompresję">

Note: Od lewej do prawej (format PNG): 32-bitowy (16 milionów kolorów), 7-bitowy (128 kolorów), 5-bitowy (32 kolory). Złożone sceny ze stopniowymi gradacjami kolorów (przejścia tonalne, niebo itp.) wymagają bardziej licznych palet kolorów, co pozwala uniknąć artefaktów wizualnych, takich jak pikselizacja nieba (obecna przy 5-bitowej palecie kolorów). Z drugiej strony, jeśli obraz zawiera tylko kilka kolorów, liczna paleta to po prostu marnotrawstwo cennych bitów.

Po zoptymalizowaniu danych zapisanych w poszczególnych pikselach możemy przyjrzeć się dokładniej sąsiednim pikselom: okazuje się, że na wielu obrazach, a szczególnie na zdjęciach, piksele mają zbliżone kolory &ndash; w przypadku nieba, powtarzających się wzorów i tak dalej. Wykorzystanie tego spostrzeżenia w algorytmie kompresji może polegać na zastosowaniu `[kodowania delta](http://en.wikipedia.org/wiki/Delta_encoding)`. Zamiast przechowywać wartości każdego z pikseli, przechowuje się wartości różnic pomiędzy sąsiednimi pikselami: jeśli sąsiednie piksele są identyczne, różnica wynosi zero i trzeba przechować tylko jeden bit. Ale czemu nie pójść dalej...

Oko ludzkie cechuje się różnymi poziomami czułości na różne kolory: podczas kodowania można to uwzględnić, odpowiednio zmniejszając lub zwiększając liczność palety dla tych kolorów.
Sąsiedztwo pikseli określa się w dwuwymiarowej matrycy, a więc każdy piksel ma wielu sąsiadów. Również ten fakt można wykorzystać do dalszego ulepszenia kodowania delta.
Zamiast rozpatrywać tylko bezpośrednich sąsiadów każdego piksela, możemy zająć się większymi blokami sąsiednich pikseli i kodować różne bloki z różnymi ustawieniami. I tak dalej...

Jak widać, optymalizacja obrazów szybko się komplikuje (lub, zależnie od punktu widzenia, staje się jeszcze ciekawsza), dlatego jest obszarem aktywnych badań akademickich i komercyjnych. Obrazy zajmują wiele miejsca, tak więc rozwijanie lepszych technik kompresji ma duże znaczenie. Dalsze informacje znajdziesz w [Wikipedii](http://en.wikipedia.org/wiki/Image_compression) i [opracowaniu na temat kompresji WebP](/speed/webp/docs/compression), w którym został podany praktyczny przykład.

Nasza dyskusja przybrała charakter akademicki, ale jak to przekłada się na możliwości optymalizacji obrazów na naszych stronach? Zdecydowanie nie będziemy się koncentrować na rozwijaniu nowych technik kompresji, jednak ważne jest zrozumienie zarysu problemu: pikseli RGBA, głębokości bitowej i różnych technik optymalizacji. O wszystkich tych koncepcjach trzeba pamiętać przy rozpatrywaniu różnych formatów obrazów rastrowych, ale tym zajmiemy się później.


## Stratna a bezstratna kompresja obrazów

### TL;DR {: .hide-from-toc }
- Sposób działania naszych oczu umożliwia stosowanie kompresji stratnej
- Optymalizacja obrazu to połączenie kompresji stratnej i bezstratnej
- Formaty obrazów różnią się algorytmami kompresji stratnej i bezstratnej użytymi do optymalizacji obrazu
- Nie można określić jednego najlepszego formatu lub `ustawienia jakości` dla wszystkich obrazów: każde połączenie algorytmu kompresji i obrazu daje w wyniku unikalny obraz wyjściowy


Dla pewnych rodzajów danych, takich jak kod źródłowy strony lub plik wykonywalny, ważne jest, by algorytm kompresji nie zmienił ani nie utracił oryginalnej informacji: jeden brakujący lub nieprawidłowy bit danych może zupełnie zmienić znaczenie zawartości pliku, a nawet doprowadzić do jego całkowitego uszkodzenia. Dla innych rodzajów danych, takich jak obrazy, dźwięki i filmy wideo, całkowicie akceptowalne może być dostarczenie przybliżonej reprezentacji pierwotnych danych.

Z powodu sposobu działania oka często można pominąć pewne informacje o pikselach i zredukować rozmiar pliku obrazu &ndash; np. oko cechuje różny poziom czułości na różne kolory, dlatego niektóre kolory można zakodować z wykorzystaniem mniejszej liczby bitów. Z tego powodu typowa procedura optymalizacji składa się z dwóch kroków wysokiego poziomu:

1. Przetworzenie obrazu przez filtr `[stratny](http://pl.wikipedia.org/wiki/Kompresja_stratna)` eliminujący niektóre dane pikseli
1. Przetworzenie obrazu przez filtr `[bezstratny](http://pl.wikipedia.org/wiki/Kompresja_bezstratna)` kompresujący dane pikseli

**Pierwszy krok jest opcjonalny. Jednak warto zapamiętać, że każdy obraz można poddać kompresji stratnej w celu redukcji rozmiaru, a dokładny algorytm tej kompresji zależy od konkretnego formatu obrazu.** Różnica pomiędzy różnymi formatami obrazów, takimi jak GIF, PNG, JPEG, polega na różnym połączeniu algorytmów wykorzystywanych (lub nie) w kroku kompresji stratnej i bezstratnej.

Więc jaka konfiguracja optymalizacji stratnej i bezstratnej jest najlepsza? Odpowiedź zależy od zawartości obrazu i własnych kryteriów. Należy próbować osiągnąć kompromis między rozmiarem pliku i wielkością artefaktów wprowadzanych przez kompresję stratną: w niektórych przypadkach wskazane jest pominięcie optymalizacji stratnej, co pozwoli na wierne przekazanie szczegółów, w innych można zastosować agresywną optymalizację stratną i maksymalnie zmniejszyć rozmiar obrazu.  W tym miejscu rolę powinien odegrać własny osąd i kontekst wykorzystania obrazu &ndash; nie ma jednego uniwersalnego zestawu ustawień.

<img src="images/save-for-web.png" class="center" alt="Save for Web (Publikuj dla Internetu)">

Praktyczny przykład: dla formatu stratnego, takiego jak JPEG, można zazwyczaj zmienić ustawienie `jakości` algorytmu kompresji (np. suwak jakości funkcji `Save for Web` (Publikuj dla Internetu) w programie Adobe Photoshop). Jest ono zazwyczaj liczbą z zakresu od 1 do 100 wpływającą na sposób działania zestawu algorytmów stratnych i bezstratnych. Aby uzyskać najlepsze wyniki, sprawdź różne ustawienia jakości obrazów i nie obawiaj się znacznie zmniejszyć jakości &ndash; rezultaty wizualne są często bardzo dobre, a redukcja rozmiaru pliku znaczna.

Note: Zwróć uwagę, że poziomów jakości obrazów w różnych formatach nie można porównywać bezpośrednio z powodu odmienności algorytmów kodowania obrazów: jakość 90 dla formatu JPEG daje zupełnie inne wyniki od jakości 90 dla formatu WebP. Nawet ten sam poziom jakości dla tego samego formatu obrazu może prowadzić do widocznie różnego obrazu wyjściowego, ponieważ implementacje algorytmów kompresji są różne.


## Wybór odpowiedniego formatu

### TL;DR {: .hide-from-toc }
- Rozpocznij od wyboru odpowiedniego formatu uniwersalnego: GIF, PNG, JPEG
- Dla każdego formatu metodą prób i błędów dobierz najlepsze ustawienia: jakość, rozmiar palety itp.
- Rozważ dodanie zasobów WebP i JPEG XR dla nowoczesnych klientów obrazy skalowane: null
- Zastosowanie grafiki skalowanej jest jednym z najprostszych i najbardziej efektywnych sposobów optymalizacji
- Szczególnie uważaj na duże grafiki, ponieważ odpowiadają one za odczuwalny spadek wydajności
- Wyeliminuj niepotrzebne piksele, dostosowując rozdzielczość obrazów do ich rozmiaru na ekranie


Oprócz zastosowania odmiennych algorytmów stratnych i bezstratnych formaty obrazów różnią się obsługą funkcji, takich jak animacje i kanały przezroczystości (alfa). Dlatego wybór formatu odpowiedniego dla konkretnego obrazu zależy nie tylko od potrzebnych rezultatów wizualnych, lecz również od wymagań funkcjonalnych.


<table>
<thead>
  <tr>
    <th>Format</th>
    <th>Przezroczystość</th>
    <th>Animacja</th>
    <th>Przeglądarka</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="format"><a href="http://pl.wikipedia.org/wiki/Graphics_Interchange_Format">GIF</a></td>
  <td data-th="przezroczystość">Tak</td>
  <td data-th="animacja">Tak</td>
  <td data-th="przeglądarka">Wszystkie</td>
</tr>
<tr>
  <td data-th="format"><a href="http://pl.wikipedia.org/wiki/Portable_Network_Graphics">PNG</a></td>
  <td data-th="przezroczystość">Tak</td>
  <td data-th="animacja">Nie</td>
  <td data-th="przeglądarka">Wszystkie</td>
</tr>
<tr>
  <td data-th="format"><http://pl.wikipedia.org/wiki/JPEG>JPEG</a></td>
  <td data-th="przezroczystość">Nie</td>
  <td data-th="animacja">Nie</td>
  <td data-th="przeglądarka">Wszystkie</td>
</tr>
<tr>
  <td data-th="format"><a href="http://pl.wikipedia.org/wiki/JPEG_XR">JPEG XR</a></td>
  <td data-th="przezroczystość">Tak</td>
  <td data-th="animacja">Tak</td>
  <td data-th="przeglądarka">IE</td>
</tr>
<tr>
  <td data-th="format"><a href="http://pl.wikipedia.org/wiki/WebP">WebP</a></td>
  <td data-th="przezroczystość">Tak</td>
  <td data-th="animacja">Tak</td>
  <td data-th="przeglądarka">Chrome, Opera, Android</td>
</tr>
</tbody>
</table>

Powszechnie obsługiwane są trzy formaty: GIF, PNG i JPEG. Oprócz nich niektóre przeglądarki obsługują również nowsze formaty, takie jak WebP i JPEG XR, cechujące się wyższą całkowitą kompresją i większą funkcjonalnością. Więc jaki format zastosować?

<img src="images/format-tree.png" class="center" alt="Save for Web (Publikuj dla Internetu)">

1. **Czy potrzebna jest animacja? Jeśli tak, format GIF jest jedynym uniwersalnym wyborem.**
  * W formacie GIF występuje ograniczenie liczności palety kolorów do najwyżej 256 kolorów, co dla większości obrazów czyni go kiepskim wyborem. Ponadto format PNG-8 osiąga wyższy stopień kompresji dla obrazów z mniej liczną paletą. Z tego względu format GIF stanowi odpowiedni wybór tylko w przypadku konieczności zastosowania animacji.
1. **Czy trzeba zachować drobne detale o najwyższej rozdzielczości? Zastosuj format PNG.**
  * W formacie PNG nie są stosowane żadne algorytmy kompresji stratnej, wybiera się tylko rozmiar palety kolorów. Dlatego uzyskany obraz będzie miał wysoką jakość, ale kosztem znacznie większego rozmiaru pliku niż w przypadku innych formatów. Stosuj z rozwagą.
  * Jeśli obraz zawiera grafikę składającą się z kształtów geometrycznych, rozważ jego konwersję do formatu wektorowego (SVG).
  * Jeśli obraz zawiera tekst, poświęć chwilę czasu na zastanowienie. Tekstu na obrazach nie można zaznaczać, wyszukiwać ani dowolnie powiększać. Jeśli wymagany jest niestandardowy wygląd (przy tworzeniu logotypu marki lub z innych przyczyn), lepiej użyć czcionek sieci web.
1. **Optymalizujesz zdjęcie, zrzut ekranu lub podobny obraz? Zastosuj format JPEG.**
  * Format JPEG wykorzystuje połączenie optymalizacji stratnej i bezstratnej, co pozwala znacznie zredukować rozmiar pliku obrazu. Wypróbuj kilka poziomów jakości formatu JPEG, by osiągnąć najlepszy kompromis między jakością i rozmiarem pliku danego zasobu.

Po ustaleniu optymalnego formatu obrazu i ustawień dla każdego z zasobów rozważ dodanie dodatkowej wersji z kodowaniem WebP i JPEG XR. Formaty te są nowe, ale niestety (jeszcze) nieobsługiwane powszechnie przez wszystkie przeglądarki. Ich zaletą jest znaczna redukcja rozmiaru w przypadku nowszych klientów &ndash; np. format WebP pozwala uzyskać średnio [30%-tową redukcję rozmiaru pliku](/speed/webp/docs/webp_study) w stosunku do obrazu w formacie JPEG o porównywalnej jakości.

Ponieważ format WebP i JPEG XR nie są powszechnie obsługiwane, konieczne będzie zaimplementowanie dodatkowych procedur w aplikacji lub na serwerze, dzięki czemu przesłany zostanie odpowiedni zasób:

* Niektóre sieci CDN oferują optymalizację obrazów jako usługę, w tym umożliwiają przesyłanie obrazów w formatach JPEG XR i WebP.
* Niektóre narzędzia typu open source (np. PageSpeed for Apache lub Nginx) automatyzują optymalizację, konwersję i przesyłanie odpowiednich zasobów.
* Możesz dodać dodatkowe procedury wykrywające klienta, sprawdzające obsługiwane przez niego formaty i przesyłające obrazy w najlepszym dostępnym formacie.

Nie zapomnij, że jeśli do renderowania swojej aplikacji używasz widoku Webview, masz pełną kontrolę nad klientem i możesz korzystać wyłącznie z formatu WebP. Facebook, Google+ i wiele innych serwisów stosuje format WebP do przesyłania wszystkich obrazów w swoich aplikacjach &ndash; korzyści wynikające z redukcji rozmiaru są na pewno tego warte. Więcej informacji o formacie WebP zawiera prezentacja [WebP: Deploying Faster, Smaller, and More Beautiful Images](https://www.youtube.com/watch?v=pS8udLMOOaE) z konferencji Google I/O 2013.


## Narzędzia i wybór parametrów

Nie istnieje jeden doskonały format obrazu, narzędzie lub zestaw parametrów optymalizacyjnych, które można zastosować do wszystkich obrazów. Najlepsze wyniki uzyskuje się dzięki wybraniu formatu oraz jego ustawień przy uwzględnieniu zawartości obrazu i wymagań wizualnych, jak również innych wymagań technicznych.

<table>
<thead>
  <tr>
    <th>Narzędzie</th>
    <th>Opis</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="narzędzie"><a href="http://www.lcdf.org/gifsicle/">gifsicle</a></td>
  <td data-th="opis">tworzenie i optymalizacja obrazów w formacie GIF</td>
</tr>
<tr>
  <td data-th="narzędzie"><a href="http://jpegclub.org/jpegtran/">jpegtran</a></td>
  <td data-th="opis">optymalizacja obrazów w formacie JPEG</td>
</tr>
<tr>
  <td data-th="narzędzie"><a href="http://optipng.sourceforge.net/">optipng</a></td>
  <td data-th="opis">bezstratna optymalizacja obrazów w formacie PNG</td>
</tr>
<tr>
  <td data-th="narzędzie"><a href="http://pngquant.org/">pngquant</a></td>
  <td data-th="opis">stratna optymalizacja obrazów w formacie PNG</td>
</tr>
</tbody>
</table>


Nie bój się eksperymentować z parametrami każdego z programów do kompresji. Zmniejsz ustawienie jakości, sprawdź wygląd obrazu, a później powtórz tę procedurę od nowa. Po znalezieniu zestawu dobrych ustawień możesz je zastosować do innych podobnych obrazów w witrynie, ale nie zakładaj, że wszystkie obrazy muszą być skompresowane z użyciem tych samych ustawień.


## Przesyłanie skalowanych obrazów



Optymalizacja obrazów sprowadza się do dwóch kroków: optymalizacji liczby bajtów służących do zakodowania każdego z pikseli obrazu i optymalizacji łącznej liczby pikseli: rozmiar pliku obrazu zależy od łącznej liczby pikseli pomnożonej przez liczbę bajtów wymaganych do zakodowania każdego z pikseli. Ni mniej, ni więcej.

Dlatego jedna z najprostszych i najbardziej efektywnych technik optymalizacji obrazu polega na zapewnieniu, że nie przesyła się więcej pikseli, niż wymaga wyświetlenie zasobu w rozmiarze zastosowanym przez przeglądarkę. Proste, prawda? Niestety dla większości obrazów na stronach ten warunek nie jest spełniony: zazwyczaj przesyłane są zasoby o większej rozdzielczości, a na przeglądarkę spada ich przeskalowanie i wyświetlenie w mniejszej rozdzielczości, co wyczerpuje również zasoby procesora.

<img src="images/resized-image.png" class="center" alt="Przeskalowany obraz">

Note: Przesunięcie kursora myszy nad element obrazu w Narzędziach Chrome dla programistów pozwala uzyskać informacje o rozmiarze "naturalnym" i rozmiarze "wyświetlania" zasobu obrazu. W powyższym przykładzie pobierany jest obraz o rozdzielczości 300x260 pikseli, który przy wyświetlaniu jest zmniejszany przez klienta do rozdzielczości 245x212.

Przesyłanie zbędnych pikseli, tylko po to, by przeglądarka wyręczyła nas w zmianie skali obrazu, to utracona okazja do redukcji łącznej liczby bajtów wymaganych do renderowania strony. Jak widać, zmiana rozmiaru nie wynika po prostu z liczby pikseli, o które redukuje się rozmiar obrazu, ale również od jego rozmiaru naturalnego.

<table>
<thead>
  <tr>
    <th>Rozmiar naturalny</th>
    <th>Rozmiar wyświetlania</th>
    <th>Zbędne piksele</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="naturalny">110 x 110</td>
  <td data-th="wyświetlania">100 x 100</td>
  <td data-th="narzut">110 x 110 &ndash; 100 x 100 = 2100</td>
</tr>
<tr>
  <td data-th="naturalny">410 x 410</td>
  <td data-th="wyświetlania">400 x 400</td>
  <td data-th="narzut">410 x 410 &ndash; 400 x 400 = 8100</td>
</tr>
<tr>
  <td data-th="naturalny">810 x 810</td>
  <td data-th="wyświetlania">800 x 800</td>
  <td data-th="narzut">810 x 810 &ndash; 800 x 800 = 16100</td>
</tr>
</tbody>
</table>

Zwróć uwagę, że we wszystkich trzech powyższych przypadkach rozmiar wyświetlania jest `tylko o 10 pikseli mniejszy` od naturalnego rozmiaru obrazu. Liczba dodatkowych pikseli do zakodowania i przesłania szybko rośnie wraz ze wzrostem rozmiaru naturalnego. Mimo że trudno jest zagwarantować dostarczanie każdego zasobu dokładnie w tej rozdzielczości, w której jest wyświetlany, **należy się upewnić, że liczba zbędnych pikseli jest minimalna i że zwłaszcza zasoby o dużym rozmiarze są dostarczane w rozdzielczości możliwie najbardziej zbliżonej do rozdzielczości wyświetlania.**

## Optymalizacja obrazów &ndash; lista czynności

Optymalizacja obrazów to zarówno sztuka, jak i nauka: sztuka, ponieważ nie ma jednej właściwej odpowiedzi, jak najlepiej skompresować dany obraz; nauka, ponieważ opracowano wiele technik i algorytmów umożliwiających znaczną redukcję rozmiaru obrazu.

Niektóre wskazówki i techniki, o których trzeba pamiętać podczas optymalizacji obrazów:

* **Preferuj formaty wektorowe:** grafika wektorowa jest niezależna od rozdzielczości i skali, co idealnie kwalifikuje ją do środowiska urządzeń o wysokiej rozdzielczości.
* **Wykonuj kompaktowanie i kompresuj zasoby SVG:** kod XML utworzony w większości aplikacji graficznych często zawiera zbędne metadane, które można usunąć; upewnij się, że konfiguracja Twoich serwerów obejmuje kompresję zasobów SVG do formatu GZIP.
* **Wybierz najlepszy format obrazu rastrowego:** określ wymagania funkcjonalne i wybierz format, który najlepiej pasuje do danego zasobu.
* **Metodą prób i błędów dobierz optymalne ustawienia jakości formatów rastrowych:** nie obawiaj się znacznie zmniejszyć jakości &ndash; rezultaty wizualne są często bardzo dobre, a redukcja rozmiaru pliku znaczna.
* **Usuń zbędne metadane obrazów:** wiele obrazów rastrowych zawiera zbędne metadane: informacje geograficzne, parametry aparatu i tak dalej. Do usuwania tych danych korzystaj z odpowiednich narzędzi.
* **Przesyłaj przeskalowane obrazy:** zmieniaj rozmiar obrazów na serwerze; dopilnuj, by rozmiar `wyświetlania` był jak najbardziej zbliżony do `naturalnego`. Zwracaj szczególną uwagę na obrazy o dużej rozdzielczości, ponieważ są one przyczyną największego ubytku wydajności przy zmianie rozmiaru przez przeglądarkę.
* **Automatyzuj, automatyzuj, automatyzuj:** zainwestuj w automatyczne narzędzia i infrastrukturę, która zapewni optymalizację wszystkich zasobów obrazów w przyszłości.




