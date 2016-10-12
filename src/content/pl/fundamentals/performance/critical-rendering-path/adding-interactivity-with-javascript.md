project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: JavaScript pozwala zmienić niemal każdy aspekt strony &ndash; treść, styl oraz sposób interakcji z użytkownikiem. Może jednak blokować tworzenie modelu DOM i opóźniać renderowanie strony. Aby uzyskać optymalną wydajność, oznacz kod JavaScript jako asynchroniczny i usuń niepotrzebne funkcje z krytycznej ścieżki renderowania.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2013-12-31 #}

# Dodawanie funkcji interaktywnych w JavaScripcie {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


JavaScript pozwala zmienić niemal każdy aspekt strony &ndash; treść, styl oraz sposób interakcji z użytkownikiem. Może jednak blokować tworzenie modelu DOM i opóźniać renderowanie strony. Aby uzyskać optymalną wydajność, oznacz kod JavaScript jako asynchroniczny i usuń niepotrzebne funkcje z krytycznej ścieżki renderowania.



### TL;DR {: .hide-from-toc }
- JavaScript pozwala odczytywać i zmieniać modele DOM oraz CSSOM.
- Wykonanie kodu JavaScript jest blokowane do chwili utworzenia modelu CSSOM.
- JavaScript blokuje tworzenie modelu DOM, chyba że zostanie wyraźnie zadeklarowany jako asynchroniczny.


JavaScript to język dynamiczny, który działa w przeglądarce i pozwala zmieniać niemal każdy aspekt funkcjonowania strony. Możesz dostosować jej treść, dodając lub usuwając elementy w drzewie DOM, zaktualizować właściwości CSSOM każdego elementu, obsługiwać wprowadzanie danych przez użytkownika itp. Aby pokazać, jak to działa, uzupełnimy poprzedni przykład `Witaj Świecie` o prosty wbudowany skrypt:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

* JavaScript pozwala sięgnąć do modelu DOM i pobrać odwołanie do ukrytego węzła span, który może nie być widoczny w drzewie renderowania, ale wciąż jest w modelu DOM. Po uzyskaniu odwołania możemy zmienić tekst elementu (używając właściwości .textContent), a nawet zastąpić automatycznie określoną wartość właściwości display stylu z `none` na `inline`. Po zakończeniu działania skryptu na stronie pojawi się tekst `**Hello interactive students!**` (Witajcie interaktywni uczniowie!).

* JavaScript umożliwia też tworzenie nowych elementów, nadawanie im stylu oraz dodawanie i usuwanie ich w modelu DOM. Technicznie nic nie stoi na przeszkodzie, by cała strona była jednym dużym plikiem JavaScript, który kolejno tworzy elementy i nadaje im style. To możliwe, ale stosowanie HTML i CSS jest w praktyce znacznie prostsze. W drugiej części funkcji JavaScript tworzymy nowy element div, wpisujemy do niego tekst i dodajemy go do treści strony.

<img src="images/device-js-small.png" class="center" alt="podgląd strony">

W ten sposób zmieniliśmy treść oraz styl CSS istniejącego węzła DOM, a potem dodaliśmy zupełnie nowy węzeł do dokumentu. Nasza strona nie otrzyma żadnych nagród za projekt, ale ilustruje swobodę i możliwości, jakie daje JavaScript.

Ta technika ma jednak dużą wadę związaną z wydajnością. JavaScript pozwala wiele zrobić, ale jednocześnie wprowadza sporo dodatkowych ograniczeń tego, jak i kiedy strona jest renderowana.

Po pierwsze, zwróć uwagę, że w naszym przykładzie wbudowany skrypt jest na końcu strony. Dlaczego? Możesz sprawdzić to samodzielnie. Jeśli przeniesiemy skrypt powyżej elementu _span_, jego wykonywanie zostanie przerwane z powodu błędu. Skrypt nie będzie mógł znaleźć odwołania do żadnego elementu _span_ w dokumencie &ndash; funkcja _getElementsByTagName('span')_ zwróci wartość _null_. To pokazuje ważną cechę: skrypt zostaje wykonany dokładnie tam, gdzie jest w dokumencie. Gdy parser HTML natrafi na tag skryptu, wstrzymuje proces tworzenia modelu DOM i przekazuje kontrolę mechanizmowi JavaScript. Po zakończeniu jego działania przeglądarka w odpowiednim miejscu wznawia tworzenie modelu DOM.

Krótko mówiąc, skrypt nie może znaleźć elementów, które są w dalszej części strony, bo nie zostały one jeszcze przetworzone. Można też podkreślić, że **wykonywanie wbudowanego skryptu blokuje tworzenie modelu DOM, a tym samym opóźnia początkowe renderowanie.**

Inną przydatną cechą skryptów na stronie jest to, że mogą one odczytywać i zmieniać nie tylko model DOM, ale też właściwości CSSOM. Właśnie to robimy w naszym przykładzie, gdy zmieniamy właściwość display elementu span z `none` na `inline`. Wynik końcowy? Pojawia się zjawisko wyścigu.

Co w sytuacji, gdy przeglądarka nie skończy pobierać i tworzyć modelu CSSOM przed uruchomieniem naszego skryptu? Odpowiedź jest prosta, ale niezbyt korzystna, jeśli chodzi o wydajność: **przeglądarka opóźni wykonanie skryptu do chwili zakończenia pobierania i tworzenia modelu CSSOM. W tym czasie tworzenie modelu DOM także zostanie zablokowane.**

JavaScript wprowadza wiele nowych zależności między modelami DOM i CSSOM oraz wykonywaniem skryptów, co może prowadzić do wyraźnych opóźnień w przetwarzaniu i renderowaniu strony w przeglądarce na ekranie:

1. Lokalizacja skryptu w dokumencie ma znaczenie.
2. Tworzenie modelu DOM jest wstrzymywane w momencie natrafienia na tag skryptu i wznawiane dopiero po zakończeniu wykonywania tego skryptu.
3. JavaScript pozwala odczytywać i zmieniać modele DOM oraz CSSOM.
4. Wykonanie JavaScriptu jest opóźniane do chwili przygotowania modelu CSSOM.

Gdy mówimy o `optymalizacji krytycznej ścieżki renderowania`, mamy głównie na myśli analizę i optymalizację grafu zależności między HTML, CSS i JavaScriptem.


## Blokowanie parsera a JavaScript asynchroniczny

Domyślnie JavaScript jest wykonywany w trybie blokowania parsera: gdy przeglądarka natrafi w dokumencie na skrypt, musi wstrzymać tworzenie modelu DOM, przekazać kontrolę mechanizmowi JavaScript i przed wznowieniem tworzenia modelu DOM poczekać na wykonanie skryptu. Mieliśmy okazję to zobaczyć w naszym poprzednim przykładzie z wbudowanym skryptem. Skrypty wbudowane zawsze blokują parser, chyba że specjalnie napiszesz dodatkowy kod, który odłoży ich wykonanie.

Co w przypadku skryptów dołączanych w tagu script? Weźmy poprzedni przykład i wydzielmy nasz kod do osobnego pliku:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full"   adjust_indentation="auto" %}
</pre>

Czy kolejność wykonywania będzie inna, gdy zamiast wbudowanego fragmentu kodu JavaScript użyjemy tagu `<script>`? Odpowiedź to oczywiście `nie`. Kod w obu rozwiązaniach ma jednakowy układ i działa tak samo. Przeglądarka musi wstrzymać pracę i wykonać skrypt, zanim przetworzy resztę dokumentu. Jeśli jednak **przeglądarka będzie musiała dodatkowo czekać, aż zewnętrzny plik JavaScript zostanie odczytany z dysku, pamięci podręcznej czy zdalnego serwera, to opóźni realizację krytycznej ścieżki renderowania o kolejne dziesiątki lub nawet tysiące milisekund.**

Na szczęście mamy wyjście awaryjne. Domyślnie JavaScript zawsze blokuje parser &ndash; przeglądarka nie wie, co skrypt zrobi na stronie, więc na wszelki wypadek zatrzymuje działanie parsera. Co jednak w sytuacji, gdy poinformujemy przeglądarkę, że nie musi wykonywać skryptu dokładnie tam, gdzie pojawia się on w dokumencie? To pozwoli jej dokończyć tworzenie modelu DOM i wykonać skrypt, gdy wszystko będzie gotowe (np. po pobraniu pliku z pamięci podręcznej lub zdalnego serwera).

Jak to osiągnąć? To proste &ndash; oznaczymy skrypt atrybutem _async_:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

Słowo kluczowe async w tagu script informuje przeglądarkę, że nie powinna blokować tworzenia modelu DOM w oczekiwaniu na udostępnienie skryptu. To znacznie poprawia wydajność.



