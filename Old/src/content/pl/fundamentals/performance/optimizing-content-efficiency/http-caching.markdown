---
title: "Buforowanie HTTP"
description: "Pobieranie przez sieć jest powolne i kosztowne: długie odpowiedzi na zapytania wymagają od klienta i serwera wielu kolejnych cykli wymiany danych, co blokuje na pewien czas przeglądarkę, ponadto przyczynia się do zwiększenia opłat za transfer. Z tego względu zdolność do buforowania i ponownego wykorzystania poprzednio pobranych zasobów jest kluczowym aspektem optymalizacji wydajności."
updated_on: 2014-01-05
key-takeaways:
  validate-etags:
    - "Token walidacji jest przekazywany przez serwer za pomocą nagłówka ETag HTTP"
    - "Token walidacji umożliwia efektywne sprawdzanie, czy zasób zaktualizowano: transfer danych nie następuje, jeśli zasób się nie zmienił."
  cache-control:
    - "Każdy zasób może określić swoją politykę buforowania za pomocą nagłówka Cache-Control protokołu HTTP"
    - "Dyrektywy Cache-Control kontrolują, kto może buforować odpowiedź, w jakich warunkach i jak długo"
  invalidate-cache:
    - "Lokalnie zbuforowane odpowiedzi są używane do momentu `wygaśnięcia` zasobu"
    - "Umieszczenie odcisku cyfrowego zawartości pliku w adresie URL pozwala wymusić u klienta aktualizację do nowej wersji odpowiedzi"
    - "Aplikacja może uzyskać najwyższą wydajność, określając własną hierarchię buforowania"
notes:
  webview-cache:
    - "Jeśli do pobierania i wyświetlania treści w swojej aplikacji używasz widoku Webview, może być konieczne określenie dodatkowych ustawień konfiguracji zapewniających, że buforowanie HTTP jest włączone, jego rozmiar jest uzasadniony w danym zastosowaniu, a pamięć podręczna zostanie utrwalona. Zapoznaj się z dokumentacją platformy i upewnij się, że ustawienia są poprawne."
  boilerplate-configs:
    - "Wskazówka: projekt HTML5 Boilerplate zawiera <a href='https://github.com/h5bp/server-configs'>przykładowe pliki konfiguracyjne</a> dla wszystkich najpopularniejszych serwerów. Zawierają one szczegółowe komentarze odnośnie do każdego znacznika i ustawienia konfiguracji: znajdź stosowny serwer na liście, wyszukaj odpowiednie ustawienia i je skopiuj albo upewnij się, że serwer jest skonfigurowany z użyciem zalecanych ustawień."
  cache-control:
    - "Definicję nagłówka Cache-Control określono w specyfikacji HTTP/1.1. Zastępuje on wcześniejsze nagłówki (np. Expires) służące do określania polityki buforowania odpowiedzi. Wszystkie nowoczesne przeglądarki obsługują nagłówek Cache-Control, dlatego stanowi on wszystko, czego będziemy potrzebować."
---

<p class="intro">
  Pobieranie przez sieć jest powolne i kosztowne: długie odpowiedzi na zapytania wymagają od klienta i serwera wielu kolejnych cykli wymiany danych, co blokuje na pewien czas przeglądarkę, ponadto przyczynia się do zwiększenia opłat za transfer. Z tego względu zdolność do buforowania i ponownego wykorzystania poprzednio pobranych zasobów jest kluczowym aspektem optymalizacji wydajności.
</p>


{% include shared/toc.liquid %}

Dobra wiadomość &ndash; w każdej przeglądarce zaimplementowano pamięć podręczną HTTP. Tak więc wystarczy, że upewnimy się, że w każdej odpowiedzi serwera zamieszczane są poprawne dyrektywy nagłówka HTTP, a przeglądarka będzie wiedzieć, kiedy i jak długo buforować odpowiedź.

{% include shared/remember.liquid character="{" position="left" title="" list=page.notes.webview-cache %}

<img src="images/http-request.png" class="center" alt="Żądanie HTTP">

Gdy serwer zwraca odpowiedź, przesyła również zestaw nagłówków HTTP z opisem typu treści, jej długością, dyrektywami buforowania, tokenem walidacji i innymi informacjami. Na przykład w trakcie powyższej wymiany informacji serwer zwraca odpowiedź 1024-bajtową, poleca klientowi jej buforowanie przez 120 sekund i przesyła token walidacji (`x234dff`), którego po wygaśnięciu odpowiedzi można użyć do sprawdzenia, czy zasób został zmodyfikowany.


## Walidacja buforowanych odpowiedzi za pomocą tokenów ETag

{% include shared/takeaway.liquid list=page.key-takeaways.validate-etags %}

Załóżmy, że od pierwszego pobrania upłynęło 120 sekund i przeglądarka chce wysłać nowe żądanie pobrania tego samego zasobu. Najpierw przeglądarka sprawdzi lokalną pamięć podręczną i znajdzie poprzednią odpowiedź, której niestety nie można użyć, ponieważ już `wygasła`. W tej chwili mogłaby po prostu wysłać nowe żądanie i pobrać nową pełną odpowiedź, ale to sposób nieefektywny, ponieważ jeśli zasób nie uległ zmianie, nie ma potrzeby pobierania dokładnie tych samych danych, już obecnych w pamięci podręcznej.

Do rozwiązania tego problemu służy token walidacji określony w nagłówku ETag: serwer generuje i zwraca pewien token, który zazwyczaj stanowi skrót lub określony w inny sposób cyfrowy odcisk zawartości pliku. Klient nie musi znać sposobu generacji odcisku cyfrowego, musi go tylko wysłać do serwera w następnym żądaniu: jeśli odcisk cyfrowy pozostaje taki sam, zasób się nie zmienił, a jego pobranie nie jest konieczne.

<img src="images/http-cache-control.png" class="center" alt="Przykład dyrektywy Cache-Control protokołu HTTP">

W powyższym przykładzie klient automatycznie zapewnia token ETag w nagłówku żądania `If-None-Match` protokołu HTTP, serwer weryfikuje token względem aktualnego zasobu i, jeśli ten się nie zmienił, zwraca odpowiedź `304 Not Modified` informującą przeglądarkę, że odpowiedź z pamięci podręcznej nie zmieniła się, a jej ważność można przedłużyć na kolejne 120 sekund. Zwróć uwagę, że nie trzeba ponownie pobierać odpowiedzi &ndash; pozwala to oszczędzić czas i łącze.

W jaki sposób jako programista witryn internetowych możesz efektywnie wykorzystać ponowną walidację? Przeglądarka wykonuje całą pracę za nas: automatycznie wykrywa, czy poprzednio określono token walidacji i dołącza go do żądania wychodzącego, a następnie w oparciu o odpowiedź z serwera aktualizuje sygnatury czasowe pamięci podręcznej. **Musimy jedynie zapewnić, że serwer rzeczywiście wysyła wymagane tokeny ETag: w dokumentacji sprawdź, jakie ustawienia konfiguracji są wymagane.**

{% include shared/remember.liquid list=page.notes.boilerplate-configs %}


## Dyrektywa Cache-Control

{% include shared/takeaway.liquid list=page.key-takeaways.cache-control %}

Najlepszym żądaniem jest żądanie, które nie wymaga komunikacji z serwerem: lokalna kopia odpowiedzi pozwala wyeliminować czas oczekiwania na odpowiedź przez sieć i uniknąć opłat za transfer danych. Specyfikacja HTTP pozwala serwerowi zwrócić [kilka różnych dyrektyw Cache-Control](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) umożliwiających kontrolę sposobu i długości buforowania poszczególnych odpowiedzi przez przeglądarkę i inne bufory pośredniej pamięci podręcznej.

{% include shared/remember.liquid list=page.notes.cache-control %}

<img src="images/http-cache-control-highlight.png" class="center" alt="Przykład dyrektywy Cache-Control protokołu HTTP">

### "no-cache" i "no-store"

Dyrektywa "no-cache" wskazuje, że zwróconej odpowiedzi nie można użyć przy kolejnym żądaniu zasobu o tym samym adresie URL bez wcześniejszego sprawdzenia na serwerze, czy odpowiedź się nie zmieniła. W efekcie, jeśli obecny jest poprawny token walidacji (ETag), dyrektywa no-cache wymusza dodatkowe zwalidowanie zbuforowanej odpowiedzi, co pozwala wyeliminować pobieranie niezmodyfikowanego zasobu.

W odróżnieniu od powyższej dyrektywa `no-store` jest o wiele prostsza, ponieważ po prostu zabrania przeglądarce i wszystkim buforom pamięci podręcznej przechowywać jakiekolwiek wersje zwracanych odpowiedzi &ndash; np. zawierających dane prywatne lub bankowe. Za każdym razem, gdy użytkownik zażąda tego zasobu, do serwera wysyłane będzie żądanie i pobierana pełna odpowiedź.

### Odpowiedź publiczna a prywatna

Po oznaczeniu odpowiedzi jako `public` będzie można ją buforować, nawet jeśli jest z nią związane uwierzytelnianie HTTP i nawet jeśli kod stanu odpowiedzi wskazuje, że normalnie buforować jej nie można. Zazwyczaj oznaczanie odpowiedzi jako `public` nie jest konieczne, ponieważ zamieszczone informacje odnośnie do buforowania (takie jak `max-age`) wskazują, że
tę odpowiedź należy buforować.

Inaczej niż w powyższym przypadku, przeglądarka może buforować odpowiedzi typu `private`, ale zazwyczaj są one przeznaczone dla jednego użytkownika i dlatego zabronione jest ich buforowanie w pośrednich pamięciach podręcznych &ndash; np. stronę HTML z prywatnymi informacjami użytkownika może buforować przeglądarka użytkownika, ale nie sieć CDN.

### `max-age`

Ta dyrektywa określa maksymalny czas trwania zezwolenia na ponowne wykorzystanie od momentu wysłania żądania &ndash; np. `max-age=60` oznacza, że odpowiedź można zbuforować i ponownie jej używać przez kolejne 60 sekund.

## Określanie optymalnej polityki Cache-Control

<img src="images/http-cache-decision-tree.png" class="center" alt="Schemat wyboru opcji buforowania">

Postępując według powyższego schematu decyzji, ustal optymalną politykę buforowania dla konkretnego zasobu lub zestawu zasobów wymaganych przez Twoją aplikację. W idealnym przypadku powinno buforować się jak najwięcej odpowiedzi u klienta, przez najdłuższy możliwy okres czasu i udostępniać tokeny walidacji dla każdej odpowiedzi w celu zagwarantowania efektywnej ponownej walidacji.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th width="30%">Dyrektywy Cache-Control</th>
    <th>Wyjaśnienie</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="wyjaśnienie">Odpowiedź może zostać zbuforowana przez przeglądarkę i inne bufory pośredniej pamięci podręcznej (tzn. pozostanie `publiczna`) przez 1 dzień (60 sekund x 60 minut x 24 godziny)</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="wyjaśnienie">Odpowiedź może zostać zbuforowana przez przeglądarkę klienta przez jedynie 10 minut (60 sekund x 10 minut)</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="wyjaśnienie">Odpowiedzi nie wolno buforować; trzeba pobierać pełną odpowiedź przy każdym żądaniu.</td>
</tr>
</table>

Według projektu HTTP Archive, wśród najpopularniejszych 300 000 witryn (według rankingu Alexa) [prawie połowa wszystkich pobieranych odpowiedzi może być buforowana](http://httparchive.org/trends.php#maxage0) przez przeglądarki, co zapewnia duże oszczędności przy powtórnych odwiedzinach danej strony. Oczywiście nie oznacza to, że dla konkretnej aplikacji dokładnie 50% zasobów będzie buforowanych: w przypadku niektórych witryn będzie to 90% i więcej, w przypadku innych wiele prywatnych i szybko dezaktualizujących się danych nie będzie nigdy buforowane.

**Audytuj swoje strony i wyszukuj zasoby, które mogą zostać zbuforowane. Pilnuj, by były dla nich zwracane odpowiednie nagłówki Cache-Control i ETag.**


## Unieważnianie i aktualizacja zbuforowanych odpowiedzi

{% include shared/takeaway.liquid list=page.key-takeaways.invalidate-cache %}

Wszystkie żądania HTTP generowane przez przeglądarkę są najpierw kierowane do pamięci podręcznej przeglądarki, co umożliwia sprawdzenie obecności w pamięci podręcznej ważnej odpowiedzi, której można użyć w odpowiedzi na żądanie HTTP. Po znalezieniu pasującej odpowiedzi jest ona odczytywana z pamięci podręcznej; w ten sposób eliminuje się opóźnienia przesyłania przez sieć i opłaty za transfer danych. **Jednak co zrobić, jeśli chcemy zaktualizować lub unieważnić odpowiedź w pamięci podręcznej?**

Załóżmy na przykład, że poleciliśmy przeglądarkom użytkowników buforowanie arkusza stylów CSS przez 24 godziny (max-age=86400), ale nasz projektant właśnie zaktualizował arkusz i chcemy go od razu udostępnić wszystkim użytkownikom. Jak powiadomić wszystkich użytkowników z przestarzałą kopią arkusza CSS w pamięci podręcznej, by ją odświeżyli? To podchwytliwe pytanie &ndash; nie jest to możliwe, przynajmniej nie bez zmiany adresu URL zasobu.

Po zbuforowaniu odpowiedzi przez przeglądarkę wersja ta jest używana do momentu utraty ważności określonego wartością max-age lub expires albo do momentu usunięcia jej z pamięci podręcznej z jakiegoś innego powodu &ndash; np. wyczyszczenia przez użytkownika. Z tego powodu może się zdarzyć, że podczas konstruowania strony różni użytkownicy będą korzystać z różnych wersji pliku; użytkownicy z właśnie pobranym zasobem będą używać nowej wersji, użytkownicy z wcześniej zbuforowanym (ale nadal ważnym) zasobem będą używać starszej wersji.

**Jak najlepiej pogodzić ze sobą te dwa różne podejścia: buforowanie po stronie klienta i szybkie aktualizacje?** Można po prostu zmienić adres URL zasobu i wymusić na użytkowniku pobranie nowego zasobu przy każdej zmianie jego zawartości. Zazwyczaj wykonuje się to przez zamieszczenie w nazwie pliku cyfrowego odcisku jego zawartości lub numer wersji &ndash; np. style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png" class="center" alt="Hierarchia pamięci podręcznej">

Możliwość określania polityki buforowania dla każdego zasobu osobno pozwala tworzyć `hierarchie buforowania` dające kontrolę nie tylko nad długością okresu buforowania, ale również szybkością udostępniania nowych wersji użytkownikom. Przeanalizujmy powyższy przykład:

* Znaczniki HTML opatrzono dyrektywą `no-cache`, co oznacza, że przeglądarka będzie przy każdym żądaniu sprawdzać ważność dokumentu i pobierać jego ostatnią wersję, jeśli treść uległa zmianie. Ponadto w adresach URL zasobów CSS i JavaScript w znacznikach HTML zamieszczono odciski cyfrowe: jeśli zawartość tych plików się zmieni, zmienią się również znaczniki HTML strony, co pociągnie za sobą pobranie odpowiedzi.
* Zezwolono na buforowanie kodu CSS przez przeglądarki i bufory pośredniej pamięci podręcznej (np. sieci CDN), a ich datę ważności określono na 1 rok. Zwróć uwagę, że można bez obaw używać długich okresów ważności, takich jak 1 rok, ponieważ w nazwie pliku zamieszczamy jego odcisk cyfrowy: w przypadku aktualizacji kodu CSS adres URL również ulegnie zmianie.
* W przypadku skryptu JavaScript określono okres ważności o długości 1 roku, ale skrypt oznaczono jako prywatny, być może dlatego, że zawiera pewne prywatne dane użytkowników, których buforowanie przez sieć CDN jest niewskazane.
* Obraz ma być buforowany bez stosowania wersji ani unikalnego odcisku cyfrowego, a jego datę ważności określono na 1 dzień.

Połączenie tokenów ETag, dyrektyw Cache-Control i unikalnych adresów URL pozwala wykorzystać najlepsze cechy wszystkich rozwiązań: długie okresy ważności, możliwość kontroli nad miejscem buforowania odpowiedzi i aktualizacje na żądanie.

## Buforowanie &ndash; lista czynności

Nie istnieje jedna najlepsza polityka konfiguracji pamięci podręcznej. Zależnie od charakterystyki ruchu sieciowego, typu przesyłanych danych i wymagań aplikacji odnośnie do ważności danych może być konieczne określenie i skonfigurowanie osobnych ustawień odpowiednich dla konkretnych zasobów, jak również ogólnej `hierarchii buforowania`.

Niektóre wskazówki i techniki, o których trzeba pamiętać przy określaniu strategii buforowania:

1. **Używaj spójnej metody tworzenia adresów URL:** przy przesyłaniu tej samej treści pod różnymi adresami URL będzie ona pobierana i przechowywana wiele razy. Wskazówka: pamiętaj, że w przypadku adresów URL [rozróżniana jest wielkość liter](http://www.w3.org/TR/WD-html40-970708/htmlweb.html).
2. **Upewnij się, że serwer udostępnia token walidacji (ETag):** tokeny eliminują potrzebę transferu tych samych danych przy braku zmian zasobu na serwerze.
3. **Określ, które zasoby mogą być buforowane przez pośredników:** dobrymi kandydatami do buforowania przez sieci CDN i innych pośredników są odpowiedzi identyczne dla wszystkich użytkowników.
4. **Określ optymalny okres ważności pamięci podręcznej dla każdego zasobu:** różne zasoby mogą wymagać różnych okresów ważności. Przeprowadź audyt i ustal odpowiednią wartość max-age dla każdego zasobu.
5. **Określ najlepszą hierarchię buforowania w swojej witrynie:** częstotliwość pobierania aktualizacji przez klientów można kontrolować dzięki połączeniu adresów URL i cyfrowych odcisków zasobów z krótkim czasem ważności lub brakiem buforowania dokumentów HTML.
6. **Unikaj chaosu:** niektóre zasoby są aktualizowane częściej niż inne. Jeśli istnieje szczególna część zasobu (np. funkcja JavaScript lub zestaw stylów CSS), która jest często aktualizowana, rozważ dostarczanie tego kodu w osobnym pliku. Takie postępowanie pozwoli na pobieranie pozostałej treści (np. kodu biblioteki nie zmieniającej się zbyt często) z pamięci podręcznej i ograniczy ilość danych pobieranych podczas aktualizacji.




