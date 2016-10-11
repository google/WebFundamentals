project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Wykrywanie i usuwanie wąskich gardeł ograniczających wydajność krytycznej ścieżki renderowania wymaga dobrej znajomości typowych problemów. Ten praktyczny przewodnik pomaga określić typowe schematy wydajności i zoptymalizować strony.


{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# Analiza wydajności krytycznej ścieżki renderowania {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Wykrywanie i usuwanie wąskich gardeł ograniczających wydajność krytycznej ścieżki renderowania wymaga dobrej znajomości typowych problemów. Ten praktyczny przewodnik pomaga określić typowe schematy wydajności i zoptymalizować strony.



Celem optymalizacji krytycznej ścieżki renderowania jest umożliwienie przeglądarce jak najszybszego wyświetlenia strony &ndash; sprawne działanie oznacza większą liczbę zaangażowanych użytkowników, odwiedzonych stron i [uzyskanych konwersji](http://www.google.com/think/multiscreen/success.html){: .external }. Dlatego chcemy zoptymalizować zakres i kolejność wczytywania zasobów, by użytkownik jak najkrótszy czas spędzał na wpatrywaniu się w pusty ekran.

Aby zilustrować ten proces, zaczniemy od najprostszego możliwego przypadku i będziemy stopniowo rozbudowywać stronę, dodając kolejne zasoby, style i procedury aplikacji. W ten sposób określimy miejsca, w których coś może pójść nie tak, i każde z nich zoptymalizujemy.

Jeszcze jedna rzecz, zanim rozpoczniemy. Dotychczas koncentrowaliśmy się tylko na tym, co dzieje się w przeglądarce, gdy zasób (plik CSS, JS lub HTML) jest dostępny do przetworzenia. Ignorowaliśmy czas potrzebny na pobranie go z pamięci podręcznej lub sieci. Optymalizacją sieciowych aspektów aplikacji zajmiemy się szczegółowo w następnym artykule, na razie jednak (by wszystko było bardziej realistyczne) przyjmiemy te założenia:

* Sieciowy cykl wymiany danych z serwerem zajmuje 100&nbsp;ms (czas przesyłania).
* Czas odpowiedzi serwera to 100&nbsp;ms w przypadku dokumentu HTML i 10&nbsp;ms przy wszystkich pozostałych plikach.

## Strona `Witaj Świecie`

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Zaczynamy od podstawowych znaczników HTML i jednego obrazu, bez CSS czy JavaScriptu. To najprostsza wersja. Otwieramy oś czasu sieci w Narzędziach Chrome dla programistów i sprawdzamy uzyskany wykres zasobów:

<img src="images/waterfall-dom.png" alt="" class="center" alt="Krytyczna ścieżka renderowania">

Zgodnie z oczekiwaniami pobieranie pliku HTML zajęło ok. 200&nbsp;ms. Pamiętaj, że przezroczysta część niebieskiego paska oznacza czas oczekiwania przeglądarki na sieć (przed odebraniem bajtów odpowiedzi), a wypełniona &ndash; czas potrzebny na zakończenie pobierania po otrzymaniu pierwszych bajtów odpowiedzi. W naszym przykładzie plik HTML jest mały (poniżej 4&nbsp;KB), więc wystarczy jeden cykl wymiany danych, by pobrać go w całości. W efekcie pobieranie dokumentu HTML trwa około 200&nbsp;ms, z czego jedna połowa to oczekiwanie na sieć, a druga &ndash; na odpowiedź serwera.

Po udostępnieniu treści HTML przeglądarka musi przeanalizować dane, przekonwertować je na tokeny i utworzyć drzewo DOM. Narzędzia dla programistów podają u dołu czas zdarzenia DOMContentLoaded (216&nbsp;ms), na wykresie oznaczony niebieską pionową linią. Odstęp między zakończeniem pobierania kodu HTML a niebieską pionową linią (DOMContentLoaded) to czas tworzenia drzewa DOM przez przeglądarkę &ndash; w tym przypadku tylko kilka milisekund.

Na koniec zwróć uwagę na coś ciekawego: plik `awesome photo` nie zablokował zdarzenia domContentLoaded. Okazuje się, że możemy utworzyć drzewo renderowania, a nawet wyświetlić stronę bez czekania na każdy umieszczony na niej zasób. **Nie wszystkie zasoby są wymagane do szybkiego wstępnego pokazania strony**. W rzeczywistości, gdy mówimy o krytycznej ścieżce renderowania, mamy zwykle na myśli kod HTML, CSS i JavaScript. Obrazy nie blokują początkowego renderowania strony. Oczywiście musimy się postarać, by one także wyświetlały się jak najszybciej.

Zdarzenie `load` (nazywane też `onload`) zostaje zablokowane w przypadku obrazu &ndash; Narzędzia dla programistów podają, że następuje po 335&nbsp;ms. Wskazuje ono moment, w którym **wszystkie zasoby** wymagane przez stronę zostały już pobrane i przetworzone, a ikona wczytywania przestaje się obracać w przeglądarce. Na wykresie jest oznaczone czerwoną pionową linią.


## Dodawanie JavaScriptu i CSS do strony

Nasza strona `Witaj Świecie` z zewnątrz może wydawać się prosta, ale w środku sporo się dzieje, by mogła działać. W praktyce potrzebujemy czegoś więcej niż tylko kodu HTML &ndash; zwykle przydaje się arkusz stylów CSS i co najmniej jeden skrypt, który zwiększa interaktywność strony. Dodajemy oba te elementy i oceniamy wyniki:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

_Przed dodaniem JavaScriptem i CSS: _

<img src="images/waterfall-dom.png" alt="Krytyczna ścieżka renderowania: DOM" class="center">

_Wykres z JavaScriptem i CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Dodanie zewnętrznych plików CSS i JavaScript oznacza dwa kolejne żądania na wykresie, które są wysyłane mniej więcej jednocześnie przez przeglądarkę &ndash; jak na razie wszystko gra. Zwróć jednak uwagę, że **różnica czasowa między zdarzeniami domContentLoaded i onload jest teraz znacznie mniejsza. Co się stało?**

* Inaczej niż w przykładzie z samym kodem HTML, obecnie musimy także pobrać i przeanalizować plik CSS, by utworzyć model CSSOM. Zarówno model DOM, jak i CSSOM są potrzebne do utworzenia drzewa renderowania.
* Strona dodatkowo zawiera teraz plik JavaScript, który wstrzymuje parser, więc zdarzenie domContentLoaded jest blokowane aż do pobrania i przeanalizowania pliku CSS. Kod JavaScript może odczytywać model CSSOM, dlatego musimy wstrzymać jego wykonanie i poczekać na CSS.

**Co w sytuacji, gdy skrypt zewnętrzny zastąpimy wbudowanym?** Pytanie na pierwszy rzut oka wydaje się proste, ale w rzeczywistości jest podchwytliwe. Okazuje się, że nawet wtedy, gdy skrypt jest bezpośrednio wbudowany w stronę, jedyny niezawodny sposób, by przeglądarka zorientowała się, jakie jest jego działanie, to go wykonać. Jak już wspomnieliśmy, można to zrobić dopiero po utworzeniu modelu CSSOM. Krótko mówiąc, wbudowany kod JavaScript też blokuje parser.

Czy wbudowanie skryptu, mimo blokowania w oczekiwaniu na CSS, przyspieszy renderowanie strony? Ostatni scenariusz nie był łatwy, jednak ten jest jeszcze bardziej skomplikowany. Wprowadzamy zmiany i oceniamy wyniki...

_Zewnętrzny JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Wbudowany JavaScript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM i wbudowany JS" class="center">

Wysyłamy jedno żądanie mniej, ale czasy zdarzeń onload i domContentLoaded są praktycznie takie same. Dlaczego? Wiemy, że niezależnie od tego, czy JavaScript jest wbudowany czy zewnętrzny, gdy tylko przeglądarka napotka tag script, wstrzymuje działanie i czeka na utworzenie modelu CSSOM. Oprócz tego w pierwszym przykładzie przeglądarka wczytywała CSS oraz JavaScript równolegle i kończyła mniej więcej w tym samym czasie. W efekcie wbudowanie kodu JavaScript w tej konkretnej sytuacji wiele nam nie daje. Czy to koniec i nic więcej nie możemy zrobić, by przyspieszyć renderowanie strony? Mamy jeszcze kilka różnych strategii.

Po pierwsze, wszystkie skrypty wbudowane blokują parser, ale przy zewnętrznych możemy dodać słowo kluczowe `async`, by go odblokować. Rezygnujemy z wbudowanego kodu i sprawdzamy wyniki:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

_JavaScript, który blokuje parser (zewnętrzny):_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Asynchroniczny JavaScript (zewnętrzny):_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, asynchroniczny JS" class="center">

Znacznie lepiej. Zdarzenie domContentLoaded następuje krótko po przeanalizowaniu znaczników HTML &ndash; przeglądarka wie, że nie musi przerywać działania w oczekiwaniu na wykonanie kodu JavaScript. Nie ma żadnych innych skryptów blokujących parser, więc równolegle można też tworzyć model CSSOM.

Kolejne rozwiązanie to wbudować zarówno kod JavaScript, jak i CSS:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, wbudowany CSS, wbudowany JS" class="center">

Zwróć uwagę, że czas zdarzenia _domContentLoaded_ jest praktycznie taki sam jak w poprzednim przykładzie. Zamiast oznaczać JavaScript jako asynchroniczny, wbudowaliśmy CSS i JS w kod strony. To zwiększyło rozmiar strony HTML, ale przeglądarka nie musi już czekać na pobranie żadnych zasobów zewnętrznych &ndash; wszystko jest bezpośrednio w pliku strony.

Jak widać, nawet w przypadku prostej strony optymalizacja krytycznej ścieżki renderowania to złożone zadanie. Trzeba poznać graf zależności między poszczególnymi zasobami, określić, które zasoby są `krytyczne`, oraz wybrać spośród różnych strategii dodawania ich do strony. Nie ma jednego rozwiązania tego problemu &ndash; każda strona jest inna. Musisz samodzielnie wykonać podobną procedurę, by opracować optymalną strategię.

Teraz cofniemy się i spróbujemy określić ogólne schematy wydajności...


## Schematy wydajności

Najprostsza możliwa strona składa się tylko ze znaczników HTML &ndash; bez CSS, JavaScriptu czy innych typów zasobów. Aby ją wyświetlić, przeglądarka musi wysłać żądanie, poczekać, aż otrzyma dokument HTML, przeanalizować go, utworzyć model DOM, a na koniec wyrenderować go na ekranie:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom.png" alt="Krytyczna ścieżka renderowania: `Witaj Świecie`" class="center">

**Czas między T<sub>0</sub> i T<sub>1</sub> obejmuje działanie sieci i serwera.** W najlepszym przypadku (gdy plik HTML jest mały), potrzebujemy tylko jednego cyklu wymiany danych przez sieć, by pobrać cały dokument. Ze względu na sposób działania protokołów transportowych TCP większe pliki mogą wymagać wielu cykli wymian danych. Wrócimy do tego tematu w jednym z kolejnych artykułów. **Możemy więc stwierdzić, że strona ma krytyczną ścieżkę renderowania z minimum jednym cyklem wymiany danych.**

Teraz przyjrzymy się tej samej stronie, ale z zewnętrznym plikiem CSS:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css.png" alt="Krytyczna ścieżka renderowania: DOM + CSSOM" class="center">

Ponownie wykonujemy jeden cykl wymiany danych przez sieć, by pobrać dokument HTML. Następnie pobrany kod informuje nas, że potrzebujemy też pliku CSS. To oznacza, że przed wyrenderowaniem strony na ekranie przeglądarka musi jeszcze raz skontaktować się z serwerem i pobrać arkusz CSS. **W wyniku tego strona przed wyświetleniem przeprowadza minimum dwa cykle wymiany danych.** Także w tym przypadku plik CSS może wymagać wielu takich cykli, dlatego wspominamy o `minimum`.

Zdefiniujemy pojęcia, które pozwolą nam opisać krytyczną ścieżkę renderowania:

* **Zasób krytyczny:** zasób, który może zablokować początkowe renderowanie strony.
* **Długość ścieżki krytycznej:** liczba cykli wymiany danych lub łączny czas potrzebny do tego, by pobrać wszystkie zasoby krytyczne.
* **Dane krytyczne:** łączna liczba bajtów wymaganych do pierwszego wyrenderowania strony. To suma rozmiarów wszystkich przesyłanych plików zasobów krytycznych.
W pierwszym przykładzie z pojedynczym plikiem HTML strona zawiera jeden zasób krytyczny (dokument HTML), długość ścieżki krytycznej to jeden cykl wymiany danych (jeśli plik jest mały), a całkowita ilość danych krytycznych to rozmiar przesyłanego dokumentu HTML.

Porównamy to z charakterystyką ścieżki krytycznej przykładowej strony z HTML i CSS:

<img src="images/analysis-dom-css.png" alt="Krytyczna ścieżka renderowania: DOM + CSSOM" class="center">

* **2** zasoby krytyczne
* **2** lub więcej cykli wymiany danych przy minimalnej długości ścieżki krytycznej
* **9**&nbsp;KB danych krytycznych

Do utworzenia drzewa renderowania potrzebujemy zarówno pliku HTML, jak i CSS, więc oba to zasoby krytyczne. Arkusz CSS jest pobierany dopiero po tym, gdy przeglądarka odczyta dokument HTML, więc długość ścieżki krytycznej to minimum dwa cykle wymiany danych. Zasoby dają łącznie 9&nbsp;KB danych krytycznych.

Teraz dodamy do strony plik JavaScript.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Dodaliśmy plik app.js, który jest zewnętrznym zasobem JavaScript na stronie. Wiemy już, że blokuje on parser (czyli to zasób krytyczny). Co gorsza, przed wykonaniem kodu JavaScript przeglądarka musi wstrzymać działanie i poczekać na model CSSOM. JavaScript może go odczytywać, więc przeglądarka najpierw pobiera plik `style.css` i tworzy CSSOM.

<img src="images/analysis-dom-css-js.png" alt="Krytyczna ścieżka renderowania: DOM, CSSOM, JavaScript" class="center">

Na "wykresie sieciowym" strony możemy zauważyć, że żądania udostępnienia plików CSS i JavaScript są wysyłane mniej więcej w tym samym czasie. Przeglądarka pobiera plik HTML, wykrywa oba zasoby i wysyła żądania. W efekcie otrzymujemy taką charakterystykę ścieżki krytycznej strony:

* **3** zasoby krytyczne
* **2** lub więcej cykli wymiany danych przy minimalnej długości ścieżki krytycznej
* **11**&nbsp;KB danych krytycznych

Mamy teraz trzy zasoby krytyczne, które łącznie dają 11&nbsp;KB danych krytycznych, ale długość ścieżki krytycznej to wciąż dwa cykle wymiany danych, bo pliki CSS i JavaScript są przesyłane równolegle. **Aby poznać charakterystykę krytycznej ścieżki renderowania, trzeba ustalić, które zasoby są krytyczne i jak przeglądarka zaplanuje ich pobieranie.** Jeszcze trochę rozwiniemy nasz przykład.

Po rozmowie z programistami witryny stwierdzamy, że plik JavaScript dodany do strony nie wymaga wstrzymywania pracy przeglądarki. Zawarty w nim kod do analityki itp. nie musi blokować renderowania strony. Dzięki temu możemy dodać atrybut `async` do tagu script, by odblokować parser:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css-js-async.png" alt="Krytyczna ścieżka renderowania: DOM, CSSOM, asynchroniczny JavaScript" class="center">

Oznaczenie skryptu jako asynchronicznego ma kilka zalet:

* Skrypt nie blokuje już parsera i nie należy do krytycznej ścieżki renderowania.
* Nie ma innych skryptów krytycznych, więc CSS także nie musi blokować wywołania zdarzenia domContentLoaded.
* Im szybciej nastąpi zdarzenie domContentLoaded, tym wcześniej zaczną działać inne procedury aplikacji.

W wyniku tego strona znowu ma tylko dwa zasoby krytyczne (HTML i CSS), minimalna długość ścieżki krytycznej to dwa cykle wymiany danych, a łączna ilość danych krytycznych to 9&nbsp;KB.

Na koniec przypuśćmy, że arkusz stylów CSS jest potrzebny tylko do drukowania. Jak zmieni się ścieżka?

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css-nb-js-async.png" alt="Krytyczna ścieżka renderowania: DOM, nieblokujący CSS i asynchroniczny JavaScript" class="center">

Zasób style.css jest używany tylko do drukowania, więc przeglądarka nie musi z jego powodu blokować renderowania strony. Dzięki temu od razu po utworzeniu modelu DOM ma dość informacji, by wyświetlić stronę. W efekcie strona zawiera tylko jeden zasób krytyczny (dokument HTML), a minimalna długość krytycznej ścieżki renderowania to jeden cykl wymiany danych.



