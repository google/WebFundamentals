project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Po wyeliminowaniu wszystkich zbędnych zasobów następnym krokiem jest minimalizacja łącznego rozmiaru pozostałych do pobrania zasobów &ndash; tzn. ich kompresja z użyciem algorytmów dostosowanych do treści i algorytmów ogólnego przeznaczenia (GZip).


{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# Optymalizacja kodowania i rozmiaru transferu zasobów tekstowych {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



Nasze aplikacje internetowe stają się coraz bardziej wyrafinowane, ambitne i funkcjonalne &ndash; to dobry kierunek. Jednak niepowstrzymane dążenie ku coraz bogatszym wrażeniom w Internecie powoduje powstanie kolejnego trendu: ilość danych pobieranych przez aplikacje rośnie w stałym tempie. Aby zagwarantować najwyższą wydajność, musimy zoptymalizować transfer każdego bajtu.



## Podstawy kompresji danych 101

Po wyeliminowaniu wszystkich zbędnych zasobów następnym krokiem jest minimalizacja łącznego rozmiaru pozostałych do pobrania zasobów &ndash; tzn. ich kompresja. Do dyspozycji mamy wiele różnych technik dostosowanych do rodzaju zasobu &ndash; tekstu, obrazów, czcionek i innych: narzędzia ogólnego przeznaczenia, które można włączyć na serwerze, optymalizacje wstępne dla poszczególnych rodzajów treści i optymalizacje dostosowane do zasobów, wymagające działania programisty.

Osiągnięcie najwyższej wydajności wymaga połączenia wszystkich tych technik.

### TL;DR {: .hide-from-toc }
- Kompresja to proces kodowania informacji, w wyniku którego zajmują one mniej bitów
- Najlepsze wyniki przynosi zawsze eliminacja zbędnych danych
- Istnieje wiele różnych technik i algorytmów kompresji
- Osiągnięcie najlepszego poziomu kompresji wymaga stosowania różnych technik


Proces redukcji rozmiaru danych jest znany pod nazwą "kompresji danych". Sam w sobie stanowi obszerne pole do badań: wielu ludzi spędziło całe swoje życie zawodowe, pracując nad algorytmami, technikami i optymalizacjami prowadzącymi do zwiększenia prędkości i współczynników kompresji oraz zmniejszenia wymagań pamięciowych różnych algorytmów kompresji. Pełna dyskusja tego tematu wychodzi poza zakres naszych rozważań, ale mimo to ważne jest zrozumienie ogólnego sposobu działania algorytmów kompresji i technik umożliwiających redukcję rozmiaru różnych zasobów zamieszczanych na stronach.

Podstawowe techniki optymalizacji w akcji przedstawimy, rozważając prostą wiadomość tekstową, którą przygotowaliśmy na potrzeby tego przykładu:

    # Poniżej znajduje się tajna wiadomość składająca się z zestawu nagłówków
    # w formacie klucz-wartość, po których następuje znak nowego wiersza, a następnie zaszyfrowany komunikat.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. Wiadomości mogą zawierać dowolne adnotacje opatrzone przedrostkiem "#". Adnotacje nie wpływają na znaczenie i inne zachowanie wiadomości.
2. Wiadomości mogą zawierać nagłówki składające się z par klucz-wartość (separatorem jest znak ":"). Nagłówki muszą się znajdować na początku wiadomości.
3. Wiadomości służą do przekazywania użytecznego tekstu.

Jak można zredukować rozmiar powyższej wiadomości, która ma obecnie długość 200 znaków?

1. Komentarze mogą być interesujące, ale w zasadzie nie wnoszą wiele do znaczenia wiadomości, więc przy przesyłaniu można je wyeliminować.
2. Zapewne dostępne są sprytne techniki kodowania nagłówków w wydajny sposób -- np. nie mamy pewności, czy wszystkie wiadomości zawierają zawsze nagłówki "format" i "data", ale jeśli tak, to można by je zastąpić identyfikatorami typu short integer i wysyłać tylko identyfikatory. Jednak nie mamy pewności, czy można tak postąpić, więc na razie się tym nie zajmujmy.
3. Użyteczna część wiadomości składa się wyłącznie z tekstu, i mimo że nie znamy jej sensu (najwyraźniej, jest to "tajna wiadomość"), wystarczy na nią spojrzeć, by stwierdzić, że występuje w niej wiele powtarzalnych elementów. Być może, zamiast przesyłać powtarzające się litery, można by zliczyć liczbę powtórzeń i zakodować je w bardziej efektywny sposób?
    * Na przykład "AAA" można by zakodować jako "3A" &ndash; czyli jako sekwencję trzech liter A.


Łącząc wszystkie podejścia, otrzymujemy następujący wynik:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

Nowa wiadomość zawiera 56 znaków, czyli udało się ją skompresować o imponujące 72% &ndash; nieźle, a to dopiero początek.

Możesz się jednak zastanawiać, jak to przekłada się na optymalizację naszych stron internetowych? Naszym zamiarem nie jest chyba tworzenie własnych algorytmów kompresji? Oczywiście, że nie, jednak techniki tego typu i podobny sposób myślenia będziemy stosować przy optymalizacji różnych zasobów na naszych stronach. Optymalizacja będzie składała się z następujących etapów: przetwarzania wstępnego, optymalizacji zależnych od kontekstu i używania różnych algorytmów do różnych typów treści.


## Kompaktowanie: przetwarzanie wstępne i optymalizacje zależne od kontekstu

### TL;DR {: .hide-from-toc }
- Optymalizacje dostosowane do treści mogą znacznie zredukować rozmiar przesyłanych zasobów.
- Optymalizacje dostosowane do treści najlepiej stosować w cyklu kompilacji/aktualizacji kodu.


Najlepszym sposobem kompresji powtarzających się i zbędnych danych jest ich całkowita eliminacja. Nie można oczywiście usuwać dowolnych danych, ale w niektórych kontekstach możemy wykorzystać wiedzę o treści, formacie danych i jego właściwościach do znacznej redukcji rozmiaru użytecznych danych bez przekłamywania ich znaczenia.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minify.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Rozważmy prostą stronę HTML powyżej i trzy różne typy treści na niej obecne: kod HTML, CSS i JavaScript. Do każdego typu treści odnoszą się różne zasady poprawności (dla znaczników HTML i CSS oraz kodu JavaScript), różne zasady wyróżniania komentarzy i tak dalej. Jak można zredukować rozmiar tej strony?

* Dodawanie komentarzy do kodu to najlepsza praktyka, jaką może zastosować programista, ale przeglądarka ich nie potrzebuje. Proste usunięcie komentarzy ze znaczników CSS ("/* ... */"), znaczników HTML ("<!-- ... -->") i kodu JavaScript ("// ...") może znacznie zredukować łączny rozmiar strony.
* Inteligentny algorytm kompresji kodu CSS może zaobserwować, że dla elementu ".awesome-container" użyto nieefektywnego sposobu określania reguł i zwinąć dwie deklaracje do jednej bez zmiany żadnych innych stylów. Pozwoli to wyeliminować jeszcze więcej danych.
* Znaki niedrukowalne (spacje i tabulatory) zwiększają komfort pracy programisty ze znacznikami HTML i CSS oraz kodem JavaScript. Kolejny algorytm kompresji mógłby usunąć wszystkie te spacje i tabulatory.


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/optimizing-content-efficiency/_code/minified.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Po zastosowaniu wszystkich powyższych zaleceń rozmiar strony zmniejsza się z 406 do 150 znaków &ndash; redukcja rozmiaru o 63%! To prawda, że kod strony traci na czytelności, ale to nie problem: możemy zachować oryginalną stronę jako "wersję rozwojową" i wykonywać powyższe czynności za każdym razem, gdy konieczne będzie umieszczenie nowej wersji strony w witrynie.

Cofnijmy się na chwilę. Powyższy przykład ilustruje ważny fakt: algorytm kompresji ogólnego przeznaczenia &ndash; np. zaprojektowany do kompresji dowolnego tekstu &ndash; zapewne mógłby całkiem zadowalająco skompresować powyższą stronę, ale nie usunąłby komentarzy, nie zwinąłby reguł w kodzie CSS i nie przeprowadziłby wielu innych optymalizacji zależnych od kontekstu. Właśnie dlatego przetwarzanie wstępne / kompaktowanie / optymalizacja zależna od kontekstu stanowią tak potężną metodę.

Note: Najlepszym przykładem jest rozmiar nieskompresowanej wersji rozwojowej biblioteki JQuery, który teraz dochodzi do ok. 300 KB. Ta sama biblioteka po skompaktowaniu (usunięciu komentarzy itp.) ma około 3x mniejszy rozmiar: ok. 100 KB.

Powyższe techniki można rozszerzyć na zasoby inne niż tekstowe. Grafika, filmy wideo i inne typy treści zawierają metadane. Różnią się one od siebie użytecznymi danymi. Na przykład przy wykonywaniu zdjęć aparat dołącza wiele dodatkowych informacji: o swoich ustawieniach, lokalizacji i tak dalej. Zależnie od zastosowania dane te mogą mieć kluczowe znaczenie (np. w przypadku witryn umożliwiających udostępnianie zdjęć) lub być kompletnie bezużyteczne i wtedy należy rozważyć ich usunięcie. W praktyce te metadane mogą zwiększać rozmiar każdego obrazu nawet o kilkadziesiąt kilobajtów.

W skrócie: pierwszym krokiem do optymalizacji wydajności zasobów jest utworzenie spisu różnych typów treści i zastanowienie się, jakie optymalizacje zależne od kontekstu można zastosować w celu redukcji rozmiaru zasobów &ndash; może to przynieść znaczne korzyści. Po zorientowaniu się, jakie optymalizacje są potrzebne, zautomatyzuj je, dodając odpowiednie procedury do procesu kompilacji aplikacji &ndash; to jedyny sposób gwarantujący użycie optymalizacji w przyszłości.

## Kompresja tekstu za pomocą kompresora GZIP

### TL;DR {: .hide-from-toc }
- Format GZIP osiąga najlepsze wyniki dla zasobów tekstowych: CSS, JavaScript, HTML
- Wszystkie nowoczesne przeglądarki obsługują kompresję GZIP i automatycznie jej żądają
- Włączenie kompresji GZIP wymaga odpowiedniego skonfigurowania serwera
- W przypadku niektórych sieci CDN włączenie kompresji GZIP wymaga wykonania specjalnych czynności


[GZIP](http://pl.wikipedia.org/wiki/Gzip){: .external } jest programem kompresji ogólnego przeznaczenia, który można stosować do kompresji dowolnego strumienia danych: jego działanie polega na zapamiętywaniu poprzednio przetworzonych danych i próbie znalezienia zduplikowanych fragmentów danych w efektywny sposób &ndash; zainteresowani szczegółami mogą zapoznać się ze [świetnym wyjaśnieniem niskopoziomowego sposobu działania programu kompresji GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). W praktyce kompresja GZIP wypada najlepiej w przypadku tekstu. Współczynniki kompresji często osiągają wartości nawet 70-90% dla większych plików. Jednak kompresja GZIP zasobów już skompresowanych z użyciem algorytmów alternatywnych (tak jak w przypadku większości formatów obrazów) przynosi niewiele korzyści.

Wszystkie nowoczesne przeglądarki obsługują i automatycznie negocjują kompresję GZIP dla wszystkich żądań HTTP: naszym zadaniem jest zapewnienie poprawnej konfiguracji serwera tak, by po otrzymaniu żądania klienta był przesyłany skompresowany zasób.


<table>
<thead>
  <tr>
    <th>Biblioteka</th>
    <th>Rozmiar</th>
    <th>Rozmiar po kompresji</th>
    <th>Współczynnik kompresji</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="biblioteka">jquery-1.11.0.js</td>
  <td data-th="rozmiar">276 KB</td>
  <td data-th="po kompresji">82 KB</td>
  <td data-th="oszczędność">70%</td>
</tr>
<tr>
  <td data-th="biblioteka">jquery-1.11.0.min.js</td>
  <td data-th="rozmiar">94 KB</td>
  <td data-th="po kompresji">33 KB</td>
  <td data-th="oszczędność">65%</td>
</tr>
<tr>
  <td data-th="biblioteka">angular-1.2.15.js</td>
  <td data-th="rozmiar">729 KB</td>
  <td data-th="po kompresji">182 KB</td>
  <td data-th="oszczędność">75%</td>
</tr>
<tr>
  <td data-th="biblioteka">angular-1.2.15.min.js</td>
  <td data-th="rozmiar">101 KB</td>
  <td data-th="po kompresji">37 KB</td>
  <td data-th="oszczędność">63%</td>
</tr>
<tr>
  <td data-th="biblioteka">bootstrap-3.1.1.css</td>
  <td data-th="rozmiar">118 KB</td>
  <td data-th="po kompresji">18 KB</td>
  <td data-th="oszczędność">85%</td>
</tr>
<tr>
  <td data-th="biblioteka">bootstrap-3.1.1.min.css</td>
  <td data-th="rozmiar">98 KB</td>
  <td data-th="po kompresji">17 KB</td>
  <td data-th="oszczędność">83%</td>
</tr>
<tr>
  <td data-th="biblioteka">foundation-5.css</td>
  <td data-th="rozmiar">186 KB</td>
  <td data-th="po kompresji">22 KB</td>
  <td data-th="oszczędność">88%</td>
</tr>
<tr>
  <td data-th="biblioteka">foundation-5.min.css</td>
  <td data-th="rozmiar">146 KB</td>
  <td data-th="po kompresji">18 KB</td>
  <td data-th="oszczędność">88%</td>
</tr>
</tbody>
</table>

Powyższa tabela ilustruje oszczędności uzyskane dzięki kompresji GZIP dla kilku najpopularniejszych bibliotek JavaScript i platform CSS. Oszczędności sięgają od 60 do 88%. Połączenie kompaktowania plików (o czym świadczy rozszerzenie ".min" pliku) i kompresji GZIP zapewnia jeszcze większe korzyści.

1. **Najpierw zastosuj optymalizacje zależne od kontekstu: programy do kompaktowania znaczników HTML i CSS oraz kodu JS.**
2. **Następnie zastosuj program do kompresji GZIP skompaktowanego kodu.**

Włączenie kompresji GZIP jest jednym z najprostszych i najbardziej opłacalnych środków optymalizacji, które można zastosować &ndash; niestety wiele osób o tym nadal zapomina. Większość serwerów WWW kompresuje treść bez udziału użytkownika. Użytkownik musi się jedynie upewnić, że konfiguracja serwera zezwala na kompresję GZIP treści wszystkich typów, dla których jest to korzystne.

Jaka konfiguracja jest najlepsza dla Twojego serwera? Projekt HTML5 Boilerplate zawiera [przykładowe pliki konfiguracyjne](https://github.com/h5bp/server-configs){: .external } dla wszystkich najpopularniejszych serwerów. Zawierają one szczegółowe komentarze odnośnie do każdego znacznika i ustawienia konfiguracji: znajdź stosowny serwer na liście, wyszukaj odpowiednie ustawienia i upewnij się, że serwer jest skonfigurowany z użyciem zalecanych ustawień.

<img src="images/transfer-vs-actual-size.png" class="center" alt="Demonstracja wyświetlania rozmiaru rzeczywistego i rozmiaru przesyłania w narzędziach DevTools">

Wyniki działania kompresji GZIP można łatwo i szybko ocenić, otwierając Narzędzia Chrome dla programistów i sprawdzając wartości w kolumnie "Size / Content" na panelu Network: "Size" oznacza rozmiar przesyłania, a "Content" oznacza rozmiar zasobu przed kompresją. Dla zasobu HTML w powyższym przykładzie dzięki kompresji GZIP zaoszczędzono podczas przesyłania 24,8 KB.

Note: Może to się wydawać niewiarygodne, ale są przypadki, w których kompresja GZIP powoduje zwiększenie rozmiaru zasobu. Dzieje się tak zazwyczaj, gdy zasób jest bardzo mały i narzut związany z dodaniem słownika GZIP jest większy niż redukcja rozmiaru albo zasób jest już dobrze skompresowany. Możliwość określenia 'minimalnego rozmiaru pliku' w niektórych serwerach pozwala uniknąć tego problemu.

Na koniec ostrzeżenie: większość serwerów udostępnia zasoby użytkownikowi po ich automatycznym skompresowaniu, jednak niektóre sieci CDN wymagają dodatkowych czynności i ręcznej zmiany ustawień, by kompresja GZIP byłastosowana zgodnie z założeniami. Audyt Twojej witryny pozwoli sprawdzić, czy zasoby są rzeczywiście [kompresowane](http://www.whatsmyip.org/http-compression-test/){: .external }.





